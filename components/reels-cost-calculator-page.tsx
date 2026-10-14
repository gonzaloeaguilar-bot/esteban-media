import Link from "next/link";

import { ReelsCostCalculator } from "@/components/reels-cost-calculator";
import { Container } from "@/components/ui/container";
import RailFaq from "@/vendor/rail-kit/RailFaq";
import {
  REELS_COST_CALCULATOR_PATHS,
  REELS_COST_CALCULATOR_UPDATED,
  reelsCostCalculatorCopy,
  type CalcLocale,
} from "@/lib/reels-cost-calculator";
import { absoluteUrl } from "@/lib/site";

/** Renders [label](href) links inside the section copy. */
function withLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return part;
    return (
      <Link key={index} href={m[2]} className="font-medium text-[#9f3c27] underline underline-offset-4">
        {m[1]}
      </Link>
    );
  });
}

/**
 * The Reels editing cost calculator page, both languages.
 *
 * Dual-audience: the answer sentence, the method and every figure are in the
 * server HTML under question-shaped headings (100-180 words each); the FAQ
 * sits in native <details> (RailFaq). The select is the only thing that needs
 * JavaScript, and the table it highlights is already rendered.
 */
export function ReelsCostCalculatorPage({ locale }: { locale: CalcLocale }) {
  const c = reelsCostCalculatorCopy[locale];
  const path = REELS_COST_CALCULATOR_PATHS[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(`${path}#webpage`),
        url: absoluteUrl(path),
        name: c.h1,
        description: c.metadataDescription,
        inLanguage: locale === "es" ? "es-US" : "en-US",
        dateModified: REELS_COST_CALCULATOR_UPDATED,
        isPartOf: { "@id": absoluteUrl("/#website") },
        publisher: { "@id": absoluteUrl("/#business") },
        breadcrumb: { "@id": absoluteUrl(`${path}#breadcrumbs`) },
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: absoluteUrl(c.hrefs.home) },
          { "@type": "ListItem", position: 2, name: c.breadcrumbCurrent, item: absoluteUrl(path) },
        ],
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] py-10 text-[#101214] sm:py-16">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="lg">
        <nav aria-label={locale === "es" ? "Navegación de migas de pan" : "Breadcrumbs"} className="mb-7 text-sm text-[#5a6066]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href={c.hrefs.home} className="hover:text-[#9f3c27]">
                {c.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#252a2d]">
              {c.breadcrumbCurrent}
            </li>
          </ol>
        </nav>

        <header className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{c.eyebrow}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{c.h1}</h1>
          <p className="mt-5 text-lg leading-8 text-[#252a2d]" data-answer>
            {c.answer}
          </p>
          <p className="mt-3 text-sm text-[#5a6066]">
            {c.updated}: <time dateTime={REELS_COST_CALCULATOR_UPDATED}>{REELS_COST_CALCULATOR_UPDATED}</time>
          </p>
        </header>

        <div className="mt-10">
          <ReelsCostCalculator locale={locale} />
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-12">
          {c.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`calc-section-${index + 1}`}>
              <h2 id={`calc-section-${index + 1}`} className="font-serif text-3xl leading-tight sm:text-4xl">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-[#252a2d] sm:text-lg">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{withLinks(paragraph)}</p>
                ))}
              </div>
            </section>
          ))}

          <section aria-labelledby="calc-faq">
            <h2 id="calc-faq" className="font-serif text-3xl leading-tight sm:text-4xl">
              {c.faqHeading}
            </h2>
            <div className="mt-5">
              <RailFaq
                source="reels-cost-calculator-faq"
                items={c.faqs.map((faq) => ({ id: faq.question, question: faq.question, answer: faq.answer }))}
              />
            </div>
          </section>

          <section
            aria-labelledby="calc-cta"
            className="rounded-2xl border border-[#d6ccc0] bg-[#e7ded2] p-6 sm:p-8"
            data-section="reels_cost_calculator_cta"
          >
            <h2 id="calc-cta" className="font-serif text-3xl leading-tight">
              {c.ctaHeading}
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={c.hrefs.contact}
                data-cta="reels_cost_calculator_quote"
                className="inline-flex min-h-12 items-center rounded-full bg-[#101214] px-6 font-medium text-[#f6f1ea]"
              >
                {c.ctaContact}
              </Link>
              <Link
                href={c.hrefs.starter}
                data-cta="reels_cost_calculator_starter"
                className="inline-flex min-h-12 items-center rounded-full border border-[#101214] px-6 font-medium"
              >
                {c.ctaStarter}
              </Link>
              <Link
                href={c.hrefs.guide}
                data-cta="reels_cost_calculator_guide"
                className="inline-flex min-h-12 items-center px-2 font-medium text-[#9f3c27] underline underline-offset-4"
              >
                {c.ctaGuide}
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
