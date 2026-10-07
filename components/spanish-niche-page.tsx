import React from "react";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";

import { renderFormattedText } from "@/components/formatted-text";
import { KeepReading } from "@/components/keep-reading";
import { Container } from "@/components/ui/container";
import { Cartel, Figure, NumberedList } from "@/components/em-surface";
import { ProjectRail, ServiceRail } from "@/components/em-rails";
import { ServiceInquiryRail, type ServiceInquiry } from "@/components/service-depth";
import {
  buildSpanishNicheStructuredData,
  getSpanishNichePage,
  languageAlternates,
  spanishServices,
} from "@/lib/spanish-site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { site } from "@/lib/site";


type NicheLinkContext = {
  areaHref: string;
  areaLabel: string;
  note: string;
  serviceIds: string[];
  projects: { href: string; title: string; detail: string }[];
};

const nicheLinkContext: Record<string, NicheLinkContext> = {
  "edicion-de-video-para-creadores-de-comida-y-lugares-miami": {
    areaHref: "/es/areas#broward",
    areaLabel: "Ver cobertura en Broward y Miami-Dade",
    note: "Bar Door Monkey Miami: promoción de un local de 2020, con videografía y edición, de 55 segundos. ML Colombia: pieza social de 24 segundos. No son cuentas de recomendaciones.",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      { href: "/es/portafolio/bar-door-monkey", title: "Bar Door Monkey Miami", detail: "Promoción de un local · 2020 · 55 segundos" },
      { href: "/es/portafolio/ml-colombia", title: "ML Colombia", detail: "Contenido social publicado · 24 segundos" },
    ],
  },
  "videografo-en-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Dos proyectos publicados en Miami muestran trabajo real de promoción, grabación y edición.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Preproducción, modelos, locación, videografía y edición.",
      },
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Guion tipo sketch, videografía y edición.",
      },
    ],
  },
  "videografo-en-fort-lauderdale": {
    areaHref: "/es/areas#fort-lauderdale",
    areaLabel: "Ver cobertura en Fort Lauderdale y Broward",
    note: "El portafolio verifica capacidades de producción y edición. Estos ejemplos no se presentan como proyectos realizados en Broward.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Ejemplo publicado de producción en locación y edición en Miami.",
      },
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Trabajo publicado de edición de video.",
      },
    ],
  },
  "produccion-de-video-fort-lauderdale": {
    areaHref: "/es/areas#fort-lauderdale",
    areaLabel: "Ver cobertura en Fort Lauderdale y Broward",
    note: "Fort Lauderdale es la base local. Los proyectos enlazados verifican produccion y edicion publicadas; no inventan un caso especifico de Broward.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Preproduccion, locacion, videografia y edicion en un proyecto publicado.",
      },
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Trabajo publicado de guion y edicion de video.",
      },
    ],
  },
  "editor-de-reels-fort-lauderdale": {
    areaHref: "/es/areas#fort-lauderdale",
    areaLabel: "Ver cobertura en Fort Lauderdale y Broward",
    note: "La edicion de Reels puede hacerse remoto con material existente; la captura local se revisa proyecto por proyecto.",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/ml-colombia",
        title: "ML Colombia",
        detail: "Video para redes sociales publicado en el portafolio.",
      },
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Ejemplo publicado de edicion con material organizado.",
      },
    ],
  },
  "editor-de-reels-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Estos proyectos verifican experiencia en video social, promocional y edicion; los resultados comerciales no se inventan.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/ml-colombia",
        title: "ML Colombia",
        detail: "Video para redes sociales publicado en el portafolio.",
      },
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Video promocional en Miami con captura y edicion.",
      },
    ],
  },
  "fotografo-en-fort-lauderdale": {
    areaHref: "/es/areas#fort-lauderdale",
    areaLabel: "Ver cobertura en Fort Lauderdale y Broward",
    note: "La disponibilidad de fotografía sigue pendiente de confirmación. My D'ler verifica trabajo visual de marca, no una sesión fotográfica.",
    serviceIds: ["edicion", "contenido-ia", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Piezas visuales de marca, diseños sociales, video 3D y mockups de producto.",
      },
    ],
  },
  "reels-para-negocios-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Estos videos publicados muestran contenido social y promoción de negocios; no incluyen afirmaciones de resultados.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/ml-colombia",
        title: "ML Colombia",
        detail: "Video para redes sociales seleccionado del portafolio de Esteban.",
      },
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Video promocional en Miami con videografía y edición.",
      },
    ],
  },
  "video-para-restaurantes-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Estos son ejemplos verificados de promoción de negocios en Miami; no se presentan como prueba de clientes de restaurantes.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Preproducción, locación, videografía y edición.",
      },
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Guion tipo sketch, videografía y edición.",
      },
    ],
  },
  "drone-real-estate-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver el área de Miami-Dade",
    note: "La disponibilidad de drone sigue pendiente de confirmación. Estos trabajos verifican producción y edición, no vuelo aéreo ni un proyecto de real estate.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Ejemplo publicado de producción en locación y edición en Miami.",
      },
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Ejemplo publicado de edición de video.",
      },
    ],
  },
  "editor-de-video-real-estate-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "El proyecto [Homeowners](/es/portafolio/homeowners) demuestra trabajo publicado de edición de video para el sector inmobiliario.",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Ejemplo publicado de edición de video para bienes raíces.",
      },
    ],
  },
  "fotografia-de-producto-con-ia-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "El proyecto My D'ler demuestra trabajo publicado de imágenes visuales de marca y mockups de producto.",
    serviceIds: ["contenido-ia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Piezas visuales de marca, diseños sociales, video 3D y mockups de producto.",
      },
    ],
  },
  "imagenes-con-ia-para-ecommerce-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Demostrado por trabajo de diseño y composición de marca en nuestro portafolio.",
    serviceIds: ["contenido-ia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Diseños sociales y mockups visuales para producto.",
      },
    ],
  },
  "marketing-de-video-para-dentistas-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "El proyecto Healthy Smile demuestra videografía, guion tipo sketch y edición para el sector de salud dental en Miami.",
    serviceIds: ["edicion", "videografia", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Guion tipo sketch, videografía y edición para clínica dental.",
      },
    ],
  },
  "marketing-de-video-para-abogados-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Proyectos publicados verifican postproducción de video y estructura de contenido para servicios profesionales.",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Ejemplo publicado de edición de video.",
      },
    ],
  },
  "marketing-de-video-para-clinicas-esteticas-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "El proyecto Healthy Smile demuestra videografía y edición para servicios de estética y salud.",
    serviceIds: ["edicion", "videografia", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Videografía y edición para clínica estética y dental.",
      },
    ],
  },
  "reutilizacion-de-contenido-para-redes-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Proyectos del portafolio respaldan postproducción remota y cortes dinámicos.",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Ejemplo publicado de edición de video.",
      },
    ],
  },
  "produccion-de-video-para-pequenos-negocios-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Los proyectos Bar Door Monkey y Healthy Smile demuestran producción en locación, captura de audio y edición para negocios locales.",
    serviceIds: ["edicion", "videografia", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Producción en locación y edición para negocio local en Miami.",
      },
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Video promocional en locación y edición para consultorio dental local.",
      },
    ],
  },
  "fotos-con-ia-para-bienes-raices-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "El proyecto [Homeowners](/es/portafolio/homeowners) demuestra trabajo de edición e imágenes de bienes raíces.",
    serviceIds: ["contenido-ia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Ejemplo publicado de bienes raíces.",
      },
    ],
  },
  "fotografia-de-comida-con-ia-restaurantes": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "El proyecto Bar Door Monkey respalda producción y contenido para restaurantes.",
    serviceIds: ["contenido-ia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Producción y edición para restaurante local.",
      },
    ],
  },
  "marketing-de-video-para-contratistas-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Trabajo publicado respalda postproducción de video para empresas de servicios.",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Ejemplo publicado de edición de video.",
      },
    ],
  },
  "fotografo-de-retratos-y-headshots-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Sesiones de retratos agendadas por proyecto en South Florida.",
    serviceIds: ["fotografia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Piezas visuales de marca y retratos de estilo de vida.",
      },
    ],
  },
  "editor-de-video-corto-para-redes-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Postproducción remota especializada en Reels y Shorts. Para estructurar una estrategia comercial local en South Florida, consulta nuestra página de [reels para negocios en Miami](/es/reels-para-negocios-miami).",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/ml-colombia",
        title: "ML Colombia",
        detail: "Edición de video corto publicado para redes.",
      },
    ],
  },
  "produccion-de-video-palm-beach-county": {
    areaHref: "/es/areas/palm-beach-county",
    areaLabel: "Ver página dedicada de Palm Beach County",
    note: "Cobertura directa en el condado de Palm Beach.",
    serviceIds: ["videografia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Ejemplo de producción en locación y edición.",
      },
    ],
  },
  "edicion-de-video-palm-beach-county": {
    areaHref: "/es/areas/palm-beach-county",
    areaLabel: "Ver página dedicada de Palm Beach County",
    note: "Edición remota de video disponible para empresas en el condado de Palm Beach.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Edición remota y postproducción de video.",
      },
    ],
  },
  "produccion-de-video-doral-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Servicios de grabación y edición para zona comercial de Doral.",
    serviceIds: ["videografia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Producción comercial y edición.",
      },
    ],
  },
  "video-inmobiliario-coral-gables": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Edición visual para propiedades de lujo en Coral Gables.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Recorridos visuales y edición inmobiliaria.",
      },
    ],
  },
  "video-para-yates-y-hospitalidad-fort-lauderdale": {
    areaHref: "/es/areas#broward",
    areaLabel: "Ver cobertura en Broward",
    note: "El proyecto Banacol demuestra cinematografía aérea grabada desde embarcaciones en mar abierto.",
    serviceIds: ["edicion", "videografia"],
    projects: [
      {
        href: "/es/portafolio/banacol",
        title: "Banacol",
        detail: "Cinematografía aérea con dron operado desde embarcaciones en mar abierto.",
      },
    ],
  },
  "video-corporativo-distrito-financiero-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Edición corporativa bilingüe para firmas en Miami.",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Contenido visual de marca corporativa.",
      },
    ],
  },
  "video-para-pequenos-negocios-pembroke-pines": {
    areaHref: "/es/areas#broward",
    areaLabel: "Ver cobertura en Broward",
    note: "Bar Door Monkey y Healthy Smile verifican videografía y edición para videos promocionales publicados de negocios locales en Miami. No se presenta como un proyecto realizado en Pembroke Pines ni como prueba de resultados comerciales.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Videografía y edición en locación para un spot social publicado en Miami.",
      },
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Ejemplo de producción y edición en locación para un negocio local.",
      },
    ],
  },
  "marketing-de-video-para-cirugia-plastica-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Edición y producción en locación para consultorios médicos y clínicas de cirugía plástica en Miami.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Videografía y edición para clínica estética en Miami.",
      },
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Estrategia visual estética.",
      },
    ],
  },
  "fotografia-de-joyas-y-lujo-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Visuales de alta resolución asistidos por IA para joyería de lujo.",
    serviceIds: ["contenido-ia"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Imágenes comerciales y retoque.",
      },
    ],
  },
  "marketing-de-video-para-gimnasios-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Edición de alto ritmo para gimnasios y centros de entrenamiento.",
    serviceIds: ["edicion", "planificacion-social"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Producción y cortes dinámicos.",
      },
    ],
  },
  "videografo-para-eventos-corporativos-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Cobertura de eventos corporativos y edición de resúmenes.",
    serviceIds: ["videografia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Grabación corporativa.",
      },
    ],
  },
  "marketing-de-video-automotriz-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Edición estilo cinematográfico para autos de lujo y detailing.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Corrección de color cinematográfica.",
      },
    ],
  },
  "produccion-de-video-para-hoteles-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Producción y edición promocional para hoteles y resorts.",
    serviceIds: ["videografia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Producción de hospitalidad.",
      },
    ],
  },
  "edicion-de-video-podcast-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Edición multicámara y creación de clips para videopodcasts.",
    serviceIds: ["edicion", "reutilizacion-redes"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Edición remota y postproducción.",
      },
    ],
  },
  "editor-de-video-ugc-para-ecommerce": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Edición dinámica de ganchos y anuncios UGC para e-commerce.",
    serviceIds: ["edicion", "reutilizacion-redes"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Cortes promocionales rápidos.",
      },
    ],
  },
  "video-para-arquitectura-y-diseno-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Edición estilizada para firmas de arquitectura e interiorismo.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Edición arquitectónica e inmobiliaria.",
      },
    ],
  },
  "marketing-de-video-para-spas-y-bienestar-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Contenido visual envolvente y producción en locación para spas, clínicas y marcas de bienestar.",
    serviceIds: ["edicion", "planificacion-social", "videografia"],
    projects: [
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile Miami",
        detail: "Video promocional y contenido visual en locación.",
      },
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Estrategia visual estética.",
      },
    ],
  },
  "edicion-de-video-para-eventos-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Edición y armado de recaps para eventos y galas.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Edición de video de eventos.",
      },
    ],
  },
  "produccion-de-video-de-marca-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Videos de historia de marca y manifiesto institucional.",
    serviceIds: ["videografia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Video de marca institucional.",
      },
    ],
  },
  "produccion-de-video-para-entrenadores-personales-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Videos dinámicos para personal trainers y coaches de fitness.",
    serviceIds: ["edicion", "reutilizacion-redes"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Cortes de ritmo rápido.",
      },
    ],
  },
  "edicion-de-video-promocional-para-restaurantes-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Edición apetitosa de reels culinarios para restaurantes.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Video promocional gastronómico.",
      },
    ],
  },
  "produccion-de-video-para-firmas-de-abogados-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade y Broward",
    note: "Videos institucionales y testimoniales para firmas legales.",
    serviceIds: ["videografia", "edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Video corporativo institucional.",
      },
    ],
  },
  "marketing-de-video-para-alquiler-de-yates-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami Beach y Fort Lauderdale",
    note: "Videos de estilo de vida náutico y chárters de yates.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Edición de video de estilo de vida de lujo.",
      },
    ],
  },
  "marketing-de-video-para-odontologia-estetica-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Videos de diseño de sonrisa y transformaciones dentales.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile",
        detail: "Video marketing para clínicas dentales.",
      },
    ],
  },
  "edicion-de-video-para-discotecas-y-eventos-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami Beach y Wynwood",
    note: "Cortes de alto impacto y ritmo rápido para clubes nocturnos.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Cortes promocionales nocturnos.",
      },
    ],
  },
  "marketing-de-video-para-contratistas-de-techos-florida": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en South Florida",
    note: "Videos de proyectos de techado e instalaciones de impacto.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Video promocional de servicios residenciales.",
      },
    ],
  },
  "produccion-de-video-para-asesores-financieros-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en el Distrito Financiero de Miami",
    note: "Videos explicativos y corporativos para asesores patrimoniales.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Video corporativo institucional.",
      },
    ],
  },
  "edicion-de-video-para-hoteles-boutique-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami Beach",
    note: "Videos elegantes de instalaciones y suites boutique.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Visuales de hospitalidad boutique.",
      },
    ],
  },
  "editor-de-video-de-productos-para-ecommerce": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami-Dade",
    note: "Edición dinámica para demostraciones de producto e-commerce.",
    serviceIds: ["edicion", "reutilizacion-redes"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Edición publicitaria de producto.",
      },
    ],
  },
  "edicion-de-video-para-joyeria-de-lujo-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en el Distrito de Diseño de Miami",
    note: "Edición de macro-detalle y brillo para joyería de alta gama.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Edición estética de lujo.",
      },
    ],
  },
  "edicion-de-video-aereo-inmobiliario-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en South Florida",
    note: "Edición y estabilización de tomas aéreos con dron.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Edición aérea e inmobiliaria.",
      },
    ],
  },
  "edicion-de-video-miami-beach": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Miami Beach",
    note: "Edición cinemática de estilo de vida e historia costera.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Cortes de ambiente festivo costero.",
      },
    ],
  },
  "video-inmobiliario-aventura-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Aventura y Sunny Isles",
    note: "Videos de condominios marítimos y penthouses de lujo.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Edición de penthouse e interiores.",
      },
    ],
  },
  "video-creativo-wynwood-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Wynwood",
    note: "Edición vanguardista y ritmos audaces para marcas creativas.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Postproducción de estilo urbano.",
      },
    ],
  },
  "edicion-de-video-corporativo-weston": {
    areaHref: "/es/areas#broward",
    areaLabel: "Ver cobertura en Broward County",
    note: "Edición sobria de comunicados e historia corporativa.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Video corporativo institucional.",
      },
    ],
  },
  "video-de-marca-de-lujo-jupiter": {
    areaHref: "/es/areas/palm-beach-county",
    areaLabel: "Ver cobertura en Palm Beach County",
    note: "Videos sobrios de estilo de vida para clubes marítimos y golf.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Edición visual de marca de prestigio.",
      },
    ],
  },
  "video-para-negocios-hollywood-fl": {
    areaHref: "/es/areas#broward",
    areaLabel: "Ver cobertura en Broward County",
    note: "Videos promocionales claros para comercios de Hollywood.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile",
        detail: "Video marketing para comercios locales.",
      },
    ],
  },
  "produccion-de-video-delray-beach": {
    areaHref: "/es/areas/palm-beach-county",
    areaLabel: "Ver cobertura en Palm Beach County",
    note: "Edición ligera y vibrante para negocios en Delray Beach.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Visuales gastronómicos y boutique.",
      },
    ],
  },
  "video-inmobiliario-sunny-isles": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Sunny Isles Beach",
    note: "[Homeowners](/es/portafolio/homeowners) demuestra un proyecto publicado de edición con material suministrado por 300 Bees. No se presenta como un proyecto realizado en Sunny Isles.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Proyecto de 2021: edición de video a partir de material suministrado por 300 Bees.",
      },
    ],
  },
  "edicion-de-video-palm-beach-gardens": {
    areaHref: "/es/areas/palm-beach-county",
    areaLabel: "Ver cobertura en Palm Beach County",
    note: "El proyecto [Homeowners](/es/portafolio/homeowners) demuestra trabajo publicado de edición de video a partir de material suministrado por la agencia.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Trabajo publicado de edición de video.",
      },
    ],
  },
  "produccion-de-video-davie-fl": {
    areaHref: "/es/areas#broward",
    areaLabel: "Ver cobertura en Broward County",
    note: "Edición natural para propiedades y comercios en Davie.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Edición de servicios locales y espacios.",
      },
    ],
  },
  "servicio-de-edicion-de-video-para-youtube-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en South Florida",
    note: "Edición dinámica en formato largo para YouTube.",
    serviceIds: ["edicion", "edicion-podcast"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Edición y montaje de video en formato largo.",
      },
    ],
  },
  "editor-de-video-para-anuncios-de-tiktok-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en South Florida",
    note: "Anuncios de video direct-response con ganchos iniciales.",
    serviceIds: ["edicion", "reutilizacion-redes"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Cortes de anuncios publicitarios de alto enganche.",
      },
    ],
  },
  "edicion-de-video-para-cursos-online": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en South Florida",
    note: "Edición clara de lecciones y módulos educativos.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile",
        detail: "Video explicativo de alta claridad visual.",
      },
    ],
  },
  "edicion-de-video-de-capacitacion-corporativa-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en el Distrito Financiero de Miami",
    note: "Edición de videos de inducción y procedimientos SOP.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/banacol",
        title: "Banacol",
        detail: "Video de comunicación corporativa.",
      },
    ],
  },
  "editor-de-video-para-campanas-de-crowdfunding": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Wynwood",
    note: "El proyecto My D'ler demuestra piezas visuales de marca, video 3D, animación 2D y mockups para presentaciones de producto.",
    serviceIds: ["edicion", "videografia"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Piezas visuales de marca, video 3D, animación 2D y mockups de producto.",
      },
    ],
  },
  "edicion-de-video-con-dron-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en South Florida",
    note: "Posproducción y corrección de color aéreo 4K.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/homeowners",
        title: "Homeowners",
        detail: "Posproducción de tomas aéreas.",
      },
    ],
  },
  "postproduccion-de-videos-musicales-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en Wynwood y Miami Beach",
    note: "Colorimetría cinemática y edición de ritmo musical.",
    serviceIds: ["edicion"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Edición rítmica y estilo visual audaz.",
      },
    ],
  },
  "edicion-de-clips-para-webinars": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en South Florida",
    note: "Extracción de clips destacados de eventos virtuales.",
    serviceIds: ["edicion", "reutilizacion-redes"],
    projects: [
      {
        href: "/es/portafolio/healthy-smile",
        title: "Healthy Smile",
        detail: "Cápsulas en video para redes.",
      },
    ],
  },
  "produccion-masiva-de-video-para-redes-miami": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en South Florida",
    note: "Batching masivo de reels y shorts para publicación mensual.",
    serviceIds: ["edicion", "reutilizacion-redes"],
    projects: [
      {
        href: "/es/portafolio/bar-door-monkey",
        title: "Bar Door Monkey Miami",
        detail: "Producción de lotes de video social.",
      },
    ],
  },
  "servicio-de-edicion-de-entrevistas-de-video": {
    areaHref: "/es/areas#miami-dade",
    areaLabel: "Ver cobertura en South Florida",
    note: "Edición multicámara de conversaciones y testimoniales.",
    serviceIds: ["edicion", "edicion-podcast"],
    projects: [
      {
        href: "/es/portafolio/my-dler",
        title: "My D'ler",
        detail: "Edición multicámara de testimonios.",
      },
    ],
  },
};

