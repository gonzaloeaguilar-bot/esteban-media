"use client";

import { Rail, type RailItem } from "@/vendor/rail-kit";
import { getPortfolioItemById } from "@/lib/portfolio";

/**
 * The Esteban side of the shared rail.
 *
 * The rail itself lives in `vendor/rail-kit` and knows nothing about this
 * brand. This file owns only what is Esteban-specific: the Spanish words the
 * rail says out loud, and how this site's own data becomes rail items. It
 * chooses layout — never wording that a visitor reads as a claim, and never a
 * picture the data does not actually carry.
 */

/** Every word the rail itself speaks. The site is Spanish-first. */
export const RAIL_LABELS_ES = {
  back: "Anterior",
  forward: "Siguiente",
  position: (from: number, to: number, total: number) =>
    from === to ? `${from} de ${total}` : `${from}–${to} de ${total}`,
};

/** The same, for the English side of the site. */
export const RAIL_LABELS_EN = {
  back: "Previous",
  forward: "Next",
  position: (from: number, to: number, total: number) =>
    from === to ? `${from} of ${total}` : `${from}–${to} of ${total}`,
};

/**
 * The poster still for a portfolio link, or `null`.
 *
 * `null` is a real answer, not a failure: a card shape with an empty picture
 * slot reads as half-built, so a project with no approved still becomes a text
 * card instead of a media card with a hole in it. The poster is never guessed
 * from the slug — it comes from the portfolio record or it does not exist.
 */
function posterFor(href: string): { src: string; alt: string } | null {
  const id = href.split("/").filter(Boolean).pop();
  if (!id) return null;
  const item = getPortfolioItemById(id);
  if (!item) return null;
  const media = item.media;
  // Only the three shapes that actually carry an approved local still. An
  // Instagram embed has no local file and a placeholder is, by name, the
  // absence of one — both correctly fall through to `null`.
  switch (media.kind) {
    case "image":
      // The portfolio record already wrote this alt; it is not re-invented here.
      return { src: media.src, alt: media.alt };
    case "youtube":
    case "video":
      // The alt describes the still itself. It never asserts that the picture
      // illustrates whatever copy happens to sit beside it.
      return { src: media.poster, alt: `Fotograma del proyecto ${item.title}` };
    default:
      return null;
  }
}

export type ProjectLink = { href: string; title: string; detail: string };

/**
 * Published work as a rail of stills.
 *
 * This is the only place on a niche page where a photograph appears, and the
 * reason the rail was worth adopting: the pages carried real project links and
 * rendered every one of them as a bordered box of text.
 */
export function ProjectRail({
  projects,
  source,
  cta,
}: {
  projects: ProjectLink[];
  source: string;
  cta: string;
}) {
  const items: RailItem[] = projects.map((project) => {
    const image = posterFor(project.href);
    const common = {
      id: project.href,
      href: project.href,
      title: project.title,
      description: project.detail,
      cta,
    };
    return image
      ? { ...common, kind: "media" as const, image }
      : { ...common, kind: "text" as const, glyph: null };
  });

  return (
    <Rail
      items={items}
      source={source}
      variant="poster"
      size="lg"
      // Without this the region announces itself as `Options — ${source}`:
      // English, on a Spanish page, followed by a telemetry slug. The page's
      // own h2 already names this strip on screen, so a visible `heading`
      // would just say it twice.
      ariaLabel="Proyectos publicados"
      // `span`, not a heading — which is the kit's own default for a rail of
      // posters. These titles were spans before the redesign, and promoting
      // them to h3 inserts two entries into the page outline. The rail-kit
      // docs are right that cards which ARE the page content deserve a real
      // heading level; on a niche page they are a supporting proof strip under
      // an h2 that already names them, so the outline stays as it was. Moving
      // them is a deliberate structural decision, not a side effect of
      // changing how they look.
      cta="link"
      labels={RAIL_LABELS_ES}
      showControls
    />
  );
}

export type ServiceLink = {
  id: string;
  name: string;
  description: string;
  href: string;
};

/**
 * Related services. Text cards: these have words, not pictures, and a media
 * card with no picture is worse than a text card with good ones.
 */
export function ServiceRail({
  services,
  source,
  cta,
}: {
  services: ServiceLink[];
  source: string;
  cta: string;
}) {
  const items: RailItem[] = services.map((service) => ({
    kind: "text",
    id: service.id,
    href: service.href,
    title: service.name,
    description: service.description,
    glyph: null,
    cta,
  }));

  return (
    <Rail
      items={items}
      source={source}
      size="md"
      ariaLabel="Servicios relacionados"
      titleAs="h3"
      cta="link"
      labels={RAIL_LABELS_ES}
      showControls
    />
  );
}
