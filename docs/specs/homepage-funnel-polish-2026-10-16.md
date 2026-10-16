# Homepage funnel polish — 2026-10-16

## Purpose

Remove the English-language mismatch in the homepage/About service-area link, make the optional detailed form’s value clear before it opens, and guard three expanded homepage states against compact-phone and desktop regressions.

## Visitor and action

A South Florida video buyer can either contact Esteban immediately or voluntarily provide enough detail for a written quote. The direct WhatsApp/email/call options remain primary; the detailed form stays optional.

## Scope

- English About copy uses `service areas` linking to `/areas`; Spanish keeps its existing Spanish route and label.
- The detailed-brief disclosure gains one plain-language sentence explaining that it is for a complete written quote.
- Add deterministic browser checks and captures for the selected-package dialog, the opened detailed brief, and the expanded reading fold at 390×844 and 1440×900.

## Acceptance

- EN and ES server-rendered markup contains the correct locale-specific service-area route/label.
- The brief hint is present in both languages inside native `<details>` and the direct contact actions remain before that optional depth.
- The new UAT script exits zero against a local production build and captures the three opened states at both target viewports without horizontal overflow or a dialog/panel extending beyond the visible viewport.
