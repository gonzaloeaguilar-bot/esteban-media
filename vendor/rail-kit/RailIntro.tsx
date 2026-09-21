"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type RailIntroStep = {
  id: string;
  /** What this step teaches, in a few words. */
  title: string;
  /** One or two sentences. If it needs three, it is two steps. */
  body: string;
  /** A picture or drawing of the thing being explained. */
  media?: ReactNode;
  /**
   * CSS selector for the thing on the page this step is about. The element is
   * scrolled into view and outlined while the step is up.
   *
   * A step whose anchor is not on this page still shows — it just stops
   * pointing. An intro that vanishes because one selector moved teaches
   * nothing; an arrow aimed at nothing is worse than no arrow.
   */
  anchor?: string;
};

export type RailIntroProps = {
  steps: RailIntroStep[];
  /**
   * What this intro is remembered by. Required, and the reason this component
   * is not a nag: once finished or skipped, it stays finished.
   */
  seenKey: string;
  /** Accessible name of the panel. */
  label: string;
  /** Every string is the site's. "Next" and "Skip" are not universal. */
  backLabel: string;
  nextLabel: string;
  skipLabel: string;
  doneLabel: string;
  /** Receives the 1-based step and the total, so the caller owns the wording. */
  stepLabel: (step: number, total: number) => string;
  /**
   * Shows it even if it has been seen. For the workbench and for a "show me
   * again" button — never as a way around `seenKey`.
   */
  forceOpen?: boolean;
  onDone?: (info: { source: string; skippedAt: number | null }) => void;
  source: string;
  className?: string;
};

const PREFIX = "rail-intro:";

/**
 * The walkthrough a person gets the first time, and only the first time.
 *
 * It is user-paced, not timed. `RailStory` advances on its own because a story
 * is something you watch; this is something you read while looking at the
 * thing it describes, and reading speed is not a constant the kit gets to pick.
 *
 * Skippable on every step. An intro you cannot leave is a wall in front of the
 * product, and the people most likely to want out are the ones who already
 * know how it works.
 *
 * If the browser will not let us remember (private mode, storage blocked), it
 * does NOT show. That is deliberate and it fails closed: an intro that cannot
 * remember is an intro that reappears on every visit, and a walkthrough on the
 * fifth visit is worse than never having had one.
 */
export default function RailIntro({
  steps,
  seenKey,
  label,
  backLabel,
  nextLabel,
  skipLabel,
  doneLabel,
  stepLabel,
  forceOpen = false,
  onDone,
  source,
  className,
}: RailIntroProps) {
  /**
   * DERIVED, not synchronised.
   *
   * What is actually state is whether this visitor has dismissed the intro.
   * Whether it is showing follows from that and from forceOpen, so it is
   * computed during render and there is nothing to keep in step.
   *
   * Two earlier shapes were wrong in the same direction: an effect that read
   * localStorage and called setOpen, and then an effect that mirrored
   * forceOpen into state. Both are the cascading render React's compiler lint
   * rejects, and the first also meant the first paint was always "closed"
   * before flipping.
   */
  const [dismissed, setDismissed] = useState(() => {
    if (typeof localStorage === "undefined") return true;
    try {
      return localStorage.getItem(PREFIX + seenKey) === "1";
    } catch {
      return true;
    }
  });
  const open = forceOpen || !dismissed;
  const [at, setAt] = useState(0);
  const panel = useRef<HTMLDivElement>(null);

  const finish = useCallback(
    (skippedAt: number | null) => {
      setDismissed(true);
      try {
        localStorage.setItem(PREFIX + seenKey, "1");
      } catch {
        /* si no se puede recordar, ya no se mostraba de entrada */
      }
      onDone?.({ source, skippedAt });
    },
    [onDone, seenKey, source],
  );

  // El foco entra en el panel al abrir. Sin esto, quien navega con teclado
  // sigue al principio de la pagina mientras un panel le explica algo.
  useEffect(() => {
    if (open) panel.current?.focus();
  }, [open]);

  const step = steps[at];

  useEffect(() => {
    if (!open || !step?.anchor) return;
    const target = document.querySelector(step.anchor);
    if (!(target instanceof HTMLElement)) return;
    target.classList.add("rail-intro-anchor");
    const motion =
      typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: motion ? "auto" : "smooth", block: "center" });
    return () => target.classList.remove("rail-intro-anchor");
  }, [open, step]);

  if (!open || steps.length === 0 || !step) return null;

  const last = at === steps.length - 1;

  return (
    <div
      className={["rail-intro", className].filter(Boolean).join(" ")}
      data-rail-intro={source}
      role="dialog"
      aria-modal="false"
      aria-label={label}
      ref={panel}
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === "Escape") finish(at);
      }}
    >
      {step.media && <div className="rail-intro__media">{step.media}</div>}
      <p className="rail-intro__count" aria-live="polite">
        {stepLabel(at + 1, steps.length)}
      </p>
      <h2 className="rail-intro__title">{step.title}</h2>
      <p className="rail-intro__body">{step.body}</p>

      <ol className="rail-intro__dots" aria-hidden="true">
        {steps.map((s, index) => (
          <li
            key={s.id}
            className={["rail-intro__dot", index === at && "rail-intro__dot--at"]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </ol>

      <div className="rail-intro__actions">
        <button type="button" className="rail-intro__skip" onClick={() => finish(at)}>
          {skipLabel}
        </button>
        <div className="rail-intro__move">
          {at > 0 && (
            <button
              type="button"
              className="rail-card__cta rail-card__cta--secondary"
              onClick={() => setAt(at - 1)}
            >
              <span className="rail-card__cta-label">{backLabel}</span>
            </button>
          )}
          <button
            type="button"
            className="rail-card__cta rail-card__cta--primary"
            onClick={() => (last ? finish(null) : setAt(at + 1))}
          >
            <span className="rail-card__cta-label">{last ? doneLabel : nextLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
