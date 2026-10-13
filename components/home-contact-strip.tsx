import { Mail, MessageCircle, Phone } from "lucide-react";

import { whatsappHref, type Locale } from "@/lib/packages";
import { site } from "@/lib/site";

const copy = {
  en: {
    eyebrow: "Ready to talk?",
    heading: "Tell me about your project.",
    detail: "Send what you want to make, the footage you have and your target date. I’ll confirm scope, price and timing in writing.",
    steps: ["Send the project details", "Confirm scope and availability", "Receive a written quote and timing"],
    whatsapp: "Get a quote on WhatsApp",
    email: "Email Esteban",
    call: "Call Esteban",
    message: "Hi Esteban, I would like a quote. My project is ____. I have ____ footage and need it by ____.",
    subject: "Project quote",
  },
  es: {
    eyebrow: "¿Listo para hablar?",
    heading: "Cuéntame de tu proyecto.",
    detail: "Envíame qué quieres crear, el material que tienes y para cuándo lo necesitas. Te confirmaré el alcance, precio y plazo por escrito.",
    steps: ["Envía los detalles", "Confirma alcance y disponibilidad", "Recibe la cotización y el plazo por escrito"],
    whatsapp: "Cotizar por WhatsApp",
    email: "Escribir por email",
    call: "Llamar a Esteban",
    message: "Hola Esteban, quiero una cotización. Mi proyecto es ____. Tengo ____ de material y lo necesito para ____.",
    subject: "Cotización de proyecto",
  },
} as const;

/**
 * Kept deliberately (homepage spine review, 2026-10-12): on a phone the
 * header's WhatsApp button is hidden (`hidden sm:inline-flex`), so above
 * this strip the only contact path is the hero's WhatsApp button. Removing
 * this section would drop the email and phone options entirely until the
 * KeepReading fold — reducing, not preserving, the contact paths available
 * before the fold. It stays, at its current compact size (~0.6 screens).
 */
export function HomeContactStrip({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(c.subject)}&body=${encodeURIComponent(c.message)}`;

  return (
    <section className="border-y border-[#ddd4c8] bg-[#f0ebe3] py-8 sm:py-10" aria-labelledby={`home-contact-${locale}`} data-section="home-contact-strip">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <p className="em-eyebrow">{c.eyebrow}</p>
          <h2 id={`home-contact-${locale}`} className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{c.heading}</h2>
          <p className="mt-2 text-base leading-7 text-[#4d5358]">{c.detail}</p>
          <ol className="mt-4 flex flex-col gap-2 text-sm text-[#4d5358] sm:flex-row sm:flex-wrap sm:gap-x-5" aria-label={locale === "es" ? "Qué pasa después" : "What happens next"}>
            {c.steps.map((step, index) => <li key={step} className="flex items-center gap-2"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-xs font-semibold text-[#9d3d2b]">{index + 1}</span>{step}</li>)}
          </ol>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[680px]">
          <a href={whatsappHref(site.phone.e164, c.message)} target="_blank" rel="noopener noreferrer" data-cta="home_contact_whatsapp" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#9d3d2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7f2f21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d3d2b]">
            <MessageCircle className="size-4" aria-hidden="true" />{c.whatsapp}
          </a>
          <a href={mailto} data-cta="home_contact_email" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#b9afa2] bg-white px-5 py-3 text-sm font-semibold text-[#101214] transition hover:border-[#9d3d2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d3d2b]">
            <Mail className="size-4" aria-hidden="true" /><span>{c.email}<span className="mt-0.5 block text-xs font-normal text-[#5b5550]">{site.email}</span></span>
          </a>
          <a href={site.phone.href} data-cta="home_contact_phone" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#b9afa2] bg-white px-5 py-3 text-sm font-semibold text-[#101214] transition hover:border-[#9d3d2b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d3d2b]">
            <Phone className="size-4" aria-hidden="true" /><span>{c.call}<span className="mt-0.5 block text-xs font-normal text-[#5b5550]">{site.phone.display}</span></span>
          </a>
        </div>
      </div>
    </section>
  );
}
