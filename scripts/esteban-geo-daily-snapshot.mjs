#!/usr/bin/env node

/** Produce a read-only, source-separated daily GEO receipt for Esteban Media. */
import { mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { homedir } from "node:os";
import { pathToFileURL } from "node:url";

export const GEO_DAILY_SNAPSHOT_SCHEMA = "esteban-media.geo-daily-snapshot.v1";
const HOME = homedir();
const DEFAULT_STATE_DIR = join(HOME, ".local/state/esteban-media-geo-daily");
const value = (argv, key) => argv.find((arg) => arg.startsWith(`--${key}=`))?.slice(key.length + 3);

export function parseArgs(argv = process.argv.slice(2)) {
  const command = argv.find((arg) => !arg.startsWith("--")) || "run";
  const stateDir = value(argv, "state-dir") || process.env.ESTEBAN_MEDIA_GEO_DAILY_STATE_DIR || DEFAULT_STATE_DIR;
  return { command, stateDir, output: value(argv, "output") || join(stateDir, "latest.json"), date: value(argv, "date") || new Date().toISOString().slice(0, 10), generatedAt: value(argv, "now") || new Date().toISOString(), maxCitationAgeHours: Number(value(argv, "max-citation-age-hours") || 72), measurement: value(argv, "measurement") || join(HOME, ".local/state/esteban-media-seo-measurement/latest.json"), citations: value(argv, "citations") || join(HOME, ".local/state/esteban-media-geo-citation/latest-successful.json"), graph: value(argv, "graph") || join(HOME, ".local/state/esteban-media-geo-graph/latest.json"), metricool: value(argv, "metricool") || join(HOME, ".claude/state/cto-boundary-growth-system/metricool-proof-latest.json"), gbp: value(argv, "gbp") || join(HOME, ".local/state/esteban-media-gbp/latest.json"), bing: value(argv, "bing") || join(HOME, ".local/state/esteban-media-bing/latest.json"), leads: value(argv, "leads") || join(HOME, ".local/state/esteban-media-lead-outcomes/latest.json") };
}

async function readJson(path) { try { return { value: JSON.parse(await readFile(path, "utf8")), path }; } catch (error) { return { value: null, path, error: error?.code === "ENOENT" ? "missing" : "invalid_json" }; } }
const missing = (path, reason) => ({ status: "unmeasured", reason, path });
const ageHours = (at, generatedAt) => { const age = (Date.parse(generatedAt) - Date.parse(at)) / 3_600_000; return Number.isFinite(age) && age >= 0 ? Number(age.toFixed(2)) : null; };

export function summarizeMeasurement(input) {
  if (!input?.schema?.startsWith("esteban-media.seo-measurement")) return missing(input?.path || null, "missing_or_invalid_gsc_receipt");
  return { status: "observed", path: input.path, generated_at: input.generatedAt || null, run_id: input.runId || null, settled_window: input.window || null, settled_rows: Object.fromEntries(Object.entries(input.rows || {}).map(([key, rows]) => [key, Array.isArray(rows) ? rows.length : 0])), provisional_window: input.provisional?.window || null };
}

export function summarizeCitations(input, generatedAt, maxAgeHours) {
  if (input?.schema !== "esteban-media.geo-citation-successful-receipts.v1") return missing(input?.path || null, "missing_or_invalid_citation_receipt");
  const engines = (input.engines || []).map((engine) => ({ engine: engine.engine || "unknown", checked_at: engine.checked_at || null, citation_rate: engine.citation_rate ?? null, named_rate: engine.named_rate ?? null }));
  const latest = engines.map((engine) => engine.checked_at).filter(Boolean).sort().at(-1) || null;
  const receiptAgeHours = latest ? ageHours(latest, generatedAt) : null;
  if (!engines.length) return { ...missing(input.path, "no_successful_engine_receipts"), generated_at: input.generated_at || null, engines: [] };
  return { status: receiptAgeHours !== null && receiptAgeHours <= maxAgeHours ? "observed" : "stale", path: input.path, generated_at: input.generated_at || null, latest_checked_at: latest, age_hours: receiptAgeHours, max_age_hours: maxAgeHours, engines, discarded_retries: (input.discarded_retries || []).length };
}

export function summarizeGraph(input, generatedAt) {
  if (input?.schema !== "esteban-media.local-commercial-graph.v1") return missing(input?.path || null, "missing_or_invalid_graph_receipt");
  const clusters = input.clusters || [];
  const states = Object.fromEntries(clusters.reduce((all, cluster) => all.set(cluster.state || "unknown", (all.get(cluster.state || "unknown") || 0) + 1), new Map()));
  return { status: "observed", path: input.path, generated_at: input.generated_at || null, age_hours: ageHours(input.generated_at, generatedAt), clusters: clusters.length, states };
}

export function summarizeMetricool(input) {
  if (!input || typeof input !== "object") return missing(input?.path || null, "missing_or_invalid_metricool_receipt");
  const esteban = input.brands?.esteban;
  if (!esteban) return { ...missing(input.path, "esteban_not_in_metricool_brand_mapping"), checked_at: input.checked_at || null, available_brands: Object.keys(input.brands || {}).sort() };
  return { status: esteban.status === "api_ok" ? "observed" : "unmeasured", path: input.path, checked_at: input.checked_at || null, api_status: esteban.status || "unknown", scheduled_count: esteban.scheduled_count ?? null, networks: esteban.networks || {}, performance_status: "unmeasured", performance_reason: "scheduled_post_receipt_is_not_platform_performance" };
}

function genericSource(input, name) { if (!input || typeof input !== "object" || input.read_error) return missing(input?.path || null, `missing_${name}_receipt`); return { status: input.status === "observed" ? "observed" : "unmeasured", path: input.path, observed_at: input.observed_at || input.generated_at || input.checked_at || null, reason: input.reason || null }; }

export function buildSnapshot(inputs, options) {
  return { schema: GEO_DAILY_SNAPSHOT_SCHEMA, brand: "esteban", date: options.date, generated_at: options.generatedAt, mode: "read_only_source_join", no_blended_score: true, sources: { gsc: summarizeMeasurement(inputs.measurement), citations: summarizeCitations(inputs.citations, options.generatedAt, options.maxCitationAgeHours), graph: summarizeGraph(inputs.graph, options.generatedAt), metricool: summarizeMetricool(inputs.metricool), gbp: genericSource(inputs.gbp, "gbp"), bing: genericSource(inputs.bing, "bing"), lead_outcomes: genericSource(inputs.leads, "lead_outcomes") }, interpretation: "Each source is independent. Observed citation, visibility, scheduled-post, or technical data does not prove traffic, inquiry, qualification, booking, win, or revenue." };
}

async function atomicWrite(path, content) { await mkdir(dirname(path), { recursive: true }); const temporary = `${path}.${process.pid}.${Date.now()}.tmp`; let handle; try { handle = await open(temporary, "wx", 0o600); await handle.writeFile(content); await handle.sync(); await handle.close(); handle = null; await rename(temporary, path); } catch (error) { await handle?.close().catch(() => {}); await unlink(temporary).catch(() => {}); throw error; } }

export async function runSnapshot(options = parseArgs()) {
  const names = ["measurement", "citations", "graph", "metricool", "gbp", "bing", "leads"];
  const inputs = Object.fromEntries(await Promise.all(names.map(async (name) => { const read = await readJson(options[name]); return [name, read.value ? { ...read.value, path: read.path } : { path: read.path, read_error: read.error }]; })));
  const snapshot = buildSnapshot(inputs, options);
  if (options.command === "status") return snapshot;
  const json = `${JSON.stringify(snapshot, null, 2)}\n`;
  await atomicWrite(options.output, json); await atomicWrite(join(options.stateDir, `${options.date}.json`), json);
  return snapshot;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) runSnapshot().then((snapshot) => console.log(JSON.stringify({ schema: snapshot.schema, date: snapshot.date, statuses: Object.fromEntries(Object.entries(snapshot.sources).map(([key, source]) => [key, source.status])) }, null, 2))).catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
