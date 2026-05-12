# Esteban Media — Project Context

> **For Claude Code (or any AI assistant):** read this first before working on the codebase.

## What This Is

Marketing site for **Esteban** — full-service visual storyteller based in South Florida. Built to attract clients across his service mix; the orchestrator (cortex) builds this overnight on max autonomy because there are no real users yet.

**Esteban's services:**
- Aerial / drone cinematography
- Photography — portraits, events, commercial, lifestyle
- Videography
- Video editing + color grading
- Photo editing

Positioning is **visual storyteller**, not "drone guy." Drone is one capability in a deep toolkit.

## Stack (decided — don't relitigate)

- **Framework:** Next.js 15 App Router + TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (radix primitives)
- **Deploy:** Vercel (preview URLs until domain is purchased)
- **Forms:** Resend or Formspree for contact (whichever is faster to wire) → routes to `gagui010@icloud.com` until Esteban's email is set up
- **i18n:** next-intl, bilingual EN/ES (South Florida market)
- **Analytics:** Vercel Analytics (free tier) — defer GA4 until domain is live
- **Media hosting:** Vercel Blob for placeholder assets; swap to Cloudinary or Mux when Esteban delivers real reels

## Brand Voice (placeholder until refined)

- **Tone:** confident, cinematic, calm. "We make things feel like a film."
- **Avoid:** corporate jargon, "premium," "world-class," superlatives without proof
- **Bilingual rule:** EN copy first, then ES translation reviewed by a native speaker (Gonzalo). Never AI-translate without flagging for review.

## Domain

**TBD.** Use Vercel preview URLs for now. When domain is bought, update `next.config.ts` metadata base + canonical tags.

## Auto-Merge Policy (max autonomy lane)

This project is the **autonomy stress test** — no real users yet, cost of a bad ship ≈ $0.

**Auto-mergeable lanes (any change):**
- All scaffolding, components, pages, schema, copy, styling
- Bilingual translations (flag for review but merge)
- SEO meta, OG images, sitemap, robots.txt
- Tests

**Never-auto lanes (PR-and-wait):**
- `package.json` major version bumps (only patch/minor auto)
- DNS / domain config changes
- Switching deploy target away from Vercel
- Adding paid services without budget approval

If a task is ambiguous, `autonomy: needs-review` in the plan and let it PR.

## Getting Started

Once the orchestrator scaffolds the project (first overnight run):
```bash
cd ~/Desktop/esteban-media
pnpm install        # or npm
pnpm dev            # localhost:3000
```

## Contact

Owner: Gonzalo (husband of Esteban). Email: `gagui010@icloud.com`. Any decisions about brand direction route to Gonzalo first.
