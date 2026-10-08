import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  type CaseStudyLocale,
  getCaseStudies,
  getCaseStudyPath,
} from "@/lib/case-studies";

const copy = {
  en: {
    eyebrow: "Case studies",
    title: "How the work was actually made.",
    lead: "Scope, role, and the decisions behind each project — written from what was published, not from claimed results.",
    cta: "Read the case study",
  },
  es: {
    eyebrow: "Casos de estudio",
    title: "Cómo se hizo realmente el trabajo.",
    lead: "Alcance, rol y las decisiones detrás de cada proyecto — escrito a partir de lo publicado, no de resultados afirmados.",
    cta: "Leer el caso de estudio",
  },
} as const;

/**
 * Lists every case study, independent of the portfolio grid.
 *
 * The grid renders `getLiveYouTubePortfolioItems`, which filters to
 * `media.kind === "youtube"`. `flas-concierge` is an image entry, so its case
 * study rendered nowhere and was reachable only from the sitemap — orphaned on
 * the one client whose review is published on the site. An orphaned page is
 * worse than no page; the 29 city pages already demonstrated that (33
 * impressions, 0 clicks, 45% unindexed). This component links all of them, so a
 * future change to the grid's media filter cannot silently orphan one again.
 */
export function CaseStudyIndex({ locale }: { locale: CaseStudyLocale }) {
  const studies = getCaseStudies(locale);
  const t = copy[locale];

  if (studies.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="case-study-index-heading"
      className="border-t border-[#ddd4c8] bg-[#f6f1ea] py-14 sm:py-20"
    >
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
          {t.eyebrow}
        </p>
        <h2
          id="case-study-index-heading"
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-[#101214] sm:text-3xl"
        >
          {t.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#41474d] sm:text-base">
          {t.lead}
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <li key={study.id}>
              <Link
                href={getCaseStudyPath(study.id, locale)}
                className="flex h-full flex-col rounded-lg border border-[#ddd4c8] bg-white p-5 transition-colors hover:border-[#e85d3e]"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
                  {study.client}
                </p>
                <span className="mt-1 text-base font-semibold text-[#101214]">
                  {study.title}
                </span>
                <span className="mt-2 grow text-sm leading-relaxed text-[#41474d]">
                  {study.summary}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#9f3c27]">
                  {t.cta}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
