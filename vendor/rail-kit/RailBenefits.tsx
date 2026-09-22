"use client";

import type { ReactNode } from "react";

export type RailBenefit = {
  id: string;
  /** La marca de la izquierda. Decorativa: el titulo ya dice de que va. */
  glyph?: ReactNode;
  /** Que ganas, en pocas palabras. */
  title: string;
  /** Una o dos frases. Si necesita tres, son dos beneficios. */
  body: string;
};

export type RailBenefitsProps = {
  benefits: RailBenefit[];
  /** Que lista es esta, para un lector de pantalla. */
  label: string;
  source: string;
  className?: string;
};

/**
 * Lo que ganas, en filas: una marca, un titulo y una linea.
 *
 * Es una `<ul>` de verdad, asi que se anuncia como "lista de 3" y se puede
 * recorrer como lista. Un monton de `<div>` con un icono al lado se ve igual y
 * no se puede navegar: quien usa lector de pantalla no sabe cuantas ventajas
 * hay ni cuando se acaban.
 *
 * El glifo va `aria-hidden` siempre. Un icono de regalo junto a "Gana dinero"
 * no anade informacion — la repite en un idioma que no todo el mundo lee igual.
 *
 * Tres o cuatro como mucho. Una pantalla que enumera siete ventajas no esta
 * convenciendo, esta pidiendo perdon.
 */
export default function RailBenefits({
  benefits,
  label,
  source,
  className,
}: RailBenefitsProps) {
  return (
    <ul
      className={["rail-benefits", className].filter(Boolean).join(" ")}
      aria-label={label}
      data-rail-benefits={source}
    >
      {benefits.map((b) => (
        <li className="rail-benefits__item" key={b.id}>
          {b.glyph && (
            <span className="rail-benefits__glyph" aria-hidden="true">
              {b.glyph}
            </span>
          )}
          <span className="rail-benefits__text">
            <span className="rail-benefits__title">{b.title}</span>
            <span className="rail-benefits__body">{b.body}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
