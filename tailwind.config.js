/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tiltNeon: ['"Tilt Neon"', 'cursive'], 
        montserrat: ['"Montserrat"', 'sans-serif'],
        girlNextDoor: ['var(--font-girl-next-door)', 'cursive'],
        sixtyFour: ['"Sixtyfour"','sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        neonPink: "#FF38D",
      },
      backgroundImage: {
        'brick-background': "url('/brick_wall.png')",
      },
      boxShadow: {
        'box-neon-pink': '0 4px 10px rgba(255, 0, 255, 0.7), 0 0 60px rgba(255, 57, 212, 0.7)', 
        'scintillant': '0 0 10px rgba(255, 255, 200, 0.5), 0 0 20px rgba(255, 255, 200, 0.4)',
      },
      dropShadow: {
        'solid-pink': '[5px_5px_0px_0px_rgba(109,40,217,1)]', 
      },
      animation: {
        twinkle: 'twinkle 2s infinite alternate',
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-neon-pink': {
          textShadow: '0 0 10px rgba(255, 0, 255, 0.8), 0 0 5px rgba(255, 57, 212, 0.9)',
        },
        '.text-shadow-scintillant': {
          textShadow: '0 0 10px rgba(255, 255, 200, 1), 0 0 10px rgba(255, 255, 200, 0.7)',
        },
        '.text-stroke-pink': {
          '-webkit-text-stroke': '6px rgba(255, 57, 212, 1)',
        },
        '.text-shadow-neon-purple': {
          textShadow: '0 0 10px rgba(67, 0, 134, 0.8), 0 0 10px rgba(67, 0, 134, 0.6), 0 0 10px rgba(67, 0, 134, 0.5)',
        },
        '.text-stroke-purple': {
          '-webkit-text-stroke': '2px rgba(67, 0, 134, 1)', 
        },
        '.font-bled-0': {
          fontVariationSettings: '"BLED" 0',
        },
        '.font-bled-1': {
          fontVariationSettings: '"BLED" 1',
        },
        '.font-bled-2': {
          fontVariationSettings: '"BLED" 2',
        },
        '.font-scan-0': {
          fontVariationSettings: '"SCAN" -5',
        },
        '.font-scan-1': {
          fontVariationSettings: '"SCAN" 1',
        },
        '.font-scan-2': {
          fontVariationSettings: '"SCAN" 2',
        },
        '.font-bled-1-scan-1': {
          fontVariationSettings: '"BLED" 1, "SCAN" 1',
        },
        '.outline-scintillant': {
          outline: '25px dotted rgba(255, 255, 200, 0.8)',
          'outline-offset': '0px',
          'border-radius': '20px',
          'box-shadow': '0 0 10px rgba(255, 255, 200, 0.5), 0 0 20px rgba(255, 255, 200, 0.4)',
          animation: 'twinkle 2s infinite alternate',
        },
      });
    })
  ],
};
