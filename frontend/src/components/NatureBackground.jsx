import React from 'react';

// Positions for stars scattered in the night sky
const starPositions = [
  'top-10 left-20', 'top-24 left-48', 'top-52 left-72',
  'top-40 right-32', 'top-16 right-16', 'top-80 left-36',
  'top-72 right-64', 'top-96 left-80',
];

export default function NatureBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-night-gradient overflow-hidden">
      {/* Twinkling stars */}
      {starPositions.map((pos, idx) => (
        <div
          key={idx}
          className={`absolute ${pos} w-1.5 h-1.5 bg-star-yellow rounded-full animate-star-twinkle`}
          style={{ animationDelay: `${idx * 0.5}s` }}
          aria-hidden="true"
        />
      ))}

      {/* Drifting leaves represented as small circles */}
      <div className="absolute bottom-0 left-10 w-6 h-6 bg-leaf-green rounded-full opacity-70 animate-leaf-drift" />
      <div
        className="absolute bottom-10 right-20 w-8 h-8 bg-leaf-green rounded-full opacity-60 animate-leaf-drift"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="absolute bottom-5 left-52 w-5 h-5 bg-leaf-green rounded-full opacity-50 animate-leaf-drift"
        style={{ animationDelay: '5s' }}
      />
    </div>
  );
}
