import fs from "fs";
import path from "path";
import { buildTechOutreachHtmlEmail } from "../lib/email-template-builder.mjs";

// Load .env.local
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
const RECIPIENTS = ["esmolopez@gmail.com", "gonzalo.e.aguilar@gmail.com"];
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Esteban Moreno Media <contact@estebanmorenomedia.com>";

async function sendTechSampleEmail() {
  console.log(`Sending BEST-IN-CLASS TECH HTML EMAIL via Resend...`);

  const subject = "📍 [DISEÑO TECH 8K] Propuesta de Video Promocional para Davie Blvd Latin Bistro (Fort Lauderdale 33317)";

  const htmlContent = buildTechOutreachHtmlEmail({
    targetName: "Davie Blvd Latin Bistro & Grill",
    city: "Fort Lauderdale",
    distanceMiles: "0.5",
    googleRating: "4.8",
    reviewCount: "142",
    language: "es",
    portfolioUrl: "https://estebanmorenomedia.com/es/portafolio/bar-door-monkey",
    calculatorUrl: "https://estebanmorenomedia.com/es/calculadora",
  });

  for (const target of RECIPIENTS) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [target],
          subject,
          html: htmlContent,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`✅ DISPATCHED LIVE TECH EMAIL TO ${target}! Resend ID: ${data.id}`);
      } else {
        const errText = await res.text();
        console.error(`❌ Resend API Error for ${target} (${res.status}): ${errText}`);
      }
    } catch (err) {
      console.error(`❌ Exception sending email to ${target}:`, err);
    }
  }
}

sendTechSampleEmail();
