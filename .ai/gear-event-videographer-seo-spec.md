# Equipment, conference and yacht-event discovery

## Scope

Build three English/Spanish, server-rendered commercial surfaces: an equipment-and-preparation page; a Fort Lauderdale yacht-event videography page; and stronger full-day conference language in the existing Miami videographer and corporate-event pages. The owner confirms current equipment as a Sony Alpha IV and Canon T5i. Do not invent model specifications, 4K claims, lens/audio/lighting inventory, availability, certification, client outcomes, or publication permission for this weekend's work.

## Visitor and outcome

A South Florida business or event organiser needs to know whether Esteban can film their location, conference, or yacht dinner and what to send for a quote. The outcome is a qualified inquiry containing date, location, event duration, deliverables, and whether editing is required. Measure `service_inquiry_started` for the new routes after 28 days; current baseline is unknown.

## Content architecture

The equipment page explains the owner-confirmed cameras as preparation context, never as a spec-sheet SEO trap. The yacht page sells real on-location event filming in Fort Lauderdale; the existing yacht-editing page remains dedicated to supplied-footage post-production. Each page leads with the service, has 100–180 word question-led factual sections, native server-rendered `<details>` for optional prep, Service/FAQ schema matching visible copy, EN/ES parity, internal links, canonical/hreflang and sitemap inclusion.

## Visual/interaction direction

Reuse Esteban’s existing editorial service templates and calm cream/terracotta composition. No new cinematic UI, motion or invented imagery: this is a content/discovery upgrade. Keep a direct inquiry route above optional reading and use existing contact/service components.

## Acceptance

- Raw production-equivalent HTML contains the citable service/equipment facts with JS disabled.
- New EN/ES routes have titles, one H1, canonicals, hreflang, Service + FAQPage schema, sitemap entries and contextual internal links.
- Existing yacht editing copy remains distinctly post-production only.
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm text-parity`, technical SEO and representative raw-HTML checks pass.
- Mobile 375x667, 390x844 and desktop render/readability checked; no changes to hero/intro.

