import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  // The vendored rail-kit writes JSX without importing React, which is correct
  // for the automatic runtime Next compiles with. Vitest defaults to the
  // classic transform, so those files threw "React is not defined" the moment
  // a test imported a component that reaches RailCard. Matching Next here is
  // the fix; editing vendor/rail-kit is not — it is pinned by a hash and
  // shared with the other sites that use the kit.
  esbuild: { jsx: "automatic" },
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
