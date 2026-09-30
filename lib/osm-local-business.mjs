/**
 * Keyless local-business discovery via OpenStreetMap Overpass.
 *
 * WHY A SECOND SOURCE AT ALL. Apify is the right lane for Google Maps and stays
 * the primary one. But measured 2026-09-30, the account is on the STARTER plan
 * with a $29 monthly cap, $29.24 spent, and the cycle does not reset until
 * 2026-10-03 — `GET /users/me` returns 200 while `POST /runs` returns
 * `platform-feature-disabled`. A discovery pipeline whose only source is capped
 * produces zero prospects and no explanation for three days.
 *
 * Overpass is free, keyless, and returns the one field that was missing: a real
 * `website` tag for a real business. Proven on 2026-09-30 — one bbox query over
 * Fort Lauderdale returned 80 businesses with websites, and harvesting 18 of the
 * independent ones produced 5 deliverable addresses with zero fabrications.
 *
 * IT IS NOT AS GOOD AS GOOGLE MAPS and this is not a claim that it is. OSM
 * coverage of small businesses is patchy, it has no ratings to rank by, and it
 * carries no contact enrichment. It is the lane that works when the paid one is
 * capped, and the pipeline reports which source each prospect came from.
 *
 * ETIQUETTE. Overpass is donated infrastructure. One bbox query per run, a real
 * User-Agent, a timeout in the query itself, and the kumi.systems mirror first
 * because overpass-api.de returned 504 twice on 2026-09-30.
 */

const MIRRORS = [
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass-api.de/api/interpreter",
];

const USER_AGENT = "esteban-media-prospect-research/1.0 (+https://estebanmorenomedia.com)";

/**
 * National chains. A freelance video editor in Fort Lauderdale cannot sell to
 * IHOP's corporate marketing department, and the OSM data is full of them —
 * 2 of the first 12 results were IHOP and Starbucks store-locator URLs.
 */
