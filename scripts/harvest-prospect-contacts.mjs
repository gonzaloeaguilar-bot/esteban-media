#!/usr/bin/env node
/**
 * Harvest REAL contact emails for outreach prospects.
 *
 * THE BUG THIS FIXES, MEASURED. `node scripts/compliant-outreach-dispatcher.mjs`
 * on 2026-09-30 printed:
 *
 *     Prepared 3 compliant draft(s); skipped 19.
 *     ⏭️  skip A2 Arepa Bar: fabricated_or_invalid_email      (x19)
 *
 * The compliance guard was correct. The INPUT was empty: exactly 3 of the 22
 * seed prospects had a `website` field, and those 3 are the 3 that produced
 * drafts. Worse, the 3 survivors are all marketing agencies reached at generic
 * `info@` inboxes — competitors, not customers.
 *
 * WHAT THIS DOES
 *
 *   1. DISCOVER (Apify Google Maps, `website: "withWebsite"`) — only businesses
 *      that HAVE a website, because a business without one can never yield an
 *      email however good the extractor is.
 *   2. HARVEST (lib/contact-harvest.mjs) — crawl the priority pages of each
 *      site, decode Cloudflare obfuscation, read JSON-LD, de-obfuscate
 *      "[at]" forms, and SCORE the candidates so the pitch reaches the inbox a
 *      human reads instead of whichever address appeared first in the markup.
 *   3. VALIDATE (lib/email-validation.mjs) — MX only. No SMTP probing: testing
 *      mailboxes against strangers' mail servers is how a sending domain gets
 *      blocklisted, and the channel is the asset.
 *   4. WRITE `scripts/data/discovered-prospects.json`, the file the dispatcher
 *      already loads. Runtime state, gitignored.
 *
 * IT NEVER SENDS. This script has no mail client and no Resend key. Sending
 * stays in the dispatcher, behind its own three-way live gate.
 *
 * USAGE
 *   node scripts/harvest-prospect-contacts.mjs                  # discover + harvest
 *   node scripts/harvest-prospect-contacts.mjs --seed-only      # no Apify; enrich the seed
 *   node scripts/harvest-prospect-contacts.mjs --dry-run        # print, write nothing
 *   node scripts/harvest-prospect-contacts.mjs --max 40
 */

import fs from "node:fs";
import path from "node:path";

import {
  PRIORITY_PATHS,
  extractEmailsFromHtml,
  rankEmailCandidates,
} from "../lib/contact-harvest.mjs";
import { validateEmail } from "../lib/email-validation.mjs";
import {
  apifyLaneHealth,
  buildMapsInput,
  placeToProspect,
  runMapsSearch,
} from "../lib/apify-google-maps.mjs";
import {
  CITY_BBOXES,
  fetchLocalBusinesses,
  tagsToProspects,
} from "../lib/osm-local-business.mjs";

const OUT_PATH = path.join(process.cwd(), "scripts", "data", "discovered-prospects.json");
const SEED_PATH = path.join(process.cwd(), "scripts", "data", "verified-prospects.json");

/**
 * Who Esteban actually sells to.
 *
 * Deliberately NOT "marketing agency": the 2026-09-30 run's only three
 * survivors were agencies, which are competitors. These are the businesses that
 * shoot footage on a phone and have nobody to edit it.
 */
const SEARCHES = [
  "restaurant",
  "cafe",
  "brewery",
  "med spa",
  "dental clinic",
  "gym",
  "real estate agent",
  "boutique clothing store",
  "yacht charter",
  "hair salon",
];

const LOCATIONS = ["Fort Lauderdale, Florida", "Hollywood, Florida", "Miami, Florida"];

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

/**
 * Fetch one page with a REAL timeout.
 *
 * `fetch(url, { timeout: 5000 })` — what the previous extractor passed — is not
 * a Node fetch option. It is silently ignored, so a hanging small-business host
 * stalled the whole run with no error. AbortSignal.timeout is the real one.
 */
