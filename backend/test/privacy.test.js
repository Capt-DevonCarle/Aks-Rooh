const assert = require('node:assert/strict');
const { test } = require('node:test');
const { createInsights } = require('../src/services/insights');

test('does not send journal text to external AI unless explicitly enabled', async () => {
  const originalKey = process.env.OPENAI_API_KEY;
  const originalOptIn = process.env.ALLOW_EXTERNAL_AI;
  const originalFetch = global.fetch;
  let fetchCalls = 0;

  process.env.OPENAI_API_KEY = 'test-key';
  process.env.ALLOW_EXTERNAL_AI = 'false';
  global.fetch = async () => {
    fetchCalls += 1;
    throw new Error('External AI should not be called.');
  };

  try {
    const result = await createInsights([{ text: 'A private reflection', mood: 3 }]);
    assert.equal(fetchCalls, 0);
    assert.match(result.response, /steady|steadiness|reflection/i);
  } finally {
    process.env.OPENAI_API_KEY = originalKey;
    process.env.ALLOW_EXTERNAL_AI = originalOptIn;
    global.fetch = originalFetch;
  }
});
