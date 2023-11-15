/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  //  theme: {
  //     colors: {
  //       primary: colors.indigo,
  //       secondary: colors.yellow,
  //     }
  //  },
  plugins: [require("tailwind-scrollbar")],
};
