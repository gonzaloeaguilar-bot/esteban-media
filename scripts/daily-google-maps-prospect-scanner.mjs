import fs from "fs";
import path from "path";

import { loadEnvLocal, isFabricatedEmail } from "../lib/outreach-compliance.mjs";
import { buildCompliantOutreachEmail } from "../lib/compliant-outreach-email.mjs";
import { extractBusinessContactInfo } from "../lib/website-email-extractor.mjs";
import { loadSeedProspects } from "./compliant-outreach-dispatcher.mjs";

/**
 * Daily prospect DISCOVERY scanner (no send).
 *
 * Discovery inputs are REAL only:
 *   (a) If GOOGLE_PLACES_API_KEY is set, query Google Places for genuine local
 *       businesses; else
 *   (b) read the curated, handle-verified seed (scripts/data/verified-prospects.json).
 *
 * For every discovered business it harvests a REAL contact email from the real
 * website (lib/website-email-extractor.mjs). Businesses with no real, harvestable
 * email are DROPPED — never assigned a fabricated/.example/555 address.
 *
 * NO fabricated businesses, ratings, review counts, distances, or audit claims.
 * Emails are built with the compliant, generic template (remote-editing anchor).
 *
 * Output: public/leads/daily_morning_campaign.json (consumed by
 * dispatch-morning-campaign.mjs, which is itself gated + dry-run by default).
 */

loadEnvLocal();

const OUT_PATH = path.join(process.cwd(), "public", "leads", "daily_morning_campaign.json");

async function discoverViaPlaces(apiKey, query = "restaurants in Fort Lauderdale FL") {
  // Google Places Text Search (New) — genuine discovery. Only runs with a key.
  const url = "https://places.googleapis.com/v1/places:searchText";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.displayName,places.websiteUri,places.formattedAddress",
    },
    body: JSON.stringify({ textQuery: query }),
  });
  if (!res.ok) throw new Error(`Places API status ${res.status}`);
  const data = await res.json();
  return (data.places || []).map((p) => ({
    name: p.displayName?.text || "",
    website: p.websiteUri || "",
    city: p.formattedAddress || "",
    language: "en",
  }));
}

async function discoverProspects() {
  const apiKey = (process.env.GOOGLE_PLACES_API_KEY || "").trim();
  if (apiKey) {
    try {
      const found = await discoverViaPlaces(apiKey);
      if (found.length) {
        console.log(`🔎 Discovered ${found.length} business(es) via Google Places API.`);
        return found;
      }
      console.log("Places API returned nothing — falling back to curated seed.");
    } catch (e) {
      console.log(`Places API unavailable (${e.message}) — falling back to curated seed.`);
    }
  } else {
    console.log("No GOOGLE_PLACES_API_KEY — using curated, handle-verified seed (no fabrication).");
  }
  return loadSeedProspects();
}

export async function runDailyMorningCampaign() {
  console.log("🚀 Building daily outreach campaign (REAL discovery + REAL email harvest)...");

  const candidates = await discoverProspects();
  const results = [];
  const dropped = [];

  for (const c of candidates) {
    let email = "";
    if (c.website) {
      try {
        const extracted = await extractBusinessContactInfo(c.website);
        email = (extracted.emails || []).find((e) => !isFabricatedEmail(e)) || "";
      } catch {
        email = "";
      }
    }

    if (isFabricatedEmail(email)) {
      dropped.push({ name: c.name, reason: email ? "fabricated_email" : "no_real_email" });
      continue;
    }

    const language = c.language || c.lang || "es";
    const built = buildCompliantOutreachEmail({
      name: c.name,
      city: c.city,
      igHandle: c.igHandle || "",
      language,
      email,
    });

    results.push({
      target: { name: c.name, city: c.city, lang: language, igHandle: c.igHandle || "", contactEmail: email },
      emailSubject: built.subject,
      emailHtml: built.html,
      emailText: built.text,
    });
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(
    OUT_PATH,
    JSON.stringify(
      {
        campaignDate: new Date().toISOString(),
        totalTargets: results.length,
        droppedCount: dropped.length,
        dropped,
        note: "Every target has a REAL harvested email. No fabricated businesses, ratings, or reviews. Dispatch is gated + dry-run by default.",
        results,
      },
      null,
      2,
    ),
  );

  console.log(`\n✅ Built ${results.length} real brief(s); dropped ${dropped.length} with no real email. Saved to ${OUT_PATH}`);
  return results;
}

if (process.argv[1]?.includes("daily-google-maps-prospect-scanner.mjs")) {
  runDailyMorningCampaign().catch((e) => {
    console.error("Scanner error:", e.message);
    process.exitCode = 1;
  });
}
