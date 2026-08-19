import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

import freeze from "../../config/indexable-inventory-freeze.json";
import { PortfolioGrid } from "@/components/portfolio-grid";
import {
  englishGroups as englishFooterGroups,
  spanishGroups as spanishFooterGroups,
} from "@/components/site-footer-client";
import { englishNav, spanishNav } from "@/components/site-header-client";
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
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";
import sitemap from "../sitemap";

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

describe("case-studies hub discoverability and navigation data", () => {
  it("includes /case-studies positioned directly after portfolio in English header nav data", () => {
    const portfolioIndex = englishNav.findIndex(
      (item) => item.href === "/portfolio",
    );
    expect(portfolioIndex).toBeGreaterThanOrEqual(0);
    expect(englishNav[portfolioIndex + 1]).toEqual({
      href: "/case-studies",
      label: "Case studies",
    });
  });

  it("includes /es/casos-de-estudio positioned directly after portfolio in Spanish header nav data", () => {
    const portfolioIndex = spanishNav.findIndex(
      (item) => item.href === "/es/portafolio",
    );
    expect(portfolioIndex).toBeGreaterThanOrEqual(0);
    expect(spanishNav[portfolioIndex + 1]).toEqual({
      href: "/es/casos-de-estudio",
      label: "Casos de estudio",
    });
  });

  it("includes an exact /case-studies link in the English footer nav data", () => {
    const allEnglishFooterItems = englishFooterGroups.flatMap(
      (group) => group.items,
    );
    const item = allEnglishFooterItems.find(
      (candidate) => candidate.href === "/case-studies",
    );
    expect(item).toBeDefined();
    expect(item).toEqual({
      href: "/case-studies",
      label: "Case studies",
    });
  });

  it("includes an exact /es/casos-de-estudio link in the Spanish footer nav data", () => {
    const allSpanishFooterItems = spanishFooterGroups.flatMap(
      (group) => group.items,
    );
    const item = allSpanishFooterItems.find(
      (candidate) => candidate.href === "/es/casos-de-estudio",
    );
    expect(item).toBeDefined();
    expect(item).toEqual({
      href: "/es/casos-de-estudio",
      label: "Casos de estudio",
    });
  });

  it.each(LOCALES)(
    "renders a link to the case-studies hub from PortfolioGrid in %s",
    (locale) => {
      const grid = PortfolioGrid({ items: PORTFOLIO_ITEMS, locale });
      expect(grid).not.toBeNull();

      function findLinkHref(node: unknown, targetHref: string): boolean {
        if (!node || typeof node !== "object") return false;
        const elem = node as { props?: { href?: string; children?: unknown } };
        if (elem.props?.href === targetHref) return true;
        if (Array.isArray(node)) {
          return node.some((child) => findLinkHref(child, targetHref));
        }
        if (Array.isArray(elem.props?.children)) {
          return elem.props.children.some((child) =>
            findLinkHref(child, targetHref),
          );
        }
        if (elem.props?.children) {
          return findLinkHref(elem.props.children, targetHref);
        }
        return false;
      }

      const expectedHref = getCaseStudiesIndexPath(locale);
      expect(findLinkHref(grid, expectedHref)).toBe(true);
    },
  );
});

describe("sitemap inventory freeze is respected", () => {
  // config/indexable-inventory-freeze.json froze the sitemap at 269 URLs on
  // 2026-08-14 (revised to 243 on 2026-08-19) with allowedNewIndexableUrls: 0,
  // pending classification of the existing low/no-impression inventory.
  // The hubs ship as crawlable pages reachable by internal link, and join the
  // sitemap only at unfreeze.
  it("matches the exact approved URL count from the freeze config", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(freeze.approvedSitemapUrlCount);
    expect(new Set(entries.map((e) => e.url)).size).toBe(
      freeze.approvedSitemapUrlCount,
    );
  });

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
