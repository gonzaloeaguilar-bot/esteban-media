#!/usr/bin/env node

import {
  chmod,
  mkdir,
  open,
  readFile,
  readlink,
  rename,
  stat,
  unlink,
} from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  INDEX_WATCH_SCHEMA,
  SITE_URL,
  WATCH_URLS,
  acquireLock,
  defaultRange,
  secretSafeError,
  sitemapUrls,
  validatePreviousState as validateIndexWatchState,
  validateWatchedSitemap,
  watchedUrlHash,
} from "./search-console-index-watch.mjs";

export const WEEKLY_DIGEST_SCHEMA = "esteban-media.weekly-digest.v1";
export const GA_MEASUREMENT_ID = "G-W9CM4CE2MQ";

const DEFAULT_STATE_DIR = join(
  homedir(),
  ".local/state/esteban-media-weekly-digest",
);
const DEFAULT_INDEX_WATCH_STATE_DIR = join(
  homedir(),
  ".local/state/esteban-media-index-watch",
);
const DEFAULT_HOT_NOTE_PATH = join(
  homedir(),
  "obsidian-wiki/client-esteban-media/wiki/esteban-media-hot.md",
);
const DEFAULT_DIGEST_NOTE_PATH = join(
  homedir(),
  "obsidian-wiki/client-esteban-media/wiki/esteban-media-weekly-digest.md",
);
const SOURCE_MAX_AGE_MS = 18 * 60 * 60 * 1_000;
const SOURCE_WAIT_ATTEMPTS = 13;
const SOURCE_WAIT_MS = 30_000;
const REQUEST_TIMEOUT_MS = 30_000;
const HISTORY_LIMIT = 26;

function isoDateInTimeZone(date, timeZone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function timeInTimeZone(date, timeZone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return Number(parts.hour) * 60 + Number(parts.minute);
}

function shiftIsoDate(value, days) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days))
    .toISOString()
    .slice(0, 10);
}

function isoDateDifference(later, earlier) {
  const [laterYear, laterMonth, laterDay] = later.split("-").map(Number);
  const [earlierYear, earlierMonth, earlierDay] = earlier
    .split("-")
    .map(Number);
  return Math.round(
    (Date.UTC(laterYear, laterMonth - 1, laterDay) -
      Date.UTC(earlierYear, earlierMonth - 1, earlierDay)) /
      86_400_000,
  );
}

function nextSundayAfter(value) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const daysUntilSunday = date.getUTCDay() === 0 ? 7 : 7 - date.getUTCDay();
  return shiftIsoDate(value, daysUntilSunday);
}

export function assertEasternSystemTimeZone(systemTimeZone) {
  if (
    systemTimeZone !== "America/New_York" &&
    !String(systemTimeZone || "").endsWith("/America/New_York")
  ) {
    throw new Error(
      `Weekly digest requires the macOS system timezone America/New_York; found ${systemTimeZone || "unknown"}`,
    );
  }
}

async function assertRuntimeTimeZone(dependencies) {
  const systemTimeZone = dependencies.systemTimeZone
    ? await dependencies.systemTimeZone()
    : await readlink("/etc/localtime");
  assertEasternSystemTimeZone(systemTimeZone);
}

function parseArgs(argv = process.argv.slice(2)) {
  const command = argv.find((arg) => !arg.startsWith("--")) || "run";
  const findValue = (name) => {
    const prefix = `--${name}=`;
    return argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
  };
  const now = new Date();
  return {
    command,
    dryRun: command === "dry-run",
    force: argv.includes("--force"),
    runDate:
      findValue("run-date") ||
      isoDateInTimeZone(now, "America/New_York"),
    runId: findValue("run-id") || now.toISOString(),
    stateDir:
      findValue("state-dir") ||
      process.env.ESTEBAN_MEDIA_WEEKLY_DIGEST_STATE_DIR ||
      DEFAULT_STATE_DIR,
    indexWatchStateDir:
      findValue("index-state-dir") ||
      process.env.ESTEBAN_MEDIA_INDEX_WATCH_STATE_DIR ||
      DEFAULT_INDEX_WATCH_STATE_DIR,
    hotNotePath:
      findValue("hot-note") ||
      process.env.ESTEBAN_MEDIA_HOT_NOTE ||
      DEFAULT_HOT_NOTE_PATH,
    digestNotePath:
      findValue("digest-note") ||
      process.env.ESTEBAN_MEDIA_WEEKLY_DIGEST_NOTE ||
      DEFAULT_DIGEST_NOTE_PATH,
    sourceWaitAttempts: SOURCE_WAIT_ATTEMPTS,
    sourceWaitMs: SOURCE_WAIT_MS,
    sourceMaxAgeMs: SOURCE_MAX_AGE_MS,
  };
}

