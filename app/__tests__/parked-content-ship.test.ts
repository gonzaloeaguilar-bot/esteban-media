import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { PAGE_QUESTIONS } from "@/lib/page-questions";
import { FILMING_HOURLY, filmingHourlyText, usd } from "@/lib/pricing";
import { languageAlternates, spanishNichePages } from "@/lib/spanish-site";
import { pairedLanguageRoutes } from "@/lib/language-routes";
import { getGuides } from "@/lib/guides";

// Parked-content ship (2026-10-14 overnight log rows 9, 10, 14, 30, 33, 36,
// 72, 73, 89, 94, 107, 109, 111).
const root = process.cwd();
const read = (p: string) => readFileSync(join(root, p), "utf8");
const words = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\$\{[^}]+\}/g, "x").trim().split(/\s+/).filter(Boolean).length;

describe("parked content ship", () => {
  it("row 33: filming floor lives once in lib/pricing.ts and reads as a floor", () => {
    expect(FILMING_HOURLY).toMatchObject({ amount: 125, unit: "hour", isMinimum: true, minimumHours: 4, minimumAmount: 500 });
    expect(filmingHourlyText("en")).toBe(`from ${usd(FILMING_HOURLY.amount)} per hour of filming`);
    expect(filmingHourlyText("es")).toBe(`desde ${usd(FILMING_HOURLY.amount)} por hora de grabación`);
    for (const f of ["lib/guides.ts", "lib/page-questions.ts", "lib/spanish-site.ts", "app/(english)/pricing/page.tsx", "app/(spanish)/es/precios/page.tsx"]) {
      expect(read(f), f).not.toMatch(/\$80\b/);
    }
    const en = getGuides("en").find((g) => g.id === "editor-vs-videographer-guide")!;
    const es = getGuides("es").find((g) => g.id === "editor-vs-videographer-guide")!;
    const enSection = en.sections.find((s) => s.heading === "How much does a videographer charge per hour?")!;
    const esSection = es.sections.find((s) => s.heading === "¿Cuánto cobra un videógrafo por hora?")!;
    expect(enSection.paragraphs[0]).toContain(filmingHourlyText("en"));
    expect(esSection.paragraphs[0]).toContain(filmingHourlyText("es"));
  });

  it("rows 10/14/109/111: every page question is question-shaped, 100-180 words, one answer per id", () => {
    const ids = new Set<string>();
    for (const q of PAGE_QUESTIONS) {
      expect(q.heading, q.id).toMatch(/\?$/);
      const n = words(q.paragraphs.join(" "));
      expect(n, `${q.id} ${n}`).toBeGreaterThanOrEqual(100);
      expect(n, `${q.id} ${n}`).toBeLessThanOrEqual(180);
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);
    }
    const growth = ["/services/conversion-websites", "/services/ai-lead-capture-automation", "/services/local-presence-seo", "/services/growth-funnel-audit", "/services/custom-operations-automation", "/services/creative-production"];
    for (const p of growth) expect(PAGE_QUESTIONS.some((q) => q.path === p), p).toBe(true);
    expect(PAGE_QUESTIONS.filter((q) => q.locale === "es")).toHaveLength(12);
    for (const p of growth) expect(PAGE_QUESTIONS.filter((q) => q.path === p), p).toHaveLength(2);
  });

  it("row 9: daily tools are a WebApplication inside a WebPage", () => {
    for (const f of ["daily-hook-planner", "daily-publish-prompt", "daily-script-pacing-calculator", "daily-script-timer", "daily-shot-list-planner"]) {
      expect(read(`app/(english)/${f}/page.tsx`)).toContain("mainEntity: toolApplicationNode(");
    }
    for (const f of ["prompt-de-publicacion-diaria", "planificador-de-ganchos-de-video", "planificador-de-tomas-de-video", "calculadora-de-ritmo-de-video", "temporizador-de-guiones-de-video"]) {
      expect(read(`app/(spanish)/es/${f}/page.tsx`)).toContain("mainEntity: toolApplicationNode(");
    }
  });

  it("row 36: indexed pages no longer link the noindex law-firm, event and Aventura pages", () => {
    expect(read("lib/service-depth-content.ts")).not.toMatch(/href: "\/services\/(law-firm-video-production-miami|event-video-editing-miami)"/);
    expect(read("app/(english)/portfolio/page.tsx")).not.toContain("/services/real-estate-video-aventura-miami");
  });

  it("row 30: the ES remote-editor twin is in the sitemap and paired both ways", () => {
    const es = "/es/contratar-editor-de-video-remoto";
    const en = "/services/hire-remote-video-editor";
    expect(sitemap().some((e) => e.url.endsWith(es))).toBe(true);
    expect(languageAlternates[en]?.["es-US"]).toBe(es);
    expect(languageAlternates[es]?.["en-US"]).toBe(en);
    expect(pairedLanguageRoutes[en]).toBe(es);
    const page = spanishNichePages.find((p) => p.slug === "contratar-editor-de-video-remoto")!;
    expect(page.faqs).toHaveLength(4);
    expect(page.sections?.[0].heading).toMatch(/\?$/);
  });

  it("rows 72/89: Spanish near-me phrasing and the exact Reels Fort Lauderdale answer", () => {
    const get = (slug: string) => spanishNichePages.find((p) => p.slug === slug)!;
    expect(get("editor-de-reels-fort-lauderdale").sections?.[0].heading).toBe("¿Dónde encontrar un editor de Reels en Fort Lauderdale?");
    expect(get("videografo-en-fort-lauderdale").sections?.[0].heading).toContain("cerca de mí");
    expect(get("videografo-en-miami").sections?.[0].heading).toContain("cerca de mí");
    for (const slug of ["reels-para-negocios-miami", "fotografo-en-fort-lauderdale"]) {
      expect(get(slug).projectFit, slug).toContain("(/es/editor-de-reels-fort-lauderdale)");
    }
  });

  it("rows 73/94: contextual links into thinly linked pages", () => {
    const es = (slug: string) => spanishNichePages.find((p) => p.slug === slug)!.projectFit;
    for (const slug of ["fotografia-de-producto-con-ia-miami", "fotografia-de-joyas-y-lujo-miami", "fotografo-en-fort-lauderdale"]) {
      expect(es(slug), slug).toContain("(/es/fotografia-de-producto-miami)");
    }
    expect(read("lib/guides.ts")).toContain("(/fort-lauderdale)");
    const hub = read("components/guide-pages.tsx");
    expect(hub).toContain('href="/lens"');
    expect(hub).toContain('href="/desk-recommendations"');
  });
});
