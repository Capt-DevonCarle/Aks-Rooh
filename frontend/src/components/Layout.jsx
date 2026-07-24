import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="bg-night-blue min-h-screen overflow-hidden relative text-moon-gray font-serif flex flex-col">
      {children}
    </div>
  );
}
