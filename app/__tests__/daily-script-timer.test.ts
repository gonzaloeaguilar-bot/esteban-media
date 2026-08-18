import { describe, expect, it } from "vitest";

import { getPairedLanguageRoute } from "@/lib/language-routes";
import { validateLeadPayload } from "@/lib/lead-responder";

describe("Daily Script Timer & Pacing surface", () => {
  it("pairs English and Spanish daily script timer routes correctly", () => {
    expect(getPairedLanguageRoute("/daily-script-timer")).toBe(
      "/es/temporizador-de-guiones-de-video",
    );
    expect(getPairedLanguageRoute("/es/temporizador-de-guiones-de-video")).toBe(
      "/daily-script-timer",
    );
  });

  it("validates lead payloads from daily-script-timer source in EN and ES", () => {
    const enResult = validateLeadPayload({
      email: "creator@example.com",
      source: "daily-script-timer",
      locale: "en",
    });
    expect(enResult.valid).toBe(true);
    expect(enResult.error).toBeUndefined();

    const esResult = validateLeadPayload({
      email: "creador@ejemplo.com",
      source: "daily-script-timer",
      locale: "es",
    });
    expect(esResult.valid).toBe(true);
    expect(esResult.error).toBeUndefined();
  });
});
