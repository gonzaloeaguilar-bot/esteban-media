"use client";

export type RailNoteItem = {
  id: string;
  /** Whose note it is. */
  name: string;
  avatar: { src: string; alt: string };
  /**
   * The note itself. A few words. Absent renders the avatar with no bubble,
   * which is how "nobody has posted" looks — not a hidden row.
   */
  note?: string;
  href?: string;
  /** Marks this as the viewer's own, usually rendered first. */
  own?: boolean;
  /** Already read: the brand may dim the ring. */
  seen?: boolean;
};

export type RailNoteProps = {
  items: RailNoteItem[];
  /** What this row is, for a screen reader. */
  label: string;
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * A row of faces, each with a few words floating above it — the notes row at
 * the top of an inbox.
 *
 * The words sit in a bubble **above** the picture, never across it. That is
 * not a style choice: a caption laid over a photograph lands on the face at
 * some text size, in some language, on some screen. Above the avatar it cannot,
 * at any of them.
 *
 * The bubble is capped at three lines and the rest is clipped, because a note
 * is a passing thought, and a row whose cards grow to fit the longest one
 * stops being a row.
 */
export default function RailNote({
  items,
  label,
  source,
  onSelect,
  className,
}: RailNoteProps) {
  return (
    <ul
      className={["rail-note", className].filter(Boolean).join(" ")}
      // Una region que el raton desplaza y el teclado no es inalcanzable sin
      // puntero, y Safari NO trae el foco automatico de scroller que si trajeron
      // los demas. axe: scrollable-region-focusable, WCAG 2.1.1.
      tabIndex={0}
      aria-label={label}
      data-rail-note={source}
    >
      {items.map((item, index) => {
        const cls = [
          "rail-note__link",
          item.own && "rail-note__link--own",
          item.seen && "rail-note__link--seen",
        ]
          .filter(Boolean)
          .join(" ");
        // Rama literal, no `<Tag>`: un comprobador que lee el fuente no ve un
        // ancla dentro de una variable, y self-audit marcaba BLOCK en teclado.
        const body = (
          <>
              {item.note ? (
                <span className="rail-note__bubble">{item.note}</span>
              ) : (
                <span className="rail-note__bubble rail-note__bubble--empty" aria-hidden="true" />
              )}
              <span className="rail-note__avatar">
                <img
                  className="rail-note__image"
                  src={item.avatar.src}
                  alt={item.avatar.alt}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="rail-note__name">{item.name}</span>
          </>
        );
        return (
          <li className="rail-note__item" key={item.id}>
            {item.href ? (
              <a className={cls} href={item.href} onClick={() => onSelect?.({ source, id: item.id, index })}>
                {body}
              </a>
            ) : (
              <div className={cls}>{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
