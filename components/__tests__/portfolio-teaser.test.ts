import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "components/portfolio-teaser.tsx"), "utf8");
const rail = readFileSync(join(process.cwd(), "components/home-portfolio-rail.tsx"), "utf8");
const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

describe("homepage portfolio rail", () => {
  it("leads with The Great Reviewer and omits ML Colombia without removing its case", () => {
    expect(source).toContain('const HOMEPAGE_RAIL_EXCLUDED_IDS = new Set(["la-huelga", "ml-colombia"])');
    expect(source).toContain('const HOMEPAGE_RAIL_FEATURED_ID = "great-reviewer-iphone-18"');
    expect(source).toContain('items={[...(featuredItem ? [featuredItem] : []).map((item) => {');
    expect(source.indexOf("featuredItem ? [featuredItem]")).toBeLessThan(
      source.indexOf("REELS_IN_DISPLAY_ORDER.map"),
    );
  });

  it("uses the locally mirrored YouTube preview for the lead card", () => {
    const portfolio = readFileSync(join(process.cwd(), "lib/portfolio.ts"), "utf8");
    expect(portfolio).toContain('poster: "/portfolio/great-reviewer-iphone-18.jpg"');
    expect(portfolio).toContain("Exact YouTube preview, mirrored locally");
  });

  it("turns only vertical Reel cards into phone-shaped cards and keeps wide work contained", () => {
    expect(rail).toContain('card.setAttribute("data-em-reel", "")');
    expect(rail).toContain("media,");
    expect(css).toContain('.em-cartel .rail-card[data-em-reel]');
    expect(css).toContain('.em-cartel .rail-card[data-em-reel]::before');
    expect(css).toContain('.rail-card[data-em-reel] .rail-card__figure');
    expect(css).toContain(".rail-card[data-rail-kind=\"media\"] .rail-card__figure img,");
    expect(css).toContain("object-fit: contain !important;");
  });
});
