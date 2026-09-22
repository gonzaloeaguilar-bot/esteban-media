"use client";

import { useEffect, useRef, useState } from "react";

export type RailCopyProps = {
  /** The string that goes on the clipboard. */
  value: string;
  /** What it is: "Bet ID", "VIN", "Referral code". */
  label: string;
  /** Hides the label visually. It still reaches a screen reader. */
  labelHidden?: boolean;
  /** The copy control's accessible name. Defaults to `Copy ${label}`. */
  copyLabel?: string;
  /** Shown after a successful copy. */
  copiedLabel?: string;
  source: string;
  onCopy?: (info: { source: string; ok: boolean }) => void;
  className?: string;
};

/**
 * A value you might need somewhere else, and one press to take it — a bet
 * reference, a VIN, a booking code.
 *
 * THREE THINGS THIS GETS RIGHT that a hand-rolled copy button usually does
 * not:
 *
 * 1. `navigator.clipboard` does not exist on an insecure origin, and there
 *    are still sites served over plain http. The fallback is a hidden
 *    textarea and `document.execCommand`, deprecated but working everywhere
 *    it needs to.
 * 2. Success is announced, not just drawn. A tick that only changes colour
 *    tells a screen-reader user nothing, so the confirmation goes through a
 *    live region.
 * 3. Failure is reported. A copy button that silently does nothing is worse
 *    than no copy button, because the visitor pastes whatever was on their
 *    clipboard before and does not find out until it matters.
 */
export default function RailCopy({
  value,
  label,
  labelHidden,
  copyLabel,
  copiedLabel = "Copied",
  source,
  onCopy,
  className,
}: RailCopyProps) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        ok = true;
      } else {
        // Insecure origins have no Clipboard API at all. Deprecated, and the
        // only thing that works there.
        const field = document.createElement("textarea");
        field.value = value;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        ok = document.execCommand("copy");
        document.body.removeChild(field);
      }
    } catch {
      ok = false;
    }
    setState(ok ? "done" : "failed");
    onCopy?.({ source, ok });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  }

  return (
    <div
      className={["rail-copy", className].filter(Boolean).join(" ")}
      data-rail-copy={source}
    >
      <span
        className={[
          "rail-copy__label",
          labelHidden ? "rail-copy__sr" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </span>
      <span className="rail-copy__value">{value}</span>
      <button
        type="button"
        className="rail-copy__button"
        data-rail-state={state}
        onClick={copy}
      >
        <span aria-hidden="true">{state === "done" ? "✓" : "⧉"}</span>
        <span className="rail-copy__sr">{copyLabel ?? `Copy ${label}`}</span>
      </button>
      {/* Drawn state is not announced state. */}
      <span className="rail-copy__status" role="status">
        {state === "done" && copiedLabel}
        {state === "failed" && `Could not copy. ${label}: ${value}`}
      </span>
    </div>
  );
}
