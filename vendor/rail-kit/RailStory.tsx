"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RailStoryStep = {
  id: string;
  /** What this step shows. */
  children: ReactNode;
};

export type RailStoryProps = {
  steps: RailStoryStep[];
  /** What the sequence is, for a screen reader: "How Mobile Checkout works". */
  label: string;
  /** Seconds each step holds before advancing. */
  dwell?: number;
  /** Both required: the control renames itself when its function changes. */
  pauseLabel: string;
  resumeLabel: string;
  /** "Step 2 of 4", built by the site so it can be in the site's language. */
  stepLabel: (index: number, total: number) => string;
  closeLabel?: string;
  onClose?: () => void;
  onStep?: (info: { source: string; id: string; index: number }) => void;
  source: string;
  className?: string;
};

/**
 * A short sequence that advances on its own, with the segmented bar across the
 * top that says how much is left.
 *
 * THE PAUSE IS MANDATORY and there is no prop to remove it. A sequence that
 * advances on a timer and cannot be stopped takes reading speed as a given,
 * and reading speed is exactly the thing that varies most between the people
 * looking at it. Somebody who reads slowly, or is translating in their head,
 * or looked away, loses the step and cannot get it back.
 *
 * IT DOES NOT AUTO-ADVANCE UNDER `prefers-reduced-motion: reduce`. A visitor
 * who has asked the system for less movement gets the steps and the controls
 * and no timer at all, rather than a slower timer: motion they did not ask for
 * is the thing being removed, not its speed.
 *
 * The bar is `<progress>` per segment rather than divs, so each one carries
 * its own value and maximum, and the whole strip is aria-hidden because the
 * position is already said in words by `stepLabel` — a screen reader should
 * hear "Step 2 of 4", not four progress bars.
 */
export default function RailStory({
  steps,
  label,
  dwell = 5,
  pauseLabel,
  resumeLabel,
  stepLabel,
  closeLabel,
  onClose,
  onStep,
  source,
  className,
}: RailStoryProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
    if (reduced.current) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused || reduced.current || steps.length < 2) return;
    const tick = window.setInterval(() => {
      setElapsed((previous) => {
        if (previous + 0.1 < dwell) return previous + 0.1;
        setIndex((current) => {
          const next = current + 1 < steps.length ? current + 1 : current;
          if (next !== current) onStep?.({ source, id: steps[next].id, index: next });
          return next;
        });
        return 0;
      });
    }, 100);
    return () => window.clearInterval(tick);
  }, [paused, dwell, steps, onStep, source]);

  if (steps.length === 0) return null;

  return (
    <section
      className={["rail-story", className].filter(Boolean).join(" ")}
      data-rail-story={source}
      aria-label={label}
      aria-roledescription="carousel"
    >
      <div className="rail-story__chrome">
        <button
          type="button"
          className="rail-story__pause"
          onClick={() => setPaused((p) => !p)}
        >
          <span aria-hidden="true">{paused ? "▶" : "⏸"}</span>
          <span className="rail-sr-only">{paused ? resumeLabel : pauseLabel}</span>
        </button>

        <div className="rail-story__bars" aria-hidden="true">
          {steps.map((step, i) => (
            <progress
              className="rail-story__bar"
              key={step.id}
              value={i < index ? 1 : i === index ? elapsed / dwell : 0}
              max={1}
            />
          ))}
        </div>

        {onClose && (
          <button type="button" className="rail-story__close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
            <span className="rail-sr-only">{closeLabel ?? label}</span>
          </button>
        )}
      </div>

      <p className="rail-sr-only" aria-live="polite">
        {stepLabel(index + 1, steps.length)}
      </p>

      <div className="rail-story__step">{steps[index].children}</div>
    </section>
  );
}
