/**
 * Esteban Media Official Tella & Canva Email Design System (Exact Match to Reference Screenshots)
 * 
 * Key Aesthetic Enhancements:
 * 1. Carbon Dark Theme (#1C1D22 background, #24252B cards, crisp #FFFFFF headers, #A1A1AA body text).
 * 2. Canva-style header with left brand logo and right glassmorphism pill badge ("Ver Portafolio").
 * 3. Tella-style Typography: 28px bold title, personalized greeting, and soft violet pill CTA button ABOVE THE FOLD.
 * 4. High-Res Media Cards with 16px rounded corners & subtle 1px border.
 * 5. Signature Tella Numbered List formatting: 1. *Italicized Lead-in Title Phrase.* Description.
 * 6. Contact card & minimal footer with location tag (📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317).
 */

export function buildTechOutreachHtmlEmail(options = {}) {
  const {
    targetName = "Davie Blvd Latin Bistro & Grill",
    city = "Fort Lauderdale",
    distanceMiles = "0.5",
    googleRating = "4.8",
    reviewCount = "142",
    language = "es",
    portfolioUrl = "https://estebanmorenomedia.com/es/portafolio",
    youtubeUrl = "https://www.youtube.com/@estebanmorenolopez3811",
    calculatorUrl = "https://estebanmorenomedia.com/calculator",
    contactEmail = "esmolopez@gmail.com",
    whatsappPhone = "13054974478",
    theme = "dark",
  } = options;

  const isEs = language === "es";
  const baseUrl = "https://estebanmorenomedia.com";
  const targetSiteUrl = isEs ? `${baseUrl}/es` : baseUrl;

  // Clean phone number format for WhatsApp & SMS
  const cleanPhone = String(whatsappPhone).replace(/\D/g, "");
  const phoneWithCountryCode = cleanPhone.length === 10 ? `1${cleanPhone}` : cleanPhone;

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneWithCountryCode}&text=${encodeURIComponent(
    isEs ? `Hola Esteban, vi tu mensaje sobre la producción de video para ${targetName}` : `Hi Esteban, saw your message regarding video production for ${targetName}`
  )}`;

  const smsLink = `sms:+${phoneWithCountryCode}?body=${encodeURIComponent(
    isEs ? `Hola Esteban, vi tu mensaje sobre la producción de video para ${targetName}` : `Hi Esteban, saw your message regarding video production for ${targetName}`
  )}`;

  const isDark = theme === "dark";
  const colors = isDark
    ? {
        bgColor: "#1C1D22",
        cardBg: "#24252B",
        textPrimary: "#FFFFFF",
        textSecondary: "#E4E4E7",
        textMuted: "#A1A1AA",
        border: "#2E3038",
        btnPrimaryBg: "#9D6DFD",
        btnPrimaryText: "#0F0F12",
        badgeBg: "rgba(255, 255, 255, 0.08)",
        badgeBorder: "rgba(255, 255, 255, 0.14)",
        accentColor: "#F97316",
      }
    : {
        bgColor: "#FAF5EE",
        cardBg: "#FFFFFF",
        textPrimary: "#1E293B",
        textSecondary: "#475569",
        textMuted: "#64748B",
        border: "#E2E8F0",
        btnPrimaryBg: "#8B5CF6",
        btnPrimaryText: "#FFFFFF",
        badgeBg: "#F1F5F9",
        badgeBorder: "#CBD5E1",
        accentColor: "#EA580C",
      };

  const preheaderText = isEs
    ? `Muestra de Video 9:16 y Consejos de Contenido para ${targetName}`
    : `9:16 Video Showcase & Content Tips for ${targetName}`;

  const headline = isEs
    ? `Optimizaciones de video 9:16, nueva línea de tiempo y edición rítmica`
    : `9:16 Vertical Reels, a new pacing timeline, and video upgrades`;

  const greeting = isEs
    ? `Hola equipo de ${targetName},`
    : `Hey ${targetName} Team,`;

  const introText = isEs
    ? `Auditamos la presencia digital de ${targetName} en ${city} (a solo <strong style="color: ${colors.accentColor};">${distanceMiles} mi de nuestro estudio en SW 42nd Ave</strong>). Tienen excelentes opiniones (<strong style="color: #EAB308;">${googleRating}★ con ${reviewCount} reseñas</strong>), y con Reels verticales de alto impacto pueden duplicar la conversión de clientes.`
    : `We audited ${targetName}'s digital footprint in ${city} (only <strong style="color: ${colors.accentColor};">${distanceMiles} mi from our studio at SW 42nd Ave</strong>). You have awesome Google reviews (<strong style="color: #EAB308;">${googleRating}★ with ${reviewCount} reviews</strong>), and high-impact vertical Reels will double your customer acquisition.`;

  const mainCtaLabel = isEs
    ? "Ver todos los ejemplos (3 min)"
    : "Watch all video showcases (3 min)";

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
<body style="margin: 0; padding: 0; background-color: ${colors.bgColor}; color: ${colors.textPrimary}; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  
  <!-- Hidden Preheader -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ${preheaderText} &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Outer Canvas Table -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.bgColor}; width: 100%; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 40px 16px; background-color: ${colors.bgColor};">
        
        <!-- 540px Tella & Canva Clean Inner Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 540px; text-align: left;">
          
          <!-- Top Header / Brand Logo + Canva Glass Badge -->
          <tr>
            <td style="padding-bottom: 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td vertical-align="middle">
                    <a href="${targetSiteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${colors.btnPrimaryBg}; margin-right: 8px; vertical-align: middle;"></span>
                      <span style="font-size: 15px; font-weight: 800; letter-spacing: -0.4px; color: ${colors.textPrimary}; text-transform: uppercase;">
                        ESTEBAN MORENO <span style="color: ${colors.btnPrimaryBg};">MEDIA</span>
                      </span>
                    </a>
                  </td>
                  <td align="right" vertical-align="middle">
                    <a href="${portfolioUrl}" target="_blank" style="background-color: ${colors.badgeBg}; border: 1px solid ${colors.badgeBorder}; color: ${colors.textPrimary}; border-radius: 8px; font-size: 13px; font-weight: 600; padding: 7px 14px; text-decoration: none; display: inline-block;">
                      ${isEs ? "Ver Portafolio" : "View Portfolio"}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO TITLE (Tella & Canva Large Headline Style) -->
          <tr>
            <td style="padding-bottom: 16px;">
              <h1 style="font-size: 28px; font-weight: 800; line-height: 1.25; color: ${colors.textPrimary}; letter-spacing: -0.02em; margin: 0 0 16px 0;">
                ${headline}
              </h1>
              <p style="font-size: 16px; font-weight: 600; line-height: 1.5; color: ${colors.textPrimary}; margin: 0 0 10px 0;">
                ${greeting}
              </p>
              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textMuted}; margin: 0;">
                ${introText}
              </p>
            </td>
          </tr>

          <!-- ABOVE THE FOLD: SINGLE TELLA SOFT VIOLET PILL CTA BUTTON -->
          <tr>
            <td style="padding-top: 20px; padding-bottom: 28px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${youtubeUrl}" style="height:46px;v-text-anchor:middle;width:290px;" arcsize="50%" stroke="f" fillcolor="${colors.btnPrimaryBg}">
                <w:anchorlock/>
                <center style="color:${colors.btnPrimaryText};font-family:sans-serif;font-size:15px;font-weight:bold;">${mainCtaLabel}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${youtubeUrl}" target="_blank" style="background-color: ${colors.btnPrimaryBg}; border-radius: 9999px; color: ${colors.btnPrimaryText} !important; display: inline-block; font-size: 15px; font-weight: 700; line-height: 46px; padding: 0 32px; text-align: center; text-decoration: none; -webkit-text-size-adjust: none; box-shadow: 0 4px 16px rgba(157, 109, 253, 0.35);">
                ${mainCtaLabel}
              </a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- HERO MEDIA CARD 1: High-Res Tella Editor Thumbnail with 16px rounded corners & subtle border -->
          <tr>
            <td style="padding-bottom: 36px;">
              <div style="border-radius: 16px; border: 1px solid ${colors.badgeBorder}; overflow: hidden;">
                <a href="${youtubeUrl}" target="_blank" style="display: block; text-decoration: none;">
                  <img src="${baseUrl}/email-assets/tella_editor.jpg" alt="The new Cut timeline" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 16px; display: block; border: 0;" />
                </a>
              </div>
            </td>
          </tr>

          <!-- Feature Section 1: Exact Tella Section Header & Numbered List -->
          <tr>
            <td style="padding-bottom: 36px;">
              <h2 style="font-size: 22px; font-weight: 700; color: ${colors.textPrimary}; letter-spacing: -0.01em; margin: 0 0 12px 0;">
                ${isEs ? "Edición de línea de tiempo rítmica 9:16" : "High-pacing 9:16 vertical timeline editing"}
              </h2>

              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textMuted}; margin: 0 0 18px 0;">
                ${isEs
                  ? "Transformamos tomas brutas en piezas dinámicas de formato vertical optimizadas para Instagram Reels, TikTok y YouTube Shorts. Tres detalles clave que aumentan la conversión:"
                  : "We turn raw unedited clips into high-pacing vertical assets optimized for Instagram Reels, TikTok, and YouTube Shorts. Three key details that drive results:"}
              </p>

              <!-- Exact Tella Style Numbered List: 1. *Italicized Lead Phrase.* Text -->
              <ol style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.7; color: ${colors.textMuted};">
                <li style="margin-bottom: 14px; padding-left: 4px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">${isEs ? "Gancho de interrupción (0-3s)." : "Pattern-interrupt hook (0-3s)."}</strong> ${isEs ? "El 80% de los usuarios desliza si los primeros 3 segundos no capturan su atención. Editamos ganchos visuales que detienen el scroll." : "80% of users scroll past if the first 3 seconds don't grab attention. We edit visual hooks that stop the scroll."}
                </li>
                <li style="margin-bottom: 14px; padding-left: 4px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">${isEs ? "Subtítulos kinéticos activos." : "Dynamic active captions."}</strong> ${isEs ? "El 85% del video en redes se mira sin sonido. Los subtítulos dinámicos resaltados duplican el tiempo de retención." : "85% of social video is watched on mute. Kinetic highlighted captions double your view duration."}
                </li>
                <li style="padding-left: 4px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">${isEs ? "Mezcla de audio a -14 LUFS." : "Dialogue audio mastering (-14 LUFS)."}</strong> ${isEs ? "Masterizamos la voz para que suene clara y nítida en cualquier altavoz de teléfono móvil." : "Audio speech mastering so voiceover sounds crisp on any smartphone speaker."}
                </li>
              </ol>
            </td>
          </tr>

          <!-- HERO MEDIA CARD 2: Production Studio Visual Card -->
          <tr>
            <td style="padding-bottom: 28px;">
              <div style="border-radius: 16px; border: 1px solid ${colors.badgeBorder}; overflow: hidden;">
                <a href="${targetSiteUrl}" target="_blank" style="display: block; text-decoration: none;">
                  <img src="${baseUrl}/email-assets/website_hero.jpg" alt="Esteban Moreno Production Studio" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 16px; display: block; border: 0;" />
                </a>
              </div>
            </td>
          </tr>

          <!-- Feature Section 2: Production & Portfolio Showcase -->
          <tr>
            <td style="padding-bottom: 36px;">
              <h2 style="font-size: 22px; font-weight: 700; color: ${colors.textPrimary}; letter-spacing: -0.01em; margin: 0 0 12px 0;">
                ${isEs ? "Producción & Muestra de trabajos en South Florida" : "Production & South Florida video showcase"}
              </h2>

              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textMuted}; margin: 0 0 20px 0;">
                ${isEs
                  ? "Desde locales de gastronomía en Wynwood hasta clínicas de estética en Aventura y firmas legales en Brickell, adaptamos cada edición a la identidad única de tu negocio."
                  : "From Wynwood hospitality venues to Aventura med spas and Brickell law firms, we tailor every edit to your brand's exact audience."}
              </p>

              <!-- HERO MEDIA CARD 3: Portfolio Showcase Carousel Grid -->
              <div style="border-radius: 16px; border: 1px solid ${colors.badgeBorder}; overflow: hidden; margin-bottom: 24px;">
                <a href="${portfolioUrl}" target="_blank" style="display: block; text-decoration: none;">
                  <img src="${baseUrl}/email-assets/portfolio_carousel.jpg" alt="Featured Work Showcase" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 16px; display: block; border: 0;" />
                </a>
              </div>
            </td>
          </tr>

          <!-- CONTEXTUAL BOTTOM CONTACT SECTION (Minimal Tella Glass Card) -->
          <tr>
            <td style="padding-bottom: 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.cardBg}; border: 1px solid ${colors.border}; border-radius: 16px; padding: 22px;">
                <tr>
                  <td>
                    <div style="font-size: 16px; font-weight: 700; color: ${colors.textPrimary}; margin-bottom: 6px;">
                      ${isEs ? "¿Tienes alguna pregunta o deseas conversar directamente?" : "Have questions or want to connect directly?"}
                    </div>
                    <div style="font-size: 14px; line-height: 1.5; color: ${colors.textMuted}; margin-bottom: 16px;">
                      ${isEs ? "Puedes escribirle a Esteban directamente por el canal que prefieras:" : "Reach Esteban through your preferred channel:"}
                    </div>

                    <!-- Clean Direct Communication Pill Badges -->
                    <div style="font-size: 13px; font-weight: 600; padding-top: 4px;">
                      <a href="${whatsappLink}" target="_blank" style="background-color: #059669; color: #ffffff !important; border-radius: 8px; font-size: 13px; font-weight: 600; padding: 8px 14px; text-decoration: none; display: inline-block; margin-right: 8px; margin-bottom: 8px;">
                        💬 WhatsApp (305-497-4478)
                      </a>
                      <a href="${smsLink}" target="_blank" style="background-color: #0284c7; color: #ffffff !important; border-radius: 8px; font-size: 13px; font-weight: 600; padding: 8px 14px; text-decoration: none; display: inline-block; margin-right: 8px; margin-bottom: 8px;">
                        📱 SMS / Texto
                      </a>
                      <a href="${targetSiteUrl}" target="_blank" style="background-color: ${colors.badgeBg}; border: 1px solid ${colors.badgeBorder}; color: ${colors.textPrimary} !important; border-radius: 8px; font-size: 13px; font-weight: 600; padding: 8px 14px; text-decoration: none; display: inline-block; margin-bottom: 8px;">
                        🌐 ${isEs ? "Sitio Web" : "Website"}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Minimal Tella Footer -->
          <tr>
            <td style="border-top: 1px solid ${colors.border}; padding-top: 24px; padding-bottom: 32px;">
              <p style="font-size: 13px; font-weight: 700; color: ${colors.textPrimary}; margin: 0 0 6px 0;">
                Esteban Moreno | Esteban Moreno Media
              </p>
              <p style="font-size: 12px; color: ${colors.textMuted}; margin: 0 0 12px 0;">
                📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317 &bull; South Florida Video Production
              </p>
              <p style="font-size: 12px; margin: 0;">
                <a href="${youtubeUrl}" style="color: ${colors.btnPrimaryBg} !important; text-decoration: none; font-weight: 700;">Canal de YouTube</a> &bull; 
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
