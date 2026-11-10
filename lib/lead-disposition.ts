export const LEAD_DISPOSITION_STAGES = ["qualified", "booked", "won", "lost"] as const;

export type LeadDispositionStage = (typeof LEAD_DISPOSITION_STAGES)[number];

export type LeadDisposition = {
  leadId: string;
  stage: LeadDispositionStage;
  valueCents: number | null;
  currency: string | null;
};

const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CURRENCY = /^[A-Z]{3}$/;

export function isLeadDispositionStage(value: unknown): value is LeadDispositionStage {
  return typeof value === "string" && (LEAD_DISPOSITION_STAGES as readonly string[]).includes(value);
}

/**
 * Parses the deliberately small operations-only update surface. Monetary value
 * is integer cents to avoid float rounding in source-to-revenue reporting.
 */
export function parseLeadDisposition(input: {
  leadId: unknown;
  stage: unknown;
  valueCents?: unknown;
  currency?: unknown;
}): LeadDisposition {
  if (typeof input.leadId !== "string" || !ID.test(input.leadId)) {
    throw new Error("--lead-id must be a UUID");
  }
  if (!isLeadDispositionStage(input.stage)) {
    throw new Error(`--stage must be one of: ${LEAD_DISPOSITION_STAGES.join(", ")}`);
  }

  const hasValue = input.valueCents !== undefined;
  const parsedValue = hasValue ? Number(input.valueCents) : null;
  if (parsedValue !== null && (!Number.isSafeInteger(parsedValue) || parsedValue < 0)) {
    throw new Error("--value-cents must be a non-negative whole number");
  }
  const valueCents = parsedValue;

  const currency = typeof input.currency === "string" && input.currency.trim()
    ? input.currency.trim().toUpperCase()
    : null;
  if (currency && !CURRENCY.test(currency)) throw new Error("--currency must be a three-letter ISO code");
  if (valueCents !== null && !currency) throw new Error("--currency is required with --value-cents");
  if (input.stage !== "won" && valueCents !== null) throw new Error("--value-cents is allowed only for --stage won");

  return { leadId: input.leadId, stage: input.stage, valueCents, currency };
}

export function leadDispositionRow(disposition: LeadDisposition): Record<string, unknown> {
  return {
    lead_id: disposition.leadId,
    stage: disposition.stage,
    value_cents: disposition.valueCents,
    currency: disposition.currency,
  };
}
