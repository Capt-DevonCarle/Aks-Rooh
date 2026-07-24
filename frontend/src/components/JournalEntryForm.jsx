import React, { useState } from 'react';

export default function JournalEntryForm({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-night-blue bg-opacity-70 rounded-2xl p-6 max-w-xl mx-auto shadow-lg backdrop-blur-sm"
    >
      <label
        htmlFor="journal"
        className="block mb-3 text-lg text-star-yellow font-serif"
      >
        Share your thoughts tonight:
      </label>
      <textarea
        id="journal"
        rows="6"
        className="w-full rounded-xl p-4 border border-leaf-green bg-transparent placeholder-star-yellow text-moon-gray shadow-inner focus:ring-2 focus:ring-leaf-green focus:outline-none resize-none transition"
        placeholder="Write your reflections, emotions, or experiences..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="mt-5 px-8 py-3 bg-leaf-green hover:bg-leaf-green/90 text-night-blue font-semibold rounded-full shadow-md transition flex items-center justify-center"
        aria-label="Submit journal entry"
      >
        Bloom 🌸
      </button>
    </form>
  );
}
