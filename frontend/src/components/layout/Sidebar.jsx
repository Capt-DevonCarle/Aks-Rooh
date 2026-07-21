import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="bg-night-blue min-h-screen overflow-hidden relative text-moon-gray font-serif">
      {children}
      {/* We can add fixed decorative overlays here in future */}
    </div>
  );
}
