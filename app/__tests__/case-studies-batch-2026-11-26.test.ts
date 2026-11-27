import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CaseStudyPage } from "@/components/case-study-page";
import { CaseStudyRail, LATEST_CASE_STUDY_IDS, openingSentence } from "@/components/case-study-rail";
import {
  buildCaseStudyStructuredData,
  caseStudyPairs,
  getCaseStudyById,
  type CaseStudyId,
} from "@/lib/case-studies";
import { caseStudyPriceLine } from "@/lib/case-study-pricing";
import { REAL_ESTATE_REELS } from "@/lib/real-estate-reels";
import { REAL_ESTATE_PLANS, SHORT_FORM, usd } from "@/lib/pricing";

// Case-study batch 2026-11-26 (vault: esteban-case-studies-batch-2026-11-26).
// Every assertion here goes red when the matching change is reverted.

const root = join(__dirname, "..", "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const NEW_IDS = ["real-estate-reels-davie", "ai-edit-prep-reel", "dupont-ai-commercial"] as const satisfies readonly CaseStudyId[];
const LOCALES = ["en", "es"] as const;

function renderCase(id: CaseStudyId, locale: "en" | "es") {
  const study = getCaseStudyById(locale, id)!;
  return renderToStaticMarkup(React.createElement(CaseStudyPage, { caseStudy: study }));
}

describe("new case studies open with the answer", () => {
  it("the Davie case names the tour, the city and the two explainers in its first sentence", () => {
    const en = openingSentence(getCaseStudyById("en", "real-estate-reels-davie")!.summary);
    expect(en).toMatch(/^Esteban Moreno Media edited three vertical Reels/);
    expect(en).toContain("52-second Spanish home tour");
    expect(en).toContain("Davie, FL");
    const es = openingSentence(getCaseStudyById("es", "real-estate-reels-davie")!.summary);
    expect(es).toContain("Davie, FL");
  });

  it("the AI case quotes its Instagram views with the source and read date", () => {
    for (const locale of LOCALES) {
      const study = getCaseStudyById(locale, "ai-edit-prep-reel")!;
      expect(openingSentence(study.summary)).toContain("1,202");
      expect(study.summary).toContain("Metricool");
      expect(study.summary).toMatch(/26 de noviembre de 2026|November 26, 2026/);
    }
  });
});

describe("self-hosted videos: rendered, real files, VideoObject with creator", () => {
  for (const id of NEW_IDS) {
    for (const locale of LOCALES) {
      it(`${locale} ${id}`, () => {
        const study = getCaseStudyById(locale, id)!;
        expect(study.videos?.length).toBeGreaterThan(0);
        const html = renderCase(id, locale);
        const graph = buildCaseStudyStructuredData(study)["@graph"] as Array<Record<string, unknown>>;
        const videos = graph.filter((node) => node["@type"] === "VideoObject");
        expect(videos).toHaveLength(study.videos!.length);
        for (const video of study.videos!) {
          expect(existsSync(join(root, "public", video.src))).toBe(true);
          expect(existsSync(join(root, "public", video.poster))).toBe(true);
          expect(html).toContain(`data-media-id="${video.id}"`);
          expect(html).toContain(`src="${video.src}"`);
        }
        for (const node of videos) {
          expect(node.creator).toMatchObject({ "@type": "Organization", name: "Esteban Moreno Media" });
          expect(String(node.contentUrl)).toMatch(/^https:\/\/estebanmorenomedia\.com\//);
          expect(node.duration).toMatch(/^PT\d+S$/);
        }
      });
    }
  }

  it("reel durations agree with the shelf record (one source of truth for the files)", () => {
    const study = getCaseStudyById("en", "real-estate-reels-davie")!;
    for (const video of study.videos!) {
      const shelf = REAL_ESTATE_REELS.find((reel) => reel.src === video.src)!;
      expect(shelf, video.src).toBeDefined();
      expect(video.durationSeconds).toBe(shelf.durationSeconds);
      expect(video.uploadDate).toBe(shelf.publishedAt);
    }
  });
});

describe("contact step: attributed source and a price read from lib/pricing.ts", () => {
  it("every case study links to contact with ?source=case-study", () => {
    for (const pair of caseStudyPairs) {
      expect(renderCase(pair.id, "en")).toContain('href="/contact?source=case-study"');
      expect(renderCase(pair.id, "es")).toContain('href="/es/contacto?source=case-study"');
    }
  });

  it("case-study is an accepted lead source on /api/lead and on both contact forms", () => {
    expect(read("lib/lead-responder.ts").split("\n").filter((l) => l.trim() === '"case-study",')).toHaveLength(1);
    expect(read("app/(english)/contact/page.tsx")).toMatch(/const CAPTURE_SOURCES = \[[^\]]*"case-study"/);
    expect(read("app/(spanish)/es/contacto/page.tsx")).toMatch(/querySources=\{\[[^\]]*"case-study"/);
  });

  it("shows the current starting price, not a typed one", () => {
    const perVideo = usd(SHORT_FORM.perVideoFrom);
    const monthly = usd(Math.min(...REAL_ESTATE_PLANS.map((plan) => plan.price)));
    expect(renderCase("real-estate-reels-davie", "en")).toContain(perVideo);
    expect(renderCase("real-estate-reels-davie", "en")).toContain(monthly);
    expect(renderCase("ai-edit-prep-reel", "es")).toContain(perVideo);
    expect(renderCase("banacol", "en")).toContain(caseStudyPriceLine("drone-editing", "en").text);
  });
});

describe("Banacol keeps to what Esteban described", () => {
  const text = (locale: "en" | "es") => JSON.stringify(caseStudyPairs.find((p) => p.id === "banacol")![locale]);

  it("drops the details no source supports", () => {
    for (const locale of LOCALES) {
      expect(text(locale)).not.toMatch(/4K|GPS|polariz|hand[- ]?(catch|recover)|millions of boxes|North America and Europe|Port Everglades/i);
    }
  });

  it("keeps the flight from a boat and the export to the United States, and states the Part 107 boundary outside the answer", () => {
    expect(text("en")).toContain("from a boat");
    expect(text("en")).toContain("United States");
    expect(text("es")).toContain("desde una lancha");
    expect(text("en")).toMatch(/FAA Part 107 remote pilot/);
    expect(getCaseStudyById("en", "banacol")!.serviceLink.href).toBe("/services/drone-video-editing-service-miami");
  });
});

describe("each new case study is linked from /portfolio, the hub and its service page", () => {
  it("portfolio pages render the latest-cases rail", () => {
    expect(LATEST_CASE_STUDY_IDS).toEqual(["real-estate-reels-davie", "ai-edit-prep-reel", "dupont-ai-commercial", "banacol"]);
    for (const path of ["app/(english)/portfolio/page.tsx", "app/(spanish)/es/portafolio/page.tsx"]) {
      expect(read(path)).toContain("<CaseStudyRail ids={LATEST_CASE_STUDY_IDS}");
    }
    const html = renderToStaticMarkup(
      React.createElement(CaseStudyRail, { ids: LATEST_CASE_STUDY_IDS, locale: "en", source: "t" }),
    );
    expect(html).toContain('href="/case-studies/real-estate-reels-davie"');
    expect(html).toContain('href="/case-studies/ai-edit-prep-reel"');
    expect(html).toContain("Esteban Moreno Media edited three vertical Reels");
  });

  it.each([
    ["app/(english)/services/real-estate-reels-video-editor-south-florida/page.tsx", "real-estate-reels-davie"],
    ["app/(spanish)/es/editor-de-video-real-estate-miami/page.tsx", "real-estate-reels-davie"],
    ["app/(english)/services/reels-editor-fort-lauderdale/page.tsx", "ai-edit-prep-reel"],
    ["app/(spanish)/es/editor-de-reels-fort-lauderdale/page.tsx", "ai-edit-prep-reel"],
    ["app/(spanish)/es/edicion-de-video-con-dron-miami/page.tsx", "banacol"],
    ["app/(english)/services/ai-commercial-video-reels-miami/page.tsx", "dupont-ai-commercial"],
    ["app/(spanish)/es/reels-comerciales-con-ia-miami/page.tsx", "dupont-ai-commercial"],
  ])("%s links to %s", (path, id) => {
    expect(read(path)).toMatch(new RegExp(`<CaseStudyRail\\s+ids=\\{\\["${id}"\\]\\}`));
  });

  it("the case-study service links point back at those pages", () => {
    expect(getCaseStudyById("en", "real-estate-reels-davie")!.serviceLink.href).toBe("/services/real-estate-reels-video-editor-south-florida");
    expect(getCaseStudyById("es", "real-estate-reels-davie")!.serviceLink.href).toBe("/es/editor-de-video-real-estate-miami");
    expect(getCaseStudyById("en", "ai-edit-prep-reel")!.serviceLink.href).toBe("/services/reels-editor-fort-lauderdale");
    expect(getCaseStudyById("es", "ai-edit-prep-reel")!.serviceLink.href).toBe("/es/editor-de-reels-fort-lauderdale");
  });
});

describe("DuPont AI commercial (owner request 2026-11-26)", () => {
  const text = (locale: "en" | "es") => JSON.stringify(caseStudyPairs.find((p) => p.id === "dupont-ai-commercial")![locale]);

  it("opens with the client, the no-shoot method and the dated Metricool result", () => {
    const en = openingSentence(getCaseStudyById("en", "dupont-ai-commercial")!.summary);
    expect(en).toContain("DuPont International Realty");
    expect(en).toContain("no film shoot");
    expect(en).toContain("3,157 Instagram views");
    expect(getCaseStudyById("en", "dupont-ai-commercial")!.summary).toContain("read November 26, 2026");
  });

  it("labels the work as AI-made and names who made what", () => {
    expect(text("en")).toMatch(/AI-generated/);
    expect(text("es")).toMatch(/generadas con IA/);
    expect(text("en")).toContain("DuPont International Realty is the client brand");
  });

  it("never publishes a street address, and does not headline the 43-view repost", () => {
    for (const locale of LOCALES) {
      expect(text(locale)).not.toMatch(/\b\d{2,5}\s+[A-Z][a-z]+\s+(St|Ave|Blvd|Rd|Dr|Way|Ct|Ln)\b/);
      expect(text(locale)).not.toMatch(/\b43 (views|vistas)\b/);
    }
  });

  it("plays the landscape master at 16:9 and prices from lib/pricing.ts", () => {
    const html = renderCase("dupont-ai-commercial", "en");
    expect(html).toContain("aspect-ratio:1280 / 720");
    expect(html).toContain(caseStudyPriceLine("ai-commercial", "en").text);
    expect(html).toContain('href="/services/ai-commercial-video-reels-miami"');
    expect(html).toContain("https://www.instagram.com/reel/Df5zAMrMH9T/");
  });
});
