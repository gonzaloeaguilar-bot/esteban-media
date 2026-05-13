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
  message: z
    .string()
    .trim()
    .min(10, "A few words about the project, please (10+ characters).")
    .max(4000, "Please keep the message under 4,000 characters."),
  /** Honeypot. Real humans never see or fill this — bots usually do. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
