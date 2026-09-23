"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type RailCoachmarkProps = {
  message: string;
  /** Which edge the pointer sticks out of — the side facing what it explains. */
  side?: "top" | "bottom" | "left" | "right";
  /** How far along that edge the pointer sits, 0-100. */
  offset?: number;
  action?: { label: string; onClick: () => void };
  dismissLabel?: string;
  onDismiss: () => void;
  /**
   * Moves focus to the coachmark when it appears. **Off by default and it
   * should usually stay off.** A hint that steals focus interrupts whatever
   * somebody was typing. Turn it on only when the coachmark is the answer to
   * an action they just took.
   */
  takeFocus?: boolean;
  source: string;
  className?: string;
};

/**
 * The little bubble that points at something and explains it.
 *
 * THE DISMISS IS MANDATORY — there is no prop to remove it, and `onDismiss` is
 * required. A hint that cannot be closed is an obstruction: it covers the
 * thing it is pointing at, and on a phone it covers a lot.
 *
 * It does NOT auto-dismiss on a timer either. A tip that vanishes before it is
 * read is worse than no tip, and the people slowest to read it are the ones it
 * was written for.
 *
 * Escape closes it, which is the shortcut people already try on anything that
 * appeared uninvited.
 */
export default function RailCoachmark({
  message,
  side = "top",
  offset = 16,
  action,
  dismissLabel = "Dismiss",
  onDismiss,
  takeFocus,
  source,
  className,
}: RailCoachmarkProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (takeFocus) ref.current?.focus();
  }, [takeFocus]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  return (
    <div
      ref={ref}
      className={["rail-coachmark", className].filter(Boolean).join(" ")}
      data-rail-coachmark={source}
      data-rail-side={side}
      style={{ ["--_offset" as string]: `${offset}%` }}
      // Not an alert: a hint is not an emergency, and interrupting somebody
      // mid-sentence to offer advice is how a helpful tip becomes a nuisance.
      role="status"
      tabIndex={takeFocus ? -1 : undefined}
    >
      <p className="rail-coachmark__message">{message}</p>
      {action && (
        <button
          type="button"
          className="rail-coachmark__action"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}
      <button
        type="button"
        className="rail-coachmark__dismiss"
        onClick={onDismiss}
      >
        <span aria-hidden="true">×</span>
        {/* `rail-sr-only`, la tecnica del kit, y no una clase propia.
            `rail-coachmark__sr` no tenia NI UNA regla en `rail.css`: era un
            nombre inventado aqui que nadie escribio nunca. Resultado medido a
            320 px: la palabra «Dismiss» se veia, 70 px de ancho al lado de la
            aspa, y encima empujaba el documento a 338. Un texto que solo
            deberia oirse estaba a la vista desde el primer dia. */}
        <span className="rail-sr-only">{dismissLabel}</span>
      </button>
    </div>
  );
}
