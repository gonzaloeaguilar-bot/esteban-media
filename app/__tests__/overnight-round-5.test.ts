import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import study from "@/data/studies/miami-restaurant-instagram-2026.json";
import { caseStudiesIndexCopy, caseStudyPairs } from "@/lib/case-studies";
import { getGuideBySlug } from "@/lib/guides";
import { RESTAURANT_PROMO, SHORT_FORM, usd } from "@/lib/pricing";
import { SCRIPT_LENGTH_ANSWERS, wordsFor } from "@/lib/script-length-answers";
import { SEASONAL_ANSWERS } from "@/lib/seasonal-answers";
import es from "@/messages/es.json";

const root = process.cwd();
const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
const inBand = (text: string) => {
  const n = words(plain(text));
  return n >= 100 && n <= 180;
};

describe("case-study answers (loop row 68)", () => {
  // The case studies are the pages ChatGPT referrals land on (GA4 90d:
  // /case-studies/homeowners, /case-studies/my-dler) and all ten failed the
  // dual-audience gate: 2/11 question headings, no answer before the narrative.
  for (const pair of caseStudyPairs) {
    for (const locale of ["en", "es"] as const) {
      const study = pair[locale];
      it(`${locale} ${pair.id}: one question-shaped answer of 100-180 words`, () => {
        expect(study.answer.question.endsWith("?")).toBe(true);
        if (locale === "es") expect(study.answer.question.startsWith("¿")).toBe(true);
        expect(inBand(study.answer.text)).toBe(true);
      });
      it(`${locale} ${pair.id}: claims no result figures`, () => {
        expect(study.answer.text).not.toMatch(/\d+\s*%|\$\d|\b\d+x\b|five-star|5 estrellas/i);
        if (study.year) expect(study.answer.text).toContain(String(study.year));
      });
    }
  }

  it("the drone case keeps the aerial-only role boundary", () => {
    const banacol = caseStudyPairs.find((p) => p.id === "banacol")!;
    expect(banacol.en.answer.text).toMatch(/aerial capture only/);
    expect(banacol.es.answer.text).toMatch(/solo la captura aérea/);
    expect(`${banacol.en.answer.text} ${banacol.es.answer.text}`).not.toMatch(/FAA|Part 107|licen[cs]/i);
  });

  for (const locale of ["en", "es"] as const) {
    it(`${locale} hub: three answers in band and a question-shaped closing heading`, () => {
      const copy = caseStudiesIndexCopy[locale];
      expect(copy.answers).toHaveLength(3);
      for (const answer of copy.answers) {
        expect(answer.question.endsWith("?")).toBe(true);
        expect(inBand(answer.text)).toBe(true);
      }
      expect(copy.relatedTitle.endsWith("?")).toBe(true);
    });
  }

  it("renders the answer section and a native <details>, server-side", () => {
    const page = readFileSync(join(root, "components/case-study-page.tsx"), "utf8");
    expect(page).toContain("caseStudy.answer.question");
    expect(page).toContain("<details");
    const hub = readFileSync(join(root, "components/case-studies-index.tsx"), "utf8");
    expect(hub).toContain("copy.answers.map");
    expect(hub).toContain("<details");
  });
});

