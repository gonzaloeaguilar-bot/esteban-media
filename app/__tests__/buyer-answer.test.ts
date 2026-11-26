import * as React from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { BuyerAnswer } from "@/components/buyer-answer";
import { validateLeadPayload } from "@/lib/lead-responder";
import { RAW_FILMING_RATES, REAL_ESTATE_PLANS, REAL_ESTATE_PLAN_TERMS } from "@/lib/pricing";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

type Kind = Parameters<typeof BuyerAnswer>[0]["kind"];
const render = (kind: Kind, locale: "en" | "es" = "en") =>
  renderToStaticMarkup(React.createElement(BuyerAnswer, { kind, locale }));
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const lead = (source: string) =>
  validateLeadPayload({ name: "A", email: "a@b.co", phone: "1", source } as never);
const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

describe("real estate monthly plan answer (PR #808)", () => {
  it("states the three plan prices from lib/pricing.ts and the minimum term, in English", () => {
    expect(REAL_ESTATE_PLANS.map((p) => p.price)).toEqual([750, 1250, 1950]);
    expect(REAL_ESTATE_PLAN_TERMS.minimumMonths).toBe(3);
    const html = render("real-estate-monthly-plan", "en");
    expect(html).toContain("How much does a monthly Reels plan cost");
    expect(html).toContain("Monthly plans are $750, $1,250 and $1,950 a month.");
    expect(html).toContain("minimum of 3 months");
    expect(html).toContain('href="/contact?source=real-estate-monthly-plan"');
  });

  it("states the same prices and minimum in Spanish", () => {
    const html = render("real-estate-monthly-plan", "es");
    expect(html).toContain("Los planes mensuales cuestan $750, $1,250 y $1,950 al mes.");
    expect(html).toContain("mínimo de 3 meses");
    expect(html).toContain('href="/es/contacto?source=real-estate-monthly-plan"');
  });

  it("is mounted on the real estate hub for both locales", () => {
    expect(read("components/real-estate-hub-page.tsx")).toContain(
      '<BuyerAnswer kind="real-estate-monthly-plan" locale={locale} />',
    );
    expect(lead("real-estate-monthly-plan").valid).toBe(true);
  });
});

describe("event filming price answers (PR #808)", () => {
  const pages: [Kind, string][] = [
    ["mastermind-filming-price", "mastermind-event-videographer-miami"],
    ["town-hall-filming-price", "corporate-town-hall-video-south-florida"],
    ["keys-retreat-filming-price", "executive-retreat-videographer-florida-keys"],
  ];

  for (const [kind, slug] of pages) {
    it(`${kind}: states the filming-only rate from lib/pricing.ts on /services/${slug}`, () => {
      const html = render(kind);
      expect(html).toContain(usd(RAW_FILMING_RATES.halfDay));
      expect(html).toContain(usd(RAW_FILMING_RATES.fullDay));
      expect(html).toContain(`href="/contact?source=${kind}"`);
      expect(read(`app/(english)/services/${slug}/page.tsx`)).toContain(
        `<BuyerAnswer kind="${kind}" locale="en" />`,
      );
      expect(lead(kind).valid).toBe(true);
    });
  }
});

describe("no duplicate of the #831 trade-show answer", () => {
  it("BuyerAnswer carries no trade-show kind; the page keeps #831's buyerQuestion", () => {
    expect(read("components/buyer-answer.tsx")).not.toContain('"trade-show-raw-files"');
    const page = read("app/(english)/services/trade-show-booth-videographer-fort-lauderdale/page.tsx");
    expect(page).not.toContain("BuyerAnswer");
    expect(page).toContain('buyerQuestion("trade-show-raw-files", "en")');
  });

  it("lists each lead source exactly once", () => {
    const src = read("lib/lead-responder.ts");
    for (const s of ["trade-show-raw-files", "real-estate-monthly-plan", "mastermind-filming-price"]) {
      const setEntries = src.split("\n").filter((line) => line.trim() === `"${s}",`);
      expect(setEntries.length).toBe(1);
      expect(lead(s).valid).toBe(true);
    }
  });
});
