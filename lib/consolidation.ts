import consolidation from "@/config/cohort-consolidation.json";

/**
 * Executable form of the 2026-08-12 keep/merge/noindex cohort decisions.
 *
 * Those decisions were written to the vault and never shipped: on 2026-08-19
 * all 21 MERGE URLs were still live, still returning 200, and still in the
 * sitemap. Prose does not consolidate a sitemap, so the decision set now lives
 * in config/cohort-consolidation.json and is enforced here by the sitemap, the
 * redirect table, and the page-metadata builder.
 */

export type MergeDecision = {
  from: string;
  to: string;
  reason: string;
};

export type NoindexDecision = {
  path: string;
  reason: string;
};

export const CONSOLIDATION_SCHEMA = consolidation.schema;

export const MERGE_DECISIONS: readonly MergeDecision[] =
  consolidation.merges as MergeDecision[];

export const NOINDEX_DECISIONS: readonly NoindexDecision[] =
  consolidation.noindex;

/**
 * URLs promoted back to KEEP because they began earning impressions between
 * the decision date and execution. The cohort's own rule 1 — "earns any
 * impression or click; demand is demand" — outranks a stale MERGE verdict.
 */
export const PROMOTED_TO_KEEP: readonly string[] =
  consolidation.promotedToKeep.map((entry) => entry.path);

const MERGED_PATHS = new Set(MERGE_DECISIONS.map((entry) => entry.from));
const NOINDEX_PATHS = new Set(NOINDEX_DECISIONS.map((entry) => entry.path));

/** A merged path 301s away, so it must never be advertised in the sitemap. */
export function isMergedPath(path: string): boolean {
  return MERGED_PATHS.has(path);
}

/** A noindexed path must not appear in the sitemap either. */
export function isNoindexPath(path: string): boolean {
  return NOINDEX_PATHS.has(path);
}

/** Paths that are removed from the indexable inventory by either decision. */
export function isConsolidatedPath(path: string): boolean {
  return isMergedPath(path) || isNoindexPath(path);
}

export function consolidatedPathCount(): number {
  return MERGED_PATHS.size + NOINDEX_PATHS.size;
}

/** Redirect table consumed by next.config.ts. */
export function mergeRedirects() {
  return MERGE_DECISIONS.map((entry) => ({
    source: entry.from,
    destination: entry.to,
    permanent: true,
  }));
}


/**
 * MERGE decisions that were re-validated and deliberately NOT executed.
 *
 * All 19 are guides, and the 2026-08-12 clustering ran per-language: the EN
 * and ES clusters picked different winners for the same concept. Propagating
 * each merge to its language counterpart would have merged two surviving
 * winners away and created redirect chains. Picking one winner per concept
 * across both languages is editorial, so these are carried forward rather than
 * shipped unsafely.
 */
export const DEFERRED_MERGES: readonly MergeDecision[] =
  consolidation.deferredMerges;


/**
 * NOINDEX is applied symmetrically across language pairs.
 *
 * Retiring one half of a bilingual pair leaves the surviving page advertising
 * an hreflang alternate the sitemap no longer lists, which is exactly the
 * non-reciprocity defect Search Console reports. 12 URLs whose counterpart
 * survives were promoted back to KEEP for this reason, recorded under
 * strategicExemptions in the config. Because the rule holds, no alternates
 * map anywhere needs filtering.
 */
export const PAIR_SYMMETRY_ENFORCED = true;
