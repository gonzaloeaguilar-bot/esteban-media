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
    // The chooser answers price ONCE, inside each lane's own `+` disclosure,
    // at the owner's explicit request (2026-10-12: "i also wish i would right
    // there tell me prices and tldr vs going into another page for more
    // info"). It used to ALSO carry a second, full price breakdown
    // (`<PriceSheet>`) directly below — the same figures in a different
    // visual language in the same section — which the 2026-10-13
    // art-direction review flagged as answering price twice. That second
    // surface is gone from this component; the per-lane answer (read from
    // the same lib/pricing.ts / lib/packages.ts source, never typed) is now
    // the ONE price surface in the chooser's server HTML.
    const component = source("components/home-project-path.tsx");
    expect(component).not.toContain("<PriceSheet");
    expect(component).toContain("laneStartingPrice(locale,");
    const laneAnswer = source("components/lane-answer.tsx");
    expect(laneAnswer).toContain("{price}");
    const illustratedScene = source("components/illustrated-scene.tsx");
    expect(illustratedScene).toContain("{price}");
  });
});
