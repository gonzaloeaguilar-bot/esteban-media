#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  open,
  readFile,
  rename,
  stat,
  unlink,
} from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const INDEX_WATCH_SCHEMA = "esteban-media.index-watch.v1";
export const SITE_URL = "https://estebanmorenomedia.com/";
export const LEGACY_V1_WATCH_URLS = [
  "https://estebanmorenomedia.com/",
  "https://estebanmorenomedia.com/services",
  "https://estebanmorenomedia.com/portfolio",
  "https://estebanmorenomedia.com/areas",
  "https://estebanmorenomedia.com/areas/palm-beach-county",
  "https://estebanmorenomedia.com/about",
  "https://estebanmorenomedia.com/contact",
  "https://estebanmorenomedia.com/es",
  "https://estebanmorenomedia.com/es/servicios",
  "https://estebanmorenomedia.com/es/portafolio",
  "https://estebanmorenomedia.com/es/areas",
  "https://estebanmorenomedia.com/es/areas/palm-beach-county",
  "https://estebanmorenomedia.com/es/sobre-esteban",
  "https://estebanmorenomedia.com/es/contacto",
  "https://estebanmorenomedia.com/es/videografo-en-fort-lauderdale",
  "https://estebanmorenomedia.com/es/videografo-en-miami",
  "https://estebanmorenomedia.com/es/fotografo-en-fort-lauderdale",
  "https://estebanmorenomedia.com/es/reels-para-negocios-miami",
  "https://estebanmorenomedia.com/es/video-para-restaurantes-miami",
  "https://estebanmorenomedia.com/es/drone-real-estate-miami",
];
export const WATCH_URLS = [
  ...LEGACY_V1_WATCH_URLS,
  // Owner-requested source-backed portfolio proof (2026-10-23); recheck 2026-11-22.
  "https://estebanmorenomedia.com/portfolio/gains-from-geebs-shorts",
  "https://estebanmorenomedia.com/es/portafolio/gains-from-geebs-shorts",
  "https://estebanmorenomedia.com/portfolio/exatlon",
  "https://estebanmorenomedia.com/es/portafolio/exatlon",
  "https://estebanmorenomedia.com/portfolio/juanchis-burguer",
  "https://estebanmorenomedia.com/es/portafolio/juanchis-burguer",
  "https://estebanmorenomedia.com/portfolio/portosole",
  "https://estebanmorenomedia.com/es/portafolio/portosole",
  "https://estebanmorenomedia.com/portfolio/punto-de-giro",
  "https://estebanmorenomedia.com/es/portafolio/punto-de-giro",
  // Buyer-guide pair (2026-10-18): same bounded RFP request in English and Spanish.
  "https://estebanmorenomedia.com/guides/video-production-rfp-template-miami",
  "https://estebanmorenomedia.com/es/guias/plantilla-brief-rfp-produccion-video-miami",
  // Annual-events section (owner-approved 2026-10-10).
  "https://estebanmorenomedia.com/events/miami-boat-show-video",
  "https://estebanmorenomedia.com/es/eventos/video-para-el-miami-boat-show",
  "https://estebanmorenomedia.com/events/south-beach-wine-food-festival-video",
  "https://estebanmorenomedia.com/es/eventos/video-para-el-south-beach-wine-food-festival",
  "https://estebanmorenomedia.com/events/emerge-americas-video",
  "https://estebanmorenomedia.com/es/eventos/video-para-emerge-americas",
  "https://estebanmorenomedia.com/events/miami-music-week-video",
  "https://estebanmorenomedia.com/es/eventos/video-para-miami-music-week",
  "https://estebanmorenomedia.com/events/miami-spice-restaurant-video",
  "https://estebanmorenomedia.com/es/eventos/video-para-restaurantes-en-miami-spice",
  "https://estebanmorenomedia.com/events",
  "https://estebanmorenomedia.com/es/eventos",
  "https://estebanmorenomedia.com/events/fort-lauderdale-boat-show-video",
  "https://estebanmorenomedia.com/es/eventos/video-para-el-boat-show-de-fort-lauderdale",
  "https://estebanmorenomedia.com/events/art-basel-miami-beach-video",
  "https://estebanmorenomedia.com/es/eventos/video-para-art-basel-miami-beach",
  // Food and places creator pair, explicitly requested 2026-10-07.
  "https://estebanmorenomedia.com/services/food-and-places-creator-video-editing-miami",
  "https://estebanmorenomedia.com/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami",
  "https://estebanmorenomedia.com/assessment",
  "https://estebanmorenomedia.com/calculator",
  // Added 2026-09-16 with the owner-ordered affiliate page; the watch set must
  // stay identical to app/sitemap.ts or index-watch reports false drift.
  "https://estebanmorenomedia.com/desk-recommendations",
  // Added 2026-09-27 with the owner-ordered pricing pages (bilingual pair).
  "https://estebanmorenomedia.com/pricing/starter",
  "https://estebanmorenomedia.com/pricing/growth",
  "https://estebanmorenomedia.com/pricing/local-presence",
  "https://estebanmorenomedia.com/pricing/all-in",
  "https://estebanmorenomedia.com/es/precios/arranque",
  "https://estebanmorenomedia.com/es/precios/crecimiento",
  "https://estebanmorenomedia.com/es/precios/presencia-local",
  "https://estebanmorenomedia.com/es/precios/todo-incluido",
  "https://estebanmorenomedia.com/pricing/real-estate",
  "https://estebanmorenomedia.com/es/precios/inmobiliaria",
  "https://estebanmorenomedia.com/pricing",
  // Added 2026-10-06 with the five owner-ordered niche pairs (medical practice,
  // content creator, white label, salon/barbershop, detailing/tint/wrap).
  "https://estebanmorenomedia.com/services/medical-practice-video-marketing-miami",
  "https://estebanmorenomedia.com/services/content-creator-video-editing-miami",
  "https://estebanmorenomedia.com/services/white-label-video-editing-for-agencies",
  "https://estebanmorenomedia.com/services/salon-barbershop-video-marketing-miami",
  "https://estebanmorenomedia.com/services/auto-detailing-tint-wrap-video-marketing-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-consultorios-medicos-miami",
  "https://estebanmorenomedia.com/es/edicion-de-video-para-creadores-de-contenido-miami",
  "https://estebanmorenomedia.com/es/edicion-de-video-marca-blanca-para-agencias",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-salones-y-barberias-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-detallado-y-wraps-miami",
  "https://estebanmorenomedia.com/guides/how-much-does-restaurant-video-cost-miami",
  "https://estebanmorenomedia.com/es/guias/cuanto-cuesta-un-video-para-restaurante-miami",
  "https://estebanmorenomedia.com/guides/how-much-does-real-estate-video-cost-miami",
  "https://estebanmorenomedia.com/es/guias/cuanto-cuesta-video-inmobiliario-miami",
  "https://estebanmorenomedia.com/guides/how-to-start-a-restaurant-recommendation-account-miami",
  "https://estebanmorenomedia.com/es/guias/como-empezar-una-cuenta-de-recomendaciones-de-restaurantes-miami",
  "https://estebanmorenomedia.com/guides/how-much-does-a-short-form-video-editor-cost",
  "https://estebanmorenomedia.com/es/guias/cuanto-cuesta-un-editor-de-videos-cortos",
  "https://estebanmorenomedia.com/reels-editing-cost-calculator",
  "https://estebanmorenomedia.com/es/calculadora-de-costo-de-edicion-de-reels",
  "https://estebanmorenomedia.com/guides/local-editor-vs-fiverr-vs-agency-miami",
  "https://estebanmorenomedia.com/es/guias/editor-local-vs-fiverr-vs-agencia-miami",
  "https://estebanmorenomedia.com/guides/how-many-reels-should-a-restaurant-post-per-week",
  "https://estebanmorenomedia.com/es/guias/cuantos-reels-debe-publicar-un-restaurante-por-semana",
  // Boca Raton pair (owner decision 2026-10-14): the EN page was re-admitted
  // from the cohort noindex list and the ES twin is new.
  "https://estebanmorenomedia.com/services/video-production-boca-raton",
  "https://estebanmorenomedia.com/es/editor-de-reels-boca-raton",
  // Added 2026-10-11 with niche wave 8 (owner-approved).
  "https://estebanmorenomedia.com/services/pre-construction-condo-video-marketing-miami",
  "https://estebanmorenomedia.com/es/video-para-preventa-de-condominios-miami",
  "https://estebanmorenomedia.com/services/vacation-rental-video-marketing-fort-lauderdale",
  "https://estebanmorenomedia.com/es/video-para-alquileres-vacacionales-fort-lauderdale",
  "https://estebanmorenomedia.com/services/insurance-agency-video-marketing-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-agencias-de-seguros-miami",
  "https://estebanmorenomedia.com/services/mortgage-broker-video-marketing-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-brokers-hipotecarios-miami",
  "https://estebanmorenomedia.com/services/immigration-attorney-video-marketing-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-abogados-de-inmigracion-miami",
  "https://estebanmorenomedia.com/services/church-sermon-clip-editing-miami",
  "https://estebanmorenomedia.com/es/edicion-de-clips-de-predicas-para-iglesias-miami",
  "https://estebanmorenomedia.com/services/personal-brand-video-editor-founders-miami",
  "https://estebanmorenomedia.com/es/editor-de-video-para-marca-personal-miami",
  "https://estebanmorenomedia.com/services/podcast-clipping-service-miami",
  "https://estebanmorenomedia.com/es/edicion-de-clips-de-podcast-miami",
  "https://estebanmorenomedia.com/guides/miami-restaurant-instagram-study",
  "https://estebanmorenomedia.com/es/guias/estudio-instagram-restaurantes-miami",
  "https://estebanmorenomedia.com/es/contratar-editor-de-video-remoto",
  "https://estebanmorenomedia.com/services/quinceanera-video-miami",
  "https://estebanmorenomedia.com/es/video-para-quinceaneras-miami",
  "https://estebanmorenomedia.com/services/wedding-videographer-fort-lauderdale",
  // Web/landing/chatbot line (2026-10-14, vault esteban-web-chatbot-seo-geo-2026-10-14).
  "https://estebanmorenomedia.com/services/ai-chatbot-for-small-business",
  "https://estebanmorenomedia.com/es/chatbot-con-ia-para-negocios",
  "https://estebanmorenomedia.com/services/landing-page-design",
  "https://estebanmorenomedia.com/es/landing-page-para-negocios",
  // Corporate and networking event expansion (2026-10-18).
  "https://estebanmorenomedia.com/services/corporate-event-videographer-fort-lauderdale",
  "https://estebanmorenomedia.com/es/videografo-para-eventos-corporativos-fort-lauderdale",
  "https://estebanmorenomedia.com/services/networking-event-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-eventos-de-networking-miami",
  // Wave 2 niche expansions (2026-10-18: wedding, vlog, conference, executive interview).
  "https://estebanmorenomedia.com/services/wedding-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-de-bodas-miami",
  "https://estebanmorenomedia.com/services/vlog-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-vlogs-miami",
  "https://estebanmorenomedia.com/services/conference-videographer-fort-lauderdale",
  "https://estebanmorenomedia.com/es/videografo-para-conferencias-fort-lauderdale",
  "https://estebanmorenomedia.com/services/executive-interview-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-entrevistas-ejecutivas-miami",
  // Wave 3 niche expansions (2026-10-18: yacht, content-day, colombia, subtitling).
  "https://estebanmorenomedia.com/services/yacht-event-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-eventos-en-yates-miami",
  "https://estebanmorenomedia.com/services/content-day-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-dia-de-contenido-miami",
  "https://estebanmorenomedia.com/services/remote-video-editing-colombia",
  "https://estebanmorenomedia.com/es/edicion-de-video-remota-colombia",
  "https://estebanmorenomedia.com/services/bilingual-video-subtitling-service",
  "https://estebanmorenomedia.com/es/servicio-de-subtitulado-bilingue-de-video",
  // Wave 4 niche expansions (2026-10-18: trade-show, gala, superyacht, rehearsal-dinner).
  "https://estebanmorenomedia.com/services/trade-show-booth-videographer-fort-lauderdale",
  "https://estebanmorenomedia.com/es/videografo-para-ferias-comerciales-fort-lauderdale",
  "https://estebanmorenomedia.com/services/corporate-gala-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-galas-corporativas-miami",
  "https://estebanmorenomedia.com/services/superyacht-charter-marketing-video-fort-lauderdale",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-superyates-fort-lauderdale",
  "https://estebanmorenomedia.com/services/rehearsal-dinner-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-cena-de-ensayo-miami",
  // Wave 5 niche expansions (2026-10-18: mastermind, surprise proposal, speaker sizzle, bar mitzvah).
  "https://estebanmorenomedia.com/services/mastermind-event-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-masterminds-miami",
  "https://estebanmorenomedia.com/services/surprise-proposal-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-propuestas-de-matrimonio-miami",
  "https://estebanmorenomedia.com/services/speaker-sizzle-reel-production-miami",
  "https://estebanmorenomedia.com/es/produccion-de-video-reel-para-conferencistas-miami",
  "https://estebanmorenomedia.com/services/bar-mitzvah-videographer-south-florida",
  "https://estebanmorenomedia.com/es/videografo-para-bar-mitzvah-south-florida",
  // Wave 6 niche expansions (2026-10-18: commercial real estate, luxury penthouse, fine dining, mixology).
  "https://estebanmorenomedia.com/services/commercial-real-estate-video-miami",
  "https://estebanmorenomedia.com/es/video-para-bienes-raices-comerciales-miami",
  "https://estebanmorenomedia.com/services/luxury-penthouse-video-tour-miami",
  "https://estebanmorenomedia.com/es/video-de-penthouses-de-lujo-miami",
  "https://estebanmorenomedia.com/services/fine-dining-restaurant-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-restaurantes-de-alta-cocina-miami",
  "https://estebanmorenomedia.com/services/mixology-cocktail-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-de-cocteleria-para-bares-miami",
  // Wave 7 niche expansions (2026-10-18: construction progress, fashion lookbook, boat listing, luxury watch).
  "https://estebanmorenomedia.com/services/construction-progress-video-miami",
  "https://estebanmorenomedia.com/es/video-de-progreso-de-construccion-miami",
  "https://estebanmorenomedia.com/services/fashion-lookbook-video-miami",
  "https://estebanmorenomedia.com/es/video-para-marcas-de-moda-miami",
  "https://estebanmorenomedia.com/services/boat-listing-video-fort-lauderdale",
  "https://estebanmorenomedia.com/es/video-para-venta-de-barcos-fort-lauderdale",
  "https://estebanmorenomedia.com/services/luxury-watch-video-miami",
  "https://estebanmorenomedia.com/es/video-para-relojes-de-lujo-miami",
  // Waves 8, 9, 10 commercial niche expansions (2026-10-18: amazon product, cosmetics, product demo, ugc ad variation, catering, brewery distillery, yacht party, sportfishing, hair restoration, chiropractic, startup pitch, executive bio).
  "https://estebanmorenomedia.com/services/amazon-product-video-production-miami",
  "https://estebanmorenomedia.com/es/video-para-productos-de-amazon-miami",
  "https://estebanmorenomedia.com/services/cosmetics-product-video-miami",
  "https://estebanmorenomedia.com/es/video-para-marcas-de-cosmeticos-miami",
  "https://estebanmorenomedia.com/services/product-demo-video-production-miami",
  "https://estebanmorenomedia.com/es/video-de-demostracion-de-producto-miami",
  "https://estebanmorenomedia.com/services/ugc-ad-variation-video-editing",
  "https://estebanmorenomedia.com/es/edicion-de-variaciones-de-anuncios-ugc",
  "https://estebanmorenomedia.com/services/catering-company-video-miami",
  "https://estebanmorenomedia.com/es/video-para-empresas-de-catering-miami",
  "https://estebanmorenomedia.com/services/brewery-craft-distillery-video-miami",
  "https://estebanmorenomedia.com/es/video-para-cervecerias-artesanales-miami",
  "https://estebanmorenomedia.com/services/yacht-party-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-fiestas-en-yates-miami",
  "https://estebanmorenomedia.com/services/sportfishing-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-de-pesca-deportiva-miami",
  "https://estebanmorenomedia.com/services/hair-restoration-video-miami",
  "https://estebanmorenomedia.com/es/video-para-restauracion-capilar-miami",
  "https://estebanmorenomedia.com/services/chiropractic-video-marketing-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-quiropracticos-miami",
  "https://estebanmorenomedia.com/services/startup-pitch-video-production-miami",
  "https://estebanmorenomedia.com/es/video-para-pitches-de-startups-miami",
  "https://estebanmorenomedia.com/services/executive-video-bio-production-miami",
  "https://estebanmorenomedia.com/es/video-de-biografia-ejecutiva-miami",
  "https://estebanmorenomedia.com/es/videografo-de-bodas-fort-lauderdale",
  "https://estebanmorenomedia.com/services/videographer-miami",
  "https://estebanmorenomedia.com/guides/how-to-start-as-an-influencer",
  "https://estebanmorenomedia.com/es/guias/como-empezar-a-ser-influencer",
  "https://estebanmorenomedia.com/services/dance-studio-music-school-video-marketing-miami",
  "https://estebanmorenomedia.com/es/video-para-academias-de-baile-y-musica-miami",
  "https://estebanmorenomedia.com/es/precios",
  "https://estebanmorenomedia.com/case-studies/banacol",
  "https://estebanmorenomedia.com/case-studies/flas-concierge",
  "https://estebanmorenomedia.com/case-studies/healthy-smile",
  "https://estebanmorenomedia.com/case-studies/homeowners",
  "https://estebanmorenomedia.com/case-studies/my-dler",
  "https://estebanmorenomedia.com/es/calculadora",
  "https://estebanmorenomedia.com/es/casos-de-estudio/banacol",
  "https://estebanmorenomedia.com/es/casos-de-estudio/flas-concierge",
  "https://estebanmorenomedia.com/es/casos-de-estudio/healthy-smile",
  "https://estebanmorenomedia.com/es/casos-de-estudio/homeowners",
  "https://estebanmorenomedia.com/es/casos-de-estudio/my-dler",
  "https://estebanmorenomedia.com/es/diseno-web-fort-lauderdale",
  "https://estebanmorenomedia.com/es/edicion-de-video-con-dron-miami",
  "https://estebanmorenomedia.com/es/edicion-de-video-corporativo-weston",
  "https://estebanmorenomedia.com/es/edicion-de-video-de-capacitacion-corporativa-miami",
  "https://estebanmorenomedia.com/es/edicion-de-video-miami-beach",
  "https://estebanmorenomedia.com/es/edicion-de-video-palm-beach-gardens",
  "https://estebanmorenomedia.com/es/edicion-de-video-para-cursos-online",
  "https://estebanmorenomedia.com/es/edicion-de-video-para-discotecas-y-eventos-miami",
  "https://estebanmorenomedia.com/es/edicion-de-video-para-hoteles-boutique-miami",
  "https://estebanmorenomedia.com/es/edicion-de-video-podcast-miami",
  "https://estebanmorenomedia.com/es/edicion-de-video-promocional-para-restaurantes-miami",
  "https://estebanmorenomedia.com/es/editor-de-reels-fort-lauderdale",
  "https://estebanmorenomedia.com/es/editor-de-reels-miami",
  "https://estebanmorenomedia.com/es/editor-de-video-corto-para-redes-miami",
  "https://estebanmorenomedia.com/es/editor-de-video-miami",
  "https://estebanmorenomedia.com/es/editor-de-video-para-anuncios-de-tiktok-miami",
  "https://estebanmorenomedia.com/es/editor-de-video-para-campanas-de-crowdfunding",
  "https://estebanmorenomedia.com/es/editor-de-video-real-estate-miami",
  "https://estebanmorenomedia.com/es/editor-de-video-ugc-para-ecommerce",
  "https://estebanmorenomedia.com/es/evaluacion",
  "https://estebanmorenomedia.com/es/fotografia-de-comida-con-ia-restaurantes",
  "https://estebanmorenomedia.com/es/fotografia-de-joyas-y-lujo-miami",
  "https://estebanmorenomedia.com/es/fotografia-de-producto-con-ia-miami",
  "https://estebanmorenomedia.com/es/fotografia-de-producto-miami",
  "https://estebanmorenomedia.com/es/fotografo-de-retratos-y-headshots-miami",
  "https://estebanmorenomedia.com/es/fotos-con-ia-para-bienes-raices-miami",
  "https://estebanmorenomedia.com/es/guias",
  "https://estebanmorenomedia.com/es/guias/como-disenar-miniaturas-de-video-atractivas",
  "https://estebanmorenomedia.com/es/guias/como-elegir-un-editor-de-video-en-miami",
  "https://estebanmorenomedia.com/es/guias/como-enviar-archivos-pesados-de-video-para-edicion",
  "https://estebanmorenomedia.com/es/guias/como-escribir-guiones-para-anuncios-de-video",
  "https://estebanmorenomedia.com/es/guias/como-escribir-un-brief-util-de-video",
  "https://estebanmorenomedia.com/es/guias/como-mejorar-la-retencion-de-audiencia-en-video",
  "https://estebanmorenomedia.com/es/guias/como-mezclar-audio-para-videos-en-redes",
  "https://estebanmorenomedia.com/es/guias/como-preparar-audio-para-edicion-de-video",
  "https://estebanmorenomedia.com/es/guias/como-reutilizar-video-largo-en-reels",
  "https://estebanmorenomedia.com/es/guias/como-seleccionar-broll-para-video-corporativo",
  "https://estebanmorenomedia.com/es/guias/como-usar-instagram-reels-para-tu-negocio",
  "https://estebanmorenomedia.com/es/guias/como-usar-inteligencia-artificial-para-fotografia-de-producto",
  "https://estebanmorenomedia.com/es/guias/correccion-de-color-vs-colorimetria-guia",
  "https://estebanmorenomedia.com/es/guias/cuanto-cuesta-la-fotografia-de-producto",
  "https://estebanmorenomedia.com/es/guias/cuanto-cuesta-la-produccion-de-video-corporativo-miami",
  "https://estebanmorenomedia.com/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale",
  "https://estebanmorenomedia.com/es/guias/duracion-ideal-de-video-para-redes-sociales",
  "https://estebanmorenomedia.com/es/guias/edicion-de-video-con-ia-vs-editor-profesional",
  "https://estebanmorenomedia.com/es/guias/edicion-remota-vs-estudio-local",
  "https://estebanmorenomedia.com/es/guias/editor-de-video-freelance-vs-agencia-de-postproduccion",
  "https://estebanmorenomedia.com/es/guias/editor-de-video-vs-videografo",
  "https://estebanmorenomedia.com/es/guias/entrega-para-edicion-remota-de-video",
  "https://estebanmorenomedia.com/es/guias/estrategia-de-embudo-de-video-marketing-b2b",
  "https://estebanmorenomedia.com/es/guias/estrategia-de-video-bilingue-south-florida",
  "https://estebanmorenomedia.com/es/guias/flujo-de-edicion-de-video-para-agencias-miami",
  "https://estebanmorenomedia.com/es/guias/formatos-de-archivo-de-video-raw-explicados",
  "https://estebanmorenomedia.com/es/guias/fotografia-de-producto-con-ia-vs-estudio-tradicional",
  "https://estebanmorenomedia.com/es/guias/grabar-video-con-iphone-para-edicion-profesional",
  "https://estebanmorenomedia.com/es/guias/guia-de-relaciones-de-aspecto-de-video",
  "https://estebanmorenomedia.com/es/guias/guias-de-edicion-de-video-con-dron-florida",
  "https://estebanmorenomedia.com/es/guias/ideas-de-contenido-de-video-para-restaurantes",
  "https://estebanmorenomedia.com/es/guias/ideas-de-reels-para-agentes-de-bienes-raices",
  "https://estebanmorenomedia.com/es/guias/iluminacion-y-configuracion-para-entrevistas-de-video",
  "https://estebanmorenomedia.com/es/guias/mejores-estilos-de-subtitulos-para-reels",
  "https://estebanmorenomedia.com/es/guias/mejores-practicas-de-edicion-de-video-vertical",
  "https://estebanmorenomedia.com/es/guias/plantilla-de-guion-para-video-testimonial",
  "https://estebanmorenomedia.com/es/guias/preparar-material-para-edicion-de-video",
  "https://estebanmorenomedia.com/es/guias/reels-vs-tiktok-vs-shorts-para-negocios-locales",
  "https://estebanmorenomedia.com/es/guias/video-vertical-horizontal-y-zonas-seguras",
  "https://estebanmorenomedia.com/es/imagenes-con-ia-para-ecommerce-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-automotriz-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-abogados-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-alquiler-de-yates-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-cirugia-plastica-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-clinicas-esteticas-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-contratistas-de-techos-florida",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-contratistas-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-dentistas-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-gimnasios-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-odontologia-estetica-miami",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-spas-y-bienestar-miami",
  "https://estebanmorenomedia.com/es/portafolio/banacol",
  "https://estebanmorenomedia.com/es/portafolio/bar-door-monkey",
  "https://estebanmorenomedia.com/es/portafolio/diana-jack",
  "https://estebanmorenomedia.com/es/portafolio/flas-concierge",
  "https://estebanmorenomedia.com/es/portafolio/front-line-auto",
  "https://estebanmorenomedia.com/es/portafolio/gains-from-geebs",
  "https://estebanmorenomedia.com/es/portafolio/ai-lead-automation",
  "https://estebanmorenomedia.com/es/portafolio/healthy-smile",
  "https://estebanmorenomedia.com/es/portafolio/homeowners",
  "https://estebanmorenomedia.com/es/portafolio/la-huelga",
  "https://estebanmorenomedia.com/es/portafolio/ml-colombia",
  "https://estebanmorenomedia.com/es/portafolio/my-dler",
  "https://estebanmorenomedia.com/es/portafolio/titanforge",
  "https://estebanmorenomedia.com/es/postproduccion-de-videos-musicales-miami",
  "https://estebanmorenomedia.com/es/produccion-de-video-de-marca-miami",
  "https://estebanmorenomedia.com/es/produccion-de-video-delray-beach",
  "https://estebanmorenomedia.com/es/produccion-de-video-doral-miami",
  "https://estebanmorenomedia.com/es/produccion-de-video-fort-lauderdale",
  "https://estebanmorenomedia.com/es/produccion-de-video-palm-beach-county",
  "https://estebanmorenomedia.com/es/produccion-de-video-para-asesores-financieros-miami",
  "https://estebanmorenomedia.com/es/produccion-de-video-para-entrenadores-personales-miami",
  "https://estebanmorenomedia.com/es/produccion-de-video-para-hoteles-miami",
  "https://estebanmorenomedia.com/es/produccion-masiva-de-video-para-redes-miami",
  "https://estebanmorenomedia.com/es/recursos/kit-video-social",
  "https://estebanmorenomedia.com/es/reutilizacion-de-contenido-para-redes-miami",
  "https://estebanmorenomedia.com/es/video-corporativo-distrito-financiero-miami",
  "https://estebanmorenomedia.com/es/video-creativo-wynwood-miami",
  "https://estebanmorenomedia.com/es/video-de-marca-de-lujo-jupiter",
  "https://estebanmorenomedia.com/es/video-inmobiliario-coral-gables",
  "https://estebanmorenomedia.com/es/video-inmobiliario-sunny-isles",
  "https://estebanmorenomedia.com/es/video-para-arquitectura-y-diseno-miami",
  "https://estebanmorenomedia.com/es/video-para-pequenos-negocios-pembroke-pines",
  "https://estebanmorenomedia.com/es/video-para-yates-y-hospitalidad-fort-lauderdale",
  "https://estebanmorenomedia.com/guides",
  "https://estebanmorenomedia.com/guides/ai-product-photography-vs-traditional-studio",
  "https://estebanmorenomedia.com/guides/ai-video-editing-vs-human-editor",
  "https://estebanmorenomedia.com/guides/b2b-video-marketing-funnel-strategy",
  "https://estebanmorenomedia.com/guides/best-caption-styles-for-instagram-reels",
  "https://estebanmorenomedia.com/guides/bilingual-video-marketing-strategy-south-florida",
  "https://estebanmorenomedia.com/guides/color-grading-vs-color-correction-guide",
  "https://estebanmorenomedia.com/guides/corporate-video-production-cost-miami",
  "https://estebanmorenomedia.com/guides/customer-testimonial-video-script-template",
  "https://estebanmorenomedia.com/guides/drone-video-editing-guidelines-florida",
  "https://estebanmorenomedia.com/guides/fastest-way-to-send-large-video-files-to-editor",
  "https://estebanmorenomedia.com/guides/freelance-video-editor-vs-post-agency",
  "https://estebanmorenomedia.com/guides/how-much-does-product-photography-cost",
  "https://estebanmorenomedia.com/guides/how-to-choose-a-video-editor-in-miami",
  "https://estebanmorenomedia.com/guides/how-to-design-clickable-video-thumbnails",
  "https://estebanmorenomedia.com/guides/how-to-improve-video-retention-rate",
  "https://estebanmorenomedia.com/guides/how-to-mix-audio-for-social-video",
  "https://estebanmorenomedia.com/guides/how-to-prepare-audio-for-video-editing",
  "https://estebanmorenomedia.com/guides/how-to-repurpose-long-form-video-into-reels",
  "https://estebanmorenomedia.com/guides/how-to-script-social-video-ads",
  "https://estebanmorenomedia.com/guides/how-to-select-broll-for-corporate-video",
  "https://estebanmorenomedia.com/guides/how-to-use-ai-for-product-photography",
  "https://estebanmorenomedia.com/guides/how-to-use-instagram-reels-for-business",
  "https://estebanmorenomedia.com/guides/ideal-video-length-for-social-platforms",
  "https://estebanmorenomedia.com/guides/instagram-reels-ideas-for-real-estate",
  "https://estebanmorenomedia.com/guides/lighting-setup-for-video-interviews-at-home",
  "https://estebanmorenomedia.com/guides/prepare-footage-for-video-editing",
  "https://estebanmorenomedia.com/guides/raw-video-file-formats-explained",
  "https://estebanmorenomedia.com/guides/record-video-with-iphone-for-professional-editing",
  "https://estebanmorenomedia.com/guides/reels-vs-tiktok-vs-shorts-for-local-business",
  "https://estebanmorenomedia.com/guides/remote-video-editing-handoff",
  "https://estebanmorenomedia.com/guides/remote-vs-local-video-editing",
  "https://estebanmorenomedia.com/guides/vertical-horizontal-video-exports-and-safe-zones",
  "https://estebanmorenomedia.com/guides/vertical-video-editing-best-practices",
  "https://estebanmorenomedia.com/guides/video-aspect-ratios-cheat-sheet",
  "https://estebanmorenomedia.com/guides/video-content-ideas-for-restaurants",
  "https://estebanmorenomedia.com/guides/video-editing-workflow-for-agencies-miami",
  "https://estebanmorenomedia.com/guides/video-editor-vs-videographer",
  "https://estebanmorenomedia.com/guides/video-production-cost-fort-lauderdale",
  "https://estebanmorenomedia.com/guides/write-a-useful-video-brief",
  "https://estebanmorenomedia.com/portfolio/banacol",
  "https://estebanmorenomedia.com/portfolio/bar-door-monkey",
  "https://estebanmorenomedia.com/portfolio/diana-jack",
  "https://estebanmorenomedia.com/portfolio/flas-concierge",
  "https://estebanmorenomedia.com/portfolio/front-line-auto",
  "https://estebanmorenomedia.com/portfolio/gains-from-geebs",
  "https://estebanmorenomedia.com/portfolio/ai-lead-automation",
  "https://estebanmorenomedia.com/portfolio/healthy-smile",
  "https://estebanmorenomedia.com/portfolio/homeowners",
  "https://estebanmorenomedia.com/portfolio/la-huelga",
  "https://estebanmorenomedia.com/portfolio/ml-colombia",
  "https://estebanmorenomedia.com/portfolio/my-dler",
  "https://estebanmorenomedia.com/portfolio/titanforge",
  "https://estebanmorenomedia.com/resources/social-video-kit",
  "https://estebanmorenomedia.com/resources/video-project-brief-template",
  "https://estebanmorenomedia.com/resources/remote-editing-handoff-checklist",
  "https://estebanmorenomedia.com/resources/ai-product-photo-truth-checklist",
  "https://estebanmorenomedia.com/services/ai-food-photography-restaurants",
  "https://estebanmorenomedia.com/services/ai-product-photography-miami",
  "https://estebanmorenomedia.com/services/product-photography-miami",
  "https://estebanmorenomedia.com/services/ai-real-estate-photo-enhancement",
  "https://estebanmorenomedia.com/services/architecture-design-video-miami",
  "https://estebanmorenomedia.com/services/automotive-video-marketing-miami",
  "https://estebanmorenomedia.com/services/boutique-hotel-video-editing-miami",
  "https://estebanmorenomedia.com/services/brand-video-production-miami",
  "https://estebanmorenomedia.com/services/content-repurposing-service-miami",
  "https://estebanmorenomedia.com/services/contractor-video-marketing-south-florida",
  "https://estebanmorenomedia.com/services/corporate-event-videographer-miami",
  "https://estebanmorenomedia.com/services/corporate-training-video-editing-miami",
  "https://estebanmorenomedia.com/services/corporate-video-editing-weston-fl",
  "https://estebanmorenomedia.com/services/corporate-video-production-brickell",
  "https://estebanmorenomedia.com/services/cosmetic-dentistry-video-marketing-miami",
  "https://estebanmorenomedia.com/services/creative-video-production-wynwood",
  "https://estebanmorenomedia.com/services/crowdfunding-video-editor-miami",
  "https://estebanmorenomedia.com/services/dental-video-marketing-south-florida",
  "https://estebanmorenomedia.com/services/drone-video-editing-service-miami",
  "https://estebanmorenomedia.com/services/fitness-gym-video-marketing-miami",
  "https://estebanmorenomedia.com/services/headshot-photographer-miami",
  "https://estebanmorenomedia.com/services/hire-remote-video-editor",
  "https://estebanmorenomedia.com/services/hotel-hospitality-video-production-miami",
  "https://estebanmorenomedia.com/services/real-estate-reels-video-editor-south-florida",
  "https://estebanmorenomedia.com/services/interview-video-editing-service",
  "https://estebanmorenomedia.com/services/jewelry-product-photography-miami",
  "https://estebanmorenomedia.com/services/med-spa-video-marketing-south-florida",
  "https://estebanmorenomedia.com/services/music-video-post-production-miami",
  "https://estebanmorenomedia.com/services/nightlife-event-video-editing-miami",
  "https://estebanmorenomedia.com/services/online-course-video-editing-service",
  "https://estebanmorenomedia.com/services/plastic-surgery-video-marketing-miami",
  "https://estebanmorenomedia.com/services/real-estate-drone-video-editing-miami",
  "https://estebanmorenomedia.com/services/real-estate-video-coral-gables",
  "https://estebanmorenomedia.com/services/real-estate-video-sunny-isles",
  "https://estebanmorenomedia.com/services/restaurant-promo-video-editing-miami",
  "https://estebanmorenomedia.com/services/reels-editor-fort-lauderdale",
  "https://estebanmorenomedia.com/services/reels-editor-miami",
  "https://estebanmorenomedia.com/services/short-form-video-editor-miami",
  "https://estebanmorenomedia.com/services/small-business-video-hollywood-fl",
  "https://estebanmorenomedia.com/services/small-business-video-pembroke-pines",
  "https://estebanmorenomedia.com/services/small-business-video-production-miami",
  "https://estebanmorenomedia.com/services/tiktok-ad-video-editor-miami",
  "https://estebanmorenomedia.com/services/ugc-video-editor-ecommerce",
  "https://estebanmorenomedia.com/services/video-editing-miami-beach",
  "https://estebanmorenomedia.com/services/video-editing-palm-beach-gardens",
  "https://estebanmorenomedia.com/services/video-editing-west-palm-beach",
  "https://estebanmorenomedia.com/services/video-podcast-editing-service-miami",
  "https://estebanmorenomedia.com/services/video-production-fort-lauderdale",
  "https://estebanmorenomedia.com/services/video-production-delray-beach",
  "https://estebanmorenomedia.com/services/video-production-doral-miami",
  "https://estebanmorenomedia.com/services/wealth-management-video-production-miami",
  "https://estebanmorenomedia.com/services/webinar-clip-editing-service",
  "https://estebanmorenomedia.com/services/website-design-fort-lauderdale",
  "https://estebanmorenomedia.com/services/wellness-spa-video-marketing-miami",
  "https://estebanmorenomedia.com/services/yacht-charter-video-marketing-miami",
  "https://estebanmorenomedia.com/services/yacht-hospitality-video-fort-lauderdale",
  // Added 2026-10-10 by owner decision: the 26 indexable, self-canonical pages
  // that were not in the sitemap (growth systems, daily tools, case-study hubs,
  // /lens, /fort-lauderdale).
  "https://estebanmorenomedia.com/services/conversion-websites",
  "https://estebanmorenomedia.com/es/sitios-web-de-conversion",
  "https://estebanmorenomedia.com/services/ai-lead-capture-automation",
  "https://estebanmorenomedia.com/es/captura-y-automatizacion-de-clientes-con-ia",
  "https://estebanmorenomedia.com/services/local-presence-seo",
  "https://estebanmorenomedia.com/es/presencia-local-seo",
  "https://estebanmorenomedia.com/services/growth-funnel-audit",
  "https://estebanmorenomedia.com/es/auditoria-de-funnel-y-datos",
  "https://estebanmorenomedia.com/services/custom-operations-automation",
  "https://estebanmorenomedia.com/es/automatizacion-de-operaciones",
  "https://estebanmorenomedia.com/services/creative-production",
  "https://estebanmorenomedia.com/es/produccion-creativa",
  "https://estebanmorenomedia.com/daily-publish-prompt",
  "https://estebanmorenomedia.com/es/prompt-de-publicacion-diaria",
  "https://estebanmorenomedia.com/daily-hook-planner",
  "https://estebanmorenomedia.com/es/planificador-de-ganchos-de-video",
  "https://estebanmorenomedia.com/daily-shot-list-planner",
  "https://estebanmorenomedia.com/es/planificador-de-tomas-de-video",
  "https://estebanmorenomedia.com/daily-script-pacing-calculator",
  "https://estebanmorenomedia.com/es/calculadora-de-ritmo-de-video",
  "https://estebanmorenomedia.com/daily-script-timer",
  "https://estebanmorenomedia.com/es/temporizador-de-guiones-de-video",
  "https://estebanmorenomedia.com/case-studies",
  "https://estebanmorenomedia.com/es/casos-de-estudio",
  "https://estebanmorenomedia.com/lens",
  "https://estebanmorenomedia.com/fort-lauderdale",
  "https://estebanmorenomedia.com/services/med-spa-plastic-surgeon-video-miami",
  "https://estebanmorenomedia.com/es/video-para-med-spas-y-cirujanos-plasticos-miami",
  "https://estebanmorenomedia.com/services/contractor-video-marketing-florida",
  "https://estebanmorenomedia.com/es/video-marketing-para-contratistas-florida",
  "https://estebanmorenomedia.com/services/quinceanera-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-de-quinceaneras-miami",
  "https://estebanmorenomedia.com/services/multicam-podcast-video-production-miami",
  "https://estebanmorenomedia.com/es/produccion-de-podcast-con-multicamara-miami",
  "https://estebanmorenomedia.com/services/personal-injury-lawyer-video-miami",
  "https://estebanmorenomedia.com/es/video-para-abogados-de-lesiones-personales-miami",
  "https://estebanmorenomedia.com/services/private-school-admissions-video-miami",
  "https://estebanmorenomedia.com/es/video-de-admisiones-para-colegios-privados-miami",
  "https://estebanmorenomedia.com/services/exotic-car-rental-video-miami",
  "https://estebanmorenomedia.com/es/video-para-agencias-de-carros-exoticos-miami",
  "https://estebanmorenomedia.com/services/car-dealership-video-marketing-south-florida",
  "https://estebanmorenomedia.com/es/marketing-de-video-para-concesionarios-south-florida",
  "https://estebanmorenomedia.com/services/boat-show-exhibitor-video-fort-lauderdale",
  "https://estebanmorenomedia.com/es/video-para-expositores-del-boat-show-fort-lauderdale",
  "https://estebanmorenomedia.com/services/art-basel-miami-art-week-video",
  "https://estebanmorenomedia.com/es/cobertura-de-video-art-basel-miami-art-week",
  "https://estebanmorenomedia.com/services/private-aviation-video-production-miami",
  "https://estebanmorenomedia.com/es/video-para-aviacion-privada-y-jets-miami",
  "https://estebanmorenomedia.com/services/equestrian-polo-videographer-wellington",
  "https://estebanmorenomedia.com/es/videografo-de-polo-y-equitacion-wellington",
  "https://estebanmorenomedia.com/services/yacht-refit-boatyard-video-fort-lauderdale",
  "https://estebanmorenomedia.com/es/video-para-astilleros-y-reparacion-de-yates-fort-lauderdale",
  "https://estebanmorenomedia.com/services/country-club-golf-community-video-palm-beach",
  "https://estebanmorenomedia.com/es/video-para-clubes-de-golf-y-country-clubs-palm-beach",
  "https://estebanmorenomedia.com/services/luxury-pool-builder-video-marketing-south-florida",
  "https://estebanmorenomedia.com/es/video-marketing-para-constructores-de-piscinas-south-florida",
  "https://estebanmorenomedia.com/services/regenerative-medicine-stem-cell-video-miami",
  "https://estebanmorenomedia.com/es/video-para-clinicas-de-medicina-regenerativa-miami",
  "https://estebanmorenomedia.com/services/b2b-client-case-study-video-production-miami",
  "https://estebanmorenomedia.com/es/produccion-de-casos-de-estudio-en-video-para-empresas-miami",
  "https://estebanmorenomedia.com/services/interior-design-millwork-video-miami",
  "https://estebanmorenomedia.com/es/video-para-disenadores-de-interiores-y-ebanisteria-miami",
  "https://estebanmorenomedia.com/services/estate-planning-attorney-video-boca-raton",
  "https://estebanmorenomedia.com/es/video-para-abogados-de-planificacion-patrimonial-boca-raton",
  "https://estebanmorenomedia.com/services/boutique-hotel-resort-video-miami-beach",
  "https://estebanmorenomedia.com/es/video-marketing-para-hoteles-boutique-miami-beach",
  "https://estebanmorenomedia.com/services/multicam-panel-discussion-video-miami",
  "https://estebanmorenomedia.com/es/video-para-paneles-y-conferencias-multicamara-miami",
  "https://estebanmorenomedia.com/services/corporate-town-hall-video-south-florida",
  "https://estebanmorenomedia.com/es/video-para-asambleas-corporativas-south-florida",
  "https://estebanmorenomedia.com/services/executive-retreat-videographer-florida-keys",
  "https://estebanmorenomedia.com/es/videografo-para-retiros-ejecutivos-florida-keys",
  "https://estebanmorenomedia.com/services/brand-activation-videographer-miami",
  "https://estebanmorenomedia.com/es/videografo-para-activacion-de-marca-miami",
  "https://estebanmorenomedia.com/services/pre-construction-sales-gallery-video-miami",
  "https://estebanmorenomedia.com/es/video-para-salas-de-ventas-de-preventa-miami",
  "https://estebanmorenomedia.com/services/commercial-office-leasing-video-south-florida",
  "https://estebanmorenomedia.com/es/video-para-alquiler-de-oficinas-comerciales-south-florida",
  "https://estebanmorenomedia.com/services/cosmetic-dentistry-veneers-video-miami",
  "https://estebanmorenomedia.com/es/video-para-odontologia-cosmetica-y-carillas-miami",
  "https://estebanmorenomedia.com/services/concierge-doctor-video-palm-beach",
  "https://estebanmorenomedia.com/es/video-para-medicos-concierge-y-clinicas-privadas-palm-beach",
  "https://estebanmorenomedia.com/services/bar-bat-mitzvah-videographer-boca-raton",
  "https://estebanmorenomedia.com/es/video-para-bar-y-bat-mitzvah-boca-raton",
  "https://estebanmorenomedia.com/services/destination-wedding-videographer-palm-beach",
  "https://estebanmorenomedia.com/es/videografo-para-bodas-de-destino-palm-beach",
  "https://estebanmorenomedia.com/services/online-course-video-production-miami",
  "https://estebanmorenomedia.com/es/produccion-de-video-para-cursos-online-miami",
  "https://estebanmorenomedia.com/services/vsl-direct-response-video-editing",
  "https://estebanmorenomedia.com/es/edicion-de-video-para-cartas-de-venta-vsl",
  "https://estebanmorenomedia.com/services/monthly-video-repurposing-retainer",
  "https://estebanmorenomedia.com/es/retenedor-mensual-de-reutilizacion-de-video",
  "https://estebanmorenomedia.com/services/b2b-saas-explainer-video-miami",
  "https://estebanmorenomedia.com/es/video-explicativo-de-software-saas-miami",
  "https://estebanmorenomedia.com/services/executive-linkedin-video-series-miami",
  "https://estebanmorenomedia.com/es/serie-de-video-para-linkedin-ejecutivo-miami",
  "https://estebanmorenomedia.com/services/youtube-long-form-video-editing",
  "https://estebanmorenomedia.com/es/edicion-de-video-largo-para-youtube",
  "https://estebanmorenomedia.com/services/product-unboxing-demo-video-south-florida",
  "https://estebanmorenomedia.com/es/video-de-unboxing-y-demostracion-de-producto-south-florida",
  "https://estebanmorenomedia.com/services/airbnb-luxe-vacation-rental-video-miami-beach",
  "https://estebanmorenomedia.com/es/video-para-alquileres-de-lujo-y-airbnb-luxe-miami-beach",
  "https://estebanmorenomedia.com/services/waterfront-restaurant-video-fort-lauderdale",
  "https://estebanmorenomedia.com/es/video-para-restaurantes-frente-al-agua-fort-lauderdale",
  "https://estebanmorenomedia.com/services/marina-facility-video-fort-lauderdale",
  "https://estebanmorenomedia.com/es/video-comercial-para-marinas-fort-lauderdale",
];

