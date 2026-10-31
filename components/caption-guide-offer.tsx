import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { site } from "@/lib/site";
import { whatsappHref } from "@/lib/packages";

type Locale = "en" | "es";

/**
 * Done-for-you offer block for the caption-styles guides (EN + ES pair).
 * The guide teaches the styles for free; this block is the paid next step for
 * readers who would rather hand the work over. It carries no price figure on
 * purpose: the subtitling starting price has two live sources (the Stripe
 * product and the site FAQ via Arranque) and stays out of copy until the
 * owner rules on one figure, the same call the wave-2 "En corto" answer made.
 */
export function CaptionGuideOffer({ locale }: { locale: Locale }) {
  const isEs = locale === "es";
  const serviceHref = isEs
    ? "/es/servicio-de-subtitulado-bilingue-de-video"
    : "/services/bilingual-video-subtitling-service";

  return (
    <div
      data-section="guide_done_for_you_offer"
      className="rounded-2xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8"
    >
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
        {isEs ? "Si prefieres delegarlo" : "If you would rather delegate it"}
      </p>
      <h3 className="mt-3 font-serif text-3xl leading-tight">
        {isEs ? "¿Prefieres que lo haga por ti?" : "Rather have it done for you?"}
      </h3>
      <p className="mt-3 max-w-2xl leading-7 text-[#3f4548]">
        {isEs
          ? "Puedo subtitular tus videos cortos en español e inglés: subtítulos revisados línea por línea, al ritmo de la voz, en archivo SRT o quemados en el video. Tú grabas; yo entrego el video listo para publicar."
          : "I can subtitle your short videos in Spanish and English: captions reviewed line by line, timed to the voice, as an SRT file or burned into the video. You record; I deliver the video ready to publish."}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={serviceHref}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-semibold text-white hover:bg-[var(--em-accent-ink-hover)]"
        >
          {isEs ? "Ver el servicio de subtitulado bilingüe" : "See bilingual subtitling"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <a
          href={whatsappHref(
            site.phone.e164,
            isEs
              ? "Hola Esteban, leí tu guía de estilos de subtítulos y quiero que subtitules mis videos. Te cuento qué necesito."
              : "Hi Esteban, I read your caption styles guide and I want you to subtitle my videos. Here is what I need.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1faa55] px-5 text-sm font-semibold text-white hover:bg-[#178a44]"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          {isEs ? "Pedirlo por WhatsApp" : "Ask on WhatsApp"}
        </a>
      </div>
    </div>
  );
}
