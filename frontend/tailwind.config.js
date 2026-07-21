/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: "#31594A",
        secondary: "#93B39A",
        accent: "#C8B8EA",
        gold: "#DDBD68",

        // Backgrounds
        background: "#F8F6F1",
        surface: "#FFFFFF",
        surfaceSoft: "#FCFBF8",

        // Dark Theme
        night: "#132128",

        // Text
        textPrimary: "#20342F",
        textSecondary: "#5D6D67",
        textMuted: "#8B9A94",

        // Status
        success: "#5A8F67",
        warning: "#E0A83A",
        danger: "#D46A6A",
        info: "#74A9D8",

        // Borders
        border: "#E8E4DB",
      },

      fontFamily: {
        heading: ["Cormorant Garamond", "serif"],
        body: ["Inter", "sans-serif"],
      },

      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        full: "9999px",
      },

      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",

        medium: "0 15px 40px rgba(0,0,0,0.08)",

        large: "0 25px 60px rgba(0,0,0,0.10)",

        glow: "0 0 25px rgba(221,189,104,.35)",
      },

      backgroundImage: {
        hero:
          "linear-gradient(180deg,#F8F6F1 0%,#EEF5EE 55%,#E8F0EA 100%)",

        garden:
          "radial-gradient(circle at top,#FFFFFF 0%,#F3F5EE 45%,#E4ECE3 100%)",

        night:
          "linear-gradient(180deg,#132128 0%,#1D3340 100%)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(.22,.61,.36,1)",
      },

      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },

      keyframes: {
        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-12px)",
          },
        },

        glow: {
          "0%,100%": {
            opacity: ".7",
          },
          "50%": {
            opacity: "1",
          },
        },

        bloom: {
          "0%": {
            transform: "scale(.5)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },

        fadeUp: {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },

        sway: {
          "0%,100%": {
            transform: "rotate(-2deg)",
          },
          "50%": {
            transform: "rotate(2deg)",
          },
        },
      },

      animation: {
        float: "float 6s ease-in-out infinite",

        glow: "glow 4s ease-in-out infinite",

        bloom: "bloom .8s ease forwards",

        fadeUp: "fadeUp .7s ease forwards",

        sway: "sway 5s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};