#!/usr/bin/env node

/**
 * Free discovery, deliberately separate from the capture score.
 * Google and Bing suggestions are phrasing signals, not volume or difficulty.
 * The resulting terms must first earn settled GSC evidence before they are
 * eligible for a content change.
 */

import { pathToFileURL } from "node:url";

export const DEFAULT_SEEDS = [
  "restaurant video miami",
  "reels editor fort lauderdale",
  "food creator video editing miami",
  "yacht video fort lauderdale",
];

const help = `Usage: node scripts/free-opportunity-discovery.mjs [options]

Collect public Google and Bing suggestion phrases. Suggestions are discovery
signals only: they do not prove demand, ranking difficulty, traffic, or leads.

Options:
  --seed=TEXT       Add a seed (repeatable). Defaults to four current Esteban service seeds.
  --json            Emit JSON (default is a concise report)
  --help            Show this help
`;

export function parseArgs(argv = process.argv.slice(2)) {
  if (argv.includes("--help") || argv.includes("-h")) return { help: true };
  const seeds = argv.filter((arg) => arg.startsWith("--seed=")).map((arg) => arg.slice(7).trim()).filter(Boolean);
  const unsupported = argv.filter((arg) => !arg.startsWith("--seed=") && arg !== "--json");
  if (unsupported.length) throw new Error(`Unknown argument: ${unsupported[0]}`);
  return { seeds: seeds.length ? [...new Set(seeds)] : DEFAULT_SEEDS, json: argv.includes("--json") };
}

function uniqueStrings(values) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))];
}

export async function fetchSuggestions(seed, fetchImpl = fetch) {
  const googleUrl = `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&q=${encodeURIComponent(seed)}`;
  const bingUrl = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(seed)}`;
  const read = async (source, url) => {
    try {
      const response = await fetchImpl(url, { headers: { "user-agent": "EstebanMediaFreeDiscovery/1.0" }, signal: AbortSignal.timeout(8_000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      return { source, status: "ok", suggestions: uniqueStrings(payload?.[1] || []) };
    } catch (error) {
      return { source, status: "unavailable", suggestions: [], reason: error instanceof Error ? error.message : "request failed" };
    }
  };
  const sources = await Promise.all([read("google_autocomplete", googleUrl), read("bing_suggestions", bingUrl)]);
  return { seed, sources, suggestions: uniqueStrings(sources.flatMap((source) => source.suggestions)) };
}

export async function discover(seeds, fetchImpl = fetch) {
  const results = await Promise.all(seeds.map((seed) => fetchSuggestions(seed, fetchImpl)));
  return {
    schema: "esteban-media.free-opportunity-discovery.v1",
    collectedAt: new Date().toISOString(),
    sourceNotice: "Public suggestions are phrase-discovery signals only. Validate with settled Search Console query-page evidence and a reproducible manual SERP-resistance read before changing a page.",
    results,
  };
}

export function renderReport(result) {
  const lines = ["# Esteban free opportunity discovery", "", `- Collected: ${result.collectedAt}.`, `- ${result.sourceNotice}`, ""];
  for (const row of result.results) {
    lines.push(`## ${row.seed}`);
    lines.push("");
    lines.push(`- Sources: ${row.sources.map((source) => `${source.source} (${source.status})`).join(", ")}.`);
    for (const suggestion of row.suggestions) lines.push(`- ${suggestion}`);
    if (!row.suggestions.length) lines.push("- No suggestions returned; this is missing discovery data, not a low-competition finding.");
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs();
  if (args.help) { console.log(help); return; }
  const result = await discover(args.seeds);
  console.log(args.json ? JSON.stringify(result, null, 2) : renderReport(result));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
