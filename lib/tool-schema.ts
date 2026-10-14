import { entityIds } from "@/lib/entity-schema";
import { absoluteUrl } from "@/lib/site";

// The free daily tools are browser apps, not the business. Their page node is a
// WebPage whose mainEntity is a WebApplication, so the page is not read as one
// more LocalBusiness listing (row 9 of the 2026-10-14 overnight log: brand
// queries were landing on /daily-publish-prompt). The site-wide entity graph
// (Person, LocalBusiness, WebSite) still renders once from SiteChrome; the tool
// only references the business as its provider.
export function toolApplicationNode({
  path,
  name,
  description,
  locale,
}: {
  path: string;
  name: string;
  description: string;
  locale: "en" | "es";
}) {
  return {
    "@type": "WebApplication",
    "@id": absoluteUrl(`${path}#app`),
    name,
    description,
    url: absoluteUrl(path),
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (runs in the web browser)",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    inLanguage: locale === "es" ? "es-US" : "en-US",
    provider: { "@id": entityIds.business },
  };
}