describe("visible dates on case studies and portfolio pages (loop row 70)", () => {
  it.each([
    "components/case-study-page.tsx",
    "components/case-studies-index.tsx",
    "components/portfolio-watch-page.tsx",
    "app/(english)/portfolio/page.tsx",
    "app/(spanish)/es/portafolio/page.tsx",
    "app/(english)/daily-script-timer/page.tsx",
    "app/(english)/daily-script-pacing-calculator/page.tsx",
    "app/(spanish)/es/temporizador-de-guiones-de-video/page.tsx",
  ])("%s renders the ledger date", (file) => {
    expect(readFileSync(join(root, file), "utf8")).toContain("<PageUpdated");
  });

  it("JSON-LD on those templates carries dateModified from the ledger", () => {
    for (const file of ["lib/case-studies.ts", "lib/portfolio-schema.ts"]) {
      expect(readFileSync(join(root, file), "utf8")).toMatch(/dateModified: pageLastModified\(/);
    }
  });
});

describe("restaurant holiday answer (loop row 71)", () => {
  it("covers the three restaurant pages, no new URL", () => {
    expect(SEASONAL_ANSWERS.map((a) => a.path).sort()).toEqual([
      "/es/edicion-de-video-promocional-para-restaurantes-miami",
      "/es/video-para-restaurantes-miami",
      "/services/restaurant-promo-video-editing-miami",
    ]);
  });

  for (const answer of SEASONAL_ANSWERS) {
    it(`${answer.path}: in band, dated, priced from lib/pricing.ts and the study`, () => {
      const text = answer.paragraphs.join(" ");
      expect(inBand(`${text} ${answer.shotList.join(" ")}`)).toBe(true);
      expect(answer.heading.endsWith("?")).toBe(true);
      // Thanksgiving 2026 is the fourth Thursday of November.
      expect(new Date(Date.UTC(2026, 10, 26)).getUTCDay()).toBe(4);
      expect(text).toContain("26");
      expect(text).toContain(usd(SHORT_FORM.perVideoFrom));
      expect(text).toContain(usd(RESTAURANT_PROMO.from));
      expect(text).toContain(String(study.postsAnalyzed));
      expect(text).toContain(String(study.formats.reelPct).replace(".", answer.locale === "es" ? "," : "."));
    });
  }
});

describe("freelance editor cost answer (loop rows 34/74)", () => {
  for (const slug of ["freelance-video-editor-vs-post-agency", "editor-de-video-freelance-vs-agencia-de-postproduccion"]) {
    it(`${slug}: answers what a freelance editor charges with the Starter price`, () => {
      const guide = getGuideBySlug(slug.startsWith("editor") ? "es" : "en", slug);
      expect(guide).toBeDefined();
      const section = guide!.sections.find((s) => /charge|cobra/i.test(s.heading));
      expect(section).toBeDefined();
      const text = section!.paragraphs.join(" ");
      expect(inBand(text)).toBe(true);
      expect(text).toContain(usd(SHORT_FORM.perVideoFrom));
      expect(text).toContain("Clutch");
    });
  }
});

describe("script-length answers (loop round 5)", () => {
  it("the arithmetic in the copy matches wordsFor()", () => {
    expect(wordsFor(30, 150)).toBe(75);
    expect(wordsFor(60, 150)).toBe(150);
    expect(wordsFor(30, 130)).toBe(65);
    expect(wordsFor(30, 170)).toBe(85);
    for (const answer of SCRIPT_LENGTH_ANSWERS) {
      for (const n of [75, 150, 65, 130, 85, 170]) expect(answer.paragraph).toContain(String(n));
      // The table and the page footer sit in the same section; the prose stays short.
      const n = words(answer.paragraph);
      expect(n).toBeGreaterThanOrEqual(80);
      expect(n).toBeLessThanOrEqual(130);
      expect(answer.heading.endsWith("?")).toBe(true);
    }
  });
});

describe("Spanish portfolio labels (loop round 5)", () => {
  it("the Spanish TitanForge and Frontline titles are in Spanish", () => {
    const items = es.Portfolio.items as Record<string, { title: string }>;
    expect(items.titanforge.title).not.toMatch(/Platform|AI Bot/);
    expect(items["front-line-auto"].title).not.toMatch(/&/);
  });

  it("the web-system badge is not hard-coded English on Spanish pages", () => {
    const source = readFileSync(join(root, "components/portfolio-watch-page.tsx"), "utf8");
    expect(source).toContain('"Sistema web con IA"');
  });
});

describe("services scene photo keeps its alt (loop round 5)", () => {
  it("the rendered <Image> uses the same alt as the scene", () => {
    const source = readFileSync(join(root, "components/services-scene.tsx"), "utf8");
    expect(source).not.toMatch(/^\s*alt=""/m);
    expect(source).toContain("alt={alt}");
  });
});
