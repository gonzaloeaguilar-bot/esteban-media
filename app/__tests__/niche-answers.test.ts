import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { isConsolidatedPath } from "@/lib/consolidation";
import {
  NICHE_ANSWER_PATHS,
  nicheAreas,
  nicheEntry,
  nicheSections,
  withNicheService,
} from "@/lib/niche-answers";
import { site } from "@/lib/site";
import { PRODUCT_PHOTO_SESSION, RESTAURANT_PROMO, SHORT_FORM, usd } from "@/lib/pricing";
import { spanishNichePages } from "@/lib/spanish-site";

const root = process.cwd();

/** The fact each page already publishes: its own description. */
function pageFact(path: string): string {
  if (path.startsWith("/es/")) {
    const page = spanishNichePages.find((p) => `/es/${p.slug}` === path);
    if (!page) throw new Error(`no Spanish page for ${path}`);
    return page.description;
  }
  const src = readFileSync(join(root, "app/(english)", path, "page.tsx"), "utf8");
  const m =
    src.match(/export const metadata = buildPageMetadata\(\{[\s\S]*?description:\s*(?:\n\s*)?"([^"]+)"/) ??
    src.match(/const content: GeoServicePageContent = \{[\s\S]*?\n  description:\s*(?:\n\s*)?"([^"]+)"/);
  if (!m) throw new Error(`no description found for ${path}`);
  return m[1];
}

const words = (paragraphs: string[]) =>
  paragraphs
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split(/\s+/)
    .filter(Boolean).length;

describe("niche answers (PR #316 pattern at template level)", () => {
  it("covers every row with a live, indexable page", () => {
    expect(NICHE_ANSWER_PATHS.length).toBeGreaterThan(130);
    for (const path of NICHE_ANSWER_PATHS) {
      expect(isConsolidatedPath(path), path).toBe(false);
      if (path.startsWith("/es/")) {
        const page = spanishNichePages.find((p) => `/es/${p.slug}` === path);
        expect(page, path).toBeDefined();
        expect(page!.availability, path).toBe("confirmed");
      } else {
        expect(existsSync(join(root, "app/(english)", path, "page.tsx")), path).toBe(true);
      }
    }
  });

  it("leaves the short-form pair alone (PR #316 already answers there)", () => {
    expect(NICHE_ANSWER_PATHS).not.toContain("/services/short-form-video-editor-miami");
    expect(NICHE_ANSWER_PATHS).not.toContain("/es/editor-de-video-corto-para-redes-miami");
  });

  it.each(NICHE_ANSWER_PATHS)("%s: every answer is a 100-180 word question-headed section", (path) => {
    const entry = nicheEntry(path, pageFact(path))!;
    const { folded, contact } = nicheSections(entry);
    for (const s of [...folded, contact]) {
      expect(s.heading.endsWith("?"), s.heading).toBe(true);
      const n = words(s.paragraphs);
      expect(n, `${path} ${s.id} = ${n} words`).toBeGreaterThanOrEqual(100);
      // The contact answer is followed by three button labels (~6 words) that
      // the served-HTML gate counts into the same section.
      expect(n, `${path} ${s.id} = ${n} words`).toBeLessThanOrEqual(s === contact ? 170 : 180);
    }
    expect(folded.some((s) => /^(Who can help me|¿Quién me ayuda)/.test(s.heading))).toBe(true);
    expect(folded.some((s) => /cost|cuesta/.test(s.heading))).toBe(entry.cost);
    // Subjects carry their own article, so a template must never glue one on.
    const all = [...folded, contact].flatMap((s) => [s.heading, ...s.paragraphs]).join(" ");
    expect(all).not.toMatch(/\b(de|a) el\b|\bMost an? \b|\bcon la la\b|\bel el\b/);
    // Market rates and quote-only answers must not be called Esteban's prices.
    if (entry.model === "photo" || entry.model === "photoSession" || entry.model === "quote") {
      expect(folded.map((s) => s.paragraphs.join(" ")).join(" ")).not.toMatch(/starting point from the published price list|precios de partida de la lista publicada/);
    }
  });

  it.each(NICHE_ANSWER_PATHS)("%s: contact text is plain and the schema matches it", (path) => {
    const entry = nicheEntry(path, pageFact(path))!;
    const text = nicheSections(entry).contact.paragraphs.join(" ");
    expect(text).toContain(site.phone.display);
    expect(text).toContain(`wa.me/${site.phone.e164.replace(/\D/g, "")}`);
    expect(text).toContain(site.email);

    const jsonLd = withNicheService(path, { "@context": "https://schema.org", "@graph": [] });
    const service = (jsonLd["@graph"] as Record<string, unknown>[]).find((n) => n["@type"] === "Service")!;
    const provider = service.provider as Record<string, unknown>;
    expect(provider.telephone).toBe(site.phone.e164);
    expect(provider["@type"]).toEqual(["LocalBusiness", "ProfessionalService"]);
    expect(service.serviceType).toBe(entry.subject);
    for (const area of service.areaServed as { name: string }[]) {
      const visible = entry.locale === "es" ? area.name.replace(" County", "") : area.name;
      expect(text, `${path} areaServed ${area.name}`).toContain(visible);
    }
    expect((service.areaServed as unknown[]).length).toBe(nicheAreas(entry.place).length);
  });

  it("merges into an existing Service node instead of adding a second one", () => {
    const path = "/services/music-video-post-production-miami";
    const out = withNicheService(path, {
      "@context": "https://schema.org",
      "@graph": [{ "@type": "Service", "@id": "x#service", name: "Keep me", areaServed: "Wynwood / Miami Beach" }],
    });
    const graph = out["@graph"] as Record<string, unknown>[];
    expect(graph.filter((n) => n["@type"] === "Service")).toHaveLength(1);
    expect(graph[0].name).toBe("Keep me");
    expect(Array.isArray(graph[0].areaServed)).toBe(true);
  });

  it("agrees the cost question with plural subjects", () => {
    const head = (p: string) => nicheSections(nicheEntry(p, pageFact(p))!).folded.find((s) => /cost|cuest/.test(s.heading))!.heading;
    expect(head("/services/headshot-photographer-miami")).toMatch(/^How much do professional headshots cost/);
    expect(head("/es/imagenes-con-ia-para-ecommerce-miami")).toMatch(/^¿Cuánto cuestan las imágenes/);
    expect(head("/services/dental-video-marketing-south-florida".replace("dental-video-marketing-south-florida", "music-video-post-production-miami"))).toMatch(/^How much does /);
  });

  it("prices the restaurant pages from the owner's RESTAURANT_PROMO, never the video Starter", () => {
    for (const path of [
      "/services/restaurant-promo-video-editing-miami",
      "/es/video-para-restaurantes-miami",
      "/es/edicion-de-video-promocional-para-restaurantes-miami",
    ]) {
      const cost = nicheSections(nicheEntry(path, pageFact(path))!).folded.find((s) => /cost|cuest/.test(s.heading))!;
      const text = cost.paragraphs.join(" ");
      expect(text, path).toContain(usd(RESTAURANT_PROMO.from));
      // The Starter per-video price may appear only as the separate single-Reel
      // edit (2026-10-14: buyers saw "$240" and "$100 per video" as two prices
      // for one thing), never as the restaurant price itself.
      for (const sentence of text.split(/(?<=\.)\s+/)) {
        if (sentence.includes(usd(SHORT_FORM.perVideoFrom))) {
          expect(sentence, path).toMatch(/Starter|Arranque/);
          expect(sentence, path).not.toContain(usd(RESTAURANT_PROMO.from));
        }
      }
    }
  });

  it("real product-shoot pages quote the owner's session floor; AI-image pages do not", () => {
    const costOf = (p: string) => nicheSections(nicheEntry(p, pageFact(p))!).folded.find((s) => /cost|cuest/.test(s.heading))!.paragraphs.join(" ");
    for (const p of ["/services/product-photography-miami", "/services/jewelry-product-photography-miami", "/es/fotografia-de-joyas-y-lujo-miami"]) {
      expect(costOf(p), p).toContain(usd(PRODUCT_PHOTO_SESSION.from));
    }
    for (const p of ["/services/ai-product-photography-miami", "/es/imagenes-con-ia-para-ecommerce-miami"]) {
      expect(costOf(p), p).not.toContain(usd(PRODUCT_PHOTO_SESSION.from));
    }
  });

  it("does not touch pages outside the registry", () => {
    const input = { "@context": "https://schema.org", "@graph": [{ "@type": "Service" }] };
    const out = withNicheService("/services/website-design-fort-lauderdale", input) as { "@graph": object[] };
    // The Service node is untouched; only the ledger's page date may be added.
    expect(out["@graph"][0]).toBe(input["@graph"][0]);
    expect(out["@graph"].slice(1)).toEqual(
      out["@graph"].slice(1).map(() => expect.objectContaining({ "@type": "WebPage", dateModified: expect.any(String) })),
    );
  });

  it("never prints a price that is not computed from lib/pricing.ts", () => {
    const src = readFileSync(join(root, "lib/niche-answers.ts"), "utf8");
    // Only `$` inside template interpolation (${...}) is allowed in the copy.
    expect(src.match(/\$[0-9]/g) ?? []).toEqual([]);
  });
});
