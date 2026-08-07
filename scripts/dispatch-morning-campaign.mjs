import fs from "fs";
import path from "path";
import crypto from "crypto";

import {
  loadEnvLocal,
  loadSuppressionList,
  screenRecipient,
  sendGateEnabled,
  assertLiveSendAllowed,
  requireResendKey,
  appendComplianceFooterHtml,
  listUnsubscribeHeaders,
} from "../lib/outreach-compliance.mjs";

/**
 * Morning campaign dispatcher.
 *
 * SAFETY (see lib/outreach-compliance.mjs):
 *   - No hardcoded Resend key. Key comes only from the env (.env.local).
 *   - Default posture is DRY-RUN. A live send needs ESTEBAN_SEND_LIVE=1 +
 *     RESEND_API_KEY + ESTEBAN_POSTAL_ADDRESS.
 *   - Suppression + fabricated-email screening before EVERY send.
 *   - CAN-SPAM compliance footer appended to every email.
 */

loadEnvLocal();

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Esteban Moreno Media <contact@estebanmorenomedia.com>";
const REPLY_TO_EMAIL = "esmolopez@gmail.com";
const DRAFTS_OUT = path.join(process.cwd(), "public", "leads", "morning-campaign-dryrun.json");
const DELIVERY_LEDGER = path.join(
  process.cwd(),
  "data",
  "outreach",
  "morning-campaign-send-ledger.jsonl",
);

function recipientHash(email) {
  return crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

function deliveryIdempotencyKey(email, campaignDate) {
  return `esteban-morning/${campaignDate}/${recipientHash(email).slice(0, 32)}`;
}

function ensureDeliveryLedgerWritable(ledgerPath = DELIVERY_LEDGER) {
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  const descriptor = fs.openSync(ledgerPath, "a", 0o600);
  fs.closeSync(descriptor);
  fs.chmodSync(ledgerPath, 0o600);
}

function appendDeliveryRecord(record, ledgerPath = DELIVERY_LEDGER) {
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  const safeRecord = {
    observed_at: record.observed_at || new Date().toISOString(),
    campaign: "daily_morning_outreach",
    status: record.status,
    recipient_sha256: recipientHash(record.email),
    provider: "resend",
    provider_id: record.provider_id || null,
    response_status: record.response_status || null,
    error_type: record.error_type || null,
  };
  fs.appendFileSync(ledgerPath, `${JSON.stringify(safeRecord)}\n`, {
    encoding: "utf8",
    mode: 0o600,
  });
  return safeRecord;
}

async function dispatchMorningCampaign() {
  const campaignPath = path.join(process.cwd(), "public", "leads", "daily_morning_campaign.json");
  if (!fs.existsSync(campaignPath)) {
    console.error("❌ No campaign file found. Run daily-google-maps-prospect-scanner.mjs first.");
    process.exitCode = 1;
    return;
  }

  const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
  const suppressionList = loadSuppressionList();
  if (suppressionList === null) {
    console.error("❌ Suppression list unreadable — failing closed. No drafts, no sends.");
    process.exitCode = 1;
    return;
  }

  const live = sendGateEnabled();
  if (live) {
    assertLiveSendAllowed(); // throws unless fully configured + permitted
    ensureDeliveryLedgerWritable(); // fail before the first external request
  }

  const drafts = [];
  const skipped = [];

  for (const item of campaign.results) {
    const targetEmail = item.target?.contactEmail;
    const language = item.target?.lang || item.target?.language || "es";

    const screen = screenRecipient(targetEmail, suppressionList);
    if (!screen.ok) {
      skipped.push({ name: item.target?.name, email: targetEmail || null, reason: screen.reason });
      console.log(`⏭️ Skipping ${item.target?.name}: ${screen.reason}`);
      continue;
    }

    const baseHtml =
      item.emailHtml || `<h1>${item.emailSubject}</h1><p>${item.emailText || ""}</p>`;
    const htmlBody = appendComplianceFooterHtml(baseHtml, targetEmail, { language });

    const draft = { to: targetEmail, name: item.target?.name, subject: item.emailSubject, html: htmlBody };

    if (!live) {
      drafts.push(draft);
      continue;
    }

    let providerAccepted = false;
    try {
      const key = requireResendKey();
      const campaignDate = String(campaign.generatedAt || new Date().toISOString()).slice(0, 10);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          ...listUnsubscribeHeaders(targetEmail),
          "Idempotency-Key": deliveryIdempotencyKey(targetEmail, campaignDate),
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [targetEmail],
          reply_to: REPLY_TO_EMAIL,
          subject: item.emailSubject,
          html: htmlBody,
          headers: listUnsubscribeHeaders(targetEmail),
          tags: [{ name: "campaign", value: "daily_morning_outreach" }],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        providerAccepted = true;
        appendDeliveryRecord({
          status: "accepted",
          email: targetEmail,
          provider_id: data.id,
          response_status: res.status,
        });
        console.log(`✅ Sent to ${item.target?.name} <${targetEmail}> | id ${data.id}`);
      } else {
        appendDeliveryRecord({
          status: "failed",
          email: targetEmail,
          response_status: res.status,
          error_type: "provider_rejected",
        });
        console.log(`⚠️ Resend error for ${item.target?.name}: status ${res.status}`);
      }
    } catch (e) {
      if (!providerAccepted) {
        appendDeliveryRecord({
          status: "failed",
          email: targetEmail,
          error_type: e instanceof Error ? e.name : "unknown_error",
        });
      }
      console.error(`💥 Failed to send to ${item.target?.name}: ${e.message}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (!live) {
    fs.mkdirSync(path.dirname(DRAFTS_OUT), { recursive: true });
    fs.writeFileSync(
      DRAFTS_OUT,
      JSON.stringify({ mode: "dry-run", generatedAt: new Date().toISOString(), draftCount: drafts.length, skipped, drafts }, null, 2),
      "utf8",
    );
    console.log(`\n📝 DRY-RUN. Wrote ${drafts.length} draft(s) to ${DRAFTS_OUT}; skipped ${skipped.length}. Sent 0.`);
    console.log("   Live send OFF. Requires ESTEBAN_SEND_LIVE=1 + RESEND_API_KEY + ESTEBAN_POSTAL_ADDRESS.");
  }
}

if (process.argv[1]?.includes("dispatch-morning-campaign.mjs")) {
  dispatchMorningCampaign().catch((e) => {
    console.error("Dispatcher error:", e.message);
    process.exitCode = 1;
  });
}

export {
  DELIVERY_LEDGER,
  appendDeliveryRecord,
  deliveryIdempotencyKey,
  dispatchMorningCampaign,
  ensureDeliveryLedgerWritable,
  recipientHash,
};
