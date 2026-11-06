import { describe, expect, it } from "vitest";
import { clusterFromCandidate, conversionRoute, marketOwnershipEvidence, normalizeQuery } from "./esteban-geo-intelligence-graph.mjs";

const candidate = { query: "editor de reels fort lauderdale", language: "es", intent: "hire", action: "improve_existing", target: "/es/editor-de-reels-fort-lauderdale", areaTier: "core", place: "Fort Lauderdale", status: "WRONG PAGE", source: { gscImpressions: 24, sourceUrl: "/services/reels-editor-fort-lauderdale" } };

describe("Esteban local-commercial graph", () => {
  it("holds a proxy-only outcome and absent citation evidence out of review", () => {
    const cluster = clusterFromCandidate(candidate, { status: "observed", route: "visible_contact_action" });
    expect(cluster.state).toBe("needs_measurement");
    expect(cluster.edges.coverage.verdict).toBe("wrong_page");
  });

  it("rejects a cluster with no proven conversion route", () => {
    const cluster = clusterFromCandidate(candidate, { status: "needs_evidence", reason: "no visible contact action in raw HTML" });
    expect(cluster.state).toBe("needs_evidence");
    expect(cluster.missing_edges).toContain("conversion_route");
  });

  it("permits ready state only with every required edge observed", () => {
    const market = marketOwnershipEvidence(candidate, [{
      brand: "esteban", engine: "perplexity", prompt: candidate.query, ts: "2026-10-28T10:00:00Z", status: "ok", our_citation: true,
      cited_urls: ["https://competitor.example/reels"], citation_coverage: "complete",
    }], { now: "2026-10-29T10:00:00Z" });
    const cluster = clusterFromCandidate(candidate, { status: "observed", route: "visible_contact_action" }, { status: "observed", source: "fixture outcome record" }, market);
    expect(cluster.state).toBe("ready_to_review");
  });

  it("reads a visible contact link from raw served HTML", async () => {
    const route = await conversionRoute("/contact", { fetchImpl: async () => new Response('<a href="mailto:x@example.com">Email</a>', { status: 200 }) });
    expect(route.status).toBe("observed");
  });

  it("keeps a current exact prompt and complete owned citation as source-bound market evidence", () => {
    const market = marketOwnershipEvidence(candidate, [{
      brand: "esteban", engine: "perplexity", prompt: "editor de reels fort lauderdale", ts: "2026-10-28T10:00:00Z", status: "ok", our_citation: true,
      cited_urls: ["https://competitor.example/reels", "https://estebanmorenomedia.com/es/editor-de-reels-fort-lauderdale"],
      classification: { "https://competitor.example/reels": "other" }, citation_coverage: "complete",
    }], { now: "2026-10-29T10:00:00Z" });
    expect(market.citation_observation.status).toBe("observed");
    expect(market.winning_domains).toEqual([expect.objectContaining({ domain: "competitor.example" })]);
    expect(market.winning_domains.some((item) => item.domain === "estebanmorenomedia.com")).toBe(false);
  });

  it("holds unavailable citation transport for measurement rather than a zero", () => {
    const market = marketOwnershipEvidence(candidate, [{
      brand: "esteban", engine: "google_aio", prompt: "editor de reels fort lauderdale", ts: "2026-10-28T10:00:00Z", status: "MISSING", reason: "HTTP 429",
    }]);
    expect(market.citation_observation.status).toBe("needs_measurement");
    expect(market.winning_domains).toEqual([]);
    expect(market.our_delta.status).toBe("needs_measurement");
  });

  it("does not borrow evidence from a two-token-overlap prompt", () => {
    const market = marketOwnershipEvidence(candidate, [{
      brand: "esteban", engine: "perplexity", prompt: "editor de video en miami", ts: "2026-10-28T10:00:00Z", status: "ok", our_citation: true,
      cited_urls: ["https://competitor.example/reels"], citation_coverage: "complete",
    }], { now: "2026-10-29T10:00:00Z" });
    expect(market.citation_observation.status).toBe("unmeasured");
  });

  it("normalizes accents and punctuation but requires the full query", () => {
    expect(normalizeQuery("Editor de Vídeo, para Reels — Fort Lauderdale!")).toBe("editor de video para reels fort lauderdale");
  });

  it("marks stale, incomplete, and false citations as needs_measurement", () => {
    for (const row of [
      { ts: "2026-10-01T10:00:00Z", citation_coverage: "complete", our_citation: true },
      { ts: "2026-10-28T10:00:00Z", citation_coverage: "unverified", our_citation: true },
      { ts: "2026-10-28T10:00:00Z", citation_coverage: "complete", our_citation: false },
    ]) {
      const market = marketOwnershipEvidence(candidate, [{ brand: "esteban", engine: "perplexity", prompt: candidate.query, status: "ok", cited_urls: [], ...row }], { now: "2026-10-29T10:00:00Z" });
      expect(market.citation_observation.status).toBe("needs_measurement");
      expect(clusterFromCandidate(candidate, { status: "observed", route: "visible_contact_action" }, undefined, market).state).toBe("needs_measurement");
    }
  });

  it("keeps a blocked Google SERP snapshot unmeasured while retaining its fallback observation", () => {
    const market = marketOwnershipEvidence(candidate, [], { serpRows: [{
      site: "esteban", engine: "google", query: "editor de reels fort lauderdale", ts: "2026-10-28T10:00:00Z", status: "captcha", error_detail: "captcha detected",
      fallback: { status: "ok", engine: "bing", features: ["ai_summary"], our_position: 5 },
    }] });
    expect(market.serp_observation).toMatchObject({ status: "unmeasured", fallback: { engine: "bing", features: ["ai_summary"], our_position: 5 } });
  });
});
