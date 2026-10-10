import { runInNewContext } from "node:vm";

import { describe, expect, it } from "vitest";

import { buildGoogleAnalyticsScript } from "@/lib/google-analytics-script";

/**
 * The direct-contact path (WhatsApp / phone / email) had no attribution.
 *
 * A visitor who asked ChatGPT to recommend a short-form editor, landed on the
 * site from chatgpt.com, browsed a couple of pages and then tapped the wa.me
 * link reached GA4 as a bare contact_intent with contact_method: whatsapp and
 * nothing about the channel. The form path already answers "how did you find
 * us?" (found_via); this covers the path that was invisible.
 *
 * These tests run the real script against a small DOM stub and assert the
 * first-touch source is attached to the event AND carried into the prefilled
 * WhatsApp message.
 */

type Emitted = { name: string; params: Record<string, unknown> };

class FakeElement {
  constructor(private href: string) {}

  getAttribute(name: string): string | null {
    return name === "href" ? this.href : null;
  }

  setAttribute(name: string, value: string): void {
    if (name === "href") this.href = value;
  }

  closest(): FakeElement {
    return this;
  }
}

function runScript({
  referrer = "",
  lang = "en",
  search = "",
  clickHref = "",
  anchors = [] as FakeElement[],
}: {
  referrer?: string;
  lang?: string;
  search?: string;
  clickHref?: string;
  anchors?: FakeElement[];
} = {}) {
  const events: Emitted[] = [];
  const storage = new Map<string, string>();
  const listeners: Record<string, (event: { target?: unknown }) => void> = {};

  const windowStub = {
    location: {
      hostname: "estebanmorenomedia.com",
      pathname: "/contact",
      search,
      href: `https://estebanmorenomedia.com/contact${search}`,
    },
    history: { pushState() {}, replaceState() {} },
    dataLayer: [] as unknown[],
    gtag(_command: string, name: string, params: Record<string, unknown>) {
      events.push({ name, params });
    },
    sessionStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => void storage.set(key, value),
    },
    requestAnimationFrame(callback: () => void) {
      callback();
      return 1;
    },
    setTimeout(callback: () => void) {
      callback();
      return 1;
    },
    addEventListener(type: string, handler: (event: { target?: unknown }) => void) {
      listeners[type] = handler;
    },
  } as Record<string, unknown>;

  const documentStub = {
    referrer,
    readyState: "complete",
    documentElement: { lang },
    addEventListener(type: string, handler: (event: { target?: unknown }) => void) {
      listeners[type] = handler;
    },
    querySelectorAll() {
      return anchors;
    },
  };

  runInNewContext(
    buildGoogleAnalyticsScript({
      measurementId: "G-TEST123",
      canonicalHostname: "estebanmorenomedia.com",
      instagramHostname: "www.instagram.com",
      allowedPaths: ["/", "/contact", "/es/contacto"],
    }),
    {
      window: windowStub,
      document: documentStub,
      URL,
      URLSearchParams,
      Element: FakeElement,
    },
  );

  function clickWhatsapp() {
    const handler = listeners.click;
    if (!handler) throw new Error("the script never registered its click listener");
    const anchor = new FakeElement(clickHref);
    handler({ target: anchor });
  }

  return { events, clickWhatsapp, anchors, storage };
}

describe("contact-source attribution on the direct-contact path", () => {
  it("tags a WhatsApp click that started on an AI answer with its first-touch source", () => {
    const { events, clickWhatsapp } = runScript({
      referrer: "https://chatgpt.com/",
      clickHref: "https://wa.me/13054974478?text=Hola%20Esteban.",
    });
    events.length = 0;

    clickWhatsapp();

    const intent = events.find((event) => event.name === "contact_intent");
    expect(intent, "a wa.me click must emit contact_intent").toBeDefined();
    expect(intent!.params.contact_method).toBe("whatsapp");
    expect(intent!.params.contact_source).toBe("ai:chatgpt");
    // ai_source is already a provisioned GA4 dimension, so the AI channel is
    // reportable without any Admin-API change.
    expect(intent!.params.ai_source).toBe("chatgpt");

    const twin = events.find((event) => event.name === "contact_click");
    expect(twin, "the contract twin must also carry contact_source").toBeDefined();
    expect(twin!.params.method).toBe("whatsapp");
    expect(twin!.params.contact_source).toBe("ai:chatgpt");
  });

  it("keeps the first-touch channel across later internal navigation", () => {
    const { events, clickWhatsapp } = runScript({
      referrer: "https://gemini.google.com/app",
      clickHref: "https://wa.me/13054974478?text=Hola.",
    });
    events.length = 0;

    clickWhatsapp();

    const intent = events.find((event) => event.name === "contact_intent");
    expect(intent!.params.contact_source).toBe("ai:gemini");
    expect(intent!.params.ai_source).toBe("gemini");
  });

  it("reports a non-AI referrer as the source without inventing an ai_source", () => {
    const { events, clickWhatsapp } = runScript({
      referrer: "https://www.google.com/",
      clickHref: "https://wa.me/13054974478?text=Hola.",
    });
    events.length = 0;

    clickWhatsapp();

    const intent = events.find((event) => event.name === "contact_intent");
    expect(intent!.params.contact_source).toBe("google");
    expect(intent!.params.ai_source).toBeUndefined();
  });

  it("carries the channel into the prefilled WhatsApp message so Esteban can read it", () => {
    const anchor = new FakeElement("https://wa.me/13054974478?text=Hola%20Esteban.");
    runScript({ referrer: "https://chatgpt.com/", anchors: [anchor] });

    const text = new URL(anchor.getAttribute("href")!).searchParams.get("text");
    expect(text).toContain("(via ChatGPT)");
  });

  it("uses the Spanish suffix on the Spanish site", () => {
    const anchor = new FakeElement("https://wa.me/13054974478?text=Hola%20Esteban.");
    runScript({ referrer: "https://chatgpt.com/", lang: "es", anchors: [anchor] });

    const text = new URL(anchor.getAttribute("href")!).searchParams.get("text");
    expect(text).toContain("(vía ChatGPT)");
  });

  it("never decorates a non-AI visit or a link that is already attributed", () => {
    const plain = new FakeElement("https://wa.me/13054974478?text=Hola.");
    runScript({ referrer: "https://www.google.com/", anchors: [plain] });
    expect(decodeURIComponent(plain.getAttribute("href")!)).toBe(
      "https://wa.me/13054974478?text=Hola.",
    );

    const already = new FakeElement(
      "https://wa.me/13054974478?text=Hola%20(via%20ChatGPT).",
    );
    runScript({ referrer: "https://chatgpt.com/", anchors: [already] });
    expect(already.getAttribute("href")).toBe(
      "https://wa.me/13054974478?text=Hola%20(via%20ChatGPT).",
    );
  });
});
