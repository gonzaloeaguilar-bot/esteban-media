"use client";

import { seeded } from "./seeded";

export type RailConfettiProps = {
  /**
   * Nombra esta superficie, y ademas es la SEMILLA.
   *
   * Eran dos props —`source` y `seed`— hasta que la puerta de telemetria
   * pregunto quien nombra esto. Son la misma cosa: una cadena estable por
   * sitio. Las posiciones salen de aqui y no de Math.random, porque con random
   * el servidor y el cliente pintan distinto y la primera pintura salta al
   * hidratar.
   */
  source: string;
  /** Cuantas piezas. Pocas y grandes se leen mejor que muchas y diminutas. */
  pieces?: number;
  className?: string;
};

/**
 * Una rafaga finita de papel, para dentro de una tarjeta.
 *
 * Es DECORACION y nada mas. Lo que celebra tiene que decirse igual sin ella —
 * un touchdown lo cuentan el titular y el numero, nunca si cayo papel. Con
 * motion reducido no se anima ni una pieza, y eso no le puede costar nada al
 * lector.
 *
 * Vive aparte de la tarjeta para que cualquiera pueda hospedarla: la jugada, la
 * carta de coleccion, un premio recien canjeado. Una copia por componente
 * habria divergido en la primera prisa.
 */
export default function RailConfetti({ source, pieces = 14, className }: RailConfettiProps) {
  return (
    <span
      className={["rail-confetti", className].filter(Boolean).join(" ")}
      data-rail-confetti={source}
      aria-hidden="true"
    >
      {Array.from({ length: pieces }, (_, i) => (
        <span
          className="rail-confetti__piece"
          key={i}
          style={
            {
              "--_x": `${Math.round(seeded(source, i) * 100)}%`,
              "--_delay": `${Math.round(seeded(source, i + 50) * 260)}ms`,
              "--_spin": `${Math.round(seeded(source, i + 90) * 720 - 360)}deg`,
              "--_drift": `${Math.round(seeded(source, i + 130) * 60 - 30)}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
