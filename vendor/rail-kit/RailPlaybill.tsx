"use client";

import type { RailAction } from "./types";

export type RailPlaybillProps = {
  /** The picture. */
  image: { src: string; alt: string };
  /**
   * How the picture is allowed to be treated — the whole point of this
   * component.
   *
   * `"artwork"` for an authored poster: a designed piece whose title, credits
   * or lockup live *inside* the pixels. It renders at its natural ratio, so it
   * is never cropped and never letterboxed. A narrower complete poster beats a
   * wider clipped one.
   *
   * `"photo"` for an ordinary photograph, which may be cropped to fill.
   *
   * Defaults to `"artwork"`: cropping a photo is a cosmetic mistake, cropping
   * authored artwork destroys information, so the safe default is the one that
   * cannot lose anything.
   */
  fit?: "artwork" | "photo";
  /**
   * Where a `"photo"` is anchored when cropped. Defaults to `"center top"` —
   * faces sit high in a portrait, so the crop should eat the bottom. Ignored
   * for `"artwork"`.
   */
  focal?: string;
  /** Aspect of the crop box for a `"photo"`. Ignored for `"artwork"`. */
  ratio?: string;
  /** Short title, under the picture — never over it. */
  title?: string;
  /** One line under the title: a date, a venue, a role. Facts only. */
  meta?: string;
  /**
   * Where the picture came from, when the picture is not evidence of the thing
   * described. Rendered as a visible credit, not a tooltip.
   */
  credit?: string;
  /** Rendered below the picture, outside it. Never over a face. */
  actions?: RailAction[];
  source: string;
  onSelect?: (info: { source: string; actionId: string; actionIndex: number }) => void;
  className?: string;
};

/**
 * A poster that fills its width with no dead side bands and no clipped
 * titles — the bleed poster both danielzea-site and the Castiblanco carousels
 * built separately before it lived here.
 *
 * The rule it encodes: a picture with words baked into it is not croppable.
 * Swapping `contain` for `cover` removes the side bands and clips the credits;
 * swapping back restores the credits and returns the bands. Neither is a fix.
 * The fix is to stop forcing authored artwork into a fixed box at all, and to
 * put the action row outside the picture so it can never land on a face.
 */
export default function RailPlaybill({
  image,
  fit = "artwork",
  focal = "center top",
  ratio,
  title,
  meta,
  credit,
  actions = [],
  source,
  onSelect,
  className,
}: RailPlaybillProps) {
  const resolved = actions.slice(0, 3).map((action, index) => ({
    ...action,
    variant: action.variant ?? (index === 0 ? "primary" : "secondary"),
  }));

  return (
    <article
      className={["rail-playbill", `rail-playbill--${fit}`, className].filter(Boolean).join(" ")}
      data-rail-playbill={source}
    >
      <div
        className="rail-playbill__media"
        style={fit === "photo" && ratio ? { aspectRatio: ratio } : undefined}
      >
        <img
          className="rail-playbill__image"
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          style={fit === "photo" ? { objectPosition: focal } : undefined}
        />
      </div>
      {(title || meta || credit || resolved.length > 0) && (
        <div className="rail-playbill__body">
          {title && <h3 className="rail-playbill__title">{title}</h3>}
          {meta && <p className="rail-playbill__meta">{meta}</p>}
          {credit && <p className="rail-playbill__credit">{credit}</p>}
          {resolved.length > 0 && (
            <div className="rail-playbill__actions">
              {resolved.map((action, index) => (
                <a
                  key={action.id ?? action.label}
                  className={`rail-card__cta rail-card__cta--${action.variant}`}
                  href={action.href}
                  onClick={() =>
                    onSelect?.({
                      source,
                      actionId: action.id ?? action.label,
                      actionIndex: index,
                    })
                  }
                >
                  <span className="rail-card__cta-label">{action.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
