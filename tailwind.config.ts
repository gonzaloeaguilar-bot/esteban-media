import type { Config } from "tailwindcss";

// Tailwind v4 uses CSS-first config via @theme in app/globals.css.
// This file is kept minimal for tool compatibility (editor plugins, etc.).
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
  ],
};

export default config;
