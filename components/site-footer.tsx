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
      tiktok={site.tiktok}
      youtube={site.youtube}
      directories={[
        { label: "Behance", href: site.behance },
        { label: "Vimeo", href: site.vimeo },
        { label: "Yelp", href: site.yelp },
        { label: "Nextdoor", href: site.nextdoor },
      ]}
      domain={site.domain}
      location={site.location}
      name={site.name}
    />
  );
}
