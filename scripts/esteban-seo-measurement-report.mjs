#!/usr/bin/env node

/**
 * A small, read-only companion to search-console-index-watch.
 *
 * Index watch answers "are the known URLs indexed?". This script answers
 * "what settled search demand reached which page?" It intentionally asks for
 * `dataState: final` and ends the window three Pacific dates before the run so
 * the weekly decision does not use the newest, incomplete Search Console rows.
 * It never changes Search Console, a business profile, or a public page.
 */

import { chmod, mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { SITE_URL, secretSafeError } from "./search-console-index-watch.mjs";

export const SEO_MEASUREMENT_SCHEMA = "esteban-media.seo-measurement.v1";
export const COMPLETE_LAG_DAYS = 3;
export const DEFAULT_WINDOW_DAYS = 28;

const DEFAULT_TOKEN_PATH = join(homedir(), ".config/geebs/google_oauth_webmasters_token.json");
const DEFAULT_STATE_DIR = join(homedir(), ".local/state/esteban-media-seo-measurement");
const DEFAULT_NOTE_PATH = join(homedir(), "obsidian-wiki/client-esteban-media/wiki/esteban-seo-measurement.md");
const REQUEST_TIMEOUT_MS = 30_000;
const MANAGED_START = "<!-- esteban-media:seo-measurement:start -->";
const MANAGED_END = "<!-- esteban-media:seo-measurement:end -->";

function isoDateInZone(date, timeZone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function shiftIsoDate(value, days) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

export function completeWindow(now = new Date(), days = DEFAULT_WINDOW_DAYS) {
  if (!Number.isInteger(days) || days < 1 || days > 90) {
    throw new Error("Window days must be an integer between 1 and 90");
  }
  const pacificToday = isoDateInZone(now, "America/Los_Angeles");
  const endDate = shiftIsoDate(pacificToday, -COMPLETE_LAG_DAYS);
  return { startDate: shiftIsoDate(endDate, -(days - 1)), endDate, days };
}

function parseArgs(argv = process.argv.slice(2)) {
  const command = argv.find((arg) => !arg.startsWith("--")) || "run";
  const value = (name) => argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
  const now = new Date();
  const days = Number(value("days") || DEFAULT_WINDOW_DAYS);
  const range = completeWindow(now, days);
  return {
    command,
    dryRun: command === "dry-run",
    force: argv.includes("--force"),
    runDate: value("run-date") || isoDateInZone(now, "America/New_York"),
    runId: value("run-id") || now.toISOString(),
    startDate: value("start") || range.startDate,
    endDate: value("end") || range.endDate,
    stateDir: value("state-dir") || process.env.ESTEBAN_MEDIA_SEO_MEASUREMENT_STATE_DIR || DEFAULT_STATE_DIR,
    notePath: value("note") || process.env.ESTEBAN_MEDIA_SEO_MEASUREMENT_NOTE || DEFAULT_NOTE_PATH,
    tokenPath: value("token") || process.env.GSC_TOKEN_PATH || DEFAULT_TOKEN_PATH,
  };
}

async function atomicWrite(path, content, mode = 0o600) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.${Date.now()}.tmp`;
  let handle;
  try {
    handle = await open(temporary, "wx", mode);
    await handle.writeFile(content);
    await handle.sync();
    await handle.close();
    handle = null;
    await chmod(temporary, mode);
    await rename(temporary, path);
  } catch (error) {
    await handle?.close().catch(() => {});
    await unlink(temporary).catch(() => {});
    throw error;
  }
}

async function requestJson(url, options, { fetchImpl = fetch, label = "Search Console request" } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetchImpl(url, { ...options, signal: controller.signal });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || payload?.error) {
      throw new Error(`${label} failed: ${payload?.error?.message || `HTTP ${response.status}`}`);
    }
    return payload;
  } finally {
    clearTimeout(timer);
  }
}

async function accessToken(tokenPath, dependencies) {
  const token = JSON.parse(await readFile(tokenPath, "utf8"));
  for (const field of ["client_id", "client_secret", "refresh_token"]) {
    if (!token[field]) throw new Error(`Search Console credential file is missing ${field}`);
  }
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
  if (!payload.access_token) throw new Error("Search Console credential refresh returned no access token");
  return payload.access_token;
}

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normaliseRows(payload, dimensions) {
  return (payload.rows || []).map((row) => ({
    keys: dimensions.map((_, index) => String(row.keys?.[index] || "")),
    clicks: number(row.clicks),
    impressions: number(row.impressions),
    ctr: number(row.ctr),
    position: number(row.position),
  }));
}

export function summarizeRows(rows, dimension) {
  return [...rows]
    .sort((left, right) => right.impressions - left.impressions || right.clicks - left.clicks || left.position - right.position)
    .slice(0, 20)
    .map((row) => ({ term: row.keys[0], clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position, dimension }));
}

export function ctrCandidates(queryRows, minimumImpressions = 10) {
  return queryRows
    .filter((row) => row.impressions >= minimumImpressions && row.clicks === 0)
    .sort((left, right) => right.impressions - left.impressions || left.position - right.position)
    .slice(0, 10)
    .map((row) => ({ query: row.keys[0], impressions: row.impressions, position: row.position }));
}

function markdownTable(rows, firstHeader) {
  if (!rows.length) return "No rows returned for this completed window.";
  const format = (value) => (typeof value === "number" ? (Number.isInteger(value) ? String(value) : value.toFixed(2)) : value);
  return [
    `| ${firstHeader} | Clicks | Impressions | CTR | Position |`,
    "|---|---:|---:|---:|---:|",
    ...rows.map((row) => `| ${String(row.term).replaceAll("|", "\\|")} | ${format(row.clicks)} | ${format(row.impressions)} | ${format(row.ctr * 100)}% | ${format(row.position)} |`),
  ].join("\n");
}

export function renderReport(snapshot) {
  const querySummary = summarizeRows(snapshot.rows.query, "query");
  const pageSummary = summarizeRows(snapshot.rows.page, "page");
  const candidates = ctrCandidates(snapshot.rows.query);
  const candidateBlock = candidates.length
    ? candidates.map((row) => `- \`${row.query}\` — ${row.impressions} impressions, 0 clicks, average position ${row.position.toFixed(2)}. Inspect the existing landing page before changing title/copy; this is an observation, not proof of a CTR cause.`).join("\n")
    : "- None at the 10-impression / zero-click threshold. Sparse data is not a content instruction.";
  return `${MANAGED_START}
## Settled Search Console decision report — ${snapshot.runDate}

- Property: \`${SITE_URL}\`
- Completed window: **${snapshot.window.startDate} through ${snapshot.window.endDate}** (${snapshot.window.days} days; end held back ${COMPLETE_LAG_DAYS} Pacific calendar dates)
- Source: authenticated Search Console API with \`dataState: final\`; generated ${snapshot.generatedAt}.
- Rows: ${snapshot.rows.query.length} query, ${snapshot.rows.page.length} page, ${snapshot.rows.queryPage.length} query-page.
- Meaning: this report measures Google web-search impressions/clicks only. It does not measure Maps rank, AI citations, leads, or release impact.

### Top queries

${markdownTable(querySummary, "Query")}

### Top landing pages

${markdownTable(pageSummary, "Page")}

### Observation queue

${candidateBlock}

### Required decision discipline

Choose at most one existing canonical page to improve from this report. Record the release date, then compare like-for-like completed windows after at least 28 days. Do not create a new page from a sparse query alone.
${MANAGED_END}
`;
}

