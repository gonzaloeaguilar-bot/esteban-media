import Link from "next/link";

import { buildServiceFaqSchema } from "@/components/service-depth";
import { scriptPacingHelp } from "@/lib/script-pacing-help";
import { absoluteUrl } from "@/lib/site";
import RailFaq from "@/vendor/rail-kit/RailFaq";

export function ScriptPacingHelp({ locale }: { locale: "en" | "es" }) {
  const copy = scriptPacingHelp[locale];
  const path = locale === "es"
    ? "/es/calculadora-de-ritmo-de-video"
    : "/daily-script-pacing-calculator";

  return (
    <section className="mx-auto mt-10 max-w-2xl" data-section="script-pacing-help" aria-labelledby="pacing-help-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...buildServiceFaqSchema(absoluteUrl(path), copy.faqs),
          }),
        }}
      />
      <h2 id="pacing-help-heading" className="font-serif text-2xl text-[#101214] sm:text-3xl">{copy.heading}</h2>
      <p className="mt-3 text-base leading-7 text-[#252a2d]">{copy.intro}</p>
      <p className="mt-2 text-sm text-[#5a6066]"><time dateTime="2026-10-07">{copy.updated}</time></p>
      <RailFaq
        source="script-pacing-help"
        className="mt-5"
        items={copy.faqs.map((faq, index) => ({
          id: `pacing-help-${index}`,
          question: faq.question,
          answer: <p>{faq.answer}</p>,
        }))}
      />
      <Link className="mt-5 inline-flex min-h-11 items-center text-base font-medium text-[#9f3c27] underline underline-offset-4" href={copy.serviceHref} data-cta="pacing-help-reels-editing">
        {copy.serviceLabel}
      </Link>
    </section>
  );
}
