import { readFileSync } from "node:fs";
import { join } from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PersonalCraftExperience } from "@/components/personal-craft-experience";

const root = join(__dirname, "..", "..");

describe("personal craft experience", () => {
  it.each(["en", "es"] as const)("ships the %s promise, commitments, links, and voluntary depth in initial HTML", (locale) => {
    const html = renderToStaticMarkup(createElement(PersonalCraftExperience, { locale }));

    expect(html).toContain('data-section="personal-craft-experience"');
    expect(html).toContain("<details");
    expect(html).toContain('href="#start"');
    expect(html).toContain(`href="${locale === "es" ? "/es" : ""}/services"`);
    expect(html).toContain(`href="${locale === "es" ? "/es" : ""}/portfolio"`);
    expect((html.match(/<li/g) ?? [])).toHaveLength(3);
    expect(html).toMatch(locale === "es" ? /Un proyecto, un socio creativo/ : /One project, one creative partner/);
  });

  it("places the server-rendered section after portfolio proof and before the chooser on both homepages", () => {
    for (const page of ["app/(english)/page.tsx", "app/(spanish)/es/page.tsx"]) {
      const source = readFileSync(join(root, page), "utf8");
      const portfolioAt = source.indexOf("<PortfolioTeaser");
      const craftAt = source.indexOf("<PersonalCraftExperience");
      const chooserAt = source.indexOf("<HomeProjectPath");

      expect(portfolioAt).toBeGreaterThan(-1);
      expect(craftAt).toBeGreaterThan(portfolioAt);
      expect(chooserAt).toBeGreaterThan(craftAt);
    }
  });
});
