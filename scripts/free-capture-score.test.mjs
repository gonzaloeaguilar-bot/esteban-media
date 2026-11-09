import { describe, expect, it } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildCandidates, buildReport, citationMatchesQuery, isBrandedQuery, isWrongIntentExcluded, readCitationRows, readWrongIntentExclusions, recommendation, scoreParts, writeWrongIntentExclusions } from "./free-capture-score.mjs";

const now = "2026-11-06T12:00:00.000Z";

const measurement = {
  generatedAt: "2026-10-24T12:00:00.000Z",
  window: { startDate: "2026-09-24", endDate: "2026-10-21" },
  rows: { queryPage: [
    { keys: ["video editor for food influencers miami", "https://estebanmorenomedia.com/services/food-and-places-creator-video-editing-miami"], impressions: 12, clicks: 0, ctr: 0, position: 8.5 },
    { keys: ["thin query", "https://estebanmorenomedia.com/services/video-editing"], impressions: 2, clicks: 0, ctr: 0, position: 42 },
  ] },
};
const citationText = [
  JSON.stringify({ brand: "esteban", status: "ok", citation_coverage: "complete", prompt: "video editor for food influencers miami", our_citation: true, ts: "2026-11-05T12:00:00.000Z", cited_urls: ["https://estebanmorenomedia.com/services/food-and-places-creator-video-editing-miami"] }),
  JSON.stringify({ brand: "esteban", status: "ok", citation_coverage: "complete", prompt: "video editor for food influencers miami", our_citation: true, ts: "2026-11-04T12:00:00.000Z", cited_urls: ["https://www.estebanmorenomedia.com/contact"] }),
  JSON.stringify({ brand: "flas", status: "ok", citation_coverage: "complete", prompt: "video editor for food influencers miami", our_citation: true }),
].join("\n");

describe("free capture score", () => {
  it("matches query terms conservatively", () => {
    expect(citationMatchesQuery("Vídeo editor for food influencers, Miami!", "video editor for food influencers miami")).toBe(true);
    expect(citationMatchesQuery("how much does a restaurant video cost in Miami", "restaurant promo video editing miami")).toBe(false);
    expect(citationMatchesQuery("video editor food influencers miami", "video editor for food influencers miami")).toBe(false);
    expect(citationMatchesQuery("yacht charter video fort lauderdale", "video editor for food influencers miami")).toBe(false);
  });

  it("keeps only complete Esteban citation observations", () => {
    expect(readCitationRows(citationText, { now })).toHaveLength(2);
  });

  it("reads the normalized latest-successful engine snapshot without allowing a failed retry to erase it", () => {
    const snapshot = JSON.stringify({
      schema: "esteban-media.geo-citation-successful-receipts.v1",
      engines: [{ checked_at: "2026-11-05T12:00:00.000Z", prompts: { "reels-editor-ftl-en": { url_cited: 2, cited_urls: [["https://estebanmorenomedia.com/services/reels-editor-fort-lauderdale", 2]] } } }],
    });
    expect(readCitationRows(snapshot, { now })).toEqual([expect.objectContaining({ prompt: "reels-editor-ftl-en", our_citation: true })]);
  });

  it("excludes Esteban-branded discovery from a non-brand opportunity queue", () => {
    expect(isBrandedQuery("Esteban Moreno Media")).toBe(true);
    expect(isBrandedQuery("moreno-media.com")).toBe(true);
    expect(isBrandedQuery("reel editor fort lauderdale")).toBe(false);
    const branded = structuredClone(measurement);
    branded.rows.queryPage.push({ keys: ["esteban moreno media", "https://estebanmorenomedia.com/"], impressions: 99, clicks: 0, ctr: 0, position: 1 });
    expect(buildCandidates(branded, readCitationRows(citationText, { now })).some((candidate) => candidate.query === "esteban moreno media")).toBe(false);
  });

  it("does not treat a zero-click near-top row as a content-expansion win", () => {
    expect(recommendation(8, { position: 1, clicks: 0 })).toContain("not an expansion signal");
  });

  it("scores only observable inputs and labels SERP resistance absent", () => {
    const score = scoreParts({ query: "video editor for food influencers miami", impressions: 12, clicks: 0, position: 8.5 }, readCitationRows(citationText, { now }));
    expect(score).toMatchObject({ demand: 2, reachability: 3, ctrOpportunity: 1, citation: 2, serpResistance: "unmeasured", total: 8 });
  });

  it("ranks candidates and clearly calls the result a capture score", () => {
    const candidates = buildCandidates(measurement, readCitationRows(citationText, { now }));
    expect(candidates[0].query).toBe("video editor for food influencers miami");
    const report = buildReport(measurement, readCitationRows(citationText), candidates, { measurementPath: "/tmp/measurement.json", citationPath: "/tmp/citations.jsonl" });
    expect(report).toContain("0–10 capture score");
    expect(report).toContain("SERP resistance is unmeasured");
    expect(report).not.toContain("keyword difficulty");
  });

  it("rejects stale, incomplete, unowned, and invalid-timestamp citation rows", () => {
    const rejected = [
      { ts: "2026-10-23T11:59:59.999Z", citation_coverage: "complete", cited_urls: ["https://estebanmorenomedia.com/contact"] },
      { ts: "2026-11-01T12:00:00.000Z", citation_coverage: "partial", cited_urls: ["https://estebanmorenomedia.com/contact"] },
      { ts: "not-a-date", citation_coverage: "complete", cited_urls: ["https://estebanmorenomedia.com/contact"] },
      { ts: "2026-11-01T12:00:00.000Z", citation_coverage: "complete", cited_urls: ["https://other.example/contact"] },
    ].map((row) => JSON.stringify({ brand: "esteban", status: "ok", prompt: "video editor for food influencers miami", our_citation: true, ...row })).join("\n");
    expect(readCitationRows(rejected, { now })).toEqual([]);
  });

  it("holds only exact normalized wrong-intent query exclusions", () => {
    const exclusions = [{ query: "video editor jobs miami", normalizedQuery: "video editor jobs miami", reason: "employment intent", excludedAt: now }];
    expect(isWrongIntentExcluded("Vídeo editor jobs, Miami!", exclusions)).toBe(true);
    expect(isWrongIntentExcluded("video editor miami", exclusions)).toBe(false);
    const excludedMeasurement = structuredClone(measurement);
    excludedMeasurement.rows.queryPage.push({ keys: ["video editor jobs miami", "https://estebanmorenomedia.com/services/video-editing"], impressions: 80, clicks: 0, ctr: 0, position: 4 });
    expect(buildCandidates(excludedMeasurement, readCitationRows(citationText, { now }), null, exclusions).some((candidate) => candidate.query === "video editor jobs miami")).toBe(false);
  });

  it("persists wrong-intent exclusions for later reports", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-capture-score-"));
    const ledger = join(directory, "wrong-intent-exclusions.json");
    try {
      await writeWrongIntentExclusions(ledger, [{ query: "Video editor jobs Miami", reason: "employment intent", excludedAt: now }], now);
      await expect(readWrongIntentExclusions(ledger)).resolves.toEqual([expect.objectContaining({ normalizedQuery: "video editor jobs miami", reason: "employment intent" })]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
