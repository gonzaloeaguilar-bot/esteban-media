"use client";

import type { ReactNode } from "react";

export type RailBylineProps = {
  name: string;
  /** Avatar, or a live ring via RailStoryRing. */
  image?: { src: string; alt: string };
  media?: ReactNode;
  href?: string;
  /**
   * A tick beside the name. **Only when the platform verified them.** Not
   * "we like this seller", not self-asserted — a tick that means something
   * different on your site than everywhere else is worse than none.
   */
  verified?: boolean;
  /** What the tick means, for a screen reader. Required with `verified`. */
  verifiedLabel?: string;
  /** A qualifier before the name — "Official", "Premium", "Agent". */
  badge?: string;
  /** A second line — a location, a role, a follower count you can prove. */
  meta?: ReactNode;
  size?: "sm" | "md";
  source: string;
  className?: string;
};

/**
 * Who is behind the thing: a seller, an author, an agent, a coach.
 *
 * `verified` draws a tick and there is a deliberate friction on it —
 * `verifiedLabel` is required, because a tick with no stated meaning is a
 * trust mark a visitor reads as the platform's and a site can quietly award
 * itself. Say what it means: "Identity verified by us", "Licensed in FL".
 */
export default function RailByline({
  name,
  image,
  media,
  href,
  verified,
  verifiedLabel,
  badge,
  meta,
  size = "md",
  source,
  className,
}: RailBylineProps) {
  // Through globalThis: the kit stays free of @types/node, and consumers
  // bundle this for a browser where `process` may not exist. Same as
  // RailVersus.
  const nodeEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } })
    .process?.env?.NODE_ENV;
  if (nodeEnv !== "production" && verified && !verifiedLabel) {
    // A tick that does not say what it certifies is borrowed authority.
    console.warn(
      `RailByline (${source}): \`verified\` without \`verifiedLabel\`. Say what the tick means.`,
    );
  }

  const inner = (
    <>
      {(media || image) && (
        <span className="rail-byline__avatar">
          {media ?? <img src={image!.src} alt="" loading="lazy" decoding="async" />}
        </span>
      )}
      <span className="rail-byline__text">
        <span className="rail-byline__line">
          {badge && <span className="rail-byline__badge">{badge}</span>}
          <span className="rail-byline__name">{name}</span>
          {verified && (
            <>
              <span className="rail-byline__tick" aria-hidden="true">
                ✓
              </span>
              <span className="rail-byline__sr">
                {verifiedLabel ?? "Verified"}
              </span>
            </>
          )}
        </span>
        {meta && <span className="rail-byline__meta">{meta}</span>}
      </span>
    </>
  );

  const props = {
    className: ["rail-byline", className].filter(Boolean).join(" "),
    "data-rail-byline": source,
    "data-rail-size": size,
  };

  return href ? (
    <a {...props} href={href}>
      {inner}
    </a>
  ) : (
    <span {...props}>{inner}</span>
  );
}
