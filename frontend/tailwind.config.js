/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: { //elements up and down in loop
        float: "float 6s ease-in-out infinite",
        floatSlow: "float 10s ease-in-out infinite",
      },
      keyframes: { //floating elements on login page
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
}

