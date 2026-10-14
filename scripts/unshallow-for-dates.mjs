// Deepens a SHALLOW git clone so lib/content-dates.ts can read real commit
// dates for the sitemap lastmod and the visible "Updated" line.
//
// Runs as `prebuild`. It only ever acts on Vercel's build clone (VERCEL=1);
// a developer checkout is never modified. It can never fail the build: if the
// fetch is refused or slow, lib/content-dates.ts sees a shallow clone, emits no
// date, and warns. Skip-and-warn, not fail (a freshness step that failed the
// Vercel build on a shallow clone is a known gotcha in this portfolio).
import { execFileSync } from "node:child_process";

const run = (args) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 120_000 }).trim();

try {
  if (process.env.VERCEL !== "1") process.exit(0);
  if (run(["rev-parse", "--is-shallow-repository"]) !== "true") process.exit(0);
  run(["fetch", "--unshallow", "--quiet", "origin"]);
  console.log("[unshallow-for-dates] history deepened; lastmod will use real commit dates");
} catch (error) {
  console.warn(`[unshallow-for-dates] skipped, no lastmod will be emitted: ${String(error.message).split("\n")[0]}`);
}
