import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  loadEnvLocal,
  loadSuppressionList,
  screenRecipient,
  sendGateEnabled,
} from "../lib/outreach-compliance.mjs";
import { extractBusinessContactInfo } from "../lib/website-email-extractor.mjs";
import { loadSeedProspects } from "./compliant-outreach-dispatcher.mjs";

/**
 * Esteban Moreno Media — Compliant Daily Prospect Email-Discovery Feed
 *
 * PURPOSE
 *   Grow the daily outreach campaign with FRESH, REAL, emailable South-Florida
 *   small-business prospects — without fabricating anything and without ever
 *   sending an email.
 *
 * DISCOVERY SOURCE — keyless + compliant only
 *   OpenStreetMap via the public Overpass API (no API key, no paid service).
 *   Every business field (name, website, city) is copied VERBATIM from real OSM
 *   tags; anything missing is omitted, never invented. NO ratings, review
 *   counts, distances, phone numbers, or audit claims are ever produced —
 *   those were fabricated by the deleted scanners and are banned repo-wide.
 *
 * EMAIL HARVEST — real only
 *   For each candidate we harvest a REAL contact email from the business's real
 *   website (lib/website-email-extractor.mjs). Anything isFabricatedEmail()
 *   flags (.example / 555 / self-referencing / malformed / noreply) is dropped.
 *
 * SCREENING + DEDUPE
 *   Every candidate is screened against the CAN-SPAM suppression list
 *   (loadSuppressionList / screenRecipient) and de-duplicated against
 *   scripts/data/verified-prospects.json, the running discovery feed, and the
 *   already-discovered / already-contacted ledger — so the daily feed never
 *   re-emails the same business.
 *
 * SEND POSTURE — discovery only
 *   This script TRANSMITS NOTHING. It writes candidates to disk and stops.
 *   Sending is exclusively the dispatcher's job and stays behind the existing
 *   send gate (ESTEBAN_SEND_LIVE=1 + RESEND_API_KEY + ESTEBAN_POSTAL_ADDRESS,
 *   asserted by assertLiveSendAllowed). This module never bypasses that gate;
 *   it has no Resend import and no transmit path at all.
 */

/** This module is structurally incapable of sending. Asserted in tests. */
export const DISCOVERY_TRANSMITS_EMAIL = false;

export const OVERPASS_ENDPOINT =
  process.env.OVERPASS_ENDPOINT || "https://overpass-api.de/api/interpreter";

export const OVERPASS_USER_AGENT =
  process.env.OVERPASS_USER_AGENT ||
  "EstebanMorenoMedia-ProspectDiscovery/1.0 (+https://estebanmorenomedia.com; esmolopez@gmail.com)";

export const DISCOVERED_PATH = path.join(
  process.cwd(),
  "scripts",
  "data",
  "discovered-prospects.json",
);

export const LEDGER_PATH = path.join(
  process.cwd(),
  "public",
  "leads",
  "discovery-ledger.json",
);

/**
 * South-Florida target box: Broward + Miami-Dade coastal corridor
 * (covers Fort Lauderdale, Hollywood, Miami, Doral, Weston, Pompano Beach).
 */
export const SOFLA_BBOX = {
  south: 25.55,
  west: -80.45,
  north: 26.35,
  east: -80.05,
};

/**
 * Segment -> OpenStreetMap tag filters. Only tags that reliably map to a real,
 * emailable local small business in Esteban's target segments.
 */
export const SEGMENT_TAGS = {
  restaurant: [["amenity", "restaurant"]],
  cafe: [["amenity", "cafe"]],
  brewery: [
    ["craft", "brewery"],
    ["microbrewery", "yes"],
  ],
  agency: [["office", "advertising_agency"]],
  "real-estate": [["office", "estate_agent"]],
  ecommerce: [
    ["shop", "clothes"],
    ["shop", "boutique"],
  ],
};

/**
 * Which outreach template language to default to per segment. This is OUR
 * messaging choice (Esteban is Spanish-first), NOT a claim about the business.
 */
export const SEGMENT_LANG = {
  restaurant: "es",
  cafe: "es",
  brewery: "en",
  agency: "en",
  "real-estate": "en",
  ecommerce: "en",
};

/**
 * National chains that are not real local-outreach prospects. Excluding them is
 * a quality filter, not fabrication. Normalized-name substring match.
 */
