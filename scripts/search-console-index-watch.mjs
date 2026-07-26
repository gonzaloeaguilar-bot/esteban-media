#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  open,
  readFile,
  rename,
  stat,
  unlink,
} from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const INDEX_WATCH_SCHEMA = "esteban-media.index-watch.v1";
export const SITE_URL = "https://estebanmorenomedia.com/";
export const LEGACY_V1_WATCH_URLS = [
  "https://estebanmorenomedia.com/",
  "https://estebanmorenomedia.com/services",
  "https://estebanmorenomedia.com/portfolio",
  "https://estebanmorenomedia.com/areas",
  "https://estebanmorenomedia.com/areas/palm-beach-county",
  "https://estebanmorenomedia.com/about",
  "https://estebanmorenomedia.com/contact",
  "https://estebanmorenomedia.com/es",
  "https://estebanmorenomedia.com/es/servicios",
  "https://estebanmorenomedia.com/es/portafolio",
  "https://estebanmorenomedia.com/es/areas",
  "https://estebanmorenomedia.com/es/areas/palm-beach-county",
  "https://estebanmorenomedia.com/es/sobre-esteban",
  "https://estebanmorenomedia.com/es/contacto",
  "https://estebanmorenomedia.com/es/videografo-en-fort-lauderdale",
  "https://estebanmorenomedia.com/es/videografo-en-miami",
  "https://estebanmorenomedia.com/es/fotografo-en-fort-lauderdale",
  "https://estebanmorenomedia.com/es/reels-para-negocios-miami",
  "https://estebanmorenomedia.com/es/video-para-restaurantes-miami",
  "https://estebanmorenomedia.com/es/drone-real-estate-miami",
];
export const WATCH_URLS = [
  ...LEGACY_V1_WATCH_URLS,
  "https://estebanmorenomedia.com/es/editor-de-video-real-estate-miami",
  "https://estebanmorenomedia.com/services/ai-product-photography-miami",
  "https://estebanmorenomedia.com/services/dental-video-marketing-south-florida",
  "https://estebanmorenomedia.com/services/med-spa-video-marketing-south-florida",
  "https://estebanmorenomedia.com/services/content-repurposing-service-miami",
  "https://estebanmorenomedia.com/services/small-business-video-production-miami",
  "https://estebanmorenomedia.com/services/ai-real-estate-photo-enhancement",
  "https://estebanmorenomedia.com/services/ai-food-photography-restaurants",
  "https://estebanmorenomedia.com/services/contractor-video-marketing-south-florida",
  "https://estebanmorenomedia.com/services/headshot-photographer-miami",
  "https://estebanmorenomedia.com/services/short-form-video-editor-miami",
  "https://estebanmorenomedia.com/services/video-production-boca-raton",
  "https://estebanmorenomedia.com/services/video-editing-west-palm-beach",
  "https://estebanmorenomedia.com/es/fotografia-de-producto-con-ia-miami",
  "https://estebanmorenomedia.com/es/imagenes-con-ia-para-ecommerce-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-dentistas-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-abogados-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-clinicas-esteticas-miami",
  "https://estebanmorenomedia.com/es/reutilizacion-de-contenido-para-redes-miami",
  "https://estebanmorenomedia.com/es/produccion-de-video-para-pequenos-negocios-miami",
  "https://estebanmorenomedia.com/es/fotos-con-ia-para-bienes-raices-miami",
  "https://estebanmorenomedia.com/es/fotografia-de-comida-con-ia-restaurantes",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-contratistas-miami",
  "https://estebanmorenomedia.com/es/fotografo-de-retratos-y-headshots-miami",
  "https://estebanmorenomedia.com/es/editor-de-video-corto-para-redes-miami",
  "https://estebanmorenomedia.com/es/produccion-de-video-palm-beach-county",
  "https://estebanmorenomedia.com/es/edicion-de-video-palm-beach-county",
  "https://estebanmorenomedia.com/portfolio/my-dler",
  "https://estebanmorenomedia.com/es/portafolio/my-dler",
  "https://estebanmorenomedia.com/portfolio/banacol",
  "https://estebanmorenomedia.com/es/portafolio/banacol",
  "https://estebanmorenomedia.com/portfolio/bar-door-monkey",
  "https://estebanmorenomedia.com/es/portafolio/bar-door-monkey",
  "https://estebanmorenomedia.com/portfolio/healthy-smile",
  "https://estebanmorenomedia.com/es/portafolio/healthy-smile",
  "https://estebanmorenomedia.com/portfolio/homeowners",
  "https://estebanmorenomedia.com/es/portafolio/homeowners",
  "https://estebanmorenomedia.com/portfolio/diana-jack",
  "https://estebanmorenomedia.com/es/portafolio/diana-jack",
  "https://estebanmorenomedia.com/portfolio/la-huelga",
  "https://estebanmorenomedia.com/es/portafolio/la-huelga",
  "https://estebanmorenomedia.com/portfolio/ml-colombia",
  "https://estebanmorenomedia.com/es/portafolio/ml-colombia",
  "https://estebanmorenomedia.com/guides",
  "https://estebanmorenomedia.com/es/guias",
  "https://estebanmorenomedia.com/guides/prepare-footage-for-video-editing",
  "https://estebanmorenomedia.com/guides/write-a-useful-video-brief",
  "https://estebanmorenomedia.com/guides/vertical-horizontal-video-exports-and-safe-zones",
  "https://estebanmorenomedia.com/guides/remote-video-editing-handoff",
  "https://estebanmorenomedia.com/guides/how-to-use-instagram-reels-for-business",
  "https://estebanmorenomedia.com/guides/video-content-ideas-for-restaurants",
  "https://estebanmorenomedia.com/guides/instagram-reels-ideas-for-real-estate",
  "https://estebanmorenomedia.com/guides/how-to-use-ai-for-product-photography",
  "https://estebanmorenomedia.com/guides/how-much-does-product-photography-cost",
  "https://estebanmorenomedia.com/guides/ai-product-photography-vs-traditional-studio",
  "https://estebanmorenomedia.com/guides/video-editor-vs-videographer",
  "https://estebanmorenomedia.com/guides/remote-vs-local-video-editing",
  "https://estebanmorenomedia.com/es/guias/preparar-material-para-edicion-de-video",
  "https://estebanmorenomedia.com/es/guias/como-escribir-un-brief-util-de-video",
  "https://estebanmorenomedia.com/es/guias/video-vertical-horizontal-y-zonas-seguras",
  "https://estebanmorenomedia.com/es/guias/entrega-para-edicion-remota-de-video",
  "https://estebanmorenomedia.com/es/guias/como-usar-instagram-reels-para-tu-negocio",
  "https://estebanmorenomedia.com/es/guias/ideas-de-contenido-de-video-para-restaurantes",
  "https://estebanmorenomedia.com/es/guias/ideas-de-reels-para-agentes-de-bienes-raices",
  "https://estebanmorenomedia.com/es/guias/como-usar-inteligencia-artificial-para-fotografia-de-producto",
  "https://estebanmorenomedia.com/es/guias/cuanto-cuesta-la-fotografia-de-producto",
  "https://estebanmorenomedia.com/es/guias/fotografia-de-producto-con-ia-vs-estudio-tradicional",
  "https://estebanmorenomedia.com/es/guias/editor-de-video-vs-videografo",
  "https://estebanmorenomedia.com/es/guias/edicion-remota-vs-estudio-local",
];

