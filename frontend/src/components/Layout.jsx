import React from 'react';

export default function Layout({ children, theme = 'night' }) {
  const isDay = theme === 'day';
  return (
    <div
      className="min-h-screen overflow-hidden relative font-serif flex flex-col"
      style={{
        background: isDay
          ? 'linear-gradient(180deg, #0e1f0e 0%, #1a3d1a 30%, #3a3820 70%, #142210 100%)'
          : 'linear-gradient(180deg, #0d0a1a 0%, #1a0f2e 35%, #120825 65%, #070312 100%)',
        color: isDay ? '#eef5e6' : '#e8e0f0',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: isDay
            ? 'linear-gradient(180deg, rgba(255,230,180,0.25) 0%, rgba(200,255,150,0.08) 50%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(180,150,255,0.06) 0%, transparent 100%)'
        }}
      />
      {children}
    </div>
  );
}