const spanishInquiryServices: Record<string, ServiceInquiry> = {
  "edicion-de-video-para-creadores-de-comida-y-lugares-miami": {
    serviceId: "es_food_places_creator_video",
    serviceName: "edición para mi cuenta de comida y lugares",
    goalPrompt: "lanzar la cuenta o editar mis visitas a restaurantes",
    assetPrompt: "clips originales, nombres de locales y platos, mi cuenta y las visitas pagadas o de cortesía identificadas",
    proofHref: "/es/portafolio/bar-door-monkey",
    proofLabel: "Ver el video publicado del restaurante",
  },
  // Lote de nichos 2026-10-06.
  "marketing-de-video-para-consultorios-medicos-miami": {
    serviceId: "es_medical_practice_video",
    serviceName: "video para un consultorio medico",
    goalPrompt: "explicar un tratamiento o una molestia a futuros pacientes",
    assetPrompt: "material de la clinica, los clips con autorizacion del paciente y el logo",
    proofHref: "/es/portafolio/healthy-smile",
    proofLabel: "Ver el proyecto clinico publicado",
  },
  "edicion-de-video-para-creadores-de-contenido-miami": {
    serviceId: "es_content_creator_video",
    serviceName: "edicion de video para creadores de contenido",
    goalPrompt: "sostener un ritmo de publicacion en reels, tiktok y shorts",
    assetPrompt: "archivos originales, las plataformas y cuentas, y los clips pagados",
    proofHref: "/es/portafolio/ml-colombia",
    proofLabel: "Ver contenido social publicado",
  },
  "edicion-de-video-marca-blanca-para-agencias": {
    serviceId: "es_white_label_video_editing",
    serviceName: "edicion de video en marca blanca",
    goalPrompt: "entregar un montaje a nuestro propio cliente bajo nuestro nombre",
    assetPrompt: "archivos de camara, recursos de marca, entregables y el grado aprobado",
    proofHref: "/es/portafolio",
    proofLabel: "Ver trabajo publicado",
  },
  "marketing-de-video-para-salones-y-barberias-miami": {
    serviceId: "es_salon_barbershop_video",
    serviceName: "video para un salon o barberia",
    goalPrompt: "publicar transformaciones y llenar la agenda de la semana",
    assetPrompt: "clips de antes y despues, primeros planos y la nota de quien dio permiso",
    proofHref: "/es/portafolio",
    proofLabel: "Ver trabajo publicado",
  },
  "marketing-de-video-para-detallado-y-wraps-miami": {
    serviceId: "es_auto_detailing_video",
    serviceName: "video para un taller de detallado, polarizado o wrap",
    goalPrompt: "mostrar correccion de pintura, polarizado o un wrap de forma creible",
    assetPrompt: "clips desde un punto marcado y el servicio que muestra cada uno",
    proofHref: "/es/portafolio",
    proofLabel: "Ver trabajo publicado",
  },
  "editor-de-video-corto-para-redes-miami": {
    serviceId: "es_short_form_video",
    serviceName: "edicion de video corto para redes",
    goalPrompt: "publicar reels, shorts o tiktoks para un negocio",
    assetPrompt: "videos originales, referencias y una fecha de publicacion",
    proofHref: "/es/portafolio/ml-colombia",
    proofLabel: "Ver ejemplo publicado",
  },
  "fotografia-de-producto-con-ia-miami": {
    serviceId: "es_ai_product_photography",
    serviceName: "fotografia de producto con IA",
    goalPrompt: "crear imagenes de producto para tienda, anuncios o redes",
    assetPrompt: "fotos del producto, marca, referencias y usos permitidos",
    proofHref: "/es/portafolio/my-dler",
    proofLabel: "Ver trabajo visual publicado",
  },
  "fotos-con-ia-para-bienes-raices-miami": {
    serviceId: "es_ai_real_estate_photo",
    serviceName: "mejora de fotos inmobiliarias con IA",
    goalPrompt: "mejorar fotos de una propiedad sin cambiar lo que el comprador puede ver",
    assetPrompt: "fotos originales, direccion general de la propiedad y notas de lo que no se debe alterar",
    proofHref: "/es/portafolio/homeowners",
    proofLabel: "Ver ejemplo inmobiliario publicado",
  },
  "edicion-de-video-promocional-para-restaurantes-miami": {
    serviceId: "es_restaurant_promo_video",
    serviceName: "edicion de video promocional para restaurantes",
    goalPrompt: "mostrar comida, ambiente y una oferta clara para redes",
    assetPrompt: "clips de platos, local, equipo, menu, logo y referencias",
    proofHref: "/es/portafolio/bar-door-monkey",
    proofLabel: "Ver ejemplo de restaurante",
  },
  "editor-de-video-de-productos-para-ecommerce": {
    serviceId: "es_ecommerce_product_video",
    serviceName: "edicion de video de productos para ecommerce",
    goalPrompt: "crear demostraciones, anuncios o videos de producto para tienda online",
    assetPrompt: "clips del producto, beneficios, marca, formatos y plataforma",
    proofHref: "/es/portafolio/my-dler",
    proofLabel: "Ver trabajo de producto",
  },
  "editor-de-video-ugc-para-ecommerce": {
    serviceId: "es_ugc_video_ecommerce",
    serviceName: "edicion de video UGC para ecommerce",
    goalPrompt: "convertir material de creador o celular en anuncios claros",
    assetPrompt: "clips UGC, guion, producto, oferta y referencias de anuncios",
    proofHref: "/es/portafolio/bar-door-monkey",
    proofLabel: "Ver ejemplo publicado",
  },
  "produccion-masiva-de-video-para-redes-miami": {
    serviceId: "es_social_video_batching",
    serviceName: "produccion masiva de video para redes",
    goalPrompt: "preparar un lote mensual de reels, shorts o clips sociales",
    assetPrompt: "material bruto, calendario, temas, marca y frecuencia de publicacion",
    proofHref: "/es/portafolio/ml-colombia",
    proofLabel: "Ver ejemplo social",
  },
  "produccion-de-video-fort-lauderdale": {
    serviceId: "es_video_production_fort_lauderdale",
    serviceName: "produccion de video en Fort Lauderdale",
    goalPrompt: "definir si el proyecto necesita edicion remota, captura local o ambos",
    assetPrompt: "meta, locacion, material disponible, referencias, formato y fecha ideal",
    proofHref: "/es/portafolio/bar-door-monkey",
    proofLabel: "Ver produccion publicada",
  },
  "editor-de-reels-fort-lauderdale": {
    serviceId: "es_reels_editor_fort_lauderdale",
    serviceName: "edicion de Reels en Fort Lauderdale",
    goalPrompt: "convertir clips existentes en Reels, TikTok o Shorts para un negocio local",
    assetPrompt: "clips originales, referencia, mensaje principal, marca y plataforma de publicacion",
    proofHref: "/es/portafolio/ml-colombia",
    proofLabel: "Ver video social publicado",
  },
  "editor-de-reels-miami": {
    serviceId: "es_reels_editor_miami",
    serviceName: "edicion de Reels en Miami",
    goalPrompt: "crear videos cortos claros para Instagram, TikTok o YouTube Shorts",
    assetPrompt: "clips, referencias, idioma, textos, plataforma y fecha de publicacion",
    proofHref: "/es/portafolio/ml-colombia",
    proofLabel: "Ver ejemplo social",
  },
  "servicio-de-edicion-de-video-para-youtube-miami": {
    serviceId: "es_youtube_video_editing",
    serviceName: "edicion de video para YouTube",
    goalPrompt: "editar un video largo y sacar piezas cortas cuando aplique",
    assetPrompt: "grabacion principal, audio, referencias, miniatura o titulos tentativos",
    proofHref: "/es/portafolio/my-dler",
    proofLabel: "Ver trabajo publicado",
  },
};

