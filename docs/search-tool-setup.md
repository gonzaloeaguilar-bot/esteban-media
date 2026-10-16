# Free search-tool setup: Bing Webmaster Tools and Ahrefs Webmaster Tools

This site is technically ready for both free tools. The setup remains a human UI task because ownership, account access and exports belong to the account holder. No account, profile or public listing is created by this repository.

## Before opening either tool

Run the read-only check from the repository root:

```bash
pnpm search-tools:readiness
```

It verifies the live `robots.txt`, normal sitemap, video sitemap and public IndexNow key. A pass means the site-side prerequisites are live; it does **not** mean either tool account has been verified or has data.

## Bing Webmaster Tools

1. Open Bing Webmaster Tools in the browser and add `https://estebanmorenomedia.com/` as a Domain or URL-prefix property.
2. Prefer its Google Search Console import when the same owner can authorize it. Otherwise use Bing's offered verification method.
3. Confirm Bing can read both `https://estebanmorenomedia.com/sitemap.xml` and `https://estebanmorenomedia.com/video-sitemap.xml`.
4. After data appears, export Search Performance and AI Performance separately from the Bing UI. Name each file with its export date and source, for example `2026-10-16-bing-search-performance.csv` and `2026-10-16-bing-ai-performance.csv`.

Finished means Bing reports the verified property and accepts both sitemaps. A successful import or sitemap submission is not a ranking claim.

## Ahrefs Webmaster Tools

1. Open Ahrefs Webmaster Tools and add `https://estebanmorenomedia.com/`.
2. Complete the ownership method shown in the Ahrefs UI. If Google Search Console ownership is available, use that route so a new public meta tag is unnecessary.
3. Start one Site Audit and wait until it completes before interpreting errors.
4. Export the verified-site backlink and organic-keyword views after the audit has data. Name the exports with the date and source, for example `2026-10-16-ahrefs-site-audit.csv` and `2026-10-16-ahrefs-organic-keywords.csv`.

Finished means the verified site appears in Ahrefs and the first crawl has completed. Ahrefs estimates and crawl findings are corroborating evidence; Google Search Console remains the source for Google clicks and impressions.

## Review rhythm

- Weekly: use Google Search Console query/page data for the next page decision; read Bing Search Performance as a second engine.
- Monthly: review Bing AI Performance, Ahrefs crawl/backlink changes, and the GBP export together.
- After a material site release: run `pnpm search-tools:readiness` and `pnpm seo:indexnow:status`; submit changed URLs through the existing approved IndexNow workflow only when release policy permits it.

Keep UI exports outside this repository because they may contain account-level data. The evidence note should record the UI export date, report name and date range, not credentials or raw account exports.
