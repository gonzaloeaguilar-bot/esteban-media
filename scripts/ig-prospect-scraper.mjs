#!/usr/bin/env node
/**
 * Esteban Moreno Media — Instagram prospect lane (discovery + DM drafts only).
 *
 * Sibling of scripts/niche-prospect-scraper.mjs (the email lane). Same niches,
 * same exclusions, same ledger, same "nothing invented" discipline. The only
 * differences are the discovery surface (Instagram instead of Google Maps) and
 * the draft shape (a two-sentence DM instead of a compliant email).
 *
 * Apify actor: apify/instagram-scraper, searchType="user", resultsType="details".
 *   One call per search term returns the whole profile — username, fullName,
 *   biography, externalUrl, followersCount, isBusinessAccount,
 *   businessCategoryName, private, verified — at $0.0027/profile on the FREE
 *   tier. apify/instagram-profile-scraper was tested on the same handles and
 *   returned an IDENTICAL field set with no email either, so it adds a second
 *   paid step for nothing.
 *
 * MEASURED WALL (2026-10-06): neither actor returns the profile's public
 * business email. Verified live — elite.medspamiami is isBusinessAccount=true
 * and the payload has no public_email / businessEmail key at all. So an IG
 * email is only ever harvested from (a) the bio text, or (b) the linked
 * website, reusing harvestContact() from the email lane. A profile with
 * neither is still a valid DM prospect; it just has no email.
 *
 * Hard rules:
 *   - No fabricated handles, followers, emails or claims. Every drop states a reason.
 *   - Dedupe forever by HANDLE and by DOMAIN against the shared ledger, so a
 *     business already emailed never also gets a cold DM.
 *   - A DM is not an email: 1-2 sentences, no subject, no signature, no link,
 *     no price, no turnaround promise. validateDm() enforces it and a draft
 *     that fails is dropped, not shipped.
 *   - Spanish by default (Miami). Nothing sends; there is no send path here.
 *
 * Usage:
 *   node scripts/ig-prospect-scraper.mjs --niche creators --metro "Miami FL"
 *   node scripts/ig-prospect-scraper.mjs --niche med-spa --max-profiles 20
 *   node scripts/ig-prospect-scraper.mjs --list
 */

import fs from "fs";
import path from "path";

import { contactTier, harvestContact, usableEmails } from "./niche-prospect-scraper.mjs";

const ROOT = process.cwd();
const NICHES_PATH = path.join(ROOT, "data", "outreach", "niches.json");
const EXCLUSIONS_PATH = path.join(ROOT, "data", "outreach", "exclusions.json");
// Third-party contact data NEVER enters this public repo.
const STATE_DIR = process.env.ESTEBAN_OUTREACH_STATE
  || path.join(process.env.HOME, ".claude", "state", "esteban-outreach");
const LEDGER_PATH = path.join(STATE_DIR, "prospect-ledger.jsonl");
const DRAFTS_DIR = path.join(STATE_DIR, "dm-drafts");

const ACTOR = "apify~instagram-scraper";

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

/* ------------------------------------------------------------ discovery --- */

/**
 * Instagram user search terms for a niche in a metro.
 * A niche may pin its own `ig_terms`; otherwise the Maps queries are reused,
 * which is the point of sharing niches.json. The city name (not the state
 * code) is appended because IG's user search matches names and bios, not
 * addresses — "gym in Fort Lauderdale FL" returns nothing useful.
 */
export function igSearchTerms(niche, metro) {
  const city = String(metro || "").replace(/\s*[A-Z]{2}\s*$/, "").trim();
  const base = (niche.ig_terms && niche.ig_terms.length ? niche.ig_terms : niche.queries) || [];
  const seen = new Set();
  const out = [];
  for (const q of base) {
    const term = city ? `${q} ${city}` : String(q);
    const key = term.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(term);
  }
  return out;
}

/* ------------------------------------------------------------ qualify ----- */

// Handles that are a platform surface, not a prospect.
const HANDLE_DENY = [
  "instagram", "explore", "reel", "reels", "stories", "accounts", "p",
  "estebanmorenomedia", "gonzalitoodice",
];

