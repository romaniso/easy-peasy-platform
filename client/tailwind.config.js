/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      dropShadow: {
        purpleGlow: [
          "0 0px 10px rgba(165, 180, 252, 0.2)",
          "0 10px 5px rgba(165, 180, 252, 0.2)",
        ],
      },
      keyframes: {
        slidein: {
          "0%": { transform: "translateX(100%)" },
          "60%": { transform: "translateX(-15%)" },
          "80%": { transform: "translateX(5%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "slidein-toast": "slidein 0.4s linear forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
