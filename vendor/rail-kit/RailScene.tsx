"use client";

import type { ReactNode } from "react";

export type RailSceneProps = {
  image: { src: string; alt: string };
  /** The consumer's own media in the frame — a video, an optimised image. */
  media?: ReactNode;
  /** The line that rides over the picture. One sentence; it is a caption. */
  quote: ReactNode;
  /** The small line under it — an attribution, a place, a date. */
  caption?: string;
  /** Puts the picture on the right. Alternate down a page. */
  flip?: boolean;
  source: string;
  className?: string;
};

/**
 * A photograph and one sentence, overlapping — the breath between two long
 * stretches of text.
 *
 * WHY IT OVERLAPS. The first version had the picture and the line in two
 * columns separated by 84px of nothing: two objects looking at each other, not
 * a scene. The line riding over the last third of the picture is what makes a
 * page read like a magazine cover instead of a database record.
 *
 * The picture keeps its own portrait shape rather than being cropped to a
 * band, because cropping a portrait to landscape takes the top of somebody's
 * head off.
 */
export default function RailScene({
  image,
  media,
  quote,
  caption,
  flip,
  source,
  className,
}: RailSceneProps) {
  return (
    <section
      className={["rail-scene", className].filter(Boolean).join(" ")}
      data-rail-scene={source}
      data-rail-flip={flip ? "" : undefined}
    >
      <figure className="rail-scene__figure">
        {media ?? (
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        )}
      </figure>
      <div className="rail-scene__text">
        <p className="rail-scene__quote">{quote}</p>
        {caption && <p className="rail-scene__caption">{caption}</p>}
      </div>
    </section>
  );
}
