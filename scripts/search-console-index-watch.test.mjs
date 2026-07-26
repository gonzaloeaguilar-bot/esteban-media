import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  utimes,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import sitemap from "../app/sitemap.ts";
import {
  INDEX_WATCH_SCHEMA,
  LEGACY_V1_WATCH_URLS,
  SITE_URL,
  WATCH_URLS,
  acquireLock,
  buildState,
  defaultRange,
  deliverPendingNotifications,
  detectAlerts,
  mergeManagedNote,
  operationalStatus,
  renderManagedBlock,
  requestJson,
  requestText,
  runIndexWatch,
  sitemapUrls,
  validateWatchedSitemap,
  validatePreviousState,
  watchedPageRows,
  watchedUrlHash,
} from "./search-console-index-watch.mjs";

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

function makeInspection(url, verdict = "PASS") {
  return {
    url,
    verdict,
    coverageState:
      verdict === "PASS" ? "Submitted and indexed" : "Excluded by test",
    indexingState: "INDEXING_ALLOWED",
    pageFetchState: "SUCCESSFUL",
    robotsTxtState: "ALLOWED",
    lastCrawlTime: "2026-07-19T12:00:00Z",
    googleCanonical: url,
    userCanonical: url,
    canonicalMismatch: false,
  };
}

function makePage(url, impressions = 0) {
  return {
    url,
    observed: impressions > 0,
    clicks: 0,
    impressions,
    ctr: impressions > 0 ? 0 : null,
    position: impressions > 0 ? 10 : null,
  };
}

function makeSnapshot({ impressions = 0, verdict = "PASS" } = {}) {
  const pages = WATCH_URLS.map((url, index) =>
    makePage(url, index === 0 ? impressions : 0),
  );
  const inspectionPages = WATCH_URLS.map((url) =>
    makeInspection(url, verdict),
  );
  return {
    runId: "2026-07-19T12:00:00.000Z",
    runDate: "2026-07-19",
    generatedAt: "2026-07-19T12:00:00.000Z",
    permissionLevel: "siteOwner",
    liveSitemap: validateWatchedSitemap(WATCH_URLS),
    searchAnalytics: {
      startDate: "2026-06-21",
      endDate: "2026-07-18",
      firstIncompleteDate: "2026-07-18",
      finalPropertyTotals: {
        observed: false,
        clicks: 0,
        impressions: 0,
        ctr: null,
        position: null,
      },
      allDataPropertyTotals: {
        observed: impressions > 0,
        clicks: 0,
        impressions,
        ctr: impressions > 0 ? 0 : null,
        position: impressions > 0 ? 10 : null,
      },
      pages,
      daily: [],
    },
    inspection: {
      counts: {
        pass: verdict === "PASS" ? WATCH_URLS.length : 0,
        neutral: verdict === "NEUTRAL" ? WATCH_URLS.length : 0,
        fail: verdict === "FAIL" ? WATCH_URLS.length : 0,
        unknown: 0,
      },
      pages: inspectionPages,
    },
    alerts: [],
  };
}

function makeState(snapshot) {
  return {
    schema: INDEX_WATCH_SCHEMA,
    updatedAt: snapshot.generatedAt,
    siteUrl: SITE_URL,
    watchUrlCount: WATCH_URLS.length,
    watchUrlHash: watchedUrlHash(),
    everImpressions:
      snapshot.searchAnalytics.allDataPropertyTotals.impressions > 0 ||
      snapshot.searchAnalytics.pages.some((page) => page.impressions > 0),
    firstImpressionsObservedAt: null,
    latest: snapshot,
    history: [snapshot],
    eventHistory: [],
    confirmedVerdicts: Object.fromEntries(
      snapshot.inspection.pages.map((page) => [
        page.url,
        new Set(["PASS", "NEUTRAL", "FAIL"]).has(page.verdict)
          ? page.verdict
          : null,
      ]),
    ),
    pendingNotifications: [],
  };
}

