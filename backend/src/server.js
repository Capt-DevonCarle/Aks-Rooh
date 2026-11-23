require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const db = require('./db');
const { authenticate } = require('./middleware/auth');
const { createInsights } = require('./services/insights');
const { decrypt, encrypt } = require('./encryption');
const logger = require('./logger');

if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'replace-with-a-long-random-secret') {
  process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');
  console.warn('[WARN] No JWT_SECRET set in .env — a random one was generated. Login sessions will reset on restart.');
}

const app = express();
const port = Number(process.env.PORT || 4000);
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000,http://127.0.0.1:3000';
const allowedOrigins = clientOrigin.split(',').map((s) => s.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '100kb' }));

/* ── Request logging middleware ── */
app.use((request, response, next) => {
  const start = Date.now();
  response.on('finish', () => {
    const duration = Date.now() - start;
    const email = request.user?.email || 'anonymous';
    logger.apiRequest(request.method, request.path, request.user?.sub, email, request.ip, response.statusCode, duration);
  });
  next();
});

/* ── Schemas ── */
const registration = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
});
const login = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(128),
});
const entryInput = z.object({ text: z.string().trim().min(1).max(2000), mood: z.number().int().min(1).max(5) });
const publicUser = (user) => ({ id: user.id, name: user.name, email: user.email, createdAt: user.created_at });
const tokenFor = (user) => jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
const parse = (schema, payload, response) => { const result = schema.safeParse(payload); if (!result.success) { response.status(400).json({ error: 'Please check the submitted fields.', details: result.error.flatten().fieldErrors }); return null; } return result.data; };

/* ── Routes ── */
app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));

app.post('/api/auth/register', async (request, response, next) => {
  try {
    const input = parse(registration, request.body, response); if (!input) return;
    const email = input.email.toLowerCase();

    if (db.get('SELECT id FROM users WHERE email = ?', [email])) {
      logger.authEvent('register', null, email, request.ip, false, 'Email already exists');
      return response.status(409).json({ error: 'An account already exists for this email.' });
    }

    const user = { id: crypto.randomUUID(), name: input.name, email, password_hash: await bcrypt.hash(input.password, 12) };
    db.run('INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)', [user.id, user.name, user.email, user.password_hash]);

    logger.authEvent('register', user.id, email, request.ip, true, 'Account created');
    logger.info('New user registered', { userId: user.id, email });
    return response.status(201).json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) { next(error); }
});

app.post('/api/auth/login', async (request, response, next) => {
  try {
    const input = parse(login, request.body, response); if (!input) return;
    const user = db.get('SELECT * FROM users WHERE email = ?', [input.email.toLowerCase()]);

    if (!user || !(await bcrypt.compare(input.password, user.password_hash))) {
      logger.authEvent('login', user?.id, input.email.toLowerCase(), request.ip, false, 'Incorrect email or password');
      return response.status(401).json({ error: 'Incorrect email or password.' });
    }

    logger.authEvent('login', user.id, user.email, request.ip, true, 'Login successful');
    logger.info('User logged in', { userId: user.id, email: user.email });
    return response.json({ token: tokenFor(user), user: publicUser(user) });
  } catch (error) { next(error); }
});

app.get('/api/auth/me', authenticate, (request, response) => {
  const user = db.get('SELECT * FROM users WHERE id = ?', [request.user.sub]);
  if (!user) return response.status(404).json({ error: 'User not found.' });
  return response.json({ user: publicUser(user) });
});

