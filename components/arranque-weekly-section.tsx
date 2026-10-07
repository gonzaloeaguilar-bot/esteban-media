import { Check, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ServiceInquiryLink } from "@/components/service-inquiry-link";
import RailPrice from "@/vendor/rail-kit/RailPrice";
import RailFaq from "@/vendor/rail-kit/RailFaq";
import {
  arranqueWeeklyAnchor,
  arranqueWeeklyCopy,
  arranqueWeeklyCtaId,
  arranqueWeeklyFaq,
  arranqueWeeklyIncludes,
  arranqueWeeklyName,
  arranqueWeeklyOptionName,
  arranqueWeeklyPerVideoLine,
  arranqueWeeklyWhatsapp,
} from "@/lib/arranque-weekly";
import type { Locale } from "@/lib/packages";
import { ARRANQUE_WEEKLY_OPTIONS } from "@/lib/pricing";
import { site } from "@/lib/site";

/**
 * Arranque (Starter) by the week, on the creator pages only.
 *
 * Server-rendered: prices, terms and every FAQ answer are in the raw HTML;
 * the FAQ depth sits in native <details> (RailFaq). Each WhatsApp button
 * records `service_interest`, which the site writer also emits as the
 * contract `cta_click` with `cta_id` = the option's id.
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

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {ARRANQUE_WEEKLY_OPTIONS.map((option) => {
            const name = arranqueWeeklyOptionName(option, locale);
            const ctaId = arranqueWeeklyCtaId(option.id);
            return (
              <article
                key={option.id}
                className="flex flex-col rounded-lg border border-[#ddd4c8] bg-[#f6f1ea] p-6"
                data-plan={option.id}
              >
                <p className="text-sm text-[#5a6066]">{arranqueWeeklyName(locale)}</p>
                <h3 className="mt-1 font-serif text-2xl">{name}</h3>
                <div className="mt-4">
                  <RailPrice
                    now={String(option.pricePerWeek)}
                    unit={c.perWeek}
                    size="lg"
                    source={`arranque_weekly_${option.id}`}
                  />
                </div>
                <p className="mt-2 text-sm text-[#252a2d]">
                  {arranqueWeeklyPerVideoLine(option, locale)} · {c.paidWeekly}
                </p>
                <p className="sr-only">{c.includesLabel}</p>
                <ul className="mt-5 space-y-2 text-sm leading-6 text-[#252a2d]" role="list">
                  {arranqueWeeklyIncludes(option, locale).map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-1 size-3.5 shrink-0 text-[#9f3c27]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ServiceInquiryLink
                  href={arranqueWeeklyWhatsapp(site.phone.e164, option, locale)}
                  serviceId={ctaId}
                  locale={locale}
                  data-cta={ctaId}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {c.cta(option)}
                </ServiceInquiryLink>
              </article>
            );
          })}
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
