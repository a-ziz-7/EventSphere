/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Poppins", "sans-serif"],
      },
      colors: {
        primary: "#4F46E5", // Indigo for primary color
        secondary: "#6366F1", // Lighter Indigo for hover states
        accent: "#6EE7B7", // Accent color (greenish for subtle highlights)
        muted: "#9CA3AF", // Muted gray for less important text
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
