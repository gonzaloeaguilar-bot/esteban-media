"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Bot, MapPinned, Search, ShieldCheck, Workflow } from "lucide-react";

import { Container } from "@/components/ui/container";
import { trackServiceInterest } from "@/lib/analytics-events";

type Locale = "en" | "es";

const copy = {
  en: {
    eyebrow: "Services",
    title: "After the work, see the services that support it.",
    intro: "Esteban Moreno Media helps businesses with video, websites, profiles, follow-up tools, reporting, and the creative content that keeps everything clear.",
    label: "View services",
    href: "/services",
    cards: [
      { icon: MapPinned, title: "Profiles & marketplaces", text: "Google Business Profile, Maps, Yelp, and role-specific marketplaces such as Zillow, Homes.com, and Realtor.com when appropriate.", key: "profiles" },
      { icon: Bot, title: "Social & DM systems", text: "Instagram, Facebook Page, TikTok Business, ManyChat, and a mapped DM funnel from first reply to human handoff.", key: "social-dm" },
      { icon: Workflow, title: "Websites & follow-up", text: "Mobile-first sites, forms, email, SMS, routing, address autocomplete, and helpful automation when it fits the project.", key: "web-automation" },
      { icon: BarChart3, title: "Content & reporting", text: "Photo and video work, content review, publishing plans, and Metricool reporting that makes channel activity easier to understand.", key: "content-measurement" },
      { icon: Search, title: "SEO, local & AI search", text: "Technical SEO, local presence, source clarity, and observed visibility for Google and AI assistants—without ranking guarantees.", key: "search" },
      { icon: ShieldCheck, title: "Research & site checks", text: "Market research, competitor review, cost checks, visitor-path review, and authorized security testing when a project needs it.", key: "research-resilience" },
    ],
  },
  es: {
    eyebrow: "Servicios",
    title: "Después del trabajo, mira los servicios que lo sostienen.",
    intro: "Esteban Moreno Media ayuda con video, sitios web, perfiles, seguimiento, reportes y contenido creativo para que el proyecto sea fácil de entender.",
    label: "Ver servicios",
    href: "/es/servicios",
    cards: [
      { icon: MapPinned, title: "Perfiles y marketplaces", text: "Google Business Profile, Maps, Yelp y marketplaces según el rol, como Zillow, Homes.com y Realtor.com cuando correspondan.", key: "profiles" },
      { icon: Bot, title: "Redes y mensajes", text: "Instagram, Facebook Page, TikTok Business, ManyChat y respuestas organizadas para no perder conversaciones importantes.", key: "social-dm" },
      { icon: Workflow, title: "Sitios web y seguimiento", text: "Sitios mobile-first, formularios, correo, SMS, distribución, address autocomplete y automatización útil cuando encaja.", key: "web-automation" },
      { icon: BarChart3, title: "Contenido y reportes", text: "Foto, video, revisión de contenido, planes de publicación y reportes de Metricool para entender mejor cada canal.", key: "content-measurement" },
      { icon: Search, title: "SEO, local y búsqueda con IA", text: "SEO técnico, presencia local, claridad de fuentes y visibilidad observada en Google y asistentes de IA, sin prometer rankings.", key: "search" },
      { icon: ShieldCheck, title: "Investigación y revisión web", text: "Investigación de mercado, revisión de competencia, costos, recorrido del visitante y pruebas de seguridad autorizadas cuando hacen falta.", key: "research-resilience" },
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
              <Link key={card.key} href={content.href} onClick={() => trackServiceInterest(card.key, locale)} className="group em-panel p-6">
                <span className="em-panel__icon">
                  <Icon className="size-5 text-[#ffb49e]" aria-hidden="true" />
                </span>
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
