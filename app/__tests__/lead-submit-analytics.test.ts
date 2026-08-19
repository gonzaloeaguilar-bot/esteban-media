import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi, afterEach } from "vitest";

import { trackLeadSubmit } from "@/lib/analytics-events";

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
];

afterEach(() => {
  delete (globalThis as { window?: unknown }).window;
});

describe("lead_submit instrumentation", () => {
  it("sends only the form identity and locale, never PII", () => {
    const gtag = vi.fn();
    (globalThis as { window?: unknown }).window = { gtag };

    trackLeadSubmit("budget-estimator", "es");

    expect(gtag).toHaveBeenCalledTimes(1);
    const [command, name, params] = gtag.mock.calls[0];
    expect(command).toBe("event");
    expect(name).toBe("lead_submit");
    expect(params).toEqual({ lead_source: "budget-estimator", locale: "es" });

    // The PII the forms collect must never reach GA4.
    for (const forbidden of ["email", "name", "phone", "company", "notes"]) {
      expect(Object.keys(params)).not.toContain(forbidden);
    }
  });

  it("does nothing when gtag is unavailable rather than throwing", () => {
    expect(() => trackLeadSubmit("script-kit", "en")).not.toThrow();
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
  });
});
