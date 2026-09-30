import Link from "next/link";

import { DailyScriptTimerEs } from "@/components/daily-script-timer-es";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Temporizador y Calculadora de Ritmo de Guiones",
  description: "Calcula la duración de habla en video corto, presupuestos de palabras para 15s/30s/60s y verificaciones diarias de ensayo.",
  path: "/es/temporizador-de-guiones-de-video",
  locale: "es",
});

export default function DailyScriptTimerEsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/temporizador-de-guiones-de-video#webpage"),
    url: absoluteUrl("/es/temporizador-de-guiones-de-video"),
    name: "Temporizador y Calculadora de Ritmo de Guiones",
    description: "Una calculadora interactiva de ritmo y lista de verificación diaria de ensayo para creadores de video vertical.",
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
              Temporizador de guiones de video
            </li>
          </ol>
        </nav>
        <DailyScriptTimerEs />

        <div className="mt-12 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm text-[#252a2d]">
          <p>
            Calcula tus tiempos y presupuestos de palabras antes de grabar. Para proyectos con rodaje local o postproducción, consulta nuestras{" "}
            <Link
              href="/es/areas"
              className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
            >
              áreas de servicio de video en South Florida
            </Link>
            .
          </p>
        </div>
      </Container>
    </main>
  );
}