// Handles are concatenated, so \b never fires: /\bleads\b/ could not see
// "leads" inside "miamimedspaleads". Match the token anywhere in the handle,
// and keep "seo" boundary-anchored so Spanish words like "paseos" survive.
const LEAD_FARM_TOKENS = ["leads", "smma", "dropship", "growthhack", "marketingagency", "agencyowner"];
const LEAD_FARM_SEO_RE = /(^|[._-])seo([._-]|$)/i;

export function isLeadFarmHandle(handle) {
  const h = String(handle || "").toLowerCase();
  if (!h) return false;
  if (LEAD_FARM_SEO_RE.test(h)) return true;
  const flat = h.replace(/[._-]/g, "");
  return LEAD_FARM_TOKENS.some((t) => flat.includes(t));
}

/**
 * Is this profile a prospect at all? Returns { ok, reason }.
 * Every rejection names itself; nothing is silently skipped.
 *
 *   minFollowers — below this an account has no content operation to help with
 *   maxFollowers — above this they have an in-house team or an agency already
 */
export function qualifyProfile(p, { minFollowers = 500, maxFollowers = 250000 } = {}) {
  const handle = String(p.username || "").toLowerCase();
  if (!handle) return { ok: false, reason: "no handle" };
  if (HANDLE_DENY.includes(handle)) return { ok: false, reason: "platform/own account" };
  if (p.private) return { ok: false, reason: "private account" };
  // Number(null) is 0, which read as "under 500" and hid a missing count
  // behind a real-looking reason. Absence is checked before the band.
  if (p.followersCount === null || p.followersCount === undefined || p.followersCount === "") {
    return { ok: false, reason: "no follower count" };
  }
  const followers = Number(p.followersCount);
  if (!Number.isFinite(followers)) return { ok: false, reason: "no follower count" };
  if (followers < minFollowers) return { ok: false, reason: `under ${minFollowers} followers` };
  if (followers > maxFollowers) return { ok: false, reason: `over ${maxFollowers} followers` };
  if (Number(p.postsCount) === 0) return { ok: false, reason: "no posts" };
  if (isLeadFarmHandle(handle)) return { ok: false, reason: "lead-gen/agency farm handle" };
  return { ok: true, reason: "" };
}

/** The domain behind a profile's link, or "" — linktr.ee etc. is not a domain we own a lead on. */
// Link aggregators AND booking/commerce vendors. Both are someone else's
// domain: harvesting one returns the VENDOR's address, not the prospect's.
// Live run 2026-10-06 (med-spa Fort Lauderdale) surfaced 8 of 9 prospects
// behind linktr.ee or msha.ke and one behind squareup.com — which is exactly
// how a scraper ends up pitching Square.
const LINK_AGGREGATORS = [
  "linktr.ee", "beacons.ai", "bio.link", "linkin.bio", "lnk.bio", "taplink.cc",
  "msha.ke", "campsite.bio", "flowcode.com", "milkshake.app", "solo.to",
  "squareup.com", "square.site", "booksy.com", "vagaro.com", "calendly.com",
  "fresha.com", "styleseat.com", "schedulicity.com", "glossgenius.com",
  "wa.me", "api.whatsapp.com", "linktree.com",
];

export function profileDomain(externalUrl) {
  if (!externalUrl) return "";
  let host;
  try {
    host = new URL(externalUrl).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
  if (LINK_AGGREGATORS.includes(host)) return "";
  // Social profiles are not the business's own site.
  if (/(^|\.)(instagram|facebook|tiktok|youtube|twitter|x)\.com$/.test(host)) return "";
  return host;
}

/** An email written in the bio is the owner publishing it themselves. */
export function emailFromBio(biography, domain = "") {
  return usableEmails(String(biography || ""), domain)[0] || "";
}

/**
 * Choose the contact to record, stating where it came from.
 * Bio wins over a site harvest: the owner typed it on their own profile.
 * A profile with no email is still a DM prospect — email is a bonus, not a gate.
 */
export function pickContact({ bioEmail = "", siteEmail = "", siteSource = "", domain = "" } = {}) {
  if (bioEmail) {
    return { email: bioEmail, email_source: "instagram bio", contact_tier: contactTier(bioEmail, domain) };
  }
  if (siteEmail) {
    return { email: siteEmail, email_source: siteSource || "linked website", contact_tier: contactTier(siteEmail, domain) };
  }
  return { email: "", email_source: "", contact_tier: "" };
}

/* -------------------------------------------------------------- dedupe ---- */

export function readLedger(ledgerPath = LEDGER_PATH) {
  if (!fs.existsSync(ledgerPath)) return [];
  return fs
    .readFileSync(ledgerPath, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      try { return JSON.parse(l); } catch { return null; }
    })
    .filter(Boolean);
}

