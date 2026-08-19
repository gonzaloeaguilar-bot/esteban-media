import { CaseStudiesIndexPage } from "@/components/case-studies-index";
import { buildCaseStudiesIndexMetadata } from "@/lib/case-studies";

export const metadata = buildCaseStudiesIndexMetadata("es");

export default function SpanishCaseStudiesPage() {
  return <CaseStudiesIndexPage locale="es" />;
}
