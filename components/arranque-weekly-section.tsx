import { Check } from "lucide-react";

import { Container } from "@/components/ui/container";
import { StarterOptions } from "@/components/starter-options";
import RailFaq from "@/vendor/rail-kit/RailFaq";
import {
  arranqueWeeklyAnchor,
  arranqueWeeklyCopy,
  arranqueWeeklyFaq,
  arranqueWeeklyIncludes,
  arranqueWeeklyOptionName,
} from "@/lib/arranque-weekly";
import type { Locale } from "@/lib/packages";
import { ARRANQUE_WEEKLY_OPTIONS } from "@/lib/pricing";

/**
 * How you pay for Arranque (Starter), on the creator pages.
 *
 * ONE Starter (owner, 2026-10-08): this used to be a separately branded
 * "Arranque semanal / Weekly Starter" section with its own cards, so the site
 * looked like it sold two starters. It now renders the same StarterOptions
 * block as the open Starter card on /pricing, then the weekly terms, what each
 * week includes and the FAQs.
 *
 * Server-rendered: prices, terms and every FAQ answer are in the raw HTML; the
 * FAQ depth sits in native <details> (RailFaq). The section keeps its anchor
 * and data-section so existing links and click attribution keep working.
 */
export function ArranqueWeeklySection({ locale }: { locale: Locale }) {
  const c = arranqueWeeklyCopy(locale);
  const anchor = arranqueWeeklyAnchor(locale);
  const faqs = arranqueWeeklyFaq(locale);
  return (
    <section
      id={anchor}
      className="em-weekly-plan scroll-mt-24 border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16"
      aria-labelledby={`${anchor}-heading`}
      data-section="arranque_weekly"
    >
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{c.eyebrow}</p>
        <h2 id={`${anchor}-heading`} className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
          {c.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#252a2d]">{c.answer}</p>

        <div className="max-w-3xl">
          <StarterOptions locale={locale} showTermsLink={false} />
        </div>

        <h3 className="mt-10 font-serif text-2xl">{c.includesHeading}</h3>
        <div className="mt-4 grid max-w-3xl gap-6 sm:grid-cols-2">
          {ARRANQUE_WEEKLY_OPTIONS.map((option) => (
            <div key={option.id} data-plan={option.id}>
              <p className="text-sm font-semibold text-[#252a2d]">{arranqueWeeklyOptionName(option, locale)}</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-[#252a2d]" role="list">
                {arranqueWeeklyIncludes(option, locale).map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-1 size-3.5 shrink-0 text-[#9f3c27]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mt-10 font-serif text-2xl">{c.termsHeading}</h3>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-[#252a2d]">
          {c.terms.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h3 className="mt-10 font-serif text-2xl">{c.faqHeading}</h3>
        <RailFaq
          className="mt-4"
          source="arranque_weekly_faq"
          items={faqs.map((faq, index) => ({ id: `${anchor}-faq-${index}`, ...faq }))}
        />
      </Container>
    </section>
  );
}
