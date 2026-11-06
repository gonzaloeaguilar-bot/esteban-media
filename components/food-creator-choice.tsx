import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Start with the footage you have",
    heading: "Are the clips for a restaurant or a food-and-places account?",
    intro: "Choose the closer starting point. Both begin with the clips you already filmed; the message tells Esteban what you are trying to publish before anyone assumes a new shoot.",
    restaurant: {
      title: "I run a restaurant or food business",
      detail: "I have clips of dishes, the space, or the team and want a clear Reel for the business.",
      action: "Ask about restaurant editing",
      message: "Hi Esteban, I run a restaurant or food business and already have clips to edit into a Reel. I found you through the Fort Lauderdale Reels editing page.",
    },
    creator: {
      title: "I make food-and-places videos",
      detail: "I have phone clips for a food, restaurant, or places account and want help turning them into posts.",
      action: "Ask about food-creator editing",
      message: "Hi Esteban, I make food-and-places videos and already have clips to edit into posts. I found you through the Fort Lauderdale Reels editing page.",
    },
  },
  es: {
    eyebrow: "Empieza con el material que ya tienes",
    heading: "¿Los clips son para un restaurante o para una cuenta de comida y lugares?",
    intro: "Elige el punto de partida que se parece más a tu caso. Los dos empiezan con los clips que ya grabaste; el mensaje le dice a Esteban qué quieres publicar antes de asumir una grabación nueva.",
    restaurant: {
      title: "Tengo un restaurante o negocio de comida",
      detail: "Tengo clips de platos, del local o del equipo y quiero un Reel claro para el negocio.",
      action: "Consultar edición para restaurante",
      message: "Hola Esteban, tengo un restaurante o negocio de comida y ya tengo clips para editar en un Reel. Llegué desde la página de edición de Reels en Fort Lauderdale.",
    },
    creator: {
      title: "Hago videos de comida y lugares",
      detail: "Tengo clips del celular para una cuenta de comida, restaurantes o lugares y quiero convertirlos en publicaciones.",
      action: "Consultar edición para creador de comida",
      message: "Hola Esteban, hago videos de comida y lugares y ya tengo clips para editar en publicaciones. Llegué desde la página de edición de Reels en Fort Lauderdale.",
    },
  },
} as const;

/**
 * A compact, server-rendered fork for the two buyer states that already reach
 * the Reels pages. The distinct data-cta values and message text let GA4 and
 * the received WhatsApp conversation preserve the selected path.
 */
export function FoodCreatorChoice({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const choices = [
    ["restaurant", c.restaurant],
    ["creator", c.creator],
  ] as const;

  return (
    <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-10 sm:py-14" data-section={`food_creator_choice_${locale}`}>
      <Container size="xl">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{c.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{c.heading}</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#252a2d]">{c.intro}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {choices.map(([id, choice]) => (
              <article key={id} className="rounded-lg border border-[#ddd4c8] bg-[#f6f1ea] p-5">
                <h3 className="font-serif text-2xl leading-tight">{choice.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#252a2d]">{choice.detail}</p>
                <a
                  href={whatsappHref(site.phone.e164, choice.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={`food_creator_choice_${locale}_${id}_whatsapp`}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#9f3c27] underline decoration-[#9f3c27]/40 underline-offset-4 hover:decoration-[#9f3c27]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {choice.action}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
