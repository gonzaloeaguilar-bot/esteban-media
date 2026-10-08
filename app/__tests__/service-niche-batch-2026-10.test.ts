import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  AUTO_DETAILING_DEPTH,
  CREATOR_DEPTH,
  MEDICAL_PRACTICE_DEPTH,
  SALON_DEPTH,
  WHITE_LABEL_DEPTH,
} from "@/lib/service-depth-content";
import {
  AUTO_DETAILING_DEEP_DIVE,
  CREATOR_DEEP_DIVE,
  MEDICAL_PRACTICE_DEEP_DIVE,
  SALON_DEEP_DIVE,
  WHITE_LABEL_DEEP_DIVE,
} from "@/lib/service-deep-dive-content";
import { getSpanishNichePage, languageAlternates } from "@/lib/spanish-site";
import { getPairedLanguageRoute } from "@/lib/language-routes";
import { sitemapRoutes } from "@/app/sitemap";
import { PACKAGE_PRICES, PRICING_BANDS, SHORT_FORM, usd } from "@/lib/pricing";

/**
 * The five buyer gaps shipped 2026-10-06.
 *
 * These assertions are the same ones service-depth.test.ts applies to the
 * earlier batches, plus the two properties this batch is the first to claim:
 * every page carries a NATIVE <details> fold whose paragraphs are in the
 * server-rendered markup, and every page exists in both languages with
 * reciprocal hreflang.
 *
 * Nothing here is loosened to make a page pass. On the first run the superlative
 * check caught "the cheapest way" in the detailing copy — a price-shaped word in
 * a sentence that was not about price — and the sentence was rewritten rather
 * than the pattern narrowed.
 */

/** Every dollar figure lib/pricing.ts can put on a page, incl. short-form per-video and weekly prices. */
const publishedPriceFigures = () => {
  const out: string[] = [];
  for (const band of Object.values(PRICING_BANDS)) {
    out.push(usd(band.baseMin), usd(band.baseMax), usd(band.marketMin), usd(band.marketMax));
  }
  for (const price of Object.values(PACKAGE_PRICES)) if (price.kind === "from") out.push(usd(price.amount));
  out.push(usd(SHORT_FORM.perVideoFrom), usd(SHORT_FORM.marketMin), usd(SHORT_FORM.marketMax));
  for (const o of SHORT_FORM.weekly) out.push(usd(o.pricePerWeek));
  return out;
};

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

const BATCH = [
  [
    "medical practice",
    MEDICAL_PRACTICE_DEPTH,
    MEDICAL_PRACTICE_DEEP_DIVE,
    "app/(english)/services/medical-practice-video-marketing-miami/page.tsx",
    "/services/medical-practice-video-marketing-miami",
    "marketing-de-video-para-consultorios-medicos-miami",
  ],
  [
    "content creator",
    CREATOR_DEPTH,
    CREATOR_DEEP_DIVE,
    "app/(english)/services/content-creator-video-editing-miami/page.tsx",
    "/services/content-creator-video-editing-miami",
    "edicion-de-video-para-creadores-de-contenido-miami",
  ],
  [
    "white label",
    WHITE_LABEL_DEPTH,
    WHITE_LABEL_DEEP_DIVE,
    "app/(english)/services/white-label-video-editing-for-agencies/page.tsx",
    "/services/white-label-video-editing-for-agencies",
    "edicion-de-video-marca-blanca-para-agencias",
  ],
  [
    "salon and barbershop",
    SALON_DEPTH,
    SALON_DEEP_DIVE,
    "app/(english)/services/salon-barbershop-video-marketing-miami/page.tsx",
    "/services/salon-barbershop-video-marketing-miami",
    "marketing-de-video-para-salones-y-barberias-miami",
  ],
  [
    "detailing, tint and wrap",
    AUTO_DETAILING_DEPTH,
    AUTO_DETAILING_DEEP_DIVE,
    "app/(english)/services/auto-detailing-tint-wrap-video-marketing-miami/page.tsx",
    "/services/auto-detailing-tint-wrap-video-marketing-miami",
    "marketing-de-video-para-detallado-y-wraps-miami",
  ],
] as const;