async function delay(milliseconds) {
  await new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

async function readJsonIfExists(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function readTextIfExists(path) {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

async function atomicWrite(path, content, mode = 0o600) {
  await mkdir(dirname(path), { recursive: true });
  const temporaryPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  let handle;
  try {
    handle = await open(temporaryPath, "wx", mode);
    await handle.writeFile(content);
    await handle.sync();
    await handle.close();
    handle = null;
    await chmod(temporaryPath, mode);
    await rename(temporaryPath, path);
  } catch (error) {
    await handle?.close().catch(() => {});
    await unlink(temporaryPath).catch(() => {});
    throw error;
  }
}

async function atomicWriteIfUnchanged(
  path,
  expectedContent,
  nextContent,
  mode = 0o644,
) {
  await mkdir(dirname(path), { recursive: true });
  const temporaryPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  let handle;
  try {
    handle = await open(temporaryPath, "wx", mode);
    await handle.writeFile(nextContent);
    await handle.sync();
    await handle.close();
    handle = null;
    await chmod(temporaryPath, mode);
    const currentContent = await readTextIfExists(path);
    if (currentContent !== expectedContent) {
      throw new Error(`Concurrent edit detected for ${path}`);
    }
    await rename(temporaryPath, path);
  } catch (error) {
    await handle?.close().catch(() => {});
    await unlink(temporaryPath).catch(() => {});
    throw error;
  }
}

async function writeNotePair({
  hotNotePath,
  existingHotNote,
  nextHotNote,
  digestNotePath,
  existingDigestNote,
  nextDigestNote,
}) {
  const digestChanged = existingDigestNote !== nextDigestNote;
  try {
    if (digestChanged) {
      await atomicWriteIfUnchanged(
        digestNotePath,
        existingDigestNote,
        nextDigestNote,
      );
    }
    if (existingHotNote !== nextHotNote) {
      await atomicWriteIfUnchanged(
        hotNotePath,
        existingHotNote,
        nextHotNote,
      );
    }
  } catch (error) {
    if (digestChanged) {
      if (existingDigestNote) {
        await atomicWriteIfUnchanged(
          digestNotePath,
          nextDigestNote,
          existingDigestNote,
        ).catch(() => {});
      } else {
        const currentDigest = await readTextIfExists(digestNotePath);
        if (currentDigest === nextDigestNote) {
          await unlink(digestNotePath).catch(() => {});
        }
      }
    }
    throw error;
  }
}

function isTransientTransportError(error) {
  return error?.name === "AbortError" || error?.name === "TypeError";
}

export async function requestResource(
  url,
  {
    fetchImpl = fetch,
    sleep = delay,
    attempts = 3,
    timeoutMs = REQUEST_TIMEOUT_MS,
  } = {},
) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, { signal: controller.signal });
      const body = await response.text();
      const retryable = response.status === 429 || response.status >= 500;
      if (retryable && attempt < attempts) {
        await sleep(500 * 2 ** (attempt - 1));
        continue;
      }
      return {
        requestedUrl: url,
        finalUrl: response.url || url,
        status: response.status,
        contentType: response.headers.get("content-type") || "",
        body,
        error: null,
      };
    } catch (error) {
      lastError = error;
      if (!isTransientTransportError(error) || attempt === attempts) break;
      await sleep(500 * 2 ** (attempt - 1));
    } finally {
      clearTimeout(timer);
    }
  }
  return {
    requestedUrl: url,
    finalUrl: null,
    status: null,
    contentType: "",
    body: "",
    error:
      lastError?.name === "AbortError"
        ? `timed out after ${timeoutMs}ms`
        : secretSafeError(lastError || "request failed"),
  };
}

function htmlAttribute(tag, name) {
  for (const match of tag.matchAll(/([^\s=]+)\s*=\s*["']([^"']*)["']/g)) {
    if (match[1].toLowerCase() === name.toLowerCase()) return match[2];
  }
  return null;
}

function canonicalHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const rel = htmlAttribute(match[0], "rel") || "";
    if (rel.toLowerCase().split(/\s+/).includes("canonical")) {
      return htmlAttribute(match[0], "href");
    }
  }
  return null;
}

function probeResult(name, details, errors) {
  return { name, ok: errors.length === 0, errors, ...details };
}

function robotsGroups(body) {
  const groups = [];
  let agents = [];
  let directives = [];
  let sawDirective = false;
  const flush = () => {
    if (agents.length) groups.push({ agents, directives });
    agents = [];
    directives = [];
    sawDirective = false;
  };
  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (!match) continue;
    const name = match[1].trim().toLowerCase();
    const value = match[2].trim();
    if (name === "user-agent") {
      if (sawDirective) flush();
      agents.push(value.toLowerCase());
    } else if (agents.length) {
      sawDirective = true;
      directives.push({ name, value });
    }
  }
  flush();
  return groups;
}

