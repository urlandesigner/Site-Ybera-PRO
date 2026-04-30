import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        surface: {
          1: "rgb(var(--color-surface-1) / <alpha-value>)",
          2: "rgb(var(--color-surface-2) / <alpha-value>)",
        },
        ink: {
          strong: "rgb(var(--color-ink-strong) / <alpha-value>)",
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)",
          inverse: "rgb(var(--color-ink-inverse) / <alpha-value>)",
        },
        border: "rgb(var(--color-border) / <alpha-value>)",
        brand: {
          50: "rgb(var(--color-brand-50) / <alpha-value>)",
          100: "rgb(var(--color-brand-100) / <alpha-value>)",
          300: "rgb(var(--color-brand-300) / <alpha-value>)",
          500: "rgb(var(--color-brand-500) / <alpha-value>)",
          700: "rgb(var(--color-brand-700) / <alpha-value>)",
          900: "rgb(var(--color-brand-900) / <alpha-value>)",
        },
        accent: {
          gold: "rgb(var(--color-accent-gold) / <alpha-value>)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      spacing: {
        container: "var(--container-default)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        display: ["var(--font-family-display)"],
        mono: ["var(--font-family-mono)"],
      },
    },
  },
};

export default config;
