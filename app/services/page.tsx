import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { languageAlternates } from "@/lib/spanish-site";
import { absoluteUrl, services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Creative Services",
  description:
    "Video, photography, drone, reels, and post-production services from Esteban Moreno Media in Fort Lauderdale.",
  alternates: {
    canonical: "/services",
    languages: languageAlternates["/services"],
  },
};

export default function ServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/services#services"),
    name: "Creative production services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@type": "LocalBusiness",
          name: site.name,
          url: absoluteUrl("/"),
        },
        areaServed: ["Fort Lauderdale", "Broward County", "Miami-Dade"],
      },
    })),
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Services
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
            Photo, video, aerial, and post-production under one eye.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Esteban is positioned as a visual storyteller, not a single-service
            vendor. The service menu stays simple so clients can pick the
            closest fit and ask for the rest.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-serif text-3xl leading-tight">
                        {service.name}
                      </h2>
                      <p className="mt-3 leading-7 text-[#252a2d]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-[#252a2d]">
                    <li className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                        aria-hidden="true"
                      />
                      <span>{service.detail}</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                        aria-hidden="true"
                      />
                      <span>
                        Scoped by deliverable, usage, location, and timeline.
                      </span>
                    </li>
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-10 rounded-lg bg-[#101214] p-6 text-[#f6f1ea] sm:p-8">
            <h2 className="font-serif text-4xl">Not sure which service fits?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Send the project goal, location, date, and where the final asset
              will be used. Esteban can shape the scope from there.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
            >
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
