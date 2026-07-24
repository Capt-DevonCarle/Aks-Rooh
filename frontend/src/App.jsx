import React, { useState } from 'react';
import Layout from './components/Layout';
import NatureBackground from './components/NatureBackground';
import JournalEntryForm from './components/JournalEntryForm';
import EntryList from './components/EntryList';

export default function App() {
  const [entries, setEntries] = useState([]);

  const addEntry = (text) => {
    const newEntry = {
      id: Date.now(),
      text,
      date: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
  };

  return (
    <Layout>
      <NatureBackground />
      <main className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-12 max-w-3xl mx-auto text-moon-gray">
        <h1 className="text-5xl font-serif mb-8 text-star-yellow drop-shadow-lg select-none text-center">
          Aks Rooh - Soul Garden Journal
        </h1>
        <JournalEntryForm onSubmit={addEntry} />
        <EntryList entries={entries} />
      </main>
    </Layout>
  );
}
