import { SiteFooterClient } from "@/components/site-footer-client";
import { spanishSite } from "@/lib/spanish-site";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <SiteFooterClient
      description={site.description}
      spanishDescription={spanishSite.description}
      email={site.email}
      phoneDisplay={site.phone.display}
      phoneHref={site.phone.href}
      instagram={site.instagram}
      youtube={site.youtube}
      domain={site.domain}
      location={site.location}
      name={site.name}
    />
  );
}
