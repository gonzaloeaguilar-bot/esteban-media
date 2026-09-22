"use client";

import type { ReactNode } from "react";

export type RailTier = {
  id: string;
  /** Que hay que hacer: "Invita a 2 amigos mas". */
  requirement: string;
  /** Lo que se gana al llegar: "150 $ extra". */
  reward: string;
  /** Ya alcanzado. */
  reached?: boolean;
  glyph?: ReactNode;
};

export type RailTiersProps = {
  tiers: RailTier[];
  /** De que escalera es esta. Obligatorio. */
  label: string;
  /** La letra pequeña de abajo: condiciones, enlace a los terminos. */
  footnote?: ReactNode;
  reachedLabel?: string;
  source: string;
  className?: string;
};

/**
 * La escalera de recompensas: cuanto mas haces, mas hay, tramo a tramo.
 *
 * Es una `<ol>`, no una `<ul>`: el orden ES el dato. "Invita a 2 mas" solo
 * significa algo despues del tramo anterior, y una lista sin orden dice que
 * daba igual por cual empezar.
 *
 * Los tramos alcanzados llevan la palabra, no solo la marca. Un check verde
 * y un check gris son el mismo check para media sala.
 *
 * No es `RailMilestone`, que mide el camino entre DOS puntos con nombre, ni
 * `RailRedeem`, que es un catalogo contra un saldo. Aqui no hay saldo ni
 * destino unico: hay una serie de umbrales, y cada uno paga mas que el de
 * antes.
 *
 * Ojo con la longitud. Cinco tramos motivan; doce son una tabla de tarifas, y
 * una tabla de tarifas no la lee nadie.
 */
export default function RailTiers({
  tiers,
  label,
  footnote,
  reachedLabel = "Conseguido",
  source,
  className,
}: RailTiersProps) {
  if (tiers.length === 0) return null;

  return (
    <div
      className={["rail-tiers", className].filter(Boolean).join(" ")}
      data-rail-tiers={source}
    >
      <ol className="rail-tiers__list" aria-label={label}>
        {tiers.map((t) => (
          <li
            className="rail-tiers__row"
            key={t.id}
            data-reached={t.reached ? "" : undefined}
          >
            <span className="rail-tiers__glyph" aria-hidden="true">
              {t.glyph ?? "+"}
            </span>
            <span className="rail-tiers__text">
              <span className="rail-tiers__requirement">{t.requirement}</span>
              <span className="rail-tiers__reward">{t.reward}</span>
            </span>
            {t.reached && (
              <span className="rail-tiers__reached">{reachedLabel}</span>
            )}
          </li>
        ))}
      </ol>
      {footnote && <p className="rail-tiers__footnote">{footnote}</p>}
    </div>
  );
}
