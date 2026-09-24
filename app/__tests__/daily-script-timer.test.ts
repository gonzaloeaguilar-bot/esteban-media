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

  it("links to /es/areas in the Spanish script timer page", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const content = fs.readFileSync(
      path.join(process.cwd(), "app/(spanish)/es/temporizador-de-guiones-de-video/page.tsx"),
      "utf8",
    );
    expect(content).toContain('href="/es/areas"');
    expect(content).toContain("áreas de servicio de video en South Florida");
  });
});
