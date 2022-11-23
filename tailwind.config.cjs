/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "nord-polarNight-0": "#2E3440",
      "nord-polarNight-1": "#3B4252",
      "nord-polarNight-2": "#434C5E",
      "nord-polarNight-3": "#4C566A",
      "nord-snowStorm-0": "#D8DEE9",
      "nord-snowStorm-1": "#E5E9F0",
      "nord-snowStorm-2": "#ECEFF4",
      "nord-frost-0": "#8FBCBB",
      "nord-frost-1": "#88C0D0",
      "nord-frost-2": "#81A1C1",
      "nord-frost-3": "#5E81AC",
      "nord-aurora-red": "#BF616A",
      "nord-aurora-orange": "#D08770",
      "nord-aurora-yellow": "#EBCB8B",
      "nord-aurora-gren": "#A3BE8C",
      "nord-aurora-purpple": "#B48EAD",
      "purpple": "#8957E5",
    },
    fontFamily: {
      "sans": ['Rubik', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