app.delete('/api/auth/me', authenticate, (request, response, next) => {
  try {
    db.transaction(() => {
      db.run('DELETE FROM entries WHERE user_id = ?', [request.user.sub]);
      db.run('DELETE FROM event_log WHERE user_id = ? OR email = ?', [request.user.sub, request.user.email]);
      db.run('DELETE FROM users WHERE id = ?', [request.user.sub]);
    });
    logger.info('User account deleted', { userId: request.user.sub });
    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

app.get('/api/entries', authenticate, (request, response) => {
  const entries = db.all('SELECT id, text, text_ciphertext, text_iv, text_tag, mood, created_at AS createdAt FROM entries WHERE user_id = ? ORDER BY created_at DESC', [request.user.sub])
    .map((entry) => ({ id: entry.id, text: decrypt(entry.text_ciphertext, entry.text_iv, entry.text_tag), mood: entry.mood, createdAt: entry.createdAt }));
  response.json({ entries });
});

app.post('/api/entries', authenticate, (request, response) => {
  const input = parse(entryInput, request.body, response); if (!input) return;
  const encrypted = encrypt(input.text);
  const entry = { id: crypto.randomUUID(), user_id: request.user.sub, ...input, createdAt: new Date().toISOString() };
  db.run('INSERT INTO entries (id, user_id, text, text_ciphertext, text_iv, text_tag, mood, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [entry.id, entry.user_id, '', encrypted.ciphertext, encrypted.iv, encrypted.tag, entry.mood, entry.createdAt]);
  logger.info('Entry created', { userId: request.user.sub, entryId: entry.id });
  response.status(201).json({ entry: { id: entry.id, text: entry.text, mood: entry.mood, createdAt: entry.createdAt } });
});

app.delete('/api/entries/:id', authenticate, (request, response) => {
  const result = db.run('DELETE FROM entries WHERE id = ? AND user_id = ?', [request.params.id, request.user.sub]);
  if (!result.changes) return response.status(404).json({ error: 'Entry not found.' });
  logger.info('Entry deleted', { userId: request.user.sub, entryId: request.params.id });
  return response.status(204).end();
});

app.get('/api/insights', authenticate, async (request, response) => {
  const entries = db.all('SELECT text, text_ciphertext, text_iv, text_tag, mood, created_at AS createdAt FROM entries WHERE user_id = ? ORDER BY created_at DESC', [request.user.sub])
    .map((entry) => ({ text: decrypt(entry.text_ciphertext, entry.text_iv, entry.text_tag), mood: entry.mood, createdAt: entry.createdAt }));
  response.json({ insights: await createInsights(entries) });
});

app.get('/api/export', authenticate, (request, response) => {
  const user = db.get('SELECT id, name, email, created_at AS createdAt FROM users WHERE id = ?', [request.user.sub]);
  if (!user) return response.status(404).json({ error: 'User not found.' });
  const entries = db.all(
    'SELECT id, text_ciphertext, text_iv, text_tag, mood, created_at AS createdAt FROM entries WHERE user_id = ? ORDER BY created_at DESC',
    [request.user.sub]
  ).map((entry) => ({ id: entry.id, text: decrypt(entry.text_ciphertext, entry.text_iv, entry.text_tag), mood: entry.mood, createdAt: entry.createdAt }));
  const exportData = {
    exportedAt: new Date().toISOString(),
    user,
    entries,
  };
  response.setHeader('Content-Disposition', 'attachment; filename="aks-rooh-export.json"');
  return response.json(exportData);
});

/* ── Audit log endpoint (user can see their own activity) ── */
app.get('/api/activity', authenticate, (request, response) => {
  const logs = db.all(
    'SELECT id, event_type, ip_address, success, detail, created_at FROM event_log WHERE user_id = ? OR email = ? ORDER BY created_at DESC LIMIT 50',
    [request.user.sub, request.user.email]
  );
  response.json({ activity: logs });
});

/* ── Error handler ── */
app.use((error, _request, response, _next) => {
  logger.error('Unhandled error', { error: error.message, stack: error.stack });
  response.status(500).json({ error: 'Something went wrong. Please try again.' });
});

/* ── Start ── */
if (require.main === module) {
  db.initialise().then(() => {
    app.listen(port, () => logger.info(`Aks Rooh API listening on http://localhost:${port}`));
  }).catch((error) => {
    logger.error('Could not initialise the database.', { error: error.message });
    process.exit(1);
  });
}

module.exports = { app, initialise: db.initialise };
