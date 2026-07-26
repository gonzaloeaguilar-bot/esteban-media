/**
 * Esteban Media Official Tella / Canva-Style Clean Email Design System
 * 
 * ABOVE-THE-FOLD OPTIMIZED LAYOUT:
 * 1. Top Header: Clean brand logo + studio badge.
 * 2. ABOVE THE FOLD: Large headline, greeting, intro text, AND Primary Pill CTA Button.
 * 3. HERO MEDIA CARD: High-res video portfolio preview card below CTA.
 * 4. SECTION 2: Timeline editing feature + numbered advice list.
 * 5. SECTION 3: Featured work showcase card.
 * 6. FOOTER & SECONDARY DIRECT CONTACT CTA.
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
    theme = "cream", // "cream" or "dark"
  } = options;

  const isEs = language === "es";
  const baseUrl = "https://estebanmorenomedia.com";

  const isDark = theme === "dark";
  const colors = isDark
    ? {
        bgColor: "#18181b",
        cardBg: "#27272a",
        textPrimary: "#ffffff",
        textSecondary: "#a1a1aa",
        textMuted: "#71717a",
        border: "#3f3f46",
        brandOrange: "#f97316",
        brandOrangeBg: "#ea580c",
        btnText: "#ffffff",
      }
    : {
        bgColor: "#faf5ee",
        cardBg: "#f5eee6",
        textPrimary: "#1e293b",
        textSecondary: "#475569",
        textMuted: "#64748b",
        border: "#e2e8f0",
        brandOrange: "#ea580c",
        brandOrangeBg: "#c2410c",
        btnText: "#ffffff",
      };

  const preheaderText = isEs
    ? `Muestra de Video 9:16 y Consejos de Contenido para ${targetName}`
    : `9:16 Video Showcase & Content Tips for ${targetName}`;

  const greeting = isEs
    ? `Hola equipo de <strong>${targetName}</strong>,`
    : `Hi <strong>${targetName} Team</strong>,`;

  const headline = isEs
    ? `Nuevos ejemplos de video, edición rítmica 9:16 y más`
    : `New video editing showcases, 9:16 vertical Reels and more`;

  const introText = isEs
    ? `Auditamos su presencia digital en Google Maps cerca de Fort Lauderdale (a solo <strong style="color: ${colors.brandOrange};">${distanceMiles} millas de nuestro estudio en SW 42nd Ave</strong>). Tienen excelentes reseñas en Google (<strong style="color: #eab308;">${googleRating}★ con ${reviewCount} opiniones</strong>), pero pueden duplicar sus clientes con Reels verticales de alto impacto.`
    : `We audited ${targetName}'s digital footprint near Fort Lauderdale (only <strong style="color: ${colors.brandOrange};">${distanceMiles} miles from our studio at 1811 SW 42nd Ave</strong>). You have awesome Google reviews (<strong style="color: #eab308;">${googleRating}★ with ${reviewCount} reviews</strong>), but you can double your inbound leads with high-impact vertical Reels.`;

  const cta1Label = isEs
    ? "Ver todos los ejemplos (3 min) →"
    : "Watch all video showcases (3 min) →";

  const cta2Label = isEs
    ? "Escribir directamente a Esteban (WhatsApp / Email) →"
    : "Contact Esteban directly (WhatsApp / Email) →";

  const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
    isEs ? `Consulta de Video para ${targetName}` : `Video Inquiry for ${targetName}`
  )}`;

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${preheaderText}</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: ${colors.bgColor} !important; color: ${colors.textPrimary} !important; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.bgColor}; color: ${colors.textPrimary}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  
  <!-- Hidden Preheader -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ${preheaderText} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Outer Canvas Table -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.bgColor}; width: 100%; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 24px 12px; background-color: ${colors.bgColor};">
        
        <!-- 560px Tella Style Clean Inner Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; text-align: left;">
          
          <!-- Top Header / Brand Logo -->
          <tr>
            <td style="padding-bottom: 20px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 16px; font-weight: 800; letter-spacing: -0.5px; color: ${colors.textPrimary}; text-transform: uppercase;">
                      ESTEBAN MORENO <span style="color: ${colors.brandOrange};">MEDIA</span>
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-size: 12px; color: ${colors.textMuted}; font-weight: 600;">
                      📍 33317 Studio
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ABOVE THE FOLD: Headline -->
          <tr>
            <td style="padding-bottom: 12px;">
              <h1 style="font-size: 26px; font-weight: 700; line-height: 1.3; color: ${colors.textPrimary}; margin: 0;">
                ${headline}
              </h1>
            </td>
          </tr>

          <!-- ABOVE THE FOLD: Greeting & Intro Paragraph -->
          <tr>
            <td style="padding-bottom: 20px;">
              <p style="font-size: 16px; font-weight: 600; line-height: 1.5; color: ${colors.textPrimary}; margin: 0 0 10px 0;">
                ${greeting}
              </p>
              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textSecondary}; margin: 0;">
                ${introText}
              </p>
            </td>
          </tr>

          <!-- ABOVE THE FOLD: Primary Pill Button -->
          <tr>
            <td align="left" style="padding-bottom: 24px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${youtubeUrl}" style="height:46px;v-text-anchor:middle;width:280px;" arcsize="25%" stroke="f" fillcolor="${colors.brandOrangeBg}">
                <w:anchorlock/>
                <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:bold;">${cta1Label}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${youtubeUrl}" target="_blank" style="background-color: ${colors.brandOrangeBg}; border-radius: 12px; color: #ffffff !important; display: inline-block; font-size: 15px; font-weight: 700; line-height: 46px; padding: 0 24px; text-align: center; text-decoration: none; -webkit-text-size-adjust: none;">
                ${cta1Label}
              </a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- HERO MEDIA CARD (Positioned Cleanly Below Above-The-Fold CTA) -->
          <tr>
            <td style="padding-bottom: 28px;">
              <a href="${youtubeUrl}" target="_blank" style="display: block; text-decoration: none;">
                <img src="${baseUrl}/email-assets/cream_portfolio.jpg" alt="Video Portfolio Preview" width="560" style="width: 100%; max-width: 560px; height: auto; border-radius: 16px; display: block; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- Feature Section 1: 9:16 Vertical Reel Timeline (Image + Text + Numbered List) -->
          <tr>
            <td style="padding-bottom: 32px;">
              <!-- Media Card 1 -->
              <a href="${youtubeUrl}" target="_blank" style="display: block; margin-bottom: 20px;">
                <img src="${baseUrl}/email-assets/tella_editor.jpg" alt="The new Cut timeline" width="560" style="width: 100%; max-width: 560px; height: auto; border-radius: 16px; display: block; border: 0;" />
              </a>

              <!-- Feature Title 1 -->
              <h2 style="font-size: 20px; font-weight: 700; color: ${colors.textPrimary}; margin: 0 0 12px 0;">
                ${isEs ? "Edición de línea de tiempo rítmica 9:16" : "High-pacing 9:16 vertical timeline editing"}
              </h2>

              <!-- Feature Body 1 -->
              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textSecondary}; margin: 0 0 16px 0;">
                ${isEs
                  ? "Transformamos tomas planas en piezas dinámicas de formato vertical optimizadas para Instagram Reels, TikTok y YouTube Shorts:"
                  : "We turn raw unedited clips into high-pacing vertical assets optimized for Instagram Reels, TikTok, and YouTube Shorts:"}
              </p>

              <!-- Numbered Advice List (Matching Tella Email Structure) -->
              <ol style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.7; color: ${colors.textSecondary};">
                <li style="margin-bottom: 10px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">Gancho de interrupción (0-3s).</strong> ${isEs ? "El 80% de los usuarios desliza si los primeros 3 segundos no capturan su atención. Editamos ganchos visuales que detienen el scroll." : "80% of users scroll past if the first 3 seconds don't grab attention. We edit visual pattern-interrupt hooks that stop the scroll."}
                </li>
                <li style="margin-bottom: 10px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">Subtítulos dinámicos activos.</strong> ${isEs ? "El 85% del video en redes se mira sin sonido. Los subtítulos kinéticos resaltados duplican el tiempo de retención." : "85% of social video is watched on mute. Kinetic highlighted captions double your view duration."}
                </li>
                <li>
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">Mezcla de audio a -14 LUFS.</strong> ${isEs ? "Masterizamos la voz para que suene clara y nítida en cualquier altavoz de teléfono móvil." : "Dialogue audio mastering to -14 LUFS so speech sounds crisp on any smartphone speaker."}
                </li>
              </ol>
            </td>
          </tr>

          <!-- Feature Section 2: Portfolio Carousel Showcase -->
          <tr>
            <td style="padding-bottom: 32px;">
              <!-- Media Card 2 -->
              <a href="${portfolioUrl}" target="_blank" style="display: block; margin-bottom: 20px;">
                <img src="${baseUrl}/email-assets/portfolio_carousel.jpg" alt="Featured Work Showcase" width="560" style="width: 100%; max-width: 560px; height: auto; border-radius: 16px; display: block; border: 0;" />
              </a>

              <!-- Feature Title 2 -->
              <h2 style="font-size: 20px; font-weight: 700; color: ${colors.textPrimary}; margin: 0 0 12px 0;">
                ${isEs ? "Muestra de trabajos en South Florida" : "Featured South Florida video work"}
              </h2>

              <!-- Feature Body 2 -->
              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textSecondary}; margin: 0 0 16px 0;">
                ${isEs
                  ? "Desde locales de gastronomía en Wynwood hasta clínicas de estética en Aventura y firmas legales en Brickell, adaptamos cada edición a la identidad del negocio."
                  : "From Wynwood hospitality venues to Aventura med spas and Brickell law firms, we tailor every edit to the brand's exact audience."}
              </p>
            </td>
          </tr>

          <!-- Secondary Direct Contact Pill CTA -->
          <tr>
            <td style="padding-bottom: 36px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${mailtoLink}" style="height:48px;v-text-anchor:middle;width:340px;" arcsize="25%" stroke="t" strokecolor="${colors.brandOrange}" fillcolor="${colors.cardBg}">
                <w:anchorlock/>
                <center style="color:${colors.brandOrange};font-family:sans-serif;font-size:15px;font-weight:bold;">${cta2Label}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${mailtoLink}" target="_blank" style="background-color: ${colors.cardBg}; border: 1px solid ${colors.brandOrange}; border-radius: 12px; color: ${colors.brandOrange} !important; display: inline-block; font-size: 15px; font-weight: 700; line-height: 48px; padding: 0 24px; text-align: center; text-decoration: none; -webkit-text-size-adjust: none;">
                ${cta2Label}
              </a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- Minimal Footer (Matching Tella Footer) -->
          <tr>
            <td style="border-top: 1px solid ${colors.border}; padding-top: 24px; padding-bottom: 32px;">
              <p style="font-size: 13px; font-weight: 700; color: ${colors.textPrimary}; margin: 0 0 6px 0;">
                Esteban Moreno | Esteban Moreno Media
              </p>
              <p style="font-size: 12px; color: ${colors.textMuted}; margin: 0 0 12px 0;">
                📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317 &bull; South Florida Video Production
              </p>
              <p style="font-size: 12px; margin: 0;">
                <a href="${youtubeUrl}" style="color: ${colors.brandOrange} !important; text-decoration: none; font-weight: 700;">Canal de YouTube</a> &bull; 
                <a href="${baseUrl}" style="color: ${colors.textMuted} !important; text-decoration: none;">estebanmorenomedia.com</a> &bull; 
                <a href="${baseUrl}/es" style="color: ${colors.textMuted} !important; text-decoration: none;">Español</a>
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
