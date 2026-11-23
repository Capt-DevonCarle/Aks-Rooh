import React from 'react';

const starPositions = [
  { top: '10%', left: '10%', size: '0.2rem', opacity: 0.95, delay: '0s' },
  { top: '20%', left: '45%', size: '0.16rem', opacity: 0.8, delay: '0.8s' },
  { top: '12%', left: '72%', size: '0.18rem', opacity: 0.9, delay: '1.4s' },
  { top: '34%', left: '28%', size: '0.15rem', opacity: 0.85, delay: '0.6s' },
  { top: '44%', left: '82%', size: '0.17rem', opacity: 0.92, delay: '1.9s' },
  { top: '56%', left: '18%', size: '0.14rem', opacity: 0.8, delay: '2.3s' },
  { top: '68%', left: '64%', size: '0.16rem', opacity: 0.88, delay: '1.2s' },
  { top: '82%', left: '40%', size: '0.19rem', opacity: 0.9, delay: '2.8s' },
  { top: '86%', left: '76%', size: '0.15rem', opacity: 0.84, delay: '0.4s' },
  { top: '5%', left: '30%', size: '0.12rem', opacity: 0.7, delay: '0.3s' },
  { top: '15%', left: '60%', size: '0.13rem', opacity: 0.75, delay: '1.1s' },
  { top: '25%', left: '15%', size: '0.11rem', opacity: 0.65, delay: '2.1s' },
  { top: '40%', left: '90%', size: '0.14rem', opacity: 0.7, delay: '0.9s' },
  { top: '50%', left: '5%', size: '0.12rem', opacity: 0.6, delay: '1.7s' },
  { top: '65%', left: '50%', size: '0.13rem', opacity: 0.72, delay: '2.5s' },
  { top: '75%', left: '85%', size: '0.11rem', opacity: 0.65, delay: '0.2s' },
  { top: '90%', left: '20%', size: '0.12rem', opacity: 0.6, delay: '1.9s' },
  { top: '95%', left: '55%', size: '0.1rem', opacity: 0.55, delay: '2.9s' },
];

const fireflyPositions = [
  { top: '22%', left: '16%', size: '0.35rem', delay: '0s', opacity: 0.9, duration: '3s' },
  { top: '30%', left: '68%', size: '0.25rem', delay: '1s', opacity: 0.8, duration: '3.5s' },
  { top: '46%', left: '34%', size: '0.28rem', delay: '1.8s', opacity: 0.85, duration: '2.8s' },
  { top: '62%', left: '80%', size: '0.24rem', delay: '2.3s', opacity: 0.75, duration: '4s' },
  { top: '74%', left: '24%', size: '0.3rem', delay: '0.8s', opacity: 0.8, duration: '3.2s' },
  { top: '40%', left: '56%', size: '0.22rem', delay: '2.7s', opacity: 0.7, duration: '3.7s' },
  { top: '15%', left: '84%', size: '0.2rem', delay: '0.5s', opacity: 0.75, duration: '4.2s' },
  { top: '55%', left: '10%', size: '0.26rem', delay: '1.4s', opacity: 0.8, duration: '2.9s' },
  { top: '70%', left: '72%', size: '0.22rem', delay: '2.1s', opacity: 0.7, duration: '3.8s' },
  { top: '88%', left: '48%', size: '0.2rem', delay: '3s', opacity: 0.65, duration: '3.3s' },
];

const fallingLeaves = [
  { left: '12%', delay: '0s', duration: '14s', size: '0.5rem', rotate: '15deg' },
  { left: '30%', delay: '4s', duration: '18s', size: '0.4rem', rotate: '-20deg' },
  { left: '55%', delay: '8s', duration: '16s', size: '0.45rem', rotate: '10deg' },
  { left: '78%', delay: '2s', duration: '20s', size: '0.35rem', rotate: '-12deg' },
  { left: '90%', delay: '6s', duration: '15s', size: '0.4rem', rotate: '25deg' },
  { left: '45%', delay: '10s', duration: '17s', size: '0.38rem', rotate: '-8deg' },
  { left: '65%', delay: '12s', duration: '19s', size: '0.32rem', rotate: '18deg' },
  { left: '20%', delay: '14s', duration: '13s', size: '0.42rem', rotate: '-15deg' },
];

