/**
 * Esteban Media Official Tella Dark High-Impact Outreach Email Builder
 * 
 * Includes:
 * 1. 100% Tella Carbon Dark Theme (#121214 Canvas, #18181B Cards, #FFFFFF Typography).
 * 2. High-Impact Scroll-Stopping Hook.
 * 3. Personalized Audit Evidence Section (Video, Web Design & Google Business Profile Audit).
 * 4. Free Web & Google Business Profile Audit Offer ("🎁 Auditoría Gratuita de Sitio Web & Google Profile").
 * 5. Real High-Resolution Video Portfolio Assets (Bar Door Monkey Wynwood & Diana & Jack Wedding).
 * 6. Single Above-the-Fold Soft Pill Button + Contextual Bottom Contact Card (WhatsApp, SMS Redirect, Web Portfolio).
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
    auditFindings = null,
  } = options;

  const isEs = language === "es";
  const baseUrl = "https://estebanmorenomedia.com";
  const targetSiteUrl = isEs ? `${baseUrl}/es` : baseUrl;
  const targetPortfolioUrl = isEs ? `${baseUrl}/es/portafolio` : `${baseUrl}/portfolio`;

  // Clean phone number format for WhatsApp & SMS
  const cleanPhone = String(whatsappPhone).replace(/\D/g, "");
  const phoneWithCountryCode = cleanPhone.length === 10 ? `1${cleanPhone}` : cleanPhone;

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneWithCountryCode}&text=${encodeURIComponent(
    isEs ? `Hola Esteban, vi tu mensaje sobre la producción de video y auditoría web para ${targetName}` : `Hi Esteban, saw your message regarding video & web audit for ${targetName}`
  )}`;

  const smsLink = `${baseUrl}/api/sms?phone=${phoneWithCountryCode}&text=${encodeURIComponent(
    isEs ? `Hola Esteban, vi tu mensaje sobre la producción de video y auditoría web para ${targetName}` : `Hi Esteban, saw your message regarding video & web audit for ${targetName}`
  )}`;

  // Universal Carbon Dark Theme Colors
  const colors = {
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
    emerald: "#10b981",
  };

  const preheaderText = isEs
    ? `🔥 Auditoría Gratuita de Video, Web & Google Profile para ${targetName}`
    : `🔥 Free Video, Web & Google Profile Audit for ${targetName}`;

  const headline = isEs
    ? `🔥 El 80% de tus clientes pasa de largo en redes en 3 segundos. El secreto para detenerlos:`
    : `🔥 80% of potential customers scroll past social video in 3s. The secret to stopping them:`;

  const greeting = isEs
    ? `Hola equipo de ${targetName},`
    : `Hey ${targetName} Team,`;

  const introText = isEs
    ? `Auditamos la presencia digital de ${targetName} en ${city} (a solo <strong style="color: ${colors.brandOrange};">${distanceMiles} mi de nuestro estudio en SW 42nd Ave / 33317</strong>). Tienen excelentes opiniones (<strong style="color: #eab308;">${googleRating}★ con ${reviewCount} reseñas</strong>), y detectamos oportunidades claras de crecimiento en video vertical 9:16, diseño web y SEO en Google Business Profile.`
    : `We audited ${targetName}'s digital footprint in ${city} (only <strong style="color: ${colors.brandOrange};">${distanceMiles} mi from our studio at 1811 SW 42nd Ave / 33317</strong>). You have awesome Google reviews (<strong style="color: #eab308;">${googleRating}★ with ${reviewCount} reviews</strong>), and we detected clear growth gaps in 9:16 video, web design, and Google Business Profile SEO.`;

  const mainCtaLabel = isEs
    ? "Ver Portafolio de Videos en Vivo →"
    : "View Live Video Portfolio →";

  // Default empirical audit evidence items
  const defaultAuditItems = isEs
    ? [
        {
          icon: "⭐️",
          title: `${googleRating}★ con ${reviewCount} Reseñas en Google Maps`,
          desc: `Sus clientes amarían su servicio, pero al buscar su negocio en redes, no encuentran un Reel promocional 9:16 fijado que muestre la experiencia en movimiento.`,
        },
        {
          icon: "🌐",
          title: `🎁 INCLUIDO: Auditoría de Sitio Web & Conversión Móvil`,
          desc: `Evaluamos gratuitamente la velocidad de carga, la estructura UX y la tasa de conversión de su sitio web actual para garantizar que los visitantes se conviertan en clientes pagados.`,
        },
        {
          icon: "📍",
          title: `🎁 INCLUIDO: Optimización de Ficha de Google Business Profile`,
          desc: `Analizamos su posicionamiento en el mapa local de Fort Lauderdale/Broward para optimizar palabras clave, fotos geotagged y menciones locales que atraen tráfico constante.`,
        },
        {
          icon: "📱",
          title: `Retención en Modo Silencioso (85%)`,
          desc: `El 85% de las reproducciones ocurren sin sonido. Incorporar subtítulos kinéticos activos duplica el tiempo de retención visual frente a competidores locales.`,
        },
      ]
    : [
        {
          icon: "⭐️",
          title: `${googleRating}★ with ${reviewCount} Google Maps Reviews`,
          desc: `Your customers love your service, but prospective clients on social media don't find a pinned 9:16 promo Reel showing your experience in motion.`,
        },
        {
          icon: "🌐",
          title: `🎁 INCLUDED: Free Web Design & Mobile UX Audit`,
          desc: `We perform a free load-speed, mobile UX, and conversion audit on your current website to ensure visitors turn into paying customers.`,
        },
        {
          icon: "📍",
          title: `🎁 INCLUDED: Google Business Profile SEO Audit`,
          desc: `We evaluate your local map placement in Fort Lauderdale/Broward to optimize keywords, geotagged photos, and local citations for peak foot traffic.`,
        },
        {
          icon: "📱",
          title: `85% Sound-Off Viewing Retention`,
          desc: `85% of social videos are watched on mute. Adding kinetic captions doubles retention compared to local competitors.`,
        },
      ];

  const auditItems = auditFindings || defaultAuditItems;

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
        
        <!-- 540px Tella Clean Inner Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 540px; text-align: left;">
          
          <!-- Top Header / Brand Logo + Studio Badge -->
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
                    <span style="font-size: 12px; color: ${colors.textMuted}; font-weight: 600;">
                      📍 33317 Studio
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO TITLE (Scroll-Stopping 3s Hook Above The Fold) -->
          <tr>
            <td style="padding-bottom: 16px;">
              <h1 style="font-size: 24px; font-weight: 800; line-height: 1.3; color: ${colors.textPrimary}; letter-spacing: -0.02em; margin: 0 0 14px 0;">
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

          <!-- ABOVE THE FOLD: SINGLE AMBER ORANGE PILL CTA BUTTON (Routes to /portafolio) -->
          <tr>
            <td style="padding-top: 16px; padding-bottom: 28px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${targetPortfolioUrl}" style="height:46px;v-text-anchor:middle;width:300px;" arcsize="50%" stroke="f" fillcolor="${colors.brandOrangeBg}">
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

          <!-- EMPIRICAL AUDIT EVIDENCE & FREE GIFTS CARD -->
          <tr>
            <td style="padding-bottom: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.cardBg}; border: 1px solid ${colors.border}; border-radius: 16px; padding: 22px;">
                <tr>
                  <td>
                    <div style="font-size: 16px; font-weight: 800; color: ${colors.textPrimary}; margin-bottom: 14px; letter-spacing: -0.01em;">
                      📋 ${isEs ? `Auditoría Digital & Evaluación Gratuita para ${targetName}` : `Digital Audit & Free Evaluation for ${targetName}`}
                    </div>

                    ${auditItems
                      .map(
                        (item) => `
                    <div style="margin-bottom: 14px;">
                      <div style="font-size: 14px; font-weight: 700; color: ${colors.brandOrange}; margin-bottom: 4px;">
                        ${item.icon} ${item.title}
                      </div>
                      <div style="font-size: 13px; line-height: 1.5; color: ${colors.textMuted};">
                        ${item.desc}
                      </div>
                    </div>`
                      )
                      .join("")}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO PHOTO 1: Esteban Filming On Set with Cinema Camera -->
          <tr>
            <td style="padding-bottom: 32px;">
              <div style="border-radius: 16px; border: 1px solid ${colors.border}; overflow: hidden; margin-bottom: 10px;">
                <a href="${targetSiteUrl}" target="_blank" style="display: block; text-decoration: none;">
                  <img src="${baseUrl}/email-assets/website_hero.jpg" alt="Esteban Moreno Filming On Set" width="540" style="width: 100%; max-width: 540px; height: auto; border-radius: 16px; display: block; border: 0;" />
                </a>
              </div>
              <div style="font-size: 12px; font-weight: 700; color: ${colors.textMuted}; text-transform: uppercase; letter-spacing: 0.5px;">
                📷 ESTUDIO DE PRODUCCIÓN EN FORT LAUDERDALE (1811 SW 42ND AVE)
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
                ${isEs ? "Edición de línea de tiempo rítmica 9:16 & Servicios Web" : "9:16 Vertical Timeline Editing & Web Services"}
              </h2>

              <p style="font-size: 15px; line-height: 1.6; color: ${colors.textMuted}; margin: 0 0 18px 0;">
                ${isEs
                  ? "Transformamos tomas brutas en piezas dinámicas de formato vertical optimizadas para Instagram Reels, TikTok y YouTube Shorts, y construimos sitios web ultrarrápidos integrados:"
                  : "We turn raw unedited clips into high-pacing vertical assets optimized for Instagram Reels, TikTok, and YouTube Shorts, and build ultrafast custom websites:"}
              </p>

              <!-- Exact Tella Style Numbered List -->
              <ol style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.7; color: ${colors.textMuted};">
                <li style="margin-bottom: 12px; padding-left: 4px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">${isEs ? "Gancho de interrupción (0-3s)." : "Pattern-interrupt hook (0-3s)."}</strong> ${isEs ? "El 80% de los usuarios desliza si los primeros 3 segundos no capturan su atención. Editamos ganchos visuales que detienen el scroll." : "80% of users scroll past if the first 3 seconds don't grab attention. We edit visual hooks that stop the scroll."}
                </li>
                <li style="margin-bottom: 12px; padding-left: 4px;">
                  <strong style="color: ${colors.textPrimary}; font-style: italic;">${isEs ? "Diseño Web Ultra-Rápido & SEO Local." : "Ultra-Fast Web Design & Local SEO."}</strong> ${isEs ? "Diseñamos páginas web modernas en Next.js con integración de video 4K para convertir visitas en reservas directas." : "We build modern Next.js websites integrated with 4K video to turn traffic into direct reservations."}
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

          <!-- CONTEXTUAL BOTTOM CONTACT SECTION (Generous Padding, Spaced Pill Buttons) -->
          <tr>
            <td style="padding-bottom: 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.cardBg}; border: 1px solid ${colors.border}; border-radius: 16px;">
                <tr>
                  <td style="padding: 24px 20px;">
                    <div style="font-size: 16px; font-weight: 700; color: ${colors.textPrimary}; margin-bottom: 8px;">
                      ${isEs ? "¿Deseas solicitar tu Auditoría Web & Google Profile Gratis?" : "Want to request your Free Web & Google Profile Audit?"}
                    </div>
                    <div style="font-size: 14px; line-height: 1.5; color: ${colors.textMuted}; margin-bottom: 18px;">
                      ${isEs ? "Escríbele a Esteban directamente por el canal que prefieras:" : "Reach Esteban through your preferred channel:"}
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
                          <a href="${targetPortfolioUrl}" target="_blank" style="background-color: #27272a; border: 1px solid #3f3f46; color: #ffffff !important; border-radius: 20px; font-size: 13px; font-weight: 700; padding: 10px 18px; text-decoration: none; display: inline-block; margin-bottom: 8px;">
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
                📍 1811 SW 42nd Ave, Fort Lauderdale, FL 33317 &bull; Video & Web Studio
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
