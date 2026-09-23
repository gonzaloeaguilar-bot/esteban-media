"use client";

import type { ReactNode } from "react";

export type RailFaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
  /** Open on first render. Use for the one question everybody actually asks. */
  defaultOpen?: boolean;
};

export type RailFaqProps = {
  items: RailFaqItem[];
  heading?: string;
  /**
   * Groups the questions so only one can be open at a time. Leave it out and
   * every answer opens independently, which is usually what a reader wants:
   * exclusive accordions close the thing somebody was still reading.
   */
  exclusiveName?: string;
  source: string;
  onSelect?: (info: { source: string; id: string; open: boolean }) => void;
  className?: string;
};

/**
 * Questions and answers, built on <details> and <summary>.
 *
 * Native, so it works before hydration, it is findable by the browser's own
 * in-page search (Chrome opens a closed <details> to reveal a match), and a
 * screen reader announces the expanded state without a single aria attribute.
 * A div-and-useState accordion gets none of that for free and most of it
 * wrong.
 *
 * The markup is also what search engines read as an FAQ, so the same DOM can
 * carry FAQPage structured data without a parallel copy of the content.
 */
export default function RailFaq({
  items,
  heading,
  exclusiveName,
  source,
  onSelect,
  className,
}: RailFaqProps) {
  if (items.length === 0) return null;

  return (
    <section
      className={["rail-faq", className].filter(Boolean).join(" ")}
      data-rail-faq={source}
    >
      {heading && <h2 className="rail-faq__heading">{heading}</h2>}
      {items.map((item) => (
        <details
          key={item.id}
          name={exclusiveName}
          open={item.defaultOpen}
          onToggle={(event) =>
            onSelect?.({
              source,
              id: item.id,
              open: (event.currentTarget as HTMLDetailsElement).open,
            })
          }
        >
          <summary>
            <h3 className="rail-faq__q">{item.question}</h3>
            {/* Un mas que gira hasta ser una cruz. Decorativo: el estado ya
                esta en el <details> para quien lea la pagina.

                EL GIRO VA EN EL HIJO, no en la caja. Un cuadrado girado 45
                grados ocupa su DIAGONAL, asi que girar el elemento que hace
                de item de la fila lo sacaba fuera del contenedor y estiraba el
                documento — medido en esteban-media: 398 px en un viewport de
                390. Con la caja quieta y el glifo girando dentro, el sitio que
                ocupa no cambia al abrirse. */}
            <span className="rail-faq__pm" aria-hidden="true">
              <span className="rail-faq__pm-glyph">+</span>
            </span>
          </summary>
          <div className="rail-faq__a">{item.answer}</div>
        </details>
      ))}
    </section>
  );
}
