import { describe, expect, it } from "vitest";
import {
  formatLeadSummary,
  generateLeadId,
  validateLeadPayload,
} from "../lead-responder";

describe("lead-responder", () => {
  it("validates lead payload required fields", () => {
    expect(validateLeadPayload({})).toEqual({
      valid: false,
      error: "A valid email address is required.",
    });

    expect(validateLeadPayload({ email: "invalid-email" })).toEqual({
      valid: false,
      error: "A valid email address is required.",
    });

    expect(validateLeadPayload({ email: "client@example.com" })).toEqual({
      valid: false,
      error: "Lead source identifier is required.",
    });

    expect(
      validateLeadPayload({
        email: "client@example.com",
        source: "brief-builder",
      })
    ).toEqual({ valid: true });
  });

  it("generates a unique lead ID with lead_ prefix", () => {
    const id1 = generateLeadId();
    const id2 = generateLeadId();

    expect(id1).toMatch(/^lead_/);
    expect(id2).toMatch(/^lead_/);
    expect(id1).not.toBe(id2);
  });

  it("formats lead summary text containing key project parameters", () => {
    const summary = formatLeadSummary({
      source: "budget-estimator",
      email: "test@company.com",
      name: "Alex Smith",
      priceRange: "$400 - $750 USD per project",
      locale: "en",
    });

    expect(summary).toContain("test@company.com");
    expect(summary).toContain("Alex Smith");
    expect(summary).toContain("$400 - $750 USD per project");
  });
});
