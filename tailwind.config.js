/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        bg: "#111111",
        text: "#ffffff",
        accent: "#ff004f",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        gloria: ["Gloria Hallelujah", "cursive"],
        tangerine: ["Tangerine", "cursive"],
      },
    },
  },
  plugins: [],
};
