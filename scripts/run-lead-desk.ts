/*
 * Mailbox-native runner. It reads only a Gmail label and creates drafts.
 * It deliberately has no Gmail send endpoint.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { prepareLeadDeskResult, type LeadDeskInput } from "../lib/lead-desk.ts";

const mailbox = process.env.GMAIL_LEAD_DESK_MAILBOX?.trim() || "info@estebanmorenomedia.com";
const labelName = process.env.GMAIL_LEAD_DESK_LABEL?.trim() || "Esteban/Leads";
const ownerEmail = process.env.ESTEBAN_LEAD_ALERT_EMAIL?.trim();
const accessToken = process.env.GMAIL_LEAD_DESK_ACCESS_TOKEN?.trim();
const statusPath = process.env.LEAD_DESK_STATUS_PATH?.trim() || join(process.cwd(), "var", "lead-desk-status.json");

if (!accessToken) throw new Error("GMAIL_LEAD_DESK_ACCESS_TOKEN is required. The runner does not use browser cookies or passwords.");
if (!ownerEmail) throw new Error("ESTEBAN_LEAD_ALERT_EMAIL is required for the owner alert draft.");
const alertRecipient = ownerEmail;

type GmailPayload = { headers?: Array<{ name?: string; value?: string }>; body?: { data?: string }; parts?: GmailPayload[]; mimeType?: string };
type GmailMessage = { id: string; threadId: string; payload?: GmailPayload };
type StoredStatus = { processedMessageIds: string[]; entries: Array<{ messageId: string; threadId: string; status: string; processedAt: string }> };

const api = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/${path}`, { ...init, headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json", ...(init?.headers ?? {}) } });
  if (!response.ok) throw new Error(`Gmail API ${response.status}: ${await response.text()}`);
  return response.json() as Promise<T>;
};

const header = (message: GmailMessage, name: string) => message.payload?.headers?.find((item) => item.name?.toLowerCase() === name.toLowerCase())?.value || "";
const decode = (data = "") => Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
function messageBody(payload?: GmailPayload): string {
  if (!payload) return "";
  if (payload.mimeType === "text/plain" && payload.body?.data) return decode(payload.body.data);
  return payload.parts?.map(messageBody).find(Boolean) || "";
}
const raw = (headers: Record<string, string>, content: string) => Buffer.from([...Object.entries(headers).map(([key, value]) => `${key}: ${value}`), "", content].join("\r\n"), "utf8").toString("base64url");

async function loadStatus(): Promise<StoredStatus> {
  try { return JSON.parse(await readFile(statusPath, "utf8")) as StoredStatus; }
  catch { return { processedMessageIds: [], entries: [] }; }
}

async function createDraft(threadId: string, to: string, subject: string, content: string, replyTo?: string) {
  const headers: Record<string, string> = { To: to, Subject: subject, From: `Esteban Moreno Media <${mailbox}>` };
  if (replyTo) headers["In-Reply-To"] = replyTo;
  await api("drafts", { method: "POST", body: JSON.stringify({ message: { threadId, raw: raw(headers, content) } }) });
}

async function main() {
  const labels = await api<{ labels?: Array<{ id: string; name: string }> }>("labels");
  const label = labels.labels?.find((item) => item.name === labelName);
  if (!label?.id) throw new Error(`Gmail label ${labelName} was not found in ${mailbox}.`);
  const listing = await api<{ messages?: Array<{ id: string; threadId: string }> }>(`messages?labelIds=${encodeURIComponent(label.id)}&q=is:unread`);
  const status = await loadStatus();
  for (const item of listing.messages ?? []) {
    if (status.processedMessageIds.includes(item.id)) continue;
    const message = await api<GmailMessage>(`messages/${item.id}?format=full`);
    const input: LeadDeskInput = { threadId: message.threadId, messageId: message.id, from: header(message, "From"), subject: header(message, "Subject"), body: messageBody(message.payload), receivedAt: header(message, "Date") };
    const result = prepareLeadDeskResult(input);
    await createDraft(message.threadId, input.from, result.clientDraft.subject, result.clientDraft.body, header(message, "Message-ID"));
    await createDraft(message.threadId, alertRecipient, result.ownerAlert.subject, result.ownerAlert.body);
    status.processedMessageIds.push(message.id);
    status.entries.push({ messageId: message.id, threadId: message.threadId, status: result.status, processedAt: new Date().toISOString() });
  }
  await mkdir(dirname(statusPath), { recursive: true });
  await writeFile(statusPath, `${JSON.stringify(status, null, 2)}\n`);
  console.log(JSON.stringify({ processed: status.entries.length, label: labelName, sends: 0 }, null, 2));
}

void main();
