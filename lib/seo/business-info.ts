/**
 * Single source of truth for Esteban Moreno Media's business identity in
 * structured-data + future canonical-URL contexts. Everything else (JSON-LD
 * builders, OG defaults, sitemap, robots) reads from here so that swapping
 * placeholders for real data is one edit, not a grep-and-replace.
 *
 * Placeholders are explicitly marked `// TODO:` so neither humans nor agents
 * mistake them for confirmed facts. Real address, phone, social handles, and
 * founding date all need owner sign-off before going live.
 */

/**
 * Canonical site URL. The site doesn't have a domain yet (P2 `infra` task in
 * backlog.md), so we fall back to a Vercel-preview-friendly literal that the
 * `metadataBase` swap can flip the moment DNS is purchased.
 *
 * Reads from `NEXT_PUBLIC_SITE_URL` so preview deployments can override per
 * environment without code changes. Never use `process.env.VERCEL_URL` for
 * the canonical because that flips per-preview and would pollute @id values.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  // TODO: replace with real production origin once domain is purchased.
  "https://estebanmorenomedia.com";

/**
 * Stable JSON-LD `@id` values. We use a hash-fragmented URL so multiple nodes
 * on the same page can co-exist inside a single `@graph` and cross-reference
 * each other (Service.provider → LocalBusiness, Person.worksFor →
 * LocalBusiness) without ambiguity.
 *
 * Stability matters: once Google has indexed these IDs they should not move,
 * so they're keyed on stable concepts (`#org`, `#person`) — not on URLs that
 * might change.
 */
export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  person: `${SITE_URL}/#person-esteban`,
} as const;

/**
 * Contact email. Centralised so the schema, the contact form, and any future
 * "click to email" CTAs share the same string. The actual recipient on the
 * API route is gated by `CONTACT_TO_EMAIL` — see `app/api/contact/route.ts`.
 */
export const CONTACT_EMAIL = "gagui010@icloud.com"; // TODO: swap to hello@estebanmorenomedia.com after domain/email setup.

/**
 * Service-area centroid for LocalBusiness. South Florida-wide service area
 * (Esteban travels for shoots), so we set the area as the region — not a
 * pinpoint — and leave the org-level `address` as a placeholder until a
 * studio/HQ address is confirmed.
 */
export const SERVICE_AREA = {
  type: "AdministrativeArea" as const,
  name: "South Florida",
  // TODO: tighten to specific counties (Miami-Dade, Broward, Palm Beach) once
  // Esteban confirms travel radius and pricing.
};

/**
 * Esteban — the person behind the business. Renders as a `Person` JSON-LD
 * node, linked into the organization via `founder` + `worksFor`.
 *
 * `sameAs` should be social profile URLs (Instagram, Vimeo, YouTube, LinkedIn,
 * IMDb, etc.). Empty array is fine — schema.org marks `sameAs` as optional —
 * and is safer than shipping fake URLs.
 */
export const ESTEBAN = {
  name: "Esteban Moreno",
  jobTitle: "Audiovisual Editor and Videographer",
  description:
    "Fort Lauderdale audiovisual editor and videographer specialising in video editing, short-form content, aerial visuals, and supporting photography.",
  /**
   * Authoritative social/profile URLs. Empty array is intentional — never
   * fabricate a profile URL. Add entries as Esteban confirms them.
   */
  sameAs: ["https://www.instagram.com/steeban1/"] as readonly string[], // TODO: add YouTube/Vimeo/LinkedIn if confirmed.
} as const;

/**
 * Organisation-level facts. Most are placeholders flagged with `// TODO:`
 * comments. The shape (not the values) is what matters at scaffold time —
 * once real data lands we swap fields without touching the schema builders.
 */
export const BUSINESS = {
  /**
   * Legal/marketing name. We treat the brand "Esteban Moreno Media" as both the
   * `name` and the `legalName` placeholder until Esteban registers a formal
   * entity (LLC etc.).
   */
  name: "Esteban Moreno Media",
  legalName: "Esteban Moreno Media", // TODO: real legal entity name (LLC).
  description:
    "Video-first audiovisual editing and production for South Florida brands — video editing, videography, short-form reels, aerial visuals, and supporting photography.",
  email: CONTACT_EMAIL,
  /**
   * Phone in E.164 format once known. Empty string = omit from schema (the
   * builders strip empty fields). Avoid shipping a placeholder number — bad
   * UX if a crawler exposes it as click-to-call.
   */
  telephone: "" as string, // TODO: E.164 phone, e.g. "+1-954-555-0100".
  /**
   * PostalAddress fields. We leave `streetAddress` empty (no public studio
   * yet) and only declare region/country so the `LocalBusiness` is still
   * geographically meaningful for AI surfaces.
   */
  address: {
    streetAddress: "", // TODO: studio/HQ address if/when one exists.
    addressLocality: "Fort Lauderdale", // TODO: confirm base city.
    addressRegion: "FL",
    postalCode: "", // TODO: postal code once address is set.
    addressCountry: "US",
  },
  /**
   * ISO 8601 date. Use a year-only string until the precise founding date
   * lands — schema.org accepts `YYYY` as a valid Date literal.
   */
  foundingDate: "2026", // TODO: exact founding date.
  /**
   * Authoritative org-level profile URLs (Google Business, Yelp, etc.).
   * Empty until confirmed — never fabricate.
   */
  sameAs: ["https://www.instagram.com/steeban1/"] as readonly string[], // TODO: add GBP, Yelp, Behance, IMDb, etc.
  /**
   * Price tier. `$$` is a safe "approachable professional" placeholder; the
   * builders will emit `priceRange` only when this is non-empty.
   */
  priceRange: "$$" as string, // TODO: refine after pricing is settled.
  /**
   * Languages the business operates in. Drives `inLanguage` on the
   * LocalBusiness node and signals bilingual service for AI surfaces.
   */
  availableLanguages: ["en", "es"] as const,
} as const;
