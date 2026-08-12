import { describe, expect, it } from "vitest";

import { getPairedLanguageRoute } from "@/lib/language-routes";
import { validateLeadPayload } from "@/lib/lead-responder";

describe("Daily Hook Planner surface", () => {
  it("pairs English and Spanish daily hook planner routes correctly", () => {
    expect(getPairedLanguageRoute("/daily-hook-planner")).toBe(
      "/es/planificador-de-ganchos-de-video",
    );
    expect(getPairedLanguageRoute("/es/planificador-de-ganchos-de-video")).toBe(
      "/daily-hook-planner",
    );
  });

  it("validates lead payloads from daily-hook-planner source", () => {
    const result = validateLeadPayload({
      email: "creator@example.com",
      source: "daily-hook-planner",
      locale: "en",
    });
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });
});
