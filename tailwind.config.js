/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#30475E",
        "custom-light": "#30475E",
        "custom-white": "#2C394B",
        "custom-gray": "#222831",
        "custom-highlight": "#C84B31",
        "custom-cyan": "#29fcd2",
        "custom-yellow": "#fbf407",
        "custom-red": "#fb2431",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      animation: {
        blob: "blob 36s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
      width: {
        128: "32rem",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(fill|bg|text|border)-custom-(dark|light|white|gray|highlight|red|cyan|yellow)/,
    },
  ],
};
