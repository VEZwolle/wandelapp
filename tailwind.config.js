module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Merriweather', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      }
    }
  }
}
