import { describe, expect, it } from "vitest";
import { choose, eligible, run } from "./esteban-geo-execution-queue.mjs";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
const good = { cluster_id: "a", proposed_action: "improve_existing", state: "unmeasured_outcome", missing_edges: [] };
describe("Esteban GEO execution queue", () => {
  it("selects one complete existing-page candidate", () => expect(choose({ clusters: [good] }, { dispatched: {} }, "2026-10-28T00:00:00Z")).toBe(good));
  it("excludes candidates with a missing edge", () => expect(eligible({ ...good, missing_edges: ["demand"] }, { dispatched: {} }, "2026-10-28T00:00:00Z")).toBe(false));
  it("holds a successful dispatch for 28 days but retries a failure", () => {
    expect(eligible(good, { dispatched: { a: { status: "dispatched", at: "2026-10-20T00:00:00Z" } } }, "2026-10-28T00:00:00Z")).toBe(false);
    expect(eligible(good, { dispatched: { a: { status: "failed", at: "2026-10-20T00:00:00Z" } } }, "2026-10-28T00:00:00Z")).toBe(true);
  });
  it("does not select a draft guide", () => expect(eligible({ ...good, proposed_action: "new_guide_draft" }, { dispatched: {} }, "2026-10-28T00:00:00Z")).toBe(false));
  it("preserves unmeasured evidence in the source-bound brief", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-geo-queue-"));
    const graph = join(directory, "graph.json"); const state = join(directory, "state.json");
    await writeFile(graph, JSON.stringify({ clusters: [{ ...good, query: "editor de reels", target: "/es/reels", edges: { demand: { status: "observed" }, market_ownership: { citation_observation: { status: "unmeasured", reason: "provider unavailable" }, winning_domains: [] } } }] }));
    const receipt = await run({ graph, state, now: "2026-10-28T00:00:00Z" });
    expect(receipt.evidence.citation_observation).toEqual({ status: "unmeasured", reason: "provider unavailable" });
    expect(receipt.selector_receipt.note).toMatch(/not a successful dispatch/i);
    expect(JSON.parse(await readFile(state, "utf8")).status).toBe("eligible");
  });
});
