import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  ARRANQUE_WEEKLY_PAGES,
  ARRANQUE_WEEKLY_SPANISH_SLUGS,
  arranqueWeeklyCopy,
  arranqueWeeklyCtaId,
  arranqueWeeklyFaq,
  arranqueWeeklyHref,
  arranqueWeeklyIncludes,
  arranqueWeeklyOfferJsonLd,
  arranqueWeeklyWhatsapp,
} from "@/lib/arranque-weekly";
import {
  ARRANQUE_WEEKLY_FROM,
  ARRANQUE_WEEKLY_OPTIONS,
  ARRANQUE_WEEKLY_TERMS,
  arranqueWeeklyPerVideo,
} from "@/lib/pricing";
import type { Locale } from "@/lib/packages";

const locales: Locale[] = ["es", "en"];
const source = (p: string) => readFileSync(p, "utf8");

function allCopy(locale: Locale): string[] {
  const c = arranqueWeeklyCopy(locale);
  return [
    c.eyebrow, c.heading, c.answer, c.paidWeekly, c.termsHeading, c.faqHeading, c.packageCardLine,
    ...c.terms,
    ...ARRANQUE_WEEKLY_OPTIONS.flatMap((o) => [c.cta(o), ...arranqueWeeklyIncludes(o, locale), decodeURIComponent(arranqueWeeklyWhatsapp("+13054974478", o, locale))]),
    ...arranqueWeeklyFaq(locale).flatMap((f) => [f.question, f.answer]),
  ];
}

describe("Arranque weekly plan", () => {
  it("publishes the owner-approved weekly prices from lib/pricing.ts", () => {
    expect(ARRANQUE_WEEKLY_OPTIONS.map((o) => [o.videosPerWeek, o.pricePerWeek, o.changesPerVideo])).toEqual([[1, 85, 1], [2, 160, 2]]);
    expect(ARRANQUE_WEEKLY_OPTIONS.map(arranqueWeeklyPerVideo)).toEqual([85, 80]);
    expect(ARRANQUE_WEEKLY_FROM).toEqual({ perWeek: 85, perVideo: 80 });
    expect(ARRANQUE_WEEKLY_TERMS).toEqual({ maxVideoSeconds: 90, maxFootageMinutes: 10, deliveryHoursMin: 48, deliveryHoursMax: 72 });
  });

  it.each(locales)("%s: no separate package name, no discount framing, no per-video comparison", (locale) => {
    const text = allCopy(locale).join("\n");
    for (const banned of [/Crecimiento/, /Esencial/, /Growth/, /Essential/, /Edici[oó]n para creadores/i, /Creator editing/i, /cortes[ií]a/i, /[-−]\s?\d+\s?%/, /ahorr/i, /valor normal/i, /\bsave\b/i, /\$100/, /suelto/i]) {
      expect(text, String(banned)).not.toMatch(banned);
    }
    expect(text).toMatch(locale === "es" ? /Arranque semanal/ : /Weekly Starter/);
    expect(text).toMatch(locale === "es" ? /desde \$80 por video/ : /from \$80 per video/);
  });

  it.each(locales)("%s: ten FAQs from the proposal, numbers from the terms", (locale) => {
    const faqs = arranqueWeeklyFaq(locale);
    expect(faqs).toHaveLength(10);
    expect(faqs[4].answer).toContain(`${ARRANQUE_WEEKLY_TERMS.maxFootageMinutes} min`);
    expect(faqs[9].answer).toMatch(locale === "es" ? /^No, nadie puede/ : /^No, nobody can/);
  });

  it.each(locales)("%s: WhatsApp message names the option and its weekly price", (locale) => {
    const [one, two] = ARRANQUE_WEEKLY_OPTIONS;
    expect(decodeURIComponent(arranqueWeeklyWhatsapp("+13054974478", one, locale))).toContain(locale === "es" ? "1 video por semana ($85 por semana)" : "1 video a week ($85 per week)");
    expect(decodeURIComponent(arranqueWeeklyWhatsapp("+13054974478", two, locale))).toContain(locale === "es" ? "2 videos por semana ($160 por semana)" : "2 videos a week ($160 per week)");
    expect(arranqueWeeklyWhatsapp("+13054974478", one, locale)).toMatch(/^https:\/\/wa\.me\/13054974478\?text=/);
  });

  it("gives each option its own cta id", () => {
    expect(new Set(ARRANQUE_WEEKLY_OPTIONS.map((o) => arranqueWeeklyCtaId(o.id))).size).toBe(2);
  });

  it.each(locales)("%s: OfferCatalog prices equal the pricing constants", (locale) => {
    const node = arranqueWeeklyOfferJsonLd(locale, "https://x.test/p", "https://x.test/#business");
    expect(node.itemListElement.map((o) => o.priceSpecification.price)).toEqual([85, 160]);
    expect(node.itemListElement.every((o) => o.priceSpecification.priceCurrency === "USD")).toBe(true);
  });

  it("renders on the four creator pages and the Arranque card links to it", () => {
    for (const p of ARRANQUE_WEEKLY_PAGES.en) {
      const s = source(`app/(english)${p}/page.tsx`);
      expect(s).toContain('<ArranqueWeeklySection locale="en" />');
      expect(s).toContain('arranqueWeeklyFaq("en")');
    }
    expect([...ARRANQUE_WEEKLY_SPANISH_SLUGS]).toEqual(ARRANQUE_WEEKLY_PAGES.es.map((p) => p.slice(4)));
    expect(source("components/spanish-niche-page.tsx")).toContain('<ArranqueWeeklySection locale="es" />');
    const pk = source("components/packages-section.tsx");
    expect(pk).toContain('pkg.id === "arranque"');
    expect(pk).not.toContain("ArranqueWeeklySection");
    expect(arranqueWeeklyHref("es")).toBe("/es/edicion-de-video-para-creadores-de-contenido-miami#arranque-semanal");
    expect(arranqueWeeklyHref("en")).toBe("/services/content-creator-video-editing-miami#weekly-starter");
  });
});
