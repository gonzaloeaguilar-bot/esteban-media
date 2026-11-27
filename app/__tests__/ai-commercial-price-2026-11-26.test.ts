import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { describe, expect, it } from "vitest";

import { caseStudyPriceLine } from "@/lib/case-study-pricing";
import {
  AI_COMMERCIAL_REELS_DEEP_DIVE,
  AI_COMMERCIAL_REELS_ES_SECTIONS,
  AI_COMMERCIAL_REELS_FAQS,
  aiCommercialOfferJsonLd,
} from "@/lib/event-ai-pages-content";
import { buildLlmsTxt } from "@/lib/llms-txt";
import { packagesCopy } from "@/lib/packages";
import {
  AI_COMMERCIAL,
  AI_SERVICES,
  SHORT_FORM,
  aiCommercialPriceText,
  usd,
} from "@/lib/pricing";
import { services } from "@/lib/site";
import { getSpanishNichePage, spanishServices } from "@/lib/spanish-site";

/**
 * AI-generated commercial, owner quote 2026-11-26: "AI-generated commercial
 * videos starting at $350" per 15–30 second video, no footage needed.
 *
 * The figure lives ONCE, in AI_COMMERCIAL (lib/pricing.ts). This file fails if
 * a surface stops showing it, if the add-ons or the edit price drift, or if
 * anyone types the figure into copy instead of reading the constant.
 */

const ROOT = process.cwd();
const FROM = usd(AI_COMMERCIAL.from);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "__tests__" || name === "node_modules") continue;
      walk(p, out);
    } else if (/\.(ts|tsx|txt|mjs)$/.test(name)) out.push(p);
  }
  return out;
}

/** A hand-typed AI commercial price: "$350" or usd(350) anywhere outside lib/pricing.ts. */
const HARDCODED = [/\$350\b/, /usd\(\s*350\s*\)/, /\b350\s*(per|por)\s*video/i];
function hardcodedAiCommercialPrice(path: string, text: string): boolean {
  if (path.endsWith("lib/pricing.ts")) return false;
  return HARDCODED.some((re) => re.test(text));
}

describe("AI-generated commercial: from $350 per video, one source", () => {
  it("holds the owner figure and leaves the other prices alone", () => {
    expect(AI_COMMERCIAL).toMatchObject({ from: 350, unit: "video", lengthSeconds: "15–30", currency: "USD" });
    expect(AI_COMMERCIAL.source).toMatch(/owner quote by email/);
    // Add-ons on top of the edit stay unchanged, and so does the edit itself.
    expect(AI_SERVICES).toEqual({ voiceoverPerVideo: 75, bRollPerVideo: 150, animationFrom: 500, microShortFilmFrom: 600 });
    expect(SHORT_FORM.perVideoFrom).toBe(100);
  });

  it("the price phrase reads the constant in both languages", () => {
    expect(aiCommercialPriceText("en")).toContain(`from ${FROM} per video`);
    expect(aiCommercialPriceText("en")).toContain(AI_COMMERCIAL.lengthSeconds);
    expect(aiCommercialPriceText("es")).toContain(`desde ${FROM} por video`);
  });

  it("every AI commercial surface shows the figure", () => {
    const en = JSON.stringify(AI_COMMERCIAL_REELS_DEEP_DIVE);
    const es = JSON.stringify(AI_COMMERCIAL_REELS_ES_SECTIONS);
    expect(en).toContain(FROM);
    expect(es).toContain(FROM);
    // Add-ons still listed beside it.
    for (const v of Object.values(AI_SERVICES)) {
      expect(en).toContain(usd(v));
      expect(es).toContain(usd(v));
    }
    expect(JSON.stringify(AI_COMMERCIAL_REELS_FAQS)).toContain(FROM);

    const esPage = getSpanishNichePage("reels-comerciales-con-ia-miami")!;
    expect(esPage.lead).toContain(FROM);
    expect(JSON.stringify(esPage.faqs)).toContain(FROM);

    const enPage = readFileSync(join(ROOT, "app/(english)/services/ai-commercial-video-reels-miami/page.tsx"), "utf8");
    expect(enPage).toMatch(/aiCommercialPriceText\("en"\)/);
    expect(enPage).toMatch(/aiCommercialOfferJsonLd\(/);

    expect(caseStudyPriceLine("ai-commercial", "en").text).toContain(FROM);
    expect(caseStudyPriceLine("ai-commercial", "es").text).toContain(FROM);

    for (const locale of ["en", "es"] as const) {
      const card = packagesCopy(locale).aLaCarte.items.find((i) => i.id === "ia")!;
      expect(card.note).toContain(FROM);
    }
    expect(services.find((s) => s.id === "ai-content")!.startingPrice).toContain(FROM);
    expect(spanishServices.find((s) => s.id === "contenido-ia")!.startingPrice).toContain(FROM);

    const llms = buildLlmsTxt();
    expect(llms).toContain(`from ${FROM} per video`);
    expect(llms).not.toMatch(/\{\{AI_COMMERCIAL/);
  });

  it("the JSON-LD Offer carries the same figure as the visible sentence", () => {
    for (const locale of ["en", "es"] as const) {
      const offer = aiCommercialOfferJsonLd(locale, "https://x.test/p", "https://x.test/#business");
      expect(offer["@type"]).toBe("Offer");
      expect(offer.priceSpecification.minPrice).toBe(AI_COMMERCIAL.from);
      expect(offer.priceSpecification.priceCurrency).toBe("USD");
    }
  });

  it("no source file hand-types the figure", () => {
    const offenders = ["app", "lib", "components"]
      .flatMap((d) => walk(join(ROOT, d)))
      .filter((p) => hardcodedAiCommercialPrice(p, readFileSync(p, "utf8")))
      .map((p) => relative(ROOT, p));
    expect(offenders).toEqual([]);
  });

  it("negative control: the scan catches a hand-typed price", () => {
    expect(hardcodedAiCommercialPrice("lib/x.ts", "AI commercials from $350 per video")).toBe(true);
    expect(hardcodedAiCommercialPrice("lib/x.ts", "from ${usd(350)} each")).toBe(true);
    expect(hardcodedAiCommercialPrice("lib/x.ts", "desde 350 por video")).toBe(true);
    expect(hardcodedAiCommercialPrice("lib/pricing.ts", "from: 350 $350")).toBe(false);
    expect(hardcodedAiCommercialPrice("lib/x.ts", `from ${FROM.replace("350", "AI_COMMERCIAL.from")}`)).toBe(false);
  });
});
