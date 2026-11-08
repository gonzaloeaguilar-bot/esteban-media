#!/usr/bin/env node

/**
 * Read-only, zero-cost opportunity score for Esteban Moreno Media.
 *
 * This is intentionally not a keyword-difficulty score. It ranks queries we
 * already see in Search Console by their observable reach, click opportunity,
 * and recorded AI-answer citations. A missing input remains missing; it never
 * becomes a made-up vendor metric.
 */

import { mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const DEFAULT_MEASUREMENT_PATH = join(homedir(), ".local/state/esteban-media-seo-measurement/latest.json");
export const DEFAULT_CITATION_PATH = join(homedir(), ".local/share/portfolio-ops/geo-citations.jsonl");
export const DEFAULT_WRONG_INTENT_EXCLUSIONS_PATH = join(homedir(), ".local/state/esteban-media-seo-measurement/wrong-intent-exclusions.json");
export const OWNED_DOMAIN = "estebanmorenomedia.com";
export const MAX_CITATION_AGE_DAYS = 14;

const help = `Usage: node scripts/free-capture-score.mjs [report] [options]

Read-only capture scoring from settled Search Console data and the local citation ledger.
This never calls paid keyword/SERP APIs and never changes external systems.

Options:
  --measurement=PATH  Search Console measurement snapshot (default: local latest.json)
  --citations=PATH    Citation JSONL ledger (default: local geo-citations.jsonl)
  --query=TEXT        Score one exact GSC query; otherwise rank all query-page rows
  --exclusions=PATH   Persisted wrong-intent exclusion ledger (default: local state)
  exclude --query=TEXT --reason=TEXT
                      Persist an exact normalized wrong-intent query exclusion
  include --query=TEXT
                      Remove an exact normalized wrong-intent query exclusion
  list-exclusions     Print the persisted wrong-intent query exclusions
  --json              Emit machine-readable JSON
  --help              Show this help
`;

function option(argv, name) {
  return argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
}

export function parseArgs(argv = process.argv.slice(2)) {
  if (argv.includes("--help") || argv.includes("-h")) return { help: true };
  const command = argv.find((arg) => !arg.startsWith("--")) || "report";
  if (!["report", "exclude", "include", "list-exclusions"].includes(command)) throw new Error(`Unknown command: ${command}`);
  return {
    command,
    measurementPath: resolve(option(argv, "measurement") || DEFAULT_MEASUREMENT_PATH),
    citationPath: resolve(option(argv, "citations") || DEFAULT_CITATION_PATH),
    exclusionsPath: resolve(option(argv, "exclusions") || DEFAULT_WRONG_INTENT_EXCLUSIONS_PATH),
    query: option(argv, "query")?.trim().toLowerCase() || null,
    reason: option(argv, "reason")?.trim() || null,
    json: argv.includes("--json"),
  };
}

export function normalise(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function ownedCitationUrl(value, ownedDomain = OWNED_DOMAIN) {
  try {
    const host = new URL(value).hostname.toLowerCase().replace(/^www\./, "");
    return host === ownedDomain || host.endsWith(`.${ownedDomain}`);
  } catch {
    return false;
  }
}

export function citationMatchesQuery(prompt, query) {
  const normalizedPrompt = normalise(prompt);
  const normalizedQuery = normalise(query);
  return Boolean(normalizedPrompt && normalizedQuery && normalizedPrompt === normalizedQuery);
}

export function isBrandedQuery(query) {
  const value = normalise(query);
  return value.includes("esteban") || value.includes("moreno");
}

export function isFreshCompleteOwnedCitation(row, { now = new Date().toISOString(), maxCitationAgeDays = MAX_CITATION_AGE_DAYS } = {}) {
  const observedAt = Date.parse(row?.ts || row?.observed_at || "");
  const current = Date.parse(now);
  const ageDays = (current - observedAt) / 86400000;
  return row?.brand === "esteban"
    && String(row.status || "").toLowerCase() === "ok"
    && String(row.citation_coverage || "").toLowerCase() === "complete"
    && row.our_citation === true
    && Number.isFinite(observedAt)
    && Number.isFinite(current)
    && ageDays >= 0
    && ageDays <= maxCitationAgeDays
    && Array.isArray(row.cited_urls)
    && row.cited_urls.some((url) => ownedCitationUrl(url));
}

export function readCitationRows(text, options = {}) {
  return text.split("\n").filter(Boolean).flatMap((line) => {
    try { return [JSON.parse(line)]; } catch { return []; }
  }).filter((row) => isFreshCompleteOwnedCitation(row, options));
}

function validExclusions(value) {
  const rows = Array.isArray(value?.exclusions) ? value.exclusions : [];
  const unique = new Map();
  for (const row of rows) {
    const normalizedQuery = normalise(row?.normalizedQuery || row?.query);
    if (!normalizedQuery || !String(row?.reason || "").trim()) continue;
    unique.set(normalizedQuery, {
      query: String(row.query || normalizedQuery).trim(), normalizedQuery,
      reason: String(row.reason).trim(), excludedAt: row.excludedAt || null,
    });
  }
  return [...unique.values()].sort((left, right) => left.normalizedQuery.localeCompare(right.normalizedQuery));
}

export async function readWrongIntentExclusions(path) {
  try {
    return validExclusions(JSON.parse(await readFile(path, "utf8")));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw new Error(`Could not read wrong-intent exclusions at ${path}: ${error.message}`);
  }
}

async function atomicWrite(path, content) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.${Date.now()}.tmp`;
  let handle;
  try {
    handle = await open(temporary, "wx", 0o600);
    await handle.writeFile(content); await handle.sync(); await handle.close(); handle = null;
    await rename(temporary, path);
  } catch (error) {
    await handle?.close().catch(() => {}); await unlink(temporary).catch(() => {}); throw error;
  }
}

export async function writeWrongIntentExclusions(path, exclusions, now = new Date().toISOString()) {
  const payload = { schema: "esteban-media.wrong-intent-exclusions.v1", updatedAt: now, exclusions: validExclusions({ exclusions }) };
  await atomicWrite(path, `${JSON.stringify(payload, null, 2)}\n`);
  return payload.exclusions;
}

export function isWrongIntentExcluded(query, exclusions) {
  const normalizedQuery = normalise(query);
  return exclusions.some((entry) => entry.normalizedQuery === normalizedQuery);
}

export function scoreParts(row, citationRows) {
  const impressions = Number(row.impressions) || 0;
  const clicks = Number(row.clicks) || 0;
  const position = Number(row.position);
  const demand = impressions >= 10 ? 2 : impressions >= 1 ? 1 : 0;
  const reachability = Number.isFinite(position) && position <= 10 ? 3 : Number.isFinite(position) && position <= 20 ? 2 : Number.isFinite(position) && position <= 30 ? 1 : 0;
  const ctrOpportunity = impressions >= 10 && clicks === 0 ? 1 : 0;
  const matchedCitations = citationRows.filter((citation) => citation.our_citation === true && citationMatchesQuery(citation.prompt, row.query));
  const citation = matchedCitations.length >= 2 ? 2 : matchedCitations.length === 1 ? 1 : 0;
  return { demand, reachability, ctrOpportunity, citation, serpResistance: "unmeasured", total: demand + reachability + ctrOpportunity + citation, matchedCitations };
}

export function recommendation(total, candidate = {}) {
  if (Number(candidate.position) <= 3 && Number(candidate.clicks) === 0) return "validate SERP and intent — near-top position with zero clicks is not an expansion signal";
  if (total >= 7) return "capture candidate — inspect the existing canonical page and SERP before changing it";
  if (total >= 5) return "strengthen existing page — do not create a new URL yet";
  return "hold — insufficient owned evidence for a content change";
}

export function buildCandidates(measurement, citationRows, query = null, wrongIntentExclusions = []) {
  const rows = measurement?.rows?.queryPage || [];
  return rows.map((row) => ({
    query: String(row.keys?.[0] || "").trim(),
    page: String(row.keys?.[1] || "").trim(),
    clicks: Number(row.clicks) || 0,
    impressions: Number(row.impressions) || 0,
    ctr: Number(row.ctr) || 0,
    position: Number(row.position),
  })).filter((row) => row.query && row.page && !isBrandedQuery(row.query) && !isWrongIntentExcluded(row.query, wrongIntentExclusions) && (!query || normalise(row.query) === normalise(query)))
    .map((row) => ({ ...row, score: scoreParts(row, citationRows) }))
    .sort((left, right) => right.score.total - left.score.total || right.impressions - left.impressions || left.position - right.position)
    .slice(0, query ? 10 : 25);
}

export function buildReport(measurement, citationRows, candidates, sources) {
  const window = measurement?.window || {};
  const generatedAt = measurement?.generatedAt || "unknown";
  const lines = [
    "# Esteban free capture score",
    "",
    `- Search Console window: ${window.startDate || "unknown"} through ${window.endDate || "unknown"}; generated ${generatedAt}.`,
    `- Eligible citation observations read: ${citationRows.length}; each is fresh (14 days or less), complete, cites the owned domain, and must exactly normalized-match the query. This is a recorded observation, not traffic, causation, or an AI-ranking factor.`,
    `- Wrong-intent exclusions loaded: ${sources.wrongIntentExclusions || 0}; only exact normalized query matches are held.`,
    `- Sources: settled Search Console snapshot \`${sources.measurementPath}\`; citation ledger \`${sources.citationPath}\`; wrong-intent ledger \`${sources.exclusionsPath}\`.`,
    "- This is a 0–10 capture score, not a proprietary difficulty metric. SERP resistance is unmeasured until a reproducible, separately sourced SERP input is supplied.",
    "",
    "| Query | Page | Impr. | Clicks | Pos. | Capture | Decision |",
    "|---|---|---:|---:|---:|---:|---|",
  ];
  for (const candidate of candidates) {
    lines.push(`| ${candidate.query.replaceAll("|", "\\|")} | ${candidate.page.replace("https://estebanmorenomedia.com", "").replaceAll("|", "\\|")} | ${candidate.impressions} | ${candidate.clicks} | ${Number.isFinite(candidate.position) ? candidate.position.toFixed(1) : "n/a"} | ${candidate.score.total}/10 | ${recommendation(candidate.score.total, candidate)} |`);
  }
  if (!candidates.length) lines.push("| No matching settled query-page rows | — | — | — | — | — | Run the settled measurement first or choose a query present in it. |");
  return `${lines.join("\n")}\n`;
}

