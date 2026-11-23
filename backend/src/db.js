const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const { encrypt } = require('./encryption');

const dataDirectory = process.env.DATA_DIRECTORY || path.join(__dirname, '..', 'data');
const databaseFile = path.join(dataDirectory, 'aks-rooh.db');
let database;
let transactionDepth = 0;

function persist() {
  const temporaryFile = `${databaseFile}.tmp`;
  fs.writeFileSync(temporaryFile, Buffer.from(database.export()));
  try {
    fs.renameSync(temporaryFile, databaseFile);
  } catch (error) {
    if (!['EEXIST', 'EPERM'].includes(error.code)) throw error;
    fs.rmSync(databaseFile, { force: true });
    fs.renameSync(temporaryFile, databaseFile);
  }
}

async function initialise() {
  fs.mkdirSync(dataDirectory, { recursive: true });
  const SQL = await initSqlJs({ locateFile: (file) => path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', file) });
  database = fs.existsSync(databaseFile) ? new SQL.Database(fs.readFileSync(databaseFile)) : new SQL.Database();
  database.run('PRAGMA foreign_keys = ON;');
  database.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS entries (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      text TEXT NOT NULL DEFAULT '',
      mood INTEGER NOT NULL CHECK(mood BETWEEN 1 AND 5),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS event_log (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      email TEXT,
      event_type TEXT NOT NULL,
      ip_address TEXT,
      success INTEGER NOT NULL DEFAULT 0,
      detail TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_entries_user_created ON entries(user_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_event_log_created ON event_log(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_event_log_user ON event_log(user_id);
  `);
  const columns = all('PRAGMA table_info(entries)').map((column) => column.name);
  if (!columns.includes('text_ciphertext')) database.run('ALTER TABLE entries ADD COLUMN text_ciphertext TEXT');
  if (!columns.includes('text_iv')) database.run('ALTER TABLE entries ADD COLUMN text_iv TEXT');
  if (!columns.includes('text_tag')) database.run('ALTER TABLE entries ADD COLUMN text_tag TEXT');

  const plaintextEntries = all(
    "SELECT id, text FROM entries WHERE text IS NOT NULL AND text <> '' AND (text_ciphertext IS NULL OR text_iv IS NULL OR text_tag IS NULL)"
  );
  for (const entry of plaintextEntries) {
    const encrypted = encrypt(entry.text);
    database.run(
      'UPDATE entries SET text = ?, text_ciphertext = ?, text_iv = ?, text_tag = ? WHERE id = ?',
      ['', encrypted.ciphertext, encrypted.iv, encrypted.tag, entry.id]
    );
  }
  persist();
}

function all(sql, parameters = []) {
  const statement = database.prepare(sql);
  statement.bind(parameters);
  const rows = [];
  while (statement.step()) rows.push(statement.getAsObject());
  statement.free();
  return rows;
}

function get(sql, parameters = []) { return all(sql, parameters)[0]; }
function run(sql, parameters = []) {
  database.run(sql, parameters);
  const changes = database.getRowsModified();
  if (transactionDepth === 0) persist();
  return { changes };
}
function transaction(callback) {
  transactionDepth += 1;
  database.run('BEGIN TRANSACTION');
  try {
    const result = callback();
    database.run('COMMIT');
    persist();
    transactionDepth -= 1;
    return result;
  } catch (error) {
    database.run('ROLLBACK');
    transactionDepth -= 1;
    throw error;
  }
}

module.exports = { initialise, all, get, run, transaction };
