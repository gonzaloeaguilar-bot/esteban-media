import { runInNewContext } from "node:vm";

import { describe, expect, it } from "vitest";

import { trackLeadSubmit, trackServiceInterest } from "@/lib/analytics-events";
import { buildGoogleAnalyticsScript } from "@/lib/google-analytics-script";

/**
 * The cross-brand analytics contract.
 * ~/.claude/durable/ANALYTICS_CONTRACT.md
 *
 * Two things must stay true and both are easy to break by accident:
 *  1. every event carries the shared block, or a cross-brand query cannot
 *     group by anything;
 *  2. the legacy leg keeps flowing for the names GA4 has key events on
 *     (contact_intent, contact_cta_click, lead_submit, read live from the
 *     Admin API on 2026-09-19) — renaming one in place zeroes a conversion.
 */
type Emitted = { name: string; params: Record<string, unknown> };

function runScript(pathname: string): {
  emit: (n: string, p?: Record<string, unknown>) => void;
  events: Emitted[];
  window: Record<string, unknown>;
} {
  const events: Emitted[] = [];
  const storage = new Map<string, string>();
  const window = {
    location: { hostname: "estebanmorenomedia.com", pathname, search: "", href: `https://estebanmorenomedia.com${pathname}` },
    history: { pushState() {}, replaceState() {} },
    dataLayer: [] as unknown[],
    gtag(_command: string, name: string, params: Record<string, unknown>) {
      events.push({ name, params });
    },
    sessionStorage: {
      getItem: (k: string) => storage.get(k) ?? null,
      setItem: (k: string, v: string) => void storage.set(k, v),
    },
    requestAnimationFrame(cb: () => void) { cb(); return 1; },
    setTimeout(cb: () => void) { cb(); return 1; },
    addEventListener() {},
  } as Record<string, unknown>;

  class FakeElement {}
  runInNewContext(
    buildGoogleAnalyticsScript({
      measurementId: "G-TEST123",
      canonicalHostname: "estebanmorenomedia.com",
      instagramHostname: "www.instagram.com",
      allowedPaths: ["/", "/contact", "/es/contacto"],
    }),
    { window, document: { referrer: "", documentElement: { lang: "en" }, addEventListener() {} }, URL, Element: FakeElement },
  );

  const emit = (window as { __estebanTrack?: (n: string, p?: Record<string, unknown>) => void }).__estebanTrack;
  if (typeof emit !== "function") throw new Error("the script did not expose its single writer");
  return { emit, events, window };
}

const SHARED = ["brand", "page_type", "locale", "variant"] as const;

describe("cross-brand analytics contract", () => {
  it("stamps the shared block on every event", () => {
    const { emit, events } = runScript("/");
    events.length = 0;
    emit("service_interest", { service: "video" });
    expect(events.length).toBeGreaterThan(0);
    for (const event of events) {
      for (const key of SHARED) expect(event.params[key], `${event.name} missing ${key}`).toBeTruthy();
      expect(event.params.brand).toBe("esteban");
    }
  });

  it("keeps the legacy leg for every event GA4 has a key event on", () => {
    for (const legacy of ["contact_intent", "contact_cta_click", "lead_submit"]) {
      const { emit, events } = runScript("/contact");
      events.length = 0;
      emit(legacy, { contact_method: "email", lead_source: "contact_form" });
      const names = events.map((e) => e.name);
      expect(names, `${legacy} must still be emitted under its own name`).toContain(legacy);
      expect(names.length, `${legacy} must also emit its contract twin`).toBe(2);
    }
  });

  it("maps each legacy name onto the right contract event, with its required params", () => {
    const cases: Record<string, { event: string; required: string[] }> = {
      contact_intent: { event: "contact_click", required: ["method"] },
      contact_cta_click: { event: "contact_click", required: ["method"] },
      lead_submit: { event: "lead", required: ["form_id", "lead_type"] },
      service_interest: { event: "cta_click", required: ["cta_id", "cta_text", "cta_position"] },
      ai_referral_visit: { event: "section_view", required: ["section_id"] },
    };
    for (const [legacy, expected] of Object.entries(cases)) {
      const { emit, events } = runScript("/");
      events.length = 0;
      emit(legacy, { contact_method: "email", lead_source: "contact_form", service: "video" });
      const twin = events.find((e) => e.name === expected.event);
      expect(twin, `${legacy} should emit ${expected.event}`).toBeDefined();
      for (const key of expected.required) {
        expect(twin!.params[key], `${expected.event} from ${legacy} missing ${key}`).toBeTruthy();
      }
      expect(twin!.params.legacy_event).toBe(legacy);
    }
  });

  it("derives page_type from the path, in both locales", () => {
    const home = runScript("/");
    home.events.length = 0;
    home.emit("contact_intent", { contact_method: "email" });
    expect(home.events[0].params.page_type).toBe("home");
    const contact = runScript("/contact");
    contact.events.length = 0;
    contact.emit("contact_intent", { contact_method: "email" });
    expect(contact.events[0].params.page_type).toBe("form");
    const es = runScript("/es/contacto");
    es.events.length = 0;
    es.emit("contact_intent", { contact_method: "email" });
    expect(es.events[0].params.page_type).toBe("form");
  });

  // The React callers reach the writer through window.__estebanTrack. #216
  // wired them gtag-style — send("event", name, params) — against a writer that
  // takes (name, params), so every lead_submit went to GA4 named "event". This
  // runs the real callers against the real writer, not the writer alone.
  it("sends React-side events under their own names through the writer", () => {
    const { events, window } = runScript("/contact");
    const g = globalThis as { window?: unknown };
    const previous = g.window;
    g.window = window;
    try {
      events.length = 0;
      trackLeadSubmit("brief-builder", "en");
      trackServiceInterest("video", "en");
    } finally {
      g.window = previous;
    }
    const names = events.map((e) => e.name);
    expect(names).not.toContain("event");
    expect(names).toEqual(expect.arrayContaining(["lead_submit", "contact_intent", "service_interest"]));
  });

  it("home route cards and their package CTAs are measured (open -> package tap)", () => {
    const script = buildGoogleAnalyticsScript({
      measurementId: "G-TEST123",
      canonicalHostname: "estebanmorenomedia.com",
      instagramHostname: "www.instagram.com",
      allowedPaths: ["/", "/contact", "/es/contacto"],
    });
    expect(script).toContain("closest('[data-cta]')");
    expect(script).toContain("sendEvent('cta_click', {");
    expect(script).toContain("cta_id: ctaId");
    expect(script).toContain("details[data-route]");
    expect(script).toContain("section_id: 'home_route_' +");
  });
});

