import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

describe("guide work rail", () => {
  it("places the approved homepage portfolio shelf after every guide article", () => {
    const guidePage = read("components/guide-pages.tsx");
    const articleEnd = guidePage.indexOf("</article>");
    const shelf = guidePage.indexOf('<PortfolioTeaser locale={locale} source="guide_work" />');

    expect(guidePage).toContain('import { PortfolioTeaser } from "@/components/portfolio-teaser";');
    expect(articleEnd).toBeGreaterThan(-1);
    expect(shelf).toBeGreaterThan(articleEnd);
  });

  it("keeps guide interactions distinct from homepage portfolio analytics", () => {
    const teaser = read("components/portfolio-teaser.tsx");
    const rail = read("components/home-portfolio-rail.tsx");

    expect(teaser).toContain('source = "home_portfolio"');
    expect(teaser).toContain("source={source}");
    expect(rail).toContain("source = \"home_portfolio\"");
    expect(rail).toContain("source={`${source}_${locale}`}");
  });
});