export function mergeManagedNote(existing, block) {
  const start = existing.indexOf(MANAGED_START);
  const end = existing.indexOf(MANAGED_END);
  if (start === -1 && end === -1) return `${existing.trimEnd()}\n\n${block}`.trimStart() + "\n";
  if (start < 0 || end < start) throw new Error("SEO measurement note has incomplete managed markers");
  return `${existing.slice(0, start)}${block}${existing.slice(end + MANAGED_END.length)}`;
}

export async function collectMeasurement(args, dependencies = {}) {
  const token = await accessToken(args.tokenPath, dependencies);
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const query = async (dimensions) => {
    const payload = await requestJson(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ startDate: args.startDate, endDate: args.endDate, dimensions, type: "web", dataState: "final", rowLimit: 25_000 }),
    }, { ...dependencies, label: `Search Console final ${dimensions.join("+")} query` });
    return normaliseRows(payload, dimensions);
  };
  const [queryRows, pageRows, queryPageRows] = await Promise.all([query(["query"]), query(["page"]), query(["query", "page"])]);
  return {
    schema: SEO_MEASUREMENT_SCHEMA,
    runId: args.runId,
    runDate: args.runDate,
    generatedAt: new Date().toISOString(),
    siteUrl: SITE_URL,
    window: { startDate: args.startDate, endDate: args.endDate, days: Math.round((Date.parse(`${args.endDate}T00:00:00Z`) - Date.parse(`${args.startDate}T00:00:00Z`)) / 86_400_000) + 1 },
    source: { api: "search-console", dataState: "final", searchType: "web" },
    rows: { query: queryRows, page: pageRows, queryPage: queryPageRows },
  };
}

export async function runMeasurement(args, dependencies = {}) {
  await mkdir(args.stateDir, { recursive: true });
  const latestPath = join(args.stateDir, "latest.json");
  let previous = null;
  try { previous = JSON.parse(await readFile(latestPath, "utf8")); } catch (error) { if (error?.code !== "ENOENT") throw error; }
  if (!args.force && previous?.runDate === args.runDate && !args.dryRun) {
    return { status: "ALREADY_RECORDED", statePath: latestPath, notePath: args.notePath, window: previous.window };
  }
  const snapshot = await collectMeasurement(args, dependencies);
  if (args.dryRun) return { status: "DRY_RUN", snapshot };
  const block = renderReport(snapshot);
  let existing = "";
  try { existing = await readFile(args.notePath, "utf8"); } catch (error) { if (error?.code !== "ENOENT") throw error; }
  await atomicWrite(latestPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  await atomicWrite(args.notePath, mergeManagedNote(existing, block), 0o644);
  await atomicWrite(join(args.stateDir, "last-run.json"), `${JSON.stringify({ status: "PASS", runId: args.runId, runDate: args.runDate, statePath: latestPath, notePath: args.notePath, rows: Object.fromEntries(Object.entries(snapshot.rows).map(([key, value]) => [key, value.length])) }, null, 2)}\n`);
  return { status: "PASS", statePath: latestPath, notePath: args.notePath, window: snapshot.window, rows: Object.fromEntries(Object.entries(snapshot.rows).map(([key, value]) => [key, value.length])) };
}

async function main() {
  const args = parseArgs();
  if (!new Set(["run", "dry-run", "status"]).has(args.command)) throw new Error(`Unknown command: ${args.command}`);
  if (args.command === "status") {
    try { console.log(await readFile(join(args.stateDir, "last-run.json"), "utf8")); } catch (error) { if (error?.code === "ENOENT") console.log(JSON.stringify({ status: "NOT_RUN" })); else throw error; }
    return;
  }
  try { console.log(JSON.stringify(await runMeasurement(args), null, 2)); }
  catch (error) {
    await atomicWrite(join(args.stateDir, "last-error.json"), `${JSON.stringify({ failedAt: new Date().toISOString(), message: secretSafeError(error) }, null, 2)}\n`).catch(() => {});
    throw error;
  }
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) await main();
