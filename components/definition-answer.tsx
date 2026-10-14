import { renderFormattedText } from "@/components/formatted-text";
import { Container } from "@/components/ui/container";
import { definitionAnswerFor } from "@/lib/definition-answers";

/**
 * The "What is a … ?" answer, server-rendered near the top of the page so the
 * definition is the first thing a reader and a crawler meet after the hero.
 * Content lives in lib/definition-answers.ts; renders nothing for a path that
 * has no entry.
 */
export function DefinitionAnswer({ path }: { path: string }) {
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
          <div className="space-y-4 text-base leading-8 text-[#252a2d]">
            {entry.paragraphs.map((paragraph, index) => (
              <p key={index}>{renderFormattedText(paragraph)}</p>
            ))}
          </div>
        </article>
      </Container>
    </section>
  );
}
