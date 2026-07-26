/**
 * Esteban Media High-Converting Portfolio & Advice Email Template Builder
 * 
 * Replaces price calculators with:
 * 1. Portfolio Work Showcase Carousel Grid (`/email-assets/portfolio_carousel.jpg`)
 * 2. 3 High-Impact Content Growth Advice Tips (Why Better Video Drives Sales)
 * 3. Direct YouTube Channel & Video Links (`@estebanmorenolopez3811`)
 * 4. Direct Contact CTA to Esteban (`mailto:esmolopez@gmail.com` / Direct Brief)
 * 5. Bulletproof Centered Pill Button architecture matching estebanmorenomedia.com tokens
 */

export function buildTechOutreachHtmlEmail(options) {
  const {
    targetName = "Davie Blvd Latin Bistro & Grill",
    city = "Fort Lauderdale",
    distanceMiles = "0.5",
    googleRating = "4.8",
    reviewCount = "142",
    language = "es",
    portfolioUrl = "https://estebanmorenomedia.com/es/portafolio",
    youtubeUrl = "https://www.youtube.com/@estebanmorenolopez3811",
    contactEmail = "esmolopez@gmail.com",
  } = options;

  const isEs = language === "es";
  const baseUrl = "https://estebanmorenomedia.com";

  const preheaderText = isEs
    ? `Ejemplos de Video & Consejos para Aumentar Clientes en ${targetName}`
    : `Video Showcase & High-Converting Content Tips for ${targetName}`;

  const greeting = isEs
    ? `Hola equipo de <strong style="color: #ffffff;">${targetName}</strong>,`
    : `Hi <strong style="color: #ffffff;">${targetName} Team</strong>,`;

  const bodyParagraph1 = isEs
    ? `Auditamos su presencia digital en Google Maps cerca de Fort Lauderdale / 33317 (a solo <strong style="color: #38bdf8;">${distanceMiles} millas de nuestro estudio en SW 42nd Ave</strong>). Tienen excelentes opiniones (<strong style="color: #fbbf24;">${googleRating}★ con ${reviewCount} reseñas</strong>), pero están perdiendo clientes potenciales por no contar con un Reel de video 9:16 de alto impacto.`
    : `We audited your Google Maps profile near Fort Lauderdale / 33317 (only <strong style="color: #38bdf8;">${distanceMiles} miles from our studio at 1811 SW 42nd Ave</strong>). You have awesome Google reviews (<strong style="color: #fbbf24;">${googleRating}★ with ${reviewCount} reviews</strong>), but you are missing out on inbound customers by not having a high-impact 9:16 vertical video Reel.`;

  const cta1Label = isEs
    ? "Ver Portafolio de Videos en YouTube 🎬"
    : "View Video Portfolio on YouTube 🎬";

  const cta2Label = isEs
    ? "Escribir Directamente a Esteban 💬"
    : "Contact Esteban Directly 💬";

  const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
    isEs ? `Consulta de Video para ${targetName}` : `Video Inquiry for ${targetName}`
  )}`;

  return `<!DOCTYPE html>