const WATCH_SET_EXPANSION_SCHEMA =
  "esteban-media.index-watch-set-expansion.v1";

const MANAGED_START = "<!-- esteban-media:index-watch:start -->";
const MANAGED_END = "<!-- esteban-media:index-watch:end -->";
const NOTE_DESCRIPTION = `Automated three-times-weekly Search Console performance and indexed-version coverage for the fixed ${WATCH_URLS.length}-URL sitemap set.`;
const DEFAULT_STATE_DIR = join(
  homedir(),
  ".local/state/esteban-media-index-watch",
);
const DEFAULT_NOTE_PATH = join(
  homedir(),
  "obsidian-wiki/client-esteban-media/wiki/esteban-media-index-watch.md",
);
const DEFAULT_TOKEN_PATH = join(
  homedir(),
  ".config/geebs/google_oauth_webmasters_token.json",
);
const REQUEST_TIMEOUT_MS = 30_000;
const LOCK_STALE_MS = 30 * 60 * 1_000;
const HISTORY_LIMIT = 26;
const NOTE_HISTORY_LIMIT = 12;

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

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

function shiftIsoDate(value, days) {
  const [year, month, day] = value.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return isoDate(shifted);
}

export function defaultRange(now = new Date()) {
  const pacificToday = isoDateInTimeZone(now, "America/Los_Angeles");
  const endDate = shiftIsoDate(pacificToday, -1);
  return { startDate: shiftIsoDate(endDate, -27), endDate };
}

function localRunDate(now = new Date()) {
  return isoDateInTimeZone(now, "America/New_York");
}

function parseArgs(argv = process.argv.slice(2)) {
  const command = argv.find((arg) => !arg.startsWith("--")) || "run";
  const findValue = (name) => {
    const prefix = `--${name}=`;
    return argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
  };
  const now = new Date();
  const range = defaultRange(now);

  return {
    command,
    dryRun: command === "dry-run",
    force: argv.includes("--force"),
    notify: !argv.includes("--no-notify"),
    startDate: findValue("start") || range.startDate,
    endDate: findValue("end") || range.endDate,
    runDate: findValue("run-date") || localRunDate(now),
    runId: findValue("run-id") || now.toISOString(),
    stateDir:
      findValue("state-dir") ||
      process.env.ESTEBAN_MEDIA_INDEX_WATCH_STATE_DIR ||
      DEFAULT_STATE_DIR,
    notePath:
      findValue("note") ||
      process.env.ESTEBAN_MEDIA_INDEX_WATCH_NOTE ||
      DEFAULT_NOTE_PATH,
    tokenPath:
      findValue("token") || process.env.GSC_TOKEN_PATH || DEFAULT_TOKEN_PATH,
  };
}

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = "";
  if (url.pathname !== "/") {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }
  return url.href;
}

export function watchedUrlHash(urls = WATCH_URLS) {
  return createHash("sha256")
    .update([...urls].map(normalizeUrl).sort().join("\n"))
    .digest("hex");
}

function decodeXmlText(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

export function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    normalizeUrl(decodeXmlText(match[1].trim())),
  );
}

export function validateWatchedSitemap(urls, expected = WATCH_URLS) {
  const normalized = urls.map(normalizeUrl);
  const expectedNormalized = expected.map(normalizeUrl);
  const unique = new Set(normalized);
  const actualSorted = [...unique].sort();
  const expectedSorted = [...new Set(expectedNormalized)].sort();

  if (normalized.length !== unique.size) {
    throw new Error("Live sitemap contains duplicate URLs");
  }
  if (actualSorted.length !== expectedSorted.length) {
    throw new Error(
      `Live sitemap URL count ${actualSorted.length} does not match watched count ${expectedSorted.length}`,
    );
  }
  const missing = expectedSorted.filter((url) => !unique.has(url));
  const unexpected = actualSorted.filter(
    (url) => !expectedSorted.includes(url),
  );
  if (missing.length || unexpected.length) {
    throw new Error(
      `Live sitemap drifted from the fixed watch set (missing: ${missing.join(", ") || "none"}; unexpected: ${unexpected.join(", ") || "none"})`,
    );
  }
  return {
    count: actualSorted.length,
    hash: watchedUrlHash(actualSorted),
    urls: actualSorted,
  };
}

function errorDescription(payload, fallback) {
  return (
    payload?.error?.message ||
    payload?.error_description ||
    (typeof payload?.error === "string" ? payload.error : "") ||
    fallback
  );
}

export function secretSafeError(error) {
  return String(error?.message || error || "Unknown error")
    .replace(/Bearer\s+[^\s]+/gi, "Bearer [redacted]")
    .replace(/(access_token|refresh_token|client_secret)=?[^\s&,}]*/gi, "$1=[redacted]")
    .slice(0, 2_000);
}

async function delay(milliseconds) {
  await new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function isTransientTransportError(error) {
  return error?.name === "AbortError" || error?.name === "TypeError";
}

export async function requestJson(
  url,
  options,
  {
    fetchImpl = fetch,
    label = "Request",
    attempts = 3,
    timeoutMs = REQUEST_TIMEOUT_MS,
    sleep = delay,
  } = {},
) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, {
        ...options,
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({}));
      if (response.ok && !payload?.error) {
        return payload;
      }
      const message = errorDescription(payload, `HTTP ${response.status}`);
      const retryable = response.status === 429 || response.status >= 500;
      lastError = new Error(`${label} failed: ${message}`);
      if (!retryable || attempt === attempts) {
        throw lastError;
      }
    } catch (error) {
      const retryable = isTransientTransportError(error);
      lastError = error?.name === "AbortError"
        ? new Error(`${label} timed out after ${timeoutMs}ms`)
        : error;
      if (!retryable || attempt === attempts) {
        throw lastError;
      }
    } finally {
      clearTimeout(timer);
    }
    await sleep(500 * 2 ** (attempt - 1));
  }
  throw lastError || new Error(`${label} failed`);
}

