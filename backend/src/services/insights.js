const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

/* ── Rich fallback responses (used when no OpenAI key is set) ── */
const fallbackPool = {
  high: [
    'There is a brightness in what you wrote, a warmth that suggests something is settling into place. Let that feeling be your companion a little while longer.',
    'Your words carry a light energy today—a sense of ease or quiet joy. Notice where that lives in your body right now, and let it breathe.',
    'This reflection hums with a gentle contentment. Not everything needs to be figured out. Sometimes the heart simply knows it is okay.',
  ],
  medium: [
    'You are in a space of calm reflection—neither high nor low, just present. That steadiness is its own kind of wisdom. Trust it.',
    'There is a quiet steadiness in your words, a willingness to simply observe. That act of noticing is more powerful than you might realise.',
    'Your reflection sits in a balanced place, aware without being overwhelmed. This middle ground is where understanding often grows quietly.',
  ],
  low: [
    'Your words carry a tender weight today. That matters. You do not need to fix anything right now—simply letting it be here is enough.',
    'This reflection speaks from a soft or heavy place. There is no wrong way to feel. Just by writing it down, you have honoured something real.',
    'The honesty in your words holds a quiet strength. Even when it feels heavy, the act of writing creates a small opening for light to enter later.',
  ],
};

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildFallbackResponse(entryText, mood) {
  const pool = mood >= 4 ? fallbackPool.high : mood >= 3 ? fallbackPool.medium : fallbackPool.low;
  const reflection = pickRandom(pool);
  const contextHint = entryText.length > 20
    ? ` Reading your words—“${entryText.slice(0, 70)}${entryText.length > 70 ? '…' : ''}”—I notice a quality that deserves attention.`
    : '';
  return `${reflection}${contextHint} Keep noticing what feels real today.`;
}

/* ── AI-powered reflection (used when OPENAI_API_KEY is set) ── */
async function createReflectionResponse(entryText, mood, insights) {
  const fallback = buildFallbackResponse(entryText, mood);

  if (process.env.ALLOW_EXTERNAL_AI !== 'true' || !process.env.OPENAI_API_KEY) return fallback;

  const moodDescriptor = mood >= 4 ? 'a bright, hopeful place' : mood >= 3 ? 'a calm, steady place' : 'a gentle tender place';

  const prompt = `Write a short, warm reflection (30-50 words) in response to this personal journal entry.

The writer's mood is "${mood}/5" — ${moodDescriptor}.

Their entry: "${entryText}"

Your response should:
- Speak directly to what they wrote (reference a specific detail or feeling from their entry)
- Be warm, calm, and poetic — like a compassionate inner companion
- Be 30-50 words (2-3 sentences)
- Not diagnose or give medical advice
- Sound personal, not generic`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.7,
        max_tokens: 120,
        messages: [
          {
            role: 'system',
            content: 'You are a warm, poetic reflection companion. You write 2-3 sentences (30-50 words) that feel personal and specific to each journal entry. You reference details from the entry, you speak with calm wisdom, and you never give medical or diagnostic advice. You are like a kind inner friend who helps the writer see their own experience more clearly.',
          },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim();
    if (content) return content.replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.warn('OpenAI response unavailable, using local reflection fallback.', error.message);
  }

  return fallback;
}

/* ── Insight generation ── */
async function createInsights(entries) {
  const text = entries.map((entry) => entry.text.toLowerCase()).join(' ');
  const moods = entries.map((entry) => entry.mood);
  const averageMood = moods.length ? Number((moods.reduce((sum, mood) => sum + mood, 0) / moods.length).toFixed(1)) : null;

  const themePatterns = [
    { pattern: /rest|sleep|slow|walk|tea|breathe|calm|quiet/, theme: 'restoration' },
    { pattern: /friend|family|together|conversation|talk|love/, theme: 'connection' },
    { pattern: /proud|learn|progress|finish|finished|try|tried|growth/, theme: 'quiet growth' },
    { pattern: /grateful|thankful|blessed|appreciate|gratitude/, theme: 'gratitude' },
    { pattern: /anxious|worry|stress|fear|nervous|overwhelm/, theme: 'gentle with self' },
    { pattern: /change|new|different|shift|transition|move/, theme: 'transition' },
  ];

  const themes = themePatterns
    .filter(({ pattern }) => pattern.test(text))
    .map(({ theme }) => theme);

  const recentMood = moods.length > 1 && moods[0] >= moods[moods.length - 1] ? 'gently rising' : 'changing with care';

  const insightSummary = {
    entryCount: entries.length,
    averageMood,
    moodRhythm: recentMood,
    themes: themes.length ? themes : ['reflection'],
    strength: themes.includes('quiet growth')
      ? 'You make room to notice your own effort. That awareness is a quiet kind of courage.'
      : themes.includes('restoration')
        ? 'You understand the value of rest and slowing down. That is not passivity—it is wisdom.'
        : 'You are creating space to listen to your inner world. Every entry is an act of self-trust.',
    suggestion: themes.includes('restoration')
      ? 'Keep one small restoring ritual close this week—a cup of tea, a short walk, a moment of stillness with nothing to accomplish.'
      : themes.includes('connection')
        ? 'This week, try writing about a conversation that stayed with you—even a small one that felt meaningful.'
        : themes.includes('gratitude')
          ? 'Gratitude surfaces in your writing. Try naming three small things tomorrow—not big milestones, just quiet moments.'
          : 'Try ending one entry with: "What did I need today?" Then write the first honest answer that comes.',
    disclaimer: 'This is reflective support, not medical, psychological, or diagnostic guidance.'
  };

  const entryInsights = await Promise.all(
    entries.slice(0, 5).map(async (entry, index) => ({
      number: entries.length - index,
      text: entry.text,
      mood: entry.mood,
      response: await createReflectionResponse(entry.text, entry.mood, insightSummary),
    }))
  );

  return {
    ...insightSummary,
    response: entryInsights[0]?.response || 'Your reflection has begun to take root. Keep tending it with kindness.',
    entryInsights,
  };
}

module.exports = { createInsights };
