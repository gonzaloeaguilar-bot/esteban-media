# esteban-media — Backlog

> **Cortex protocol:** items tagged `P0`/`P1`/`P2` get picked up nightly. Mark `- [x]` + append ` — Done YYYY-MM-DD` when complete. Auto-merge policy in `CLAUDE.md` + `context-snapshot.md`.

## P0

- [x] `P0` **Scaffold Next.js 15 App Router + TypeScript + Tailwind v4 + shadcn/ui** — Create package.json (pnpm), tsconfig.json (strict), tailwind.config.ts, app/ directory with layout.tsx + page.tsx, components/ui/ shadcn primitives (button, card, container). Verify `pnpm dev` boots clean on localhost:3000. Commit. `scaffold` — Done 2026-05-12

- [x] `P0` **Build homepage with hero + services strip + CTA** — `app/page.tsx`: cinematic hero (placeholder video bg from Vercel public sample), 5-service strip (drone, photo, video, video edit, photo edit) with icons + 1-liner each, About teaser, Contact CTA. Tailwind only, no shadcn dialogs yet. Mobile-first. `home` — Done 2026-05-12

- [x] `P0` **Build services overview page** — `app/services/page.tsx`: grid of 5 service cards linking to individual pages (those pages don't exist yet — link to `/services/[slug]` with placeholder content for missing slugs). Add to top nav. `services` — Done 2026-05-12

## P1

- [x] `P1` **Build individual service pages (5 routes)** — `app/services/aerial`, `/photography`, `/videography`, `/video-editing`, `/photo-editing`. Each: hero, "what's included" list, sample work gallery (placeholders), inquiry CTA. Same layout, parameterized via JSON or MDX. `services` — Done 2026-05-18

- [x] `P1` **Build About Esteban page** — `app/about/page.tsx`: placeholder bio (mark with `<!-- TODO: real bio from Esteban -->`), professional headshot placeholder, brand statement, list of equipment. Bilingual structure ready (use placeholder ES content). `about` — Done 2026-05-21

- [x] `P1` **Build Contact page with working form** — `app/contact/page.tsx` + `app/api/contact/route.ts`. Form fields: name, email, project type (dropdown of 5 services), budget range, message. Submits via Resend or Formspree to `gagui010@icloud.com`. Include honeypot field for spam. Confirm on submit. `contact` — Done 2026-05-13

- [x] `P1` **Wire next-intl bilingual EN/ES** — Add next-intl, locale routing at `/en/*` and `/es/*`, default to EN, language switcher in header. Translate all current copy to ES (flag `<!-- TRANSLATION REVIEW NEEDED -->` on each block). `i18n` — Done 2026-05-14

## P2

- [x] `P2` **Add LocalBusiness + Service + Person schema JSON-LD** — Inject in `app/layout.tsx` (LocalBusiness for the org, Person for Esteban) and on each service page (Service schema with provider ref). Use real social handles when known; placeholder until then. `seo` — Done 2026-05-18

- [x] `P2` **SEO meta + OG image defaults** — `app/layout.tsx` metadata with title template, description, OG image (placeholder), Twitter card. Per-page metadata exports on home/services/about/contact. `seo` — Done 2026-05-19

- [x] `P2` **Add robots.txt + dynamic sitemap.xml** — `app/robots.ts` allowing all, `app/sitemap.ts` listing all routes. Reference sitemap from robots. `seo` — Done 2026-05-19

- [x] `P2` **Lighthouse perf pass — hit 95+ on Performance/SEO/Accessibility** — Run Lighthouse against local build, fix flagged issues (next/image, font swap, prefers-reduced-motion, alt text, heading order). `perf` — Done 2026-05-20

- [ ] `P2` **GitHub repo + Vercel deploy** `needs-human` — Create GitHub repo `esteban-media` under gonzaloeaguilar-bot, push, link to Vercel, get preview URL. Drafts a proposal because requires GH/Vercel auth interactions. `infra`

- [x] `P2` **Research-driven local SEO architecture** — Add competitor research notes, typed keyword clusters, seven launch local/niche landing pages, local Service schema, FAQ schema, and sitemap coverage. Keep UI swappable by rendering from `lib/local-seo-pages.ts`. `seo` — Done 2026-05-22

- [x] `P2` **Storefront monetization audit** — Research comparable South Florida video/content storefronts and document package, booking, proof, portfolio, and conversion recommendations in `docs/storefront-monetization-audit.md`. `strategy` — Done 2026-05-22

- [x] `P2` **Packages page + offer data** — Create typed launch offers (`Edit-Only Starter`, `Content Day Mini`, `Local Business Monthly`) with starting-at ranges, deliverables, caveats, and CTAs. Render `/[locale]/packages`, link from homepage/services/local pages, and add package FAQ/schema. `monetization` — Done 2026-05-23

- [x] `P2` **Contact form conversion fields** — Add deadline, city, final platform, footage status, and shoot-needed fields to the shared zod schema, client form, and email body so leads arrive pre-qualified. `monetization` — Done 2026-05-23

- [ ] `P2` **Portfolio/proof data model** — Add a typed portfolio source that can support Instagram embeds now and self-hosted video posters later. Group by Reels, real estate, restaurants, aerial, events, and business promos. `proof`

## Notes

- Esteban hasn't delivered real photos/videos yet — use placeholders, mark with `<!-- TODO: real asset from Esteban -->`. Don't generate AI images.
- Domain target is `estebanmorenomedia.com`. Current code defaults `metadataBase` and schema URLs to that domain; set `NEXT_PUBLIC_SITE_URL` in Vercel once DNS is live.
- Bilingual: EN copy first, ES second. ES translation must be flagged for native-speaker review.
