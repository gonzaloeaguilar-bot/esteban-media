import { readFileSync } from "node:fs";
import { join } from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { NeedSomeoneThisWeek } from "@/components/need-someone-this-week";
import { getGuides } from "@/lib/guides";
import { pairedLanguageRoutes } from "@/lib/language-routes";
import {
  CREW_RECORDING_RATES,
  FILMING_HOURLY,
  SHORT_FORM,
  WEDDING_PACKAGES,
  turnaroundFor,
  usd,
} from "@/lib/pricing";
import { getSpanishNichePage, languageAlternates, spanishRoutes } from "@/lib/spanish-site";

/**
 * Commercial-intent package (2026-11-26, vault
 * esteban-commercial-intent-lateral-strategy-2026-11-26). Each test pins one
 * buyer question to an answer-first sentence whose figures come from
 * lib/pricing.ts, so a price change or a deleted section turns this red.
 */

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("money wall: price per video on the Reels price index", () => {
  it.each(["en", "es"] as const)("opens the %s guide with the per-video answer", (locale) => {
    const guide = getGuides(locale).find((g) => g.id === "reels-price-index-guide");
    expect(guide).toBeDefined();
    const first = guide!.sections[0];
    expect(first.heading).toBe(
      locale === "en" ? "How much does a video editor charge per video?" : "¿Cuánto cobra un editor de video por video?",
    );
    expect(first.paragraphs[0]).toContain(usd(SHORT_FORM.perVideoFrom));
    expect(first.paragraphs[0]).toContain(`${turnaroundFor("arranque").minimumDays}`);
    expect(first.paragraphs[1]).toMatch(locale === "en" ? /^When not to pay for an editor yet/ : /^Cuándo no pagar por un editor todavía/);
  });

  it("no longer claims a 24-hour turnaround anywhere in the guide", () => {
    for (const locale of ["en", "es"] as const) {
      const guide = getGuides(locale).find((g) => g.id === "reels-price-index-guide")!;
      const text = JSON.stringify(guide);
      expect(text).not.toMatch(/24-hour|24 horas/);
    }
  });
});

describe("Spanish videographer price page", () => {
  const page = getSpanishNichePage("cuanto-cobra-un-videografo-en-miami");

  it("exists, is routed and is sitemapped through spanishRoutes", () => {
    expect(page).toBeDefined();
    expect(spanishRoutes).toContain("/es/cuanto-cobra-un-videografo-en-miami");
  });

  it("answers in sentence one with the owner prices from lib/pricing.ts", () => {
    const answer = page!.answerFirst!;
    expect(page!.answerQuestion).toBe("¿Cuánto cobra un videógrafo en Miami?");
    expect(page!.lead).toContain(usd(FILMING_HOURLY.amount));
    expect(answer).toContain(usd(FILMING_HOURLY.amount));
    expect(answer).toContain(usd(FILMING_HOURLY.minimumAmount));
    expect(answer).toContain(usd(CREW_RECORDING_RATES.twoPerson.hourly));
    expect(answer).toContain(usd(WEDDING_PACKAGES.halfDayFrom));
    expect(answer).toContain(usd(WEDDING_PACKAGES.fullDayFrom));
  });

  it("publishes no dollar figure that lib/pricing.ts does not hold", () => {
    const allowed = new Set([
      usd(FILMING_HOURLY.amount), usd(FILMING_HOURLY.minimumAmount),
      usd(CREW_RECORDING_RATES.solo.halfDay), usd(CREW_RECORDING_RATES.solo.fullDay),
      usd(CREW_RECORDING_RATES.twoPerson.hourly), usd(CREW_RECORDING_RATES.twoPerson.minimumAmount),
      usd(WEDDING_PACKAGES.halfDayFrom), usd(WEDDING_PACKAGES.fullDayFrom), usd(SHORT_FORM.perVideoFrom),
    ]);
    const figures = JSON.stringify(page).match(/\$[\d,]+/g) ?? [];
    expect(figures.length).toBeGreaterThan(0);
    for (const figure of figures) expect(allowed).toContain(figure);
  });

  it("has no English hreflang twin (none exists)", () => {
    expect(languageAlternates["/es/cuanto-cobra-un-videografo-en-miami"]).toBeUndefined();
    expect(Object.values(pairedLanguageRoutes)).not.toContain("/es/cuanto-cobra-un-videografo-en-miami");
  });

  it("is linked from the Spanish pricing and Spanish videographer pages", () => {
    expect(read("app/(spanish)/es/precios/page.tsx")).toContain('href="/es/cuanto-cobra-un-videografo-en-miami"');
    expect(getSpanishNichePage("videografo-en-miami")!.projectFit).toContain("(/es/cuanto-cobra-un-videografo-en-miami)");
  });
});

