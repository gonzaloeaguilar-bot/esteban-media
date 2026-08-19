import { describe, expect, it } from "vitest";

import sitemap from "../sitemap";
import {
  CASE_STUDY_IDS,
  buildCaseStudiesIndexMetadata,
  caseStudiesIndexCopy,
  getCaseStudies,
  getCaseStudiesByDiscipline,
  getCaseStudiesIndexPath,
  getCaseStudyDiscipline,
  getCaseStudyPath,
  type CaseStudyLocale,
} from "@/lib/case-studies";

const LOCALES: readonly CaseStudyLocale[] = ["en", "es"];

// Regression lock: the five case-study detail pages shipped and were listed in
// the sitemap while /case-studies and /es/casos-de-estudio both returned 404,
// because each route segment held only [id]/page.tsx and no index page.
describe("case-studies hub routes exist", () => {
  it.each(LOCALES)("resolves an index page module for %s", async (locale) => {
    const mod =
      locale === "es"
        ? await import("../(spanish)/es/casos-de-estudio/page")
        : await import("../(english)/case-studies/page");

    expect(typeof mod.default).toBe("function");
    expect(mod.metadata).toBeDefined();
  });

  it.each(LOCALES)("canonicalises the %s hub to its own path", (locale) => {
    const metadata = buildCaseStudiesIndexMetadata(locale);
    expect(metadata.alternates?.canonical).toContain(
      getCaseStudiesIndexPath(locale),
    );
  });

  it("declares reciprocal hreflang between the two hubs", () => {
    for (const locale of LOCALES) {
      const languages = buildCaseStudiesIndexMetadata(locale).alternates
        ?.languages as Record<string, string> | undefined;

      expect(languages?.["en-US"]).toContain(caseStudiesIndexCopy.en.path);
      expect(languages?.["es-US"]).toContain(caseStudiesIndexCopy.es.path);
    }
  });
});

describe("no published case study is orphaned from the hub", () => {
  it.each(LOCALES)("groups every %s case study exactly once", (locale) => {
    const grouped = getCaseStudiesByDiscipline(locale).flatMap(
      (group) => group.studies,
    );

    expect(grouped).toHaveLength(getCaseStudies(locale).length);
    expect(new Set(grouped.map((study) => study.id)).size).toBe(
      CASE_STUDY_IDS.length,
    );
  });

  it("assigns a discipline to every declared case-study id", () => {
    for (const id of CASE_STUDY_IDS) {
      expect(getCaseStudyDiscipline(id)).toBeDefined();
    }
  });

  it("keeps the FLAS web + AI concierge project in the systems lane", () => {
    expect(getCaseStudyDiscipline("flas-concierge")).toBe("systems");
  });

  it.each(LOCALES)("links each %s card to its detail page", (locale) => {
    for (const study of getCaseStudies(locale)) {
      expect(getCaseStudyPath(study)).toBe(
        locale === "es"
          ? `/es/casos-de-estudio/${study.id}`
          : `/case-studies/${study.id}`,
      );
    }
  });
});

describe("sitemap inventory freeze is respected", () => {
  // config/indexable-inventory-freeze.json froze the sitemap at 269 URLs on
  // 2026-08-14 with allowedNewIndexableUrls: 0, pending classification of the
  // existing low/no-impression inventory. The hubs ship as crawlable pages
  // reachable by internal link, and join the sitemap only at unfreeze.
  it("does not add the hub URLs to the sitemap while the freeze holds", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).not.toContain(
      `https://estebanmorenomedia.com${caseStudiesIndexCopy.en.path}`,
    );
    expect(urls).not.toContain(
      `https://estebanmorenomedia.com${caseStudiesIndexCopy.es.path}`,
    );
  });

  it("still advertises every case-study detail page", () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const locale of LOCALES) {
      for (const study of getCaseStudies(locale)) {
        expect(urls).toContain(
          `https://estebanmorenomedia.com${getCaseStudyPath(study)}`,
        );
      }
    }
  });
});