export const NATIONAL_CHAINS = [
  "starbucks",
  "mcdonald",
  "dunkin",
  "subway",
  "chipotle",
  "burger king",
  "wendy",
  "taco bell",
  "domino",
  "pizza hut",
  "panera",
  "chick-fil-a",
  "chick fil a",
  "kfc",
  "wingstop",
  "five guys",
  "dairy queen",
  "popeyes",
  "sonic",
  "ihop",
  "denny",
  "olive garden",
  "chili's",
  "chilis",
  "applebee",
  "outback",
  "cvs",
  "walgreens",
  "walmart",
  "target",
  "costco",
  "re/max",
  "remax",
  "keller williams",
  "coldwell banker",
  "century 21",
  "compass",
];

export function normalizeName(name) {
  return String(name || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function normalizeEmail(email) {
  return String(email || "").toLowerCase().trim();
}

/** True if the business name is a known national chain (not a local prospect). */
export function isNationalChain(name) {
  const n = normalizeName(name);
  if (!n) return false;
  return NATIONAL_CHAINS.some((chain) => n.includes(normalizeName(chain)));
}

/** Map a raw OSM tag object back to one of Esteban's target segments. */
export function inferSegment(tags = {}) {
  if (tags.amenity === "restaurant") return "restaurant";
  if (tags.amenity === "cafe") return "cafe";
  if (tags.craft === "brewery" || tags.microbrewery === "yes") return "brewery";
  if (tags.office === "advertising_agency") return "agency";
  if (tags.office === "estate_agent") return "real-estate";
  if (tags.shop === "clothes" || tags.shop === "boutique") return "ecommerce";
  return null;
}

/**
 * Build an Overpass QL query for the given bbox + segments. Each element must
 * carry BOTH a name and a website (website or contact:website) so it is a real,
 * harvestable candidate — never a nameless or contactless node.
 */
export function buildOverpassQuery({
  bbox = SOFLA_BBOX,
  segments = Object.keys(SEGMENT_TAGS),
  perQueryLimit = 400,
} = {}) {
  const box = `${bbox.south},${bbox.west},${bbox.north},${bbox.east}`;
  const lines = [];
  for (const segment of segments) {
    const tagSets = SEGMENT_TAGS[segment];
    if (!tagSets) continue;
    for (const [k, v] of tagSets) {
      for (const site of ["website", "contact:website"]) {
        lines.push(
          `  node["${k}"="${v}"]["name"]["${site}"](${box});`,
        );
      }
    }
  }
  return `[out:json][timeout:60];\n(\n${lines.join("\n")}\n);\nout tags ${perQueryLimit};`;
}

/**
 * Turn a raw Overpass JSON response into REAL prospect candidates. Every field
 * is copied verbatim from OSM tags; nodes without a name+website or without a
 * recognizable target segment are dropped. National chains are excluded.
 * NO rating / review / distance / phone fields are ever produced.
 */
export function parseOverpassResponse(json) {
  const elements = (json && json.elements) || [];
  const seen = new Set();
  const candidates = [];
  for (const el of elements) {
    const tags = el.tags || {};
    const name = (tags.name || "").trim();
    const website = (tags.website || tags["contact:website"] || "").trim();
    if (!name || !website) continue;
    const segment = inferSegment(tags);
    if (!segment) continue;
    if (isNationalChain(name)) continue;

    const osmId = `osm:${el.type || "node"}/${el.id}`;
    if (seen.has(osmId)) continue;
    seen.add(osmId);

    candidates.push({
      name,
      website,
      city: (tags["addr:city"] || "").trim(),
      segment,
      language: SEGMENT_LANG[segment] || "es",
      source: osmId,
    });
  }
  return candidates;
}

/**
 * Query OpenStreetMap (Overpass) for real local businesses. Keyless. The
 * fetch implementation is injectable so tests never touch the network.
 */
export async function discoverViaOverpass({
  fetchFn = fetch,
  endpoint = OVERPASS_ENDPOINT,
  userAgent = OVERPASS_USER_AGENT,
  bbox = SOFLA_BBOX,
  segments = Object.keys(SEGMENT_TAGS),
} = {}) {
  const query = buildOverpassQuery({ bbox, segments });
  const res = await fetchFn(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "User-Agent": userAgent,
    },
    body: "data=" + encodeURIComponent(query),
  });
  if (!res.ok) {
    throw new Error(`Overpass API status ${res.status}`);
  }
  const json = await res.json();
  return parseOverpassResponse(json);
}

/** Harvest one REAL email from a real website, or "" if none is found. */
export async function harvestRealEmail(website, harvestFn = extractBusinessContactInfo) {
  if (!website || !harvestFn) return "";
  try {
    const res = await harvestFn(website);
    const emails = (res && res.emails) || [];
    // screenRecipient re-validates; here we just pick the first non-empty one.
    return emails.find((e) => e && typeof e === "string") || "";
  } catch {
    return "";
  }
}

