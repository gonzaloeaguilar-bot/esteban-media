import { NextResponse } from "next/server";
import {
  formatLeadSummary,
  generateLeadId,
  validateLeadPayload,
  type LeadPayload,
} from "@/lib/lead-responder";
import { safeLeadEvent, type NotificationStatus } from "@/lib/cdp-event";
import { buildLeadRow, insertLead, markEmailSent } from "@/lib/lead-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    let body: Partial<LeadPayload>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 });
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: "Invalid lead payload." }, { status: 400 });
    }

    const validation = validateLeadPayload(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const payload = body as LeadPayload;
    const leadRef = generateLeadId();
    const stored = await insertLead(buildLeadRow(payload, {
      leadRef,
      userAgent: request.headers.get("user-agent") || "",
      isTest: request.headers.get("x-esteban-test") === "1",
    }));
    if (!stored.ok) {
      console.error("Lead persistence failed:", { reason: stored.reason, status: stored.status });
    }

    const leadId = stored.ok ? stored.id : leadRef;
    const formattedBrief = formatLeadSummary(payload);
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const notifyEmail = process.env.LEAD_NOTIFY_EMAIL || "esmolopez@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Esteban Moreno Media <contact@estebanmorenomedia.com>";

    let notificationStatus: NotificationStatus = "not_configured";

    // If Resend API Key is set, send instant email notification to Esteban
    if (resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [notifyEmail],
            subject: `[NUEVO LEAD] ${payload.name || payload.email} (${payload.source.toUpperCase()})`,
            text: formattedBrief,
          }),
          signal: AbortSignal.timeout(8000),
        });
        notificationStatus = response.ok ? "accepted" : "failed";
        if (!response.ok) console.error("Resend API notification failed:", { status: response.status });
      } catch {
        notificationStatus = "failed";
        console.error("Resend API notification failed:", { reason: "network_error" });
      }
    }

    const isEs = payload.locale === "es";
    if (!stored.ok && notificationStatus !== "accepted") {
      return NextResponse.json(
        {
          success: false,
          error: isEs
            ? "No pudimos recibir tu solicitud en este momento. Por favor, llámanos o escríbenos directamente por correo electrónico."
            : "We could not receive your request right now. Please call or email directly.",
        },
        { status: 503 },
      );
    }
    if (stored.ok && notificationStatus === "accepted") {
      await markEmailSent(stored.id);
    }

    // Privacy-safe ingestion boundary. Never log formattedBrief or the raw
    // payload: they contain contact data and free-text notes.
    console.info("[CDP_EVENT_V1]", JSON.stringify(safeLeadEvent(leadId, payload, notificationStatus)));

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
