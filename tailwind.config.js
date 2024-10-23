/** @type {import('tailwindcss').Config} */
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
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'brick-background': "url('/brick_wall.png')",
      },
      boxShadow: {
        'box-neon-pink': '0 4px 30px rgba(255, 0, 255, 0.7), 0 0 60px rgba(255, 57, 212, 0.7)', 
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-neon-pink': {
          textShadow: '0 0 30px rgba(255, 0, 255, 0.8), 0 0 30px rgba(255, 57, 212, 0.9)',
        },
'.text-stroke-pink': {
          '-webkit-text-stroke': '6px rgba(255, 57, 212, 1)',
        },
      });
    },
  ],
};