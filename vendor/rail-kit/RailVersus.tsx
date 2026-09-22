"use client";

import type { ReactNode } from "react";
import type { RailAction } from "./types";

/** A label/value pair under a competitor — "BAL vs. NO", "14.02 pts last wk". */
export type RailVersusStat = {
  label?: string;
  value: ReactNode;
  /** Colours the value. Never decorative: "up"/"down" must mean something. */
  tone?: "up" | "down" | "neutral";
};

/** One of the two competitors. */
export type RailVersusSide = {
  id: string;
  /** The competitor: a team, a plan, a player, a product. */
  name: string;
  /**
   * The headline figure — a score, a price. A node, so "$450" can carry a
   * small "/mes". Optional: a poll has no score yet.
   */
  score?: ReactNode;
  /** What `score` is, when it is not obvious: "Projected", "Points". */
  scoreLabel?: string;
  /** Lines under the name: matchup, form, last week. */
  stats?: RailVersusStat[];
  /** Small mark in the corner of the art — a position, a tier, a category. */
  chip?: string;
  image?: { src: string; alt: string };
  /** The consumer's own mark in the picture box — a crest, an embed, a video. */
  media?: ReactNode;
  /**
   * A background for this side's panel in the `panels` layout — a team colour,
   * a gradient, a crest watermark. Any CSS background value.
   */
  tint?: string;
  /**
   * This side's share of the meter, 0-100. Both sides are normalised against
   * their sum, so 37/63 and 0.37/0.63 and 37/63000 all draw the same bar.
   */
  share?: number;
};

export type RailVersusProps = {
  /** The two competitors, in reading order: left, right. */
  sides: [RailVersusSide, RailVersusSide];
  /**
   * `scores` puts the figures side by side over a shared surface — a fixture,
   * a result, a live matchup. `panels` gives each side its own full-bleed art
   * panel with the detail below it — a poll, a this-or-that, a comparison.
   */
  layout?: "scores" | "panels";
  /** The strip across the top — league name, round, category. */
  eyebrow?: string;
  /** A mark beside the eyebrow: a sport glyph, a league crest. */
  eyebrowIcon?: ReactNode;
  /** The chip at the end of the eyebrow strip — "H2H", "Final", "Live". */
  eyebrowBadge?: string;
  /**
   * The row between the eyebrow and the sides — who is asking, how many
   * answered. The count is the consumer's number: the kit never invents one.
   */
  header?: {
    image?: { src: string; alt: string };
    title: string;
    subtitle?: string;
    /** A figure at the end of the row — a vote count, a deadline. */
    value?: ReactNode;
    /** What that figure is. Required with `value`. */
    valueLabel?: string;
  };
  /**
   * What the meter measures — "Win probability", "Share of vote". Required
   * when `share` is set on either side: an unlabelled bar is a number the
   * visitor cannot check, and the kit does not ship those.
   */
  meterLabel?: string;
  /** Hides the meter label visually. It still reaches a screen reader. */
  meterLabelHidden?: boolean;
  /** One line under the sides — "Swipe to pick", "Prices held until Friday". */
  hint?: string;
  /**
   * "glass" turns the card into a translucent panel. It needs something behind
   * it — over a flat background it is just a lighter card — so it is opt-in.
   */
  surface?: "solid" | "glass";
  /** The footer row. Two is the shape this card was drawn for; three is the cap. */
  actions?: RailAction[];
  source: string;
  onSelect?: (info: {
    source: string;
    actionId: string;
    actionIndex: number;
  }) => void;
  className?: string;
};

function pct(side: RailVersusSide, other: RailVersusSide): number | null {
  const a = side.share;
  const b = other.share;
  if (typeof a !== "number" || !Number.isFinite(a)) return null;
  if (typeof b !== "number" || !Number.isFinite(b)) return null;
  const total = a + b;
  // Two zeroes is not a 50/50, it is no data. Drawing a half-full bar for it
  // would invent a fact, so the meter is dropped instead.
  if (total <= 0) return null;
  return Math.round((a / total) * 100);
}

/**
 * Two competitors, what each is worth, how the thing is leaning, and what you
 * can do about it — the head-to-head card from a fantasy-sports app, in the
 * two shapes it actually ships in: a scoreline and a this-or-that.
 *
 * It is a card, not a rail: one comparison, sized to be the thing a visitor
 * looks at first. Wrap it in <RailFrame> for the sponsored band above it.
 *
 * Nothing here is sports-specific. Two plans and their prices, two listings
 * and their days-on-market, two coaching packages and what each includes all
 * render as the same card.
 */
