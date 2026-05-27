/**
 * Shared types + validation for the contact form (client + server).
 *
 * Kept minimal & framework-free so the same module is consumed by:
 *  - components/sections/ContactForm.tsx (client component, browser validation)
 *  - app/api/contact/route.ts            (server route handler, authoritative)
 *
 * No third-party validator pulled in — the schema is tiny and we don't want
 * a runtime dep just for five fields.
 */

import { SERVICE_SLUGS } from "@/lib/services";

/** Budget options shown to users + accepted by the server. Order matters. */
export const BUDGET_RANGES = [
  "<$1k",
  "$1k–$3k",
  "$3k–$7k",
  "$7k–$15k",
  "$15k+",
  "Not sure yet",
] as const;
export type BudgetRange = (typeof BUDGET_RANGES)[number];

/** Project-type options = the 5 service slugs + an explicit "not sure" escape. */
export const PROJECT_TYPES = [...SERVICE_SLUGS, "unsure"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

/** Human label used in dropdowns + outbound emails. */
const PROJECT_TYPE_LABELS: Record<string, string> = {
  photography: "Photography",
  videography: "Videography",
  aerial: "Aerial / Drone",
  "video-editing": "Video Editing",
  "photo-editing": "Photo Editing",
  unsure: "Not sure yet",
};

export function projectTypeLabel(value: ProjectType): string {
  return PROJECT_TYPE_LABELS[value] ?? value;
}

/** Email = the recipient until Esteban's own address is wired up. */
export const CONTACT_RECIPIENT = "gagui010@icloud.com";

/** The shape the server expects to receive (JSON body). */
export type ContactSubmission = {
  name: string;
  email: string;
  projectType: ProjectType;
  budgetRange: BudgetRange;
  message: string;
  /** Honeypot — hidden field, must be empty for a real submission. */
  website?: string;
};

export type ValidationError = {
  field: keyof ContactSubmission;
  message: string;
};

/**
 * RFC-5322-lite. We don't need perfection — just block obvious junk and rely
 * on the eventual transactional-email provider to reject undeliverables.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Authoritative validator. Used by the server; the client uses HTML required
 * attributes + this same function for the optimistic check.
 *
 * Returns an array of errors. Empty array = valid.
 */
export function validateSubmission(
  input: unknown,
): { ok: true; data: ContactSubmission } | { ok: false; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  if (!input || typeof input !== "object") {
    return {
      ok: false,
      errors: [{ field: "name", message: "Invalid payload." }],
    };
  }

  const raw = input as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const projectType = typeof raw.projectType === "string" ? raw.projectType : "";
  const budgetRange = typeof raw.budgetRange === "string" ? raw.budgetRange : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const website = typeof raw.website === "string" ? raw.website : "";

  if (name.length < 2) {
    errors.push({ field: "name", message: "Please share your name." });
  }
  if (name.length > 120) {
    errors.push({ field: "name", message: "Name is too long." });
  }
  if (!EMAIL_RE.test(email)) {
    errors.push({ field: "email", message: "Please use a valid email." });
  }
  if (email.length > 200) {
    errors.push({ field: "email", message: "Email is too long." });
  }
  if (!PROJECT_TYPES.includes(projectType as ProjectType)) {
    errors.push({ field: "projectType", message: "Pick a project type." });
  }
  if (!BUDGET_RANGES.includes(budgetRange as BudgetRange)) {
    errors.push({ field: "budgetRange", message: "Pick a budget range." });
  }
  if (message.length < 10) {
    errors.push({
      field: "message",
      message: "Add a sentence or two so Esteban can prep.",
    });
  }
  if (message.length > 4000) {
    errors.push({ field: "message", message: "Message is too long (max 4000)." });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      projectType: projectType as ProjectType,
      budgetRange: budgetRange as BudgetRange,
      message,
      website,
    },
  };
}

/**
 * Render the outbound email body. Plain text first; the route handler also
 * wraps a minimal HTML version. Kept here so it stays close to the schema.
 */
export function renderEmailText(s: ContactSubmission): string {
  return [
    "New contact form submission — estebanmedia.com",
    "",
    `Name:         ${s.name}`,
    `Email:        ${s.email}`,
    `Project type: ${projectTypeLabel(s.projectType)}`,
    `Budget:       ${s.budgetRange}`,
    "",
    "Message:",
    s.message,
    "",
    "—",
    "Sent from the contact form.",
  ].join("\n");
}

export function renderEmailHtml(s: ContactSubmission): string {
  const escape = (v: string) =>
    v
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  return `<!doctype html>
<html><body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.5;color:#111">
  <h2 style="margin:0 0 16px">New contact form submission</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
    <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td>${escape(s.name)}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><a href="mailto:${escape(s.email)}">${escape(s.email)}</a></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Project type</td><td>${escape(projectTypeLabel(s.projectType))}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#666">Budget</td><td>${escape(s.budgetRange)}</td></tr>
  </table>
  <h3 style="margin:24px 0 8px">Message</h3>
  <p style="white-space:pre-wrap;margin:0">${escape(s.message)}</p>
</body></html>`;
}
