import type { CSSProperties, ElementType } from "react";

export type RailInscribeProps = {
  /** The line. Split on spaces — it is a headline, not a document. */
  text: string;
  /** h1, h2, p. Defaults to a span so it never invents a heading level. */
  as?: ElementType;
  /** Seconds between one word landing and the next. */
  stagger?: number;
  source: string;
  className?: string;
};

/**
 * A line that arrives a word at a time, each one settling from faint to full.
 *
 * THE WHOLE STRING IS ALWAYS IN THE DOM. Words are wrapped and animated, never
 * appended by a timer. A headline typed in by JavaScript is a headline that is
 * empty when a crawler reads it, empty when the script fails, and empty for
 * the entire first paint — and the one element on the page that must never be
 * empty is the one that says what the page is. Here the text ships whole and
 * CSS fades it; with motion off, the animation never runs and the line is just
 * a line (E08).
 *
 * IT READS AS ONE LINE, NOT AS WORDS. The spaces are real spaces outside the
 * spans, so selecting the headline copies "How a tower finds its height" and
 * not "Howatowerfindsits height" — the defect every word-splitter ships with,
 * and the one nobody notices until a visitor pastes the line somewhere.
 *
 * THE STAGGER IS BUDGETED, NOT PER-WORD. Twelve words at 0.08s is a second of
 * a visitor waiting to find out what the page is about. The delay is capped at
 * 0.9s total no matter how many words there are, so a long headline finishes
 * with the short one instead of crawling.
 *
 * A SPLIT LINE IS READ AS SPLIT WORDS. `display: inline-block` on each piece
 * makes several screen readers announce them one at a time, so the headline
 * arrives as seven separate utterances instead of a sentence. The whole
 * string is therefore carried once in a visually-hidden span and the animated
 * pieces are hidden from the accessibility tree: what is seen and what is
 * heard are the same line, and only one of them is in pieces.
 *
 * NOT A TYPEWRITER. Nothing is revealed character by character and no cursor
 * blinks. A typewriter withholds the sentence to make you watch it being
 * typed; this confirms a line that is already there.
 */
export default function RailInscribe({
  text,
  as: Tag = "span",
  stagger = 0.08,
  source,
  className,
}: RailInscribeProps) {
  const words = text.split(/(\s+)/);
  // El retardo total esta acotado: en un titular largo el ultimo vocablo
  // entraria pasado el segundo, que es esperar a saber de que va la pagina.
  const count = words.filter((w) => w.trim()).length;
  const step = count > 1 ? Math.min(stagger, 0.9 / (count - 1)) : 0;

  // El indice de cada vocablo se calcula ANTES de pintar. Llevarlo en una
  // variable que el map incrementa es reasignar despues del render: bajo
  // Strict Mode el render puede descartarse y el retardo sale de otro sitio.
  let seen = 0;
  const order = words.map((word) => (word.trim() ? seen++ : -1));

  return (
    <Tag
      className={["rail-inscribe", className].filter(Boolean).join(" ")}
      data-rail-inscribe={source}
    >
      <span className="rail-inscribe__sr">{text}</span>
      {words.map((word, i) =>
        order[i] < 0 ? (
          <span aria-hidden="true" key={`s-${i}`}>
            {word}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="rail-inscribe__word"
            key={`${i}-${word}`}
            style={{ "--_delay": `${(order[i] * step).toFixed(3)}s` } as CSSProperties}
          >
            {word}
          </span>
        ),
      )}
    </Tag>
  );
}
