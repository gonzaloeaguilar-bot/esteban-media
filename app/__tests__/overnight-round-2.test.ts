import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { analyse, verdict } from "@/scripts/dual-audience-gate.mjs";
import { AboutWhoIs } from "@/components/about-who-is";
import { PricingAnswer } from "@/components/pricing-answer";
import { personEntityJsonLd } from "@/lib/entity-schema";
import { NOINDEX_DECISIONS } from "@/lib/consolidation";
import { priceSentence } from "@/lib/packages";
import { PRIORITY_LINKS } from "@/lib/priority-links";
import { SHORT_FORM, usd } from "@/lib/pricing";
import { restaurantIgStudyPaths } from "@/lib/restaurant-ig-study";

/**
 * Overnight SEO/GEO loop, round 2 (2026-10-14). Each block pins one shipped gap
 * from esteban-overnight-loop-2026-10-14 so it cannot quietly come back.
 */
const html = (el: React.ReactElement) => renderToStaticMarkup(el);
const words = (s: string) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length;

describe("the restaurant Instagram study is linked from the restaurant pages", () => {
  it("EN and ES restaurant pages link the study in their own language", () => {
    expect(PRIORITY_LINKS["/services/restaurant-promo-video-editing-miami"].map((l) => l.href)).toContain(restaurantIgStudyPaths.en);
    expect(PRIORITY_LINKS["/es/video-para-restaurantes-miami"].map((l) => l.href)).toContain(restaurantIgStudyPaths.es);
  });

  it("both guide hubs render the study link server-side", () => {
    const src = readFileSync("components/guide-pages.tsx", "utf8");
    expect(src).toContain("<OriginalResearch locale={locale} />");
    expect(src).toContain("href={restaurantIgStudyPaths[locale]}");
  });
});

describe("who is Esteban Moreno", () => {
  it.each(["en", "es"] as const)("answers the name question with a price read from lib/pricing (%s)", (locale) => {
    const out = html(React.createElement(AboutWhoIs, { locale, path: locale === "es" ? "/es/sobre-esteban" : "/about" }));
    expect(out).toContain(locale === "es" ? "¿Quién es Esteban Moreno?" : "Who is Esteban Moreno?");
    expect(out).toContain(usd(SHORT_FORM.perVideoFrom));
    expect(out).toContain("(305) 497-4478");
    const n = words(out.split("</h2>")[1]);
    expect(analyse(`<h1>x</h1>${out}`).inBand).toBe(2);
    expect(n).toBeGreaterThanOrEqual(100);
    expect(n).toBeLessThanOrEqual(180);
  });

  it("the Person node disambiguates and carries the /about photo", () => {
    expect(personEntityJsonLd.disambiguatingDescription).toMatch(/Fort Lauderdale/);
    expect(personEntityJsonLd.image).toMatch(/\/about\/esteban-on-location\.jpg$/);
    expect(readFileSync("components/on-set-media.tsx", "utf8")).toContain("/about/esteban-on-location.jpg");
  });
});

describe("pricing hubs answer the price question first", () => {
  it.each(["en", "es"] as const)("prints every package price from lib and two in-band question sections (%s)", (locale) => {
    const out = html(React.createElement(PricingAnswer, { locale }));
    for (const id of ["arranque", "crecimiento", "presencia-local"] as const) {
      expect(out).toContain(priceSentence(locale, id).toLowerCase());
    }
    const m = analyse(`<h1>x</h1>${out}`);
    expect(m.questions).toBe(2);
    expect(m.inBand).toBe(2);
    expect(verdict(m)).toEqual([]);
  });
});

describe("GA4 does not report live noindex pages as /not-found", () => {
  it("every cohort-noindex path is an allowed analytics path", () => {
    const src = readFileSync("components/google-analytics.tsx", "utf8");
    expect(src).toContain("...NOINDEX_DECISIONS.map((entry) => entry.path)");
    expect(NOINDEX_DECISIONS.length).toBeGreaterThan(0);
  });
});
