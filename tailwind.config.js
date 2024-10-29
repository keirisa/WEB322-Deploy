/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/*.html',   // all .html files in the views folder
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['cupcake'],
  },
}

