import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ServiceGalleryPlaceholderProps = {
  slots: number;
  accentGradient: string;
  serviceTitle: string;
  className?: string;
};

/**
 * Placeholder sample-work gallery for a service detail page. Renders a 2x3
 * (or scaled) grid of gradient tiles with an icon — clearly a placeholder, not
 * an AI-generated photo (per CLAUDE.md "never AI-generate photos" rule). Real
 * media drops in when Esteban delivers reels.
 *
 * TODO: real asset from Esteban
 */
export function ServiceGalleryPlaceholder({
  slots,
  accentGradient,
  serviceTitle,
  className,
}: ServiceGalleryPlaceholderProps) {
  const tiles = Array.from({ length: slots });

  return (
    <div
      role="img"
      aria-label={`Sample work gallery placeholder for ${serviceTitle}. Real selects coming soon.`}
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4",
        className,
      )}
    >
      {tiles.map((_, idx) => (
        <div
          key={idx}
          className={cn(
            "group relative aspect-[4/5] overflow-hidden rounded-lg ring-1 ring-foreground/10 bg-gradient-to-br",
            accentGradient,
          )}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-foreground/40">
            <ImageIcon className="size-6" aria-hidden="true" />
            <span className="text-[10px] font-medium tracking-widest uppercase">
              Sample {idx + 1}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
