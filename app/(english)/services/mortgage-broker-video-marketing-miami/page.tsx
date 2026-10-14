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
import { MORTGAGE_BROKER_DEPTH as depth } from "@/lib/service-depth-content";
import { MORTGAGE_BROKER_DEEP_DIVE as dive } from "@/lib/service-deep-dive-content";
import { priceSentence, whatsappHref } from "@/lib/packages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

const path = "/services/mortgage-broker-video-marketing-miami";

export const metadata = buildPageMetadata({
  title: "Mortgage Broker Video Miami",
  description: "Personal-brand reels and Spanish explainers for mortgage brokers and loan officers in Miami and Fort Lauderdale. NMLS and disclosures are supplied by the client.",
  path,
  locale: "en",
});

const inquiry = {
  serviceId: "mortgage_broker_video",
  serviceName: "personal-brand videos for a loan officer",
  goalPrompt: "explain the buying process in my own voice",
  assetPrompt: "phone clips, my NMLS details and the disclosures approved by compliance",
  proofHref: "/portfolio/ml-colombia",
  proofLabel: "Watch a published social piece",
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), depth.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Mortgage Broker Video Marketing Miami",
        description: "Remote editing and content planning of personal-brand reels and Spanish explainers for mortgage brokers and loan officers in Miami-Dade and Broward, with NMLS details and disclosures supplied and approved by the client and on-location filming as a paid add-on scoped per project.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami-Dade / Broward / Remote",
        availableLanguage: ["Spanish", "English"],
        serviceType: "Mortgage broker video marketing",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: "Mortgage Broker Video", item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/mortgage-broker-video-marketing-miami", jsonLd)) }}
      />
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="mortgage-hero">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="em-crumbs mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#9f3c27]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-[#9f3c27]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">{"Mortgage Broker Video"}</li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">{"Mortgage brokers / Loan officers"}</p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">{"Personal-brand videos for loan officers who serve clients in Spanish."}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">{"Explain the buying process in your own voice and Esteban turns those clips into reels and explainers with one consistent look. You supply and approve the NMLS details and every disclosure your lender requires."}</p>
              <div className="mt-8 flex flex-wrap gap-3" data-em-hero-actions>
                <a
                  href={whatsappHref(site.phone.e164, "Hi Esteban, I'd like a quote for loan officer videos.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="mortgage_hero_whatsapp"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Ask for a quote on WhatsApp
                </a>
                <Link
                  href="#mortgage-inquiry"
                  data-cta="mortgage_hero_quote"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Send the project details
                </Link>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">
                Based in Fort Lauderdale, working across Miami-Dade and Broward. Remote editing: {priceSentence("en", "arranque").toLowerCase()}. On-location filming is a paid add-on scoped per project; the Local Presence package is {priceSentence("en", "presencia-local").toLowerCase()}.
              </p>
            </div>
            <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6" data-section="mortgage-answer">
              <h2 className="font-serif text-3xl">{depth.answer.question}</h2>
              <p className="mt-4 text-base leading-7 text-[#252a2d]">{depth.answer.answer}</p>
              <p className="mt-4 text-sm leading-6 text-[#5a6066]">{depth.proof.note}</p>
              <Link
                href={depth.proof.href}
                data-cta="mortgage_hero_proof"
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
              >
                {depth.proof.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <ServiceCraft heading={depth.craftHeading} cards={depth.craft} sectionId="mortgage-craft" />
      <ServiceDeepDive id={dive.id} title={dive.title} destinations={dive.destinations} sections={dive.sections} />
      <ServiceFaqs heading={depth.faqHeading} faqs={depth.faqs} sectionId="mortgage-faq" />
      <ServiceInquiryRail service={inquiry} sectionId="mortgage-inquiry" />
      <ServiceRelated heading={depth.relatedHeading} services={depth.related} sectionId="mortgage-related" />
      <NicheAnswers path="/services/mortgage-broker-video-marketing-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