const CHAIN_NAMES =
  /\b(ihop|starbucks|subway|mcdonald'?s?|dunkin|chipotle|wendy'?s?|burger king|domino'?s?|papa john'?s?|panera|kfc|taco bell|chick-?fil-?a|olive garden|applebee'?s?|denny'?s?|cheesecake factory|outback|chili'?s?|five guys|shake shack|wingstop|popeyes|arby'?s?|sonic|jimmy john'?s?|firehouse subs|tropical smoothie|smoothie king|crumbl|7-eleven|walgreens|cvs|planet fitness|la fitness|orangetheory|f45|anytime fitness|crunch fitness)\b/i;

/** Business kinds worth pitching footage editing to. */
export const OSM_SELECTORS = [
  'nwr["amenity"~"^(restaurant|cafe|bar|pub|fast_food|ice_cream)$"]["website"]',
  'nwr["shop"~"^(clothes|beauty|hairdresser|jewelry|furniture|bakery|butcher|florist|car)$"]["website"]',
  'nwr["leisure"="fitness_centre"]["website"]',
  'nwr["office"="estate_agent"]["website"]',
  'nwr["shop"="yes"]["website"]',
];

/**
 * Build the Overpass QL query for a bounding box.
 *
 * bbox order is Overpass's own: (south, west, north, east). Getting this wrong
 * silently returns an empty set rather than an error, so it is stated here and
 * asserted in the tests.
 */
export function buildOverpassQuery({ bbox, limit = 80, timeoutSecs = 25 }) {
  if (!Array.isArray(bbox) || bbox.length !== 4) {
    throw new Error("buildOverpassQuery: bbox must be [south, west, north, east]");
  }
  const [south, west, north, east] = bbox;
  if (south >= north) throw new Error("buildOverpassQuery: south must be less than north");
  if (west >= east) throw new Error("buildOverpassQuery: west must be less than east");
  const area = `(${south},${west},${north},${east})`;
  const body = OSM_SELECTORS.map((sel) => `${sel}${area};`).join("");
  return `[out:json][timeout:${timeoutSecs}];(${body});out tags ${limit};`;
}

/** Is this a business a one-person video shop can actually sell to? */
export function isIndependentBusiness(tags) {
  const name = String(tags?.name || "");
  if (!name) return false;
  if (CHAIN_NAMES.test(name)) return false;
  // OSM marks franchises explicitly; trust the data before the name list.
  if (tags?.brand || tags?.["brand:wikidata"] || tags?.operator === "chain") return false;
  return true;
}

/**
 * One prospect per distinct website host.
 *
 * Two branches of the same restaurant share a site, and harvesting it twice
 * queues the same inbox twice — which is exactly the kind of duplicate that
 * turns outreach into spam.
 */
export function tagsToProspects(elements, { city = "", language = "en" } = {}) {
  const seenHosts = new Set();
  const out = [];
  for (const el of elements ?? []) {
    const tags = el?.tags;
    if (!tags?.website || !isIndependentBusiness(tags)) continue;
    let host;
    try {
      const url = tags.website.startsWith("http") ? tags.website : `https://${tags.website}`;
      host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      continue;
    }
    // A store-locator page on a corporate domain is a chain the name list
    // missed; one host, many "businesses".
    if (seenHosts.has(host)) continue;
    seenHosts.add(host);
    out.push({
      id: el?.id ? `osm-${el.type ?? "n"}-${el.id}` : null,
      name: tags.name,
      segment:
        tags.amenity === "restaurant" || tags.amenity === "cafe" || tags.amenity === "bar"
          ? "restaurant"
          : tags.leisure === "fitness_centre"
            ? "gym"
            : tags.office === "estate_agent"
              ? "real-estate"
              : "retail",
      city: tags["addr:city"] || city,
      language,
      website: tags.website,
      phone: tags.phone || tags["contact:phone"] || "",
      igHandle: tags["contact:instagram"] || "",
      source: "openstreetmap:overpass",
    });
  }
  return out;
}

/**
 * Query Overpass, trying mirrors in order.
 *
 * Returns `{ elements, mirror }` or throws with the last error. A 504 from one
 * mirror is routine (measured twice on 2026-09-30) and must not end the run.
 */
/**
 * A response only needs these three things for this module to work — the same
 * minimal-shape reasoning as MxResolver. Declaring `typeof fetch` forced a test
 * double to fake all thirteen Response members.
 *
 * @typedef {{ ok: boolean, status: number, json?: () => Promise<any> }} MinimalResponse
 * @typedef {(url: string, init?: any) => Promise<MinimalResponse>} MinimalFetch
 *
 * @param {{ bbox: number[], limit?: number }} query
 * @param {{ fetchImpl?: MinimalFetch, mirrors?: string[], timeoutMs?: number }} [options]
 */
export async function fetchLocalBusinesses(
  { bbox, limit = 80 },
  { fetchImpl = /** @type {MinimalFetch} */ (fetch), mirrors = MIRRORS, timeoutMs = 90000 } = {},
) {
  const query = buildOverpassQuery({ bbox, limit });
  let lastError = null;
  for (const mirror of mirrors) {
    try {
      const res = await fetchImpl(mirror, {
        method: "POST",
        headers: {
          "User-Agent": USER_AGENT,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ data: query }).toString(),
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!res.ok) {
        lastError = new Error(`${mirror} HTTP ${res.status}`);
        continue;
      }
      const json = await res.json?.();
      return { elements: json?.elements ?? [], mirror };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error("Overpass: every mirror failed");
}

/** The three cities the seed and the service-area pages already name. */
export const CITY_BBOXES = {
  "Fort Lauderdale": [26.09, -80.2, 26.18, -80.1],
  Hollywood: [25.98, -80.21, 26.04, -80.11],
  Miami: [25.74, -80.26, 25.82, -80.16],
};
