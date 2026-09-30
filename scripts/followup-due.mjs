#!/usr/bin/env node
/**
 * Which registered follow-ups are due? Zero-token, no LLM, $0.
 *
 * WHY THIS EXISTS. `config/indexable-inventory-freeze.json` carries the rule that
 * every owner-ordered or demand-backed URL must "register a GSC follow-up date",
 * and four entries duly carry one:
 *
 *     2026-10-16  /desk-recommendations
 *     2026-10-27  /pricing and /es/precios
 *     2026-10-28  package-detail pages
 *     2026-10-29  /pricing/real-estate and /es/precios/inmobiliaria
 *
 * Measured 2026-09-30: **nothing reads `followUpDate`.** Not a test, not a
 * script, not a loop, in this repo or in portfolio-ops. Four commitments to go
 * back and check whether a page earned its place, and no mechanism that would
 * ever raise its hand on the day. A date written in a JSON file that nothing
 * parses is a note to a future human who has no reason to open the file.
 *
 * This was found while adding a FIFTH such date for the service-depth pilot, so
 * the sentinel ships with the promise rather than after it.
 *
 * WHAT IT DOES NOT DO. It does not query Search Console. The GSC lane lives in
 * portfolio-ops with its own credentials, and putting an authenticated API call
 * in a build-time script would make a green check depend on a token. This answers
 * the one question that needs no credential — *what is due, and what did we say
 * we would check* — and names the command that gets the numbers. A gate that
 * cannot run offline is a gate that gets skipped.
 *
 * EXIT CODES
 *   0  nothing due
 *   1  at least one follow-up is due or overdue  (CI surfaces it; it is not a
 *      build failure so much as a standing reminder that can actually fail)
 *   2  the registry is malformed
 *
 * USAGE
 *   node scripts/followup-due.mjs                # due as of today
 *   node scripts/followup-due.mjs --on 2026-11-01
 *   node scripts/followup-due.mjs --within 7     # due within the next 7 days
 *   node scripts/followup-due.mjs --json
 */

import fs from "node:fs";
import path from "node:path";

const REGISTRY = path.join(process.cwd(), "config", "indexable-inventory-freeze.json");

/**
 * Collect every `{followUpDate, followUp}` in the registry, wherever it sits.
 *
 * Walks the whole tree rather than reading one known array: the entries live
 * under `ownerOrderedAdditions` today, and a future pass that records them under
 * another key must not become invisible to this check. A gate that only sees one
 * array is a gate the next author silently bypasses.
 */
export function collectFollowUps(node, trail = []) {
  const out = [];
  if (Array.isArray(node)) {
    node.forEach((item, i) => out.push(...collectFollowUps(item, [...trail, String(i)])));
    return out;
  }
  if (node && typeof node === "object") {
    if (typeof node.followUpDate === "string") {
      out.push({
        at: trail.join("."),
        date: node.followUpDate,
        note: node.followUp ?? "(no note recorded)",
        url: node.url ?? node.urls ?? null,
        kind: node.kind ?? null,
      });
    }
    for (const [key, value] of Object.entries(node)) {
      out.push(...collectFollowUps(value, [...trail, key]));
    }
  }
  return out;
}

/** ISO date, or null. Refuses a Date-parseable string that is not ISO. */
export function parseIsoDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Which are due on `asOf`, plus how many days late.
 *
 * `withinDays` looks ahead, so a weekly loop can warn before the date rather
 * than only after it.
 */
export function dueFollowUps(entries, { asOf = new Date(), withinDays = 0 } = {}) {
  const horizon = new Date(asOf.getTime() + withinDays * 86400000);
  return entries
    .map((entry) => {
      const date = parseIsoDate(entry.date);
      return { ...entry, parsed: date };
    })
    .filter((entry) => entry.parsed && entry.parsed <= horizon)
    .map((entry) => ({
      ...entry,
      daysLate: Math.floor((asOf.getTime() - entry.parsed.getTime()) / 86400000),
    }))
    .sort((a, b) => b.daysLate - a.daysLate);
}

function main() {
  const argv = process.argv.slice(2);
  const asJson = argv.includes("--json");
  const onIdx = argv.indexOf("--on");
  const withinIdx = argv.indexOf("--within");
  const asOf = onIdx >= 0 ? parseIsoDate(argv[onIdx + 1]) : new Date();
  const withinDays = withinIdx >= 0 ? Number(argv[withinIdx + 1]) || 0 : 0;

  if (!asOf) {
    console.error("followup-due: --on expects an ISO date (YYYY-MM-DD)");
    return 2;
  }

  let registry;
  try {
    registry = JSON.parse(fs.readFileSync(REGISTRY, "utf8"));
  } catch (error) {
    console.error(`followup-due: cannot read ${path.relative(process.cwd(), REGISTRY)}: ${error.message}`);
    return 2;
  }

  const all = collectFollowUps(registry);
  const bad = all.filter((entry) => !parseIsoDate(entry.date));
  if (bad.length) {
    for (const entry of bad) {
      console.error(`followup-due: ${entry.at} has a non-ISO followUpDate: ${JSON.stringify(entry.date)}`);
    }
    return 2;
  }

  const due = dueFollowUps(all, { asOf, withinDays });

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          asOf: asOf.toISOString().slice(0, 10),
          withinDays,
          registered: all.length,
          due: due.map(({ parsed, ...rest }) => rest),
        },
        null,
        2,
      ),
    );
    return due.length ? 1 : 0;
  }

  const today = asOf.toISOString().slice(0, 10);
  if (due.length === 0) {
    const next = all
      .map((e) => e.date)
      .sort()
      .find((d) => d > today);
    console.log(
      `followup-due: ${all.length} follow-up(s) registered, none due as of ${today}` +
        (next ? ` (next: ${next})` : ""),
    );
    return 0;
  }

  console.log(`followup-due: ${due.length} of ${all.length} follow-up(s) DUE as of ${today}\n`);
  for (const entry of due) {
    const late = entry.daysLate > 0 ? `${entry.daysLate} day(s) overdue` : "due today";
    const where = entry.url ? ` ${JSON.stringify(entry.url)}` : "";
    console.log(`  ${entry.date}  ${late}${where}`);
    console.log(`    ${entry.note}`);
    console.log(`    registry path: ${entry.at}`);
    console.log("");
  }
  console.log("Get the numbers with the portfolio-ops GSC lane, e.g.");
  console.log("  scripts/gsc_query.py --site esteban --source live-api --days 28 --dimensions page");
  console.log("\nThen resolve each entry: record what it earned and either keep it or retire it.");
  return 1;
}

const invokedDirectly =
  process.argv[1] && import.meta.url === `file://${path.resolve(process.argv[1])}`;
if (invokedDirectly) process.exit(main());
