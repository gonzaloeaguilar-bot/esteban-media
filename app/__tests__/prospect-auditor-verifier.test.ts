import { describe, it, expect } from "vitest";
import { verifyProspectWebFidelity } from "../../lib/prospect-auditor-verifier.mjs";

describe("Factual Prospect Auditor Verifier - Pressure Test Suite", () => {
  it("accurately audits real Squarespace website with Instagram handle extraction", async () => {
    const result = await verifyProspectWebFidelity("https://www.eatatpetesaplace.com/", 4.7, 380);

    expect(result.hasWebsite).toBe(true);
    expect(result.platform).toBe("Squarespace");
    expect(result.domain).toBe("www.eatatpetesaplace.com");
    expect(result.instagramHandle).toBe("@petesaplacefl");
    expect(result.hasLocalSchema).toBe(true);
    expect(result.factualEvidence.length).toBeGreaterThanOrEqual(4);
    expect(result.auditClaim).toContain("Squarespace");
  }, 15000);

  it("accurately handles missing website fallback without false claims", async () => {
    const result = await verifyProspectWebFidelity("", 4.5, 80);

    expect(result.hasWebsite).toBe(false);
    expect(result.platform).toBe("None");
    expect(result.statusText).toContain("Sin sitio web configurado");
    expect(result.auditClaim).toContain("Google Maps no cuenta con un sitio web oficial");
  });

  it("accurately detects third-party template platforms for Dragon Inn", async () => {
    const result = await verifyProspectWebFidelity("https://www.dragoninnfortlauderdale.com/", 4.5, 145);

    expect(result.hasWebsite).toBe(true);
    expect(result.domain).toBe("www.dragoninnfortlauderdale.com");
    expect(result.factualEvidence).toBeDefined();
    expect(result.auditClaim).toContain("www.dragoninnfortlauderdale.com");
  }, 15000);
});
