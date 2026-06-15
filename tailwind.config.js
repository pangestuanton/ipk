/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        itera: {
          red: '#8B0000',
          gold: '#FFD700',
        }
      }
    },
  },
  plugins: [],
}
