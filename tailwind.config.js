module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        content: ["Nunito", "sans-serif"],
      },
      screens: {
        dark: {
          raw: "(prefers-color-scheme: dark)",
        },
        mobileOnly: "@media screen and (max-width: 768px)",
      },
      colors: {
        border: {
          input: "#cbd5e0",
        },
        body: {
          light: "#f7fafc",
        },
      },
      inset: {
        5: "0.125rem",
      },
    },
  },
  plugins: [require("tailwindcss-logical")],
};