/**
 * Build the perpetual dedupe index from ledger rows written by EITHER lane.
 * Handles are compared without the @ and case-folded; the email lane stores a
 * harvested handle in `instagram`, and this lane stores it in `handle`.
 */
export function ledgerIndex(rows) {
  const handles = new Set();
  const domains = new Set();
  for (const r of rows || []) {
    for (const h of [r.handle, r.instagram]) {
      const clean = String(h || "").trim().replace(/^@/, "").toLowerCase();
      if (clean) handles.add(clean);
    }
    const d = String(r.domain || "").trim().toLowerCase();
    if (d) domains.add(d);
  }
  return { handles, domains };
}

/**
 * Already contacted — by handle OR by domain. The domain check is the point:
 * a shop emailed at info@theshop.com must not also get a cold DM on the
 * Instagram account that links to theshop.com.
 */
export function isDuplicate({ handle = "", domain = "" }, index) {
  const h = String(handle).replace(/^@/, "").toLowerCase();
  if (h && index.handles.has(h)) return { dup: true, reason: "handle already in ledger" };
  const d = String(domain).toLowerCase();
  if (d && index.domains.has(d)) return { dup: true, reason: "domain already in ledger (emailed)" };
  return { dup: false, reason: "" };
}

/* ------------------------------------------------------------- dm draft --- */

/**
 * A DM is not an email. Two sentences, lowercase energy, no link, no price,
 * no promise. The offer is the CONFIRMED one only: remote editing of footage
 * the client already records (see lib/compliant-outreach-email.mjs).
 */
export function buildDmDraft({ fullName = "", username = "", language = "es" } = {}) {
  // A profile name is interpolated into the sentence, so punctuation inside it
  // becomes a sentence boundary: live run 2026-10-06 dropped a real prospect for
  // "more than 2 sentences" purely because its name carried a period. Strip the
  // characters that end a sentence; the name is a greeting, not prose.
  const who = (fullName || "")
    .trim()
    .split(/[|•\-—]/)[0]
    .replace(/[.!?]+/g, "")
    .replace(/\s+/g, " ")
    .trim() || `@${username}`;
  if (language === "en") {
    return `Hey ${who}, saw what you post on Instagram. I edit video remotely for businesses that already film their own footage, so if the editing piles up on you, tell me about it.`;
  }
  return `Hola ${who}, vi lo que publican en Instagram. Edito video de forma remota para negocios que ya graban su propio material, así que si la edición se les acumula, me cuentan.`;
}

const DM_MAX_CHARS = 330;
const DM_MAX_SENTENCES = 2;

// Each entry is [label, regex]. A hit is a violation, with the label as the reason.
const DM_FORBIDDEN = [
  ["contains a link", /https?:\/\/|www\.|\.com\b|\.co\b|\bbit\.ly\b/i],
  ["contains a price", /\$\s?\d|\b\d+\s?(usd|dólares|dolares|eur)\b|\bprecio\b|\btarifa\b|\bpaquete\b|\bgratis\b|\bfree\b/i],
  ["promises a turnaround", /\b\d+\s*(h|hr|hrs|horas?|días?|dias?|days?|semanas?|weeks?)\b|\b24\/7\b|\bentrega en\b|\bturnaround\b|\bsame.?day\b/i],
  ["promises a result or guarantee", /\bgarant|\bguarantee|\bviral\b|\bresultados garantizados\b|\btriplic|\bdoubl(e|ing) your\b|\bx\d+\s*(más|mas|more)\b/i],
  ["claims drone work", /\bdron(e|es)?\b|\baéreo\b|\baereo\b|\bpart\s?107\b/i],
  ["claims full bilingual", /\bbiling/i],
  ["offers an audit or web/SEO work", /\bauditor[ií]a\b|\baudit\b|\bseo\b|\bp[áa]gina web\b|\bwebsite design\b/i],
  ["has an email subject line", /^\s*(asunto|subject)\s*:/im],
  ["has a corporate signature", /\b(un saludo|saludos cordiales|best regards|sincerely|atentamente)\b|Esteban Moreno Media/i],
  ["pastes an email address", /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i],
];

