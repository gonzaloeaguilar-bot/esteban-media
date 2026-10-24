#!/usr/bin/env node

/**
 * Read-only, zero-cost opportunity score for Esteban Moreno Media.
 *
 * This is intentionally not a keyword-difficulty score. It ranks queries we
 * already see in Search Console by their observable reach, click opportunity,
 * and recorded AI-answer citations. A missing input remains missing; it never
 * becomes a made-up vendor metric.
 */

import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const DEFAULT_MEASUREMENT_PATH = join(homedir(), ".local/state/esteban-media-seo-measurement/latest.json");
export const DEFAULT_CITATION_PATH = join(homedir(), ".local/share/portfolio-ops/geo-citations.jsonl");
export const OWNED_DOMAIN = "estebanmorenomedia.com";

const help = `Usage: node scripts/free-capture-score.mjs [report] [options]

Read-only capture scoring from settled Search Console data and the local citation ledger.
This never calls paid keyword/SERP APIs and never changes external systems.

Options:
  --measurement=PATH  Search Console measurement snapshot (default: local latest.json)
  --citations=PATH    Citation JSONL ledger (default: local geo-citations.jsonl)
  --query=TEXT        Score one exact GSC query; otherwise rank all query-page rows
  --json              Emit machine-readable JSON
  --help              Show this help
`;

function option(argv, name) {
  return argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
}

export function parseArgs(argv = process.argv.slice(2)) {
  if (argv.includes("--help") || argv.includes("-h")) return { help: true };
  const command = argv.find((arg) => !arg.startsWith("--")) || "report";
  if (command !== "report") throw new Error(`Unknown command: ${command}`);
  return {
    command,
    measurementPath: resolve(option(argv, "measurement") || DEFAULT_MEASUREMENT_PATH),
    citationPath: resolve(option(argv, "citations") || DEFAULT_CITATION_PATH),
    query: option(argv, "query")?.trim().toLowerCase() || null,
    json: argv.includes("--json"),
  };
}

export function normalise(value) {
  return String(value || "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function meaningfulTokens(value) {
  return new Set(normalise(value).split(" ").filter((token) => token.length > 2));
}

export function citationMatchesQuery(prompt, query) {
  const promptTokens = meaningfulTokens(prompt);
  const queryTokens = meaningfulTokens(query);
  if (!promptTokens.size || !queryTokens.size) return false;
  let overlap = 0;
  for (const token of queryTokens) if (promptTokens.has(token)) overlap += 1;
  return overlap / queryTokens.size >= 0.75;
}

export function isBrandedQuery(query) {
  const value = normalise(query);
  return value.includes("esteban") || value.includes("moreno");
}

export function readCitationRows(text) {
  return text.split("\n").filter(Boolean).flatMap((line) => {
    try { return [JSON.parse(line)]; } catch { return []; }
  }).filter((row) => row.brand === "esteban" && row.status === "ok" && row.citation_coverage === "complete");
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

export function buildCandidates(measurement, citationRows, query = null) {
  const rows = measurement?.rows?.queryPage || [];
  return rows.map((row) => ({
    query: String(row.keys?.[0] || "").trim(),
    page: String(row.keys?.[1] || "").trim(),
    clicks: Number(row.clicks) || 0,
    impressions: Number(row.impressions) || 0,
    ctr: Number(row.ctr) || 0,
    position: Number(row.position),
  })).filter((row) => row.query && row.page && !isBrandedQuery(row.query) && (!query || normalise(row.query) === normalise(query)))
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
    `- Citation observations read: ${citationRows.length}; owned-domain citation matches are a recorded observation, not traffic, causation, or an AI-ranking factor.`,
    `- Sources: settled Search Console snapshot \`${sources.measurementPath}\`; citation ledger \`${sources.citationPath}\`.`,
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

export async function run(args) {
  const [measurementText, citationsText] = await Promise.all([readFile(args.measurementPath, "utf8"), readFile(args.citationPath, "utf8")]);
  const measurement = JSON.parse(measurementText);
  const citations = readCitationRows(citationsText);
  const candidates = buildCandidates(measurement, citations, args.query);
  return { schema: "esteban-media.free-capture-score.v1", generatedAt: new Date().toISOString(), sources: { measurementPath: args.measurementPath, citationPath: args.citationPath, measurementGeneratedAt: measurement.generatedAt || null, measurementWindow: measurement.window || null, citationObservations: citations.length }, candidates, report: buildReport(measurement, citations, candidates, args) };
}

async function main() {
  const args = parseArgs();
  if (args.help) { console.log(help); return; }
  const result = await run(args);
  console.log(args.json ? JSON.stringify(result, null, 2) : result.report);
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) await main();
