import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  ARRANQUE_WEEKLY_PAGES,
  ARRANQUE_WEEKLY_SPANISH_SLUGS,
  arranqueWeeklyComparisonLine,
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

  it.each(locales)("%s: no separate package name, no discount framing", (locale) => {
    const text = [...allCopy(locale), arranqueWeeklyCopy(locale).comparison].join("\n");
    for (const banned of [/Crecimiento/, /Esencial/, /Growth/, /Essential/, /Edici[oó]n para creadores/i, /Creator editing/i, /cortes[ií]a/i, /\d+\s?%/, /ahorr/i, /descuento/i, /discount/i, /valor normal/i, /\bsave\b/i]) {
      expect(text, String(banned)).not.toMatch(banned);
    }
    // ONE Starter (owner, 2026-10-08): paying weekly is a way to buy Arranque,
    // never a second product with its own name.
    expect(text).not.toMatch(/Arranque semanal|Weekly Starter/i);
    expect(text).toMatch(locale === "es" ? /Arranque/ : /Starter/);
    expect(text).toMatch(locale === "es" ? /desde \$80 por video/ : /from \$80 per video/);
  });

  it("names no second Starter anywhere a visitor or crawler reads it", () => {
    for (const path of ["components/starter-options.tsx", "components/arranque-weekly-section.tsx", "components/packages-section.tsx", "components/needs-chooser.tsx", "lib/needs-doors.ts", "lib/arranque-weekly.ts"]) {
      const code = source(path).replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, "");
      expect(code, path).not.toMatch(/Arranque semanal|Weekly Starter/);
    }
    for (const locale of locales) {
      const node = arranqueWeeklyOfferJsonLd(locale, "https://x.test/p", "https://x.test/#business");
      expect(JSON.stringify(node)).not.toMatch(/"name":"[^"]*(?:Arranque semanal|Weekly Starter)/);
    }
  });

  it.each(locales)("%s: the creator section answers how Starter is paid, framed by how often", (locale) => {
    const c = arranqueWeeklyCopy(locale);
    expect(c.heading).toBe(locale === "es" ? "¿Cómo se paga el Arranque?" : "How do you pay for Starter?");
    expect(c.answer).toContain(locale === "es" ? "Una sola vez: $100 por video" : "Just once: $100 per video");
    expect(c.answer).toContain(locale === "es" ? "Cada semana: $85 por 1 video o $160 por 2 videos" : "Every week: $85 for 1 video or $160 for 2 videos");
  });

  // Arranque is one video edit (owner, 2026-10-08): the honest comparison is published.
  it("compares weekly per-video price with a single video, computed from lib/pricing.ts", () => {
    expect(arranqueWeeklyComparisonLine("es")).toBe("desde $80 por video vs $100 un video suelto");
    expect(arranqueWeeklyComparisonLine("en")).toBe("from $80 per video vs $100 for a single video");
    expect(arranqueWeeklyCopy("es").comparison).toBe(arranqueWeeklyComparisonLine("es"));
    const body = source("lib/arranque-weekly.ts").match(/export function arranqueWeeklyComparisonLine[\s\S]*?\n}\n/)?.[0] ?? "";
    expect(body).toContain("PACKAGE_PRICES.arranque");
    expect(body).not.toMatch(/\b(?:80|100)\b/);
  });

  it("pricing card and creator pages render the SAME Starter options, with the comparison and no badge", () => {
    const options = source("components/starter-options.tsx");
    expect(options).toContain("arranqueWeeklyComparisonLine(locale)");
    for (const words of ["¿Cada cuánto necesitas videos?", "How often do you need videos?", "Una sola vez", "Just once", "Cada semana", "Every week", "Pago semanal · cancela cualquier semana", "Paid weekly · stop any week"]) {
      expect(options).toContain(words);
    }
    expect(options).not.toMatch(/line-through|<s>|<del>|badge/i);
    expect(source("components/arranque-weekly-section.tsx")).toContain("<StarterOptions locale={locale}");
    // Pricing and home (2026-10-08 needs-first chooser): the same two ways to
    // buy Starter, behind two doors — weekly from ARRANQUE_WEEKLY_OPTIONS with
    // the same comparison line, and the single video from priceFor("arranque").
    const chooser = source("components/needs-chooser.tsx");
    expect(source("components/packages-section.tsx")).toContain("<NeedsChooser locale={locale} />");
    expect(chooser).toContain("ARRANQUE_WEEKLY_OPTIONS.map(");
    expect(chooser).toContain("arranqueWeeklyComparisonLine(locale)");
    expect(chooser).toContain('priceFor("arranque")');
    expect(chooser).not.toMatch(/line-through|<s>|<del>|badge/i);
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
    const pk = source("components/needs-chooser.tsx");
    expect(pk).toContain("arranqueWeeklyHref(locale)");
    expect(pk).not.toContain("ArranqueWeeklySection");
    expect(arranqueWeeklyHref("es")).toBe("/es/edicion-de-video-para-creadores-de-contenido-miami#arranque-semanal");
    expect(arranqueWeeklyHref("en")).toBe("/services/content-creator-video-editing-miami#weekly-starter");
  });
});