describe("niche batch 2026-10-06 — structure", () => {
  it.each(BATCH)(
    "%s renders craft, fold-out, FAQ, inquiry and related sections",
    (_name, _depth, _dive, page) => {
      const src = source(page);
      expect(src).toContain("<ServiceCraft");
      expect(src).toContain("<ServiceDeepDive");
      expect(src).toContain("<ServiceFaqs");
      expect(src).toContain("<ServiceInquiryRail");
      expect(src).toContain("<ServiceRelated");
    },
  );

  it.each(BATCH)(
    "%s declares its visible FAQ in JSON-LD, built from the rendered array",
    (_name, depth, _dive, page, path) => {
      const src = source(page);
      expect(src).toContain(`buildServiceFaqSchema(absoluteUrl(path), `);
      expect(src).toContain(`const path = "${path}"`);
      expect(depth.faqs).toHaveLength(4);
      expect(depth.craft).toHaveLength(3);
      expect(depth.related).toHaveLength(depth === CREATOR_DEPTH ? 4 : 3);
    },
  );

  it.each(BATCH)("%s gives its inquiry rail a service-specific id", (_name, _depth, _dive, page) => {
    const src = source(page);
    expect(src).toMatch(/serviceId: "[a-z0-9_]+"/);
    expect(src).toContain("goalPrompt:");
    expect(src).toContain("assetPrompt:");
    expect(src).toContain("proofHref:");
  });

  it("sitemaps all five English routes", () => {
    const paths = new Set(sitemapRoutes.map((route) => route.path));
    for (const [name, , , , path] of BATCH) {
      expect(paths.has(path), name).toBe(true);
    }
  });
});

describe("niche batch 2026-10-06 — both languages, reciprocally", () => {
  it.each(BATCH)("%s exists in Spanish with depth sections", (_name, _depth, _dive, _page, _path, esSlug) => {
    const es = getSpanishNichePage(esSlug);
    expect(es, esSlug).toBeDefined();
    // Spanish pages carry their own prose sections rather than a translation of
    // the English cards, so the Spanish reader gets a page and not a stub.
    expect(es?.sections?.length ?? 0).toBeGreaterThanOrEqual(2);
    expect(es?.faqs.length ?? 0).toBeGreaterThanOrEqual(3);
  });

  it.each(BATCH)("%s pairs both ways in hreflang and in the route map", (_name, _depth, _dive, _page, path, esSlug) => {
    const esPath = `/es/${esSlug}`;
    expect(languageAlternates[path]).toEqual({
      "en-US": path,
      "es-US": esPath,
      "x-default": path,
    });
    expect(languageAlternates[esPath]).toEqual(languageAlternates[path]);
    expect(getPairedLanguageRoute(path)).toBe(esPath);
    expect(getPairedLanguageRoute(esPath)).toBe(path);
  });
});

describe("niche batch 2026-10-06 — dual-audience shape", () => {
  it("phrases every FAQ and fold-out heading as a question", () => {
    for (const [name, depth, dive] of BATCH) {
      for (const faq of depth.faqs) {
        expect(faq.question.endsWith("?"), `${name}: ${faq.question}`).toBe(true);
      }
      expect(dive.title.endsWith("?"), `${name}: ${dive.title}`).toBe(true);
      for (const section of dive.sections) {
        expect(section.heading.endsWith("?"), `${name}: ${section.heading}`).toBe(true);
      }
    }
  });

  it("keeps every FAQ answer inside the dual-audience word band", () => {
    for (const [name, depth] of BATCH) {
      for (const faq of depth.faqs) {
        const words = faq.answer.trim().split(/\s+/).length;
        expect(words, `${name}: "${faq.question}" is ${words} words`).toBeGreaterThanOrEqual(55);
        expect(words, `${name}: "${faq.question}" is ${words} words`).toBeLessThanOrEqual(180);
      }
    }
  });

  it("keeps every fold-out section inside 100-180 words", () => {
    for (const [name, , dive] of BATCH) {
      for (const section of dive.sections) {
        const words = section.paragraphs.join(" ").trim().split(/\s+/).length;
        expect(words, `${name}: "${section.heading}" is ${words} words`).toBeGreaterThanOrEqual(100);
        expect(words, `${name}: "${section.heading}" is ${words} words`).toBeLessThanOrEqual(180);
      }
    }
  });

  it("puts the fold behind a native details element, never a client render", () => {
    // The whole reason the depth is allowed to collapse. A conditional render
    // takes the words out of the DOM, and no screenshot would show it.
    const shared = source("components/service-depth.tsx");
    expect(shared).toContain("KeepReading");
    expect(source("components/keep-reading.tsx")).toContain("<details");
    for (const [name, , , page] of BATCH) {
      const src = source(page);
      expect(src, name).not.toMatch(/useState|&&\s*<ServiceDeepDive/);
    }
  });
});

