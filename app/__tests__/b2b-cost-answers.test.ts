import { describe, expect, it } from "vitest";

import { WHITE_LABEL_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { spanishNichePages } from "@/lib/spanish-site";
import { getGuideById } from "@/lib/guides";
import { PRICING_BANDS, VOLUME_MULTIPLIERS, usd } from "@/lib/pricing";

const countWords = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

describe("B2B cost answers & testimonial guide verification", () => {
  const whiteLabelEs = spanishNichePages.find(
    (p) => p.slug === "edicion-de-video-marca-blanca-para-agencias"
  );
  if (!whiteLabelEs || !whiteLabelEs.sections) {
    throw new Error("Spanish white-label page or sections not found");
  }

  const guideEn = getGuideById("en", "testimonial-script-template-guide");
  const guideEs = getGuideById("es", "testimonial-script-template-guide");
  if (!guideEn || !guideEs) {
    throw new Error("Testimonial guide (EN/ES) not found");
  }

  it("every new section heading ends with ? and paragraphs total 100-180 words", () => {
    // EN white-label sections (first 2)
    const enSections = WHITE_LABEL_DEEP_DIVE.sections.slice(0, 2);
    expect(enSections).toHaveLength(2);
    for (const section of enSections) {
      expect(section.heading).toMatch(/\?$/);
      const words = countWords(section.paragraphs.join(" "));
      expect(words, `EN white-label: ${section.heading}`).toBeGreaterThanOrEqual(100);
      expect(words, `EN white-label: ${section.heading}`).toBeLessThanOrEqual(180);
    }

    // ES white-label sections (first 2)
    const esSections = whiteLabelEs.sections!.slice(0, 2);
    expect(esSections).toHaveLength(2);
    for (const section of esSections) {
      expect(section.heading).toMatch(/\?$/);
      const words = countWords(section.paragraphs.join(" "));
      expect(words, `ES white-label: ${section.heading}`).toBeGreaterThanOrEqual(100);
      expect(words, `ES white-label: ${section.heading}`).toBeLessThanOrEqual(180);
    }

    // Guide EN sections (4)
    expect(guideEn.sections).toHaveLength(4);
    for (const section of guideEn.sections) {
      expect(section.heading).toMatch(/\?$/);
      const words = countWords(section.paragraphs.join(" "));
      expect(words, `Guide EN: ${section.heading}`).toBeGreaterThanOrEqual(100);
      expect(words, `Guide EN: ${section.heading}`).toBeLessThanOrEqual(180);
    }

    // Guide ES sections (4)
    expect(guideEs.sections).toHaveLength(4);
    for (const section of guideEs.sections) {
      expect(section.heading).toMatch(/\?$/);
      const words = countWords(section.paragraphs.join(" "));
      expect(words, `Guide ES: ${section.heading}`).toBeGreaterThanOrEqual(100);
      expect(words, `Guide ES: ${section.heading}`).toBeLessThanOrEqual(180);
    }
  });

  it("white-label EN+ES text contains pricing constants, monthly min/max, and portfolio links", () => {
    const monthly15Mult = VOLUME_MULTIPLIERS["monthly-15"];
    const monthlyMin = usd(
      Math.round((PRICING_BANDS.social.baseMin * monthly15Mult.multMin) / 25) * 25
    );
    const monthlyMax = usd(
      Math.round((PRICING_BANDS.social.baseMax * monthly15Mult.multMax) / 25) * 25
    );

    // EN check
    const enText = JSON.stringify(WHITE_LABEL_DEEP_DIVE);
    expect(enText).toContain(usd(PRICING_BANDS.social.baseMin));
    expect(enText).toContain(usd(PRICING_BANDS.youtube.baseMax));
    expect(enText).toContain(monthlyMin);
    expect(enText).toContain(monthlyMax);
    expect(enText).toContain("](/portfolio/homeowners)");
    expect(enText).toContain("](/portfolio/healthy-smile)");

    // ES check
    const esText = JSON.stringify(whiteLabelEs);
    expect(esText).toContain(usd(PRICING_BANDS.social.baseMin));
    expect(esText).toContain(usd(PRICING_BANDS.youtube.baseMax));
    expect(esText).toContain(monthlyMin);
    expect(esText).toContain(monthlyMax);
    expect(esText).toContain("/es/portafolio/homeowners");
    expect(esText).toContain("/es/portafolio/healthy-smile");
  });

  it("guide EN+ES text contains pricing constants, healthy-smile proof, and no prohibited terms", () => {
    // EN checks
    const enText = JSON.stringify(guideEn);
    expect(enText).toContain(usd(PRICING_BANDS.corporate.baseMin));
    expect(enText).toContain(usd(PRICING_BANDS["on-location"].baseMax));
    expect(guideEn.proof.href).toBe("/portfolio/healthy-smile");

    // ES checks
    const esText = JSON.stringify(guideEs);
    expect(esText).toContain(usd(PRICING_BANDS.corporate.baseMin));
    expect(esText).toContain(usd(PRICING_BANDS["on-location"].baseMax));
    expect(guideEs.proof.href).toBe("/es/portafolio/healthy-smile");

    // Combined JSON regex check
    const combinedJson = JSON.stringify([guideEn, guideEs]);
    expect(combinedJson).not.toMatch(
      /my-dler|drone|aerial|Banacol|HIPAA|same-day|patient story/i
    );
  });
});
