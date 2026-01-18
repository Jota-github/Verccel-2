/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "moura-blue": "#000040",
        "moura-yellow": "#f0ad00",
        "moura-yellowDark": "#d99d00",
      },
    },
  },
  plugins: [],
}
