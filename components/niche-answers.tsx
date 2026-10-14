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
export function NicheAnswers({ path, fact }: { path: string; fact: string }) {
  const entry = nicheEntry(path, fact);
  if (!entry) return null;
  const { folded, contact } = nicheSections(entry);
  const es = entry.locale === "es";
  const slug = path.split("/").pop();

  return (
    <section className="border-t border-[#ddd4c8] py-12 sm:py-16" data-section="niche_answers" aria-label={es ? "Respuestas rápidas" : "Quick answers"}>
      <Container size="xl">
        <div className="mx-auto max-w-4xl space-y-10">
          <KeepReading
            className="em-reading-paper"
            id={es ? "respuestas" : "answers"}
            title={es ? `Quién lo hace${entry.cost ? " y cuánto cuesta" : ""}` : `Who does it${entry.cost ? " and what it costs" : ""}`}
            destinations={
              es
                ? `Quién te ayuda con ${entry.subject}${entry.cost ? ", precios publicados" : ""} y cómo empezar.`
                : `Who can help with ${entry.subject}${entry.cost ? ", published prices" : ""} and how to start.`
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
