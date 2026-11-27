import { CaseStudyCardRail } from "@/components/em-rails";
import { Container } from "@/components/ui/container";
import {
  getCaseStudyById,
  getCaseStudyPath,
  type CaseStudyId,
  type CaseStudyLocale,
} from "@/lib/case-studies";

/** The case studies the 2026-11-26 batch added or rebuilt, newest first. */
export const LATEST_CASE_STUDY_IDS = [
  "real-estate-reels-davie",
  "ai-edit-prep-reel",
  "dupont-ai-commercial",
  "banacol",
] as const satisfies readonly CaseStudyId[];

/** First sentence of a summary: the answer-first line shown on the card. */
export function openingSentence(text: string): string {
  const match = text.match(/^.+?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
}

/**
 * A titled strip of case-study cards. GA4 (60 days to 2026-11-26) shows every
 * lead starting on the home page, the portfolio, About or a case study and none
 * on a service page, so service pages link to their proof here.
 */
export function CaseStudyRail({
  ids,
  locale,
  source,
  heading,
}: {
  ids: readonly CaseStudyId[];
  locale: CaseStudyLocale;
  source: string;
  heading?: string;
}) {
  const es = locale === "es";
  const cards = ids.flatMap((id) => {
    const study = getCaseStudyById(locale, id);
    if (!study) return [];
    return [
      {
        id,
        href: getCaseStudyPath(study),
        title: study.title,
        detail: openingSentence(study.summary),
        image: {
          src: study.posterUrl,
          alt: es ? `Fotograma del caso ${study.client}` : `Still from the ${study.client} case study`,
        },
      },
    ];
  });
  if (cards.length === 0) return null;

  return (
    <section
      data-section="case_study_rail"
      data-case-study-rail={source}
      className="border-t border-[#d6ccc0] py-10 sm:py-14"
      aria-labelledby={`case-study-rail-${source}`}
    >
      <Container size="xl">
        <h2 id={`case-study-rail-${source}`} className="font-serif text-3xl leading-tight sm:text-4xl">
          {heading ?? (es ? "¿Cómo se ve este trabajo en un caso real?" : "What does this work look like in a real case?")}
        </h2>
        <div className="mt-6">
          <CaseStudyCardRail
            cards={cards}
            source={source}
            locale={locale}
            cta={es ? "Leer el caso" : "Read the case study"}
          />
        </div>
      </Container>
    </section>
  );
}
