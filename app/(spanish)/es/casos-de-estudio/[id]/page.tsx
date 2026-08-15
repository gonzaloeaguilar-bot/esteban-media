import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/case-study-page";
import {
  buildCaseStudyMetadata,
  CASE_STUDY_IDS,
  getCaseStudyById,
  type CaseStudyId,
} from "@/lib/case-studies";

type SpanishCaseStudyRouteProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: SpanishCaseStudyRouteProps): Promise<Metadata> {
  const { id } = await params;
  const caseStudy = getCaseStudyById("es", id as CaseStudyId);

  if (!caseStudy) {
    notFound();
  }

  return buildCaseStudyMetadata(caseStudy);
}

export default async function SpanishCaseStudyPage({
  params,
}: SpanishCaseStudyRouteProps) {
  const { id } = await params;
  const caseStudy = getCaseStudyById("es", id as CaseStudyId);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyPage caseStudy={caseStudy} />;
}
