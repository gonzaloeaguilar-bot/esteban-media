#!/usr/bin/env node
// Lists annual-event editions in lib/events.ts whose end date has passed.
//
//   pnpm events:check            # against today
//   pnpm events:check 2026-11-02 # against a fixed date
//
// Deliberately NOT part of `pnpm check`: a stale date is a refresh reminder,
// not a reason to block a merge, and the pages already hide ended editions at
// build time. It runs weekly from .github/workflows/followups-due.yml and goes
// red until lib/events.ts gets the next listed dates (or nextEdition: null).
import { parseIsoDate, staleEditions } from "../lib/events.ts";

const arg = process.argv[2];
const now = arg ? parseIsoDate(arg) : new Date();
const stale = staleEditions(now);

if (stale.length === 0) {
  console.log(`events:check: no ended editions as of ${now.toISOString().slice(0, 10)}`);
  process.exit(0);
}
for (const s of stale) {
  console.log(
    `STALE  ${s.id}: listed edition ended ${s.end} (last checked ${s.lastChecked}). ` +
      "Update lib/events.ts with the next listed edition, or set nextEdition to null, and bump lastChecked.",
  );
}
process.exit(1);
