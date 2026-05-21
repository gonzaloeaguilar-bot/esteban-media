import Image from "next/image";
import { useTranslations } from "next-intl";

/**
 * Headshot placeholder block for the About page.
 *
 * Renders a 4:5 portrait-ratio slot using a neutral SVG placeholder shipped
 * under `/public/about-headshot-placeholder.svg`. Marked with a clear TODO
 * so the real asset swap is grep-able when Esteban delivers his headshot.
 *
 * The image is set `priority` because the headshot sits within the first
 * viewport of the About page on most breakpoints (above-the-fold LCP
 * candidate). Doing this avoids the Lighthouse "Largest Contentful Paint
 * image was lazily loaded" finding that's easy to regress on detail pages.
 *
 * Why this is its own component:
 *  - Keeps `app/[locale]/about/page.tsx` readable.
 *  - The placeholder treatment (ratio box, grayscale gradient ring, TODO
 *    marker) will be reused if/when other people get team-page slots.
 */
export function HeadshotPlaceholder() {
  const t = useTranslations("About.headshot");

  return (
    // TODO: real headshot from Esteban — replace the next/image src below
    // with the delivered portrait (recommended: 4:5 JPG/WebP, ~1600×2000px).
    <figure className="relative w-full">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 ring-1 ring-border/60 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
        <Image
          src="/about-headshot-placeholder.svg"
          alt={t("alt")}
          fill
          priority
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 60vw, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {t("caption")}
      </figcaption>
    </figure>
  );
}
