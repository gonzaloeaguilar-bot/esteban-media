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

    expect(
      validateLeadPayload({
        email: "client@example.com",
        source: "pembroke-pines-small-business-video",
      })
    ).toEqual({ valid: true });

    expect(
      validateLeadPayload({
        email: "client@example.com",
        source: "website-design-intake",
      })
    ).toEqual({ valid: true });

    expect(
      validateLeadPayload({
        email: "client@example.com",
        source: "unknown-source" as "brief-builder",
      })
    ).toEqual({
      valid: false,
      error: "Lead source identifier is invalid.",
    });
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

  it("shows how the lead found Esteban and the words they typed", () => {
    const summary = formatLeadSummary({
      source: "contact",
      email: "chef@example.com",
      foundVia: "chatgpt",
      foundQuery: "  videographer for restaurants in miami  ",
    });
    expect(summary).toContain("Found via: ChatGPT");
    expect(summary).toContain('What they typed: "videographer for restaurants in miami"');
  });

  it("ignores an unknown found-via code and caps the typed words", () => {
    const summary = formatLeadSummary({
      source: "contact",
      email: "a@example.com",
      foundVia: "<script>" as never,
      foundQuery: "x".repeat(500),
    });
    expect(summary).not.toContain("Found via");
    expect(summary).toContain(`"${"x".repeat(200)}"`);
    expect(summary).not.toContain("x".repeat(201));
  });

  it("leaves the summary unchanged when the question was skipped", () => {
    const summary = formatLeadSummary({ source: "contact", email: "a@example.com" });
    expect(summary).not.toContain("Found via");
    expect(summary).not.toContain("What they typed");
  });
});
