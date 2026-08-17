import { NextResponse } from "next/server";
import {
  formatLeadSummary,
  generateLeadId,
  validateLeadPayload,
  type LeadPayload,
} from "@/lib/lead-responder";
import { safeLeadEvent, type NotificationStatus } from "@/lib/cdp-event";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "esmolopez@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Esteban Moreno Media <contact@estebanmorenomedia.com>";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadPayload>;

    const validation = validateLeadPayload(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const payload = body as LeadPayload;
    const leadId = generateLeadId();
    const formattedBrief = formatLeadSummary(payload);

    let notificationStatus: NotificationStatus = "not_configured";

    // If Resend API Key is set, send instant email notification to Esteban
    if (RESEND_API_KEY) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: [NOTIFY_EMAIL],
            subject: `🔥 [NUEVO LEAD] ${payload.name || payload.email} (${payload.source.toUpperCase()})`,
            text: formattedBrief,
          }),
        });
        notificationStatus = response.ok ? "accepted" : "failed";
      } catch (resendErr) {
        notificationStatus = "failed";
        console.error("Resend API notification error:", resendErr);
      }
    }

    // Privacy-safe ingestion boundary. Never log formattedBrief or the raw
    // payload: they contain contact data and free-text notes.
    console.info("[CDP_EVENT_V1]", JSON.stringify(safeLeadEvent(leadId, payload, notificationStatus)));

    const isEs = payload.locale === "es";

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: isEs
          ? "¡Gracias! Tu solicitud ha sido recibida correctamente."
          : "Thank you! Your inquiry has been successfully received.",
        formattedBrief,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead submission API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error processing lead payload.",
      },
      { status: 500 }
    );
  }
}
