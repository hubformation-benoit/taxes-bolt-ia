/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          '50': '#97c8f9',
          '200': '#65abf5',
          '600': '#213e84',
          '700': '#213e84',
          '900': '#213e84',
        },
      },
    },
  },
  plugins: [],
};
