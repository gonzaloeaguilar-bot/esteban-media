import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

/**
 * The homepage must actually RENDER the art-directed reviews band.
 *
 * Why this test exists. On 2026-10-13 the owner asked for the reviews heading
 * to stop saying "verified" twice. PR #393 changed it, CI was green, and a
 * production curl confirmed it live. Then PR #395 — de-duplicating reviews,
 * for good reasons — dropped the `compact` prop from both homepages. The
 * heading only existed in the compact variant, so the owner's change silently
 * stopped shipping, and the whole band (full-bleed ink, the real reel posters,
 * the credit roll, the oversized rating) rendered on NO page at all.
 *
 * Every component-level test still passed, because the component was still
 * correct. A VARIANT FIX IS NOT A COMPONENT FIX, and the inverse bites too:
 * testing the component cannot prove the PAGE still uses it. So this asserts
 * the call site.
 */
describe("the reviews band ships on the homepage", () => {
  const homes = [
    ["app/(english)/page.tsx", "en"],
    ["app/(spanish)/es/page.tsx", "es"],
  ] as const;

  it.each(homes)("%s renders ClientReviews with the band variant", (page, locale) => {
    const src = source(page);
    expect(src).toContain(`<ClientReviews locale="${locale}" compact />`);
  });

  it.each(homes)("%s renders the reviews exactly once", (page) => {
    // The band IS the proof at the decision. A second full section below it is
    // the duplication PR #395 removed on purpose — do not let it return.
    expect(source(page).split("<ClientReviews").length - 1).toBe(1);
  });

  it("the band variant is the one carrying the owner's heading", () => {
    // If someone renames the heading again, this fails here rather than
    // silently on the live page.
    const src = source("components/client-reviews.tsx");
    expect(src).toContain("a perfect 5.0");
    expect(src).toContain("5.0 perfecto");
  });
});
