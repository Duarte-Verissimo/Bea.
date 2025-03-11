/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        "primary-dark": "#0284c7",
        secondary: "#10b981",
        "secondary-dark": "#059669",
        accent: "#8b5cf6",
        foreground: "#0f172a",
        card: "#ffffff",
        "card-foreground": "#1e293b",
        border: "#e2e8f0",
        input: "#000000",
        ring: "#94a3b8",
        error: "#ef4444",
      },
      fontFamily: {
        sans: [
          '"Open Sans"',
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