export function evaluateSiteHealth(resources) {
  const homepageErrors = [];
  const homepageCanonical = canonicalHref(resources.homepage.body);
  let normalizedHomepageCanonical = null;
  try {
    normalizedHomepageCanonical = homepageCanonical
      ? new URL(homepageCanonical).href
      : null;
  } catch {
    homepageErrors.push(`canonical is invalid: ${homepageCanonical}`);
  }
  if (resources.homepage.status !== 200) {
    homepageErrors.push(`HTTP ${resources.homepage.status ?? "unavailable"}`);
  }
  if (!resources.homepage.contentType.toLowerCase().includes("text/html")) {
    homepageErrors.push("content type is not HTML");
  }
  if (normalizedHomepageCanonical !== SITE_URL) {
    homepageErrors.push(
      `canonical is ${homepageCanonical || "missing"}; expected ${SITE_URL}`,
    );
  }
  if (resources.homepage.finalUrl !== SITE_URL) {
    homepageErrors.push(
      `final URL is ${resources.homepage.finalUrl || "missing"}; expected ${SITE_URL}`,
    );
  }
  if (resources.homepage.error) homepageErrors.push(resources.homepage.error);

  const sitemapErrors = [];
  let sitemap = { count: 0, hash: null };
  if (resources.sitemap.status !== 200) {
    sitemapErrors.push(`HTTP ${resources.sitemap.status ?? "unavailable"}`);
  }
  if (!resources.sitemap.contentType.toLowerCase().includes("xml")) {
    sitemapErrors.push("content type is not XML");
  }
  if (resources.sitemap.error) sitemapErrors.push(resources.sitemap.error);
  if (resources.sitemap.finalUrl !== `${SITE_URL}sitemap.xml`) {
    sitemapErrors.push("sitemap redirected away from its canonical URL");
  }
  try {
    sitemap = validateWatchedSitemap(sitemapUrls(resources.sitemap.body));
  } catch (error) {
    sitemapErrors.push(secretSafeError(error));
  }

  const robotsErrors = [];
  const robotsBody = resources.robots.body;
  const wildcardGroups = robotsGroups(robotsBody).filter((group) =>
    group.agents.includes("*"),
  );
  const wildcardDirectives = wildcardGroups.flatMap(
    (group) => group.directives,
  );
  if (resources.robots.status !== 200) {
    robotsErrors.push(`HTTP ${resources.robots.status ?? "unavailable"}`);
  }
  if (!wildcardGroups.length) {
    robotsErrors.push("missing User-agent: *");
  }
  if (
    !wildcardDirectives.some(
      (directive) =>
        directive.name === "allow" && directive.value === "/",
    )
  ) {
    robotsErrors.push("missing Allow: /");
  }
  if (
    wildcardDirectives.some(
      (directive) =>
        directive.name === "disallow" && /^\/\**$/.test(directive.value),
    )
  ) {
    robotsErrors.push("wildcard group blanket-blocks the site");
  }
  if (
    !new RegExp(
      `^sitemap:\\s*${SITE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}sitemap\\.xml\\s*$`,
      "im",
    ).test(robotsBody)
  ) {
    robotsErrors.push("missing canonical sitemap directive");
  }
  if (resources.robots.error) robotsErrors.push(resources.robots.error);
  if (resources.robots.finalUrl !== `${SITE_URL}robots.txt`) {
    robotsErrors.push("robots redirected away from its canonical URL");
  }

  const loader = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  const normalizedHomepage = resources.homepage.body.replace(/\\+"/g, '"');
  const loaderPresent = normalizedHomepage.includes(loader);
  const configPresent = normalizedHomepage.includes(
    `gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)}`,
  );
  const hostGuardPresent = normalizedHomepage.includes(
    `window.location.hostname === ${JSON.stringify(new URL(SITE_URL).hostname)}`,
  );
  const analyticsErrors = [];
  if (!loaderPresent) analyticsErrors.push("GA loader missing");
  if (!configPresent) analyticsErrors.push("GA config missing");
  if (!hostGuardPresent) analyticsErrors.push("production hostname guard missing");

  const probes = {
    homepage: probeResult(
      "homepage",
      {
        url: SITE_URL,
        status: resources.homepage.status,
        canonical: normalizedHomepageCanonical,
      },
      homepageErrors,
    ),
    sitemap: probeResult(
      "sitemap",
      {
        url: `${SITE_URL}sitemap.xml`,
        status: resources.sitemap.status,
        count: sitemap.count,
        hash: sitemap.hash,
      },
      sitemapErrors,
    ),
    robots: probeResult(
      "robots",
      { url: `${SITE_URL}robots.txt`, status: resources.robots.status },
      robotsErrors,
    ),
    analytics: probeResult(
      "GA configuration",
      {
        measurementId: GA_MEASUREMENT_ID,
        loaderPresent,
        configPresent,
        hostGuardPresent,
      },
      analyticsErrors,
    ),
  };
  return {
    overall: Object.values(probes).every((probe) => probe.ok)
      ? "PASS"
      : "DEGRADED",
    probes,
  };
}

async function probeSite(dependencies = {}) {
  const [homepage, sitemap, robots] = await Promise.all([
    requestResource(SITE_URL, dependencies),
    requestResource(`${SITE_URL}sitemap.xml`, dependencies),
    requestResource(`${SITE_URL}robots.txt`, dependencies),
  ]);
  return evaluateSiteHealth({ homepage, sitemap, robots });
}

function validateTotals(totals) {
  return (
    totals &&
    typeof totals.observed === "boolean" &&
    Number.isFinite(totals.clicks) &&
    Number.isFinite(totals.impressions) &&
    totals.clicks >= 0 &&
    totals.impressions >= 0 &&
    (totals.ctr === null || Number.isFinite(totals.ctr)) &&
    (totals.position === null || Number.isFinite(totals.position))
  );
}

export function indexWatchSourceSnapshot(
  state,
  {
    runDate,
    now = new Date(),
    maxAgeMs = SOURCE_MAX_AGE_MS,
    lastError = null,
  },
) {
  if (lastError) {
    throw new Error(
      `Index-watch last run failed at ${lastError.failedAt || "unknown time"}: ${secretSafeError(lastError.message || "unknown failure")}`,
    );
  }
  const validated = validateIndexWatchState(state);
  if (!validated) throw new Error("Index-watch has no persisted baseline");
  if (validated.schema !== INDEX_WATCH_SCHEMA) {
    throw new Error(`Index-watch schema is ${validated.schema}`);
  }
  if (validated.siteUrl !== SITE_URL) {
    throw new Error(`Index-watch site is ${validated.siteUrl}`);
  }
  if (
    validated.watchUrlCount !== WATCH_URLS.length ||
    validated.watchUrlHash !== watchedUrlHash()
  ) {
    throw new Error("Index-watch fixed URL contract does not match the site");
  }
  const liveSitemap = validateWatchedSitemap(
    validated.latest.liveSitemap?.urls || [],
  );
  if (
    validated.latest.liveSitemap?.count !== WATCH_URLS.length ||
    validated.latest.liveSitemap?.hash !== watchedUrlHash() ||
    liveSitemap.hash !== watchedUrlHash()
  ) {
    throw new Error("Index-watch live sitemap contract is invalid");
  }
  if (validated.latest.runDate !== runDate) {
    throw new Error(
      `Index-watch latest run date ${validated.latest.runDate} is not ${runDate}`,
    );
  }
  const generatedAtMs = Date.parse(validated.latest.generatedAt);
  const ageMs = now.getTime() - generatedAtMs;
  if (!Number.isFinite(generatedAtMs) || ageMs < -5 * 60 * 1_000) {
    throw new Error("Index-watch generatedAt is invalid or in the future");
  }
  if (ageMs > maxAgeMs) {
    throw new Error(
      `Index-watch baseline is ${Math.round(ageMs / 60_000)} minutes old`,
    );
  }
  const latest = validated.latest;
  if (
    isoDateInTimeZone(new Date(latest.generatedAt), "America/New_York") !==
    latest.runDate
  ) {
    throw new Error(
      "Index-watch generatedAt does not belong to its Eastern run date",
    );
  }
  const expectedRange = defaultRange(now);
  if (
    latest.searchAnalytics.startDate !== expectedRange.startDate ||
    latest.searchAnalytics.endDate !== expectedRange.endDate
  ) {
    throw new Error(
      `Index-watch analytics range ${latest.searchAnalytics.startDate}..${latest.searchAnalytics.endDate} is not the expected ${expectedRange.startDate}..${expectedRange.endDate}`,
    );
  }
  const firstIncompleteDate = latest.searchAnalytics.firstIncompleteDate;
  if (
    firstIncompleteDate !== null &&
    firstIncompleteDate !== undefined &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(firstIncompleteDate) ||
      firstIncompleteDate < latest.searchAnalytics.startDate ||
      firstIncompleteDate > latest.searchAnalytics.endDate)
  ) {
    throw new Error("Index-watch first incomplete date is invalid");
  }
  if (
    !validateTotals(latest.searchAnalytics.finalPropertyTotals) ||
    !validateTotals(latest.searchAnalytics.allDataPropertyTotals)
  ) {
    throw new Error("Index-watch property totals are invalid");
  }
  const indexed = latest.inspection.counts;
  const countValues = [
    indexed?.pass,
    indexed?.neutral,
    indexed?.fail,
    indexed?.unknown,
  ];
  if (
    countValues.some(
      (value) => !Number.isInteger(value) || value < 0,
    ) ||
    countValues.reduce((total, value) => total + value, 0) !==
      WATCH_URLS.length
  ) {
    throw new Error("Index-watch inspection counts do not sum to 20");
  }
  const recomputedIndexed = {
    pass: 0,
    neutral: 0,
    fail: 0,
    unknown: 0,
  };
  for (const page of latest.inspection.pages) {
    if (page.verdict === "PASS") recomputedIndexed.pass += 1;
    else if (page.verdict === "NEUTRAL") recomputedIndexed.neutral += 1;
    else if (page.verdict === "FAIL") recomputedIndexed.fail += 1;
    else recomputedIndexed.unknown += 1;
  }
  if (
    Object.keys(recomputedIndexed).some(
      (key) => recomputedIndexed[key] !== indexed[key],
    )
  ) {
    throw new Error("Index-watch inspection counts do not match page verdicts");
  }
  return {
    schema: validated.schema,
    runId: latest.runId,
    runDate: latest.runDate,
    generatedAt: latest.generatedAt,
    ageMinutes: Number((ageMs / 60_000).toFixed(1)),
    watchUrlCount: validated.watchUrlCount,
    watchUrlHash: validated.watchUrlHash,
    startDate: latest.searchAnalytics.startDate,
    endDate: latest.searchAnalytics.endDate,
    firstIncompleteDate: firstIncompleteDate || null,
    finalPropertyTotals: latest.searchAnalytics.finalPropertyTotals,
    allDataPropertyTotals: latest.searchAnalytics.allDataPropertyTotals,
    indexed: latest.inspection.counts,
    events: latest.alerts.map((alert) => ({
      id: alert.id,
      type: alert.type,
      message: alert.message,
    })),
  };
}

