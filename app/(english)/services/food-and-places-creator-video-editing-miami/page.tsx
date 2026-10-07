import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ServiceCraft, ServiceDeepDive, ServiceFaqs, ServiceInquiryRail, ServiceRelated, buildServiceFaqSchema } from "@/components/service-depth";
import { FOOD_PLACES_CREATOR_DEPTH as depth, FOOD_PLACES_CREATOR_SECTIONS } from "@/lib/service-depth-content";
import { priceSentence } from "@/lib/packages";
import { ArranqueWeeklySection } from "@/components/arranque-weekly-section";
import { arranqueWeeklyFaq, arranqueWeeklyOfferJsonLd } from "@/lib/arranque-weekly";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl } from "@/lib/site";

const path = "/services/food-and-places-creator-video-editing-miami";

export const metadata = buildPageMetadata({
  title: "Food & Places Creator Editing Miami",
  description: "Video editing for food and places creators in Miami and Fort Lauderdale. Send your restaurant clips or ask about a launch month with a content plan.",
  path,
  locale: "en",
});

export default function FoodPlacesCreatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": absoluteUrl(`${path}#service`), name: "Food and Places Creator Video Editing", description: "Remote editing and launch-month content planning for food and places recommendation creators in Miami-Dade and Broward.", provider: { "@id": absoluteUrl("/#business") }, areaServed: "Miami-Dade / Broward / Remote", serviceType: "Food and places creator video editing" },
      buildServiceFaqSchema(absoluteUrl(path), [...depth.faqs, ...arranqueWeeklyFaq("en")]),
      arranqueWeeklyOfferJsonLd("en", absoluteUrl(path), absoluteUrl("/#business")),
      { "@type": "BreadcrumbList", "@id": absoluteUrl(`${path}#breadcrumbs`), itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
        { "@type": "ListItem", position: 3, name: "Food & Places Creator Editing", item: absoluteUrl(path) },
      ] },
    ],
  };
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-8 sm:py-16" data-section="food-creator-hero">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="em-crumbs mb-6 text-sm text-[#5a6066]">
            <Link href="/services">Services</Link> / Food &amp; places creators
          </nav>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="max-w-4xl font-serif em-display">You find the places. Esteban edits the story.</h1>
              <p className="mt-4 max-w-2xl text-lg leading-7">Video editing for food and places recommendation creators in Miami and Fort Lauderdale. Send your footage or ask about a launch month.</p>
              <div className="mt-6 flex flex-wrap gap-3" data-em-hero-actions>
                <Link href="#food-creator-inquiry" data-cta="food_creator_hero_contact" className="inline-flex min-h-12 items-center rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white">Send your footage</Link>
                <Link href="/portfolio/bar-door-monkey" data-cta="food_creator_hero_proof" className="inline-flex min-h-12 items-center rounded-full border border-[#101214] px-6 text-sm font-medium">Watch a venue promo</Link>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#5a6066]">Based in Fort Lauderdale. Editing can be fully remote; filming across Broward and Miami-Dade is scoped project by project.</p>
              <p className="mt-3 text-sm leading-6">Growth: {priceSentence("en", "crecimiento")}. Content plan, publishing calendar, editing and monthly report; your footage and posting rhythm define the quote.</p>
              <p className="mt-3 text-sm text-[#5a6066]">Updated <time dateTime="2026-10-07">October 7, 2026</time></p>
            </div>
            <figure>
              <Image src="/portfolio/bar-door-monkey.jpg" alt="Still from the published Bar Door Monkey Miami venue promo" width={1280} height={720} className="h-auto w-full rounded-xl" priority />
              <figcaption className="mt-3 text-sm leading-6 text-[#5a6066]">Bar Door Monkey Miami · 2020 · 55 seconds. A venue promo with videography and editing, not a recommendation account.</figcaption>
            </figure>
          </div>
        </Container>
      </section>
      <ArranqueWeeklySection locale="en" />
      <ServiceCraft heading={depth.craftHeading} cards={depth.craft} sectionId="food-creator-craft" />
      <ServiceDeepDive id="food-creator-details" title="Plan your first food or places videos" destinations="Formats, launch month, what to film, paid visits and published examples" sections={FOOD_PLACES_CREATOR_SECTIONS} />
      <ServiceInquiryRail trackInterest sectionId="food-creator-inquiry" service={{ serviceId: "food_places_creator_video", serviceName: "food and places creator video editing", goalPrompt: "launch my recommendation account or edit my restaurant visits", assetPrompt: "original clips, venue and dish names, my account and any paid or comped visits", proofHref: "/portfolio/bar-door-monkey", proofLabel: "Watch the published venue promo" }} />
      <ServiceFaqs heading={depth.faqHeading} faqs={depth.faqs} sectionId="food-creator-faq" collapsible />
      <ServiceRelated heading={depth.relatedHeading} services={depth.related} sectionId="food-creator-related" />
    </main>
  );
}
