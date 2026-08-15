import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: [
      "**/__tests__/**/*.test.ts",
      "**/*.test.ts",
      "**/*.test.mjs",
    ],
    exclude: [
      "node_modules",
      "**/node_modules/**",
      ".next",
      ".claude",
      "dist",
      ".worktrees",
      "**/.worktrees/**",
    ],
  },
  css: {
    // Tailwind v4 PostCSS plugin (@tailwindcss/postcss) is ESM-only and
    // breaks Vite's CJS loader inside Vitest. Tests don't touch CSS — skip it.
    postcss: { plugins: [] },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
