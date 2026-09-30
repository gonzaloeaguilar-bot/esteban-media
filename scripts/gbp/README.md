# Google Business Profile — the real-estate relevance change

## Why

Read live from the Business Profile APIs on 2026-09-30 (Gonzalo's OAuth identity
plus the `X-Goog-User-Project` header):

| metric | 90 days |
|---|---|
| Impressions (mobile+desktop, Maps+Search) | **213** |
| Direction requests | 3 |
| Website clicks | 2 |
| **Phone calls** | **0** |
| Search keywords that surfaced the profile | **below Google's reporting threshold** |

The profile itself is in good shape — 5.0 stars from 11 reviews, 5 photos, four
categories, a 440-character description, hours, three service areas, six service
items, not a duplicate. So the problem is not completeness. Almost nobody sees it.

What it never says is who actually hires him. The description names
"entrepreneurs, local businesses, and agencies" and no service item mentions real
estate, while four independent sources point the same way:

- One of his Google reviews is from a real estate client.
- `/es/guias/ideas-de-reels-para-agentes-de-bienes-raices` is the 4th-biggest
  landing page on the site (9 sessions in 30 days) with **1** search impression,
  so that audience arrives from social.
- `/es/reels-para-negocios-miami` produced the only contact click on the site.
- Perplexity cites him for "video editor for realtors in South Florida who speaks
  Spanish" and does not cite him for the generic English variants.
- The calls Esteban reports getting are from real estate agents.

## What the script changes

Two things, both additive. Nothing existing is removed.

1. **The description** keeps every fact already there and adds the audience and
   the format: real estate agents and brokerages, listing walkthroughs,
   neighborhood pieces, agent-brand Reels, and the bilingual angle. 748 of the
   750 characters Google allows.
2. **Two new service items**, one English and one Spanish, for real estate Reels
   and listing video. The six existing items are preserved and re-sent unchanged.

## Before you run it

The before-state is saved at
`client-esteban-media/raw/gbp-esteban-before-2026-09-30.json` in the Obsidian
vault. To undo, PATCH `profile.description` and `serviceItems` back from that file.

Editing a description sends the profile through Google's review, which usually
takes a day or two and occasionally rejects wording. That is the only risk, and it
is reversible.

## Run it

    /usr/local/bin/python3.13 scripts/gbp/apply-real-estate-relevance.py

It prints the character count and the resulting item count. It writes nothing else
and touches no other location.

## What it deliberately does NOT do

- **No aggregateRating on the website.** He has 5.0 from 11 real reviews, but
  emitting a rating in the site's own structured data for reviews hosted on Google
  is a structured-data violation. `lib/site.ts` already carries that decision in a
  comment and it stands.
- **No review replies or photo uploads.** Those need the legacy Google My Business
  API v4, which returns 403 because it is not enabled on
  `fort-lauderdale-auto-seo` — and it is an allowlisted API, so enabling it needs
  Google's approval, not just a console click. Replying to the 11 reviews by hand
  in the Business Profile app is the faster path and is worth doing: every one is
  five stars and none appears to have a reply.
