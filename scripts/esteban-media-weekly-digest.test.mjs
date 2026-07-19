import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  INDEX_WATCH_SCHEMA,
  LEGACY_V1_WATCH_URLS,
  SITE_URL,
  WATCH_URLS,
  defaultRange,
  watchedUrlHash,
} from "./search-console-index-watch.mjs";
import {
  GA_MEASUREMENT_ID,
  WEEKLY_DIGEST_SCHEMA,
  assertEasternSystemTimeZone,
  buildTrend,
  digestCadence,
  digestOperationalStatus,
  evaluateSiteHealth,
  indexWatchSourceSnapshot,
  mergeDigestNote,
  mergeHotNote,
  monitoringStatus,
  renderDigestDetail,
  renderHotPulse,
  requestResource,
  runWeeklyDigest,
  validateDigestState,
} from "./esteban-media-weekly-digest.mjs";

const temporaryDirectories = [];
const fixtureNow = new Date("2026-07-19T12:45:00.000Z");

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

function totals({ clicks = 0, impressions = 0 } = {}) {
  return {
    observed: true,
    clicks,
    impressions,
    ctr: impressions ? clicks / impressions : 0,
    position: impressions ? 2 : 0,
  };
}

function makeIndexWatchState({
  generatedAt = "2026-07-19T12:00:00.000Z",
  runDate = "2026-07-19",
  allDataClicks = 1,
  allDataImpressions = 1,
} = {}) {
  const range = defaultRange(new Date(generatedAt));
  const pages = WATCH_URLS.map((url, index) => ({
    url,
    observed: index < 2,
    clicks: 0,
    impressions: index < 2 ? 1 : 0,
    ctr: index < 2 ? 0 : null,
    position: index < 2 ? 4 + index : null,
  }));
  const inspectionPages = WATCH_URLS.map((url) => ({
    url,
    verdict: "PASS",
    coverageState: "Submitted and indexed",
    indexingState: "INDEXING_ALLOWED",
    pageFetchState: "SUCCESSFUL",
    robotsTxtState: "ALLOWED",
    lastCrawlTime: "2026-07-18T12:00:00Z",
    googleCanonical: url,
    userCanonical: url,
    canonicalMismatch: false,
  }));
  const alert = {
    id: "fixture-first-impressions",
    type: "first_impressions",
    message: "First observed Search Console impressions.",
  };
  const latest = {
    runId: generatedAt,
    runDate,
    generatedAt,
    permissionLevel: "siteOwner",
    liveSitemap: {
      count: WATCH_URLS.length,
      hash: watchedUrlHash(),
      urls: [...WATCH_URLS].sort(),
    },
    searchAnalytics: {
      startDate: range.startDate,
      endDate: range.endDate,
      firstIncompleteDate: null,
      finalPropertyTotals: totals(),
      allDataPropertyTotals: totals({
        clicks: allDataClicks,
        impressions: allDataImpressions,
      }),
      pages,
      daily: [],
    },
    inspection: {
      counts: {
        pass: WATCH_URLS.length,
        neutral: 0,
        fail: 0,
        unknown: 0,
      },
      pages: inspectionPages,
    },
    alerts: [alert],
  };
  return {
    schema: INDEX_WATCH_SCHEMA,
    updatedAt: generatedAt,
    siteUrl: SITE_URL,
    watchUrlCount: WATCH_URLS.length,
    watchUrlHash: watchedUrlHash(),
    everImpressions: true,
    firstImpressionsObservedAt: generatedAt,
    latest,
    history: [latest],
    eventHistory: [alert],
    confirmedVerdicts: Object.fromEntries(
      WATCH_URLS.map((url) => [url, "PASS"]),
    ),
    pendingNotifications: [],
  };
}

function resource(url, body, contentType, status = 200, finalUrl = url) {
  return {
    requestedUrl: url,
    finalUrl,
    status,
    contentType,
    body,
    error: null,
  };
}

function makeResources({ includeAnalytics = true } = {}) {
  const analytics = includeAnalytics
    ? `<script src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"></script><script>window.location.hostname !== "estebanmorenomedia.com"; window.gtag('config', "${GA_MEASUREMENT_ID}", { send_page_view: false, page_location: canonicalOrigin + safePagePath(window.location.pathname), page_referrer: currentPageReferrer });</script>`
    : "";
  return {
    homepage: resource(
      SITE_URL,
      `<html><head><link href="${SITE_URL}" rel="canonical">${analytics}</head></html>`,
      "text/html; charset=utf-8",
    ),
    sitemap: resource(
      `${SITE_URL}sitemap.xml`,
      `<urlset>${WATCH_URLS.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`,
      "application/xml",
    ),
    robots: resource(
      `${SITE_URL}robots.txt`,
      `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}sitemap.xml\n`,
      "text/plain",
    ),
  };
}

