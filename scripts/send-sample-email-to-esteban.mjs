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
const RECIPIENTS = ["gonzalo.e.aguilar@gmail.com", "esmolopez@gmail.com"];

async function sendTellaStyleEmails() {
  console.log(`Sending TELLA & CANVA STYLE CLEAN HTML EMAILS via Resend...`);

  // 1. Send Warm Cream Version
  const creamHtml = buildTechOutreachHtmlEmail({
    targetName: "Davie Blvd Latin Bistro & Grill",
    city: "Fort Lauderdale",
    distanceMiles: "0.5",
    googleRating: "4.8",
    reviewCount: "142",
    language: "es",
    portfolioUrl: "https://estebanmorenomedia.com/es/portafolio",
    youtubeUrl: "https://www.youtube.com/@estebanmorenolopez3811",
    contactEmail: "esmolopez@gmail.com",
    theme: "cream",
  });

  for (const t of RECIPIENTS) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Esteban Moreno Media <onboarding@resend.dev>",
          to: [t],
          subject: "✨ [DISEÑO TELLA CREAM] Muestra de Video & Consejos - Esteban Moreno Media",
          html: creamHtml,
        }),
      });
      const data = await res.json();
      console.log(`✅ Sent CREAM Tella style email to ${t} | Resend ID: ${data.id}`);
    } catch (err) {
      console.error(`❌ Error sending Cream email to ${t}:`, err);
    }
  }

  // 2. Send Matte Dark Version
  const darkHtml = buildTechOutreachHtmlEmail({
    targetName: "Davie Blvd Latin Bistro & Grill",
    city: "Fort Lauderdale",
    distanceMiles: "0.5",
    googleRating: "4.8",
    reviewCount: "142",
    language: "es",
    portfolioUrl: "https://estebanmorenomedia.com/es/portafolio",
    youtubeUrl: "https://www.youtube.com/@estebanmorenolopez3811",
    contactEmail: "esmolopez@gmail.com",
    theme: "dark",
  });

  for (const t of RECIPIENTS) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Esteban Moreno Media <onboarding@resend.dev>",
          to: [t],
          subject: "✨ [DISEÑO TELLA DARK] Muestra de Video & Consejos - Esteban Moreno Media",
          html: darkHtml,
        }),
      });
      const data = await res.json();
      console.log(`✅ Sent DARK Tella style email to ${t} | Resend ID: ${data.id}`);
    } catch (err) {
      console.error(`❌ Error sending Dark email to ${t}:`, err);
    }
  }
}

sendTellaStyleEmails();
