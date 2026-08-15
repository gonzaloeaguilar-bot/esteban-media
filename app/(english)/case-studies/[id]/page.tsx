import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyPage } from "@/components/case-study-page";
import {
  buildCaseStudyMetadata,
  CASE_STUDY_IDS,
  getCaseStudyById,
  type CaseStudyId,
} from "@/lib/case-studies";

type CaseStudyRouteProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: CaseStudyRouteProps): Promise<Metadata> {
  const { id } = await params;
  const caseStudy = getCaseStudyById("en", id as CaseStudyId);

  if (!caseStudy) {
    notFound();
  }

  return buildCaseStudyMetadata(caseStudy);
}

export default async function EnglishCaseStudyPage({
  params,
}: CaseStudyRouteProps) {
  const { id } = await params;
  const caseStudy = getCaseStudyById("en", id as CaseStudyId);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyPage caseStudy={caseStudy} />;
}
