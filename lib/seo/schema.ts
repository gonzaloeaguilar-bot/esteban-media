/**
 * JSON-LD schema builders for Esteban Moreno Media.
 *
 * Design:
 *  - All schemas live in this module (no inline schema in pages) so the shape
 *    is grep-able, type-checked, and easy to validate with
 *    https://validator.schema.org and Google's Rich Results test.
 *  - Each builder returns a plain object. Composition happens at the page
 *    level via `@graph` so multiple nodes can co-exist + cross-reference.
 *  - `@id` values come from `business-info.ts` so they stay stable across
 *    refactors.
 *  - Empty/placeholder values are stripped: emitting `"telephone": ""` is
 *    worse than omitting the field, since validators flag empty strings.
 *
 * TODO: i18n schema strings. EN-only for now — once a confirmed ES brand
 * description exists, switch `description` to a locale-aware resolver and
 * emit a per-locale graph (or use `inLanguage` per node).
 */

import {
  BUSINESS,
  ESTEBAN,
  SCHEMA_IDS,
  SERVICE_AREA,
  SITE_URL,
} from "./business-info";
import { CANONICAL_SERVICE_NAMES, type ServiceSlug } from "@/lib/services";
import type { LocalSeoPageCopy } from "@/lib/local-seo-pages";

/** Shared JSON-LD scalar/value union. Keeps builder return types ergonomic. */
type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdNode
  | readonly JsonLdValue[];

export type JsonLdNode = { [key: string]: JsonLdValue };

/**
 * Strip `undefined`, empty strings, and empty arrays so we never ship
 * placeholder noise to crawlers. Recurses into nested objects.
 */
function compact<T extends JsonLdNode>(node: T): T {
  const out: JsonLdNode = {};
  for (const [key, value] of Object.entries(node)) {
    if (value === undefined || value === null) continue;
    if (typeof value === "string" && value.length === 0) continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      out[key] = value;
      continue;
    }
    if (typeof value === "object") {
      const inner = compact(value as JsonLdNode);
      if (Object.keys(inner).length === 0) continue;
      out[key] = inner;
      continue;
    }
    out[key] = value;
  }
  return out as T;
}

/**
 * Build the LocalBusiness node. We pick `LocalBusiness` (not the more specific
 * `ProfessionalService` or `PhotographyBusiness`) because schema.org's
 * `PhotographyBusiness` is a `LocalBusiness` subtype and Esteban's mix spans
 * photo + video + drone + post — `LocalBusiness` keeps the surface coverage
 * broad. Revisit if/when the brand narrows.
 */
export function buildLocalBusinessSchema(): JsonLdNode {
  return compact({
    "@type": "LocalBusiness",
    "@id": SCHEMA_IDS.organization,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    foundingDate: BUSINESS.foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    areaServed: {
      "@type": SERVICE_AREA.type,
      name: SERVICE_AREA.name,
    },
    availableLanguage: [...BUSINESS.availableLanguages],
    founder: { "@id": SCHEMA_IDS.person },
    employee: [{ "@id": SCHEMA_IDS.person }],
    sameAs: [...BUSINESS.sameAs],
  });
}

/** Build the Person node (Esteban) with a `worksFor` ref to the org. */
export function buildPersonSchema(): JsonLdNode {
  return compact({
    "@type": "Person",
    "@id": SCHEMA_IDS.person,
    name: ESTEBAN.name,
    jobTitle: ESTEBAN.jobTitle,
    description: ESTEBAN.description,
    worksFor: { "@id": SCHEMA_IDS.organization },
    sameAs: [...ESTEBAN.sameAs],
  });
}

/**
 * Compose the site-wide `@graph` shipped from the root layout. Both nodes
 * appear together so crawlers resolve the founder/worksFor refs on the same
 * page, no follow-up fetch required.
 */
export function buildSiteGraph(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [buildLocalBusinessSchema(), buildPersonSchema()],
  };
}

type ServiceSchemaInput = {
  slug: ServiceSlug;
  /** Localised service name (e.g. "Aerial Cinematography"). */
  name: string;
  /** Localised one-liner used as the service `description`. */
  description: string;
  /** BCP-47 locale of the localised strings ("en" | "es"). */
  locale: string;
};

/**
 * Build a Service schema node for one of the five service detail pages.
 * `provider.@id` points back to the LocalBusiness emitted by the root layout
 * so the relationship is explicit. We pass the localised name + description
 * in from the page (which has the next-intl translator handy) rather than
 * looking them up here — schema modules stay free of i18n plumbing.
 */
export function buildServiceSchema({
  slug,
  name,
  description,
  locale,
}: ServiceSchemaInput): JsonLdNode {
  const url = `${SITE_URL}/${locale}/services/${slug}`;
  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    inLanguage: locale,
    // Canonical English name keeps the service grep-able regardless of
    // locale — useful for analytics and for AI surfaces that hash by name.
    alternateName: CANONICAL_SERVICE_NAMES[slug],
    serviceType: CANONICAL_SERVICE_NAMES[slug],
    provider: { "@id": SCHEMA_IDS.organization },
    areaServed: {
      "@type": SERVICE_AREA.type,
      name: SERVICE_AREA.name,
    },
    // Light pointer back to the org so a crawler reading just this node can
    // still discover the brand without resolving the @id ref.
    brand: { "@id": SCHEMA_IDS.organization },
  });
}

/** Build a local/niche Service node for one city or county landing page. */
export function buildLocalSeoServiceSchema({
  page,
  locale,
}: {
  page: LocalSeoPageCopy;
  locale: string;
}): JsonLdNode {
  const url = `${SITE_URL}/${locale}/${page.slug}`;
  return compact({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#local-service`,
    name: page.title,
    alternateName: page.primaryKeyword,
    description: page.description,
    url,
    inLanguage: locale,
    provider: { "@id": SCHEMA_IDS.organization },
    brand: { "@id": SCHEMA_IDS.organization },
    serviceType: page.primaryKeyword,
    areaServed: {
      "@type": page.market === "broward" ? "AdministrativeArea" : "City",
      name: page.cityLabel,
      addressRegion: "FL",
      addressCountry: "US",
    },
    audience: page.audienceSegments.map((segment) => ({
      "@type": "Audience",
      audienceType: segment,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${page.cityLabel} ${page.niche} services`,
      itemListElement: page.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
  });
}

/** FAQPage schema for visible local landing-page FAQs. */
export function buildFaqSchema({
  id,
  faqs,
}: {
  id: string;
  faqs: LocalSeoPageCopy["faqs"];
}): JsonLdNode {
  return compact({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });
}
