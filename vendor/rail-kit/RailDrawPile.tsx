"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RailDrawCard = {
  id: string;
  content: ReactNode;
};

export type RailDrawPileProps = {
  cards: RailDrawCard[];
  /** Que es este mazo, para un lector de pantalla. */
  label: string;
  /** Lo que dice el boton de repartir. Obligatorio: "Deal" no es universal. */
  dealLabel: string;
  /**
   * Como se cuenta por donde vas. Recibe cuantas quedan y cuantas habia, asi
   * que quien llama decide el orden de las palabras y el plural.
   */
  countLabel?: (left: number, total: number) => string;
  /** Lo que se ve cuando se acaban. */
  emptyLabel?: string;
  /** Cuantas se dibujan apiladas detras de la de arriba. */
  depth?: number;
  onDeal?: (info: { source: string; id: string; left: number }) => void;
  source: string;
  className?: string;
};

/**
 * El mazo que reparte: una pila de la que sale una carta cada vez.
 *
 * Su CSS llego al kit en el #37 sin componente que lo pintara, junto al del
 * sobre. Esto lo adopta en vez de escribir un segundo mazo al lado.
 *
 * **Solo la de arriba se lee y se toca.** Las de debajo van `inert` y
 * `aria-hidden`: si un lector de pantalla las anunciara, contaria la sorpresa
 * antes de tiempo — que es exactamente lo contrario de para lo que existe un
 * mazo. Y `aria-hidden` por si solo no basta, porque no saca del orden de foco.
 *
 * La cuenta de las que quedan se ANUNCIA. Sin ella, quien no ve la pila no
 * tiene forma de saber si queda una carta o diez.
 */
export default function RailDrawPile({
  cards,
  label,
  dealLabel,
  countLabel,
  emptyLabel,
  depth = 3,
  onDeal,
  source,
  className,
}: RailDrawPileProps) {
  const [dealt, setDealt] = useState<string[]>([]);
  const slots = useRef<Record<string, HTMLDivElement | null>>({});

  const left = cards.filter((c) => !dealt.includes(c.id));
  const top = left[0];

  // `inert` por referencia: React no lo pinta de forma fiable como prop, y aqui
  // no es cosmetico — sin el, tabulas y el foco cae en una carta que todavia no
  // te ha tocado.
  useEffect(() => {
    for (const card of cards) {
      const el = slots.current[card.id];
      if (!el) continue;
      if (top && card.id === top.id) el.removeAttribute("inert");
      else el.setAttribute("inert", "");
    }
  }, [cards, top]);

  const deal = () => {
    if (!top) return;
    setDealt((d) => [...d, top.id]);
    onDeal?.({ source, id: top.id, left: left.length - 1 });
  };

  return (
    <div
      className={["rail-drawpile", className].filter(Boolean).join(" ")}
      data-rail-drawpile={source}
    >
      <div className="rail-drawpile__stack" role="group" aria-label={label}>
        {cards.map((card) => {
          const gone = dealt.includes(card.id);
          const index = left.findIndex((c) => c.id === card.id);
          const hidden = gone || index > depth || index < 0;
          return (
            <div
              className={["rail-drawpile__card", gone && "rail-drawpile__card--gone"]
                .filter(Boolean)
                .join(" ")}
              key={card.id}
              ref={(el) => {
                slots.current[card.id] = el;
              }}
              style={{ ["--d" as string]: Math.max(index, 0) }}
              aria-hidden={top && card.id === top.id ? undefined : true}
            >
              {!hidden || gone ? card.content : null}
            </div>
          );
        })}
      </div>

      <p className="rail-drawpile__count" role="status" aria-live="polite">
        {left.length === 0
          ? emptyLabel
          : countLabel?.(left.length, cards.length)}
      </p>

      {left.length > 0 && (
        <button
          type="button"
          className="rail-card__cta rail-card__cta--primary"
          onClick={deal}
        >
          <span className="rail-card__cta-label">{dealLabel}</span>
        </button>
      )}
    </div>
  );
}