/** Deterministic prospect id from the OSM source (or email fallback). */
export function discoveryId(candidate, email) {
  const base = candidate.source || `email:${normalizeEmail(email)}`;
  return "disc-" + base.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * Core discovery/dedupe/screening pipeline. Pure over its inputs and injectable
 * (harvestFn) so it is trivially testable. Returns { added, skipped }.
 *
 *   candidates      : parsed OSM candidates
 *   suppressionList : from loadSuppressionList (null => fail closed, add nothing)
 *   knownNames      : Set<normalizedName> already in the seed / feed / ledger
 *   knownEmails     : Set<normalizedEmail> already discovered or contacted
 *   harvestFn       : website -> { emails: string[] }
 *   limit           : max candidates to process (bounds website crawling)
 */
export async function buildDiscoveryFeed({
  candidates,
  suppressionList,
  knownNames = new Set(),
  knownEmails = new Set(),
  harvestFn = extractBusinessContactInfo,
  limit = 25,
  nowIso = new Date().toISOString(),
}) {
  const added = [];
  const skipped = [];
  const batchNames = new Set();
  const batchEmails = new Set();

  // Fail closed: an unreadable suppression list suppresses everything.
  if (suppressionList === null) {
    for (const c of candidates) {
      skipped.push({ name: c.name, source: c.source, reason: "suppression_unreadable" });
    }
    return { added, skipped };
  }

  let processed = 0;
  for (const c of candidates) {
    if (processed >= limit) {
      skipped.push({ name: c.name, source: c.source, reason: "limit_reached" });
      continue;
    }

    // Cheap business-name dedupe BEFORE any network harvest.
    const nameKey = normalizeName(c.name);
    if (knownNames.has(nameKey) || batchNames.has(nameKey)) {
      skipped.push({ name: c.name, source: c.source, reason: "duplicate_business" });
      continue;
    }

    processed += 1;
    const email = await harvestRealEmail(c.website, harvestFn);

    // Fabrication + suppression gate (shared with the dispatcher).
    const screen = screenRecipient(email, suppressionList);
    if (!screen.ok) {
      skipped.push({ name: c.name, source: c.source, email: email || null, reason: screen.reason });
      continue;
    }

    const emailKey = normalizeEmail(email);
    if (knownEmails.has(emailKey) || batchEmails.has(emailKey)) {
      skipped.push({ name: c.name, source: c.source, email, reason: "duplicate_email" });
      continue;
    }

    batchNames.add(nameKey);
    batchEmails.add(emailKey);
    added.push({
      id: discoveryId(c, email),
      name: c.name,
      segment: c.segment,
      city: c.city,
      language: c.language,
      website: c.website,
      email,
      handleVerified: false,
      source: c.source,
      discoveredAt: nowIso,
    });
  }

  return { added, skipped };
}

/* --------------------------------- I/O ---------------------------------- */

export function loadDiscoveredFeed(feedPath = DISCOVERED_PATH) {
  if (!fs.existsSync(feedPath)) return { prospects: [] };
  try {
    const data = JSON.parse(fs.readFileSync(feedPath, "utf8"));
    return { prospects: data.prospects || [], ...data };
  } catch {
    return { prospects: [] };
  }
}

export function loadLedger(ledgerPath = LEDGER_PATH) {
  if (!fs.existsSync(ledgerPath)) {
    return { discovered: [], contacted: [], updatedAt: null };
  }
  try {
    const data = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));
    return {
      discovered: (data.discovered || []).map(normalizeEmail),
      contacted: (data.contacted || []).map(normalizeEmail),
      updatedAt: data.updatedAt || null,
    };
  } catch {
    // Fail closed: an unreadable ledger blocks nothing but is treated as if
    // everything was already discovered would be too aggressive — instead we
    // surface it to the caller by returning null so runDiscovery can bail.
    return null;
  }
}

/** Merge freshly-added prospects into the discovered feed and persist it. */
export function saveDiscoveredFeed(added, feedPath = DISCOVERED_PATH) {
  const existing = loadDiscoveredFeed(feedPath);
  const prospects = [...(existing.prospects || []), ...added];
  const payload = {
    note:
      "REAL, keyless-discovered outreach targets (OpenStreetMap/Overpass) with a REAL harvested email. " +
      "No fabricated businesses, ratings, review counts, distances, or phone numbers. " +
      "Consumed by scripts/compliant-outreach-dispatcher.mjs (dry-run + gated by default). " +
      "This file is runtime state and is gitignored (contains third-party emails).",
    source: "openstreetmap-overpass",
    updatedAt: new Date().toISOString(),
    prospects,
  };
  fs.mkdirSync(path.dirname(feedPath), { recursive: true });
  fs.writeFileSync(feedPath, JSON.stringify(payload, null, 2), "utf8");
  return prospects.length;
}

