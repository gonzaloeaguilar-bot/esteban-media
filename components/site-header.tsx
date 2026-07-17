import { SiteHeaderClient } from "@/components/site-header-client";
import { site } from "@/lib/site";

export function SiteHeader() {
  return <SiteHeaderClient shortName={site.shortName} />;
}