function makeDigestState() {
  const source = indexWatchSourceSnapshot(makeIndexWatchState(), {
    runDate: "2026-07-19",
    now: fixtureNow,
  });
  const snapshot = {
    runId: fixtureNow.toISOString(),
    runDate: "2026-07-19",
    generatedAt: fixtureNow.toISOString(),
    sourceIndexWatch: source,
    trend: buildTrend(null, source),
    health: evaluateSiteHealth(makeResources()),
  };
  snapshot.overall = monitoringStatus(snapshot.health, source);
  return {
    schema: WEEKLY_DIGEST_SCHEMA,
    siteUrl: SITE_URL,
    updatedAt: snapshot.generatedAt,
    latest: snapshot,
    history: [snapshot],
  };
}

function makeLegacyDigestState() {
  const state = structuredClone(makeDigestState());
  const source = state.latest.sourceIndexWatch;
  source.watchUrlCount = LEGACY_V1_WATCH_URLS.length;
  source.watchUrlHash = watchedUrlHash(LEGACY_V1_WATCH_URLS);
  source.indexed = {
    pass: LEGACY_V1_WATCH_URLS.length,
    neutral: 0,
    fail: 0,
    unknown: 0,
  };
  state.latest.health.probes.sitemap.count = LEGACY_V1_WATCH_URLS.length;
  state.latest.health.probes.sitemap.hash = watchedUrlHash(
    LEGACY_V1_WATCH_URLS,
  );
  state.latest.overall = monitoringStatus(state.latest.health, source);
  state.history = [state.latest];
  return state;
}

function makeDigestHistoryState(inventories) {
  const snapshots = inventories.map((inventory, index) => {
    const snapshot = structuredClone(
      inventory === "legacy"
        ? makeLegacyDigestState().latest
        : makeDigestState().latest,
    );
    const generatedAt = new Date(
      Date.parse("2026-07-19T12:45:00.000Z") -
        index * 7 * 24 * 60 * 60 * 1_000,
    ).toISOString();
    const runDate = generatedAt.slice(0, 10);
    snapshot.runId = generatedAt;
    snapshot.runDate = runDate;
    snapshot.generatedAt = generatedAt;
    snapshot.sourceIndexWatch.runId = generatedAt;
    snapshot.sourceIndexWatch.runDate = runDate;
    snapshot.sourceIndexWatch.generatedAt = generatedAt;
    return snapshot;
  });
  for (const [index, snapshot] of snapshots.entries()) {
    snapshot.trend = buildTrend(
      snapshots[index + 1]
        ? { latest: { sourceIndexWatch: snapshots[index + 1].sourceIndexWatch } }
        : null,
      snapshot.sourceIndexWatch,
    );
  }
  return {
    schema: WEEKLY_DIGEST_SCHEMA,
    siteUrl: SITE_URL,
    updatedAt: snapshots[0].generatedAt,
    latest: snapshots[0],
    history: snapshots,
  };
}

function hotNote() {
  return `---
title: "Esteban Moreno Media — Hot Status"
updated: 2026-07-18
---

# Esteban Moreno Media — Hot Status

## Human section

Keep this content.
`;
}

function makeArgs(directory, indexWatchStateDir) {
  return {
    command: "run",
    dryRun: false,
    force: false,
    runDate: "2026-07-19",
    runId: fixtureNow.toISOString(),
    stateDir: join(directory, "digest-state"),
    indexWatchStateDir,
    hotNotePath: join(directory, "hot.md"),
    digestNotePath: join(directory, "weekly-digest.md"),
    sourceWaitAttempts: 1,
    sourceWaitMs: 0,
    sourceMaxAgeMs: 18 * 60 * 60 * 1_000,
  };
}

function easternDependencies(overrides = {}) {
  return {
    systemTimeZone: async () => "America/New_York",
    ...overrides,
  };
}

function fixtureFetch(counter, resources = makeResources()) {
  return async (url) => {
    counter.count += 1;
    const selected =
      url === SITE_URL
        ? resources.homepage
        : url.endsWith("sitemap.xml")
          ? resources.sitemap
          : resources.robots;
    return new Response(selected.body, {
      status: selected.status,
      headers: { "content-type": selected.contentType },
    });
  };
}

