import { Mail, MessageCircle, Phone } from "lucide-react";

import { renderFormattedText } from "@/components/formatted-text";
import { KeepReading } from "@/components/keep-reading";
import { PageUpdated } from "@/components/page-updated";
import { Container } from "@/components/ui/container";
import { nicheEntry, nicheSections, nicheWhatsappHref, type NicheSection } from "@/lib/niche-answers";
import { site } from "@/lib/site";

/**
 * The PR #316 answers on every niche page: "who can help me with ...", "how
 * much does ... cost", and a plain-text contact block. Server-rendered; the
 * first two sit in one native <details> (collapsed is not removed), the
 * contact answer stays open because a phone number behind a fold helps nobody.
 *
 * Renders nothing for a path that is not in lib/niche-answers.ts.
 */
export function NicheAnswers({ path, fact, omitCost = false }: { path: string; fact: string; omitCost?: boolean }) {
  const entry = nicheEntry(path, fact);
  if (!entry) return null;
  const sections = nicheSections(entry);
  const contact = sections.contact;
  // When the page already shows the cost answer as its own H2 near the top
  // (NicheCostAnswer), it is not repeated in the fold.
  const folded = omitCost ? sections.folded.filter((s) => s.id !== nicheCostId(entry)) : sections.folded;
  const showsCost = Boolean(entry.cost) && !omitCost;
  const es = entry.locale === "es";
  const slug = path.split("/").pop();

  return (
    <section className="border-t border-[#ddd4c8] py-12 sm:py-16" data-section="niche_answers" aria-label={es ? "Respuestas rápidas" : "Quick answers"}>
      <Container size="xl">
        <div className="mx-auto max-w-4xl space-y-10">
          <KeepReading
            className="em-reading-paper"
            id={es ? "respuestas" : "answers"}
            title={es ? `Quién lo hace${showsCost ? " y cuánto cuesta" : ""}` : `Who does it${showsCost ? " and what it costs" : ""}`}
            destinations={
              es
                ? `Quién te ayuda con ${entry.subject}${showsCost ? ", precios publicados" : ""} y cómo empezar.`
                : `Who can help with ${entry.subject}${showsCost ? ", published prices" : ""} and how to start.`
            }
          >
            <div className="mt-8 space-y-10">
              {folded.map((s) => (
                <Answer key={s.id} section={s} />
              ))}
            </div>
          </KeepReading>

          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8" data-section="niche_contact">
            <Answer section={contact} />
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.phone.href}
                data-cta={`niche_call_${slug}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                <Phone className="size-4" aria-hidden="true" />
                {es ? "Llamar" : "Call"} {site.phone.display}
              </a>
              <a
                href={nicheWhatsappHref(entry)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`niche_whatsapp_${slug}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`mailto:${site.email}`}
                data-cta={`niche_email_${slug}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email
              </a>
            </div>
            <PageUpdated path={path} locale={es ? "es" : "en"} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function nicheCostId(entry: NonNullable<ReturnType<typeof nicheEntry>>): string | undefined {
  const { folded } = nicheSections(entry);
  return entry.cost ? folded[folded.length - 1]?.id : undefined;
}

/** True when the path has a published-price answer NicheCostAnswer can show. */
export function hasNicheCost(path: string, fact: string): boolean {
  const entry = nicheEntry(path, fact);
  return Boolean(entry?.cost);
}

/**
 * The niche page's "how much does … cost" answer as its own open H2 section.
 *
 * Round 7 (2026-10-14): on 57 Spanish pages this answer existed only inside
 * the bottom fold ("Quién lo hace y cuánto cuesta"), an h3 at heading 14-25,
 * while the English GeoServicePage twins print the price as an H2 near the
 * top. Same words, moved up and left open; NicheAnswers then omits it.
 */
export function NicheCostAnswer({ path, fact }: { path: string; fact: string }) {
  const entry = nicheEntry(path, fact);
  if (!entry?.cost) return null;
  const { folded } = nicheSections(entry);
  const cost = folded[folded.length - 1];
  return (
    <section className="border-t border-[#ddd4c8] py-12 sm:py-16" id={cost.id} data-section="niche_cost">
      <Container size="xl">
        <div className="mx-auto max-w-4xl space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl">{cost.heading}</h2>
          <div className="space-y-4 text-base leading-8 text-[#252a2d]">
            {cost.paragraphs.map((p, i) => (
              <p key={i}>{renderFormattedText(p)}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Answer({ section }: { section: NicheSection }) {
  return (
    <article id={section.id} className="space-y-4">
      <h3 className="font-serif text-2xl sm:text-3xl text-[#101214]">{section.heading}</h3>
      <div className="space-y-4 text-base leading-8 text-[#252a2d]">
        {section.paragraphs.map((p, i) => (
          <p key={i}>{renderFormattedText(p)}</p>
        ))}
      </div>
    </article>
  );
}
