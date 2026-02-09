/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'somansh-green': '#2E8B57',
        'somansh-gold': '#D4AF37',
        'marathi-dark': '#1A472A',
      },
      fontFamily: {
        'devanagari': ['Noto Sans Devanagari', 'sans-serif'],
        'marathi-calligraphy': ['Marathi Calligraphy', 'serif'],
      },
    },
  },
  plugins: [],
}