const WATCH_SET_EXPANSION_SCHEMA =
  "esteban-media.index-watch-set-expansion.v1";

const MANAGED_START = "<!-- esteban-media:index-watch:start -->";
const MANAGED_END = "<!-- esteban-media:index-watch:end -->";
const NOTE_DESCRIPTION = `Automated three-times-weekly Search Console performance and indexed-version coverage for the fixed ${WATCH_URLS.length}-URL sitemap set.`;
const DEFAULT_STATE_DIR = join(
  homedir(),
  ".local/state/esteban-media-index-watch",
);
const DEFAULT_NOTE_PATH = join(
  homedir(),
  "obsidian-wiki/client-esteban-media/wiki/esteban-media-index-watch.md",
);
const DEFAULT_TOKEN_PATH = join(
  homedir(),
  ".config/geebs/google_oauth_webmasters_token.json",
);
const REQUEST_TIMEOUT_MS = 30_000;
const LOCK_STALE_MS = 30 * 60 * 1_000;
const HISTORY_LIMIT = 26;
const NOTE_HISTORY_LIMIT = 12;

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function isoDateInTimeZone(date, timeZone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function shiftIsoDate(value, days) {
  const [year, month, day] = value.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return isoDate(shifted);
}

export function defaultRange(now = new Date()) {
  const pacificToday = isoDateInTimeZone(now, "America/Los_Angeles");
  const endDate = shiftIsoDate(pacificToday, -1);
  return { startDate: shiftIsoDate(endDate, -27), endDate };
}

function localRunDate(now = new Date()) {
  return isoDateInTimeZone(now, "America/New_York");
}

function parseArgs(argv = process.argv.slice(2)) {
  const command = argv.find((arg) => !arg.startsWith("--")) || "run";
  const findValue = (name) => {
    const prefix = `--${name}=`;
    return argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
  };
  const now = new Date();
  const range = defaultRange(now);

  return {
    command,
    dryRun: command === "dry-run",
    force: argv.includes("--force"),
    notify: !argv.includes("--no-notify"),
    startDate: findValue("start") || range.startDate,
    endDate: findValue("end") || range.endDate,
    runDate: findValue("run-date") || localRunDate(now),
    runId: findValue("run-id") || now.toISOString(),
    stateDir:
      findValue("state-dir") ||
      process.env.ESTEBAN_MEDIA_INDEX_WATCH_STATE_DIR ||
      DEFAULT_STATE_DIR,
    notePath:
      findValue("note") ||
      process.env.ESTEBAN_MEDIA_INDEX_WATCH_NOTE ||
      DEFAULT_NOTE_PATH,
    tokenPath:
      findValue("token") || process.env.GSC_TOKEN_PATH || DEFAULT_TOKEN_PATH,
  };
}

function normalizeUrl(value) {
  const url = new URL(value);
  url.hash = "";
  if (url.pathname !== "/") {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }
  return url.href;
}

export function watchedUrlHash(urls = WATCH_URLS) {
  return createHash("sha256")
    .update([...urls].map(normalizeUrl).sort().join("\n"))
    .digest("hex");
}

function decodeXmlText(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

export function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    normalizeUrl(decodeXmlText(match[1].trim())),
  );
}

