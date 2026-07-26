/**
 * Esteban Media Official Email Design System Template Builder
 * 
 * Bulletproof Centered Button Pill Architecture (Litmus & Campaign Monitor Standard)
 * - Canvas: #0A0E17
 * - Card Container: #161F32 with #2A3854 border
 * - Buttons: Centered 320px pill buttons with line-height 48px, zero edge-to-edge stretching
 * - 100% Dark Mode & Light Mode rendering compatibility in Gmail, Apple Mail, and Outlook
 */

export function buildTechOutreachHtmlEmail(options) {
  const {
    targetName = "Davie Blvd Latin Bistro & Grill",
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
    ? `Hola equipo de <strong style="color: #ffffff;">${targetName}</strong>,`
    : `Hi <strong style="color: #ffffff;">${targetName} Team</strong>,`;

  const bodyParagraph1 = isEs
    ? `Auditamos su perfil en Google Maps cerca de Fort Lauderdale / 33317 (a solo <strong style="color: #38bdf8;">${distanceMiles} millas de nuestro estudio en SW 42nd Ave</strong>). Tienen excelentes opiniones (<strong style="color: #fbbf24;">${googleRating}★ con ${reviewCount} reseñas</strong>), pero su Instagram carece de un Reel promocional 9:16 fijado en formato rítmico.`
    : `We audited your Google Maps profile near Fort Lauderdale / 33317 (only <strong style="color: #38bdf8;">${distanceMiles} miles from our studio at 1811 SW 42nd Ave</strong>). You have awesome Google reviews (<strong style="color: #fbbf24;">${googleRating}★ with ${reviewCount} reviews</strong>), but your social feed lacks a pinned 9:16 vertical promo Reel.`;

  const cta1Label = isEs
    ? "Ver Muestra en Portafolio →"
    : "View Video Portfolio Showcase →";

  const cta2Label = isEs
    ? "Calculadora de Presupuesto 30s →"
    : "30-Second Video Scope Estimator →";

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

          <!-- Hero Image Banner -->
          <tr>
            <td style="padding: 0; background-color: #000000; text-align: center;">
              <a href="${portfolioUrl}" target="_blank" style="text-decoration: none; display: block;">
                <img src="${baseUrl}/email-assets/hero_player.jpg" alt="Video Player Preview" width="600" style="width: 100%; max-width: 600px; height: auto; display: block; border: 0;" />
              </a>
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

              <!-- 3 Metric Pills Cards -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                <tr>
                  <td width="32%" valign="top" style="padding: 12px 6px; background-color: #0f172a; border: 1px solid #2a3854; border-radius: 12px; text-align: center;">
                    <div style="font-size: 10px; font-weight: 700; color: #38bdf8 !important; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">RETENCIÓN</div>
                    <div style="font-size: 13px; font-weight: 800; color: #ffffff !important;">+85% Dwell</div>
                  </td>
                  <td width="2%"></td>
                  <td width="32%" valign="top" style="padding: 12px 6px; background-color: #0f172a; border: 1px solid #2a3854; border-radius: 12px; text-align: center;">
                    <div style="font-size: 10px; font-weight: 700; color: #818cf8 !important; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">COLOR & AUDIO</div>
                    <div style="font-size: 13px; font-weight: 800; color: #ffffff !important;">4K & -14 LUFS</div>
                  </td>
                  <td width="2%"></td>
                  <td width="32%" valign="top" style="padding: 12px 6px; background-color: #0f172a; border: 1px solid #2a3854; border-radius: 12px; text-align: center;">
                    <div style="font-size: 10px; font-weight: 700; color: #34d399 !important; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">FORMATO</div>
                    <div style="font-size: 13px; font-weight: 800; color: #ffffff !important;">9:16 Vertical</div>
                  </td>
                </tr>
              </table>

              <!-- BULLETPROOF CENTERED PRIMARY BUTTON -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 32px;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${portfolioUrl}" style="height:48px;v-text-anchor:middle;width:320px;" arcsize="25%" stroke="f" fillcolor="#4f46e5">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:bold;">${cta1Label}</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${portfolioUrl}" target="_blank" style="background-color: #4f46e5; border-radius: 10px; color: #ffffff !important; display: inline-block; font-size: 15px; font-weight: 700; line-height: 48px; text-align: center; text-decoration: none; width: 320px; max-width: 90%; -webkit-text-size-adjust: none; box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4); border: 1px solid #6366f1;">
                      ${cta1Label}
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

              <!-- Section Divider Label -->
              <div style="text-align: center; margin-bottom: 14px;">
                <span style="font-size: 11px; font-weight: 800; color: #94a3b8 !important; text-transform: uppercase; letter-spacing: 1px;">
                  ${isEs ? "COMPARATIVA DE EDICIÓN DE VIDEO PROFESIONAL" : "PROFESSIONAL VIDEO EDITING COMPARISON"}
                </span>
              </div>

              <!-- Before / After Card Image -->
              <div style="margin-bottom: 28px; text-align: center;">
                <a href="${portfolioUrl}" target="_blank" style="display: block;">
                  <img src="${baseUrl}/email-assets/before_after.jpg" alt="Video Editing Comparison" width="552" style="width: 100%; max-width: 552px; height: auto; border-radius: 12px; border: 1px solid #2a3854; display: block;" />
                </a>
              </div>

              <!-- Calculator Banner Image -->
              <div style="margin-bottom: 28px; text-align: center;">
                <a href="${calculatorUrl}" target="_blank" style="display: block;">
                  <img src="${baseUrl}/email-assets/calculator_banner.jpg" alt="30-Second Budget Calculator" width="552" style="width: 100%; max-width: 552px; height: auto; border-radius: 12px; border: 1px solid #2a3854; display: block;" />
                </a>
              </div>

              <!-- BULLETPROOF CENTERED SECONDARY BUTTON -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${calculatorUrl}" style="height:48px;v-text-anchor:middle;width:320px;" arcsize="25%" stroke="t" strokecolor="#38bdf8" fillcolor="#0f172a">
                      <w:anchorlock/>
                      <center style="color:#38bdf8;font-family:sans-serif;font-size:15px;font-weight:bold;">${cta2Label}</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="${calculatorUrl}" target="_blank" style="background-color: #0f172a; border: 1px solid #38bdf8; border-radius: 10px; color: #38bdf8 !important; display: inline-block; font-size: 15px; font-weight: 700; line-height: 48px; text-align: center; text-decoration: none; width: 320px; max-width: 90%; -webkit-text-size-adjust: none;">
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
