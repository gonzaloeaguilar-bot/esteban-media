import { describe, expect, it } from "vitest";
import { choose, eligible } from "./esteban-geo-execution-queue.mjs";
const good = { cluster_id: "a", proposed_action: "improve_existing", state: "unmeasured_outcome", missing_edges: [] };
describe("Esteban GEO execution queue", () => {
  it("selects one complete existing-page candidate", () => expect(choose({ clusters: [good] }, { dispatched: {} }, "2026-10-28T00:00:00Z")).toBe(good));
  it("excludes candidates with a missing edge", () => expect(eligible({ ...good, missing_edges: ["demand"] }, { dispatched: {} }, "2026-10-28T00:00:00Z")).toBe(false));
  it("holds a successful dispatch for 28 days but retries a failure", () => {
    expect(eligible(good, { dispatched: { a: { status: "dispatched", at: "2026-10-20T00:00:00Z" } } }, "2026-10-28T00:00:00Z")).toBe(false);
    expect(eligible(good, { dispatched: { a: { status: "failed", at: "2026-10-20T00:00:00Z" } } }, "2026-10-28T00:00:00Z")).toBe(true);
  });
  it("does not select a draft guide", () => expect(eligible({ ...good, proposed_action: "new_guide_draft" }, { dispatched: {} }, "2026-10-28T00:00:00Z")).toBe(false));
});
