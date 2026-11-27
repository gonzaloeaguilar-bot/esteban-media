import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { OwnerPageFaqs } from "@/components/owner-page-faqs";
import { getGuideBySlug } from "@/lib/guides";
import { OWNER_PAGE_FAQS, ownerPageFaqs, withOwnerFaqJsonLd, withOwnerPageFaqs } from "@/lib/owner-page-faqs";
import * as pricing from "@/lib/pricing";

/**
 * Owner-page FAQs (2026-11-26). These guard the three ways the answers could go
 * wrong: a price typed by hand that drifts from lib/pricing.ts, an old price
 * coming back, and an answer that is not answer-first or not citable length.
 */
const root = process.cwd();
const SOURCE = readFileSync(join(root, "lib/owner-page-faqs.ts"), "utf8");
const entries = Object.entries(OWNER_PAGE_FAQS);
const allFaqs = entries.flatMap(([path, entry]) => entry.faqs.map((faq) => ({ path, locale: entry.locale, ...faq })));

/** Every number reachable from lib/pricing.ts exports, plus the derived figures the answers compute. */
function pricingNumbers(): Set<number> {
  const out = new Set<number>();
  const walk = (value: unknown, depth = 0) => {
    if (depth > 6) return;
    if (typeof value === "number") out.add(value);
    else if (Array.isArray(value)) value.forEach((v) => walk(v, depth + 1));
    else if (value && typeof value === "object") Object.values(value).forEach((v) => walk(v, depth + 1));
  };
  Object.values(pricing).forEach((v) => walk(v));
  for (const o of pricing.ARRANQUE_WEEKLY_OPTIONS) out.add(o.pricePerWeek / o.videosPerWeek);
  for (let h = 1; h <= 12; h += 1) out.add(pricing.filmingQuote(h));
  return out;
}

/** Hand-typed prices that were retired: they must never come back in an FAQ. */
const RETIRED = [
  /\$400\b[^.]{0,40}half[- ]day/i,
  /\$700\b[^.]{0,40}full[- ]day/i,
  /\$125\b[^.]{0,30}(an |per |la |por )?(hour|hora)/i,
  /\$450\b[^.]{0,30}(a month|al mes|por mes)/i,
];

const words = (text: string) => text.trim().split(/\s+/).length;

