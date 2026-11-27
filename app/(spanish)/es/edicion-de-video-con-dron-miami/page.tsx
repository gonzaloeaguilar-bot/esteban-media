import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";
import { CaseStudyRail } from "@/components/case-study-rail";

const slug = "edicion-de-video-con-dron-miami";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return (
    <SpanishNichePage
      slug={slug}
      showcase={<CaseStudyRail ids={["banacol"]} locale="es" source="drone_service_case_es" />}
    />
  );
}