/**
 * Validate a DM draft. Returns { ok, violations: [reason] }.
 * This is the gate: a draft that fails is DROPPED with its reasons, never
 * written to the queue, because a bad cold DM costs the account, not a click.
 */
export function validateDm(text, { maxChars = DM_MAX_CHARS, maxSentences = DM_MAX_SENTENCES } = {}) {
  const violations = [];
  const body = String(text || "").trim();
  if (!body) return { ok: false, violations: ["empty draft"] };
  if (body.length > maxChars) violations.push(`over ${maxChars} characters`);
  const sentences = body.split(/[.!?]+\s|[.!?]+$/).map((s) => s.trim()).filter(Boolean);
  if (sentences.length > maxSentences) violations.push(`more than ${maxSentences} sentences`);
  if (/\n\s*\n/.test(body)) violations.push("multi-paragraph (reads as an email)");
  for (const [label, re] of DM_FORBIDDEN) {
    if (re.test(body)) violations.push(label);
  }
  return { ok: violations.length === 0, violations };
}

/* ------------------------------------------------------------- exclusions -- */

function loadExclusions() {
  if (!fs.existsSync(EXCLUSIONS_PATH)) return { domains: [], emails: [] };
  const raw = JSON.parse(fs.readFileSync(EXCLUSIONS_PATH, "utf8"));
  return {
    domains: (raw.domains || []).map((d) => d.toLowerCase()),
    emails: (raw.emails || []).map((e) => e.toLowerCase()),
  };
}

/* ----------------------------------------------------------------- apify -- */

async function discoverProfiles({ token, terms, perTerm }) {
  const url = `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${token}&timeout=600`;
  const out = [];
  for (const term of terms) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        search: term,
        searchType: "user",
        searchLimit: perTerm,
        resultsType: "details",
        resultsLimit: 1,
      }),
    });
    if (!res.ok) throw new Error(`Apify ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const items = await res.json();
    for (const p of Array.isArray(items) ? items : []) {
      out.push({
        searchTerm: term,
        username: p.username || "",
        fullName: p.fullName || "",
        biography: p.biography || "",
        followersCount: p.followersCount ?? null,
        postsCount: p.postsCount ?? null,
        isBusinessAccount: Boolean(p.isBusinessAccount),
        businessCategoryName: p.businessCategoryName || "",
        externalUrl: p.externalUrl || "",
        private: Boolean(p.private),
        verified: Boolean(p.verified),
        url: p.url || (p.username ? `https://www.instagram.com/${p.username}` : ""),
      });
    }
  }
  return out;
}

