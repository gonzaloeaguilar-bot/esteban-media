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
      // Automated browsers (webdriver, crawlers, AI agents) never configure GA4:
      // Google's known-bot list misses real-browser bots (portfolio audit 2026-09-23).
      var nav = typeof navigator !== 'undefined' ? navigator : {};
      var ua = String(nav.userAgent || '');
      if (
        nav.webdriver === true ||
        /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|perplexity|bytespider|petalbot|semrush|ahrefs|dataforseo|facebookexternalhit|bingpreview/i.test(ua)
      ) {
        return;
      }

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

      // The cross-brand contract: every brand emits the SAME event names with
      // the SAME parameter block, and what is specific to this brand travels in
      // a parameter. See ANALYTICS_CONTRACT.md.
      //
      // DUAL EMIT on purpose. GA4 key events on this property are configured
      // against the legacy names — contact_intent, contact_cta_click,
      // lead_submit (read live from the Admin API, 2026-09-19). Renaming in
      // place would have silently zeroed all three conversions. The legacy name
      // keeps flowing and the contract name rides alongside under a DIFFERENT
      // name, so no counter is written twice.
      var CONTRACT_MAP = {
        service_interest:  { event: 'cta_click',      params: { cta_kind: 'service_interest' } },
        lead_submit:       { event: 'lead',           params: { lead_type: 'form_submit' } },
        contact_intent:    { event: 'contact_click',  params: {} },
        contact_cta_click: { event: 'contact_click',  params: { method: 'contact_page' } },
        ai_referral_visit: { event: 'section_view',   params: { section_id: 'ai_referral_entry' } },
        scroll_depth:      { event: 'scroll_depth',   params: {} },
        page_view:         { event: 'page_view',      params: {} }
      };
      var CONTRACT_EVENTS = {
        page_view: 1, section_view: 1, scroll_depth: 1, page_dwell: 1, cta_click: 1,
        outbound_click: 1, contact_click: 1, form_start: 1, form_step: 1, form_error: 1,
        form_submit: 1, lead: 1, media_play: 1, search: 1, filter_apply: 1, item_view: 1,
        item_click: 1, share_click: 1, experiment_exposure: 1, error_shown: 1
      };

      function sharedBlock() {
        var parts = window.location.pathname.split('/').filter(Boolean);
        if (parts[0] === 'es' || parts[0] === 'en') parts = parts.slice(1);
        var joined = parts.join('/');
        var pageType = parts.length === 0 ? 'home'
          : joined.indexOf('contact') > -1 || joined.indexOf('contacto') > -1 ? 'form'
          : joined.indexOf('blog') > -1 || joined.indexOf('articulo') > -1 ? 'blog'
          : joined.indexOf('privac') > -1 || joined.indexOf('legal') > -1 ? 'legal'
          : joined.indexOf('servicio') > -1 || joined.indexOf('service') > -1 ? 'service'
          : parts.length === 1 ? 'service' : 'other';
        // The privacy suite runs this script against a minimal document stub,
        // and a hard dependency on documentElement.getAttribute turned a
        // measurement addition into a failing PII test for the whole file.
        var root = (document && document.documentElement) || {};
        var variant = typeof root.getAttribute === 'function'
          ? (root.getAttribute('data-variant') || 'control')
          : 'control';
        return {
          brand: 'esteban',
          page_type: pageType,
          locale: String(root.lang || 'en').slice(0, 2).toLowerCase(),
          variant: variant
        };
      }

      // What the contract requires of each event, filled from what this site
      // already collects. A required parameter left empty makes the event unable
      // to answer the question it exists for.
      function contractParams(event, legacyName, p) {
        var o = {};
        if (event === 'cta_click') {
          o.cta_id = String(p.service || p.cta_id || legacyName).slice(0, 60);
          o.cta_text = String(p.link_text || p.service || legacyName).slice(0, 80);
          o.cta_position = String(p.section || p.link_context || 'page').slice(0, 60);
        } else if (event === 'contact_click') {
          o.method = p.contact_method || p.method || 'unknown';
        } else if (event === 'lead') {
          o.form_id = String(p.lead_source || 'lead_form').slice(0, 60);
          o.lead_type = String(p.lead_source || 'form_submit').slice(0, 60);
        } else if (event === 'section_view') {
          o.section_id = p.section_id || 'unknown';
        } else if (event === 'outbound_click') {
          o.destination_domain = p.destination_domain || p.link_domain || 'unknown';
          o.link_context = p.link_context || p.section || 'page';
        }
        return o;
      }

      function sendEvent(name, parameters) {
        if (typeof window.gtag !== 'function') {
          return;
        }

        var shared = sharedBlock();
        var base = Object.assign(pageContext(), parameters, shared);
        window.gtag('event', name, base);

        var mapped = CONTRACT_MAP[name];
        if (mapped && mapped.event !== name) {
          var contract = Object.assign(
            pageContext(), parameters, mapped.params,
            contractParams(mapped.event, name, parameters || {}),
            shared, { legacy_event: name }
          );
          window.gtag('event', mapped.event, contract);
        }
      }

      // Exposed so React components and the shared layer emit through this one
      // writer instead of calling gtag directly.
      window.__estebanTrack = sendEvent;

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
            } else if (destination.hostname === 'wa.me' || destination.hostname === 'api.whatsapp.com') {
              method = 'whatsapp';
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
