"use client";

import { useId, useState, type ReactNode } from "react";

export type RailSearchProps = {
  /** What is being searched, for a screen reader: "Search inventory". */
  label: string;
  placeholder?: string;
  /** Uncontrolled starting value. */
  defaultValue?: string;
  /** Where a real form posts. With one, this works without JavaScript. */
  action?: string;
  /** The query parameter name for that form. */
  name?: string;
  /** Draws a visible submit button rather than relying on the Enter key. */
  submitLabel?: string;
  /** An extra control inside the field — a camera, a microphone. */
  trailing?: { label: string; glyph: ReactNode; onClick: () => void };
  onSubmit?: (query: string) => void;
  source: string;
  className?: string;
};

/**
 * A search field.
 *
 * A REAL <form> with a real <input type="search">, so Enter submits, the
 * browser offers previous queries, and a phone keyboard shows a Search key
 * instead of a return key. With `action` it also works before hydration and
 * with JavaScript off, which for a search box on a shop is the difference
 * between a slow page and a dead one.
 *
 * The label is always present and visually hidden by default, because a
 * placeholder is not a label: it disappears the moment somebody types, and it
 * is not read as the field's name.
 */
export default function RailSearch({
  label,
  placeholder,
  defaultValue,
  action,
  name = "q",
  submitLabel,
  trailing,
  onSubmit,
  source,
  className,
}: RailSearchProps) {
  const id = useId();
  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <form
      className={["rail-search", className].filter(Boolean).join(" ")}
      data-rail-search={source}
      action={action}
      role="search"
      onSubmit={(event) => {
        if (onSubmit) {
          event.preventDefault();
          onSubmit(value);
        }
      }}
    >
      <label className="rail-search__sr" htmlFor={id}>
        {label}
      </label>
      <span className="rail-search__glyph" aria-hidden="true">
        ⌕
      </span>
      <input
        id={id}
        className="rail-search__input"
        type="search"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoComplete="off"
      />
      {trailing && (
        <button
          type="button"
          className="rail-search__trailing"
          onClick={trailing.onClick}
        >
          <span aria-hidden="true">{trailing.glyph}</span>
          <span className="rail-search__sr">{trailing.label}</span>
        </button>
      )}
      {submitLabel && (
        <button type="submit" className="rail-search__submit">
          {submitLabel}
        </button>
      )}
    </form>
  );
}
