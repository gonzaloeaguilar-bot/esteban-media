type MicrosoftClarityScriptOptions = {
  projectId: string;
  canonicalHostname: string;
};

// Clarity project IDs are public identifiers once the tag is served. This is
// deliberately a narrow validation, not a secret store: it prevents an
// accidental URL/script injection through a deployment variable while keeping
// the tag completely absent until an owner supplies a real project ID.
export function getMicrosoftClarityProjectId(value: string | undefined) {
  const projectId = value?.trim();

  return projectId && /^[a-z0-9]{4,64}$/i.test(projectId)
    ? projectId
    : null;
}

export function buildMicrosoftClarityScript({
  projectId,
  canonicalHostname,
}: MicrosoftClarityScriptOptions) {
  return `
    (function () {
      var nav = typeof navigator !== 'undefined' ? navigator : {};
      var ua = String(nav.userAgent || '');
      var doNotTrack = nav.doNotTrack || window.doNotTrack || nav.msDoNotTrack;

      // Clarity is intentionally narrower than the existing analytics layer:
      // it never runs for automation, explicit browser privacy preferences, or
      // a preview/non-canonical host.
      if (
        nav.webdriver === true ||
        nav.globalPrivacyControl === true ||
        doNotTrack === '1' || doNotTrack === 'yes' ||
        /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|perplexity|bytespider|petalbot|semrush|ahrefs|dataforseo|facebookexternalhit|bingpreview/i.test(ua) ||
        window.location.hostname !== ${JSON.stringify(canonicalHostname)} ||
        window.__estebanClarityLoaded
      ) {
        return;
      }

      window.__estebanClarityLoaded = true;
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', ${JSON.stringify(projectId)});
    })();
  `;
}