const floatingSeedPositions = [
  { left: '8%', delay: '2s', duration: '25s', top: '60%' },
  { left: '40%', delay: '7s', duration: '30s', top: '45%' },
  { left: '70%', delay: '12s', duration: '28s', top: '55%' },
  { left: '92%', delay: '5s', duration: '22s', top: '40%' },
  { left: '25%', delay: '15s', duration: '26s', top: '35%' },
  { left: '55%', delay: '3s', duration: '32s', top: '50%' },
];

const flowerPositions = [
  { top: '78%', left: '12%', color: '#8f3f67', size: '2rem', delay: '0s' },
  { top: '80%', left: '36%', color: '#b54d83', size: '1.7rem', delay: '0.6s' },
  { top: '76%', left: '64%', color: '#7f4f8f', size: '1.9rem', delay: '1.2s' },
  { top: '82%', left: '88%', color: '#c75a8a', size: '1.5rem', delay: '0.3s' },
  { top: '79%', left: '50%', color: '#9a4f7a', size: '1.6rem', delay: '0.9s' },
  { top: '84%', left: '22%', color: '#a04477', size: '1.3rem', delay: '1.5s' },
];

const petalPositions = [
  { top: '72%', left: '18%', delay: '0s', size: '0.35rem', duration: '4s' },
  { top: '76%', left: '44%', delay: '1.2s', size: '0.3rem', duration: '5s' },
  { top: '70%', left: '70%', delay: '2s', size: '0.25rem', duration: '3.5s' },
  { top: '82%', left: '84%', delay: '0.7s', size: '0.28rem', duration: '4.5s' },
  { top: '85%', left: '30%', delay: '3s', size: '0.22rem', duration: '5.5s' },
  { top: '74%', left: '56%', delay: '1.8s', size: '0.26rem', duration: '3.8s' },
];

const leafPositions = [
  { top: '74%', left: '30%', delay: '0.5s', rotate: '18deg' },
  { top: '82%', left: '58%', delay: '1.8s', rotate: '-24deg' },
  { top: '78%', left: '90%', delay: '2.6s', rotate: '12deg' },
  { top: '80%', left: '8%', delay: '1s', rotate: '-10deg' },
  { top: '76%', left: '78%', delay: '3s', rotate: '22deg' },
];

const treePositions = [
  { left: '4%', scale: 0.95 },
  { left: '24%', scale: 0.8 },
  { left: '72%', scale: 0.9 },
  { left: '88%', scale: 0.72 },
  { left: '48%', scale: 0.65 },
];

const nebulaStarPositions = [
  { top: '8%', left: '15%', size: '0.3rem', opacity: 0.9, delay: '0s' },
  { top: '22%', left: '78%', size: '0.25rem', opacity: 0.85, delay: '0.6s' },
  { top: '35%', left: '42%', size: '0.28rem', opacity: 0.9, delay: '1.2s' },
  { top: '48%', left: '88%', size: '0.22rem', opacity: 0.8, delay: '1.8s' },
  { top: '60%', left: '25%', size: '0.26rem', opacity: 0.85, delay: '2.4s' },
  { top: '72%', left: '65%', size: '0.2rem', opacity: 0.8, delay: '3s' },
  { top: '85%', left: '35%', size: '0.24rem', opacity: 0.75, delay: '0.9s' },
  { top: '15%', left: '55%', size: '0.18rem', opacity: 0.7, delay: '1.5s' },
  { top: '42%', left: '8%', size: '0.22rem', opacity: 0.8, delay: '2.1s' },
  { top: '55%', left: '72%', size: '0.2rem', opacity: 0.75, delay: '2.7s' },
  { top: '90%', left: '58%', size: '0.16rem', opacity: 0.7, delay: '3.3s' },
  { top: '68%', left: '12%', size: '0.18rem', opacity: 0.75, delay: '0.3s' },
];

const nebulaClouds = [
  { top: '10%', left: '5%', size: '35rem', color: 'rgba(200, 160, 240, 0.12)', duration: '20s' },
  { top: '30%', left: '60%', size: '28rem', color: 'rgba(180, 140, 220, 0.1)', duration: '25s' },
  { top: '55%', left: '20%', size: '30rem', color: 'rgba(220, 180, 250, 0.08)', duration: '22s' },
  { top: '75%', left: '70%', size: '25rem', color: 'rgba(160, 120, 200, 0.1)', duration: '28s' },
];