export function validateWatchedSitemap(urls, expected = WATCH_URLS) {
  const normalized = urls.map(normalizeUrl);
  const expectedNormalized = expected.map(normalizeUrl);
  const unique = new Set(normalized);
  const actualSorted = [...unique].sort();
  const expectedSorted = [...new Set(expectedNormalized)].sort();

  if (normalized.length !== unique.size) {
    throw new Error("Live sitemap contains duplicate URLs");
  }
  if (actualSorted.length !== expectedSorted.length) {
    throw new Error(
      `Live sitemap URL count ${actualSorted.length} does not match watched count ${expectedSorted.length}`,
    );
  }
  const missing = expectedSorted.filter((url) => !unique.has(url));
  const unexpected = actualSorted.filter(
    (url) => !expectedSorted.includes(url),
  );
  if (missing.length || unexpected.length) {
    throw new Error(
      `Live sitemap drifted from the fixed watch set (missing: ${missing.join(", ") || "none"}; unexpected: ${unexpected.join(", ") || "none"})`,
    );
  }
  return {
    count: actualSorted.length,
    hash: watchedUrlHash(actualSorted),
    urls: actualSorted,
  };
}

function errorDescription(payload, fallback) {
  return (
    payload?.error?.message ||
    payload?.error_description ||
    (typeof payload?.error === "string" ? payload.error : "") ||
    fallback
  );
}

