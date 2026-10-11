import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { EVENTS_HUB_COPY, eventDatesSentence, getEventPageCopy } from "@/lib/event-content";
import {
  EVENTS,
  EVENTS_HUB_PATHS,
  EVENT_CROSSLINKS,
  displayEdition,
  eventSectionPaths,
  formatDateRange,
  parseIsoDate,
  staleEditions,
} from "@/lib/events";
import { getPairedLanguageRoute } from "@/lib/language-routes";
import { languageAlternates } from "@/lib/spanish-site";
import { absoluteUrl } from "@/lib/site";

const pageFile = (path: string) =>
  join(process.cwd(), "app", path.startsWith("/es") ? "(spanish)" : "(english)", path, "page.tsx");

describe("annual event dates (lib/events.ts)", () => {
  it("reports ended editions through staleEditions(), not as a test failure", () => {
    // Staleness is a scheduled reminder (pnpm events:check), never a merge blocker.
    const event = EVENTS[0];
    const end = parseIsoDate(event.nextEdition!.end);
    expect(staleEditions(new Date(end.getTime() - 86_400_000)).map((s) => s.id)).not.toContain(event.id);
    expect(staleEditions(new Date(end.getTime() + 2 * 86_400_000)).map((s) => s.id)).toContain(event.id);
  });

  it("keeps every edition well formed", () => {
    for (const event of EVENTS) {
      expect(event.typicalWindow.en).toMatch(/^Usually /);
      expect(event.typicalWindow.es).toMatch(/^Normalmente /);
      expect(event.officialSite).toMatch(/^https:\/\//);
      const edition = event.nextEdition;
      if (!edition) continue;
      expect(edition.lastChecked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(edition.confirmedSource.length).toBeGreaterThan(0);
      expect(parseIsoDate(edition.start).getTime()).toBeLessThanOrEqual(parseIsoDate(edition.end).getTime());
      for (const window of edition.windows ?? []) {
        expect(parseIsoDate(window.start).getTime()).toBeGreaterThanOrEqual(parseIsoDate(edition.start).getTime());
        expect(parseIsoDate(window.end).getTime()).toBeLessThanOrEqual(parseIsoDate(edition.end).getTime());
      }
    }
  });

  it("hides an edition once it has ended instead of advertising last season", () => {
    const event = EVENTS[0];
    const after = new Date(parseIsoDate(event.nextEdition!.end).getTime() + 2 * 86_400_000);
    expect(displayEdition(event, after)).toBeNull();
    expect(eventDatesSentence(event, "en", after)).toContain("check the dates on the official site");
  });

  it("formats ranges in both languages", () => {
    expect(formatDateRange("2026-10-28", "2026-11-01", "en")).toBe("October 28 – November 1, 2026");
    expect(formatDateRange("2026-10-28", "2026-11-01", "es")).toBe("del 28 de octubre al 1 de noviembre de 2026");
    expect(formatDateRange("2026-12-04", "2026-12-06", "en")).toBe("December 4–6, 2026");
  });

  it("keeps date literals out of the page copy", () => {
    const copy = readFileSync(join(process.cwd(), "lib/event-content.ts"), "utf8");
    expect(copy).not.toMatch(/\b20\d\d-\d\d-\d\d\b/);
    expect(copy).not.toMatch(/\b(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}\b/);
  });
});

describe("annual events section pages", () => {
  const urls = new Set(sitemap().map((entry) => entry.url));

  it("ships every path as a page, in the sitemap, with reciprocal hreflang", () => {
    for (const path of eventSectionPaths()) {
      expect(existsSync(pageFile(path)), path).toBe(true);
      expect(urls.has(absoluteUrl(path)), path).toBe(true);
      expect(languageAlternates[path]?.["es-US"]).toBeDefined();
    }
    for (const event of EVENTS) {
      expect(getPairedLanguageRoute(event.paths.en)).toBe(event.paths.es);
      expect(getPairedLanguageRoute(event.paths.es)).toBe(event.paths.en);
    }
    expect(getPairedLanguageRoute(EVENTS_HUB_PATHS.en)).toBe(EVENTS_HUB_PATHS.es);
  });

  it("says plainly the pages are not affiliated and never claims Esteban filmed the event", () => {
    for (const event of EVENTS) {
      const en = getEventPageCopy(event.id, "en");
      const es = getEventPageCopy(event.id, "es");
      expect(en.proof.text).toContain(`Esteban has not filmed`);
      expect(es.proof.text).toContain(`Esteban no ha grabado`);
      expect(en.faqs[0].answer).toContain("not affiliated with, sponsored by or endorsed by");
      expect(es.faqs[0].answer).toContain("no está afiliado");
      // On-location filming is a paid add-on, said on the page itself.
      expect(en.lead).toContain("paid add-on");
      expect(es.lead).toContain("servicio adicional pagado");
    }
  });

  it("opens with a question and a 40-180 word direct answer, and keeps the FAQ in step", () => {
    for (const event of EVENTS) {
      for (const locale of ["en", "es"] as const) {
        const copy = getEventPageCopy(event.id, locale);
        expect(copy.answer.question.endsWith("?")).toBe(true);
        const words = copy.answer.paragraphs.join(" ").split(/\s+/).length;
        expect(words, `${event.id}/${locale}`).toBeGreaterThanOrEqual(40);
        expect(words, `${event.id}/${locale}`).toBeLessThanOrEqual(180);
        expect(copy.plan.cards).toHaveLength(3);
        expect(copy.faqs.length).toBeGreaterThanOrEqual(4);
        for (const link of copy.related) expect(existsSync(pageFile(link.href)) || link.href === "/services", link.href).toBe(true);
      }
    }
    expect(EVENTS_HUB_COPY.en.answer.question.endsWith("?")).toBe(true);
  });

  it("never publishes a hand-typed price", () => {
    const copy = readFileSync(join(process.cwd(), "lib/event-content.ts"), "utf8");
    expect(copy).not.toMatch(/\$\d/);
  });

  it("marks pages up as WebPage/Service, never as an Event", () => {
    const renderer = readFileSync(join(process.cwd(), "components/event-content-page.tsx"), "utf8");
    expect(renderer).not.toMatch(/"@type":\s*"Event"/);
    expect(renderer).toContain("buildServiceFaqSchema");
    expect(renderer).toContain('"BreadcrumbList"');
  });

  it("links into the section from existing pages only", () => {
    for (const path of Object.keys(EVENT_CROSSLINKS)) {
      const file = path === "/services" ? join(process.cwd(), "app/(english)/services/page.tsx") : pageFile(path);
      const exists = existsSync(file);
      expect(exists, path).toBe(true);
    }
  });
});
