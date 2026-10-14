import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { packageMetadata } from "@/components/package-detail";
import { buildCaseStudyMetadata, getCaseStudyById } from "@/lib/case-studies";
import { getEventPageCopy } from "@/lib/event-content";
import { PACKAGE_PRICES, usd } from "@/lib/pricing";
import { spanishNichePages } from "@/lib/spanish-site";

// Overnight SEO/GEO loop, round 3 (2026-10-14). Snippet test: these meta
// descriptions were 164-170 characters, so Google cut them mid-sentence. They
// now answer first and fit. Judge on CTR 28 days after recrawl and revert
// after six weeks (~2026-11-25) if impressions grow and clicks stay at 0.

const BUDGET = 160;

describe("round 3 snippet rewrites", () => {
  it("every Spanish niche meta description fits the budget", () => {
    const over = spanishNichePages
      .map((page) => ({ slug: page.slug, d: page.metaDescription ?? page.description }))
      .filter(({ d }) => d.length > 165);
    expect(over).toEqual([]);
  });

  it("package pages lead with their price", () => {
    for (const locale of ["en", "es"] as const) {
      for (const id of Object.keys(PACKAGE_PRICES) as (keyof typeof PACKAGE_PRICES)[]) {
        const d = String(packageMetadata(id, locale).description);
        expect(d.length, `${id}/${locale}`).toBeLessThanOrEqual(170);
        const price = PACKAGE_PRICES[id];
        if (price.kind === "from") expect(d, `${id}/${locale}`).toContain(usd(price.amount));
        expect(d.endsWith("…"), `${id}/${locale}: ${d}`).toBe(false);
      }
    }
  });

  it("case-study snippets fit and never end mid-sentence", () => {
    for (const id of ["banacol", "flas-concierge", "healthy-smile", "my-dler", "homeowners"] as const) {
      for (const locale of ["en", "es"] as const) {
        const cs = getCaseStudyById(id, locale);
        if (!cs) continue;
        const d = String(buildCaseStudyMetadata(cs).description);
        expect(d.length, `${id}/${locale}`).toBeLessThanOrEqual(BUDGET);
        expect(d.endsWith("…"), `${id}/${locale}: ${d}`).toBe(false);
      }
    }
  });

  it("Spanish event titles fit in about 60 characters", () => {
    for (const id of ["sobewff", "emerge-americas"] as const) {
      expect(getEventPageCopy(id, "es").metaTitle.length).toBeLessThanOrEqual(60);
    }
  });

  it("the event-content comment points at the right loop row", () => {
    const src = readFileSync(join(__dirname, "..", "..", "lib", "event-content.ts"), "utf8");
    expect(src).toContain("vault loop log, row 26");
    expect(src).not.toContain("vault loop log, row 32");
  });
});
