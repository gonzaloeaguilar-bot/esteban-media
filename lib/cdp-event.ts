import type { LeadPayload } from "@/lib/lead-responder";

export const CDP_EVENT_SCHEMA = "iglu:portfolio/esteban_lead_safe/jsonschema/1-0-0";
export const CDP_OUTCOME_SCHEMA = "iglu:portfolio/esteban_outcome_safe/jsonschema/1-0-0";

export type NotificationStatus = "accepted" | "failed" | "not_configured";

export interface SafeLeadEvent {
  schema_uri: typeof CDP_EVENT_SCHEMA;
  event_name: "esteban_inquiry_submitted";
  event_version: 1;
  event_time: string;
  project: "esteban";
  source: "site.api.lead";
  source_record_id: string;
  properties: {
    lead_source: LeadPayload["source"];
    locale: "en" | "es" | "unknown";
    notification_status: NotificationStatus;
  };
}

export const OUTCOME_EVENT_NAMES = {
  qualified: "esteban_lead_qualified",
  booked: "esteban_project_booked",
  delivered: "esteban_project_delivered",
  closed: "esteban_project_closed",
  lost: "esteban_lead_lost",
} as const;

export type OutcomeStage = keyof typeof OUTCOME_EVENT_NAMES;

export interface SafeOutcomeEvent {
  schema_uri: typeof CDP_OUTCOME_SCHEMA;
  event_name: (typeof OUTCOME_EVENT_NAMES)[OutcomeStage];
  event_version: 1;
  event_time: string;
  project: "esteban";
  source: "operations.lifecycle";
  source_record_id: string;
  properties: {
    inquiry_source_record_id: string;
    stage: OutcomeStage;
  };
}

export function safeLeadEvent(
  leadId: string,
  payload: LeadPayload,
  notificationStatus: NotificationStatus,
  eventTime = new Date(),
): SafeLeadEvent {
  if (!leadId) throw new Error("leadId is required for the CDP event");
  return {
    schema_uri: CDP_EVENT_SCHEMA,
    event_name: "esteban_inquiry_submitted",
    event_version: 1,
    event_time: eventTime.toISOString(),
    project: "esteban",
    source: "site.api.lead",
    source_record_id: leadId,
    properties: {
      lead_source: payload.source,
      locale: payload.locale ?? "unknown",
      notification_status: notificationStatus,
    },
  };
}

export function safeOutcomeEvent(
  outcomeId: string,
  inquirySourceRecordId: string,
  stage: OutcomeStage,
  eventTime: Date,
): SafeOutcomeEvent {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(outcomeId)) throw new Error("invalid outcomeId");
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(inquirySourceRecordId)) {
    throw new Error("invalid inquirySourceRecordId");
  }
  if (!OUTCOME_EVENT_NAMES[stage]) throw new Error("invalid outcome stage");
  if (Number.isNaN(eventTime.getTime())) throw new Error("invalid occurredAt");
  return {
    schema_uri: CDP_OUTCOME_SCHEMA,
    event_name: OUTCOME_EVENT_NAMES[stage],
    event_version: 1,
    event_time: eventTime.toISOString(),
    project: "esteban",
    source: "operations.lifecycle",
    source_record_id: outcomeId,
    properties: { inquiry_source_record_id: inquirySourceRecordId, stage },
  };
}
