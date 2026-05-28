import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/services/service-detail";
import { getServiceBySlug } from "@/lib/services";

const service = getServiceBySlug("aerial");

export const metadata: Metadata = {
  title: service?.title ?? "Aerial cinematography",
  description: service?.shortDescription,
};

export default function AerialPage() {
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