describe("zero-jargon hire wording", () => {
  it("EN page names 'hire someone to edit' in title and an H2, and keeps the PR #831 lead", () => {
    const src = read("app/(english)/services/hire-remote-video-editor/page.tsx");
    expect(src).toContain('title: "Hire Someone to Edit Your Videos"');
    expect(src).toContain("Want to hire someone to edit your videos?</h2>");
    expect(src).toMatch(/pay someone to edit your videos/i);
    expect(src).toContain("{remoteBilingualEditing.lead}");
    expect(src).toContain("answerOverride={remoteBilingualEditing.answer}");
  });

  it("ES page names 'contratar a alguien que edite mis videos' in title and a section", () => {
    const page = getSpanishNichePage("contratar-editor-de-video-remoto")!;
    expect(page.metadataTitle).toBe("Contratar a Quien Edite mis Videos");
    expect(page.description).toMatch(/contratar a alguien que edite mis videos/i);
    expect(page.sections!.map((s) => s.heading)).toContain("¿Quieres contratar a alguien que edite tus videos?");
    expect(page.sectionsHeading).toBe("¿Cómo contratar a alguien que edite mis videos?");
    expect(page.sections![0].heading).toBe("¿Quieres contratar a alguien que edite tus videos?");
  });
});

describe("'Need someone this week?' decision block", () => {
  it.each(["en", "es"] as const)("renders the %s answer, the limit and a WhatsApp link", (locale) => {
    const html = renderToStaticMarkup(NeedSomeoneThisWeek({ locale, proof: { href: "/portfolio/diana-jack", label: "Diana & Jack" } }));
    expect(html).toContain(locale === "en" ? "Need someone this week?" : "¿Necesitas a alguien esta semana?");
    expect(html).toContain("https://wa.me/13054974478");
    expect(html).toMatch(locale === "en" ? /Not promised: same-day raw files/ : /No se promete: archivos originales/);
    expect(html).toContain(`${turnaroundFor("arranque").minimumDays}`);
    expect(html).toContain('href="/portfolio/diana-jack"');
  });

  it("is wired into the event hub, event pages, and the top event service pages", () => {
    const wired = [
      "components/event-content-page.tsx",
      "app/(english)/services/wedding-videographer-miami/page.tsx",
      "app/(english)/services/quinceanera-video-miami/page.tsx",
      "app/(english)/services/corporate-event-videographer-fort-lauderdale/page.tsx",
      "app/(english)/services/private-party-videographer-south-florida/page.tsx",
      "app/(spanish)/es/videografo-para-fiestas-privadas-sur-de-florida/page.tsx",
    ];
    for (const file of wired) expect(read(file), file).toContain("<NeedSomeoneThisWeek");
    expect(read("components/event-content-page.tsx").match(/<NeedSomeoneThisWeek/g)).toHaveLength(2);
    const niche = read("components/spanish-niche-page.tsx");
    for (const slug of ["video-para-quinceaneras-miami", "videografo-de-bodas-miami", "videografo-para-eventos-corporativos-fort-lauderdale"]) {
      expect(niche).toContain(`"${slug}": { href:`);
    }
  });
});
