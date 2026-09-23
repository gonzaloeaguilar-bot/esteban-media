"use client";

import { useRef, type ReactNode } from "react";

export type RailOptionItem = {
  id: string;
  /** The top line — the terms. "O 4.5", "12 months", "Standard". */
  line: ReactNode;
  /** The bottom line — the price, in the accent. "+260", "$450/mo". */
  price: ReactNode;
  /** A line above both, usually a column heading in a grid. */
  eyebrow?: string;
  disabled?: boolean;
};

export type RailOptionsProps = {
  options: RailOptionItem[];
  /** The id currently chosen, if any. */
  selectedId?: string;
  /** What is being chosen, for a screen reader: "Spread", "Plan length". */
  label: string;
  /** Columns on a wide screen. Defaults to however many options there are. */
  columns?: number;
  source: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * A row of two-line choices: terms on top, price underneath.
 *
 * This is the sportsbook's odds button, and it is also the plan picker, the
 * finance-term picker and the delivery-slot picker. The shape is the same
 * every time — a thing you are agreeing to, and what it costs — which is why
 * it is one component and not four.
 *
 * Real radio semantics: `role="radiogroup"` with `aria-checked` buttons. These
 * are mutually exclusive and only one can be live at a time, and a screen
 * reader should say "2 of 3" rather than reading three unrelated buttons.
 *
 * Y EL ROL TRAE SUS TECLAS, que durante un tiempo no estuvieron. El grupo
 * entra UNA vez con el tabulador —tabindex rotatorio: 0 en el elegido, -1 en
 * el resto— y dentro se recorre con las flechas, que ademas eligen al pasar,
 * como un radio de verdad. Sin eso, `role="radio"` le anuncia a quien no ve la
 * pantalla una mecanica que el componente no tiene: oye "2 de 3", pulsa la
 * flecha y no pasa nada. Medido antes del arreglo: `tabindex=[,,]` y el foco
 * quieto tras ArrowDown y ArrowRight.
 *
 * Las deshabilitadas se saltan, no se aterriza en ellas para rebotar.
 *
 * ON THE PRICE being its own line rather than appended to the terms: at a
 * glance somebody is scanning ONE of the two — either what the bet is, or
 * what it pays. Two registers in one line makes both slower to find.
 */
export default function RailOptions({
  options,
  selectedId,
  label,
  columns,
  source,
  onSelect,
  className,
}: RailOptionsProps) {
  const botones = useRef<(HTMLButtonElement | null)[]>([]);

  if (options.length === 0) return null;

  const habilitadas = options
    .map((o, i) => (o.disabled ? -1 : i))
    .filter((i) => i >= 0);
  const elegido = options.findIndex((o) => o.id === selectedId && !o.disabled);
  // A quien le toca el tabindex 0: el elegido, y si no hay, la primera que se
  // pueda pulsar. Un grupo entero en -1 es un grupo al que no se llega.
  const entrada = elegido >= 0 ? elegido : habilitadas[0] ?? -1;

  const mover = (desde: number, paso: number) => {
    if (habilitadas.length === 0) return;
    const donde = habilitadas.indexOf(desde);
    const siguiente = habilitadas[(donde + paso + habilitadas.length) % habilitadas.length];
    botones.current[siguiente]?.focus();
    onSelect?.({ source, id: options[siguiente].id, index: siguiente });
  };

  const teclas = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      mover(index, 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      mover(index, -1);
    } else if (e.key === "Home") {
      e.preventDefault();
      mover(habilitadas[habilitadas.length - 1] ?? index, 1);
    } else if (e.key === "End") {
      e.preventDefault();
      mover(habilitadas[0] ?? index, -1);
    }
  };

  return (
    <div
      className={["rail-options", className].filter(Boolean).join(" ")}
      data-rail-options={source}
      role="radiogroup"
      aria-label={label}
      style={{
        ["--_cols" as string]: String(columns ?? options.length),
      }}
    >
      {options.map((option, index) => (
        <button
          type="button"
          className="rail-options__option"
          key={option.id}
          role="radio"
          ref={(n) => {
            botones.current[index] = n;
          }}
          aria-checked={option.id === selectedId}
          tabIndex={index === entrada ? 0 : -1}
          disabled={option.disabled}
          onKeyDown={(e) => teclas(e, index)}
          onClick={() => onSelect?.({ source, id: option.id, index })}
        >
          {option.eyebrow && (
            <span className="rail-options__eyebrow">{option.eyebrow}</span>
          )}
          <span className="rail-options__line">{option.line}</span>
          <span className="rail-options__price">{option.price}</span>
        </button>
      ))}
    </div>
  );
}
