import { NextResponse } from "next/server";
import { authorizedOutcomeRequest, parseOutcomePayload } from "@/lib/cdp-outcome";

export async function POST(request: Request) {
  const token = process.env.CDP_OUTCOME_WRITE_TOKEN ?? "";
  if (!token) {
    return NextResponse.json({ success: false, error: "Outcome intake is not configured." }, { status: 503 });
  }
  if (!authorizedOutcomeRequest(request.headers.get("authorization"), token)) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 401 });
  }
  try {
    const event = parseOutcomePayload(await request.json());
    console.info("[CDP_OUTCOME_V1]", JSON.stringify(event));
    return NextResponse.json({ success: true, outcomeId: event.source_record_id }, { status: 202 });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid outcome payload." }, { status: 400 });
  }
}
