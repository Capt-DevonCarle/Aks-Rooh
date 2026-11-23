const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { after, before, test } = require('node:test');

const port = 4700 + Math.floor(Math.random() * 200);
const dataDirectory = path.join(__dirname, '..', '.test-data-' + crypto.randomUUID());
const baseUrl = `http://127.0.0.1:${port}/api`;
const journalEncryptionKey = crypto.randomBytes(32).toString('base64');
let serverProcess;

async function request(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const body = response.status === 204 ? null : await response.json();
  return { response, body };
}

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const { response } = await request('/health');
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error('Backend did not start in time.');
}

function startServer() {
  serverProcess = spawn(process.execPath, ['src/server.js'], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, DATA_DIRECTORY: dataDirectory, JWT_SECRET: 'test-secret', JOURNAL_ENCRYPTION_KEY: journalEncryptionKey, PORT: String(port), OPENAI_API_KEY: '' },
    stdio: 'ignore',
  });
  return waitForServer();
}

function stopServer() {
  if (serverProcess && !serverProcess.killed) serverProcess.kill();
  serverProcess = null;
}

before(async () => {
  await startServer();
});

after(() => {
  stopServer();
  fs.rmSync(dataDirectory, { recursive: true, force: true });
});

test('creates accounts, normalises email login, and rejects duplicate email', async () => {
  const email = `account-${crypto.randomUUID()}@example.com`;
  const registration = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'First User', email, password: 'password123' }),
  });
  assert.equal(registration.response.status, 201);
  assert.ok(registration.body.token);
  assert.equal(registration.body.user.email, email);

  const login = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: email.toUpperCase(), password: 'password123' }),
  });
  assert.equal(login.response.status, 200);
  assert.equal(login.body.user.id, registration.body.user.id);

  const duplicate = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Duplicate', email: email.toUpperCase(), password: 'password123' }),
  });
  assert.equal(duplicate.response.status, 409);
});

test('isolates entries between authenticated accounts', async () => {
  const firstEmail = `owner-${crypto.randomUUID()}@example.com`;
  const secondEmail = `other-${crypto.randomUUID()}@example.com`;
  const first = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Owner', email: firstEmail, password: 'password123' }),
  });
  const second = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Other', email: secondEmail, password: 'password123' }),
  });

  const created = await request('/entries', {
    method: 'POST',
    token: first.body.token,
    body: JSON.stringify({ text: 'Private reflection', mood: 4 }),
  });
  assert.equal(created.response.status, 201);

  const firstEntries = await request('/entries', { token: first.body.token });
  const secondEntries = await request('/entries', { token: second.body.token });
  assert.equal(firstEntries.body.entries.length, 1);
  assert.equal(secondEntries.body.entries.length, 0);

  const crossAccountDelete = await request(`/entries/${created.body.entry.id}`, {
    method: 'DELETE',
    token: second.body.token,
  });
  assert.equal(crossAccountDelete.response.status, 404);
});

test('persists accounts and entries across an API restart', async () => {
  const email = `persistent-${crypto.randomUUID()}@example.com`;
  const registration = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Persistent User', email, password: 'password123' }),
  });
  const created = await request('/entries', {
    method: 'POST',
    token: registration.body.token,
    body: JSON.stringify({ text: 'This must survive a restart.', mood: 5 }),
  });
  assert.equal(created.response.status, 201);
  const databaseBytes = fs.readFileSync(path.join(dataDirectory, 'aks-rooh.db'));
  assert.equal(databaseBytes.includes(Buffer.from('This must survive a restart.')), false);

  stopServer();
  await startServer();

  const login = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password: 'password123' }),
  });
  assert.equal(login.response.status, 200);
  const entries = await request('/entries', { token: login.body.token });
  assert.deepEqual(entries.body.entries.map(({ text, mood }) => ({ text, mood })), [
    { text: 'This must survive a restart.', mood: 5 },
  ]);
});

test('exports only the authenticated account data', async () => {
  const firstEmail = `export-owner-${crypto.randomUUID()}@example.com`;
  const secondEmail = `export-other-${crypto.randomUUID()}@example.com`;
  const first = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Export Owner', email: firstEmail, password: 'password123' }),
  });
  const second = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Export Other', email: secondEmail, password: 'password123' }),
  });
  await request('/entries', {
    method: 'POST',
    token: first.body.token,
    body: JSON.stringify({ text: 'Exported private entry', mood: 3 }),
  });

  const exported = await request('/export', { token: first.body.token });
  assert.equal(exported.response.status, 200);
  assert.equal(exported.body.user.email, firstEmail);
  assert.equal(exported.body.entries.length, 1);
  assert.equal(exported.body.entries[0].text, 'Exported private entry');
  assert.match(exported.response.headers.get('content-disposition'), /aks-rooh-export\.json/);

  const otherExport = await request('/export', { token: second.body.token });
  assert.equal(otherExport.body.user.email, secondEmail);
  assert.equal(otherExport.body.entries.length, 0);
});

test('calculates insights from all entries, not only the latest thirty', async () => {
  const email = `insights-${crypto.randomUUID()}@example.com`;
  const registration = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Insights User', email, password: 'password123' }),
  });

  for (let index = 0; index < 31; index += 1) {
    const created = await request('/entries', {
      method: 'POST',
      token: registration.body.token,
      body: JSON.stringify({ text: `Reflection ${index}`, mood: index === 30 ? 5 : 1 }),
    });
    assert.equal(created.response.status, 201);
  }

  const insights = await request('/insights', { token: registration.body.token });
  assert.equal(insights.response.status, 200);
  assert.equal(insights.body.insights.entryCount, 31);
  assert.equal(insights.body.insights.averageMood, 1.1);
});

test('deletes an account and all of its data permanently', async () => {
  const email = `delete-${crypto.randomUUID()}@example.com`;
  const registration = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name: 'Delete User', email, password: 'password123' }),
  });
  const created = await request('/entries', {
    method: 'POST',
    token: registration.body.token,
    body: JSON.stringify({ text: 'Delete this private entry.', mood: 2 }),
  });
  assert.equal(created.response.status, 201);

  const deleted = await request('/auth/me', { method: 'DELETE', token: registration.body.token });
  assert.equal(deleted.response.status, 204);

  const login = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password: 'password123' }),
  });
  assert.equal(login.response.status, 401);

  const entries = await request('/entries', { token: registration.body.token });
  assert.equal(entries.response.status, 401);
});
