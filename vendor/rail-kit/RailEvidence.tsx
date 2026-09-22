"use client";

export type RailEvidenceItem = {
  id: string;
  /** Who or what this is: a brand, a production, a place. */
  name: string;
  /** The department line above the name: "MODA / 2026". */
  kicker?: string;
  /** One line on what happened. Not a case study. */
  note?: string;
  image: { src: string; alt: string };
  /**
   * WHAT THE PHOTOGRAPH IS. Required, and that is the entire point of this
   * component.
   *
   * "Photo from the post", "Photo from the experience", "Editorial photograph"
   * — a caption that tells the reader what they are looking at. A picture
   * beside a brand name is read as proof the collaboration happened, and an
   * editorial shot placed there claims something nobody agreed to. Making this
   * optional would make the safe path the one you have to remember.
   */
  provenance: string;
  /** The original source. A claim with no link is an assertion. */
  href?: string;
  /** The words on the link. Say where it goes. */
  linkLabel?: string;
};

export type RailEvidenceProps = {
  items: RailEvidenceItem[];
  source: string;
  className?: string;
};

/**
 * A collaboration, and an honest label for the picture beside it.
 *
 * THE PROVENANCE IS A REQUIRED PROP. Everything else here is an ordinary card.
 * This one thing is why it exists: on a personal site, a photograph next to a
 * brand's name reads as evidence the work happened, so an editorial image put
 * there invents a relationship. The label lives ON the image, not in the body
 * copy, because the body is what people skip.
 *
 * It is a plain list of cards. Wrap it in `Rail` for a scroller, or let it be
 * a grid — the component does not own the direction it travels in.
 */
export default function RailEvidence({ items, source, className }: RailEvidenceProps) {
  return (
    <ul className={["rail-evidence", className].filter(Boolean).join(" ")} data-rail-evidence={source}>
      {items.map((item) => (
        <li key={item.id} className="rail-evidence__item">
          <article className="rail-evidence__card">
            <span className="rail-evidence__media">
              <img src={item.image.src} alt={item.image.alt} loading="lazy" />
              <span className="rail-evidence__provenance">{item.provenance}</span>
            </span>
            <div className="rail-evidence__body">
              {item.kicker && <p className="rail-evidence__kicker">{item.kicker}</p>}
              <h3>{item.name}</h3>
              {item.note && <p className="rail-evidence__note">{item.note}</p>}
              {item.href && (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.linkLabel ?? item.name}
                </a>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
