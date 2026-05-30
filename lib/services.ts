// Single source of truth for the service catalog.
// Re-exports the services list from the homepage content module so the
// homepage strip, services overview, and individual service pages all
// render from one list. Do not duplicate this data anywhere else.

import { homeContent, type ServiceEntry, type ServiceSlug } from "@/components/home/content";

export type { ServiceEntry, ServiceSlug };

export const services: ServiceEntry[] = homeContent.services.items;

export const serviceSlugs: ServiceSlug[] = services.map((s) => s.slug);

export function getService(slug: string): ServiceEntry | undefined {
  return services.find((s) => s.slug === slug);
}
