import { readFileSync, readdirSync, statSync } from "node:fs";
import * as pathMod from "node:path";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { CASE_STUDY_IDS } from "@/lib/case-studies";
import { eventBookingAnswer, eventDatesSentence } from "@/lib/event-content";
import { getEvent, parseIsoDate } from "@/lib/events";
import { NEAR_ME_ANSWERS } from "@/lib/near-me-answers";
import { getPortfolioItemById } from "@/lib/portfolio";
import { EXPANSION_SERVICES, FILMING_HOURLY, RAW_FILMING_RATES, SHORT_FORM, usd } from "@/lib/pricing";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");
const BEFORE = new Date("2026-11-26T12:00:00Z");

describe("event dates read on the organizer's site (2026-11-26)", () => {
  it("stores the official Art Basel and Miami boat show dates with their source", () => {
    const art = getEvent("art-basel").nextEdition!;
    expect([art.start, art.end, art.organizerConfirmed, art.sourceUrl]).toEqual([
      "2026-12-04",
      "2026-12-06",
      true,
      "https://www.artbasel.com/miami-beach",
    ]);
    const boat = getEvent("miami-boat-show").nextEdition!;
    expect([boat.start, boat.end, boat.organizerConfirmed, boat.sourceUrl]).toEqual([
      "2027-02-10",
      "2027-02-14",
      true,
      "https://www.miamiboatshow.com",
    ]);
  });

  it("opens each event with a booking answer built from the dates and lib/pricing.ts", () => {
    const art = eventBookingAnswer(getEvent("art-basel"), "en", BEFORE)!;
    expect(art.question).toBe("When is Art Basel Miami Beach 2026, and how do I book video for it?");
    expect(art.answer).toContain("runs December 4–6, 2026, according to its official site");
    for (const price of [RAW_FILMING_RATES.halfDay, RAW_FILMING_RATES.fullDay, SHORT_FORM.perVideoFrom]) {
      expect(art.answer).toContain(usd(price));
    }
    expect(art.answer).toContain("booked only once it is confirmed in writing");
    expect(art.answer.split(/\s+/).length).toBeLessThanOrEqual(60);

    const boat = eventBookingAnswer(getEvent("miami-boat-show"), "es", BEFORE)!;
    expect(boat.answer).toContain("es del 10 al 14 de febrero de 2027, según su sitio oficial");
    expect(boat.answer).toContain("se confirma por escrito");
  });

  it("never opens with a guide-listed or ended edition", () => {
    // FLIBS is still a guide listing: no booking answer.
    expect(eventBookingAnswer(getEvent("flibs"), "en", new Date("2026-10-01T00:00:00Z"))).toBeNull();
    const after = new Date(parseIsoDate("2026-12-06").getTime() + 2 * 86_400_000);
    expect(eventBookingAnswer(getEvent("art-basel"), "en", after)).toBeNull();
  });

  it("says 'official site', not 'guide listings', for organizer-confirmed dates", () => {
    const sentence = eventDatesSentence(getEvent("miami-boat-show"), "en", BEFORE);
    expect(sentence).toContain("The organizer's official site lists the next edition for February 10–14, 2027");
    expect(sentence).not.toContain("not from the organizer");
  });

  it("renders the booking block on the event pages and the four event service pages", () => {
    expect(read("components/event-content-page.tsx")).toContain('<EventBookingAnswer id={id} locale={locale} variant="hero" />');
    for (const [file, id] of [
      ["app/(english)/services/art-basel-miami-art-week-video/page.tsx", "art-basel"],
      ["app/(english)/services/boat-show-exhibitor-video-fort-lauderdale/page.tsx", "miami-boat-show"],
    ] as const) {
      const page = read(file);
      expect(page).toContain(`<EventBookingAnswer id="${id}" locale="en" />`);
      expect(page).toContain("<NeedSomeoneThisWeek");
    }
    const es = read("components/spanish-niche-page.tsx");
    expect(es).toContain('"video-para-expositores-del-boat-show-fort-lauderdale": "miami-boat-show"');
    expect(es).toContain('"cobertura-de-video-art-basel-miami-art-week": "art-basel"');
  });
});

