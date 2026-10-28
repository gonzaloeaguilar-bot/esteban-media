#!/usr/bin/env node

/**
 * Esteban's $0, draft-only local demand/content farm.
 *
 * It reads evidence produced by existing $0 jobs; it never calls Semrush,
 * writes site content, opens a PR, or publishes. A Semrush UI export is used
 * only when an already-ingested `slug: esteban` row exists.
 */
import { mkdir, open, readFile, rename, stat, unlink } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

export const FARM_SCHEMA = "esteban-media.demand-content-farm.v1";
const HOME = homedir();
const ROOT = join(HOME, ".local/share/portfolio-ops");
const DEFAULTS = {
  coverage: join(ROOT, "esteban-coverage/latest.json"),
  semrush: join(ROOT, "semrush-ui.jsonl"),
  citations: join(ROOT, "geo-citations.jsonl"),
  state: join(HOME, ".local/state/esteban-media-demand-content-farm/latest.json"),
  queue: join(HOME, "obsidian-wiki/client-esteban-media/wiki/esteban-demand-content-queue.md"),
  guideUrl: "https://estebanmorenomedia.com/es/guias",
};

const VALID_STATUSES = new Set(["UNANSWERED", "WRONG PAGE"]);
const CORE_AREA_RE = /\b(miami(?:-dade)?|miami beach|fort lauderdale|broward|doral|aventura|coral gables|hialeah|kendall|hollywood|pembroke pines|pembroke|pompano beach|coral springs|davie|weston)\b/i;
const EXPANSION_AREA_RE = /\b(palm beach(?: county)?|west palm beach|boca raton)\b/i;
const FOREIGN_GEO_RE = /\b(mexico|cdmx|colombia|bogota|argentina|peru|uruguay|chile|espana|madrid|barcelona|castellon|malaga|sevilla|valencia)\b/i;
const GENERIC_TARGET_RE = /^\/(?:es\/)?(?:areas|servicios|services)?\/?$/;
const NON_SERVICE_TARGET_RE = /^\/(?:es\/)?(?:portfolio|portafolio|case-studies|casos-de-estudio|deliverables)(?:\/|$)/;

function args(argv = process.argv.slice(2)) {
  const value = (key) => argv.find((arg) => arg.startsWith(`--${key}=`))?.slice(key.length + 3);
  return {
    dryRun: argv.includes("dry-run") || argv.includes("--dry-run"),
    coverage: value("coverage") || DEFAULTS.coverage,
    semrush: value("semrush") || DEFAULTS.semrush,
    citations: value("citations") || DEFAULTS.citations,
    state: value("state") || DEFAULTS.state,
    queue: value("queue") || DEFAULTS.queue,
    guideUrl: value("guide-url") || DEFAULTS.guideUrl,
  };
}

async function readText(path) {
  try { return await readFile(path, "utf8"); } catch (error) { if (error.code === "ENOENT") return ""; throw error; }
}

async function readJson(path) {
  const text = await readText(path);
  return text ? JSON.parse(text) : null;
}