export function buildSpanishNicheMetadata(slug: string): Metadata {
  const page = getSpanishNichePage(slug);

  if (!page) {
    return {};
  }

  const path = `/es/${page.slug}`;
  // Read the shared languageAlternates map rather than hardcoding pairs here.
  //
  // This function used to special-case exactly ONE slug and emit
  // `{ "es-US": path }` for every other Spanish niche page. That made hreflang
  // ONE-WAY: after PR #84 paired 36 service pages, the English side correctly
  // advertised en-US/es-US/x-default while the Spanish side still pointed only
  // at itself. Google ignores non-reciprocal hreflang, so the pairs did nothing
  // in production until this read the same map the English side does.
  // Caught by checking the live HTML on both sides, not by trusting the map.
  //
  // Fallback keeps a Spanish page with no English counterpart self-referencing,
  // which is the correct signal for a page that genuinely has no pair.
  const languages: Record<string, string> =
    languageAlternates[path] ?? { "es-US": path };

  return buildPageMetadata({
    title: page.metadataTitle,
    description: page.description,
    path,
    locale: "es",
    languages,
  });
}

export function SpanishNichePage({ slug }: { slug: string }) {
  const page = getSpanishNichePage(slug);

  if (!page) {
    notFound();
  }

  const Icon = page.icon;
  const isPendingConfirmation =
    page.availability === "pending-confirmation";
  const linkContext = nicheLinkContext[page.slug];
  const relatedServices = linkContext
    ? spanishServices.filter((service) =>
        linkContext.serviceIds.includes(service.id),
      )
    : spanishServices;
  const jsonLd = buildSpanishNicheStructuredData(page);
  const contactHref =
    page.slug === "video-para-pequenos-negocios-pembroke-pines"
      ? "/es/contacto?source=pembroke-pines-small-business-video"
      : "/es/contacto";
  const inquiryService = spanishInquiryServices[page.slug];
  const sectionArticles = page.sections?.map((section) => (
    <article key={section.heading} className="space-y-4">
      <h3 className="font-serif text-2xl sm:text-3xl text-[#101214]">{section.heading}</h3>
      <div className="space-y-4 text-base leading-8 text-[#252a2d]">
        {section.paragraphs.map((paragraph, index) => (
          <p key={index}>{renderFormattedText(paragraph)}</p>
        ))}
      </div>
      {section.bullets && section.bullets.length > 0 ? (
        <Cartel className="mt-4 p-5 sm:p-6" data-em-reveal>
          <NumberedList items={section.bullets} className="mt-0" renderItem={renderFormattedText} />
        </Cartel>
      ) : null}
    </article>
  ));

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <section className="border-b border-[#ddd4c8] py-8 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Migas de pan" className="em-crumbs mb-6 sm:mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/es" className="hover:text-[#9f3c27]">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/es/servicios" className="hover:text-[#9f3c27]">
                  Servicios
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                {page.title}
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                {page.eyebrow}
              </p>
              <h1 className="mt-3 sm:mt-4 max-w-4xl font-serif em-display">
                {page.h1}
              </h1>
              <p className="mt-4 sm:mt-6 max-w-2xl text-lg leading-7 sm:leading-8 text-[#252a2d]">
                {renderFormattedText(page.lead)}
              </p>
              {isPendingConfirmation ? (
                <p
                  role="note"
                  className="mt-6 max-w-2xl rounded-lg border border-[#c84a2c] bg-[#fbf6ef] p-4 text-sm leading-6 text-[#252a2d]"
                >
                  <strong>Estado:</strong> esta es una ruta educativa heredada. No
                  presenta fotografía ni drone como servicios disponibles.
                </p>
              ) : null}
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3" data-em-hero-actions>
                <Link
                  href={contactHref}
                  data-cta={`${inquiryService?.serviceId ?? "es_niche"}_contact`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  {isPendingConfirmation
                    ? "Consultar servicios confirmados"
                    : "Consultar en español"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/es/servicios"
                  data-cta={`${inquiryService?.serviceId ?? "es_niche"}_services`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Ver servicios
                </Link>
                <Link
                  href="/es/guias"
                  data-cta={`${inquiryService?.serviceId ?? "es_niche"}_guides`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Ver guías de video
                </Link>
              </div>
              {page.updated ? <p className="mt-3 text-sm text-[#5a6066]">Actualizado: <time dateTime={page.updated}>{new Date(`${page.updated}T12:00:00Z`).toLocaleDateString("es-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time></p> : null}
            </div>

            {/* The page's one moment of scale. What used to be here was a
                definition list in a flat box: two labels and two values at
                body size, the least looked-at object on the page despite
                holding the two facts a visitor actually came to check. The
                figures are sized against this card, not the window. */}
            {page.heroMedia ? (
              <figure>
                <Image src={page.heroMedia.src} alt={page.heroMedia.alt} width={1280} height={720} className="h-auto w-full rounded-xl" priority />
                <figcaption className="mt-3 text-sm leading-6 text-[#5a6066]">{page.heroMedia.caption}</figcaption>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">{renderFormattedText(page.projectFit)}</p>
              </figure>
            ) : (
            <Cartel as="aside" className="overflow-hidden p-6">
              <Icon className="size-7 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">
                {isPendingConfirmation
                  ? "¿Qué explica esta página?"
                  : "¿Para qué proyecto encaja?"}
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                {renderFormattedText(page.projectFit)}
              </p>
              <dl className="mt-6 grid gap-px overflow-hidden rounded-[4px] border border-[#ddd4c8] bg-[#ddd4c8]">
                <Figure
                  label={isPendingConfirmation ? "Tema" : "Servicio"}
                  value={page.keyword}
                  className="bg-[#fbf6ef]"
                />
                <Figure
                  label="Zona"
                  value={page.location}
                  className="bg-[#fbf6ef]"
                />
              </dl>
            </Cartel>
            )}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <ContentList title="Puede ser relevante para" items={page.bestFor} revealIndex={0} />
            <ContentList
              title="Preguntas para definir el alcance"
              revealIndex={1}
              items={page.scopingQuestions}
            />
          </div>
        </Container>
      </section>

      {page.sections && page.sections.length > 0 ? (
        <section className="border-t border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
          <Container size="xl">
            <div className="mx-auto max-w-4xl space-y-12">
              {page.sectionsDisclosure ? (
                <KeepReading className="em-reading-paper" id="detalles-del-servicio" title={page.sectionsDisclosure} destinations="Formatos, primer mes, tomas, colaboraciones y ejemplos publicados">
                  <div className="mt-8 space-y-10">{sectionArticles}</div>
                </KeepReading>
              ) : (
                <>
              <div className="border-b border-[#ddd4c8] pb-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                  Guía de alcance y criterios técnicos
                </p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  Estrategia, formato y edición de video corto para negocios
                </h2>
              </div>
                  {sectionArticles}
                </>
              )}
            </div>
          </Container>
        </section>
      ) : null}

      {linkContext ? (
        <section className="border-t border-[#ddd4c8] py-12 sm:py-16">
          <Container size="xl">
            <div className="grid gap-8 lg:grid-cols-[.72fr_1fr]">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Prueba publicada y contexto
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight">
                  Revisa trabajo real antes de hablar del proyecto.
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {renderFormattedText(linkContext.note)}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={linkContext.areaHref}
                    data-cta={`${inquiryService?.serviceId ?? "es_niche"}_area`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                  >
                    {linkContext.areaLabel}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={contactHref}
                    data-cta={`${inquiryService?.serviceId ?? "es_niche"}_contact`}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                  >
                    {isPendingConfirmation
                      ? "Consultar servicios confirmados"
                      : "Hablar de esta idea"}
                  </Link>
                </div>
              </div>
              {/* The heading above this says "revisa trabajo real" and what
                  followed was two boxes of words. These projects have approved
                  stills sitting in public/portfolio; the rail is what finally
                  puts a picture on a page that had none. A project without an
                  approved still falls back to a text card rather than a media
                  card with an empty frame. */}
              <div
                className="em-on-dark em-cartel rounded-[18px] bg-[#101214] p-5 sm:p-6"
                data-em-reveal
                data-rail-spotlight
              >
              <ProjectRail
                projects={linkContext.projects}
                source={`niche_projects_${page.slug}`}
                cta="Ver el proyecto"
              />
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {inquiryService ? (
        <ServiceInquiryRail
          service={inquiryService}
          trackInterest={page.slug === "edicion-de-video-para-creadores-de-comida-y-lugares-miami"}
          locale="es"
          sectionId="consulta-de-servicio"
        />
      ) : null}

      <section className="border-y border-[#ddd4c8] bg-[#101214] py-12 text-[#f6f1ea] sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#ffb49e]">
            Servicios relacionados
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
            Revisa las prioridades confirmadas relacionadas.
          </h2>
          {/* Same rail, dark skin. The override is scoped to this section, not
              to a colour-scheme media query: a deliberately dark band is a
              design decision, whereas dark tokens behind
              prefers-color-scheme mean half the visitors see a different site
              and which half is down to chance. */}
          <div className="em-on-dark mt-8">
            <ServiceRail
              services={relatedServices.map((service) => ({
                id: service.id,
                name: service.name,
                description: service.description,
                href: `/es/servicios#${service.id}`,
              }))}
              source={`niche_services_${page.slug}`}
              cta="Ver el servicio"
            />
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Preguntas frecuentes
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">
                Respuestas rápidas sobre alcance y disponibilidad.
              </h2>
            </div>
            <div className="grid gap-3">
              {page.faqs.map((faq, index) => (
                <Cartel
                  as="details"
                  key={faq.question}
                  className="em-qa p-5"
                  data-em-reveal={page.sectionsDisclosure ? undefined : true}
                  style={{ "--em-reveal-i": index } as CSSProperties}
                  open={page.sectionsDisclosure ? undefined : true}
                >
                  <summary>
                    <h3 className="font-serif text-2xl">{faq.question}</h3>
                    <span aria-hidden="true" className="em-qa__pm" />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {renderFormattedText(faq.answer)}
                  </p>
                </Cartel>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <Cartel className="p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Siguiente paso
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Comparte la meta, la zona y las referencias.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Esa información ayuda a conversar sobre los servicios
                  confirmados, sin asumir formatos, disponibilidad ni una forma de
                  trabajo específica.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  data-cta={`${inquiryService?.serviceId ?? "es_niche"}_closing_email`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.phone.href}
                  data-cta={`${inquiryService?.serviceId ?? "es_niche"}_closing_phone`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Llamar
                </a>
                <a
                  href={site.instagram}
                  data-cta={`${inquiryService?.serviceId ?? "es_niche"}_closing_instagram`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Instagram
                </a>
              </div>
            </div>
          </Cartel>
        </Container>
      </section>
    </main>
  );
}

/**
 * Two of these sit side by side and together they were the single biggest
 * source of the wall: a niche page renders fifty-five rows, every one of them
 * the same check-mark glyph followed by a sentence. Numbering them gives each
 * row its own identity and lets someone count what they are looking at, which
 * a repeated tick never allowed.
 */
function ContentList({
  title,
  items,
  revealIndex = 0,
}: {
  title: string;
  items: string[];
  revealIndex?: number;
}) {
  return (
    <Cartel
      as="section"
      className="p-6"
      data-em-reveal
      style={{ "--em-reveal-i": revealIndex } as CSSProperties}
    >
      <h2 className="font-serif text-3xl">{title}</h2>
      <NumberedList items={items} renderItem={renderFormattedText} />
    </Cartel>
  );
}
