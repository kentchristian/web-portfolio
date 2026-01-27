import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all files in src for Tailwind classes
  ],
  theme: {
    extend: {}, // Place to add custom colors, spacing, fonts, etc.
  },
  plugins: [], // Add Tailwind plugins here
};

export default config;
