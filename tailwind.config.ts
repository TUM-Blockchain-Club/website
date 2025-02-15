import { access } from "fs";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./.storybook/*.css",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.css",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-manrope)", "sans"],
        body: ["var(--font-inter)", "sans"],
        sans: ["var(--font-inter)", "sans"],
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(180deg, #030007 3.38%, rgba(3, 0, 7, 0.75) 44.44%, rgba(3, 0, 7, 0.00) 100%)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        interactive: "var(--interactive)",
        accent: "var(--accent)",
      },
      padding: {
        "4.5": "1.375rem",
      }
    },
  },
  plugins: [],
} satisfies Config;
