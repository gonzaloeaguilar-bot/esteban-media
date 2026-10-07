import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import EnglishPage from "../(english)/daily-script-pacing-calculator/page";
import SpanishPage from "../(spanish)/es/calculadora-de-ritmo-de-video/page";
import { scriptPacingHelp } from "@/lib/script-pacing-help";

describe("pacing calculator answers available before hydration", () => {
  for (const [locale, Page, path] of [
    ["en", EnglishPage, "/daily-script-pacing-calculator"],
    ["es", SpanishPage, "/es/calculadora-de-ritmo-de-video"],
  ] as const) {
    it(`${locale}: serves closed native disclosures with matching FAQ schema`, () => {
      const html = renderToStaticMarkup(createElement(Page));
      const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
        .map((match) => JSON.parse(match[1]));
      const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
      expect(faq["@id"]).toBe(`https://estebanmorenomedia.com${path}#faq`);
      const answers = [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/g)].map((match) => match[1]);
      expect(answers).toHaveLength(3);
      expect(html).not.toMatch(/<details[^>]*\bopen(?:=|\s|>)/);
      expect(faq.mainEntity).toHaveLength(3);
      scriptPacingHelp[locale].faqs.forEach((item, index) => {
        expect(answers[index]).toContain(item.question);
        expect(answers[index]).toContain(item.answer);
        expect(faq.mainEntity[index].name).toBe(item.question);
        expect(faq.mainEntity[index].acceptedAnswer.text).toBe(item.answer);
      });
      expect(html).toContain('<time dateTime="2026-10-07">');
      expect(html).toContain(`href="${scriptPacingHelp[locale].serviceHref}"`);
      expect(html).not.toContain("aggregateRating");
    });
  }

  it("does not promise exact timing or retention from a word-count estimate", () => {
    const source = readFileSync("components/daily-script-pacing-calculator.tsx", "utf8");
    expect(source).not.toMatch(/duración exacta|tiempo exacto|exact spoken|calibrat[ae] viewer retention|calibra la retención/i);
    expect(source).toContain("Estimate your script duration");
    expect(source).toContain("Estima la duración de tu guion");
  });
});
