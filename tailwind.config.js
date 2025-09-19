/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          '50': '#f6f8fd',
          '200': '#3965ce',
          '600': '#315bc3',
          '700': '#294da3',
          '900': '#213E84',
        },
      },
    },
  },
  plugins: [],
};
