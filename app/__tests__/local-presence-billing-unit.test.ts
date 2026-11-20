import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { packageDirectAnswer } from "@/lib/packages";
import { PACKAGE_PRICES } from "@/lib/pricing";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("Local Presence monthly billing clarity", () => {
  it("keeps the existing canonical monthly price unchanged", () => {
    expect(PACKAGE_PRICES["presencia-local"]).toEqual({ kind: "from", amount: 1600, unit: "month" });
  });

  it("answers a monthly-plan question rather than quoting a day rate", () => {
    const en = packageDirectAnswer("presencia-local", "en");
    const es = packageDirectAnswer("presencia-local", "es");
    expect(en.question).toContain("monthly");
    expect(en.answer).toContain("per month");
    expect(es.question).toContain("mensual");
    expect(es.answer).toContain("al mes");
  });

  it("keeps guide and vertical plan quotes monthly without changing actual day rates", () => {
    for (const file of ["lib/vertical-deep-dives.ts", "lib/hospitality-deep-dive-content.ts", "lib/guides.ts", "lib/guide-comparisons.ts", "lib/guide-hubs.ts"]) {
      const text = source(file);
      expect(text).not.toContain("starts at a production-day price");
      expect(text).not.toMatch(/\$\{(?:local|localPresenceEn|localPresenceEs|packageGuidePrice\("presencia-local"\))\} (?:per production day|por día de producción|por jornada de producción)/);
    }
    expect(source("lib/guides.ts")).toContain("TURNKEY_PRODUCTION_BUNDLES.soloHalfDay");
  });

  it("does not label the monthly price as a per-production-day charge", () => {
    expect(source("lib/service-deep-dive-content.ts")).not.toContain("${localPresenceFrom} per production day");
    expect(source("lib/spanish-site.ts")).not.toContain("${esLocalFrom} por día de producción");
    expect(source("lib/niche-answers.ts")).not.toContain("la jornada de producción del paquete Presencia Local");
    expect(source("components/service-depth.tsx")).toContain('per month');
    expect(source("components/service-depth.tsx")).not.toContain("los días de producción en locación desde");
    expect(source("components/service-depth.tsx")).toContain('${packageFrom("presencia-local")} al mes');
    expect(source("app/(english)/pricing/page.tsx")).toContain("monthly Local Presence plan");
    expect(source("app/(spanish)/es/precios/page.tsx")).toContain("plan mensual Presencia Local");
  });
});
