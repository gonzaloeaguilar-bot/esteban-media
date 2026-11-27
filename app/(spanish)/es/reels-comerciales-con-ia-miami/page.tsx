import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "@/components/spanish-niche-page";
import { CaseStudyRail } from "@/components/case-study-rail";

const slug = "reels-comerciales-con-ia-miami";

export const metadata = buildSpanishNicheMetadata(slug);

export default function Page() {
  return (
    <SpanishNichePage
      slug={slug}
      showcase={
        <CaseStudyRail
          ids={["dupont-ai-commercial"]}
          locale="es"
          source="ai_commercial_service_case_es"
          heading="¿Qué logró un comercial con IA para una inmobiliaria del sur de Florida?"
        />
      }
    />
  );
}
