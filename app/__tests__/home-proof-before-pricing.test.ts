import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Proof comes before pricing on both home pages.
 *
 * A UX review found the portfolio rail, the property reels and the Google
 * reviews only appeared after ~7,000px of packages, real-estate plans,
 * à-la-carte, the three steps and the FAQ — under an eyebrow that already read
 * "First, the work". The order is: hero, audience router, the proof, then the
 * packages, then the reading-path fold.
 */
const source = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const HOMES = ["app/(english)/page.tsx", "app/(spanish)/es/page.tsx"] as const;
const PROOF = ["<PortfolioTeaser", "<ClientReviews"] as const;

describe("home — proof before pricing", () => {
  it.each(HOMES)("%s shows work and reviews before the optional detail", (page) => {
    const src = source(page);
    const hero = src.indexOf("<HeroVideo");
    const path = src.indexOf("<HomeProjectPath");
    const fold = src.indexOf("<KeepReading");
    const packages = src.indexOf("<PackagesSection");
    expect(hero).toBeGreaterThan(-1);
    expect(path).toBeGreaterThan(hero);
    expect(fold).toBeGreaterThan(path);
    expect(packages).toBeGreaterThan(-1);

    const present = PROOF.map((tag) => [tag, src.indexOf(tag)] as const).filter(([, i]) => i > -1);
    // The work and the reviews are on both homes; the reel shelf is optional.
    expect(present.map(([tag]) => tag)).toEqual(expect.arrayContaining(["<PortfolioTeaser", "<ClientReviews"]));
    for (const [tag, i] of present) {
      expect(i, `${tag} must come after the hero`).toBeGreaterThan(hero);
      expect(i, `${tag} must come before the long detail`).toBeLessThan(fold);
    }
    expect(src.indexOf("<PortfolioTeaser")).toBeLessThan(path);
  });

  it.each(HOMES)("%s keeps starting prices visible and full package detail optional", (page) => {
    const src = source(page);
    const packages = src.indexOf("<PackagesSection");
    const fold = src.indexOf("<KeepReading");
    const path = src.indexOf("<HomeProjectPath");
    expect(path).toBeLessThan(fold);
    expect(packages).toBeGreaterThan(fold);
    // The chooser still carries starting prices on the home page — but they
    // moved from an inline four-card grid into a fold, at the owner's request
    // (2026-10-12: "the prices should show up after, in some modal or sheet,
    // cause the pages that come after are so long I get lost trying to find
    // pricing").
    //
    // This used to assert that home-project-path.tsx called packagesFor and
    // priceFor — a file-location proxy for the real requirement, which is that
    // the prices are ON the home page and in its SERVER HTML. Asserting the
    // proxy would now be satisfied by dead code, so it asserts the property:
    // the chooser renders the price fold, and the fold reads the shared
    // sources rather than typing any figure of its own.
    const component = source("components/home-project-path.tsx");
    expect(component).toContain("<PriceSheet");
    const priceFold = source("components/price-sheet.tsx");
    expect(priceFold).toContain("packagesFor(locale)");
    expect(priceFold).toContain("priceFor(pkg.id)");
    // A native <details>: collapsed is not removed, unmounted is. A client
    // sheet would take every figure out of the server HTML.
    expect(priceFold).toContain("<details");
    expect(priceFold).not.toContain('"use client"');
  });
});