function makeLegacyState() {
  const snapshot = makeSnapshot();
  const legacyUrls = new Set(LEGACY_V1_WATCH_URLS);
  snapshot.searchAnalytics.pages = snapshot.searchAnalytics.pages.filter(
    (page) => legacyUrls.has(page.url),
  );
  snapshot.inspection.pages = snapshot.inspection.pages.filter((page) =>
    legacyUrls.has(page.url),
  );
  snapshot.inspection.counts = {
    pass: LEGACY_V1_WATCH_URLS.length,
    neutral: 0,
    fail: 0,
    unknown: 0,
  };
  snapshot.liveSitemap = validateWatchedSitemap(
    LEGACY_V1_WATCH_URLS,
    LEGACY_V1_WATCH_URLS,
  );
  const state = makeState(snapshot);
  state.watchUrlCount = LEGACY_V1_WATCH_URLS.length;
  state.watchUrlHash = watchedUrlHash(LEGACY_V1_WATCH_URLS);
  return state;
}

function retryingFetch(successResponse) {
  let attempts = 0;
  return async () => {
    attempts += 1;
    if (attempts === 1) throw new TypeError("fetch failed");
    return successResponse;
  };
}

function indexWatchFixtureFetch(counter) {
  const jsonResponse = (payload) =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  return async (url, options = {}) => {
    counter.count += 1;
    if (url === `${SITE_URL}sitemap.xml`) {
      return new Response(
        `<urlset>${WATCH_URLS.map((watchedUrl) => `<url><loc>${watchedUrl}</loc></url>`).join("")}</urlset>`,
        { status: 200 },
      );
    }
    if (url === "https://oauth.fixture/token") {
      return jsonResponse({ access_token: "fixture-access" });
    }
    if (url === "https://www.googleapis.com/webmasters/v3/sites") {
      return jsonResponse({
        siteEntry: [{ siteUrl: SITE_URL, permissionLevel: "siteOwner" }],
      });
    }
    if (url.includes("/searchAnalytics/query")) {
      const body = JSON.parse(options.body);
      if (body.dimensions.includes("date")) {
        return jsonResponse({
          rows: [],
          metadata: { first_incomplete_date: "2026-07-18" },
        });
      }
      return jsonResponse({ rows: [] });
    }
    if (
      url ===
      "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"
    ) {
      const { inspectionUrl } = JSON.parse(options.body);
      return jsonResponse({
        inspectionResult: {
          indexStatusResult: {
            verdict: "PASS",
            coverageState: "Submitted and indexed",
            indexingState: "INDEXING_ALLOWED",
            pageFetchState: "SUCCESSFUL",
            robotsTxtState: "ALLOWED",
            googleCanonical: inspectionUrl,
            userCanonical: inspectionUrl,
          },
        },
      });
    }
    throw new Error(`Unexpected fixture URL: ${url}`);
  };
}

