import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";
import sitemap from "../sitemap";
import { MERGE_DECISIONS, isMergedPath, resolveMergedPath } from "@/lib/consolidation";
import { getPairedLanguageRoute } from "@/lib/language-routes";
import { FILMING_HOURLY, RESTAURANT_PROMO, SHORT_FORM, usd } from "@/lib/pricing";
import { languageAlternates, spanishNichePages } from "@/lib/spanish-site";

/**
 * 2026-11-26 prune follow-up. Zero-signal clusters with no stronger
 * same-language sibling keep ONE survivor; the rest 301 to it. Three pages
 * that were held only because a PR merged that day linked them were re-judged
 * and merged. Evidence: config/cohort-consolidation.json#prune20261126Followup
 * and vault page client-esteban-media/wiki/esteban-page-prune-2026-11-26.md.
 *
 * Negative control: drop any row from config/cohort-consolidation.json#merges,
 * or any survivor answer below, and this file goes red.
 */
const FOLLOWUP: Record<string, string> = {
  // Spanish medical -> consultorios medicos (dental sub-cluster -> dentistas)
  "/es/video-para-odontologia-cosmetica-y-carillas-miami": "/es/marketing-de-video-para-dentistas-miami",
  "/es/marketing-de-video-para-clinicas-esteticas-miami": "/es/marketing-de-video-para-consultorios-medicos-miami",
  "/es/marketing-de-video-para-cirugia-plastica-miami": "/es/marketing-de-video-para-consultorios-medicos-miami",
  "/es/video-para-restauracion-capilar-miami": "/es/marketing-de-video-para-consultorios-medicos-miami",
  "/es/marketing-de-video-para-quiropracticos-miami": "/es/marketing-de-video-para-consultorios-medicos-miami",
  "/es/marketing-de-video-para-spas-y-bienestar-miami": "/es/marketing-de-video-para-consultorios-medicos-miami",
  "/es/video-para-medicos-concierge-y-clinicas-privadas-palm-beach": "/es/marketing-de-video-para-consultorios-medicos-miami",
  // Spanish law
  "/es/video-para-abogados-de-lesiones-personales-miami": "/es/marketing-de-video-para-abogados-miami",
  "/es/video-para-abogados-de-planificacion-patrimonial-boca-raton": "/es/marketing-de-video-para-abogados-miami",
  "/es/marketing-de-video-para-abogados-de-inmigracion-miami": "/es/marketing-de-video-para-abogados-miami",
  // Hotels (per language)
  "/services/boutique-hotel-resort-video-miami-beach": "/services/hotel-hospitality-video-production-miami",
  "/services/boutique-hotel-video-editing-miami": "/services/hotel-hospitality-video-production-miami",
  "/es/edicion-de-video-para-hoteles-boutique-miami": "/es/produccion-de-video-para-hoteles-miami",
  "/es/video-marketing-para-hoteles-boutique-miami-beach": "/es/produccion-de-video-para-hoteles-miami",
  // Spanish restaurants / bars
  "/es/videografo-para-restaurantes-de-alta-cocina-miami": "/es/edicion-de-video-promocional-para-restaurantes-miami",
  "/es/videografo-de-cocteleria-para-bares-miami": "/es/edicion-de-video-promocional-para-restaurantes-miami",
  "/es/video-para-empresas-de-catering-miami": "/es/edicion-de-video-promocional-para-restaurantes-miami",
  "/es/video-para-cervecerias-artesanales-miami": "/es/edicion-de-video-promocional-para-restaurantes-miami",
  // Automotive (per language)
  "/es/video-para-agencias-de-carros-exoticos-miami": "/es/marketing-de-video-automotriz-miami",
  "/services/exotic-car-rental-video-miami": "/services/automotive-video-marketing-miami",
  "/services/auto-detailing-tint-wrap-video-marketing-miami": "/services/automotive-video-marketing-miami",
  // Re-judged after the PRs that linked them merged
  "/es/editor-de-video-para-anuncios-de-tiktok-miami": "/es/editor-de-video-corto-para-redes-miami",
  "/es/videografo-para-fiestas-en-yates-miami": "/es/videografo-para-eventos-en-yates-miami",
  "/es/video-de-unboxing-y-demostracion-de-producto-south-florida": "/es/video-de-demostracion-de-producto-miami",
};

