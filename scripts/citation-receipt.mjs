#!/usr/bin/env node

/**
 * Records one observed AI-answer citation run as a receipt in the format that
 * scripts/normalize-geo-citation-receipts.mjs already reads.
 *
 * Input: a JSON observation file (see config/citation-panel.json for prompt ids):
 *   {
 *     "engine": "chatgpt",
 *     "checked_at": "2026-11-27T15:00:00Z",
 *     "results": {
 *       "<prompt-id>": { "status": "measured", "answer_text": "...", "cited_urls": ["https://..."] },
 *       "<prompt-id>": { "status": "failed", "reason": "no answer returned" }
 *     }
 *   }
 *
 * Only derived flags and cited URLs are written. The answer text is read to
 * detect whether Esteban is named, then discarded. A receipt with any missing
 * or failed prompt records errors > 0, and the normalizer never lets it replace
 * a complete measurement.
 */
import { readFile, mkdir, appendFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const DEFAULT_RECEIPTS_DIR = join(homedir(), ".claude/state/geo-citation");
export const PANEL_PATH = resolve(dirname(new URL(import.meta.url).pathname), "../config/citation-panel.json");

const help = `Usage: node scripts/citation-receipt.mjs --observations=PATH [--out=DIR] [--dry-run]

Converts one engine's observed answers into a citation receipt line.
Writes DIR/esteban-<engine>.jsonl (default DIR: ~/.claude/state/geo-citation).
Then run: pnpm seo:citation-normalize

Options:
  --observations=PATH  JSON observation file for one engine and session (required)
  --panel=PATH         Prompt panel (default: config/citation-panel.json)
  --out=DIR            Receipts directory (default: ~/.claude/state/geo-citation)
  --dry-run            Print the receipt without writing it
  --help               Show this help
`;

function option(argv, name) {
  return argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
}

/** A brand mention counts only as a whole phrase in the answer text. */
export function namesBrand(text, brandNames) {
  const haystack = String(text || "").toLowerCase();
  return brandNames.some((name) => haystack.includes(name.toLowerCase()));
}

/** Owned-domain match by exact host or subdomain, never by substring. */
export function isOwnedUrl(url, ownedDomain) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === ownedDomain || host.endsWith(`.${ownedDomain}`);
  } catch {
    return false;
  }
}

/** Score one prompt. A missing or failed answer is an error, never a zero. */
export function scoreResult(obs, panelConfig) {
  if (!obs || obs.status === "failed" || typeof obs.answer_text !== "string" || obs.answer_text.trim() === "") {
    return { status: "failed", runs: 0, named: 0, url_cited: 0, cited_urls: [], reason: obs?.reason || "no answer captured" };
  }
  const citedUrls = Array.isArray(obs.cited_urls) ? obs.cited_urls.filter((url) => typeof url === "string") : [];
  const ownedCited = citedUrls.filter((url) => isOwnedUrl(url, panelConfig.owned_domain));
  return {
    status: "measured",
    runs: 1,
    named: namesBrand(obs.answer_text, panelConfig.brand_names) ? 1 : 0,
    url_cited: ownedCited.length > 0 ? 1 : 0,
    cited_urls: citedUrls.slice(0, 25),
  };
}

/** Build one receipt for one engine and session. Every panel prompt is accounted for. */
export function buildReceipt({ engine, checkedAt, observations, panel }) {
  if (!panel.engines.includes(engine)) throw new Error(`Engine not in panel: ${engine}`);
  const promptIds = panel.prompts.map((prompt) => prompt.id);
  const unknown = Object.keys(observations || {}).filter((id) => !promptIds.includes(id));
  if (unknown.length) throw new Error(`Observation ids not in panel: ${unknown.join(", ")}`);

  const results = Object.fromEntries(promptIds.map((id) => [id, scoreResult(observations?.[id], panel)]));
  const measured = Object.values(results).filter((result) => result.status === "measured");
  const errors = Object.values(results).filter((result) => result.status !== "measured").length;
  return {
    brand: "esteban",
    schema: "esteban-media.citation-receipt.v1",
    source: "manual_capture",
    panel_version: panel.schema,
    engine,
    checked_at: checkedAt,
    errors,
    prompts_total: promptIds.length,
    citation_rate: Number((measured.filter((r) => r.url_cited === 1).length / promptIds.length).toFixed(4)),
    named_rate: Number((measured.filter((r) => r.named === 1).length / promptIds.length).toFixed(4)),
    results,
  };
}

async function main(argv) {
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(help);
    return 0;
  }
  const observationsPath = option(argv, "observations");
  if (!observationsPath) {
    process.stderr.write(`${help}\nerror: --observations is required\n`);
    return 2;
  }
  const panel = JSON.parse(await readFile(option(argv, "panel") || PANEL_PATH, "utf8"));
  const input = JSON.parse(await readFile(resolve(observationsPath), "utf8"));
  if (!input.checked_at || Number.isNaN(Date.parse(input.checked_at))) throw new Error("checked_at must be an ISO timestamp");

  const receipt = buildReceipt({ engine: input.engine, checkedAt: input.checked_at, observations: input.results, panel });
  const line = `${JSON.stringify(receipt)}\n`;
  if (argv.includes("--dry-run")) {
    process.stdout.write(line);
    return 0;
  }
  const outDir = option(argv, "out") || DEFAULT_RECEIPTS_DIR;
  await mkdir(outDir, { recursive: true });
  await appendFile(join(outDir, `esteban-${receipt.engine}.jsonl`), line, "utf8");
  process.stdout.write(JSON.stringify({ engine: receipt.engine, checked_at: receipt.checked_at, errors: receipt.errors, citation_rate: receipt.citation_rate, named_rate: receipt.named_rate, complete: receipt.errors === 0 }) + "\n");
  if (receipt.errors > 0) process.stderr.write(`warning: ${receipt.errors} prompt(s) not measured; this receipt will not replace a complete one\n`);
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; }, (error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
