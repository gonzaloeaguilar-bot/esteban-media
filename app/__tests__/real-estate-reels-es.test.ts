import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { getPairedLanguageRoute } from "@/lib/language-routes";
import {
  REAL_ESTATE_REELS,
  REAL_ESTATE_REELS_PATH,
  REAL_ESTATE_REELS_PATH_ES,
  buildRealEstateReelsJsonLd,
  realEstateReelsPath,
} from "@/lib/real-estate-reels";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("real-estate reel shelf, Spanish parity", () => {
  it("links each locale to its own service page, and the pair is hreflang-matched", () => {
    expect(realEstateReelsPath("en")).toBe(REAL_ESTATE_REELS_PATH);
    expect(realEstateReelsPath("es")).toBe(REAL_ESTATE_REELS_PATH_ES);
    expect(getPairedLanguageRoute(REAL_ESTATE_REELS_PATH)).toBe(REAL_ESTATE_REELS_PATH_ES);
  });

  it("describes the videos in Spanish on Spanish pages, from the same records", () => {
    const graph = buildRealEstateReelsJsonLd("es")["@graph"];
    expect(graph).toHaveLength(REAL_ESTATE_REELS.length);
    graph.forEach((node, index) => {
      expect(node.name).toBe(REAL_ESTATE_REELS[index].titleEs);
      expect(node.description).toBe(REAL_ESTATE_REELS[index].captionEs);
      expect(node.inLanguage).toBe("es");
    });
  });

  it("keeps the English schema unchanged", () => {
    const graph = buildRealEstateReelsJsonLd()["@graph"];
    graph.forEach((node, index) => {
      expect(node.name).toBe(REAL_ESTATE_REELS[index].title);
      expect(node.description).toBe(REAL_ESTATE_REELS[index].caption);
      expect(node.inLanguage).toEqual(["en", "es"]);
    });
  });

  it("renders the Spanish shelf on the Spanish service page", () => {
    expect(
      source("app/(spanish)/es/editor-de-video-real-estate-miami/page.tsx"),
    ).toContain('<RealEstateReels locale="es" />');
  });

  it("keeps the reel service link in the visitor's language", () => {
    const reels = source("components/real-estate-reels.tsx");
    expect(reels).toContain("href={realEstateReelsPath(locale)}");
    expect(reels).not.toContain("href={REAL_ESTATE_REELS_PATH}");
  });
});

describe("homepage: the real-estate section is gone", () => {
  const homes = [
    ["app/(english)/page.tsx", "en"],
    ["app/(spanish)/es/page.tsx", "es"],
  ] as const;

  // Owner, 2026-10-12: "we dont need the REAL ESTATE REELS / 'See the work,
  // then start your reel.' section on homepage cause we already shown all the
  // work proper." The reel shelf was a SECOND work rail and a second chooser,
  // one screen below PortfolioTeaser. It is removed from both homepages.
  //
  // Nothing is lost: the shelf and its VideoObject JSON-LD still render on the
  // two dedicated service pages, asserted below and further down this file.
  it.each(homes)("%s renders no real-estate rail or block", (page) => {
    const src = source(page);
    expect(src).not.toContain("RealEstateBlock");
    expect(src).not.toContain("<RealEstateReels");
    expect(src).not.toContain("<RealEstatePlansSection");
  });

  it.each(homes)("%s still suppresses the duplicate plans in the fold", (page) => {
    // The plans live in the price sheet the chooser opens, not in
    // PackagesSection, so this stays false even with the block gone.
    expect(source(page)).toContain("showRealEstatePlans={false}");
  });

  it.each(homes)("%s keeps the shelf reachable from a real service page", (page) => {
    // The homepage no longer shows the reels, so the only way a visitor (or a
    // crawler) reaches them is the service page link. Prove that link exists.
    expect(source(page)).toContain("KeepReading");
  });

  it("keeps the real-estate figures in the server HTML, in the price fold", () => {
    // This is the reason the assertion was written and it is unchanged: the
    // figures stay in the SERVER HTML. A native <details> keeps them there; a
    // client-mounted sheet would not. GPTBot and ClaudeBot execute no JS.
    const fold = source("components/price-sheet.tsx");
    expect(fold).toContain("realEstatePlans()");
    expect(fold).toContain("<details");
    expect(fold).not.toContain('"use client"');
  });

  it("still renders the shelf, once, on each dedicated service page", () => {
    for (const page of [
      "app/(english)/services/real-estate-reels-video-editor-south-florida/page.tsx",
      "app/(spanish)/es/editor-de-video-real-estate-miami/page.tsx",
    ]) {
      expect(source(page).split("<RealEstateReels").length - 1).toBe(1);
    }
  });

  it("leaves the plans visible by default where PackagesSection is used elsewhere", () => {
    expect(source("components/packages-section.tsx")).toContain("showRealEstatePlans = true");
    for (const page of ["app/(english)/pricing/page.tsx", "app/(spanish)/es/precios/page.tsx"]) {
      expect(source(page)).not.toContain("showRealEstatePlans");
      expect(source(page)).not.toContain("RealEstateReels");
    }
  });

  it("does not double the shelf on the real-estate service pages", () => {
    for (const page of [
      "app/(english)/services/real-estate-reels-video-editor-south-florida/page.tsx",
      "app/(spanish)/es/editor-de-video-real-estate-miami/page.tsx",
    ]) {
      const src = source(page);
      expect(src.split("<RealEstateReels").length - 1).toBe(1);
      expect(src).not.toContain("PackagesSection");
      expect(src).not.toContain("RealEstateBlock");
    }
  });
});
