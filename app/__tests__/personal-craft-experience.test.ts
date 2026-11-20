import { readFileSync } from "node:fs";
import { join } from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PersonalCraftExperience } from "@/components/personal-craft-experience";

const root = join(__dirname, "..", "..");

describe("personal craft experience", () => {
  it.each(["en", "es"] as const)("ships the %s simplified promise, 3 steps, links, and voluntary depth in initial HTML", (locale) => {
    const html = renderToStaticMarkup(createElement(PersonalCraftExperience, { locale }));

    expect(html).toContain('data-section="personal-craft-experience"');
    expect(html).toContain("<details");
    expect(html).toContain('href="#start"');
    expect(html).toContain(`href="${locale === "es" ? "/es" : ""}/services"`);
    expect(html).toContain(`href="${locale === "es" ? "/es" : ""}/portfolio"`);
    expect((html.match(/<li/g) ?? [])).toHaveLength(3);
    expect(html).toMatch(locale === "es" ? /Un proyecto, un socio creativo/ : /One project, one creative partner/);
    expect(html).not.toContain("Scene 01 //");
    expect(html).not.toContain("Escena 01 //");
  });

  it("places the chooser ('What do you need?') before PersonalCraftExperience on both homepages", () => {
    for (const page of ["app/(english)/page.tsx", "app/(spanish)/es/page.tsx"]) {
      const source = readFileSync(join(root, page), "utf8");
      const portfolioAt = source.indexOf("<PortfolioTeaser");
      const chooserAt = source.indexOf("<HomeProjectPath");
      const craftAt = source.indexOf("<PersonalCraftExperience");

      expect(portfolioAt).toBeGreaterThan(-1);
      expect(chooserAt).toBeGreaterThan(portfolioAt);
      expect(craftAt).toBeGreaterThan(chooserAt);
    }
  });
});
