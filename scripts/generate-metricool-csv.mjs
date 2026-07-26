import fs from "node:fs";
import path from "node:path";

const SCHEDULED_POSTS = [
  // WEEK 1
  {
    date: "2026-08-03",
    time: "08:30",
    networks: "LinkedIn, YouTube, Instagram",
    textEs: "🔥 Animación 3D y renderizado de producto para marcas e-commerce.\n\nTransforma tus productos estáticos en videos dinámicos para anuncios.\n\n📍 Ver caso de estudio: https://estebanmorenomedia.com/portfolio/my-dler\n🧮 Calculadora de Presupuestos: https://estebanmorenomedia.com/es/calculadora\n\n#3DAnimation #ProductDesign #VideoAds #Ecommerce #MiamiBusiness",
    textEn: "🔥 3D animation & product rendering for e-commerce brands.\n\nTransform static product assets into dynamic high-converting video ads.\n\n📍 View case study: https://estebanmorenomedia.com/portfolio/my-dler\n🧮 Budget Estimator: https://estebanmorenomedia.com/calculator\n\n#3DAnimation #ProductDesign #VideoAds #Ecommerce #MiamiBusiness",
    mediaUrl: "https://www.youtube.com/watch?v=vMvbC5yOzgs",
  },
  {
    date: "2026-08-05",
    time: "08:30",
    networks: "LinkedIn, YouTube, Instagram",
    textEs: "💼 Posproducción de video corporativo para empresas e instituciones.\n\nMapeo de color cinemático, edición de ritmo y audio masterizado a -14 LUFS.\n\n📍 Caso de estudio completo: https://estebanmorenomedia.com/portfolio/banacol\n📊 Presupuestos corporativos: https://estebanmorenomedia.com/es/calculadora\n\n#CorporateVideo #PostProduction #VideoEditing #SouthFlorida #EstebanMorenoMedia",
    textEn: "💼 Corporate video post-production for companies & institutions.\n\nCinematic color grading, pacing, and -14 LUFS dialogue mastering.\n\n📍 View case study: https://estebanmorenomedia.com/portfolio/banacol\n📊 Scope your budget: https://estebanmorenomedia.com/calculator\n\n#CorporateVideo #PostProduction #VideoEditing #SouthFlorida #EstebanMorenoMedia",
    mediaUrl: "https://www.youtube.com/watch?v=DgeKWR8s80M",
  },
  {
    date: "2026-08-07",
    time: "08:30",
    networks: "LinkedIn, YouTube, Instagram",
    textEs: "🍹 Cobertura y edición dinámica para restaurantes, bares y vida nocturna en Miami.\n\nGanchos visuales diseñados para captar atención en Instagram y TikTok.\n\n📍 Ver proyecto: https://estebanmorenomedia.com/portfolio/bar-door-monkey\n📲 Edición de Reels: https://estebanmorenomedia.com/es/reels-para-negocios-miami\n\n#MiamiNightlife #RestaurantMarketing #ReelsMiami #VideoPromo",
    textEn: "🍹 Dynamic promo editing for restaurants, nightlife, and hospitality in Miami.\n\nVisual hooks designed to stop the scroll on Instagram & TikTok.\n\n📍 View project: https://estebanmorenomedia.com/portfolio/bar-door-monkey\n📲 Social Video Kit: https://estebanmorenomedia.com/resources/social-video-kit\n\n#MiamiNightlife #RestaurantMarketing #ReelsMiami #VideoPromo",
    mediaUrl: "https://www.youtube.com/watch?v=m1PZOcutQHg",
  },
  // WEEK 2
  {
    date: "2026-08-10",
    time: "08:30",
    networks: "LinkedIn, YouTube, Instagram",
    textEs: "🩺 Video marketing profesional para clínicas de odontología y Med Spas en South Florida.\n\nAtrae más pacientes con testimonios y tratamientos editados en alta calidad.\n\n📍 Caso de estudio: https://estebanmorenomedia.com/portfolio/healthy-smile\n🩺 Servicio Med Spa: https://estebanmorenomedia.com/services/med-spa-video-marketing-south-florida\n\n#MedSpaMiami #DentalMarketing #HealthcareVideo #SouthFlorida",
    textEn: "🩺 Professional video marketing for dental practices & Med Spas in South Florida.\n\nConvert viewers into patients with high-retention clinical promos.\n\n📍 View case study: https://estebanmorenomedia.com/portfolio/healthy-smile\n🩺 Med Spa Services: https://estebanmorenomedia.com/services/med-spa-video-marketing-south-florida\n\n#MedSpaMiami #DentalMarketing #HealthcareVideo #SouthFlorida",
    mediaUrl: "https://www.youtube.com/watch?v=YTJW6zn14S8",
  },
  {
    date: "2026-08-12",
    time: "08:30",
    networks: "LinkedIn, YouTube, Instagram",
    textEs: "🏡 Edición de video promocional para agencias inmobiliarias y servicios financieros.\n\nRitmo ágil y títulos optimizados en zonas seguras 9:16.\n\n📍 Ver proyecto: https://estebanmorenomedia.com/portfolio/homeowners\n🏢 Servicio Real Estate: https://estebanmorenomedia.com/es/editor-de-video-real-estate-miami\n\n#RealEstateVideo #MortgageMarketing #MiamiRealEstate #VideoEditor",
    textEn: "🏡 Promotional video editing for real estate brokerages & mortgage advisors.\n\nFast pacing and 9:16 safe-zone vertical title placement.\n\n📍 View project: https://estebanmorenomedia.com/portfolio/homeowners\n🏢 Real Estate Drone Editing: https://estebanmorenomedia.com/services/real-estate-drone-video-editing-miami\n\n#RealEstateVideo #MortgageMarketing #MiamiRealEstate #VideoEditor",
    mediaUrl: "https://www.youtube.com/watch?v=2m3iHq0JrLM",
  },
  {
    date: "2026-08-14",
    time: "08:30",
    networks: "LinkedIn, YouTube, Instagram",
    textEs: "📽️ Edición de video narrativo para eventos y bodas cinemáticas.\n\nCapturamos la emoción con corrección de color pulida y mezcla de música impecable.\n\n📍 Ver historia completa: https://estebanmorenomedia.com/portfolio/diana-jack\n✨ Servicios de edición: https://estebanmorenomedia.com/services\n\n#WeddingVideo #EventVideography #CinematicEditing #VideoPost",
    textEn: "📽️ Narrative video editing for events & cinematic weddings.\n\nCapture emotion with polished color grading and seamless audio mixing.\n\n📍 View full story: https://estebanmorenomedia.com/portfolio/diana-jack\n✨ Video Services: https://estebanmorenomedia.com/services\n\n#WeddingVideo #EventVideography #CinematicEditing #VideoPost",
    mediaUrl: "https://www.youtube.com/watch?v=3tjLDtVrhG4",
  },
  // WEEK 3
  {
    date: "2026-08-17",
    time: "08:30",
    networks: "LinkedIn, YouTube, Instagram",
    textEs: "🎬 Posproducción narrativa y diseño de sonido para cortometrajes.\n\nEstructuración de escenas, corrección de color y mezcla multicanal.\n\n📍 Proyecto La Huelga: https://estebanmorenomedia.com/portfolio/la-huelga\n🚀 Evaluador de estrategia: https://estebanmorenomedia.com/es/evaluacion\n\n#ShortFilm #Filmmaking #SoundDesign #ColorGrading #VideoEditing",
    textEn: "🎬 Narrative post-production & sound design for short films.\n\nScene structuring, color correction, and multi-channel audio mixing.\n\n📍 La Huelga Project: https://estebanmorenomedia.com/portfolio/la-huelga\n🚀 Strategy Assessment: https://estebanmorenomedia.com/assessment\n\n#ShortFilm #Filmmaking #SoundDesign #ColorGrading #VideoEditing",
    mediaUrl: "https://www.youtube.com/watch?v=W3pA6V8bN60",
  },
  {
    date: "2026-08-19",
    time: "08:30",
    networks: "LinkedIn, YouTube, Instagram",
    textEs: "📲 Edición de lotes de video para redes sociales de marcas e instituciones.\n\nConsistencia de marca, subtítulos animados y entrega rápida.\n\n📍 Ver caso completo: https://estebanmorenomedia.com/portfolio/ml-colombia\n🧮 Calcula tu lote mensual: https://estebanmorenomedia.com/es/calculadora\n\n#SocialMediaVideo #ContentBatching #ReelsEditing #MarketingDigital",
    textEn: "📲 Batch video editing for corporate brand channels & social media.\n\nBrand consistency, animated captions, and rapid turnaround.\n\n📍 View full case: https://estebanmorenomedia.com/portfolio/ml-colombia\n🧮 Scope monthly batching: https://estebanmorenomedia.com/calculator\n\n#SocialMediaVideo #ContentBatching #ReelsEditing #MarketingDigital",
    mediaUrl: "https://www.youtube.com/watch?v=n9c6m_1361w",
  },
];

console.log("Generating Metricool Bulk Upload CSV & Manifest...");

// Generate CSV lines
const csvLines = ["Date,Time,Networks,Text_EN,Text_ES,Media_Url"];
SCHEDULED_POSTS.forEach((post) => {
  const textEnClean = `"${post.textEn.replace(/"/g, '""')}"`;
  const textEsClean = `"${post.textEs.replace(/"/g, '""')}"`;
  csvLines.push(`${post.date},${post.time},"${post.networks}",${textEnClean},${textEsClean},${post.mediaUrl}`);
});

const csvPath = path.join(process.cwd(), "public/metricool_bulk_schedule_master.csv");
fs.writeFileSync(csvPath, csvLines.join("\n"), "utf8");

console.log(`Successfully generated Metricool Bulk Schedule CSV at ${csvPath}!`);
