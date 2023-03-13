/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4C214C",
        secondary: "#FCF3FA",
        tertiary: "#E29BD7",
      },
      fontFamily: {
        "poppins": ['Poppins', "sans-serif"],
      }
    },
  },
  plugins: [],
}
