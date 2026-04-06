// /** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");

// module.exports = withMT({
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     // themes: false,
//     // base: false,
//     styled: true,
//     themeRoot: "#daze",
//   },
// });

// tailwind.config.js
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
  // plugins: [require("daisyui")],
  // daisyui: {
  //   styled: false, // enable component classes (btn, card, etc.)
  //   base: false, // ⛔ disable global base styles
  //   utils: false, // ⛔ disable global utility injection
  //   logs: false,
  //   // themeRoot: "#daze", // DaisyUI scoped to your <div id="daze">
  // },
});
