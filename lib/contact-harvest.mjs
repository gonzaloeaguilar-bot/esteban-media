/**
 * Contact harvesting — find a business's REAL contact email from its own site.
 *
 * WHY THIS EXISTS, MEASURED. The daily outreach dry-run on 2026-09-30 prepared
 * 3 drafts and skipped 19 as `fabricated_or_invalid_email`. The cause was not
 * the compliance guard — the guard was right. Exactly 3 of the 22 seed
 * prospects had a `website` field at all, and those 3 are the 3 that produced
 * drafts. There was nothing to harvest from for the other 19.
 *
 * The previous extractor (lib/website-email-extractor.mjs) fetched the HTML and
 * ran one email regex over it. Four things that misses, every one of them
 * common on a small-business site:
 *
 *   1. CLOUDFLARE OBFUSCATION. Cloudflare rewrites `hi@shop.com` into
 *      `<a class="__cf_email__" data-cfemail="HEX">`. The plaintext is GONE
 *      from the HTML. A regex sees nothing and the site reads as having no
 *      email — the single biggest false negative, and it is trivially
 *      reversible (first hex byte is the XOR key).
 *   2. HUMAN OBFUSCATION. "hola [at] restaurante [dot] com".
 *   3. JSON-LD. Restaurants ship `"email"` inside schema.org markup far more
 *      often than they put it in visible copy.
 *   4. ASSET AND JUNK FALSE POSITIVES. The old filter dropped `.png/.jpg/.svg`
 *      and `sentry`. It let through `.webp`, `.gif`, `u003e`-mangled strings,
 *      `noreply@`, `example@`, Wix/Squarespace build addresses, and Sentry DSNs
 *      on any other host — each of which then reads as a real prospect email.
 *
 * And it picked an ARBITRARY email. A site exposing `careers@`, `noreply@` and
 * `info@` would be pitched at whichever appeared first in the markup. This
 * scores candidates instead (see `scoreEmail`) so the pitch goes to the inbox a
 * human reads.
 *
 * Approach ported from the two references the ecosystem already trusts —
 * gosom/google-maps-scraper (6.2k stars, `-email` visits each business website)
 * and omkarcloud/website-email-contact-scraper (priority paths, dedupe and
 * score by prominence + domain similarity, `is_likely_official`).
 *
 * NO SMTP PROBING. Validation is MX-only (lib/email-validation.mjs). Opening
 * SMTP sessions against strangers' mail servers to test addresses is how a
 * sending domain gets blocklisted, which would cost Esteban the channel this
 * whole campaign exists to build.
 */

/** Pages worth asking first, in the order the references crawl them. */
export const PRIORITY_PATHS = [
  "",
  "/contact",
  "/contact-us",
  "/contacto",
  "/contactanos",
  "/about",
  "/about-us",
  "/nosotros",
  "/impressum",
];

/**
 * Local parts we must never pitch: nobody reads them, or replying is refused.
 * Kept as exact local parts (not substrings) — `info` must not be rejected for
 * containing `inf`, and a real `noreplycatering@` business address is not the
 * same string as `noreply@`.
 */
const UNREACHABLE_LOCAL_PARTS = new Set([
  "noreply",
  "no-reply",
  "donotreply",
  "do-not-reply",
  "postmaster",
  "mailer-daemon",
  "bounce",
  "bounces",
  "abuse",
  "unsubscribe",
  "privacy",
  "dmarc",
  "dmarc-reports",
]);

/**
 * Hosts that mean "this is not a business address": placeholder domains,
 * platform build artifacts, and error-reporting ingest hosts. Matched on the
 * registrable host or a suffix of it, never as a bare substring — `example.com`
 * must not reject `exampleframing.com`, a real Fort Lauderdale shop name shape.
 */
const NON_BUSINESS_HOSTS = [
  "example.com",
  "example.org",
  "example.net",
  "domain.com",
  "yourdomain.com",
  "email.com",
  "test.com",
  "sentry.io",
  "sentry-next.wixpress.com",
  "wixpress.com",
  "squarespace.com",
  "godaddy.com",
  "wordpress.com",
  "shopify.com",
  "cloudflare.com",
  "schema.org",
  "w3.org",
  "sentry.wixpress.com",
];

/**
 * Template placeholders left behind on REAL sites.
 *
 * Found in production, not imagined: the 2026-09-30 harvest pulled
 * `abc@xyz.com` off Elbo Room's genuine contact page — a Fort Lauderdale bar
 * that never removed the theme's dummy address. `xyz.com` resolves and has MX,
 * so neither the shape check nor the DNS check could catch it; it sailed
 * through as a prospect and became a draft addressed to nobody.
 *
 * Exact local parts and exact hosts, never substrings — the same discipline the
 * rest of this file uses, because `abc` appears inside plenty of real names.
 */
