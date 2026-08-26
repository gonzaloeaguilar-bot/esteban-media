"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Bot, MapPinned, Search, ShieldCheck, Workflow } from "lucide-react";

import { Container } from "@/components/ui/container";
import { trackServiceInterest } from "@/lib/analytics-events";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Digital systems & growth infrastructure",
    title: "More than media: the systems that help a business get found, respond, and follow through.",
    intro: "Esteban Moreno Media designs the connected presence around your customer journey—profiles and marketplaces, a conversion website, automation, reporting, and the creative content that powers it.",
    label: "Explore the complete digital-systems catalog",
    href: "/services",
    cards: [
      { icon: MapPinned, title: "Profiles & marketplaces", text: "Google Business Profile, Maps, Yelp, and role-specific marketplaces such as Zillow, Homes.com, and Realtor.com when appropriate.", key: "profiles" },
      { icon: Bot, title: "Social & DM systems", text: "Instagram, Facebook Page, TikTok Business, ManyChat, and a mapped DM funnel from first reply to human handoff.", key: "social-dm" },
      { icon: Workflow, title: "Websites & automation", text: "Mobile-first sites, forms, email, SMS with Twilio, routing, address autocomplete, and custom agent-assisted workflows.", key: "web-automation" },
      { icon: BarChart3, title: "Content & measurement", text: "Photo and video work, content analysis, hypotheses, and Metricool reporting that turns channel activity into decisions.", key: "content-measurement" },
      { icon: Search, title: "SEO, local & AI search", text: "Technical SEO, local presence, source clarity, and observed visibility for Google and AI assistants—without ranking guarantees.", key: "search" },
      { icon: ShieldCheck, title: "Research & resilience", text: "Market and competitor research, funnel and cost audits, user-journey simulation, and authorized security pressure testing.", key: "research-resilience" },
    ],
  },
  es: {
    eyebrow: "Sistemas digitales e infraestructura de crecimiento",
    title: "Más que media: los sistemas que ayudan a un negocio a encontrarse, responder y dar seguimiento.",
    intro: "Esteban Moreno Media diseña una presencia conectada alrededor del recorrido del cliente: perfiles y marketplaces, sitio de conversión, automatización, medición y el contenido creativo que lo impulsa.",
    label: "Explorar el catálogo completo de sistemas digitales",
    href: "/es/servicios",
    cards: [
      { icon: MapPinned, title: "Perfiles y marketplaces", text: "Google Business Profile, Maps, Yelp y marketplaces según el rol, como Zillow, Homes.com y Realtor.com cuando correspondan.", key: "profiles" },
      { icon: Bot, title: "Redes y sistemas de DM", text: "Instagram, Facebook Page, TikTok Business, ManyChat y un embudo de DM mapeado desde la primera respuesta hasta la entrega humana.", key: "social-dm" },
      { icon: Workflow, title: "Sitios web y automatización", text: "Sitios mobile-first, formularios, correo, SMS con Twilio, distribución, address autocomplete y flujos personalizados asistidos por agentes.", key: "web-automation" },
      { icon: BarChart3, title: "Contenido y medición", text: "Foto y video, análisis de contenido, hipótesis y reportes de Metricool para convertir actividad de canales en decisiones.", key: "content-measurement" },
      { icon: Search, title: "SEO, local y búsqueda con IA", text: "SEO técnico, presencia local, claridad de fuentes y visibilidad observada en Google y asistentes de IA, sin prometer rankings.", key: "search" },
      { icon: ShieldCheck, title: "Research y resiliencia", text: "Research de mercado y competencia, auditorías de funnel y costo, simulación de journeys y pressure testing de seguridad autorizado.", key: "research-resilience" },
    ],
  },
} as const;

export function HomeAuthorityHub({ locale = "en" }: { locale?: Locale }) {
  const content = copy[locale];

  return (
    <section className="border-b border-[#ddd4c8] bg-[#101214] py-14 text-[#f6f1ea] sm:py-20" aria-labelledby={`authority-hub-${locale}`}>
      <Container size="xl">
        <div className="max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#ffb49e]">{content.eyebrow}</p>
          <h2 id={`authority-hub-${locale}`} className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{content.title}</h2>
          <p className="mt-5 text-base leading-8 text-[#d8d0c7]">{content.intro}</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.key} href={content.href} onClick={() => trackServiceInterest(card.key, locale)} className="group rounded-xl border border-white/15 bg-white/[0.05] p-5 transition hover:border-[#ffb49e] hover:bg-white/[0.08]">
                <Icon className="size-6 text-[#ffb49e]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-2xl">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#d8d0c7]">{card.text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#ffb49e]">{content.label}<ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