async function loadIndexWatchSource(args, dependencies = {}) {
  const sleep = dependencies.sleep || delay;
  const attempts = args.sourceWaitAttempts ?? SOURCE_WAIT_ATTEMPTS;
  let lastFailure = new Error("Index-watch source is unavailable");
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const sourceLock = join(args.indexWatchStateDir, "index-watch.lock");
    if (await fileExists(sourceLock)) {
      lastFailure = new Error("Index-watch is still running");
    } else {
      const [state, lastError] = await Promise.all([
        readJsonIfExists(join(args.indexWatchStateDir, "latest.json")),
        readJsonIfExists(join(args.indexWatchStateDir, "last-error.json")),
      ]);
      if (await fileExists(sourceLock)) {
        lastFailure = new Error("Index-watch started while digest read its state");
      } else {
        try {
          return indexWatchSourceSnapshot(state, {
            runDate: args.runDate,
            now: dependencies.now ? dependencies.now() : new Date(),
            maxAgeMs: args.sourceMaxAgeMs ?? SOURCE_MAX_AGE_MS,
            lastError,
          });
        } catch (error) {
          lastFailure = error;
        }
      }
    }
    if (attempt < attempts) {
      await sleep(args.sourceWaitMs ?? SOURCE_WAIT_MS);
    }
  }
  throw new Error(
    `Index-watch source was not ready before the digest deadline: ${secretSafeError(lastFailure)}`,
  );
}

function delta(current, previous) {
  return previous === null || previous === undefined
    ? null
    : current - previous;
}

export function buildTrend(previousState, source) {
  const previous = previousState?.latest?.sourceIndexWatch || null;
  return {
    comparisonRunDate: previous?.runDate || null,
    finalClicksDelta: delta(
      source.finalPropertyTotals.clicks,
      previous?.finalPropertyTotals?.clicks,
    ),
    finalImpressionsDelta: delta(
      source.finalPropertyTotals.impressions,
      previous?.finalPropertyTotals?.impressions,
    ),
    allDataClicksDelta: delta(
      source.allDataPropertyTotals.clicks,
      previous?.allDataPropertyTotals?.clicks,
    ),
    allDataImpressionsDelta: delta(
      source.allDataPropertyTotals.impressions,
      previous?.allDataPropertyTotals?.impressions,
    ),
    indexedPassDelta: delta(source.indexed.pass, previous?.indexed?.pass),
  };
}

export function monitoringStatus(health, source) {
  const indexed = source?.indexed;
  const coveragePass =
    indexed?.pass === source?.watchUrlCount &&
    indexed?.neutral === 0 &&
    indexed?.fail === 0 &&
    indexed?.unknown === 0;
  return health?.overall === "PASS" && coveragePass ? "PASS" : "DEGRADED";
}

function isValidProbeSet(health) {
  if (!health || !["PASS", "DEGRADED"].includes(health.overall)) return false;
  const expectedKeys = ["analytics", "homepage", "robots", "sitemap"];
  const actualKeys = Object.keys(health.probes || {}).sort();
  if (
    actualKeys.length !== expectedKeys.length ||
    actualKeys.some((key, index) => key !== expectedKeys[index])
  ) {
    return false;
  }
  const validStatus = (status) =>
    status === null ||
    (Number.isInteger(status) && status >= 100 && status <= 599);
  const validBase = (probe, name) =>
    probe?.name === name &&
    typeof probe.ok === "boolean" &&
    Array.isArray(probe.errors) &&
    probe.errors.every((error) => typeof error === "string") &&
    probe.ok === (probe.errors.length === 0);
  const { homepage, sitemap, robots, analytics } = health.probes;
  if (
    !validBase(homepage, "homepage") ||
    homepage.url !== SITE_URL ||
    !validStatus(homepage.status) ||
    (homepage.canonical !== null &&
      typeof homepage.canonical !== "string") ||
    (homepage.ok &&
      (homepage.status !== 200 || homepage.canonical !== SITE_URL)) ||
    !validBase(sitemap, "sitemap") ||
    sitemap.url !== `${SITE_URL}sitemap.xml` ||
    !validStatus(sitemap.status) ||
    !Number.isInteger(sitemap.count) ||
    sitemap.count < 0 ||
    (sitemap.hash !== null && typeof sitemap.hash !== "string") ||
    (sitemap.ok &&
      (sitemap.status !== 200 ||
        sitemap.count !== WATCH_URLS.length ||
        sitemap.hash !== watchedUrlHash())) ||
    !validBase(robots, "robots") ||
    robots.url !== `${SITE_URL}robots.txt` ||
    !validStatus(robots.status) ||
    (robots.ok && robots.status !== 200) ||
    !validBase(analytics, "GA configuration") ||
    analytics.measurementId !== GA_MEASUREMENT_ID ||
    typeof analytics.loaderPresent !== "boolean" ||
    typeof analytics.configPresent !== "boolean" ||
    typeof analytics.hostGuardPresent !== "boolean" ||
    (analytics.ok &&
      (!analytics.loaderPresent ||
        !analytics.configPresent ||
        !analytics.hostGuardPresent))
  ) {
    return false;
  }
  const probes = Object.values(health.probes);
  const expectedOverall = probes.every((probe) => probe.ok)
    ? "PASS"
    : "DEGRADED";
  return health.overall === expectedOverall;
}

