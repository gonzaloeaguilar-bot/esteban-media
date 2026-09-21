"use client";

import { useEffect, useState, type ReactNode } from "react";

export type RailPresenceProps = {
  /** The measured number. */
  count: number;
  /**
   * What is being counted, in the plural: "active players", "people viewing
   * this car", "spots left today". Required, because a bare number beside a
   * pulsing dot is the oldest trick in the book.
   */
  label: string;
  /**
   * When the count was measured. Renders as "updated 2 min ago" and is the
   * honest half of this component: a live number without a measurement time
   * cannot be told apart from an invented one.
   */
  updatedAt?: Date | string | number;
  /** Replaces the pulsing dot — a brand glyph, an icon. */
  glyph?: ReactNode;
  /** Hides the pulse. Use when the number is real but not moving. */
  still?: boolean;
  source: string;
  className?: string;
};

const nf = new Intl.NumberFormat();

function ago(when: Date): string {
  const seconds = Math.max(0, Math.round((Date.now() - when.getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.round(hours / 24)} d ago`;
}

/**
 * A number of people, measured and shown live — "26,198 active players".
 *
 * READ THIS BEFORE USING IT. This is the exact shape of the oldest dark
 * pattern on the web: a pulsing dot and a number nobody can check, invented to
 * make somebody hurry. The kit refuses countdowns and fake scarcity elsewhere
 * for the same reason, and this component is only allowed to exist because the
 * honest version — a real count from your own backend — is genuinely useful.
 *
 * What the API does about it: `label` is required so the number is never bare,
 * and `updatedAt` renders a measurement time, which is the one thing a made-up
 * number never has. **If you cannot pass a real `updatedAt`, ask whether you
 * can prove the count at all.**
 *
 * Do not wire this to a random number generator, a number that only goes up,
 * or a count seeded from the visitor's own session. If that is what is
 * available, the honest component is no component.
 */
export default function RailPresence({
  count,
  label,
  updatedAt,
  glyph,
  still,
  source,
  className,
}: RailPresenceProps) {
  const when = updatedAt ? new Date(updatedAt) : null;
  const valid = when && !Number.isNaN(when.getTime());
  // Re-render the relative time so "just now" does not sit there for an hour.
  const [, tick] = useState(0);

  useEffect(() => {
    if (!valid) return;
    const id = setInterval(() => tick((n) => n + 1), 60_000);
    return () => clearInterval(id);
  }, [valid]);

  return (
    <p
      className={["rail-presence", className].filter(Boolean).join(" ")}
      data-rail-presence={source}
      data-rail-still={still ? "" : undefined}
    >
      <span className="rail-presence__glyph" aria-hidden="true">
        {glyph ?? <span className="rail-presence__dot" />}
      </span>
      <span className="rail-presence__count">{nf.format(count)}</span>
      <span className="rail-presence__label">{label}</span>
      {valid && (
        <span className="rail-presence__when">
          {"· updated "}
          <time dateTime={when.toISOString()}>{ago(when)}</time>
        </span>
      )}
    </p>
  );
}
