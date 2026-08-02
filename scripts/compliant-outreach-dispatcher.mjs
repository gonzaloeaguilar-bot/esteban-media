import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  loadEnvLocal,
  loadSuppressionList,
  screenRecipient,
  isFabricatedEmail,
  sendGateEnabled,
  assertLiveSendAllowed,
  requireResendKey,
  listUnsubscribeHeaders,
} from "../lib/outreach-compliance.mjs";
import { buildCompliantOutreachEmail } from "../lib/compliant-outreach-email.mjs";
import { extractBusinessContactInfo } from "../lib/website-email-extractor.mjs";

/**
 * Canonical, safe outbound dispatcher for Esteban Moreno Media.
 *
 * Default posture is DRY-RUN: it writes the drafts it WOULD send (each with the
 * CAN-SPAM footer) to public/leads/outreach-dryrun-drafts.json for review, and
 * sends NOTHING. A live send requires BOTH ESTEBAN_SEND_LIVE=1 and RESEND_API_KEY
 * (and a postal address) — see lib/outreach-compliance.mjs.
 *
 * Every prospect that reaches a draft has a REAL, harvested contact email.
 * Fabricated / .example / 555 / suppressed addresses are rejected.
 */

const SEED_PATH = path.join(process.cwd(), "scripts", "data", "verified-prospects.json");
const DISCOVERED_PATH = path.join(process.cwd(), "scripts", "data", "discovered-prospects.json");
const DRAFTS_OUT = path.join(process.cwd(), "public", "leads", "outreach-dryrun-drafts.json");
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Esteban Moreno Media <contact@estebanmorenomedia.com>";
const REPLY_TO = "esmolopez@gmail.com";

export function loadSeedProspects(seedPath = SEED_PATH) {
  const data = JSON.parse(fs.readFileSync(seedPath, "utf8"));
  return data.prospects || [];
}

/**
 * Load the keyless-discovery feed (scripts/data/discovered-prospects.json) if it
 * exists. Produced by scripts/compliant-prospect-discovery.mjs. Absent/corrupt
 * file => no discovered prospects (the seed still works). Runtime state, gitignored.
 */
export function loadDiscoveredProspects(discoveredPath = DISCOVERED_PATH) {
  if (!fs.existsSync(discoveredPath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(discoveredPath, "utf8"));
    return data.prospects || [];
  } catch {
    return [];
  }
}

/**
 * Merge the hand-verified seed with the daily discovery feed, de-duplicated by
 * normalized business name and (when present) email, so the same business is
 * never queued twice. The seed takes precedence.
 */
export function loadAllProspects({
  seedPath = SEED_PATH,
  discoveredPath = DISCOVERED_PATH,
} = {}) {
  const norm = (s) =>
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  const seed = loadSeedProspects(seedPath);
  const discovered = loadDiscoveredProspects(discoveredPath);
  const seenNames = new Set();
  const seenEmails = new Set();
  const merged = [];
  for (const p of [...seed, ...discovered]) {
    const nameKey = norm(p.name);
    const emailKey = (p.email || "").toLowerCase().trim();
    if (nameKey && seenNames.has(nameKey)) continue;
    if (emailKey && seenEmails.has(emailKey)) continue;
    if (nameKey) seenNames.add(nameKey);
    if (emailKey) seenEmails.add(emailKey);
    merged.push(p);
  }
  return merged;
}

/**
 * Build the outreach drafts. Pure-ish and injectable for tests:
 *   harvestFn(website) -> { emails: string[] }
 * Returns { drafts, skipped }.
 */
export async function buildDrafts({
  prospects,
  suppressionList,
  harvestFn = extractBusinessContactInfo,
}) {
  const drafts = [];
  const skipped = [];

  for (const p of prospects) {
    let email = (p.email || "").trim();

    // Never trust a stored email; harvest a REAL one from the real website.
    if (!email && p.website && harvestFn) {
      try {
        const res = await harvestFn(p.website);
        email = (res.emails || []).find((e) => !isFabricatedEmail(e)) || "";
      } catch {
        email = "";
      }
    }

    const screen = screenRecipient(email, suppressionList);
    if (!screen.ok) {
      skipped.push({ id: p.id, name: p.name, email: email || null, reason: screen.reason });
      continue;
    }

    const { subject, html, text } = buildCompliantOutreachEmail({
      name: p.name,
      city: p.city,
      igHandle: p.igHandle,
      language: p.language,
      email,
    });

    drafts.push({ id: p.id, to: email, name: p.name, language: p.language, subject, html, text });
  }

  return { drafts, skipped };
}

/**
 * Actually transmit one email via Resend. Only reachable after the send gate
 * and compliance preconditions have been asserted. The API key is never logged.
 */
async function sendViaResend(draft) {
  const key = requireResendKey();
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...listUnsubscribeHeaders(draft.to),
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [draft.to],
      reply_to: REPLY_TO,
      subject: draft.subject,
      html: draft.html,
      text: draft.text,
      headers: listUnsubscribeHeaders(draft.to),
      tags: [{ name: "campaign", value: "compliant_outreach" }],
    }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, id: data.id, status: res.status };
}

export async function runCompliantOutreach() {
  loadEnvLocal();

  // Consume the hand-verified seed PLUS the keyless daily discovery feed.
  const prospects = loadAllProspects();
  const suppressionList = loadSuppressionList();
  if (suppressionList === null) {
    console.error("❌ Suppression list is unreadable — failing closed. No drafts, no sends.");
    process.exitCode = 1;
    return;
  }

  const { drafts, skipped } = await buildDrafts({ prospects, suppressionList });

  console.log(`Prepared ${drafts.length} compliant draft(s); skipped ${skipped.length}.`);
  for (const s of skipped) {
    console.log(`  ⏭️  skip ${s.id} ${s.name}: ${s.reason}`);
  }

  const live = sendGateEnabled();
  if (!live) {
    fs.mkdirSync(path.dirname(DRAFTS_OUT), { recursive: true });
    fs.writeFileSync(
      DRAFTS_OUT,
      JSON.stringify(
        {
          mode: "dry-run",
          note: "These are the emails that WOULD be sent. Nothing was transmitted. Set ESTEBAN_SEND_LIVE=1 (and RESEND_API_KEY + ESTEBAN_POSTAL_ADDRESS) to go live.",
          generatedAt: new Date().toISOString(),
          draftCount: drafts.length,
          skipped,
          drafts,
        },
        null,
        2,
      ),
      "utf8",
    );
    console.log(`\n📝 DRY-RUN (default). Wrote ${drafts.length} draft(s) to ${DRAFTS_OUT}. Sent 0 emails.`);
    console.log("   Live send is OFF. Requires ESTEBAN_SEND_LIVE=1 + RESEND_API_KEY + ESTEBAN_POSTAL_ADDRESS.");
    return;
  }

  // LIVE PATH — asserts all preconditions or throws before any transmission.
  assertLiveSendAllowed();
  console.log("\n🚨 LIVE SEND enabled. Transmitting compliant emails...");
  let sent = 0;
  for (const draft of drafts) {
    const result = await sendViaResend(draft);
    if (result.ok) {
      sent++;
      console.log(`  ✅ sent ${draft.id} <${draft.to}> (id ${result.id})`);
    } else {
      console.log(`  ⚠️ failed ${draft.id} <${draft.to}> (status ${result.status})`);
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  console.log(`\nDone. Sent ${sent}/${drafts.length}.`);
}

const isDirect =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirect) {
  runCompliantOutreach().catch((err) => {
    console.error("Dispatcher error:", err.message);
    process.exitCode = 1;
  });
}