<html lang="${language}" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="only dark">
  <meta name="supported-color-schemes" content="only dark">
  <title>${preheaderText}</title>
  <style type="text/css">
    :root { color-scheme: dark; supported-color-schemes: dark; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #0a0e17 !important; color: #ffffff !important; }
    
    @media (prefers-color-scheme: dark) {
      .bg-canvas { background-color: #0a0e17 !important; }
      .card-bg { background-color: #161f32 !important; }
    }
    @media (prefers-color-scheme: light) {
      .bg-canvas { background-color: #0a0e17 !important; }
      .card-bg { background-color: #161f32 !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0e17; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  
  <!-- Preheader Text -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ${preheaderText} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Outer Canvas Table -->
  <table class="bg-canvas" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0e17; width: 100%; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 24px 12px; background-color: #0a0e17;">
        
        <!-- 600px Max-Width Card Container -->
        <table class="card-bg" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #161f32; border: 1px solid #2a3854; border-radius: 16px; overflow: hidden;">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 20px 24px; background-color: #0f172a; border-bottom: 1px solid #2a3854;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <span style="font-size: 15px; font-weight: 800; letter-spacing: 0.5px; color: #ffffff !important; text-transform: uppercase;">
                      ESTEBAN MORENO <span style="color: #38bdf8;">MEDIA</span>
                    </span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 4px 10px; background-color: #1e293b; border: 1px solid #334155; border-radius: 20px; font-size: 11px; font-weight: 700; color: #10b981 !important;">
                      ● STUDIO ONLINE 33317
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td style="padding: 28px 24px; background-color: #161f32;">
              
              <!-- Greeting -->
              <p style="font-size: 18px; font-weight: 600; line-height: 1.5; color: #ffffff !important; margin: 0 0 16px 0;">
                ${greeting}
              </p>

              <!-- Body Paragraph 1 -->
              <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1 !important; margin: 0 0 24px 0;">
                ${bodyParagraph1}
              </p>

              <!-- Section Label: Portfolio Carousel Grid -->
              <div style="text-align: center; margin-bottom: 12px;">
                <span style="font-size: 11px; font-weight: 800; color: #38bdf8 !important; text-transform: uppercase; letter-spacing: 1px;">
                  🎬 ${isEs ? "MUESTRA DE TRABAJOS RECIENTES EN SOUTH FLORIDA" : "FEATURED SOUTH FLORIDA VIDEO WORK"}
                </span>
              </div>

              <!-- Interactive Portfolio Carousel Image Grid -->
              <div style="margin-bottom: 24px; text-align: center;">
                <a href="${youtubeUrl}" target="_blank" style="display: block;">
                  <img src="${baseUrl}/email-assets/portfolio_carousel.jpg" alt="Esteban Media Video Portfolio Carousel" width="552" style="width: 100%; max-width: 552px; height: auto; border-radius: 12px; border: 1px solid #2a3854; display: block;" />
                </a>
              </div>

              <!-- Primary YouTube & Portfolio Pill Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${youtubeUrl}" style="height:48px;v-text-anchor:middle;width:340px;" arcsize="25%" stroke="f" fillcolor="#4f46e5">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:bold;">${cta1Label}</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${youtubeUrl}" target="_blank" style="background-color: #4f46e5; border-radius: 10px; color: #ffffff !important; display: inline-block; font-size: 15px; font-weight: 700; line-height: 48px; text-align: center; text-decoration: none; width: 340px; max-width: 90%; -webkit-text-size-adjust: none; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4); border: 1px solid #6366f1;">
                      ${cta1Label}
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Section Divider Label: Why Video Content Works -->
              <div style="text-align: center; margin-bottom: 16px; border-top: 1px solid #2a3854; padding-top: 24px;">
                <span style="font-size: 11px; font-weight: 800; color: #10b981 !important; text-transform: uppercase; letter-spacing: 1px;">
                  💡 ${isEs ? "¿POR QUÉ UN MEJOR CONTENIDO DE VIDEO GENERA MÁS VENTAS?" : "WHY BETTER VIDEO CONTENT DRIVES MORE SALES"}
                </span>
              </div>

              <!-- 3 High-Impact Value Advice Cards -->
              <div style="margin-bottom: 28px;">
                <!-- Tip 1 -->
                <div style="background-color: #0f172a; border: 1px solid #2a3854; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                  <div style="font-size: 14px; font-weight: 700; color: #38bdf8 !important; margin-bottom: 6px;">
                    ⚡ 1. El Gancho de 3 Segundos (Pattern Interrupt)
                  </div>
                  <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1 !important;">
                    ${isEs
                      ? "El 80% de los usuarios deslizan y pasan de largo en 3 segundos. Editamos los primeros cuadros con interrupción de patrón para detener el scroll y capturar atención inmediata."
                      : "80% of viewers scroll past in 3 seconds. We edit pattern-interrupt hooks in the first frames to stop the scroll and capture instant attention."}
                  </div>
                </div>

                <!-- Tip 2 -->
                <div style="background-color: #0f172a; border: 1px solid #2a3854; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                  <div style="font-size: 14px; font-weight: 700; color: #818cf8 !important; margin-bottom: 6px;">
                    📱 2. Subtítulos Dinámicos para Reproducción Muta
                  </div>
                  <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1 !important;">
                    ${isEs
                      ? "El 85% del video en redes se consume en silencio. Incluimos subtítulos dinámicos activos y mezcla a -14 LUFS para duplicar el tiempo de retención."
                      : "85% of social video is watched on mute. We include active dynamic captions and -14 LUFS dialogue mastering to double view retention."}
                  </div>
                </div>

                <!-- Tip 3 -->
                <div style="background-color: #0f172a; border: 1px solid #2a3854; border-radius: 12px; padding: 16px;">
                  <div style="font-size: 14px; font-weight: 700; color: #34d399 !important; margin-bottom: 6px;">
                    🎯 3. Autoridad Bilingüe Local en South Florida
                  </div>
                  <div style="font-size: 13px; line-height: 1.5; color: #cbd5e1 !important;">
                    ${isEs
                      ? "En Miami y Broward, el contenido adaptado en inglés y español genera el doble de alcance orgánico y transmite 4 veces más confianza que el contenido genérico de stock."
                      : "In Miami & Broward, bilingual content adapted in English & Spanish generates 2x organic reach and builds 4x more trust than generic stock video."}
                  </div>
                </div>
              </div>

              <!-- Secondary Direct Contact Pill Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${mailtoLink}" style="height:48px;v-text-anchor:middle;width:340px;" arcsize="25%" stroke="t" strokecolor="#10b981" fillcolor="#0f172a">
                      <w:anchorlock/>
                      <center style="color:#10b981;font-family:sans-serif;font-size:15px;font-weight:bold;">${cta2Label}</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${mailtoLink}" target="_blank" style="background-color: #0f172a; border: 1px solid #10b981; border-radius: 10px; color: #10b981 !important; display: inline-block; font-size: 15px; font-weight: 700; line-height: 48px; text-align: center; text-decoration: none; width: 340px; max-width: 90%; -webkit-text-size-adjust: none;">
                      ${cta2Label}
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td style="padding: 24px; background-color: #0f172a; border-top: 1px solid #2a3854; text-align: center;">
              <p style="font-size: 13px; font-weight: 700; color: #ffffff !important; margin: 0 0 6px 0;">
                Esteban Moreno | Esteban Moreno Media
              </p>
              <p style="font-size: 12px; color: #94a3b8 !important; margin: 0 0 12px 0;">
                📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317 &bull; South Florida Video Production & Editing
              </p>
              <p style="font-size: 12px; margin: 0;">
                <a href="${youtubeUrl}" style="color: #ff0000 !important; text-decoration: none; font-weight: 700;">Canal de YouTube</a> &bull; 
                <a href="${baseUrl}" style="color: #38bdf8 !important; text-decoration: none; font-weight: 600;">estebanmorenomedia.com</a> &bull; 
                <a href="${baseUrl}/es" style="color: #38bdf8 !important; text-decoration: none; font-weight: 600;">Versión en Español</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}
