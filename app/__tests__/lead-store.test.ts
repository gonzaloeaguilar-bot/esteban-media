import { afterEach, describe, expect, it, vi } from "vitest";
import { buildLeadRow, insertLead, markEmailSent } from "@/lib/lead-store";
import type { LeadPayload } from "@/lib/lead-responder";

const env: NodeJS.ProcessEnv = {
  NODE_ENV: "test",
  SUPABASE_URL: "https://store.example.com///",
  SUPABASE_SERVICE_KEY: "test-service-key",
};
const meta = { leadRef: " lead_ref ", userAgent: " test browser ", isTest: true };
const payload: LeadPayload = { source: "contact", email: " client@example.com " };

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("buildLeadRow", () => {
  it("maps every field to the table columns and trims strings", () => {
    expect(buildLeadRow({
      ...payload,
      locale: "es",
      name: " Client ",
      phone: " 555-0100 ",
      company: " Company ",
      projectType: " Editing ",
      footageStatus: " Ready ",
      formatNeeds: " Vertical ",
      priceRange: " To discuss ",
      score: 42,
      notes: " Notes ",
    }, meta)).toEqual({
      lead_ref: "lead_ref",
      source: "contact",
      locale: "es",
      name: "Client",
      email: "client@example.com",
      phone: "555-0100",
      company: "Company",
      project_type: "Editing",
      footage_status: "Ready",
      format_needs: "Vertical",
      price_range: "To discuss",
      score: 42,
      notes: "Notes",
      user_agent: "test browser",
      is_test: true,
    });
  });

  it("defaults locale and stores blank or absent fields as null", () => {
    expect(buildLeadRow({ ...payload, name: " \t ", notes: "" }, {
      leadRef: "lead_ref", userAgent: " ", isTest: false,
    })).toEqual({
      lead_ref: "lead_ref", source: "contact", locale: "en",
      name: null, email: "client@example.com", phone: null, company: null,
      project_type: null, footage_status: null, format_needs: null, price_range: null,
      score: null, notes: null, user_agent: null, is_test: false,
    });
  });

  it("caps all free text, email and user agent lengths after trimming", () => {
    const long = ` ${"x".repeat(2100)} `;
    const row = buildLeadRow({
      ...payload, name: long, email: long, phone: long, company: long,
      projectType: long, footageStatus: long, formatNeeds: long, priceRange: long,
      notes: long,
    }, { ...meta, leadRef: long, userAgent: long });
    for (const key of ["lead_ref", "name", "phone", "company", "project_type",
      "footage_status", "format_needs", "price_range", "notes"]) {
      expect(row[key], key).toBe("x".repeat(2000));
    }
    expect(row.email).toBe("x".repeat(200));
    expect(row.user_agent).toBe("x".repeat(200));
  });

  it.each([undefined, 1.5, NaN, Infinity, "42", null])("nulls non-integer score %s", (score) => {
    const row = buildLeadRow({ ...payload, score } as LeadPayload, meta);
    expect(row.score).toBeNull();
  });

  it("preserves a score of zero and tolerates non-string optional JSON values", () => {
    const row = buildLeadRow({ ...payload, score: 0, name: {}, notes: 123 } as unknown as LeadPayload, meta);
    expect(row.score).toBe(0);
    expect(row.name).toBeNull();
    expect(row.notes).toBeNull();
  });
});

describe("insertLead", () => {
  it.each([{}, { SUPABASE_URL: env.SUPABASE_URL }, { SUPABASE_SERVICE_KEY: env.SUPABASE_SERVICE_KEY },
    { ...env, SUPABASE_SERVICE_KEY: " " }])("skips the network when configuration is missing: %j", async (config) => {
    const fetchImpl = vi.fn<typeof fetch>();
    expect(await insertLead({}, { env: { NODE_ENV: "test", ...config }, fetchImpl })).toEqual({ ok: false, reason: "not_configured" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("posts the row with service authorization, a timeout and representation, returning its ID", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(Response.json([{ id: "row-id" }], { status: 201 }));
    const timeout = vi.spyOn(AbortSignal, "timeout");
    const row = buildLeadRow(payload, meta);
    expect(await insertLead(row, { env, fetchImpl })).toEqual({ ok: true, id: "row-id" });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledWith("https://store.example.com/rest/v1/esteban_leads", {
      method: "POST",
      headers: {
        apikey: "test-service-key", Authorization: "Bearer test-service-key",
        "Content-Type": "application/json", prefer: "return=representation",
      },
      body: JSON.stringify(row), signal: expect.any(AbortSignal),
    });
    expect(timeout).toHaveBeenCalledWith(8000);
  });

  it("reads environment variables at call time", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(Response.json([{ id: "row-id" }], { status: 201 }));
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_KEY", "");
    expect(await insertLead({}, { fetchImpl })).toEqual({ ok: false, reason: "not_configured" });
    vi.stubEnv("SUPABASE_URL", env.SUPABASE_URL);
    vi.stubEnv("SUPABASE_SERVICE_KEY", env.SUPABASE_SERVICE_KEY);
    expect(await insertLead({}, { fetchImpl })).toEqual({ ok: true, id: "row-id" });
  });

  it.each([400, 401, 500, 503])("returns http_error for HTTP %i", async (status) => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response("upstream error", { status }));
    expect(await insertLead({}, { env, fetchImpl })).toEqual({ ok: false, reason: "http_error", status });
  });

  it.each(["[]", "[{}]", '[{"id":""}]', '[{"id":123}]', "null", "{}", "invalid JSON"])(
    "does not report persistence without a returned ID: %s", async (body) => {
      const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(body, { status: 201 }));
      expect(await insertLead({}, { env, fetchImpl })).toEqual({ ok: false, reason: "http_error", status: 201 });
    },
  );

  it.each([new Error("connection failed"), new DOMException("timeout", "TimeoutError")])(
    "returns network_error when fetch rejects", async (error) => {
      const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(error);
      expect(await insertLead({}, { env, fetchImpl })).toEqual({ ok: false, reason: "network_error" });
    },
  );
});

describe("markEmailSent", () => {
  it("patches only the identified row with an encoded ID and timeout", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 204 }));
    await markEmailSent("row&id=eq.other", { env, fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://store.example.com/rest/v1/esteban_leads?id=eq.row%26id%3Deq.other",
      {
        method: "PATCH",
        headers: { apikey: "test-service-key", Authorization: "Bearer test-service-key", "Content-Type": "application/json" },
        body: JSON.stringify({ email_sent: true }), signal: expect.any(AbortSignal),
      },
    );
  });

  it("does nothing without configuration", async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    await expect(markEmailSent("row-id", { env: { NODE_ENV: "test" }, fetchImpl })).resolves.toBeUndefined();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("never throws on HTTP or network failure", async () => {
    const fetchImpl = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockRejectedValueOnce(new Error("connection failed"));
    await expect(markEmailSent("row-id", { env, fetchImpl })).resolves.toBeUndefined();
    await expect(markEmailSent("row-id", { env, fetchImpl })).resolves.toBeUndefined();
  });
});
