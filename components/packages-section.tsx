"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  Clapperboard,
  Gauge,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Smartphone,
  Sparkles,
  Wand2,
  Workflow,
} from "lucide-react";

import RailPrice from "@/vendor/rail-kit/RailPrice";
import { Container } from "@/components/ui/container";
import {
  packageAnchor,
  packagesCopy,
  packagesFor,
  priceFor,
  whatsappHref,
  type ALaCarteItem,
  type Locale,
  type PackageContent,
} from "@/lib/packages";
import { site } from "@/lib/site";

const NEED_ICONS = {
  arranque: Clapperboard,
  crecimiento: Smartphone,
  "presencia-local": MapPin,
  "todo-incluido": Globe,
} as const;

const CARTE_ICONS: Record<ALaCarteItem["icon"], typeof Sparkles> = {
  sparkles: Sparkles,
  camera: Camera,
  wand: Wand2,
  map: MapPin,
  gauge: Gauge,
  workflow: Workflow,
};

export function PackagesSection({ locale }: { locale: Locale }) {
  const copy = packagesCopy(locale);
  const packages = packagesFor(locale);
  const trackRef = useRef<HTMLOListElement>(null);

  // A need card or a chip points at one package. On a phone the packages are a
  // horizontal track, so the anchor alone would scroll the page to the track
  // and leave the wrong card showing; this also slides the track to it. The
  // link stays a real #anchor, so without script it still lands.
  const goTo = (id: PackageContent["id"]) => (event: React.MouseEvent) => {
    const card = document.getElementById(packageAnchor(id));
    const trackEl = trackRef.current;
    if (!card || !trackEl) return;
    event.preventDefault();
    const reduced = !document.documentElement.classList.contains("rail-anim");
    trackEl.scrollTo({ left: card.offsetLeft - trackEl.offsetLeft - 16, behavior: reduced ? "auto" : "smooth" });
    const section = document.getElementById(locale === "es" ? "paquetes-detalle" : "packages-detail");
    section?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${packageAnchor(id)}`);
  };

  const quoteText = (name: string) =>
    locale === "es"
      ? `Hola Esteban, vi tu página y me interesa el paquete ${name}.`
      : `Hi Esteban, I saw your site and I'm interested in the ${name} package.`;

  return (
    <div className="em-pk">
      {/* 1. The chooser: the visitor names the need before reading any package. */}
      <section
        id={locale === "es" ? "paquetes" : "packages"}
        className="em-pk-choose"
        aria-labelledby="em-pk-choose-title"
        data-section="package_chooser"
      >
        <Container size="xl">
          <p className="em-pk-eyebrow">{copy.chooser.eyebrow}</p>
          <h2 id="em-pk-choose-title" className="em-pk-title">
            {copy.chooser.title}
          </h2>
          <p className="em-pk-lead">{copy.chooser.lead}</p>

          <ul className="em-pk-needs" role="list">
            {packages.map((pkg) => {
              const Icon = NEED_ICONS[pkg.id];
              return (
                <li key={pkg.id} data-em-reveal>
                  <a
                    href={`#${packageAnchor(pkg.id)}`}
                    className="em-pk-need"
                    onClick={goTo(pkg.id)}
                    data-cta={`package_chooser_${pkg.id}`}
                  >
                    <span className="em-pk-need__icon" aria-hidden="true">
                      <Icon className="size-5" />
                    </span>
                    <span className="em-pk-need__body">
                      <span className="em-pk-need__title">{pkg.need.title}</span>
                      <span className="em-pk-need__line">{pkg.need.line}</span>
                      <span className="em-pk-need__go">
                        {copy.chooser.cta(pkg.name)}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 2. The packages, as four scenes. */}
      <section
        id={locale === "es" ? "paquetes-detalle" : "packages-detail"}
        className="em-pk-scenes"
        aria-labelledby="em-pk-scenes-title"
        data-section="packages"
      >
        <Container size="xl">
          <p className="em-pk-eyebrow em-pk-eyebrow--light">{copy.packages.eyebrow}</p>
          <h2 id="em-pk-scenes-title" className="em-pk-title em-pk-title--light">
            {copy.packages.title}
          </h2>
          <nav className="em-pk-chips" aria-label={copy.packages.eyebrow}>
            {packages.map((pkg) => (
              <a
                key={pkg.id}
                href={`#${packageAnchor(pkg.id)}`}
                onClick={goTo(pkg.id)}
                data-cta={`package_chip_${pkg.id}`}
              >
                <span aria-hidden="true">{pkg.number}</span> {pkg.name}
              </a>
            ))}
          </nav>
        </Container>

        <ol ref={trackRef} className="em-pk-track" role="list">
          {packages.map((pkg) => {
            const price = priceFor(pkg.id);
            return (
              <li
                key={pkg.id}
                id={packageAnchor(pkg.id)}
                className="em-pkcard"
                data-em-reveal
                data-scene={pkg.id === "todo-incluido" ? "screenshot" : undefined}
              >
                <article aria-labelledby={`${packageAnchor(pkg.id)}-name`}>
                  <div className="em-pkcard__scene">
                    <Image
                      src={pkg.image.src}
                      alt={pkg.image.alt}
                      fill
                      sizes="(min-width: 1024px) 320px, 86vw"
                      style={{ objectPosition: pkg.image.sceneFocal ?? pkg.image.focal }}
                    />
                    <div className="em-pkcard__credit">
                      <span className="em-pkcard__number">{pkg.number}</span>
                      <span className="em-pkcard__word">{copy.packages.packageWord}</span>
                      <h3 id={`${packageAnchor(pkg.id)}-name`} className="em-pkcard__name">
                        {pkg.name}
                      </h3>
                      <span className="em-pkcard__subtitle">{pkg.subtitle}</span>
                    </div>
                  </div>

                  <div className="em-pkcard__body">
                    <p className="em-pkcard__headline">
                      {pkg.headline.map((line) => (
                        <span key={line}>{line}</span>
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
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      {/* 3. A la carte. */}
      <section className="em-pk-carte" aria-labelledby="em-pk-carte-title" data-section="a_la_carte">
        <Container size="xl">
          <p className="em-pk-eyebrow">{copy.aLaCarte.eyebrow}</p>
          <h2 id="em-pk-carte-title" className="em-pk-title">
            {copy.aLaCarte.title}
          </h2>
          <p className="em-pk-lead">{copy.aLaCarte.lead}</p>
          <ul className="em-pk-carte__grid" role="list">
            {copy.aLaCarte.items.map((item) => {
              const Icon = CARTE_ICONS[item.icon];
              const inner = (
                <>
                  <span className="em-pk-carte__icon" aria-hidden="true">
                    <Icon className="size-5" />
                  </span>
                  <span className="em-pk-carte__title">{item.title}</span>
                  {item.note && <span className="em-pk-carte__note">{item.note}</span>}
                  {item.href && <ArrowRight className="em-pk-carte__go size-4" aria-hidden="true" />}
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
          Esteban Moreno Media · Content · Production · Digital
        </p>
      </Container>
    </section>
  );
}
