import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";
import sitemap from "../sitemap";
import {
  MERGE_DECISIONS,
  isConsolidatedPath,
  isMergedPath,
  resolveMergedPath,
} from "@/lib/consolidation";
import { getPairedLanguageRoute } from "@/lib/language-routes";
import { languageAlternates } from "@/lib/spanish-site";
import { SERVICE_SIBLING_CLUSTERS, SPANISH_SIBLING_CLUSTERS } from "@/lib/service-depth-content";

/**
 * 2026-11-26 zero-signal prune. 50 pages (52 merged by #843; #842 reversed 2 it strengthened) that were indexed by Google yet earned
 * 0 impressions, 0 GA4 sessions and 0 lead events in the 90 days
 * 2026-08-27..2026-11-25 now 301 to a same-language page with the same buyer
 * intent. Evidence and the full hold list: vault page
 * client-esteban-media/wiki/esteban-page-prune-2026-11-26.md.
 *
 * The sample below is the negative control: revert a merge (or the redirect
 * wiring in next.config.ts) and these assertions go red.
 */
const SAMPLE: ReadonlyArray<readonly [string, string]> = [
  ["/services/contractor-video-marketing-south-florida", "/services/contractor-video-marketing-florida"],
  ["/services/corporate-video-production-brickell", "/services/corporate-video-production-miami"],
  ["/services/video-podcast-editing-service-miami", "/services/podcast-clipping-service-miami"],
  ["/es/video-inmobiliario-sunny-isles", "/es/editor-de-video-real-estate-miami"],
  ["/es/fotografia-de-joyas-y-lujo-miami", "/es/fotografia-de-producto-miami"],
  ["/es/videografo-para-galas-corporativas-miami", "/es/videografo-para-eventos-corporativos-fort-lauderdale"],
];

// Pages edited by PRs #831/#836/#837 on 2026-11-26 and the pages they link to
// were held out of the prune on purpose.
const HELD: readonly string[] = [
  "/services/youtube-long-form-video-editing",
  "/es/videografo-para-fiestas-en-yates-miami",
  "/es/editor-de-video-para-anuncios-de-tiktok-miami",
  "/services/wedding-packages",
  "/es/fotografia-de-producto-con-ia-miami",
  "/services/hire-remote-video-editor",
  "/es/cuanto-cobra-un-videografo-en-miami",
];

function sitemapPaths(): Set<string> {
  return new Set(sitemap().map((entry) => new URL(entry.url).pathname.replace(/\/$/, "") || "/"));
}

describe("zero-signal prune 2026-11-26", () => {
  it("merges exactly 50 pages (52 by #843, 2 reversed by #842), each same-language, never a guide, never into another merge", () => {
    expect(MERGE_DECISIONS).toHaveLength(50);
    const sources = new Set(MERGE_DECISIONS.map((entry) => entry.from));
    for (const { from, to } of MERGE_DECISIONS) {
      expect(from.startsWith("/es/"), from).toBe(to.startsWith("/es/") || to === "/es");
      expect(from).not.toMatch(/^\/(guides|es\/guias)\//);
      expect(sources.has(to), `${from} -> ${to} chains`).toBe(false);
      expect(isConsolidatedPath(to), `${to} is not a live page`).toBe(false);
    }
  });

  it("301s each sampled page to its target", async () => {
    const redirects = await nextConfig.redirects!();
    for (const [from, to] of SAMPLE) {
      expect(isMergedPath(from), from).toBe(true);
      const rule = redirects.find((redirect) => redirect.source === from);
      expect(rule, from).toBeDefined();
      expect(rule!.destination).toBe(to);
      expect("statusCode" in rule! && rule!.statusCode).toBe(301);
    }
    // Every merge is wired, not only the sample.
    for (const { from, to } of MERGE_DECISIONS) {
      expect(redirects.find((redirect) => redirect.source === from)?.destination, from).toBe(to);
    }
  });

  it("drops merged pages from the sitemap and keeps every target in it", () => {
    const paths = sitemapPaths();
    for (const { from, to } of MERGE_DECISIONS) {
      expect(paths.has(from), from).toBe(false);
      expect(paths.has(to), to).toBe(true);
    }
    for (const path of HELD) {
      expect(isMergedPath(path), path).toBe(false);
    }
  });

  it("dissolves hreflang pairs and points the language switcher at the landing page", () => {
    for (const { from } of MERGE_DECISIONS) {
      expect(languageAlternates[from], from).toBeUndefined();
      for (const langs of Object.values(languageAlternates)) {
        expect(Object.values(langs)).not.toContain(from);
      }
    }
    // English twin survives, Spanish twin merged: the switcher skips the 301.
    expect(getPairedLanguageRoute("/services/pre-construction-condo-video-marketing-miami")).toBe(
      resolveMergedPath("/es/video-para-preventa-de-condominios-miami"),
    );
    expect(resolveMergedPath("/es/video-para-preventa-de-condominios-miami")).toBe(
      "/es/editor-de-video-real-estate-miami",
    );
  });

  it("removes merged pages from the sibling rings", () => {
    for (const cluster of SERVICE_SIBLING_CLUSTERS) {
      for (const path of cluster) expect(isMergedPath(path), path).toBe(false);
    }
    for (const cluster of SPANISH_SIBLING_CLUSTERS) {
      for (const slug of cluster) expect(isMergedPath(`/es/${slug}`), slug).toBe(false);
    }
  });
  it("keeps the two event pages #842 strengthened live, indexable and paired (reversed merges)", async () => {
    const restored = [
      "/services/boat-show-exhibitor-video-fort-lauderdale",
      "/es/cobertura-de-video-art-basel-miami-art-week",
    ];
    const paths = sitemapPaths();
    const redirects = await nextConfig.redirects!();
    for (const path of restored) {
      expect(isMergedPath(path), path).toBe(false);
      expect(paths.has(path), path).toBe(true);
      expect(redirects.find((redirect) => redirect.source === path), path).toBeUndefined();
    }
    // Language switcher pairs resolve to the live twin again, not to a merge target.
    expect(getPairedLanguageRoute("/es/cobertura-de-video-art-basel-miami-art-week")).toBe(
      "/services/art-basel-miami-art-week-video",
    );
    expect(getPairedLanguageRoute("/services/art-basel-miami-art-week-video")).toBe(
      "/es/cobertura-de-video-art-basel-miami-art-week",
    );
    expect(getPairedLanguageRoute("/services/boat-show-exhibitor-video-fort-lauderdale")).toBe(
      "/es/video-para-expositores-del-boat-show-fort-lauderdale",
    );
  });
});
