import Link from "next/link";

import { contentDateFor, isoDay, updatedLabel } from "@/lib/content-dates";
import { absoluteUrl } from "@/lib/site";

type Locale = "en" | "es";

/**
 * Three visible hub links and the "Updated" date, at the foot of the home page.
 *
 * Links only, no explainer text: the explainers live on the hubs (guides,
 * pricing, the Miami short-form editor page), which is where an answer engine
 * should land. They used to be reachable from the home only through the footer
 * or a collapsed panel (SEO/GEO audit 2026-10-14, item 8).
 *
 * The date is the newest git commit that touched what this page renders from,
 * the same source as the sitemap lastmod (lib/content-dates.ts). When it cannot
 * be dated (no git history) the line and the JSON-LD dateModified are both
 * omitted rather than invented.
 */
const HUBS: Record<Locale, { href: string; label: string }[]> = {
  en: [
    { href: "/guides", label: "Video guides" },
    { href: "/pricing", label: "Pricing" },
    { href: "/services/short-form-video-editor-miami", label: "Short-form video editor in Miami" },
  ],
  es: [
    { href: "/es/guias", label: "Guías de video" },
    { href: "/es/precios", label: "Precios" },
    { href: "/es/editor-de-video-corto-para-redes-miami", label: "Editor de video corto en Miami" },
  ],
};

export function HomeClosingLinks({ locale }: { locale: Locale }) {
  const path = locale === "es" ? "/es" : "/";
  const modified = contentDateFor(path);
  const webPage = modified
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        inLanguage: locale === "es" ? "es-US" : "en-US",
        dateModified: isoDay(modified),
      }
    : null;

  return (
    <>
      <nav className="em-close__hubs" aria-label={locale === "es" ? "Guías y precios" : "Guides and pricing"}>
        {HUBS[locale].map((hub) => (
          <Link key={hub.href} href={hub.href}>
            {hub.label}
          </Link>
        ))}
      </nav>
      {modified ? (
        <>
          <p className="em-close__updated">
            <time dateTime={isoDay(modified)}>{updatedLabel(modified, locale)}</time>
          </p>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
        </>
      ) : null}
    </>
  );
}
