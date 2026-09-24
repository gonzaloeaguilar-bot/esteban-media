import { readFileSync } from "node:fs";
import { join } from "node:path";

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

  it("links the Spanish daily script timer page to /es/areas", () => {
    const markup = readFileSync(
      join(process.cwd(), "app/(spanish)/es/temporizador-de-guiones-de-video/page.tsx"),
      "utf8",
    );
    expect(markup).toContain('href="/es/areas"');
    expect(markup).toContain("áreas de servicio en Fort Lauderdale, Broward y Miami-Dade");
  });
});
