import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ServiceDecisionRail } from "@/components/service-decision-rail";

describe("ServiceDecisionRail", () => {
  it("keeps every buyer choice as a measurable ordinary link", () => {
    const html = renderToStaticMarkup(createElement(ServiceDecisionRail, { content: {
      eyebrow: "Choose",
      heading: "What do you have?",
      intro: "Pick one.",
      decisions: [
        { id: "existing", title: "Existing clips", detail: "Send clips.", href: "https://wa.me/1", action: "Ask" },
        { id: "weekly", title: "Weekly", detail: "Send cadence.", href: "https://wa.me/2", action: "Ask" },
      ],
    } }));

    expect(html).toContain('data-section="service-decision-rail"');
    expect(html).toContain('data-cta="service_decision_existing_whatsapp"');
    expect(html).toContain('href="https://wa.me/2"');
  });
});
