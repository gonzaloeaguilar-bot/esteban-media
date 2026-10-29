#!/usr/bin/env node
/** Build one source-bound daily GEO action brief; this selector never edits pages. */
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

export const SCHEMA = "esteban-media.geo-execution-queue.v1";
const home = homedir();
const defaults = {
  graph: join(home, ".local/state/esteban-media-geo-graph/latest.json"),
  state: join(home, ".local/state/esteban-media-geo-execution/latest.json"),
};
const arg = (name, argv = process.argv.slice(2)) => argv.find((v) => v.startsWith(`--${name}=`))?.slice(name.length + 3);
const parse = (argv) => ({ graph: arg("graph", argv) || defaults.graph, state: arg("state", argv) || defaults.state, now: arg("now", argv) || new Date().toISOString() });
const load = async (path, fallback = {}) => { try { return JSON.parse(await readFile(path, "utf8")); } catch (e) { if (e.code === "ENOENT") return fallback; throw e; } };
async function atomic(path, value) { await mkdir(dirname(path), { recursive: true }); const tmp = `${path}.${process.pid}.tmp`; await writeFile(tmp, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 }); await rename(tmp, path); }
const ageDays = (then, now) => (Date.parse(now) - Date.parse(then)) / 86400000;
export const EXECUTOR_ACCEPTANCE = "In an isolated worktree, invoke cto-dispatch, run the project checks, obtain independent review, open a PR, merge only after gates, verify production, and write an outcome ledger row. Do not self-publish content.";

function successfulDispatch(previous, clusterId) {
  const receipt = previous.dispatched?.[clusterId];
  return receipt?.status === "dispatched" && Number.isFinite(Date.parse(receipt.at)) ? receipt : null;
}

export function eligible(cluster, previous, now) {
  if (cluster.proposed_action !== "improve_existing" || cluster.state !== "unmeasured_outcome" || (cluster.missing_edges || []).length) return false;
  const prior = successfulDispatch(previous, cluster.cluster_id);
  return !prior || ageDays(prior.at, now) >= 28;
}
export function choose(graph, previous, now) { return (graph.clusters || []).find((cluster) => eligible(cluster, previous, now)) || null; }
function brief(cluster, now) {
  const market = cluster.edges?.market_ownership || {};
  return { schema: SCHEMA, generated_at: now, mode: "governed-execution-brief", action: "dispatch_one_existing_page_repair",
    cluster_id: cluster.cluster_id, query: cluster.query, target: cluster.target, proposed_action: cluster.proposed_action,
    evidence: { demand: cluster.edges?.demand, coverage: cluster.edges?.coverage, conversion_route: cluster.edges?.conversion_route,
      citation_observation: market.citation_observation, serp_observation: market.serp_observation,
      citation_domains: (market.winning_domains || []).map((x) => x.domain) },
    constraints: ["Edit only the existing target or its source-bound internal links.", "Do not invent prices, credentials, outcomes, client proof, rankings, or citations.", "Record outcome separately; source readiness is not an outcome."],
    executor_acceptance: EXECUTOR_ACCEPTANCE,
    acceptance: "Raw production HTML preserves the answer/contact path; source-backed query-to-page evidence and an outcome ledger row exist." };
}
export async function run(options = parse()) {
  const graph = await load(options.graph); const previous = await load(options.state, { dispatched: {} });
  const cluster = choose(graph, previous, options.now);
  const dispatches = previous.dispatched || {};
  const receipt = cluster ? { ...brief(cluster, options.now), status: "eligible", dispatched: dispatches,
    selector_receipt: { status: "eligible", at: options.now, cluster_id: cluster.cluster_id, note: "Selection is not a successful dispatch receipt." } } :
    { schema: SCHEMA, generated_at: options.now, mode: "governed-execution-brief", status: "no_eligible_candidate", dispatched: dispatches,
      selector_receipt: { status: "no_eligible_candidate", at: options.now } };
  await atomic(options.state, receipt); return receipt;
}
if (import.meta.url === `file://${process.argv[1]}`) run().then((x) => console.log(JSON.stringify({ status: x.status, cluster_id: x.cluster_id || null, target: x.target || null }, null, 2))).catch((e) => { console.error(e.stack || e.message); process.exitCode = 1; });