export default function RailVersus({
  sides,
  layout = "scores",
  eyebrow,
  eyebrowIcon,
  eyebrowBadge,
  header,
  meterLabel,
  meterLabelHidden,
  hint,
  surface,
  actions = [],
  source,
  onSelect,
  className,
}: RailVersusProps) {
  const [left, right] = sides;
  const leftPct = pct(left, right);
  const rightPct = leftPct === null ? null : 100 - leftPct;
  // A meter with no label is a number nobody can check. Rather than render it
  // unlabelled, the kit drops it and says why in the console once.
  const meter = leftPct !== null && meterLabel ? leftPct : null;

  // Read through globalThis so the kit stays free of @types/node: consumers
  // bundle this for the browser, where `process` may not exist at all.
  const nodeEnv = (
    globalThis as { process?: { env?: { NODE_ENV?: string } } }
  ).process?.env?.NODE_ENV;

  if (nodeEnv !== "production" && leftPct !== null && !meterLabel) {
    console.warn(
      `RailVersus (${source}): sides carry a \`share\` but no \`meterLabel\`, so the meter was not drawn. Say what the percentage measures.`,
    );
  }

  const resolved = actions.slice(0, 3);

  return (
    <section
      className={["rail-versus", className].filter(Boolean).join(" ")}
      data-rail-versus={source}
      data-rail-layout={layout}
      data-rail-surface={surface}
      aria-label={`${left.name} versus ${right.name}`}
    >
      {(eyebrow || eyebrowBadge) && (
        <p className="rail-versus__eyebrow">
          {eyebrowIcon && (
            <span className="rail-versus__eyebrow-icon" aria-hidden="true">
              {eyebrowIcon}
            </span>
          )}
          {eyebrow && (
            <span className="rail-versus__eyebrow-text">{eyebrow}</span>
          )}
          {eyebrowBadge && (
            <span className="rail-versus__eyebrow-badge">{eyebrowBadge}</span>
          )}
        </p>
      )}

      {header && (
        <div className="rail-versus__header">
          {header.image && (
            <img
              className="rail-versus__header-avatar"
              src={header.image.src}
              alt={header.image.alt}
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="rail-versus__header-text">
            <p className="rail-versus__header-title">{header.title}</p>
            {header.subtitle && (
              <p className="rail-versus__header-subtitle">{header.subtitle}</p>
            )}
          </div>
          {header.value !== undefined && (
            <p className="rail-versus__header-value">
              <span className="rail-versus__header-value-figure">
                {header.value}
              </span>
              {header.valueLabel && (
                <span className="rail-versus__header-value-label">
                  {header.valueLabel}
                </span>
              )}
            </p>
          )}
        </div>
      )}

      <div className="rail-versus__sides">
        {sides.map((side, index) => (
          <div
            className="rail-versus__side"
            key={side.id}
            data-rail-side={index === 0 ? "left" : "right"}
            style={side.tint ? { ["--_tint" as string]: side.tint } : undefined}
          >
            {(side.media || side.image) && (
              <span className="rail-versus__art">
                {side.media ?? (
                  <img
                    className="rail-versus__art-image"
                    src={side.image!.src}
                    alt={side.image!.alt}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {side.chip && (
                  <span className="rail-versus__chip">{side.chip}</span>
                )}
              </span>
            )}

            <div className="rail-versus__body">
              <p className="rail-versus__name">{side.name}</p>

              {side.score !== undefined && (
                <p className="rail-versus__score">
                  <span className="rail-versus__score-figure">
                    {side.score}
                  </span>
                  {side.scoreLabel && (
                    <span className="rail-versus__score-label">
                      {side.scoreLabel}
                    </span>
                  )}
                </p>
              )}

              {side.stats && side.stats.length > 0 && (
                <ul className="rail-versus__stats">
                  {side.stats.map((stat, statIndex) => (
                    <li
                      className="rail-versus__stat"
                      key={stat.label ?? statIndex}
                      data-rail-tone={stat.tone ?? "neutral"}
                    >
                      {stat.label && (
                        <span className="rail-versus__stat-label">
                          {stat.label}
                        </span>
                      )}
                      <span className="rail-versus__stat-value">
                        {stat.value}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {meter !== null && (
        <div className="rail-versus__meter">
          <p
            className={[
              "rail-versus__meter-label",
              meterLabelHidden ? "rail-versus__sr" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {meterLabel}
          </p>
          <div className="rail-versus__meter-row">
            <span className="rail-versus__meter-value">{meter}%</span>
            {/* The bar restates the two percentages beside it, so it is
                decorative and stays out of the accessibility tree. */}
            <span className="rail-versus__meter-track" aria-hidden="true">
              <span
                className="rail-versus__meter-fill"
                style={{ inlineSize: `${meter}%` }}
              />
            </span>
            <span className="rail-versus__meter-value">{rightPct}%</span>
          </div>
        </div>
      )}

      {hint && <p className="rail-versus__hint">{hint}</p>}

      {resolved.length > 0 && (
        <div className="rail-versus__actions">
          {resolved.map((action, index) => (
            <a
              className="rail-versus__action"
              key={action.id ?? action.label}
              href={action.href}
              onClick={() =>
                onSelect?.({
                  source,
                  actionId: action.id ?? action.label,
                  actionIndex: index,
                })
              }
            >
              {action.label}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