function isValidSource(source) {
  const generatedAt = new Date(source?.generatedAt);
  const firstIncompleteDate = source?.firstIncompleteDate;
  if (
    source?.schema !== INDEX_WATCH_SCHEMA ||
    typeof source.runId !== "string" ||
    !source.runId ||
    !/^\d{4}-\d{2}-\d{2}$/.test(source.runDate || "") ||
    !Number.isFinite(generatedAt.getTime()) ||
    isoDateInTimeZone(generatedAt, "America/New_York") !== source.runDate ||
    !Number.isFinite(source.ageMinutes) ||
    source.ageMinutes < -5 ||
    source.watchUrlCount !== WATCH_URLS.length ||
    source.watchUrlHash !== watchedUrlHash() ||
    !/^\d{4}-\d{2}-\d{2}$/.test(source.startDate || "") ||
    !/^\d{4}-\d{2}-\d{2}$/.test(source.endDate || "") ||
    source.startDate !== shiftIsoDate(source.endDate, -27) ||
    (firstIncompleteDate !== null &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(firstIncompleteDate || "") ||
        firstIncompleteDate < source.startDate ||
        firstIncompleteDate > source.endDate)) ||
    !validateTotals(source.finalPropertyTotals) ||
    !validateTotals(source.allDataPropertyTotals) ||
    !Array.isArray(source.events)
  ) {
    return false;
  }
  const indexed = source.indexed;
  const counts = [
    indexed?.pass,
    indexed?.neutral,
    indexed?.fail,
    indexed?.unknown,
  ];
  const indexedKeys = Object.keys(indexed || {}).sort();
  return (
    indexedKeys.join(",") === "fail,neutral,pass,unknown" &&
    counts.every((value) => Number.isInteger(value) && value >= 0) &&
    counts.reduce((total, value) => total + value, 0) === WATCH_URLS.length &&
    source.events.every(
      (event) =>
        typeof event?.id === "string" &&
        typeof event?.type === "string" &&
        typeof event?.message === "string",
    )
  );
}

function isValidTrend(trend) {
  if (
    !trend ||
    (trend.comparisonRunDate !== null &&
      !/^\d{4}-\d{2}-\d{2}$/.test(trend.comparisonRunDate || ""))
  ) {
    return false;
  }
  const deltas = [
    trend.finalClicksDelta,
    trend.finalImpressionsDelta,
    trend.allDataClicksDelta,
    trend.allDataImpressionsDelta,
    trend.indexedPassDelta,
  ];
  return trend.comparisonRunDate === null
    ? deltas.every((value) => value === null)
    : deltas.every(Number.isFinite);
}

function trendMatchesPrevious(current, previous) {
  const trend = current.trend;
  const source = current.sourceIndexWatch;
  const prior = previous.sourceIndexWatch;
  return (
    trend.comparisonRunDate === previous.runDate &&
    trend.finalClicksDelta ===
      source.finalPropertyTotals.clicks - prior.finalPropertyTotals.clicks &&
    trend.finalImpressionsDelta ===
      source.finalPropertyTotals.impressions -
        prior.finalPropertyTotals.impressions &&
    trend.allDataClicksDelta ===
      source.allDataPropertyTotals.clicks -
        prior.allDataPropertyTotals.clicks &&
    trend.allDataImpressionsDelta ===
      source.allDataPropertyTotals.impressions -
        prior.allDataPropertyTotals.impressions &&
    trend.indexedPassDelta === source.indexed.pass - prior.indexed.pass
  );
}

function isDigestSnapshot(snapshot) {
  const generatedAt = new Date(snapshot?.generatedAt);
  return (
    typeof snapshot?.runId === "string" &&
    Boolean(snapshot.runId) &&
    /^\d{4}-\d{2}-\d{2}$/.test(snapshot?.runDate || "") &&
    Number.isFinite(generatedAt.getTime()) &&
    isoDateInTimeZone(generatedAt, "America/New_York") === snapshot.runDate &&
    isValidProbeSet(snapshot.health) &&
    isValidSource(snapshot.sourceIndexWatch) &&
    snapshot.sourceIndexWatch.runDate === snapshot.runDate &&
    Date.parse(snapshot.sourceIndexWatch.generatedAt) <= generatedAt.getTime() &&
    isValidTrend(snapshot.trend) &&
    snapshot.overall ===
      monitoringStatus(snapshot.health, snapshot.sourceIndexWatch)
  );
}

export function validateDigestState(state) {
  if (!state) return null;
  const failures = [];
  if (state.schema !== WEEKLY_DIGEST_SCHEMA) failures.push("schema");
  if (state.siteUrl !== SITE_URL) failures.push("siteUrl");
  if (!isDigestSnapshot(state.latest)) failures.push("latest");
  if (
    !Array.isArray(state.history) ||
    state.history.length === 0 ||
    state.history.length > HISTORY_LIMIT ||
    !state.history.every(isDigestSnapshot) ||
    state.history[0]?.runId !== state.latest?.runId ||
    new Set(state.history.map((entry) => entry.runId)).size !==
      state.history.length
  ) {
    failures.push("history");
  } else if (
    state.history.some(
      (entry, index) =>
        index < state.history.length - 1 &&
        (Date.parse(entry.generatedAt) <
          Date.parse(state.history[index + 1].generatedAt) ||
          !trendMatchesPrevious(entry, state.history[index + 1])),
    )
  ) {
    failures.push("history.trend");
  }
  if (state.updatedAt !== state.latest?.generatedAt) failures.push("updatedAt");
  if (failures.length) {
    throw new Error(
      `Existing weekly-digest state failed validation: ${failures.join(", ")}`,
    );
  }
  return state;
}

