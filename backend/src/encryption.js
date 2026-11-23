const crypto = require('crypto');

const algorithm = 'aes-256-gcm';
const keyEnvironmentVariable = 'JOURNAL_ENCRYPTION_KEY';

function getKey() {
  const encodedKey = process.env[keyEnvironmentVariable];
  if (!encodedKey) {
    throw new Error(`${keyEnvironmentVariable} must be configured to protect journal entries.`);
  }

  const key = Buffer.from(encodedKey, 'base64');
  if (key.length !== 32) {
    throw new Error(`${keyEnvironmentVariable} must be a base64-encoded 32-byte key.`);
  }
  return key;
}

function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return {
    ciphertext: ciphertext.toString('base64'),
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
  };
}

function decrypt(ciphertext, iv, tag) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, getKey(), Buffer.from(iv, 'base64'));
    decipher.setAuthTag(Buffer.from(tag, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(ciphertext, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  } catch (error) {
    throw new Error(`Unable to decrypt journal entry: ${error.message}`);
  }
}

module.exports = { decrypt, encrypt, getKey };
