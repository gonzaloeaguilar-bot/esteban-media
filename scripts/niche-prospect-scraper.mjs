#!/usr/bin/env node
/**
 * Esteban Moreno Media — niche prospect scraper (discovery only, never sends).
 *
 * Lane: pick a niche from data/outreach/niches.json, pull REAL local businesses
 * from Google Maps via Apify, harvest a REAL contact email from each business's
 * own website, dedupe against the standing prospect ledger, and write drafts
 * built by the existing compliant email builder.
 *
 * Hard rules:
 *   - No fabricated businesses, emails, ratings or claims. A business with no
 *     harvestable real email is DROPPED, never guessed (no info@<domain> guessing).
 *   - Role/business addresses only. Personal-looking and vendor addresses are
 *     rejected; so are free-mail-only hits unless the niche owner is the business.
 *   - Dedupe by domain across every run, forever (data/outreach/prospect-ledger.jsonl).
 *   - Spend cap: --max-places (default 40) per run; the Apify call is the only
 *     paid step. Nothing sends; dispatch stays in the existing gated dispatcher.
 *
 * Usage:
 *   node scripts/niche-prospect-scraper.mjs --niche auto-dealers --metro "Fort Lauderdale FL"
 *   node scripts/niche-prospect-scraper.mjs --list
 *   node scripts/niche-prospect-scraper.mjs --niche fitness --max-places 20 --dry-run
 */

import fs from "fs";
import path from "path";

import { buildCompliantOutreachEmail } from "../lib/compliant-outreach-email.mjs";

const ROOT = process.cwd();
const NICHES_PATH = path.join(ROOT, "data", "outreach", "niches.json");
// Harvested contact data NEVER enters this repo: it is public, and these are
// real third-party business addresses. State lives outside the working tree.
const STATE_DIR = process.env.ESTEBAN_OUTREACH_STATE
  || path.join(process.env.HOME, ".claude", "state", "esteban-outreach");
const LEDGER_PATH = path.join(STATE_DIR, "prospect-ledger.jsonl");
const EXCLUSIONS_PATH = path.join(ROOT, "data", "outreach", "exclusions.json");
const DRAFTS_DIR = path.join(STATE_DIR, "drafts");

const ACTOR = "compass~crawler-google-places";

/* ---------------------------------------------------------------- env ----- */

function loadApifyToken() {
  for (const envFile of [
    `${process.env.HOME}/.config/secrets.env`,
    `${process.env.HOME}/.config/api-keys/gonzalo-local-tools.env`,
    path.join(ROOT, ".env.local"),
  ]) {
    if (!fs.existsSync(envFile)) continue;
    for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
      const m = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)$/);
      if (!m) continue;
      const [, k, raw] = m;
      if (process.env[k]) continue;
      process.env[k] = raw.trim().replace(/^["']|["']$/g, "");
    }
  }
  return (process.env.APIFY_API_TOKEN || process.env.APIFY_TOKEN || "").trim();
}

/* -------------------------------------------------------------- email ----- */

// Addresses that are never a prospect's own inbox.
const EMAIL_DENY = [
  "example.com", "sentry.io", "wixpress.com", "wix.com", "squarespace.com",
  "godaddy.com", "shopify.com", "@2x", "domain.com", "yourdomain", "email.com",
  "sentry-next", "no-reply", "noreply", "donotreply", "@sentry", "wordpress.com",
  "estebanmorenomedia", "privacy@", "abuse@", "postmaster@", "webmaster@",
];
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const ROLE_PREFIXES = ["info", "contact", "hello", "hola", "sales", "booking", "bookings", "events", "office", "admin", "team", "service", "support", "reservations", "marketing"];

function scoreEmail(email, domain) {
  const [local, host] = email.split("@");
  let score = 0;
  if (host === domain || host.endsWith(`.${domain}`)) score += 10; // own domain
  if (ROLE_PREFIXES.includes(local)) score += 5;
  if (/^(gmail|yahoo|hotmail|outlook|aol|icloud)\./.test(host)) score -= 3;
  return score;
}

export function usableEmails(html, domain) {
  const found = new Set();
  for (const raw of html.match(EMAIL_RE) || []) {
    const e = raw.toLowerCase().trim().replace(/\.$/, "");
    if (EMAIL_DENY.some((bad) => e.includes(bad))) continue;
    if (/\.(png|jpe?g|svg|gif|webp|css|js)$/.test(e)) continue;
    if (e.length > 70) continue;
    found.add(e);
  }
  return [...found].sort((a, b) => scoreEmail(b, domain) - scoreEmail(a, domain));
}

async function fetchText(url, ms = 8000) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(ms),
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" },
    });
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
}

