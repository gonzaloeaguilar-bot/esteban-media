import { afterEach, describe, expect, it, vi } from "vitest";
import { authorizedOutcomeRequest, parseOutcomePayload } from "@/lib/cdp-outcome";
import { POST } from "@/app/api/cdp/outcome/route";

const payload = {
  outcomeId: "outcome_123",
  inquirySourceRecordId: "lead_123",
  stage: "booked",
  occurredAt: "2026-08-15T20:00:00.000Z",
};

afterEach(() => {
  delete process.env.CDP_OUTCOME_WRITE_TOKEN;
  vi.restoreAllMocks();
});

describe("privacy-safe outcome intake", () => {
  it("builds the exact versioned safe outcome contract", () => {
    expect(parseOutcomePayload(payload)).toEqual({
      schema_uri: "iglu:portfolio/esteban_outcome_safe/jsonschema/1-0-0",
      event_name: "esteban_project_booked",
      event_version: 1,
      event_time: "2026-08-15T20:00:00.000Z",
      project: "esteban",
      source: "operations.lifecycle",
      source_record_id: "outcome_123",
      properties: { inquiry_source_record_id: "lead_123", stage: "booked" },
    });
  });

  it("rejects extra fields including contact data", () => {
    expect(() => parseOutcomePayload({ ...payload, email: "private@example.com" })).toThrow(
      "contract mismatch",
    );
  });

  it("uses constant-length token comparison and rejects missing/wrong credentials", () => {
    expect(authorizedOutcomeRequest("Bearer correct", "correct")).toBe(true);
    expect(authorizedOutcomeRequest("Bearer wrong", "correct")).toBe(false);
    expect(authorizedOutcomeRequest(null, "correct")).toBe(false);
    expect(authorizedOutcomeRequest("Bearer correct", "")).toBe(false);
  });

  it("fails closed when the write token is not configured", async () => {
    const response = await POST(new Request("https://example.com/api/cdp/outcome", { method: "POST" }));
    expect(response.status).toBe(503);
  });

  it("emits only the safe event after authentication", async () => {
    process.env.CDP_OUTCOME_WRITE_TOKEN = "secret-token";
    const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
    const response = await POST(new Request("https://example.com/api/cdp/outcome", {
      method: "POST",
      headers: { authorization: "Bearer secret-token", "content-type": "application/json" },
      body: JSON.stringify(payload),
    }));
    expect(response.status).toBe(202);
    const encoded = JSON.stringify(info.mock.calls);
    expect(encoded).toContain("[CDP_OUTCOME_V1]");
    expect(encoded).not.toContain("email");
    expect(encoded).not.toContain("secret-token");
  });

  it("does not log invalid payloads", async () => {
    process.env.CDP_OUTCOME_WRITE_TOKEN = "secret-token";
    const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
    const response = await POST(new Request("https://example.com/api/cdp/outcome", {
      method: "POST",
      headers: { authorization: "Bearer secret-token", "content-type": "application/json" },
      body: JSON.stringify({ ...payload, notes: "private" }),
    }));
    expect(response.status).toBe(400);
    expect(info).not.toHaveBeenCalled();
  });
});
