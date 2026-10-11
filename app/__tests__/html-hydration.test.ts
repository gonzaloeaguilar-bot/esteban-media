import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Every root <html> has to tolerate the attributes the head scripts add.
 *
 * SiteChrome's motion gate and brand-moment boot run before paint and set
 * `class="rail-anim"` and `data-brand-moment` on <html>. React then compares
 * that element with the server HTML, finds attributes it did not render, and
 * logs "A tree hydrated but some attributes ... didn't match" on every route.
 * The dev overlay showed it as "1 Issue" on the home page.
 *
 * suppressHydrationWarning on <html> covers that one element's own attributes
 * only; mismatches anywhere below it are still reported.
 */
const ROOTS = ["app/(english)/layout.tsx", "app/(spanish)/layout.tsx", "app/global-not-found.tsx"];

describe("root <html> hydration", () => {
  it.each(ROOTS)("%s suppresses the head-script attribute mismatch", (path) => {
    const src = readFileSync(join(process.cwd(), path), "utf8");
    expect(src).toMatch(/<html lang="[^"]+" suppressHydrationWarning>/);
  });
});
