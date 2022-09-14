/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      colors: {
        'jansen-purple': '#270d5b',
        'jansen-yellow': '#e9c142',
        'jansen-gray': '#b1b1b1',
      },
      boxShadow: {
        quiz: '2px 2px 3px #888',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
  important: '#root',
};