describe("owner-page FAQs", () => {
  it("has 4-6 FAQs at most per page and at least one", () => {
    for (const [, entry] of entries) {
      expect(entry.faqs.length).toBeGreaterThan(0);
      expect(entry.faqs.length).toBeLessThanOrEqual(6);
    }
  });

  it("keeps every answer 100-180 words, answer-first with a figure in sentence one", () => {
    for (const faq of allFaqs) {
      const n = words(faq.answer);
      expect(n, `${faq.id} has ${n} words`).toBeGreaterThanOrEqual(100);
      expect(n, `${faq.id} has ${n} words`).toBeLessThanOrEqual(180);
      const first = faq.answer.split(/(?<=[.!?])\s/)[0];
      expect(first, `${faq.id} first sentence carries no figure`).toMatch(/\d/);
      expect(faq.question.trim().endsWith("?")).toBe(true);
    }
  });

  it("types no dollar figure in the source: every price is read from lib/pricing.ts", () => {
    expect(SOURCE).not.toMatch(/\$\d/);
    expect(SOURCE).toContain('from "@/lib/pricing"');
  });

  it("prints only dollar amounts that exist in lib/pricing.ts", () => {
    const known = pricingNumbers();
    for (const faq of allFaqs) {
      for (const m of `${faq.question} ${faq.answer}`.matchAll(/\$([\d,]+)/g)) {
        const amount = Number(m[1].replace(/,/g, ""));
        expect(known.has(amount), `${faq.id} prints $${m[1]}, not in lib/pricing.ts`).toBe(true);
      }
    }
  });

  it("never prints a retired price", () => {
    for (const faq of allFaqs) {
      for (const re of RETIRED) expect(`${faq.question} ${faq.answer}`, faq.id).not.toMatch(re);
    }
  });

  it("follows the current filming rates (a pricing change moves every answer)", () => {
    const filming = allFaqs.filter((f) => /half[- ]day|medio día/.test(f.answer));
    expect(filming.length).toBeGreaterThan(3);
    for (const faq of filming) expect(faq.answer).toContain(pricing.usd(pricing.FILMING_RATES.halfDay));
  });

  it("states the 7-day floor only as a minimum", () => {
    const days = pricing.turnaroundFor("arranque").minimumDays;
    for (const faq of allFaqs.filter((f) => f.answer.includes(`${days} days`) || f.answer.includes(`${days} días`))) {
      expect(faq.answer).toMatch(new RegExp(`at least ${days} days|al menos ${days} días`));
    }
  });

  it("does not strengthen Palm Beach positioning", () => {
    for (const faq of allFaqs) expect(faq.answer, faq.id).not.toMatch(/Palm Beach/);
  });

  it("targets only routes that exist in this repo", () => {
    for (const [path] of entries) {
      const guide = path.match(/^\/(es\/guias|guides)\/(.+)$/);
      if (guide) {
        expect(getGuideBySlug(guide[1] === "guides" ? "en" : "es", guide[2]), path).toBeTruthy();
        continue;
      }
      const group = path.startsWith("/es/") ? "(spanish)" : "(english)";
      expect(existsSync(join(root, "app", group, path, "page.tsx")), path).toBe(true);
    }
  });

  it("matches the page language", () => {
    for (const [path, entry] of entries) expect(entry.locale).toBe(path.startsWith("/es/") ? "es" : "en");
  });

  it("renders server-side as native <details> with the full answer in the HTML", () => {
    const [path, entry] = entries.find(([, e]) => e.locale === "en")!;
    const html = renderToStaticMarkup(React.createElement(OwnerPageFaqs, { path }));
    expect(html).toContain("<details");
    expect(html).toContain('data-rail-faq="owner-page-faqs"');
    for (const faq of entry.faqs) {
      expect(html).toContain(faq.question.replace(/'/g, "&#x27;"));
      expect(html).toContain(faq.answer.slice(0, 60).replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;"));
    }
    expect(renderToStaticMarkup(React.createElement(OwnerPageFaqs, { path: "/nowhere" }))).toBe("");
  });

  it("joins an existing FAQPage only, without duplicates", () => {
    const path = entries[0][0];
    const faqs = ownerPageFaqs(path);
    const ld = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage" }, { "@type": "FAQPage", mainEntity: [] }] };
    const out = withOwnerFaqJsonLd(ld, path) as typeof ld;
    const faqNode = out["@graph"][1] as { mainEntity: { name: string }[] };
    expect(faqNode.mainEntity.map((q) => q.name)).toEqual(faqs.map((f) => f.question));
    const twice = withOwnerFaqJsonLd(out, path) as typeof ld;
    expect((twice["@graph"][1] as { mainEntity: unknown[] }).mainEntity).toHaveLength(faqs.length);
    const noFaq = { "@type": "WebPage" };
    expect(withOwnerFaqJsonLd(noFaq, path)).toEqual(noFaq);
    expect(withOwnerPageFaqs(path, [{ question: faqs[0].question, answer: "x" }])).toHaveLength(faqs.length);
  });

  it("is wired into every page or shared renderer that owns a path", () => {
    const renderers = ["components/geo-service-page.tsx", "components/spanish-niche-page.tsx", "components/guide-pages.tsx", "components/package-detail.tsx"];
    for (const r of renderers) expect(readFileSync(join(root, r), "utf8")).toMatch(/OwnerPageFaqs|withOwnerPageFaqs|ownerPageFaqs/);
    for (const [path] of entries) {
      if (path.startsWith("/es/") || path === "/pricing/starter") continue;
      const file = join(root, "app", "(english)", path, "page.tsx");
      const src = readFileSync(file, "utf8");
      if (src.includes("GeoServicePage")) continue;
      expect(src, path).toMatch(/OwnerPageFaqs|withOwnerPageFaqs/);
    }
  });
});
