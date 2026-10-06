/**
 * Esteban Moreno Media — plain-text outreach builder.
 *
 * Why this exists next to lib/compliant-outreach-email.mjs: that builder
 * produces a styled HTML email. For 1:1 B2B outreach a styled HTML template
 * is simply the wrong format — it reads as a campaign, and Gmail files
 * campaigns under Promotions. This builder produces text/plain only, in the
 * shape of a message a person actually types:
 *
 *   - short (50-125 words), one ask, one question
 *   - at most one link, written raw
 *   - a lowercase, specific subject that accurately describes the message
 *   - a real signature with a reply-able address
 *   - a per-recipient observed detail, so the message is genuinely written
 *     for that business rather than blasted
 *
 * Compliance is NOT traded away. Every message carries a real physical postal
 * address and a working opt-out, because the mail is commercial. The opt-out
 * is a reply instruction, which is a valid CAN-SPAM opt-out mechanism only
 * because we honour it: scripts/process-outreach-replies.mjs adds anyone who
 * asks to the suppression list. Without that consumer running, this is not
 * compliant and the gate must block the send.
 *
 * Offer guardrails are unchanged (wiki: esteban-media-offer-confirmed-2026-07-25):
 * remote editing of client-supplied footage, plus content planning. No prices,
 * no packages, no turnaround, no guarantees, no testimonials, no client names,
 * no drone work, no "fully bilingual" claim.
 */

/** Subject lines the gate will accept: 60 chars max, so a long legal business
 * name ("Tropical Paradise Banquet and Conference Center") is cut back to the
 * part a human would actually type rather than overflowing the line. */
const SUBJECT_BUDGET = 60;

export function buildPlainSubject({ businessName = "", language = "es" } = {}) {
  const prefix = language === "es" ? "edición de video para " : "video editing for ";
  const bare = language === "es" ? "edición de video" : "video editing";
  const n = businessName.trim().replace(/\s*[|–—-].*$/, "").trim();
  if (!n) return bare;
  const room = SUBJECT_BUDGET - prefix.length;
  if (n.length <= room) return prefix + n;
  // Cut on a word boundary; if the first word alone does not fit, drop the name.
  const cut = n.slice(0, room).replace(/\s+\S*$/, "").trim();
  return cut ? prefix + cut : bare;
}

/**
 * The opt-out line. Plain, human, and a real instruction we honour.
 * `postalAddress` is required — an empty one must block the send upstream.
 */
export function buildFooter({ postalAddress = "", language = "es" } = {}) {
  const addr = postalAddress.trim();
  return language === "es"
    ? `\n\nSi no quieres que te vuelva a escribir, respóndeme y no te escribo más.\n${addr}`
    : `\n\nIf you'd rather I didn't write again, just reply and I won't.\n${addr}`;
}

/**
 * Build a plain-text outreach message.
 *
 * `angle` is the niche observation from data/outreach/niches.json. It is a
 * statement about the vertical, never a claim about this prospect's results.
 * `detail` is the per-recipient variation — a real, observed fact (their city,
 * their category, their Instagram handle). It is never invented: a missing
 * detail yields a shorter message, not a fabricated one.
 */
export function buildPlainOutreachEmail({
  businessName = "",
  angle = "",
  detail = "",
  language = "es",
  postalAddress = "",
  senderName = "Esteban Moreno",
  senderPhone = "",
  portfolioUrl = "",
} = {}) {
  const isEs = language === "es";
  const subject = buildPlainSubject({ businessName, language });

  const es = [
    businessName ? `Hola ${businessName},` : "Hola,",
    "",
    [detail && `${detail}.`, angle].filter(Boolean).join(" "),
    "",
    "Soy Esteban, editor de video. Si ya graban material y no dan abasto con la edición, yo la hago de forma remota — con el teléfono basta.",
    "",
    portfolioUrl ? `Ejemplos: ${portfolioUrl}` : "",
    "",
    "¿Les sirve? Respondan y vemos qué necesitan.",
    "",
    senderName,
    senderPhone,
  ];

  const en = [
    businessName ? `Hi ${businessName},` : "Hi,",
    "",
    [detail && `${detail}.`, angle].filter(Boolean).join(" "),
    "",
    "I'm Esteban, a video editor. If you're already shooting and the editing piles up, I do that remotely — phone footage is fine.",
    "",
    portfolioUrl ? `Some examples: ${portfolioUrl}` : "",
    "",
    "Useful? Reply and we'll see what you need.",
    "",
    senderName,
    senderPhone,
  ];

  const body = (isEs ? es : en)
    .filter((l) => l !== undefined && l !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return {
    subject,
    text: body + buildFooter({ postalAddress, language }),
    // Deliberately no `html`. A consumer that wants HTML here is a bug.
  };
}
