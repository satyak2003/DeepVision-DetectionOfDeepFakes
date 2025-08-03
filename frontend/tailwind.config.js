/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0A192F',
        'darker-blue': '#060C18',
      },
    },
  },
  plugins: [],
}