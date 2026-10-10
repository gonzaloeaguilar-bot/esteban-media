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
          o.contact_source = p.contact_source || 'unknown';
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

      // Attribution for the WhatsApp / phone / email click path. The form path
      // already answers "how did you find us?" (found_via on lead_submit); the
      // direct-contact path did not, so a visitor who called Esteban after an AI
      // answer arrived at GA4 as a bare contact_intent with contact_method:
      // whatsapp and no source. First touch is resolved once and kept in
      // sessionStorage so three pages of browsing before messaging does not lose
      // the channel.
      var FIRST_TOUCH_SOURCE_KEY = 'esteban-media:first-touch-source';
      var AI_SOURCE_NAMES = ['chatgpt', 'gemini', 'perplexity', 'copilot', 'claude'];

      function classifyReferralSource() {
        if (!document.referrer) {
          return null;
        }

        try {
          var referrerUrl = new URL(document.referrer);
          var aiSource = classifyAiHost(referrerUrl.hostname);
          if (aiSource) {
            return 'ai:' + aiSource;
          }

          var host = referrerUrl.hostname.toLowerCase().replace(/^www\\./, '');
          if (host.indexOf('google.') > -1) {
            return 'google';
          }
          if (host.indexOf('bing.') > -1) {
            return 'bing';
          }
          if (host === 'instagram.com' || host.slice(-14) === '.instagram.com') {
            return 'instagram';
          }
          return 'referral:' + host.slice(0, 40);
        } catch (_error) {
          return null;
        }
      }

      function firstTouchContactSource() {
        var stored = null;
        try {
          stored = window.sessionStorage.getItem(FIRST_TOUCH_SOURCE_KEY);
        } catch (_error) {
          stored = null;
        }
        if (stored) {
          return stored;
        }

        // The privacy gate forbids reading the raw query string anywhere in this
        // file because it can carry PII, so first touch resolves from the
        // referrer and prior storage only, never from the page query string.
        var resolved = classifyReferralSource() || 'direct';
        try {
          window.sessionStorage.setItem(FIRST_TOUCH_SOURCE_KEY, resolved);
        } catch (_error) {
          // Storage unavailable: attribution degrades to per-click, never throws.
        }
        return resolved;
      }

      function contactSourceAiName(source) {
        if (!source) {
          return null;
        }
        var separator = source.indexOf(':');
        var tail = separator > -1 ? source.slice(separator + 1) : source;
        return AI_SOURCE_NAMES.indexOf(tail) > -1 ? tail : null;
      }

      // Carries the first-touch channel into the WhatsApp message itself, so
      // Esteban reads where the lead came from in the chat, not only in GA4.
      function decorateWhatsappLinks() {
        if (typeof document.querySelectorAll !== 'function') {
          return;
        }

        var source = firstTouchContactSource();
        var aiName = contactSourceAiName(source);
        if (!aiName) {
          return;
        }

        var labels = { chatgpt: 'ChatGPT', gemini: 'Gemini', perplexity: 'Perplexity', copilot: 'Copilot', claude: 'Claude' };
        var label = labels[aiName] || aiName;
        var spanish = document.documentElement && String(document.documentElement.lang || '').toLowerCase().indexOf('es') === 0;
        var suffix = spanish ? ' (v\u00eda ' + label + ')' : ' (via ' + label + ')';
        var anchors = document.querySelectorAll('a[href^="https://wa.me/"], a[href^="https://api.whatsapp.com/"]');

        for (var index = 0; index < anchors.length; index += 1) {
          var anchor = anchors[index];
          var href = anchor.getAttribute('href') || '';
          if (href.indexOf('text=') === -1) {
            continue;
          }
          try {
            var url = new URL(href);
            var existing = url.searchParams.get('text');
            // Skip a link with no prefilled text or one already attributed by
            // an earlier run, so a second pass cannot double the suffix.
            if (existing === null || existing.indexOf('(via ') > -1 || existing.indexOf('(v\u00eda ') > -1) {
              continue;
            }
            url.searchParams.set('text', existing + suffix);
            anchor.setAttribute('href', url.toString());
          } catch (_error) {
            // A malformed link is left exactly as rendered.
          }
        }
      }

      if (typeof document.readyState === 'string' && document.readyState === 'loading' && typeof document.addEventListener === 'function') {
        document.addEventListener('DOMContentLoaded', decorateWhatsappLinks);
      } else {
        decorateWhatsappLinks();
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

        var source = firstTouchContactSource();
        var aiName = contactSourceAiName(source);
        var intentParams = { contact_method: method, contact_source: source };
        if (aiName) {
          intentParams.ai_source = aiName;
        }

        sendEvent(
          method === 'contact_page' ? 'contact_cta_click' : 'contact_intent',
          intentParams
        );
      }, true);
    })();
  `;
}
