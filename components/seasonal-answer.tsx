import { renderFormattedText } from "@/components/formatted-text";
import { Container } from "@/components/ui/container";
import { seasonalAnswerFor } from "@/lib/seasonal-answers";

/**
 * The holiday-season answer on the restaurant pages (loop row 71): one
 * question-shaped section in the server-rendered HTML, with the shot list in a
 * native <details>. Content lives in lib/seasonal-answers.ts; renders nothing
 * for a path without an entry.
 */
export function SeasonalAnswer({ path }: { path: string }) {
  const entry = seasonalAnswerFor(path);
  if (!entry) return null;

  return (
    <section
      className="border-b border-[#ddd4c8] py-10 sm:py-14"
      data-section="seasonal_answer"
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
          <details className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-5">
            <summary className="min-h-11 cursor-pointer font-medium text-[#9f3c27]">
              {entry.shotListLabel}
            </summary>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-7 text-[#252a2d]">
              {entry.shotList.map((shot) => (
                <li key={shot}>{shot}</li>
              ))}
            </ul>
          </details>
        </article>
      </Container>
    </section>
  );
}
