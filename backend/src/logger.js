/**
 * Structured logger for Aks Rooh API.
 * Outputs JSON-formatted logs suitable for cloud platforms (Railway, Render, etc.)
 * and writes activity events to the database for audit trails.
 */
const crypto = require('crypto');

const LOG_LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
const CURRENT_LEVEL = LOG_LEVELS[process.env.LOG_LEVEL] || LOG_LEVELS.INFO;

function formatTimestamp() {
  return new Date().toISOString();
}

function sanitiseForLogs(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const safe = { ...obj };
  // Never log passwords, tokens, or entry text content in full
  if (safe.password) safe.password = '[REDACTED]';
  if (safe.password_hash) safe.password_hash = '[REDACTED]';
  if (safe.token) safe.token = safe.token.slice(0, 12) + '...[REDACTED]';
  if (safe.text) safe.text = safe.text.slice(0, 40) + '...';
  return safe;
}

function log(level, message, meta = {}) {
  if (LOG_LEVELS[level] < CURRENT_LEVEL) return;

  const entry = {
    timestamp: formatTimestamp(),
    level,
    service: 'aks-rooh-api',
    message,
    ...sanitiseForLogs(meta),
  };

  // Console output — cloud platforms capture this in their log viewers
  const prefix = `[${entry.timestamp}] [${level}]`;
  console.log(`${prefix} ${message}`, Object.keys(meta).length ? JSON.stringify(sanitiseForLogs(meta)) : '');
}

const logger = {
  debug: (msg, meta) => log('DEBUG', msg, meta),
  info: (msg, meta) => log('INFO', msg, meta),
  warn: (msg, meta) => log('WARN', msg, meta),
  error: (msg, meta) => log('ERROR', msg, meta),

  /** Log an auth event to both console and database for audit trail */
  authEvent: (eventType, userId, email, ip, success, detail = '') => {
    const meta = { eventType, userId, email, ip, success, detail };
    const status = success ? 'success' : 'failed';
    log('INFO', `Auth ${eventType} — ${status} — ${email}`, meta);

    // Persist to database for historical audit
    try {
      const db = require('./db');
      db.run(
        'INSERT INTO event_log (id, user_id, email, event_type, ip_address, success, detail, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [crypto.randomUUID(), userId || null, email || null, eventType, ip || null, success ? 1 : 0, detail, formatTimestamp()]
      );
    } catch (err) {
      log('ERROR', 'Failed to write auth event log', { error: err.message });
    }
  },

  /** Log an API request summary */
  apiRequest: (method, path, userId, email, ip, statusCode, durationMs) => {
    log('INFO', `${method} ${path} — ${statusCode}`, {
      method,
      path,
      userId,
      email,
      ip,
      statusCode,
      duration: durationMs ? `${durationMs}ms` : undefined,
    });
  },
};

module.exports = logger;

