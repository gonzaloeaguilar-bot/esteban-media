# Growth System sitemap-promotion queue

Owner: CTO SEO lead  
KPI: non-brand organic impressions, clicks, and `lead_submit` or call evidence by service page.  
Decision rule: do not add a pair to the sitemap until a current GSC/GA4 pull and the Semrush **UI export** record the query/competitor evidence and the hypothesis has an assigned measurement window.

| Pair | Demand hypothesis | Conversion hypothesis | Evidence required before sitemap promotion | Owner | Check window |
| --- | --- | --- | --- | --- | --- |
| `/services/conversion-websites` ↔ `/es/sitios-web-de-conversion` | Local businesses searching for website design or conversion-focused web work need an answer distinct from generic video editing. | A visible web-system CTA will create qualified project discussions. | Semrush UI export for local website terms; GSC page/query impressions; GA4 form/call attribution. | CTO SEO lead | 14 / 28 days |
| `/services/ai-lead-capture-automation` ↔ Spanish pair | Businesses evaluating chatbots, ManyChat, DM, email, or SMS workflows need a bounded implementation page. | Explaining consent, routing, and human handoff will qualify automation inquiries. | Semrush UI export; GSC impressions; CRM/form event evidence. | CTO SEO lead | 14 / 28 days |
| `/services/local-presence-seo` ↔ Spanish pair | Local businesses searching for GBP, Maps, Yelp, or marketplace setup need one local-presence offer. | A profile audit CTA will produce diagnostic requests. | Semrush UI export; GBP website/call actions; GSC local-page evidence. | CTO SEO lead | 14 / 28 days |
| `/services/growth-funnel-audit` ↔ Spanish pair | Operators with unmeasured acquisition and manual handoffs may seek a funnel or analytics audit. | A scoped audit CTA will turn analytics friction into qualified calls. | Semrush UI export; GA4 engagement/form evidence; documented audit request. | CTO data lead | 14 / 28 days |
| `/services/custom-operations-automation` ↔ Spanish pair | Businesses with repeat manual work may search for workflow/integration automation. | Explicit approval and security boundaries will filter to feasible projects. | Semrush UI export; GSC impressions; qualified project inquiry. | CTO dev lead | 14 / 28 days |
| `/services/creative-production` ↔ `/es/produccion-creativa` | Existing creative-production demand can be connected to a broader measured system without losing video/photo intent. | Portfolio proof plus service CTA will increase creative-project inquiries. | GSC page/query evidence; portfolio-to-contact click or lead event. | CTO SEO lead | 14 / 28 days |

## Loop actions

1. Daily, read current GSC page/query data and GA4 acquisition/events; do not rely on a prior snapshot.
2. Weekly, obtain the authenticated Semrush UI export for the exact local term set; no Semrush API substitution.
3. Promote only the pairs with written evidence above; update the sitemap baseline, watch set, and tests in the same PR.
4. After promotion, verify the live sitemap, index-watch state, and 14/28-day outcome. A deploy is not a ranking or lead result.