export async function requestText(
  url,
  {
    fetchImpl = fetch,
    label = "Request",
    attempts = 3,
    timeoutMs = REQUEST_TIMEOUT_MS,
    sleep = delay,
  } = {},
) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, { signal: controller.signal });
      const body = await response.text();
      if (response.ok) {
        return body;
      }
      const retryable = response.status === 429 || response.status >= 500;
      lastError = new Error(`${label} failed: HTTP ${response.status}`);
      if (!retryable || attempt === attempts) {
        throw lastError;
      }
    } catch (error) {
      const retryable = isTransientTransportError(error);
      lastError = error?.name === "AbortError"
        ? new Error(`${label} timed out after ${timeoutMs}ms`)
        : error;
      if (!retryable || attempt === attempts) {
        throw lastError;
      }
    } finally {
      clearTimeout(timer);
    }
    await sleep(500 * 2 ** (attempt - 1));
  }
  throw lastError || new Error(`${label} failed`);
}

function loadToken(tokenPath) {
  const token = JSON.parse(readFileSync(tokenPath, "utf8"));
  for (const field of ["client_id", "client_secret", "refresh_token"]) {
    if (!token[field]) {
      throw new Error(`Search Console credential file is missing ${field}`);
    }
  }
  return token;
}

async function refreshAccessToken(token, dependencies = {}) {
  const payload = await requestJson(
    token.token_uri || "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: token.client_id,
        client_secret: token.client_secret,
        refresh_token: token.refresh_token,
        grant_type: "refresh_token",
      }).toString(),
    },
    { ...dependencies, label: "Search Console credential refresh" },
  );
  if (!payload.access_token) {
    throw new Error("Search Console credential refresh returned no access token");
  }
  return payload.access_token;
}

function authHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

async function verifySiteAccess(accessToken, dependencies = {}) {
  const payload = await requestJson(
    "https://www.googleapis.com/webmasters/v3/sites",
    { headers: authHeaders(accessToken) },
    { ...dependencies, label: "Search Console site access check" },
  );
  const site = (payload.siteEntry || []).find(
    (entry) => entry.siteUrl === SITE_URL,
  );
  if (!site || site.permissionLevel === "siteUnverifiedUser") {
    throw new Error(`Search Console access is unavailable for ${SITE_URL}`);
  }
  return site.permissionLevel || "unknown";
}

