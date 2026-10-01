import React from "react";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Calculator,
  Mail,
  Phone,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { YACHT_HOSPITALITY_DEPTH } from "@/lib/service-depth-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Yacht Hospitality Video Fort Lauderdale | Marine Editing",
  description:
    "Fort Lauderdale yacht video editing and promotional marine post-production. Turn charter, broker, and waterfront hospitality footage into engaging video.",
  path: "/services/yacht-hospitality-video-fort-lauderdale",
  locale: "en",
});

export default function YachtHospitalityVideoFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/yacht-hospitality-video-fort-lauderdale"),
        YACHT_HOSPITALITY_DEPTH.faqs,
      ),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/yacht-hospitality-video-fort-lauderdale#service"),
        name: "Yacht Hospitality Video Fort Lauderdale",
        description:
          "Fort Lauderdale yacht video editing, marine drone footage formatting, and luxury charter promotional video post-production.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Fort Lauderdale / Broward",
        serviceType: "Marine video production",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-[#9f3c27]">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Fort Lauderdale Yacht Video
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale / Yachting & Marine
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Yacht & Marine Video Editing in Fort Lauderdale.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Promotional video post-production for yacht charter companies, marine brokers, and waterfront hospitality venues in South Florida.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start a Yacht Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/banacol"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Marine Proof
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Calculate Project Budget
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Anchor className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Marine & aerial proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our{" "}
                <Link
                  href="/portfolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  portfolio
                </Link>{" "}
                project <strong>Banacol</strong> proves published aerial drone cinematography filmed on assignment from boats at sea.
              </p>
              <div className="mt-5 border-t border-[#ddd4c8] pt-4">
                <Link
                  href="/portfolio/banacol"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:text-[var(--em-accent-ink)]"
                >
                  Review Banacol Marine & Aerial Drone Proof
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={YACHT_HOSPITALITY_DEPTH.craftHeading}
        cards={YACHT_HOSPITALITY_DEPTH.craft}
        sectionId="yacht-hospitality-craft"
      />
      <ServiceFaqs
        heading={YACHT_HOSPITALITY_DEPTH.faqHeading}
        faqs={YACHT_HOSPITALITY_DEPTH.faqs}
      />
      <ServiceRelated
        heading={YACHT_HOSPITALITY_DEPTH.relatedHeading}
        services={YACHT_HOSPITALITY_DEPTH.related}
      />

      <section className="pb-12 sm:pb-16 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Promoting a yacht charter or marine service in Fort Lauderdale?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send your vessel clips or drone footage for editing, or calculate your custom project scope online.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calculator"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Calculator className="size-4" aria-hidden="true" />
                  Budget Calculator
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
