import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GrowthSystemPage } from "@/components/growth-system-page";
import { getGrowthSystem, growthSystems } from "@/lib/growth-systems";
import { buildPageMetadata } from "@/lib/site-metadata";

export function generateStaticParams() {
  return growthSystems.map((system) => ({ growthSystem: system.slug }));
}

type GrowthSystemRouteProps = { params: Promise<{ growthSystem: string }> };

export const dynamicParams = false;

export async function generateMetadata({ params }: GrowthSystemRouteProps): Promise<Metadata> {
  const { growthSystem } = await params;
  const system = getGrowthSystem(growthSystem, "en");
  if (!system) return {};
  return buildPageMetadata({
    title: system.metadataTitle,
    description: system.description,
    path: `/services/${system.slug}`,
    locale: "en",
    languages: {
      "en-US": `/services/${system.slug}`,
      "es-US": `/es/${system.spanishSlug}`,
      "x-default": `/services/${system.slug}`,
    },
  });
}

export default async function GrowthSystemRoute({ params }: GrowthSystemRouteProps) {
  const { growthSystem } = await params;
  const system = getGrowthSystem(growthSystem, "en");
  if (!system) notFound();
  return <GrowthSystemPage system={system} locale="en" />;
}