async function querySearchAnalytics(
  accessToken,
  { startDate, endDate, dimensions = [], dataState = "all" },
  dependencies = {},
) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    SITE_URL,
  )}/searchAnalytics/query`;
  return requestJson(
    endpoint,
    {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions,
        type: "web",
        aggregationType: dimensions.includes("page") ? "auto" : "byProperty",
        rowLimit: 25_000,
        dataState,
      }),
    },
    { ...dependencies, label: "Search Console performance query" },
  );
}

function numberOrZero(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function rounded(value) {
  return Number(Number(value).toFixed(4));
}

function totalsFromResponse(payload) {
  const row = payload.rows?.[0];
  if (!row) {
    return {
      observed: false,
      clicks: 0,
      impressions: 0,
      ctr: null,
      position: null,
    };
  }
  return {
    observed: true,
    clicks: numberOrZero(row.clicks),
    impressions: numberOrZero(row.impressions),
    ctr: rounded(numberOrZero(row.ctr)),
    position: rounded(numberOrZero(row.position)),
  };
}

export function watchedPageRows(payload, watchedUrls = WATCH_URLS) {
  const rows = new Map(
    (payload.rows || []).map((row) => [normalizeUrl(row.keys?.[0] || SITE_URL), row]),
  );
  return watchedUrls.map((url) => {
    const normalizedUrl = normalizeUrl(url);
    const row = rows.get(normalizedUrl);
    return {
      url: normalizedUrl,
      observed: Boolean(row),
      clicks: numberOrZero(row?.clicks),
      impressions: numberOrZero(row?.impressions),
      ctr: row ? rounded(numberOrZero(row.ctr)) : null,
      position: row ? rounded(numberOrZero(row.position)) : null,
    };
  });
}

function dailyRows(payload) {
  return (payload.rows || []).map((row) => ({
    date: row.keys?.[0] || "",
    clicks: numberOrZero(row.clicks),
    impressions: numberOrZero(row.impressions),
    ctr: rounded(numberOrZero(row.ctr)),
    position: rounded(numberOrZero(row.position)),
  }));
}

async function inspectUrl(accessToken, url, dependencies = {}) {
  const payload = await requestJson(
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
    {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify({
        inspectionUrl: url,
        siteUrl: SITE_URL,
        languageCode: "en-US",
      }),
    },
    { ...dependencies, label: `Search Console URL inspection (${url})` },
  );
  const result = payload.inspectionResult?.indexStatusResult;
  if (!result) {
    throw new Error(`URL inspection returned no index status for ${url}`);
  }
  const googleCanonical = result.googleCanonical || null;
  const userCanonical = result.userCanonical || null;
  return {
    url,
    verdict: result.verdict || "VERDICT_UNSPECIFIED",
    coverageState: result.coverageState || "Unknown",
    indexingState: result.indexingState || "INDEXING_STATE_UNSPECIFIED",
    pageFetchState: result.pageFetchState || "PAGE_FETCH_STATE_UNSPECIFIED",
    robotsTxtState: result.robotsTxtState || "ROBOTS_TXT_STATE_UNSPECIFIED",
    lastCrawlTime: result.lastCrawlTime || null,
    googleCanonical,
    userCanonical,
    canonicalMismatch: Boolean(
      (googleCanonical && normalizeUrl(googleCanonical) !== normalizeUrl(url)) ||
        (userCanonical && normalizeUrl(userCanonical) !== normalizeUrl(url)),
    ),
  };
}

async function inspectUrls(
  accessToken,
  urls,
  dependencies = {},
  concurrency = 4,
) {
  const results = new Array(urls.length);
  let cursor = 0;
  async function worker() {
    while (cursor < urls.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await inspectUrl(
        accessToken,
        urls[index],
        dependencies,
      );
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()),
  );
  return results;
}

function inspectionCounts(pages) {
  const counts = { pass: 0, neutral: 0, fail: 0, unknown: 0 };
  for (const page of pages) {
    if (page.verdict === "PASS") counts.pass += 1;
    else if (page.verdict === "NEUTRAL") counts.neutral += 1;
    else if (page.verdict === "FAIL") counts.fail += 1;
    else counts.unknown += 1;
  }
  return counts;
}

function eventId(parts) {
  return createHash("sha256").update(parts.join("\n")).digest("hex").slice(0, 20);
}

function previousConfirmedVerdict(previousState, url) {
  if (Object.hasOwn(previousState?.confirmedVerdicts || {}, url)) {
    return previousState.confirmedVerdicts[url];
  }
  return previousState?.latest?.inspection?.pages?.find(
    (page) => page.url === url,
  )?.verdict;
}

function isAlertEvent(alert) {
  return (
    typeof alert?.id === "string" &&
    typeof alert?.type === "string" &&
    typeof alert?.message === "string"
  );
}

function isRenderableHistoryEntry(entry) {
  return (
    typeof entry?.runId === "string" &&
    typeof entry?.generatedAt === "string" &&
    Number.isFinite(entry?.searchAnalytics?.finalPropertyTotals?.clicks) &&
    Number.isFinite(entry?.searchAnalytics?.finalPropertyTotals?.impressions) &&
    Number.isFinite(
      entry?.searchAnalytics?.allDataPropertyTotals?.impressions,
    ) &&
    Number.isFinite(entry?.inspection?.counts?.pass) &&
    Array.isArray(entry?.alerts) &&
    entry.alerts.every(isAlertEvent)
  );
}

function historyEntryWatchCount(entry) {
  const counts = entry?.inspection?.counts;
  const values = [
    counts?.pass,
    counts?.neutral,
    counts?.fail,
    counts?.unknown,
  ];
  if (values.every((value) => Number.isInteger(value) && value >= 0)) {
    return values.reduce((total, value) => total + value, 0);
  }
  return Array.isArray(entry?.inspection?.pages)
    ? entry.inspection.pages.length
    : 0;
}

export function detectAlerts(previousState, snapshot) {
  const alerts = [];
  const observedPages = snapshot.searchAnalytics.pages.filter(
    (page) => page.impressions > 0,
  );
  const propertyImpressions =
    snapshot.searchAnalytics.allDataPropertyTotals.impressions;
  if (
    !previousState?.everImpressions &&
    (propertyImpressions > 0 || observedPages.length)
  ) {
    const observedImpressions = observedPages.reduce(
      (total, page) => total + page.impressions,
      0,
    );
    const detail = observedPages.length
      ? `${observedImpressions} page-grouped impressions across ${observedPages.length} watched URLs; all-data property total ${propertyImpressions}.`
      : `${propertyImpressions} all-data property impressions; Search Console returned no watched-page row.`;
    alerts.push({
      id: eventId(["first_impressions", snapshot.runId]),
      type: "first_impressions",
      severity: "milestone",
      observedAt: snapshot.generatedAt,
      message: `First observed Search Console impressions: ${detail}`,
      urls: observedPages.map((page) => page.url),
    });
  }

  for (const page of snapshot.inspection.pages) {
    const priorVerdict = previousConfirmedVerdict(previousState, page.url);
    if (
      priorVerdict === "PASS" &&
      (page.verdict === "NEUTRAL" || page.verdict === "FAIL")
    ) {
      alerts.push({
        id: eventId([
          "deindexed",
          snapshot.runId,
          page.url,
          priorVerdict,
          page.verdict,
          page.coverageState,
        ]),
        type: "deindexed",
        severity: "urgent",
        observedAt: snapshot.generatedAt,
        message: `${new URL(page.url).pathname} changed from indexed to ${page.verdict}: ${page.coverageState}.`,
        url: page.url,
        fromVerdict: priorVerdict,
        toVerdict: page.verdict,
      });
    } else if (
      (priorVerdict === "NEUTRAL" || priorVerdict === "FAIL") &&
      page.verdict === "PASS"
    ) {
      alerts.push({
        id: eventId([
          "reindexed",
          snapshot.runId,
          page.url,
          priorVerdict,
          page.verdict,
        ]),
        type: "reindexed",
        severity: "recovery",
        observedAt: snapshot.generatedAt,
        message: `${new URL(page.url).pathname} returned to indexed status.`,
        url: page.url,
        fromVerdict: priorVerdict,
        toVerdict: page.verdict,
      });
    }
  }
  return alerts;
}

function markdownCell(value) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function percent(value) {
  return value === null ? "—" : `${(value * 100).toFixed(2)}%`;
}

function pathLabel(url) {
  return new URL(url).pathname;
}

export function renderManagedBlock(state) {
  const snapshot = state.latest;
  const finalTotals = snapshot.searchAnalytics.finalPropertyTotals;
  const allDataTotals = snapshot.searchAnalytics.allDataPropertyTotals;
  const pageImpressions = snapshot.searchAnalytics.pages.reduce(
    (total, page) => total + page.impressions,
    0,
  );
  const alertLines = snapshot.alerts.length
    ? snapshot.alerts
        .map(
          (alert) =>
            `> [!${alert.type === "deindexed" ? "danger" : alert.type === "first_impressions" ? "success" : "info"}] ${markdownCell(alert.message)}`,
        )
        .join("\n")
    : "> [!info] No new first-impression, de-indexing, or recovery transition this run.";
  const pageMetrics = new Map(
    snapshot.searchAnalytics.pages.map((page) => [page.url, page]),
  );
  const coverageRows = snapshot.inspection.pages
    .map((page) => {
      const metrics = pageMetrics.get(page.url);
      return `| ${markdownCell(pathLabel(page.url))} | ${markdownCell(page.verdict)} | ${markdownCell(page.coverageState)} | ${metrics?.clicks ?? 0} | ${metrics?.impressions ?? 0} | ${markdownCell(page.lastCrawlTime)} | ${page.canonicalMismatch ? "yes" : "no"} |`;
    })
    .join("\n");
  const historyRows = state.history
    .filter(isRenderableHistoryEntry)
    .slice(0, NOTE_HISTORY_LIMIT)
    .map(
      (entry) =>
        `| ${markdownCell(entry.generatedAt)} | ${entry.searchAnalytics.finalPropertyTotals.clicks} | ${entry.searchAnalytics.finalPropertyTotals.impressions} | ${entry.searchAnalytics.allDataPropertyTotals.impressions} | ${entry.inspection.counts.pass}/${historyEntryWatchCount(entry)} | ${entry.alerts.map((alert) => alert.type).join(", ") || "none"} |`,
    )
    .join("\n");

  return `${MANAGED_START}
## Latest successful run — ${snapshot.runDate}

