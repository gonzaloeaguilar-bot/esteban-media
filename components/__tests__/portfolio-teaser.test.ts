import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const source = readFileSync(join(process.cwd(), "components/portfolio-teaser.tsx"), "utf8");

describe("homepage portfolio rail", () => {
  it("leads with the current real-estate Reels and keeps the work rail reusable", () => {
    expect(source).toContain('source = "home_portfolio"');
    expect(source).toContain('source={source}');
    expect(source).toContain('item.status === "live" && item.category !== "web-design" && item.id !== "la-huelga"');
    expect(source).toContain('items={[...REELS_IN_DISPLAY_ORDER.map((reel) => ({');
    expect(source.indexOf("REELS_IN_DISPLAY_ORDER.map")).toBeLessThan(
      source.indexOf("...items.map((item) => {"),
    );
  });

  it("uses the locally mirrored YouTube preview for the lead card", () => {
    const portfolio = readFileSync(join(process.cwd(), "lib/portfolio.ts"), "utf8");
    expect(portfolio).toContain('poster: "/portfolio/great-reviewer-iphone-18.jpg"');
    expect(portfolio).toContain("Exact YouTube preview, mirrored locally");
  });
});
