"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RailStickyBarProps = {
  /** The left-hand side: who this is, or what the page is about. */
  label: ReactNode;
  /** One to three. The first is filled, the rest quiet. */
  actions: { label: string; href: string; id?: string }[];
  /**
   * The element the bar waits for. While it is on screen the bar stays hidden;
   * once it scrolls away the bar comes up. Usually the hero — the bar exists
   * because the real call to action is twenty screens down and nobody
   * arrives.
   *
   * Without a ref the bar is simply always visible, which is the right
   * fallback: a call to action that never appears is worse than one that
   * appears too early.
   */
  watch?: React.RefObject<HTMLElement | null>;
  source: string;
  onSelect?: (info: { source: string; actionId: string; index: number }) => void;
  className?: string;
};

/**
 * The bar that follows the reader down the page.
 *
 * It reserves its own height with a spacer instead of putting
 * `padding-bottom` on <body>. danielzea measured what happens otherwise: the
 * bar is 95px on a phone and 100px on a desktop, and with nothing reserving
 * that space it sat on top of real content — the last contact rows on mobile,
 * a carousel label on desktop. A fixed bar that does not reserve its space
 * eats the last screen of EVERY page, and the end of a page is where the last
 * call to action lives.
 *
 * A library has no business writing to <body>, so the spacer is a sibling the
 * component renders itself. Same reservation, nothing global touched.
 */
export default function RailStickyBar({
  label,
  actions,
  watch,
  source,
  onSelect,
  className,
}: RailStickyBarProps) {
  // VISIBILITY IS NOT REACT STATE. It went through two wrong versions:
  // useState set synchronously inside the effect (which React's compiler lint
  // rejects — a second render before paint, every time), then a derived
  // `offScreen ?? true`, which flipped the default and showed the bar while
  // the watched block was still on screen.
  //
  // It is a purely visual toggle driven by an observer, so it belongs on the
  // DOM node. The initial value is in the markup — hidden when something is
  // being watched, visible when nothing is — and the observer writes the
  // attribute directly. No state, no re-render, no default to get wrong.
  const barRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    const target = watch?.current;
    if (!bar) return;

    // No target, or a browser without the observer: show it. A call to action
    // that never appears is worse than one that appears too early.
    if (!target || typeof IntersectionObserver !== "function") {
      bar.dataset.railVisible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.dataset.railVisible = String(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [watch]);

  // Measured, not assumed: the bar's height depends on the brand's type and
  // the label's length, so a hard-coded spacer is wrong on the first site
  // that changes either.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || typeof ResizeObserver !== "function") return;
    const observer = new ResizeObserver(() => setHeight(bar.offsetHeight));
    observer.observe(bar);
    setHeight(bar.offsetHeight);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="rail-stickybar__spacer" style={{ height }} aria-hidden="true" />
      <div
        ref={barRef}
        className={["rail-stickybar", className].filter(Boolean).join(" ")}
        data-rail-stickybar={source}
        // The initial value; the observer takes over after mount.
        data-rail-visible={watch ? "false" : "true"}
      >
        <div className="rail-stickybar__in">
          <p className="rail-stickybar__label">{label}</p>
          <div className="rail-stickybar__actions">
            {actions.slice(0, 3).map((action, index) => (
              <a
                key={action.id ?? action.label}
                className="rail-stickybar__action"
                data-rail-primary={index === 0 ? "" : undefined}
                href={action.href}
                onClick={() =>
                  onSelect?.({
                    source,
                    actionId: action.id ?? action.label,
                    index,
                  })
                }
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
