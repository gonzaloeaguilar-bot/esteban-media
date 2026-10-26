import { describe, expect, it, vi } from "vitest";
import { sendLeadEmails } from "@/lib/lead-email";

const payload = { source: "contact" as const, email: "lead@example.com", locale: "es" as const, name: "Lead" };
const env = {
  RESEND_API_KEY: "key", LEAD_NOTIFY_EMAIL: "esteban@example.com", RESEND_FROM_EMAIL: "Esteban <info@estebanmorenomedia.com>",
};

describe("sendLeadEmails", () => {
  it("does nothing without a valid configuration or for a test lead", async () => {
    const fetchImpl = vi.fn<typeof fetch>();
    expect(await sendLeadEmails(payload, "brief", { env: {}, fetchImpl })).toEqual({ notificationStatus: "not_configured", acknowledgementSent: false });
    expect(await sendLeadEmails(payload, "brief", { env, fetchImpl, isTest: true })).toEqual({ notificationStatus: "not_configured", acknowledgementSent: false });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("alerts Esteban but never auto-replies unless explicitly enabled", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ id: "email-1" }));
    expect(await sendLeadEmails(payload, "private brief", { env, fetchImpl })).toEqual({ notificationStatus: "accepted", acknowledgementSent: false });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetchImpl.mock.calls[0][1]!.body as string)).toMatchObject({ to: [env.LEAD_NOTIFY_EMAIL], text: "private brief" });
  });

  it("sends only a guarded acknowledgement after Esteban's alert is accepted", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ id: "email-1" }));
    const result = await sendLeadEmails(payload, "private brief", { env: { ...env, LEAD_AUTOREPLY_ENABLED: "1" }, fetchImpl });
    expect(result).toEqual({ notificationStatus: "accepted", acknowledgementSent: true });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    const acknowledgement = JSON.parse(fetchImpl.mock.calls[1][1]!.body as string);
    expect(acknowledgement).toMatchObject({ to: [payload.email], reply_to: env.LEAD_NOTIFY_EMAIL });
    expect(acknowledgement.text).toContain("no confirma disponibilidad, precio ni alcance");
  });

  it("never replies to the lead if the internal alert fails", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 401 }));
    expect(await sendLeadEmails(payload, "brief", { env: { ...env, LEAD_AUTOREPLY_ENABLED: "1" }, fetchImpl })).toEqual({ notificationStatus: "failed", acknowledgementSent: false });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
