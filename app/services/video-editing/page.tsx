import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/services/service-detail";
import { getServiceBySlug } from "@/lib/services";

const service = getServiceBySlug("video-editing");

export const metadata: Metadata = {
  title: service?.title ?? "Video editing & color",
  description: service?.shortDescription,
};

export default function VideoEditingPage() {
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
