import Link from "next/link";
import { ArrowRight, Video, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { YACHT_DEPTH } from "@/lib/service-depth-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Yacht Charter Video Marketing Miami",
  description:
    "Luxury yacht video editing, marine charter promos, aerial boat footage color grading, and deck walkthroughs in Miami.",
  path: "/services/yacht-charter-video-marketing-miami",
  locale: "en",
});

export default function YachtCharterVideoMarketingMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl("/services/yacht-charter-video-marketing-miami"), YACHT_DEPTH.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/yacht-charter-video-marketing-miami#service"),
        name: "Yacht Charter Video Marketing Miami",
        description:
          "Yacht video editing, luxury marine charter promotional reels, drone boat video grading, and lifestyle edits in Miami.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami Beach / Fort Lauderdale",
        serviceType: "Yacht video marketing",
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
                Yacht Charter Video Marketing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Marine & Luxury Lifestyle
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Yacht Charter Video Marketing in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Highlight deck luxury, onboard amenities, and open-water cruising with high-end video editing and drone boat grading.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Edit Yacht Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Yacht video proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our portfolio project <strong>My D&apos;ler</strong> proves published luxury lifestyle and hospitality video editing.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Promoting a yacht charter or marine broker in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw boat and drone footage for editing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
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
      {/* The depth that separates the 7 /services pages which earn from the 43
          which do not. Measured 2026-09-30, chrome stripped: earners carry 3,210
          unique body shingles at 13.1% overlap, this page's cohort 1,094 at
          38.4%. Thin, not merely templated — so this ADDS vertical-specific
          substance rather than folding or deleting anything. */}
      <ServiceCraft
        heading={YACHT_DEPTH.craftHeading}
        cards={YACHT_DEPTH.craft}
        sectionId="yacht-charter-craft"
      />
      <ServiceFaqs heading={YACHT_DEPTH.faqHeading} faqs={YACHT_DEPTH.faqs} />
      <ServiceRelated heading={YACHT_DEPTH.relatedHeading} services={YACHT_DEPTH.related} />
    </main>
  );
}
