module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      // 👇 Add CSS variables
      heading: ["var(--font-heading)"],
      body: ["var(--font-body)"],
    },
    colors: {
      primary: {
        light: "#FFFFFF",
        DEFAULT: "#FFD700",          
        dark: "#171717",
      },
      colored: {
        light: "#f3efe6",
        dark: "#0D47A1",
      },
      gray: {
        100: "#f7f7f7",
        200: "#E5E5E5",
        300: "#bcbcbb",
        600: "#666666",
      },

    },

    extend: {
      spacing: {
        70: "17.5rem",
        175: "43.75rem",
      },
    },
  },
  

  plugins: [],
};
