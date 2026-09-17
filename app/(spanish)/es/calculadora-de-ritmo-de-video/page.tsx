import Link from "next/link";

import { DailyScriptPacingCalculator } from "@/components/daily-script-pacing-calculator";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Calculadora de Ritmo de Video y Guion Diario",
  description: "Una herramienta diaria para calcular duración hablada, cadencia de lectura y calibración de retención para creadores y editores de video.",
  path: "/es/calculadora-de-ritmo-de-video",
  locale: "es",
});

export default function DailyScriptPacingCalculatorEsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/calculadora-de-ritmo-de-video#webpage"),
    url: absoluteUrl("/es/calculadora-de-ritmo-de-video"),
    name: "Calculadora de Ritmo de Video y Guion Diario",
    description: "Calculadora de ritmo de video, duración hablada estimada y ejercicios de teleprónter para creadores.",
    isPartOf: { "@id": absoluteUrl("/#website") },
  };

  return (
    <main className="bg-[#f6f1ea] py-10 text-[#101214] sm:py-16">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container size="xl">
        <nav aria-label="Navegación de migas de pan" className="mb-7 text-sm text-[#5a6066]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/es" className="hover:text-[#9f3c27]">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[#252a2d]">
              Calculadora de ritmo de video
            </li>
          </ol>
        </nav>
        <DailyScriptPacingCalculator locale="es" />

        <div className="mt-12 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm text-[#252a2d]">
          <p>
            Calibra el ritmo de tu guion antes de grabar en estudio o locación. Si tu producción contempla rodaje en South Florida, revisa nuestras{" "}
            <Link
              href="/es/areas"
              className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
            >
              áreas de servicio de video
            </Link>{" "}
            para planificar el alcance por condado.
          </p>
        </div>
      </Container>
    </main>
  );
}
