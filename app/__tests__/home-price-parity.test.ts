import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HeroVideo } from "@/components/hero-video";
import { HomeProjectPath } from "@/components/home-project-path";
import { PackagesSection } from "@/components/packages-section";
import { packageFaq, packagesJsonLd } from "@/lib/packages";
import { PACKAGE_PRICES, PRODUCT_PHOTO_SESSION, REAL_ESTATE_PLANS } from "@/lib/pricing";

// The home page prints prices in the chooser, the package cards and the FAQ, and
// publishes the same prices as JSON-LD Offers. They must be the same set: a model
// (or a person) can quote either surface, so a price in one and not the other is
// a visible inconsistency. Audit 2026-10-14, items 3 and 4.

const visibleText = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&");

const amounts = (text: string) =>
  new Set([...text.matchAll(/\$\s?(\d[\d,]*)/g)].map((m) => Number(m[1].replace(/,/g, ""))));

function offerPrices(node: unknown, out = new Set<number>()): Set<number> {
  if (Array.isArray(node)) node.forEach((n) => offerPrices(n, out));
  else if (node && typeof node === "object") {
    const rec = node as Record<string, unknown>;
    for (const key of ["minPrice", "lowPrice", "price"]) {
      if (typeof rec[key] === "number") out.add(rec[key] as number);
    }
    Object.values(rec).forEach((v) => offerPrices(v, out));
  }
  return out;
}

for (const locale of ["en", "es"] as const) {
  describe(`home ${locale}: visible prices and JSON-LD Offer prices are one set`, () => {
    const home = [
      renderToStaticMarkup(React.createElement(HeroVideo, { locale })),
      renderToStaticMarkup(React.createElement(HomeProjectPath, { locale })),
      renderToStaticMarkup(
        React.createElement(PackagesSection, {
          locale,
          showRealEstatePlans: false,
          quiet: true,
          showGuide: false,
          showALaCarte: false,
        }),
      ),
    ].join("\n");
    const visible = amounts(visibleText(home));
    const [catalog] = packagesJsonLd(locale, "https://example.test/", "https://example.test/#b");
    const offers = offerPrices(catalog);

    const owned = [
      ...Object.values(PACKAGE_PRICES).flatMap((p) => (p.kind === "from" ? [p.amount] : [])),
      Math.min(...REAL_ESTATE_PLANS.map((p) => p.price)),
      PRODUCT_PHOTO_SESSION.from,
    ];

    it("every JSON-LD Offer price is printed on the page", () => {
      for (const price of offers) expect(visible, `Offer $${price} is not visible`).toContain(price);
    });

    it("the headline prices ($450/mo, $280/session, $100, $640, $800) are all in an Offer", () => {
      for (const price of [450, 280, 100, 640, 800]) expect(offers, `$${price} has no Offer`).toContain(price);
      for (const price of owned) expect(offers).toContain(price);
    });

    it("the two monthly prices are named as two products in the FAQ", () => {
      const answer = packageFaq(locale).find((q) => q.id === "plan-mensual")!.answer;
      expect(answer).toContain("$640");
      expect(answer).toContain("$450");
    });

    it("the answer line under the h1 carries the same Starter price", () => {
      const hero = visibleText(renderToStaticMarkup(React.createElement(HeroVideo, { locale })));
      expect(hero).toContain("$100");
      expect(hero).toContain("WhatsApp");
      expect(hero).toMatch(/Fort Lauderdale/);
    });

    it("ships a direct link to the matching Fort Lauderdale production page", () => {
      const hero = renderToStaticMarkup(React.createElement(HeroVideo, { locale }));
      const productionPath = locale === "es"
        ? "/es/produccion-de-video-fort-lauderdale"
        : "/services/video-production-fort-lauderdale";

      expect(hero).toContain(`href="${productionPath}"`);
    });
  });
}
