"use client";

import Image from "next/image";
import Link from "next/link";
import { packageRoutes } from "@/lib/package-routes";
import { useState } from "react";
import { ArrowRight, Check, Mail, MessageCircle, Phone } from "lucide-react";

import RailFaq from "@/vendor/rail-kit/RailFaq";
import RailPrice from "@/vendor/rail-kit/RailPrice";
import { Container } from "@/components/ui/container";
import {
  packageAnchor,
  packageFaq,
  packagesCopy,
  packagesJsonLd,
  packagesFor,
  priceFor,
  whatsappHref,
  type Locale,
  type PackageContent,
} from "@/lib/packages";
import { entityIds } from "@/lib/entity-schema";
import { absoluteUrl, site } from "@/lib/site";

/* The icon medallions are gone on purpose: a black rounded-square tile per row
   (and a sparkle for "IA") is the stock SaaS card device, and the chooser is
   now a compact list. lib/packages.ts still carries the `icon` field for any
   future surface that wants one. */

export function PackagesSection({ locale }: { locale: Locale }) {
  const copy = packagesCopy(locale);
  const packages = packagesFor(locale);
  const [open, setOpen] = useState<PackageContent["id"] | null>(null);

  /**
   * One card opens at a time, and opening one keeps it under your thumb.
   *
   * There is no navigation left in this section: the card you tapped grows in
   * place. That is why the horizontal track, the chips and the anchor-landing
   * handler are gone — they existed to move the visitor between a chooser and
   * a second section that showed the same four photos again.
   */
  const choose = (id: PackageContent["id"]) => {
    const next = open === id ? null : id;
    setOpen(next);
    if (!next) return;
    history.replaceState(null, "", `#${packageAnchor(id)}`);
    // Keep the card's top where the eye already is, under the sticky header.
    window.requestAnimationFrame(() => {
      const el = document.getElementById(packageAnchor(id));
      const header = document.querySelector("header");
      if (!el) return;
      const top = window.scrollY + el.getBoundingClientRect().top - (header?.getBoundingClientRect().height ?? 64) - 12;
      const reduced = !document.documentElement.classList.contains("rail-anim");
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    });
  };

  const quoteText = (name: string) =>
    locale === "es"
      ? `Hola Esteban, vi tu página y me interesa el paquete ${name}.`
      : `Hi Esteban, I saw your site and I'm interested in the ${name} package.`;

  return (
    <div className="em-pk">
      {/* 1 + 2. ONE guided section: you pick what you need, and the card you
          picked BECOMES the package. It used to be two sections — a chooser,
          then a track of package cards — which showed the same four photos
          twice in a row and made the visitor navigate between them. Now the
          photo appears once, on a card that grows. */}
      <section
        // #paquetes / #packages, because that is what the hero's primary CTA
        // has always pointed at. Merging the chooser into this section deleted
        // the element that carried those ids, and the main call to action on
        // the home page quietly led nowhere — no error, no jump, nothing.
        id={locale === "es" ? "paquetes" : "packages"}
        className="em-pk-guide"
        aria-labelledby="em-pk-guide-title"
        data-section="packages"
      >
        <Container size="xl">
          <p className="em-pk-eyebrow">{copy.chooser.eyebrow}</p>
          <h2 id="em-pk-guide-title" className="em-pk-title">
            {copy.chooser.title}
          </h2>
          <p className="em-pk-lead">{copy.chooser.lead}</p>

          <ol className="em-pk-cards" role="list" data-open={open ?? "none"}>
            {packages.map((pkg) => {
              const price = priceFor(pkg.id);
              const isOpen = open === pkg.id;
              const anchor = packageAnchor(pkg.id);
              return (
                <li
                  key={pkg.id}
                  id={anchor}
                  className="em-pk-card"
                  data-state={isOpen ? "open" : open ? "folded" : "idle"}
                  data-scene={pkg.id === "todo-incluido" ? "screenshot" : undefined}
                  data-em-reveal
                >
                  {/* The WAI-ARIA accordion shape: a heading that contains the
                      control. The first pass put the package name in a span,
                      which silently flattened the page's outline — text-parity
                      caught the four lost h3s. */}
                  <h3 className="em-pk-card__h">
                  <button
                    type="button"
                    className="em-pk-card__head"
                    aria-expanded={isOpen}
                    aria-controls={`${anchor}-body`}
                    // The heading wraps the whole card face, so without this
                    // the h3 announces "01 Paquete Arranque Edición remota Ya
                    // tengo videos Necesito que alguien los edite y los
                    // convierta en contenido..." — a paragraph where a screen
                    // reader's heading list needs a name.
                    aria-label={`${copy.packages.packageWord} ${pkg.name}`}
                    onClick={() => choose(pkg.id)}
                    data-cta={`package_open_${pkg.id}`}
                  >
                    <span className="em-pk-card__scene">
                      <Image
                        src={pkg.image.src}
                        alt={pkg.image.alt}
                        fill
                        sizes="(min-width: 1024px) 560px, 92vw"
                        style={{ objectPosition: pkg.image.sceneFocal ?? pkg.image.focal }}
                      />
                      <span className="em-pk-card__credit">
                        <span className="em-pkcard__number">{pkg.number}</span>
                        <span className="em-pkcard__word">{copy.packages.packageWord}</span>
                        <span className="em-pkcard__name" id={`${anchor}-name`}>
                          {pkg.name}
                        </span>
                        <span className="em-pkcard__subtitle">{pkg.subtitle}</span>
                      </span>
                    </span>
                    <span className="em-pk-card__need">
                      <span className="em-pk-card__need-title">{pkg.need.title}</span>
                      <span className="em-pk-card__need-line">{pkg.need.line}</span>
                      <span className="em-pk-card__go">
                        {isOpen ? copy.chooser.close : copy.chooser.cta(pkg.name)}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                  </h3>

                  <div className="em-pk-card__body" id={`${anchor}-body`}>
                    <div className="em-pk-card__inner">
                      <p className="em-pkcard__headline">
                        {pkg.headline.map((l) => (
                          <span key={l}>{l}</span>
                        ))}
                      </p>
                      <p className="sr-only">{copy.packages.includesLabel}</p>
                      <ul className="em-pkcard__includes" role="list">
                        {pkg.includes.map((item) => (
                          <li key={item}>
                            <Check className="size-3.5" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="em-pkcard__price">
                        {price.kind === "from" ? (
                          <>
                            <RailPrice
                              now={price.amount.toLocaleString("en-US")}
                              prefix={copy.price.from}
                              size="lg"
                              source={`package_${pkg.id}`}
                            />
                            <span className="em-pkcard__unit">{copy.price.units[price.unit]}</span>
                          </>
                        ) : (
                          <>
                            <span className="em-pkcard__custom-line">{copy.price.customLine}</span>
                            <span className="em-pkcard__custom">{copy.price.custom}</span>
                          </>
                        )}
                      </div>

                      <p className="em-pkcard__ideal">{pkg.idealFor}</p>

                      <a
                        href={whatsappHref(site.phone.e164, quoteText(pkg.name))}
                        className="em-pkcard__cta"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta={`package_${pkg.id}_whatsapp`}
                      >
                        <MessageCircle className="size-4" aria-hidden="true" />
                        {copy.packages.quote(pkg.name)}
                      </a>
                      <a href={packageRoutes[pkg.id][locale]} className="em-package-detail-link" data-cta={`package_${pkg.id}_details`}>
                        {locale === "es" ? "Ver detalles del paquete" : "View package details"}
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* 3. A la carte. */}
      <section className="em-pk-carte" aria-labelledby="em-pk-carte-title" data-section="a_la_carte">
        <Container size="xl">
          <p className="em-pk-eyebrow">{copy.aLaCarte.eyebrow}</p>
          <h2 id="em-pk-carte-title" className="em-pk-title">
            {copy.aLaCarte.title}
          </h2>
          <p className="em-pk-lead">{copy.aLaCarte.lead}</p>
          <ul className="em-pk-carte__grid" role="list" data-em-reveal>
            {copy.aLaCarte.items.map((item) => {
              const inner = (
                <>
                  <span className="em-pk-carte__title">{item.title}</span>
                  {item.note && <span className="em-pk-carte__note">{item.note}</span>}
                  <ArrowRight className="em-pk-carte__go size-4" aria-hidden="true" />
                </>
              );
              return (
                <li key={item.id} data-em-reveal>
                  {item.href ? (
                    <Link href={item.href} className="em-pk-carte__item">
                      {inner}
                    </Link>
                  ) : (
                    <div className="em-pk-carte__item">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

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