export default function NatureBackground({ showBloom = false, theme = 'night' }) {
  const isDay = theme === 'day';

  if (isDay) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Forest canopy gradient — deep dark greens and warm gold */}
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 20% 10%, #4a6a2a 0%, #2a4a1a 20%, #143010 45%, #0a1a08 70%, #050d04 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 80% 30%, rgba(200, 170, 60, 0.12), transparent 50%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(100, 140, 60, 0.08) 0%, rgba(180, 150, 60, 0.04) 50%, rgba(60, 100, 30, 0.08) 100%)' }}
        />

        {/* Golden fireflies */}
        {fireflyPositions.map((firefly, index) => (
          <div
            key={`gold-firefly-${index}`}
            className="absolute rounded-full"
            style={{
              top: firefly.top,
              left: firefly.left,
              width: firefly.size,
              height: firefly.size,
              backgroundColor: '#ffdd55',
              opacity: firefly.opacity,
              animation: `dayFireflyFloat ${firefly.duration} ease-in-out infinite`,
              animationDelay: firefly.delay,
              boxShadow: '0 0 12px 3px rgba(255, 210, 60, 0.7)',
            }}
            aria-hidden="true"
          />
        ))}

        {/* Sun glow */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(255, 220, 100, 0.6) 0%, rgba(255, 200, 60, 0.25) 30%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          className="absolute top-12 right-[22%] w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 235, 150, 0.5) 0%, rgba(255, 200, 100, 0.15) 50%, transparent 70%)',
            filter: 'blur(5px)',
          }}
        />
        <div
          className="absolute top-8 right-[20%] w-12 h-12 rounded-full"
          style={{
            background: 'radial-gradient(circle, #fff7d4 0%, #ffe477 50%, transparent 70%)',
            boxShadow: '0 0 40px rgba(255, 220, 80, 0.5)',
          }}
        />

        {/* Golden light rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <div
            key={`ray-${i}`}
            className="absolute top-8 right-[20%]"
            style={{
              width: '2px',
              height: `${120 + i * 20}px`,
              background: 'linear-gradient(180deg, rgba(255, 220, 80, 0.15), transparent)',
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: 'top center',
              opacity: 0.6,
              animation: `rayPulse ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        {/* Floating golden orbs / pollen */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`pollen-${i}`}
            className="absolute rounded-full"
            style={{
              top: `${15 + i * 7}%`,
              left: `${5 + i * 8}%`,
              width: `${0.2 + Math.random() * 0.2}rem`,
              height: `${0.2 + Math.random() * 0.2}rem`,
              background: 'radial-gradient(circle, #ffe477, #f5d090)',
              opacity: 0.4 + Math.random() * 0.3,
              boxShadow: '0 0 6px rgba(255, 220, 80, 0.3)',
              animation: `pollenFloat ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Drifting leaves */}
        {fallingLeaves.slice(0, 6).map((leaf, index) => (
          <div
            key={`summer-leaf-${index}`}
            className="absolute"
            style={{
              top: `${10 + index * 12}%`,
              left: leaf.left,
              width: leaf.size,
              height: leaf.size * 1.4,
              background: `linear-gradient(135deg, ${index % 2 === 0 ? '#6a9f45' : '#8fa54a'}, ${index % 2 === 0 ? '#4a7f3f' : '#6f8f3f'})`,
              borderRadius: '100% 0 100% 0',
              opacity: 0.5,
              animation: `leafFall ${12 + index * 3}s linear infinite`,
              animationDelay: `${index * 2}s`,
              transform: `rotate(${index * 30}deg)`,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Ground canopy */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(20, 60, 16, 0.25) 40%, rgba(15, 45, 12, 0.35) 100%)',
            filter: 'blur(10px)',
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-12 opacity-60">
          <div className="absolute bottom-0 left-0 right-0 h-3 rounded-t-full" style={{ background: 'rgba(60, 100, 40, 0.3)' }} />
          <div className="absolute bottom-2 left-0 right-0 h-2" style={{ background: 'rgba(50, 80, 30, 0.2)' }} />
        </div>

        {/* Warm mist */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(200, 220, 150, 0.1) 40%, rgba(180, 200, 120, 0.18) 100%)',
            filter: 'blur(20px)',
            animation: 'mistDrift 12s ease-in-out infinite alternate',
          }}
        />

        <style>{`
          @keyframes pollenFloat {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
            50% { transform: translateY(-10px) translateX(-8px); opacity: 0.5; }
            75% { transform: translateY(-25px) translateX(15px); opacity: 0.6; }
          }
          @keyframes leafFall {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(30vh) rotate(180deg) translateX(20px); opacity: 0.3; }
            100% { transform: translateY(70vh) rotate(360deg) translateX(-15px); opacity: 0; }
          }
          @keyframes rayPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
          @keyframes dayFireflyFloat {
            0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
            25% { transform: translateY(-10px) translateX(6px) scale(1.1); opacity: 0.9; }
            50% { transform: translateY(-5px) translateX(-4px) scale(1.15); opacity: 0.8; }
            75% { transform: translateY(-15px) translateX(3px) scale(1.05); opacity: 0.7; }
          }
          @keyframes mistDrift {
            0% { transform: translateX(-5%) scaleX(0.97); }
            100% { transform: translateX(5%) scaleX(1.03); }
          }
        `}</style>
      </div>
    );
  }

  // NIGHT MODE — Dark purple midnight with moon
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Deep purple midnight sky */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at top, #1a1035 0%, #0f0725 35%, #080315 70%, #030108 100%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at top, rgba(180, 140, 255, 0.10), transparent 50%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(60, 20, 100, 0.12) 0%, rgba(20, 10, 40, 0.4) 100%)' }}
      />

      {/* Glowing moon with purple halo */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(220, 200, 255, 0.3) 0%, rgba(180, 150, 230, 0.12) 28%, transparent 65%)',
          filter: 'blur(12px)',
        }}
      />
      <div
        className="absolute top-16 right-[18%] w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(230, 215, 255, 0.4) 0%, rgba(200, 170, 240, 0.12) 50%, transparent 70%)',
          filter: 'blur(3px)',
        }}
      />
      <div
        className="absolute top-16 right-[18%] w-10 h-10 rounded-full"
        style={{
          background: 'radial-gradient(circle, #e8dcff 0%, #c4a8f0 60%, transparent 80%)',
          boxShadow: '0 0 30px rgba(200, 170, 255, 0.4)',
        }}
      />

      {/* Purple mist */}
      <div
        className="absolute bottom-0 left-0 right-0 h-52"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(150, 100, 200, 0.10) 40%, rgba(100, 60, 160, 0.18) 100%)',
          filter: 'blur(25px)',
          opacity: 0.6,
          animation: 'purpleMist 10s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(120, 70, 180, 0.06) 100%)',
          filter: 'blur(30px)',
          opacity: 0.4,
          animation: 'purpleMist2 15s ease-in-out infinite alternate',
        }}
      />

      {/* Purple-tinted stars */}
      {starPositions.map((star, index) => (
        <div
          key={`star-${index}`}
          className="absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            backgroundColor: '#d4c0ff',
            boxShadow: '0 0 8px rgba(200, 170, 255, 0.7)',
            animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: star.delay,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Silver fireflies */}
      {fireflyPositions.map((firefly, index) => (
        <div
          key={`firefly-${index}`}
          className="absolute rounded-full"
          style={{
            top: firefly.top,
            left: firefly.left,
            width: firefly.size,
            height: firefly.size,
            backgroundColor: '#e8e0f8',
            opacity: firefly.opacity,
            animation: `fireflyFloat ${firefly.duration} ease-in-out infinite`,
            animationDelay: firefly.delay,
            boxShadow: '0 0 13px 3px rgba(200, 190, 230, 0.6)',
          }}
          aria-hidden="true"
        />
      ))}

      {/* Dark falling leaves */}
      {fallingLeaves.map((leaf, index) => (
        <div
          key={`falling-leaf-${index}`}
          className="absolute"
          style={{
            top: '-5%',
            left: leaf.left,
            width: leaf.size,
            height: leaf.size * 1.4,
            background: `linear-gradient(135deg, ${index % 2 === 0 ? '#3a2050' : '#2a1540'}, ${index % 2 === 0 ? '#2a1840' : '#1a0e30'})`,
            borderRadius: '100% 0 100% 0',
            opacity: 0.4,
            animation: `fallingLeaf ${leaf.duration} linear infinite`,
            animationDelay: leaf.delay,
            transform: `rotate(${leaf.rotate})`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Floating seeds - purple */}
      {floatingSeedPositions.map((seed, index) => (
        <div
          key={`seed-${index}`}
          className="absolute"
          style={{
            top: seed.top,
            left: seed.left,
            width: '0.15rem',
            height: '0.3rem',
            background: 'radial-gradient(circle, #d4c0ff, transparent)',
            borderRadius: '50%',
            opacity: 0.2,
            animation: `floatingSeed ${seed.duration} ease-in-out infinite`,
            animationDelay: seed.delay,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Bloom animation */}
      {showBloom ? <div className="firefly-bloom-scene" style={{
        position: 'absolute', inset: 'auto auto 12vh 56vw', width: '10rem', height: '10rem',
        pointerEvents: 'none', opacity: 0.95, animation: 'fireflyBloomTravel 9s ease-in-out infinite'
      }} aria-hidden="true">
        <div className="firefly-bloom-glow" style={{
          position: 'absolute', inset: '50% auto auto 50%', width: '5rem', height: '5rem',
          borderRadius: '999px', background: 'radial-gradient(circle, rgba(200, 170, 255, 0.9) 0%, rgba(180, 140, 240, 0.35) 45%, transparent 70%)',
          transform: 'translate(-50%, -50%)', animation: 'fireflyBloomPulse 2.2s ease-in-out infinite'
        }} />
        <div className="firefly-bloom-core" style={{
          position: 'absolute', inset: '50% auto auto 50%', width: '1rem', height: '1rem',
          borderRadius: '999px', background: '#dcc4ff', transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 18px rgba(200, 170, 255, 0.9)'
        }} />
        <div className="firefly-bloom-flower" style={{
          position: 'absolute', inset: '50% auto auto 50%', width: '2.5rem', height: '2.5rem',
          borderRadius: '999px', background: 'radial-gradient(circle, #c89ff0 0%, #8a5fc0 65%, #5a3080 100%)',
          transform: 'translate(-50%, -50%)', opacity: 0, animation: 'fireflyBloomFlower 9s ease-in-out infinite'
        }} />
      </div> : null}

      {/* Ground - deep purple */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(20, 8, 40, 0.3) 45%, rgba(10, 4, 25, 0.15) 100%)',
          backdropFilter: 'blur(3px)',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-14 opacity-60">
        <div className="absolute bottom-0 left-0 right-0 h-3 rounded-t-full" style={{ background: 'rgba(60, 30, 90, 0.25)' }} />
        <div className="absolute bottom-2 left-0 right-0 h-2" style={{ background: 'rgba(40, 20, 70, 0.15)' }} />
      </div>

      {/* Ambient purple glow */}
      <div
        className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(150, 80, 200, 0.15) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 left-0 w-32 h-32 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(200, 150, 255, 0.12) 0%, transparent 70%)' }}
      />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes fireflyFloat {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.6; }
          25% { transform: translateY(-12px) translateX(8px) scale(1.1); opacity: 0.9; }
          50% { transform: translateY(-6px) translateX(-5px) scale(1.15); opacity: 0.8; }
          75% { transform: translateY(-18px) translateX(4px) scale(1.05); opacity: 0.7; }
        }
        @keyframes fallingLeaf {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(50vh) rotate(180deg) translateX(30px); opacity: 0.25; }
          100% { transform: translateY(110vh) rotate(360deg) translateX(-20px); opacity: 0; }
        }
        @keyframes floatingSeed {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          25% { transform: translateY(-15px) translateX(20px); opacity: 0.4; }
          50% { transform: translateY(-30px) translateX(-15px); opacity: 0.25; }
          75% { transform: translateY(-10px) translateX(25px); opacity: 0.35; }
        }
        @keyframes leafSway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes purpleMist {
          0% { transform: translateX(-8%) scaleX(0.96); }
          100% { transform: translateX(8%) scaleX(1.04); }
        }
        @keyframes purpleMist2 {
          0% { transform: translateX(5%) scaleX(1.02); }
          100% { transform: translateX(-5%) scaleX(0.98); }
        }
        @keyframes fireflyBloomTravel {
          0% { transform: translate3d(-20px, 0, 0) scale(0.8); opacity: 0; }
          18% { opacity: 0.95; }
          58% { transform: translate3d(32vw, -8vh, 0) scale(1.04); opacity: 1; }
          80% { transform: translate3d(54vw, 10vh, 0) scale(0.95); opacity: 0.8; }
          100% { transform: translate3d(72vw, 18vh, 0) scale(0.2); opacity: 0; }
        }
        @keyframes fireflyBloomPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
        }
        @keyframes fireflyBloomFlower {
          0%, 70% { transform: translate(-50%, -50%) scale(0.08); opacity: 0; }
          82% { transform: translate(-50%, -50%) scale(0.94); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.04); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