/** Harvest a real contact email + socials from the business's own website. */
export async function harvestContact(websiteUrl) {
  const out = { email: "", allEmails: [], instagram: "", source: "" };
  if (!websiteUrl) return out;
  let base;
  try {
    base = new URL(websiteUrl);
  } catch {
    return out;
  }
  const domain = base.hostname.replace(/^www\./, "");
  const paths = ["/", "/contact", "/contact-us", "/contacto", "/about", "/about-us", "/connect"];
  for (const p of paths) {
    const html = await fetchText(new URL(p, base.origin).toString());
    if (!html) continue;
    if (!out.instagram) {
      const ig = html.match(/instagram\.com\/([a-zA-Z0-9_.]{2,30})/i);
      if (ig && !["p", "reel", "explore", "accounts"].includes(ig[1])) out.instagram = `@${ig[1]}`;
    }
    const emails = usableEmails(html, domain);
    if (emails.length) {
      out.allEmails = emails;
      out.email = emails[0];
      out.source = new URL(p, base.origin).toString();
      break;
    }
  }
  return out;
}

/** Own brands and current clients are never prospects. */
function loadExclusions() {
  if (!fs.existsSync(EXCLUSIONS_PATH)) return { domains: [], emails: [] };
  const raw = JSON.parse(fs.readFileSync(EXCLUSIONS_PATH, "utf8"));
  return {
    domains: (raw.domains || []).map((d) => d.toLowerCase()),
    emails: (raw.emails || []).map((e) => e.toLowerCase()),
  };
}

/**
 * Contact quality, stated rather than guessed:
 *   A = role address on the business's own domain (info@theirsite.com)
 *   B = any address on the business's own domain, or a role address elsewhere
 *   C = free-mail or a third-party platform address — real, but weaker
 */
export function contactTier(email, domain) {
  const [local, host] = email.split("@");
  const ownDomain = host === domain || host.endsWith(`.${domain}`);
  const isRole = ROLE_PREFIXES.includes(local);
  const freeMail = /^(gmail|yahoo|hotmail|outlook|aol|icloud|bellsouth|live|msn)\./.test(host);
  if (ownDomain && isRole) return "A";
  if (ownDomain || (isRole && !freeMail)) return "B";
  return "C";
}

/** Apify returns neighbours and sometimes other states; keep the metro we paid for. */
export function inMarket(place, metro) {
  const state = (metro.match(/\b([A-Z]{2})\b\s*$/) || [])[1] || "";
  const hay = `${place.city} ${place.address || ""}`.toLowerCase();
  const cityName = metro.replace(/\s*[A-Z]{2}\s*$/, "").trim().toLowerCase();
  if (!hay.trim()) return true;
  if (hay.includes(cityName)) return true;
  // Same state is acceptable (neighbouring city in the same metro area).
  return state ? new RegExp(`\\b${state.toLowerCase()}\\b`).test(hay) : true;
}

/** A non-role address on someone else's domain is the prospect's web vendor, not the prospect. */
export function isVendorAddress(email, domain) {
  const [local, host] = email.split("@");
  const ownDomain = host === domain || host.endsWith(`.${domain}`);
  const freeMail = /^(gmail|yahoo|hotmail|outlook|aol|icloud|bellsouth|live|msn)\./.test(host);
  if (ownDomain || freeMail) return false;
  return !ROLE_PREFIXES.includes(local);
}

/* ------------------------------------------------------------- ledger ----- */

function readLedger() {
  if (!fs.existsSync(LEDGER_PATH)) return [];
  return fs
    .readFileSync(LEDGER_PATH, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      try { return JSON.parse(l); } catch { return null; }
    })
    .filter(Boolean);
}

