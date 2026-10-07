import type { LeadPayload } from "@/lib/lead-responder";

interface StoreOptions {
  fetchImpl?: typeof fetch;
  env?: NodeJS.ProcessEnv;
}

type InsertResult =
  | { ok: true; id: string }
  | { ok: false; reason: "not_configured" | "http_error" | "network_error"; status?: number };

function text(value: unknown, limit = 2000): string | null {
  if (typeof value !== "string") return null;
  return value.trim().slice(0, limit) || null;
}

export function buildLeadRow(
  payload: LeadPayload,
  meta: { leadRef: string; userAgent: string; isTest: boolean },
): Record<string, unknown> {
  return {
    lead_ref: text(meta.leadRef),
    source: text(payload.source),
    locale: payload.locale === "es" ? "es" : "en",
    name: text(payload.name),
    email: text(payload.email, 200),
    phone: text(payload.phone),
    company: text(payload.company),
    project_type: text(payload.projectType),
    footage_status: text(payload.footageStatus),
    format_needs: text(payload.formatNeeds),
    price_range: text(payload.priceRange),
    score: Number.isInteger(payload.score) ? payload.score : null,
    notes: text(payload.notes),
    user_agent: text(meta.userAgent, 200),
    is_test: meta.isTest,
  };
}

function configuration(env: NodeJS.ProcessEnv) {
  const url = env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const key = env.SUPABASE_SERVICE_KEY?.trim();
  if (!url || !key) return null;
  return {
    url: `${url}/rest/v1/esteban_leads`,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
  };
}

export async function insertLead(
  row: Record<string, unknown>,
  opts: StoreOptions = {},
): Promise<InsertResult> {
  const config = configuration(opts.env ?? process.env);
  if (!config) return { ok: false, reason: "not_configured" };

  try {
    const response = await (opts.fetchImpl ?? fetch)(config.url, {
      method: "POST",
      headers: { ...config.headers, prefer: "return=representation" },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      return { ok: false, reason: "http_error", status: response.status };
    }

    // A successful HTTP status alone does not prove a lead was returned.
    const rows: unknown = await response.json().catch(() => null);
    const id = Array.isArray(rows) ? rows[0]?.id : undefined;
    if (typeof id !== "string" || !id.trim()) {
      return { ok: false, reason: "http_error", status: response.status };
    }
    return { ok: true, id };
  } catch {
    return { ok: false, reason: "network_error" };
  }
}

export async function markEmailSent(id: string, opts: StoreOptions = {}): Promise<void> {
  // Notification bookkeeping must not turn an already received lead into a failure.
  try {
    const config = configuration(opts.env ?? process.env);
    if (!config) return;
    await (opts.fetchImpl ?? fetch)(`${config.url}?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({ email_sent: true }),
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    // Best effort only; the persisted lead remains available for follow-up.
  }
}
