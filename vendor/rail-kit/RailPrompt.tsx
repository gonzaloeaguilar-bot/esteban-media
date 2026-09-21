"use client";

import { useState, type ReactNode } from "react";

export type RailPromptProps = {
  /** The ask, as a sentence the visitor can answer yes or no to. */
  heading: string;
  /**
   * What happens after they say yes, or how to undo it. Gmail's version of
   * this line — "you can change your preference in Settings at any time" — is
   * doing the real work: it is the reason saying yes feels cheap.
   */
  body?: string;
  /** A mark before the text. Decorative; the heading carries the meaning. */
  glyph?: ReactNode;
  /** Both labels are required. See the note on baked English below. */
  accept: { label: string; onClick?: () => void; href?: string };
  decline: { label: string; onClick?: () => void };
  /**
   * Remembers a declined prompt in the visitor's own browser, so it is asked
   * once rather than on every page. Without it the component is honest for one
   * page view and nagging on the next.
   */
  dismissKey?: string;
  source: string;
  onSelect?: (info: { source: string; answer: "accept" | "decline" }) => void;
  className?: string;
};

function wasDeclined(key: string | undefined): boolean {
  if (!key) return false;
  try {
    return localStorage.getItem(`rail-prompt:${key}`) === "1";
  } catch {
    return false;
  }
}

/**
 * An opt-in ask, inline: a sentence, a reason, and two answers.
 *
 * THE TWO ANSWERS ARE THE SAME SIZE, and there is no prop to change that.
 * The standard shape of this component in the wild is a bright filled "Allow"
 * beside a grey 11px "Not now", which is not a choice being offered, it is a
 * choice being steered. Both here are real buttons at the same size, the same
 * weight and the same tap target; accept carries the accent and nothing else
 * separates them.
 *
 * It is also NOT a modal. An opt-in that blocks the page is a toll, and the
 * visitor pays it by clicking whatever makes it go away — which is how a
 * product ends up with permission it never really got.
 *
 * `dismissKey` is what stops this being a nag: a declined prompt stays
 * declined. Re-asking somebody who already said no, on the next page, is the
 * pattern this component exists to avoid, and it costs one string to prevent.
 *
 * Both labels are required, like every string in this kit. "Turn on" and "No
 * thanks" are not universal, and four of the personas this kit serves are
 * Spanish-first.
 */
export default function RailPrompt({
  heading,
  body,
  glyph,
  accept,
  decline,
  dismissKey,
  source,
  onSelect,
  className,
}: RailPromptProps) {
  const [answered, setAnswered] = useState(() => wasDeclined(dismissKey));

  if (answered) return null;

  const answer = (which: "accept" | "decline") => {
    setAnswered(true);
    if (which === "decline" && dismissKey) {
      try {
        localStorage.setItem(`rail-prompt:${dismissKey}`, "1");
      } catch {
        /* comes back next load, which is the safe direction to fail */
      }
    }
    onSelect?.({ source, answer: which });
    if (which === "accept") accept.onClick?.();
    else decline.onClick?.();
  };

  return (
    <section
      className={["rail-prompt", className].filter(Boolean).join(" ")}
      data-rail-prompt={source}
      aria-label={heading}
    >
      {glyph && (
        <span className="rail-prompt__glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
      <div className="rail-prompt__text">
        <p className="rail-prompt__heading">{heading}</p>
        {body && <p className="rail-prompt__body">{body}</p>}
        <div className="rail-prompt__actions">
          {accept.href ? (
            <a
              className="rail-prompt__action rail-prompt__action--accept"
              href={accept.href}
              onClick={() => answer("accept")}
            >
              {accept.label}
            </a>
          ) : (
            <button
              type="button"
              className="rail-prompt__action rail-prompt__action--accept"
              onClick={() => answer("accept")}
            >
              {accept.label}
            </button>
          )}
          <button
            type="button"
            className="rail-prompt__action rail-prompt__action--decline"
            onClick={() => answer("decline")}
          >
            {decline.label}
          </button>
        </div>
      </div>
    </section>
  );
}
