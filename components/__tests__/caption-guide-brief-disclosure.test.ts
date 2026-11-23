import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ContactPage from "@/app/(english)/contact/page";
import SpanishContactPage from "@/app/(spanish)/es/contacto/page";
import { isCaptionGuideBriefRequest } from "@/components/caption-guide-brief-disclosure";

describe("caption-guide contact attribution", () => {
  it("only opens the native brief for the exact allowlisted source and fragment", () => {
    expect(isCaptionGuideBriefRequest("?source=caption-guide", "#video-brief")).toBe(true);
    expect(isCaptionGuideBriefRequest("?source=caption-guide", "#other-section")).toBe(false);
    expect(isCaptionGuideBriefRequest("?source=unknown", "#video-brief")).toBe(false);
  });

  it("serves the native brief disclosure and its first-step content before JavaScript on both contact routes", () => {
    for (const [Page, firstStep] of [[ContactPage, "Step 1:"], [SpanishContactPage, "Paso 1:"]] as const) {
      const html = renderToStaticMarkup(createElement(Page));
      expect(html).toContain('<details id="video-brief"');
      expect(html).toContain('data-section="contact_video_brief"');
      expect(html).toContain(firstStep);
      expect(html).not.toContain('<details id="video-brief" open=""');
    }
  });
});
