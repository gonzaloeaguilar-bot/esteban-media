import { readdirSync, readFileSync } from "node:fs";

import { buildCaseStudyStructuredData, getCaseStudies } from "@/lib/case-studies";
import { buildGuideStructuredData, getGuides } from "@/lib/guides";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import EnCalculator from "../(english)/calculator/page";
import EnAssessment from "../(english)/assessment/page";
import EnSocialKit from "../(english)/resources/social-video-kit/page";
import EsCalculadora from "../(spanish)/es/calculadora/page";
import EsEvaluacion from "../(spanish)/es/evaluacion/page";
import EsKit from "../(spanish)/es/recursos/kit-video-social/page";
import ReelsMiami from "../(english)/services/reels-editor-miami/page";
import ReelsFtl from "../(english)/services/reels-editor-fort-lauderdale/page";

// Mechanical fixes from .ai/seo-geo-code-audit-2026-10-10.md.

function headings(markup: string, level: number): string[] {
  return [...markup.matchAll(new RegExp(`<h${level}[^>]*>([\\s\\S]*?)</h${level}>`, "g"))].map(
    (match) => match[1].replace(/<[^>]+>/g, "").trim(),
  );
}

describe("tool pages server-render one H1 (fix 11)", () => {
  it.each([
    ["/calculator", EnCalculator, "Video Production &amp; Editing Budget Calculator"],
    ["/assessment", EnAssessment, "South Florida Video Strategy Diagnostic"],
    ["/resources/social-video-kit", EnSocialKit, "Social Video Ad Script &amp; Safe-Zone Kit"],
    ["/es/calculadora", EsCalculadora, "Calculadora de Presupuesto de Video"],
    ["/es/evaluacion", EsEvaluacion, "Diagnóstico de Estrategia de Video"],
    ["/es/recursos/kit-video-social", EsKit, "Kit de Guiones y Zonas Seguras de Video"],
  ])("%s", (_path, Page, h1) => {
    const found = headings(renderToStaticMarkup(Page()), 1);
    expect(found).toEqual([h1]);
  });
});

describe("Reels pages have no duplicate H2 (fix 10)", () => {
  it.each([
    ["/services/reels-editor-miami", ReelsMiami],
    ["/services/reels-editor-fort-lauderdale", ReelsFtl],
  ])("%s", (_path, Page) => {
    const h2s = headings(renderToStaticMarkup(Page()), 2);
    expect(h2s.length).toBeGreaterThan(2);
    expect(new Set(h2s).size).toBe(h2s.length);
  });
});

describe("entity hygiene (fix 7)", () => {
  const business = { "@id": "https://estebanmorenomedia.com/#business" };
  const person = { "@id": "https://estebanmorenomedia.com/#esteban" };

  function articleOf(graph: { "@graph": Array<Record<string, unknown>> }) {
    return graph["@graph"].find((node) => node["@type"] === "Article")!;
  }

  it("guides reference #business (no visible byline) and carry an image", () => {
    for (const locale of ["en", "es"] as const) {
      for (const guide of getGuides(locale)) {
        const article = articleOf(buildGuideStructuredData(guide));
        expect(article.author).toEqual(business);
        expect(article.publisher).toEqual(business);
        expect(article.image).toBe("https://estebanmorenomedia.com/social-card");
      }
    }
  });

  it("case studies reference #esteban (named in the body) and #business", () => {
    for (const locale of ["en", "es"] as const) {
      for (const study of getCaseStudies(locale)) {
        const article = articleOf(buildCaseStudyStructuredData(study));
        expect(article.author).toEqual(person);
        expect(article.publisher).toEqual(business);
      }
    }
  });

  it("no page source re-declares the business as an inline LocalBusiness stub", () => {
    const offenders = ["app", "components", "lib"]
      .flatMap((dir) =>
        readdirSync(dir, { recursive: true, encoding: "utf8" }).map((file) => `${dir}/${file}`),
      )
      .filter((file) => /\.tsx?$/.test(file))
      .filter((file) => !file.includes("__tests__"))
      // The sitewide entity itself, and files owned by another branch.
      .filter((file) => !["lib/entity-schema.ts", "lib/real-estate-reels.ts"].includes(file))
      .filter((file) => readFileSync(file, "utf8").includes('"@type": "LocalBusiness"'));
    expect(offenders).toEqual([]);
  });
});

describe("AI user-initiated fetchers skip the language redirect (fix 15)", () => {
  it("names the three fetchers in the middleware crawler pattern", () => {
    const middleware = readFileSync(join(process.cwd(), "middleware.ts"), "utf8");
    for (const agent of ["chatgpt-user", "claude-user", "perplexity-user"]) {
      expect(middleware).toContain(agent);
    }
  });
});
