/**
 * Every recurring South Florida event date the site mentions lives in this one
 * file, and nowhere else.
 *
 * The event pages exist for small businesses that exhibit at, sponsor or sell
 * around these events. Esteban does not organize them, is not affiliated with
 * them, and has not filmed them; the names are used only to describe timing.
 *
 * Two kinds of date, deliberately kept apart:
 *
 *   typicalWindow  the stable, year-independent answer ("usually late
 *                  February"). This is what the pages render prominently.
 *   nextEdition    the dates event guides list for the next edition. Rendered
 *                  as "Next edition (check the official site): ...", never as
 *                  a confirmed fact. `lastChecked` records when the listing was
 *                  read; `confirmedSource` says what it was read from.
 *
 * `lib/__tests__/events.test.ts` fails once any nextEdition has ended relative
 * to the date the tests run, so the dates get refreshed every year instead of
 * quietly advertising last season. When an organizer has not listed the next
 * edition yet, set nextEdition to null: the page then shows only the typical
 * window and sends readers to the official site.
 */

export type EventLocale = "en" | "es";
export type EventId =
  | "flibs"
  | "art-basel"
  | "miami-boat-show"
  | "sobewff"
  | "emerge-americas"
  | "miami-music-week"
  | "miami-spice";

export type EventSeason = "fall" | "winter" | "spring" | "summer";

type Localized = Record<EventLocale, string>;

export type EventWindow = {
  label: Localized;
  start: string;
  end: string;
};

export type EventEdition = {
  /** ISO date, inclusive. */
  start: string;
  /** ISO date, inclusive. */
  end: string;
  /** Where the dates were read. Event guides, not the organizer, unless stated. */
  confirmedSource: string;
  /** ISO date the listing was last read. */
  lastChecked: string;
  /** Named sub-windows inside the edition (VIP days, a festival weekend). */
  windows?: readonly EventWindow[];
  /** Venue or area wording for this edition, as listed. */
  where?: Localized;
};

export type AnnualEvent = {
  id: EventId;
  /** The event's own name, used descriptively. */
  name: string;
  season: EventSeason;
  /** 1-12, for ordering inside the hub. */
  typicalMonth: number;
  /** The organizer's site, where readers confirm dates. */
  officialSite: string;
  typicalWindow: Localized;
  nextEdition: EventEdition | null;
  paths: Localized;
};

export const EVENT_DATES_LAST_CHECKED = "2026-10-10";
const GUIDE_LISTING = "Event-guide listings (not confirmed with the organizer)";

export const EVENTS: readonly AnnualEvent[] = [
  {
    id: "flibs",
    name: "Fort Lauderdale International Boat Show",
    season: "fall",
    typicalMonth: 10,
    officialSite: "https://www.flibs.com",
    typicalWindow: {
      en: "Usually late October or early November",
      es: "Normalmente a finales de octubre o principios de noviembre",
    },
    nextEdition: {
      start: "2026-10-28",
      end: "2026-11-01",
      confirmedSource: GUIDE_LISTING,
      lastChecked: EVENT_DATES_LAST_CHECKED,
      where: {
        en: "Several Fort Lauderdale marinas, including Bahia Mar and Pier 66",
        es: "Varias marinas de Fort Lauderdale, entre ellas Bahia Mar y Pier 66",
      },
    },
    paths: {
      en: "/events/fort-lauderdale-boat-show-video",
      es: "/es/eventos/video-para-el-boat-show-de-fort-lauderdale",
    },
  },
  {
    id: "art-basel",
    name: "Art Basel Miami Beach",
    season: "fall",
    typicalMonth: 12,
    officialSite: "https://www.artbasel.com/miami-beach",
    typicalWindow: {
      en: "Usually the first week of December, during Miami Art Week",
      es: "Normalmente la primera semana de diciembre, durante la Miami Art Week",
    },
    nextEdition: {
      start: "2026-11-30",
      end: "2026-12-06",
      confirmedSource: GUIDE_LISTING,
      lastChecked: EVENT_DATES_LAST_CHECKED,
      windows: [
        { label: { en: "Miami Art Week", es: "Miami Art Week" }, start: "2026-11-30", end: "2026-12-06" },
        { label: { en: "VIP days", es: "Días VIP" }, start: "2026-12-02", end: "2026-12-03" },
        { label: { en: "Public fair days", es: "Días abiertos al público" }, start: "2026-12-04", end: "2026-12-06" },
      ],
      where: {
        en: "Miami Beach, with satellite fairs and activations across Miami",
        es: "Miami Beach, con ferias satélite y activaciones por todo Miami",
      },
    },
    paths: {
      en: "/events/art-basel-miami-beach-video",
      es: "/es/eventos/video-para-art-basel-miami-beach",
    },
  },
];

export const EVENTS_HUB_PATHS: Localized = { en: "/events", es: "/es/eventos" };

export const EVENT_SEASON_ORDER: readonly EventSeason[] = ["fall", "winter", "spring", "summer"];

export function getEvent(id: EventId): AnnualEvent {
  const event = EVENTS.find((candidate) => candidate.id === id);
  if (!event) throw new Error(`Unknown event ${id}`);
  return event;
}

