/**
 * Esteban Moreno Media — pre-send gate for outbound email. $0, no LLM.
 *
 * The lane already had a compliance layer (suppression list, address
 * validation, CAN-SPAM footer). This gate adds the second half: it refuses to
 * transmit a message that is shaped as bulk marketing rather than as 1:1
 * business correspondence, and it refuses to transmit from a domain that has
 * not been set up to send mail at all.
 *
 * It is a REFUSAL, not advice. Every check returns a blocking reason, and the
 * dispatcher must treat a non-empty reason list as a hard stop.
 *
 * The domain checks exist because of what was measured on 2026-10-06:
 * estebanmorenomedia.com had no MX record, no SPF record and no DMARC record
 * at the apex, while the configured From address was contact@ at that apex.
 * That means replies to every message would bounce, and no receiver could
 * authenticate the mail. Sending in that state burns the domain permanently,
 * so the gate blocks it.
 */

import dns from "dns/promises";

export const WORD_MIN = 40;
export const WORD_MAX = 160;
export const SUBJECT_MAX = 60;
export const LINK_MAX = 1;
export const DEFAULT_DAILY_CAP = 40;

/** Words that make an accurate subject line read as a promotion instead. */
const SALESY = [
  "free", "gratis", "oferta", "offer", "descuento", "discount", "sale",
  "guaranteed", "garantizado", "limited time", "tiempo limitado", "act now",
  "click here", "haz clic", "$", "%", "!!",
];

export function countWords(text) {
  return (text || "").trim().split(/\s+/).filter(Boolean).length;
}

export function countLinks(text) {
  return ((text || "").match(/https?:\/\/\S+/g) || []).length;
}

/**
 * A normalised fingerprint of the message body, used to prove the message was
 * actually written for this recipient. Strips the parts that legitimately
 * repeat (greeting, signature, footer) and keeps the substance.
 */
export function bodyFingerprint(text) {
  return (text || "")
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Shape checks on one message. Returns an array of blocking reasons; empty
 * means the message may be transmitted.
 */
export function checkMessageShape({
  subject = "",
  text = "",
  html = undefined,
  postalAddress = "",
  optOutHonoured = false,
} = {}) {
  const reasons = [];

  if (html !== undefined && html !== null && String(html).trim() !== "") {
    reasons.push("html body present: 1:1 outreach is sent as text/plain");
  }
  if (/<[a-z][\s\S]*>/i.test(text)) {
    reasons.push("markup found inside the plain-text body");
  }
  if (/<img|\.gif\?|\/open\.|\/pixel|utm_medium=email/i.test(text)) {
    reasons.push("open-tracking artefact in the body");
  }

  const words = countWords(text);
  if (words < WORD_MIN) reasons.push(`body is ${words} words, under the ${WORD_MIN}-word minimum`);
  if (words > WORD_MAX) reasons.push(`body is ${words} words, over the ${WORD_MAX}-word maximum`);

  const links = countLinks(text);
  if (links > LINK_MAX) reasons.push(`${links} links in the body, maximum is ${LINK_MAX}`);

  const s = subject.trim();
  if (!s) reasons.push("empty subject");
  if (s.length > SUBJECT_MAX) reasons.push(`subject is ${s.length} chars, over ${SUBJECT_MAX}`);
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(s)) reasons.push("emoji in subject");
  if (s && s === s.toUpperCase() && /[A-Z]{4,}/.test(s)) reasons.push("subject is in all caps");
  for (const w of SALESY) {
    if (s.toLowerCase().includes(w)) reasons.push(`promotional token in subject: "${w}"`);
  }

  // CAN-SPAM. These are legal requirements, not deliverability preferences.
  if (!postalAddress.trim()) {
    reasons.push("no physical postal address: commercial email requires one");
  }
  const hasOptOut = /respóndeme|respondeme|just reply|reply and i won't|no te escribo/i.test(text);
  if (!hasOptOut) reasons.push("no opt-out instruction in the body");
  if (!optOutHonoured) {
    reasons.push("reply-based opt-out is not being processed: the consumer that honours it must be running");
  }

  return reasons;
}

/**
 * Batch checks. `priorFingerprints` is every fingerprint already sent, so an
 * identical body going out twice is caught as the bulk-blast it is.
 */
export function checkBatch(messages, { priorFingerprints = [], dailyCap = DEFAULT_DAILY_CAP, alreadySentToday = 0 } = {}) {
  const reasons = [];
  if (alreadySentToday + messages.length > dailyCap) {
    reasons.push(`batch of ${messages.length} would exceed the daily cap of ${dailyCap} (already sent ${alreadySentToday})`);
  }
  const seen = new Set(priorFingerprints);
  const within = new Set();
  for (const m of messages) {
    const fp = bodyFingerprint(m.text);
    if (seen.has(fp)) reasons.push(`body identical to a message already sent: ${m.to || "?"}`);
    if (within.has(fp)) reasons.push(`two messages in this batch share an identical body: ${m.to || "?"}`);
    within.add(fp);
  }
  return reasons;
}

/**
 * Live DNS check on the sending domain. A domain with no MX cannot receive the
 * replies this outreach asks for; a domain with no SPF and no DMARC cannot be
 * authenticated by the receiver.
 */
export async function checkSendingDomain(domain, { resolver = dns } = {}) {
  const reasons = [];
  const d = (domain || "").trim().toLowerCase();
  if (!d) return ["no sending domain given"];

  let mx = [];
  try { mx = await resolver.resolveMx(d); } catch { mx = []; }
  if (!mx.length) reasons.push(`${d} has no MX record: replies to this outreach would bounce`);

  let txt = [];
  try { txt = (await resolver.resolveTxt(d)).map((r) => r.join("")); } catch { txt = []; }
  if (!txt.some((t) => t.toLowerCase().startsWith("v=spf1"))) {
    reasons.push(`${d} has no SPF record`);
  }

  let dmarc = [];
  try { dmarc = (await resolver.resolveTxt(`_dmarc.${d}`)).map((r) => r.join("")); } catch { dmarc = []; }
  if (!dmarc.some((t) => t.toLowerCase().startsWith("v=dmarc1"))) {
    reasons.push(`${d} has no DMARC record`);
  }

  return reasons;
}

/** Convenience: every reason, in one list. Empty means clear to send. */
export async function gateBatch({
  messages = [],
  domain = "",
  postalAddress = "",
  optOutHonoured = false,
  priorFingerprints = [],
  dailyCap = DEFAULT_DAILY_CAP,
  alreadySentToday = 0,
  resolver = dns,
} = {}) {
  const reasons = [];
  reasons.push(...(await checkSendingDomain(domain, { resolver })));
  reasons.push(...checkBatch(messages, { priorFingerprints, dailyCap, alreadySentToday }));
  for (const m of messages) {
    for (const r of checkMessageShape({ ...m, postalAddress, optOutHonoured })) {
      reasons.push(`${m.to || "?"}: ${r}`);
    }
  }
  return reasons;
}
