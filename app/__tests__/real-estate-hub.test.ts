import { readFileSync } from "node:fs";
import { join } from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { RealEstateHubPage } from "@/components/real-estate-hub-page";

describe("real estate hub v2", () => {
  it.each(["en", "es"] as const)("renders %s hub with service cards, pricing from SSOT, folded FAQs, and JSON-LD", (locale) => {
    const html = renderToStaticMarkup(createElement(RealEstateHubPage, { locale }));

    expect(html).toContain('data-section="real-estate-hub"');
    expect(html).toContain("application/ld+json");
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain("<details");
    expect(html).toContain("$750");
    expect(html).toContain("$1,250");
    expect(html).toContain("$1,950");
    if (locale === "en") {
      expect(html).toContain('href="/pricing/real-estate"');
      expect(html).toContain('href="/services/real-estate-reels-video-editor-south-florida"');
      expect(html).toContain('href="/guides/how-much-does-real-estate-video-cost-miami"');
    } else {
      expect(html).toContain('href="/es/precios/inmobiliaria"');
      expect(html).toContain('href="/es/editor-de-video-real-estate-miami"');
      expect(html).toContain('href="/es/guias/cuanto-cuesta-video-inmobiliario-miami"');
    }
  });

  it("registers both /real-estate and /es/bienes-raices in sitemap.ts", () => {
    const sitemap = readFileSync(join(process.cwd(), "app/sitemap.ts"), "utf8");
    expect(sitemap).toContain('"/real-estate"');
    expect(sitemap).toContain('"/es/bienes-raices"');
  });
});
