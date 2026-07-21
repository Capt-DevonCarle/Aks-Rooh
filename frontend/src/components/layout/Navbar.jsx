import React from 'react';

export default function EntryList({ entries }) {
  if (!entries.length) {
    return (
      <p className="mt-10 text-center text-star-yellow/80 italic max-w-xl mx-auto">
        Your soul garden is still quiet... start by sharing your first thought above.
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 space-y-6">
      {entries.map(({ id, text, date }) => (
        <div
          key={id}
          className="bg-night-blue bg-opacity-60 rounded-2xl p-4 shadow-md relative border border-leaf-green"
          aria-label={`Journal entry for ${date}`}
        >
          <p className="text-moon-gray">{text.length > 140 ? text.slice(0, 137) + '...' : text}</p>
          <time className="block mt-2 text-star-yellow text-sm font-mono">{new Date(date).toLocaleDateString()}</time>
          {/* Small "plant" icon */}
          <span
            className="absolute top-2 right-2 w-4 h-4 bg-leaf-green rounded-full animate-leaf-drift"
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}
