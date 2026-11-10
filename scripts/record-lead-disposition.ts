#!/usr/bin/env node
/**
 * Records a manual lifecycle event without offering a public write endpoint.
 * Requires a service-role key and an explicit schema flag after the companion
 * migration is applied. It deliberately prints no lead contact information.
 *
 * pnpm lead:disposition -- --lead-id <uuid> --stage qualified
 * pnpm lead:disposition -- --lead-id <uuid> --stage won --value-cents 125000 --currency USD
 */
import { leadDispositionRow, parseLeadDisposition } from "../lib/lead-disposition.ts";

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  if (process.env.ESTEBAN_LEAD_OUTCOME_SCHEMA_V1 !== "1") {
    throw new Error("ESTEBAN_LEAD_OUTCOME_SCHEMA_V1=1 is required after the database migration is applied");
  }
  const baseUrl = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_KEY?.trim();
  if (!baseUrl || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_KEY are required");

  const disposition = parseLeadDisposition({
    leadId: argument("--lead-id"),
    stage: argument("--stage"),
    valueCents: argument("--value-cents"),
    currency: argument("--currency"),
  });
  const response = await fetch(`${baseUrl}/rest/v1/esteban_lead_outcomes`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(leadDispositionRow(disposition)),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Outcome recording failed (HTTP ${response.status})`);
  const rows: unknown = await response.json().catch(() => null);
  const id = Array.isArray(rows) ? rows[0]?.id : undefined;
  if (typeof id !== "string" || !id) throw new Error("Outcome recording did not return an event ID");

  console.log(JSON.stringify({ outcome_event_id: id, lead_id: disposition.leadId, stage: disposition.stage, value_cents: disposition.valueCents, currency: disposition.currency }));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Outcome recording failed");
  process.exitCode = 1;
});
