import { timingSafeEqual } from "node:crypto";
import { OUTCOME_EVENT_NAMES, safeOutcomeEvent, type OutcomeStage } from "@/lib/cdp-event";

const INPUT_FIELDS = new Set(["outcomeId", "inquirySourceRecordId", "stage", "occurredAt"]);

export function authorizedOutcomeRequest(authorization: string | null, configuredToken: string): boolean {
  if (!configuredToken || !authorization?.startsWith("Bearer ")) return false;
  const supplied = Buffer.from(authorization.slice(7));
  const expected = Buffer.from(configuredToken);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function parseOutcomePayload(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid payload");
  const body = value as Record<string, unknown>;
  if (Object.keys(body).some((key) => !INPUT_FIELDS.has(key)) || Object.keys(body).length !== 4) {
    throw new Error("outcome payload contract mismatch");
  }
  const outcomeId = String(body.outcomeId ?? "");
  const inquirySourceRecordId = String(body.inquirySourceRecordId ?? "");
  const stage = String(body.stage ?? "") as OutcomeStage;
  const occurredAt = new Date(String(body.occurredAt ?? ""));
  if (!(stage in OUTCOME_EVENT_NAMES)) throw new Error("invalid outcome stage");
  return safeOutcomeEvent(outcomeId, inquirySourceRecordId, stage, occurredAt);
}
