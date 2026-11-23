import React, { useState } from 'react';

const moods = [{ value: 1, icon: '☁', label: 'Heavy' }, { value: 2, icon: '◔', label: 'Low' }, { value: 3, icon: '☾', label: 'Steady' }, { value: 4, icon: '☀', label: 'Light' }, { value: 5, icon: '✦', label: 'Bright' }];

export default function JournalEntryForm({ onSubmit, onViewInsights, response, submitting = false }) {
  const [text, setText] = useState(''); const [mood, setMood] = useState(3);
  const submit = async (event) => { event.preventDefault(); if (!text.trim() || submitting) return; const saved = await onSubmit({ text: text.trim(), mood }); if (saved) { setText(''); setMood(3); } };
  return <section className="journal-hero reveal"><p className="eyebrow">A QUIET MOMENT FOR YOU</p><h1>What’s growing in you today?</h1><p className="lede">Leave a thought, a feeling, or a small moment exactly as it is.</p>
    <form onSubmit={submit} className="journal-card"><div className="card-top"><span className="date-label">{new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</span><span className="private-label">⌘ private space</span></div>
      <textarea value={text} onChange={(event) => setText(event.target.value)} maxLength="2000" placeholder="Today I noticed..." aria-label="Journal reflection" disabled={submitting} />
      <div className="entry-bottom"><div className="mood-picker"><span>How does your heart feel?</span><div>{moods.map((item) => <button type="button" key={item.value} onClick={() => setMood(item.value)} className={mood === item.value ? 'selected' : ''} aria-label={item.label} title={item.label} disabled={submitting}>{item.icon}</button>)}</div></div><button className="plant-button" type="submit" disabled={submitting}>{submitting ? 'Planting...' : 'Plant reflection'} <span>→</span></button></div>
    </form>{response && <div className="response-card"><p className="panel-label">THE GARDEN WHISPERS</p><p>{response}</p></div>}<button className="insights-link" onClick={onViewInsights}>See what your garden is teaching you <span>→</span></button>
  </section>;
}
