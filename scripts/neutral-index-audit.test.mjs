import { describe, expect, it } from "vitest";

import { neutralRows, toCsv } from "./neutral-index-audit.mjs";

const state = {
  latest: {
    inspection: {
      pages: [
        { url: "https://estebanmorenomedia.com/pricing", verdict: "NEUTRAL", coverageState: "Discovered - currently not indexed" },
        { url: "https://estebanmorenomedia.com/es/eventos", verdict: "NEUTRAL", coverageState: "URL is unknown to Google" },
        { url: "https://estebanmorenomedia.com/services/example", verdict: "PASS" },
      ],
    },
  },
};

describe("neutral index audit", () => {
  it("keeps every neutral URL in a conservative, dated review inventory", () => {
    const rows = neutralRows(state, "2026-10-29");
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ url: "https://estebanmorenomedia.com/es/eventos", next_check: "2026-10-29" });
    expect(rows[0].owner_action).toContain("bilingual event route");
    expect(rows[1].owner_action).toContain("canonical pricing route");
    expect(toCsv(rows)).toContain("coverage_state");
  });

  it("refuses an incomplete inventory instead of silently claiming full coverage", () => {
    const mismatched = structuredClone(state);
    mismatched.latest.inspection.counts = { neutral: 3 };
    expect(() => neutralRows(mismatched, "2026-10-29")).toThrow("watcher neutral count mismatch");
  });
});
