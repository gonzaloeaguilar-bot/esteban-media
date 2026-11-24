import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  RAW_FILMING_RATES,
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
  SHORT_FORM,
} from "@/lib/pricing";

/**
 * One buyer question, answered in its first sentence, on the page Google
 * already ranks for it.
 *
 * Why this exists: on 2026-11-24 the trade-show booth page ranked first for
 * "videographer for trade show booth fort lauderdale" and never mentioned raw
 * or original files, which is what the exhibitor actually asks. Every number
 * here is read from lib/pricing.ts; nothing is retyped, and no delivery time
 * is promised because none is set there.
 */
type Locale = "en" | "es";
type Kind =
  | "trade-show-raw-files"
  | "real-estate-monthly-plan"
  | "mastermind-filming-price"
  | "town-hall-filming-price"
  | "keys-retreat-filming-price";

type Copy = {
  eyebrow: string;
  question: string;
  answer: string;
  action: string;
  href: string;
};

const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;

function tradeShow(locale: Locale): Copy {
  const half = usd(RAW_FILMING_RATES.halfDay);
  const full = usd(RAW_FILMING_RATES.fullDay);
  const edit = usd(SHORT_FORM.perVideoFrom);
  if (locale === "es") {
    return {
      eyebrow: "Respuesta directa",
      question: "¿Pueden grabar mi stand en una feria y entregarme el material original?",
      answer: `Sí. Esteban Moreno Media graba tu stand, las demostraciones de producto y entrevistas cortas en la feria, en Fort Lauderdale o Miami, y te entrega los archivos originales sin que tengas que contratar edición. Solo grabación cuesta ${half} por medio día y ${full} por día completo. El material original (raw footage) se entrega con un enlace de Google Drive o Dropbox; dinos la hora de tu vuelo al reservar para dejar la entrega acordada por escrito antes de que abra la feria. Los archivos originales bastan cuando tu propio equipo o agencia edita, o cuando solo necesitas dejar registro. Suma edición, desde ${edit} por video, cuando quieres clips listos para publicar durante la feria o un resumen para quien no asistió. Atención en español; inglés disponible.`,
      action: "Enviar los datos de mi feria",
      href: "/es/contacto?source=trade-show-raw-files",
    };
  }
  return {
    eyebrow: "Straight answer",
    question: "Can you film my trade show booth and give me the raw footage?",
    answer: `Yes. Esteban Moreno Media films your booth, product demos and short interviews on the show floor in Fort Lauderdale or Miami and hands over the original files, with no editing required. Filming only is ${half} for a half day and ${full} for a full day. The raw footage goes to you by Google Drive or Dropbox link; tell us your flight time when you book so the handoff is agreed in writing before the show opens. Original files alone are enough when your own team or agency edits, or when you only need the footage on record. Add an edit, from ${edit} per video, when you want clips ready to post during the show or a recap for people who were not there. Spanish-first, English too.`,
    action: "Send my show details",
    href: "/contact?source=trade-show-raw-files",
  };
}

