/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Make sure this is included for all your React components
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playwrite: ['Playwrite GB S', 'serif'],
      },
    },
  },
  plugins: [],
}
