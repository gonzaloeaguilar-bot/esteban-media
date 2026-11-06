#!/usr/bin/env node

/**
 * Draft-only local-commercial evidence graph for Esteban Moreno Media.
 *
 * It composes the existing demand-content farm rather than replacing it.
 * No page, lead, citation, ranking, or revenue is created or claimed here.
 */
import { mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import { domainToASCII } from "node:url";
import { runFarm } from "./esteban-demand-content-farm.mjs";

export const GRAPH_SCHEMA = "esteban-media.local-commercial-graph.v1";
const ROOT = join(homedir(), ".local/share/portfolio-ops");
const DEFAULT_STATE = join(homedir(), ".local/state/esteban-media-geo-graph/latest.json");
const ORIGIN = "https://estebanmorenomedia.com";
const OWNED_HOST = "estebanmorenomedia.com";
export const MAX_CITATION_AGE_DAYS = 14;

function args(argv = process.argv.slice(2)) {
  const value = (key) => argv.find((arg) => arg.startsWith(`--${key}=`))?.slice(key.length + 3);
  return {
    dryRun: argv.includes("--dry-run"),
    state: value("state") || DEFAULT_STATE,
    coverage: value("coverage") || join(ROOT, "esteban-coverage/latest.json"),
    semrush: value("semrush") || join(ROOT, "semrush-ui.jsonl"),
    citations: value("citations") || join(ROOT, "geo-citations.jsonl"),
    serp: value("serp") || join(ROOT, "serp-features.jsonl"),
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

async function readJsonl(path) {
  try {
    return (await readFile(path, "utf8")).split("\n").flatMap((line) => {
      try { const row = JSON.parse(line); return row && typeof row === "object" ? [row] : []; } catch { return []; }
    });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export function normalizeQuery(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().match(/[a-z0-9]+/g)?.join(" ") || "";
}

function candidatePromptId(candidate) {
  return candidate.prompt_id || candidate.promptId || candidate.source?.prompt_id || candidate.source?.promptId || null;
}

/**
 * Evidence may only be reused for the exact approved prompt ID, or for the
 * exact normalized query. Similarity matching turns a different buyer intent
 * into fabricated evidence, so it is deliberately forbidden here.
 */
export function matchesApprovedPrompt(candidate, row) {
  const approvedId = candidatePromptId(candidate);
  if (approvedId && row.prompt_id && approvedId === row.prompt_id) return true;
  const candidateQuery = normalizeQuery(candidate.query);
  const observedQuery = normalizeQuery(row.prompt || row.query);
  return Boolean(candidateQuery && observedQuery && candidateQuery === observedQuery);
}

function citationEligibility(row, { now, maxCitationAgeDays = MAX_CITATION_AGE_DAYS } = {}) {
  const observedAt = Date.parse(row.ts || row.observed_at || "");
  const age = Number.isFinite(observedAt) && now ? (Date.parse(now) - observedAt) / 86400000 : NaN;
  if (String(row.status || "").toLowerCase() !== "ok") return "provider result unavailable";
  if (String(row.citation_coverage || "").toLowerCase() !== "complete") return "citation coverage is unverified";
  if (row.our_citation !== true) return "owned citation is false or absent";
  if (!Number.isFinite(age) || age < 0 || age > maxCitationAgeDays) return "citation observation is stale or timestamp is invalid";
  return null;
}

function hostFromUrl(value) {
  try { return domainToASCII(new URL(value).hostname.toLowerCase().replace(/^www\./, "")); } catch { return null; }
}

function isOwnedUrl(value, ownedHost = OWNED_HOST) {
  const host = hostFromUrl(value);
  return Boolean(host && (host === ownedHost || host.endsWith(`.${ownedHost}`)));
}

function latestPromptEngineRows(rows) {
  const newest = new Map();
  for (const row of rows) {
    const key = `${row.engine || "unknown"}\u0000${row.prompt || ""}`;
    const previous = newest.get(key);
    if (!previous || String(row.ts || "") > String(previous.ts || "")) newest.set(key, row);
  }
  return [...newest.values()];
}

function serpObservation(candidate, rows) {
  const matching = latestPromptEngineRows(rows.filter((row) => row.site === "esteban" && matchesApprovedPrompt(candidate, row)));
  if (!matching.length) return { status: "unmeasured", reason: "no matching SERP snapshot" };
  const google = matching.find((row) => row.engine === "google" && row.status === "ok");
  if (google) return { status: "observed", engine: "google", observed_at: google.ts || null, query: google.query, our_position: google.our_position ?? null, features: google.features || [], local_pack_present: google.local_pack_present ?? null, ai_overview_present: google.ai_overview_present ?? null };
  const latest = matching[0]; const fallback = latest.fallback?.status === "ok" ? latest.fallback : null;
  return { status: "unmeasured", reason: latest.error_detail || `SERP status ${latest.status || "unknown"}`, engine: latest.engine || "unknown", observed_at: latest.ts || null, fallback: fallback ? { engine: fallback.engine, features: fallback.features || [], our_position: fallback.our_position ?? null } : null };
}

export function marketOwnershipEvidence(candidate, rows, { ownedHost = OWNED_HOST, serpRows = [], now = new Date().toISOString(), maxCitationAgeDays = MAX_CITATION_AGE_DAYS } = {}) {
  const matching = latestPromptEngineRows(rows.filter((row) => row.brand === "esteban" && matchesApprovedPrompt(candidate, row)));
  if (!matching.length) {
    return {
      citation_observation: { status: "unmeasured", reason: "no matching AI-citation prompt observation" },
      winning_domains: [],
      commercial_serp_context: candidate.source?.semrushUi
        ? { status: "observed_modeled", source: "Semrush UI export", ...candidate.source.semrushUi }
        : { status: "unmeasured", reason: "no matching Semrush UI export" },
      serp_observation: serpObservation(candidate, serpRows), reusable_patterns: [],
      our_delta: { status: "unmeasured", reason: "no source-bound competitor observation for this query" },
    };
  }
  const measured = matching.filter((row) => !citationEligibility(row, { now, maxCitationAgeDays }));
  const context = candidate.source?.semrushUi
    ? { status: "observed_modeled", source: "Semrush UI export", ...candidate.source.semrushUi }
    : { status: "unmeasured", reason: "no matching Semrush UI export" };
  if (!measured.length) {
    return {
      citation_observation: { status: "needs_measurement", reason: "matching citation observations are not current, complete, and owned-citation verified", observations: matching.map((row) => ({ engine: row.engine || "unknown", prompt_id: row.prompt_id || null, prompt: row.prompt, observed_at: row.ts || null, status: row.status || "UNMEASURED", reason: citationEligibility(row, { now, maxCitationAgeDays }) || row.reason || null })) },
      winning_domains: [], commercial_serp_context: context, serp_observation: serpObservation(candidate, serpRows), reusable_patterns: [],
      our_delta: { status: "needs_measurement", reason: "no current complete owned-citation observation for this exact prompt" },
    };
  }
  const domains = new Map();
  for (const row of measured) {
    for (const url of row.cited_urls || []) {
      if (isOwnedUrl(url, ownedHost)) continue;
      const domain = hostFromUrl(url);
      if (!domain) continue;
      const current = domains.get(domain) || { domain, cited_urls: [], classifications: new Set(), observations: 0 };
      if (!current.cited_urls.includes(url)) current.cited_urls.push(url);
      const classification = row.classification?.[url];
      if (classification) current.classifications.add(classification);
      current.observations += 1;
      domains.set(domain, current);
    }
  }
  const winning_domains = [...domains.values()].map((item) => ({ ...item, classifications: [...item.classifications].sort() }))
    .sort((a, b) => b.observations - a.observations || a.domain.localeCompare(b.domain));
  const features = Array.isArray(context.serp_features) ? context.serp_features : [];
  return {
    citation_observation: { status: "observed", observations: measured.map((row) => ({ engine: row.engine || "unknown", prompt: row.prompt, observed_at: row.ts || null, our_citation: Boolean(row.our_citation), citation_coverage: row.citation_coverage || null })) },
    winning_domains,
    commercial_serp_context: context,
    serp_observation: serpObservation(candidate, serpRows),
    reusable_patterns: features.map((feature) => ({ source: "Semrush UI export", observation: "serp_feature_label", value: feature })),
    our_delta: candidate.status === "WRONG PAGE"
      ? { status: "observed", action: "improve_existing", basis: "owned coverage verdict is WRONG PAGE" }
      : { status: "observed", action: "new_guide_draft", basis: "owned coverage verdict is UNANSWERED" },
  };
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

export function clusterFromCandidate(candidate, route, outcome = { status: "unmeasured_outcome", reason: "no read-only Esteban lead/outcome source is configured for this pilot" }, marketOwnership = marketOwnershipEvidence(candidate, [])) {
  const demand = Number(candidate.source?.gscImpressions || 0) > 0
    ? { status: "observed", source: "GSC-derived coverage row", impressions: candidate.source.gscImpressions, page: candidate.source.sourceUrl || null }
    : { status: "needs_evidence", reason: "no first-party query demand in the candidate" };
  const coverage = ["UNANSWERED", "WRONG PAGE"].includes(candidate.status)
    ? { status: "observed", verdict: candidate.status.toLowerCase().replace(" ", "_"), target: candidate.target }
    : { status: "needs_evidence", reason: "no coverage verdict" };
  const serviceArea = candidate.areaTier
    ? { status: "observed", tier: candidate.areaTier, place: candidate.place || null }
    : { status: "needs_evidence", reason: "service area not approved" };
  const marketOwnershipEdge = {
    ...marketOwnership,
    status: marketOwnership.citation_observation?.status === "observed" ? "observed" : "needs_measurement",
  };
  const edges = { service_area: serviceArea, demand, coverage, conversion_route: route, outcome, market_ownership: marketOwnershipEdge };
  const missing = Object.entries(edges).filter(([, edge]) => edge.status === "needs_evidence").map(([name]) => name);
  const measurement = Object.entries(edges).filter(([, edge]) => edge.status === "needs_measurement").map(([name]) => name);
  const state = missing.length ? "needs_evidence" : measurement.length ? "needs_measurement" : outcome.status === "unmeasured_outcome" ? "unmeasured_outcome" : "ready_to_review";
  return {
    cluster_id: `esteban:${candidate.language}:${candidate.query.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/(^-|-$)/g, "")}`,
    query: candidate.query, service: candidate.intent, proposed_action: candidate.action,
    target: candidate.target, state, missing_edges: missing, measurement_edges: measurement, edges,
    evidence_confidence: candidate.source?.gscImpressions > 0 ? "medium" : "low",
    observed_at: new Date().toISOString(),
  };
}

export async function runGraph(options = args()) {
  const farm = await runFarm({ ...options, dryRun: true });
  const citationRows = await readJsonl(options.citations);
  const serpRows = await readJsonl(options.serp);
  const clusters = await Promise.all(farm.snapshot.candidates.map(async (candidate) =>
    clusterFromCandidate(candidate, await conversionRoute(candidate.target, options), undefined, marketOwnershipEvidence(candidate, citationRows, { serpRows, now: new Date().toISOString() }))));
  const ledger = { schema: GRAPH_SCHEMA, generated_at: new Date().toISOString(), mode: "draft-only", source_snapshot: farm.snapshot.coverage, clusters };
  if (!options.dryRun) await atomicWrite(options.state, `${JSON.stringify(ledger, null, 2)}\n`);
  return ledger;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runGraph().then((ledger) => console.log(JSON.stringify({ schema: ledger.schema, clusters: ledger.clusters.length, states: ledger.clusters.reduce((a, c) => ({ ...a, [c.state]: (a[c.state] || 0) + 1 }), {}) }, null, 2))).catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
}
