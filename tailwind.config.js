module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        'xs2': '0.55rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
