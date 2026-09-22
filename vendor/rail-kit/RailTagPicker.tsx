"use client";

import type { ReactNode } from "react";

export type RailTagGroup = {
  id: string;
  /** What this group of tags is: "Plant Based", "Lifestyle", "I'm avoiding". */
  title: string;
  /** A short line under the title, when the group needs explaining. */
  note?: string;
  /** A mark before the title. Decorative: the title already names the group. */
  glyph?: ReactNode;
  /**
   * Marks a group whose tags describe something to AVOID rather than something
   * to prefer. It changes nothing about how it works and everything about how
   * it reads, so it is explicit rather than guessed from the title.
   */
  avoid?: boolean;
  tags: { id: string; label: string }[];
};

export type RailTagPickerProps = {
  groups: RailTagGroup[];
  /** The ids currently chosen, across every group. The caller owns the state. */
  selected: string[];
  /** Accessible name for the whole picker. */
  label: string;
  onToggle: (info: { source: string; id: string; selected: boolean }) => void;
  source: string;
  className?: string;
};

/**
 * Tags a person picks about themselves: diets, interests, things they avoid.
 *
 * Every tag is a real checkbox, not a styled `<div>` with a click handler. That
 * is what makes the set announce as "3 of 7 selected" instead of as seven
 * unrelated buttons, and it is what makes the space bar work.
 *
 * **A group can be about avoiding something, and that changes the stakes.** A
 * tag that means "I avoid gluten" is one step from being read as "this is safe
 * for me", which is a claim a UI component has no business making. `avoid`
 * marks those groups so a brand can word them carefully and put its own
 * statement next to them — the picker records a preference, it does not certify
 * anything.
 */
export default function RailTagPicker({
  groups,
  selected,
  label,
  onToggle,
  source,
  className,
}: RailTagPickerProps) {
  const chosen = new Set(selected);

  return (
    <div
      className={["rail-tagpicker", className].filter(Boolean).join(" ")}
      data-rail-tagpicker={source}
      aria-label={label}
      role="group"
    >
      {groups.map((group) => (
        <fieldset
          className={["rail-tagpicker__group", group.avoid && "rail-tagpicker__group--avoid"]
            .filter(Boolean)
            .join(" ")}
          key={group.id}
        >
          <legend className="rail-tagpicker__legend">
            {group.glyph && (
              <span className="rail-tagpicker__glyph" aria-hidden="true">
                {group.glyph}
              </span>
            )}
            {group.title}
          </legend>
          {group.note && <p className="rail-tagpicker__note">{group.note}</p>}
          <div className="rail-tagpicker__tags">
            {group.tags.map((tag) => {
              const on = chosen.has(tag.id);
              return (
                <label
                  className="rail-tagpicker__tag"
                  key={tag.id}
                  data-selected={on ? "" : undefined}
                >
                  <input
                    className="rail-sr-only"
                    type="checkbox"
                    checked={on}
                    onChange={() => onToggle({ source, id: tag.id, selected: !on })}
                  />
                  <span className="rail-tagpicker__label">{tag.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
