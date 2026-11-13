/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./royalarm-ai/app/**/*.{js,jsx,ts,tsx}",
    "./royalarm-ai/components/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
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
