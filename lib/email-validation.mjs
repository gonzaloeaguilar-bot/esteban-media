/**
 * Email validation — MX only, deliberately.
 *
 * The question this answers is narrow and it is the one that matters: can the
 * domain in this address receive mail at all? That kills every fabricated
 * address (the failure mode that skipped 19 of 22 prospects on 2026-09-30)
 * without ever touching a stranger's mail server.
 *
 * WHAT THIS DOES NOT DO, ON PURPOSE:
 *
 *   No SMTP probe. Opening a session and running RCPT TO against a third-party
 *   mail server to test whether one mailbox exists is what gets a sending
 *   domain blocklisted, and the outreach channel is the asset here — burning
 *   estebanmorenomedia.com's reputation to validate a list would cost more than
 *   the list is worth. Most providers answer "accept everything" anyway
 *   (catch-all), so the probe returns a confident non-answer.
 *
 *   No paid verification API. `verifyLeadsEnrichmentEmails` on the Apify actor
 *   does this and is billed per lead; MX is free and removes the same class of
 *   garbage. If a paid pass is ever wanted it belongs behind an explicit flag
 *   with a stated cost, not on by default in a daily loop.
 *
 * Results are cached per domain for the life of the process: a 40-prospect run
 * over 12 distinct domains should do 12 lookups, not 40.
 */

import { promises as dns } from "node:dns";

/**
 * The only two lookups this module performs.
 *
 * Declared as a MINIMAL shape rather than `typeof dns` on purpose: a caller
 * injecting a test double should not have to implement forty unrelated DNS
 * methods to answer "does this domain take mail". Typecheck caught the
 * overclaim.
 *
 * @typedef {{
 *   resolveMx: (host: string) => Promise<Array<{ exchange: string, priority: number }>>,
 *   resolve?: (host: string) => Promise<string[]>,
 * }} MxResolver
 */

/**
 * Domains that accept signups but not real business mail. A prospect on one of
 * these is a person, not a business inbox we can pitch a service to — and the
 * outreach list is businesses.
 */
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
]);

const mxCache = new Map();

/**
 * Does this domain publish a mail exchanger?
 *
 * A domain with no MX and no A record cannot receive mail — that is a
 * fabricated or dead address. A domain that resolves but publishes no MX is
 * reported separately (`no_mx`) rather than lumped in with "invalid", because
 * the two mean different things and a caller may want to keep one.
 */
/**
 * @param {string} domain
 * @param {{ resolver?: MxResolver }} [options]
 */
export async function domainAcceptsMail(domain, { resolver = /** @type {MxResolver} */ (dns) } = {}) {
  const host = String(domain || "").toLowerCase().trim();
  if (!host) return { ok: false, reason: "empty_domain" };
  if (mxCache.has(host)) return mxCache.get(host);

  let result;
  try {
    const records = await resolver.resolveMx(host);
    result =
      Array.isArray(records) && records.length > 0
        ? { ok: true, reason: "mx", mx: records.map((r) => r.exchange).slice(0, 3) }
        : { ok: false, reason: "no_mx" };
  } catch (error) {
    // ENOTFOUND / ENODATA on MX is not yet a verdict: RFC 5321 lets a host with
    // only an A record accept mail (the "implicit MX"), and small restaurants
    // on cheap hosting hit exactly that. Ask for the A record before rejecting.
    try {
      const a = await resolver.resolve?.(host);
      result =
        Array.isArray(a) && a.length > 0
          ? { ok: true, reason: "implicit_mx_a_record" }
          : { ok: false, reason: String(error?.code || "dns_error").toLowerCase() };
    } catch {
      result = { ok: false, reason: String(error?.code || "dns_error").toLowerCase() };
    }
  }

  mxCache.set(host, result);
  return result;
}

/**
 * Full verdict for one address: shape, disposability, then the DNS question.
 *
 * Returns `{ ok, reason }` so a caller can log WHY a prospect was dropped. A
 * bare boolean is what made the previous run report 19 identical
 * `fabricated_or_invalid_email` lines with no way to tell a typo from a dead
 * domain from a missing website.
 */
/**
 * @param {string} email
 * @param {{ resolver?: MxResolver }} [options]
 */
export async function validateEmail(email, { resolver = /** @type {MxResolver} */ (dns) } = {}) {
  const value = String(email || "").toLowerCase().trim();
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) {
    return { email: value, ok: false, reason: "malformed" };
  }
  const domain = value.split("@")[1];
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { email: value, ok: false, reason: "disposable_domain" };
  }
  const mx = await domainAcceptsMail(domain, { resolver });
  return { email: value, ok: mx.ok, reason: mx.reason, mx: mx.mx };
}

/** Clear the per-process cache. Tests need this; production does not call it. */
export function _resetMxCache() {
  mxCache.clear();
}
