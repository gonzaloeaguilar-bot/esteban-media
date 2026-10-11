import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { PRECONSTRUCTION_DEPTH as depth } from "@/lib/service-depth-content";
import { PRECONSTRUCTION_DEEP_DIVE as dive } from "@/lib/service-deep-dive-content";
import { priceSentence, whatsappHref } from "@/lib/packages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const path = "/services/pre-construction-condo-video-marketing-miami";

export const metadata = buildPageMetadata({
  title: "Pre-Construction Condo Video Miami",
  description: "Vertical reels from renderings and sales-gallery footage for pre-construction condo launches in Miami and Fort Lauderdale, in Spanish and English versions.",
  path,
  locale: "en",
});

const inquiry = {
  serviceId: "preconstruction_condo_video",
  serviceName: "reels for a pre-construction condo launch",
  goalPrompt: "turn renderings and sales-gallery footage into Spanish and English reels",
  assetPrompt: "approved renderings, animations, gallery clips and the cleared disclaimer text",
  proofHref: "/portfolio/my-dler",
  proofLabel: "See a published 3D and mockup project",
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), depth.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Pre-Construction Condo Video Marketing Miami",
        description: "Remote editing of renderings, animations and sales-gallery footage into Spanish and English vertical reels for pre-construction condo developers and sales teams in Miami-Dade and Broward, with on-location filming as a paid add-on scoped per project.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Broward / Remote",
        availableLanguage: ["Spanish", "English"],
        serviceType: "Pre-construction real estate video editing",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: "Pre-Construction Condo Video", item: absoluteUrl(path) },
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
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="preconstruction-hero">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="em-crumbs mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-[#9f3c27]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">Pre-Construction Condo Video</li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Developers / Sales teams / Pre-construction</p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">Reels for pre-construction condo launches, in Spanish and English.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">Send the approved renderings, fly-throughs and sales-gallery clips. Esteban edits them into vertical reels with Spanish and English versions for local and international buyers, and your team approves every claim and disclaimer.</p>
              <div className="mt-8 flex flex-wrap gap-3" data-em-hero-actions>
                <a
                  href={whatsappHref(site.phone.e164, "Hi Esteban, I'd like a quote for pre-construction condo reels.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="preconstruction_hero_whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Ask for a quote on WhatsApp
                </a>
                <Link
                  href="#preconstruction-inquiry"
                  data-cta="preconstruction_hero_quote"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Send the project details
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Based in Fort Lauderdale, working across Miami-Dade and Broward. Remote editing: {priceSentence("en", "arranque").toLowerCase()}. On-location filming is a paid add-on scoped per project; the Local Presence package is {priceSentence("en", "presencia-local").toLowerCase()}.
              </p>
            </div>
            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6" data-section="preconstruction-answer">
              <h2 className="font-serif text-3xl">{depth.answer.question}</h2>
              <p className="mt-4 text-base leading-7 text-[#252a2d]">{depth.answer.answer}</p>
              <p className="mt-4 text-sm leading-6 text-[#5a6066]">{depth.proof.note}</p>
              <Link
                href={depth.proof.href}
                data-cta="preconstruction_hero_proof"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
              >
                {depth.proof.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <ServiceCraft heading={depth.craftHeading} cards={depth.craft} sectionId="preconstruction-craft" />
      <ServiceDeepDive id={dive.id} title={dive.title} destinations={dive.destinations} sections={dive.sections} />
      <ServiceFaqs heading={depth.faqHeading} faqs={depth.faqs} sectionId="preconstruction-faq" />
      <ServiceInquiryRail service={inquiry} sectionId="preconstruction-inquiry" />
      <ServiceRelated heading={depth.relatedHeading} services={depth.related} sectionId="preconstruction-related" />
    </main>
  );
}
