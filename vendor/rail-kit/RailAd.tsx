"use client";

import type { ReactNode } from "react";

export type RailAdProps = {
  title: string;
  /** Who paid. Required — this is the disclosure, not decoration. */
  advertiser: string;
  image?: { src: string; alt: string };
  media?: ReactNode;
  href: string;
  /**
   * The word used for the disclosure. Defaults to "Ad". Use the one your
   * jurisdiction and platform expect — "Sponsored", "Publicidad" — but it has
   * to be a word a reader recognises, not a symbol.
   */
  disclosure?: string;
  /** Shows the overflow control. The menu itself is the consumer's. */
  onMenu?: () => void;
  menuLabel?: string;
  source: string;
  onSelect?: (info: { source: string; advertiser: string }) => void;
  className?: string;
};

/**
 * A paid placement in a list of unpaid ones.
 *
 * THE DISCLOSURE IS NOT OPTIONAL and there is no prop to remove it. An ad that
 * does not say it is an ad is the thing regulators fine people for, and in a
 * feed of real content it is also just a lie. `advertiser` is required for the
 * same reason: "Ad" alone does not tell a reader who is talking to them.
 *
 * The link carries `rel="sponsored nofollow noopener"` with no way to turn it
 * off, exactly as RailFrame's presenter does. Mislabelling a paid link is a
 * ranking penalty on the site that ships it, and that is not a decision a
 * component gets to make.
 *
 * The disclosure sits in the accessible name too, so it is heard and not only
 * seen — a small grey word under a headline is exactly what a screen reader
 * user would otherwise miss.
 */
export default function RailAd({
  title,
  advertiser,
  image,
  media,
  href,
  disclosure = "Ad",
  onMenu,
  menuLabel = "Why this ad?",
  source,
  onSelect,
  className,
}: RailAdProps) {
  return (
    <div
      className={["rail-ad", className].filter(Boolean).join(" ")}
      data-rail-ad={source}
    >
      <a
        className="rail-ad__link"
        href={href}
        rel="sponsored nofollow noopener"
        aria-label={`${title} — ${disclosure} by ${advertiser}`}
        onClick={() => onSelect?.({ source, advertiser })}
      >
        {(media || image) && (
          <span className="rail-ad__art">
            {media ?? (
              <img
                src={image!.src}
                alt=""
                loading="lazy"
                decoding="async"
              />
            )}
          </span>
        )}
        <span className="rail-ad__text">
          <span className="rail-ad__title">{title}</span>
          <span className="rail-ad__disclosure">
            {disclosure}
            <span aria-hidden="true"> · </span>
            {advertiser}
          </span>
        </span>
      </a>
      {onMenu && (
        <button type="button" className="rail-ad__menu" onClick={onMenu}>
          <span aria-hidden="true">⋮</span>
          <span className="rail-ad__sr">{menuLabel}</span>
        </button>
      )}
    </div>
  );
}
