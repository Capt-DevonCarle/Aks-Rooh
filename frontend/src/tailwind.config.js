/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'night-blue': '#0A1E3F',
        'star-yellow': '#FFE066',
        'leaf-green': '#6CA18F',
        'moon-gray': '#CBD5E1',
        'soft-purple': '#6B5B95',
      },
      backgroundImage: {
        'night-gradient': 'radial-gradient(circle at top, #0A1E3F, #171E3F 70%, #0A1E3F)'
      },
      animation: {
        'star-twinkle': 'twinkle 3s infinite ease-in-out',
        'leaf-drift': 'drift 10s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        drift: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(20px) rotate(10deg)' },
        },
      }
    },
  },
  plugins: [],
};
