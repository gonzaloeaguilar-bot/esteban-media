import type { Metadata } from "next";

import ServiceDetail from "@/app/services/_components/ServiceDetail";
import { getServiceDetail } from "@/app/services/_data/services";

const SLUG = "videography";

export const metadata: Metadata = {
  title: getServiceDetail(SLUG)?.seo.title,
  description: getServiceDetail(SLUG)?.seo.description,
};

export default function VideographyPage() {
  return <ServiceDetail slug={SLUG} />;
}
