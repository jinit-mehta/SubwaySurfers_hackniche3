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
        background: "#ffffff", // White background
        foreground: "#000000", // Black text (foreground)
        primary: "#1d4ed8", // Example primary color (blue)
        secondary: "#6b7280", // Example secondary color (gray)
      },
    },
  },
  plugins: [],
};
