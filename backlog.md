# esteban-media — Backlog

> **Cortex protocol:** items tagged `P0`/`P1`/`P2` get picked up nightly. Mark `- [x]` + append ` — Done YYYY-MM-DD` when complete. Auto-merge policy in `CLAUDE.md` + `context-snapshot.md`.

## P0

- [x] `P0` **Scaffold Next.js 15 App Router + TypeScript + Tailwind v4 + shadcn/ui** — Create package.json (pnpm), tsconfig.json (strict), tailwind.config.ts, app/ directory with layout.tsx + page.tsx, components/ui/ shadcn primitives (button, card, container). Verify `pnpm dev` boots clean on localhost:3000. Commit. `scaffold` — Done 2026-05-30

- [x] `P0` **Build homepage with hero + services strip + CTA** — `app/page.tsx`: cinematic hero (placeholder video bg from Vercel public sample), 5-service strip (drone, photo, video, video edit, photo edit) with icons + 1-liner each, About teaser, Contact CTA. Tailwind only, no shadcn dialogs yet. Mobile-first. `home` — Done 2026-05-30

- [ ] `P0` **Build services overview page** — `app/services/page.tsx`: grid of 5 service cards linking to individual pages (those pages don't exist yet — link to `/services/[slug]` with placeholder content for missing slugs). Add to top nav. `services`

## P1

- [ ] `P1` **Build individual service pages (5 routes)** — `app/services/aerial`, `/photography`, `/videography`, `/video-editing`, `/photo-editing`. Each: hero, "what's included" list, sample work gallery (placeholders), inquiry CTA. Same layout, parameterized via JSON or MDX. `services`

- [ ] `P1` **Build About Esteban page** — `app/about/page.tsx`: placeholder bio (mark with `<!-- TODO: real bio from Esteban -->`), professional headshot placeholder, brand statement, list of equipment. Bilingual structure ready (use placeholder ES content). `about`

- [ ] `P1` **Build Contact page with working form** — `app/contact/page.tsx` + `app/api/contact/route.ts`. Form fields: name, email, project type (dropdown of 5 services), budget range, message. Submits via Resend or Formspree to `gagui010@icloud.com`. Include honeypot field for spam. Confirm on submit. `contact`

- [ ] `P1` **Wire next-intl bilingual EN/ES** — Add next-intl, locale routing at `/en/*` and `/es/*`, default to EN, language switcher in header. Translate all current copy to ES (flag `<!-- TRANSLATION REVIEW NEEDED -->` on each block). `i18n`

## P2

- [ ] `P2` **Add LocalBusiness + Service + Person schema JSON-LD** — Inject in `app/layout.tsx` (LocalBusiness for the org, Person for Esteban) and on each service page (Service schema with provider ref). Use real social handles when known; placeholder until then. `seo`

- [ ] `P2` **SEO meta + OG image defaults** — `app/layout.tsx` metadata with title template, description, OG image (placeholder), Twitter card. Per-page metadata exports on home/services/about/contact. `seo`

- [ ] `P2` **Add robots.txt + dynamic sitemap.xml** — `app/robots.ts` allowing all, `app/sitemap.ts` listing all routes. Reference sitemap from robots. `seo`

- [ ] `P2` **Lighthouse perf pass — hit 95+ on Performance/SEO/Accessibility** — Run Lighthouse against local build, fix flagged issues (next/image, font swap, prefers-reduced-motion, alt text, heading order). `perf`

- [ ] `P2` **GitHub repo + Vercel deploy** `needs-human` — Create GitHub repo `esteban-media` under gonzaloeaguilar-bot, push, link to Vercel, get preview URL. Drafts a proposal because requires GH/Vercel auth interactions. `infra`

## Notes

- Esteban hasn't delivered real photos/videos yet — use placeholders, mark with `<!-- TODO: real asset from Esteban -->`. Don't generate AI images.
- Domain TBD. All `metadataBase` should use Vercel preview URL until set.
- Bilingual: EN copy first, ES second. ES translation must be flagged for native-speaker review.
