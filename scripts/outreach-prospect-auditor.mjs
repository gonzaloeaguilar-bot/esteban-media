import fs from "fs";
import path from "path";

/**
 * South Florida Business Discovery, Presence Auditor & Automated Pitch Generator
 * 
 * 1. Audits target South Florida business websites & social presence.
 * 2. Scores content gap (missing 9:16 Reels, lack of video CTA, missing bilingual content).
 * 3. Generates personalized cold outreach briefs with links to Esteban's lead magnets.
 * 4. Saves actionable outreach queue to `public/leads/outreach_queue.json`.
 */

// Target list of South Florida commercial prospects
const SAMPLE_PROSPECTS = [
  {
    id: "prospect_001",
    name: "Brickell Legal Group",
    category: "law-firm",
    city: "Miami (Brickell)",
    county: "Miami-Dade",
    websiteUrl: "https://estebanmorenomedia.com",
    contactEmail: "info@brickelllegal.example",
    contactName: "Attorney Martinez",
    language: "en",
  },
  {
    id: "prospect_002",
    name: "Aventura Aesthetics Med Spa",
    category: "med-spa",
    city: "Aventura",
    county: "Miami-Dade",
    websiteUrl: "https://estebanmorenomedia.com",
    contactEmail: "contact@aventuraaesthetics.example",
    contactName: "Dr. Sofia Gomez",
    language: "es",
  },
  {
    id: "prospect_003",
    name: "Fort Lauderdale Luxury Real Estate",
    category: "real-estate",
    city: "Fort Lauderdale",
    county: "Broward",
    websiteUrl: "https://estebanmorenomedia.com",
    contactEmail: "sales@ftlluxuryrealestate.example",
    contactName: "Mark Davis",
    language: "en",
  },
  {
    id: "prospect_004",
    name: "Wynwood Nightlife & Dining",
    category: "restaurant",
    city: "Miami (Wynwood)",
    county: "Miami-Dade",
    websiteUrl: "https://estebanmorenomedia.com",
    contactEmail: "events@wynwooddining.example",
    contactName: "Carlos Ramos",
    language: "es",
  },
];

