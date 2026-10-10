#!/usr/bin/env node
/**
 * sync-google-reviews.mjs — refresh data/google-reviews.json from the live
 * Google Business Profile (Google Maps) via the Places API.
 *
 * WHY A SCRIPT AND NOT A KEYED FETCH AT REQUEST TIME
 *
 * The Places API returns a ROTATING SAMPLE of ~5 reviews per call (verified
 * 2026-08-14: two calls minutes apart returned different fives), so a page
 * fetched live would show a different reviewer list on every render — and a
 * static build cannot re-verify a quote it serves. The site therefore serves
 * a dated snapshot, and this script is how the snapshot moves.
 *
 * WHAT IT MAY WRITE (and nothing else)
 *
 *   · profile.rating / profile.reviewCount / profile.reviewsSampled
 *   · sampledAuthors — who happened to be in this call's sample
 *   · readAt — the date this reading happened
 *   · an existing quote's readAt — ONLY when its text is verifiably present
 *     in the live sample (first 60 chars matched, the same rule
 *     esteban-review-watch.py uses). Absence from the sample is NOT evidence
 *     of deletion, so a missing quote is left untouched, never removed.
 *
 * It never authors, edits, or adds review text. Provenance stays mechanical:
 * lib/__tests__/client-reviews.test.ts gates what the site may publish.
 *
 * GRACEFUL BY DESIGN
 *
 * Quota on the shared billing project is finite and other jobs spend it. On
 * any HTTP error (429 quota exhausted, 403 denied, 5xx), a network failure,
 * or malformed credentials, the existing snapshot is kept UNCHANGED and the
 * script exits 0 with a notice — a CI run that cannot read the source must
 * never overwrite good data with nothing.
 *
 * AUTH
 *
 * Service-account JWT (RS256, signed with node:crypto — no dependency), the
 * same account and quota project esteban-review-watch.py uses.
 *
 * Run:  node scripts/sync-google-reviews.mjs [--dry-run]
 * Env:  GOOGLE_APPLICATION_CREDENTIALS (default ~/.config/fort-lauderdale-auto-seo/seo-agent.json)
 *       X_GOOG_USER_PROJECT (default fort-lauderdale-auto-seo)
 *       GOOGLE_PLACE_ID (default the profile's place id)
 */

import { createSign } from "node:crypto";
import { homedir } from "node:os";
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";

const SNAPSHOT_PATH = new URL("../data/google-reviews.json", import.meta.url);
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const PLACES_URL = "https://places.googleapis.com/v1/places";

const SERVICE_ACCOUNT_FILE =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(homedir(), ".config/fort-lauderdale-auto-seo/seo-agent.json");
const QUOTA_PROJECT = process.env.X_GOOG_USER_PROJECT || "fort-lauderdale-auto-seo";
const PLACE_ID = process.env.GOOGLE_PLACE_ID || "ChIJz5tunn0FmqERd6F9Q9Irxao";
const FIELD_MASK = "rating,userRatingCount,reviews";
/** Same text-match rule esteban-review-watch.py applies. */
const QUOTE_MATCH_CHARS = 60;

const DRY_RUN = process.argv.includes("--dry-run");

function b64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** A service-account JWT assertion for the cloud-platform scope. */
function jwtAssertion(credentials, now) {
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const signature = b64url(signer.sign(credentials.private_key));
  return `${header}.${claim}.${signature}`;
}

async function getAccessToken() {
  const credentials = JSON.parse(readFileSync(SERVICE_ACCOUNT_FILE, "utf8"));
  if (!credentials.client_email || !credentials.private_key) {
    throw new Error(
      `credential file ${SERVICE_ACCOUNT_FILE} has no client_email/private_key`,
    );
  }
  const now = Math.floor(Date.now() / 1000);
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwtAssertion(credentials, now),
    }),
  });
  if (!response.ok) {
    throw new Error(`token endpoint HTTP ${response.status}`);
  }
  const token = (await response.json()).access_token;
  if (!token) {
    throw new Error("token endpoint returned no access_token");
  }
  return token;
}

