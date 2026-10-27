#!/usr/bin/env node

/**
 * Draft-only local-commercial evidence graph for Esteban Moreno Media.
 *
 * It composes the existing demand-content farm rather than replacing it.
 * No page, lead, citation, ranking, or revenue is created or claimed here.
 */
import { mkdir, open, rename, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import { runFarm } from "./esteban-demand-content-farm.mjs";

export const GRAPH_SCHEMA = "esteban-media.local-commercial-graph.v1";
const ROOT = join(homedir(), ".local/share/portfolio-ops");
const DEFAULT_STATE = join(homedir(), ".local/state/esteban-media-geo-graph/latest.json");
const ORIGIN = "https://estebanmorenomedia.com";

function args(argv = process.argv.slice(2)) {
  const value = (key) => argv.find((arg) => arg.startsWith(`--${key}=`))?.slice(key.length + 3);
  return {
    dryRun: argv.includes("--dry-run"),
    state: value("state") || DEFAULT_STATE,
    coverage: value("coverage") || join(ROOT, "esteban-coverage/latest.json"),
    semrush: value("semrush") || join(ROOT, "semrush-ui.jsonl"),
    citations: value("citations") || join(ROOT, "geo-citations.jsonl"),
    guideUrl: value("guide-url") || `${ORIGIN}/es/guias`,
    origin: value("origin") || ORIGIN,
  };
}

async function atomicWrite(path, content) {
  await mkdir(dirname(path), { recursive: true });
  const temp = `${path}.${process.pid}.${Date.now()}.tmp`;
  let handle;
  try {
    handle = await open(temp, "wx", 0o600);
    await handle.writeFile(content); await handle.sync(); await handle.close(); handle = null;
    await rename(temp, path);
  } catch (error) {
    await handle?.close().catch(() => {}); await unlink(temp).catch(() => {}); throw error;
  }
}

export async function conversionRoute(target, { origin = ORIGIN, fetchImpl = fetch } = {}) {
  if (!target?.startsWith("/")) return { status: "needs_evidence", reason: "no canonical owned target" };
  try {
    const response = await fetchImpl(new URL(target, origin), { headers: { "user-agent": "EstebanGeoGraph/1.0" } });
    if (!response.ok) return { status: "needs_evidence", reason: `route HTTP ${response.status}` };
    const html = await response.text();
    const hasContact = /href=["'](?:mailto:|tel:|\/contact(?:o)?(?:["'#?\/]))/i.test(html);
    return hasContact
      ? { status: "observed", url: new URL(target, origin).toString(), route: "visible_contact_action" }
      : { status: "needs_evidence", url: new URL(target, origin).toString(), reason: "no visible contact action in raw HTML" };
  } catch (error) { return { status: "needs_evidence", reason: `route transport unavailable: ${error.message}` }; }
}

export function clusterFromCandidate(candidate, route, outcome = { status: "unmeasured_outcome", reason: "no read-only Esteban lead/outcome source is configured for this pilot" }) {
  const demand = Number(candidate.source?.gscImpressions || 0) > 0
    ? { status: "observed", source: "GSC-derived coverage row", impressions: candidate.source.gscImpressions, page: candidate.source.sourceUrl || null }
    : { status: "needs_evidence", reason: "no first-party query demand in the candidate" };
  const coverage = ["UNANSWERED", "WRONG PAGE"].includes(candidate.status)
    ? { status: "observed", verdict: candidate.status.toLowerCase().replace(" ", "_"), target: candidate.target }
    : { status: "needs_evidence", reason: "no coverage verdict" };
  const serviceArea = candidate.areaTier
    ? { status: "observed", tier: candidate.areaTier, place: candidate.place || null }
    : { status: "needs_evidence", reason: "service area not approved" };
  const edges = { service_area: serviceArea, demand, coverage, conversion_route: route, outcome };
  const missing = Object.entries(edges).filter(([, edge]) => edge.status === "needs_evidence").map(([name]) => name);
  const state = missing.length ? "needs_evidence" : outcome.status === "unmeasured_outcome" ? "unmeasured_outcome" : "ready_to_review";
  return {
    cluster_id: `esteban:${candidate.language}:${candidate.query.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/(^-|-$)/g, "")}`,
    query: candidate.query, service: candidate.intent, proposed_action: candidate.action,
    target: candidate.target, state, missing_edges: missing, edges,
    evidence_confidence: candidate.source?.gscImpressions > 0 ? "medium" : "low",
    observed_at: new Date().toISOString(),
  };
}

export async function runGraph(options = args()) {
  const farm = await runFarm({ ...options, dryRun: true });
  const clusters = await Promise.all(farm.snapshot.candidates.map(async (candidate) =>
    clusterFromCandidate(candidate, await conversionRoute(candidate.target, options))));
  const ledger = { schema: GRAPH_SCHEMA, generated_at: new Date().toISOString(), mode: "draft-only", source_snapshot: farm.snapshot.coverage, clusters };
  if (!options.dryRun) await atomicWrite(options.state, `${JSON.stringify(ledger, null, 2)}\n`);
  return ledger;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runGraph().then((ledger) => console.log(JSON.stringify({ schema: ledger.schema, clusters: ledger.clusters.length, states: ledger.clusters.reduce((a, c) => ({ ...a, [c.state]: (a[c.state] || 0) + 1 }), {}) }, null, 2))).catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
}