export function secretSafeError(error) {
  return String(error?.message || error || "Unknown error")
    .replace(/Bearer\s+[^\s]+/gi, "Bearer [redacted]")
    .replace(/(access_token|refresh_token|client_secret)=?[^\s&,}]*/gi, "$1=[redacted]")
    .slice(0, 2_000);
}

async function delay(milliseconds) {
  await new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function isTransientTransportError(error) {
  return error?.name === "AbortError" || error?.name === "TypeError";
}

export async function requestJson(
  url,
  options,
  {
    fetchImpl = fetch,
    label = "Request",
    attempts = 3,
    timeoutMs = REQUEST_TIMEOUT_MS,
    sleep = delay,
  } = {},
) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, {
        ...options,
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => ({}));
      if (response.ok && !payload?.error) {
        return payload;
      }
      const message = errorDescription(payload, `HTTP ${response.status}`);
      const retryable = response.status === 429 || response.status >= 500;
      lastError = new Error(`${label} failed: ${message}`);
      if (!retryable || attempt === attempts) {
        throw lastError;
      }
    } catch (error) {
      const retryable = isTransientTransportError(error);
      lastError = error?.name === "AbortError"
        ? new Error(`${label} timed out after ${timeoutMs}ms`)
        : error;
      if (!retryable || attempt === attempts) {
        throw lastError;
      }
    } finally {
      clearTimeout(timer);
    }
    await sleep(500 * 2 ** (attempt - 1));
  }
  throw lastError || new Error(`${label} failed`);
}

