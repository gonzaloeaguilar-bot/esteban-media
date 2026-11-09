import { describe, expect, it } from "vitest";
import { buildSnapshot, selectLatestSuccessful } from "./normalize-geo-citation-receipts.mjs";

const measured = (engine, checked_at, errors = 0) => ({ brand: "esteban", engine, checked_at, errors, citation_rate: 0.5, named_rate: 0.5, results: { reel: { status: "measured", runs: 2, named: 1, url_cited: 1 } } });

describe("citation receipt normalizer", () => {
  it("keeps the latest complete receipt and never lets a failed retry overwrite it", () => {
    const rows = [measured("gpt", "2026-11-05T10:00:00Z"), measured("gpt", "2026-11-06T10:00:00Z", 12)];
    expect(selectLatestSuccessful(rows)).toHaveLength(1);
    const snapshot = buildSnapshot(rows, "2026-11-09T00:00:00Z");
    expect(snapshot.engines[0]).toMatchObject({ engine: "gpt", checked_at: "2026-11-05T10:00:00Z" });
    expect(snapshot.discarded_retries).toEqual([expect.objectContaining({ engine: "gpt", errors: 12 })]);
  });
});
