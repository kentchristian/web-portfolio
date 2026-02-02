import tailwindScrollbar from "tailwind-scrollbar";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all files in src for Tailwind classes
  ],
  theme: {
    extend: {}, // Place to add custom colors, spacing, fonts, etc.
  },
  plugins: [tailwindScrollbar],

};

export default config;
