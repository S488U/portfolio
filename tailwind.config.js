/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // gravis: ['gravis', 'sans-serif'],
        nature: ["nature", "Arial", "sans-serif"],
      },
      animation: {
        scaleUp: "scaleUp 1s linear infinite",
      },
      keyframes: {
        scaleUp: {
          "20%": { transform: "scaleY(1.5)", backgroundColor: "grey" },
          "40%": { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};