- Generated: ${snapshot.generatedAt}
- Search Console property: \`${SITE_URL}\` (${snapshot.permissionLevel})
- Window: ${snapshot.searchAnalytics.startDate} through ${snapshot.searchAnalytics.endDate}; fresh data begins ${snapshot.searchAnalytics.firstIncompleteDate || "not reported"}
- Fixed watch set: ${state.watchUrlCount} URLs · hash \`${state.watchUrlHash.slice(0, 12)}\`
- Finalized property totals: **${finalTotals.clicks} clicks / ${finalTotals.impressions} impressions** · CTR ${percent(finalTotals.ctr)} · position ${markdownCell(finalTotals.position)}
- All-data property totals (final + fresh/incomplete): **${allDataTotals.clicks} clicks / ${allDataTotals.impressions} impressions**
- All-data watched page rows: ${pageImpressions} observed impressions across ${snapshot.searchAnalytics.pages.filter((page) => page.impressions > 0).length} URLs. This page-grouped view includes fresh/incomplete data and is intentionally not treated as the property total.
- Indexed coverage: **${snapshot.inspection.counts.pass}/${state.watchUrlCount} PASS** · ${snapshot.inspection.counts.neutral} excluded · ${snapshot.inspection.counts.fail} failed · ${snapshot.inspection.counts.unknown} unknown

${alertLines}

### Watched URLs

| URL | Verdict | Coverage | All-data clicks | All-data impressions | Last crawl | Canonical mismatch |
|---|---|---|---:|---:|---|---|
${coverageRows}

### Run history

| Generated | Final clicks | Final impressions | All-data impressions | Indexed | New events |
|---|---:|---:|---:|---:|---|
${historyRows}

The loop treats only a confirmed \`PASS → NEUTRAL/FAIL\` transition as de-indexing. Missing Search Analytics rows and API failures are never de-indexing evidence.
${MANAGED_END}`;
}

function newNote(managedBlock, updatedDate) {
  return `---
title: "Esteban Media — Search Console Index Watch"
category: client-esteban-media
date: 2026-07-19
updated: ${updatedDate}
tags: [esteban-media, search-console, indexing, automation]
---

# Esteban Media — Search Console Index Watch

${NOTE_DESCRIPTION}

${managedBlock}
`;
}

function updateFrontmatterDate(content, updatedDate) {
  if (!content.startsWith("---\n")) return content;
  if (/^updated: .*$/m.test(content)) {
    return content.replace(/^updated: .*$/m, `updated: ${updatedDate}`);
  }
  return content.replace(/^---\n/, `---\nupdated: ${updatedDate}\n`);
}

