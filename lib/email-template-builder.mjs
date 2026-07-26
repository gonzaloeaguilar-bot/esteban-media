/**
 * Esteban Media Official Email Design System (Warm Cream & Amber Orange)
 * 
 * Aesthetic Specs:
 * 1. Warm Cream (#FAF5EE) & Amber Orange (#EA580C / #F97316) Palette — ZERO Purple/Violet.
 * 2. Restores Esteban's real on-set filming photo (`/email-assets/website_hero.jpg`) above the fold.
 * 3. Uses Esteban's real video portfolio assets (`bar_door_monkey.jpg` & `diana_jack_wedding.jpg`).
 * 4. 100% routes to estebanmorenomedia.com/portafolio (no YouTube redirects).
 * 5. Generous card padding & spacing to prevent any button from clipping card edges.
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
    contactEmail = "esmolopez@gmail.com",
    whatsappPhone = "13054974478",
    theme = "cream", // Default theme is Warm Cream & Amber Orange
  } = options;

  const isEs = language === "es";
  const baseUrl = "https://estebanmorenomedia.com";
  const targetSiteUrl = isEs ? `${baseUrl}/es` : baseUrl;
  const targetPortfolioUrl = isEs ? `${baseUrl}/es/portafolio` : `${baseUrl}/portfolio`;

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
        bgColor: "#121214",
        cardBg: "#18181b",
        textPrimary: "#ffffff",
        textSecondary: "#e4e4e7",
        textMuted: "#a1a1aa",
        border: "#27272a",
        brandOrange: "#f97316",
        brandOrangeBg: "#ea580c",
        badgeBg: "rgba(249, 115, 22, 0.12)",
        badgeBorder: "rgba(249, 115, 22, 0.25)",
      }
    : {
        bgColor: "#faf5ee",
        cardBg: "#fffdf9",
        textPrimary: "#1e293b",
        textSecondary: "#475569",
        textMuted: "#64748b",
        border: "#e2e8f0",
        brandOrange: "#ea580c",
        brandOrangeBg: "#ea580c",
        badgeBg: "#fef3c7",
        badgeBorder: "#fde68a",
      };

  const preheaderText = isEs
    ? `Trabajos Reales de Video 9:16 y Consejos para ${targetName}`
    : `Real 9:16 Video Showcase & Content Tips for ${targetName}`;

  const headline = isEs
    ? `Portafolio de video real, edición 9:16 y consejos de conversión`
    : `Real video portfolio, 9:16 vertical Reels and conversion tips`;

  const greeting = isEs
    ? `Hola equipo de ${targetName},`
    : `Hey ${targetName} Team,`;

  const introText = isEs
    ? `Auditamos la presencia digital de ${targetName} en ${city} (a solo <strong style="color: ${colors.brandOrange};">${distanceMiles} mi de nuestro estudio en SW 42nd Ave</strong>). Tienen excelentes opiniones (<strong style="color: #eab308;">${googleRating}★ con ${reviewCount} reseñas</strong>), y con Reels verticales de alto impacto pueden duplicar la conversión de clientes.`
    : `We audited ${targetName}'s digital footprint in ${city} (only <strong style="color: ${colors.brandOrange};">${distanceMiles} mi from our studio at SW 42nd Ave</strong>). You have awesome Google reviews (<strong style="color: #eab308;">${googleRating}★ with ${reviewCount} reviews</strong>), and high-impact vertical Reels will double your customer acquisition.`;

  const mainCtaLabel = isEs
    ? "Ver Portafolio de Videos →"
    : "View Video Portfolio →";

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
      <td align="center" style="padding: 36px 16px; background-color: ${colors.bgColor};">
        
        <!-- 540px Tella & Canva Clean Inner Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 540px; text-align: left;">
          
          <!-- Top Header / Brand Logo + Amber Badge -->
          <tr>
            <td style="padding-bottom: 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <a href="${targetSiteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${colors.brandOrange}; margin-right: 8px; vertical-align: middle;"></span>
                      <span style="font-size: 15px; font-weight: 800; letter-spacing: -0.4px; color: ${colors.textPrimary}; text-transform: uppercase;">
                        ESTEBAN MORENO <span style="color: ${colors.brandOrange};">MEDIA</span>
                      </span>
                    </a>
                  </td>
                  <td align="right" valign="middle">
                    <a href="${targetPortfolioUrl}" target="_blank" style="background-color: ${colors.badgeBg}; border: 1px solid ${colors.badgeBorder}; color: ${colors.brandOrange}; border-radius: 8px; font-size: 13px; font-weight: 700; padding: 7px 14px; text-decoration: none; display: inline-block;">
                      ${isEs ? "Ver Portafolio" : "View Portfolio"}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO TITLE (Above The Fold) -->
          <tr>
            <td style="padding-bottom: 16px;">
              <h1 style="font-size: 26px; font-weight: 800; line-height: 1.25; color: ${colors.textPrimary}; letter-spacing: -0.02em; margin: 0 0 14px 0;">
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

          <!-- ABOVE THE FOLD: SINGLE AMBER ORANGE PILL CTA BUTTON -->
          <tr>
            <td style="padding-top: 16px; padding-bottom: 24px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${targetPortfolioUrl}" style="height:46px;v-text-anchor:middle;width:280px;" arcsize="50%" stroke="f" fillcolor="${colors.brandOrangeBg}">
                <w:anchorlock/>
                <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:bold;">${mainCtaLabel}</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${targetPortfolioUrl}" target="_blank" style="background-color: ${colors.brandOrangeBg}; border-radius: 24px; color: #ffffff !important; display: inline-block; font-size: 15px; font-weight: 700; line-height: 46px; padding: 0 32px; text-align: center; text-decoration: none; -webkit-text-size-adjust: none; box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35);">
                ${mainCtaLabel}
              </a>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- RESTORED: ESTEBAN ON SET FILMING PHOTO (Website Hero Photo) -->
          <tr>
            <td style="padding-bottom: 32px;">
              <div style="border-radius: 16px; border: 1px solid ${colors.border}; overflow: hidden; margin-bottom: 10px;">
                <a href="${targetSiteUrl}" target="_blank" style="display: block; text-decoration: none;">
                  <img src="${baseUrl}/email-assets/website_hero.jpg" alt="Esteban Moreno Filming On Set" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 16px; display: block; border: 0;" />
                </a>
              </div>
              <div style="font-size: 12px; font-weight: 700; color: ${colors.textMuted}; text-transform: uppercase; letter-spacing: 0.5px;">
                📷 ESTUDIO DE PRODUCCIÓN DE VIDEO EN FORT LAUDERDALE (1811 SW 42ND AVE)
              </div>
            </td>
          </tr>

          <!-- REAL HERO PORTFOLIO WORK 1: Bar Door Monkey (Wynwood Nightlife Reel) -->
          <tr>
            <td style="padding-bottom: 32px;">
              <div style="border-radius: 16px; border: 1px solid ${colors.border}; overflow: hidden; margin-bottom: 10px;">
                <a href="${targetPortfolioUrl}/bar-door-monkey" target="_blank" style="display: block; text-decoration: none;">
                  <img src="${baseUrl}/email-assets/bar_door_monkey.jpg" alt="Bar Door Monkey Wynwood Miami Nightlife Reel" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 16px; display: block; border: 0;" />
                </a>
              </div>
              <div style="font-size: 13px; font-weight: 700; color: ${colors.brandOrange}; text-transform: uppercase; letter-spacing: 0.5px;">
                🍸 ${isEs ? "TRABAJO REAL: Bar Door Monkey — Wynwood Miami Nightlife Reel 9:16" : "FEATURED WORK: Bar Door Monkey — Wynwood Miami Nightlife Reel 9:16"}
              </div>
            </td>
          </tr>

          <!-- Feature Section 1: Exact Tella Section Header & Numbered List -->
          <tr>
            <td style="padding-bottom: 32px;">
              <h2 style="font-size: 21px; font-weight: 700; color: ${colors.textPrimary}; letter-spacing: -0.01em; margin: 0 0 12px 0;">
                ${isEs ? "Edición de línea de tiempo rítmica 9:16" : "High-pacing 9:16 vertical timeline editing"}
              </h2>

              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textMuted}; margin: 0 0 18px 0;">
                ${isEs
                  ? "Transformamos tomas brutas en piezas dinámicas de formato vertical optimizadas para Instagram Reels, TikTok y YouTube Shorts. Tres detalles clave que aumentan la conversión:"
                  : "We turn raw unedited clips into high-pacing vertical assets optimized for Instagram Reels, TikTok, and YouTube Shorts. Three key details that drive results:"}
              </p>

              <!-- Exact Tella Style Numbered List -->
              <ol style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.7; color: ${colors.textMuted};">
                <li style="margin-bottom: 12px; padding-left: 4px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">${isEs ? "Gancho de interrupción (0-3s)." : "Pattern-interrupt hook (0-3s)."}</strong> ${isEs ? "El 80% de los usuarios desliza si los primeros 3 segundos no capturan su atención. Editamos ganchos visuales que detienen el scroll." : "80% of users scroll past if the first 3 seconds don't grab attention. We edit visual hooks that stop the scroll."}
                </li>
                <li style="margin-bottom: 12px; padding-left: 4px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">${isEs ? "Subtítulos kinéticos activos." : "Dynamic active captions."}</strong> ${isEs ? "El 85% del video en redes se mira sin sonido. Los subtítulos dinámicos resaltados duplican el tiempo de retención." : "85% of social video is watched on mute. Kinetic highlighted captions double your view duration."}
                </li>
                <li style="padding-left: 4px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">${isEs ? "Mezcla de audio a -14 LUFS." : "Dialogue audio mastering (-14 LUFS)."}</strong> ${isEs ? "Masterizamos la voz para que suene clara y nítida en cualquier altavoz de teléfono móvil." : "Audio speech mastering so voiceover sounds crisp on any smartphone speaker."}
                </li>
              </ol>
            </td>
          </tr>

          <!-- REAL HERO PORTFOLIO WORK 2: Diana & Jack (Luxury Wedding & Event Storytelling) -->
          <tr>
            <td style="padding-bottom: 32px;">
              <div style="border-radius: 16px; border: 1px solid ${colors.border}; overflow: hidden; margin-bottom: 10px;">
                <a href="${targetPortfolioUrl}/diana-jack" target="_blank" style="display: block; text-decoration: none;">
                  <img src="${baseUrl}/email-assets/diana_jack_wedding.jpg" alt="Diana & Jack Luxury Wedding Storytelling 4K" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 16px; display: block; border: 0;" />
                </a>
              </div>
              <div style="font-size: 13px; font-weight: 700; color: ${colors.brandOrange}; text-transform: uppercase; letter-spacing: 0.5px;">
                💍 ${isEs ? "TRABAJO REAL: Diana & Jack — Luxury Wedding & Event Storytelling 4K" : "FEATURED WORK: Diana & Jack — Luxury Wedding & Event Storytelling 4K"}
              </div>
            </td>
          </tr>

          <!-- CONTEXTUAL BOTTOM CONTACT SECTION (Generous Padding, Clean Pill Buttons) -->
          <tr>
            <td style="padding-bottom: 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.cardBg}; border: 1px solid ${colors.border}; border-radius: 16px;">
                <tr>
                  <td style="padding: 24px 20px;">
                    <div style="font-size: 16px; font-weight: 700; color: ${colors.textPrimary}; margin-bottom: 8px;">
                      ${isEs ? "¿Tienes alguna pregunta o deseas conversar directamente?" : "Have questions or want to connect directly?"}
                    </div>
                    <div style="font-size: 14px; line-height: 1.5; color: ${colors.textMuted}; margin-bottom: 18px;">
                      ${isEs ? "Puedes escribirle a Esteban directamente por el canal que prefieras:" : "Reach Esteban through your preferred channel:"}
                    </div>

                    <!-- Prominent Spaced High-Contrast Pill Buttons -->
                    <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <a href="${whatsappLink}" target="_blank" style="background-color: #059669; color: #ffffff !important; border-radius: 20px; font-size: 13px; font-weight: 700; padding: 10px 18px; text-decoration: none; display: inline-block; margin-right: 8px; margin-bottom: 8px;">
                            💬 WhatsApp (305-497-4478)
                          </a>
                          <a href="${smsLink}" target="_blank" style="background-color: #0284c7; color: #ffffff !important; border-radius: 20px; font-size: 13px; font-weight: 700; padding: 10px 18px; text-decoration: none; display: inline-block; margin-right: 8px; margin-bottom: 8px;">
                            📱 SMS / Texto
                          </a>
                          <a href="${targetPortfolioUrl}" target="_blank" style="background-color: #1e293b; color: #ffffff !important; border-radius: 20px; font-size: 13px; font-weight: 700; padding: 10px 18px; text-decoration: none; display: inline-block; margin-bottom: 8px;">
                            🌐 ${isEs ? "Sitio Web (Portafolio)" : "Website Portfolio"}
                          </a>
                        </td>
                      </tr>
                    </table>
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
                <a href="${targetPortfolioUrl}" style="color: ${colors.brandOrange} !important; text-decoration: none; font-weight: 700;">${isEs ? "Portafolio de Videos" : "Video Portfolio"}</a> &bull; 
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
