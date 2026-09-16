import { describe, expect, it } from "vitest";

import sitemap from "../sitemap";
import {
  MERGE_DECISIONS,
  NOINDEX_DECISIONS,
  PROMOTED_TO_KEEP,
  consolidatedPathCount,
  isConsolidatedPath,
  isMergedPath,
  isNoindexPath,
  mergeRedirects,
  DEFERRED_MERGES,
} from "@/lib/consolidation";
import { buildPageMetadata } from "@/lib/site-metadata";

function sitemapPaths() {
  return sitemap().map((entry) => new URL(entry.url).pathname.replace(/\/$/, "") || "/");
}

// The 2026-08-12 cohort decisions were written to the vault and never shipped:
// on 2026-08-19 all 21 MERGE URLs were still live and still sitemapped. These
// tests are what makes the decision set executable rather than advisory.
describe("cohort consolidation is executed, not just documented", () => {
  it("defers the guide merges rather than executing them unsafely", () => {
    // All 19 MERGE decisions are guides, and the 2026-08-12 clustering ran
    // per-language with different winners per concept. Propagating them would
    // have merged two surviving winners away and created redirect chains.
    expect(MERGE_DECISIONS).toHaveLength(0);
    expect(mergeRedirects()).toHaveLength(0);
  });

  it("removes every noindexed URL from the sitemap", () => {
    const paths = new Set(sitemapPaths());

    for (const decision of NOINDEX_DECISIONS) {
      expect(paths.has(decision.path)).toBe(false);
    }
  });

  it("leaves every deferred merge URL live and advertised", () => {
    const paths = new Set(sitemapPaths());

    for (const decision of DEFERRED_MERGES) {
      expect(paths.has(decision.from)).toBe(true);
      expect(isMergedPath(decision.from)).toBe(false);
    }
  });

  it("marks noindexed pages noindex in their metadata", () => {
    for (const decision of NOINDEX_DECISIONS.slice(0, 8)) {
      const metadata = buildPageMetadata({
        title: "t",
        description: "d",
        path: decision.path,
        locale: decision.path.startsWith("/es") ? "es" : "en",
      });

      expect(metadata.robots).toEqual({ index: false, follow: true });
    }
  });

  it("leaves surviving pages indexable", () => {
    const metadata = buildPageMetadata({
      title: "t",
      description: "d",
      path: "/portfolio",
      locale: "en",
    });

    expect(metadata.robots).toBeUndefined();
    expect(isConsolidatedPath("/portfolio")).toBe(false);
  });
});

describe("stale decisions were re-validated before execution", () => {
  it("promoted URLs that started earning impressions back to KEEP", () => {
    // Both were MERGE on 2026-08-12 and were earning by 2026-08-19. The
    // cohort's own rule 1 - demand is demand - outranks the stale verdict.
    expect(PROMOTED_TO_KEEP).toContain(
      "/guides/best-caption-styles-for-instagram-reels",
    );
    expect(PROMOTED_TO_KEEP).toContain(
      "/guides/customer-testimonial-video-script-template",
    );
  });

  it("does not consolidate any promoted URL", () => {
    for (const path of PROMOTED_TO_KEEP) {
      expect(isConsolidatedPath(path)).toBe(false);
      expect(isNoindexPath(path)).toBe(false);
    }
  });

  it("keeps promoted URLs in the sitemap", () => {
    const paths = new Set(sitemapPaths());

    for (const path of PROMOTED_TO_KEEP) {
      expect(paths.has(path)).toBe(true);
    }
  });
});

describe("consolidation arithmetic matches the published baseline", () => {
  it("removes exactly 26 URLs from the prior 269-URL inventory", () => {
    expect(consolidatedPathCount()).toBe(26);
    // +1 = /desk-recommendations, owner-ordered 2026-09-16 (not a consolidation change)
    expect(sitemap()).toHaveLength(269 - 26 + 1);
  });

  it("never lists a redirect source in the sitemap", () => {
    const paths = new Set(sitemapPaths());

    for (const redirect of mergeRedirects()) {
      expect(paths.has(redirect.source)).toBe(false);
    }
  });
});
