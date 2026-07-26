import { NextResponse } from "next/server";
import {
  formatLeadSummary,
  generateLeadId,
  validateLeadPayload,
  type LeadPayload,
} from "@/lib/lead-responder";

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

    // Console log for serverless logging / webhook routing
    console.log(`[LEAD RECEIVED ${leadId}]`, formattedBrief);

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
