"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export type RailPeekProps = {
  /**
   * Shut, peeking, or open. THREE states, not two — the peek is the whole
   * point; see below.
   */
  state: "closed" | "peek" | "open";
  /** The line the peek bar shows: "Ready when you are…". */
  title: ReactNode;
  /** The second line, smaller: "Watch to earn rewards!". */
  note?: ReactNode;
  /** A mark at the start of the peek bar — an orb, a cover, a face. */
  glyph?: ReactNode;
  /** What is inside once it is open. */
  children?: ReactNode;
  /** The peek bar's job, for a screen reader: "Open the quest". */
  openLabel: string;
  /** The close button's name. */
  closeLabel: string;
  /** The heading once open, when it differs from the peek line. */
  heading?: ReactNode;
  /** The overflow at the top right of the open sheet. */
  menu?: { label: string; glyph?: ReactNode };
  source: string;
  onOpen?: (info: { source: string }) => void;
  onClose?: (info: { source: string }) => void;
  onMenu?: (info: { source: string }) => void;
  className?: string;
};

/**
 * The sheet that does not go away when you close it: it drops to a bar you
 * can still read.
 *
 * THREE STATES, AND THE MIDDLE ONE IS THE POINT. `RailSheet` is a dialog —
 * open or gone — and that is right for something you summoned. This is for
 * something the SITE raised: a quest, a download, a track, an order on its
 * way. Dismissing those to nothing is how a person loses the only handle they
 * had on them; dropping to a bar keeps the thing on screen, one tap from
 * where it was, and lets the page underneath work.
 *
 * THE PEEK BAR IS NOT A DIALOG AND MUST NOT BEHAVE LIKE ONE. It does not trap
 * focus, does not take it on appearing, and does not answer Escape — it is a
 * region of the page with a button in it. Only the OPEN state is modal, and
 * only the open state can be escaped.
 *
 * THE MOTION IS ONE PROPERTY: the sheet translates, and the scrim fades with
 * it. Height animation would reflow the page behind at sixty frames a second,
 * and a sheet that janks the thing it is covering is worse than a sheet that
 * appears.
 *
 * WHAT IS INSIDE IS NOT RENDERED WHILE PEEKING. A video that keeps loading
 * behind a 64px bar costs the visitor money on a phone plan, and the bar
 * cannot show it anyway.
 */
export default function RailPeek({
  state,
  title,
  note,
  glyph,
  children,
  openLabel,
  closeLabel,
  heading,
  menu,
  source,
  onOpen,
  onClose,
  onMenu,
  className,
}: RailPeekProps) {
  const panel = useRef<HTMLDivElement | null>(null);

  // Escape belongs to the OPEN state only: a peek bar that swallows Escape
  // steals it from whatever the person was actually doing on the page.
  useEffect(() => {
    if (state !== "open") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.({ source });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state, onClose, source]);

  // Focus moves into the sheet when it opens, and only then.
  useEffect(() => {
    if (state === "open") panel.current?.focus();
  }, [state]);

  if (state === "closed") return null;

  const open = state === "open";

  return (
    <div
      className={["rail-peek", className].filter(Boolean).join(" ")}
      data-rail-peek={source}
      data-rail-state={state}
    >
      {/* The scrim exists only while open, and it is a button so a tap
          outside closes — the gesture everybody already has. */}
      {open && (
        <button
          type="button"
          className="rail-peek__scrim"
          onClick={() => onClose?.({ source })}
        >
          <span className="rail-sr-only">{closeLabel}</span>
        </button>
      )}

      <div
        className="rail-peek__panel"
        ref={panel}
        tabIndex={open ? -1 : undefined}
        role={open ? "dialog" : undefined}
        aria-modal={open ? true : undefined}
        aria-label={open ? undefined : openLabel}
      >
        {open ? (
          <>
            <div className="rail-peek__grip" aria-hidden="true" />
            <div className="rail-peek__head">
              <h2 className="rail-peek__heading">{heading ?? title}</h2>
              {menu && (
                <button
                  type="button"
                  className="rail-peek__menu"
                  onClick={() => onMenu?.({ source })}
                >
                  <span aria-hidden="true">{menu.glyph ?? "···"}</span>
                  <span className="rail-sr-only">{menu.label}</span>
                </button>
              )}
              <button
                type="button"
                className="rail-peek__close"
                onClick={() => onClose?.({ source })}
              >
                <span aria-hidden="true">×</span>
                <span className="rail-sr-only">{closeLabel}</span>
              </button>
            </div>
            {/* Only now: see the note on the component. */}
            <div className="rail-peek__body">{children}</div>
          </>
        ) : (
          <button
            type="button"
            className="rail-peek__bar"
            onClick={() => onOpen?.({ source })}
          >
            {glyph && (
              <span className="rail-peek__glyph" aria-hidden="true">
                {glyph}
              </span>
            )}
            <span className="rail-peek__lines">
              <span className="rail-peek__title">{title}</span>
              {note && <span className="rail-peek__note">{note}</span>}
            </span>
            <span className="rail-sr-only">{openLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}
