#!/usr/bin/env node

/**
 * Read-only GEO capture receipt. It keeps engine observations separate from
 * search and lead outcomes, so a citation can never be printed as a lead.
 */
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const option = (argv, key) => argv.find((arg) => arg.startsWith(`--${key}=`))?.slice(key.length + 3);
const readJson = async (path) => {
  try { return JSON.parse(await readFile(path, "utf8")); } catch { return null; }
};

export function buildReceipt({ citations, snapshot, generatedAt }) {
  const engines = citations?.schema === "esteban-media.geo-citation-successful-receipts.v1"
    ? (citations.engines || []).map((engine) => ({
      engine: engine.engine || "unknown",
      checked_at: engine.checked_at || null,
      citation_rate: engine.citation_rate ?? null,
      named_rate: engine.named_rate ?? null,
      prompts: Object.fromEntries(Object.entries(engine.prompts || {}).map(([id, prompt]) => [id, {
        status: prompt?.status || "unmeasured",
        runs: prompt?.runs ?? 0,
        named: prompt?.named ?? 0,
        url_cited: prompt?.url_cited ?? 0,
      }])),
    }))
    : [];
  const outcomes = snapshot?.sources?.lead_outcomes || { status: "unmeasured", reason: "missing_geo_snapshot" };
  return {
    schema: "esteban-media.geo-capture-receipt.v1",
    generated_at: generatedAt,
    mode: "read_only",
    engines,
    lead_outcomes: { status: outcomes.status || "unmeasured", reason: outcomes.reason || null },
    interpretation: "Each engine is reported separately. Citation or mention observations do not prove clicks, inquiries, qualification, bookings, wins, or revenue.",
  };
}

async function main() {
  const home = homedir();
  const citationsPath = option(process.argv.slice(2), "citations") || join(home, ".local/state/esteban-media-geo-citation/latest-successful.json");
  const snapshotPath = option(process.argv.slice(2), "snapshot") || join(home, ".local/state/esteban-media-geo-daily/latest.json");
  const generatedAt = option(process.argv.slice(2), "now") || new Date().toISOString();
  console.log(JSON.stringify(buildReceipt({ citations: await readJson(citationsPath), snapshot: await readJson(snapshotPath), generatedAt }), null, 2));
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
