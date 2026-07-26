/**
 * World-Class Tech & Graphic HTML Email Template Builder
 * 
 * Inspired by Google One, Apple, Vercel, and Linear email design systems.
 * Features dark-mode glassmorphism, AI-generated visual cards, high-contrast badges,
 * and bulletproof 600px table responsive layout.
 */

export function buildTechOutreachHtmlEmail(options) {
  const {
    targetName = "Davie Blvd Latin Bistro",
    city = "Fort Lauderdale",
    distanceMiles = "0.5",
    googleRating = "4.8",
    reviewCount = "142",
    language = "es",
    portfolioUrl = "https://estebanmorenomedia.com/es/portafolio/bar-door-monkey",
    calculatorUrl = "https://estebanmorenomedia.com/es/calculadora",
  } = options;

  const isEs = language === "es";
  const baseUrl = "https://estebanmorenomedia.com";

  const preheaderText = isEs
    ? `Propuesta de Video Promocional para ${targetName} (Fort Lauderdale 33317)`
    : `Short Video Promo Proposal for ${targetName} (Fort Lauderdale 33317)`;

  const greeting = isEs
    ? `Hola equipo de <strong>${targetName}</strong>,`
    : `Hi <strong>${targetName} Team</strong>,`;

  const bodyParagraph1 = isEs
    ? `Auditamos su perfil en Google Maps cerca de Fort Lauderdale / 33317 (a solo <strong style="color: #38bdf8;">${distanceMiles} millas de nuestro estudio en SW 42nd Ave</strong>). Tienen excelentes opiniones (<strong style="color: #fbbf24;">${googleRating}⭐ con ${reviewCount} reseñas</strong>), pero su Instagram carece de un Reel promocional 9:16 fijado en formato rítmico.`
    : `We audited your Google Maps profile near Fort Lauderdale / 33317 (only <strong style="color: #38bdf8;">${distanceMiles} miles from our studio at 1811 SW 42nd Ave</strong>). You have awesome Google reviews (<strong style="color: #fbbf24;">${googleRating}⭐ with ${reviewCount} reviews</strong>), but your social feed lacks a pinned 9:16 vertical promo Reel.`;

  const cta1Label = isEs
    ? "Ver Muestra de Video para Restaurantes 🎬"
    : "View Restaurant Video Showcase 🎬";

  const cta2Label = isEs
    ? "Calculadora de Presupuesto en 30s ⚡"
    : "30-Second Video Budget Estimator ⚡";

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${preheaderText}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Preheader Hidden Text -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ${preheaderText} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Main Container Table -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b0f17; padding: 20px 10px;">
    <tr>
      <td align="center">
        <!-- 600px Tech Card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #141c2e; border: 1px solid #2a3854; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
          
          <!-- Top Header & Brand Badge -->
          <tr>
            <td style="padding: 24px 28px; background: linear-gradient(180deg, #1e293b 0%, #141c2e 100%); border-bottom: 1px solid #2a3854;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 16px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">ESTEBAN MORENO MEDIA</span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 10px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 20px; font-size: 11px; font-weight: 600; color: #10b981;">
                      ● STUDIO ONLINE | 33317
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero AI Image Banner -->
          <tr>
            <td style="padding: 0; background-color: #000000; text-align: center;">
              <a href="${portfolioUrl}" target="_blank" style="text-decoration: none;">
                <img src="${baseUrl}/email-assets/hero_player.jpg" alt="Esteban Media 9:16 Video Player" width="600" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td style="padding: 32px 28px;">
              
              <!-- Greeting -->
              <p style="font-size: 18px; line-height: 1.5; color: #f8fafc; margin: 0 0 16px 0;">
                ${greeting}
              </p>

              <!-- Paragraph 1 -->
              <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px 0;">
                ${bodyParagraph1}
              </p>

              <!-- Feature Metric Pills Grid -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="33%" style="padding: 8px; background-color: rgba(79, 70, 229, 0.15); border: 1px solid rgba(79, 70, 229, 0.3); border-radius: 10px; text-align: center;">
                    <div style="font-size: 11px; color: #a5b4fc; text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">Retención</div>
                    <div style="font-size: 14px; font-weight: 800; color: #ffffff;">+85% Dwell</div>
                  </td>
                  <td width="2%"></td>
                  <td width="33%" style="padding: 8px; background-color: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 10px; text-align: center;">
                    <div style="font-size: 11px; color: #67e8f9; text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">Color & Audio</div>
                    <div style="font-size: 14px; font-weight: 800; color: #ffffff;">4K & -14 LUFS</div>
                  </td>
                  <td width="2%"></td>
                  <td width="30%" style="padding: 8px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px; text-align: center;">
                    <div style="font-size: 11px; color: #6ee7b7; text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">Formato</div>
                    <div style="font-size: 14px; font-weight: 800; color: #ffffff;">9:16 Vertical</div>
                  </td>
                </tr>
              </table>

              <!-- Primary CTA Button 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                <tr>
                  <td align="center">
                    <a href="${portfolioUrl}" target="_blank" style="display: block; width: 100%; padding: 14px 20px; background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; text-align: center; box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);">
                      ${cta1Label}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Section 2: Before/After Comparison Visual Card -->
              <div style="margin-bottom: 24px; text-align: center;">
                <p style="font-size: 13px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                  ${isEs ? "Comparativa de Edición de Video Profesional" : "Professional Video Editing Comparison"}
                </p>
                <a href="${portfolioUrl}" target="_blank">
                  <img src="${baseUrl}/email-assets/before_after.jpg" alt="Before and After Video Editing" width="544" style="width: 100%; max-width: 544px; height: auto; border-radius: 12px; border: 1px solid #334155; display: block; border: 0;" />
                </a>
              </div>

              <!-- Section 3: Interactive Calculator Banner -->
              <div style="margin-bottom: 28px; text-align: center;">
                <a href="${calculatorUrl}" target="_blank">
                  <img src="${baseUrl}/email-assets/calculator_banner.jpg" alt="30-Second Budget Estimator" width="544" style="width: 100%; max-width: 544px; height: auto; border-radius: 12px; border: 1px solid #334155; display: block; border: 0;" />
                </a>
              </div>

              <!-- Secondary CTA Button 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                <tr>
                  <td align="center">
                    <a href="${calculatorUrl}" target="_blank" style="display: block; width: 100%; padding: 14px 20px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; text-align: center; box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);">
                      ${cta2Label}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="padding: 24px 28px; background-color: #0f172a; border-top: 1px solid #2a3854; text-align: center;">
              <p style="font-size: 13px; font-weight: 600; color: #f8fafc; margin: 0 0 6px 0;">
                Esteban Moreno | Esteban Moreno Media
              </p>
              <p style="font-size: 12px; color: #94a3b8; margin: 0 0 12px 0;">
                📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317 &bull; South Florida Video Production & Editing
              </p>
              <p style="font-size: 12px; margin: 0;">
                <a href="${baseUrl}" style="color: #38bdf8; text-decoration: none;">estebanmorenomedia.com</a> &bull; 
                <a href="${baseUrl}/es" style="color: #38bdf8; text-decoration: none;">Versión en Español</a>
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