describe("niche batch 2026-10-06 — claim discipline", () => {
  const prose = (name: string) => {
    const [, depth, dive] = BATCH.find(([n]) => n === name)!;
    return [
      depth.craftHeading,
      depth.faqHeading,
      depth.relatedHeading,
      ...depth.craft.flatMap((c) => [c.title, c.detail]),
      ...depth.faqs.flatMap((f) => [f.question, f.answer]),
      ...depth.related.flatMap((r) => [r.title, r.detail]),
      dive.title,
      dive.destinations,
      ...dive.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ].join(" ");
  };

  it("states no price, turnaround, percentage or unbacked superlative", () => {
    for (const [name] of BATCH) {
      const text = prose(name);
      if (name === "white label") {
        // The white-label deep dive answers the cost question (2026-10-07). Every
        // figure must be one lib/pricing.ts publishes, and the only percentage is
        // the introductory discount documented there.
        const allowed = new Set(publishedPriceFigures());
        for (const figure of text.match(/\$[\d,]+/g) ?? []) {
          expect(allowed.has(figure), `white label names ${figure}, not from lib/pricing.ts`).toBe(true);
        }
        expect(text.match(/\b\d{1,3}\s?%/g) ?? [], "white label percentages").toEqual(
          (text.match(/\b\d{1,3}\s?%/g) ?? []).filter((p) => p.replace(/\s/g, "") === "10%"),
        );
      } else {
        expect(text, `${name} names a price`).not.toMatch(/\$\s?\d/);
        expect(text, `${name} cites a percentage`).not.toMatch(/\b\d{1,3}\s?%/);
      }
      expect(text, `${name} promises a turnaround`).not.toMatch(
        /\b\d+\s*(?:-\s*\d+\s*)?(?:hour|day|week|business day)s?\b/i,
      );
      expect(text.toLowerCase(), `${name} uses an unbacked superlative`).not.toMatch(
        /\bguarantee|guaranteed|the best\b|cheapest|#1\b/,
      );
    }
  });

  it("never sells drone piloting or full bilingual fluency", () => {
    // Esteban holds no Part 107 certificate, and his working language is Spanish
    // with intermediate English. Both are live claim restrictions in AGENTS.md.
    for (const [name] of BATCH) {
      const text = prose(name).toLowerCase();
      expect(text, `${name} offers to fly`).not.toMatch(/\bwe fly|our drone|drone pilot|part 107\b/);
      expect(text, `${name} claims fluency`).not.toMatch(/fully bilingual|totalmente bilingue/);
    }
  });

  it("attributes each regulated duty to the business, never to Esteban", () => {
    const medical = JSON.stringify(MEDICAL_PRACTICE_DEPTH);
    expect(medical).toContain("authorisation held by the practice");
    expect(JSON.stringify(CREATOR_DEPTH)).toMatch(
      /it is the creator who is responsible/,
    );
    expect(JSON.stringify(AUTO_DETAILING_DEPTH)).toMatch(
      /belong to the film manufacturer/,
    );
  });

  it("shares no substantial phrasing between the five verticals", () => {
    const shingles = (text: string) => {
      const words = text.toLowerCase().match(/[a-z']+/g) ?? [];
      const out = new Set<string>();
      for (let i = 0; i + 8 <= words.length; i += 1) out.add(words.slice(i, i + 8).join(" "));
      return out;
    };
    const bodies = BATCH.map(([name]) => [name, shingles(prose(name))] as const);

    for (let a = 0; a < bodies.length; a += 1) {
      for (let b = a + 1; b < bodies.length; b += 1) {
        const [nameA, setA] = bodies[a];
        const [nameB, setB] = bodies[b];
        const shared = [...setA].filter((shingle) => setB.has(shingle));
        expect(
          shared,
          `${nameA} and ${nameB} share ${shared.length} eight-word run(s), e.g. "${shared[0] ?? ""}"`,
        ).toEqual([]);
      }
    }
  });

  it("names a constraint that is specific to each vertical", () => {
    expect(prose("medical practice").toLowerCase()).toContain("hipaa");
    expect(prose("content creator").toLowerCase()).toContain("ftc");
    expect(prose("white label").toLowerCase()).toContain("unbranded");
    expect(prose("salon and barbershop").toLowerCase()).toContain("white balance");
    expect(prose("detailing, tint and wrap").toLowerCase()).toContain("reflect");

    // And the vertical-specific term must not leak into the others.
    expect(prose("detailing, tint and wrap").toLowerCase()).not.toContain("hipaa");
    expect(prose("salon and barbershop").toLowerCase()).not.toContain("ftc");
  });
});
