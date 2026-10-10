/**
 * Lead Responder Helper Module.
 * Validates, formats, and dispatches lead notifications.
 */

export type LeadSource =
  | "brief-builder"
  | "budget-estimator"
  | "strategy-assessment"
  | "script-kit"
  | "daily-prompt"
  | "daily-hook-planner"
  | "daily-shot-planner"
  | "daily-pacing-calculator"
  | "daily-script-timer"
  | "contact"
  | "hero-intake"
  | "website-design-intake"
  | "pembroke-pines-small-business-video";

const LEAD_SOURCES = new Set<LeadSource>([
  "brief-builder",
  "budget-estimator",
  "strategy-assessment",
  "script-kit",
  "daily-prompt",
  "daily-hook-planner",
  "daily-shot-planner",
  "daily-pacing-calculator",
  "daily-script-timer",
  "contact",
  "hero-intake",
  "website-design-intake",
  "pembroke-pines-small-business-video",
]);

/**
 * "How did you find us?" answers. ChatGPT is the best-converting source in GA4
 * but callers and form leads leave no trace of which prompt sent them, so the
 * form asks. Codes are lowercase slugs so the same value can ride to GA4 as
 * `found_via`; the visitor's own words (`foundQuery`) never leave the payload.
 */
export const FOUND_VIA_OPTIONS = [
  "chatgpt",
  "other_ai",
  "google_search",
  "google_maps",
  "instagram",
  "referral",
  "other",
] as const;

export type FoundVia = (typeof FOUND_VIA_OPTIONS)[number];

export const FOUND_VIA_LABELS: Record<FoundVia, string> = {
  chatgpt: "ChatGPT",
  other_ai: "Otra IA / Other AI assistant",
  google_search: "Búsqueda en Google / Google search",
  google_maps: "Google Maps",
  instagram: "Instagram",
  referral: "Recomendación / Referral",
  other: "Otro / Other",
};

/** Answers where the exact words typed are worth asking for. */
export const FOUND_VIA_ASKS_QUERY: ReadonlySet<FoundVia> = new Set<FoundVia>([
  "chatgpt",
  "other_ai",
  "google_search",
  "google_maps",
]);

export const FOUND_QUERY_MAX = 200;

export function isFoundVia(value: unknown): value is FoundVia {
  return typeof value === "string" && (FOUND_VIA_OPTIONS as readonly string[]).includes(value);
}

export interface LeadPayload {
  source: LeadSource;
  locale?: "en" | "es";
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  footageStatus?: string;
  formatNeeds?: string;
  priceRange?: string;
  score?: number;
  notes?: string;
  foundVia?: FoundVia;
  foundQuery?: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  leadId: string;
  formattedBrief?: string;
}

export function validateLeadPayload(payload: Partial<LeadPayload>): { valid: boolean; error?: string } {
  if (!payload.email || typeof payload.email !== "string" || !payload.email.includes("@")) {
    return { valid: false, error: "A valid email address is required." };
  }
  if (!payload.source || typeof payload.source !== "string") {
    return { valid: false, error: "Lead source identifier is required." };
  }
  if (!LEAD_SOURCES.has(payload.source as LeadSource)) {
    return { valid: false, error: "Lead source identifier is invalid." };
  }
  return { valid: true };
}

export function generateLeadId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return `lead_${timestamp}_${random}`;
}

export function formatLeadSummary(payload: LeadPayload): string {
  const lines: string[] = [];

  lines.push(`=== NUEVA SOLICITUD DE CLIENTE / NEW LEAD (${payload.source.toUpperCase()}) ===`);
  lines.push(`Fecha / Date: ${new Date().toISOString()}`);
  lines.push(`Email: ${payload.email}`);
  if (payload.name) lines.push(`Nombre / Name: ${payload.name}`);
  if (payload.phone) lines.push(`Teléfono / Phone: ${payload.phone}`);
  if (payload.company) lines.push(`Empresa / Company: ${payload.company}`);

  if (payload.projectType) lines.push(`Tipo de Proyecto / Type: ${payload.projectType}`);
  if (payload.footageStatus) lines.push(`Estado del Material / Footage: ${payload.footageStatus}`);
  if (payload.formatNeeds) lines.push(`Formatos Requeridos / Formats: ${payload.formatNeeds}`);
  if (payload.priceRange) lines.push(`Estimación de Presupuesto / Estimated Scope: ${payload.priceRange}`);
  if (payload.score !== undefined) lines.push(`Puntaje de Estrategia / Strategy Score: ${payload.score}/100`);

  if (isFoundVia(payload.foundVia)) {
    lines.push(`Cómo nos encontró / Found via: ${FOUND_VIA_LABELS[payload.foundVia]}`);
  }
  if (typeof payload.foundQuery === "string" && payload.foundQuery.trim()) {
    lines.push(
      // One line only: collapsing whitespace stops a direct API caller from
      // forging extra summary lines (a fake "Email:") with embedded newlines.
      `Lo que escribió / What they typed: "${payload.foundQuery.replace(/\s+/g, " ").trim().slice(0, FOUND_QUERY_MAX)}"`,
    );
  }

  if (payload.notes) {
    lines.push(`\nNotas / Notes:\n${payload.notes}`);
  }

  lines.push(`====================================================`);

  return lines.join("\n");
}
