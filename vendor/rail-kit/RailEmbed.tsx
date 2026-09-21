"use client";

import { useState, type ReactNode } from "react";

export type RailEmbedProps = {
  /** The iframe, built only once somebody asks for it. */
  embedUrl: string;
  /** What the iframe is, for a screen reader: "Spotify playlist: Legendary". */
  title: string;
  /** The heading somebody reads before deciding whether to load it. */
  heading: string;
  /** One line under the heading — what is in it, how long it is. */
  body?: string;
  /** The button that builds the iframe. Required: no baked English. */
  loadLabel: string;
  /** Cover art, a map thumbnail, a screenshot. Optional: some embeds have none. */
  image?: { src: string; alt: string };
  /** A mark instead of an image — a service's logo. */
  glyph?: ReactNode;
  /**
   * The link to the thing itself, for somebody who would rather open it where
   * it lives. A facade with no way out is a dead end on a slow connection.
   */
  href?: { url: string; label: string };
  /** Iframe height in pixels. Spotify's playlist is 352; a map is usually 400. */
  height?: number;
  /** Passed straight to the iframe's allow attribute. */
  allow?: string;
  source: string;
  onLoad?: (info: { source: string; title: string }) => void;
  className?: string;
};

/**
 * A third-party embed that does not exist until somebody asks for it.
 *
 * RailPlayer already does this for video, and it is shaped for video: it wants
 * a still frame and it draws a play triangle over it. A playlist, a map, a
 * calendar or a booking widget has no still frame and no play affordance, and
 * forcing one produces a component that lies about what pressing it does.
 *
 * WHY THIS MATTERS BEYOND TIDINESS. An eagerly-loaded embed costs hundreds of
 * kilobytes and a set of third-party cookies on every page view, including the
 * overwhelming majority where nobody touches it. It is also a third party
 * executing on the page: the same reason a crawler reports it as a blocked
 * resource is the reason a visitor pays for it.
 *
 * The facade is not a placeholder. It states what the embed is before it is
 * built, so somebody on a slow connection can decide, and `href` gives them
 * the thing itself if they would rather not.
 */
export default function RailEmbed({
  embedUrl,
  title,
  heading,
  body,
  loadLabel,
  image,
  glyph,
  href,
  height = 352,
  allow,
  source,
  onLoad,
  className,
}: RailEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      className={["rail-embed", className].filter(Boolean).join(" ")}
      data-rail-embed={source}
      data-rail-loaded={loaded ? "" : undefined}
    >
      {loaded ? (
        <iframe
          className="rail-embed__frame"
          src={embedUrl}
          title={title}
          height={height}
          allow={allow}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="rail-embed__facade" style={{ minHeight: height }}>
          {image && (
            <img
              className="rail-embed__image"
              src={image.src}
              alt={image.alt}
              loading="lazy"
            />
          )}
          {!image && glyph && (
            <span className="rail-embed__glyph" aria-hidden="true">
              {glyph}
            </span>
          )}
          <div className="rail-embed__text">
            <p className="rail-embed__heading">{heading}</p>
            {body && <p className="rail-embed__body">{body}</p>}
            <div className="rail-embed__actions">
              <button
                type="button"
                className="rail-embed__load"
                onClick={() => {
                  setLoaded(true);
                  onLoad?.({ source, title });
                }}
              >
                {loadLabel}
              </button>
              {href && (
                <a
                  className="rail-embed__out"
                  href={href.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {href.label}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
