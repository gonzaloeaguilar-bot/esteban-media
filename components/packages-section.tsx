"use client";

import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";

import RailFaq from "@/vendor/rail-kit/RailFaq";
import { ALaCarteSection } from "@/components/a-la-carte-section";
import { Container } from "@/components/ui/container";
import { NeedsChooser } from "@/components/needs-chooser";
import { packageFaq, packagesCopy, packagesJsonLd, whatsappHref, type Locale } from "@/lib/packages";
import { entityIds } from "@/lib/entity-schema";
import { absoluteUrl, site } from "@/lib/site";

export function PackagesSection({ locale }: { locale: Locale }) {
  const copy = packagesCopy(locale);

  return (
    <div className="em-pk">
      {/* 1. One question, four doors — real estate first and highlighted,
          the site still open to every other kind of client. Replaces the
          package-card chooser and the separate real-estate section: the
          real-estate plans now live behind the first door. */}
      <NeedsChooser locale={locale} />

      <ALaCarteSection locale={locale} />

      {/* 4. The three steps. */}
      <section className="em-pk-steps" aria-labelledby="em-pk-steps-title" data-section="quote_process">
        <Container size="xl">
          <p className="em-pk-eyebrow">{copy.process.eyebrow}</p>
          <h2 id="em-pk-steps-title" className="em-pk-title">
            {copy.process.title}
          </h2>
          <p className="em-pk-lead">{copy.process.lead}</p>
          <ol className="em-pk-steps__list" data-em-reveal>
            {copy.process.steps.map((step, i) => (
              <li key={step.title}>
                <span className="em-pk-steps__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="em-pk-steps__title">{step.title}</span>
                <span className="em-pk-steps__body">{step.body}</span>
              </li>
            ))}
          </ol>
          <p className="em-pk-steps__note">{copy.process.note}</p>
        </Container>
      </section>

      {/* 5. Quick answers — the questions people actually ask ("¿cuánto cobras
          por editar?"), answered first, from the same data as the cards. The
          same text feeds the FAQPage schema below, so search and AI answers
          quote exactly what a visitor reads. */}
      <section className="em-pk-faq" aria-labelledby="em-pk-faq-title" data-section="package_faq">
        <Container size="xl">
          <p className="em-pk-eyebrow">{locale === "es" ? "Preguntas rápidas" : "Quick answers"}</p>
          <h2 id="em-pk-faq-title" className="em-pk-title">
            {locale === "es" ? "Lo que todos preguntan." : "What everyone asks."}
          </h2>
          <RailFaq
            className="em-pk-faq__list"
            source="package_faq"
            items={packageFaq(locale).map((q) => ({ id: q.id, question: q.question, answer: q.answer }))}
          />
        </Container>
      </section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(packagesJsonLd(locale, absoluteUrl(locale === "es" ? "/es" : "/"), entityIds.business)),
        }}
      />
    </div>
  );
}

/** The closing credit: one line, three ways to reach Esteban. */
export function ClosingCredits({ locale, children }: { locale: Locale; children?: React.ReactNode }) {
  const copy = packagesCopy(locale).closing;
  const greeting =
    locale === "es" ? "Hola Esteban, quiero hablar de un proyecto." : "Hi Esteban, I'd like to talk about a project.";
  return (
    <section
      className="em-close"
      aria-labelledby="em-close-title"
      data-section="closing_cta"
      data-em-hides-sticky
    >
      <Image
        src="/portfolio/diana-jack.jpg"
        alt=""
        fill
        sizes="100vw"
        className="em-close__image"
      />
      <Container size="xl" className="em-close__inner">
        <h2 id="em-close-title" className="em-close__title">
          {copy.title}
        </h2>
        <p className="em-close__lead">{copy.lead}</p>
        <div className="em-close__actions">
          <a
            href={whatsappHref(site.phone.e164, greeting)}
            target="_blank"
            rel="noopener noreferrer"
            className="em-cine__cta em-cine__cta--primary"
            data-cta="closing_whatsapp"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {copy.whatsapp}
          </a>
          <a href={site.phone.href} className="em-cine__cta em-cine__cta--ghost">
            <Phone className="size-4" aria-hidden="true" />
            {copy.call}
          </a>
          <a href={`mailto:${site.email}`} className="em-close__textlink">
            <Mail className="size-4" aria-hidden="true" />
            {copy.email}
          </a>
        </div>
        {children && <div className="em-close__more">{children}</div>}
        <p className="em-close__sign" aria-hidden="true">
          {locale === "es"
            ? "Esteban Moreno Media · Contenido · Producción · Digital"
            : "Esteban Moreno Media · Content · Production · Digital"}
        </p>
      </Container>
    </section>
  );
}