export async function requestText(
  url,
  {
    fetchImpl = fetch,
    label = "Request",
    attempts = 3,
    timeoutMs = REQUEST_TIMEOUT_MS,
    sleep = delay,
  } = {},
) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, { signal: controller.signal });
      const body = await response.text();
      if (response.ok) {
        return body;
      }
      const retryable = response.status === 429 || response.status >= 500;
      lastError = new Error(`${label} failed: HTTP ${response.status}`);
      if (!retryable || attempt === attempts) {
        throw lastError;
      }
    } catch (error) {
      const retryable = isTransientTransportError(error);
      lastError = error?.name === "AbortError"
        ? new Error(`${label} timed out after ${timeoutMs}ms`)
        : error;
      if (!retryable || attempt === attempts) {
        throw lastError;
      }
    } finally {
      clearTimeout(timer);
    }
    await sleep(500 * 2 ** (attempt - 1));
  }
  throw lastError || new Error(`${label} failed`);
}

function loadToken(tokenPath) {
  const token = JSON.parse(readFileSync(tokenPath, "utf8"));
  for (const field of ["client_id", "client_secret", "refresh_token"]) {
    if (!token[field]) {
      throw new Error(`Search Console credential file is missing ${field}`);
    }
  }
  return token;
}

async function refreshAccessToken(token, dependencies = {}) {
  const payload = await requestJson(
    token.token_uri || "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: token.client_id,
        client_secret: token.client_secret,
        refresh_token: token.refresh_token,
        grant_type: "refresh_token",
      }).toString(),
    },
    { ...dependencies, label: "Search Console credential refresh" },
  );
  if (!payload.access_token) {
    throw new Error("Search Console credential refresh returned no access token");
  }
  return payload.access_token;
}

function authHeaders(accessToken) {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

async function verifySiteAccess(accessToken, dependencies = {}) {
  const payload = await requestJson(
    "https://www.googleapis.com/webmasters/v3/sites",
    { headers: authHeaders(accessToken) },
    { ...dependencies, label: "Search Console site access check" },
  );
  const site = (payload.siteEntry || []).find(
    (entry) => entry.siteUrl === SITE_URL,
  );
  if (!site || site.permissionLevel === "siteUnverifiedUser") {
    throw new Error(`Search Console access is unavailable for ${SITE_URL}`);
  }
  return site.permissionLevel || "unknown";
}

async function querySearchAnalytics(
  accessToken,
  { startDate, endDate, dimensions = [], dataState = "all" },
  dependencies = {},
) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    SITE_URL,
  )}/searchAnalytics/query`;
  return requestJson(
    endpoint,
    {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions,
        type: "web",
        aggregationType: dimensions.includes("page") ? "auto" : "byProperty",
        rowLimit: 25_000,
        dataState,
      }),
    },
    { ...dependencies, label: "Search Console performance query" },
  );
}

function numberOrZero(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function rounded(value) {
  return Number(Number(value).toFixed(4));
}

function totalsFromResponse(payload) {
  const row = payload.rows?.[0];
  if (!row) {
    return {
      observed: false,
      clicks: 0,
      impressions: 0,
      ctr: null,
      position: null,
    };
  }
  return {
    observed: true,
    clicks: numberOrZero(row.clicks),
    impressions: numberOrZero(row.impressions),
    ctr: rounded(numberOrZero(row.ctr)),
    position: rounded(numberOrZero(row.position)),
  };
}

export function watchedPageRows(payload, watchedUrls = WATCH_URLS) {
  const rows = new Map(
    (payload.rows || []).map((row) => [normalizeUrl(row.keys?.[0] || SITE_URL), row]),
  );
  return watchedUrls.map((url) => {
    const normalizedUrl = normalizeUrl(url);
    const row = rows.get(normalizedUrl);
    return {
      url: normalizedUrl,
      observed: Boolean(row),
      clicks: numberOrZero(row?.clicks),
      impressions: numberOrZero(row?.impressions),
      ctr: row ? rounded(numberOrZero(row.ctr)) : null,
      position: row ? rounded(numberOrZero(row.position)) : null,
    };
  });
}

function dailyRows(payload) {
  return (payload.rows || []).map((row) => ({
    date: row.keys?.[0] || "",
    clicks: numberOrZero(row.clicks),
    impressions: numberOrZero(row.impressions),
    ctr: rounded(numberOrZero(row.ctr)),
    position: rounded(numberOrZero(row.position)),
  }));
}

async function inspectUrl(accessToken, url, dependencies = {}) {
  const payload = await requestJson(
    "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
    {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify({
        inspectionUrl: url,
        siteUrl: SITE_URL,
        languageCode: "en-US",
      }),
    },
    { ...dependencies, label: `Search Console URL inspection (${url})` },
  );
  const result = payload.inspectionResult?.indexStatusResult;
  if (!result) {
    throw new Error(`URL inspection returned no index status for ${url}`);
  }
  const googleCanonical = result.googleCanonical || null;
  const userCanonical = result.userCanonical || null;
  return {
    url,
    verdict: result.verdict || "VERDICT_UNSPECIFIED",
    coverageState: result.coverageState || "Unknown",
    indexingState: result.indexingState || "INDEXING_STATE_UNSPECIFIED",
    pageFetchState: result.pageFetchState || "PAGE_FETCH_STATE_UNSPECIFIED",
    robotsTxtState: result.robotsTxtState || "ROBOTS_TXT_STATE_UNSPECIFIED",
    lastCrawlTime: result.lastCrawlTime || null,
    googleCanonical,
    userCanonical,
    canonicalMismatch: Boolean(
      (googleCanonical && normalizeUrl(googleCanonical) !== normalizeUrl(url)) ||
        (userCanonical && normalizeUrl(userCanonical) !== normalizeUrl(url)),
    ),
  };
}

async function inspectUrls(
  accessToken,
  urls,
  dependencies = {},
  concurrency = 4,
) {
  const results = new Array(urls.length);
  let cursor = 0;
  async function worker() {
    while (cursor < urls.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await inspectUrl(
        accessToken,
        urls[index],
        dependencies,
      );
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, urls.length) }, () => worker()),
  );
  return results;
}

function inspectionCounts(pages) {
  const counts = { pass: 0, neutral: 0, fail: 0, unknown: 0 };
  for (const page of pages) {
    if (page.verdict === "PASS") counts.pass += 1;
    else if (page.verdict === "NEUTRAL") counts.neutral += 1;
    else if (page.verdict === "FAIL") counts.fail += 1;
    else counts.unknown += 1;
  }
  return counts;
}

function eventId(parts) {
  return createHash("sha256").update(parts.join("\n")).digest("hex").slice(0, 20);
}

function previousConfirmedVerdict(previousState, url) {
  if (Object.hasOwn(previousState?.confirmedVerdicts || {}, url)) {
    return previousState.confirmedVerdicts[url];
  }
  return previousState?.latest?.inspection?.pages?.find(
    (page) => page.url === url,
  )?.verdict;
}

function daysBetween(olderIso, newerIso) {
  const older = Date.parse(olderIso || "");
  const newer = Date.parse(newerIso || "");
  if (!Number.isFinite(older) || !Number.isFinite(newer) || newer < older) {
    return 0;
  }
  return Math.floor((newer - older) / 86_400_000);
}

function previousNeutralWatch(previousState, url) {
  const record = previousState?.neutralWatch?.[url];
  if (
    record &&
    record.url === url &&
    typeof record.firstSeenAt === "string" &&
    typeof record.lastSeenAt === "string"
  ) {
    return record;
  }
  return null;
}

function isAlertEvent(alert) {
  return (
    typeof alert?.id === "string" &&
    typeof alert?.type === "string" &&
    typeof alert?.message === "string"
  );
}

function isRenderableHistoryEntry(entry) {
  return (
    typeof entry?.runId === "string" &&
    typeof entry?.generatedAt === "string" &&
    Number.isFinite(entry?.searchAnalytics?.finalPropertyTotals?.clicks) &&
    Number.isFinite(entry?.searchAnalytics?.finalPropertyTotals?.impressions) &&
    Number.isFinite(
      entry?.searchAnalytics?.allDataPropertyTotals?.impressions,
    ) &&
    Number.isFinite(entry?.inspection?.counts?.pass) &&
    Array.isArray(entry?.alerts) &&
    entry.alerts.every(isAlertEvent)
  );
}

function historyEntryWatchCount(entry) {
  const counts = entry?.inspection?.counts;
  const values = [
    counts?.pass,
    counts?.neutral,
    counts?.fail,
    counts?.unknown,
  ];
  if (values.every((value) => Number.isInteger(value) && value >= 0)) {
    return values.reduce((total, value) => total + value, 0);
  }
  return Array.isArray(entry?.inspection?.pages)
    ? entry.inspection.pages.length
    : 0;
}

export function detectAlerts(previousState, snapshot) {
  const alerts = [];
  const observedPages = snapshot.searchAnalytics.pages.filter(
    (page) => page.impressions > 0,
  );
  const propertyImpressions =
    snapshot.searchAnalytics.allDataPropertyTotals.impressions;
  if (
    !previousState?.everImpressions &&
    (propertyImpressions > 0 || observedPages.length)
  ) {
    const observedImpressions = observedPages.reduce(
      (total, page) => total + page.impressions,
      0,
    );
    const detail = observedPages.length
      ? `${observedImpressions} page-grouped impressions across ${observedPages.length} watched URLs; all-data property total ${propertyImpressions}.`
      : `${propertyImpressions} all-data property impressions; Search Console returned no watched-page row.`;
    alerts.push({
      id: eventId(["first_impressions", snapshot.runId]),
      type: "first_impressions",
      severity: "milestone",
      observedAt: snapshot.generatedAt,
      message: `First observed Search Console impressions: ${detail}`,
      urls: observedPages.map((page) => page.url),
    });
  }

  for (const page of snapshot.inspection.pages) {
    const priorVerdict = previousConfirmedVerdict(previousState, page.url);
    if (
      priorVerdict === "PASS" &&
      (page.verdict === "NEUTRAL" || page.verdict === "FAIL")
    ) {
      alerts.push({
        id: eventId([
          "deindexed",
          snapshot.runId,
          page.url,
          priorVerdict,
          page.verdict,
          page.coverageState,
        ]),
        type: "deindexed",
        severity: "urgent",
        observedAt: snapshot.generatedAt,
        message: `${new URL(page.url).pathname} changed from indexed to ${page.verdict}: ${page.coverageState}.`,
        url: page.url,
        fromVerdict: priorVerdict,
        toVerdict: page.verdict,
      });
    } else if (
      (priorVerdict === "NEUTRAL" || priorVerdict === "FAIL") &&
      page.verdict === "PASS"
    ) {
      alerts.push({
        id: eventId([
          "reindexed",
          snapshot.runId,
          page.url,
          priorVerdict,
          page.verdict,
        ]),
        type: "reindexed",
        severity: "recovery",
        observedAt: snapshot.generatedAt,
        message: `${new URL(page.url).pathname} returned to indexed status.`,
        url: page.url,
        fromVerdict: priorVerdict,
        toVerdict: page.verdict,
      });
    }

    if (page.verdict === "NEUTRAL") {
      const watch = previousNeutralWatch(previousState, page.url);
      const firstSeenAt = watch?.firstSeenAt || snapshot.generatedAt;
      const neutralDays = daysBetween(firstSeenAt, snapshot.generatedAt);
      if (neutralDays >= 7 && watch?.alertedAt !== snapshot.generatedAt) {
        alerts.push({
          id: eventId([
            "neutral_seven_day_watch",
            page.url,
            firstSeenAt,
            snapshot.generatedAt,
            page.coverageState,
          ]),
          type: "neutral_seven_day_watch",
          severity: "warning",
          observedAt: snapshot.generatedAt,
          message: `${new URL(page.url).pathname} has remained neutral/excluded for ${neutralDays} day(s): ${page.coverageState}. Review the page, links, sitemap inclusion, and whether it still deserves index-watch attention.`,
          url: page.url,
          firstSeenAt,
          neutralDays,
          coverageState: page.coverageState,
        });
      }
    }
  }
  return alerts;
}

function markdownCell(value) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function percent(value) {
  return value === null ? "—" : `${(value * 100).toFixed(2)}%`;
}

function pathLabel(url) {
  return new URL(url).pathname;
}

export function renderManagedBlock(state) {
  const snapshot = state.latest;
  const finalTotals = snapshot.searchAnalytics.finalPropertyTotals;
  const allDataTotals = snapshot.searchAnalytics.allDataPropertyTotals;
  const pageImpressions = snapshot.searchAnalytics.pages.reduce(
    (total, page) => total + page.impressions,
    0,
  );
  const alertLines = snapshot.alerts.length
    ? snapshot.alerts
        .map(
          (alert) =>
            `> [!${alert.type === "deindexed" ? "danger" : alert.type === "first_impressions" ? "success" : "info"}] ${markdownCell(alert.message)}`,
        )
        .join("\n")
    : "> [!info] No new first-impression, de-indexing, or recovery transition this run.";
  const pageMetrics = new Map(
    snapshot.searchAnalytics.pages.map((page) => [page.url, page]),
  );
  const coverageRows = snapshot.inspection.pages
    .map((page) => {
      const metrics = pageMetrics.get(page.url);
      return `| ${markdownCell(pathLabel(page.url))} | ${markdownCell(page.verdict)} | ${markdownCell(page.coverageState)} | ${metrics?.clicks ?? 0} | ${metrics?.impressions ?? 0} | ${markdownCell(page.lastCrawlTime)} | ${page.canonicalMismatch ? "yes" : "no"} |`;
    })
    .join("\n");
  const staleNeutralRows = Object.values(state.neutralWatch || {})
    .filter((record) => record.neutralDays >= 7)
    .sort((a, b) => b.neutralDays - a.neutralDays || a.url.localeCompare(b.url))
    .map(
      (record) =>
        `| ${markdownCell(pathLabel(record.url))} | ${record.neutralDays} | ${markdownCell(record.coverageState)} | ${markdownCell(record.firstSeenAt)} | ${markdownCell(record.lastSeenAt)} |`,
    )
    .join("\n");
  const staleNeutralSection = staleNeutralRows
    ? `\n### Neutral URLs older than 7 days\n\nThese URLs are still watched, but they need a human content/indexing decision if they keep staying excluded.\n\n| URL | Days neutral | Coverage | First seen neutral | Last seen neutral |\n|---|---:|---|---|---|\n${staleNeutralRows}\n`
    : "";
  const historyRows = state.history
    .filter(isRenderableHistoryEntry)
    .slice(0, NOTE_HISTORY_LIMIT)
    .map(
      (entry) =>
        `| ${markdownCell(entry.generatedAt)} | ${entry.searchAnalytics.finalPropertyTotals.clicks} | ${entry.searchAnalytics.finalPropertyTotals.impressions} | ${entry.searchAnalytics.allDataPropertyTotals.impressions} | ${entry.inspection.counts.pass}/${historyEntryWatchCount(entry)} | ${entry.alerts.map((alert) => alert.type).join(", ") || "none"} |`,
    )
    .join("\n");

  return `${MANAGED_START}
## Latest successful run — ${snapshot.runDate}

- Generated: ${snapshot.generatedAt}
- Search Console property: \`${SITE_URL}\` (${snapshot.permissionLevel})
- Window: ${snapshot.searchAnalytics.startDate} through ${snapshot.searchAnalytics.endDate}; fresh data begins ${snapshot.searchAnalytics.firstIncompleteDate || "not reported"}
- Fixed watch set: ${state.watchUrlCount} URLs · hash \`${state.watchUrlHash.slice(0, 12)}\`
- Finalized property totals: **${finalTotals.clicks} clicks / ${finalTotals.impressions} impressions** · CTR ${percent(finalTotals.ctr)} · position ${markdownCell(finalTotals.position)}
- All-data property totals (final + fresh/incomplete): **${allDataTotals.clicks} clicks / ${allDataTotals.impressions} impressions**
- All-data watched page rows: ${pageImpressions} observed impressions across ${snapshot.searchAnalytics.pages.filter((page) => page.impressions > 0).length} URLs. This page-grouped view includes fresh/incomplete data and is intentionally not treated as the property total.
- Indexed coverage: **${snapshot.inspection.counts.pass}/${state.watchUrlCount} PASS** · ${snapshot.inspection.counts.neutral} excluded · ${snapshot.inspection.counts.fail} failed · ${snapshot.inspection.counts.unknown} unknown

${alertLines}

### Watched URLs

| URL | Verdict | Coverage | All-data clicks | All-data impressions | Last crawl | Canonical mismatch |
|---|---|---|---:|---:|---|---|
${coverageRows}
${staleNeutralSection}

### Run history

| Generated | Final clicks | Final impressions | All-data impressions | Indexed | New events |
|---|---:|---:|---:|---:|---|
${historyRows}

The loop treats only a confirmed \`PASS → NEUTRAL/FAIL\` transition as de-indexing. Missing Search Analytics rows and API failures are never de-indexing evidence.
${MANAGED_END}`;
}

