module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
      }),
      backdropBlur: {
        md: '12px',
      }
    },
  },
  variants: {
    extend: {
      backgroundImage: ['hover', 'focus'],
    }
  },
  plugins: [],
}