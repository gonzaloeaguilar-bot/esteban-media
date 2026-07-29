import fs from "fs";
import path from "path";

import {
  loadEnvLocal,
  loadSuppressionList,
  screenRecipient,
  sendGateEnabled,
  assertLiveSendAllowed,
  requireResendKey,
  listUnsubscribeHeaders,
} from "../lib/outreach-compliance.mjs";
import { buildCompliantOutreachEmail } from "../lib/compliant-outreach-email.mjs";

/**
 * Automated lead dispatcher.
 *
 * SAFETY (see lib/outreach-compliance.mjs):
 *   - No hardcoded Resend key; env-only, fail loud if missing.
 *   - Default DRY-RUN. Live send needs ESTEBAN_SEND_LIVE=1 + RESEND_API_KEY +
 *     ESTEBAN_POSTAL_ADDRESS.
 *   - Suppression + fabricated-email screening before EVERY send.
 *   - Uses the compliant, generic template (remote-editing anchor) with the
 *     CAN-SPAM footer — never the old fabricated-metrics template.
 */

loadEnvLocal();

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Esteban Moreno Media <contact@estebanmorenomedia.com>";
const REPLY_TO = "esmolopez@gmail.com";
const DEFAULT_LEADS_FILE = path.join(process.cwd(), "public", "leads", "outreach-dryrun-drafts.json");
const DRAFTS_OUT = path.join(process.cwd(), "public", "leads", "auto-dispatch-dryrun.json");

async function sendEmailViaResend(draft) {
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
      text: draft.text,
      html: draft.html,
      headers: listUnsubscribeHeaders(draft.to),
      tags: [{ name: "campaign", value: "automated_leads_dispatch" }],
    }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, id: data.id, status: res.status };
}

export async function dispatchAutomatedLeads(leadsFilePath = DEFAULT_LEADS_FILE) {
  if (!fs.existsSync(leadsFilePath)) {
    console.error(`❌ File not found: ${leadsFilePath}`);
    process.exitCode = 1;
    return;
  }

  const parsed = JSON.parse(fs.readFileSync(leadsFilePath, "utf8"));
  const leads = Array.isArray(parsed) ? parsed : parsed.drafts || [];
  const suppressionList = loadSuppressionList();
  if (suppressionList === null) {
    console.error("❌ Suppression list unreadable — failing closed.");
    process.exitCode = 1;
    return;
  }

  const live = sendGateEnabled();
  if (live) assertLiveSendAllowed();

  console.log(`Processing ${leads.length} lead(s). Live send: ${live ? "ON" : "OFF (dry-run)"}`);

  const drafts = [];
  const skipped = [];

  for (const item of leads) {
    const target = item.restaurant || item.prospect || item.business || item.target || item;
    const recipientEmail = item.to || target.contactEmail || target.email;

    const screen = screenRecipient(recipientEmail, suppressionList);
    if (!screen.ok) {
      skipped.push({ name: target.name, email: recipientEmail || null, reason: screen.reason });
      console.log(`⏭️ Skipping ${target.name}: ${screen.reason}`);
      continue;
    }

    const built = buildCompliantOutreachEmail({
      name: target.name,
      city: target.city || "",
      igHandle: target.igHandle || "",
      language: target.language || target.lang || "es",
      email: recipientEmail,
    });
    const draft = { to: recipientEmail, name: target.name, subject: built.subject, html: built.html, text: built.text };

    if (!live) {
      drafts.push(draft);
      continue;
    }

    const result = await sendEmailViaResend(draft);
    console.log(result.ok ? `✅ Sent to ${draft.to} (id ${result.id})` : `⚠️ Failed ${draft.to} (status ${result.status})`);
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (!live) {
    fs.mkdirSync(path.dirname(DRAFTS_OUT), { recursive: true });
    fs.writeFileSync(
      DRAFTS_OUT,
      JSON.stringify({ mode: "dry-run", generatedAt: new Date().toISOString(), draftCount: drafts.length, skipped, drafts }, null, 2),
      "utf8",
    );
    console.log(`\n📝 DRY-RUN. Wrote ${drafts.length} draft(s) to ${DRAFTS_OUT}; skipped ${skipped.length}. Sent 0.`);
  }
}

if (process.argv[1]?.includes("auto-email-dispatcher")) {
  const fileArg = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_LEADS_FILE;
  dispatchAutomatedLeads(fileArg);
}
