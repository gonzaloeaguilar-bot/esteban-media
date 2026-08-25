import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("digital-systems service catalog", () => {
  const english = source("app/(english)/services/website-design-fort-lauderdale/page.tsx");
  const spanish = source("app/(spanish)/es/diseno-web-fort-lauderdale/page.tsx");

  it("makes the connected digital-service catalog visible in both languages", () => {
    for (const label of [
      "Google Business Profile",
      "Yelp",
      "Zillow",
      "ManyChat",
      "Twilio",
      "Metricool",
      "SEO, local SEO & AI-search readiness",
      "Audits, research & resilience",
    ]) {
      expect(english).toContain(label);
    }

    for (const label of [
      "Google Business Profile",
      "Yelp",
      "Zillow",
      "ManyChat",
      "Twilio",
      "Metricool",
      "SEO, SEO local y preparación para búsqueda con IA",
      "Auditorías, research y resiliencia",
    ]) {
      expect(spanish).toContain(label);
    }
  });

  it("does not promise rankings, virality, or unsupported delivery times", () => {
    const catalog = `${english}\n${spanish}`.toLowerCase();

    expect(catalog).toContain("no provider controls placement in ai answers");
    expect(catalog).toContain("no garantizan que una publicación se vuelva viral");
    expect(catalog).not.toContain("2 to 3 weeks");
    expect(catalog).not.toContain("2 y 3 semanas");
  });
});