export async function auditBusinessPresence(target) {
  const findings = [];
  let contentNeedScore = 60;

  try {
    const res = await fetch(target.websiteUrl, {
      headers: { "User-Agent": "EstebanMediaPresenceBot/1.0" },
    });
    const html = await res.text();

    const hasVideoEmbed = html.includes("<iframe") || html.includes("<video");
    const hasReelsMention = /reels|tiktok|shorts|youtube/i.test(html);
    const hasBilingual = /español|spanish|bilingual/i.test(html);

    if (!hasVideoEmbed) {
      findings.push("No short-form or hero video embeds detected on main landing page.");
      contentNeedScore += 15;
    }
    if (!hasReelsMention) {
      findings.push("Social media presence lacks 9:16 vertical Reels & Shorts integration.");
      contentNeedScore += 15;
    }
    if (!hasBilingual && target.county === "Miami-Dade") {
      findings.push("Missing bilingual (EN/ES) content strategy for South Florida market.");
      contentNeedScore += 10;
    }
  } catch (err) {
    findings.push("Website audit connection fallback; default content review applied.");
    contentNeedScore += 10;
  }

  const finalNeedScore = Math.min(contentNeedScore, 95);
  const isEs = target.language === "es";

  let leadMagnetUrl = "https://estebanmorenomedia.com/calculator";
  let subject = "";
  let body = "";

  if (target.category === "law-firm") {
    leadMagnetUrl = isEs
      ? "https://estebanmorenomedia.com/es/evaluacion"
      : "https://estebanmorenomedia.com/assessment";
    subject = isEs
      ? `Estrategia de Video para ${target.name} en ${target.city}`
      : `Video Content Strategy for ${target.name} in ${target.city}`;
    
    body = isEs
      ? `Hola ${target.contactName || "Equipo"},\n\n` +
        `Auditamos la presencia digital de ${target.name} en ${target.city}. Notamos que su sitio carece de testimoniales en video con formato rítmico para generar confianza inmediata en clientes.\n\n` +
        `Diseñamos un diagnóstico gratuito de estrategia de video en 5 preguntas:\n` +
        `👉 ${leadMagnetUrl}\n\n` +
        `O calcula la estimación de edición en 30 segundos:\n` +
        `👉 https://estebanmorenomedia.com/es/calculadora\n\n` +
        `Saludos,\nEsteban Moreno | Esteban Moreno Media\nhttps://estebanmorenomedia.com/es`
      : `Hi ${target.contactName || "Team"},\n\n` +
        `We audited ${target.name}'s digital presence in ${target.city}. We noticed your landing pages are missing video testimonial breakdowns to build instant trust with inbound leads.\n\n` +
        `We created a free 5-question video strategy audit specifically for South Florida practices:\n` +
        `👉 ${leadMagnetUrl}\n\n` +
        `Or estimate your video editing cost & scope in 30 seconds:\n` +
        `👉 https://estebanmorenomedia.com/calculator\n\n` +
        `Best regards,\nEsteban Moreno | Esteban Moreno Media\nhttps://estebanmorenomedia.com`;
  } else if (target.category === "med-spa") {
    leadMagnetUrl = isEs
      ? "https://estebanmorenomedia.com/es/recursos/kit-video-social"
      : "https://estebanmorenomedia.com/resources/social-video-kit";
    subject = isEs
      ? `Idea de Reels & TikTok Ads para ${target.name}`
      : `Short-form Reel & Video Ad Idea for ${target.name}`;

    body = isEs
      ? `Hola ${target.contactName || "Equipo"},\n\n` +
        `Revisamos el contenido de ${target.name} en ${target.city}. Las plataformas sociales están priorizando historias de transformación en formato 9:16 vertical con subtítulos animados y mezcla de audio masterizada.\n\n` +
        `Obtén nuestro Kit de Guiones 9:16 y plantillas de zonas seguras gratis:\n` +
        `👉 ${leadMagnetUrl}\n\n` +
        `Mira ejemplos de nuestro portafolio en salud y estética:\n` +
        `👉 https://estebanmorenomedia.com/es/portafolio/healthy-smile\n\n` +
        `Saludos,\nEsteban Moreno | Esteban Moreno Media\nhttps://estebanmorenomedia.com/es`
      : `Hi ${target.contactName || "Team"},\n\n` +
        `We reviewed ${target.name}'s content in ${target.city}. Social feeds are heavily prioritizing 9:16 vertical transformation stories with active captions and mastered audio.\n\n` +
        `Access our free 9:16 safe-zone overlay kit & direct-response scripts:\n` +
        `👉 ${leadMagnetUrl}\n\n` +
        `View medical video editing examples from our verified portfolio:\n` +
        `👉 https://estebanmorenomedia.com/portfolio/healthy-smile\n\n` +
        `Best regards,\nEsteban Moreno | Esteban Moreno Media\nhttps://estebanmorenomedia.com`;
  } else {
    leadMagnetUrl = isEs
      ? "https://estebanmorenomedia.com/es/calculadora"
      : "https://estebanmorenomedia.com/calculator";
    subject = isEs
      ? `Propuesta de Producción & Edición de Video para ${target.name}`
      : `Video Production & Editing Proposal for ${target.name}`;

    body = isEs
      ? `Hola ${target.contactName || "Equipo"},\n\n` +
        `Analizamos la presencia digital de ${target.name} en ${target.city}. Notamos la oportunidad de aumentar sus conversiones con edición de video profesional remota o filmación presencial en ${target.county}.\n\n` +
        `Calcula el presupuesto y tiempo de entrega en 30 segundos:\n` +
        `👉 ${leadMagnetUrl}\n\n` +
        `Explora nuestro portafolio de trabajos en South Florida:\n` +
        `👉 https://estebanmorenomedia.com/es/portafolio\n\n` +
        `Saludos,\nEsteban Moreno | Esteban Moreno Media\nhttps://estebanmorenomedia.com/es`
      : `Hi ${target.contactName || "Team"},\n\n` +
        `We analyzed ${target.name}'s online presence in ${target.city}. There is a huge opportunity to scale your client inquiries using high-pacing video editing or selectively scoped capture in ${target.county}.\n\n` +
        `Estimate your project cost & turnaround in 30 seconds:\n` +
        `👉 ${leadMagnetUrl}\n\n` +
        `Explore our verified South Florida portfolio:\n` +
        `👉 https://estebanmorenomedia.com/portfolio\n\n` +
        `Best regards,\nEsteban Moreno | Esteban Moreno Media\nhttps://estebanmorenomedia.com`;
  }

  return {
    business: target,
    auditDate: new Date().toISOString(),
    contentScore: finalNeedScore,
    auditFindings: findings,
    recommendedLeadMagnet: leadMagnetUrl,
    generatedSubject: subject,
    generatedEmailBody: body,
  };
}

async function runAuditorEngine() {
  console.log(`Starting South Florida Business Discovery & Content Audit Engine...\n`);
  const results = [];

  for (const prospect of SAMPLE_PROSPECTS) {
    const audit = await auditBusinessPresence(prospect);
    results.push(audit);
    console.log(`✅ Audited: ${prospect.name} (${prospect.city}) | Content Help Need Score: ${audit.contentScore}%`);
  }

  const outputDir = path.join(process.cwd(), "public", "leads");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "outreach_queue.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf8");

  console.log(`\n🎉 Audited ${results.length} prospects. Saved outreach queue to: ${outputPath}`);
}

runAuditorEngine();