function appendLedger(rows) {
  fs.mkdirSync(path.dirname(LEDGER_PATH), { recursive: true });
  fs.appendFileSync(LEDGER_PATH, rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
}

/* ------------------------------------------------------------- apify ------ */

async function discover({ token, queries, maxPlaces, language }) {
  const url = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${token}&timeout=600`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      searchStringsArray: queries,
      maxCrawledPlacesPerSearch: Math.max(1, Math.ceil(maxPlaces / queries.length)),
      language,
      skipClosedPlaces: true,
      scrapeContacts: false,
    }),
  });
  if (!res.ok) throw new Error(`Apify ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const items = await res.json();
  return (Array.isArray(items) ? items : []).map((p) => ({
    name: p.title || "",
    website: p.website || "",
    phone: p.phone || "",
    category: p.categoryName || "",
    city: p.city || "",
    address: p.address || "",
    rating: p.totalScore ?? null,
    reviews: p.reviewsCount ?? null,
    mapsUrl: p.url || "",
  }));
}

/* --------------------------------------------------------------- main ----- */

function arg(flag, fallback = null) {
  const i = process.argv.indexOf(flag);
  if (i === -1) return fallback;
  const v = process.argv[i + 1];
  return v && !v.startsWith("--") ? v : true;
}

export async function run() {
  const cfg = JSON.parse(fs.readFileSync(NICHES_PATH, "utf8"));

  if (process.argv.includes("--list")) {
    for (const n of [...cfg.niches].sort((a, b) => a.priority - b.priority)) {
      console.log(`P${n.priority}  ${n.id.padEnd(16)} ${n.label}`);
    }
    console.log(`\nMetros: ${cfg.metros.join(" | ")}`);
    return;
  }

  const nicheId = arg("--niche");
  const niche = cfg.niches.find((n) => n.id === nicheId);
  if (!niche) {
    console.error(`--niche required. One of: ${cfg.niches.map((n) => n.id).join(", ")}`);
    process.exit(2);
  }
  const metro = arg("--metro", cfg.metros[0]);
  const maxPlaces = Number(arg("--max-places", 40));
  const language = arg("--language", "en") === "es" ? "es" : "en";
  const dryRun = process.argv.includes("--dry-run");

  const token = loadApifyToken();
  if (!token) {
    console.error("No APIFY_API_TOKEN found in ~/.config/secrets.env or .env.local.");
    process.exit(3);
  }

  const queries = niche.queries.map((q) => `${q} in ${metro}`);
  console.log(`niche=${niche.id} metro="${metro}" cap=${maxPlaces} queries=${queries.length}`);
  if (dryRun) {
    console.log("--dry-run: would query Apify with:", queries);
    return;
  }

  const places = await discover({ token, queries, maxPlaces, language });
  console.log(`discovered ${places.length} place(s)`);

  const exclusions = loadExclusions();
  const seenDomains = new Set(readLedger().map((r) => r.domain));
  const kept = [];
  const dropped = [];

  for (const p of places.slice(0, maxPlaces)) {
    if (!inMarket(p, metro)) { dropped.push({ ...p, reason: "out of market" }); continue; }
    if (!p.website) { dropped.push({ ...p, reason: "no website" }); continue; }
    let domain;
    try { domain = new URL(p.website).hostname.replace(/^www\./, ""); } catch { dropped.push({ ...p, reason: "bad url" }); continue; }
    if (seenDomains.has(domain)) { dropped.push({ ...p, reason: "already in ledger" }); continue; }
    if (exclusions.domains.includes(domain)) { dropped.push({ ...p, reason: "excluded (own brand/client)" }); continue; }

    const contact = await harvestContact(p.website);
    if (!contact.email) { dropped.push({ ...p, reason: "no harvestable email" }); continue; }
    if (exclusions.emails.includes(contact.email)) { dropped.push({ ...p, reason: "excluded (own brand/client)" }); continue; }
    if (isVendorAddress(contact.email, domain)) { dropped.push({ ...p, reason: "vendor/webmaster address, not the business" }); continue; }

    seenDomains.add(domain);
    const { subject, html, text } = buildCompliantOutreachEmail({
      name: p.name,
      city: p.city || metro,
      igHandle: contact.instagram,
      language,
      email: contact.email,
    });

    kept.push({
      discovered_at: new Date().toISOString(),
      niche: niche.id,
      metro,
      domain,
      name: p.name,
      website: p.website,
      email: contact.email,
      alt_emails: contact.allEmails.slice(1, 4),
      email_source: contact.source,
      contact_tier: contactTier(contact.email, domain),
      instagram: contact.instagram || "",
      phone: p.phone,
      category: p.category,
      rating: p.rating,
      reviews: p.reviews,
      maps_url: p.mapsUrl,
      language,
      angle: language === "es" ? niche.angle_es : niche.angle_en,
      subject,
      status: "draft",
      sent_at: null,
      html_bytes: html.length,
      text,
    });
  }

  if (kept.length) appendLedger(kept.map(({ text: _t, ...r }) => r));

  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const outFile = path.join(DRAFTS_DIR, `${niche.id}-${metro.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${stamp}.json`);
  fs.writeFileSync(outFile, JSON.stringify({ niche: niche.id, metro, language, generated_at: new Date().toISOString(), kept, dropped }, null, 2));

  console.log(`kept ${kept.length} with a real email · dropped ${dropped.length}`);
  for (const r of kept) console.log(`  [${r.contact_tier}] ${r.email.padEnd(34)} ${r.name}`);
  const tiers = kept.reduce((a, r) => ((a[r.contact_tier] = (a[r.contact_tier] || 0) + 1), a), {});
  console.log("  contact tiers:", tiers);
  const reasons = dropped.reduce((a, d) => ((a[d.reason] = (a[d.reason] || 0) + 1), a), {});
  console.log("  drop reasons:", reasons);
  console.log(`drafts -> ${outFile}`);
  console.log(`ledger -> ${LEDGER_PATH} (${readLedger().length} total prospects)`);
  console.log("NOTHING WAS SENT. Sending stays in scripts/dispatch-morning-campaign.mjs (gated).");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((e) => { console.error(e); process.exit(1); });
}
