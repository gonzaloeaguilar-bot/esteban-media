import fs from "fs";
import path from "path";

import { loadEnvLocal, isFabricatedEmail } from "../lib/outreach-compliance.mjs";
import { buildCompliantOutreachEmail } from "../lib/compliant-outreach-email.mjs";
import { extractBusinessContactInfo } from "../lib/website-email-extractor.mjs";
import { loadSeedProspects } from "./compliant-outreach-dispatcher.mjs";

/**
 * Restaurant / local-business scanner (no send).
 *
 * REWRITTEN to remove ALL fabrication. The previous version invented businesses
 * ("Davie Blvd Latin Bistro"), 555 phone numbers, .example emails, and pointed
 * websiteUrl at Esteban's own site with hardcoded ratings/reviews. All of that
 * is gone.
 *
 * It now loads the REAL, handle-verified seed (scripts/data/verified-prospects.json)
 * and harvests a REAL contact email from each business's real website. Any
 * business without a real, harvestable email is DROPPED — never assigned a fake
 * address. Outreach copy is the compliant, generic template (remote-editing
 * anchor); no fabricated metrics, prices, or claims.
 */

loadEnvLocal();

const OUT_PATH = path.join(process.cwd(), "public", "leads", "restaurant_leads.json");

export async function runRestaurantScannerEngine() {
  console.log("Starting restaurant/local-business scanner (REAL seed + REAL email harvest)...\n");

  const prospects = loadSeedProspects();
  const results = [];
  const dropped = [];

  for (const p of prospects) {
    let email = "";
    if (p.website) {
      try {
        const extracted = await extractBusinessContactInfo(p.website);
        email = (extracted.emails || []).find((e) => !isFabricatedEmail(e)) || "";
      } catch {
        email = "";
      }
    }

    if (isFabricatedEmail(email)) {
      dropped.push({ id: p.id, name: p.name, reason: email ? "fabricated_email" : "no_real_email" });
      continue;
    }

    const built = buildCompliantOutreachEmail({
      name: p.name,
      city: p.city,
      igHandle: p.igHandle,
      language: p.language,
      email,
    });

    results.push({
      prospect: { id: p.id, name: p.name, city: p.city, segment: p.segment, igHandle: p.igHandle || "", contactEmail: email },
      pitchSubject: built.subject,
      pitchHtml: built.html,
      pitchBody: built.text,
    });
    console.log(`📍 ${p.name} — real email harvested.`);
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(
    OUT_PATH,
    JSON.stringify(
      {
        scanDate: new Date().toISOString(),
        note: "Every lead has a REAL harvested email. No fabricated businesses, 555 numbers, .example emails, or self-referencing URLs.",
        droppedCount: dropped.length,
        dropped,
        results,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`\n🎉 ${results.length} real lead(s); dropped ${dropped.length} with no real email. Saved to ${OUT_PATH}`);
  return results;
}

if (process.argv[1]?.includes("restaurant-maps-instagram-scanner.mjs")) {
  runRestaurantScannerEngine().catch((e) => {
    console.error("Scanner error:", e.message);
    process.exitCode = 1;
  });
}
