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
import { WEDDING_DEPTH as depth, WEDDING_PRICE_ANSWER as price } from "@/lib/service-depth-content";
import { WEDDING_DEEP_DIVE as dive } from "@/lib/service-deep-dive-content";
import { whatsappHref } from "@/lib/packages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

// Owner fact 2026-10-14 (vault esteban-owner-facts-2026-10-14): Esteban films
// and edits weddings, and each wedding is quoted individually. No price is
// published on this page by design.
const path = "/services/wedding-videographer-fort-lauderdale";

export const metadata = buildPageMetadata({
  title: "Wedding Videographer Fort Lauderdale",
  description: "Wedding films and highlight trailers filmed and edited by Esteban Moreno in Fort Lauderdale and Miami. Each wedding is quoted individually.",
  path,
  locale: "en",
});

const inquiry = {
  serviceId: "wedding_video",
  serviceName: "a wedding video",
  goalPrompt: "get a film of our wedding day and a highlight trailer",
  assetPrompt: "the date, the location, the hours to cover and what we want delivered",
  proofHref: "/portfolio/diana-jack",
  proofLabel: "Watch the published wedding film",
};

export default function Page() {
  const faqs = [{ question: price.question, answer: price.answer }, ...depth.faqs];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Wedding Videographer Fort Lauderdale & Miami",
        description: "Wedding films and highlight trailers filmed and edited in Broward and Miami-Dade, or edited remotely from another videographer's footage. Each wedding is quoted individually.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Broward / Miami-Dade / Remote",
        availableLanguage: ["Spanish", "English"],
        serviceType: "Wedding videography",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: "Wedding Videographer", item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService(path, jsonLd)) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="wedding-hero">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="em-crumbs mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-[#9f3c27]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">{"Wedding Videographer"}</li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">{"Weddings / Couples / Families"}</p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">{"Wedding videographer in Fort Lauderdale and Miami: the film of your day."}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">{"Esteban Moreno films and edits weddings: a full film of the day, a highlight trailer to share and, if you want them, vertical clips for social media. He can also edit a wedding that another videographer filmed."}</p>
              <div className="mt-8 flex flex-wrap gap-3" data-em-hero-actions>
                <a
                  href={whatsappHref(site.phone.e164, "Hi Esteban, I'd like a quote for our wedding video. Date, location, hours and what we want delivered:")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="wedding_hero_whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Ask for a quote on WhatsApp
                </a>
                <Link
                  href="#wedding-inquiry"
                  data-cta="wedding_hero_quote"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Send the wedding details
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Based in Fort Lauderdale, filming on location across Broward and Miami-Dade, and editing remotely. Spanish-first, with intermediate English.
              </p>
            </div>
            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6" data-section="wedding-answer">
              <h2 className="font-serif text-3xl">{depth.answer.question}</h2>
              <p className="mt-4 text-base leading-7 text-[#252a2d]">{depth.answer.answer}</p>
              <p className="mt-4 text-sm leading-6 text-[#5a6066]">{depth.proof.note}</p>
              <Link
                href={depth.proof.href}
                data-cta="wedding_hero_proof"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
              >
                {depth.proof.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16" id="price" aria-labelledby="wedding-price-heading" data-section="wedding-price">
        <Container size="xl">
          <div className="max-w-3xl">
            <h2 id="wedding-price-heading" className="font-serif text-3xl leading-tight sm:text-4xl">{price.question}</h2>
            <p className="mt-5 text-lg leading-8 text-[#252a2d]">{price.answer}</p>
            <p className="mt-4 text-base leading-8 text-[#252a2d]">{price.detail}</p>
            <Link
              href="#wedding-inquiry"
              data-cta="wedding_price_quote"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
            >
              Send the date, location, hours and deliverables
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <ServiceCraft heading={depth.craftHeading} cards={depth.craft} sectionId="wedding-craft" />
      <ServiceDeepDive id={dive.id} title={dive.title} destinations={dive.destinations} sections={dive.sections} />
      <ServiceFaqs heading={depth.faqHeading} faqs={depth.faqs} sectionId="wedding-faq" />
      <ServiceInquiryRail service={inquiry} sectionId="wedding-inquiry" />
      <ServiceRelated heading={depth.relatedHeading} services={depth.related} sectionId="wedding-related" />
      <NicheAnswers path={path} fact={String(metadata.description ?? "")} />
    </main>
  );
}