function buildDigestState(previousState, snapshot) {
  if (!isDigestSnapshot(snapshot)) {
    throw new Error("New weekly-digest snapshot failed validation");
  }
  const history = [snapshot, ...(previousState?.history || [])]
    .filter(isDigestSnapshot)
    .filter(
      (entry, index, entries) =>
        entries.findIndex((candidate) => candidate.runId === entry.runId) ===
        index,
    )
    .slice(0, HISTORY_LIMIT);
  return {
    schema: WEEKLY_DIGEST_SCHEMA,
    siteUrl: SITE_URL,
    updatedAt: snapshot.generatedAt,
    latest: snapshot,
    history,
  };
}

function formatDelta(value) {
  if (value === null) return "n/a (first baseline)";
  if (value > 0) return `+${value}`;
  return String(value);
}

function markdownCell(value) {
  return String(value ?? "—")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
}

function passedProbeCount(snapshot) {
  return Object.values(snapshot.health.probes).filter((probe) => probe.ok)
    .length;
}

function sourceTimeLabel(generatedAt) {
  return `${new Date(generatedAt).toISOString().slice(11, 16)}Z`;
}

function snapshotDeltaLabel(trend) {
  if (!trend.comparisonRunDate) return "n/a (first baseline)";
  return `since ${trend.comparisonRunDate}: final ${formatDelta(trend.finalClicksDelta)}c/${formatDelta(trend.finalImpressionsDelta)}i; all-data ${formatDelta(trend.allDataClicksDelta)}c/${formatDelta(trend.allDataImpressionsDelta)}i; indexed ${formatDelta(trend.indexedPassDelta)}`;
}

const HOT_START = "<!-- esteban-media:weekly-pulse:start -->";
const HOT_END = "<!-- esteban-media:weekly-pulse:end -->";
const DETAIL_START = "<!-- esteban-media:weekly-digest:start -->";
const DETAIL_END = "<!-- esteban-media:weekly-digest:end -->";

export function renderHotPulse(snapshot) {
  const source = snapshot.sourceIndexWatch;
  const trend = snapshot.trend;
  const callout = snapshot.overall === "PASS" ? "success" : "danger";
  const probes = snapshot.health.probes;
  const probeSummary = [
    probes.homepage.ok ? `/ ${probes.homepage.status}` : "/ failed",
    probes.sitemap.ok ? `sitemap ${probes.sitemap.status}` : "sitemap failed",
    probes.robots.ok ? `robots ${probes.robots.status}` : "robots failed",
    probes.analytics.ok
      ? "GA configuration present"
      : "GA configuration missing",
  ].join(", ");
  return `${HOT_START}
## Automated weekly pulse

> [!${callout}] ${snapshot.runDate} · Probes ${passedProbeCount(snapshot)}/4: ${probeSummary} · GSC ${source.startDate}–${source.endDate} PT: final ${source.finalPropertyTotals.clicks}c/${source.finalPropertyTotals.impressions}i; all-data ${source.allDataPropertyTotals.clicks}c/${source.allDataPropertyTotals.impressions}i (includes fresh/incomplete) · indexed ${source.indexed.pass}/${source.watchUrlCount} PASS as of ${sourceTimeLabel(source.generatedAt)} · snapshot Δ ${snapshotDeltaLabel(trend)} · [[esteban-media-weekly-digest|details]]
${HOT_END}`;
}

function updateFrontmatterDate(content, updatedDate) {
  if (!content.startsWith("---\n")) return content;
  if (/^updated: .*$/m.test(content)) {
    return content.replace(/^updated: .*$/m, `updated: ${updatedDate}`);
  }
  return content.replace(/^---\n/, `---\nupdated: ${updatedDate}\n`);
}

function markerCount(content, marker) {
  return content.split(marker).length - 1;
}

function replaceManagedBlock(existing, block, startMarker, endMarker, label) {
  const startCount = markerCount(existing, startMarker);
  const endCount = markerCount(existing, endMarker);
  if (startCount > 1 || endCount > 1) {
    throw new Error(`${label} has duplicate managed markers`);
  }
  const start = existing.indexOf(startMarker);
  const end = existing.indexOf(endMarker);
  if ((start === -1) !== (end === -1) || (start !== -1 && end < start)) {
    throw new Error(`${label} has incomplete managed markers`);
  }
  if (start === -1) return null;
  return `${existing.slice(0, start)}${block}${existing.slice(end + endMarker.length)}`;
}

