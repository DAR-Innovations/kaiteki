/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#FC6055",
        banner: "#F8F5F5",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sarpanch: ["Sarpanch", "sans-serif"],
      },
      backgroundImage: {
        "landing-banner": "url('./assets/landing/banner.webp')",
      },
    },
  },
  plugins: [],
};