function newNote(managedBlock, updatedDate) {
  return `---
title: "Esteban Media — Search Console Index Watch"
category: client-esteban-media
date: 2026-07-19
updated: ${updatedDate}
tags: [esteban-media, search-console, indexing, automation]
---

# Esteban Media — Search Console Index Watch

${NOTE_DESCRIPTION}

${managedBlock}
`;
}

function updateFrontmatterDate(content, updatedDate) {
  if (!content.startsWith("---\n")) return content;
  if (/^updated: .*$/m.test(content)) {
    return content.replace(/^updated: .*$/m, `updated: ${updatedDate}`);
  }
  return content.replace(/^---\n/, `---\nupdated: ${updatedDate}\n`);
}

export function mergeManagedNote(existing, managedBlock, updatedDate) {
  if (!existing) return newNote(managedBlock, updatedDate);
  const start = existing.indexOf(MANAGED_START);
  const end = existing.indexOf(MANAGED_END);
  if ((start === -1) !== (end === -1) || (start !== -1 && end < start)) {
    throw new Error("Index-watch note has incomplete managed markers");
  }
  const next =
    start === -1
      ? `${existing.trimEnd()}\n\n${managedBlock}\n`
      : `${existing.slice(0, start)}${managedBlock}${existing.slice(end + MANAGED_END.length)}`;
  const currentDescription = next.replace(
    /Automated three-times-weekly Search Console performance and indexed-version coverage for the fixed \d+-URL sitemap set\./,
    NOTE_DESCRIPTION,
  );
  return updateFrontmatterDate(currentDescription, updatedDate);
}

