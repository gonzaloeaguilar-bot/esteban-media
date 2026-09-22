"use client";

import type { ReactNode } from "react";

export type RailLiveProps = {
  /** Where the thing is up to: "Bot 8th", "Half time", "Open until 6pm". */
  status: string;
  /**
   * The domain's own indicators — a bases diamond, a possession arrow, a
   * queue length. The kit reserves the row and stays out of what goes in it,
   * because every sport and every business counts something different.
   */
  children?: ReactNode;
  /**
   * Off when the thing is scheduled rather than happening. The dot stops
   * pulsing and the row reads as neutral — a "live" badge on a fixture that
   * has not started is the small lie that costs a site its credibility.
   */
  live?: boolean;
  /** How a screen reader should hear it, if `status` alone is cryptic. */
  label?: string;
  source: string;
  className?: string;
};

/**
 * The strip that says what is happening right now.
 *
 * It is a row, a state and a slot. The bases diamond and the ball-strike count
 * that prompted it are baseball's business, not the kit's: they arrive as
 * children, and the same row carries a possession arrow, a lap counter, or
 * "next collection 4:30pm" without changing.
 *
 * `live` drives both the pulse and `aria-live`. When something is genuinely
 * updating, a screen reader should be told politely; when it is not, silence
 * is correct and a pulsing dot is a lie.
 */
export default function RailLive({
  status,
  children,
  live,
  label,
  source,
  className,
}: RailLiveProps) {
  return (
    <div
      className={["rail-live", className].filter(Boolean).join(" ")}
      data-rail-live={source}
      data-rail-on={live ? "" : undefined}
      aria-label={label}
      aria-live={live ? "polite" : undefined}
    >
      <span className="rail-live__mark" aria-hidden="true">
        {live ? "▶" : "◷"}
      </span>
      <span className="rail-live__status">{status}</span>
      {children && <span className="rail-live__slot">{children}</span>}
    </div>
  );
}