async function readProfile() {
  const token = await getAccessToken();
  const response = await fetch(`${PLACES_URL}/${PLACE_ID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Goog-FieldMask": FIELD_MASK,
      "X-Goog-User-Project": QUOTA_PROJECT,
    },
  });
  if (!response.ok) {
    throw Object.assign(
      new Error(`Places API HTTP ${response.status}`),
      { status: response.status },
    );
  }
  return response.json();
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

/** The merged next snapshot, or null when nothing should change. */
function merge(previous, live) {
  const next = structuredClone(previous);
  const profile = live ?? {};
  next.readAt = todayIso();
  next.profile = {
    rating: profile.rating ?? previous.profile.rating,
    reviewCount: profile.userRatingCount ?? previous.profile.reviewCount,
    reviewsSampled: Array.isArray(profile.reviews)
      ? profile.reviews.length
      : previous.profile.reviewsSampled,
  };
  next.sampledAuthors = Array.isArray(profile.reviews)
    ? profile.reviews.map(
        (review) => review?.authorAttribution?.displayName ?? "",
      )
    : next.sampledAuthors;

  const sampleText = Array.isArray(profile.reviews)
    ? profile.reviews
        .map((review) => review?.text?.text ?? "")
        .join(" ")
    : "";

  let quotesReverified = 0;
  next.quotes = next.quotes.map((quote) => {
    if (sampleText && sampleText.includes(quote.quote.slice(0, QUOTE_MATCH_CHARS))) {
      quotesReverified += 1;
      return { ...quote, readAt: todayIso() };
    }
    // Absence from a rotating ~5-review sample is not deletion. Leave it.
    return quote;
  });

  const unchanged =
    previous.readAt === next.readAt &&
    previous.profile.rating === next.profile.rating &&
    previous.profile.reviewCount === next.profile.reviewCount &&
    previous.profile.reviewsSampled === next.profile.reviewsSampled &&
    JSON.stringify(previous.sampledAuthors) === JSON.stringify(next.sampledAuthors) &&
    quotesReverified === 0;

  return { next, quotesReverified, unchanged };
}

async function main() {
  const previous = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8"));

  let live;
  try {
    live = await readProfile();
    console.log(
      `Places API: rating ${live.rating}, ${live.userRatingCount} reviews, sample of ${(live.reviews ?? []).length}.`,
    );
  } catch (error) {
    const status = error.status ? ` (${error.status})` : "";
    console.log(
      `Could not read the profile${status}: ${error.message}. Keeping the existing snapshot (${previous.readAt}) unchanged.`,
    );
    if (error.status === 429) {
      console.log(
        "Quota is exhausted — the Places API resets at midnight Pacific time. Re-run later.",
      );
    }
    return; // exit 0: a failed read must never clobber good data
  }

  const { next, quotesReverified, unchanged } = merge(previous, live);

  if (unchanged) {
    console.log(`Snapshot already current as of ${next.readAt}. Nothing to write.`);
    return;
  }

  console.log(
    `Snapshot ${previous.readAt} -> ${next.readAt}: rating ${next.profile.rating}, ` +
      `${next.profile.reviewCount} reviews, sample ${next.profile.reviewsSampled}, ` +
      `${next.sampledAuthors.length} sampled authors, ${quotesReverified} quote(s) reverified at source.`,
  );

  if (DRY_RUN) {
    console.log("Dry run: data/google-reviews.json left untouched.");
    return;
  }

  // Atomic write: a reader (the build) must never see a half-written JSON.
  const temporary = `${SNAPSHOT_PATH}.tmp`;
  writeFileSync(temporary, `${JSON.stringify(next, null, 2)}\n`);
  renameSync(temporary, SNAPSHOT_PATH);
  console.log(`Wrote ${SNAPSHOT_PATH.pathname.replace(/^.*\/data\//, "data/")}.`);
}

main().catch((error) => {
  console.error(`Unexpected failure, keeping existing snapshot: ${error.message}`);
  process.exit(0);
});
