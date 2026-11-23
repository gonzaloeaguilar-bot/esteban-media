import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CaptionGuideNextStep } from "@/components/caption-guide-next-step";
import { reviewSourceUrl } from "@/lib/client-reviews";

describe("CaptionGuideNextStep", () => {
  it("keeps a self-serve anchor and an honest WhatsApp path in the served HTML", () => {
    const html = renderToStaticMarkup(createElement(CaptionGuideNextStep, { locale: "en" }));

    expect(html).toContain('data-section="caption_guide_next_step"');
    expect(html).toContain('data-cta="caption_guide_self_serve"');
    expect(html).toContain('href="#caption-typography-title"');
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
});
