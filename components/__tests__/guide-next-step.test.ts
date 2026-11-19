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
});
