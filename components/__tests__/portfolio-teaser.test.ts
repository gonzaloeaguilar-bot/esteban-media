import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "components/portfolio-teaser.tsx"), "utf8");
const rail = readFileSync(join(process.cwd(), "components/home-portfolio-rail.tsx"), "utf8");
const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

describe("homepage portfolio rail", () => {
  it("leads with The Great Reviewer, excludes the two removed projects, and keeps the rail reusable", () => {
    expect(source).toContain('source = "home_portfolio"');
    expect(source).toContain('source={source}');
    expect(source).toContain('HOMEPAGE_RAIL_EXCLUDED_IDS = new Set(["la-huelga", "banacol", "ml-colombia"])');
    expect(source).toContain('HOMEPAGE_RAIL_FEATURED_ID = "great-reviewer-iphone-18"');
    expect(source).toContain('!HOMEPAGE_RAIL_EXCLUDED_IDS.has(item.id)');
    expect(source).toContain('item.id !== HOMEPAGE_RAIL_FEATURED_ID');
    expect(source.indexOf("featuredItem ? [featuredItem]")).toBeLessThan(
      source.indexOf("REELS_IN_DISPLAY_ORDER.map"),
    );
    expect(source.indexOf("REELS_IN_DISPLAY_ORDER.map")).toBeLessThan(
      source.indexOf("...items.map((item) => {"),
    );
  });

  it("uses the locally mirrored YouTube preview for the lead card", () => {
    const portfolio = readFileSync(join(process.cwd(), "lib/portfolio.ts"), "utf8");
    expect(portfolio).toContain('poster: "/portfolio/great-reviewer-iphone-18.jpg"');
    expect(portfolio).toContain("Exact YouTube preview, mirrored locally");
  });

  it("gives only vertical Reels an iPhone-shaped card and leaves wide work contained", () => {
    expect(rail).toContain('phoneFrame: item.isReel');
    expect(css).toContain('.em-cartel .rail-card[data-rail-phone-frame="true"] {');
    expect(css).toContain('.em-cartel .rail-card[data-rail-phone-frame="true"]::before');
    expect(css).toContain('.em-cartel .rail-card[data-rail-phone-frame="true"] .rail-card__figure');
    expect(css).toContain('object-fit: contain !important;');
    expect(css).toContain('object-fit: cover !important;');
  });
});
