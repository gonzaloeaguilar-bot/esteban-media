import { describe, expect, it } from "vitest";
import { extractLeadFacts, prepareLeadDeskResult, proposePrice } from "@/lib/lead-desk";

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
});
