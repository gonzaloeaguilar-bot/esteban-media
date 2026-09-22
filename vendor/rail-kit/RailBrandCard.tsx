"use client";

export type RailBrandCardProps = {
  /** The photograph. Fills the card; the words sit under it, never on it. */
  image: { src: string; alt: string };
  /** What kind of work this was: "Campaign", "Broadcast", "Partnership". */
  category?: string;
  /** Who it was for. The brand's own name. */
  name: string;
  /** One short line about the work. One. Anything longer belongs in a sheet. */
  phrase?: string;
  /**
   * What the photograph actually is. This is not decoration.
   *
   * `"work"` — the picture *is* the work: a frame from the campaign, the
   * published post. It stands as evidence.
   *
   * `"editorial"` — a stock or editorial photograph chosen to illustrate. It
   * is NOT evidence, and the component says so on the card, because an
   * unlabelled illustrative photo next to a brand name reads as proof that the
   * work happened.
   *
   * Defaults to `"editorial"`: the claim that a picture proves something has
   * to be made deliberately, never by forgetting to pass a prop.
   */
  provenance?: "work" | "editorial";
  /**
   * The words printed under an `"editorial"` picture. Override per brand and
   * per language; the component will not invent one.
   */
  editorialLabel?: string;
  /** Where the picture came from. Shown for both kinds. */
  credit?: string;
  /** Optional destination for the whole card. */
  href?: string;
  source: string;
  onSelect?: (info: { source: string; name: string }) => void;
  className?: string;
};

/**
 * A brand on a client list: one photograph, the category, the name, one line.
 *
 * Built because danielzea-site and the Castiblanco site each grew their own
 * version of this card, and both hit the same problem — an illustrative photo
 * beside a brand name is read by visitors as proof the work happened. So
 * provenance is a required part of the card's meaning, defaulted to the
 * cautious side, and rendered as visible words rather than a title attribute.
 */
export default function RailBrandCard({
  image,
  category,
  name,
  phrase,
  provenance = "editorial",
  editorialLabel,
  credit,
  href,
  source,
  onSelect,
  className,
}: RailBrandCardProps) {
  const cls = ["rail-brandcard", `rail-brandcard--${provenance}`, className]
    .filter(Boolean)
    .join(" ");

  // Rama literal: `<Tag>` esconde el ancla de cualquier comprobador que lea el
  // fuente, y self-audit marcaba BLOCK en teclado por eso.
  const body = (
    <>
      <div className="rail-brandcard__media">
        <img
          className="rail-brandcard__image"
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="rail-brandcard__body">
        {category && <p className="rail-brandcard__category">{category}</p>}
        <h3 className="rail-brandcard__name">{name}</h3>
        {phrase && <p className="rail-brandcard__phrase">{phrase}</p>}
        {provenance === "editorial" && editorialLabel && (
          <p className="rail-brandcard__label">{editorialLabel}</p>
        )}
        {credit && <p className="rail-brandcard__credit">{credit}</p>}
      </div>
    </>
  );

  return href ? (
    <a className={cls} data-rail-brandcard={source} data-provenance={provenance} href={href} onClick={() => onSelect?.({ source, name })}>
      {body}
    </a>
  ) : (
    <article className={cls} data-rail-brandcard={source} data-provenance={provenance}>
      {body}
    </article>
  );
}
