export type RailStamp = {
  id: string;
  /** What it is: the country, the chapter, the model. */
  title: string;
  /** Small, above the title: "PREVIOUS", "NEXT", a number, a date. */
  kicker?: string;
  image?: { src: string; alt: string };
  href: string;
};

export type RailStampsProps = {
  /** Where you came from. Omit at the start of the sequence. */
  previous?: RailStamp;
  /** Where you go next. Omit at the end. */
  next?: RailStamp;
  /** Read on the nav itself: "Destinations", "Chapters". */
  label: string;
  source: string;
  className?: string;
};

/**
 * The two neighbours of the thing you are looking at, as framed stamps parked
 * left and right of it.
 *
 * WHY NOT ARROWS. An arrow says a direction; a stamp says a destination. On a
 * sequence where the items are the point — countries, chapters, models — the
 * question is never "is there a next one" but "is the next one worth the
 * click", and an arrow cannot answer it. The stamp shows the thing.
 *
 * IT IS A NAV, NOT TWO BUTTONS. Both ends live in one landmark with one label,
 * so a screen reader announces a pair to move between and not two orphan links
 * separated by the entire width of the page. `label` is required for the same
 * reason every other surface in the kit requires one.
 *
 * ONE END MAY BE MISSING AND THE OTHER MUST NOT MOVE. At the start of a
 * sequence there is no previous, and a flex row would slide the next stamp
 * into the middle of the page where nothing else sits. The row is a
 * three-column grid with the middle column empty on purpose: an absent
 * neighbour leaves a hole where it would have been, and the one that remains
 * stays exactly where it was on every other item.
 *
 * THE IMAGE IS OPTIONAL AND THE FRAME IS NOT. Without art the stamp is its
 * kicker and title inside the same border at the same size, because a sequence
 * where half the items have a picture must not have half its stamps a
 * different shape.
 */
export default function RailStamps({
  previous,
  next,
  label,
  source,
  className,
}: RailStampsProps) {
  if (!previous && !next) return null;

  const stamp = (item: RailStamp | undefined, side: "previous" | "next") =>
    item ? (
      <a
        className="rail-stamps__stamp"
        data-rail-side={side}
        href={item.href}
        key={item.id}
        rel={side === "previous" ? "prev" : "next"}
      >
        {item.image ? (
          <img
            alt={item.image.alt}
            className="rail-stamps__art"
            loading="lazy"
            src={item.image.src}
          />
        ) : null}
        {item.kicker ? (
          <span className="rail-stamps__kicker">{item.kicker}</span>
        ) : null}
        <span className="rail-stamps__title">{item.title}</span>
      </a>
    ) : (
      <span aria-hidden="true" className="rail-stamps__gap" />
    );

  return (
    <nav
      aria-label={label}
      className={["rail-stamps", className].filter(Boolean).join(" ")}
      data-rail-stamps={source}
    >
      {stamp(previous, "previous")}
      <span aria-hidden="true" className="rail-stamps__gap" />
      {stamp(next, "next")}
    </nav>
  );
}
