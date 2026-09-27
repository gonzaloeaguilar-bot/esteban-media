import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { sitemapRoutes } from "@/app/sitemap";
import { languageAlternates, spanishRoutes } from "@/lib/spanish-site";
import { getPairedLanguageRoute } from "@/lib/language-routes";
import { PACKAGE_PRICES } from "@/lib/pricing";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

const EN_PAGE = "app/(english)/pricing/page.tsx";
const ES_PAGE = "app/(spanish)/es/precios/page.tsx";

/**
 * The dedicated pricing pages exist because the packages (and their starting
 * prices) previously lived only in a homepage section, so nothing could be
 * linked, searched or indexed as "what it costs". These tests pin the two
 * things that made that a defect: the routes are registered everywhere a route
 * has to be registered, and the pages never inline a price figure.
 */
describe("pricing pages", () => {
  const en = source(EN_PAGE);
  const es = source(ES_PAGE);

  it("renders the shared packages section rather than a second copy of it", () => {
    for (const page of [en, es]) {
      expect(page).toContain("PackagesSection");
      expect(page).toContain("packagesJsonLd");
    }
    expect(en).toContain('locale="en"');
    expect(es).toContain('locale="es"');
  });

  it("inlines no price figure — every number comes from lib/pricing.ts", () => {
    const amounts = Object.values(PACKAGE_PRICES)
      .filter((p): p is Extract<typeof p, { kind: "from" }> => p.kind === "from")
      .map((p) => p.amount);
    expect(amounts.length).toBeGreaterThan(0);
    for (const page of [en, es]) {
      expect(page).not.toMatch(/\$\d/);
      for (const amount of amounts) {
        expect(page).not.toContain(String(amount));
      }
    }
  });

  it("is in the sitemap on both locales", () => {
    expect(sitemapRoutes.map((r) => r.path)).toContain("/pricing");
    expect(spanishRoutes).toContain("/es/precios");
  });

  it("declares hreflang both ways", () => {
    for (const path of ["/pricing", "/es/precios"]) {
      expect(languageAlternates[path]).toEqual({
        "en-US": "/pricing",
        "es-US": "/es/precios",
        "x-default": "/pricing",
      });
    }
  });

  it("pairs the two routes for the language switcher", () => {
    expect(getPairedLanguageRoute("/pricing")).toBe("/es/precios");
    expect(getPairedLanguageRoute("/es/precios")).toBe("/pricing");
  });

  it("is reachable — nav, site search and both services indexes link to it", () => {
    const nav = source("components/app-nav.tsx");
    expect(nav).toContain('"/pricing"');
    expect(nav).toContain('"/es/precios"');

    const search = source("lib/site-search.ts");
    expect(search).toContain('href: "/pricing"');
    expect(search).toContain('href: "/es/precios"');

    expect(source("app/(english)/services/page.tsx")).toContain('href="/pricing"');
    expect(source("app/(spanish)/es/servicios/page.tsx")).toContain('href="/es/precios"');
  });

  it("says a scoped quote follows, so a starting price is not read as a quote", () => {
    expect(en.toLowerCase()).toContain("written quote");
    expect(es.toLowerCase()).toContain("cotización por escrito");
  });
});
