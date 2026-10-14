import { updatedLabel } from "@/lib/content-dates";
import { pageLastModified } from "@/lib/page-lastmod";

/**
 * The visible "Updated <date>" line. Same date as the sitemap <lastmod> and the
 * JSON-LD dateModified (config/page-lastmod.json); renders nothing for a path
 * the ledger does not know, so no date is ever invented.
 */
export function PageUpdated({
  path,
  locale,
  className = "mt-6 text-xs text-[#5a6066]",
}: {
  path: string;
  locale: "en" | "es";
  className?: string;
}) {
  const date = pageLastModified(path);
  if (!date) return null;
  return (
    <p className={className} data-page-updated={date}>
      <time dateTime={date}>{updatedLabel(date, locale)}</time>
    </p>
  );
}
