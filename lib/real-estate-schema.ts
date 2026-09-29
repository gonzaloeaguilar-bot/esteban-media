import { REAL_ESTATE_MEDIA } from "@/lib/services-config";
import { realEstateDirectAnswer } from "@/components/real-estate-pricing";

/**
 * Service + offers for the listing-media rate card.
 *
 * These are `Offer` with an exact `price`, unlike the package pages, which
 * publish `AggregateOffer.lowPrice` because those are floors that end in a
 * quote. Here the figure IS the price for a home of that size, so saying `price`
 * is the honest claim — and it is the claim that can earn a rich result.
 *
 * The 8,000+ SF tier is excluded: it has no price, and an offer without one
 * would be a lie by omission.
 */
export function realEstateJsonLd(locale: "en" | "es", pageUrl: string, providerId: string) {
  const priced = REAL_ESTATE_MEDIA.photography.filter((t) => t.amount !== null);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: REAL_ESTATE_MEDIA.name[locale],
    description: realEstateDirectAnswer(locale),
    serviceType: REAL_ESTATE_MEDIA.summary[locale],
    url: pageUrl,
    provider: { "@id": providerId },
    inLanguage: locale === "es" ? "es-US" : "en-US",
    areaServed: ["Fort Lauderdale", "Broward County", "Miami-Dade County"],
    offers: priced.map((tier) => ({
      "@type": "Offer",
      name: tier.label[locale],
      price: tier.amount,
      priceCurrency: REAL_ESTATE_MEDIA.currency,
      availability: "https://schema.org/InStock",
    })),
  };
}
