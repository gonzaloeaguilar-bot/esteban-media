import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Choose your next step",
    heading: "Do you want to keep planning or talk through your project?",
    intro: "The guide is here when you want to make the decision yourself. If the project needs a second set of eyes, start with the useful details instead of a vague quote request.",
    continueTitle: "Continue with this guide",
    continueDetail: "Read the practical steps and the questions people check before publishing or sending footage.",
    continueAction: "Keep reading",
    talkTitle: "Talk through my project",
    talkDetail: "Send the goal, what you have so far and where it needs to live. Esteban can point you to the useful next step.",
    talkAction: "Ask on WhatsApp",
    messagePrefix: "Hi Esteban, I am reading your guide ",
    messageSuffix: ". I want help with a project. The goal is ____; I have ____; it needs to live on ____.",
  },
  es: {
    eyebrow: "Elige el siguiente paso",
    heading: "¿Quieres seguir preparando o hablar de tu proyecto?",
    intro: "La guía está aquí si quieres tomar la decisión por tu cuenta. Si el proyecto necesita otra mirada, empieza con los datos útiles en lugar de pedir una cotización vaga.",
    continueTitle: "Seguir con esta guía",
    continueDetail: "Lee los pasos prácticos y las preguntas que conviene revisar antes de publicar o enviar material.",
    continueAction: "Seguir leyendo",
    talkTitle: "Hablar de mi proyecto",
    talkDetail: "Comparte el objetivo, lo que tienes hasta ahora y dónde necesita vivir. Esteban puede indicar el siguiente paso útil.",
    talkAction: "Pedir por WhatsApp",
    messagePrefix: "Hola Esteban, estoy leyendo tu guía ",
    messageSuffix: ". Quiero ayuda con un proyecto. El objetivo es ____; tengo ____; necesita vivir en ____.",
  },
} as const;

/** A deliberately low-pressure, server-rendered choice for every guide. */
export function GuideNextStep({ locale, guideTitle }: { locale: Locale; guideTitle: string }) {
  const text = copy[locale];
  const message = `${text.messagePrefix}"${guideTitle}"${text.messageSuffix}`;

  return (
    <section
      aria-labelledby="guide-next-step-heading"
      data-section="guide_next_step"
      className="mt-10 max-w-3xl rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] p-6 sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">{text.eyebrow}</p>
      <h2 id="guide-next-step-heading" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{text.heading}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[#3f4548]">{text.intro}</p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Link
          href="#section-1"
          data-cta="guide_next_step_continue"
          className="group min-h-64 rounded-xl border border-[#ddd4c8] bg-white p-5 transition hover:border-[#9f3c27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9f3c27]"
        >
          <span className="block font-serif text-2xl leading-tight">{text.continueTitle}</span>
          <span className="mt-3 block text-base leading-7 text-[#3f4548]">{text.continueDetail}</span>
          <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-[#9f3c27]">
            {text.continueAction}<ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
        <a
          href={whatsappHref(site.phone.e164, message)}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="guide_next_step_whatsapp"
          className="group min-h-64 rounded-xl border border-[#9f3c27] bg-[#9f3c27] p-5 text-white transition hover:bg-[#7f2f21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9f3c27]"
        >
          <span className="block font-serif text-2xl leading-tight">{text.talkTitle}</span>
          <span className="mt-3 block text-base leading-7 text-white/85">{text.talkDetail}</span>
          <span className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold">
            <MessageCircle className="size-4" aria-hidden="true" />{text.talkAction}
          </span>
        </a>
      </div>
    </section>
  );
}
