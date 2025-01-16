/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: '1440px',
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      }, 
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'], // Add Mulish font
      },
      animation: {
        marquee: "marquee 10s linear infinite", // Adjust duration as needed
      },
    },
  },
  plugins: [],
};
