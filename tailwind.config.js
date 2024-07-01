
const {nextui} = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/components/slider.js",
    "./node_modules/@nextui-org/theme/dist/components/switch.js",
    "./node_modules/@nextui-org/theme/dist/components/checkbox.js",
    "./node_modules/@nextui-org/theme/dist/components/tooltip.js",
    "./node_modules/@nextui-org/theme/dist/components/spacer.js",
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
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
        'primary': '#D8DFE9', // Primary color
        'secondary': '#04566E', // Secondary color
        'tertiary': '#B8E4BE', // Tertiary color
        'text': '#264027', // Text color
        'accent': '#B4D330', // Accent color
        'blocked': '#F2F2F2', // Blocked color
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

