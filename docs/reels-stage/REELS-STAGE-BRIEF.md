# Esteban Moreno Media — "reels stage" home section, storyboard pass (2026-10-14)

Planning only. Produce the storyboard; do not implement.

Owner reference: Instagram reel DeawO83ukEb showing https://revvideoproductions.com/ (Awwwards Honorable Mention). Vault: gonzalo-tech/wiki/rev-productions-reel-reference-2026-10-14.md. Measured there: 14 autoplay muted looping local videos in the raw HTML, dark stage, glass cards, phone frames fanned in perspective; the only real 3D is a hero camera model. Owner complaint, 4th time: "why our websites still don't look like this".

The target: estebanmorenomedia.com home. Today: 1 video, 30 images, 10 text headings (curl 2026-10-14). The repo already holds Esteban's real work: public/real-estate-reels/reel-01..06.mp4 (1.8 to 5.4 MB each, with .jpg posters) and public/about/esteban-on-set.mp4. Use only these. No generated video, no stock, no 3D model unless the storyboard proves the geometry is needed (default: CSS perspective on phone frames).

Deliverable: a storyboard file STORYBOARD.md plus a frame sheet (PNG per beat, phone 390x844 AND desktop 1440x900 composed separately; a landscape frame never fills a portrait phone) for one section placed directly under the current hero:

1. Opening: dark stage, one line "Reels that sell the listing." (or better, in Esteban's voice from lib/copy), three phone frames fanned in perspective, the centre one playing reel-01 muted.
2. Action: scroll or tap brings the next frame to centre; the previous one recedes. Purposeful touch motion, a measurable scale dip on press.
3. Consequence: the active reel's client/listing line appears under it, with the one number we can prove (from the vault case studies only).
4. Next step: one compact action, "Plan a project", that already exists on the page.

Constraints: rail-kit first (check ~/.claude/rail-kit/.components for rail, card, sticky, billboard before any bespoke markup); web-kit engagement instrumentation; analytics contract events cta_click / media_play / item_view / section_view with the shared block; text in the served HTML, motion only on containers; prefers-reduced-motion shows the three posters still. Read ~/obsidian-wiki/_shared/gonzalo-design-taste.md and ~/.claude/rail-kit/REVIEW.md first.

Stop condition: Gonzalo sees the storyboard and frame sheet and accepts or redirects before any build. Write the storyboard into this worktree and commit it on this branch.