export async function run(args, { now = new Date().toISOString() } = {}) {
  const [measurementText, citationsText, wrongIntentExclusions] = await Promise.all([readFile(args.measurementPath, "utf8"), readFile(args.citationPath, "utf8"), readWrongIntentExclusions(args.exclusionsPath)]);
  const measurement = JSON.parse(measurementText);
  const citations = readCitationRows(citationsText, { now });
  const candidates = buildCandidates(measurement, citations, args.query, wrongIntentExclusions);
  const sources = { measurementPath: args.measurementPath, citationPath: args.citationPath, exclusionsPath: args.exclusionsPath, measurementGeneratedAt: measurement.generatedAt || null, measurementWindow: measurement.window || null, citationObservations: citations.length, wrongIntentExclusions: wrongIntentExclusions.length };
  return { schema: "esteban-media.free-capture-score.v1", generatedAt: now, sources, candidates, report: buildReport(measurement, citations, candidates, sources) };
}

async function main() {
  const args = parseArgs();
  if (args.help) { console.log(help); return; }
  if (args.command === "list-exclusions") {
    const exclusions = await readWrongIntentExclusions(args.exclusionsPath);
    console.log(args.json ? JSON.stringify({ exclusions }, null, 2) : `${exclusions.map((entry) => `${entry.query}\t${entry.reason}`).join("\n")}\n`);
    return;
  }
  if (args.command === "exclude" || args.command === "include") {
    const normalizedQuery = normalise(args.query);
    if (!normalizedQuery) throw new Error(`${args.command} requires --query=TEXT`);
    if (args.command === "exclude" && !args.reason) throw new Error("exclude requires --reason=TEXT");
    const existing = await readWrongIntentExclusions(args.exclusionsPath);
    const retained = existing.filter((entry) => entry.normalizedQuery !== normalizedQuery);
    const exclusions = args.command === "exclude"
      ? [...retained, { query: args.query, normalizedQuery, reason: args.reason, excludedAt: new Date().toISOString() }]
      : retained;
    const saved = await writeWrongIntentExclusions(args.exclusionsPath, exclusions);
    console.log(args.json ? JSON.stringify({ exclusions: saved }, null, 2) : `${args.command === "exclude" ? "Excluded" : "Included"} exact normalized query: ${normalizedQuery}\n`);
    return;
  }
  const result = await run(args);
  console.log(args.json ? JSON.stringify(result, null, 2) : result.report);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) await main();
