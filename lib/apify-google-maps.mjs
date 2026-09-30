/**
 * Google Maps prospect discovery via Apify.
 *
 * WHY APIFY AND NOT OUR OWN SCRAPER. Standing decision in this ecosystem:
 * blocked sources go through the paid Apify lane, never a hand-rolled stealth
 * scraper. Google Maps is the canonical blocked source — it is the one surface
 * where rolling our own means a permanent maintenance tax and an IP-reputation
 * risk for zero upside.
 *
 * ACTOR: `compass/crawler-google-places` (id nwua9Gu5YrADL7ZDj), the official
 * one. Every field name below was read from the LIVE input schema of build
 * 0.14.761 on 2026-09-30, not from documentation and not from memory:
 *
 *   searchStringsArray          the queries
 *   locationQuery               one location per run (the schema says so)
 *   maxCrawledPlacesPerSearch   the cap per query
 *   website: "withWebsite"      <- THE FIX
 *   scrapeContacts              add-on: emails + socials from the website
 *   skipClosedPlaces            a closed restaurant is not a prospect
 *   searchMatching: "all"       as Google returns them
 *
 * `website: "withWebsite"` is the whole point. The 2026-09-30 dry-run skipped 19
 * of 22 prospects because exactly 3 had a `website` field — and a business with
 * no website has no page to harvest an email from, so it can never become a
 * lead no matter how good the extractor is. Asking Google Maps to return only
 * places that HAVE a website removes that failure at the source rather than
 * discovering it 19 times a day.
 *
 * COST. `scrapeContacts` and `verifyLeadsEnrichmentEmails` are both billed
 * add-ons. Contacts is on (it is the reason we are here); verification is OFF —
 * lib/email-validation.mjs answers the same question with a free MX lookup.
 * Every run states its own ceiling before it starts.
 */

const ACTOR = "compass~crawler-google-places";
const API = "https://api.apify.com/v2";

/**
 * Read the token the way the rest of the ecosystem stores it.
 *
 * Returns null rather than throwing: a missing token is a REPORTABLE state (the
 * caller falls back and says so), not a crash.
 */
export function apifyToken(env = process.env) {
  return env.APIFY_API_TOKEN || env.APIFY_TOKEN || null;
}

/**
 * Build the actor input. Pure, so a test can assert the fields without running
 * anything — which is the only way to catch a renamed field before it silently
 * returns places without websites again.
 */
/**
 * @param {{
 *   searches: string[],
 *   location: string,
 *   maxPerSearch?: number,
 *   language?: string,
 *   scrapeContacts?: boolean,
 *   verifyEmails?: boolean,
 * }} options
 */
export function buildMapsInput({
  searches,
  location,
  maxPerSearch = 20,
  language = "en",
  scrapeContacts = true,
  verifyEmails = false,
}) {
  if (!Array.isArray(searches) || searches.length === 0) {
    throw new Error("buildMapsInput: searches must be a non-empty array");
  }
  if (!location) throw new Error("buildMapsInput: location is required");
  return {
    searchStringsArray: searches,
    locationQuery: location,
    maxCrawledPlacesPerSearch: maxPerSearch,
    language,
    // Only places that HAVE a website — see the header. Without this the run
    // returns businesses with nothing to harvest from.
    website: "withWebsite",
    skipClosedPlaces: true,
    searchMatching: "all",
    scrapeContacts,
    // Paid per lead. MX validation is free and answers the same question.
    verifyLeadsEnrichmentEmails: verifyEmails,
  };
}

/**
 * Classify an Apify failure so the caller can tell a wall from a bug.
 *
 * Measured 2026-09-30: `GET /users/me` returned HTTP 200 while `POST /runs`
 * returned `platform-feature-disabled: Monthly usage hard limit exceeded`. A
 * token that authenticates is NOT a lane that can run, and treating the 200 as
 * readiness is how a loop reports "no prospects found" for three days instead
 * of "the plan is capped until the cycle resets".
 */
export function classifyApifyError(status, body) {
  const type = body?.error?.type || "";
  const message = body?.error?.message || `HTTP ${status}`;
  if (type === "platform-feature-disabled" && /usage hard limit/i.test(message)) {
    return { wall: "usage_cap_exceeded", retryable: false, message };
  }
  if (status === 401 || status === 403) {
    return { wall: "auth", retryable: false, message };
  }
  if (status === 429) return { wall: "rate_limit", retryable: true, message };
  if (status >= 500) return { wall: "apify_5xx", retryable: true, message };
  return { wall: "unknown", retryable: false, message };
}

