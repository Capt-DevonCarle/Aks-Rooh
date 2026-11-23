import React, { useState } from 'react';
import { formatDate } from '../utils/dates';
const icons = ['☁', '◔', '☾', '☀', '✦'];
export default function EntryList({ entries, onDelete }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [deletingId, setDeletingId] = useState(null);
  const visibleEntries = entries.slice(0, visibleCount);
  const deleteEntry = async (id) => {
    if (!window.confirm('Delete this reflection permanently?')) return;
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };
  return <section className="entries-section reveal"><div className="section-title"><div><p className="eyebrow">YOUR RECENT BLOOMS</p><h2>Reflections you’ve tended</h2></div><span>{entries.length} total</span></div>
    <div className="entries-grid">{visibleEntries.map((entry) => <article className="entry-card" key={entry.id}><div className="entry-meta"><span>{icons[entry.mood - 1] || '•'} {formatDate(entry.date, { month: 'short', day: 'numeric' })}</span>{!entry.id.startsWith('seed') && <button onClick={() => deleteEntry(entry.id)} disabled={deletingId !== null} aria-label="Delete journal entry">{deletingId === entry.id ? '…' : '×'}</button>}</div><p>{entry.text}</p><span className="entry-leaf">⌁</span></article>)}</div>
    {visibleCount < entries.length && <button className="insights-link" onClick={() => setVisibleCount((count) => count + 6)}>Show more reflections <span>→</span></button>}
  </section>;
}
