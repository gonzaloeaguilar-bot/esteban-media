import Link from "next/link";

import { DailyScriptPacingCalculator } from "@/components/daily-script-pacing-calculator";
import { PriorityLinks } from "@/components/priority-links";
import { PageUpdated } from "@/components/page-updated";
import { ScriptLengthAnswer } from "@/components/script-length-answer";
import { Container } from "@/components/ui/container";
import { pageLastModified } from "@/lib/page-lastmod";
import { absoluteUrl } from "@/lib/site";
import { toolApplicationNode } from "@/lib/tool-schema";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Calculadora de palabras para video de 30 y 60 segundos",
  description: "Calcula cuántas palabras caben en un video de 30 o 60 segundos, ajusta las palabras por minuto y revisa si tu guion entra en el tiempo disponible.",
  path: "/es/calculadora-de-ritmo-de-video",
  locale: "es",
});

const PATH = "/es/calculadora-de-ritmo-de-video";

export default function DailyScriptPacingCalculatorEsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": absoluteUrl("/es/calculadora-de-ritmo-de-video#webpage"),
    url: absoluteUrl("/es/calculadora-de-ritmo-de-video"),
    name: "Calculadora de palabras para video de 30 y 60 segundos",
    description: "Calculadora para estimar palabras, ritmo de lectura y duración hablada de un guion de video.",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: toolApplicationNode({
      path: "/es/calculadora-de-ritmo-de-video",
      name: "Calculadora de palabras para video de 30 y 60 segundos",
      description: "Calculadora para estimar palabras, ritmo de lectura y duración hablada de un guion de video.",
      locale: "es",
    }),
    ...(pageLastModified(PATH) ? { dateModified: pageLastModified(PATH) } : {}),
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
        <section aria-labelledby="calculadora-de-ritmo-intro" className="mb-8 max-w-3xl">
          <h2 id="calculadora-de-ritmo-intro" className="sr-only">
            Calcula las palabras y la duración de tu guion
          </h2>
          <p className="text-base leading-8 text-[#252a2d]">
            Para saber cuántas palabras caben en un video, pega tu guion y elige la duración objetivo: la calculadora compara el tiempo estimado con 15, 30, 45, 60 o 90 segundos. Si el guion se pasa, te indica cuántas palabras recortar; si queda corto, muestra el margen que tienes para una pausa o una toma de apoyo.
          </p>
        </section>
        <DailyScriptPacingCalculator locale="es" />
        <PageUpdated path={PATH} locale="es" />
      </Container>
      <ScriptLengthAnswer path={PATH} />
      <Container size="xl">
        <div className="mt-12 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 text-sm text-[#252a2d]">
          <p>
            Para proyectos que combinan edición remota con grabación en locación, consulta nuestras{" "}
            <Link
              href="/es/areas"
              className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]"
            >
              áreas de servicio de video en South Florida
            </Link>{" "}
            y planifica el ritmo y duración de tu contenido.
          </p>
        </div>
        <section className="mt-10 max-w-4xl" aria-labelledby="preguntas-sobre-ritmo">
          <h2 id="preguntas-sobre-ritmo" className="font-serif text-2xl text-[#101214] sm:text-3xl">
            Preguntas frecuentes sobre el ritmo de un guion
          </h2>
          <div className="mt-5 space-y-3">
            <details className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-5">
              <summary className="min-h-11 cursor-pointer font-medium text-[#9f3c27]">
                ¿Cómo calculo cuántas palabras caben en un video de 30 segundos?
              </summary>
              <p className="mt-3 leading-7 text-[#252a2d]">
                Multiplica tu ritmo de habla por 30 y divide entre 60. Por ejemplo, a 150 palabras por minuto caben aproximadamente 75 palabras; la calculadora hace esa cuenta con el ritmo que elijas y compara el resultado con tu texto real.
              </p>
            </details>
            <details className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-5">
              <summary className="min-h-11 cursor-pointer font-medium text-[#9f3c27]">
                ¿Qué hago si mi guion dura más que el video?
              </summary>
              <p className="mt-3 leading-7 text-[#252a2d]">
                Recorta ideas repetidas o deja una sola acción por frase antes de acelerar la lectura. Conserva una pausa donde necesites mostrar una toma de apoyo: el tiempo de esa toma también forma parte de la duración final.
              </p>
            </details>
            <details className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-5">
              <summary className="min-h-11 cursor-pointer font-medium text-[#9f3c27]">
                ¿Puedo usar esta estimación para un Reel o un Short?
              </summary>
              <p className="mt-3 leading-7 text-[#252a2d]">
                Sí. Elige la duración de tu formato, pega el texto que se va a decir y usa el resultado como una estimación antes de grabar. Después, léelo en voz alta una vez: las pausas, una demostración o una palabra difícil pueden cambiar el tiempo real.
              </p>
            </details>
          </div>
          <p className="mt-6 leading-7 text-[#252a2d]">
            Si ya tienes el texto y solo quieres medirlo, usa el{" "}
            <Link href="/es/temporizador-de-guiones-de-video" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">
              temporizador de guiones de video
            </Link>. Para presupuestar una edición corta después de definir el guion, consulta la{" "}
            <Link href="/es/calculadora-de-costo-de-edicion-de-reels" className="font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#7f2f20]">
              calculadora de costo de edición de Reels
            </Link>.
          </p>
        </section>
      </Container>
      <PriorityLinks path="/es/calculadora-de-ritmo-de-video" locale="es" />
    </main>
  );
}
