/**
 * Esteban Moreno Media — Compliant, Generic Outreach Email Builder
 *
 * Deliberately generic and offer-safe. It anchors on the CONFIRMED offer only:
 *   remote video editing of client-supplied footage (secondary: social content
 *   planning). Spanish-first, intermediate English.
 *
 * HARD guardrails baked in (see wiki: esteban-media-offer-confirmed-2026-07-25):
 *   - NO invented prices, packages, turnaround, or guaranteed deliverables.
 *   - NO testimonials, client names, review counts, ratings, or fabricated metrics.
 *   - NO "fully bilingual" claim (Spanish-first, intermediate English).
 *   - NEVER markets Esteban as a drone pilot (no FAA Part 107).
 *   - NO web-design / SEO / "free audit" claims (not the confirmed offer).
 *   - Accurate, non-deceptive From + Subject.
 *   - CAN-SPAM footer (physical address + working unsubscribe) always attached.
 */

import {
  SITE_BASE_URL,
  complianceFooterHtml,
  complianceFooterText,
} from "./outreach-compliance.mjs";

/** Accurate, non-deceptive subject line. */
export function buildCompliantSubject({ name = "", language = "es" } = {}) {
  const business = name ? ` para ${name}` : "";
  return language === "es"
    ? `Edición de video remota${business}`
    : `Remote video editing${name ? ` for ${name}` : ""}`;
}

/**
 * Build a compliant outreach email. Returns { subject, html, text }.
 * `email` is the recipient (used only to build the per-recipient unsubscribe link).
 */
export function buildCompliantOutreachEmail({
  name = "",
  city = "",
  igHandle = "",
  language = "es",
  email = "",
} = {}) {
  const isEs = language === "es";
  const subject = buildCompliantSubject({ name, language });
  const greetingName = name || (isEs ? "equipo" : "team");
  const portfolioUrl = `${SITE_BASE_URL}${isEs ? "/es/portafolio" : "/portfolio"}`;
  const cityLine = city ? (isEs ? ` en ${city}` : ` in ${city}`) : "";
  const igLine = igHandle
    ? isEs
      ? `Vi el contenido que publican en ${igHandle}. `
      : `I saw the content you post on ${igHandle}. `
    : "";

  const bodyLinesEs = [
    `Hola ${greetingName},`,
    "",
    `Soy Esteban Moreno, editor de video remoto. Ayudo a negocios locales${cityLine} a transformar el material que ya graban (el teléfono está bien) en contenido corto listo para publicar.`,
    "",
    `${igLine}Si tienen material grabado y no dan abasto con la edición, yo me encargo de eso de forma remota. También ofrezco planificación de contenido para publicar con constancia.`,
    "",
    `Aquí pueden ver ejemplos de mi trabajo: ${portfolioUrl}`,
    "",
    "Si les interesa, respondan a este correo y conversamos sobre lo que necesitan. Sin compromiso.",
    "",
    "Un saludo,",
    "Esteban Moreno — Esteban Moreno Media",
  ];

  const bodyLinesEn = [
    `Hi ${greetingName},`,
    "",
    `I'm Esteban Moreno, a remote video editor. I help local businesses${cityLine} turn the footage they already capture (phone footage is fine) into short, publish-ready content.`,
    "",
    `${igLine}If you have footage piling up and editing is the bottleneck, I handle that remotely. I also help with content planning so posting stays consistent.`,
    "",
    `You can see examples of my work here: ${portfolioUrl}`,
    "",
    "If that's useful, just reply to this email and we can talk about what you need. No obligation.",
    "",
    "Best,",
    "Esteban Moreno — Esteban Moreno Media",
  ];

  const lines = isEs ? bodyLinesEs : bodyLinesEn;
  const text = lines.join("\n") + complianceFooterText(email, { language });

  const htmlParagraphs = lines
    .filter((l) => l !== "")
    .map((l) => {
      // Linkify the portfolio URL inside the paragraph.
      const safe = l.replace(
        portfolioUrl,
        `<a href="${portfolioUrl}" style="color:#2563eb;text-decoration:underline;">${portfolioUrl}</a>`,
      );
      return `<p style="font-size:15px;line-height:1.6;color:#18181b;margin:0 0 14px 0;">${safe}</p>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;text-align:left;font-family:Arial,Helvetica,sans-serif;">
          <tr><td>
            ${htmlParagraphs}
            ${complianceFooterHtml(email, { language })}
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
