import { z } from "zod";

import { SERVICE_SLUGS } from "@/lib/services";

/**
 * Budget bands offered in the Contact form's "budget" dropdown.
 *
 * Kept intentionally coarse — fine-grained quotes happen over email after
 * the inquiry lands. The "undecided" option keeps the form forgiving for
 * folks who don't yet know what a shoot costs.
 */
export const BUDGET_RANGES = [
  "under-1k",
  "1k-3k",
  "3k-7k",
  "7k-15k",
  "15k-plus",
  "undecided",
] as const;

export type BudgetRange = (typeof BUDGET_RANGES)[number];

/** Human-readable labels paired with each budget slug. */
export const BUDGET_LABELS: Record<BudgetRange, string> = {
  "under-1k": "Under $1,000",
  "1k-3k": "$1,000 – $3,000",
  "3k-7k": "$3,000 – $7,000",
  "7k-15k": "$7,000 – $15,000",
  "15k-plus": "$15,000+",
  undecided: "Not sure yet",
};

/**
 * Deadline buckets — coarse enums convert better than a date picker, and
 * Esteban can triage urgency at a glance. "unsure" is the forgiving exit
 * for folks who haven't locked a date yet.
 */
export const DEADLINE_OPTIONS = [
  "this-week",
  "this-month",
  "1-3-months",
  "flexible",
  "unsure",
] as const;

export type DeadlineOption = (typeof DEADLINE_OPTIONS)[number];

export const DEADLINE_LABELS: Record<DeadlineOption, string> = {
  "this-week": "This week",
  "this-month": "This month",
  "1-3-months": "1–3 months out",
  flexible: "Flexible",
  unsure: "Not sure yet",
};

/**
 * Final-delivery platforms — multi-select because one client often ships the
 * same edit to several places (Reels + TikTok + website is the common case).
 * Drives aspect-ratio and duration scoping during the reply.
 */
export const FINAL_PLATFORM_OPTIONS = [
  "instagram",
  "tiktok",
  "youtube",
  "website",
  "broadcast-tv",
  "internal-corp",
  "other",
] as const;

export type FinalPlatformOption = (typeof FINAL_PLATFORM_OPTIONS)[number];

export const FINAL_PLATFORM_LABELS: Record<FinalPlatformOption, string> = {
  instagram: "Instagram (Reels / Stories)",
  tiktok: "TikTok",
  youtube: "YouTube (Shorts or long-form)",
  website: "Website / landing page",
  "broadcast-tv": "Broadcast / TV",
  "internal-corp": "Internal / corporate",
  other: "Other",
};

/**
 * Footage status — tells Esteban whether this is a capture job, an
 * edit-only job, or somewhere in between. Drives which package gets
 * recommended in the reply.
 */
export const FOOTAGE_STATUS_OPTIONS = [
  "needs-capture",
  "have-some",
  "all-captured",
  "unsure",
] as const;

export type FootageStatusOption = (typeof FOOTAGE_STATUS_OPTIONS)[number];

export const FOOTAGE_STATUS_LABELS: Record<FootageStatusOption, string> = {
  "needs-capture": "Need to shoot — no footage yet",
  "have-some": "Have some footage, need more capture",
  "all-captured": "All footage captured — edit only",
  unsure: "Not sure yet",
};

/**
 * Does this project need Esteban (or a second shooter) on location?
 * Kept simple because the nuance lives inside footageStatus already —
 * this is the explicit ask so the email body is unambiguous.
 */
export const SHOOT_NEEDED_OPTIONS = ["yes", "no", "unsure"] as const;

export type ShootNeededOption = (typeof SHOOT_NEEDED_OPTIONS)[number];

export const SHOOT_NEEDED_LABELS: Record<ShootNeededOption, string> = {
  yes: "Yes — need a shoot",
  no: "No — edit only",
  unsure: "Not sure yet",
};

// `SERVICE_SLUGS` is typed `readonly string[]` upstream, but zod's enum needs
// a non-empty tuple literal. Cast once here so the runtime list stays the
// single source of truth without leaking the cast into callers.
const SERVICE_SLUG_TUPLE = SERVICE_SLUGS as unknown as readonly [
  string,
  ...string[],
];

/**
 * Shared zod schema for the contact form.
 *
 * Used on both ends of the wire:
 *  - Client: `zodResolver(contactSchema)` inside `app/contact/page.tsx`
 *  - Server: `contactSchema.safeParse(...)` inside `app/api/contact/route.ts`
 *
 * Keep this file framework-agnostic (no `"use client"`, no React imports) so
 * the server route can import it without pulling in client-only code.
 *
 * The `website` field is a honeypot — see `app/api/contact/route.ts` for how
 * a filled honeypot is silently dropped.
 *
 * Conversion fields (deadline, city, finalPlatform, footageStatus,
 * shootNeeded) are required where they actually help triage and optional
 * where requiring them would just create friction (e.g. shootNeeded is
 * derivable from footageStatus in most cases, so it stays optional).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please share your name.")
    .max(120, "That name is awfully long — please shorten it."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please use a valid email address."),
  projectType: z.enum(SERVICE_SLUG_TUPLE, {
    message: "Please pick a project type.",
  }),
  budget: z.enum(BUDGET_RANGES, {
    message: "Please pick a budget range.",
  }),
  deadline: z.enum(DEADLINE_OPTIONS, {
    message: "Please pick a deadline window.",
  }),
  city: z
    .string()
    .trim()
    .min(2, "Please share the project city or area.")
    .max(80, "Please shorten the city to under 80 characters."),
  finalPlatform: z
    .array(z.enum(FINAL_PLATFORM_OPTIONS), {
      message: "Please pick at least one final platform.",
    })
    .min(1, "Please pick at least one final platform.")
    .max(FINAL_PLATFORM_OPTIONS.length),
  footageStatus: z.enum(FOOTAGE_STATUS_OPTIONS, {
    message: "Please tell us the footage status.",
  }),
  /**
   * Optional. If omitted, the API copy infers from footageStatus
   * (needs-capture / have-some → likely shoot; all-captured → likely no
   * shoot). Leaving it optional avoids a redundant click for the common
   * case where the answer is obvious from footage status.
   */
  shootNeeded: z.enum(SHOOT_NEEDED_OPTIONS).optional(),
  message: z
    .string()
    .trim()
    .min(10, "A few words about the project, please (10+ characters).")
    .max(4000, "Please keep the message under 4,000 characters."),
  /** Honeypot. Real humans never see or fill this — bots usually do. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
