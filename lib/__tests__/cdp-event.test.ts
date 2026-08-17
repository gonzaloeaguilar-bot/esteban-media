import { describe, expect, it } from "vitest";
import { safeLeadEvent } from "@/lib/cdp-event";

describe("safeLeadEvent", () => {
  it("emits a versioned allowlisted event without contact or free text", () => {
    const event = safeLeadEvent(
      "lead_1234_abcd",
      {
        source: "contact",
        locale: "es",
        email: "private@example.com",
        phone: "555-123-4567",
        name: "Private Name",
        company: "Private Company",
        notes: "private project details",
      },
      "accepted",
      new Date("2026-08-15T20:00:00Z"),
    );
    expect(event).toEqual({
      schema_uri: "iglu:portfolio/esteban_lead_safe/jsonschema/1-0-0",
      event_name: "esteban_inquiry_submitted",
      event_version: 1,
      event_time: "2026-08-15T20:00:00.000Z",
      project: "esteban",
      source: "site.api.lead",
      source_record_id: "lead_1234_abcd",
      properties: {lead_source: "contact", locale: "es", notification_status: "accepted"},
    });
    const encoded = JSON.stringify(event);
    for (const value of ["private@example.com", "555-123-4567", "Private Name", "Private Company", "private project details"]) {
      expect(encoded).not.toContain(value);
    }
  });

  it("fails closed without a source record ID", () => {
    expect(() => safeLeadEvent("", {source: "contact", email: "x@example.com"}, "failed"))
      .toThrow(/leadId/);
  });
});
