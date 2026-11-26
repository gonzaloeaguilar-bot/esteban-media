import { describe, expect, it, vi } from "vitest";
import { greetingName, sendLeadEmails } from "@/lib/lead-email";

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

  it("alerts Esteban without auto-replying when the reply is switched off", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ id: "email-1" }));
    expect(await sendLeadEmails(payload, "private brief", { env: { ...env, LEAD_AUTOREPLY_ENABLED: "0" }, fetchImpl })).toEqual({ notificationStatus: "accepted", acknowledgementSent: false });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetchImpl.mock.calls[0][1]!.body as string)).toMatchObject({ to: [env.LEAD_NOTIFY_EMAIL], text: "private brief" });
  });

  it("auto-replies to every lead from info@ by default, after Esteban's alert is accepted", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ id: "email-1" }));
    const result = await sendLeadEmails(payload, "private brief", { env: { ...env, RESEND_FROM_EMAIL: "Alerts <alerts@send.example.com>" }, fetchImpl });
    expect(result).toEqual({ notificationStatus: "accepted", acknowledgementSent: true });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    const acknowledgement = JSON.parse(fetchImpl.mock.calls[1][1]!.body as string);
    expect(acknowledgement).toMatchObject({
      from: "Esteban Moreno Media <info@estebanmorenomedia.com>",
      to: [payload.email],
      reply_to: "info@estebanmorenomedia.com",
    });
    expect(acknowledgement.text).not.toContain("private brief");
    expect(acknowledgement.subject).toBe("Recibí tu mensaje, Lead — Esteban Moreno Media");
    expect(acknowledgement.text).toContain("Hola, Lead:");
    expect(acknowledgement.text).toContain("Te confirmo precio, alcance y disponibilidad por escrito cuando haya visto los detalles.");
  });

  it("replies in English to an English lead and reports a failed reply", async () => {
    const fetchImpl = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(Response.json({ id: "email-1" }))
      .mockResolvedValueOnce(new Response(null, { status: 403 }));
    const result = await sendLeadEmails({ ...payload, locale: "en" }, "brief", { env, fetchImpl });
    expect(result).toEqual({ notificationStatus: "accepted", acknowledgementSent: false });
    expect(JSON.parse(fetchImpl.mock.calls[1][1]!.body as string).subject).toBe("Got your message, Lead — Esteban Moreno Media");
  });

  it("never replies to the lead if the internal alert fails", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 401 }));
    expect(await sendLeadEmails(payload, "brief", { env: { ...env, LEAD_AUTOREPLY_ENABLED: "1" }, fetchImpl })).toEqual({ notificationStatus: "failed", acknowledgementSent: false });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("greets by first name only when the name is a plain short name", () => {
    expect(greetingName("  Alan Mattone ")).toBe("Alan");
    expect(greetingName("María-José O’Neil")).toBe("María-José");
    for (const unsafe of ["", undefined, "http://spam.example", "Buy now!!!", "a".repeat(31), "<b>x</b>", "123"]) {
      expect(greetingName(unsafe)).toBe("");
    }
  });

  it("falls back to a neutral greeting and subject without a usable name", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ id: "email-1" }));
    await sendLeadEmails({ ...payload, locale: "en", name: "visit http://spam.example" }, "brief", { env, fetchImpl });
    const acknowledgement = JSON.parse(fetchImpl.mock.calls[1][1]!.body as string);
    expect(acknowledgement.subject).toBe("Got your message — Esteban Moreno Media");
    expect(acknowledgement.text.startsWith("Hi,\n\n")).toBe(true);
    expect(acknowledgement.text).not.toContain("spam.example");
    expect(acknowledgement.text).toContain("I'll confirm price, scope and availability in writing");
  });
});