function realEstate(locale: Locale): Copy {
  const es = locale === "es";
  const prices = REAL_ESTATE_PLANS.map((plan) => usd(plan.price));
  const joiner = es ? " y " : " and ";
  const priceList = `${prices.slice(0, -1).join(", ")}${joiner}${prices[prices.length - 1]}`;
  const detail = REAL_ESTATE_PLANS.map((plan) => {
    if (es) {
      const drone = plan.drone === "included" ? " e incluye fotografía con dron" : "";
      const noun = plan.properties === 1 ? "propiedad" : "propiedades";
      return `el de ${usd(plan.price)} cubre ${plan.properties} ${noun} al mes con ${plan.postsPerWeek} publicaciones o Reels por semana${drone}`;
    }
    const drone = plan.drone === "included" ? " and includes drone photography" : "";
    const noun = plan.properties === 1 ? "property" : "properties";
    return `the ${usd(plan.price)} plan covers ${plan.properties} ${noun} a month with ${plan.postsPerWeek} posts or Reels a week${drone}`;
  }).join("; ");
  const months = REAL_ESTATE_PLAN_TERMS.minimumMonths;
  if (es) {
    return {
      eyebrow: "Respuesta directa",
      question:
        "¿Cuánto cuesta un plan mensual de Reels para un agente de bienes raíces en el sur de la Florida?",
      answer: `Los planes mensuales cuestan ${priceList} al mes. En detalle: ${detail}. Cada propiedad es de hasta 3,000 pies cuadrados y los planes tienen un mínimo de ${months} meses. Elige una sesión por propiedad cuando listas de vez en cuando y solo necesitas el material de una casa. El plan mensual conviene cuando tienes al menos una propiedad cada mes y quieres mantener tus redes activas entre una y otra.`,
      action: "Preguntar por un plan mensual",
      href: "/es/contacto?source=real-estate-monthly-plan",
    };
  }
  return {
    eyebrow: "Straight answer",
    question: "How much does a monthly Reels plan cost for a real estate agent in South Florida?",
    answer: `Monthly plans are ${priceList} a month. In detail: ${detail}. Each property is up to 3,000 square feet, and plans run for a minimum of ${months} months. Choose a single listing shoot when you list occasionally and only need media for one home. A monthly plan makes sense once you have at least one listing every month and want your feed active between listings.`,
    action: "Ask about a monthly plan",
    href: "/contact?source=real-estate-monthly-plan",
  };
}

/**
 * Event pages that ranked first on Google on 2026-11-24 without ever stating
 * the filming rate. English only until the Spanish pages are checked.
 */
const EVENT_PRICE = {
  "mastermind-filming-price": {
    question: "How much does it cost to film a mastermind event in Miami?",
    covers: "the sessions, the speakers and short attendee interviews",
    where: "in Miami-Dade or Broward",
    action: "Send my event details",
  },
  "town-hall-filming-price": {
    question: "How much does it cost to film a corporate town hall in South Florida?",
    covers: "the leadership remarks, the audience questions and the room",
    where: "at your office or venue in Miami-Dade or Broward",
    action: "Send my town hall details",
  },
  "keys-retreat-filming-price": {
    question: "How much does it cost to film an executive retreat in the Florida Keys?",
    covers: "the working sessions, the team activities and short leader interviews",
    where: "",
    action: "Send my retreat details",
  },
} as const;

function eventPrice(kind: keyof typeof EVENT_PRICE): Copy {
  const half = usd(RAW_FILMING_RATES.halfDay);
  const full = usd(RAW_FILMING_RATES.fullDay);
  const edit = usd(SHORT_FORM.perVideoFrom);
  const item = EVENT_PRICE[kind];
  const price =
    kind === "keys-retreat-filming-price"
      ? `Filming only starts at ${half} for a half day and ${full} for a full day; travel to the Keys is confirmed in writing before the date is booked.`
      : `Filming only is ${half} for a half day and ${full} for a full day ${item.where}.`;
  return {
    eyebrow: "Straight answer",
    question: item.question,
    answer: `${price} Esteban Moreno Media records ${item.covers}, and you receive the original files by Google Drive or Dropbox link. Filming only is enough when your own team edits or you just need the day on record. Add an edit, from ${edit} per video, when you want a recap or short clips ready to post. The scope is agreed in writing before the date is booked. Spanish-first, English too.`,
    action: item.action,
    href: `/contact?source=${kind}`,
  };
}

export function BuyerAnswer({ kind, locale = "en" }: { kind: Kind; locale?: Locale }) {
  const copy =
    kind === "trade-show-raw-files"
      ? tradeShow(locale)
      : kind === "real-estate-monthly-plan"
        ? realEstate(locale)
        : eventPrice(kind);
  const sectionId = `buyer-answer-${kind}`;
  const ctaId = `buyer_answer_${kind.split("-").join("_")}${locale === "es" ? "_es" : ""}`;
  return (
    <section
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-10 text-[#101214] sm:py-12"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{copy.eyebrow}</p>
        <h2 id={`${sectionId}-heading`} className="mt-3 max-w-3xl font-serif text-3xl sm:text-4xl">
          {copy.question}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">{copy.answer}</p>
        <Link
          href={copy.href}
          data-cta={ctaId}
          data-section={sectionId}
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
        >
          {copy.action}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