async function fetchPage(url, { fetchImpl = fetch, timeoutMs = 8000 } = {}) {
  try {
    const res = await fetchImpl(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html,application/xhtml+xml" },
      redirect: "follow",
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return null;
    const type = res.headers?.get?.("content-type") || "";
    if (type && !/html|xml|text/i.test(type)) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/**
 * Crawl a business site's priority pages and return the ranked candidates.
 *
 * Stops as soon as a page yields an address scoring high enough to be the
 * business's own inbox — crawling nine pages of a restaurant's site to
 * re-confirm `info@` found in the header is rude and slow.
 */
export async function harvestSiteContacts(websiteUrl, { fetchImpl = fetch } = {}) {
  if (!websiteUrl) return { emails: [], pagesFetched: 0, reason: "no_website" };
  let base;
  try {
    base = new URL(websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`);
  } catch {
    return { emails: [], pagesFetched: 0, reason: "bad_url" };
  }
  if (/estebanmorenomedia\.com$/i.test(base.hostname)) {
    return { emails: [], pagesFetched: 0, reason: "own_site" };
  }

  const siteHost = base.hostname;
  const all = new Map();
  let pagesFetched = 0;

  for (const subPath of PRIORITY_PATHS) {
    const target = new URL(subPath || "/", base).toString();
    const html = await fetchPage(target, { fetchImpl });
    if (html == null) continue;
    pagesFetched += 1;
    const onContactPage = /contact|contacto|impressum/i.test(subPath);
    for (const candidate of extractEmailsFromHtml(html, { onContactPage })) {
      const prev = all.get(candidate.email);
      all.set(candidate.email, prev ? { ...prev, ...candidate, onContactPage: prev.onContactPage || candidate.onContactPage } : candidate);
    }
    // An address on the business's own domain found on a contact page is as
    // good as this is going to get; stop asking for more pages.
    const ranked = rankEmailCandidates([...all.values()], { siteHost });
    if (ranked[0]?.score >= 90) break;
  }

  return {
    emails: rankEmailCandidates([...all.values()], { siteHost }),
    pagesFetched,
    reason: all.size ? "ok" : pagesFetched ? "no_email_on_site" : "site_unreachable",
  };
}

/**
 * Run `worker` over `items`, at most `limit` at a time, preserving order.
 *
 * Serial was too slow to finish: 36 prospects x up to 9 pages x an 8s timeout is
 * tens of minutes, and on 2026-09-30 a `timeout 580` killed a run mid-harvest.
 * The previous run's output file was still on disk, so the numbers read back
 * looked like a completed run — the stale-artifact trap. Bounded concurrency
 * keeps the run inside a window a daily loop can actually use; the bound exists
 * because thirty-six simultaneous requests from one IP is what gets a scraper
 * blocked.
 */
async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

/** Discover prospects from Google Maps, or say exactly why we could not. */
async function discover({ max, log }) {
  const health = await apifyLaneHealth();
  if (!health.ok) {
    log(`⚠️  Apify unavailable (${health.wall}): ${health.message}`);
    log("   Falling back to the keyless OpenStreetMap lane — worse coverage, but $0 and it runs today.");
    // EVERY city is attempted, and the cap is applied AFTERWARDS.
    //
    // The first version broke out of this loop as soon as `osm.length >= max`.
    // Measured 2026-09-30: Fort Lauderdale — the home market — lost both
    // Overpass mirrors to a 504, Hollywood then returned 52 businesses which
    // filled the cap, and Miami was never attempted. The run reported success
    // while quietly covering one city out of three, and nothing in the output
    // said the home market was missing.
    //
    // A failed city is retried once, because a 504 from donated infrastructure
    // is transient and losing the home market to one is not acceptable.
    const byCity = new Map();
    for (const [city, bbox] of Object.entries(CITY_BBOXES)) {
      for (let attempt = 1; attempt <= 2; attempt += 1) {
        try {
          const { elements, mirror } = await fetchLocalBusinesses({ bbox, limit: 80 });
          const prospects = tagsToProspects(elements, { city });
          byCity.set(city, prospects);
          log(`   OSM ${city}: ${prospects.length} independent business(es) with a website (${mirror.replace(/^https:\/\//, "")})`);
          break;
        } catch (error) {
          const last = attempt === 2;
          log(`   OSM ${city}: ✗ attempt ${attempt}/2 ${error.message}${last ? " — CITY MISSING from this run" : ", retrying"}`);
          if (!last) await new Promise((r) => setTimeout(r, 2000));
        }
      }
    }

    // Round-robin across cities so the cap cannot be consumed entirely by
    // whichever city happened to answer first.
    const lists = [...byCity.values()];
    const osm = [];
    for (let i = 0; osm.length < max && lists.some((l) => l.length > i); i += 1) {
      for (const list of lists) {
        if (list[i] && osm.length < max) osm.push(list[i]);
      }
    }
    const missing = Object.keys(CITY_BBOXES).filter((c) => !byCity.has(c));
    if (missing.length) log(`   ⚠️  no data for: ${missing.join(", ")}`);
    return {
      prospects: osm,
      apify: health,
      fallback: "openstreetmap",
      cities: Object.fromEntries([...byCity].map(([c, l]) => [c, l.length])),
      citiesMissing: missing,
    };
  }
  log(`Apify lane OK (plan ${health.plan}, $${Number(health.spent ?? 0).toFixed(2)} of $${health.cap} used).`);

  const perSearch = Math.max(1, Math.ceil(max / (SEARCHES.length * LOCATIONS.length)));
  const out = [];
  for (const location of LOCATIONS) {
    const input = buildMapsInput({ searches: SEARCHES, location, maxPerSearch: perSearch });
    log(`Google Maps: ${SEARCHES.length} searches x ${perSearch} places in ${location} (websites only)…`);
    try {
      const places = await runMapsSearch(input);
      log(`  ${places.length} place(s) with a website.`);
      out.push(...places.map((p) => placeToProspect(p)));
    } catch (error) {
      log(`  ✗ ${error.message} (wall=${error.wall ?? "none"})`);
      if (!error.retryable) break;
    }
    if (out.length >= max) break;
  }
  return { prospects: out.slice(0, max), apify: health };
}

function loadSeed() {
  try {
    return JSON.parse(fs.readFileSync(SEED_PATH, "utf8")).prospects ?? [];
  } catch {
    return [];
  }
}

async function main() {
  const argv = process.argv.slice(2);
  const seedOnly = argv.includes("--seed-only");
  const dryRun = argv.includes("--dry-run");
  const maxArg = argv.indexOf("--max");
  const max = maxArg >= 0 ? Number(argv[maxArg + 1]) || 60 : 60;
  const log = (...a) => console.log(...a);

  log("Esteban Moreno Media — prospect contact harvest. This script never sends email.\n");

  const discovered = seedOnly ? { prospects: [], apify: { ok: false, wall: "skipped" } } : await discover({ max, log });
  const seed = loadSeed();
  log(`\nSeed: ${seed.length} prospect(s), ${seed.filter((p) => p.website).length} with a website.`);

  // De-duplicate by normalized name; discovery and seed overlap by design.
  const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const merged = new Map();
  for (const p of [...seed, ...discovered.prospects]) {
    const key = norm(p.name);
    if (key && !merged.has(key)) merged.set(key, p);
  }
  const candidates = [...merged.values()].filter((p) => p.website);
  log(`\nHarvesting ${candidates.length} prospect(s) that have a website…\n`);

  const settled = await mapWithConcurrency(candidates, 6, async (prospect) => {
    const { emails, reason, pagesFetched } = await harvestSiteContacts(prospect.website);
    if (emails.length === 0) {
      log(`  —  ${prospect.name}: ${reason} (${pagesFetched} page(s) read)`);
      return { dropped: { name: prospect.name, reason, pagesFetched } };
    }
    // Validate best-first and take the first address whose domain can receive
    // mail, so one dead top-scorer does not discard a working second choice.
    let chosen = null;
    const checked = [];
    for (const candidate of emails.slice(0, 4)) {
      const verdict = await validateEmail(candidate.email);
      checked.push({ ...candidate, ...verdict });
      if (verdict.ok) {
        chosen = { ...candidate, ...verdict };
        break;
      }
    }
    if (!chosen) {
      log(`  ✗  ${prospect.name}: no address with a live MX (${checked.map((c) => `${c.email}=${c.reason}`).join(", ")})`);
      return { dropped: { name: prospect.name, reason: `mx_failed:${checked[0]?.reason ?? "unknown"}` } };
    }
    // Does the address belong to THIS business, or to a parent group?
    //
    // Observed 2026-09-30: `support@toojays.com` for a TooJay's location,
    // `info@mhbr.com` for a restaurant group's bar, `piola@piola.it` for an
    // international chain's Fort Lauderdale branch. The name-based chain filter
    // catches national brands; it does not catch regional groups. A domain
    // mismatch is the cheap factual signal that this inbox is corporate, where
    // a pitch for one-person video editing does not land — so it is RECORDED
    // rather than guessed at, and a human reading the dry-run can see it.
    let emailDomainMatchesSite = null;
    try {
      const siteHost = new URL(
        prospect.website.startsWith("http") ? prospect.website : `https://${prospect.website}`,
      ).hostname.replace(/^www\./, "").toLowerCase();
      const emailHost = chosen.email.split("@")[1];
      emailDomainMatchesSite = emailHost === siteHost || emailHost.endsWith(`.${siteHost}`);
    } catch {
      emailDomainMatchesSite = null;
    }

    log(`  ✓  ${prospect.name}: ${chosen.email} (score ${chosen.score}, ${chosen.reason})`);
    return { prospect: {
      ...prospect,
      email: chosen.email,
      emailScore: chosen.score,
      emailDomainMatchesSite,
      emailSource: chosen.inJsonLd ? "json-ld" : chosen.onContactPage ? "contact-page" : "website",
      emailVerification: { method: "mx", ok: true, reason: chosen.reason },
      harvestedAt: new Date().toISOString(),
    } };
  });

  const harvested = settled.filter((r) => r?.prospect).map((r) => r.prospect);
  const dropped = settled.filter((r) => r?.dropped).map((r) => r.dropped);

  // An address on a domain the business does not own is somebody else's inbox.
  // Measured 2026-09-30: `info@menufy.com` for Sushi Siam (a third-party
  // ordering platform), `info@mhbr.com` for a restaurant group's bar,
  // `miamibierhaus@aol.com`. Pitching a SaaS vendor is a wasted send and reads
  // as spray-and-pray — the same mistake as the original run's three agencies.
  //
  // These are NOT discarded: they go to `needsReview`, where a human can
  // promote one, rather than being silently deleted or silently mailed.
  const results = harvested.filter((p) => p.emailDomainMatchesSite !== false);
  const needsReview = harvested.filter((p) => p.emailDomainMatchesSite === false);
  if (needsReview.length) {
    log(`\n${needsReview.length} held for review — the address is on a domain the business does not own:`);
    for (const p of needsReview) log(`   ${p.name} -> ${p.email}`);
  }

  log(`\n${results.length} prospect(s) with a verified-deliverable domain; ${dropped.length} dropped.`);

  if (dryRun) {
    log("\n--dry-run: nothing written.");
    return;
  }
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(
    OUT_PATH,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: "harvest-prospect-contacts",
        apifyLane: discovered.apify,
        discoverySource: discovered.fallback ?? "apify:google-maps",
        citiesScanned: discovered.cities ?? null,
        citiesMissing: discovered.citiesMissing ?? [],
        counts: {
          sendable: results.length,
          needsReview: needsReview.length,
          dropped: dropped.length,
        },
        dropped,
        needsReview,
        prospects: results,
      },
      null,
      2,
    )}\n`,
  );
  log(`\nWrote ${results.length} prospect(s) to ${path.relative(process.cwd(), OUT_PATH)}`);
  log("Next: node scripts/compliant-outreach-dispatcher.mjs   (still a dry-run; sends nothing)");
}

const isDirect = process.argv[1] && import.meta.url === `file://${path.resolve(process.argv[1])}`;
if (isDirect) {
  main().catch((error) => {
    console.error(`harvest failed: ${error?.stack || error}`);
    process.exit(1);
  });
}
