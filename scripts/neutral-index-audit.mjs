#!/usr/bin/env node

/**
 * Read-only neutral-index inventory.
 *
 * The Search Console watcher is the source of truth. This helper turns every
 * current NEUTRAL inspection into a review row without treating it as a
 * de-indexing diagnosis or changing a route's indexability.
 */
import { readFile } from "node:fs/promises";

const CSV_COLUMNS = ["url", "coverage_state", "canonical_status", "owner_action", "next_check"];

function csv(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export function neutralRows(state, nextCheck) {
  const pages = state?.latest?.inspection?.pages;
  if (!Array.isArray(pages)) throw new Error("watcher state has no inspection.pages array");
  const rows = pages
    .filter((page) => page?.verdict === "NEUTRAL")
    .map((page) => {
      const url = String(page.url ?? "");
      const pricing = /\/(?:pricing|es\/precios)(?:\/|$)/.test(new URL(url).pathname);
      const event = /\/(?:events|es\/eventos)(?:\/|$)/.test(new URL(url).pathname);
      return {
        url,
        coverage_state: page.coverageState ?? "UNSPECIFIED",
        canonical_status: page.googleCanonical || page.userCanonical ? "canonical reported" : "not reported by Google",
        owner_action: pricing
          ? "retain current canonical pricing route; review internal links and recheck before any consolidation"
          : event
            ? "retain current bilingual event route; verify inbound links and recheck before any consolidation"
            : "review template, language pair, age, and internal links; do not change indexability from this report",
        next_check: nextCheck,
      };
    })
    .sort((a, b) => a.url.localeCompare(b.url));
  const reported = state?.latest?.inspection?.counts?.neutral;
  if (Number.isInteger(reported) && reported !== rows.length) {
    throw new Error(`watcher neutral count mismatch: counts.neutral=${reported}, inspection.pages=${rows.length}`);
  }
  return rows;
}

export function toCsv(rows) {
  return [CSV_COLUMNS.join(","), ...rows.map((row) => CSV_COLUMNS.map((key) => csv(row[key])).join(","))].join("\n");
}

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  const [statePath, nextCheck = "2026-10-29"] = process.argv.slice(2);
  if (!statePath) throw new Error("usage: neutral-index-audit.mjs STATE_JSON [NEXT_CHECK_DATE]");
  const state = JSON.parse(await readFile(statePath, "utf8"));
  process.stdout.write(`${toCsv(neutralRows(state, nextCheck))}\n`);
}