async function atomicWrite(path, content) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.${Date.now()}.tmp`;
  let handle;
  try {
    handle = await open(temporary, "wx", 0o600);
    await handle.writeFile(content);
    await handle.sync();
    await handle.close(); handle = null;
    await rename(temporary, path);
  } catch (error) {
    await handle?.close().catch(() => {});
    await unlink(temporary).catch(() => {});
    throw error;
  }
}

function csvRows(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted && char === '"' && text[index + 1] === '"') { field += char; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (!quoted && char === ",") { row.push(field); field = ""; }
    else if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(field); field = ""; if (row.some(Boolean)) rows.push(row); row = [];
    } else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  const [headers = [], ...values] = rows;
  return values.map((cells) => Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""])));
}

function slugify(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 72);
}

export function guideSlugs(html) {
  return new Set([...html.matchAll(/href="\/es\/guias\/([^"?#/]+)"/g)].map((match) => match[1]));
}

function servedArea(row) {
  const value = `${row.query || ""} ${row.place || ""}`;
  if (FOREIGN_GEO_RE.test(value)) return null;
  if (CORE_AREA_RE.test(value)) return "core";
  if (EXPANSION_AREA_RE.test(value)) return "expansion";
  return null;
}

function contentFrame(row, areaTier) {
  const place = row.place || (row.query.match(CORE_AREA_RE)?.[0] || row.query.match(EXPANSION_AREA_RE)?.[0]);
  const service = row.service || "video editing";
  const question = row.query.replace(/^./, (char) => char.toUpperCase());
  const outline = [
    `Respuesta directa: explica qué necesita una persona en ${place} para resolver “${row.query}” sin prometer resultados ni plazos.`,
    `Pasos prácticos: enumera tres decisiones verificables sobre ${service}, material disponible, formato y aprobación antes de publicar.`,
    "Prueba y siguiente paso: enlaza sólo un servicio y un proyecto publicado pertinente; identifica el rol real de Esteban y pide una cotización para alcance específico.",
  ];
  const story = `Historia: “Me preguntaron ${row.query}. Antes de pagar o grabar, revisa estas tres cosas.”${areaTier === "expansion" ? " Palm Beach se presenta como área de expansión." : ""}`;
  return { question, outline, story };
}

function existingRelevantTarget(row) {
  const target = String(row.best_page || "").trim();
  return target && !GENERIC_TARGET_RE.test(target) && !NON_SERVICE_TARGET_RE.test(target) ? target : null;
}

function number(value) { const parsed = Number(value); return Number.isFinite(parsed) ? parsed : 0; }

function queryTokens(value) {
  const stop = new Set(["de", "del", "el", "en", "for", "in", "la", "miami", "para", "the", "video"]);
  return new Set(String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .match(/[a-z0-9]+/g)?.filter((token) => token.length > 2 && !stop.has(token)) || []);
}

function semrushMatch(semrush, query) {
  const exact = semrush.get(query.toLowerCase());
  if (exact) return { ...exact, match: "exact_query" };
  const wanted = queryTokens(query);
  let best = null;
  for (const [keyword, row] of semrush) {
    const shared = [...wanted].filter((token) => queryTokens(keyword).has(token)).length;
    if (shared < 2) continue;
    if (!best || shared > best.shared || (shared === best.shared && String(row.run_date || "") > String(best.row.run_date || ""))) best = { keyword, row, shared };
  }
  return best ? { ...best.row, matched_keyword: best.keyword, match: "topic_overlap" } : null;
}

function parseSemrush(text) {
  const latestByKeyword = new Map();
  for (const line of text.trim().split("\n")) {
    try {
      const row = JSON.parse(line);
      if (row.slug !== "esteban" || !row.keyword) continue;
      const old = latestByKeyword.get(row.keyword.toLowerCase());
      if (!old || String(row.run_date || "") > String(old.run_date || "")) latestByKeyword.set(row.keyword.toLowerCase(), row);
    } catch { /* malformed historical line is not evidence */ }
  }
  return latestByKeyword;
}

function citationObservation(text) {
  const records = [];
  for (const line of text.trim().split("\n")) {
    try { const row = JSON.parse(line); if (row.brand === "esteban") records.push(row); } catch { /* ignore malformed history */ }
  }
  const latest = records.sort((a, b) => String(b.ts || "").localeCompare(String(a.ts || "")))[0];
  if (!latest) return { status: "UNMEASURED", source: "geo-citations.jsonl absent" };
  return { status: latest.status || "UNMEASURED", source: `${latest.engine || "unknown"} ${latest.ts || "undated"}`, reason: latest.reason || null };
}

export function buildCandidates(rows, guideSet, semrush, citation) {
  const seen = new Set();
  return rows.filter((row) => VALID_STATUSES.has(row.status)).map((row) => {
    // A place column from autocomplete is not authority. Only the approved
    // served-area vocabulary is accepted; named foreign places are rejected.
    const areaTier = servedArea(row);
    if (!areaTier) return null;
    const slug = slugify(row.query);
    const key = `${row.lang}:${slug}`;
    if (!slug || seen.has(key) || guideSet.has(slug)) return null;
    seen.add(key);
    const semrushRow = semrushMatch(semrush, row.query);
    const volume = number(semrushRow?.search_volume);
    const difficulty = number(semrushRow?.keyword_difficulty);
    const score = number(row.score) + Math.min(volume, 500) / 20 + Math.max(0, 35 - difficulty) / 10;
    const frame = contentFrame(row, areaTier);
    const existingTarget = existingRelevantTarget(row);
    return {
      score: Number(score.toFixed(2)), query: row.query, areaTier,
      status: row.status, intent: row.intent || "unknown", language: row.lang || "es", place: row.place || null,
      source: { coverageDate: row.coverage_date || null, sources: row.sources, gscImpressions: number(row.gsc_impr), gscPosition: row.gsc_pos || null, sourceUrl: row.gsc_page || row.best_page || null, semrushUi: semrushRow ? { runDate: semrushRow.run_date, volume, difficulty, url: semrushRow.url || null, matchedKeyword: semrushRow.matched_keyword || semrushRow.keyword || row.query, match: semrushRow.match, serp_features: String(semrushRow.serp_features || semrushRow.serp_features_by_keyword || "").split(",").map((item) => item.trim()).filter(Boolean) } : null, citation },
      action: existingTarget ? "improve_existing" : "new_guide_draft",
      target: existingTarget || `/es/guias/${slug}`,
      question: frame.question, ssrOutline: frame.outline, storyHook: frame.story,
    };
  }).filter(Boolean).sort((a, b) => b.score - a.score || a.query.localeCompare(b.query)).slice(0, 12);
}

function renderQueue(snapshot) {
  const lines = [
    "---", "title: \"Cola semanal de contenido: demanda local Esteban\"", `updated: ${snapshot.generatedAt.slice(0, 10)}`, "status: draft-only", "---", "",
    "# Cola semanal de contenido local", "", "Este documento es una cola de borradores. No publica, no crea páginas ni asegura demanda; cada fila conserva la fuente y fecha que justifican revisarla.", "",
    `- Inventario de guías públicas: ${snapshot.guideCount}`, `- Semrush UI export: ${snapshot.semrush.used ? `sí, última fila ${snapshot.semrush.latestRunDate}` : "no disponible; no se usaron cifras de API"}`, `- Observación de citas: ${snapshot.citation.status} (${snapshot.citation.source})`, "",
  ];
  snapshot.candidates.forEach((item, index) => {
    lines.push(`## ${index + 1}. ${item.question}`, "", `- **Pregunta local exacta:** ${item.query}`, `- **Estado observado:** ${item.status}; intención: ${item.intent}; área: ${item.areaTier}; puntaje determinista: ${item.score}.`, `- **Fuente:** cobertura ${item.source.sources || "sin etiqueta"}; GSC impresiones ${item.source.gscImpressions}, posición ${item.source.gscPosition || "sin dato"}; URL ${item.source.sourceUrl || "sin URL"}.`, `- **Acción propuesta:** ${item.action}; destino canónico: ${item.target}.`, `- **Semrush UI:** ${item.source.semrushUi ? `exportación ${item.source.semrushUi.runDate}, volumen ${item.source.semrushUi.volume}, dificultad ${item.source.semrushUi.difficulty}, URL ${item.source.semrushUi.url || "sin URL"}` : "sin exportación UI coincidente."}`, "- **Borrador SSR (100–180 palabras al desarrollar cada sección):**", ...item.ssrOutline.map((line) => `  - ${line}`), `- **Gancho para Storytime:** ${item.storyHook}`, "");
  });
  lines.push("## Control antes de construir", "", "Sólo se aceptan Miami-Dade o Broward/Fort Lauderdale; Palm Beach queda marcado como expansión. Una ruta de servicio pertinente existente se mejora, no se duplica con una guía. Usar sólo prueba de trabajo autorizada y pasar la revisión/editorial normal. Una observación MISSING o UNMEASURED no es una ausencia de demanda.", "");
  return lines.join("\n");
}