export function hasEvent(id: string): id is EventId {
  return EVENTS.some((event) => event.id === id);
}

/** Every indexable path in the section: the hub pair, then each event pair. */
export function eventSectionPaths(): string[] {
  return [
    EVENTS_HUB_PATHS.en,
    EVENTS_HUB_PATHS.es,
    ...EVENTS.flatMap((event) => [event.paths.en, event.paths.es]),
  ];
}

/** hreflang entries for the whole section, both directions. */
export function eventLanguageAlternates(): Record<string, Record<string, string>> {
  const pairs: Localized[] = [EVENTS_HUB_PATHS, ...EVENTS.map((event) => event.paths)];
  return Object.fromEntries(
    pairs.flatMap((pair) =>
      [pair.en, pair.es].map((path) => [
        path,
        { "en-US": pair.en, "es-US": pair.es, "x-default": pair.en },
      ]),
    ),
  );
}

/** The edition to show, or null once it has ended relative to `now`. */
export function displayEdition(event: AnnualEvent, now: Date = new Date()): EventEdition | null {
  const edition = event.nextEdition;
  if (!edition) return null;
  return parseIsoDate(edition.end).getTime() + 86_400_000 > now.getTime() ? edition : null;
}

export function parseIsoDate(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new Error(`Not an ISO date: ${value}`);
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
}

const MONTHS: Record<EventLocale, readonly string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
};

/** "October 28 – November 1, 2026" / "del 28 de octubre al 1 de noviembre de 2026". */
export function formatDateRange(start: string, end: string, locale: EventLocale): string {
  const a = parseIsoDate(start);
  const b = parseIsoDate(end);
  const [am, ad, ay] = [a.getUTCMonth(), a.getUTCDate(), a.getUTCFullYear()];
  const [bm, bd, by] = [b.getUTCMonth(), b.getUTCDate(), b.getUTCFullYear()];
  const m = MONTHS[locale];
  if (locale === "es") {
    if (ay !== by) return `del ${ad} de ${m[am]} de ${ay} al ${bd} de ${m[bm]} de ${by}`;
    if (am !== bm) return `del ${ad} de ${m[am]} al ${bd} de ${m[bm]} de ${by}`;
    if (ad === bd) return `${ad} de ${m[am]} de ${ay}`;
    return `del ${ad} al ${bd} de ${m[am]} de ${ay}`;
  }
  if (ay !== by) return `${m[am]} ${ad}, ${ay} – ${m[bm]} ${bd}, ${by}`;
  if (am !== bm) return `${m[am]} ${ad} – ${m[bm]} ${bd}, ${by}`;
  if (ad === bd) return `${m[am]} ${ad}, ${ay}`;
  return `${m[am]} ${ad}–${bd}, ${ay}`;
}

export function formatIsoDate(value: string, locale: EventLocale): string {
  const d = parseIsoDate(value);
  const month = MONTHS[locale][d.getUTCMonth()];
  return locale === "es"
    ? `${d.getUTCDate()} de ${month} de ${d.getUTCFullYear()}`
    : `${month} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

const ALL_EVENT_IDS: readonly EventId[] = [
  "flibs",
  "art-basel",
  "miami-boat-show",
  "sobewff",
  "emerge-americas",
  "miami-music-week",
  "miami-spice",
];

/**
 * Existing pages that link into the section, and which events each one names.
 * Ids not yet in EVENTS are skipped at render time, so a page can list an
 * event before its page ships.
 */
export const EVENT_CROSSLINKS: Record<string, readonly EventId[]> = {
  "/services": ALL_EVENT_IDS,
  "/es/servicios": ALL_EVENT_IDS,
  "/services/yacht-hospitality-video-fort-lauderdale": ["flibs", "miami-boat-show"],
  "/services/yacht-charter-video-marketing-miami": ["flibs", "miami-boat-show"],
  "/services/restaurant-promo-video-editing-miami": ["miami-spice", "sobewff", "art-basel"],
  "/services/nightlife-event-video-editing-miami": ["miami-music-week", "art-basel"],
  "/services/event-video-editing-miami": ["flibs", "art-basel", "emerge-americas", "miami-music-week"],
  "/services/corporate-event-videographer-miami": ["emerge-americas", "flibs"],
  "/es/video-para-yates-y-hospitalidad-fort-lauderdale": ["flibs", "miami-boat-show"],
  "/es/marketing-de-video-para-alquiler-de-yates-miami": ["flibs", "miami-boat-show"],
  "/es/edicion-de-video-promocional-para-restaurantes-miami": ["miami-spice", "sobewff", "art-basel"],
  "/es/video-para-restaurantes-miami": ["miami-spice", "sobewff", "art-basel"],
  "/es/edicion-de-video-para-discotecas-y-eventos-miami": ["miami-music-week", "art-basel"],
  "/es/edicion-de-video-para-eventos-miami": ["flibs", "art-basel", "emerge-americas", "miami-music-week"],
  "/es/videografo-para-eventos-corporativos-miami": ["emerge-americas", "flibs"],
};