// Still held, each for a reason that a merge would break (see the JSON).
const STILL_HELD = [
  "/es/marketing-de-video-para-dentistas-miami", // Healthy Smile case study links it
  "/es/video-para-restaurantes-frente-al-agua-fort-lauderdale", // an event page links it
  "/es/edicion-de-video-para-discotecas-y-eventos-miami", // event pages
  "/es/marketing-de-video-para-alquiler-de-yates-miami", // boat-show event pages
  "/es/video-para-yates-y-hospitalidad-fort-lauderdale", // boat-show event pages
  "/es/video-para-bar-y-bat-mitzvah-boca-raton", // an event page
  "/es/edicion-de-video-largo-para-youtube", // target unknown to Google
  "/services/youtube-long-form-video-editing", // target excluded by noindex at last crawl
  "/services/real-estate-drone-video-editing-miami", // /real-estate hub card would self-link
  "/es/video-para-restaurantes-miami", // crawled-not-indexed: unjudged
  "/es/marketing-de-video-para-detallado-y-wraps-miami", // discovered-not-indexed: unjudged
];

function sitemapPaths(): Set<string> {
  return new Set(sitemap().map((entry) => new URL(entry.url).pathname.replace(/\/$/, "") || "/"));
}

describe("prune follow-up 2026-11-26", () => {
  it("merges exactly the 24 follow-up pages to their cluster survivor", () => {
    const merged = new Map(MERGE_DECISIONS.map((entry) => [entry.from, entry.to]));
    expect(Object.keys(FOLLOWUP)).toHaveLength(24);
    for (const [from, to] of Object.entries(FOLLOWUP)) {
      expect(merged.get(from), from).toBe(to);
      expect(resolveMergedPath(from)).toBe(to);
      expect(from.startsWith("/es/"), from).toBe(to.startsWith("/es/"));
    }
  });

  it("301s every follow-up page with statusCode 301", async () => {
    const redirects = await nextConfig.redirects!();
    for (const [from, to] of Object.entries(FOLLOWUP)) {
      const rule = redirects.find((redirect) => redirect.source === from);
      expect(rule, from).toBeDefined();
      expect(rule!.destination).toBe(to);
      expect("statusCode" in rule! && rule!.statusCode, from).toBe(301);
    }
  });

  it("drops the merged pages from the sitemap and keeps survivors and held pages in it", () => {
    const paths = sitemapPaths();
    expect(paths.size).toBe(527);
    for (const [from, to] of Object.entries(FOLLOWUP)) {
      expect(paths.has(from), from).toBe(false);
      expect(paths.has(to), to).toBe(true);
    }
    for (const path of STILL_HELD) {
      expect(isMergedPath(path), path).toBe(false);
      expect(paths.has(path), path).toBe(true);
    }
  });

  it("keeps each surviving hreflang pair intact and dissolves pairs with a merged half", () => {
    expect(languageAlternates["/services/hotel-hospitality-video-production-miami"]?.["es-US"]).toBe(
      "/es/produccion-de-video-para-hoteles-miami",
    );
    expect(languageAlternates["/services/automotive-video-marketing-miami"]?.["es-US"]).toBe(
      "/es/marketing-de-video-automotriz-miami",
    );
    expect(getPairedLanguageRoute("/services/medical-practice-video-marketing-miami")).toBe(
      "/es/marketing-de-video-para-consultorios-medicos-miami",
    );
    expect(getPairedLanguageRoute("/services/restaurant-promo-video-editing-miami")).toBe(
      "/es/edicion-de-video-promocional-para-restaurantes-miami",
    );
    // English twin survives, Spanish twin merged: the switcher skips the 301.
    expect(getPairedLanguageRoute("/services/immigration-attorney-video-marketing-miami")).toBe(
      "/es/marketing-de-video-para-abogados-miami",
    );
    for (const from of Object.keys(FOLLOWUP)) {
      expect(languageAlternates[from], from).toBeUndefined();
    }
  });

  it("gives every Spanish survivor an answer-first paragraph with prices from lib/pricing.ts", () => {
    const starter = usd(SHORT_FORM.perVideoFrom);
    const film = usd(FILMING_HOURLY.amount);
    const expected: Record<string, readonly string[]> = {
      "marketing-de-video-para-consultorios-medicos-miami": [starter, film, "cirugía plástica", "restauración capilar"],
      "marketing-de-video-para-abogados-miami": [starter, film, "inmigración", "lesiones personales"],
      "produccion-de-video-para-hoteles-miami": [starter, film, "hoteles boutique"],
      "edicion-de-video-promocional-para-restaurantes-miami": [usd(RESTAURANT_PROMO.from), starter, "coctelería", "catering"],
      "marketing-de-video-automotriz-miami": [starter, film, "autos exóticos", "detailing"],
    };
    for (const [slug, needles] of Object.entries(expected)) {
      const page = spanishNichePages.find((entry) => entry.slug === slug);
      expect(page, slug).toBeDefined();
      expect(page!.updated, slug).toBe("2026-11-26");
      for (const needle of needles) expect(page!.answerFirst ?? "", `${slug}: ${needle}`).toContain(needle);
    }
  });

  it("links each survivor to real published proof", () => {
    const proof: Record<string, string> = {
      "marketing-de-video-para-consultorios-medicos-miami": "](/es/casos-de-estudio/healthy-smile)",
      "marketing-de-video-para-abogados-miami": "](/es/portafolio)",
      "produccion-de-video-para-hoteles-miami": "](/es/portafolio/bar-door-monkey)",
      "edicion-de-video-promocional-para-restaurantes-miami": "](/es/",
      "marketing-de-video-automotriz-miami": "](/es/casos-de-estudio/flas-concierge)",
    };
    for (const [slug, link] of Object.entries(proof)) {
      const page = spanishNichePages.find((entry) => entry.slug === slug)!;
      expect(page.lead, slug).toContain(link);
    }
    const auto = readFileSync(
      join(process.cwd(), "app/(english)/services/automotive-video-marketing-miami/page.tsx"),
      "utf8",
    );
    expect(auto).toContain('href="/case-studies/flas-concierge"');
    const hotel = readFileSync(
      join(process.cwd(), "app/(english)/services/hotel-hospitality-video-production-miami/page.tsx"),
      "utf8",
    );
    // The English answers read every figure from lib/pricing.ts.
    const PRICED =
      "Editing your own footage starts at ${usd(SHORT_FORM.perVideoFrom)} per video (Starter package), and on-location filming starts at ${usd(FILMING_HOURLY.amount)} an hour with a ${FILMING_HOURLY.minimumHours}-hour minimum (${usd(FILMING_HOURLY.minimumAmount)}).";
    for (const [name, src, intents] of [
      ["automotive", auto, "car dealerships, exotic car rental fleets and detailing, tint and wrap shops"],
      ["hotel", hotel, "hotels, boutique hotels and resorts in Miami and Miami Beach"],
    ] as const) {
      const answer = src.match(/answerOverride=\{`([^`]*)`\}/)?.[1] ?? "";
      expect(answer, name).toContain(intents);
      expect(answer, name).toContain(PRICED);
    }
  });

  it("promises no outcome in a survivor answer (no published project backs one)", () => {
    const OUTCOME = /drive|direct bookings|reserva directa|más reservas|more bookings|more leads|más clientes|guarantee|garantiza/i;
    for (const slug of [
      "marketing-de-video-para-consultorios-medicos-miami",
      "marketing-de-video-para-abogados-miami",
      "produccion-de-video-para-hoteles-miami",
      "edicion-de-video-promocional-para-restaurantes-miami",
      "marketing-de-video-automotriz-miami",
    ]) {
      const page = spanishNichePages.find((entry) => entry.slug === slug)!;
      expect(page.answerFirst ?? "", slug).not.toMatch(OUTCOME);
      for (const line of page.bestFor) expect(line, slug).not.toMatch(OUTCOME);
    }
    for (const file of [
      "app/(english)/services/automotive-video-marketing-miami/page.tsx",
      "app/(english)/services/hotel-hospitality-video-production-miami/page.tsx",
    ]) {
      const answer = readFileSync(join(process.cwd(), file), "utf8").match(/answerOverride=\{`([^`]*)`\}/)?.[1] ?? "";
      expect(answer.length, file).toBeGreaterThan(100);
      expect(answer, file).not.toMatch(OUTCOME);
    }
  });
});
