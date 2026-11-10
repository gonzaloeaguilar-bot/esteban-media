import { describe, expect, it } from "vitest";
import { leadDispositionRow, parseLeadDisposition } from "@/lib/lead-disposition";

const leadId = "11111111-1111-4111-8111-111111111111";

describe("lead disposition", () => {
  it("accepts each lifecycle stage and builds a privacy-safe event row", () => {
    for (const stage of ["qualified", "booked", "won", "lost"] as const) {
      const row = leadDispositionRow(parseLeadDisposition({ leadId, stage }));
      expect(row).toEqual({ lead_id: leadId, stage, value_cents: null, currency: null });
    }
  });

  it("allows a won value only as integer cents with an ISO currency", () => {
    expect(parseLeadDisposition({ leadId, stage: "won", valueCents: "125000", currency: "usd" })).toEqual({
      leadId, stage: "won", valueCents: 125000, currency: "USD",
    });
  });

  it.each([
    [{ leadId: "not-a-uuid", stage: "qualified" }, "--lead-id must be a UUID"],
    [{ leadId, stage: "submitted" }, "--stage must be one of"],
    [{ leadId, stage: "won", valueCents: "1.2", currency: "USD" }, "--value-cents must be a non-negative whole number"],
    [{ leadId, stage: "won", valueCents: "100" }, "--currency is required with --value-cents"],
    [{ leadId, stage: "won", valueCents: "100", currency: "US" }, "--currency must be a three-letter ISO code"],
    [{ leadId, stage: "qualified", valueCents: "100", currency: "USD" }, "--value-cents is allowed only for --stage won"],
  ])("rejects unsafe disposition input", (input, message) => {
    expect(() => parseLeadDisposition(input)).toThrow(message);
  });
});
