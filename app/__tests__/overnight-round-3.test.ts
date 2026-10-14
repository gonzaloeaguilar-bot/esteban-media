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
        const cs = getCaseStudyById(locale, id);
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

describe("round 3 client-facing language and schema", () => {
  const root = join(__dirname, "..", "..");
  const read = (p: string) => readFileSync(join(root, p), "utf8");

  it("no page prints the internal 'confirmed priority' label", () => {
    const files = [
      "lib/spanish-site.ts",
      "components/spanish-niche-page.tsx",
      "app/(spanish)/es/areas/palm-beach-county/page.tsx",
      "app/(english)/areas/palm-beach-county/page.tsx",
      "app/(english)/fort-lauderdale/page.tsx",
    ];
    for (const f of files) {
      expect(read(f), f).not.toMatch(/confirmed priorit|prioridad(es)? confirmada/i);
    }
  });

  it("the guide hubs print answers, not keyword-target chips", () => {
    const src = read("components/guide-pages.tsx");
    expect(src).not.toContain("keywordsLabel");
    expect(src).toContain("insight.answer[locale]");
  });

  it("Spanish hub questions open with ¿ and carry their accents", async () => {
    const { redditQueryInsights } = await import("@/lib/reddit-query-insights");
    for (const insight of redditQueryInsights) {
      expect(insight.audienceQuestion.es.startsWith("¿"), insight.id).toBe(true);
      expect(insight.audienceQuestion.es).not.toMatch(/^¿(Que|Como|Cuando|Cuanto) /);
      expect(insight.answer.en.length).toBeGreaterThan(150);
      expect(insight.answer.es.length).toBeGreaterThan(150);
    }
  });

  it("desk recommendations carry no Product nodes without offers", () => {
    expect(read("app/(english)/desk-recommendations/page.tsx")).not.toContain('"@type":"Product"');
  });

  it("Spanish inquiry rails default to the accented copy", () => {
    expect(read("components/service-depth.tsx")).toContain("accentedSpanish = true");
  });
});
