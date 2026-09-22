"use client";

import type { ReactNode } from "react";
import type { RailAction } from "./types";

export type RailEmptyProps = {
  /**
   * What the visitor should understand. Say what will be here and when, not
   * that a list is empty: "Check back Monday for next week's picks" tells them
   * something; "No items" tells them the query returned zero rows.
   */
  message: string;
  icon?: ReactNode;
  /** The way out, when there is one. Omit when waiting is the only answer. */
  action?: RailAction;
  /**
   * "inline" is the dashed slot inside a section — a reward that has not
   * landed. "page" is the whole screen: an illustration, a headline, air. A
   * page-sized empty state needs to look deliberate rather than like a section
   * that failed, so it drops the dashed outline.
   */
  tone?: "inline" | "page";
  source: string;
  className?: string;
};

/**
 * The placeholder where something will be.
 *
 * The dashed outline is doing real work: it says the space is reserved rather
 * than broken. A bare line of grey text in a gap reads as a component that
 * failed to load, and the visitor's next move is to reload rather than to come
 * back later.
 *
 * It is not a live region. Nothing here is urgent, and announcing "no results"
 * over whatever somebody is reading is noise.
 */
export default function RailEmpty({
  message,
  icon,
  action,
  tone = "inline",
  source,
  className,
}: RailEmptyProps) {
  return (
    <div
      className={["rail-empty", className].filter(Boolean).join(" ")}
      data-rail-empty={source}
      data-rail-tone={tone}
    >
      {icon && (
        <span className="rail-empty__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <p className="rail-empty__message">{message}</p>
      {action && (
        <a className="rail-card__cta rail-card__cta--secondary" href={action.href}>
          <span className="rail-card__cta-label">{action.label}</span>
        </a>
      )}
    </div>
  );
}
