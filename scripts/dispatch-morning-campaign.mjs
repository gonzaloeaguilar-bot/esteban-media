import fs from "fs";
import path from "path";

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
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Esteban Moreno <contact@estebanmorenomedia.com>";
const REPLY_TO_EMAIL = "esmolopez@gmail.com"; // Guarantees all replies go directly to Esteban's inbox!

async function dispatchMorningCampaign() {
  const campaignPath = path.join(process.cwd(), "public", "leads", "daily_morning_campaign.json");
  if (!fs.existsSync(campaignPath)) {
    console.error("❌ No campaign file found. Run daily-google-maps-prospect-scanner.mjs first.");
    return;
  }

  const campaign = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
  console.log(`🚀 Dispatching ${campaign.results.length} verified outreach emails via Resend...`);

  for (const item of campaign.results) {
    const targetEmail = item.target.contactEmail;

    if (!targetEmail || targetEmail.includes(".example")) {
      console.log(`⚠️ Skipping ${item.target.name}: No verified contact email found on site.`);
      continue;
    }

    const htmlBody = item.emailHtml || `<h1>${item.emailSubject}</h1><p>Visita nuestro portafolio en https://estebanmorenomedia.com</p>`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [targetEmail], 
          reply_to: REPLY_TO_EMAIL, // 🔥 Forwards all client replies to Esteban's personal inbox
          subject: item.emailSubject,
          html: htmlBody,
          tags: [ // 🔥 Enables tracking analytics in Resend Dashboard
            { name: "campaign", value: "daily_morning_outreach" },
            { name: "target_city", value: item.target.city.toLowerCase().replace(/\s+/g, "_") },
            { name: "prospect_name", value: item.target.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 48) }
          ]
        }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ DISPATCHED LIVE to ${item.target.name} <${targetEmail}> | Resend ID: ${data.id}`);
      } else {
        console.log(`⚠️ Resend error for ${item.target.name} <${targetEmail}>:`, data);
      }
    } catch (e) {
      console.error(`💥 Failed to send to ${item.target.name} <${targetEmail}>:`, e);
    }

    // Rate limiting delay (Resend allows 10 req/s, we space it to 1 req/s for safety and warm-up)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

if (process.argv[1]?.includes("dispatch-morning-campaign.mjs")) {
  dispatchMorningCampaign().catch(console.error);
}
