"use client";

import type { ReactNode } from "react";

export type RailFabProps = {
  /** The one thing this does. Shown under the glyph and read by a screen reader. */
  label: string;
  href?: string;
  onClick?: () => void;
  /** The mark inside the disc — a barcode, a camera, a plus. */
  glyph: ReactNode;
  /**
   * Height in pixels to lift the button by, so it clears a bar pinned to the
   * bottom of the same screen. Pass the bottom nav's height.
   */
  liftBy?: number;
  /**
   * Draws the pill form: glyph and label side by side, width following the
   * text, the shape Gmail's Compose uses. The disc is the default because a
   * 68px circle is the smallest thing that still reads as one action; the
   * extended form is for when the action needs naming at a glance and there is
   * room along the bottom of the screen for it.
   */
  extended?: boolean;
  source: string;
  className?: string;
};

/**
 * One persistent action, floating over the page — the scan button.
 *
 * It earns the position by being the single thing somebody opened the app to
 * do. A second one is not a floating action button, it is a toolbar that has
 * escaped, and it will cover content on a small screen.
 *
 * The label is drawn, not only announced. An unlabelled disc with a glyph in
 * it is a guess: the glyph reads as "camera" to one person and "scan my card"
 * to another, and the cost of being wrong is that nobody presses it.
 */
export default function RailFab({
  label,
  href,
  onClick,
  glyph,
  liftBy = 0,
  extended,
  source,
  className,
}: RailFabProps) {
  const inner = (
    <>
      <span className="rail-fab__glyph" aria-hidden="true">
        {glyph}
      </span>
      <span className="rail-fab__label">{label}</span>
    </>
  );

  const props = {
    className: ["rail-fab", className].filter(Boolean).join(" "),
    "data-rail-fab": source,
    "data-rail-extended": extended ? "" : undefined,
    style: liftBy ? { bottom: `calc(var(--rail-fab-inset, 16px) + ${liftBy}px)` } : undefined,
  };

  if (href) {
    return (
      <a {...props} href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <button {...props} type="button" onClick={onClick} aria-label={label}>
      {inner}
    </button>
  );
}