describe("Esteban Media weekly digest", () => {
  it("accepts the exact live B1 contract and preserves property aggregates", () => {
    const state = makeIndexWatchState();
    const source = indexWatchSourceSnapshot(state, {
      runDate: "2026-07-19",
      now: fixtureNow,
    });

    expect(source).toMatchObject({
      schema: INDEX_WATCH_SCHEMA,
      runId: state.latest.runId,
      runDate: "2026-07-19",
      watchUrlCount: WATCH_URLS.length,
      watchUrlHash: watchedUrlHash(),
      startDate: "2026-06-21",
      endDate: "2026-07-18",
      allDataPropertyTotals: { clicks: 1, impressions: 1 },
      indexed: {
        pass: WATCH_URLS.length,
        neutral: 0,
        fail: 0,
        unknown: 0,
      },
    });
    expect(
      state.latest.searchAnalytics.pages.reduce(
        (total, page) => total + page.impressions,
        0,
      ),
    ).toBe(2);
    expect(source.allDataPropertyTotals.impressions).toBe(1);
  });

  it("rejects stale, failed, future, malformed-range, sitemap, and count sources", () => {
    const state = makeIndexWatchState();
    const validate = (candidate, options = {}) =>
      indexWatchSourceSnapshot(candidate, {
        runDate: "2026-07-19",
        now: fixtureNow,
        ...options,
      });

    expect(() =>
      validate(state, {
        lastError: { failedAt: "2026-07-19T12:30:00Z", message: "failed" },
      }),
    ).toThrow("last run failed");
    expect(() =>
      validate(makeIndexWatchState({ generatedAt: "2026-07-20T12:00:00Z" })),
    ).toThrow("future");
    const wrongRange = structuredClone(state);
    wrongRange.latest.searchAnalytics.startDate = "2026-06-20";
    expect(() => validate(wrongRange)).toThrow("analytics range");
    const wrongSitemap = structuredClone(state);
    wrongSitemap.latest.liveSitemap.urls = WATCH_URLS.slice(1);
    expect(() => validate(wrongSitemap)).toThrow();
    const wrongCounts = structuredClone(state);
    wrongCounts.latest.inspection.counts.pass = WATCH_URLS.length - 1;
    expect(() => validate(wrongCounts)).toThrow(
      "latest.inspection.counts",
    );
    const mismatchedCounts = structuredClone(state);
    mismatchedCounts.latest.inspection.pages[0].verdict = "FAIL";
    expect(() => validate(mismatchedCounts)).toThrow(
      "latest.inspection.counts.mismatch",
    );
    const wrongHash = structuredClone(state);
    wrongHash.watchUrlHash = "wrong";
    expect(() => validate(wrongHash)).toThrow("watchUrlHash");
    const wrongSchema = structuredClone(state);
    wrongSchema.schema = "foreign.schema";
    expect(() => validate(wrongSchema)).toThrow("schema");
    const wrongIncompleteDate = structuredClone(state);
    wrongIncompleteDate.latest.searchAnalytics.firstIncompleteDate =
      "2026-06-20";
    expect(() => validate(wrongIncompleteDate)).toThrow(
      "first incomplete date",
    );
    expect(() =>
      validate(
        makeIndexWatchState({
          generatedAt: "2026-07-18T23:50:00Z",
          runDate: "2026-07-19",
        }),
      ),
    ).toThrow("Eastern run date");
    expect(() =>
      validate(
        makeIndexWatchState({ generatedAt: "2026-07-19T04:05:00Z" }),
      ),
    ).toThrow("analytics range");
    expect(() =>
      indexWatchSourceSnapshot(state, {
        runDate: "2026-07-20",
        now: fixtureNow,
      }),
    ).toThrow("is not 2026-07-20");
    expect(() =>
      validate(state, { now: new Date("2026-07-20T12:45:00Z"), maxAgeMs: 60_000 }),
    ).toThrow("minutes old");
  });

  it("records four exact bounded probes and degrades on redirects or missing GA", () => {
    const healthy = evaluateSiteHealth(makeResources());
    expect(healthy.overall).toBe("PASS");
    expect(Object.values(healthy.probes).every((probe) => probe.ok)).toBe(true);
    expect(healthy.probes.sitemap).toMatchObject({
      count: WATCH_URLS.length,
      hash: watchedUrlHash(),
    });

    const unhealthyResources = makeResources({ includeAnalytics: false });
    unhealthyResources.homepage.finalUrl = `${SITE_URL}es`;
    const unhealthy = evaluateSiteHealth(unhealthyResources);
    expect(unhealthy.overall).toBe("DEGRADED");
    expect(unhealthy.probes.homepage.errors.join(" ")).toContain("final URL");
    expect(unhealthy.probes.analytics.errors).toContain("GA loader missing");

    const blockedResources = makeResources();
    blockedResources.robots.body = `User-agent: *\nAllow: /\nDisallow: /*\nSitemap: ${SITE_URL}sitemap.xml\n`;
    const blocked = evaluateSiteHealth(blockedResources);
    expect(blocked.probes.robots.ok).toBe(false);
    expect(blocked.probes.robots.errors).toContain(
      "wildcard group blanket-blocks the site",
    );
  });

  it("degrades the visible digest when coverage is incomplete", () => {
    const state = makeDigestState();
    state.latest.sourceIndexWatch.indexed = {
      pass: WATCH_URLS.length - 1,
      neutral: 1,
      fail: 0,
      unknown: 0,
    };
    state.latest.overall = monitoringStatus(
      state.latest.health,
      state.latest.sourceIndexWatch,
    );
    state.history = [state.latest];

    expect(state.latest.health.overall).toBe("PASS");
    expect(state.latest.overall).toBe("DEGRADED");
    expect(renderHotPulse(state.latest)).toContain("[!danger]");
    expect(renderHotPulse(state.latest)).toContain(
      `indexed ${WATCH_URLS.length - 1}/${WATCH_URLS.length} PASS`,
    );
    expect(renderDigestDetail(state)).toContain(
      `${WATCH_URLS.length - 1} PASS · 1 neutral/excluded`,
    );
    expect(validateDigestState(state)).toBe(state);
  });

  it("retries transient transport failures and returns final HTTP failures as data", async () => {
    let attempts = 0;
    const recovered = await requestResource("https://example.com", {
      fetchImpl: async () => {
        attempts += 1;
        if (attempts === 1) throw new TypeError("fetch failed");
        return new Response("ok", {
          status: 200,
          headers: { "content-type": "text/plain" },
        });
      },
      sleep: async () => {},
    });
    expect(attempts).toBe(2);
    expect(recovered).toMatchObject({ status: 200, body: "ok" });

    const failed = await requestResource("https://example.com", {
      fetchImpl: async () => new Response("down", { status: 500 }),
      sleep: async () => {},
      attempts: 2,
    });
    expect(failed).toMatchObject({ status: 500, body: "down" });
  });

  it("labels rolling property changes as snapshot deltas with a real baseline", () => {
    const current = makeDigestState();
    expect(current.latest.trend).toMatchObject({
      comparisonRunDate: null,
      allDataImpressionsDelta: null,
    });
    const priorSource = structuredClone(current.latest.sourceIndexWatch);
    priorSource.runDate = "2026-07-12";
    priorSource.allDataPropertyTotals = totals();
    priorSource.indexed.pass = WATCH_URLS.length - 1;
    const trend = buildTrend(
      { latest: { sourceIndexWatch: priorSource } },
      current.latest.sourceIndexWatch,
    );
    expect(trend).toMatchObject({
      comparisonRunDate: "2026-07-12",
      allDataClicksDelta: 1,
      allDataImpressionsDelta: 1,
      indexedPassDelta: 1,
    });
  });

  it("keeps one dated hot pulse below the H1 and preserves human content", () => {
    const firstState = makeDigestState();
    const first = mergeHotNote(
      hotNote(),
      renderHotPulse(firstState.latest),
      "2026-07-19",
    );
    expect(first).toMatch(
      /# Esteban Moreno Media — Hot Status\n\n<!-- esteban-media:weekly-pulse:start -->/,
    );
    expect(first).toContain("2026-07-19 · Probes 4/4");
    expect(first).toContain("Keep this content.");

    const nextSnapshot = structuredClone(firstState.latest);
    nextSnapshot.runDate = "2026-07-26";
    const next = mergeHotNote(
      first,
      renderHotPulse(nextSnapshot),
      "2026-07-26",
    );
    expect(next.match(/weekly-pulse:start/g)).toHaveLength(1);
    expect(next).toContain("2026-07-26 · Probes 4/4");
    expect(next).not.toContain("2026-07-19 · Probes 4/4");
    expect(() => mergeHotNote(`${hotNote()}\n# Duplicate\n`, "x", "2026-07-19")).toThrow(
      "exactly one H1",
    );
    expect(() =>
      mergeHotNote(
        hotNote().replace(
          "Keep this content.",
          "<!-- esteban-media:weekly-pulse:start -->\n<!-- esteban-media:weekly-pulse:start -->\n<!-- esteban-media:weekly-pulse:end -->",
        ),
        "x",
        "2026-07-19",
      ),
    ).toThrow("duplicate managed markers");
  });

  it("creates a dedicated managed detail note with a 13-week history contract", () => {
    const state = makeDigestState();
    const first = mergeDigestNote(
      "",
      renderDigestDetail(state),
      "2026-07-19",
    );
    expect(first).toContain("# Esteban Media — Weekly Health & Search Digest");
    expect(first).toContain("GA configuration present");
    expect(first).toContain("weekly snapshot deltas");
    const withHuman = first.replace(
      "Automated Sunday pulse",
      "Human note.\n\nAutomated Sunday pulse",
    );
    const second = mergeDigestNote(
      withHuman,
      renderDigestDetail(state),
      "2026-07-19",
    );
    expect(second).toContain("Human note.");
    expect(second.match(/weekly-digest:start/g)).toHaveLength(1);
  });

  it("deeply rejects malformed persisted snapshots before replay or status", () => {
    const valid = makeDigestState();
    expect(validateDigestState(valid)).toBe(valid);
    expect(renderHotPulse(valid.latest)).not.toContain("NaN");
    expect(renderDigestDetail(valid)).not.toContain("NaN");

    const cases = [
      (state) => delete state.latest.health.probes.analytics,
      (state) => {
        state.latest.trend.allDataImpressionsDelta = "one";
      },
      (state) => {
        state.latest.trend.finalClicksDelta = 0;
      },
      (state) => {
        state.latest.trend.comparisonRunDate = "2026-07-12";
      },
      (state) => {
        state.latest.sourceIndexWatch.watchUrlHash = "wrong";
      },
      (state) => {
        state.latest.health.probes.homepage.status = 500;
      },
      (state) => {
        state.latest.health.probes.robots.status = 500;
      },
      (state) => {
        state.latest.sourceIndexWatch.indexed.pass = WATCH_URLS.length - 1;
      },
      (state) => {
        state.latest.overall = "PASS";
        state.latest.sourceIndexWatch.indexed.pass = WATCH_URLS.length - 1;
        state.latest.sourceIndexWatch.indexed.neutral = 1;
      },
    ];
    for (const corrupt of cases) {
      const state = structuredClone(valid);
      corrupt(state);
      state.history[0] = state.latest;
      expect(() => validateDigestState(state)).toThrow("latest");
    }
    const corruptHistory = structuredClone(valid);
    corruptHistory.history = [null];
    expect(() => validateDigestState(corruptHistory)).toThrow("history");
  });

  it("recognizes the valid legacy digest contract and marks it for a fresh run", () => {
    const legacy = makeLegacyDigestState();
    const migrated = validateDigestState(legacy);

    expect(migrated).not.toBe(legacy);
    expect(migrated.history).toBe(legacy.history);
    expect(migrated.watchSetExpansion).toMatchObject({
      fromCount: LEGACY_V1_WATCH_URLS.length,
      toCount: WATCH_URLS.length,
    });

    const malformed = structuredClone(legacy);
    malformed.latest.sourceIndexWatch.watchUrlHash = "foreign";
    malformed.history[0] = malformed.latest;
    expect(() => validateDigestState(malformed)).toThrow("latest");
  });

  it("accepts only the newest-to-oldest current then legacy history boundary", () => {
    const state = makeDigestHistoryState([
      "current",
      "current",
      "legacy",
      "legacy",
    ]);

    expect(validateDigestState(state)).toBe(state);
  });

  it("rejects a reverse legacy-to-current history boundary", () => {
    const state = makeDigestHistoryState(["legacy", "current"]);

    expect(() => validateDigestState(state)).toThrow("history.inventory");
  });

  it("rejects repeated current-to-legacy-to-current history boundaries", () => {
    const state = makeDigestHistoryState(["current", "legacy", "current"]);

    expect(() => validateDigestState(state)).toThrow("history.inventory");
  });

  it("reports stale cadence after the next Sunday grace window", () => {
    const state = makeDigestState();
    const beforeGrace = new Date("2026-07-26T12:54:00Z");
    const afterGrace = new Date("2026-07-26T12:56:00Z");

    expect(digestOperationalStatus(state, null, beforeGrace)).toBe("READY");
    expect(digestOperationalStatus(state, null, afterGrace)).toBe("STALE");
    expect(
      digestOperationalStatus(
        state,
        { failedAt: afterGrace.toISOString(), message: "failed" },
        afterGrace,
      ),
    ).toBe("LAST_RUN_FAILED");
    expect(digestCadence(state, afterGrace)).toMatchObject({
      lastRunDate: "2026-07-19",
      lastRunAgeDays: 7,
      lastSuccessfulRunDate: "2026-07-19",
      lastSuccessfulAgeDays: 7,
      nextDueDate: "2026-07-26",
    });
    const mondayRecovery = structuredClone(state);
    mondayRecovery.latest.runDate = "2026-07-27";
    mondayRecovery.history[0].runDate = "2026-07-27";
    expect(digestCadence(mondayRecovery, afterGrace).nextDueDate).toBe(
      "2026-08-02",
    );

    state.latest.sourceIndexWatch.indexed.pass = WATCH_URLS.length - 1;
    state.latest.sourceIndexWatch.indexed.neutral = 1;
    state.latest.overall = "DEGRADED";
    state.history[0] = state.latest;
    expect(
      digestOperationalStatus(
        state,
        null,
        new Date("2026-07-20T12:00:00Z"),
      ),
    ).toBe("DEGRADED");
  });

  it("refuses a run after the macOS system timezone leaves Eastern", async () => {
    expect(() => assertEasternSystemTimeZone("America/New_York")).not.toThrow();
    expect(() =>
      assertEasternSystemTimeZone(
        "/var/db/timezone/zoneinfo/America/New_York",
      ),
    ).not.toThrow();
    expect(() => assertEasternSystemTimeZone("America/Los_Angeles")).toThrow(
      "requires the macOS system timezone",
    );

    const directory = await mkdtemp(join(tmpdir(), "esteban-weekly-zone-"));
    temporaryDirectories.push(directory);
    const args = makeArgs(directory, join(directory, "index-state"));
    const counter = { count: 0 };
    await expect(
      runWeeklyDigest(args, {
        fetchImpl: fixtureFetch(counter),
        systemTimeZone: async () => "America/Los_Angeles",
      }),
    ).rejects.toThrow("requires the macOS system timezone");
    expect(counter.count).toBe(0);
    await expect(readFile(join(args.stateDir, "latest.json"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("writes real state and both notes, then replays byte-stably without probes", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-weekly-digest-"));
    temporaryDirectories.push(directory);
    const indexWatchStateDir = join(directory, "index-state");
    await writeFile(join(directory, "hot.md"), hotNote());
    await mkdir(indexWatchStateDir, { recursive: true });
    await writeFile(
      join(indexWatchStateDir, "latest.json"),
      `${JSON.stringify(makeIndexWatchState(), null, 2)}\n`,
    );
    const args = makeArgs(directory, indexWatchStateDir);
    const counter = { count: 0 };
    const dependencies = easternDependencies({
      fetchImpl: fixtureFetch(counter),
      sleep: async () => {},
      now: () => fixtureNow,
    });

    const first = await runWeeklyDigest(args, dependencies);
    expect(first).toMatchObject({
      status: "PASS",
      health: "PASS",
      allDataPropertyTotals: { clicks: 1, impressions: 1 },
      indexed: { pass: WATCH_URLS.length },
    });
    expect(counter.count).toBe(3);
    const stateBefore = await readFile(join(args.stateDir, "latest.json"), "utf8");
    const hotBefore = await readFile(args.hotNotePath, "utf8");
    const detailBefore = await readFile(args.digestNotePath, "utf8");

    const second = await runWeeklyDigest(args, dependencies);
    expect(second.status).toBe("ALREADY_RECORDED");
    expect(counter.count).toBe(3);
    expect(await readFile(join(args.stateDir, "latest.json"), "utf8")).toBe(
      stateBefore,
    );
    expect(await readFile(args.hotNotePath, "utf8")).toBe(hotBefore);
    expect(await readFile(args.digestNotePath, "utf8")).toBe(detailBefore);

    await rm(args.digestNotePath);
    const repaired = await runWeeklyDigest(args, dependencies);
    expect(repaired.status).toBe("REPAIRED_NOTES");
    expect(counter.count).toBe(3);
    expect(await readFile(args.digestNotePath, "utf8")).toBe(detailBefore);
  });

  it("forces a same-day digest after the watch-set expansion and keeps legacy history", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-weekly-migration-"));
    temporaryDirectories.push(directory);
    const indexWatchStateDir = join(directory, "index-state");
    await mkdir(indexWatchStateDir, { recursive: true });
    await writeFile(join(directory, "hot.md"), hotNote());
    await writeFile(
      join(indexWatchStateDir, "latest.json"),
      `${JSON.stringify(makeIndexWatchState(), null, 2)}\n`,
    );
    const args = {
      ...makeArgs(directory, indexWatchStateDir),
      runId: "2026-07-19T13:00:00.000Z",
    };
    await mkdir(args.stateDir, { recursive: true });
    await writeFile(
      join(args.stateDir, "latest.json"),
      `${JSON.stringify(makeLegacyDigestState(), null, 2)}\n`,
    );
    const counter = { count: 0 };
    const result = await runWeeklyDigest(
      args,
      easternDependencies({
        fetchImpl: fixtureFetch(counter),
        sleep: async () => {},
        now: () => fixtureNow,
      }),
    );

    expect(result).toMatchObject({ status: "PASS" });
    expect(counter.count).toBe(3);
    const persisted = JSON.parse(
      await readFile(join(args.stateDir, "latest.json"), "utf8"),
    );
    expect(persisted.watchSetExpansion).toBeUndefined();
    expect(persisted.history).toHaveLength(2);
    expect(persisted.latest.trend).toEqual({
      comparisonRunDate: null,
      finalClicksDelta: null,
      finalImpressionsDelta: null,
      allDataClicksDelta: null,
      allDataImpressionsDelta: null,
      indexedPassDelta: null,
    });
    expect(validateDigestState(persisted)).toBe(persisted);
    expect(await readFile(args.digestNotePath, "utf8")).toContain(
      `| ${LEGACY_V1_WATCH_URLS.length}/${LEGACY_V1_WATCH_URLS.length} |`,
    );
  });

  it("re-reads state after acquiring the lock in a delayed two-run race", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-weekly-race-lock-"));
    temporaryDirectories.push(directory);
    const indexWatchStateDir = join(directory, "index-state");
    await mkdir(indexWatchStateDir, { recursive: true });
    await writeFile(join(directory, "hot.md"), hotNote());
    await writeFile(
      join(indexWatchStateDir, "latest.json"),
      `${JSON.stringify(makeIndexWatchState(), null, 2)}\n`,
    );
    const args = makeArgs(directory, indexWatchStateDir);
    const counter = { count: 0 };
    let releaseDelayedRun;
    let reportAtLock;
    const atLock = new Promise((resolve) => {
      reportAtLock = resolve;
    });
    const holdBeforeLock = new Promise((resolve) => {
      releaseDelayedRun = resolve;
    });
    const common = {
      fetchImpl: fixtureFetch(counter),
      sleep: async () => {},
      now: () => fixtureNow,
    };
    const delayedRun = runWeeklyDigest(
      args,
      easternDependencies({
        ...common,
        beforeLock: async () => {
          reportAtLock();
          await holdBeforeLock;
        },
      }),
    );
    await atLock;

    const first = await runWeeklyDigest(args, easternDependencies(common));
    releaseDelayedRun();
    const second = await delayedRun;

    expect(first.status).toBe("PASS");
    expect(second.status).toBe("ALREADY_RECORDED");
    expect(counter.count).toBe(3);
    const state = JSON.parse(
      await readFile(join(args.stateDir, "latest.json"), "utf8"),
    );
    expect(state.history).toHaveLength(1);
  });

  it("writes a degraded digest instead of treating probe failures as execution errors", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-weekly-degraded-"));
    temporaryDirectories.push(directory);
    const indexWatchStateDir = join(directory, "index-state");
    await mkdir(indexWatchStateDir, { recursive: true });
    await writeFile(
      join(indexWatchStateDir, "latest.json"),
      `${JSON.stringify(makeIndexWatchState(), null, 2)}\n`,
    );
    await writeFile(join(directory, "hot.md"), hotNote());
    const resources = makeResources({ includeAnalytics: false });
    resources.sitemap.status = 500;
    const counter = { count: 0 };
    const args = makeArgs(directory, indexWatchStateDir);
    const result = await runWeeklyDigest(args, easternDependencies({
      fetchImpl: fixtureFetch(counter, resources),
      sleep: async () => {},
      now: () => fixtureNow,
    }));

    expect(result).toMatchObject({ status: "DEGRADED", health: "DEGRADED" });
    expect(await readFile(args.hotNotePath, "utf8")).toContain("Probes 2/4");
    expect(await readFile(args.digestNotePath, "utf8")).toContain("| FAIL |");
    expect(validateDigestState(JSON.parse(await readFile(join(args.stateDir, "latest.json"), "utf8")))).toBeTruthy();
  });

  it("polls an old source until B1 becomes ready even when no lock exists", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-weekly-race-"));
    temporaryDirectories.push(directory);
    const indexWatchStateDir = join(directory, "index-state");
    await mkdir(indexWatchStateDir, { recursive: true });
    await writeFile(
      join(indexWatchStateDir, "latest.json"),
      `${JSON.stringify(makeIndexWatchState({ runDate: "2026-07-18" }), null, 2)}\n`,
    );
    const args = {
      ...makeArgs(directory, indexWatchStateDir),
      dryRun: true,
      sourceWaitAttempts: 2,
    };
    let sleeps = 0;
    const result = await runWeeklyDigest(args, easternDependencies({
      fetchImpl: fixtureFetch({ count: 0 }),
      now: () => fixtureNow,
      sleep: async () => {
        sleeps += 1;
        await writeFile(
          join(indexWatchStateDir, "latest.json"),
          `${JSON.stringify(makeIndexWatchState(), null, 2)}\n`,
        );
      },
    }));
    expect(result.status).toBe("DRY_RUN");
    expect(sleeps).toBe(1);
  });

  it("exhausts a missing source without writing digest state", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-weekly-missing-"));
    temporaryDirectories.push(directory);
    const args = {
      ...makeArgs(directory, join(directory, "missing-index-state")),
      dryRun: true,
      sourceWaitAttempts: 2,
    };
    await expect(
      runWeeklyDigest(
        args,
        easternDependencies({ sleep: async () => {}, now: () => fixtureNow }),
      ),
    ).rejects.toThrow("not ready before the digest deadline");
    await expect(readFile(join(args.stateDir, "latest.json"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("times out behind an active B1 lock without writing digest state", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-weekly-locked-"));
    temporaryDirectories.push(directory);
    const indexWatchStateDir = join(directory, "index-state");
    await mkdir(indexWatchStateDir, { recursive: true });
    await writeFile(join(indexWatchStateDir, "index-watch.lock"), "fixture\n");
    const args = {
      ...makeArgs(directory, indexWatchStateDir),
      dryRun: true,
      sourceWaitAttempts: 2,
    };
    await expect(
      runWeeklyDigest(
        args,
        easternDependencies({ sleep: async () => {}, now: () => fixtureNow }),
      ),
    ).rejects.toThrow("still running");
    await expect(readFile(join(args.stateDir, "latest.json"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("keeps the committed Sunday 08:45 schedule and absolute paths", async () => {
    const plist = await readFile(
      join(
        process.cwd(),
        "ops/launchd/com.esteban-media.weekly-digest.plist",
      ),
      "utf8",
    );
    expect(plist).not.toContain("<key>RunAtLoad</key>");
    expect(plist).toContain("<key>Weekday</key>\n    <integer>0</integer>");
    expect(plist).toContain("<key>Hour</key>\n    <integer>8</integer>");
    expect(plist).toContain("<key>Minute</key>\n    <integer>45</integer>");
    expect(plist).toContain(
      "/Users/gonzalo/code/esteban-media/scripts/esteban-media-weekly-digest.mjs",
    );
    expect(plist).toContain(
      "/Users/gonzalo/obsidian-wiki/client-esteban-media/wiki/esteban-media-hot.md",
    );
  });

  it("preserves a concurrent hot-note edit and rolls back new state and detail", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-weekly-concurrent-"));
    temporaryDirectories.push(directory);
    const indexWatchStateDir = join(directory, "index-state");
    await mkdir(indexWatchStateDir, { recursive: true });
    await writeFile(
      join(indexWatchStateDir, "latest.json"),
      `${JSON.stringify(makeIndexWatchState(), null, 2)}\n`,
    );
    await writeFile(join(directory, "hot.md"), hotNote());
    const args = makeArgs(directory, indexWatchStateDir);
    await expect(
      runWeeklyDigest(args, easternDependencies({
        fetchImpl: fixtureFetch({ count: 0 }),
        sleep: async () => {},
        now: () => fixtureNow,
        beforeNoteWrite: async () => {
          await writeFile(
            args.hotNotePath,
            `${await readFile(args.hotNotePath, "utf8")}\nConcurrent human edit.\n`,
          );
        },
      })),
    ).rejects.toThrow("Concurrent edit detected");
    expect(await readFile(args.hotNotePath, "utf8")).toContain(
      "Concurrent human edit.",
    );
    await expect(readFile(join(args.stateDir, "latest.json"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
    await expect(readFile(args.digestNotePath, "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
  });
});
