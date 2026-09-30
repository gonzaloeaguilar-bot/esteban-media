import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";

/**
 * The depth a service page needs to earn anything — as shared components.
 *
 * MEASURED, 2026-09-30. Of 50 sitemapped /services pages, 7 earn impressions and
 * 43 earn zero. Stripping the site chrome (the shingles /contact, /about and
 * /pricing all share, so a shared header cannot be mistaken for shared content)
 * and comparing BODIES:
 *
 *   group          median unique body   body-only overlap
 *   7 earning              3,210             13.1%
 *   33 niche-dead          1,094             38.4%
 *   10 geo-dead            2,193             58.9%
 *
 * The earners are not "less duplicated" — they carry THREE TIMES the unique body
 * content. The dead niche pages are thin, not merely templated, so the fix is to
 * ADD vertical-specific substance rather than to fold or delete anything.
 *
 * (A first pass measured 61% vs 85% on whole pages and read it as
 * differentiation. Two UNRELATED pages — /contact and /about — overlap 62.3% on
 * chrome alone, so that comparison was measuring the navigation. Strip the chrome
 * or the number means nothing.)
 *
 * Comparing the structures, the earning pages have three things the dead ones do
 * not: vertical-specific craft cards, links to sibling services, and a FAQ whose
 * headings are questions. That is also exactly what the dual-audience rule asks
 * for — 100-180-word sections under a question-shaped heading, each carrying one
 * real fact, in the server-rendered HTML.
 *
 * Those pages hand-roll all of it, ~400 lines each. This is the same shape as
 * shared components, so the next page gets the depth without another 200 lines of
 * copy-pasted markup.
 *
 * Every section carries `data-section`, so `public/track.js` attributes
 * `section_view` and any `cta_click` inside it without a hand-written event.
 */

export type ServiceFaq = { question: string; answer: string };
export type CraftCard = { title: string; detail: string };
export type RelatedService = { title: string; detail: string; href: string };

/**
 * Build the FAQPage node for a page's JSON-LD `@graph`.
 *
 * Kept next to the component that renders the questions so the two cannot drift:
 * a FAQPage claiming questions the page does not show is structured data that
 * misrepresents the page.
 */
export function buildServiceFaqSchema(pageUrl: string, faqs: readonly ServiceFaq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Three craft specifics. What this vertical's footage actually demands.
 *
 * Three, not a long list: the earning pages all use three, and a card that says
 * something true about THIS vertical is the unit of differentiation being added.
 */
export function ServiceCraft({
  heading,
  cards,
  sectionId,
}: {
  heading: string;
  cards: readonly CraftCard[];
  sectionId: string;
}) {
  return (
    <section
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <h2 id={`${sectionId}-heading`} className="max-w-3xl font-serif text-3xl sm:text-4xl">
          {heading}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
              <CheckCircle2 className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">{card.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Sibling services, so a page that does not fit the visitor still leads somewhere. */
export function ServiceRelated({
  heading,
  services,
  sectionId = "related-services",
}: {
  heading: string;
  services: readonly RelatedService[];
  sectionId?: string;
}) {
  return (
    <section
      className="border-b border-[#ddd4c8] py-12 sm:py-16"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <h2 id={`${sectionId}-heading`} className="max-w-3xl font-serif text-3xl sm:text-4xl">
          {heading}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              data-cta={`related-service-${service.href.split("/").pop()}`}
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 hover:border-[#101214]"
            >
              <h3 className="font-serif text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">{service.detail}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">
                Read more
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * The questions, with their answers in the served HTML.
 *
 * NOT a `<details>` fold here. The reading-path fold-out is for depth that only
 * supports reading on a page that is already too long; these pages are the
 * opposite problem — 1,094 unique shingles against the earners' 3,210. Hiding the
 * new depth behind a click on a thin page would be adding words to the DOM while
 * still showing the visitor nothing.
 */
export function ServiceFaqs({
  heading,
  faqs,
  sectionId = "service-faq",
}: {
  heading: string;
  faqs: readonly ServiceFaq[];
  sectionId?: string;
}) {
  return (
    <section
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
          Before you send footage
        </p>
        <h2 id={`${sectionId}-heading`} className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
          {heading}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-[#ddd4c8] bg-[#f6f1ea] p-5">
              <h3 className="font-serif text-2xl">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
