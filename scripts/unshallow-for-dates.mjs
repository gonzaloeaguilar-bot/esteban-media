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
  // Vercel's clone has no usable `origin` (the plain `git fetch --unshallow
  // origin` failed there on 2026-10-14), so fetch by explicit URL. The repo is
  // public; no credential is needed or used.
  const owner = process.env.VERCEL_GIT_REPO_OWNER || "gonzaloeaguilar-bot";
  const slug = process.env.VERCEL_GIT_REPO_SLUG || "esteban-media";
  const ref = process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_REF || "main";
  run(["fetch", "--unshallow", "--quiet", `https://github.com/${owner}/${slug}.git`, ref]);
  console.log("[unshallow-for-dates] history deepened; lastmod will use real commit dates");
} catch (error) {
  console.warn(`[unshallow-for-dates] skipped, no lastmod will be emitted: ${String(error.stderr || error.message).trim().split("\n").slice(-2).join(" | ")}`);
}
