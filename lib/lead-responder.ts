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
  "pembroke-pines-small-business-video",
]);

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

  if (payload.notes) {
    lines.push(`\nNotas / Notes:\n${payload.notes}`);
  }

  lines.push(`====================================================`);

  return lines.join("\n");
}
