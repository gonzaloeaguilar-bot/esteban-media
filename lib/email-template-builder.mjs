/**
 * Esteban Media Official Tella Email Design System (Exact Match to Reference Screenshots)
 * 
 * Design Principles:
 * 1. Single Primary Soft Rounded Pill Button ABOVE THE FOLD (Tella Soft Violet #6366F1).
 * 2. NO STACKED TRAFFIC LIGHT BUTTONS.
 * 3. Clean, spacious Tella card flow with high-res media cards (tella_editor, website_hero, portfolio_carousel).
 * 4. Contextual contact links (WhatsApp, SMS, Website) elegantly placed at the bottom footer.
 * 5. 100% Dark Matte Theme (#18181B) & Warm Cream Theme (#FAF5EE) support.
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
    whatsappPhone = "19545550182",
    theme = "dark",
  } = options;

  const isEs = language === "es";
  const baseUrl = "https://estebanmorenomedia.com";
  const targetSiteUrl = isEs ? `${baseUrl}/es` : baseUrl;

  const isDark = theme === "dark";
  const colors = isDark
    ? {
        bgColor: "#121214",
        cardBg: "#18181b",
        textPrimary: "#ffffff",
        textSecondary: "#d4d4d8",
        textMuted: "#a1a1aa",
        border: "#27272a",
        btnPrimaryBg: "#6366f1",
        btnPrimaryText: "#ffffff",
        accentColor: "#f97316",
      }
    : {
        bgColor: "#faf5ee",
        cardBg: "#ffffff",
        textPrimary: "#1e293b",
        textSecondary: "#475569",
        textMuted: "#64748b",
        border: "#e2e8f0",
        btnPrimaryBg: "#6366f1",
        btnPrimaryText: "#ffffff",
        accentColor: "#ea580c",
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
    ? `Auditamos la presencia digital de ${targetName} cerca de Fort Lauderdale (a solo <strong style="color: ${colors.accentColor};">${distanceMiles} millas de nuestro estudio en SW 42nd Ave</strong>). Tienen excelentes reseñas en Google (<strong style="color: #eab308;">${googleRating}★ con ${reviewCount} opiniones</strong>), pero pueden duplicar sus clientes con Reels verticales de alto impacto.`
    : `We audited ${targetName}'s digital footprint near Fort Lauderdale (only <strong style="color: ${colors.accentColor};">${distanceMiles} miles from our studio at 1811 SW 42nd Ave</strong>). You have awesome Google reviews (<strong style="color: #eab308;">${googleRating}★ with ${reviewCount} reviews</strong>), but you can double your inbound leads with high-impact vertical Reels.`;

  const mainCtaLabel = isEs
    ? "Ver todos los ejemplos (3 min)"
    : "Watch all video showcases (3 min)";

  const whatsappLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    isEs ? `Hola Esteban, vi la propuesta de video para ${targetName}` : `Hi Esteban, saw the video proposal for ${targetName}`
  )}`;

  const smsLink = `sms:+${whatsappPhone}?body=${encodeURIComponent(
    isEs ? `Hola Esteban, vi la propuesta de video para ${targetName}` : `Hi Esteban, saw the video proposal for ${targetName}`
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
      <td align="center" style="padding: 36px 16px; background-color: ${colors.bgColor};">
        
        <!-- 540px Tella Clean Inner Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 540px; text-align: left;">
          
          <!-- Top Header / Brand Logo -->
          <tr>
            <td style="padding-bottom: 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <a href="${targetSiteUrl}" target="_blank" style="text-decoration: none;">
                      <span style="font-size: 15px; font-weight: 800; letter-spacing: -0.5px; color: ${colors.textPrimary}; text-transform: uppercase;">
                        ESTEBAN MORENO <span style="color: ${colors.accentColor};">MEDIA</span>
                      </span>
                    </a>
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

          <!-- ABOVE THE FOLD: Intro Paragraph & Greeting -->
          <tr>
            <td style="padding-bottom: 16px;">
              <p style="font-size: 16px; font-weight: 500; line-height: 1.5; color: ${colors.textPrimary}; margin: 0 0 12px 0;">
                ${greeting}
              </p>
              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textSecondary}; margin: 0;">
                ${introText}
              </p>
            </td>
          </tr>

          <!-- ABOVE THE FOLD: SINGLE TELLA SOFT PILL CTA BUTTON -->
          <tr>
            <td style="padding-bottom: 28px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${youtubeUrl}" style="height:44px;v-text-anchor:middle;width:280px;" arcsize="25%" stroke="f" fillcolor="${colors.btnPrimaryBg}">
                <w:anchorlock/>
                <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:bold;">${mainCtaLabel}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${youtubeUrl}" target="_blank" style="background-color: ${colors.btnPrimaryBg}; border-radius: 10px; color: #ffffff !important; display: inline-block; font-size: 15px; font-weight: 600; line-height: 44px; padding: 0 28px; text-align: center; text-decoration: none; -webkit-text-size-adjust: none;">
                ${mainCtaLabel}
              </a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- HERO MEDIA CARD 1: Clean Tella Video Timeline Screenshot -->
          <tr>
            <td style="padding-bottom: 32px;">
              <a href="${youtubeUrl}" target="_blank" style="display: block; text-decoration: none;">
                <img src="${baseUrl}/email-assets/tella_editor.jpg" alt="The new Cut timeline" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 12px; display: block; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- Feature Section 1: 9:16 Vertical Reel Timeline (Title + Text + Numbered List) -->
          <tr>
            <td style="padding-bottom: 32px;">
              <h2 style="font-size: 20px; font-weight: 700; color: ${colors.textPrimary}; margin: 0 0 12px 0;">
                ${isEs ? "Edición de línea de tiempo rítmica 9:16" : "High-pacing 9:16 vertical timeline editing"}
              </h2>

              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textSecondary}; margin: 0 0 16px 0;">
                ${isEs
                  ? "Transformamos tomas planas en piezas dinámicas de formato vertical optimizadas para Instagram Reels, TikTok y YouTube Shorts. Tres detalles clave que hacen la diferencia:"
                  : "We turn raw unedited clips into high-pacing vertical assets optimized for Instagram Reels, TikTok, and YouTube Shorts. Three key details that drive results:"}
              </p>

              <!-- Numbered Advice List (Exact Tella Style) -->
              <ol style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.7; color: ${colors.textSecondary};">
                <li style="margin-bottom: 12px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">Gancho de interrupción (0-3s).</strong> ${isEs ? "El 80% de los usuarios desliza si los primeros 3 segundos no capturan su atención. Editamos ganchos visuales que detienen el scroll." : "80% of users scroll past if the first 3 seconds don't grab attention. We edit visual pattern-interrupt hooks that stop the scroll."}
                </li>
                <li style="margin-bottom: 12px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">Subtítulos dinámicos activos.</strong> ${isEs ? "El 85% del video en redes se mira sin sonido. Los subtítulos kinéticos resaltados duplican el tiempo de retención." : "85% of social video is watched on mute. Kinetic highlighted captions double your view duration."}
                </li>
                <li>
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">Mezcla de audio a -14 LUFS.</strong> ${isEs ? "Masterizamos la voz para que suene clara y nítida en cualquier altavoz de teléfono móvil." : "Dialogue audio mastering to -14 LUFS so speech sounds crisp on any smartphone speaker."}
                </li>
              </ol>
            </td>
          </tr>

          <!-- HERO MEDIA CARD 2: Esteban on Set with Cinema Camera -->
          <tr>
            <td style="padding-bottom: 24px;">
              <a href="${targetSiteUrl}" target="_blank" style="display: block; text-decoration: none;">
                <img src="${baseUrl}/email-assets/website_hero.jpg" alt="Esteban Moreno Production Studio" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 12px; display: block; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- Feature Section 2: Production & Portfolio Showcase -->
          <tr>
            <td style="padding-bottom: 32px;">
              <h2 style="font-size: 20px; font-weight: 700; color: ${colors.textPrimary}; margin: 0 0 12px 0;">
                ${isEs ? "Producción & Muestra de trabajos en South Florida" : "Production & South Florida video showcase"}
              </h2>

              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textSecondary}; margin: 0 0 20px 0;">
                ${isEs
                  ? "Desde locales de gastronomía en Wynwood hasta clínicas de estética en Aventura y firmas legales en Brickell, adaptamos cada edición a la identidad única de tu negocio."
                  : "From Wynwood hospitality venues to Aventura med spas and Brickell law firms, we tailor every edit to your brand's exact audience."}
              </p>

              <!-- HERO MEDIA CARD 3: Portfolio Showcase Carousel Grid -->
              <a href="${portfolioUrl}" target="_blank" style="display: block; text-decoration: none; margin-bottom: 24px;">
                <img src="${baseUrl}/email-assets/portfolio_carousel.jpg" alt="Featured Work Showcase" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 12px; display: block; border: 0;" />
              </a>
            </td>
          </tr>

          <!-- CONTEXTUAL BOTTOM CONTACT SECTION (Minimal Tella Footer Card) -->
          <tr>
            <td style="padding-bottom: 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.cardBg}; border: 1px solid ${colors.border}; border-radius: 14px; padding: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 15px; font-weight: 700; color: ${colors.textPrimary}; margin-bottom: 6px;">
                      ${isEs ? "¿Preguntas o deseas conversar directamente?" : "Have questions or want to connect directly?"}
                    </div>
                    <div style="font-size: 13px; line-height: 1.5; color: ${colors.textMuted}; margin-bottom: 14px;">
                      ${isEs ? "Puedes escribirle a Esteban por cualquier canal de tu preferencia:" : "Reach Esteban through your preferred channel:"}
                    </div>

                    <!-- Clean Text Links Row -->
                    <div style="font-size: 14px; font-weight: 600;">
                      <a href="${targetSiteUrl}" target="_blank" style="color: ${colors.accentColor} !important; text-decoration: none; margin-right: 16px;">
                        🌐 ${isEs ? "Sitio Web" : "Website"}
                      </a>
                      <a href="${whatsappLink}" target="_blank" style="color: #10b981 !important; text-decoration: none; margin-right: 16px;">
                        💬 WhatsApp
                      </a>
                      <a href="${smsLink}" target="_blank" style="color: #38bdf8 !important; text-decoration: none;">
                        📱 SMS / Texto
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Minimal Footer -->
          <tr>
            <td style="border-top: 1px solid ${colors.border}; padding-top: 24px; padding-bottom: 32px;">
              <p style="font-size: 13px; font-weight: 700; color: ${colors.textPrimary}; margin: 0 0 6px 0;">
                Esteban Moreno | Esteban Moreno Media
              </p>
              <p style="font-size: 12px; color: ${colors.textMuted}; margin: 0 0 12px 0;">
                📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317 &bull; South Florida Video Production
              </p>
              <p style="font-size: 12px; margin: 0;">
                <a href="${youtubeUrl}" style="color: ${colors.accentColor} !important; text-decoration: none; font-weight: 700;">Canal de YouTube</a> &bull; 
                <a href="${targetSiteUrl}" style="color: ${colors.textMuted} !important; text-decoration: none;">estebanmorenomedia.com</a> &bull; 
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
