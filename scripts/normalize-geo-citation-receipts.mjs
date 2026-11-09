#!/usr/bin/env node

/**
 * Builds a source-of-truth snapshot from the latest *successful* Esteban
 * citation probe per engine. Failed or unmeasured retries are retained as
 * diagnostics but can never replace a valid measurement.
 */
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { homedir } from "node:os";

export const DEFAULT_RECEIPTS_DIR = join(homedir(), ".claude/state/geo-citation");
export const DEFAULT_OUTPUT = join(homedir(), ".local/state/esteban-media-geo-citation/latest-successful.json");

function option(argv, key) { return argv.find((arg) => arg.startsWith(`--${key}=`))?.slice(key.length + 3); }

export function successful(receipt) {
  return receipt?.brand === "esteban"
    && Number(receipt?.errors) === 0
    && typeof receipt?.checked_at === "string"
    && Object.values(receipt?.results || {}).some((result) => result?.status === "measured");
}

export function selectLatestSuccessful(receipts) {
  const latest = new Map();
  for (const receipt of receipts.filter(successful)) {
    const previous = latest.get(receipt.engine);
    if (!previous || receipt.checked_at > previous.checked_at) latest.set(receipt.engine, receipt);
  }
  return [...latest.values()].sort((a, b) => a.engine.localeCompare(b.engine));
}

export async function loadReceipts(directory) {
  const files = (await readdir(directory)).filter((name) => /^esteban(?:-[a-z]+)?\.jsonl$/.test(name));
  const loaded = await Promise.all(files.map(async (name) => {
    const path = join(directory, name);
    const rows = (await readFile(path, "utf8")).split("\n").flatMap((line) => {
      try { return line ? [JSON.parse(line)] : []; } catch { return []; }
    });
    return rows;
  }));
  return loaded.flat();
}

export function buildSnapshot(receipts, generatedAt = new Date().toISOString()) {
  const successes = selectLatestSuccessful(receipts);
  const engines = successes.map((receipt) => ({
    engine: receipt.engine,
    checked_at: receipt.checked_at,
    citation_rate: receipt.citation_rate,
    named_rate: receipt.named_rate,
    prompts: Object.fromEntries(Object.entries(receipt.results || {}).map(([id, result]) => [id, {
      status: result?.status || "unmeasured",
      runs: result?.runs || 0,
      named: result?.named || 0,
      url_cited: result?.url_cited || 0,
      cited_urls: result?.cited_urls || [],
    }])),
  }));
  const discarded = receipts.filter((receipt) => receipt?.brand === "esteban" && !successful(receipt))
    .map((receipt) => ({ engine: receipt.engine || "unknown", checked_at: receipt.checked_at || null, errors: receipt.errors ?? null }));
  return { schema: "esteban-media.geo-citation-successful-receipts.v1", generated_at: generatedAt, engines, discarded_retries: discarded };
}

async function atomicWrite(path, content) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporary, content, { mode: 0o600 });
  await rename(temporary, path);
}

async function main() {
  const directory = resolve(option(process.argv.slice(2), "receipts") || DEFAULT_RECEIPTS_DIR);
  const output = resolve(option(process.argv.slice(2), "output") || DEFAULT_OUTPUT);
  const snapshot = buildSnapshot(await loadReceipts(directory));
  await atomicWrite(output, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(`Normalized ${snapshot.engines.length} successful engine receipt(s) to ${output}`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
