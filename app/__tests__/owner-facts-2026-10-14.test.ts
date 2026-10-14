import { describe, expect, it } from "vitest";

import { OWNER_FACT_ANSWERS, latamAnswer, perHourAnswer } from "@/lib/owner-fact-answers";
import { SHORT_FORM, usd } from "@/lib/pricing";
import { WEDDING_DEPTH, WEDDING_PRICE_ANSWER } from "@/lib/service-depth-content";
import { WEDDING_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { getSpanishNichePage } from "@/lib/spanish-site";
import { portfolioServiceLink } from "@/lib/portfolio-service-links";
import { googleReviews } from "@/lib/client-reviews";

// Owner facts relayed 2026-10-14 (vault esteban-owner-facts-2026-10-14). These
// pin the claim discipline, not the prose: no wedding figure, no hourly rate,
// every price read from lib/pricing.ts.

const words = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;
const money = /\$\s?\d/;

describe("weddings are quoted individually", () => {
  it("uses the owner's exact price answer", () => {
    expect(WEDDING_PRICE_ANSWER.answer).toBe(
      "Each wedding is quoted individually because every wedding is different. Tell us the date, location, hours and what you want delivered, and we send a quote.",
    );
  });

  it("publishes no figure anywhere on the EN or ES wedding page copy", () => {
    const es = getSpanishNichePage("videografo-de-bodas-fort-lauderdale");
    expect(es).toBeDefined();
    const all = JSON.stringify([WEDDING_PRICE_ANSWER, WEDDING_DEPTH, WEDDING_DEEP_DIVE, es]);
    expect(all).not.toMatch(money);
    expect(all).not.toMatch(/drone|dron|aerial|aére/i);
    expect(es?.sections?.[0].heading).toBe("¿Cuánto cobra un videógrafo de bodas?");
    expect(es?.sections?.[0].paragraphs[0]).toBe(
      "Cada boda se cotiza por separado, porque cada boda es distinta. Cuéntanos la fecha, el lugar, las horas y lo que quieres recibir, y te enviamos una cotización.",
    );
  });

  it("links the published wedding film to the wedding page", () => {
    expect(portfolioServiceLink("diana-jack", "en")?.href).toBe("/services/wedding-videographer-fort-lauderdale");
    expect(portfolioServiceLink("diana-jack", "es")?.href).toBe("/es/videografo-de-bodas-fort-lauderdale");
  });
});

describe("editing is per video, not per hour", () => {
  it.each(["en", "es"] as const)("reads the per-video price from lib/pricing and names no hourly rate (%s)", (locale) => {
    const { answer } = perHourAnswer(locale);
    expect(answer).toContain(usd(SHORT_FORM.perVideoFrom));
    expect(answer).toMatch(locale === "es" ? /no cobra por hora/ : /does not charge by the hour/);
    expect(answer).not.toMatch(/\$\s?\d+\s*(\/|per|an|a|por)\s*(h|hour|hora)/i);
    expect(words(answer)).toBeGreaterThanOrEqual(80);
  });

  it("answers Latin American clients remotely, in USD", () => {
    const { answer } = latamAnswer();
    expect(answer).toContain("USD");
    expect(answer).toContain(usd(SHORT_FORM.perVideoFrom));
  });
});

describe("owner-fact sections", () => {
  it("are question-shaped and sized for one citable answer", () => {
    for (const [path, sections] of Object.entries(OWNER_FACT_ANSWERS)) {
      for (const section of sections) {
        expect(section.heading, path).toMatch(/\?$/);
        const n = words(section.paragraphs.join(" "));
        expect(n, `${path} ${section.id}`).toBeGreaterThanOrEqual(100);
        expect(n, `${path} ${section.id}`).toBeLessThanOrEqual(180);
      }
    }
  });

  it("never states an hourly rate or the parked filming rate", () => {
    const all = JSON.stringify(OWNER_FACT_ANSWERS);
    expect(all).not.toMatch(/\$80(?!\d)|per hour of filming|por hora de grabación/);
  });
});

describe("Google reviews on portfolio pages", () => {
  it("only cross-link a review whose reviewer is that project's client", () => {
    const linked = googleReviews.filter((review) => review.portfolioId);
    expect(linked.map((review) => [review.author, review.portfolioId])).toEqual([
      ["Fort Lauderdale Auto Sales", "flas-concierge"],
    ]);
  });
});
