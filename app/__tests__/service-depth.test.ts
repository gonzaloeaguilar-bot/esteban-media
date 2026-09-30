import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  DENTAL_DEPTH,
  MED_SPA_DEPTH,
  YACHT_DEPTH,
} from "@/lib/service-depth-content";

/**
 * The depth pilot on three /services pages.
 *
 * MEASURED 2026-09-30 against production. Of 50 sitemapped /services pages, 7
 * earn impressions and 43 earn zero. Comparing BODIES — with the shingles that
 * /contact, /about and /pricing all share subtracted, so a shared header cannot
 * be mistaken for shared content:
 *
 *   7 earning        3,210 unique body shingles   13.1% overlap
 *   33 niche-dead    1,094                        38.4%
 *   10 geo-dead      2,193                        58.9%
 *
 * The earners carry three times the unique body. These pages were thin, not
 * merely templated, so the pilot ADDS vertical-specific substance. First
 * measurement after wiring, on the built pages:
 *
 *   dental    1,510 -> 2,900      overlap 38.4% -> 19.2%
 *   med spa   1,520 -> 2,864
 *   yacht     1,095 -> 2,535
 *
 * A first attempt at this measurement compared whole pages and read 61% (earners)
 * vs 85% (dead) as differentiation. Two UNRELATED pages overlap 62.3% on chrome
 * alone, so that number was measuring the navigation. Strip the chrome or the
 * comparison means nothing — which is why these tests assert content properties
 * rather than a similarity score.
 */

const source = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

const PILOT = [
  ["dental", DENTAL_DEPTH, "app/(english)/services/dental-video-marketing-south-florida/page.tsx"],
  ["yacht", YACHT_DEPTH, "app/(english)/services/yacht-charter-video-marketing-miami/page.tsx"],
  ["med spa", MED_SPA_DEPTH, "app/(english)/services/med-spa-video-marketing-south-florida/page.tsx"],
] as const;

describe("service depth — the pilot pages carry it", () => {
  it.each(PILOT)("%s renders craft, FAQ and related sections", (_name, _depth, page) => {
    const src = source(page);
    expect(src).toContain("<ServiceCraft");
    expect(src).toContain("<ServiceFaqs");
    expect(src).toContain("<ServiceRelated");
  });

  it.each(PILOT)("%s declares its questions in JSON-LD as well as in the DOM", (_name, _depth, page) => {
    const src = source(page);
    // A FAQPage claiming questions the page does not show misrepresents the page,
    // so the schema is built from the SAME array the section renders.
    expect(src).toContain("buildServiceFaqSchema");
    expect(src).toMatch(/buildServiceFaqSchema\(absoluteUrl\("\/services\/[a-z-]+"\), \w+\.faqs\)/);
  });
});

