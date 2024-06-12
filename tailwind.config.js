/** @type {import('tailwindcss').Config} */

const colors = require("./src/theme/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        exo: ["Exo2", "sans-serif"],
      },
    },
  },
  plugins: [],
};
