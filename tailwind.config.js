/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      colors: {
        primary: '#d33',      // Example custom color
        secondary: 'black',    // Example custom color
        accent: '#673ab7',       // Example custom color
        'light-gray': '#f1f1f1', // Example custom color with hyphen
        'dark-gray': '#333333',  // Example custom color with hyphen
      },
    },
  },
  plugins: [],
};
