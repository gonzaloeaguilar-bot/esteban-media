import { describe, expect, it } from "vitest";

import { getPairedLanguageRoute } from "@/lib/language-routes";
import { validateLeadPayload } from "@/lib/lead-responder";

describe("Daily Shot List Planner surface", () => {
  it("pairs English and Spanish daily shot list planner routes correctly", () => {
    expect(getPairedLanguageRoute("/daily-shot-list-planner")).toBe(
      "/es/planificador-de-tomas-de-video",
    );
    expect(getPairedLanguageRoute("/es/planificador-de-tomas-de-video")).toBe(
      "/daily-shot-list-planner",
    );
  });

  it("validates lead payloads from daily-shot-planner source", () => {
    const resultEn = validateLeadPayload({
      email: "creator@example.com",
      source: "daily-shot-planner",
      locale: "en",
    });
    expect(resultEn.valid).toBe(true);
    expect(resultEn.error).toBeUndefined();

    const resultEs = validateLeadPayload({
      email: "productor@example.com",
      source: "daily-shot-planner",
      locale: "es",
    });
    expect(resultEs.valid).toBe(true);
    expect(resultEs.error).toBeUndefined();
  });

  it("links to /es/areas in the Spanish shot planner page", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const content = fs.readFileSync(
      path.join(process.cwd(), "app/(spanish)/es/planificador-de-tomas-de-video/page.tsx"),
      "utf8",
    );
    expect(content).toContain('href="/es/areas"');
    expect(content).toContain("áreas de servicio de video en South Florida");
  });
});
