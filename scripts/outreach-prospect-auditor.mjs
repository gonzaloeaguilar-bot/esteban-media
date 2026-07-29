import fs from "fs";
import path from "path";

import { loadEnvLocal, isFabricatedEmail } from "../lib/outreach-compliance.mjs";
import { buildCompliantOutreachEmail } from "../lib/compliant-outreach-email.mjs";
import { extractBusinessContactInfo } from "../lib/website-email-extractor.mjs";
import { loadSeedProspects } from "./compliant-outreach-dispatcher.mjs";

/**
 * Prospect discovery + outreach-queue builder (no send).
 *
 * REWRITTEN to remove ALL fabrication. The previous version shipped invented
 * businesses ("Brickell Legal Group", "Aventura Aesthetics Med Spa"), .example
 * emails, self-referencing websiteUrls, fabricated "content need scores", and
 * off-offer claims (turnaround, free audits, drone/aerial, web design).
 *
 * It now loads the REAL, handle-verified seed and harvests a REAL contact email
 * from each real website. Prospects without a real, harvestable email are
 * DROPPED. Outreach copy is the compliant, generic template (remote-editing
 * anchor) — no fabricated metrics, prices, turnaround, or claims.
 */

loadEnvLocal();

const OUT_PATH = path.join(process.cwd(), "public", "leads", "outreach_queue.json");

export async function runAuditorEngine() {
  console.log("Starting prospect discovery + outreach-queue builder (REAL seed + REAL harvest)...\n");

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
      business: { id: p.id, name: p.name, city: p.city, segment: p.segment, igHandle: p.igHandle || "", contactEmail: email },
      generatedSubject: built.subject,
      generatedEmailHtml: built.html,
      generatedEmailBody: built.text,
    });
    console.log(`✅ ${p.name} (${p.city}) — real email harvested.`);
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(
    OUT_PATH,
    JSON.stringify(
      {
        auditDate: new Date().toISOString(),
        note: "Every queued prospect has a REAL harvested email. No fabricated businesses, .example emails, self-referencing URLs, or invented claims.",
        droppedCount: dropped.length,
        dropped,
        results,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`\n🎉 ${results.length} real prospect(s); dropped ${dropped.length}. Saved to ${OUT_PATH}`);
  return results;
}

if (process.argv[1]?.includes("outreach-prospect-auditor.mjs")) {
  runAuditorEngine().catch((e) => {
    console.error("Auditor error:", e.message);
    process.exitCode = 1;
  });
}
