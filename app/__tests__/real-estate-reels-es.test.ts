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
});

describe("homepage real-estate block", () => {
  const homes = [
    ["app/(english)/page.tsx", "en"],
    ["app/(spanish)/es/page.tsx", "es"],
  ] as const;

  it.each(homes)("%s puts the block right after the audience router, before the packages", (page, locale) => {
    const src = source(page);
    const router = src.indexOf("<AudienceRouter");
    const block = src.indexOf(`<RealEstateBlock locale="${locale}" />`);
    const packages = src.indexOf("<PackagesSection");
    expect(router).toBeGreaterThan(-1);
    expect(block).toBeGreaterThan(router);
    expect(packages).toBeGreaterThan(block);
  });

  it.each(homes)("%s renders the shelf and the plans exactly once", (page) => {
    const src = source(page);
    // The plans live in the block, so PackagesSection must not draw them too,
    // and the shelf (and with it the VideoObject JSON-LD) is not repeated.
    expect(src).toContain("showRealEstatePlans={false}");
    expect(src).not.toContain("<RealEstateReels");
    expect(src).not.toContain("<RealEstatePlansSection");
    expect(src.split("<RealEstateBlock").length - 1).toBe(1);
  });

  it("keeps the plans in the server HTML behind an attributable fold-out", () => {
    const block = source("components/real-estate-block.tsx");
    expect(block).toContain("<KeepReading");
    expect(block).toContain('cta="real_estate_plans_expand"');
    expect(block).toContain("<RealEstatePlansSection locale={locale} />");
    expect(block).toContain("<RealEstateReels locale={locale} />");
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