export function mergeHotNote(existing, block, runDate) {
  if (!existing) throw new Error("Esteban Media hot note is missing");
  const replaced = replaceManagedBlock(
    existing,
    block,
    HOT_START,
    HOT_END,
    "Esteban Media hot note",
  );
  const headings = [...existing.matchAll(/^# .+$/gm)];
  if (headings.length !== 1) {
    throw new Error(
      `Esteban Media hot note must have exactly one H1; found ${headings.length}`,
    );
  }
  let next = replaced;
  if (!next) {
    const headingEnd = existing.indexOf("\n", headings[0].index);
    const insertion = headingEnd === -1 ? existing.length : headingEnd + 1;
    next = `${existing.slice(0, insertion)}\n${block}\n${existing.slice(insertion)}`;
  }
  return updateFrontmatterDate(next, runDate);
}

function probeObservation(probe) {
  if (probe.ok) {
    if (probe.name === "GA configuration") return "exact configuration present";
    if (probe.count !== undefined) return `HTTP ${probe.status}; ${probe.count}/20 URLs`;
    return `HTTP ${probe.status}`;
  }
  return probe.errors.map(markdownCell).join("; ");
}

export function renderDigestDetail(state) {
  const snapshot = state.latest;
  const source = snapshot.sourceIndexWatch;
  const trend = snapshot.trend;
  const probes = Object.values(snapshot.health.probes)
    .map(
      (probe) =>
        `| ${markdownCell(probe.name)} | ${probe.ok ? "PASS" : "FAIL"} | ${markdownCell(probeObservation(probe))} |`,
    )
    .join("\n");
  const eventTypes = source.events.map((event) => event.type).join(", ") || "none";
  const historyRows = state.history
    .filter(isDigestSnapshot)
    .slice(0, 13)
    .map((entry) => {
      const entrySource = entry.sourceIndexWatch;
      return `| ${entry.runDate} | ${passedProbeCount(entry)}/4 | ${entrySource.finalPropertyTotals.clicks}/${entrySource.finalPropertyTotals.impressions} | ${entrySource.allDataPropertyTotals.clicks}/${entrySource.allDataPropertyTotals.impressions} | ${entrySource.indexed.pass}/${entrySource.watchUrlCount} | ${markdownCell(entry.trend.comparisonRunDate || "baseline")} |`;
    })
    .join("\n");
  return `${DETAIL_START}
## Latest weekly snapshot — ${snapshot.runDate}

- Checked: ${snapshot.generatedAt}
- Index-watch source: ${source.generatedAt} (${source.ageMinutes} minutes old), schema \`${source.schema}\`, fixed set ${source.watchUrlCount}/${WATCH_URLS.length}
- Search Analytics range: ${source.startDate} through ${source.endDate} Pacific time; first incomplete date ${source.firstIncompleteDate || "not reported"}
- New source-run events: ${eventTypes}
- Coverage verdicts: ${source.indexed.pass} PASS · ${source.indexed.neutral} neutral/excluded · ${source.indexed.fail} failed · ${source.indexed.unknown} unknown

### Production probes

| Probe | Result | Observation |
|---|---|---|
${probes}

“GA configuration present” verifies the exact loader, measurement ID, config call, and production-host guard in served HTML. It does not claim that GA Realtime processing is healthy.

### Search Console property snapshots

| Metric | Current rolling snapshot | Change since prior digest |
|---|---:|---:|
| Finalized clicks | ${source.finalPropertyTotals.clicks} | ${formatDelta(trend.finalClicksDelta)} |
| Finalized impressions | ${source.finalPropertyTotals.impressions} | ${formatDelta(trend.finalImpressionsDelta)} |
| All-data clicks | ${source.allDataPropertyTotals.clicks} | ${formatDelta(trend.allDataClicksDelta)} |
| All-data impressions | ${source.allDataPropertyTotals.impressions} | ${formatDelta(trend.allDataImpressionsDelta)} |
| Indexed PASS | ${source.indexed.pass}/${source.watchUrlCount} | ${formatDelta(trend.indexedPassDelta)} |

All-data totals include fresh/incomplete data. Changes are weekly snapshot deltas between rolling property aggregates, not non-overlapping weekly traffic. Page-grouped rows are never summed as the property total.

### 13-week history

| Digest date | Probes | Final c/i | All-data c/i | Indexed | Compared with |
|---|---:|---:|---:|---:|---|
${historyRows}

This digest consumes persisted index-watch state and never repeats Search Console or URL Inspection calls.
${DETAIL_END}`;
}

function newDigestNote(managedBlock, updatedDate) {
  return `---
title: "Esteban Media — Weekly Health & Search Digest"
category: client-esteban-media
date: 2026-07-19
updated: ${updatedDate}
tags: [esteban-media, automation, monitoring, search-console]
---

# Esteban Media — Weekly Health & Search Digest

Automated Sunday pulse for four bounded production probes and rolling Search Console property snapshots.

${managedBlock}
`;
}

export function mergeDigestNote(existing, managedBlock, runDate) {
  if (!existing) return newDigestNote(managedBlock, runDate);
  const replaced = replaceManagedBlock(
    existing,
    managedBlock,
    DETAIL_START,
    DETAIL_END,
    "Weekly digest detail note",
  );
  const next = replaced
    ? replaced
    : `${existing.trimEnd()}\n\n${managedBlock}\n`;
  return updateFrontmatterDate(next, runDate);
}

function stateSummary(state, status, extra = {}) {
  return {
    status,
    schema: state.schema,
    runDate: state.latest.runDate,
    generatedAt: state.latest.generatedAt,
    health: state.latest.overall,
    probeHealth: state.latest.health.overall,
    probes: Object.fromEntries(
      Object.entries(state.latest.health.probes).map(([name, probe]) => [
        name,
        { ok: probe.ok, status: probe.status ?? null, errors: probe.errors },
      ]),
    ),
    sourceRunId: state.latest.sourceIndexWatch.runId,
    finalPropertyTotals: state.latest.sourceIndexWatch.finalPropertyTotals,
    allDataPropertyTotals:
      state.latest.sourceIndexWatch.allDataPropertyTotals,
    indexed: state.latest.sourceIndexWatch.indexed,
    ...extra,
  };
}

async function writeLastError(args, error) {
  const payload = {
    schema: WEEKLY_DIGEST_SCHEMA,
    failedAt: new Date().toISOString(),
    runId: args.runId,
    message: secretSafeError(error),
  };
  await atomicWrite(
    join(args.stateDir, "last-error.json"),
    `${JSON.stringify(payload, null, 2)}\n`,
  );
}

export async function runWeeklyDigest(args, dependencies = {}) {
  await assertRuntimeTimeZone(dependencies);
  await mkdir(args.stateDir, { recursive: true });
  const latestPath = join(args.stateDir, "latest.json");
  await dependencies.beforeLock?.();
  const lock = await acquireLock(join(args.stateDir, "weekly-digest.lock"));
  if (!lock.acquired) {
    return {
      status: "LOCKED_NOOP",
      schema: WEEKLY_DIGEST_SCHEMA,
      statePath: latestPath,
    };
  }

  try {
    const previousState = validateDigestState(
      await readJsonIfExists(latestPath),
    );
    const previousError = await readJsonIfExists(
      join(args.stateDir, "last-error.json"),
    );
    if (
      !args.dryRun &&
      !args.force &&
      !previousError &&
      previousState?.latest?.runDate === args.runDate
    ) {
      const [existingHotNote, existingDigestNote] = await Promise.all([
        readTextIfExists(args.hotNotePath),
        readTextIfExists(args.digestNotePath),
      ]);
      const expectedHotNote = mergeHotNote(
        existingHotNote,
        renderHotPulse(previousState.latest),
        args.runDate,
      );
      const expectedDigestNote = mergeDigestNote(
        existingDigestNote,
        renderDigestDetail(previousState),
        args.runDate,
      );
      const repaired =
        expectedHotNote !== existingHotNote ||
        expectedDigestNote !== existingDigestNote;
      if (repaired) {
        await dependencies.beforeNoteWrite?.();
        await writeNotePair({
          hotNotePath: args.hotNotePath,
          existingHotNote,
          nextHotNote: expectedHotNote,
          digestNotePath: args.digestNotePath,
          existingDigestNote,
          nextDigestNote: expectedDigestNote,
        });
      }
      const summary = stateSummary(
        previousState,
        repaired ? "REPAIRED_NOTES" : "ALREADY_RECORDED",
        {
          statePath: latestPath,
          hotNotePath: args.hotNotePath,
          digestNotePath: args.digestNotePath,
        },
      );
      await atomicWrite(
        join(args.stateDir, "last-run.json"),
        `${JSON.stringify(summary, null, 2)}\n`,
      );
      return summary;
    }

    const sourceIndexWatch = await loadIndexWatchSource(args, dependencies);
    const health = await probeSite(dependencies);
    const now = dependencies.now ? dependencies.now() : new Date();
    const snapshot = {
      runId: args.runId,
      runDate: args.runDate,
      generatedAt: now.toISOString(),
      sourceIndexWatch,
      trend: buildTrend(previousState, sourceIndexWatch),
      health,
      overall: monitoringStatus(health, sourceIndexWatch),
    };
    const state = buildDigestState(previousState, snapshot);
    if (args.dryRun) {
      return stateSummary(state, "DRY_RUN", {
        statePath: latestPath,
        hotNotePath: args.hotNotePath,
        digestNotePath: args.digestNotePath,
      });
    }

    const [existingHotNote, existingDigestNote] = await Promise.all([
      readTextIfExists(args.hotNotePath),
      readTextIfExists(args.digestNotePath),
    ]);
    const nextHotNote = mergeHotNote(
      existingHotNote,
      renderHotPulse(snapshot),
      args.runDate,
    );
    const nextDigestNote = mergeDigestNote(
      existingDigestNote,
      renderDigestDetail(state),
      args.runDate,
    );
    await atomicWrite(latestPath, `${JSON.stringify(state, null, 2)}\n`);
    try {
      await dependencies.beforeNoteWrite?.();
      await writeNotePair({
        hotNotePath: args.hotNotePath,
        existingHotNote,
        nextHotNote,
        digestNotePath: args.digestNotePath,
        existingDigestNote,
        nextDigestNote,
      });
    } catch (error) {
      if (previousState) {
        await atomicWrite(
          latestPath,
          `${JSON.stringify(previousState, null, 2)}\n`,
        );
      } else {
        await unlink(latestPath).catch((unlinkError) => {
          if (unlinkError?.code !== "ENOENT") throw unlinkError;
        });
      }
      throw error;
    }

    const status = snapshot.overall;
    const summary = stateSummary(state, status, {
      statePath: latestPath,
      hotNotePath: args.hotNotePath,
      digestNotePath: args.digestNotePath,
      staleLockRecovered: lock.staleRecovered,
    });
    await atomicWrite(
      join(args.stateDir, "last-run.json"),
      `${JSON.stringify(summary, null, 2)}\n`,
    );
    await unlink(join(args.stateDir, "last-error.json")).catch((error) => {
      if (error?.code !== "ENOENT") throw error;
    });
    return summary;
  } finally {
    await lock.release();
  }
}

export function digestCadence(state, now = new Date()) {
  if (!state) {
    return {
      lastRunDate: null,
      lastRunAgeDays: null,
      lastSuccessfulRunDate: null,
      lastSuccessfulAgeDays: null,
      nextDueDate: null,
    };
  }
  const easternToday = isoDateInTimeZone(now, "America/New_York");
  const lastSuccessfulRunDate =
    state.history.find((entry) => entry.overall === "PASS")?.runDate || null;
  return {
    lastRunDate: state.latest.runDate,
    lastRunAgeDays: isoDateDifference(easternToday, state.latest.runDate),
    lastSuccessfulRunDate,
    lastSuccessfulAgeDays: lastSuccessfulRunDate
      ? isoDateDifference(easternToday, lastSuccessfulRunDate)
      : null,
    nextDueDate: nextSundayAfter(state.latest.runDate),
  };
}

export function digestOperationalStatus(
  state,
  lastError,
  now = new Date(),
) {
  if (lastError) return "LAST_RUN_FAILED";
  if (!state) return "NOT_RUN";
  const cadence = digestCadence(state, now);
  const easternToday = isoDateInTimeZone(now, "America/New_York");
  if (
    easternToday > cadence.nextDueDate ||
    (easternToday === cadence.nextDueDate &&
      timeInTimeZone(now, "America/New_York") >= 8 * 60 + 55)
  ) {
    return "STALE";
  }
  return state.latest.overall === "PASS" ? "READY" : "DEGRADED";
}

async function status(args) {
  const now = new Date();
  const state = validateDigestState(
    await readJsonIfExists(join(args.stateDir, "latest.json")),
  );
  const lastError = await readJsonIfExists(
    join(args.stateDir, "last-error.json"),
  );
  if (!state) {
    return {
      status: digestOperationalStatus(state, lastError, now),
      schema: WEEKLY_DIGEST_SCHEMA,
      statePath: join(args.stateDir, "latest.json"),
      ...digestCadence(state, now),
      lastError: lastError
        ? { failedAt: lastError.failedAt, message: lastError.message }
        : null,
    };
  }
  return stateSummary(state, digestOperationalStatus(state, lastError, now), {
    statePath: join(args.stateDir, "latest.json"),
    hotNotePath: args.hotNotePath,
    digestNotePath: args.digestNotePath,
    ...digestCadence(state, now),
    lastError: lastError
      ? { failedAt: lastError.failedAt, message: lastError.message }
      : null,
  });
}

async function main() {
  const args = parseArgs();
  if (!new Set(["run", "dry-run", "status"]).has(args.command)) {
    throw new Error(`Unknown command: ${args.command}`);
  }
  if (args.command === "status") {
    console.log(JSON.stringify(await status(args), null, 2));
    return;
  }
  try {
    const result = await runWeeklyDigest(args);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    await writeLastError(args, error).catch(() => {});
    console.error(`Weekly digest error: ${secretSafeError(error)}`);
    process.exitCode = 1;
  }
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  await main();
}
