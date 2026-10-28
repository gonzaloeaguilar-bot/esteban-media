import { CREW_RECORDING_RATES, FILMING_HOURLY } from "@/lib/pricing";

export type LeadDeskInput = { threadId: string; messageId: string; from: string; subject: string; body: string; receivedAt: string };
export type LeadFacts = { eventDate?: string; venue?: string; hours?: number; deliverables?: string; guestCount?: number; editDeadline?: string; budget?: string; foundVia?: string };
export type LeadChannel = "email";
export type PriceProposal =
  | { kind: "confirmed"; amount: number; rationale: string }
  | { kind: "needs-review"; internalRange: { min: number; max: number }; missing: string[]; rationale: string };
export type LeadDeskResult = { channel: LeadChannel; facts: LeadFacts; proposal: PriceProposal; clientDraft: { subject: string; body: string }; ownerAlert: { subject: string; body: string }; status: "draft-ready" | "needs-owner-review" };

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
const readDate = (body: string) => body.match(/\b(?:on|for|date(?: is)?)[:\s]+([A-Z][a-z]+\s+\d{1,2}(?:,\s*\d{4})?|\d{1,2}[/-]\d{1,2}[/-]\d{2,4})\b/i)?.[1];
const readHours = (body: string) => { const match = body.match(/\b(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\b/i); return match ? Number(match[1]) : undefined; };
const readGuestCount = (body: string) => { const match = body.match(/\b(?:for|around|about|approximately)\s+(\d{1,4})\s+(?:guests?|people|attendees?)\b/i); return match ? Number(match[1]) : undefined; };
const readField = (body: string, expression: RegExp) => { const match = body.match(expression); return match?.[1] ? normalize(match[1]) : undefined; };
// Origin of the inquiry as the client states it (EN/ES). Only a stated phrase is stored; never inferred.
const FOUND_VIA = /\b((?:found|saw|discovered|came across)\s+(?:you|your (?:page|site|website|profile|video|reel|ad))\s+(?:on|via|through|in)\s+[^\n.,!]{2,60}|(?:recommended|referred)\s+(?:to (?:you|me|us)\s+)?by\s+[^\n.,!]{2,60}|(?:chatgpt|perplexity|gemini|google|instagram|facebook|tiktok|yelp)\s+(?:recommended|suggested|showed)\s+[^\n.,!]{2,60}|(?:los?|la|te)\s+(?:vi|encontr[eé]|conoc[ií])\s+(?:en|por|a trav[eé]s de)\s+[^\n.,!]{2,60}|me\s+(?:lo|los|la|te)?\s*recomend[oó]\s+[^\n.,!]{2,60})/i;
export const readFoundVia = (body: string) => { const match = body.match(FOUND_VIA); return match?.[1] ? normalize(match[1]).slice(0, 80) : undefined; };
const SPANISH = /\b(hola|gracias|cumplea[nñ]os|quisiera|necesito|cotizaci[oó]n|fiesta|buenas|saludos)\b/i;
export const isSpanish = (body: string) => SPANISH.test(body);
const ORIGIN_QUESTION = { en: "One quick question so I can serve you better: how did you hear about us?", es: "Una pregunta rápida para atenderte mejor: ¿cómo nos encontraste?" } as const;

export function extractLeadFacts(body: string): LeadFacts {
  return {
    eventDate: readDate(body),
    venue: readField(body, /\b(?:at|venue|location)[:\s]+([^\n.]{3,100})/i),
    hours: readHours(body),
    deliverables: readField(body, /\b(?:need|looking for|deliverables?)[:\s]+([^\n.]{3,180})/i),
    guestCount: readGuestCount(body),
    editDeadline: readField(body, /\b(?:deadline|by|delivered?)[:\s]+([^\n.]{3,100})/i),
    budget: readField(body, /\b(?:budget|spend)[:\s]+([^\n.]{3,100})/i),
    foundVia: readFoundVia(body),
  };
}

export function proposePrice(body: string, facts = extractLeadFacts(body)): PriceProposal {
  if (!/\b(?:birthday|party|celebration|event)\b/i.test(body)) return { kind: "needs-review", internalRange: { min: FILMING_HOURLY.minimumAmount, max: CREW_RECORDING_RATES.solo.fullDay }, missing: ["service type", "hours", "deliverables"], rationale: "This request is outside a confirmed event-rate match." };
  const missing = [!facts.eventDate && "event date", !facts.venue && "venue", !facts.hours && "hours", !facts.deliverables && "deliverables"].filter((value): value is string => Boolean(value));
  if (missing.length > 0) return { kind: "needs-review", internalRange: { min: FILMING_HOURLY.minimumAmount, max: CREW_RECORDING_RATES.solo.fullDay }, missing, rationale: "Internal event-capture guide only; do not quote until the missing scope is confirmed." };
  if (facts.hours && facts.hours <= 3) return { kind: "confirmed", amount: FILMING_HOURLY.minimumAmount, rationale: "Owner-approved filming floor: $100/hour with a three-hour minimum." };
  if (facts.hours && facts.hours <= 4) return { kind: "confirmed", amount: CREW_RECORDING_RATES.solo.halfDay, rationale: "Owner-approved solo half-day event-capture rate." };
  if (facts.hours && facts.hours <= 8) return { kind: "confirmed", amount: CREW_RECORDING_RATES.solo.fullDay, rationale: "Owner-approved solo full-day event-capture rate." };
  return { kind: "needs-review", internalRange: { min: CREW_RECORDING_RATES.solo.fullDay, max: CREW_RECORDING_RATES.twoPerson.fullDay }, missing: ["crew requirement", "final deliverables"], rationale: "The requested duration exceeds the standard solo event-capture match." };
}

const missingQuestion = (missing: string[]) => missing.map((item) => ({ "event date": "the date", venue: "the venue", hours: "how many hours of coverage you need", deliverables: "what you would like delivered afterward" }[item] ?? item)).join(", ");

export function prepareLeadDeskResult(input: LeadDeskInput): LeadDeskResult {
  const facts = extractLeadFacts(input.body);
  const proposal = proposePrice(input.body, facts);
  const name = input.from.split("<")[0].trim() || "there";
  const needsDetails = proposal.kind === "needs-review";
  const clientDraft = {
    subject: `Re: ${input.subject.replace(/^re:\s*/i, "")}`,
    body: needsDetails
      ? `Hi ${name},\n\nThank you for reaching out. I’d love to learn a little more about the celebration before I put together the right option. Could you share ${missingQuestion(proposal.missing)}?\n\nOnce I have that, I’ll review the details and follow up with a clear quote.\n\nBest,\nEsteban Moreno Media`
      : `Hi ${name},\n\nThank you for reaching out. Based on the details you shared, I can prepare a quote for the coverage you requested. I’m checking the calendar and will confirm availability before anything is booked.\n\nBest,\nEsteban Moreno Media`,
  };
  if (!facts.foundVia) {
    const question = ORIGIN_QUESTION[isSpanish(input.body) ? "es" : "en"];
    clientDraft.body = clientDraft.body.replace("\n\nBest,\nEsteban Moreno Media", `\n\n${question}\n\nBest,\nEsteban Moreno Media`);
  }
  const proposalText = proposal.kind === "confirmed" ? `Confirmed internal rate: $${proposal.amount}. ${proposal.rationale}` : `Do not quote the client yet. Internal range: $${proposal.internalRange.min}–$${proposal.internalRange.max}. Missing: ${proposal.missing.join(", ")}. ${proposal.rationale}`;
  return { channel: "email", facts, proposal, clientDraft, ownerAlert: { subject: `Lead needs review: ${input.subject}`, body: `New labeled lead from ${input.from}.\nChannel: email\nFound via: ${facts.foundVia ?? "not stated"}\n\n${proposalText}\n\nA reply draft is ready in the same Gmail thread.` }, status: needsDetails ? "needs-owner-review" : "draft-ready" };
}
