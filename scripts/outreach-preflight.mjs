#!/usr/bin/env node
/**
 * Esteban Moreno Media — outbound preflight. $0, no LLM, read-only.
 *
 * Answers one question honestly: can we send outreach today, and if not,
 * exactly what is missing. Run it before anyone claims the lane is ready.
 *
 * It checks the live boundary, not the config:
 *   - the sending domain's real MX / SPF / DMARC records, over DNS
 *   - whether a reply path exists at all (a domain with no MX cannot receive
 *     the replies the message asks for, which also voids the opt-out)
 *   - whether the reply/opt-out consumer has run recently
 *   - whether a real physical postal address is configured
 *   - the shape of every draft currently in the prospect ledger
 *
 * Exit 0 = clear to send. Exit 1 = blocked, with the reasons printed.
 *
 * Usage:
 *   node scripts/outreach-preflight.mjs
 *   node scripts/outreach-preflight.mjs --domain estebanmorenomedia.com
 */

import fs from "fs";
import path from "path";

import { buildPlainOutreachEmail } from "../lib/plain-outreach-email.mjs";
import { gateBatch } from "../lib/outreach-send-gate.mjs";

const STATE_DIR =
  process.env.ESTEBAN_OUTREACH_STATE ||
  path.join(process.env.HOME, ".claude", "state", "esteban-outreach");
const LEDGER_PATH = path.join(STATE_DIR, "prospect-ledger.jsonl");
const REPLY_STATE = path.join(STATE_DIR, "reply-processor-last-run.json");
const SENT_PATH = path.join(STATE_DIR, "sent-fingerprints.jsonl");

const REPLY_MAX_AGE_HOURS = 48;

function arg(flag, fallback = null) {
  const i = process.argv.indexOf(flag);
  if (i === -1) return fallback;
  const v = process.argv[i + 1];
  return v && !v.startsWith("--") ? v : true;
}

function readJsonl(p) {
  if (!fs.existsSync(p)) return [];
  return fs
    .readFileSync(p, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      try { return JSON.parse(l); } catch { return null; }
    })
    .filter(Boolean);
}

/**
 * True only when something actually processed replies recently. A reply-based
 * opt-out that nobody reads is not an opt-out.
 */
function optOutIsHonoured() {
  if (!fs.existsSync(REPLY_STATE)) return { ok: false, why: `no reply-processor state at ${REPLY_STATE}` };
  try {
    const { last_run_at: last } = JSON.parse(fs.readFileSync(REPLY_STATE, "utf8"));
    const ageH = (Date.now() - Date.parse(last)) / 36e5;
    if (!Number.isFinite(ageH)) return { ok: false, why: "reply-processor state has no readable last_run_at" };
    if (ageH > REPLY_MAX_AGE_HOURS) return { ok: false, why: `reply processor last ran ${Math.round(ageH)}h ago, over the ${REPLY_MAX_AGE_HOURS}h limit` };
    return { ok: true, why: `reply processor ran ${Math.round(ageH)}h ago` };
  } catch (e) {
    return { ok: false, why: `reply-processor state unreadable: ${e.message}` };
  }
}

async function main() {
  const fromEmail = (process.env.ESTEBAN_FROM_EMAIL || "contact@estebanmorenomedia.com").trim();
  const domain = String(arg("--domain", fromEmail.split("@").pop()));
  const postalAddress = (process.env.ESTEBAN_POSTAL_ADDRESS || "").trim();

  const prospects = readJsonl(LEDGER_PATH).filter((r) => r.status === "draft");
  const priorFingerprints = readJsonl(SENT_PATH).map((r) => r.fingerprint);
  const reply = optOutIsHonoured();

  const messages = prospects.slice(0, 40).map((p) => {
    const m = buildPlainOutreachEmail({
      businessName: p.name,
      angle: p.angle,
      detail: p.instagram ? `Vi lo que publican en ${p.instagram}` : p.metro ? `Vi que están en ${p.metro}` : "",
      language: p.language || "es",
      postalAddress,
      senderPhone: process.env.ESTEBAN_PHONE || "",
      portfolioUrl: "https://estebanmorenomedia.com/es/portafolio",
    });
    return { ...m, to: p.email };
  });

  const reasons = await gateBatch({
    messages,
    domain,
    postalAddress,
    optOutHonoured: reply.ok,
    priorFingerprints,
    alreadySentToday: 0,
  });

  console.log(`domain          ${domain}`);
  console.log(`from            ${fromEmail}`);
  console.log(`postal address  ${postalAddress ? "configured" : "MISSING (ESTEBAN_POSTAL_ADDRESS)"}`);
  console.log(`reply/opt-out   ${reply.ok ? "ok" : "NOT HONOURED"} — ${reply.why}`);
  console.log(`drafts in ledger ${prospects.length} (gating the first ${messages.length})`);
  console.log("");

  if (!reasons.length) {
    console.log("PREFLIGHT PASS — clear to send.");
    return 0;
  }

  // Collapse the per-recipient repeats: the same shape failure on 40 drafts is
  // one problem, not forty.
  const grouped = new Map();
  for (const r of reasons) {
    const key = r.includes(": ") ? r.slice(r.indexOf(": ") + 2) : r;
    grouped.set(key, (grouped.get(key) || 0) + 1);
  }
  console.log(`PREFLIGHT BLOCKED — ${grouped.size} distinct reason(s):`);
  for (const [why, n] of [...grouped].sort((a, b) => b[1] - a[1])) {
    console.log(`  x${String(n).padStart(3)}  ${why}`);
  }
  return 1;
}

main()
  .then((code) => process.exit(code))
  .catch((e) => { console.error(e); process.exit(2); });
