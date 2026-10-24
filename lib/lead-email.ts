import type { LeadPayload } from "@/lib/lead-responder";
import type { NotificationStatus } from "@/lib/cdp-event";

type FetchLike = typeof fetch;
type LeadEmailEnv = Partial<Pick<NodeJS.ProcessEnv, "RESEND_API_KEY" | "LEAD_NOTIFY_EMAIL" | "RESEND_FROM_EMAIL" | "LEAD_AUTOREPLY_ENABLED">>;

export interface LeadEmailResult {
  notificationStatus: NotificationStatus;
  acknowledgementSent: boolean;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function acknowledgement(payload: LeadPayload): { subject: string; text: string } {
  const spanish = payload.locale === "es";
  return spanish
    ? {
        subject: "Recibimos tu mensaje — Esteban Moreno Media",
        text: [
          "Gracias por escribir a Esteban Moreno Media.",
          "Recibimos tu mensaje y revisaremos los detalles antes de responder.",
          "Para preparar una cotización, indícanos la meta del proyecto, la fecha deseada, la ubicación y cualquier referencia o material que ya tengas.",
          "Este correo confirma la recepción; no confirma disponibilidad, precio ni alcance.",
        ].join("\n\n"),
      }
    : {
        subject: "We received your message — Esteban Moreno Media",
        text: [
          "Thank you for contacting Esteban Moreno Media.",
          "We received your message and will review the details before replying.",
          "To prepare a quote, please share the project goal, desired date, location, and any references or existing footage.",
          "This email confirms receipt only; it does not confirm availability, price, or scope.",
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
 * Acknowledgements require an explicit opt-in and are never sent for test rows.
 */
export async function sendLeadEmails(
  payload: LeadPayload,
  brief: string,
  { env = process.env as LeadEmailEnv, fetchImpl = fetch, isTest = false }: { env?: LeadEmailEnv; fetchImpl?: FetchLike; isTest?: boolean } = {},
): Promise<LeadEmailResult> {
  const apiKey = text(env.RESEND_API_KEY);
  const notifyEmail = text(env.LEAD_NOTIFY_EMAIL) || "info@estebanmorenomedia.com";
  const from = text(env.RESEND_FROM_EMAIL) || "Esteban Moreno Media <info@estebanmorenomedia.com>";
  if (!apiKey || isTest) return { notificationStatus: "not_configured", acknowledgementSent: false };

  const notified = await deliver(fetchImpl, apiKey, {
    from,
    to: [notifyEmail],
    subject: `[NUEVO LEAD] ${payload.name || payload.email} (${payload.source.toUpperCase()})`,
    text: brief,
  });
  if (!notified) return { notificationStatus: "failed", acknowledgementSent: false };

  if (text(env.LEAD_AUTOREPLY_ENABLED) !== "1") {
    return { notificationStatus: "accepted", acknowledgementSent: false };
  }
  const reply = acknowledgement(payload);
  const acknowledgementSent = await deliver(fetchImpl, apiKey, {
    from,
    to: [payload.email],
    reply_to: notifyEmail,
    subject: reply.subject,
    text: reply.text,
  });
  return { notificationStatus: "accepted", acknowledgementSent };
}
