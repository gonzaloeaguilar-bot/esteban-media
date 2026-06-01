import type { Metadata } from "next";

import ServiceDetail from "@/app/services/_components/ServiceDetail";
import { getServiceDetail } from "@/app/services/_data/services";

const SLUG = "photo-editing";

export const metadata: Metadata = {
  title: getServiceDetail(SLUG)?.seo.title,
  description: getServiceDetail(SLUG)?.seo.description,
};

export default function PhotoEditingPage() {
  return <ServiceDetail slug={SLUG} />;
}
