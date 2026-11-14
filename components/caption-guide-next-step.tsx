import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Choose your next step",
    heading: "Are you styling the captions yourself or handing them off?",
    intro: "Both routes start with the same rule: words need to stay readable without covering the video or the app interface.",
    selfTitle: "I am styling them myself",
    selfDetail: "Use the three ready-to-copy presets and the quick safe-zone check below.",
    selfAction: "Choose a caption preset",
    doneTitle: "I want captions done for me",
    doneDetail: "Send the video type, language and platform. Esteban can scope reviewed captions for the edit.",
    doneAction: "Ask on WhatsApp",
    whatsappMessage: "Hi Esteban, I read your caption styles guide and want help with captions for my video. The platform is ____ and the language is ____. ",
  },
  es: {
    eyebrow: "Elige el siguiente paso",
    heading: "¿Vas a preparar los subtítulos o prefieres delegarlos?",
    intro: "Ambos caminos empiezan con la misma regla: el texto debe leerse sin tapar el video ni la interfaz de la aplicación.",
    selfTitle: "Los voy a preparar yo",
    selfDetail: "Usa los tres presets y la revisión rápida de zona segura que aparecen abajo.",
    selfAction: "Elegir un preset",
    doneTitle: "Quiero que los hagan por mí",
    doneDetail: "Comparte el tipo de video, idioma y plataforma. Esteban puede definir subtítulos revisados para la edición.",
    doneAction: "Pedir por WhatsApp",
    whatsappMessage: "Hola Esteban, leí tu guía de estilos de subtítulos y quiero ayuda con los subtítulos de mi video. La plataforma es ____ y el idioma es ____. ",
  },
} as const;

/**
 * A server-rendered fork for a reader who has just received the guide's answer.
 * It is deliberately a pair of ordinary links: the useful self-serve route works
 * without JavaScript and the done-for-you route says exactly where it opens.
 */
export function CaptionGuideNextStep({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section
      aria-labelledby="caption-guide-next-step-heading"
      data-section="caption_guide_next_step"
      className="mt-8 max-w-3xl rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] p-5 text-[#101214] sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">{text.eyebrow}</p>
      <h2 id="caption-guide-next-step-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
        {text.heading}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-[#3f4548]">{text.intro}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          href="#caption-typography-title"
          data-cta="caption_guide_self_serve"
          className="group rounded-xl border border-[#ddd4c8] bg-white p-4 transition hover:border-[#9f3c27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9f3c27]"
        >
          <span className="block font-serif text-2xl leading-tight text-[#101214]">{text.selfTitle}</span>
          <span className="mt-2 block text-sm leading-6 text-[#3f4548]">{text.selfDetail}</span>
          <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-[#9f3c27]">
            {text.selfAction}<ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
        <a
          href={whatsappHref(site.phone.e164, text.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="caption_guide_done_for_you_whatsapp"
          className="group rounded-xl border border-[#9f3c27] bg-[#9f3c27] p-4 text-white transition hover:bg-[#7f2f21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9f3c27]"
        >
          <span className="block font-serif text-2xl leading-tight text-white">{text.doneTitle}</span>
          <span className="mt-2 block text-sm leading-6 text-white/85">{text.doneDetail}</span>
          <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold">
            <MessageCircle className="size-4" aria-hidden="true" />{text.doneAction}
          </span>
        </a>
      </div>
    </section>
  );
}
