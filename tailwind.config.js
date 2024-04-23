/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'purple': '#8e24aa',
      'lgpurple': '#b36cc6',
      'lgpurple1':'#9b2eb8',
      'purplefocus': '#f0abfc',
      'purplefocus2': '#4c1d95',
      'purplewhite': '#f0e3f4',
      'black': '#000000',
      'white': '#ffffff',
      'gray': '#686161',
      'lgray': '#f6f6f6',
      'pink': '#c2185b',
      'dgray': '#535353'
    },
    fontFamily: {
      sans: ["Roboto", 'sans-serif']
    }
  },
  plugins: [],
}

