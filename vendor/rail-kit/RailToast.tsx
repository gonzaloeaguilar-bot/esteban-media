"use client";

import { useState, type ReactNode } from "react";

export type RailToastProps = {
  message: string;
  /** A second line under the message — a condition, a next step. */
  description?: string;
  /** A mark before the message — a shield, a tick. */
  glyph?: ReactNode;
  /** One thing to do about it. */
  action?: { label: string; href?: string; onClick?: () => void };
  /**
   * "status" is read when the reader gets to it — right for a reassurance or
   * a confirmation. "alert" interrupts, and is only right when NOT knowing
   * immediately costs something: a failed save, a lost connection.
   */
  tone?: "status" | "alert";
  dismissible?: boolean;
  dismissLabel?: string;
  /** Remembers the dismissal in the visitor's own localStorage. */
  dismissKey?: string;
  onDismiss?: () => void;
  source: string;
  className?: string;
};

function wasDismissed(key?: string) {
  if (!key) return false;
  try {
    return localStorage.getItem(`rail-toast:${key}`) === "1";
  } catch {
    return false;
  }
}

/**
 * The strip along the bottom that tells you something without stopping you.
 *
 * `tone` picks the live region, and the choice matters more than it looks.
 * `status` is announced politely when the reader reaches a pause; `alert`
 * interrupts whatever they are reading. **Almost everything is `status`** —
 * an alert for a reassurance ("your data is protected") talks over somebody
 * mid-sentence to tell them nothing is wrong.
 *
 * It never takes focus. A toast that grabs focus throws a keyboard user out of
 * whatever they were doing, and one that traps it is unescapable.
 */
export default function RailToast({
  message,
  description,
  glyph,
  action,
  tone = "status",
  dismissible,
  dismissLabel = "Dismiss",
  dismissKey,
  onDismiss,
  source,
  className,
}: RailToastProps) {
  const [gone, setGone] = useState(() => wasDismissed(dismissKey));

  // The entry animation is CSS, not state. The first version flipped a
  // `mounted` flag in an effect to add a class after the first paint, which
  // React's compiler lint rejects — and it was doing by hand what a keyframe
  // does for free. A CSS animation runs once on mount and never again,
  // which is exactly the behaviour that flag was faking.
  if (gone) return null;

  const close = () => {
    setGone(true);
    if (dismissKey) {
      try {
        localStorage.setItem(`rail-toast:${dismissKey}`, "1");
      } catch {
        /* comes back next load */
      }
    }
    onDismiss?.();
  };

  return (
    <div
      className={["rail-toast", className].filter(Boolean).join(" ")}
      data-rail-toast={source}
      data-rail-tone={tone}
      role={tone === "alert" ? "alert" : "status"}
    >
      {glyph && (
        <span className="rail-toast__glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
      <div className="rail-toast__text">
        <p className="rail-toast__message">{message}</p>
        {description && (
          <p className="rail-toast__description">{description}</p>
        )}
      </div>
      {action &&
        (action.href ? (
          <a className="rail-toast__action" href={action.href}>
            {action.label}
          </a>
        ) : (
          <button type="button" className="rail-toast__action" onClick={action.onClick}>
            {action.label}
          </button>
        ))}
      {dismissible && (
        <button type="button" className="rail-toast__dismiss" onClick={close}>
          <span aria-hidden="true">×</span>
          <span className="rail-toast__sr">{dismissLabel}</span>
        </button>
      )}
    </div>
  );
}
