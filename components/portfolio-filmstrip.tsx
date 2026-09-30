"use client";

import Image from "next/image";

import RailCoverflow from "@/vendor/rail-kit/RailCoverflow";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/portfolio";

/**
 * The work, as a strip of film you walk through.
 *
 * The brief, verbatim: *"el carrusel de los proyectos pueden ser
 * simplemente así como si fueran esos filmes cuadrados y tú vas andando por
 * ellos"* — and, deliberately, **simpler than the 3D camera**, which Esteban
 * rejected because nobody could tell what it was for.
 *
 * So this is not a new 3D object. It is `RailCoverflow`, already in the kit and
 * never used here: a row in perspective with the chosen frame facing you and the
 * rest turning inward, a reflection on the floor, and every frame a real button
 * you can reach with the keyboard. The depth is CSS, not a model — nothing to
 * download, nothing to wait for, and it cannot fail to load the way 2.1MB of
 * camera did.
 *
 * The film frame around each still is the site's own device: the corner brackets
 * and sprockets the art-direction pass asked to keep.
 *
 * On the words question, which is the real tension in the brief: this section
 * carries a title and a year per frame and NOTHING else. The reading lives in
 * the project pages, which each frame links to — so a visitor sees pictures and
 * a crawler still gets every word, on the page where those words belong.
 */
export function PortfolioFilmstrip({
  locale,
  heading,
}: {
  locale: "en" | "es";
  heading: string;
}) {
  const es = locale === "es";
  const base = es ? "/es/portafolio" : "/portfolio";

  // A type predicate, not a bare filter: `filter` does not narrow a union, and
  // the strip only knows how to draw a still. A YouTube or placeholder entry has
  // no `src` and would have to be invented.
  const hasStill = (
    item: PortfolioItem,
  ): item is PortfolioItem & { media: Extract<PortfolioItem["media"], { kind: "image" }> } =>
    item.media.kind === "image";

  const items = PORTFOLIO_ITEMS.filter(hasStill).map((item) => ({
    id: item.id,
    label: item.title,
    href: `${base}/${item.id}`,
    art: (
      // The frame carries its OWN link, deliberately. RailCoverflow does not
      // make each piece a button — it says why in its own source: a button
      // inside a button is invalid HTML and axe caught it twice, so the rail is
      // a keyboard-navigable group and each piece keeps its own controls.
      //
      // Reaching for `onSelect` instead would have left ten frames with nothing
      // focusable and nothing for a crawler to follow. This way the strip is
      // also ten internal links to the project pages.
      <figure className="em-film">
        <a className="em-film__link" href={`${base}/${item.id}`} data-cta={`filmstrip_${item.id}`}>
          <span className="em-film__perf" aria-hidden="true" />
          <Image
            src={item.media.src}
            alt={item.media.alt}
            width={640}
            height={640}
            sizes="(min-width: 1024px) 320px, 70vw"
            className="em-film__still"
          />
          <span className="em-film__perf" aria-hidden="true" />
          <figcaption className="em-film__cap">
            <span className="em-film__name">{item.title}</span>
            <span className="em-film__year">{item.year}</span>
          </figcaption>
        </a>
      </figure>
    ),
  }));

  return (
    <section className="em-film-strip" data-section="portfolio_filmstrip">
      <h2 className="em-film-strip__title">{heading}</h2>
      <RailCoverflow
        items={items}
        label={heading}
        source="portfolio_filmstrip"
        neighbours={2}
        reflection
        // No navigation here on purpose: centring a frame and opening it are
        // two different gestures, and making the first do the second means a
        // visitor cannot look without leaving.
      />
    </section>
  );
}
