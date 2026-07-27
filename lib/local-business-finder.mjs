/**
 * local-business-finder.mjs — keyless local prospect discovery.
 *
 * Replaces the Google Places / Maps API for the daily prospect seeker. Uses the
 * OpenStreetMap Overpass API (free, no key, no billing) to find real restaurants,
 * cafes and bars near the studio, with their real website, phone, address and
 * (when tagged) Instagram handle.
 *
 * WHY NO GOOGLE: the seeker never actually called Google — it looped a hardcoded
 * list. Overpass gives live, real businesses without the sensitive API key that
 * Vercel can't even hand back. See ~/code/secrets-infra-fix/README.md for the saga.
 *
 * IMPORTANT (honesty): OSM has no Google star ratings / review counts. This module
 * therefore returns rating:null / reviews:null — downstream copy must NOT fabricate
 * a rating (see email-template-builder.mjs `hasGoogleRating` handling). Per AGENTS.md,
 * we never invent business facts.
 */

const OVERPASS_ENDPOINTS = [
  "https://maps.mail.ru/osm/tools/overpass/api/interpreter",
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

// Studio origin: 1811 SW 42nd Ave, Fort Lauderdale, FL 33317
export const STUDIO_ORIGIN = { lat: 26.1155, lon: -80.1918, city: "Fort Lauderdale", zip: "33317" };

// National chains are poor prospects for a boutique local media studio — skip them.
const CHAIN_DENYLIST = [
  "mcdonald", "burger king", "wendy", "kfc", "chipotle", "dunkin", "starbucks",
  "subway", "taco bell", "popeye", "chick-fil", "domino", "pizza hut", "papa john",
  "wingstop", "five guys", "panera", "arby", "sonic", "jimmy john", "jersey mike",
  "little caesar", "checkers", "ihop", "denny", "waffle house", "7-eleven", "wawa",
];

const ES_CUISINES = ["latin", "mexican", "colombian", "venezuelan", "peruvian", "cuban", "spanish", "salvadoran", "argentin"];

function haversineMiles(aLat, aLon, bLat, bLon) {
  const R = 3958.8; // miles
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(s));
}

function normalizeInstagram(tag) {
  if (!tag) return null;
  const m = String(tag).match(/instagram\.com\/([A-Za-z0-9._]+)/) || String(tag).match(/^@?([A-Za-z0-9._]+)$/);
  return m ? `@${m[1].replace(/^@/, "")}` : null;
}

function isChain(name) {
  const n = name.toLowerCase();
  return CHAIN_DENYLIST.some((c) => n.includes(c));
}

async function queryOverpass(query) {
  let lastErr;
  for (const ep of OVERPASS_ENDPOINTS) {
    try {
      const res = await fetch(ep, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Overpass etiquette requires a meaningful UA or requests get rate-limited.
          "User-Agent": "estebanmorenomedia-prospect-seeker/1.0 (+https://estebanmorenomedia.com)",
          Accept: "application/json",
        },
        body: "data=" + encodeURIComponent(query),
        signal: AbortSignal.timeout(40000),
      });
      const text = await res.text();
      if (text.trim().startsWith("{")) return JSON.parse(text);
      lastErr = new Error(`non-JSON from ${ep}: ${text.slice(0, 80)}`);
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("all Overpass endpoints failed");
}

/**
 * Find real local food/hospitality businesses near the studio.
 * @returns {Promise<Array>} normalized prospects (rating/reviews are null by design)
 */
export async function findLocalBusinesses({
  lat = STUDIO_ORIGIN.lat,
  lon = STUDIO_ORIGIN.lon,
  radiusM = 4500,
  limit = 20,
  requireWebsite = false,
} = {}) {
  const query = `[out:json][timeout:25];
(
  node["amenity"~"restaurant|cafe|bar|fast_food|pub|ice_cream"](around:${radiusM},${lat},${lon});
  way["amenity"~"restaurant|cafe|bar|fast_food|pub|ice_cream"](around:${radiusM},${lat},${lon});
);
out center tags 400;`;

  const data = await queryOverpass(query);
  const seen = new Set();
  const out = [];

  for (const el of data.elements || []) {
    const t = el.tags || {};
    const name = t.name;
    if (!name || isChain(name)) continue;
    const key = name.toLowerCase().trim();
    if (seen.has(key)) continue;

    const elLat = el.lat ?? el.center?.lat;
    const elLon = el.lon ?? el.center?.lon;
    if (elLat == null || elLon == null) continue;

    const url = t.website || t["contact:website"] || "";
    if (requireWebsite && !url) continue;

    const street = [t["addr:housenumber"], t["addr:street"]].filter(Boolean).join(" ");
    const cuisine = (t.cuisine || "").replace(/_/g, " ");
    const lang = ES_CUISINES.some((c) => cuisine.toLowerCase().includes(c)) ? "es" : "en";

    seen.add(key);
    out.push({
      name,
      city: t["addr:city"] || STUDIO_ORIGIN.city,
      address: street || t["addr:full"] || "",
      url,
      phone: t.phone || t["contact:phone"] || null,
      igHandle: normalizeInstagram(t["contact:instagram"] || t["contact:instagram:url"]),
      cuisine: cuisine || null,
      dist: haversineMiles(lat, lon, elLat, elLon).toFixed(1),
      lang,
      rating: null, // OSM has no Google rating — never fabricate one
      reviews: null,
      source: "osm-overpass",
    });
  }

  out.sort((a, b) => Number(a.dist) - Number(b.dist));
  return out.slice(0, limit);
}