async function readJsonIfExists(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

async function readTextIfExists(path) {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

function urlsMatchInventory(urls, inventory) {
  let normalized;
  try {
    normalized = urls.map(normalizeUrl).sort();
  } catch {
    return false;
  }
  const expected = inventory.map(normalizeUrl).sort();
  return (
    normalized.length === expected.length &&
    new Set(normalized).size === expected.length &&
    normalized.every((url, index) => url === expected[index])
  );
}

function validExpansionMarker(marker) {
  return (
    marker?.schema === WATCH_SET_EXPANSION_SCHEMA &&
    marker.fromCount === LEGACY_V1_WATCH_URLS.length &&
    marker.fromHash === watchedUrlHash(LEGACY_V1_WATCH_URLS) &&
    marker.toCount === WATCH_URLS.length &&
    marker.toHash === watchedUrlHash()
  );
}

function zeroAnalyticsPage(url) {
  return {
    url,
    observed: false,
    clicks: 0,
    impressions: 0,
    ctr: null,
    position: null,
  };
}

function unconfirmedInspectionPage(url) {
  return {
    url,
    verdict: "VERDICT_UNSPECIFIED",
    coverageState: "Not inspected since watch-set expansion",
    indexingState: "INDEXING_STATE_UNSPECIFIED",
    pageFetchState: "PAGE_FETCH_STATE_UNSPECIFIED",
    robotsTxtState: "ROBOTS_TXT_STATE_UNSPECIFIED",
    lastCrawlTime: null,
    googleCanonical: null,
    userCanonical: null,
    canonicalMismatch: false,
  };
}

function migrateLegacyWatchState(state) {
  const analyticsByUrl = new Map(
    state.latest.searchAnalytics.pages.map((page) => [
      normalizeUrl(page.url),
      page,
    ]),
  );
  const inspectionByUrl = new Map(
    state.latest.inspection.pages.map((page) => [normalizeUrl(page.url), page]),
  );
  const verdictByUrl = new Map(
    Object.entries(state.confirmedVerdicts).map(([url, verdict]) => [
      normalizeUrl(url),
      verdict,
    ]),
  );
  const inspectionPages = WATCH_URLS.map(
    (url) => inspectionByUrl.get(normalizeUrl(url)) || unconfirmedInspectionPage(url),
  );

  return {
    ...state,
    watchUrlCount: WATCH_URLS.length,
    watchUrlHash: watchedUrlHash(),
    latest: {
      ...state.latest,
      searchAnalytics: {
        ...state.latest.searchAnalytics,
        pages: WATCH_URLS.map(
          (url) => analyticsByUrl.get(normalizeUrl(url)) || zeroAnalyticsPage(url),
        ),
      },
      inspection: {
        ...state.latest.inspection,
        counts: inspectionCounts(inspectionPages),
        pages: inspectionPages,
      },
    },
    confirmedVerdicts: Object.fromEntries(
      WATCH_URLS.map((url) => [
        url,
        verdictByUrl.get(normalizeUrl(url)) ?? null,
      ]),
    ),
    watchSetExpansion: {
      schema: WATCH_SET_EXPANSION_SCHEMA,
      fromCount: LEGACY_V1_WATCH_URLS.length,
      fromHash: watchedUrlHash(LEGACY_V1_WATCH_URLS),
      toCount: WATCH_URLS.length,
      toHash: watchedUrlHash(),
    },
  };
}

function backfillNeutralWatch(state) {
  const existing = state.neutralWatch || {};
  const next = {};
  const inspectedNeutrals = new Set();
  for (const page of state.latest?.inspection?.pages || []) {
    if (page.verdict !== "NEUTRAL") continue;
    inspectedNeutrals.add(page.url);
    const previous = existing[page.url];
    const firstSeenAt =
      typeof previous?.firstSeenAt === "string" && previous.firstSeenAt
        ? previous.firstSeenAt
        : state.latest.generatedAt;
    next[page.url] = {
      url: page.url,
      firstSeenAt,
      lastSeenAt: state.latest.generatedAt,
      neutralDays: daysBetween(firstSeenAt, state.latest.generatedAt),
      coverageState: page.coverageState,
      alertedAt:
        typeof previous?.alertedAt === "string" ? previous.alertedAt : null,
    };
  }
  const changed =
    Object.keys(existing).length !== inspectedNeutrals.size ||
    Object.keys(next).some(
      (url) =>
        !existing[url] ||
        existing[url].lastSeenAt !== next[url].lastSeenAt ||
        existing[url].neutralDays !== next[url].neutralDays ||
        existing[url].coverageState !== next[url].coverageState,
    );
  return changed ? { ...state, neutralWatch: next } : state;
}

export function validatePreviousState(state) {
  if (!state) return null;
  const failures = [];
  const isCurrentInventory =
    state.watchUrlCount === WATCH_URLS.length &&
    state.watchUrlHash === watchedUrlHash();
  const isLegacyInventory =
    state.watchUrlCount === LEGACY_V1_WATCH_URLS.length &&
    state.watchUrlHash === watchedUrlHash(LEGACY_V1_WATCH_URLS);
  const expectedInventory = isLegacyInventory
    ? LEGACY_V1_WATCH_URLS
    : WATCH_URLS;
  const expectedUrls = expectedInventory.map(normalizeUrl).sort();
  const validateUrlRows = (rows, label, validateRow) => {
    if (!Array.isArray(rows)) {
      failures.push(label);
      return;
    }
    let actualUrls;
    try {
      actualUrls = rows.map((row) => normalizeUrl(row?.url)).sort();
    } catch {
      failures.push(`${label}.url`);
      return;
    }
    if (
      actualUrls.length !== expectedInventory.length ||
      new Set(actualUrls).size !== expectedInventory.length ||
      actualUrls.some((url, index) => url !== expectedUrls[index])
    ) {
      failures.push(`${label}.urls`);
    }
    if (validateRow && rows.some((row) => !validateRow(row))) {
      failures.push(`${label}.shape`);
    }
  };
  if (state.schema !== INDEX_WATCH_SCHEMA) failures.push("schema");
  if (state.siteUrl !== SITE_URL) failures.push("siteUrl");
  if (!isCurrentInventory && !isLegacyInventory) {
    if (
      state.watchUrlCount !== WATCH_URLS.length &&
      state.watchUrlCount !== LEGACY_V1_WATCH_URLS.length
    ) {
      failures.push("watchUrlCount");
    }
    failures.push("watchUrlHash");
  }
  if (
    state.watchSetExpansion !== undefined &&
    (!isCurrentInventory || !validExpansionMarker(state.watchSetExpansion))
  ) {
    failures.push("watchSetExpansion");
  }
  if (!state.latest || typeof state.latest !== "object") {
    failures.push("latest");
  } else {
    for (const field of ["runId", "runDate", "generatedAt"]) {
      if (typeof state.latest[field] !== "string" || !state.latest[field]) {
        failures.push(`latest.${field}`);
      }
    }
    const expectedLiveSitemapHash = watchedUrlHash(expectedInventory);
    let validatedLiveSitemap = null;
    try {
      validatedLiveSitemap = validateWatchedSitemap(
        state.latest.liveSitemap?.urls || [],
        expectedInventory,
      );
    } catch {
      failures.push("latest.liveSitemap.urls");
    }
    if (state.latest.liveSitemap?.count !== expectedInventory.length) {
      failures.push("latest.liveSitemap.count");
    }
    if (
      state.latest.liveSitemap?.hash !== expectedLiveSitemapHash ||
      (validatedLiveSitemap &&
        validatedLiveSitemap.hash !== expectedLiveSitemapHash)
    ) {
      failures.push("latest.liveSitemap.hash");
    }
    validateUrlRows(
      state.latest.inspection?.pages,
      "latest.inspection.pages",
      (row) =>
        new Set([
          "PASS",
          "NEUTRAL",
          "FAIL",
          "PARTIAL",
          "VERDICT_UNSPECIFIED",
        ]).has(row?.verdict) && typeof row?.coverageState === "string",
    );
    const counts = state.latest.inspection?.counts;
    const countValues = [
      counts?.pass,
      counts?.neutral,
      counts?.fail,
      counts?.unknown,
    ];
    if (
      countValues.some(
        (value) => !Number.isInteger(value) || value < 0,
      ) ||
      countValues.reduce((total, value) => total + value, 0) !==
        expectedInventory.length
    ) {
      failures.push("latest.inspection.counts");
    } else if (Array.isArray(state.latest.inspection?.pages)) {
      const recomputed = inspectionCounts(state.latest.inspection.pages);
      if (
        Object.keys(recomputed).some(
          (key) => recomputed[key] !== counts[key],
        )
      ) {
        failures.push("latest.inspection.counts.mismatch");
      }
    }
    validateUrlRows(
      state.latest.searchAnalytics?.pages,
      "latest.searchAnalytics.pages",
      (row) =>
        Number.isFinite(row?.clicks) &&
        Number.isFinite(row?.impressions) &&
        row.clicks >= 0 &&
        row.impressions >= 0,
    );
    if (
      !Number.isFinite(
        state.latest.searchAnalytics?.allDataPropertyTotals?.impressions,
      ) ||
      !Number.isFinite(
        state.latest.searchAnalytics?.finalPropertyTotals?.impressions,
      )
    ) {
      failures.push("latest.searchAnalytics.totals");
    }
    if (
      !Array.isArray(state.latest.alerts) ||
      !state.latest.alerts.every(isAlertEvent)
    ) {
      failures.push("latest.alerts");
    }
  }
  if (typeof state.everImpressions !== "boolean") {
    failures.push("everImpressions");
  }
  if (!Array.isArray(state.history)) failures.push("history");
  if (!Array.isArray(state.eventHistory)) failures.push("eventHistory");
  if (!Array.isArray(state.pendingNotifications)) {
    failures.push("pendingNotifications");
  } else if (
    state.pendingNotifications.some((alert) => !isAlertEvent(alert))
  ) {
    failures.push("pendingNotifications.shape");
  }
  const neutralWatch = state.neutralWatch || {};
  if (
    neutralWatch &&
    (typeof neutralWatch !== "object" || Array.isArray(neutralWatch))
  ) {
    failures.push("neutralWatch");
  } else {
    const neutralUrls = Object.keys(neutralWatch).sort();
    if (
      neutralUrls.length &&
      !neutralUrls.every((url) => expectedUrls.includes(normalizeUrl(url)))
    ) {
      failures.push("neutralWatch.urls");
    }
    if (
      Object.entries(neutralWatch).some(([url, record]) => {
        if (record?.url !== url) return true;
        if (typeof record.firstSeenAt !== "string" || !record.firstSeenAt) return true;
        if (typeof record.lastSeenAt !== "string" || !record.lastSeenAt) return true;
        if (!Number.isInteger(record.neutralDays) || record.neutralDays < 0) return true;
        if (typeof record.coverageState !== "string") return true;
        if (
          record.alertedAt !== undefined &&
          record.alertedAt !== null &&
          typeof record.alertedAt !== "string"
        ) {
          return true;
        }
        return false;
      })
    ) {
      failures.push("neutralWatch.shape");
    }
  }
  const confirmedVerdicts = state.confirmedVerdicts;
  if (
    !confirmedVerdicts ||
    typeof confirmedVerdicts !== "object" ||
    Array.isArray(confirmedVerdicts)
  ) {
    failures.push("confirmedVerdicts");
  } else {
    const confirmedUrls = Object.keys(confirmedVerdicts).sort();
    if (
      !urlsMatchInventory(confirmedUrls, expectedInventory)
    ) {
      failures.push("confirmedVerdicts.urls");
    }
    if (
      Object.values(confirmedVerdicts).some(
        (verdict) =>
          verdict !== null &&
          !new Set(["PASS", "NEUTRAL", "FAIL"]).has(verdict),
      )
    ) {
      failures.push("confirmedVerdicts.values");
    }
  }
  if (failures.length) {
    throw new Error(
      `Existing index-watch state failed validation: ${failures.join(", ")}`,
    );
  }
  return backfillNeutralWatch(
    isLegacyInventory ? migrateLegacyWatchState(state) : state,
  );
}

async function atomicWrite(path, content, mode = 0o600) {
  await mkdir(dirname(path), { recursive: true });
  const temporaryPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  let handle;
  try {
    handle = await open(temporaryPath, "wx", mode);
    await handle.writeFile(content);
    await handle.sync();
    await handle.close();
    handle = null;
    await chmod(temporaryPath, mode);
    await rename(temporaryPath, path);
  } catch (error) {
    await handle?.close().catch(() => {});
    await unlink(temporaryPath).catch(() => {});
    throw error;
  }
}

export async function acquireLock(
  lockPath,
  { now = Date.now(), staleMs = LOCK_STALE_MS } = {},
) {
  await mkdir(dirname(lockPath), { recursive: true });
  try {
    const handle = await open(lockPath, "wx", 0o600);
    await handle.writeFile(`${JSON.stringify({ pid: process.pid, createdAt: new Date(now).toISOString() })}\n`);
    await handle.close();
    return {
      acquired: true,
      staleRecovered: false,
      release: async () => unlink(lockPath).catch(() => {}),
    };
  } catch (error) {
    if (error?.code !== "EEXIST") throw error;
  }

  const lockStat = await stat(lockPath);
  // A lock whose owning process is gone is stale NO MATTER how recent it is.
  // Without this the 30-minute window means a killed run wedges the job for
  // half an hour, and the wedged runs return LOCKED_NOOP with exit 0 — so the
  // loop reports success while doing nothing, which is strictly worse than the
  // loud failure it replaces. Hit exactly that on 2026-08-18 after a run was
  // timed out mid-inspection.
  let ownerAlive = true;
  try {
    const owner = JSON.parse(await readFile(lockPath, "utf8"));
    if (Number.isInteger(owner?.pid) && owner.pid !== process.pid) {
      try {
        process.kill(owner.pid, 0); // signal 0 = liveness probe, sends nothing
      } catch (probeError) {
        // ESRCH = no such process. EPERM means it exists but is not ours, so
        // treat it as alive and fall back to the time-based window.
        if (probeError?.code === "ESRCH") ownerAlive = false;
      }
    }
  } catch {
    // Unreadable/!JSON lock: fall back to the age check rather than guessing.
  }
  if (ownerAlive && now - lockStat.mtimeMs <= staleMs) {
    return { acquired: false, staleRecovered: false, release: async () => {} };
  }
  await unlink(lockPath);
  const recovered = await acquireLock(lockPath, { now, staleMs });
  return { ...recovered, staleRecovered: true };
}

function notificationMessage(alert) {
  if (alert.type === "first_impressions") return alert.message;
  if (alert.type === "deindexed") return `Possible de-indexing: ${alert.message}`;
  return alert.message;
}

function notifyLocal(alert) {
  const script = `on run argv
display notification (item 1 of argv) with title (item 2 of argv)
end run`;
  const result = spawnSync(
    "/usr/bin/osascript",
    ["-e", script, notificationMessage(alert), "Esteban Media Index Watch"],
    { encoding: "utf8", timeout: 10_000 },
  );
  return {
    alertId: alert.id,
    delivered: result.status === 0,
    status: result.status,
  };
}

export function deliverPendingNotifications(
  state,
  {
    enabled = true,
    notifier = notifyLocal,
    attemptedAt = new Date().toISOString(),
    alertIds = null,
  } = {},
) {
  const pending = state.pendingNotifications || [];
  const selectedIds = alertIds ? new Set(alertIds) : null;
  const selected = selectedIds
    ? pending.filter((alert) => selectedIds.has(alert.id))
    : pending;
  if (!selected.length) {
    return { state, results: [] };
  }
  if (!enabled) {
    return {
      state,
      results: selected.map((alert) => ({
        alertId: alert.id,
        delivered: false,
        status: "disabled",
      })),
    };
  }

  const results = selected.map((alert) => {
    try {
      return notifier(alert);
    } catch {
      return { alertId: alert.id, delivered: false, status: "exception" };
    }
  });
  const resultById = new Map(
    results.map((result) => [result.alertId, result]),
  );
  const selectedAlertIds = new Set(selected.map((alert) => alert.id));
  const pendingNotifications = pending.flatMap((alert) => {
    if (!selectedAlertIds.has(alert.id)) return [alert];
    if (resultById.get(alert.id)?.delivered) return [];
    return [
      {
        ...alert,
        deliveryAttempts: numberOrZero(alert.deliveryAttempts) + 1,
        lastDeliveryAttemptAt: attemptedAt,
      },
    ];
  });
  return {
    state: { ...state, pendingNotifications },
    results,
  };
}

async function collectSnapshot(args, previousState, dependencies = {}) {
  const sitemapXml = await requestText(`${SITE_URL}sitemap.xml`, dependencies);
  const liveSitemap = validateWatchedSitemap(sitemapUrls(sitemapXml));
  const accessToken = await refreshAccessToken(
    loadToken(args.tokenPath),
    dependencies,
  );
  const permissionLevel = await verifySiteAccess(accessToken, dependencies);
  const query = { startDate: args.startDate, endDate: args.endDate };
  const [finalTotalsPayload, allDataTotalsPayload, pagePayload, dailyPayload] =
    await Promise.all([
      querySearchAnalytics(
        accessToken,
        { ...query, dataState: "final" },
        dependencies,
      ),
      querySearchAnalytics(
        accessToken,
        { ...query, dataState: "all" },
        dependencies,
      ),
      querySearchAnalytics(
        accessToken,
        { ...query, dataState: "all", dimensions: ["page"] },
        dependencies,
      ),
      querySearchAnalytics(
        accessToken,
        { ...query, dataState: "all", dimensions: ["date"] },
        dependencies,
      ),
    ]);
  let inspectionPages = await inspectUrls(
    accessToken,
    WATCH_URLS,
    dependencies,
  );

  const suspectedTransitions = inspectionPages.filter((page) => {
    return (
      previousConfirmedVerdict(previousState, page.url) === "PASS" &&
      (page.verdict === "NEUTRAL" || page.verdict === "FAIL")
    );
  });
  if (suspectedTransitions.length) {
    const confirmations = await inspectUrls(
      accessToken,
      suspectedTransitions.map((page) => page.url),
      dependencies,
      1,
    );
    const confirmed = new Map(confirmations.map((page) => [page.url, page]));
    inspectionPages = inspectionPages.map(
      (page) => confirmed.get(page.url) || page,
    );
  }

  const generatedAt = new Date().toISOString();
  const snapshot = {
    runId: args.runId,
    runDate: args.runDate,
    generatedAt,
    permissionLevel,
    liveSitemap,
    searchAnalytics: {
      startDate: args.startDate,
      endDate: args.endDate,
      firstIncompleteDate:
        dailyPayload.metadata?.first_incomplete_date || null,
      finalPropertyTotals: totalsFromResponse(finalTotalsPayload),
      allDataPropertyTotals: totalsFromResponse(allDataTotalsPayload),
      pages: watchedPageRows(pagePayload),
      daily: dailyRows(dailyPayload),
    },
    inspection: {
      counts: inspectionCounts(inspectionPages),
      pages: inspectionPages,
    },
    alerts: [],
  };
  snapshot.alerts = detectAlerts(previousState, snapshot);
  return snapshot;
}

export function buildState(previousState, snapshot) {
  const positivePage =
    snapshot.searchAnalytics.allDataPropertyTotals.impressions > 0 ||
    snapshot.searchAnalytics.pages.some((page) => page.impressions > 0);
  const history = [snapshot, ...(previousState?.history || [])]
    .filter(isRenderableHistoryEntry)
    .filter(
      (entry, index, entries) =>
        entries.findIndex((candidate) => candidate.runId === entry.runId) ===
        index,
    )
    .slice(0, HISTORY_LIMIT);
  const eventHistory = [
    ...snapshot.alerts,
    ...(previousState?.eventHistory || []),
  ]
    .filter(isAlertEvent)
    .filter(
      (event, index, events) =>
        events.findIndex((candidate) => candidate.id === event.id) === index,
    )
    .slice(0, 100);
  const firstImpressionAlert = snapshot.alerts.find(
    (alert) => alert.type === "first_impressions",
  );
  const confirmedVerdicts = Object.fromEntries(
    WATCH_URLS.map((url) => [
      url,
      previousState?.confirmedVerdicts?.[url] ?? null,
    ]),
  );
  for (const page of snapshot.inspection.pages) {
    if (new Set(["PASS", "NEUTRAL", "FAIL"]).has(page.verdict)) {
      confirmedVerdicts[page.url] = page.verdict;
    }
  }
  const latestNeutralAlerts = new Map(
    snapshot.alerts
      .filter((alert) => alert.type === "neutral_seven_day_watch" && alert.url)
      .map((alert) => [alert.url, alert]),
  );
  const neutralWatch = {};
  for (const page of snapshot.inspection.pages) {
    if (page.verdict !== "NEUTRAL") continue;
    const previous = previousNeutralWatch(previousState, page.url);
    const firstSeenAt = previous?.firstSeenAt || snapshot.generatedAt;
    const alert = latestNeutralAlerts.get(page.url);
    neutralWatch[page.url] = {
      url: page.url,
      firstSeenAt,
      lastSeenAt: snapshot.generatedAt,
      neutralDays: daysBetween(firstSeenAt, snapshot.generatedAt),
      coverageState: page.coverageState,
      alertedAt: alert?.observedAt || previous?.alertedAt || null,
    };
  }
  const pendingNotifications = [
    ...(previousState?.pendingNotifications || []),
    ...snapshot.alerts,
  ].filter(
    (alert, index, alerts) =>
      alerts.findIndex((candidate) => candidate.id === alert.id) === index,
  );

  return {
    schema: INDEX_WATCH_SCHEMA,
    updatedAt: snapshot.generatedAt,
    siteUrl: SITE_URL,
    watchUrlCount: WATCH_URLS.length,
    watchUrlHash: watchedUrlHash(),
    everImpressions: Boolean(previousState?.everImpressions || positivePage),
    firstImpressionsObservedAt:
      previousState?.firstImpressionsObservedAt ||
      firstImpressionAlert?.observedAt ||
      null,
    latest: snapshot,
    history,
    eventHistory,
    confirmedVerdicts,
    neutralWatch,
    pendingNotifications,
  };
}

function stateSummary(state, status, extra = {}) {
  return {
    status,
    schema: state.schema,
    generatedAt: state.latest.generatedAt,
    runDate: state.latest.runDate,
    siteUrl: state.siteUrl,
    watchedUrlCount: state.watchUrlCount,
    finalPropertyTotals: state.latest.searchAnalytics.finalPropertyTotals,
    allDataPropertyTotals: state.latest.searchAnalytics.allDataPropertyTotals,
    indexed: state.latest.inspection.counts,
    alerts: state.latest.alerts.map((alert) => alert.type),
    pendingNotificationCount: state.pendingNotifications?.length || 0,
    neutralWatchCount: Object.keys(state.neutralWatch || {}).length,
    watchSetExpansionPending: Boolean(state.watchSetExpansion),
    ...extra,
  };
}

async function writeLastError(args, error) {
  const path = join(args.stateDir, "last-error.json");
  const payload = {
    schema: INDEX_WATCH_SCHEMA,
    failedAt: new Date().toISOString(),
    runId: args.runId,
    message: secretSafeError(error),
  };
  await atomicWrite(path, `${JSON.stringify(payload, null, 2)}\n`);
}

export async function runIndexWatch(args, dependencies = {}) {
  await mkdir(args.stateDir, { recursive: true });
  const latestPath = join(args.stateDir, "latest.json");
  const rawPreviousState = await readJsonIfExists(latestPath);
  // validatePreviousState FAILS CLOSED on a foreign or malformed baseline, and
  // that is deliberate — its tests pin it ("fails closed for malformed or
  // foreign subset states"). Do not soften it; an unrecognised state must never
  // be silently accepted as a baseline.
  //
  // One specific case is recoverable and was handled nowhere: when WATCH_URLS
  // is legitimately REDEFINED, the persisted baseline describes a cohort that
  // is neither current nor legacy, every field mismatches, and the job can
  // never rebuild the state that would fix it. That kept this loop red for 36h+
  // while the live sitemap had already healed (269 live == 269 watched).
  //
  // Reseat only for that case, only here in the run path, never in the
  // validator. This cannot paper over a real site regression: the run still
  // calls validateWatchedSitemap against the CURRENT WATCH_URLS below, so if
  // the live sitemap genuinely disagrees, the run throws anyway.
  let previousState;
  try {
    previousState = validatePreviousState(rawPreviousState);
  } catch (validationError) {
    const storedCount = rawPreviousState?.watchUrlCount;
    const storedHash = rawPreviousState?.watchUrlHash;
    const knownCohort =
      (storedCount === WATCH_URLS.length && storedHash === watchedUrlHash()) ||
      (storedCount === LEGACY_V1_WATCH_URLS.length &&
        storedHash === watchedUrlHash(LEGACY_V1_WATCH_URLS));
    if (knownCohort) throw validationError;
    const archivePath = join(
      args.stateDir,
      `latest.orphaned-cohort-${Date.now()}.json`,
    );
    await atomicWrite(
      archivePath,
      `${JSON.stringify(rawPreviousState, null, 2)}\n`,
    );
    console.warn(
      `[index-watch] persisted baseline describes an unrecognised watch cohort ` +
        `(${storedCount} URLs) while the current inventory is ${WATCH_URLS.length}. ` +
        `Archived to ${archivePath}; starting a fresh baseline because a coverage ` +
        `trend cannot span a redefined cohort. Original: ${validationError.message}`,
    );
    previousState = null;
  }
  const previousError = await readJsonIfExists(
    join(args.stateDir, "last-error.json"),
  );

  const lock = await acquireLock(join(args.stateDir, "index-watch.lock"));
  if (!lock.acquired) {
    return {
      status: "LOCKED_NOOP",
      schema: INDEX_WATCH_SCHEMA,
      statePath: latestPath,
    };
  }

  try {
    const hadPendingNotifications =
      (previousState?.pendingNotifications?.length || 0) > 0;
    let baselineState = previousState;
    let persistedBaselineState = rawPreviousState;
    let priorDelivery = { state: previousState, results: [] };
    if (!args.dryRun && previousState) {
      const deliveryState = previousState.watchSetExpansion
        ? rawPreviousState
        : previousState;
      priorDelivery = deliverPendingNotifications(deliveryState, {
        enabled: args.notify,
        notifier: dependencies.notifier || notifyLocal,
      });
      persistedBaselineState = priorDelivery.state;
      baselineState = previousState.watchSetExpansion
        ? validatePreviousState(priorDelivery.state)
        : priorDelivery.state;
      if (priorDelivery.state !== deliveryState) {
        await atomicWrite(
          latestPath,
          `${JSON.stringify(priorDelivery.state, null, 2)}\n`,
        );
      }
    }

    if (
      !args.dryRun &&
      !args.force &&
      !previousError &&
      !baselineState?.watchSetExpansion &&
      baselineState?.latest?.runDate === args.runDate
    ) {
      const existingNote = await readTextIfExists(args.notePath);
      const expectedNote = mergeManagedNote(
        existingNote,
        renderManagedBlock(baselineState),
        baselineState.latest.runDate,
      );
      const repairedNote = expectedNote !== existingNote;
      if (repairedNote) {
        await atomicWrite(args.notePath, expectedNote, 0o644);
      }
      const replayStatus = repairedNote
        ? "REPAIRED_NOTE"
        : args.notify && hadPendingNotifications
          ? "ALERT_RETRY"
          : "ALREADY_RECORDED";
      const replaySummary = stateSummary(baselineState, replayStatus, {
        notePath: args.notePath,
        statePath: latestPath,
        notifications: priorDelivery.results,
      });
      await atomicWrite(
        join(args.stateDir, "last-run.json"),
        `${JSON.stringify(replaySummary, null, 2)}\n`,
      );
      return replaySummary;
    }

    const snapshot = await collectSnapshot(args, baselineState, dependencies);
    const state = buildState(baselineState, snapshot);
    if (args.dryRun) {
      return stateSummary(state, "DRY_RUN", {
        statePath: latestPath,
        notePath: args.notePath,
      });
    }

    const existingNote = await readTextIfExists(args.notePath);
    const managedBlock = renderManagedBlock(state);
    const nextNote = mergeManagedNote(
      existingNote,
      managedBlock,
      snapshot.runDate,
    );
    await atomicWrite(latestPath, `${JSON.stringify(state, null, 2)}\n`);
    try {
      await atomicWrite(args.notePath, nextNote, 0o644);
    } catch (error) {
      if (persistedBaselineState) {
        await atomicWrite(
          latestPath,
          `${JSON.stringify(persistedBaselineState, null, 2)}\n`,
        );
      } else {
        await unlink(latestPath).catch((unlinkError) => {
          if (unlinkError?.code !== "ENOENT") throw unlinkError;
        });
      }
      throw error;
    }

    const delivery = deliverPendingNotifications(state, {
      enabled: args.notify,
      notifier: dependencies.notifier || notifyLocal,
      alertIds: snapshot.alerts.map((alert) => alert.id),
    });
    if (delivery.state !== state) {
      await atomicWrite(
        latestPath,
        `${JSON.stringify(delivery.state, null, 2)}\n`,
      );
    }
    const summary = stateSummary(delivery.state, "PASS", {
      notePath: args.notePath,
      statePath: latestPath,
      staleLockRecovered: lock.staleRecovered,
      notifications: [...priorDelivery.results, ...delivery.results],
    });
    await atomicWrite(
      join(args.stateDir, "last-run.json"),
      `${JSON.stringify(summary, null, 2)}\n`,
    );
    await unlink(join(args.stateDir, "last-error.json")).catch((error) => {
      if (error?.code !== "ENOENT") throw error;
    });
    return summary;
  } finally {
    await lock.release();
  }
}

export function operationalStatus(state, lastError) {
  if (lastError) return "LAST_RUN_FAILED";
  return state ? "READY" : "NOT_RUN";
}

async function status(args) {
  const state = validatePreviousState(
    await readJsonIfExists(join(args.stateDir, "latest.json")),
  );
  const lastError = await readJsonIfExists(
    join(args.stateDir, "last-error.json"),
  );
  if (!state) {
    return {
      status: operationalStatus(state, lastError),
      schema: INDEX_WATCH_SCHEMA,
      statePath: join(args.stateDir, "latest.json"),
      lastError: lastError
        ? { failedAt: lastError.failedAt, message: lastError.message }
        : null,
    };
  }
  return stateSummary(state, operationalStatus(state, lastError), {
    statePath: join(args.stateDir, "latest.json"),
    notePath: args.notePath,
    lastError: lastError
      ? { failedAt: lastError.failedAt, message: lastError.message }
      : null,
  });
}

async function main() {
  const args = parseArgs();
  if (!new Set(["run", "dry-run", "status"]).has(args.command)) {
    throw new Error(`Unknown command: ${args.command}`);
  }
  if (args.command === "status") {
    console.log(JSON.stringify(await status(args), null, 2));
    return;
  }

  try {
    const result = await runIndexWatch(args);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    await writeLastError(args, error).catch(() => {});
    if (args.notify) {
      notifyLocal({
        id: eventId(["operational_error", args.runId]),
        type: "operational_error",
        message: `Index-watch run failed: ${secretSafeError(error)}`,
      });
    }
    console.error(`Index-watch error: ${secretSafeError(error)}`);
    process.exitCode = 1;
  }
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  await main();
}
