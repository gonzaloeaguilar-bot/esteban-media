import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi, afterEach } from "vitest";

import { trackLeadSubmit, trackServiceInterest } from "@/lib/analytics-events";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

const LEAD_FORMS = [
  "components/video-budget-estimator.tsx",
  "components/video-strategy-assessment.tsx",
  "components/video-brief-builder.tsx",
  "components/script-and-overlay-kit.tsx",
  "components/daily-publish-prompt.tsx",
  "components/daily-shot-list-planner.tsx",
  "components/daily-script-pacing-calculator.tsx",
  "components/contact-cta.tsx",
  "components/hero-project-intake.tsx",
  "components/website-project-intake.tsx",
];

afterEach(() => {
  delete (globalThis as { window?: unknown }).window;
});

describe("confirmed lead instrumentation", () => {
  it("sends only the form identity and locale, never PII", () => {
    const gtag = vi.fn();
    (globalThis as { window?: unknown }).window = { gtag };

    trackLeadSubmit("budget-estimator", "es");

    expect(gtag).toHaveBeenCalledTimes(2);
    const [command, name, params] = gtag.mock.calls[0];
    expect(command).toBe("event");
    expect(name).toBe("lead_submit");
    expect(params).toEqual({ lead_source: "budget-estimator", locale: "es" });

    expect(gtag).toHaveBeenLastCalledWith("event", "contact_intent", {
      contact_method: "form_submit",
      lead_source: "budget-estimator",
      locale: "es",
    });

    // The PII the forms collect must never reach GA4.
    for (const event of gtag.mock.calls) {
      const eventParams = event[2] as Record<string, unknown>;
      for (const forbidden of ["email", "name", "phone", "company", "notes"]) {
        expect(Object.keys(eventParams)).not.toContain(forbidden);
      }
    }
  });

  it("adds only the found_via slug, never the visitor's typed words", () => {
    const gtag = vi.fn();
    (globalThis as { window?: unknown }).window = { gtag };

    trackLeadSubmit("contact", "en", "chatgpt");

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "lead_submit", {
      lead_source: "contact",
      locale: "en",
      found_via: "chatgpt",
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "contact_intent", {
      contact_method: "form_submit",
      lead_source: "contact",
      locale: "en",
      found_via: "chatgpt",
    });
    for (const event of gtag.mock.calls) {
      expect(Object.keys(event[2] as object)).not.toContain("found_query");
    }
  });

  it("the homepage form asks how the visitor found Esteban, optionally", () => {
    const contact = source("components/contact-cta.tsx");
    expect(contact).toContain("How did you find us?");
    expect(contact).toContain('name="foundVia"');
    expect(contact).toContain('name="foundQuery"');
    expect(contact).toContain('trackLeadSubmit("contact", "en", foundVia || "not_answered")');
    // Optional: the select must not be required.
    expect(contact).not.toMatch(/id="homepage-found-via"[\s\S]{0,200}required/);
  });

  it("does nothing when gtag is unavailable rather than throwing", () => {
    expect(() => trackLeadSubmit("script-kit", "en")).not.toThrow();
  });

  it("records service interest without visitor or form data", () => {
    const gtag = vi.fn();
    (globalThis as { window?: unknown }).window = { gtag };

    trackServiceInterest("web-automation", "en");

    expect(gtag).toHaveBeenCalledWith("event", "service_interest", {
      service: "web-automation",
      locale: "en",
    });
  });

  it("every form that POSTs to /api/lead also reports lead_submit", () => {
    for (const path of LEAD_FORMS) {
      const contents = source(path);
      expect(contents, `${path} should POST to /api/lead`).toContain("/api/lead");
      expect(contents, `${path} is missing lead_submit tracking`).toContain(
        "trackLeadSubmit",
      );
    }
  });

  it("registers lead_source as a GA4 custom dimension so it is reportable", () => {
    expect(source("scripts/ga4-provision.mjs")).toContain('parameterName: "lead_source"');
    expect(source("scripts/ga4-provision.mjs")).toContain('parameterName: "service"');
  });

  it("provisions lead_submit as a GA4 key event", () => {
    const provisioning = source("scripts/ga4-provision.mjs");
    expect(provisioning).toContain("ensureLeadSubmitKeyEvent");
    expect(provisioning).toContain('eventName: "lead_submit"');
  });

  it("keeps the homepage hero portfolio-first while preserving tracked intake components", () => {
    const hero = source("components/hero-video.tsx");
    const intake = source("components/hero-project-intake.tsx");
    const contact = source("components/contact-cta.tsx");

    expect(hero).not.toContain("<HeroProjectIntake locale={locale} />");
    expect(hero).toContain('href={isSpanish ? "/es/portafolio" : "/portfolio"}');
    expect(hero).toContain('{isSpanish ? "Ver portafolio" : "View portfolio"}');
    expect(intake).toContain('source: "hero-intake"');
    expect(intake).toContain('name="email"');
    expect(intake).toContain('name="projectNeed"');
    expect(intake).toContain('trackLeadSubmit("hero-intake", locale, foundVia || "not_answered")');
    expect(intake).toContain('name="foundVia"');
    expect(intake).toContain('name="foundQuery"');
    expect(contact).toContain('source: "contact"');
    expect(contact).toContain('trackLeadSubmit("contact", "en", foundVia');
  });

  it("places a tracked direct intake on both website-design commercial routes", () => {
    const intake = source("components/website-project-intake.tsx");

    expect(intake).toContain('source: "website-design-intake"');
    expect(intake).toContain('trackLeadSubmit("website-design-intake", locale)');
    expect(source("app/(english)/services/website-design-fort-lauderdale/page.tsx"))
      .toContain('<WebsiteProjectIntake locale="en" />');
    expect(source("app/(spanish)/es/diseno-web-fort-lauderdale/page.tsx"))
      .toContain('<WebsiteProjectIntake locale="es" />');
  });
});
