import { runInNewContext } from "node:vm";

import { describe, expect, it } from "vitest";

import { buildGoogleAnalyticsScript } from "@/lib/google-analytics-script";

/**
 * The home is a set of composed scenes and none of them reported itself: the
 * only instrumented thing on the page was a contact link, so "did anyone reach
 * the packages" had no answer. Two delegated listeners now cover every scene.
 *
 * These tests EXECUTE the shipped script against a fake DOM and then fire a
 * click and an intersection through it — a source-text assertion would pass on
 * a listener that was registered and never wired to sendEvent.
 */
type Emitted = { name: string; params: Record<string, unknown> };

class FakeElement {
  tagName: string;
  attrs: Record<string, string>;
  textContent: string;
  href: string;
  parent: FakeElement | null = null;
  constructor(tagName: string, attrs: Record<string, string> = {}, textContent = "", href = "") {
    this.tagName = tagName;
    this.attrs = attrs;
    this.textContent = textContent;
    this.href = href;
  }
  getAttribute(name: string) { return this.attrs[name] ?? null; }
  closest(selector: string): FakeElement | null {
    const key = selector.replace(/^\[|\]$/g, "");
    let node: FakeElement | null = this as FakeElement;
    while (node) {
      if (key in node.attrs) return node;
      node = node.parent;
    }
    return null;
  }
}

function boot(pathname: string) {
  const events: Emitted[] = [];
  const clickHandlers: ((e: { target: unknown }) => void)[] = [];
  let observerCallback: ((entries: { isIntersecting: boolean; target: FakeElement }[]) => void) | null = null;
  const observed: FakeElement[] = [];
  let sections: FakeElement[] = [];

  class FakeIntersectionObserver {
    constructor(cb: (entries: { isIntersecting: boolean; target: FakeElement }[]) => void) {
      observerCallback = cb;
    }
    observe(el: FakeElement) { observed.push(el); }
    unobserve() {}
  }

  const window = {
    location: { hostname: "estebanmorenomedia.com", pathname, search: "", href: `https://estebanmorenomedia.com${pathname}` },
    history: { pushState() {}, replaceState() {} },
    dataLayer: [] as unknown[],
    gtag(_c: string, name: string, params: Record<string, unknown>) { events.push({ name, params }); },
    sessionStorage: { getItem: () => null, setItem: () => {} },
    requestAnimationFrame(cb: () => void) { cb(); return 1; },
    setTimeout(cb: () => void) { cb(); return 1; },
    addEventListener() {},
    IntersectionObserver: FakeIntersectionObserver,
  } as Record<string, unknown>;

  const document = {
    referrer: "",
    readyState: "complete",
    documentElement: { lang: "es" },
    addEventListener(type: string, handler: (e: { target: unknown }) => void) {
      if (type === "click") clickHandlers.push(handler);
    },
    querySelectorAll: () => sections,
  };

  runInNewContext(
    buildGoogleAnalyticsScript({
      measurementId: "G-TEST123",
      canonicalHostname: "estebanmorenomedia.com",
      instagramHostname: "www.instagram.com",
      allowedPaths: ["/", "/es", "/contact", "/es/contacto"],
    }),
    { window, document, URL, Element: FakeElement },
  );

  return {
    events,
    click(target: FakeElement) { for (const h of clickHandlers) h({ target }); },
    setSections(list: FakeElement[]) { sections = list; },
    intersect(el: FakeElement) { observerCallback?.([{ isIntersecting: true, target: el }]); },
    observed,
  };
}

function inSection(el: FakeElement, sectionId: string) {
  const section = new FakeElement("SECTION", { "data-section": sectionId });
  el.parent = section;
  return el;
}

describe("cinematic surfaces report themselves", () => {
  it("emits cta_click with the contract's required params, positioned by its scene", () => {
    const page = boot("/es");
    page.events.length = 0;
    const button = inSection(
      new FakeElement("A", { "data-cta": "package_quote_arranque" }, "  Cotizar\n Arranque ", "https://estebanmorenomedia.com/es/contacto-x"),
      "packages",
    );
    page.click(button);
    const cta = page.events.find((e) => e.name === "cta_click");
    expect(cta, "a [data-cta] click must emit cta_click").toBeDefined();
    expect(cta!.params.cta_id).toBe("package_quote_arranque");
    expect(cta!.params.cta_text).toBe("Cotizar Arranque");
    expect(cta!.params.cta_position).toBe("packages");
    // the shared block still lands on it
    for (const key of ["brand", "page_type", "locale", "variant"]) {
      expect(cta!.params[key], `cta_click missing ${key}`).toBeTruthy();
    }
  });

  it("does NOT emit cta_click for a contact surface — that click is already a contact_click", () => {
    for (const href of [
      "mailto:esmolopez@gmail.com",
      "tel:+13054974478",
      "https://wa.me/13054974478",
      "https://estebanmorenomedia.com/es/contacto",
    ]) {
      const page = boot("/es");
      page.events.length = 0;
      const link = inSection(new FakeElement("A", { "data-cta": "closing_whatsapp", href }, "WhatsApp", href), "closing_cta");
      page.click(link);
      expect(
        page.events.map((e) => e.name),
        `${href} must not double-count as a cta_click`,
      ).not.toContain("cta_click");
    }
  });

  it("emits section_view once per scene, and never twice for the same one", () => {
    const page = boot("/es");
    const hero = new FakeElement("SECTION", { "data-section": "cinematic_hero" });
    const packages = new FakeElement("SECTION", { "data-section": "packages" });
    page.setSections([hero, packages]);
    page.events.length = 0;
    page.intersect(hero);
    page.intersect(hero);
    page.intersect(packages);
    const views = page.events.filter((e) => e.name === "section_view");
    expect(views.map((v) => v.params.section_id)).toEqual(["cinematic_hero", "packages"]);
  });
});