describe("service depth — the content is actually vertical-specific", () => {
  /**
   * The whole point. The template these pages shipped with said the same four
   * things about every industry with the noun swapped, so this asserts that each
   * vertical names a constraint the others do not.
   */
  it("names the binding constraint unique to each vertical", () => {
    const dental = JSON.stringify(DENTAL_DEPTH).toLowerCase();
    const yacht = JSON.stringify(YACHT_DEPTH).toLowerCase();
    const medspa = JSON.stringify(MED_SPA_DEPTH).toLowerCase();

    // Dental and med spa both turn on written authorisation; yacht turns on a
    // moving horizon and salt. None of those is interchangeable.
    expect(dental).toContain("hipaa");
    expect(yacht).toContain("horizon");
    expect(yacht).toContain("salt");
    expect(medspa).toContain("ftc");

    // And the vertical-specific term must NOT appear in the other verticals.
    expect(yacht).not.toContain("hipaa");
    expect(dental).not.toContain("salt spray");
  });

  /**
   * Shared PHRASING, not just whole duplicated strings.
   *
   * The first version of this compared whole `detail` values for equality, and a
   * negative control that pasted 80 characters of the dental card into the middle
   * of a yacht card passed it green. The disease being prevented is partial
   * reuse — that is exactly what the template did — so the check is the same
   * 8-word shingle measure the diagnosis used, not string equality.
   *
   * It immediately found six shared runs between the first draft's dental and
   * med spa copy. Those were rewritten; the test was not loosened.
   */
  it("shares no substantial phrasing between verticals", () => {
    const shingles = (text: string) => {
      const words = text.toLowerCase().match(/[a-z']+/g) ?? [];
      const out = new Set<string>();
      for (let i = 0; i + 8 <= words.length; i += 1) out.add(words.slice(i, i + 8).join(" "));
      return out;
    };
    const bodies = PILOT.map(([name, depth]) => [
      name,
      shingles(
        [
          ...depth.craft.map((c) => `${c.title} ${c.detail}`),
          ...depth.faqs.map((f) => `${f.question} ${f.answer}`),
          ...depth.related.map((r) => `${r.title} ${r.detail}`),
        ].join(" "),
      ),
    ] as const);

    for (let a = 0; a < bodies.length; a += 1) {
      for (let b = a + 1; b < bodies.length; b += 1) {
        const [nameA, setA] = bodies[a];
        const [nameB, setB] = bodies[b];
        const shared = [...setA].filter((sh) => setB.has(sh));
        expect(
          shared,
          `${nameA} and ${nameB} share ${shared.length} eight-word run(s), e.g. "${shared[0] ?? ""}"`,
        ).toEqual([]);
      }
    }
  });

  it("asks four questions and shows three craft cards per vertical", () => {
    for (const [name, depth] of PILOT) {
      expect(depth.faqs.length, name).toBe(4);
      expect(depth.craft.length, name).toBe(3);
      expect(depth.related.length, name).toBe(3);
    }
  });

  it("keeps every answer inside the dual-audience word band", () => {
    for (const [name, depth] of PILOT) {
      for (const faq of depth.faqs) {
        const words = faq.answer.trim().split(/\s+/).length;
        // The rule's band is 100-180 words for a section; a single FAQ answer is
        // the smaller unit, so the floor is 55 and the ceiling still holds.
        expect(words, `${name}: "${faq.question}" is ${words} words`).toBeGreaterThanOrEqual(55);
        expect(words, `${name}: "${faq.question}" is ${words} words`).toBeLessThanOrEqual(180);
      }
    }
  });

  it("phrases every FAQ heading as a question", () => {
    for (const [name, depth] of PILOT) {
      for (const faq of depth.faqs) {
        expect(faq.question.endsWith("?"), `${name}: ${faq.question}`).toBe(true);
      }
    }
  });
});

describe("service depth — claim discipline", () => {
  /**
   * These are a client's live pages. The pilot adds craft and regulatory context,
   * and it must not add a number, a price, a turnaround, or a result — any of
   * which would be a claim nobody verified.
   */
  it("states no price, turnaround, or performance figure", () => {
    for (const [name, depth] of PILOT) {
      const prose = [
        depth.craftHeading,
        depth.faqHeading,
        depth.relatedHeading,
        ...depth.craft.flatMap((c) => [c.title, c.detail]),
        ...depth.faqs.flatMap((f) => [f.question, f.answer]),
        ...depth.related.flatMap((r) => [r.title, r.detail]),
      ].join(" ");

      expect(prose, `${name} names a price`).not.toMatch(/\$\s?\d/);
      expect(prose, `${name} promises a turnaround`).not.toMatch(
        /\b\d+\s*(?:-\s*\d+\s*)?(?:hour|day|week|business day)s?\b/i,
      );
      expect(prose, `${name} cites a percentage`).not.toMatch(/\b\d{1,3}\s?%/);
      // The claim words that would need evidence nobody has.
      expect(prose.toLowerCase(), `${name} uses an unbacked superlative`).not.toMatch(
        /\bguarantee|guaranteed|the best\b|cheapest|#1\b/,
      );
    }
  });

  it("attributes the regulatory duty to the business, never to Esteban", () => {
    // The practice holds the authorisation and substantiates the claim. Saying or
    // implying otherwise would offer legal clearance we do not provide.
    const dental = JSON.stringify(DENTAL_DEPTH);
    const medspa = JSON.stringify(MED_SPA_DEPTH);
    expect(dental).toMatch(/clinic holds that authorisation|not something an editor can obtain/);
    expect(medspa).toMatch(/stay with the practice|the business decides/);
  });
});
