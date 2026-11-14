import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("pricing — human entry", () => {
  it("gives both pricing hubs the homepage-style visual entry, work, and proof before optional depth", () => {
    for (const page of ["app/(english)/pricing/page.tsx", "app/(spanish)/es/precios/page.tsx"]) {
      const markup = source(page);
      expect(markup).toContain("PricingCinematicHero");
      expect(markup).toContain("PortfolioTeaser");
      expect(markup).toContain("ClientReviews");
      expect(markup.indexOf("<PricingCinematicHero")).toBeLessThan(markup.indexOf("<PackagesSection"));
      expect(markup.indexOf("<PortfolioTeaser")).toBeLessThan(markup.indexOf("<PackagesSection"));
      expect(markup.indexOf("<ClientReviews")).toBeLessThan(markup.indexOf("<PricingAnswer"));
    }
  });

  it("keeps both decisions reachable on the first screen", () => {
    const hero = source("components/pricing-cinematic-hero.tsx");
    expect(hero).toContain('href="#packages"');
    expect(hero).toContain('href={es ? "/es/calculadora" : "/calculator"}');
    expect(hero).toContain("esteban-on-set.mp4");
  });
});