/** Record freshly-discovered emails on the ledger (idempotent). */
export function saveLedger(discoveredEmails, ledgerPath = LEDGER_PATH) {
  const current = loadLedger(ledgerPath) || { discovered: [], contacted: [] };
  const set = new Set(current.discovered.map(normalizeEmail));
  for (const e of discoveredEmails) set.add(normalizeEmail(e));
  const payload = {
    note:
      "Discovery ledger. 'discovered' = businesses already surfaced by the discovery feed; " +
      "'contacted' = businesses already emailed by the dispatcher. Both are checked to guarantee " +
      "the daily feed never re-emails the same business. Runtime state; gitignored.",
    discovered: [...set],
    contacted: current.contacted.map(normalizeEmail),
    updatedAt: new Date().toISOString(),
  };
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  fs.writeFileSync(ledgerPath, JSON.stringify(payload, null, 2), "utf8");
  return payload.discovered.length;
}

/* ------------------------------ CLI runner ------------------------------ */

export async function runDiscovery({ limit } = {}) {
  loadEnvLocal();

  const runLimit = Number.isFinite(limit)
    ? limit
    : Number.parseInt(process.env.DISCOVERY_LIMIT || "25", 10) || 25;

  console.log("🔎 Compliant prospect discovery (keyless OSM/Overpass, DISCOVERY-ONLY, sends nothing)");

  const suppressionList = loadSuppressionList();
  if (suppressionList === null) {
    console.error("❌ Suppression list unreadable — failing closed. No discovery, no writes.");
    process.exitCode = 1;
    return;
  }

  const ledger = loadLedger();
  if (ledger === null) {
    console.error("❌ Discovery ledger unreadable/corrupt — failing closed. No writes.");
    process.exitCode = 1;
    return;
  }

  // Build the "already known" universe from seed + feed + ledger.
  const seed = loadSeedProspects();
  const feed = loadDiscoveredFeed();
  const knownNames = new Set(
    [...seed, ...feed.prospects].map((p) => normalizeName(p.name)),
  );
  const knownEmails = new Set(
    [
      ...feed.prospects.map((p) => p.email),
      ...ledger.discovered,
      ...ledger.contacted,
    ]
      .filter(Boolean)
      .map(normalizeEmail),
  );

  let candidates = [];
  try {
    candidates = await discoverViaOverpass({
      fetchFn: (url, opts) => fetch(url, opts),
    });
    console.log(`   OSM returned ${candidates.length} real candidate business(es) with a website.`);
  } catch (e) {
    console.error(
      `⚠️  OSM discovery unavailable (${e.message}). No candidates this run — sending nothing, writing nothing.`,
    );
    process.exitCode = 1;
    return;
  }

  const { added, skipped } = await buildDiscoveryFeed({
    candidates,
    suppressionList,
    knownNames,
    knownEmails,
    limit: runLimit,
  });

  if (added.length) {
    const total = saveDiscoveredFeed(added);
    saveLedger(added.map((p) => p.email));
    console.log(`   Feed now holds ${total} discovered prospect(s).`);
  }

  // Counts only — never print harvested emails to logs.
  const skipReasons = skipped.reduce((acc, s) => {
    acc[s.reason] = (acc[s.reason] || 0) + 1;
    return acc;
  }, {});

  console.log("\n📊 Discovery summary (counts only):");
  console.log(`   candidates: ${candidates.length}`);
  console.log(`   added (new, real, emailable): ${added.length}`);
  console.log(`   skipped: ${skipped.length} ${JSON.stringify(skipReasons)}`);
  console.log(`\n   Send gate: ${sendGateEnabled() ? "ON" : "OFF"} — discovery transmits nothing regardless.`);
  console.log("   Sending stays exclusively in compliant-outreach-dispatcher.mjs behind assertLiveSendAllowed().");

  return { added, skipped, candidateCount: candidates.length };
}

const isDirect =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirect) {
  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? Number.parseInt(limitArg.split("=")[1], 10) : undefined;
  runDiscovery({ limit }).catch((err) => {
    console.error("Discovery error:", err.message);
    process.exitCode = 1;
  });
}
