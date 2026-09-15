# Design Review: Esteban Moreno Media Homepage
**Date**: 2026-09-15
**URL**: https://estebanmorenomedia.com/

## Overall Impression
The original homepage looked polished, but it carried too many search, service, and business-explanation jobs before showing the work. Esteban's feedback was valid: on mobile, the main portfolio section started more than five screens down, so a real visitor who came to judge projects could easily miss it.

## Original Evidence
- Production responded `HTTP/2 200` from Vercel on 2026-09-15, with prerendered homepage HTML.
- Desktop viewport tested: 1440x900. Main portfolio section top: 2,307 px, or 2.56 screens down.
- Mobile viewport tested: 390x844. Main portfolio section top: 4,500 px, or 5.33 screens down.
- Screenshot evidence:
  - `/tmp/esteban-home-desktop-fold.png`
  - `/tmp/esteban-home-mobile-fold.png`
  - `/tmp/esteban-home-desktop.png`
  - `/tmp/esteban-home-mobile.png`

## Findings

### High
- **Portfolio was too late for the primary human intent** at homepage. On mobile, visitors had to pass too much explanation before the work grid appeared.
- **Hero buttons sent visitors away from the work** at first impression. A skeptical buyer likely wants to see examples before contacting.
- **The page tried to explain everything before letting the work speak.** Preserve search support lower on the page, but make the first human path: identity, work, then services/contact.

### Medium
- **Service taxonomy competed with portfolio taxonomy** before the work grid. Repeated cards made the page feel more complex than it needed to be.
- **The homepage headline was accurate but broad.** Pairing it with immediate project samples makes the brand easier to understand.
- **Mobile fold was all explanation.** The work needed to enter the first scan path.

### Low
- **Desktop nav technically exposed Portfolio early,** but mobile still needed the homepage itself to tell a simpler story.
- **The visual system was coherent.** This was a prioritization problem, not a polish problem.

## Implemented Revision
- Moved `PortfolioTeaser` directly after `HeroVideo` on English and Spanish homepages.
- Changed hero buttons to lead with portfolio first, then project contact.
- Removed the homepage hero intake form so visitors reach the work faster.
- Tightened English and Spanish hero copy.
- Tightened the portfolio teaser copy around fast human evaluation.
- Rewrote service and Spanish homepage copy to remove internal language.
- Kept metadata, canonical tags, structured data, and route inventory intact for SEO.

## Post-Revision Measurement
- English desktop: portfolio starts at 1.18 screens; first project card starts at 1.38 screens.
- English mobile: portfolio starts at 0.79 screens; first project card starts at 1.12 screens.
- Spanish desktop: portfolio starts at 1.02 screens; first project card starts at 1.21 screens.
- Spanish mobile: portfolio starts at 0.82 screens; first project card starts at 1.18 screens.

## Final Human UAT
- See `.jez/artifacts/homepage-human-uat.md`.
- The dedicated UI/UX, dyslexia, ADHD, plain-language, and SEO checks passed with 0 failures against the local production build.
