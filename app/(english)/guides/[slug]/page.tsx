import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuideDetailPage } from "@/components/guide-pages";
import {
  buildGuideMetadata,
  getGuideBySlug,
  getGuideStaticParams,
} from "@/lib/guides";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getGuideStaticParams("en");
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug("en", slug);

  if (!guide) {
    notFound();
  }

  return buildGuideMetadata(guide);
}

export default async function EnglishGuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug("en", slug);

  if (!guide) {
    notFound();
  }

  return <GuideDetailPage guide={guide} />;
}
