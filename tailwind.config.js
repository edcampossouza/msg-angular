/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        darker: "#075e54",
        dark: "128c7e",
        main: "#25D366",
        light: "#dcf8c6",
        lighter: "#ece5dd",
      },
    },
  },
  plugins: [],
};
