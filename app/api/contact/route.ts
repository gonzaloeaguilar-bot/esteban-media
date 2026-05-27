/**
 * POST /api/contact — receives a contact-form submission and emails it to
 * `gagui010@icloud.com` (Gonzalo) until Esteban's own address is wired.
 *
 * Transport: Resend. Resend free tier covers 3,000 emails/month, well past
 * anything this site will see pre-launch. If `RESEND_API_KEY` is missing
 * (e.g. local dev without secrets) the route logs the payload and still
 * returns 200 so the UX path is testable end-to-end.
 *
 * Spam: honeypot field `website` — bots fill every text input; humans don't
 * see the field because it's visually hidden. If it has any value, we return
 * 200 OK without dispatching mail (and without telling the bot anything).
 *
 * Validation is authoritative server-side via `lib/contact.ts`. The client
 * runs the same function for snappy feedback but does NOT control the gate.
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  CONTACT_RECIPIENT,
  renderEmailHtml,
  renderEmailText,
  validateSubmission,
} from "@/lib/contact";

export const runtime = "nodejs";
// Always evaluated per request — no caching, no static optimization.
export const dynamic = "force-dynamic";

/**
 * `onboarding@resend.dev` is the no-setup-required sender Resend exposes for
 * accounts that haven't verified a domain yet. Swap to `notifications@<domain>`
 * once a domain is purchased and verified in Resend.
 */
const FROM_ADDRESS =
  process.env.CONTACT_FROM_ADDRESS ?? "Esteban Media <onboarding@resend.dev>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  // Honeypot short-circuit. Done BEFORE validation so bots see the same 200
  // they'd see on success — no signal about the trap.
  if (
    body &&
    typeof body === "object" &&
    typeof (body as { website?: unknown }).website === "string" &&
    (body as { website: string }).website.trim() !== ""
  ) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const result = validateSubmission(body);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 422 },
    );
  }

  const submission = result.data;
  const apiKey = process.env.RESEND_API_KEY;

  // Dev / preview without secrets: log + succeed so the form UX can be tested.
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — logging submission instead of sending.",
    );
    console.info("[contact] submission:", submission);
    return NextResponse.json({ ok: true, delivered: false }, { status: 200 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_RECIPIENT,
      replyTo: submission.email,
      subject: `New inquiry — ${submission.name}`,
      text: renderEmailText(submission),
      html: renderEmailHtml(submission),
    });

    if (error) {
      console.error("[contact] Resend returned error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] unexpected send failure:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }
}
