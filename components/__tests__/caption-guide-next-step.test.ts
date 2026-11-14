import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { CaptionGuideNextStep } from "@/components/caption-guide-next-step";

describe("CaptionGuideNextStep", () => {
  it("keeps a self-serve anchor and an honest WhatsApp path in the served HTML", () => {
    const html = renderToStaticMarkup(createElement(CaptionGuideNextStep, { locale: "en" }));

    expect(html).toContain('data-section="caption_guide_next_step"');
    expect(html).toContain('data-cta="caption_guide_self_serve"');
    expect(html).toContain('href="#caption-typography-title"');
    expect(html).toContain('data-cta="caption_guide_done_for_you_whatsapp"');
    expect(html).toContain("https://wa.me/13054974478");
    expect(html).toContain("text-[#101214]");
    expect(html).toContain("text-white");
  });
});
