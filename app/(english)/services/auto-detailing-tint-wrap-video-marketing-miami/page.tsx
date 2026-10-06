import Link from "next/link";
import { ArrowRight, Car } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { AUTO_DETAILING_DEPTH } from "@/lib/service-depth-content";
import { AUTO_DETAILING_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const path = "/services/auto-detailing-tint-wrap-video-marketing-miami";

export const metadata = buildPageMetadata({
  title: "Auto Detailing, Tint & Wrap Video Marketing Miami",
  description:
    "Video marketing for auto detailing, window tint, and vinyl wrap shops in South Florida: controlled reflections, honest before-and-afters, vertical posts.",
  path,
  locale: "en",
});

export default function AutoDetailingVideoMarketingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), AUTO_DETAILING_DEPTH.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Auto Detailing, Tint & Wrap Video Marketing Miami",
        description:
          "Video editing and selective production for detailing, paint correction, ceramic coating, window tint, and vinyl wrap shops in Miami-Dade and Broward.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Broward",
        serviceType: "Automotive service video marketing",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          {
            "@type": "ListItem",
            position: 3,
            name: "Detailing, Tint & Wrap Video Marketing",
            item: absoluteUrl(path),
          },
        ],
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
                Detailing, Tint &amp; Wrap Video Marketing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Detailing / Window Tint / Vinyl Wrap
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Video for detailing, tint and wrap shops.
              </h1>
              {/* Answer first: what this is, and what to do next. */}
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                A corrected panel is a mirror, so the shot is really about what
                reflects in it. Mark one filming spot in the bay, capture a few
                seconds at the start and the end of each job, and Esteban cuts
                comparisons where the only thing that changed is the work. Send
                the clips and the service each one belongs to.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  data-cta="auto_detailing_hero_contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Send shop footage
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services/automotive-video-marketing-miami"
                  data-cta="auto_detailing_hero_dealer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Selling cars instead?
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Car className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What the camera shows</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Swirl marks only appear under one hard light, so the before shot
                needs a raked source. Fine window patterns can shimmer on video,
                so those shots get checked on the screen before the car moves.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Heat and durability figures stay with the film and coating
                manufacturers; the video shows the install and the visible
                result.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={AUTO_DETAILING_DEPTH.craftHeading}
        cards={AUTO_DETAILING_DEPTH.craft}
        sectionId="auto-detailing-craft"
      />
      <ServiceDeepDive
        id={AUTO_DETAILING_DEEP_DIVE.id}
        title={AUTO_DETAILING_DEEP_DIVE.title}
        destinations={AUTO_DETAILING_DEEP_DIVE.destinations}
        sections={AUTO_DETAILING_DEEP_DIVE.sections}
      />
      <ServiceFaqs
        heading={AUTO_DETAILING_DEPTH.faqHeading}
        faqs={AUTO_DETAILING_DEPTH.faqs}
      />
      <ServiceInquiryRail
        service={{
          serviceId: "auto_detailing_video",
          serviceName: "video for a detailing, tint or wrap shop",
          goalPrompt: "show paint correction, tint or a wrap in a way a customer believes",
          assetPrompt: "before and after clips from one marked spot, plus the service each one shows",
          proofHref: "/portfolio",
          proofLabel: "Review published work",
        }}
      />
      <ServiceRelated
        heading={AUTO_DETAILING_DEPTH.relatedHeading}
        services={AUTO_DETAILING_DEPTH.related}
      />
    </main>
  );
}
