// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
        'scroll-mobile': 'scroll 60s linear infinite',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif']
      },
    },
  },
  plugins: [],
};