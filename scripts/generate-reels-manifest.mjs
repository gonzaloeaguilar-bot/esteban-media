import fs from "node:fs";
import path from "node:path";

const EXISTING_YOUTUBE_VIDEOS = [
  {
    id: "my-dler",
    title: "My D'ler - Animación 3D y Mockup",
    youtubeId: "vMvbC5yOzgs",
    duration: "11s",
    clipRange: "00:00 - 00:11",
    targetService: "ai-product-photography-miami",
    portfolioUrl: "https://estebanmorenomedia.com/portfolio/my-dler",
    captionEs: "🔥 Animación 3D y renderizado de producto para marcas e-commerce.\n\nTransforma tus productos státicos en videos dinámicos para anuncios.\n\n📍 Ver caso de estudio: https://estebanmorenomedia.com/portfolio/my-dler\n🧮 Calculadora de Presupuestos: https://estebanmorenomedia.com/es/calculadora",
    hashtags: "#3DAnimation #ProductDesign #VideoAds #Ecommerce #MiamiBusiness",
  },
  {
    id: "banacol",
    title: "Banacol - Video Institucional Corporativo",
    youtubeId: "DgeKWR8s80M",
    duration: "1m 48s",
    clipRange: "00:15 - 00:45",
    targetService: "corporate-training-video-editing-miami",
    portfolioUrl: "https://estebanmorenomedia.com/portfolio/banacol",
    captionEs: "💼 Posproducción de video corporativo para empresas e instituciones.\n\nMapeo de color cinemático, edición de ritmo y audio masterizado.\n\n📍 Caso completo: https://estebanmorenomedia.com/portfolio/banacol\n📊 Presupuestos corporativos: https://estebanmorenomedia.com/es/calculadora",
    hashtags: "#CorporateVideo #PostProduction #VideoEditing #SouthFlorida",
  },
  {
    id: "bar-door-monkey",
    title: "Bar Door Monkey Miami - Evento y Vida Nocturna",
    youtubeId: "m1PZOcutQHg",
    duration: "55s",
    clipRange: "00:10 - 00:35",
    targetService: "restaurant-promo-video-editing-miami",
    portfolioUrl: "https://estebanmorenomedia.com/portfolio/bar-door-monkey",
    captionEs: "🍹 Cobertura y edición dinámica para restaurantes, bares y vida nocturna en Miami.\n\nGanchos visuales diseñados para captar atención en Instagram y TikTok.\n\n📍 Ver proyecto: https://estebanmorenomedia.com/portfolio/bar-door-monkey\n📲 Edición de Reels: https://estebanmorenomedia.com/es/reels-para-negocios-miami",
    hashtags: "#MiamiNightlife #RestaurantMarketing #ReelsMiami #VideoPromo",
  },
  {
    id: "healthy-smile",
    title: "Healthy Smile Miami - Odontología y Med Spa",
    youtubeId: "YTJW6zn14S8",
    duration: "18s",
    clipRange: "00:00 - 00:18",
    targetService: "dental-video-marketing-south-florida",
    portfolioUrl: "https://estebanmorenomedia.com/portfolio/healthy-smile",
    captionEs: "🩺 Video marketing profesional para clínicas de odontología y Med Spas en South Florida.\n\nAtrae más pacientes con testimonios y tratamientos editados en alta calidad.\n\n📍 Caso de estudio: https://estebanmorenomedia.com/portfolio/healthy-smile\n🩺 Servicio Med Spa: https://estebanmorenomedia.com/services/med-spa-video-marketing-south-florida",
    hashtags: "#MedSpaMiami #DentalMarketing #HealthcareVideo #SouthFlorida",
  },
  {
    id: "homeowners",
    title: "Homeowners - Video Inmobiliario / Hipotecario",
    youtubeId: "2m3iHq0JrLM",
    duration: "23s",
    clipRange: "00:00 - 00:23",
    targetService: "real-estate-drone-video-editing-miami",
    portfolioUrl: "https://estebanmorenomedia.com/portfolio/homeowners",
    captionEs: "🏡 Edición de video promocional para agencias inmobiliarias y servicios financieros.\n\nRitmo ágil y títulos optimizados en zonas seguras 9:16.\n\n📍 Ver proyecto: https://estebanmorenomedia.com/portfolio/homeowners\n🏢 Servicio Real Estate: https://estebanmorenomedia.com/es/editor-de-video-real-estate-miami",
    hashtags: "#RealEstateVideo #MortgageMarketing #MiamiRealEstate #VideoEditor",
  },
  {
    id: "diana-jack",
    title: "Diana & Jack - Eventos y Bodas",
    youtubeId: "3tjLDtVrhG4",
    duration: "1m 12s",
    clipRange: "00:20 - 00:50",
    targetService: "event-video-editing-miami",
    portfolioUrl: "https://estebanmorenomedia.com/portfolio/diana-jack",
    captionEs: "📽️ Edición de video narrativo para eventos y bodas cinemáticas.\n\nCapturamos la emoción con corrección de color pulida y mezcla de música impecable.\n\n📍 Ver historia completa: https://estebanmorenomedia.com/portfolio/diana-jack\n✨ Servicios de edición: https://estebanmorenomedia.com/services",
    hashtags: "#WeddingVideo #EventVideography #CinematicEditing #VideoPost",
  },
  {
    id: "la-huelga",
    title: "La Huelga - Cortometraje y Ficción",
    youtubeId: "W3pA6V8bN60",
    duration: "1m 30s",
    clipRange: "00:10 - 00:40",
    targetService: "short-form-video-editor-miami",
    portfolioUrl: "https://estebanmorenomedia.com/portfolio/la-huelga",
    captionEs: "🎬 Posproducción narrativa y diseño de sonido para cortometrajes.\n\nEstructuración de escenas, corrección de color y mezcla multicanal.\n\n📍 Proyecto La Huelga: https://estebanmorenomedia.com/portfolio/la-huelga\n🚀 Evaluador de estrategia: https://estebanmorenomedia.com/assessment",
    hashtags: "#ShortFilm #Filmmaking #SoundDesign #ColorGrading #VideoEditing",
  },
  {
    id: "ml-colombia",
    title: "ML Colombia - Redes Sociales e Institucional",
    youtubeId: "n9c6m_1361w",
    duration: "1m 05s",
    clipRange: "00:05 - 00:35",
    targetService: "social-media-video-batching-miami",
    portfolioUrl: "https://estebanmorenomedia.com/portfolio/ml-colombia",
    captionEs: "📲 Edición de lotes de video para redes sociales de marcas e instituciones.\n\nConsistencia de marca, subtítulos animados y entrega rápida.\n\n📍 Ver caso completo: https://estebanmorenomedia.com/portfolio/ml-colombia\n🧮 Calcula tu lote mensual: https://estebanmorenomedia.com/es/calculadora",
    hashtags: "#SocialMediaVideo #ContentBatching #ReelsEditing #MarketingDigital",
  },
];

console.log("Generating automated Reels manifest from existing YouTube videos...");

const manifestPath = path.join(process.cwd(), "public/reels-automation-manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(EXISTING_YOUTUBE_VIDEOS, null, 2), "utf8");

console.log(`Successfully generated reels automation manifest with ${EXISTING_YOUTUBE_VIDEOS.length} items at ${manifestPath}!`);
