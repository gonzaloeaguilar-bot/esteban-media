type GoogleAnalyticsScriptOptions = {
  measurementId: string;
  canonicalHostname: string;
  instagramHostname: string;
  allowedPaths: readonly string[];
};

export function buildGoogleAnalyticsScript({
  measurementId,
  canonicalHostname,
  instagramHostname,
  allowedPaths,
}: GoogleAnalyticsScriptOptions) {
  const uniqueAllowedPaths = [...new Set(allowedPaths)].sort();

  return `
    (function () {
      if (
        window.location.hostname !== ${JSON.stringify(canonicalHostname)} ||
        window.__estebanAnalyticsEventsBound
      ) {
        return;
      }

      window.__estebanAnalyticsEventsBound = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};

      var canonicalOrigin = ${JSON.stringify(`https://${canonicalHostname}`)};
      var instagramHostname = ${JSON.stringify(instagramHostname)};
      var allowedPaths = new Set(${JSON.stringify(uniqueAllowedPaths)});
      var aiReferrers = {
        'chatgpt.com': 'chatgpt',
        'chat.openai.com': 'chatgpt',
        'perplexity.ai': 'perplexity',
        'gemini.google.com': 'gemini',
        'copilot.microsoft.com': 'copilot',
        'claude.ai': 'claude',
        'you.com': 'you.com',
        'meta.ai': 'meta.ai'
      };

      function safePagePath(pathname) {
        return allowedPaths.has(pathname) ? pathname : '/not-found';
      }

      function safeReferrer(value) {
        if (!value) {
          return '';
        }

        try {
          var referrerUrl = new URL(value);
          if (referrerUrl.protocol !== 'https:' && referrerUrl.protocol !== 'http:') {
            return '';
          }

          if (referrerUrl.hostname === ${JSON.stringify(canonicalHostname)}) {
            return canonicalOrigin + safePagePath(referrerUrl.pathname);
          }

          return referrerUrl.origin + '/';
        } catch (_error) {
          return '';
        }
      }

      function pageLanguage() {
        return document.documentElement.lang.toLowerCase().startsWith('es')
          ? 'es'
          : 'en';
      }

      var currentPageReferrer = safeReferrer(document.referrer);
      var lastPagePath = null;
      var lastPageLocation = currentPageReferrer;

      function pageContext() {
        var pagePath = safePagePath(window.location.pathname);

        return {
          page_language: pageLanguage(),
          page_path: pagePath,
          page_location: canonicalOrigin + pagePath,
          page_referrer: currentPageReferrer,
          page_title: pagePath,
          transport_type: 'beacon'
        };
      }

      function sendEvent(name, parameters) {
        if (typeof window.gtag !== 'function') {
          return;
        }

        window.gtag('event', name, Object.assign(pageContext(), parameters));
      }

      function sendPageView() {
        var pagePath = safePagePath(window.location.pathname);
        if (pagePath === lastPagePath) {
          return;
        }

        if (lastPagePath !== null) {
          currentPageReferrer = lastPageLocation;
        }

        sendEvent('page_view', {});
        lastPagePath = pagePath;
        lastPageLocation = canonicalOrigin + pagePath;
      }

      window.gtag('js', new Date());
      window.gtag('config', ${JSON.stringify(measurementId)}, {
        send_page_view: false,
        page_location: canonicalOrigin + safePagePath(window.location.pathname),
        page_referrer: currentPageReferrer,
        page_title: safePagePath(window.location.pathname),
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
      sendPageView();

      var pageViewScheduled = false;
      function schedulePageView() {
        if (pageViewScheduled) {
          return;
        }

        pageViewScheduled = true;
        var schedule = typeof window.requestAnimationFrame === 'function'
          ? window.requestAnimationFrame.bind(window)
          : function (callback) { window.setTimeout(callback, 0); };

        schedule(function () {
          schedule(function () {
            pageViewScheduled = false;
            sendPageView();
          });
        });
      }

      ['pushState', 'replaceState'].forEach(function (method) {
        var original = window.history[method];
        window.history[method] = function () {
          var result = original.apply(this, arguments);
          schedulePageView();
          return result;
        };
      });
      window.addEventListener('popstate', schedulePageView);

      function classifyAiHost(hostname) {
        var normalized = hostname.toLowerCase().replace(/^www\\./, '');
        var hosts = Object.keys(aiReferrers);

        for (var index = 0; index < hosts.length; index += 1) {
          var host = hosts[index];
          if (normalized === host || normalized.endsWith('.' + host)) {
            return aiReferrers[host];
          }
        }

        return null;
      }

      if (document.referrer) {
        try {
          var referrerUrl = new URL(document.referrer);
          var aiSource = classifyAiHost(referrerUrl.hostname);
          var referralKey = 'esteban-media:ai-referral-recorded';
          var referralRecorded = window.sessionStorage.getItem(referralKey);

          if (aiSource && !referralRecorded) {
            sendEvent('ai_referral_visit', {
              ai_source: aiSource,
              referrer_hostname: referrerUrl.hostname
            });
            window.sessionStorage.setItem(referralKey, '1');
          }
        } catch (_error) {
          // Invalid or unavailable referrers/storage are ignored without affecting navigation.
        }
      }

      document.addEventListener('click', function (event) {
        var target = event.target;
        if (!(target instanceof Element)) {
          return;
        }

        var anchor = target.closest('a[href]');
        if (!anchor) {
          return;
        }

        var rawHref = anchor.getAttribute('href') || '';
        var method = null;

        if (rawHref.startsWith('mailto:')) {
          method = 'email';
        } else if (rawHref.startsWith('tel:')) {
          method = 'phone';
        } else {
          try {
            var destination = new URL(anchor.href, canonicalOrigin);
            if (destination.hostname === instagramHostname) {
              method = 'instagram';
            } else if (
              destination.origin === canonicalOrigin &&
              (destination.pathname === '/contact' ||
                destination.pathname === '/es/contacto')
            ) {
              method = 'contact_page';
            }
          } catch (_error) {
            return;
          }
        }

        if (!method) {
          return;
        }

        sendEvent(
          method === 'contact_page' ? 'contact_cta_click' : 'contact_intent',
          { contact_method: method }
        );
      }, true);
    })();
  `;
}
