import Link from "next/link";
import { ArrowRight, Scissors } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { SALON_DEPTH } from "@/lib/service-depth-content";
import { SALON_COST_DEEP_DIVE, SALON_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const path = "/services/salon-barbershop-video-marketing-miami";

export const metadata = buildPageMetadata({
  title: "Salon & Barbershop Video Marketing Miami",
  description:
    "Video marketing for salons, barbershops, and nail studios in Miami and Fort Lauderdale: transformations, detail close-ups, and vertical posts from phone clips.",
  path,
  locale: "en",
});

export default function SalonBarbershopVideoMarketingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), SALON_DEPTH.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Salon & Barbershop Video Marketing Miami",
        description:
          "Video editing and selective production for hair salons, barbershops, and nail studios in Miami-Dade and Broward, built around transformation footage.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Broward",
        serviceType: "Salon and barbershop video marketing",
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
            name: "Salon & Barbershop Video Marketing",
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
                Salon &amp; Barbershop Video Marketing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Salons / Barbershops / Nail Studios
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Video for salons, barbershops and nail studios.
              </h1>
              {/* Answer first: what this is, and what to do next. */}
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Film the chair before you start, a couple of moments during the
                work, and the reveal from the same spot. Esteban turns those clips
                into vertical posts with the colour corrected so the result on
                screen matches the one in the mirror. Send a week of phone
                footage and a note of which clients said yes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  data-cta="salon_hero_contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Send salon footage
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/guides/remote-video-editing-handoff"
                  data-cta="salon_hero_handoff"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  How to send the clips
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Scissors className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Three shapes a week</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                The transformation, filmed twice from one marked position. The
                detail close-up, braced so it is actually sharp. And the stylist
                saying one useful thing to camera.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                None of it needs the shop closed, and a phone against a mirror is
                steady enough.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={SALON_DEPTH.craftHeading}
        cards={SALON_DEPTH.craft}
        sectionId="salon-craft"
      />
      <ServiceDeepDive
        id={SALON_COST_DEEP_DIVE.id}
        title={SALON_COST_DEEP_DIVE.title}
        destinations={SALON_COST_DEEP_DIVE.destinations}
        sections={SALON_COST_DEEP_DIVE.sections}
      />
      <ServiceDeepDive
        id={SALON_DEEP_DIVE.id}
        title={SALON_DEEP_DIVE.title}
        destinations={SALON_DEEP_DIVE.destinations}
        sections={SALON_DEEP_DIVE.sections}
      />
      <ServiceFaqs heading={SALON_DEPTH.faqHeading} faqs={SALON_DEPTH.faqs} />
      <ServiceInquiryRail
        service={{
          serviceId: "salon_barbershop_video",
          serviceName: "video for a salon or barbershop",
          goalPrompt: "post transformations and fill the appointment book",
          assetPrompt: "before and after clips, detail close-ups, and a note of which clients agreed",
          proofHref: "/portfolio",
          proofLabel: "Review published work",
        }}
      />
      <ServiceRelated
        heading={SALON_DEPTH.relatedHeading}
        services={SALON_DEPTH.related}
      />
    </main>
  );
}
