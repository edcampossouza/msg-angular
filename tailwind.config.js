/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        darker: "#1f1f1f",
        dark: "#3f3f3f",
        main: "#25D366",
        light: "#cce8b6",
        lighter: "#ece5dd",
        accent: "#569cd6",
      },
    },
  },
  plugins: [],
};
