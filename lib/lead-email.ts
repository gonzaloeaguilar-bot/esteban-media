import type { LeadPayload } from "@/lib/lead-responder";
import type { NotificationStatus } from "@/lib/cdp-event";

type FetchLike = typeof fetch;
type LeadEmailEnv = Partial<Pick<NodeJS.ProcessEnv, "RESEND_API_KEY" | "LEAD_NOTIFY_EMAIL" | "RESEND_FROM_EMAIL" | "LEAD_AUTOREPLY_ENABLED">>;

export interface LeadEmailResult {
  notificationStatus: NotificationStatus;
  acknowledgementSent: boolean;
}

/** Leads always hear back from, and reply to, the public business mailbox. */
const PUBLIC_SENDER = "Esteban Moreno Media <info@estebanmorenomedia.com>";
const PUBLIC_MAILBOX = "info@estebanmorenomedia.com";
const SIGNATURE = "Esteban Moreno\ninfo@estebanmorenomedia.com · (305) 497-4478";

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * First name for the greeting. The form field is free text sent to an address
 * the visitor chose, so a value that is not a plain name (letters only) is left out
 * rather than relayed from the business mailbox.
 */
export function greetingName(name: unknown): string {
  const full = text(name);
  if (full.length > 60 || !/^[\p{L}][\p{L}'’. -]*$/u.test(full)) return "";
  const first = full.split(/\s+/)[0].replace(/\.$/, "");
  return first.length <= 30 ? first : "";
}

function acknowledgement(payload: LeadPayload): { subject: string; text: string } {
  const name = greetingName(payload.name);
  return payload.locale === "es"
    ? {
        subject: `Recibí tu mensaje${name ? `, ${name}` : ""} — Esteban Moreno Media`,
        text: [
          name ? `Hola, ${name}:` : "Hola:",
          "Gracias por escribirme. Recibí tu mensaje y lo voy a leer con calma antes de responderte.",
          "Si quieres adelantar, responde a este correo con tu meta, la fecha que tienes en mente, la ubicación y cualquier referencia o material que ya tengas.",
          "Te confirmo precio, alcance y disponibilidad por escrito cuando haya visto los detalles.",
          SIGNATURE,
        ].join("\n\n"),
      }
    : {
        subject: `Got your message${name ? `, ${name}` : ""} — Esteban Moreno Media`,
        text: [
          name ? `Hi ${name},` : "Hi,",
          "Thanks for reaching out. I got your message and I'll read it carefully before I reply.",
          "If you'd like to speed things up, reply to this email with your goal, the date you have in mind, the location, and any references or footage you already have.",
          "I'll confirm price, scope and availability in writing once I've seen the details.",
          SIGNATURE,
        ].join("\n\n"),
      };
}

async function deliver(fetchImpl: FetchLike, apiKey: string, body: Record<string, unknown>): Promise<boolean> {
  try {
    const response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Sends only the safe, first-touch messages for a persisted website lead.
 * Every real lead gets the receipt from info@estebanmorenomedia.com once
 * Esteban's alert is accepted. LEAD_AUTOREPLY_ENABLED=0 switches it off;
 * test rows never send anything.
 */
export async function sendLeadEmails(
  payload: LeadPayload,
  brief: string,
  { env = process.env as LeadEmailEnv, fetchImpl = fetch, isTest = false }: { env?: LeadEmailEnv; fetchImpl?: FetchLike; isTest?: boolean } = {},
): Promise<LeadEmailResult> {
  const apiKey = text(env.RESEND_API_KEY);
  const notifyEmail = text(env.LEAD_NOTIFY_EMAIL) || "info@estebanmorenomedia.com";
  const from = text(env.RESEND_FROM_EMAIL) || PUBLIC_SENDER;
  if (!apiKey || isTest) return { notificationStatus: "not_configured", acknowledgementSent: false };

  const notified = await deliver(fetchImpl, apiKey, {
    from,
    to: [notifyEmail],
    subject: `[NUEVO LEAD] ${payload.name || payload.email} (${payload.source.toUpperCase()})`,
    text: brief,
  });
  if (!notified) return { notificationStatus: "failed", acknowledgementSent: false };

  if (text(env.LEAD_AUTOREPLY_ENABLED) === "0") {
    return { notificationStatus: "accepted", acknowledgementSent: false };
  }
  const reply = acknowledgement(payload);
  const acknowledgementSent = await deliver(fetchImpl, apiKey, {
    from: PUBLIC_SENDER,
    to: [payload.email],
    reply_to: PUBLIC_MAILBOX,
    subject: reply.subject,
    text: reply.text,
  });
  return { notificationStatus: "accepted", acknowledgementSent };
}
