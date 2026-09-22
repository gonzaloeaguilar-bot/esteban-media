"use client";

export type RailRedeemItem = {
  id: string;
  /** What you get. */
  name: string;
  /** What it costs, in the site's own currency of points or credits. */
  cost: number;
  image?: { src: string; alt: string };
  /** "NEW REWARD", "Last few". */
  badge?: string;
  href?: string;
};

export type RailRedeemProps = {
  items: RailRedeemItem[];
  /** What the person has right now. Everything else is derived from this. */
  balance: number;
  /** The word for the currency: "puntos", "points", "credits". */
  unit: string;
  /** Accessible name for the list. */
  label: string;
  /**
   * The words for "you can have this". Required, and it is the point of the
   * component: the app this came from says it with a red diamond instead of a
   * grey one, which is colour and nothing else — invisible to a screen reader
   * and ambiguous to anyone who cannot tell those two apart.
   */
  affordableLabel: string;
  /**
   * How far short you are. Receives the gap and the unit so the caller owns
   * plurals and word order — "te faltan 94 puntos" does not reorder into
   * English by rearranging a template.
   */
  shortLabel: (missing: number, unit: string) => string;
  /** BCP-47 tag for number formatting. */
  locale?: string;
  onSelect?: (info: { source: string; id: string; affordable: boolean }) => void;
  source: string;
  className?: string;
};

/**
 * The catalogue of what points can be exchanged for, read against what the
 * person actually has.
 *
 * The one thing it exists to get right: **whether you can afford this is said
 * in words, not only in a colour.** In the app this was drawn from, an
 * affordable reward has a red mark and an unaffordable one a grey mark — the
 * same shape, the same size, differing only in hue. That reaches nobody using
 * a screen reader and is a coin-flip for the ~1 in 12 men with a red-green
 * deficiency, on the single fact the whole screen exists to communicate.
 *
 * Unaffordable rows are NOT hidden and NOT disabled. A catalogue that shows
 * only what you can already afford removes the reason to come back, and a
 * disabled row cannot be focused to find out what it costs. They are reachable,
 * readable, and they say how much more is needed.
 */
export default function RailRedeem({
  items,
  balance,
  unit,
  label,
  affordableLabel,
  shortLabel,
  locale,
  onSelect,
  source,
  className,
}: RailRedeemProps) {
  const format = (value: number) => new Intl.NumberFormat(locale).format(value);

  return (
    <ul
      className={["rail-redeem", className].filter(Boolean).join(" ")}
      aria-label={label}
      data-rail-redeem={source}
    >
      {items.map((item) => {
        const affordable = balance >= item.cost;
        const missing = item.cost - balance;
        const status = affordable ? affordableLabel : shortLabel(missing, unit);
        const body = (
          <>
            <span
              className="rail-redeem__mark"
              data-affordable={affordable ? "" : undefined}
              aria-hidden="true"
            />
            {item.image && (
              <span className="rail-redeem__thumb">
                <img
                  className="rail-redeem__image"
                  src={item.image.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
            )}
            <span className="rail-redeem__text">
              {item.badge && <span className="rail-redeem__badge">{item.badge}</span>}
              <span className="rail-redeem__name">{item.name}</span>
              <span className="rail-redeem__cost">
                {format(item.cost)} {unit}
              </span>
              {/* La palabra, no solo el color. */}
              <span
                className={[
                  "rail-redeem__status",
                  affordable && "rail-redeem__status--yes",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {status}
              </span>
            </span>
          </>
        );

        return (
          <li
            className={["rail-redeem__item", affordable && "rail-redeem__item--yes"]
              .filter(Boolean)
              .join(" ")}
            key={item.id}
            data-affordable={affordable ? "" : undefined}
          >
            {item.href ? (
              <a
                className="rail-redeem__link"
                href={item.href}
                onClick={() => onSelect?.({ source, id: item.id, affordable })}
              >
                {body}
              </a>
            ) : (
              <div className="rail-redeem__link">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
