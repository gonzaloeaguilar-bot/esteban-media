import { describe, expect, it } from "vitest";
import { buildReceipt } from "../../scripts/geo-capture-receipt.mjs";

describe("GEO capture receipt", () => {
  it("keeps each engine separate and never upgrades a citation to a lead", () => {
    const receipt = buildReceipt({
      generatedAt: "2026-11-22T00:00:00.000Z",
      citations: { schema: "esteban-media.geo-citation-successful-receipts.v1", engines: [{ engine: "gemini", checked_at: "2026-11-21T00:00:00.000Z", citation_rate: 1, named_rate: 1, prompts: { reels: { status: "measured", runs: 2, named: 2, url_cited: 2 } } }] },
      snapshot: { sources: { lead_outcomes: { status: "unmeasured", reason: "missing_outcome_read" } } },
    });
    expect(receipt.engines).toEqual([expect.objectContaining({ engine: "gemini" })]);
    expect(receipt.lead_outcomes).toEqual({ status: "unmeasured", reason: "missing_outcome_read" });
    expect(receipt.interpretation).toMatch(/do not prove clicks/i);
  });
});
