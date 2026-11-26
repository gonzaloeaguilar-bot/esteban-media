import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { readFileSync } from "node:fs";

import { CaptionGuideNextStep } from "@/components/caption-guide-next-step";
import { reviewSourceUrl } from "@/lib/client-reviews";

describe("CaptionGuideNextStep", () => {
  it("keeps the self-serve anchor, source-preserving brief path, and direct WhatsApp fallback in served HTML", () => {
    const html = renderToStaticMarkup(createElement(CaptionGuideNextStep, { locale: "en" }));

    expect(html).toContain('data-section="caption_guide_next_step"');
    expect(html).toContain('data-cta="caption_guide_self_serve"');
    expect(html).toContain('href="#caption-typography-title"');
    expect(html).toContain('href="/contact?source=caption-guide#video-brief"');
    expect(html).toContain('data-cta="caption_guide_done_for_you_brief"');
    expect(html).toContain('data-cta="caption_guide_done_for_you_whatsapp"');
    expect(html).toContain("https://wa.me/13054974478");
  });

  it("surfaces verified Google Business Profile review proof for both EN and ES locales", () => {
    const enHtml = renderToStaticMarkup(createElement(CaptionGuideNextStep, { locale: "en" }));
    expect(enHtml).toContain('data-cta="caption_guide_local_proof_gbp"');
    expect(enHtml).toContain(`href="${reviewSourceUrl}"`);
    expect(enHtml).toContain("Read public Google reviews before you ask");
    expect(enHtml).toContain('target="_blank"');
    expect(enHtml).toContain('rel="noopener noreferrer"');

    const esHtml = renderToStaticMarkup(createElement(CaptionGuideNextStep, { locale: "es" }));
    expect(esHtml).toContain('data-cta="caption_guide_local_proof_gbp"');
    expect(esHtml).toContain(`href="${reviewSourceUrl}"`);
    expect(esHtml).toContain("Lee reseñas públicas en Google antes de consultar");
  });

  it("keeps the Spanish source-preserving contact path", () => {
    const html = renderToStaticMarkup(createElement(CaptionGuideNextStep, { locale: "es" }));
    expect(html).toContain('href="/es/contacto?source=caption-guide#video-brief"');
    expect(html).toContain('data-cta="caption_guide_done_for_you_whatsapp"');
  });

  it("keeps the guide's fixed mobile action on the same source-preserving route", () => {
    const source = readFileSync("components/guide-pages.tsx", "utf8");
    expect(source).toContain('data-cta="caption_guide_sticky_brief"');
    expect(source).toContain('href={isEs ? "/es/contacto?source=caption-guide#video-brief" : "/contact?source=caption-guide#video-brief"}');
  });
});