export function mergeManagedNote(existing, managedBlock, updatedDate) {
  if (!existing) return newNote(managedBlock, updatedDate);
  const start = existing.indexOf(MANAGED_START);
  const end = existing.indexOf(MANAGED_END);
  if ((start === -1) !== (end === -1) || (start !== -1 && end < start)) {
    throw new Error("Index-watch note has incomplete managed markers");
  }
  const next =
    start === -1
      ? `${existing.trimEnd()}\n\n${managedBlock}\n`
      : `${existing.slice(0, start)}${managedBlock}${existing.slice(end + MANAGED_END.length)}`;
  const currentDescription = next.replace(
    /Automated three-times-weekly Search Console performance and indexed-version coverage for the fixed \d+-URL sitemap set\./,
    NOTE_DESCRIPTION,
  );
  return updateFrontmatterDate(currentDescription, updatedDate);
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

function urlsMatchInventory(urls, inventory) {
  let normalized;
  try {
    normalized = urls.map(normalizeUrl).sort();
  } catch {
    return false;
  }
  const expected = inventory.map(normalizeUrl).sort();
  return (
    normalized.length === expected.length &&
    new Set(normalized).size === expected.length &&
    normalized.every((url, index) => url === expected[index])
  );
}

function validExpansionMarker(marker) {
  return (
    marker?.schema === WATCH_SET_EXPANSION_SCHEMA &&
    marker.fromCount === LEGACY_V1_WATCH_URLS.length &&
    marker.fromHash === watchedUrlHash(LEGACY_V1_WATCH_URLS) &&
    marker.toCount === WATCH_URLS.length &&
    marker.toHash === watchedUrlHash()
  );
}

function zeroAnalyticsPage(url) {
  return {
    url,
    observed: false,
    clicks: 0,
    impressions: 0,
    ctr: null,
    position: null,
  };
}

function unconfirmedInspectionPage(url) {
  return {
    url,
    verdict: "VERDICT_UNSPECIFIED",
    coverageState: "Not inspected since watch-set expansion",
    indexingState: "INDEXING_STATE_UNSPECIFIED",
    pageFetchState: "PAGE_FETCH_STATE_UNSPECIFIED",
    robotsTxtState: "ROBOTS_TXT_STATE_UNSPECIFIED",
    lastCrawlTime: null,
    googleCanonical: null,
    userCanonical: null,
    canonicalMismatch: false,
  };
}

function migrateLegacyWatchState(state) {
  const analyticsByUrl = new Map(
    state.latest.searchAnalytics.pages.map((page) => [
      normalizeUrl(page.url),
      page,
    ]),
  );
  const inspectionByUrl = new Map(
    state.latest.inspection.pages.map((page) => [normalizeUrl(page.url), page]),
  );
  const verdictByUrl = new Map(
    Object.entries(state.confirmedVerdicts).map(([url, verdict]) => [
      normalizeUrl(url),
      verdict,
    ]),
  );
  const inspectionPages = WATCH_URLS.map(
    (url) => inspectionByUrl.get(normalizeUrl(url)) || unconfirmedInspectionPage(url),
  );

  return {
    ...state,
    watchUrlCount: WATCH_URLS.length,
    watchUrlHash: watchedUrlHash(),
    latest: {
      ...state.latest,
      searchAnalytics: {
        ...state.latest.searchAnalytics,
        pages: WATCH_URLS.map(
          (url) => analyticsByUrl.get(normalizeUrl(url)) || zeroAnalyticsPage(url),
        ),
      },
      inspection: {
        ...state.latest.inspection,
        counts: inspectionCounts(inspectionPages),
        pages: inspectionPages,
      },
    },
    confirmedVerdicts: Object.fromEntries(
      WATCH_URLS.map((url) => [
        url,
        verdictByUrl.get(normalizeUrl(url)) ?? null,
      ]),
    ),
    watchSetExpansion: {
      schema: WATCH_SET_EXPANSION_SCHEMA,
      fromCount: LEGACY_V1_WATCH_URLS.length,
      fromHash: watchedUrlHash(LEGACY_V1_WATCH_URLS),
      toCount: WATCH_URLS.length,
      toHash: watchedUrlHash(),
    },
  };
}

export function validatePreviousState(state) {
  if (!state) return null;
  const failures = [];
  const isCurrentInventory =
    state.watchUrlCount === WATCH_URLS.length &&
    state.watchUrlHash === watchedUrlHash();
  const isLegacyInventory =
    state.watchUrlCount === LEGACY_V1_WATCH_URLS.length &&
    state.watchUrlHash === watchedUrlHash(LEGACY_V1_WATCH_URLS);
  const expectedInventory = isLegacyInventory
    ? LEGACY_V1_WATCH_URLS
    : WATCH_URLS;
  const expectedUrls = expectedInventory.map(normalizeUrl).sort();
  const validateUrlRows = (rows, label, validateRow) => {
    if (!Array.isArray(rows)) {
      failures.push(label);
      return;
    }
    let actualUrls;
    try {
      actualUrls = rows.map((row) => normalizeUrl(row?.url)).sort();
    } catch {
      failures.push(`${label}.url`);
      return;
    }
    if (
      actualUrls.length !== expectedInventory.length ||
      new Set(actualUrls).size !== expectedInventory.length ||
      actualUrls.some((url, index) => url !== expectedUrls[index])
    ) {
      failures.push(`${label}.urls`);
    }
    if (validateRow && rows.some((row) => !validateRow(row))) {
      failures.push(`${label}.shape`);
    }
  };
  if (state.schema !== INDEX_WATCH_SCHEMA) failures.push("schema");
  if (state.siteUrl !== SITE_URL) failures.push("siteUrl");
  if (!isCurrentInventory && !isLegacyInventory) {
    if (
      state.watchUrlCount !== WATCH_URLS.length &&
      state.watchUrlCount !== LEGACY_V1_WATCH_URLS.length
    ) {
      failures.push("watchUrlCount");
    }
    failures.push("watchUrlHash");
  }
  if (
    state.watchSetExpansion !== undefined &&
    (!isCurrentInventory || !validExpansionMarker(state.watchSetExpansion))
  ) {
    failures.push("watchSetExpansion");
  }
  if (!state.latest || typeof state.latest !== "object") {
    failures.push("latest");
  } else {
    for (const field of ["runId", "runDate", "generatedAt"]) {
      if (typeof state.latest[field] !== "string" || !state.latest[field]) {
        failures.push(`latest.${field}`);
      }
    }
    const expectedLiveSitemapHash = watchedUrlHash(expectedInventory);
    let validatedLiveSitemap = null;
    try {
      validatedLiveSitemap = validateWatchedSitemap(
        state.latest.liveSitemap?.urls || [],
        expectedInventory,
      );
    } catch {
      failures.push("latest.liveSitemap.urls");
    }
    if (state.latest.liveSitemap?.count !== expectedInventory.length) {
      failures.push("latest.liveSitemap.count");
    }
    if (
      state.latest.liveSitemap?.hash !== expectedLiveSitemapHash ||
      (validatedLiveSitemap &&
        validatedLiveSitemap.hash !== expectedLiveSitemapHash)
    ) {
      failures.push("latest.liveSitemap.hash");
    }
    validateUrlRows(
      state.latest.inspection?.pages,
      "latest.inspection.pages",
      (row) =>
        new Set([
          "PASS",
          "NEUTRAL",
          "FAIL",
          "PARTIAL",
          "VERDICT_UNSPECIFIED",
        ]).has(row?.verdict) && typeof row?.coverageState === "string",
    );
    const counts = state.latest.inspection?.counts;
    const countValues = [
      counts?.pass,
      counts?.neutral,
      counts?.fail,
      counts?.unknown,
    ];
    if (
      countValues.some(
        (value) => !Number.isInteger(value) || value < 0,
      ) ||
      countValues.reduce((total, value) => total + value, 0) !==
        expectedInventory.length
    ) {
      failures.push("latest.inspection.counts");
    } else if (Array.isArray(state.latest.inspection?.pages)) {
      const recomputed = inspectionCounts(state.latest.inspection.pages);
      if (
        Object.keys(recomputed).some(
          (key) => recomputed[key] !== counts[key],
        )
      ) {
        failures.push("latest.inspection.counts.mismatch");
      }
    }
    validateUrlRows(
      state.latest.searchAnalytics?.pages,
      "latest.searchAnalytics.pages",
      (row) =>
        Number.isFinite(row?.clicks) &&
        Number.isFinite(row?.impressions) &&
        row.clicks >= 0 &&
        row.impressions >= 0,
    );
    if (
      !Number.isFinite(
        state.latest.searchAnalytics?.allDataPropertyTotals?.impressions,
      ) ||
      !Number.isFinite(
        state.latest.searchAnalytics?.finalPropertyTotals?.impressions,
      )
    ) {
      failures.push("latest.searchAnalytics.totals");
    }
    if (
      !Array.isArray(state.latest.alerts) ||
      !state.latest.alerts.every(isAlertEvent)
    ) {
      failures.push("latest.alerts");
    }
  }
  if (typeof state.everImpressions !== "boolean") {
    failures.push("everImpressions");
  }
  if (!Array.isArray(state.history)) failures.push("history");
  if (!Array.isArray(state.eventHistory)) failures.push("eventHistory");
  if (!Array.isArray(state.pendingNotifications)) {
    failures.push("pendingNotifications");
  } else if (
    state.pendingNotifications.some((alert) => !isAlertEvent(alert))
  ) {
    failures.push("pendingNotifications.shape");
  }
  const confirmedVerdicts = state.confirmedVerdicts;
  if (
    !confirmedVerdicts ||
    typeof confirmedVerdicts !== "object" ||
    Array.isArray(confirmedVerdicts)
  ) {
    failures.push("confirmedVerdicts");
  } else {
    const confirmedUrls = Object.keys(confirmedVerdicts).sort();
    if (
      !urlsMatchInventory(confirmedUrls, expectedInventory)
    ) {
      failures.push("confirmedVerdicts.urls");
    }
    if (
      Object.values(confirmedVerdicts).some(
        (verdict) =>
          verdict !== null &&
          !new Set(["PASS", "NEUTRAL", "FAIL"]).has(verdict),
      )
    ) {
      failures.push("confirmedVerdicts.values");
    }
  }
  if (failures.length) {
    throw new Error(
      `Existing index-watch state failed validation: ${failures.join(", ")}`,
    );
  }
  return isLegacyInventory ? migrateLegacyWatchState(state) : state;
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

export async function acquireLock(
  lockPath,
  { now = Date.now(), staleMs = LOCK_STALE_MS } = {},
) {
  await mkdir(dirname(lockPath), { recursive: true });
  try {
    const handle = await open(lockPath, "wx", 0o600);
    await handle.writeFile(`${JSON.stringify({ pid: process.pid, createdAt: new Date(now).toISOString() })}\n`);
    await handle.close();
    return {
      acquired: true,
      staleRecovered: false,
      release: async () => unlink(lockPath).catch(() => {}),
    };
  } catch (error) {
    if (error?.code !== "EEXIST") throw error;
  }

  const lockStat = await stat(lockPath);
  if (now - lockStat.mtimeMs <= staleMs) {
    return { acquired: false, staleRecovered: false, release: async () => {} };
  }
  await unlink(lockPath);
  const recovered = await acquireLock(lockPath, { now, staleMs });
  return { ...recovered, staleRecovered: true };
}

function notificationMessage(alert) {
  if (alert.type === "first_impressions") return alert.message;
  if (alert.type === "deindexed") return `Possible de-indexing: ${alert.message}`;
  return alert.message;
}

function notifyLocal(alert) {
  const script = `on run argv
display notification (item 1 of argv) with title (item 2 of argv)
end run`;
  const result = spawnSync(
    "/usr/bin/osascript",
    ["-e", script, notificationMessage(alert), "Esteban Media Index Watch"],
    { encoding: "utf8", timeout: 10_000 },
  );
  return {
    alertId: alert.id,
    delivered: result.status === 0,
    status: result.status,
  };
}

export function deliverPendingNotifications(
  state,
  {
    enabled = true,
    notifier = notifyLocal,
    attemptedAt = new Date().toISOString(),
    alertIds = null,
  } = {},
) {
  const pending = state.pendingNotifications || [];
  const selectedIds = alertIds ? new Set(alertIds) : null;
  const selected = selectedIds
    ? pending.filter((alert) => selectedIds.has(alert.id))
    : pending;
  if (!selected.length) {
    return { state, results: [] };
  }
  if (!enabled) {
    return {
      state,
      results: selected.map((alert) => ({
        alertId: alert.id,
        delivered: false,
        status: "disabled",
      })),
    };
  }

  const results = selected.map((alert) => {
    try {
      return notifier(alert);
    } catch {
      return { alertId: alert.id, delivered: false, status: "exception" };
    }
  });
  const resultById = new Map(
    results.map((result) => [result.alertId, result]),
  );
  const selectedAlertIds = new Set(selected.map((alert) => alert.id));
  const pendingNotifications = pending.flatMap((alert) => {
    if (!selectedAlertIds.has(alert.id)) return [alert];
    if (resultById.get(alert.id)?.delivered) return [];
    return [
      {
        ...alert,
        deliveryAttempts: numberOrZero(alert.deliveryAttempts) + 1,
        lastDeliveryAttemptAt: attemptedAt,
      },
    ];
  });
  return {
    state: { ...state, pendingNotifications },
    results,
  };
}

async function collectSnapshot(args, previousState, dependencies = {}) {
  const sitemapXml = await requestText(`${SITE_URL}sitemap.xml`, dependencies);
  const liveSitemap = validateWatchedSitemap(sitemapUrls(sitemapXml));
  const accessToken = await refreshAccessToken(
    loadToken(args.tokenPath),
    dependencies,
  );
  const permissionLevel = await verifySiteAccess(accessToken, dependencies);
  const query = { startDate: args.startDate, endDate: args.endDate };
  const [finalTotalsPayload, allDataTotalsPayload, pagePayload, dailyPayload] =
    await Promise.all([
      querySearchAnalytics(
        accessToken,
        { ...query, dataState: "final" },
        dependencies,
      ),
      querySearchAnalytics(
        accessToken,
        { ...query, dataState: "all" },
        dependencies,
      ),
      querySearchAnalytics(
        accessToken,
        { ...query, dataState: "all", dimensions: ["page"] },
        dependencies,
      ),
      querySearchAnalytics(
        accessToken,
        { ...query, dataState: "all", dimensions: ["date"] },
        dependencies,
      ),
    ]);
  let inspectionPages = await inspectUrls(
    accessToken,
    WATCH_URLS,
    dependencies,
  );

  const suspectedTransitions = inspectionPages.filter((page) => {
    return (
      previousConfirmedVerdict(previousState, page.url) === "PASS" &&
      (page.verdict === "NEUTRAL" || page.verdict === "FAIL")
    );
  });
  if (suspectedTransitions.length) {
    const confirmations = await inspectUrls(
      accessToken,
      suspectedTransitions.map((page) => page.url),
      dependencies,
      1,
    );
    const confirmed = new Map(confirmations.map((page) => [page.url, page]));
    inspectionPages = inspectionPages.map(
      (page) => confirmed.get(page.url) || page,
    );
  }

  const generatedAt = new Date().toISOString();
  const snapshot = {
    runId: args.runId,
    runDate: args.runDate,
    generatedAt,
    permissionLevel,
    liveSitemap,
    searchAnalytics: {
      startDate: args.startDate,
      endDate: args.endDate,
      firstIncompleteDate:
        dailyPayload.metadata?.first_incomplete_date || null,
      finalPropertyTotals: totalsFromResponse(finalTotalsPayload),
      allDataPropertyTotals: totalsFromResponse(allDataTotalsPayload),
      pages: watchedPageRows(pagePayload),
      daily: dailyRows(dailyPayload),
    },
    inspection: {
      counts: inspectionCounts(inspectionPages),
      pages: inspectionPages,
    },
    alerts: [],
  };
  snapshot.alerts = detectAlerts(previousState, snapshot);
  return snapshot;
}

export function buildState(previousState, snapshot) {
  const positivePage =
    snapshot.searchAnalytics.allDataPropertyTotals.impressions > 0 ||
    snapshot.searchAnalytics.pages.some((page) => page.impressions > 0);
  const history = [snapshot, ...(previousState?.history || [])]
    .filter(isRenderableHistoryEntry)
    .filter(
      (entry, index, entries) =>
        entries.findIndex((candidate) => candidate.runId === entry.runId) ===
        index,
    )
    .slice(0, HISTORY_LIMIT);
  const eventHistory = [
    ...snapshot.alerts,
    ...(previousState?.eventHistory || []),
  ]
    .filter(isAlertEvent)
    .filter(
      (event, index, events) =>
        events.findIndex((candidate) => candidate.id === event.id) === index,
    )
    .slice(0, 100);
  const firstImpressionAlert = snapshot.alerts.find(
    (alert) => alert.type === "first_impressions",
  );
  const confirmedVerdicts = Object.fromEntries(
    WATCH_URLS.map((url) => [
      url,
      previousState?.confirmedVerdicts?.[url] ?? null,
    ]),
  );
  for (const page of snapshot.inspection.pages) {
    if (new Set(["PASS", "NEUTRAL", "FAIL"]).has(page.verdict)) {
      confirmedVerdicts[page.url] = page.verdict;
    }
  }
  const pendingNotifications = [
    ...(previousState?.pendingNotifications || []),
    ...snapshot.alerts,
  ].filter(
    (alert, index, alerts) =>
      alerts.findIndex((candidate) => candidate.id === alert.id) === index,
  );

  return {
    schema: INDEX_WATCH_SCHEMA,
    updatedAt: snapshot.generatedAt,
    siteUrl: SITE_URL,
    watchUrlCount: WATCH_URLS.length,
    watchUrlHash: watchedUrlHash(),
    everImpressions: Boolean(previousState?.everImpressions || positivePage),
    firstImpressionsObservedAt:
      previousState?.firstImpressionsObservedAt ||
      firstImpressionAlert?.observedAt ||
      null,
    latest: snapshot,
    history,
    eventHistory,
    confirmedVerdicts,
    pendingNotifications,
  };
}

function stateSummary(state, status, extra = {}) {
  return {
    status,
    schema: state.schema,
    generatedAt: state.latest.generatedAt,
    runDate: state.latest.runDate,
    siteUrl: state.siteUrl,
    watchedUrlCount: state.watchUrlCount,
    finalPropertyTotals: state.latest.searchAnalytics.finalPropertyTotals,
    allDataPropertyTotals: state.latest.searchAnalytics.allDataPropertyTotals,
    indexed: state.latest.inspection.counts,
    alerts: state.latest.alerts.map((alert) => alert.type),
    pendingNotificationCount: state.pendingNotifications?.length || 0,
    watchSetExpansionPending: Boolean(state.watchSetExpansion),
    ...extra,
  };
}

async function writeLastError(args, error) {
  const path = join(args.stateDir, "last-error.json");
  const payload = {
    schema: INDEX_WATCH_SCHEMA,
    failedAt: new Date().toISOString(),
    runId: args.runId,
    message: secretSafeError(error),
  };
  await atomicWrite(path, `${JSON.stringify(payload, null, 2)}\n`);
}

export async function runIndexWatch(args, dependencies = {}) {
  await mkdir(args.stateDir, { recursive: true });
  const latestPath = join(args.stateDir, "latest.json");
  const rawPreviousState = await readJsonIfExists(latestPath);
  const previousState = validatePreviousState(rawPreviousState);
  const previousError = await readJsonIfExists(
    join(args.stateDir, "last-error.json"),
  );

  const lock = await acquireLock(join(args.stateDir, "index-watch.lock"));
  if (!lock.acquired) {
    return {
      status: "LOCKED_NOOP",
      schema: INDEX_WATCH_SCHEMA,
      statePath: latestPath,
    };
  }

  try {
    const hadPendingNotifications =
      (previousState?.pendingNotifications?.length || 0) > 0;
    let baselineState = previousState;
    let persistedBaselineState = rawPreviousState;
    let priorDelivery = { state: previousState, results: [] };
    if (!args.dryRun && previousState) {
      const deliveryState = previousState.watchSetExpansion
        ? rawPreviousState
        : previousState;
      priorDelivery = deliverPendingNotifications(deliveryState, {
        enabled: args.notify,
        notifier: dependencies.notifier || notifyLocal,
      });
      persistedBaselineState = priorDelivery.state;
      baselineState = previousState.watchSetExpansion
        ? validatePreviousState(priorDelivery.state)
        : priorDelivery.state;
      if (priorDelivery.state !== deliveryState) {
        await atomicWrite(
          latestPath,
          `${JSON.stringify(priorDelivery.state, null, 2)}\n`,
        );
      }
    }

    if (
      !args.dryRun &&
      !args.force &&
      !previousError &&
      !baselineState?.watchSetExpansion &&
      baselineState?.latest?.runDate === args.runDate
    ) {
      const existingNote = await readTextIfExists(args.notePath);
      const expectedNote = mergeManagedNote(
        existingNote,
        renderManagedBlock(baselineState),
        baselineState.latest.runDate,
      );
      const repairedNote = expectedNote !== existingNote;
      if (repairedNote) {
        await atomicWrite(args.notePath, expectedNote, 0o644);
      }
      const replayStatus = repairedNote
        ? "REPAIRED_NOTE"
        : args.notify && hadPendingNotifications
          ? "ALERT_RETRY"
          : "ALREADY_RECORDED";
      const replaySummary = stateSummary(baselineState, replayStatus, {
        notePath: args.notePath,
        statePath: latestPath,
        notifications: priorDelivery.results,
      });
      await atomicWrite(
        join(args.stateDir, "last-run.json"),
        `${JSON.stringify(replaySummary, null, 2)}\n`,
      );
      return replaySummary;
    }

    const snapshot = await collectSnapshot(args, baselineState, dependencies);
    const state = buildState(baselineState, snapshot);
    if (args.dryRun) {
      return stateSummary(state, "DRY_RUN", {
        statePath: latestPath,
        notePath: args.notePath,
      });
    }

    const existingNote = await readTextIfExists(args.notePath);
    const managedBlock = renderManagedBlock(state);
    const nextNote = mergeManagedNote(
      existingNote,
      managedBlock,
      snapshot.runDate,
    );
    await atomicWrite(latestPath, `${JSON.stringify(state, null, 2)}\n`);
    try {
      await atomicWrite(args.notePath, nextNote, 0o644);
    } catch (error) {
      if (persistedBaselineState) {
        await atomicWrite(
          latestPath,
          `${JSON.stringify(persistedBaselineState, null, 2)}\n`,
        );
      } else {
        await unlink(latestPath).catch((unlinkError) => {
          if (unlinkError?.code !== "ENOENT") throw unlinkError;
        });
      }
      throw error;
    }

    const delivery = deliverPendingNotifications(state, {
      enabled: args.notify,
      notifier: dependencies.notifier || notifyLocal,
      alertIds: snapshot.alerts.map((alert) => alert.id),
    });
    if (delivery.state !== state) {
      await atomicWrite(
        latestPath,
        `${JSON.stringify(delivery.state, null, 2)}\n`,
      );
    }
    const summary = stateSummary(delivery.state, "PASS", {
      notePath: args.notePath,
      statePath: latestPath,
      staleLockRecovered: lock.staleRecovered,
      notifications: [...priorDelivery.results, ...delivery.results],
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

export function operationalStatus(state, lastError) {
  if (lastError) return "LAST_RUN_FAILED";
  return state ? "READY" : "NOT_RUN";
}

async function status(args) {
  const state = validatePreviousState(
    await readJsonIfExists(join(args.stateDir, "latest.json")),
  );
  const lastError = await readJsonIfExists(
    join(args.stateDir, "last-error.json"),
  );
  if (!state) {
    return {
      status: operationalStatus(state, lastError),
      schema: INDEX_WATCH_SCHEMA,
      statePath: join(args.stateDir, "latest.json"),
      lastError: lastError
        ? { failedAt: lastError.failedAt, message: lastError.message }
        : null,
    };
  }
  return stateSummary(state, operationalStatus(state, lastError), {
    statePath: join(args.stateDir, "latest.json"),
    notePath: args.notePath,
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
    const result = await runIndexWatch(args);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    await writeLastError(args, error).catch(() => {});
    if (args.notify) {
      notifyLocal({
        id: eventId(["operational_error", args.runId]),
        type: "operational_error",
        message: `Index-watch run failed: ${secretSafeError(error)}`,
      });
    }
    console.error(`Index-watch error: ${secretSafeError(error)}`);
    process.exitCode = 1;
  }
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  await main();
}
