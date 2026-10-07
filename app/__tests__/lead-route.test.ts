import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST, runtime } from "@/app/api/lead/route";

const storeUrl = "https://store.example.com/rest/v1/esteban_leads";
const emailUrl = "https://api.resend.com/emails";
const rowId = "11111111-1111-4111-8111-111111111111";
const payload = { source: "contact", email: "client@example.com", name: "Client", notes: "Private notes" };
const fetchMock = vi.fn<typeof fetch>();

function request(body: unknown = payload, headers: Record<string, string> = {}) {
  return new Request("https://site.example.com/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "test browser", ...headers },
    body: JSON.stringify(body),
  });
}

function saved() {
  return Response.json([{ id: rowId }], { status: 201 });
}

beforeEach(() => {
  fetchMock.mockReset();
  // An unexpected request must fail instead of making a real network call.
  fetchMock.mockRejectedValue(new Error("Unexpected fetch"));
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("SUPABASE_URL", "https://store.example.com");
  vi.stubEnv("SUPABASE_SERVICE_KEY", "test-service-key");
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("LEAD_NOTIFY_EMAIL", "");
  vi.stubEnv("RESEND_FROM_EMAIL", "");
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/lead", () => {
  it("uses the Node runtime and succeeds with the persisted ID when email is not configured", async () => {
    fetchMock.mockResolvedValueOnce(saved());
    const response = await POST(request());
    expect(runtime).toBe("nodejs");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      success: true, leadId: rowId,
      message: "Thank you! Your inquiry has been successfully received.",
      formattedBrief: expect.stringContaining("Email: client@example.com"),
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(storeUrl);
    expect(JSON.parse(fetchMock.mock.calls[0][1]!.body as string)).toMatchObject({
      lead_ref: expect.stringMatching(/^lead_/), email: payload.email,
      source: "contact", locale: "en", user_agent: "test browser", is_test: false,
    });
    const event = JSON.parse(vi.mocked(console.info).mock.calls[0][1]);
    expect(event.source_record_id).toBe(rowId);
    expect(event.properties.notification_status).toBe("not_configured");
    expect(JSON.stringify(event)).not.toContain(payload.email);
    expect(JSON.stringify(event)).not.toContain(payload.notes);
  });

  it.each(["en", "es"])("returns localized 503 when insert fails and email is not configured (%s)", async (locale) => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 503 }));
    const response = await POST(request({ ...payload, locale }));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      success: false,
      error: locale === "es"
        ? "No pudimos recibir tu solicitud en este momento. Por favor, llámanos o escríbenos directamente por correo electrónico."
        : "We could not receive your request right now. Please call or email directly.",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith("Lead persistence failed:", { reason: "http_error", status: 503 });
    expect(console.info).not.toHaveBeenCalled();
  });

  it("returns 503 without any network when neither destination is configured", async () => {
    vi.stubEnv("SUPABASE_SERVICE_KEY", "");
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith("Lead persistence failed:", { reason: "not_configured", status: undefined });
  });

  it("falls back to accepted email after failed persistence, using the generated reference", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(Response.json({ id: "email-id" }));
    const response = await POST(request());
    expect(response.status).toBe(200);
    const body = await response.json();
    const row = JSON.parse(fetchMock.mock.calls[0][1]!.body as string);
    expect(body.leadId).toBe(row.lead_ref);
    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([storeUrl, emailUrl]);
  });

  it("still uses email when storage is unconfigured", async () => {
    vi.stubEnv("SUPABASE_URL", "");
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    fetchMock.mockResolvedValueOnce(Response.json({ id: "email-id" }));
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect((await response.json()).leadId).toMatch(/^lead_/);
    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([emailUrl]);
  });

  it.each([401, 429, 500])("returns 503 when insert fails and Resend returns %i", async (status) => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(new Response(null, { status }));
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect((await response.json()).success).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(console.info).not.toHaveBeenCalled();
  });

  it("returns 503 for network failures without logging credentials or submitted text", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    fetchMock.mockRejectedValue(new Error("test-service-key test-resend-key Private notes"));
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const logs = JSON.stringify(vi.mocked(console.error).mock.calls);
    expect(logs).toContain("network_error");
    for (const forbidden of ["test-service-key", "test-resend-key", payload.email, payload.notes]) {
      expect(logs).not.toContain(forbidden);
    }
  });

  it("persists before notifying, then marks the saved row only after accepted email", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    vi.stubEnv("LEAD_NOTIFY_EMAIL", "notify@example.com");
    vi.stubEnv("RESEND_FROM_EMAIL", "Sender <sender@example.com>");
    let resolveInsert!: (response: Response) => void;
    const pendingInsert = new Promise<Response>((resolve) => { resolveInsert = resolve; });
    fetchMock.mockReturnValueOnce(pendingInsert)
      .mockResolvedValueOnce(Response.json({ id: "email-id" }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));
    const pendingResponse = POST(request({ ...payload, locale: "es" }));
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock.mock.calls[0][0]).toBe(storeUrl);
    resolveInsert(saved());
    const response = await pendingResponse;
    expect(response.status).toBe(200);
    expect((await response.json()).message).toBe("¡Gracias! Tu solicitud ha sido recibida correctamente.");
    expect(fetchMock.mock.calls.map(([url]) => url)).toEqual([storeUrl, emailUrl, `${storeUrl}?id=eq.${rowId}`]);
    const emailOptions = fetchMock.mock.calls[1][1]!;
    expect(emailOptions.headers).toMatchObject({ Authorization: "Bearer test-resend-key" });
    expect(JSON.parse(emailOptions.body as string)).toMatchObject({
      from: "Sender <sender@example.com>", to: ["notify@example.com"], text: expect.stringContaining(payload.email),
    });
    expect(JSON.parse(fetchMock.mock.calls[2][1]!.body as string)).toEqual({ email_sent: true });
  });

  it.each(["http", "network"])("keeps the saved lead successful when email fails (%s)", async (failure) => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    fetchMock.mockResolvedValueOnce(saved());
    if (failure === "http") fetchMock.mockResolvedValueOnce(new Response(null, { status: 401 }));
    else fetchMock.mockRejectedValueOnce(new Error("offline"));
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect((await response.json()).leadId).toBe(rowId);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("keeps the saved lead successful when notification bookkeeping fails", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-resend-key");
    fetchMock.mockResolvedValueOnce(saved())
      .mockResolvedValueOnce(Response.json({ id: "email-id" }))
      .mockRejectedValueOnce(new Error("offline"));
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect((await response.json()).leadId).toBe(rowId);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it.each([{}, { ...payload, email: "invalid" }, { ...payload, source: "unknown" }, null, [], "string"])(
    "rejects invalid input without fetch: %j", async (body) => {
      const response = await POST(request(body));
      expect(response.status).toBe(400);
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );

  it("rejects malformed JSON without fetch", async () => {
    const response = await POST(new Request("https://site.example.com/api/lead", { method: "POST", body: "{" }));
    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([["1", true], ["0", false], ["true", false]])("sets is_test only for the exact test header %s", async (header, isTest) => {
    fetchMock.mockResolvedValueOnce(saved());
    const response = await POST(request(payload, { "x-esteban-test": header as string }));
    expect(response.status).toBe(200);
    expect(JSON.parse(fetchMock.mock.calls[0][1]!.body as string).is_test).toBe(isTest);
  });
});
