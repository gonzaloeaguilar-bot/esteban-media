import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { esServicePhrase } from "@/components/service-depth";
import { DEMAND_MAP_ANSWERS, goingRateAnswer } from "@/lib/demand-map-answers";
import { getGuideBySlug } from "@/lib/guides";
import { pairedLanguageRoutes } from "@/lib/language-routes";
import { ownerFactAnswers } from "@/lib/owner-fact-answers";
import { FILMING_HOURLY, PRICING_BANDS, SHORT_FORM, usd } from "@/lib/pricing";

// Demand coverage map 2026-10-14 (vault esteban-demand-coverage-map-2026-10-14),
// the "ready to build" DM rows shipped in one wave.

const words = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

const root = process.cwd();

describe("demand-map answers (DM rows, 2026-10-14)", () => {
  const all = Object.entries(DEMAND_MAP_ANSWERS).flatMap(([path, sections]) =>
    sections.map((section) => ({ path, section })),
  );

  it.each(all.map(({ path, section }) => [`${path}#${section.id}`, section] as const))(
    "%s is a question-headed section in the 100-180 word band",
    (_, section) => {
      expect(section.heading).toMatch(/\?$/);
      const n = words(section.paragraphs.join(" "));
      expect(n).toBeGreaterThanOrEqual(100);
      expect(n).toBeLessThanOrEqual(180);
    },
  );

  it("claims no drone work, no on-camera UGC offer and no fluent English", () => {
    const text = JSON.stringify(DEMAND_MAP_ANSWERS);
    expect(text).not.toMatch(/drone|dron\b|aerial|aére|fluent|fluido/i);
    expect(text).toContain("No graba UGC frente a cámara");
    // Editing is per video (owner fact); no hourly editing rate may appear.
    expect(text).not.toMatch(/per hour of editing|por hora de edición/i);
  });

  it("reads every figure from lib/pricing.ts", () => {
    const text = JSON.stringify(DEMAND_MAP_ANSWERS);
    expect(text).toContain(usd(FILMING_HOURLY.amount));
    expect(text).toContain(usd(SHORT_FORM.perVideoFrom));
    expect(text).toContain(usd(PRICING_BANDS.youtube.baseMin));
    expect(text).toContain(usd(PRICING_BANDS.youtube.baseMax));
    for (const file of ["lib/demand-map-answers.ts"]) {
      const src = readFileSync(join(root, file), "utf8");
      // No hand-typed dollar figure in the source: every price is interpolated.
      expect(src.replace(/\/\/.*$/gm, "")).not.toMatch(/\$\d/);
    }
  });

  it("renders through the existing owner-fact slot, after any owner-fact sections", () => {
    const creator = ownerFactAnswers("/services/content-creator-video-editing-miami").map((s) => s.id);
    expect(creator).toEqual(["vlogs", "vlog-editing-rates"]);
    expect(ownerFactAnswers("/es/editor-de-reels-fort-lauderdale").map((s) => s.heading)).toEqual([
      "¿Buscas un editor de video en Fort Lauderdale?",
      "¿Editor de Reels freelance o agencia?",
    ]);
  });

  it("puts the most-suggested query (DM-18) in a heading on the remote-editor page", () => {
    const headings = ownerFactAnswers("/es/contratar-editor-de-video-remoto").map((s) => s.heading);
    expect(headings[0]).toContain("Editor de videos para YouTube");
  });

  it("fixes the keyword-y opening question on the remote-editor page", () => {
    expect(esServicePhrase("contratar editor de video remoto")).toBe("edición de video remota");
  });

  it("answers the going rate on both pricing hubs with market and own figures", () => {
    for (const locale of ["en", "es"] as const) {
      const a = goingRateAnswer(locale);
      expect(a.question).toMatch(/\?$/);
      expect(a.answer).toContain(usd(SHORT_FORM.marketMin));
      expect(a.answer).toContain(usd(SHORT_FORM.marketMax));
      expect(a.answer).toContain(usd(SHORT_FORM.perVideoFrom));
    }
  });
});

describe("demand-map guides and pages (DM-1, DM-16, DM-21/22, DM-25, DM-28)", () => {
  it("opens the Miami production cost guide with the cost question (DM-1)", () => {
    expect(getGuideBySlug("en", "corporate-video-production-cost-miami")?.sections[0].heading).toBe(
      "How much does video production cost in Miami?",
    );
    expect(getGuideBySlug("es", "cuanto-cuesta-la-produccion-de-video-corporativo-miami")?.sections[0].heading).toBe(
      "¿Cuánto cuesta la producción de video en Miami?",
    );
  });

  it("opens the real estate cost guide with the videography question (DM-28)", () => {
    const en = getGuideBySlug("en", "how-much-does-real-estate-video-cost-miami")!;
    expect(en.sections[0].heading).toBe("How much does real estate videography cost in Miami?");
    expect(words(en.sections[0].paragraphs.join(" "))).toBeLessThanOrEqual(180);
  });

  it("adds the freelance videographer section to the editor-vs-videographer guide (DM-25)", () => {
    const es = getGuideBySlug("es", "editor-de-video-vs-videografo")!;
    const section = es.sections.find((s) => s.heading === "¿Videógrafo freelance o productora?");
    expect(section).toBeDefined();
    expect(JSON.stringify(section)).toContain(usd(FILMING_HOURLY.amount));
  });

  it("publishes the influencer guide pair with 100-180 word question sections (DM-21/22)", () => {
    const en = getGuideBySlug("en", "how-to-start-as-an-influencer")!;
    const es = getGuideBySlug("es", "como-empezar-a-ser-influencer")!;
    for (const guide of [en, es]) {
      expect(guide.sections.length).toBeGreaterThanOrEqual(6);
      for (const section of guide.sections) {
        expect(section.heading).toMatch(/\?$/);
        const n = words(section.paragraphs.join(" "));
        expect(n, section.heading).toBeGreaterThanOrEqual(100);
        expect(n, section.heading).toBeLessThanOrEqual(180);
      }
      expect(JSON.stringify(guide)).not.toMatch(/drone|dron\b|followers in|seguidores en \d/i);
    }
    expect(es.sections.map((s) => s.heading)).toContain("¿Cómo empezar a ser influencer de moda?");
  });

  it("pairs the new English videographer page with the Spanish one (DM-16)", () => {
    expect(pairedLanguageRoutes["/services/videographer-miami"]).toBe("/es/videografo-en-miami");
    expect(pairedLanguageRoutes["/es/videografo-en-miami"]).toBe("/services/videographer-miami");
  });
});
