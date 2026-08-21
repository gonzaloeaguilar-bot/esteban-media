import { CaseStudiesIndexPage } from "@/components/case-studies-index";
import { buildCaseStudiesIndexMetadata } from "@/lib/case-studies";

export const metadata = buildCaseStudiesIndexMetadata("en");

export default function EnglishCaseStudiesPage() {
  return <CaseStudiesIndexPage locale="en" />;
}
