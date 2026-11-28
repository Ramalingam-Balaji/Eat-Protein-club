/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        protein: {
          green: "rgb(var(--ep-primary-rgb) / <alpha-value>)",
          hover: "rgb(var(--ep-primary-hover-rgb) / <alpha-value>)",
          dark: "rgb(var(--ep-dark-rgb) / <alpha-value>)",
          footer: "rgb(var(--ep-footer-rgb) / <alpha-value>)",
          lime: "rgb(var(--ep-lime-rgb) / <alpha-value>)",
          soft: "rgb(var(--ep-tint-rgb) / <alpha-value>)",
          tint: "rgb(var(--ep-tint-strong-rgb) / <alpha-value>)",
          surface: "rgb(var(--ep-surface-rgb) / <alpha-value>)",
          orange: "rgb(var(--ep-accent-rgb) / <alpha-value>)",
          orange2: "rgb(var(--ep-accent-hover-rgb) / <alpha-value>)",
          gold: "rgb(var(--ep-gold-rgb) / <alpha-value>)",
          text: "rgb(var(--ep-text-rgb) / <alpha-value>)",
          muted: "rgb(var(--ep-muted-rgb) / <alpha-value>)",
          border: "rgb(var(--ep-border-rgb) / <alpha-value>)",
        },
      },
      boxShadow: {
        soft: "0 14px 40px rgb(var(--ep-dark-rgb) / 0.09)",
        card: "0 6px 22px rgb(var(--ep-dark-rgb) / 0.06)",
      },
    },
  },
  plugins: [],
};