describe("near-me answers on existing pages (2026-11-26)", () => {
  it("answers each phrase under a question H2 with prices from lib/pricing.ts and a real proof link", () => {
    expect(NEAR_ME_ANSWERS).toHaveLength(3);
    for (const block of NEAR_ME_ANSWERS) {
      expect(block.question.endsWith("?")).toBe(true);
      expect(block.question.toLowerCase()).toContain("near me");
      expect(block.answer.startsWith("Yes.")).toBe(true);
      expect(block.answer).toContain(usd(SHORT_FORM.perVideoFrom));
      expect(block.answer).toContain("confirmed in writing");
      const words = block.answer.split(/\s+/).length;
      expect(words, block.path).toBeGreaterThanOrEqual(40);
      expect(words, block.path).toBeLessThanOrEqual(180);
      const [, kind, id] = block.proof.href.split("/");
      if (kind === "case-studies") expect(CASE_STUDY_IDS as readonly string[]).toContain(id);
      else expect(getPortfolioItemById(id as never), block.proof.href).toBeTruthy();
    }
    const drone = NEAR_ME_ANSWERS.find((b) => b.sectionId === "drone-near-me")!;
    expect(drone.answer).toContain(usd(EXPANSION_SERVICES.droneSessionFrom));
    expect(drone.proof.href).toBe("/case-studies/banacol");
    const local = NEAR_ME_ANSWERS.find((b) => b.sectionId === "local-videographer-near-me")!;
    expect(local.answer).toContain(usd(FILMING_HOURLY.amount));
  });

  it("never hand-types a price in the near-me copy", () => {
    expect(read("lib/near-me-answers.ts")).not.toMatch(/\$\d/);
  });

  it("is rendered server-side on the three pages", () => {
    expect(read("app/(english)/services/drone-video-editing-service-miami/page.tsx")).toContain("<NearMeAnswer content={DRONE_NEAR_ME} />");
    expect(read("app/(english)/services/dance-studio-music-school-video-marketing-miami/page.tsx")).toContain(
      "<NearMeAnswer content={DANCE_RECITAL_NEAR_ME} />",
    );
    expect(read("app/(english)/services/video-production-fort-lauderdale/page.tsx")).toContain("nearMe: LOCAL_VIDEOGRAPHER_NEAR_ME");
    expect(read("components/geo-service-page.tsx")).toContain("<NearMeAnswer content={content.nearMe} />");
  });

  it("no longer cites Homeowners (an edit of agency footage) as drone proof", () => {
    const page = read("app/(english)/services/drone-video-editing-service-miami/page.tsx");
    expect(page).not.toContain("/portfolio/homeowners");
    expect(page).toContain("/case-studies/banacol");
  });
});

describe("event booking answers expire without a deploy (codex review, PR #842)", () => {
  // EventBookingAnswer drops an ended edition at render time. On a fully static
  // route that render happens once per deploy, so every route that renders it
  // must re-render at least daily (the /events routes use 86_400 via layout).
  const root = pathMod.join(process.cwd(), "app");
  const pages: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = pathMod.join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name === "page.tsx") pages.push(full);
    }
  };
  walk(root);
  const niche = readFileSync(pathMod.join(process.cwd(), "components/spanish-niche-page.tsx"), "utf8");
  const bookingSlugs = [...(niche.match(/const EVENT_BOOKING_BY_SLUG[^=]*=\s*\{([^}]*)\}/)?.[1] ?? "").matchAll(/"([^"]+)":/g)].map((m) => m[1]);

  it("finds the Spanish booking slugs it guards", () => {
    expect(bookingSlugs).toEqual(
      expect.arrayContaining(["video-para-expositores-del-boat-show-fort-lauderdale", "cobertura-de-video-art-basel-miami-art-week"]),
    );
  });

  const consumers = pages.filter((file) => {
    const src = readFileSync(file, "utf8");
    if (src.includes("EventBookingAnswer")) return true;
    return bookingSlugs.some((slug) => file.includes(`${pathMod.sep}es${pathMod.sep}${slug}${pathMod.sep}`));
  });

  it("covers the four service routes that render a booking answer", () => {
    expect(consumers.length).toBeGreaterThanOrEqual(4);
  });

  for (const file of consumers) {
    const rel = pathMod.relative(process.cwd(), file);
    if (rel.includes(`${pathMod.sep}events${pathMod.sep}`) || rel.includes(`${pathMod.sep}eventos${pathMod.sep}`)) continue;
    it(`${rel} re-renders at least daily`, () => {
      const m = readFileSync(file, "utf8").match(/export const revalidate = ([\d_]+);/);
      expect(m, rel).not.toBeNull();
      expect(Number(m![1].replace(/_/g, ""))).toBeLessThanOrEqual(86_400);
    });
  }
});
