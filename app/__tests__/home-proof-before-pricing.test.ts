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
const PROOF = ["<PortfolioTeaser", "<RealEstateReels", "<ClientReviews"] as const;

describe("home — proof before pricing", () => {
  it.each(HOMES)("%s renders the proof after the router and before the packages", (page) => {
    const src = source(page);
    const router = src.indexOf("<AudienceRouter");
    const packages = src.indexOf("<PackagesSection");
    expect(router).toBeGreaterThan(-1);
    expect(packages).toBeGreaterThan(-1);

    const present = PROOF.map((tag) => [tag, src.indexOf(tag)] as const).filter(([, i]) => i > -1);
    // The work and the reviews are on both homes; the reel shelf is optional.
    expect(present.map(([tag]) => tag)).toEqual(expect.arrayContaining(["<PortfolioTeaser", "<ClientReviews"]));
    for (const [tag, i] of present) {
      expect(i, `${tag} must come after <AudienceRouter`).toBeGreaterThan(router);
      expect(i, `${tag} must come before <PackagesSection`).toBeLessThan(packages);
    }
  });

  it.each(HOMES)("%s keeps the packages outside and ahead of the reading-path fold", (page) => {
    const src = source(page);
    const packages = src.indexOf("<PackagesSection");
    const fold = src.indexOf("<KeepReading");
    expect(fold).toBeGreaterThan(packages);
  });
});
