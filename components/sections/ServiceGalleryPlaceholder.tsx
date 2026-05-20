import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ServiceAccent } from "@/lib/services";

/**
 * Neutral gradient gallery tiles, no photographs. Renders `count` aspect-ratio
 * boxes with a soft gradient, a centered service icon, and a small label —
 * enough visual rhythm to suggest "portfolio coming" without faking real work.
 *
 * Per CLAUDE.md asset rules: never AI-generate photos. When Esteban delivers
 * real reels/stills, swap these tiles for `next/image` thumbs (or a Mux
 * video poster grid) and drop this component.
 *
 * TODO: real asset from Esteban — replace placeholder tiles with portfolio
 * thumbnails once reference work is delivered. Keep the same grid shape so
 * the surrounding section copy doesn't need to change.
 */
type ServiceGalleryPlaceholderProps = {
  /** Number of tiles to render. Maps to `Service.gallerySlots`. */
  count: number;
  /** Lucide icon for the service (matches the hero icon for visual continuity). */
  Icon: LucideIcon;
  /** Per-service gradient + ring classes from `Service.accent`. */
  accent: ServiceAccent;
  /**
   * Short per-tile label, e.g. "Aerial sample". Localized — pass the already
   * translated string from the parent (server component reads next-intl).
   */
  tileLabel: string;
  /** Accessible label for screen readers; localized. */
  ariaLabel: string;
};

export function ServiceGalleryPlaceholder({
  count,
  Icon,
  accent,
  tileLabel,
  ariaLabel,
}: ServiceGalleryPlaceholderProps) {
  // Defensive: a non-positive count would render nothing and silently swallow
  // the data error; clamp to at least 1 so the page noticeably looks "thin"
  // rather than vanishing.
  const safeCount = Math.max(1, count);

  return (
    // `role="list"` is intentionally redundant on `<ul>` — Safari strips the
    // implicit list role from any UL with `list-style: none`, so without this
    // VoiceOver loses the "list of N items" announcement. Keep it.
    <ul
      role="list"
      aria-label={ariaLabel}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
    >
      {Array.from({ length: safeCount }).map((_, idx) => (
        // Tiles are purely presentational placeholders with no stable identity
        // until real assets land; index keying is appropriate here.
        <li key={idx} className="list-none">
          {/* TODO: real asset from Esteban — swap this gradient placeholder
              for a next/image thumbnail (or video poster) once portfolio work
              is delivered. */}
          <div
            className={cn(
              "group relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br ring-1 ring-inset transition",
              accent.gradient,
              accent.ring,
            )}
          >
            <div className="flex flex-col items-center gap-2 text-foreground/40">
              <Icon className="size-7 sm:size-8" aria-hidden />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] sm:text-xs">
                {tileLabel} · {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
