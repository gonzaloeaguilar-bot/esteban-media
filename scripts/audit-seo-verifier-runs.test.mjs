import { describe, expect, it } from "vitest";
import { summarizeRuns } from "./audit-seo-verifier-runs.mjs";

const since = new Date("2026-10-01T00:00:00Z");
const run = (conclusion, start = "2026-10-02T12:00:00Z", end = "2026-10-02T12:02:00Z") => ({
  event: "schedule",
  status: "completed",
  conclusion,
  created_at: start,
  run_started_at: start,
  updated_at: end,
});

describe("SEO verifier loop audit", () => {
  it("counts scheduled failures and slow runs while excluding manual checks", () => {
    const manual = { ...run("failure"), event: "workflow_dispatch" };
    expect(summarizeRuns([
      run("success"),
      run("failure"),
      run("success", "2026-10-03T12:00:00Z", "2026-10-03T12:11:00Z"),
      manual,
    ], since, new Date("2026-10-03T13:00:00Z"))).toEqual({
      completed: 3,
      failed: 1,
      overTenMinutes: 1,
      wastefulFrequency: false,
      stale: false,
    });
  });

  it("flags an excessive scheduled frequency", () => {
    expect(summarizeRuns(Array.from({ length: 9 }, () => run("success")), since).wastefulFrequency).toBe(true);
  });

  it("flags a dead daily verifier even if a weekly audit ran", () => {
    expect(summarizeRuns([run("success")], since, new Date("2026-10-06T13:00:00Z")).stale).toBe(true);
  });
});
