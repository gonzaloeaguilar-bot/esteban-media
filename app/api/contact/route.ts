import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  BUDGET_LABELS,
  DEADLINE_LABELS,
  FINAL_PLATFORM_LABELS,
  FOOTAGE_STATUS_LABELS,
  SHOOT_NEEDED_LABELS,
  contactSchema,
  type BudgetRange,
  type DeadlineOption,
  type FinalPlatformOption,
  type FootageStatusOption,
  type ShootNeededOption,
} from "@/lib/contact-schema";
import {
  CANONICAL_SERVICE_NAMES,
  type ServiceSlug,
} from "@/lib/services";

/**
 * Contact form submission handler.
 *
 * Flow:
 *  1. Parse JSON body against `contactSchema` (shared with the client form).
 *  2. If the honeypot `website` field is non-empty, silently return 200.
 *     Bots that filled it think their submission went through; no email is
 *     sent. This is cheaper and less leaky than a 4xx response.
 *  3. If `RESEND_API_KEY` is missing, log a warning and return 503 so the
 *     UI can surface a real error to the visitor. Don't throw — that just
 *     becomes a 500 with no useful info downstream.
 *  4. Send via Resend from the sandbox sender (`onboarding@resend.dev`)
 *     until the domain is verified. Plain-text body is plenty for now.
 *
 * Rate limiting and CAPTCHA are intentionally deferred — see backlog notes.
 */

export const runtime = "nodejs";

// Hardcoded fallback per task spec. The Vercel env var wins if both are set.
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ?? "gagui010@icloud.com";

// Resend's sandbox sender. Swap to a verified domain once DNS is live.
const FROM_ADDRESS = "Esteban Moreno Media <onboarding@resend.dev>";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const {
    name,
    email,
    projectType,
    budget,
    deadline,
    city,
    finalPlatform,
    footageStatus,
    shootNeeded,
    message,
    website,
  } = parsed.data;

  // Honeypot trip: pretend everything is fine.
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true, honeypot: true }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Visible in Vercel logs; the UI surfaces a generic "try again" toast.
    console.warn(
      "[contact] RESEND_API_KEY missing — cannot send email. " +
        "Set it in Vercel project env (or .env.local for dev).",
    );
    return NextResponse.json(
      {
        ok: false,
        error: "Email service not configured. Please email us directly.",
      },
      { status: 503 },
    );
  }

  const projectLabel =
    CANONICAL_SERVICE_NAMES[projectType as ServiceSlug] ?? projectType;
  const budgetLabel = BUDGET_LABELS[budget as BudgetRange] ?? budget;
  const deadlineLabel =
    DEADLINE_LABELS[deadline as DeadlineOption] ?? deadline;
  const footageStatusLabel =
    FOOTAGE_STATUS_LABELS[footageStatus as FootageStatusOption] ??
    footageStatus;
  const finalPlatformLabel = finalPlatform
    .map(
      (slug) =>
        FINAL_PLATFORM_LABELS[slug as FinalPlatformOption] ?? slug,
    )
    .join(", ");
  // shootNeeded is optional; infer a sensible default from footageStatus so
  // Esteban always has a yes/no/unsure line in the email even when the
  // visitor didn't pick one explicitly.
  const inferredShootNeeded: ShootNeededOption =
    shootNeeded ??
    (footageStatus === "all-captured"
      ? "no"
      : footageStatus === "needs-capture" || footageStatus === "have-some"
        ? "yes"
        : "unsure");
  const shootNeededLabel = `${SHOOT_NEEDED_LABELS[inferredShootNeeded]}${
    shootNeeded ? "" : " (inferred from footage status)"
  }`;

  const subject = `New inquiry — ${projectLabel} · ${deadlineLabel} · ${city} (${name})`;
  const text = [
    `New contact form submission from estebanmorenomedia.com`,
    ``,
    `Name:           ${name}`,
    `Email:          ${email}`,
    `City:           ${city}`,
    `Project type:   ${projectLabel}`,
    `Budget:         ${budgetLabel}`,
    `Deadline:       ${deadlineLabel}`,
    `Final platform: ${finalPlatformLabel}`,
    `Footage status: ${footageStatusLabel}`,
    `Shoot needed:   ${shootNeededLabel}`,
    ``,
    `Message:`,
    message,
    ``,
    `--`,
    `Reply directly to this email to respond to ${name}.`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject,
      text,
    });

    if (error) {
      console.error("[contact] Resend returned an error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Unexpected error sending email:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
