import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { languageAlternates } from "@/lib/spanish-site";
import { absoluteUrl, serviceAreas, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas",
  description:
    "Esteban Moreno Media serves Fort Lauderdale, Broward County, and Miami-Dade for video, photography, drone, and editing work.",
  alternates: {
    canonical: "/areas",
    languages: languageAlternates["/areas"],
  },
};

export default function AreasPage() {
  const areaJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/areas#service-areas"),
    name: "Service areas for Esteban Moreno Media",
    itemListElement: serviceAreas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Place",
        name: area.name,
        description: area.description,
        containedInPlace: area.county,
        subjectOf: {
          "@type": "LocalBusiness",
          name: site.name,
          url: absoluteUrl("/"),
        },
      },
    })),
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaJsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Service areas
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
            Fort Lauderdale-based, South Florida practical.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Most work starts near Fort Lauderdale. Broward is regular territory,
            and Miami-Dade gets quoted with realistic travel and timing.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {serviceAreas.map((area) => (
              <article
                key={area.name}
                className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
              >
                <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
                <p className="mt-5 text-xs uppercase text-[#5a6066]">
                  {area.county}
                </p>
                <h2 className="mt-3 font-serif text-3xl">{area.name}</h2>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {area.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.neighborhoods.map((hood) => (
                    <span
                      key={hood}
                      className="rounded-full border border-[#ddd4c8] px-3 py-1 text-xs text-[#5a6066]"
                    >
                      {hood}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
          >
            Ask about a location
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </main>
  );
}
