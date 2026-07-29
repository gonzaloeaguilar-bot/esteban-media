import fs from "fs";
import path from "path";

import {
  loadEnvLocal,
  sendGateEnabled,
  assertLiveSendAllowed,
  requireResendKey,
  listUnsubscribeHeaders,
} from "../lib/outreach-compliance.mjs";
import { buildCompliantOutreachEmail } from "../lib/compliant-outreach-email.mjs";

/**
 * Internal PREVIEW tool: renders the compliant outreach email so Gonzalo/Esteban
 * can review exactly what a prospect would receive.
 *
 * SAFETY:
 *   - No hardcoded Resend key; env-only.
 *   - Default DRY-RUN: writes the rendered HTML to disk, sends nothing.
 *   - Sends the preview to the INTERNAL recipient list only, and only when
 *     ESTEBAN_SEND_LIVE=1 + RESEND_API_KEY + ESTEBAN_POSTAL_ADDRESS are set.
 *   - Uses a clearly-labeled SAMPLE prospect — never a fabricated real business.
 */

loadEnvLocal();

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Esteban Moreno Media <contact@estebanmorenomedia.com>";
// Internal reviewers only (consented). Not prospects.
const RECIPIENTS = (process.env.SAMPLE_PREVIEW_RECIPIENTS || "gonzalo.e.aguilar@gmail.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const PREVIEW_OUT = path.join(process.cwd(), "public", "leads", "sample-preview.html");

async function sendSamplePreview() {
  const sample = buildCompliantOutreachEmail({
    name: "[MUESTRA / SAMPLE — negocio ficticio]",
    city: "Fort Lauderdale",
    igHandle: "",
    language: "es",
    email: RECIPIENTS[0] || "preview@example.com",
  });

  const live = sendGateEnabled();

  if (!live) {
    fs.mkdirSync(path.dirname(PREVIEW_OUT), { recursive: true });
    fs.writeFileSync(PREVIEW_OUT, sample.html, "utf8");
    console.log(`📝 DRY-RUN. Wrote compliant sample preview to ${PREVIEW_OUT}. Sent 0 emails.`);
    console.log("   To email the preview to internal reviewers: set ESTEBAN_SEND_LIVE=1 + RESEND_API_KEY + ESTEBAN_POSTAL_ADDRESS.");
    return;
  }

  assertLiveSendAllowed();
  const key = requireResendKey();
  for (const to of RECIPIENTS) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          ...listUnsubscribeHeaders(to),
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [to],
          subject: `[PREVIEW] ${sample.subject}`,
          html: sample.html,
          text: sample.text,
          headers: listUnsubscribeHeaders(to),
        }),
      });
      const data = await res.json().catch(() => ({}));
      console.log(res.ok ? `✅ Preview sent to ${to} (id ${data.id})` : `⚠️ Failed ${to} (status ${res.status})`);
    } catch (err) {
      console.error(`❌ Error sending preview to ${to}: ${err.message}`);
    }
  }
}

sendSamplePreview().catch((e) => {
  console.error("Preview error:", e.message);
  process.exitCode = 1;
});
