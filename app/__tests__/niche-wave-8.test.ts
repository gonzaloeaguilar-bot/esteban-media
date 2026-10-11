import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import * as depthContent from "@/lib/service-depth-content";
import * as diveContent from "@/lib/service-deep-dive-content";
import type { NicheWave8Depth } from "@/lib/service-depth-content";
import type { DeepDive } from "@/lib/service-deep-dive-content";
import { buildSpanishNicheStructuredData, getSpanishNichePage, languageAlternates, spanishRoutes } from "@/lib/spanish-site";
import { getPairedLanguageRoute } from "@/lib/language-routes";
import { sitemapRoutes } from "@/app/sitemap";
import { getPortfolioItemById } from "@/lib/portfolio";
import { PACKAGE_PRICES, PRICING_BANDS, SHORT_FORM, usd } from "@/lib/pricing";

/**
 * Niche wave 8 (2026-10-11): eight owner-approved bilingual pairs.
 *
 * Same discipline as service-niche-batch-2026-10.test.ts, plus what this wave
 * is the first to claim: an answer-first question heading on both languages,
 * on-location filming stated as a paid add-on scoped per project, proof that
 * resolves to real portfolio work, and every regulated duty left with the client.
 */
const WAVE = [
  ["pre-construction condos", "PRECONSTRUCTION_DEPTH", "PRECONSTRUCTION_DEEP_DIVE", "/services/pre-construction-condo-video-marketing-miami", "video-para-preventa-de-condominios-miami"],
  ["vacation rentals", "VACATION_RENTAL_DEPTH", "VACATION_RENTAL_DEEP_DIVE", "/services/vacation-rental-video-marketing-fort-lauderdale", "video-para-alquileres-vacacionales-fort-lauderdale"],
  ["insurance agencies", "INSURANCE_AGENCY_DEPTH", "INSURANCE_AGENCY_DEEP_DIVE", "/services/insurance-agency-video-marketing-miami", "marketing-de-video-para-agencias-de-seguros-miami"],
  ["mortgage brokers", "MORTGAGE_BROKER_DEPTH", "MORTGAGE_BROKER_DEEP_DIVE", "/services/mortgage-broker-video-marketing-miami", "marketing-de-video-para-brokers-hipotecarios-miami"],
] as const;

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
const words = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).length;
const depthOf = (key: string) => (depthContent as unknown as Record<string, NicheWave8Depth>)[key];
const diveOf = (key: string) => (diveContent as unknown as Record<string, DeepDive>)[key];
const es = (slug: string) => getSpanishNichePage(slug)!;

