import { renderFormattedText } from "@/components/formatted-text";
import { Container } from "@/components/ui/container";
import { pageQuestionsFor } from "@/lib/page-questions";

/**
 * Question-shaped answers from lib/page-questions.ts, server-rendered so a
 * reader and a crawler meet the same words. Optional depth renders as a native
 * <details>, never a client-mounted accordion. Renders nothing for a path with
 * no entry.
 */
export function PageQuestions({ path }: { path: string }) {
  const entries = pageQuestionsFor(path);
  if (entries.length === 0) return null;

  return (
    <>
      {entries.map((entry) => (
        <section
          key={entry.id}
          className="py-10 sm:py-14"
          data-section="page-question"
          aria-labelledby={entry.id}
        >
          <Container size="xl">
            <article className="mx-auto max-w-4xl space-y-4">
              <h2 id={entry.id} className="font-serif text-3xl sm:text-4xl text-[#101214]">
                {entry.heading}
              </h2>
              <div className="space-y-4 text-base leading-8 text-[#252a2d]">
                {entry.paragraphs.map((paragraph, index) => (
                  <p key={index}>{renderFormattedText(paragraph)}</p>
                ))}
              </div>
              {entry.details ? (
                <details className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                  <summary className="cursor-pointer font-medium text-[#9f3c27]">
                    {entry.details.summary}
                  </summary>
                  <div className="mt-4 space-y-4 text-base leading-8 text-[#252a2d]">
                    {entry.details.paragraphs.map((paragraph, index) => (
                      <p key={index}>{renderFormattedText(paragraph)}</p>
                    ))}
                  </div>
                </details>
              ) : null}
            </article>
          </Container>
        </section>
      ))}
    </>
  );
}
