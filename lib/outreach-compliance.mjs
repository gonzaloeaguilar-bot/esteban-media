/**
 * Esteban Moreno Media — Outbound Compliance & Safety Core
 *
 * Single source of truth for the guardrails that make autonomous cold email
 * lawful and safe. Every dispatcher MUST route through these helpers.
 *
 * Guarantees enforced here:
 *   1. NO hardcoded secrets. RESEND_API_KEY comes ONLY from the environment
 *      (.env.local, gitignored). Missing key => fail loud, never a silent send.
 *   2. NO fabricated recipients. `.example`, `555…`, self-referencing, or
 *      malformed addresses are rejected before they can reach a send.
 *   3. Suppression list checked before EVERY send (unsubscribed + bounced).
 *   4. CAN-SPAM footer: physical postal address + working unsubscribe link.
 *   5. Send gate: transmission requires ESTEBAN_SEND_LIVE=1 AND RESEND_API_KEY.
 *      Default posture is DRY-RUN.
 *
 * The Resend key value is never logged or interpolated into output by anything
 * in this module.
 */

import fs from "fs";
import path from "path";

export const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://estebanmorenomedia.com";

export const SUPPRESSION_PATH = path.join(
  process.cwd(),
  "public",
  "leads",
  "suppression-list.json",
);

/**
 * Load .env.local into process.env without overwriting existing values.
 * .env.local is gitignored and is the CORRECT home for RESEND_API_KEY.
 */
export function loadEnvLocal(cwd = process.cwd()) {
  const envPath = path.join(cwd, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    const val = match[2].trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

/**
 * Return the Resend API key from the environment, or throw loudly.
 * There is deliberately NO hardcoded fallback. The value is never echoed.
 */
export function requireResendKey() {
  const key = (process.env.RESEND_API_KEY || "").trim();
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to .env.local (gitignored) — that is the " +
        "correct home for the Resend key. Refusing to continue: no hardcoded fallback " +
        "exists by design.",
    );
  }
  return key;
}

/**
 * Detect fabricated / placeholder / invalid recipient addresses.
 * Returns true if the address must NOT be emailed.
 */
export function isFabricatedEmail(email) {
  if (!email || typeof email !== "string") return true;
  const e = email.trim().toLowerCase();
  if (!e) return true;
  // Must look like a real address.
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/.test(e)) return true;
  // Placeholder / example domains.
  if (e.includes(".example") || e.includes("example.com") || e.includes("example.org"))
    return true;
  // 555 fake-number placeholders leaking into local-parts.
  if (e.includes("555")) return true;
  // Self-referencing (never email our own domain as a "prospect").
  if (e.includes("estebanmorenomedia")) return true;
  // Common template placeholders.
  if (
    e.includes("yourdomain") ||
    e.includes("your-domain") ||
    e.startsWith("test@") ||
    e.includes("noreply") ||
    e.includes("no-reply")
  )
    return true;
  return false;
}

/**
 * Load the suppression list. Returns { unsubscribed: [], bounced: [] } when the
 * file is absent, or null when the file exists but cannot be parsed (fail-closed:
 * an unreadable suppression list suppresses everything).
 */
export function loadSuppressionList(suppressionPath = SUPPRESSION_PATH) {
  if (!fs.existsSync(suppressionPath)) {
    return { unsubscribed: [], bounced: [] };
  }
  try {
    const data = JSON.parse(fs.readFileSync(suppressionPath, "utf8"));
    return {
      unsubscribed: (data.unsubscribed || []).map((x) =>
        String(x).toLowerCase().trim(),
      ),
      bounced: (data.bounced || []).map((x) => String(x).toLowerCase().trim()),
    };
  } catch {
    return null; // fail-closed
  }
}

/**
 * True if `email` must be skipped because it is unsubscribed or previously
 * bounced. A null list (unreadable) suppresses everything.
 */
export function isSuppressed(email, list) {
  if (list === null) return true;
  if (!email) return true;
  const e = String(email).toLowerCase().trim();
  return list.unsubscribed.includes(e) || list.bounced.includes(e);
}

/**
 * Record an address on the suppression list (idempotent). Used by the
 * unsubscribe / bounce-handling path. Reason is "unsubscribed" or "bounced".
 */
export function addToSuppressionList(
  email,
  reason = "unsubscribed",
  suppressionPath = SUPPRESSION_PATH,
) {
  const e = String(email || "").toLowerCase().trim();
  if (!e) return false;
  let data = { unsubscribed: [], bounced: [] };
  if (fs.existsSync(suppressionPath)) {
    try {
      data = JSON.parse(fs.readFileSync(suppressionPath, "utf8"));
    } catch {
      data = { unsubscribed: [], bounced: [] };
    }
  }
  const bucket = reason === "bounced" ? "bounced" : "unsubscribed";
  data[bucket] = data[bucket] || [];
  if (
    !data[bucket].map((x) => String(x).toLowerCase().trim()).includes(e)
  ) {
    data[bucket].push(e);
  }
  data.updatedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(suppressionPath), { recursive: true });
  fs.writeFileSync(suppressionPath, JSON.stringify(data, null, 2), "utf8");
  return true;
}

/**
 * Physical postal mailing address for the CAN-SPAM footer.
 * MUST be a real mailing address (P.O. box or CMRA) — NEVER Esteban's home
 * address. Supplied only via ESTEBAN_POSTAL_ADDRESS. Unset => null (compliance
 * invalid, live send blocked).
 */
