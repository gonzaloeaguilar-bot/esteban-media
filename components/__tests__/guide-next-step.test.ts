import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { GuideNextStep } from "@/components/guide-next-step";

describe("GuideNextStep", () => {
  it("keeps voluntary reading and an attributable WhatsApp handoff in served HTML", () => {
    const html = renderToStaticMarkup(createElement(GuideNextStep, {
      locale: "en",
      guideTitle: "How to prepare footage",
    }));

    expect(html).toContain('data-section="guide_next_step"');
    expect(html).toContain('data-cta="guide_next_step_continue"');
    expect(html).toContain('href="#section-1"');
    expect(html).toContain('data-cta="guide_next_step_whatsapp"');
    expect(html).toContain("https://wa.me/13054974478");
    expect(html).toContain("How%20to%20prepare%20footage");
  });

  it("renders a source-preserving contact brief path and WhatsApp fallback when briefSource is provided", () => {
    const enHtml = renderToStaticMarkup(createElement(GuideNextStep, {
      locale: "en",
      guideTitle: "Fastest way to send large video files to an editor",
      briefSource: "large-files-guide",
    }));
    expect(enHtml).toContain('href="/contact?source=large-files-guide#video-brief"');
    expect(enHtml).toContain('data-cta="guide_next_step_brief"');
    expect(enHtml).toContain('data-cta="guide_next_step_whatsapp"');

    const esHtml = renderToStaticMarkup(createElement(GuideNextStep, {
      locale: "es",
      guideTitle: "Forma más rápida de enviar archivos de video grandes a un editor",
      briefSource: "large-files-guide",
    }));
    expect(esHtml).toContain('href="/es/contacto?source=large-files-guide#video-brief"');
    expect(esHtml).toContain('data-cta="guide_next_step_brief"');
  });
});
