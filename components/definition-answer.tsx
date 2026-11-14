import { renderFormattedText } from "@/components/formatted-text";
import { Container } from "@/components/ui/container";
import { definitionAnswerFor } from "@/lib/definition-answers";

/**
 * The "What is a … ?" answer, server-rendered near the top of the page so the
 * definition is the first thing a reader and a crawler meet after the hero.
 * Content lives in lib/definition-answers.ts; renders nothing for a path that
 * has no entry.
 */
export function DefinitionAnswer({ path, collapsible = false }: { path: string; collapsible?: boolean }) {
  const entry = definitionAnswerFor(path);
  if (!entry) return null;

  return (
    <section
      className="py-10 sm:py-14"
      data-section="definition"
      aria-labelledby={entry.id}
    >
      <Container size="xl">
        <article className="mx-auto max-w-4xl space-y-4">
          <h2 id={entry.id} className="font-serif text-3xl sm:text-4xl text-[#101214]">
            {entry.heading}
          </h2>
          {collapsible ? (
            <details className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-[#101214]">
                The simple definition, examples, and what makes it different
                <span className="text-[#9f3c27] group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <div className="mt-5 space-y-4 text-base leading-8 text-[#252a2d]">
                {entry.paragraphs.map((paragraph, index) => (
                  <p key={index}>{renderFormattedText(paragraph)}</p>
                ))}
              </div>
            </details>
          ) : (
            <div className="space-y-4 text-base leading-8 text-[#252a2d]">
              {entry.paragraphs.map((paragraph, index) => (
                <p key={index}>{renderFormattedText(paragraph)}</p>
              ))}
            </div>
          )}
        </article>
      </Container>
    </section>
  );
}