/**
 * Report whether the lane can actually run, and why not if it cannot.
 *
 * Reads the account's own usage figures rather than guessing, so the number in
 * the report is Apify's number.
 */
export async function apifyLaneHealth({ token = apifyToken(), fetchImpl = fetch } = {}) {
  if (!token) return { ok: false, wall: "no_token", message: "APIFY_API_TOKEN is not set" };
  try {
    const [meRes, usageRes] = await Promise.all([
      fetchImpl(`${API}/users/me?token=${token}`),
      fetchImpl(`${API}/users/me/usage/monthly?token=${token}`),
    ]);
    if (!meRes.ok) {
      return { ok: false, wall: "auth", message: `users/me HTTP ${meRes.status}` };
    }
    const me = (await meRes.json())?.data ?? {};
    const usage = usageRes.ok ? ((await usageRes.json())?.data ?? {}) : {};
    const cap = me?.plan?.maxMonthlyUsageUsd ?? null;
    const spent = usage?.totalUsageCreditsUsdAfterVolumeDiscount ?? null;
    const resetsAt = usage?.usageCycle?.endAt ?? null;
    if (cap != null && spent != null && spent >= cap) {
      return {
        ok: false,
        wall: "usage_cap_exceeded",
        message: `Apify ${me?.plan?.id ?? "plan"} cap $${cap} reached ($${Number(spent).toFixed(2)} used); resets ${String(resetsAt).slice(0, 10)}`,
        cap,
        spent,
        resetsAt,
      };
    }
    return { ok: true, plan: me?.plan?.id ?? null, cap, spent, resetsAt };
  } catch (error) {
    return { ok: false, wall: "network", message: String(error?.message || error) };
  }
}

/**
 * Run the actor and return its dataset items.
 *
 * Uses `run-sync-get-dataset-items`, which blocks until the run finishes and
 * hands back the rows in one call — no polling loop to get wrong, and no
 * half-read dataset if the process dies mid-poll.
 */
export async function runMapsSearch(input, { token = apifyToken(), fetchImpl = fetch, timeoutSecs = 900 } = {}) {
  if (!token) throw new Error("runMapsSearch: APIFY_API_TOKEN is not set");
  const url = `${API}/acts/${ACTOR}/run-sync-get-dataset-items?token=${token}&timeout=${timeoutSecs}`;
  const res = await fetchImpl(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    let body = null;
    try {
      body = await res.json();
    } catch {
      /* a non-JSON error body is still an error; classify on status alone */
    }
    const verdict = classifyApifyError(res.status, body);
    const error = new Error(`Apify ${ACTOR}: ${verdict.message}`);
    error.wall = verdict.wall;
    error.retryable = verdict.retryable;
    throw error;
  }
  const items = await res.json();
  return Array.isArray(items) ? items : [];
}

/**
 * Map an Apify place row onto the prospect shape the dispatcher already loads.
 *
 * The dispatcher reads `scripts/data/discovered-prospects.json` with
 * `{name, website, city, segment, language, ...}`. Emitting that exact shape is
 * what makes this a drop-in source rather than a second pipeline.
 *
 * `emails` from `scrapeContacts` are CANDIDATES, not verdicts — they go through
 * the same ranking and MX validation as anything we harvest ourselves, because
 * the add-on returns `noreply@` and web-designer footers like any other crawler.
 */
export function placeToProspect(place, { segment = "local-business", language = "en" } = {}) {
  const website = place?.website || place?.url || "";
  const contacts = place?.contactDetails ?? place ?? {};
  const emails = [
    ...(Array.isArray(contacts.emails) ? contacts.emails : []),
    ...(Array.isArray(place?.emails) ? place.emails : []),
  ];
  return {
    id: place?.placeId || place?.cid || null,
    name: place?.title || place?.name || "",
    segment,
    city: place?.city || place?.neighborhood || "",
    state: place?.state || "",
    language,
    website,
    phone: place?.phone || place?.phoneUnformatted || "",
    igHandle:
      (Array.isArray(contacts.instagrams) && contacts.instagrams[0]) ||
      place?.instagram ||
      "",
    categories: Array.isArray(place?.categories) ? place.categories : [],
    totalScore: place?.totalScore ?? null,
    reviewsCount: place?.reviewsCount ?? null,
    // Provenance, so a human reading the dry-run knows where this came from.
    source: "apify:compass/crawler-google-places",
    candidateEmails: [...new Set(emails.map((e) => String(e).toLowerCase().trim()))],
  };
}
