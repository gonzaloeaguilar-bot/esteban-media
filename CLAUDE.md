# Esteban Moreno Media — Project Context

> **For Claude Code (or any AI assistant):** read this first before working on the codebase.

## What This Is

Marketing site for **Esteban Moreno** — video-first audiovisual editor and videographer based in Fort Lauderdale, serving Broward, Miami, and South Florida. Built to attract clients across his video-led service mix; the orchestrator (cortex) builds this overnight on max autonomy because there are no real users yet.

**Esteban's services:**
- Video editing + color grading
- Videography
- Short-form reels and social cutdowns
- Aerial / drone visuals
- Photography and photo editing as supporting services

Positioning is **video-first audiovisual editor**, not photographer-first and not "drone guy." Drone and photography are capabilities in the toolkit, but the lead offer is video editing and video production.

## Stack (decided — don't relitigate)

- **Framework:** Next.js 15 App Router + TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (radix primitives)
- **Deploy:** Vercel (preview URLs until domain is purchased)
- **Forms:** Resend or Formspree for contact (whichever is faster to wire) → routes to `gagui010@icloud.com` until Esteban's email is set up
- **i18n:** next-intl, bilingual EN/ES (South Florida market)
- **Analytics:** Vercel Analytics (free tier) — defer GA4 until domain is live
- **Media hosting:** Vercel Blob for placeholder assets; swap to Cloudinary or Mux when Esteban delivers real reels and portfolio stills

## Brand Voice (placeholder until refined)

- **Tone:** confident, cinematic, calm. "Video edits that feel intentional."
- **Avoid:** corporate jargon, "premium," "world-class," superlatives without proof
- **Bilingual rule:** EN copy first, then ES translation reviewed by a native speaker (Gonzalo). Never AI-translate without flagging for review.

## Domain

Target domain: `estebanmorenomedia.com`. If the typo `estebammorenomedia.com` is purchased too, use it only as a redirect to the correct spelling. When DNS is live, set `NEXT_PUBLIC_SITE_URL=https://estebanmorenomedia.com` in Vercel.

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