describe("home route card measurement (behavioral)", () => {
  function harness() {
    const events: Emitted[] = [];
    const listeners: Record<string, (e: unknown) => void> = {};
    class FakeElement {
      attrs: Record<string, string>; parent: FakeElement | null; textContent: string; open = true; href = "";
      constructor(attrs: Record<string, string>, parent: FakeElement | null = null, text = "") { this.attrs = attrs; this.parent = parent; this.textContent = text; this.href = attrs.href ?? ""; }
      getAttribute(k: string) { return this.attrs[k] ?? null; }
      matches(sel: string) {
        if (sel === "details[data-route]") return this.attrs.tag === "details" && "data-route" in this.attrs;
        return false;
      }
      closest(sel: string): FakeElement | null {
        let n: FakeElement | null = this;
        while (n) {
          if (sel === "a[href]" && n.attrs.tag === "a") return n;
          if (sel === "[data-cta]" && "data-cta" in n.attrs) return n;
          if (sel === "[data-route]" && "data-route" in n.attrs) return n;
          n = n.parent;
        }
        return null;
      }
    }
    const storage = new Map<string, string>();
    const window = {
      location: { hostname: "estebanmorenomedia.com", pathname: "/", search: "", href: "https://estebanmorenomedia.com/" },
      history: { pushState() {}, replaceState() {} }, dataLayer: [] as unknown[],
      gtag(_c: string, name: string, params: Record<string, unknown>) { events.push({ name, params }); },
      sessionStorage: { getItem: (k: string) => storage.get(k) ?? null, setItem: (k: string, v: string) => void storage.set(k, v) },
      requestAnimationFrame(cb: () => void) { cb(); return 1; }, setTimeout(cb: () => void) { cb(); return 1; }, addEventListener() {},
    };
    runInNewContext(
      buildGoogleAnalyticsScript({ measurementId: "G-TEST123", canonicalHostname: "estebanmorenomedia.com", instagramHostname: "www.instagram.com", allowedPaths: ["/"] }),
      { window, document: { referrer: "", documentElement: { lang: "en" }, querySelectorAll: () => [], addEventListener(type: string, fn: (e: unknown) => void) { listeners[type] = fn; } }, URL, Element: FakeElement },
    );
    return { events, listeners, FakeElement };
  }

  it("opening the celebrations card emits section_view home_route_private-celebrations", () => {
    const { events, listeners, FakeElement } = harness();
    events.length = 0;
    listeners.toggle({ target: new FakeElement({ tag: "details", "data-route": "private-celebrations" }) });
    const view = events.find((e) => e.name === "section_view");
    expect(view?.params.section_id).toBe("home_route_private-celebrations");
  });

  it("tapping a package WhatsApp link emits cta_click with the package id and contact_click whatsapp", () => {
    const { events, listeners, FakeElement } = harness();
    events.length = 0;
    const card = new FakeElement({ tag: "details", "data-route": "private-celebrations" });
    const a = new FakeElement({ tag: "a", href: "https://wa.me/15551234567?text=hi", "data-cta": "home_private_celebrations_en_yacht-party-film" }, card, "Quote Yacht party film");
    listeners.click({ target: a });
    const cta = events.find((e) => e.name === "cta_click");
    expect(cta?.params.cta_id).toBe("home_private_celebrations_en_yacht-party-film");
    expect(cta?.params.cta_position).toBe("private-celebrations");
    const contact = events.find((e) => e.name === "contact_click");
    expect(contact?.params.method ?? contact?.params.contact_method).toBe("whatsapp");
    expect(contact?.params.cta_id).toBe("home_private_celebrations_en_yacht-party-film");
  });
});
