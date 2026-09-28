import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { buildGoogleAnalyticsScript } from "@/lib/google-analytics-script";

/**
 * One writer per event name — the expensive way.
 *
 * On 2026-09-27 a delegated `cta_click` + `section_view` layer was added to
 * google-analytics-script.ts on the premise that "the cinematic scenes report
 * nothing". They already did: public/track.js, the shared cross-brand layer,
 * auto-instruments both and is loaded on every page by
 * components/google-analytics.tsx. The duplicate shipped, and a probe against
 * production caught it — ONE tap on a chooser row sent TWO cta_click events
 * with the same cta_id (the pair was distinguishable only by cta_text
 * whitespace: "videosNecesito" from the new layer, "videos Necesito" from
 * track.js).
 *
 * These tests fail if the site grows a second emitter for a name the shared
 * layer already owns.
 */
function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

const OWNED_BY_SHARED_LAYER = ["cta_click", "section_view", "item_click", "form_submit", "media_play"] as const;

describe("one emitter per event name", () => {
  const script = buildGoogleAnalyticsScript({
    measurementId: "G-TEST123",
    canonicalHostname: "estebanmorenomedia.com",
    instagramHostname: "www.instagram.com",
    allowedPaths: ["/"],
  });

  it("the site's own script never emits an event the shared layer auto-instruments", () => {
    for (const name of OWNED_BY_SHARED_LAYER) {
      expect(
        script.includes(`sendEvent('${name}'`) || script.includes(`sendEvent("${name}")`),
        `google-analytics-script.ts must not emit ${name}: public/track.js already does, and both would fire for one click`,
      ).toBe(false);
    }
  });

  it("the shared layer is still loaded and still owns those names", () => {
    const loader = source("components/google-analytics.tsx");
    expect(loader).toContain("/track.js");
    const disabled = /disable:\s*\[([^\]]*)\]/.exec(loader)?.[1] ?? "";
    for (const name of OWNED_BY_SHARED_LAYER) {
      expect(disabled, `${name} is disabled in the shared layer, so nothing emits it at all`).not.toContain(name);
    }
    const track = source("public/track.js");
    for (const name of OWNED_BY_SHARED_LAYER) expect(track).toContain(name);
  });

  it("keeps the site script's own names, which the shared layer has disabled", () => {
    // contact_intent / contact_cta_click stay here on purpose: `disable` in the
    // init lists contact_click and outbound_click for exactly that reason.
    expect(script).toContain("contact_intent");
    expect(script).toContain("contact_cta_click");
    expect(source("components/google-analytics.tsx")).toMatch(/disable:[^\]]*contact_click/);
  });
});
