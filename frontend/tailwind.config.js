/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": "'Montserrat', sans-serif",
        "josefin-slab": "'Josefin Slab', serif",
        "comfortaa": "'Comfortaa', sans-serif",
        "seaweed-script-regular": "'Seaweed Script', cursive"
      }
    },
  },
  plugins: [],
}

