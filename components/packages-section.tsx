"use client";

import Image from "next/image";
import { packageRoutes } from "@/lib/package-routes";
import { useState } from "react";
import { ArrowRight, Check, Mail, MessageCircle, Phone } from "lucide-react";

import RailFaq from "@/vendor/rail-kit/RailFaq";
import { ALaCarteSection } from "@/components/a-la-carte-section";
import { Container } from "@/components/ui/container";
import { RealEstatePlansSection } from "@/components/real-estate-plans-section";
import { StarterOptions } from "@/components/starter-options";
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
import { ARRANQUE_WEEKLY_FROM, usd } from "@/lib/pricing";
import { quoteCtaLabel } from "@/lib/quote-cta";
import { absoluteUrl, site } from "@/lib/site";

export function PackagesSection({
  locale,
  showRealEstatePlans = true,
  quiet = false,
  showGuide = true,
}: {
  locale: Locale;
  /**
   * The monthly real-estate plans render here by default (the pricing pages).
   * The homepages pass false because they show the plans inside the
   * real-estate block under the reel shelf instead, and must not show them
   * twice.
   */
  showRealEstatePlans?: boolean;
  /**
   * The homepages pass true: by the time a visitor reaches this section
   * they have already seen the filled "Get a quote on WhatsApp" button in
   * the hero, the contact strip and the closing section, so every package
   * card's own WhatsApp action becomes a quiet text link instead of a
   * fourth-plus filled button. /pricing and /es/precios keep the filled
   * version — it is their first WhatsApp CTA.
   */
  quiet?: boolean;
  /**
   * The homepages pass false. The four-package accordion duplicates the
   * SAME packages (same prices, from the same source) the chooser's own
   * `PriceSheet` already surfaces right at the decision — owner, 2026-10-12:
   * "these 2 sections should be consolidated".À la carte, the 3-step quote
   * process and the FAQ are NOT duplicates of the chooser (they are
   * single-item add-ons, how-it-works, and answers), so they still render.
   * /pricing and /es/precios, which have no chooser above them, keep the
   * full guide.
   */
  showGuide?: boolean;
}) {
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
          photo appears once, on a card that grows.
          showGuide=false (home pages only) skips this entire accordion: the
          chooser's own PriceSheet already lists every package and price at
          the decision itself, so repeating the four cards here would be the
          exact redundancy the owner asked to remove. */}
      {showGuide && (
      <section
        // #paquetes / #packages, because that is what the hero's primary CTA
        // has always pointed at. Merging the chooser into this section deleted
        // the element that carried those ids, and the main call to action on
        // the home page quietly led nowhere — no error, no jump, nothing.
        // The hero now leads with the WhatsApp quote instead (2026-10-10), but
        // the OfferCatalog schema still points at these ids, so they stay.
        id={locale === "es" ? "paquetes" : "packages"}
        className="em-pk-guide"
        aria-labelledby="em-pk-guide-title"
        data-section="packages"
      >
        <Container size="xl">
          <p className="em-pk-eyebrow em-eyebrow">{copy.chooser.eyebrow}</p>
          <h2 id="em-pk-guide-title" className="em-pk-title em-h2">
            {copy.chooser.title}
          </h2>
          <p className="em-pk-lead">{copy.chooser.lead}</p>

          <ol className="em-pk-cards" role="list" data-open={open ?? "none"}>
            {packages.map((pkg, index) => {
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
                        priority={index === 0}
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
                      <span className="em-pk-card__price">
                        {pkg.id === "arranque" ? (
                          <span className="em-pk-card__price-lines">
                            <span className="em-pk-card__price-line">
                              <span className="em-pk-card__price-prefix">{copy.price.from}</span>{" "}
                              <span className="em-pk-card__price-num em-price-figure">${price.kind === "from" ? price.amount.toLocaleString("en-US") : ""}</span>{" "}
                              <span className="em-pk-card__price-unit">{price.kind === "from" ? copy.price.units[price.unit] : ""}</span>
                            </span>
                            <span className="em-pk-card__price-line em-pk-card__price-line--alt">
                              <span className="em-pk-card__price-prefix">
                                <span className="sr-only">· </span>
                                {locale === "es" ? "o" : "or"}
                              </span>{" "}
                              <span className="em-pk-card__price-num em-price-figure">{usd(ARRANQUE_WEEKLY_FROM.perWeek)}</span>
                              <span className="em-pk-card__price-unit">
                                {locale === "es" ? "/semana si publicas cada semana" : "/week if you post weekly"}
                              </span>
                            </span>
                          </span>
                        ) : price.kind === "from" ? (
                          <span className="em-pk-card__price-line">
                            <span className="em-pk-card__price-prefix">{copy.price.from}</span>{" "}
                            <span className="em-pk-card__price-num em-price-figure">${price.amount.toLocaleString("en-US")}</span>{" "}
                            <span className="em-pk-card__price-unit">{copy.price.units[price.unit]}</span>
                          </span>
                        ) : (
                          <span className="em-pk-card__price-line em-pk-card__price-line--custom">
                            <span className="em-pk-card__price-custom em-price-figure em-price-figure--words">
                              {locale === "es"
                                ? `${copy.price.customLine} ${copy.price.custom.toLowerCase()}`
                                : `${copy.price.custom} ${copy.price.customLine.toLowerCase()}`}
                            </span>
                          </span>
                        )}
                      </span>
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

                      {pkg.id === "arranque" ? (
                        <StarterOptions locale={locale} quiet={quiet} />
                      ) : (
                        <div className="em-pk-open-price">
                          {price.kind === "from" ? (
                            <div className="em-pk-open-price__box">
                              <span className="em-pk-open-price__prefix">{copy.price.from}</span>
                              <span className="em-pk-open-price__num em-price-figure">${price.amount.toLocaleString("en-US")}</span>
                              <span className="em-pk-open-price__unit">{copy.price.units[price.unit]}</span>
                            </div>
                          ) : (
                            <div className="em-pk-open-price__box em-pk-open-price__box--custom">
                              <span className="em-pk-open-price__custom-line">{copy.price.customLine}</span>
                              <span className="em-pk-open-price__custom em-price-figure em-price-figure--words">{copy.price.custom}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <p className="em-pkcard__ideal">{pkg.idealFor}</p>

                      <div className="em-pkcard__actions">
                        {pkg.id !== "arranque" && (
                          <a
                            href={whatsappHref(site.phone.e164, quoteText(pkg.name))}
                            className={quiet ? "em-pkcard__cta-quiet" : "em-pkcard__cta"}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta={`package_${pkg.id}_whatsapp`}
                            aria-label={`${quoteCtaLabel(locale)}: ${copy.packages.packageWord} ${pkg.name}`}
                          >
                            <MessageCircle className="size-4" aria-hidden="true" />
                            {quoteCtaLabel(locale)}
                          </a>
                        )}
                        <a href={packageRoutes[pkg.id][locale]} className="em-package-detail-link" data-cta={`package_${pkg.id}_details`}>
                          {locale === "es" ? "Ver detalles del paquete" : "View package details"}
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>
      )}

      {/* 2b. Real estate: its own buyer and its own plan sizes, so its own
          section directly under the four packages. */}
      {showRealEstatePlans ? <RealEstatePlansSection locale={locale} /> : null}

      <ALaCarteSection locale={locale} />

      {/* 4. The three steps. */}
      <section className="em-pk-steps" aria-labelledby="em-pk-steps-title" data-section="quote_process">
        <Container size="xl">
          <p className="em-pk-eyebrow em-eyebrow">{copy.process.eyebrow}</p>
          <h2 id="em-pk-steps-title" className="em-pk-title em-h2">
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
          <p className="em-pk-eyebrow em-eyebrow">{locale === "es" ? "Preguntas rápidas" : "Quick answers"}</p>
          <h2 id="em-pk-faq-title" className="em-pk-title em-h2">
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
        <h2 id="em-close-title" className="em-close__title em-h2">
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
            {quoteCtaLabel(locale)}
          </a>
          {/* Call and email stay, as quiet text links: the WhatsApp quote is
              the one primary action here, as everywhere on the page. */}
          <a href={site.phone.href} className="em-close__textlink" data-cta="closing_phone">
            <Phone className="size-4" aria-hidden="true" />
            {copy.call}
          </a>
          <a href={`mailto:${site.email}`} className="em-close__textlink" data-cta="closing_email">
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