const english = (name: string) => {
  const [, d, v] = WAVE.find(([n]) => n === name)!;
  const depth = depthOf(d);
  const dive = diveOf(v);
  return [
    depth.answer.question, depth.answer.answer, depth.proof.note, depth.craftHeading, depth.faqHeading, depth.relatedHeading,
    ...depth.craft.flatMap((c) => [c.title, c.detail]),
    ...depth.faqs.flatMap((f) => [f.question, f.answer]),
    ...depth.related.flatMap((r) => [r.title, r.detail]),
    dive.title, dive.destinations,
    ...dive.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
  ].join(" ");
};
const spanish = (slug: string) => {
  const page = es(slug);
  return [
    page.lead, page.fitQuestion ?? "", page.projectFit, ...page.bestFor, ...page.scopingQuestions,
    ...(page.sections ?? []).flatMap((s) => [s.heading, ...s.paragraphs]),
    ...page.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
};

const publishedFigures = () => {
  const out = new Set<string>();
  for (const b of Object.values(PRICING_BANDS)) [b.baseMin, b.baseMax, b.marketMin, b.marketMax].forEach((n) => out.add(usd(n)));
  for (const p of Object.values(PACKAGE_PRICES)) if (p.kind === "from") out.add(usd(p.amount));
  out.add(usd(SHORT_FORM.perVideoFrom));
  for (const o of SHORT_FORM.weekly) out.add(usd(o.pricePerWeek));
  return out;
};

describe("niche wave 8 — structure and wiring", () => {
  it.each(WAVE)("%s renders the shared service-depth sections and FAQ schema", (_n, d, v, path, esSlug) => {
    const src = source(`app/(english)${path}/page.tsx`);
    for (const tag of ["<ServiceCraft", "<ServiceDeepDive", "<ServiceFaqs", "<ServiceInquiryRail", "<ServiceRelated"]) expect(src).toContain(tag);
    expect(src).toContain(`const path = "${path}"`);
    expect(src).toContain("buildServiceFaqSchema(absoluteUrl(path), depth.faqs)");
    expect(src).toContain(`${d} as depth`);
    expect(src).toContain(`${v} as dive`);
    expect(src).toMatch(/data-cta="[a-z-]+_hero_whatsapp"/);
    expect(src).toMatch(/serviceId: "[a-z0-9_]+"/);
    expect(src, "prices come from lib/pricing.ts only").not.toMatch(/\$\s?\d/);
    expect(source(`app/(spanish)/es/${esSlug}/page.tsx`)).toContain("SpanishNichePage slug={slug}");
  });

  it.each(WAVE)("%s is sitemapped and paired both ways", (_n, _d, _v, path, esSlug) => {
    const esPath = `/es/${esSlug}`;
    expect(sitemapRoutes).toContainEqual({ path, priority: 0.85 });
    expect(spanishRoutes).toContain(esPath);
    const alternates = { "en-US": path, "es-US": esPath, "x-default": path };
    expect(languageAlternates[path]).toEqual(alternates);
    expect(languageAlternates[esPath]).toEqual(alternates);
    expect(getPairedLanguageRoute(path)).toBe(esPath);
    expect(getPairedLanguageRoute(esPath)).toBe(path);
    expect(source("scripts/search-console-index-watch.mjs")).toContain(`"https://estebanmorenomedia.com${esPath}"`);
  });

  it.each(WAVE)("%s keeps the Spanish FAQ schema identical to the visible answers", (_n, _d, _v, _p, esSlug) => {
    const page = es(esSlug);
    const faq = buildSpanishNicheStructuredData(page)["@graph"].find((node) => node["@type"] === "FAQPage") as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(faq.mainEntity.map((q) => ({ question: q.name, answer: q.acceptedAnswer.text }))).toEqual(page.faqs);
  });
});

describe("niche wave 8 — answer-first, citable shape", () => {
  it.each(WAVE)("%s opens with a question heading and a 40-180 word answer in both languages", (_n, d, _v, _p, esSlug) => {
    const depth = depthOf(d);
    expect(depth.answer.question.endsWith("?")).toBe(true);
    expect(words(depth.answer.answer)).toBeGreaterThanOrEqual(40);
    expect(words(depth.answer.answer)).toBeLessThanOrEqual(180);
    const page = es(esSlug);
    expect(page.fitQuestion?.startsWith("¿") && page.fitQuestion.endsWith("?")).toBe(true);
    expect(words(page.projectFit)).toBeGreaterThanOrEqual(40);
    expect(words(page.projectFit)).toBeLessThanOrEqual(180);
  });

  it.each(WAVE)("%s carries question-led 100-180 word sections in both languages", (_n, d, v, _p, esSlug) => {
    const dive = diveOf(v);
    const page = es(esSlug);
    expect(dive.title.endsWith("?")).toBe(true);
    expect(page.sectionsDisclosure).toBeTruthy();
    for (const sections of [dive.sections, page.sections ?? []]) {
      expect(sections.length).toBeGreaterThanOrEqual(2);
      for (const s of sections) {
        expect(s.heading.endsWith("?"), s.heading).toBe(true);
        const n = words(s.paragraphs.join(" "));
        expect(n, s.heading).toBeGreaterThanOrEqual(100);
        expect(n, s.heading).toBeLessThanOrEqual(180);
      }
    }
    expect(depthOf(d).faqs.length).toBeGreaterThanOrEqual(3);
    for (const f of depthOf(d).faqs) expect(f.question.endsWith("?")).toBe(true);
    expect(page.faqs.length).toBeGreaterThanOrEqual(3);
  });
});

describe("niche wave 8 — claim discipline", () => {
  it.each(WAVE)("%s states on-location filming as a paid add-on scoped per project", (name, _d, _v, _p, esSlug) => {
    expect(english(name)).toContain("paid add-on scoped per project");
    expect(spanish(esSlug)).toContain("servicio adicional pagado que se cotiza por proyecto");
  });

  it.each(WAVE)("%s names only published prices, and no turnaround, guarantee, drone flying or fluency claim", (name, _d, _v, _p, esSlug) => {
    const allowed = publishedFigures();
    for (const text of [english(name), spanish(esSlug)]) {
      for (const figure of text.match(/\$[\d,]+/g) ?? []) expect(allowed.has(figure), figure).toBe(true);
      expect(text).not.toMatch(/\b\d{1,3}\s?%/);
      expect(text).not.toMatch(/\b\d+\s*(?:-\s*\d+\s*)?(?:hour|day|week|business day|hora|día|semana)s?\b/i);
      expect(text.toLowerCase()).not.toMatch(/guarantee|garantiza|the best\b|cheapest|#1\b|el mejor\b/);
      expect(text.toLowerCase()).not.toMatch(/\bwe fly|our drone|drone pilot|part 107|fully bilingual|totalmente biling/);
    }
  });

  it.each(WAVE)("%s points its proof at real published work", (_n, d, _v, path, esSlug) => {
    const real = (href: string) => {
      const id = href.match(/^\/(?:es\/portafolio|portfolio)\/([^/#?]+)$/)?.[1];
      if (id) return Boolean(getPortfolioItemById(id));
      return href === "/services/real-estate-reels-video-editor-south-florida" || href.startsWith("/es/") || href.startsWith("/services/");
    };
    expect(real(depthOf(d).proof.href), depthOf(d).proof.href).toBe(true);
    const src = source(`app/(english)${path}/page.tsx`);
    const proofHref = src.match(/proofHref: "([^"]+)"/)![1];
    expect(real(proofHref), proofHref).toBe(true);
    const niche = source("components/spanish-niche-page.tsx");
    const block = niche.slice(niche.indexOf(`"${esSlug}": {`));
    for (const href of block.slice(0, block.indexOf("\n  },")).match(/\/es\/portafolio\/[a-z-]+/g) ?? []) {
      expect(getPortfolioItemById(href.split("/").pop()!), href).toBeDefined();
    }
  });

  it("shares no eight-word run between the verticals' sections", () => {
    const shingles = (text: string) => {
      const w = text.replace(/\]\([^)]+\)/g, "]").toLowerCase().match(/[a-záéíóúñü']+/g) ?? [];
      const out = new Set<string>();
      for (let i = 0; i + 8 <= w.length; i += 1) out.add(w.slice(i, i + 8).join(" "));
      return out;
    };
    const bodies = WAVE.map(([name, , v, , esSlug]) => [
      name,
      shingles([...diveOf(v).sections.flatMap((s) => s.paragraphs), ...(es(esSlug).sections ?? []).flatMap((s) => s.paragraphs)].join(" ")),
    ] as const);
    for (let a = 0; a < bodies.length; a += 1) {
      for (let b = a + 1; b < bodies.length; b += 1) {
        const shared = [...bodies[a][1]].filter((s) => bodies[b][1].has(s));
        expect(shared, `${bodies[a][0]} / ${bodies[b][0]}: "${shared[0] ?? ""}"`).toEqual([]);
      }
    }
  });
});