describe("Search Console index watch", () => {
  it("keeps the fixed watch set identical to the application sitemap", () => {
    const urls = sitemap().map((entry) => entry.url).sort();

    expect(WATCH_URLS).toHaveLength(259);
    expect([...WATCH_URLS].sort()).toEqual(urls);
    expect(validateWatchedSitemap(urls).hash).toBe(watchedUrlHash());
  });

  it("parses and rejects sitemap drift or duplicates", () => {
    const xml = `<urlset>${WATCH_URLS.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`;

    expect(sitemapUrls(xml)).toEqual(WATCH_URLS);
    expect(() => validateWatchedSitemap([...WATCH_URLS, WATCH_URLS[0]])).toThrow(
      "duplicate",
    );
    expect(() => validateWatchedSitemap(WATCH_URLS.slice(1))).toThrow(
      "does not match",
    );
  });

  it("preserves real zeroes while distinguishing missing page rows", () => {
    const rows = watchedPageRows({
      rows: [
        {
          keys: [WATCH_URLS[0]],
          clicks: 0,
          impressions: 1,
          ctr: 0,
          position: 9.5,
        },
      ],
    });

    expect(rows[0]).toMatchObject({
      observed: true,
      clicks: 0,
      impressions: 1,
      ctr: 0,
      position: 9.5,
    });
    expect(rows[1]).toMatchObject({
      observed: false,
      clicks: 0,
      impressions: 0,
      ctr: null,
      position: null,
    });
  });

  it("emits first impressions once and ignores missing analytics rows thereafter", () => {
    const first = makeSnapshot({ impressions: 2 });
    const alerts = detectAlerts(null, first);

    expect(alerts.map((alert) => alert.type)).toEqual(["first_impressions"]);
    expect(detectAlerts({ everImpressions: true, latest: first }, first)).toEqual(
      [],
    );
  });

  it("falls back to property totals when grouped page rows are absent", () => {
    const snapshot = makeSnapshot();
    snapshot.searchAnalytics.allDataPropertyTotals = {
      observed: true,
      clicks: 0,
      impressions: 1,
      ctr: 0,
      position: 8,
    };

    const alerts = detectAlerts(null, snapshot);

    expect(alerts).toHaveLength(1);
    expect(alerts[0].type).toBe("first_impressions");
    expect(alerts[0].urls).toEqual([]);
  });

  it("uses Pacific dates for Search Console's reporting calendar", () => {
    expect(defaultRange(new Date("2026-07-19T03:00:00.000Z"))).toEqual({
      startDate: "2026-06-20",
      endDate: "2026-07-17",
    });
    expect(defaultRange(new Date("2026-07-19T16:00:00.000Z"))).toEqual({
      startDate: "2026-06-21",
      endDate: "2026-07-18",
    });
  });

  it("only treats PASS to explicit NEUTRAL or FAIL as de-indexing", () => {
    const previous = makeSnapshot();
    const current = makeSnapshot();
    current.inspection.pages[0] = makeInspection(WATCH_URLS[0], "NEUTRAL");
    current.inspection.pages[1] = makeInspection(
      WATCH_URLS[1],
      "VERDICT_UNSPECIFIED",
    );

    const alerts = detectAlerts(
      { everImpressions: false, latest: previous },
      current,
    );

    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toMatchObject({
      type: "deindexed",
      url: WATCH_URLS[0],
      fromVerdict: "PASS",
      toVerdict: "NEUTRAL",
    });
  });

  it("retains the last confirmed PASS across an unknown verdict", () => {
    const priorSnapshot = makeSnapshot();
    const priorState = makeState(priorSnapshot);
    const unknownSnapshot = makeSnapshot();
    unknownSnapshot.inspection.pages[0] = makeInspection(
      WATCH_URLS[0],
      "VERDICT_UNSPECIFIED",
    );
    const afterUnknown = {
      ...priorState,
      latest: unknownSnapshot,
      confirmedVerdicts: { ...priorState.confirmedVerdicts },
    };
    const excludedSnapshot = makeSnapshot();
    excludedSnapshot.inspection.pages[0] = makeInspection(
      WATCH_URLS[0],
      "NEUTRAL",
    );

    expect(detectAlerts(afterUnknown, excludedSnapshot)).toEqual([
      expect.objectContaining({ type: "deindexed", url: WATCH_URLS[0] }),
    ]);
  });

  it("keeps repeated de-indexing incidents distinct across a full cycle", () => {
    const baseline = makeState(makeSnapshot());
    const firstFailure = makeSnapshot();
    firstFailure.runId = "2026-07-20T12:00:00.000Z";
    firstFailure.runDate = "2026-07-20";
    firstFailure.generatedAt = firstFailure.runId;
    firstFailure.inspection.pages[0] = makeInspection(
      WATCH_URLS[0],
      "FAIL",
    );
    firstFailure.inspection.counts = {
      pass: WATCH_URLS.length - 1,
      neutral: 0,
      fail: 1,
      unknown: 0,
    };
    firstFailure.alerts = detectAlerts(baseline, firstFailure);
    const failedState = buildState(baseline, firstFailure);

    const recovery = makeSnapshot();
    recovery.runId = "2026-07-21T12:00:00.000Z";
    recovery.runDate = "2026-07-21";
    recovery.generatedAt = recovery.runId;
    recovery.alerts = detectAlerts(failedState, recovery);
    const recoveredState = buildState(failedState, recovery);

    const secondFailure = makeSnapshot();
    secondFailure.runId = "2026-07-22T12:00:00.000Z";
    secondFailure.runDate = "2026-07-22";
    secondFailure.generatedAt = secondFailure.runId;
    secondFailure.inspection.pages[0] = makeInspection(
      WATCH_URLS[0],
      "FAIL",
    );
    secondFailure.inspection.counts = {
      pass: WATCH_URLS.length - 1,
      neutral: 0,
      fail: 1,
      unknown: 0,
    };
    secondFailure.alerts = detectAlerts(recoveredState, secondFailure);
    const secondFailedState = buildState(recoveredState, secondFailure);

    const deindexEvents = secondFailedState.eventHistory.filter(
      (event) => event.type === "deindexed",
    );
    expect(deindexEvents).toHaveLength(2);
    expect(new Set(deindexEvents.map((event) => event.id)).size).toBe(2);
    expect(secondFailedState.pendingNotifications).toHaveLength(3);
  });

  it("preserves human note content and replaces only the managed block", () => {
    const firstSnapshot = makeSnapshot({ impressions: 1 });
    firstSnapshot.alerts = detectAlerts(null, firstSnapshot);
    const firstState = makeState(firstSnapshot);
    const first = mergeManagedNote(
      "# Human heading\n\nKeep this note.\n",
      renderManagedBlock(firstState),
      "2026-07-19",
    );
    const secondSnapshot = makeSnapshot({ impressions: 2 });
    secondSnapshot.runId = "2026-07-20T12:00:00.000Z";
    secondSnapshot.runDate = "2026-07-20";
    secondSnapshot.generatedAt = "2026-07-20T12:00:00.000Z";
    const secondState = makeState(secondSnapshot);
    const second = mergeManagedNote(
      first,
      renderManagedBlock(secondState),
      "2026-07-20",
    );

    expect(second).toContain("Keep this note.");
    expect(second).toContain("Latest successful run — 2026-07-20");
    expect(second.match(/esteban-media:index-watch:start/g)).toHaveLength(1);
    expect(second.match(/esteban-media:index-watch:end/g)).toHaveLength(1);
  });

  it("updates the persisted note description to the current watch-set size", () => {
    const state = makeState(makeSnapshot());
    const existing = `# Human heading\n\nAutomated three-times-weekly Search Console performance and indexed-version coverage for the fixed 20-URL sitemap set.\n`;
    const merged = mergeManagedNote(
      existing,
      renderManagedBlock(state),
      "2026-07-19",
    );

    expect(merged).toContain(
      `fixed ${WATCH_URLS.length}-URL sitemap set`,
    );
    expect(merged).not.toContain("fixed 20-URL sitemap set");
  });

  it("retries transient JSON requests without leaking request details", async () => {
    let attempts = 0;
    const fetchImpl = async () => {
      attempts += 1;
      if (attempts === 1) {
        return new Response(JSON.stringify({ error: { message: "temporary" } }), {
          status: 500,
          headers: { "content-type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };

    await expect(
      requestJson(
        "https://example.com",
        {},
        { fetchImpl, sleep: async () => {}, label: "Fixture" },
      ),
    ).resolves.toEqual({ ok: true });
    expect(attempts).toBe(2);
  });

  it("retries transient transport failures for JSON and text requests", async () => {
    for (const request of [
      () =>
        requestJson(
          "https://example.com/data",
          {},
          {
            fetchImpl: retryingFetch(
              new Response(JSON.stringify({ ok: true }), { status: 200 }),
            ),
            sleep: async () => {},
          },
        ),
      () =>
        requestText("https://example.com/sitemap.xml", {
          fetchImpl: retryingFetch(new Response("<urlset />", { status: 200 })),
          sleep: async () => {},
        }),
    ]) {
      await expect(request()).resolves.toBeTruthy();
    }
  });

  it("prevents overlapping locks and recovers a stale lock", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-index-watch-"));
    temporaryDirectories.push(directory);
    const lockPath = join(directory, "index-watch.lock");
    const first = await acquireLock(lockPath, { now: 1_000_000, staleMs: 60_000 });
    const second = await acquireLock(lockPath, { now: 1_001_000, staleMs: 60_000 });

    expect(first.acquired).toBe(true);
    expect(second.acquired).toBe(false);

    const oldDate = new Date(0);
    await utimes(lockPath, oldDate, oldDate);
    const recovered = await acquireLock(lockPath, {
      now: 1_000_000,
      staleMs: 60_000,
    });
    expect(recovered.acquired).toBe(true);
    expect(recovered.staleRecovered).toBe(true);
    await recovered.release();
  });

  it("rejects a stale or foreign baseline before transition detection", () => {
    const state = makeState(makeSnapshot());

    expect(validatePreviousState(state)).toBe(state);
    expect(() =>
      validatePreviousState({ ...state, watchUrlHash: "stale" }),
    ).toThrow("watchUrlHash");
    expect(() =>
      validatePreviousState({ ...state, siteUrl: "https://example.com/" }),
    ).toThrow("siteUrl");
    const duplicatedPages = [...state.latest.inspection.pages];
    duplicatedPages[1] = { ...duplicatedPages[0] };
    expect(() =>
      validatePreviousState({
        ...state,
        latest: {
          ...state.latest,
          inspection: { ...state.latest.inspection, pages: duplicatedPages },
        },
      }),
    ).toThrow("latest.inspection.pages.urls");
    expect(() =>
      validatePreviousState({ ...state, everImpressions: "yes" }),
    ).toThrow("everImpressions");
  });

  it("migrates the strict 20-URL v1 state without losing durable evidence", () => {
    const legacyUrls = new Set(LEGACY_V1_WATCH_URLS);
    const legacy = makeLegacyState();
    legacy.eventHistory = [
      { id: "historical-event", type: "reindexed", message: "Preserve me" },
    ];
    legacy.pendingNotifications = [
      { id: "pending-event", type: "deindexed", message: "Retry me" },
    ];

    const migrated = validatePreviousState(legacy);
    const addedUrls = WATCH_URLS.filter((url) => !legacyUrls.has(url));

    expect(migrated).not.toBe(legacy);
    expect(migrated).toMatchObject({
      watchUrlCount: WATCH_URLS.length,
      watchUrlHash: watchedUrlHash(),
      watchSetExpansion: {
        fromCount: LEGACY_V1_WATCH_URLS.length,
        toCount: WATCH_URLS.length,
      },
    });
    expect(migrated.history).toBe(legacy.history);
    expect(migrated.eventHistory).toBe(legacy.eventHistory);
    expect(migrated.pendingNotifications).toBe(legacy.pendingNotifications);
    expect(migrated.latest.inspection.counts).toEqual({
      pass: LEGACY_V1_WATCH_URLS.length,
      neutral: 0,
      fail: 0,
      unknown: addedUrls.length,
    });
    for (const url of addedUrls) {
      expect(
        migrated.latest.searchAnalytics.pages.find((page) => page.url === url),
      ).toEqual({
        url,
        observed: false,
        clicks: 0,
        impressions: 0,
        ctr: null,
        position: null,
      });
      expect(
        migrated.latest.inspection.pages.find((page) => page.url === url),
      ).toMatchObject({ url, verdict: "VERDICT_UNSPECIFIED" });
      expect(migrated.confirmedVerdicts[url]).toBeNull();
    }
  });

  it("fails closed for malformed or foreign subset states", () => {
    const state = makeState(makeSnapshot());
    const foreignInventory = WATCH_URLS.slice(0, 19);
    state.watchUrlCount = foreignInventory.length;
    state.watchUrlHash = watchedUrlHash(foreignInventory);
    state.latest.searchAnalytics.pages = state.latest.searchAnalytics.pages.slice(
      0,
      foreignInventory.length,
    );
    state.latest.inspection.pages = state.latest.inspection.pages.slice(
      0,
      foreignInventory.length,
    );
    state.latest.inspection.counts = {
      pass: foreignInventory.length,
      neutral: 0,
      fail: 0,
      unknown: 0,
    };
    state.confirmedVerdicts = Object.fromEntries(
      foreignInventory.map((url) => [url, "PASS"]),
    );

    expect(() => validatePreviousState(state)).toThrow(
      "failed validation",
    );

    const malformedLegacy = structuredClone(state);
    malformedLegacy.watchUrlCount = LEGACY_V1_WATCH_URLS.length;
    malformedLegacy.watchUrlHash = watchedUrlHash(LEGACY_V1_WATCH_URLS);
    expect(() => validatePreviousState(malformedLegacy)).toThrow(
      "latest.inspection.pages.urls",
    );
  });

  it("rejects a legacy state whose persisted live sitemap is foreign", () => {
    const legacy = makeLegacyState();
    const foreignUrls = [
      ...LEGACY_V1_WATCH_URLS.slice(0, -1),
      "https://estebanmorenomedia.com/foreign-route",
    ];
    legacy.latest.liveSitemap = {
      count: LEGACY_V1_WATCH_URLS.length,
      hash: watchedUrlHash(foreignUrls),
      urls: foreignUrls,
    };

    expect(() => validatePreviousState(legacy)).toThrow(
      "latest.liveSitemap.urls",
    );
  });

  it("forces a same-day collection after migrating v1 and persists a normal 46-URL state", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-index-migration-"));
    temporaryDirectories.push(directory);
    const stateDir = join(directory, "state");
    const notePath = join(directory, "index-watch.md");
    const tokenPath = join(directory, "token.json");
    const legacy = makeLegacyState();
    legacy.eventHistory = [
      { id: "historical-event", type: "reindexed", message: "Preserve me" },
    ];
    legacy.pendingNotifications = [
      { id: "pending-event", type: "deindexed", message: "Retry me" },
    ];
    await mkdir(stateDir, { recursive: true });
    await writeFile(
      join(stateDir, "latest.json"),
      `${JSON.stringify(legacy, null, 2)}\n`,
    );
    await writeFile(
      tokenPath,
      JSON.stringify({
        client_id: "fixture-client",
        client_secret: "fixture-secret",
        refresh_token: "fixture-refresh",
        token_uri: "https://oauth.fixture/token",
      }),
    );
    const counter = { count: 0 };
    const result = await runIndexWatch(
      {
        command: "run",
        dryRun: false,
        force: false,
        notify: false,
        startDate: "2026-06-21",
        endDate: "2026-07-18",
        runDate: legacy.latest.runDate,
        runId: "2026-07-19T13:00:00.000Z",
        stateDir,
        notePath,
        tokenPath,
      },
      { fetchImpl: indexWatchFixtureFetch(counter) },
    );

    expect(result).toMatchObject({
      status: "PASS",
      watchedUrlCount: WATCH_URLS.length,
      indexed: { pass: WATCH_URLS.length },
      pendingNotificationCount: 1,
    });
    expect(counter.count).toBeGreaterThan(0);

    const persisted = JSON.parse(
      await readFile(join(stateDir, "latest.json"), "utf8"),
    );
    expect(persisted.watchSetExpansion).toBeUndefined();
    expect(persisted.latest.liveSitemap).toMatchObject({
      count: WATCH_URLS.length,
      hash: watchedUrlHash(),
    });
    expect(persisted.history).toHaveLength(2);
    expect(persisted.eventHistory).toContainEqual(
      expect.objectContaining({ id: "historical-event" }),
    );
    expect(persisted.pendingNotifications).toContainEqual(
      expect.objectContaining({ id: "pending-event" }),
    );
    expect(
      LEGACY_V1_WATCH_URLS.every(
        (url) => persisted.confirmedVerdicts[url] === "PASS",
      ),
    ).toBe(true);
    expect(validatePreviousState(persisted)).toBe(persisted);
    expect(await readFile(notePath, "utf8")).toContain(
      `| ${LEGACY_V1_WATCH_URLS.length}/${LEGACY_V1_WATCH_URLS.length} |`,
    );
  });

  it("ignores malformed historical rows without blocking the latest baseline", () => {
    const state = makeState(makeSnapshot());
    state.history.push(null, { runId: "malformed" });

    expect(validatePreviousState(state)).toBe(state);
    expect(() => renderManagedBlock(state)).not.toThrow();

    const nextSnapshot = makeSnapshot();
    nextSnapshot.runId = "2026-07-20T12:00:00.000Z";
    nextSnapshot.runDate = "2026-07-20";
    nextSnapshot.generatedAt = nextSnapshot.runId;
    const nextState = buildState(state, nextSnapshot);
    expect(nextState.history).toHaveLength(2);
    expect(nextState.history.map((entry) => entry.runId)).toEqual([
      nextSnapshot.runId,
      state.latest.runId,
    ]);
  });

  it("surfaces a failed scheduled run even when a prior baseline exists", () => {
    const state = makeState(makeSnapshot());

    expect(operationalStatus(state, null)).toBe("READY");
    expect(
      operationalStatus(state, {
        failedAt: "2026-07-20T12:00:00.000Z",
        message: "fixture failure",
      }),
    ).toBe("LAST_RUN_FAILED");
    expect(operationalStatus(null, null)).toBe("NOT_RUN");
  });

  it("keeps failed local alerts in a persistent retry outbox", () => {
    const state = makeState(makeSnapshot({ impressions: 1 }));
    const alert = {
      id: "fixture-alert",
      type: "first_impressions",
      message: "First impression",
    };
    state.pendingNotifications = [alert];
    const failed = deliverPendingNotifications(state, {
      notifier: () => ({
        alertId: alert.id,
        delivered: false,
        status: 1,
      }),
      attemptedAt: "2026-07-19T12:00:00.000Z",
    });

    expect(failed.state.pendingNotifications).toEqual([
      expect.objectContaining({
        id: alert.id,
        deliveryAttempts: 1,
        lastDeliveryAttemptAt: "2026-07-19T12:00:00.000Z",
      }),
    ]);

    const delivered = deliverPendingNotifications(failed.state, {
      notifier: () => ({
        alertId: alert.id,
        delivered: true,
        status: 0,
      }),
    });
    expect(delivered.state.pendingNotifications).toEqual([]);
  });

  it("repairs a missing same-day note and retries its durable alert without refetching", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-index-watch-run-"));
    temporaryDirectories.push(directory);
    const stateDir = join(directory, "state");
    const notePath = join(directory, "index-watch.md");
    const tokenPath = join(directory, "token.json");
    await writeFile(
      tokenPath,
      JSON.stringify({
        client_id: "fixture-client",
        client_secret: "fixture-secret",
        refresh_token: "fixture-refresh",
        token_uri: "https://oauth.fixture/token",
      }),
    );

    let requestCount = 0;
    const jsonResponse = (payload) =>
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    const fetchImpl = async (url, options = {}) => {
      requestCount += 1;
      if (url === `${SITE_URL}sitemap.xml`) {
        return new Response(
          `<urlset>${WATCH_URLS.map((watchedUrl) => `<url><loc>${watchedUrl}</loc></url>`).join("")}</urlset>`,
          { status: 200 },
        );
      }
      if (url === "https://oauth.fixture/token") {
        return jsonResponse({ access_token: "fixture-access" });
      }
      if (url === "https://www.googleapis.com/webmasters/v3/sites") {
        return jsonResponse({
          siteEntry: [{ siteUrl: SITE_URL, permissionLevel: "siteOwner" }],
        });
      }
      if (url.includes("/searchAnalytics/query")) {
        const body = JSON.parse(options.body);
        if (body.dimensions.includes("page")) return jsonResponse({ rows: [] });
        if (body.dimensions.includes("date")) {
          return jsonResponse({
            rows: [
              {
                keys: ["2026-07-18"],
                clicks: 1,
                impressions: 1,
                ctr: 1,
                position: 2,
              },
            ],
            metadata: { first_incomplete_date: "2026-07-18" },
          });
        }
        return body.dataState === "all"
          ? jsonResponse({
              rows: [{ clicks: 1, impressions: 1, ctr: 1, position: 2 }],
            })
          : jsonResponse({ rows: [] });
      }
      if (
        url ===
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"
      ) {
        const { inspectionUrl } = JSON.parse(options.body);
        return jsonResponse({
          inspectionResult: {
            indexStatusResult: {
              verdict: "PASS",
              coverageState: "Submitted and indexed",
              indexingState: "INDEXING_ALLOWED",
              pageFetchState: "SUCCESSFUL",
              robotsTxtState: "ALLOWED",
              googleCanonical: inspectionUrl,
              userCanonical: inspectionUrl,
            },
          },
        });
      }
      throw new Error(`Unexpected fixture URL: ${url}`);
    };
    const args = {
      command: "run",
      dryRun: false,
      force: false,
      notify: false,
      startDate: "2026-06-21",
      endDate: "2026-07-18",
      runDate: "2026-07-19",
      runId: "2026-07-19T12:00:00.000Z",
      stateDir,
      notePath,
      tokenPath,
    };

    const first = await runIndexWatch(args, { fetchImpl });
    expect(first).toMatchObject({
      status: "PASS",
      indexed: { pass: WATCH_URLS.length },
      alerts: ["first_impressions"],
      pendingNotificationCount: 1,
    });
    const firstRequestCount = requestCount;
    await rm(notePath);

    const deliveredAlertIds = [];
    const second = await runIndexWatch(
      { ...args, notify: true },
      {
        fetchImpl,
        notifier: (alert) => {
          deliveredAlertIds.push(alert.id);
          return { alertId: alert.id, delivered: true, status: 0 };
        },
      },
    );
    expect(second).toMatchObject({
      status: "REPAIRED_NOTE",
      pendingNotificationCount: 0,
    });
    expect(deliveredAlertIds).toHaveLength(1);
    expect(requestCount).toBe(firstRequestCount);

    const repairedNote = await readFile(notePath, "utf8");
    const third = await runIndexWatch(
      { ...args, notify: true },
      { fetchImpl, notifier: () => expect.fail("alert was already delivered") },
    );
    expect(third.status).toBe("ALREADY_RECORDED");
    expect(await readFile(notePath, "utf8")).toBe(repairedNote);
    expect(requestCount).toBe(firstRequestCount);
  });

  it("drains a known alert before a failed recovery run calls Google", async () => {
    const directory = await mkdtemp(join(tmpdir(), "esteban-index-watch-alert-"));
    temporaryDirectories.push(directory);
    const state = makeState(makeSnapshot());
    state.pendingNotifications = [
      {
        id: "known-urgent-alert",
        type: "deindexed",
        message: "A watched URL left the index.",
      },
    ];
    await writeFile(
      join(directory, "latest.json"),
      `${JSON.stringify(state, null, 2)}\n`,
    );
    await writeFile(
      join(directory, "last-error.json"),
      `${JSON.stringify({ failedAt: "2026-07-20T11:00:00.000Z" })}\n`,
    );

    const delivered = [];
    await expect(
      runIndexWatch(
        {
          command: "run",
          dryRun: false,
          force: false,
          notify: true,
          startDate: "2026-06-22",
          endDate: "2026-07-19",
          runDate: "2026-07-20",
          runId: "2026-07-20T12:00:00.000Z",
          stateDir: directory,
          notePath: join(directory, "index-watch.md"),
          tokenPath: join(directory, "unused-token.json"),
        },
        {
          notifier: (alert) => {
            delivered.push(alert.id);
            return { alertId: alert.id, delivered: true, status: 0 };
          },
          fetchImpl: async () => {
            throw new Error("fixture collection failure");
          },
        },
      ),
    ).rejects.toThrow("fixture collection failure");

    const persisted = JSON.parse(
      await readFile(join(directory, "latest.json"), "utf8"),
    );
    expect(delivered).toEqual(["known-urgent-alert"]);
    expect(persisted.pendingNotifications).toEqual([]);
  });

  it("keeps legacy inventory raw when notification retry precedes a failed migration collection", async () => {
    const directory = await mkdtemp(
      join(tmpdir(), "esteban-index-watch-legacy-alert-"),
    );
    temporaryDirectories.push(directory);
    const legacy = makeLegacyState();
    legacy.pendingNotifications = [
      {
        id: "legacy-pending-alert",
        type: "deindexed",
        message: "Retry from the legacy outbox.",
      },
    ];
    await writeFile(
      join(directory, "latest.json"),
      `${JSON.stringify(legacy, null, 2)}\n`,
    );

    await expect(
      runIndexWatch(
        {
          command: "run",
          dryRun: false,
          force: false,
          notify: true,
          startDate: "2026-06-22",
          endDate: "2026-07-19",
          runDate: "2026-07-20",
          runId: "2026-07-20T12:00:00.000Z",
          stateDir: directory,
          notePath: join(directory, "index-watch.md"),
          tokenPath: join(directory, "unused-token.json"),
        },
        {
          notifier: (alert) => ({
            alertId: alert.id,
            delivered: false,
            status: "fixture-failure",
          }),
          fetchImpl: async () => {
            throw new Error("fixture migration collection failure");
          },
        },
      ),
    ).rejects.toThrow("fixture migration collection failure");

    const persisted = JSON.parse(
      await readFile(join(directory, "latest.json"), "utf8"),
    );
    expect(persisted).toMatchObject({
      watchUrlCount: LEGACY_V1_WATCH_URLS.length,
      watchUrlHash: watchedUrlHash(LEGACY_V1_WATCH_URLS),
    });
    expect(persisted.watchSetExpansion).toBeUndefined();
    expect(persisted.latest.liveSitemap).toMatchObject({
      count: LEGACY_V1_WATCH_URLS.length,
      hash: watchedUrlHash(LEGACY_V1_WATCH_URLS),
    });
    expect(persisted.latest.searchAnalytics.pages).toHaveLength(
      LEGACY_V1_WATCH_URLS.length,
    );
    expect(persisted.latest.inspection.pages).toHaveLength(
      LEGACY_V1_WATCH_URLS.length,
    );
    expect(persisted.pendingNotifications).toEqual([
      expect.objectContaining({
        id: "legacy-pending-alert",
        deliveryAttempts: 1,
        lastDeliveryAttemptAt: expect.any(String),
      }),
    ]);
    expect(validatePreviousState(persisted).watchSetExpansion).toBeDefined();
  });
});
