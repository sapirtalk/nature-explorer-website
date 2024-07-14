
const {nextui} = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'serif': ['Rubik', 'serif'],
      },
      screens: {
        'sm': '640px', // Small screens, default: 640px
        'md': '768px', // Medium screens, default: 768px
        'lg': '1024px', // Large screens, default: 1024px
        'xl': '1280px', // Extra large screens, default: 1280px
      },
      colors: {
        'primary': '#EFEFED', // Primary color
        'secondary': '#04566E', // Secondary color
        'tertiary': '#004137', // Tertiary color
        'text': '#264027', // Text color
        'accent': '#B4D330', // Accent color
        'blocked': '#F2F2F2', // Blocked color
        'customBlue': '#3C82F6', // Blue color
        'customRed': '#F63C3C', // Red color

      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

