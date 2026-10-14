import { describe, expect, it } from "vitest";

import sitemap from "../sitemap";
import {
  MERGE_DECISIONS,
  REOPENED_BY_OWNER,
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

describe("owner re-admissions stay consistent with the noindex list", () => {
  it("re-admits the Boca Raton page: out of the noindex list, indexable, sitemapped", () => {
    // Owner decision 2026-10-14: Boca Raton joined the Google Business Profile
    // service area, and the page was rebuilt before the noindex came off.
    expect(REOPENED_BY_OWNER).toContain("/services/video-production-boca-raton");
    const paths = new Set(sitemapPaths());
    for (const path of REOPENED_BY_OWNER) {
      expect(isNoindexPath(path)).toBe(false);
      expect(isConsolidatedPath(path)).toBe(false);
      expect(paths.has(path)).toBe(true);
      const metadata = buildPageMetadata({ title: "t", description: "d", path, locale: "en" });
      expect(metadata.robots).toBeUndefined();
    }
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
  it("removes exactly 25 URLs from the prior 269-URL inventory", () => {
    // 26 on 2026-08-19; 25 since the owner re-admitted the Boca Raton page on
    // 2026-10-14 (reopenedByOwner in config/cohort-consolidation.json).
    expect(consolidatedPathCount()).toBe(25);
    // +3 = /desk-recommendations (2026-09-16) plus the /pricing and
    // /es/precios pair (2026-09-27); +8 = the package pages (2026-09-29);
    // +2 = the real-estate rate-card pair (2026-09-29, demand-backed).
    // +4 = the remote editor page and three buyer-prep resources (2026-10-01).
    // +10 = the five bilingual niche pairs of 2026-10-06 (medical practice,
    // content creator, white label, salon/barbershop, detailing/tint/wrap).
    // +2 = food and places creator pair (2026-10-07).
    // +4 = the 2026-10-07 restaurant and real-estate cost-answer guide pairs.
    // +1 = the 2026-10-07 /es/editor-de-video-miami page.
    // +26 = the 2026-10-10 owner-ordered additions (growth systems, daily
    // tools, case-study hubs, /lens, /fort-lauderdale).
    // +6 = the annual-events hub pair plus the Fort Lauderdale boat show and Art Basel Miami Beach pairs (2026-10-10, owner-approved).
    // +10 = the five remaining annual-event pairs: Miami International Boat Show, South Beach Wine & Food Festival, eMerge Americas, Miami Music Week and Miami Spice (2026-10-10, owner-approved).
    // +16 = niche wave 8 (2026-10-11, owner-approved bilingual pairs).
    // +1 = real product photography path (2026-10-11 US buyer query).
    // +1 = Spanish companion for the same real product photography offer.
    // All owner-ordered, none of them consolidation changes.
    // +1 = Boca Raton re-admitted (2026-10-14, owner decision) and +1 = its
    // new Spanish twin /es/editor-de-reels-boca-raton.
    expect(sitemap()).toHaveLength(269 - 25 + 1 + 3 + 8 + 2 + 4 + 4 + 3 + 10 + 2 + 4 + 1 + 26 + 6 + 10 + 16 + 1 + 1 + 4 + 4 + 2 + 4);
  });

  it("never lists a redirect source in the sitemap", () => {
    const paths = new Set(sitemapPaths());

    for (const redirect of mergeRedirects()) {
      expect(paths.has(redirect.source)).toBe(false);
    }
  });
});
