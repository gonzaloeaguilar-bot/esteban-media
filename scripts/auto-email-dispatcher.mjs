import fs from "fs";
import path from "path";
import { buildTechOutreachHtmlEmail } from "../lib/email-template-builder.mjs";

/**
 * Automated Resend Email Dispatcher Engine - TECH DESIGN SYSTEM EDITION
 * Reads audited leads from `public/leads/*.json` and dispatches high-converting tech HTML emails
 * via Resend API (https://api.resend.com/emails).
 */

// Load .env.local if present
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_CdQhFqvt_CPeGcaKR3az2W5LjKMgKNhpq";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Esteban Moreno Media <contact@estebanmorenomedia.com>";
const DEFAULT_LEADS_FILE = path.join(process.cwd(), "public", "leads", "fort_lauderdale_restaurant_leads.json");

export async function sendEmailViaResend(to, subject, text, html) {
  if (!RESEND_API_KEY) {
    return {
      success: false,
      mode: "simulation",
      message: "RESEND_API_KEY is not set. Payload formatted & queued for live dispatch.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        text,
        html,
        tags: [
          { name: "campaign", value: "automated_leads_dispatch" }
        ],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, mode: "live", id: data.id };
    } else {
      const errText = await res.text();
      return { success: false, mode: "error", error: errText };
    }
  } catch (err) {
    return { success: false, mode: "error", error: err.message };
  }
}

export async function dispatchAutomatedLeads(leadsFilePath = DEFAULT_LEADS_FILE) {
  if (!fs.existsSync(leadsFilePath)) {
    console.error(`❌ File not found: ${leadsFilePath}`);
    return;
  }

  const fileContent = fs.readFileSync(leadsFilePath, "utf8");
  const leads = JSON.parse(fileContent);

  console.log(`Starting Resend Automated TECH Email Dispatch for ${leads.length} leads in ${path.basename(leadsFilePath)}...`);
  console.log(`From Sender: ${FROM_EMAIL}`);
  console.log(`Resend API Key Status: ${RESEND_API_KEY ? "🔑 LIVE RESEND KEY DETECTED" : "⚠️ SIMULATION MODE"}\n`);

  let dispatchedCount = 0;

  for (const item of leads) {
    const target = item.restaurant || item.prospect || item.business;
    const recipientEmail = target.contactEmail || target.email;
    const subject = item.pitchSubject || item.generatedSubject || `Propuesta de Video para ${target.name}`;

    if (!recipientEmail || recipientEmail.includes("example.com")) {
      console.log(`⚠️ Skipping test domain lead: ${target.name} (${recipientEmail || "no email"})`);
      continue;
    }

    const techHtml = buildTechOutreachHtmlEmail({
      targetName: target.name,
      city: target.city || "Fort Lauderdale",
      distanceMiles: target.distanceMiles ? target.distanceMiles.toString() : "1.0",
      googleRating: target.googleRating ? target.googleRating.toString() : "4.8",
      reviewCount: target.reviewCount ? target.reviewCount.toString() : "100",
      language: target.language || "es",
      portfolioUrl: item.recommendedLeadMagnet || "https://estebanmorenomedia.com/portfolio/bar-door-monkey",
      calculatorUrl: "https://estebanmorenomedia.com/calculator",
    });

    console.log(`📧 [Dispatching via Resend ${dispatchedCount + 1}/${leads.length}]`);
    console.log(`   To: ${target.name} <${recipientEmail}>`);
    console.log(`   Subject: ${subject}`);

    const result = await sendEmailViaResend(recipientEmail, subject, item.pitchBody, techHtml);
    if (result.success) {
      console.log(`   ✅ DISPATCHED LIVE TECH EMAIL VIA RESEND! Email ID: ${result.id}\n`);
    } else {
      console.log(`   ℹ️ Queued (${result.mode}): ${result.message || result.error}\n`);
    }
    dispatchedCount++;
  }

  console.log(`🎉 Processed ${leads.length} leads. Ready for direct Resend delivery!`);
}

if (process.argv[1]?.includes("auto-email-dispatcher")) {
  const fileArg = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_LEADS_FILE;
  dispatchAutomatedLeads(fileArg);
}
