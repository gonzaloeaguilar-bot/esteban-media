"use client";

import type { ReactNode } from "react";
import RailConfetti from "./RailConfetti";

export type RailPlayCardProps = {
  /** The cut-out of whoever this is about. */
  image?: { src: string; alt: string };
  /** Who: a name, a handle, a team. */
  who: string;
  /** A short qualifier after the name — a position, a role. */
  role?: string;
  /** What happened, in a few words: "3 YD TD CATCH", "Reserva confirmada". */
  what: string;
  /** The change this moment caused: "+6.80". Already formatted and signed. */
  delta?: string;
  /** What it adds up to now: "11.10 Pts". */
  total?: string;
  /** Bottom left — the state of the world: "NYJ 17 · GB 13 · 4th 8:02". */
  context?: string;
  /** Bottom right — where it happened: "2nd & 3 @ NYJ 3". */
  place?: string;
  /** A big mark behind everything: a team crest, a brand glyph. */
  watermark?: ReactNode;
  /**
   * Throws a finite burst of confetti once, on mount.
   *
   * It is DECORATION and nothing else. The card has to say the same thing
   * without it — a touchdown is told by `what` and `delta`, never by whether
   * paper fell. Under reduced motion no confetti is rendered at all, and that
   * must cost the reader nothing.
   */
  celebrate?: boolean;
  /**
   * La letra pequena: una hora, una fuente, una aclaracion. Se lee, no se
   * insinua — si algo hay que decir en pequeno, se dice, no se quita.
   */
  detail?: ReactNode;
  /**
   * Un halo alrededor de la tarjeta. `"pulse"` respira. Es enfasis, nunca el
   * dato: la tarjeta tiene que decir lo mismo con el halo apagado.
   */
  glow?: "soft" | true | "strong" | "pulse";
  href?: string;
  source: string;
  onSelect?: (info: { source: string; who: string }) => void;
  className?: string;
};


/**
 * One moment, as a card: who it was about, what happened, and what it changed.
 *
 * The number and the words carry the news. The tint, the crest behind it and
 * the confetti are the volume, and the volume can be turned to zero without
 * losing a word — which is the test every celebration effect should have to
 * pass and most do not.
 */
export default function RailPlayCard({
  image,
  who,
  role,
  what,
  delta,
  total,
  context,
  place,
  watermark,
  celebrate = false,
  detail,
  glow,
  href,
  source,
  onSelect,
  className,
}: RailPlayCardProps) {
  const body = (
    <>
      {watermark && (
        <span className="rail-playcard__watermark" aria-hidden="true">
          {watermark}
        </span>
      )}
      {celebrate && <RailConfetti source={source} />}
      {image && (
        <span className="rail-playcard__cutout">
          <img
            className="rail-playcard__image"
            src={image.src}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </span>
      )}
      <span className="rail-playcard__body">
        <span className="rail-playcard__line">
          <span className="rail-playcard__who">{who}</span>
          {role && <span className="rail-playcard__role">{role}</span>}
        </span>
        <span className="rail-playcard__what">{what}</span>
      </span>
      {(delta || total) && (
        <span className="rail-playcard__score">
          {delta && <span className="rail-playcard__delta">{delta}</span>}
          {total && <span className="rail-playcard__total">{total}</span>}
        </span>
      )}
      {detail && <span className="rail-playcard__detail">{detail}</span>}
      {(context || place) && (
        <span className="rail-playcard__foot">
          {context && <span className="rail-playcard__context">{context}</span>}
          {place && <span className="rail-playcard__place">{place}</span>}
        </span>
      )}
    </>
  );

  const cls = ["rail-playcard", celebrate && "rail-playcard--celebrate", className]
    .filter(Boolean)
    .join(" ");
  // El halo se dibuja FUERA y la tarjeta recorta por dentro: un box-shadow
  // exterior muere dentro de su propio overflow:hidden.
  const halo = glow ? { "data-rail-glow": glow === true ? "" : glow } : {};

  return href ? (
    <a className={cls} data-rail-playcard={source} href={href} {...halo} onClick={() => onSelect?.({ source, who })}>
      {body}
    </a>
  ) : (
    <div className={cls} data-rail-playcard={source} {...halo}>
      {body}
    </div>
  );
}
