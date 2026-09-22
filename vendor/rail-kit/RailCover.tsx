"use client";

export type RailCoverPoster = {
  id: string;
  /** Department and place: "ESTILO / MADRID". */
  label?: string;
  /** Printed small beside the label — the issue number of this poster. */
  number?: string;
  /** Two or three words. It is a cover line, not a headline. */
  title: string;
  /** The italic half of the cover line, set on its own row. */
  emphasis?: string;
  /** One short line under it. */
  note?: string;
  image: { src: string; alt: string };
  href?: string;
  linkLabel?: string;
};

export type RailCoverProps = {
  /** The magazine name, top left. */
  masthead: string;
  /** "VOL. 01 / 2026". Whatever edition this is. */
  edition?: string;
  posters: RailCoverPoster[];
  /** Read by a screen reader on the scroller itself. */
  scrollerLabel: string;
  source: string;
  className?: string;
};

/**
 * The cover — the first screen of a magazine-format site.
 *
 * THE TEXT IS NEVER ON THE FACE. The poster is two zones in one card: the
 * photograph on top, the words in a panel below it. Laying copy over a portrait
 * is the single most-repeated correction in this repo's history (E03), and it
 * recurs because an overlay looks right in the one asset it was drawn against
 * and wrong in every other. Two zones cannot regress.
 *
 * THE FIRST POSTER LOADS EAGER, THE REST DO NOT. `fetchpriority="high"` on the
 * first and `loading="lazy"` on the others: this is the first paint, and a
 * cover that arrives after the fold has already been scrolled past is a cover
 * nobody saw.
 *
 * THE OVERLAY IS UNDER THE PANEL, not over the face. It exists to seat the
 * photograph against the page, not to make text legible — the text is not on
 * the photograph.
 */
export default function RailCover({
  masthead,
  edition,
  posters,
  scrollerLabel,
  source,
  className,
}: RailCoverProps) {
  return (
    <section className={["rail-cover", className].filter(Boolean).join(" ")} data-rail-cover={source}>
      <p className="rail-cover__masthead">
        <span>{masthead}</span>
        {edition && <span className="rail-cover__edition">{edition}</span>}
      </p>
      <div className="rail-cover__track" tabIndex={0} aria-label={scrollerLabel}>
        {posters.map((poster, i) => (
          <article className="rail-cover__poster" key={poster.id}>
            <span className="rail-cover__media">
              <img
                src={poster.image.src}
                alt={poster.image.alt}
                {...(i === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
              />
              <span className="rail-cover__shade" aria-hidden="true" />
              {poster.label && (
                <span className="rail-cover__label">
                  {poster.label}
                  {poster.number && <b>{poster.number}</b>}
                </span>
              )}
            </span>
            <div className="rail-cover__copy">
              <h2>
                {poster.title}
                {poster.emphasis && (
                  <>
                    <br />
                    <em>{poster.emphasis}</em>
                  </>
                )}
              </h2>
              {poster.note && <p>{poster.note}</p>}
              {poster.href && (
                <a href={poster.href} target="_blank" rel="noopener noreferrer">
                  {poster.linkLabel ?? poster.title}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
