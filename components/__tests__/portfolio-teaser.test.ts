import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "components/portfolio-teaser.tsx"), "utf8");

describe("homepage portfolio rail", () => {
  it("leads with The Great Reviewer and omits ML Colombia without removing its case", () => {
    expect(source).toContain('const HOMEPAGE_RAIL_EXCLUDED_IDS = new Set(["la-huelga", "ml-colombia"])');
    expect(source).toContain('const HOMEPAGE_RAIL_FEATURED_ID = "great-reviewer-iphone-18"');
    expect(source).toContain('items={[...(featuredItem ? [featuredItem] : []).map((item) => {');
    expect(source.indexOf("featuredItem ? [featuredItem]")).toBeLessThan(
      source.indexOf("REELS_IN_DISPLAY_ORDER.map"),
    );
  });

  it("uses the public YouTube preview for the lead card", () => {
    const portfolio = readFileSync(join(process.cwd(), "lib/portfolio.ts"), "utf8");
    expect(portfolio).toContain('poster: "https://i.ytimg.com/vi/BDRru8eXaj4/maxresdefault.jpg"');
  });
});
