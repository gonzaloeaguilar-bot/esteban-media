"use client";

import type { ReactNode } from "react";

export type RailPageHeaderProps = {
  title: string;
  /** A crest or wordmark before the title. */
  mark?: ReactNode;
  /** The way back. Omit on a root screen — a back button to nowhere is worse. */
  back?: { href?: string; onClick?: () => void; label?: string };
  /** Controls at the end: a chat button, a settings gear. */
  actions?: { id: string; label: string; glyph: ReactNode; href?: string; onClick?: () => void }[];
  /** Renders the title as a button that expands something — a league switcher. */
  onExpand?: () => void;
  expanded?: boolean;
  /** Small line under the title — a tier, a location, a date. */
  meta?: ReactNode;
  source: string;
  className?: string;
};

/**
 * The top of a screen that is not the home screen: a way back, what you are
 * looking at, and the one or two things you can do to it.
 *
 * The title is an <h1> whether or not it is also a button. A screen with no
 * level-one heading is one a screen-reader user cannot orient in, and wrapping
 * it in a control does not stop it being the name of the page.
 *
 * `back` is omitted deliberately on a root screen rather than rendered
 * disabled: a back button that goes nowhere is worse than none, because it is
 * the control people press first.
 */
export default function RailPageHeader({
  title,
  mark,
  back,
  actions = [],
  onExpand,
  expanded,
  meta,
  source,
  className,
}: RailPageHeaderProps) {
  return (
    <header
      className={["rail-pageheader", className].filter(Boolean).join(" ")}
      data-rail-pageheader={source}
    >
      <div className="rail-pageheader__row">
        {back &&
          (back.href ? (
            <a className="rail-pageheader__back" href={back.href}>
              <span aria-hidden="true">←</span>
              <span className="rail-pageheader__sr">{back.label ?? "Back"}</span>
            </a>
          ) : (
            <button
              type="button"
              className="rail-pageheader__back"
              onClick={back.onClick}
            >
              <span aria-hidden="true">←</span>
              <span className="rail-pageheader__sr">{back.label ?? "Back"}</span>
            </button>
          ))}

        <h1 className="rail-pageheader__title">
          {mark && (
            <span className="rail-pageheader__mark" aria-hidden="true">
              {mark}
            </span>
          )}
          {onExpand ? (
            <button
              type="button"
              className="rail-pageheader__expand"
              aria-expanded={expanded}
              onClick={onExpand}
            >
              {title}
              <span className="rail-pageheader__chevron" aria-hidden="true">
                ⌄
              </span>
            </button>
          ) : (
            title
          )}
        </h1>

        {actions.length > 0 && (
          <div className="rail-pageheader__actions">
            {actions.map((action) =>
              action.href ? (
                <a
                  className="rail-pageheader__action"
                  key={action.id}
                  href={action.href}
                >
                  <span aria-hidden="true">{action.glyph}</span>
                  <span className="rail-pageheader__sr">{action.label}</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="rail-pageheader__action"
                  key={action.id}
                  onClick={action.onClick}
                >
                  <span aria-hidden="true">{action.glyph}</span>
                  <span className="rail-pageheader__sr">{action.label}</span>
                </button>
              ),
            )}
          </div>
        )}
      </div>
      {meta && <p className="rail-pageheader__meta">{meta}</p>}
    </header>
  );
}