function appendLedger(rows) {
  fs.mkdirSync(path.dirname(LEDGER_PATH), { recursive: true });
  fs.appendFileSync(LEDGER_PATH, rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
}

/* ------------------------------------------------------------------ main -- */

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
      const tag = n.ig_terms?.length ? "ig" : "  ";
      console.log(`P${n.priority} ${tag} ${n.id.padEnd(16)} ${n.label}`);
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
  const maxProfiles = Number(arg("--max-profiles", 30));
  const language = arg("--language", "es") === "en" ? "en" : "es";
  const minFollowers = Number(arg("--min-followers", 500));
  const maxFollowers = Number(arg("--max-followers", 250000));
  const dryRun = process.argv.includes("--dry-run");

  const token = loadApifyToken();
  if (!token) {
    console.error("No APIFY_API_TOKEN found in ~/.config/secrets.env or .env.local.");
    process.exit(3);
  }

  const terms = igSearchTerms(niche, metro);
  const perTerm = Math.max(1, Math.ceil(maxProfiles / terms.length));
  console.log(`niche=${niche.id} metro="${metro}" lang=${language} cap=${maxProfiles} terms=${terms.length} perTerm=${perTerm}`);
  if (dryRun) {
    console.log("--dry-run: would search Instagram for:", terms);
    return;
  }

  const profiles = await discoverProfiles({ token, terms, perTerm });
  console.log(`discovered ${profiles.length} profile(s)`);

  const exclusions = loadExclusions();
  const index = ledgerIndex(readLedger());
  const kept = [];
  const dropped = [];

  for (const p of profiles.slice(0, maxProfiles)) {
    const record = (reason) => dropped.push({ handle: p.username, name: p.fullName, followers: p.followersCount, reason });

    const q = qualifyProfile(p, { minFollowers, maxFollowers });
    if (!q.ok) { record(q.reason); continue; }

    const domain = profileDomain(p.externalUrl);
    if (domain && exclusions.domains.includes(domain)) { record("excluded (own brand/client)"); continue; }

    const dup = isDuplicate({ handle: p.username, domain }, index);
    if (dup.dup) { record(dup.reason); continue; }

    // Enrichment, reusing the email lane's harvester rather than a second copy.
    const bioEmail = emailFromBio(p.biography, domain);
    let siteEmail = "";
    let siteSource = "";
    if (!bioEmail && domain) {
      const harvested = await harvestContact(p.externalUrl);
      siteEmail = harvested.email;
      siteSource = harvested.source;
    }
    const contact = pickContact({ bioEmail, siteEmail, siteSource, domain });
    if (contact.email && exclusions.emails.includes(contact.email)) { record("excluded (own brand/client)"); continue; }

    const dm = buildDmDraft({ fullName: p.fullName, username: p.username, language });
    const check = validateDm(dm);
    if (!check.ok) { record(`DM failed guardrails: ${check.violations.join("; ")}`); continue; }

    // Claim both keys so one run cannot queue the same business twice.
    index.handles.add(p.username.toLowerCase());
    if (domain) index.domains.add(domain);

    kept.push({
      discovered_at: new Date().toISOString(),
      channel: "instagram",
      niche: niche.id,
      metro,
      handle: p.username,
      profile_url: p.url,
      name: p.fullName,
      bio: p.biography,
      followers: p.followersCount,
      posts: p.postsCount,
      is_business_account: p.isBusinessAccount,
      ig_category: p.businessCategoryName,
      verified: p.verified,
      website: p.externalUrl,
      domain,
      email: contact.email,
      email_source: contact.email_source,
      contact_tier: contact.contact_tier,
      language,
      angle: language === "es" ? niche.angle_es : niche.angle_en,
      search_term: p.searchTerm,
      dm_draft: dm,
      status: "draft",
      sent_at: null,
    });
  }

  if (kept.length) appendLedger(kept);

  fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().slice(0, 10);
  const outFile = path.join(
    DRAFTS_DIR,
    `${niche.id}-${String(metro).replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-${stamp}.json`,
  );
  fs.writeFileSync(outFile, JSON.stringify({
    niche: niche.id, metro, language, actor: ACTOR,
    generated_at: new Date().toISOString(), kept, dropped,
  }, null, 2));

  const withEmail = kept.filter((r) => r.email).length;
  console.log(`kept ${kept.length} DM prospect(s) · ${withEmail} also carry a real email · dropped ${dropped.length}`);
  for (const r of kept) {
    console.log(`  @${r.handle.padEnd(24)} ${String(r.followers).padStart(7)} followers  ${r.email || "(no email)"}`);
  }
  const tiers = kept.reduce((a, r) => (r.contact_tier ? ((a[r.contact_tier] = (a[r.contact_tier] || 0) + 1), a) : a), {});
  console.log("  contact tiers:", tiers);
  const reasons = dropped.reduce((a, d) => ((a[d.reason] = (a[d.reason] || 0) + 1), a), {});
  console.log("  drop reasons:", reasons);
  console.log(`dm drafts -> ${outFile}`);
  console.log(`ledger    -> ${LEDGER_PATH} (${readLedger().length} total prospects, both lanes)`);
  console.log("NOTHING WAS SENT. There is no IG send path in this repo: no MANYCHAT_API_KEY and no INSTAGRAM_TOKEN on this machine.");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((e) => { console.error(e); process.exit(1); });
}
