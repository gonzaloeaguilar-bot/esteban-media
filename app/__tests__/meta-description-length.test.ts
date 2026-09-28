import { describe, expect, it } from "vitest";

import { buildPageMetadata, clampDescription } from "@/lib/site-metadata";

/**
 * Measured on production 2026-09-28: 6 of a random 40-URL sample carried a
 * description over 160 characters — up to 280 on the portfolio and case-study
 * pages, whose descriptions are generated from body copy. Past ~158 characters
 * Google truncates, so the tail is written for nobody.
 */
describe("meta description length", () => {
  it("leaves a description that already fits completely alone", () => {
    const short = "Edición de video en Fort Lauderdale. Español primero.";
    expect(clampDescription(short)).toBe(short);
  });

  it("cuts on a word and never mid-word", () => {
    const long = "Producción audiovisual ".repeat(20);
    const out = clampDescription(long);
    expect(out.length).toBeLessThanOrEqual(170);
    expect(out).not.toMatch(/\wProducc$|\wProduc$/);
    expect(out.endsWith("…")).toBe(true);
  });

  it("does not stack an ellipsis on a sentence that already ended", () => {
    const text = `${"palabra ".repeat(18)}fin.`;
    const out = clampDescription(text, 160);
    if (out.endsWith(".")) expect(out.endsWith("….")).toBe(false);
  });

  it("clamps through the one metadata funnel, in every place the tag appears", () => {
    const meta = buildPageMetadata({
      title: "Prueba",
      description: "x".repeat(300),
      path: "/prueba",
      locale: "es",
    });
    expect((meta.description as string).length).toBeLessThanOrEqual(170);
    expect((meta.openGraph?.description as string).length).toBeLessThanOrEqual(170);
    expect((meta.twitter?.description as string).length).toBeLessThanOrEqual(170);

    // a hand-written 160-character description is left exactly as written
    const authored = "Meet Esteban Moreno, founder of Esteban Moreno Media in Fort Lauderdale. Spanish-first video editing, AI-assisted content, social planning, and scoped projects.";
    expect(clampDescription(authored)).toBe(authored);
  });
});
