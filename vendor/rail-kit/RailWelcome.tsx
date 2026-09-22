"use client";

import type { ReactNode } from "react";

export type RailWelcomeProps = {
  /** Small line at the top of the card: "CASTIBLANCO / CORRESPONDENCIA". */
  eyebrow?: string;
  /** The card's own words. Three short rows read better than one long one. */
  lines: string[];
  /** The last row, set apart. */
  emphasis?: string;
  /** Under the card, before the button. */
  note?: string;
  /** The button that reveals the form. */
  openLabel: string;
  /** Whether the form is showing. The parent owns the form and this state. */
  open: boolean;
  onOpen: () => void;
  /** The form. Rendered only once `open` — and not before. */
  children: ReactNode;
  source: string;
  className?: string;
};

/**
 * The card that arrives before the form — value first, then the ask.
 *
 * THIS IS E12 AS A COMPONENT. A sprawling inline form is the default outcome
 * of every contact section, and it asks a stranger for their name before it has
 * given them a reason. A card that says something, and a button that opens the
 * fields, costs one tap and changes what the ask feels like.
 *
 * THE FORM IS NOT RENDERED UNTIL IT IS OPENED, not merely hidden. A hidden
 * fieldset is still in the tab order in more browsers than you would like, and
 * a field a keyboard can reach but an eye cannot find is worse than no field.
 *
 * It owns no inputs of its own. The parent brings the form, because every brand
 * asks for different things and a component that guesses gets it wrong.
 */
export default function RailWelcome({
  eyebrow,
  lines,
  emphasis,
  note,
  openLabel,
  open,
  onOpen,
  children,
  source,
  className,
}: RailWelcomeProps) {
  return (
    <div className={["rail-welcome", className].filter(Boolean).join(" ")} data-rail-welcome={source}>
      {!open && (
        <>
          <div className="rail-welcome__card">
            {eyebrow && <span className="rail-welcome__eyebrow">{eyebrow}</span>}
            <strong>
              {lines.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
              {emphasis && <em>{emphasis}</em>}
            </strong>
          </div>
          {note && <p className="rail-welcome__note">{note}</p>}
          <button type="button" className="rail-welcome__open" onClick={onOpen}>
            {openLabel}
          </button>
        </>
      )}
      {open && children}
    </div>
  );
}
