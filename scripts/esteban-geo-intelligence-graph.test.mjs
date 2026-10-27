import { describe, expect, it } from "vitest";
import { clusterFromCandidate, conversionRoute } from "./esteban-geo-intelligence-graph.mjs";

const candidate = { query: "editor de reels fort lauderdale", language: "es", intent: "hire", action: "improve_existing", target: "/es/editor-de-reels-fort-lauderdale", areaTier: "core", place: "Fort Lauderdale", status: "WRONG PAGE", source: { gscImpressions: 24, sourceUrl: "/services/reels-editor-fort-lauderdale" } };

describe("Esteban local-commercial graph", () => {
  it("keeps a proxy-only outcome out of ready-to-review", () => {
    const cluster = clusterFromCandidate(candidate, { status: "observed", route: "visible_contact_action" });
    expect(cluster.state).toBe("unmeasured_outcome");
    expect(cluster.edges.coverage.verdict).toBe("wrong_page");
  });

  it("rejects a cluster with no proven conversion route", () => {
    const cluster = clusterFromCandidate(candidate, { status: "needs_evidence", reason: "no visible contact action in raw HTML" });
    expect(cluster.state).toBe("needs_evidence");
    expect(cluster.missing_edges).toContain("conversion_route");
  });

  it("permits ready state only with every required edge observed", () => {
    const cluster = clusterFromCandidate(candidate, { status: "observed", route: "visible_contact_action" }, { status: "observed", source: "fixture outcome record" });
    expect(cluster.state).toBe("ready_to_review");
  });

  it("reads a visible contact link from raw served HTML", async () => {
    const route = await conversionRoute("/contact", { fetchImpl: async () => new Response('<a href="mailto:x@example.com">Email</a>', { status: 200 }) });
    expect(route.status).toBe("observed");
  });
});
