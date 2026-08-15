import type { LeadPayload } from "@/lib/lead-responder";

export const CDP_EVENT_SCHEMA = "iglu:portfolio/esteban_lead_safe/jsonschema/1-0-0";

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
