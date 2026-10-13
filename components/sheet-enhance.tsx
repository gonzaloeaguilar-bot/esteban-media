"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for every `.em-sheet-details` on the site
 * (`price-sheet.tsx`, the editing lane's "See editing process" in
 * `home-project-path.tsx`).
 *
 * The mechanism stays a native `<details>` — content ships in the first
 * byte, closed, readable with JS off, and opens/closes via its own
 * `<summary>` with no JavaScript at all (CSS alone turns the open state into
 * a bottom sheet — see `.em-sheet-details[open]` in
 * `app/illustrated-commercial.css`). This script only adds what native
 * `<details>` cannot: a scrim click closes it, Escape closes it, and focus
 * moves into the panel on open and back to the trigger on close. None of
 * this is required for the sheet to work — it degrades to "tap the summary
 * bar again to close" without JS, which is still a real close.
 */
export function SheetEnhance() {
  useEffect(() => {
    function openDetails(): HTMLDetailsElement[] {
      return Array.from(document.querySelectorAll<HTMLDetailsElement>(".em-sheet-details[open]"));
    }

    function closeAll(returnFocus: boolean) {
      const openOnes = openDetails();
      for (const el of openOnes) {
        const trigger = el.querySelector<HTMLElement>("summary");
        el.removeAttribute("open");
        if (returnFocus) trigger?.focus();
      }
    }

    function onKeydown(event: KeyboardEvent) {
      if (event.key === "Escape" && openDetails().length > 0) closeAll(true);
    }

    function onClick(event: MouseEvent) {
      const open = openDetails();
      if (open.length === 0) return;
      const target = event.target as Node;
      const insideAny = open.some((el) => el.contains(target));
      if (!insideAny) closeAll(false);
    }

    function onToggle(event: Event) {
      const el = event.target as HTMLDetailsElement;
      if (!el.matches?.(".em-sheet-details")) return;
      if (el.open) {
        const panel = el.querySelector<HTMLElement>(":scope > :not(summary)");
        panel?.setAttribute("tabindex", "-1");
        panel?.focus();
      }
    }

    document.addEventListener("keydown", onKeydown);
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  return null;
}
