/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            // keyframes: {
            //     'progress-bar':{
            //         "100%": {'stroke-dashoffset': '83'}
            //     }
            // },
            // animation: {
            //     'progress-bar':'progress-bar 2s linear forwards'
            // }
        },

    },
    plugins: [require("tailwind-scrollbar")],
}
