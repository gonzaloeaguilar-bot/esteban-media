"use client";

import type { ReactNode } from "react";

export type RailAskProps = {
  /** What the thing is called here: "Ask Yelp Assistant". */
  title: string;
  /** The field's own name, for a screen reader: "Ask about this place". */
  label: string;
  /** Inside the empty field: 'Ask, "What do reviews say?"'. */
  placeholder?: string;
  /**
   * The questions worth asking, seeded by the site. They are BUTTONS that
   * fill and send the field, not decoration — see below.
   */
  suggestions?: { id: string; label: string }[];
  /** The send button's name. */
  submitLabel: string;
  /** A mark beside the title. */
  glyph?: ReactNode;
  /**
   * The sentence that says what is answering. Required — see below.
   */
  disclosure: ReactNode;
  /** The field's form name, when it posts. */
  name?: string;
  source: string;
  onAsk?: (info: { source: string; question: string; seeded: boolean }) => void;
  className?: string;
};

/**
 * A question box with the questions already in it.
 *
 * `disclosure` IS REQUIRED AND CANNOT BE HIDDEN. A box that answers in prose
 * beside real reviews, real prices and real opening hours will be read as the
 * business speaking unless it says otherwise — and in several places the kit's
 * consumers trade, saying otherwise is the law rather than the courtesy. One
 * sentence: what is answering, and what it is reading.
 *
 * THE SUGGESTIONS ARE BUTTONS, not placeholder text that rotates. A rotating
 * hint cannot be pressed, cannot be read twice and cannot be reached by a
 * keyboard; these fill the field and send it, and they report `seeded: true`
 * so a site can tell its own questions from a person's — which is the only
 * way to learn what people actually wanted to ask.
 *
 * IT IS A REAL FORM with a real submit. An input that only responds to a
 * click handler loses the phone keyboard's "go" key, which is how most of
 * these are actually sent.
 */
export default function RailAsk({
  title,
  label,
  placeholder,
  suggestions,
  submitLabel,
  glyph,
  disclosure,
  name = "question",
  source,
  onAsk,
  className,
}: RailAskProps) {
  return (
    <section
      className={["rail-ask", className].filter(Boolean).join(" ")}
      data-rail-ask={source}
    >
      <h2 className="rail-ask__title">
        {glyph && (
          <span className="rail-ask__glyph" aria-hidden="true">
            {glyph}
          </span>
        )}
        {title}
      </h2>

      <form
        className="rail-ask__form"
        onSubmit={(event) => {
          event.preventDefault();
          const field = new FormData(event.currentTarget).get(name);
          const question = typeof field === "string" ? field.trim() : "";
          if (question) onAsk?.({ source, question, seeded: false });
        }}
      >
        <label className="rail-sr-only" htmlFor={`rail-ask-${source}`}>
          {label}
        </label>
        <input
          className="rail-ask__field"
          id={`rail-ask-${source}`}
          name={name}
          type="text"
          placeholder={placeholder}
          autoComplete="off"
        />
        <button type="submit" className="rail-ask__send">
          <span aria-hidden="true">→</span>
          <span className="rail-sr-only">{submitLabel}</span>
        </button>
      </form>

      {suggestions && suggestions.length > 0 && (
        <ul className="rail-ask__suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button
                type="button"
                className="rail-ask__suggestion"
                onClick={() =>
                  onAsk?.({
                    source,
                    question: suggestion.label,
                    seeded: true,
                  })
                }
              >
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="rail-ask__disclosure">{disclosure}</p>
    </section>
  );
}