async function fetchGuides(url) {
  const response = await fetch(url, { headers: { "user-agent": "EstebanDemandContentFarm/1.0" } });
  if (!response.ok) throw new Error(`Guide inventory request failed: HTTP ${response.status}`);
  return guideSlugs(await response.text());
}

async function fileAgeHours(path) {
  try { return (Date.now() - (await stat(path)).mtimeMs) / 3_600_000; } catch { return null; }
}

export async function runFarm(options = args()) {
  const coverage = await readJson(options.coverage);
  if (!coverage?.csv) throw new Error(`Coverage snapshot is missing a CSV path: ${options.coverage}`);
  const coverageRows = csvRows(await readText(coverage.csv)).map((row) => ({ ...row, coverage_date: coverage.date }));
  const guides = await fetchGuides(options.guideUrl);
  const semrushText = await readText(options.semrush);
  const semrush = parseSemrush(semrushText);
  const citation = citationObservation(await readText(options.citations));
  const generatedAt = new Date().toISOString();
  const snapshot = {
    schema: FARM_SCHEMA, generatedAt, mode: "draft-only", coverage: { path: coverage.csv, date: coverage.date, ageHours: await fileAgeHours(coverage.csv), status: coverage.status || "unknown" },
    guideCount: guides.size, semrush: { used: semrush.size > 0, latestRunDate: [...semrush.values()].map((row) => row.run_date).sort().at(-1) || null }, citation,
    candidates: buildCandidates(coverageRows, guides, semrush, citation),
  };
  const queue = renderQueue(snapshot);
  if (!options.dryRun) { await atomicWrite(options.state, `${JSON.stringify(snapshot, null, 2)}\n`); await atomicWrite(options.queue, queue); }
  return { snapshot, queue };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runFarm().then(({ snapshot }) => console.log(JSON.stringify({ schema: FARM_SCHEMA, candidates: snapshot.candidates.length, mode: snapshot.mode, semrushUi: snapshot.semrush.used }, null, 2))).catch((error) => { console.error(error.stack || error.message); process.exitCode = 1; });
}
