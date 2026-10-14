import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { withPageDate } from "@/lib/page-lastmod";

/**
 * Visible "Home / Pricing / <page>" trail plus the matching WebPage +
 * BreadcrumbList JSON-LD for the pricing detail pages.
 *
 * Round 7 (2026-10-14): the 10 pricing detail pages (5 packages + real estate,
 * EN and ES) were the only money pages with no BreadcrumbList, no
 * dateModified and no visible Updated line (live crawl of 362 URLs). The
 * schema mirrors the trail the page prints, and the date comes from the
 * ledger (config/page-lastmod.json) through withPageDate, so it can never be
 * a date the sitemap does not also say.
 */
export function PricingTrail({ locale, path, name }: { locale: "en" | "es"; path: string; name: string }) {
  const es = locale === "es";
  const home = es ? "/es" : "/";
  const hub = es ? "/es/precios" : "/pricing";
  const homeLabel = es ? "Inicio" : "Home";
  const hubLabel = es ? "Precios" : "Pricing";
  const pageUrl = absoluteUrl(path);
  const ld = withPageDate(
    path,
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name,
          inLanguage: es ? "es-US" : "en-US",
          breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: homeLabel, item: absoluteUrl(home) },
            { "@type": "ListItem", position: 2, name: hubLabel, item: absoluteUrl(hub) },
            { "@type": "ListItem", position: 3, name, item: pageUrl },
          ],
        },
      ],
    },
    pageUrl,
  );
  return (
    <>
      <nav aria-label={es ? "Migas de pan" : "Breadcrumb"} className="em-crumbs text-sm text-[#5a6066]">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={home} className="underline hover:text-[#9f3c27]">{homeLabel}</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={hub} className="underline hover:text-[#9f3c27]">{hubLabel}</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
