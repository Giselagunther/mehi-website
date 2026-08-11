import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "mehi-plum": "#8B2480",
        "mehi-plum-hover": "#7A1F6E",
        "mehi-neutral": "#F5F6FA",
        "mehi-bg": "#F5F6FA",
        "mehi-text": "#1A1A2E",
        "mehi-text-secondary": "#6B7280",
        "mehi-lavender": "#D8B4E2",
        "mehi-lila": "#B06AB3",
        "mehi-card-border": "#F0F0F5",
        "mehi-input-border": "#E5E7EB",
        "mehi-success": "#22C55E",
        "mehi-success-text": "#166534",
        "mehi-success-bg": "#F0FDF4",
        "mehi-warning": "#EAB308",
        "mehi-warning-text": "#854D0E",
        "mehi-warning-bg": "#FEFCE8",
        "mehi-error": "#EF4444",
        "mehi-error-hover": "#DC2626",
        "mehi-metric-bg": "#F9FAFB",
        "mehi-slate": "#6B8DB5",
        "mehi-plum-light": "#F3E8F9",
        "mehi-border": "#E8E8EC",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
