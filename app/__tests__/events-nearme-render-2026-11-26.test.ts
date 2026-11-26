import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

/**
 * Render-level guard for PR #842 (codex review, attempt 2): the source-text
 * checks in events-nearme-2026-11-26.test.ts would still pass if
 * EventBookingAnswer or NearMeAnswer returned null. These render the real page
 * modules and assert the question, the answer and both CTAs reach the HTML.
 * The clock is pinned before Art Basel (Dec 4-6, 2026), because the booking
 * block correctly disappears once an edition has ended.
 */
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push() {}, replace() {}, prefetch() {} }),
  useSearchParams: () => new URLSearchParams(),
  notFound: () => {
    throw new Error("notFound");
  },
  redirect: () => {
    throw new Error("redirect");
  },
}));

import { NEAR_ME_ANSWERS } from "@/lib/near-me-answers";

beforeAll(() => {
  vi.stubGlobal("React", React);
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-26T12:00:00Z"));
});
afterAll(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

async function renderPage(modulePath: string): Promise<string> {
  const mod = (await import(/* @vite-ignore */ modulePath)) as { default: () => React.ReactElement | Promise<React.ReactElement> };
  const element = await mod.default();
  return renderToStaticMarkup(element).replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
}

describe("event booking answer renders on the four event service pages", () => {
  const cases = [
    ["@/app/(english)/services/art-basel-miami-art-week-video/page", "art-basel", "When is Art Basel Miami Beach 2026, and how do I book video for it?", "runs December 4–6, 2026"],
    ["@/app/(english)/services/boat-show-exhibitor-video-fort-lauderdale/page", "miami-boat-show", "When is Miami International Boat Show 2027, and how do I book video for it?", "February 10–14, 2027"],
    ["@/app/(spanish)/es/cobertura-de-video-art-basel-miami-art-week/page", "art-basel", "¿Cuándo es Art Basel Miami Beach 2026 y cómo reservo video para esas fechas?", "4 al 6 de diciembre de 2026"],
    ["@/app/(spanish)/es/video-para-expositores-del-boat-show-fort-lauderdale/page", "miami-boat-show", "¿Cuándo es Miami International Boat Show 2027 y cómo reservo video para esas fechas?", "10 al 14 de febrero de 2027"],
  ] as const;

  for (const [modulePath, id, question, dates] of cases) {
    it(`${modulePath.split("/").slice(-2, -1)[0]}: question, dated answer, WhatsApp and official-site CTAs`, async () => {
      const html = await renderPage(modulePath);
      const key = id.replace(/-/g, "_");
      expect(html).toContain(`data-section="event_booking_${key}"`);
      expect(html).toContain(question);
      expect(html).toContain(dates);
      expect(html).toContain(`data-cta="event_booking_${key}_whatsapp"`);
      expect(html).toContain(`data-cta="event_booking_${key}_official_site"`);
    });
  }
});

describe("near-me answers render on their pages", () => {
  const modules: Record<string, string> = {
    "/services/drone-video-editing-service-miami": "@/app/(english)/services/drone-video-editing-service-miami/page",
    "/services/video-production-fort-lauderdale": "@/app/(english)/services/video-production-fort-lauderdale/page",
    "/services/dance-studio-music-school-video-marketing-miami": "@/app/(english)/services/dance-studio-music-school-video-marketing-miami/page",
  };

  for (const content of NEAR_ME_ANSWERS) {
    it(`${content.path}: question, WhatsApp and proof CTAs`, async () => {
      const modulePath = modules[content.path];
      expect(modulePath, content.path).toBeDefined();
      const html = await renderPage(modulePath);
      expect(html).toContain(`data-section="${content.sectionId}"`);
      expect(html).toContain(content.question);
      expect(html).toContain(`data-cta="${content.ctaPrefix}_whatsapp"`);
      expect(html).toContain(`data-cta="${content.ctaPrefix}_proof"`);
    });
  }
});
