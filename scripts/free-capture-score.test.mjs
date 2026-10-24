import { describe, expect, it } from "vitest";
import { buildCandidates, buildReport, citationMatchesQuery, readCitationRows, scoreParts } from "./free-capture-score.mjs";

const measurement = {
  generatedAt: "2026-10-24T12:00:00.000Z",
  window: { startDate: "2026-09-24", endDate: "2026-10-21" },
  rows: { queryPage: [
    { keys: ["video editor for food influencers miami", "https://estebanmorenomedia.com/services/food-and-places-creator-video-editing-miami"], impressions: 12, clicks: 0, ctr: 0, position: 8.5 },
    { keys: ["thin query", "https://estebanmorenomedia.com/services/video-editing"], impressions: 2, clicks: 0, ctr: 0, position: 42 },
  ] },
};
const citationText = [
  JSON.stringify({ brand: "esteban", status: "ok", citation_coverage: "complete", prompt: "video editor for food influencers miami", our_citation: true }),
  JSON.stringify({ brand: "esteban", status: "ok", citation_coverage: "complete", prompt: "video editor for food influencers miami", our_citation: true }),
  JSON.stringify({ brand: "flas", status: "ok", citation_coverage: "complete", prompt: "video editor for food influencers miami", our_citation: true }),
].join("\n");

describe("free capture score", () => {
  it("matches query terms conservatively", () => {
    expect(citationMatchesQuery("video editor for food influencers miami", "video editor for food influencers miami")).toBe(true);
    expect(citationMatchesQuery("how much does a restaurant video cost in Miami", "restaurant promo video editing miami")).toBe(false);
    expect(citationMatchesQuery("yacht charter video fort lauderdale", "video editor for food influencers miami")).toBe(false);
  });

  it("keeps only complete Esteban citation observations", () => {
    expect(readCitationRows(citationText)).toHaveLength(2);
  });

  it("scores only observable inputs and labels SERP resistance absent", () => {
    const score = scoreParts({ query: "video editor for food influencers miami", impressions: 12, clicks: 0, position: 8.5 }, readCitationRows(citationText));
    expect(score).toMatchObject({ demand: 2, reachability: 3, ctrOpportunity: 1, citation: 2, serpResistance: "unmeasured", total: 8 });
  });

  it("ranks candidates and clearly calls the result a capture score", () => {
    const candidates = buildCandidates(measurement, readCitationRows(citationText));
    expect(candidates[0].query).toBe("video editor for food influencers miami");
    const report = buildReport(measurement, readCitationRows(citationText), candidates, { measurementPath: "/tmp/measurement.json", citationPath: "/tmp/citations.jsonl" });
    expect(report).toContain("0–10 capture score");
    expect(report).toContain("SERP resistance is unmeasured");
    expect(report).not.toContain("keyword difficulty");
  });
});
