import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/services/service-detail";
import { getServiceBySlug } from "@/lib/services";

const service = getServiceBySlug("photography");

export const metadata: Metadata = {
  title: service?.title ?? "Photography",
  description: service?.shortDescription,
};

export default function PhotographyPage() {
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
