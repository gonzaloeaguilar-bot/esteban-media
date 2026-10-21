import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { COMPLETE_LAG_DAYS, completeWindow, ctrCandidates, mergeManagedNote, provisionalWindow, renderReport, runMeasurement } from "./esteban-seo-measurement-report.mjs";

const directories = [];
afterEach(async () => Promise.all(directories.splice(0).map((path) => rm(path, { recursive: true, force: true }))));

describe("SEO measurement report", () => {
  it("holds the completed window back from the Pacific date", () => {
    expect(completeWindow(new Date("2026-10-16T15:00:00Z"))).toEqual({ startDate: "2026-09-16", endDate: "2026-10-13", days: 28 });
    expect(COMPLETE_LAG_DAYS).toBe(3);
  });

  it("keeps today separate as a clearly provisional Pacific-time window", () => {
    expect(provisionalWindow(new Date("2026-10-16T15:00:00Z"))).toEqual({ startDate: "2026-10-14", endDate: "2026-10-16", days: 3 });
  });

  it("does not turn sparse rows into CTR work", () => {
    expect(ctrCandidates([{ keys: ["sparse"], impressions: 9, clicks: 0, position: 1 }])).toEqual([]);
    expect(ctrCandidates([{ keys: ["meaningful"], impressions: 10, clicks: 0, position: 3 }])).toEqual([{ query: "meaningful", impressions: 10, position: 3 }]);
  });

  it("replaces only its managed note block", () => {
    const first = mergeManagedNote("# Manual note\n", "<!-- esteban-media:seo-measurement:start -->\nfirst\n<!-- esteban-media:seo-measurement:end -->");
    const second = mergeManagedNote(first, "<!-- esteban-media:seo-measurement:start -->\nsecond\n<!-- esteban-media:seo-measurement:end -->");
    expect(second).toContain("# Manual note");
    expect(second).toContain("second");
    expect(second).not.toContain("first");
  });

  it("writes a deterministic final-data report without exposing credentials", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-seo-measurement-"));
    directories.push(directory);
    const tokenPath = join(directory, "token.json");
    await writeFile(tokenPath, JSON.stringify({ client_id: "client", client_secret: "secret", refresh_token: "refresh", token_uri: "https://oauth.fixture/token" }));
    const json = (body) => new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
    const result = await runMeasurement({ command: "run", dryRun: false, force: true, runDate: "2026-10-16", runId: "fixture", startDate: "2026-09-16", endDate: "2026-10-13", provisionalStartDate: "2026-10-14", provisionalEndDate: "2026-10-16", tokenPath, stateDir: join(directory, "state"), notePath: join(directory, "note.md") }, {
      fetchImpl: async (url, options = {}) => {
        if (url === "https://oauth.fixture/token") return json({ access_token: "access" });
        const dimensions = JSON.parse(options.body).dimensions;
        if (dimensions.join(",") === "query") return json({ rows: [{ keys: ["video editor fort lauderdale"], clicks: 0, impressions: 12, ctr: 0, position: 4 }] });
        if (dimensions.join(",") === "page") return json({ rows: [{ keys: ["https://estebanmorenomedia.com/services/video-editing"], clicks: 0, impressions: 12, ctr: 0, position: 4 }] });
        return json({ rows: [{ keys: ["video editor fort lauderdale", "https://estebanmorenomedia.com/services/video-editing"], clicks: 0, impressions: 12, ctr: 0, position: 4 }] });
      },
    });
    expect(result).toMatchObject({ status: "PASS", rows: { query: 1, page: 1, queryPage: 1 }, provisionalRows: { query: 1, page: 1, queryPage: 1 } });
    const note = await readFile(join(directory, "note.md"), "utf8");
    expect(note).toContain("dataState: final");
    expect(note).toContain("Today, provisional only");
    expect(note).toContain("video editor fort lauderdale");
    expect(note).not.toContain("secret");
    expect(renderReport(JSON.parse(await readFile(join(directory, "state/latest.json"), "utf8")))).toContain("Observation queue");
  });
});
