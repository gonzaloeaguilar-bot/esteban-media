"use client";

import { useState, type ReactNode } from "react";

export type RailPromoProps = {
  /** The headline. Short — this is a banner, not a page. */
  title: string;
  /** One clause under it. */
  subtitle?: string;
  /** The artwork, full-bleed behind the copy. */
  image?: { src: string; alt: string };
  media?: ReactNode;
  /** The strip along the bottom: the words and where they go. */
  action?: { label: string; href: string };
  /** A chip in the corner — "Odds boost", "New", "Sponsored". */
  badge?: ReactNode;
  /**
   * Where the artwork goes.
   *
   * `"over"` (the default, and what every consumer gets without asking) is
   * the full-bleed banner: copy on top of the picture.
   *
   * `"beside"` puts the art in a narrow panel down one side and the copy in
   * its own column. It exists because a promo that has to sit in a feed
   * between two content cards cannot be 150px of photograph — it has to read
   * at a glance as one row, and copy over art at that height is unreadable at
   * any contrast. The side panel also lets a brand use a flat accent block
   * instead of a photo, which is the version that ages well.
   */
  layout?: "over" | "beside";
  /**
   * The small print at the far end of the action row — a position in a set
   * ("1/10"), an expiry, a sponsor. Not a heading and never the offer itself.
   */
  meta?: ReactNode;
  /**
   * Lets the visitor close it. `dismissKey` remembers that in their own
   * localStorage — leave it out and the banner returns on the next load,
   * because a dismissal the visitor cannot make stick is a trap.
   */
  dismissible?: boolean;
  dismissKey?: string;
  dismissLabel?: string;
  source: string;
  onSelect?: (info: { source: string; action: "open" | "dismiss" }) => void;
  className?: string;
};

function alreadyDismissed(key?: string) {
  if (!key) return false;
  try {
    return localStorage.getItem(`rail-promo:${key}`) === "1";
  } catch {
    // Private windows and blocked site data throw. A banner that shows is a
    // better failure than one that crashes the page.
    return false;
  }
}

/**
 * The offer banner: art, a headline, and a strip along the bottom you press.
 *
 * The action is a full-width strip rather than a button floating on the
 * artwork, and that is deliberate: a button over a photograph has to fight
 * whatever is behind it for contrast, and the artwork changes per campaign
 * while the component does not.
 *
 * Nothing here draws a countdown. If the offer really ends, say when in the
 * subtitle, where it is a fact somebody can check rather than a clock designed
 * to hurry them.
 */
export default function RailPromo({
  title,
  subtitle,
  image,
  media,
  action,
  badge,
  layout = "over",
  meta,
  dismissible,
  dismissKey,
  dismissLabel = "Dismiss",
  source,
  onSelect,
  className,
}: RailPromoProps) {
  const [gone, setGone] = useState(() => alreadyDismissed(dismissKey));
  if (gone) return null;

  const copy = (
    <div className="rail-promo__copy">
      <p className="rail-promo__title">{title}</p>
      {subtitle && <p className="rail-promo__subtitle">{subtitle}</p>}
    </div>
  );

  const dismiss = dismissible ? (
    <button
      type="button"
      className="rail-promo__dismiss"
      onClick={() => {
        setGone(true);
        if (dismissKey) {
          try {
            localStorage.setItem(`rail-promo:${dismissKey}`, "1");
          } catch {
            /* nothing to do: it comes back next load */
          }
        }
        onSelect?.({ source, action: "dismiss" });
      }}
    >
      <span aria-hidden="true">×</span>
      <span className="rail-promo__sr">{dismissLabel}</span>
    </button>
  ) : null;

  return (
    <section
      className={["rail-promo", className].filter(Boolean).join(" ")}
      data-rail-promo={source}
      data-layout={layout}
    >
      {/* Says whether there is artwork behind the copy. Without it the copy
          must not force white-on-a-scrim: on a brand whose promo surface is
          light, that is white text on white. Caught in the workbench. */}
      <div className="rail-promo__art" data-rail-art={image || media ? "" : undefined}>
        {media ??
          (image && (
            <img
              className="rail-promo__image"
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          ))}
        {badge && <span className="rail-promo__badge">{badge}</span>}
        {/* Beside-layout lifts these OUT of the art, because a column cannot
            be a sibling of something it is nested inside. CSS alone could not
            do this reflow, which is why it is a branch and not a media query. */}
        {layout === "over" && copy}
        {layout === "over" && dismiss}
      </div>

      {layout === "beside" && (
        <div className="rail-promo__panel">
          {copy}
          {dismiss}
        </div>
      )}

      {action && (
        <a
          className="rail-promo__action"
          href={action.href}
          onClick={() => onSelect?.({ source, action: "open" })}
        >
          <span>{action.label}</span>
          {meta ? (
            <span className="rail-promo__meta">{meta}</span>
          ) : (
            <span aria-hidden="true">→</span>
          )}
        </a>
      )}
    </section>
  );
}
