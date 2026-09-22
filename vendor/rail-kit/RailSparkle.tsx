"use client";

import { seeded } from "./seeded";

export type RailSparkleProps = {
  /** Nombra esta superficie, y ademas es la semilla de donde caen los destellos. */
  source: string;
  /** Cuantos. Pocos y grandes se leen como brillo; muchos y pequenos, como ruido. */
  glints?: number;
  /**
   * Se repite mientras la pieza este en pantalla.
   *
   * Apagado por defecto: un destello que no para es un adorno que corre
   * siempre, y en una lista de veinte cartas son veinte animaciones
   * compitiendo por el mismo hilo. Enciendelo para LA pieza rara, no para la
   * fila entera.
   */
  loop?: boolean;
  className?: string;
};

/**
 * La rafaga de brillos que sale cuando aparece algo raro.
 *
 * Es DECORACION, igual que el confeti: lo que hace especial a una pieza se
 * dice con palabras —"Inmortal", "1 / 1997"— y el destello solo lo subraya. Si
 * una pieza necesitara el brillo para saberse rara, ya estaria mal antes de
 * llegar aqui.
 *
 * Con motion reducido no se pinta ni un destello, y eso no le puede costar
 * nada al lector.
 */
export default function RailSparkle({
  source,
  glints = 7,
  loop = false,
  className,
}: RailSparkleProps) {
  return (
    <span
      className={["rail-sparkle", loop && "rail-sparkle--loop", className]
        .filter(Boolean)
        .join(" ")}
      data-rail-sparkle={source}
      aria-hidden="true"
    >
      {Array.from({ length: glints }, (_, i) => (
        <span
          className="rail-sparkle__glint"
          key={i}
          style={
            {
              "--_x": `${Math.round(seeded(source, i) * 92) + 4}%`,
              "--_y": `${Math.round(seeded(source, i + 40) * 88) + 6}%`,
              "--_size": `${Math.round(seeded(source, i + 80) * 16) + 10}px`,
              "--_delay": `${Math.round(seeded(source, i + 120) * 900)}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
