"use client";

import type { ReactNode } from "react";
import type { RailAction } from "./types";

export type RailBillboardProps = {
  /** The artwork. Full-bleed behind everything else. */
  image: { src: string; alt: string };
  /**
   * The title. Pass a string and it renders as type; pass a node — usually an
   * <img> of a logo lockup — and it renders as art, the way a poster does.
   * Give a logo an alt so the title is still readable to a screen reader.
   */
  title: string | ReactNode;
  /** One line under the title: a date, a status, a price. State facts only. */
  status?: string;
  /** Corner mark: a brand glyph, "TOP 10", "New". */
  badge?: string;
  /** Up to three. The first is filled, the rest outlined. */
  actions?: RailAction[];
  source: string;
  onSelect?: (info: { source: string; actionId: string; actionIndex: number }) => void;
  className?: string;
};

/**
 * The big single card above the rails — Netflix's billboard. Not a rail: one
 * piece of art, one promise, and the two or three things a visitor can do
 * about it.
 */
export default function RailBillboard({
  image,
  title,
  status,
  badge,
  actions = [],
  source,
  onSelect,
  className,
}: RailBillboardProps) {
  const resolved = actions.slice(0, 3).map((action, index) => ({
    ...action,
    variant: action.variant ?? (index === 0 ? "primary" : "secondary"),
  }));

  return (
    <section
      className={["rail-billboard", className].filter(Boolean).join(" ")}
      data-rail-billboard={source}
    >
      <img
        className="rail-billboard__image"
        src={image.src}
        alt={image.alt}
        decoding="async"
      />
      {badge && <span className="rail-billboard__badge">{badge}</span>}
      <div className="rail-billboard__content">
        {typeof title === "string" ? (
          <h2 className="rail-billboard__title">{title}</h2>
        ) : (
          <div className="rail-billboard__lockup">{title}</div>
        )}
        {status && <p className="rail-billboard__status">{status}</p>}
        {resolved.length > 0 && (
          <div className="rail-billboard__actions">
            {resolved.map((action, index) => (
              <a
                key={action.id ?? action.label}
                className={`rail-card__cta rail-card__cta--${action.variant}`}
                href={action.href}
                onClick={() =>
                  onSelect?.({
                    source,
                    actionId: action.id ?? action.label,
                    actionIndex: index,
                  })
                }
              >
                <span className="rail-card__cta-label">{action.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
