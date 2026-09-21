"use client";

import type { ReactNode } from "react";

export type RailFramePresenter = {
  /** The sponsor's name. Always required, even when a logo is supplied: it is
   *  what a screen reader announces and what the logo's alt falls back to. */
  name: string;
  /** Usually an <img> of the wordmark. Without one the name renders as type. */
  logo?: ReactNode;
  /** Makes the sponsor clickable. Marked rel="sponsored nofollow noopener". */
  href?: string;
};

export type RailFrameProps = {
  /**
   * What this frame is announcing — "Matchup of the week", "Playoff push".
   * The frame exists to say a section is special; without a label it is just
   * a border, so the label is required.
   */
  label: string;
  /**
   * The sponsor, when the placement is paid. Renders "Presented by <name>"
   * and marks the link as sponsored. Omit for an unpaid frame.
   */
  presenter?: RailFramePresenter;
  /** Overrides "Presented by" — pass the site's own language. */
  presenterPrefix?: string;
  /** Anything: a versus card, a rail, a billboard, a grid of cards. */
  children: ReactNode;
  source: string;
  onSelect?: (info: { source: string; actionId: string }) => void;
  className?: string;
};

/**
 * The band-and-border that wraps a section to mark it as the week's one
 * special thing — the shape Yahoo Fantasy uses for its matchup of the week.
 *
 * It is deliberately a wrapper and not a card: the frame says "this one
 * matters", and what matters is the consumer's business. A versus card, a
 * rail, a billboard and a plain block of copy all sit inside it unchanged.
 *
 * On the sponsor link: a paid placement that links out is a paid link, so the
 * kit sets rel="sponsored nofollow noopener" and does not offer a way to turn
 * that off. Getting this wrong is a search-ranking penalty on the consuming
 * site, which is not a decision a card component should be able to make.
 */
export default function RailFrame({
  label,
  presenter,
  presenterPrefix = "Presented by",
  children,
  source,
  onSelect,
  className,
}: RailFrameProps) {
  const mark = presenter?.logo ?? presenter?.name;

  return (
    <section
      className={["rail-frame", className].filter(Boolean).join(" ")}
      data-rail-frame={source}
      aria-label={
        presenter ? `${label} — ${presenterPrefix} ${presenter.name}` : label
      }
    >
      <p className="rail-frame__band">
        <span className="rail-frame__label">{label}</span>
        {presenter && (
          <span className="rail-frame__presenter">
            <span className="rail-frame__presenter-prefix">
              {presenterPrefix}
            </span>
            {presenter.href ? (
              <a
                className="rail-frame__presenter-mark"
                href={presenter.href}
                rel="sponsored nofollow noopener"
                onClick={() =>
                  onSelect?.({ source, actionId: `presenter:${presenter.name}` })
                }
              >
                {mark}
              </a>
            ) : (
              <span className="rail-frame__presenter-mark">{mark}</span>
            )}
          </span>
        )}
      </p>
      <div className="rail-frame__body">{children}</div>
    </section>
  );
}
