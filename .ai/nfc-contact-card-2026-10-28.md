# NFC contact card — 2026-10-28

## Brief

- **Visitor:** someone who has just scanned Esteban's physical NFC card, usually on a phone.
- **Purpose:** make one useful next step obvious without making the person hunt through the full website.
- **First screen:** Esteban Moreno Media, what he does, and four thumb-sized actions: WhatsApp, call, Google Maps, and leave a Google review.
- **Secondary actions:** save the contact, email, Instagram, and view work. No public address is shown because this is a service-area business.
- **Identity:** Esteban's warm paper, ink and terracotta palette; calm, editorial, compact. This is not a copy of the main-site hero and does not animate words.
- **Interaction:** ordinary links work without JavaScript. The vCard is generated from the same canonical contact values as the page.
- **Measurement:** delegated `data-cta` labels distinguish the scan-card actions; current production baseline is `UNKNOWN`. Read the event availability and card action clicks after release.
- **Acceptance:** `/card` renders as initial HTML, all links resolve to their declared targets, the vCard downloads, keyboard focus is visible, and 390x600, 390x844 and desktop remain readable with no horizontal overflow. The primary real boundary is opening the existing WhatsApp number; the Google review action must open the verified Maps profile and tell the visitor exactly where to tap.

## Facts used

- Canonical site check: `curl -sSIL https://estebanmorenomedia.com` returned `HTTP/2 200` on 2026-10-28.
- Maps profile check: `curl -sSIL 'https://maps.google.com/?cid=12305289738935181687'` returned a Google redirect followed by `HTTP/2 200` on 2026-10-28.
- Contact values are imported from `lib/site.ts`; no address, review count, rating, availability or result claim is added.
