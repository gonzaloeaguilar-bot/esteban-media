import { Container } from "@/components/ui/container";
import { renderFormattedText } from "@/components/formatted-text";
import { ownerFactAnswers } from "@/lib/owner-fact-answers";

/**
 * Question-shaped sections built from the 2026-10-14 owner facts (vlogs, Latin
 * American clients, web and chatbots). Renders nothing for a path with no entry,
 * so a page can carry the slot without changing until it has an answer.
 * Server-rendered text; optional depth sits in a native <details>.
 */
export function OwnerFactAnswers({ path }: { path: string }) {
  const sections = ownerFactAnswers(path);
  if (sections.length === 0) return null;
  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="border-b border-[#ddd4c8] py-12 sm:py-16"
          aria-labelledby={`${section.id}-heading`}
          data-section={`owner_fact_${section.id}`}
        >
          <Container size="xl">
            <div className="max-w-3xl">
              <h2 id={`${section.id}-heading`} className="font-serif text-3xl leading-tight sm:text-4xl">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-[#252a2d]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{renderFormattedText(paragraph)}</p>
                ))}
              </div>
              {section.details ? (
                <details className="em-qa mt-6 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                  <summary className="cursor-pointer font-medium" data-cta={`owner_fact_${section.id}_details`}>
                    {section.details.summary}
                  </summary>
                  <div className="mt-4 space-y-4 text-base leading-8 text-[#252a2d]">
                    {section.details.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{renderFormattedText(paragraph)}</p>
                    ))}
                  </div>
                </details>
              ) : null}
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