export function postalAddress() {
  const addr = (process.env.ESTEBAN_POSTAL_ADDRESS || "").trim();
  return addr || null;
}

/** Working unsubscribe URL for a given recipient. */
export function unsubscribeUrl(email) {
  const q = email
    ? `?email=${encodeURIComponent(String(email).toLowerCase().trim())}`
    : "";
  return `${SITE_BASE_URL}/unsubscribe${q}`;
}

/** Mailto one-click unsubscribe target (List-Unsubscribe header). */
export function unsubscribeMailto() {
  return "unsubscribe@estebanmorenomedia.com";
}

/**
 * True only when it is both permitted (ESTEBAN_SEND_LIVE=1) and configured
 * (RESEND_API_KEY present) to actually transmit email. Default => false.
 */
export function sendGateEnabled() {
  return (
    process.env.ESTEBAN_SEND_LIVE === "1" &&
    !!(process.env.RESEND_API_KEY || "").trim()
  );
}

/**
 * Assert that a live send is lawful and fully configured. Throws otherwise.
 * Requires the send gate AND a real postal address for CAN-SPAM.
 */
export function assertLiveSendAllowed() {
  if (process.env.ESTEBAN_SEND_LIVE !== "1") {
    throw new Error(
      "Live send disabled: ESTEBAN_SEND_LIVE is not '1'. Default posture is dry-run.",
    );
  }
  requireResendKey();
  if (!postalAddress()) {
    throw new Error(
      "Live send blocked: ESTEBAN_POSTAL_ADDRESS is unset. CAN-SPAM requires a real " +
        "postal mailing address in the footer (a P.O. box / CMRA — never Esteban's home address).",
    );
  }
}

/**
 * Decide whether a single prospect may be emailed. Pure + side-effect free so
 * it is trivially testable. Returns { ok, reason }.
 */
export function screenRecipient(email, suppressionList) {
  if (isFabricatedEmail(email)) {
    return { ok: false, reason: "fabricated_or_invalid_email" };
  }
  if (isSuppressed(email, suppressionList)) {
    return { ok: false, reason: "suppressed" };
  }
  return { ok: true, reason: "ok" };
}

/** CAN-SPAM compliant HTML footer: physical address + unsubscribe. */
export function complianceFooterHtml(email, { language = "es" } = {}) {
  const addr =
    postalAddress() ||
    (language === "es"
      ? "[Dirección postal pendiente — configurar ESTEBAN_POSTAL_ADDRESS]"
      : "[Postal address pending — set ESTEBAN_POSTAL_ADDRESS]");
  const unsub = unsubscribeUrl(email);
  const whyLine =
    language === "es"
      ? "Recibes este correo porque Esteban Moreno Media contactó a tu negocio local para ofrecer edición de video remota."
      : "You received this email because Esteban Moreno Media reached out to your local business about remote video editing.";
  const unsubLabel = language === "es" ? "Cancelar suscripción" : "Unsubscribe";
  return `
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;border-top:1px solid #e4e4e7;">
    <tr>
      <td style="padding-top:16px;font-family:Arial,Helvetica,sans-serif;">
        <p style="font-size:12px;color:#71717a;margin:0 0 6px 0;font-weight:700;">Esteban Moreno Media</p>
        <p style="font-size:12px;color:#a1a1aa;margin:0 0 6px 0;">${addr}</p>
        <p style="font-size:12px;color:#a1a1aa;margin:0 0 10px 0;">${whyLine}</p>
        <p style="font-size:12px;color:#a1a1aa;margin:0;">
          <a href="${unsub}" style="color:#2563eb;text-decoration:underline;">${unsubLabel}</a>
        </p>
      </td>
    </tr>
  </table>`;
}

/** CAN-SPAM compliant plain-text footer. */
export function complianceFooterText(email, { language = "es" } = {}) {
  const addr =
    postalAddress() ||
    (language === "es"
      ? "[Direccion postal pendiente - configurar ESTEBAN_POSTAL_ADDRESS]"
      : "[Postal address pending - set ESTEBAN_POSTAL_ADDRESS]");
  const unsub = unsubscribeUrl(email);
  const whyLine =
    language === "es"
      ? "Recibes este correo porque Esteban Moreno Media contacto a tu negocio local para ofrecer edicion de video remota."
      : "You received this email because Esteban Moreno Media reached out to your local business about remote video editing.";
  const unsubLabel = language === "es" ? "Cancelar suscripcion" : "Unsubscribe";
  return `\n\n---\nEsteban Moreno Media\n${addr}\n${whyLine}\n${unsubLabel}: ${unsub}\n`;
}

/** Append the compliance footer to an HTML body (before </body> when present). */
export function appendComplianceFooterHtml(html, email, opts = {}) {
  const footer = complianceFooterHtml(email, opts);
  if (typeof html === "string" && html.includes("</body>")) {
    return html.replace("</body>", `${footer}\n</body>`);
  }
  return `${html || ""}${footer}`;
}

/** Standard RFC 8058 one-click unsubscribe headers for the Resend payload. */
export function listUnsubscribeHeaders(email) {
  return {
    "List-Unsubscribe": `<mailto:${unsubscribeMailto()}?subject=unsubscribe>, <${unsubscribeUrl(email)}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}