const PLACEHOLDER_LOCAL_PARTS = new Set([
  "abc",
  "xyz",
  "foo",
  "bar",
  "baz",
  "test",
  "tests",
  "testing",
  "sample",
  "example",
  "dummy",
  "email",
  "youremail",
  "your-email",
  "yourname",
  "your-name",
  "name",
  "firstname",
  "lastname",
  "user",
  "username",
  "someone",
  "somebody",
  "anybody",
  "johndoe",
  "john.doe",
  "janedoe",
  "jane.doe",
  "changeme",
  "replaceme",
  "placeholder",
]);

/** Hosts that only ever appear in a template's dummy address. */
const PLACEHOLDER_HOSTS = new Set([
  "xyz.com",
  "abc.com",
  "foo.com",
  "bar.com",
  "mail.com",
  "yourwebsite.com",
  "yoursite.com",
  "website.com",
  "mysite.com",
  "company.com",
  "business.com",
  "sitename.com",
]);

/** File extensions an email-shaped string is actually an asset filename for. */
const ASSET_SUFFIXES = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".avif",
  ".ico",
  ".bmp",
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".mp4",
  ".webm",
  ".pdf",
];

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}/g;

/**
 * Undo Cloudflare's email obfuscation.
 *
 * `data-cfemail` is the address XOR-ed byte by byte with a one-byte key, and
 * the key is the FIRST byte — so this is fully reversible with no network call
 * and no guessing. Without it, every Cloudflare-fronted site (a large share of
 * small-business sites) reports zero emails.
 */
export function decodeCloudflareEmail(hex) {
  if (typeof hex !== "string" || hex.length < 4 || hex.length % 2 !== 0) return null;
  if (!/^[0-9a-fA-F]+$/.test(hex)) return null;
  const key = parseInt(hex.slice(0, 2), 16);
  let out = "";
  for (let i = 2; i < hex.length; i += 2) {
    out += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ key);
  }
  // A wrong key yields mojibake, not an address. Make the caller prove it.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out) ? out.toLowerCase() : null;
}

/**
 * Turn "hola [at] sitio [dot] com" back into an address.
 *
 * The token MUST be delimited — bracketed, or whitespace on both sides. The
 * first version of this allowed a bare `at`, which matched INSIDE words: the
 * real Fort Lauderdale prospect "Boatyard" turned `hello [at] boatyard [dot]
 * com` into `bo@yard.com`, a plausible-looking address that does not exist.
 * Same substring trap that has cost this project a session three times.
 */
export function deobfuscateText(html) {
  const bracketed = (word) =>
    new RegExp(`\\s*(?:\\[|\\(|&#91;|&lbrack;)\\s*${word}\\s*(?:\\]|\\)|&#93;|&rbrack;)\\s*`, "gi");
  // Whitespace-delimited needs a real gap on BOTH sides, so `boatyard` cannot
  // match. `\s` — not `\b`, which a word boundary inside "boatyard" satisfies.
  const spaced = (word) => new RegExp(`\\s+${word}\\s+`, "gi");
  return html
    .replace(bracketed("(?:at|arroba)"), "@")
    .replace(bracketed("(?:dot|punto)"), ".")
    .replace(spaced("(?:at|arroba)"), "@")
    .replace(spaced("(?:dot|punto)"), ".");
}

function registrableHostOf(email) {
  return String(email).split("@")[1]?.toLowerCase() ?? "";
}

/**
 * Is this string an address we could actually pitch a human at?
 *
 * Deliberately NOT a deliverability check — that is MX's job. This only removes
 * strings that are not business addresses at all.
 */
export function isPlausibleBusinessEmail(email) {
  if (typeof email !== "string") return false;
  const value = email.toLowerCase().trim();
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(value)) return false;
  if (ASSET_SUFFIXES.some((suffix) => value.endsWith(suffix))) return false;
  // Minified JS and JSON-escaped HTML smear identifiers into email shapes.
  if (/u00[0-9a-f]{2}|\\x[0-9a-f]{2}|%[0-9a-f]{2}/i.test(value)) return false;

  const [localPart, host] = value.split("@");
  if (UNREACHABLE_LOCAL_PARTS.has(localPart)) return false;
  // Template dummies. Both halves are checked: `abc@realbakery.com` is somebody
  // testing their form, and `info@xyz.com` is a theme's placeholder.
  if (PLACEHOLDER_LOCAL_PARTS.has(localPart)) return false;
  if (PLACEHOLDER_HOSTS.has(host)) return false;
  // A Sentry DSN's public key is 32 hex chars; no human has that local part.
  if (/^[0-9a-f]{32}$/.test(localPart)) return false;
  if (
    NON_BUSINESS_HOSTS.some((bad) => host === bad || host.endsWith(`.${bad}`))
  ) {
    return false;
  }
  return true;
}

