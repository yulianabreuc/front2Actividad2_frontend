module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       colors: {
        'primary': '#6484A3',
        'secondary': '#CCACD2',
        'rosa': '#F7B9D2',
        'fucsia': '#FC648E',
        'marron': '#9D817B',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
