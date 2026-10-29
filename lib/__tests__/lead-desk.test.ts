import { describe, expect, it } from "vitest";
import { extractLeadFacts, prepareLeadDeskResult, proposePrice, readFoundVia } from "@/lib/lead-desk";

describe("lead desk", () => {
  it("extracts the event scope needed for a birthday inquiry", () => {
    const facts = extractLeadFacts("I need video for a birthday party on November 14 at The Sunset Room for 4 hours with a highlight reel.");
    expect(facts.eventDate).toBe("November 14");
    expect(facts.hours).toBe(4);
  });
  it("matches a complete short birthday event to the approved solo half-day rate", () => {
    expect(proposePrice("Birthday party on November 14 at The Sunset Room for 4 hours. Need: a highlight reel.")).toMatchObject({ kind: "confirmed", amount: 400 });
  });
  it("never quotes an incomplete birthday inquiry", () => {
    const result = prepareLeadDeskResult({ threadId: "thread-1", messageId: "message-1", from: "Jerry <jerry@example.com>", subject: "Upcoming Birthday Party", body: "Hi, I am planning a birthday party and would love to learn more.", receivedAt: "2026-10-28T12:00:00.000Z" });
    expect(result.status).toBe("needs-owner-review");
    expect(result.proposal).toMatchObject({ kind: "needs-review" });
    expect(result.clientDraft.body).not.toContain("$");
    expect(result.ownerAlert.body).toContain("Do not quote the client yet.");
  });

  it("records a stated origin and does not ask again", () => {
    const result = prepareLeadDeskResult({ threadId: "t2", messageId: "m2", from: "Ana <ana@example.com>", subject: "Birthday video", body: "Hi! I found you on Instagram. Birthday party on November 14 at The Sunset Room for 4 hours. Need: a highlight reel.", receivedAt: "2026-10-28T12:00:00.000Z" });
    expect(result.channel).toBe("email");
    expect(result.facts.foundVia).toBe("found you on Instagram");
    expect(result.ownerAlert.body).toContain("Found via: found you on Instagram");
    expect(result.clientDraft.body).not.toContain("how did you hear about us");
  });
  it("asks one origin question in Spanish when the origin is not stated", () => {
    const result = prepareLeadDeskResult({ threadId: "t3", messageId: "m3", from: "Luis <luis@example.com>", subject: "Cumpleaños", body: "Hola, quisiera un video para una fiesta de cumpleaños. Gracias.", receivedAt: "2026-10-28T12:00:00.000Z" });
    expect(result.facts.foundVia).toBeUndefined();
    expect(result.ownerAlert.body).toContain("Found via: not stated");
    expect(result.clientDraft.body).toContain("¿cómo nos encontraste?");
    expect(result.clientDraft.body.split("¿cómo nos encontraste?").length).toBe(2);
  });
  it("reads EN and ES origin phrases and ignores unrelated text", () => {
    expect(readFoundVia("ChatGPT recommended your Reels page")).toBe("ChatGPT recommended your Reels page");
    expect(readFoundVia("Los vi en Google buscando editor de reels")).toBe("Los vi en Google buscando editor de reels");
    expect(readFoundVia("We need a video for a party next month.")).toBeUndefined();
  });
});
