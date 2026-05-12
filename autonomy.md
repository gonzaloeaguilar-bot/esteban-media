# Autonomy Policy — esteban-media

> **MAX AUTONOMY LANE.** No real users yet. Domain TBD. Cost of a bad ship ≈ $0. This is the cortex stress test for full-auto pipelines.

## L0 — Auto-merge to main after CI green

Everything not in L3:

- `**/*` (all paths default to L0 here)

## L1 — Not used on this project

## L2 — Not used on this project

## L3 — NEVER auto-merge

Only the things that have real-world cost or are hard to reverse:

- `package.json` — only major version bumps (any `^X` → `^Y` where X != Y on next/react/typescript)
- `package-lock.json` / `pnpm-lock.yaml` — only when accompanying an L3 package.json change
- `next.config.{js,ts,mjs}` — domain config, redirects, headers (anything DNS-adjacent)
- `vercel.json` — deploy target, env, redirects
- `.github/workflows/**` — CI/CD
- Anything that adds a paid service dependency without budget approval (e.g., Resend paid plan, Cloudinary paid plan, Mux)

## Rules

- L0 = the everything lane. Tailwind tweaks, component refactors, copy changes, schema additions, sitemap, robots — all auto-merge.
- Patch/minor dep bumps on dependencies that aren't framework-level → L0.
- ES translations always L0 (flagged `<!-- TRANSLATION REVIEW NEEDED -->` so Gonzalo reviews on natural cadence, but they ship).
- When in doubt about whether something is L0 or L3, downgrade to L3 (PR and wait).
