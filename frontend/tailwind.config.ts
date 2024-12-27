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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        interactive: "var(--interactive)",
      },
    },
  },
  plugins: [],
} satisfies Config;
