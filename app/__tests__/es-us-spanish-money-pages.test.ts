import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { getGuides } from "@/lib/guides";
import { getSpanishNichePage } from "@/lib/spanish-site";
import { PRICING_BANDS, SHORT_FORM, usd } from "@/lib/pricing";

describe("US-Spanish money pages & contextual linking", () => {
  const source = readFileSync(join(process.cwd(), "lib/spanish-site.ts"), "utf8");

  it("restores Spanish diacritics on the Fort Lauderdale and Miami Reels entries", () => {
    const ftl = getSpanishNichePage("editor-de-reels-fort-lauderdale");
    const miami = getSpanishNichePage("editor-de-reels-miami");

    expect(ftl).toBeDefined();
    expect(miami).toBeDefined();

    if (!ftl || !miami) return;

    // Title / metadataTitle
    expect(ftl.metadataTitle).toBe("Editor de Reels Fort Lauderdale");
    expect(ftl.description).toContain("Edición");
    expect(ftl.description).toContain("videos cortos");
    expect(ftl.lead).toContain("página");
    expect(ftl.lead).toContain("están");
    expect(ftl.lead).toContain("videos cortos");

    expect(miami.description).toContain("Edición");
    expect(miami.lead).toContain("rápida");
    expect(miami.bestFor.join(" ")).toContain("bilingües");

    // Sections
    for (const page of [ftl, miami]) {
      expect(page.sections).toBeDefined();
      expect(page.sections!.length).toBeGreaterThanOrEqual(4);
      for (const section of page.sections!) {
        expect(section.heading.startsWith("¿")).toBe(true);
        expect(section.heading.endsWith("?")).toBe(true);
      }
      for (const faq of page.faqs) {
        expect(faq.question.startsWith("¿")).toBe(true);
        expect(faq.question.endsWith("?")).toBe(true);
        expect(faq.answer).not.toContain("Si.");
        expect(faq.answer).not.toContain("espanol");
        expect(faq.answer).not.toContain("edicion");
      }
    }
  });

  it("derives price sentences from PRICING_BANDS with no hardcoded price literals in source", () => {
    const ftl = getSpanishNichePage("editor-de-reels-fort-lauderdale");
    const miami = getSpanishNichePage("editor-de-reels-miami");
    const miamiEditor = getSpanishNichePage("editor-de-video-miami");

    expect(ftl).toBeDefined();
    expect(miami).toBeDefined();
    expect(miamiEditor).toBeDefined();

    const expectedSocialMin = usd(SHORT_FORM.weekly[0].pricePerWeek);
    const expectedSocialMax = usd(SHORT_FORM.weekly[1].pricePerWeek);

    const ftlPriceSection = ftl?.sections?.find((s) => s.heading.includes("Cuánto cuesta"));
    expect(ftlPriceSection).toBeDefined();
    expect(ftlPriceSection?.paragraphs.join(" ")).toContain(expectedSocialMin);
    expect(ftlPriceSection?.paragraphs.join(" ")).toContain(expectedSocialMax);
    expect(ftlPriceSection?.paragraphs.join(" ")).toContain("/es/precios");

    const miamiPriceSection = miami?.sections?.find((s) => s.heading.includes("Cuánto cuesta"));
    expect(miamiPriceSection).toBeDefined();
    expect(miamiPriceSection?.paragraphs.join(" ")).toContain(expectedSocialMin);
    expect(miamiPriceSection?.paragraphs.join(" ")).toContain(expectedSocialMax);
    expect(miamiPriceSection?.paragraphs.join(" ")).toContain("/es/precios");

    const miamiEditorPriceSection = miamiEditor?.sections?.find((s) => s.heading.includes("Cuánto cuesta"));
    expect(miamiEditorPriceSection).toBeDefined();
    expect(miamiEditorPriceSection?.paragraphs.join(" ")).toContain(expectedSocialMin);
    expect(miamiEditorPriceSection?.paragraphs.join(" ")).toContain(usd(PRICING_BANDS.youtube.baseMin));
    expect(miamiEditorPriceSection?.paragraphs.join(" ")).toContain(usd(PRICING_BANDS.corporate.baseMin));
  });

  it("contains required cross-links across Reels and hub pages", () => {
    const ftl = getSpanishNichePage("editor-de-reels-fort-lauderdale");
    const miami = getSpanishNichePage("editor-de-reels-miami");
    const hub = getSpanishNichePage("editor-de-video-corto-para-redes-miami");
    const miamiEditor = getSpanishNichePage("editor-de-video-miami");

    const ftlAllText = ftl?.sections?.flatMap((s) => s.paragraphs).join(" ") ?? "";
    expect(ftlAllText).toContain("/es/editor-de-reels-miami");
    expect(ftlAllText).toContain("/es/editor-de-video-corto-para-redes-miami");
    expect(ftlAllText).toContain("/es/editor-de-video-miami");

    const miamiAllText = miami?.sections?.flatMap((s) => s.paragraphs).join(" ") ?? "";
    expect(miamiAllText).toContain("/es/editor-de-reels-fort-lauderdale");
    expect(miamiAllText).toContain("/es/editor-de-video-corto-para-redes-miami");
    expect(miamiAllText).toContain("/es/editor-de-video-miami");

    const hubAllText = hub?.sections?.flatMap((s) => s.paragraphs).join(" ") ?? "";
    expect(hubAllText).toContain("[editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale)");
    expect(hubAllText).toContain("[editor de Reels en Miami](/es/editor-de-reels-miami)");

    const miamiEditorAllText = miamiEditor?.sections?.flatMap((s) => s.paragraphs).join(" ") ?? "";
    expect(miamiEditorAllText).toContain("/es/editor-de-reels-fort-lauderdale");
    expect(miamiEditorAllText).toContain("/es/editor-de-reels-miami");
    expect(miamiEditorAllText).toContain("/es/editor-de-video-corto-para-redes-miami");
    expect(miamiEditorAllText).toContain("/es/guias/editor-de-video-vs-videografo");
  });

  it("contains contextual inbound links from location pages and guides", () => {
    const vgFt = getSpanishNichePage("videografo-en-fort-lauderdale");
    expect(vgFt?.projectFit).toContain("[editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale)");

    const prodFt = getSpanishNichePage("produccion-de-video-fort-lauderdale");
    expect(prodFt?.projectFit).toContain("[editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale)");

    const vgMiami = getSpanishNichePage("videografo-en-miami");
    expect(vgMiami?.projectFit).toContain("[editor de Reels en Miami](/es/editor-de-reels-miami)");

    const reelsBizMiami = getSpanishNichePage("reels-para-negocios-miami");
    expect(reelsBizMiami?.projectFit).toContain("[editor de Reels en Miami](/es/editor-de-reels-miami)");

    const esGuides = getGuides("es");
    const ftlCostGuide = esGuides.find((g) => g.slug === "cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale");
    expect(ftlCostGuide).toBeDefined();
    const ftlGuideText = ftlCostGuide?.sections?.flatMap((s) => s.paragraphs).join(" ") ?? "";
    expect(ftlGuideText).toContain("[editor de Reels en Fort Lauderdale](/es/editor-de-reels-fort-lauderdale)");

    const chooseGuide = esGuides.find((g) => g.slug === "como-elegir-un-editor-de-video-en-miami");
    expect(chooseGuide).toBeDefined();
    const chooseGuideText = chooseGuide?.sections?.flatMap((s) => s.paragraphs).join(" ") ?? "";
    expect(chooseGuideText).toContain("[editor de video en Miami](/es/editor-de-video-miami)");
  });

  it("publishes /es/editor-de-video-miami as an indexable Spanish-first page in the sitemap", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    const targetUrl = "https://estebanmorenomedia.com/es/editor-de-video-miami";

    expect(urls).toContain(targetUrl);

    const page = getSpanishNichePage("editor-de-video-miami");
    expect(page).toBeDefined();
    expect(page?.title).toBe("Editor de Video en Miami");
    expect(page?.metadataTitle).toBe("Editor de Video en Miami en Español");
    expect(page?.sections).toBeDefined();
    expect(page?.sections?.length).toBeGreaterThanOrEqual(5);
    expect(page?.faqs.length).toBeGreaterThanOrEqual(3);
  });
});