/**
 * How likely is this the inbox a human at the business reads?
 *
 * Prominence and domain similarity, exactly as the reference scraper ranks
 * them. Higher is better; the winner gets `isLikelyOfficial`.
 */
export function scoreEmail(email, { siteHost = "", onContactPage = false, inJsonLd = false } = {}) {
  const value = email.toLowerCase();
  const [localPart] = value.split("@");
  const host = registrableHostOf(value);
  let score = 0;

  // On the business's OWN domain is the single strongest signal that this is
  // the business, not a web designer's footer credit or a supplier.
  const bareSite = siteHost.replace(/^www\./, "").toLowerCase();
  if (bareSite && (host === bareSite || host.endsWith(`.${bareSite}`))) score += 50;
  else if (bareSite && bareSite.split(".")[0] && host.includes(bareSite.split(".")[0])) score += 20;

  // Where we found it.
  if (onContactPage) score += 15;
  if (inJsonLd) score += 10;

  // What kind of inbox it is. `info`/`hello`/`contact` are answered; `careers`
  // and `jobs` are answered by somebody who cannot buy video editing.
  if (["info", "hello", "hola", "contact", "contacto", "hi", "office"].includes(localPart)) score += 25;
  else if (["sales", "ventas", "booking", "reservations", "reservas", "events", "eventos", "marketing"].includes(localPart)) score += 20;
  else if (["admin", "team", "mail", "general"].includes(localPart)) score += 10;
  else if (["careers", "jobs", "hr", "empleo", "support", "help", "billing", "invoices", "accounting"].includes(localPart)) score -= 15;
  // A named human beats a role inbox for a one-person business pitch.
  else if (/^[a-z]+(\.[a-z]+)?$/.test(localPart) && localPart.length <= 20) score += 15;

  return score;
}

/**
 * Pull every candidate address out of one page's HTML.
 *
 * Returns candidates with WHERE each was found, because the caller scores on
 * provenance and a flat list of strings throws that away.
 */
/**
 * @param {string} html
 * @param {{ onContactPage?: boolean }} [options]
 * @returns {EmailCandidate[]}
 */
export function extractEmailsFromHtml(html, { onContactPage = false } = {}) {
  if (typeof html !== "string" || !html) return [];
  const found = new Map();

  const add = (raw, meta) => {
    if (!raw) return;
    const value = String(raw).toLowerCase().trim().replace(/^mailto:/, "").split("?")[0];
    if (!isPlausibleBusinessEmail(value)) return;
    const prev = found.get(value) || { email: value, onContactPage, inJsonLd: false };
    found.set(value, { ...prev, ...meta, onContactPage: prev.onContactPage || onContactPage });
  };

  // 1. Cloudflare-obfuscated. Must come first: these are invisible to the regex.
  for (const m of html.matchAll(/data-cfemail=["']([0-9a-fA-F]+)["']/g)) {
    add(decodeCloudflareEmail(m[1]), {});
  }

  // 2. mailto: links — an explicit declaration, not an incidental match.
  for (const m of html.matchAll(/mailto:([^"'>\s?]+)/gi)) add(m[1], {});

  // 3. JSON-LD `email`. Restaurants publish it here more than in visible copy.
  for (const m of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    for (const e of m[1].matchAll(/"email"\s*:\s*"([^"]+)"/g)) {
      add(e[1], { inJsonLd: true });
    }
  }

  // 4. Plain text, then the human-obfuscated form.
  for (const m of html.matchAll(EMAIL_RE)) add(m[0], {});
  for (const m of deobfuscateText(html).matchAll(EMAIL_RE)) add(m[0], {});

  return [...found.values()];
}

/**
 * Rank a page's candidates and name the best one.
 *
 * `isLikelyOfficial` marks the top scorer so the dispatcher never has to guess,
 * and every candidate keeps its score so a human reviewing the dry-run can see
 * WHY that inbox was chosen.
 */
/**
 * @typedef {{ email: string, onContactPage?: boolean, inJsonLd?: boolean }} EmailCandidate
 * @typedef {EmailCandidate & { score: number, isLikelyOfficial: boolean }} RankedEmail
 *
 * @param {EmailCandidate[]} candidates
 * @param {{ siteHost?: string }} [options]
 * @returns {RankedEmail[]}
 */
export function rankEmailCandidates(candidates, { siteHost = "" } = {}) {
  const scored = candidates
    .map((c) => ({ ...c, score: scoreEmail(c.email, { ...c, siteHost }) }))
    .sort((a, b) => b.score - a.score || a.email.localeCompare(b.email));
  return scored.map((c, i) => ({ ...c, isLikelyOfficial: i === 0 }));
}
