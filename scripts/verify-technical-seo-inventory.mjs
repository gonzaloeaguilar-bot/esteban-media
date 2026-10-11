import { createHash } from "node:crypto";

export function verifyApprovedSitemap(urls, freeze, canonicalOrigin) {
  const unique = new Set(urls);
  if (urls.some((url) => new URL(url).origin !== canonicalOrigin)) {
    throw new Error(`sitemap contains a URL outside ${canonicalOrigin}`);
  }
  if (unique.size !== urls.length || urls.length !== freeze.approvedSitemapUrlCount) {
    throw new Error(
      `sitemap has ${urls.length} entries and ${unique.size} unique pages; approved inventory has ${freeze.approvedSitemapUrlCount}`,
    );
  }
  const hash = createHash("sha256").update([...urls].sort().join("\n")).digest("hex");
  if (hash !== freeze.approvedSitemapUrlSetSha256) {
    throw new Error("sitemap URL set differs from approved inventory");
  }
  return [...unique].map((url) => new URL(url).pathname);
}

export function verifyLocalizedPairs(pathnames, englishPrefix, spanishPrefix, label) {
  const english = pathnames.filter((path) => path.startsWith(englishPrefix));
  const spanish = pathnames.filter((path) => path.startsWith(spanishPrefix));
  if (english.length === 0 || spanish.length === 0 || english.length !== spanish.length) {
    throw new Error(`${label} has ${english.length} English and ${spanish.length} Spanish pages`);
  }
  return english.length + spanish.length;
}
