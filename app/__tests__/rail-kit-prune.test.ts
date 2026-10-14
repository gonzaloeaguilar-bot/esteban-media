import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const root = join(__dirname, "..", "..");
const require = createRequire(import.meta.url);
const prune = require(join(root, "scripts/postcss-rail-kit-prune.cjs"));
// postcss is not a direct dependency; use the copy Tailwind's PostCSS plugin
// runs with, which is the one the build uses.
const postcss = createRequire(require.resolve("@tailwindcss/postcss"))("postcss");

describe("rail-kit prune (render-blocking CSS, 2026-10-14)", () => {
  it("is wired into the PostCSS pipeline after Tailwind", () => {
    const config = readFileSync(join(root, "postcss.config.mjs"), "utf8");
    expect(config.indexOf("@tailwindcss/postcss")).toBeGreaterThan(-1);
    expect(config.indexOf("./scripts/postcss-rail-kit-prune.cjs")).toBeGreaterThan(
      config.indexOf("@tailwindcss/postcss"),
    );
  });

  it("keeps every kit component the site imports, found from source not a list", () => {
    const roots: Set<string> = prune.usedRoots();
    for (const used of ["rail-faq", "rail-disclosure", "rail-bottomnav", "rail-finder", "rail-price", "rail-reveal", "rail-anim"]) {
      expect(roots.has(used), used).toBe(true);
    }
  });

  it("only drops a selector that names a class nothing can render", () => {
    const roots = new Set(["rail-card"]);
    expect(prune.canMatch(".rail-card .rail-card__media", roots)).toBe(true);
    expect(prune.canMatch(".rail-versus__side", roots)).toBe(false);
    // Inside :not()/:is()/:has() or an attribute selector it is left alone.
    expect(prune.canMatch(".rail-card:not(.rail-versus)", roots)).toBe(true);
    expect(prune.canMatch("[data-rail-versus] .rail-card", roots)).toBe(true);
  });

  it("removes dead rules and empty media blocks, never keyframes", async () => {
    const css = `
      .rail-anim .rail-reveal{opacity:0}
      .rail-zzznotacomponent{color:red}
      .rail-reveal,.rail-zzznotacomponent__x{color:blue}
      @media (min-width:600px){.rail-zzznotacomponent{color:red}}
      @keyframes rail-zzznotacomponent-spin{from{opacity:0}to{opacity:1}}
    `;
    const out = (await postcss([prune()]).process(css, { from: undefined })).css;
    expect(out).toContain(".rail-anim .rail-reveal{opacity:0}");
    expect(out).toContain(".rail-reveal{color:blue}");
    expect(out).not.toContain("@media");
    expect(out).not.toMatch(/\.rail-zzznotacomponent\{/);
    expect(out).toContain("@keyframes rail-zzznotacomponent-spin");
  });
});
