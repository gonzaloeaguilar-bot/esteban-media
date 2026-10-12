import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// Resolve playwright from the repo first. The old hard-coded codex-runtime
// path is reaped by the disk janitor, and when it vanishes this script dies on
// import — which, piped through `2>/dev/null`, looks exactly like a clean run.
const playwrightCandidates = [
  process.env.WORKSPACE_NODE_MODULES && `${process.env.WORKSPACE_NODE_MODULES}/playwright`,
  "playwright",
  "/Users/gonzalo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
].filter(Boolean);
let chromium;
for (const candidate of playwrightCandidates) {
  try {
    ({ chromium } = require(candidate));
    break;
  } catch {
    // try the next one
  }
}
if (!chromium) {
  throw new Error(
    `playwright not resolvable. Tried: ${playwrightCandidates.join(", ")}. ` +
      "Install it in the repo with `pnpm add -D playwright`.",
  );
}

const baseUrl = process.env.UAT_BASE_URL || "http://localhost:3107";
const executablePath =
  process.env.CHROME_EXECUTABLE ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const routes = [
  { path: "/", locale: "en", portfolioHref: "/portfolio", contactHref: "/contact" },
  {
    path: "/es",
    locale: "es",
    portfolioHref: "/es/portafolio",
    contactHref: "/es/contacto",
  },
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const internalTerms = [
  "guardrail",
  "baseline",
  "staging",
  "readiness",
  "activation",
  "UAT",
  "GEO",
  "rutas heredadas",
  "journey",
  "CTA",
  "proof lane",
  "internal link",
];

function assert(condition, message, details = {}) {
  return { ok: Boolean(condition), message, details };
}

async function evaluateRoute(page, route, viewport) {
  await page.goto(`${baseUrl}${route.path}`, {
    waitUntil: "networkidle",
    timeout: 45_000,
  });

  // REFUSE to measure an unstyled page. Every distance this script reports —
  // "portfolio sits N screens down" — is a statement about layout, and layout
  // does not exist until the stylesheets apply. A Next DEV server injects CSS
  // through its JS runtime, so a dev capture can return fully-formed numbers
  // for a page rendering as Times New Roman with blue underlined links. Those
  // numbers look exactly like real ones and are worthless. Fail loudly instead:
  // an unstyled measurement is not a smaller truth, it is a different page.
  const styling = await page.evaluate(() => ({
    sheets: document.styleSheets.length,
    rules: [...document.styleSheets].reduce((n, sheet) => {
      try {
        return n + sheet.cssRules.length;
      } catch {
        return n; // cross-origin sheet, still counts as loaded
      }
    }, 0),
  }));
  if (styling.sheets === 0) {
    throw new Error(
      `${baseUrl}${route.path} rendered with ZERO stylesheets — refusing to report ` +
        "layout measurements for an unstyled page. If this is a Next dev server, run the " +
        "probe against `next build && next start`, or against production.",
    );
  }

  const result = await page.evaluate(
    ({ viewport, internalTerms }) => {
      const norm = (value) => (value || "").trim().replace(/\s+/g, " ");
      const main = document.querySelector("main");
      const hero = document.querySelector('section[aria-labelledby="hero-heading"]');
      const portfolio = document.querySelector('[aria-labelledby^="selected-work"]');
      const firstProject =
        portfolio?.querySelector('a[href*="portfolio"], a[href*="portafolio"], a[href*="services"]') ??
        null;
      const heroLinks = [...(hero?.querySelectorAll("a") ?? [])].map((link) => ({
        text: norm(link.textContent),
        href: link.getAttribute("href"),
        rect: link.getBoundingClientRect().toJSON(),
        inlineTextLink: Boolean(link.closest("p")),
        // Button-like is a RENDERED property, not a class name. The hero moved
        // from Tailwind `rounded-full` pills to `em-cine__cta` and this check
        // silently matched nothing, which made the hero assertions below
        // permanently unsatisfiable. Measure what the browser paints: a padded,
        // filled, rounded box that is not an inline link inside a paragraph.
        buttonLike: (() => {
          if (link.closest("p")) return false;
          const cs = getComputedStyle(link);
          const radius = Number.parseFloat(cs.borderTopLeftRadius) || 0;
          const padX =
            (Number.parseFloat(cs.paddingLeft) || 0) + (Number.parseFloat(cs.paddingRight) || 0);
          const filled =
            cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent";
          const bordered = (Number.parseFloat(cs.borderTopWidth) || 0) > 0;
          const box = cs.display.includes("flex") || cs.display.includes("block");
          return box && radius >= 4 && padX >= 16 && (filled || bordered);
        })(),
      }));
      const heroButtons = heroLinks.filter((link) => link.buttonLike);
      const visibleText = norm(document.body.innerText);
      const paragraphs = [...document.querySelectorAll("main p")].map((p) => ({
        text: norm(p.textContent),
        words: norm(p.textContent).split(/\s+/).filter(Boolean).length,
      }));
      const h1 = document.querySelector("h1");
      const title = document.title;
      const metaDescription =
        document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
      const jsonLdCount = document.querySelectorAll('script[type="application/ld+json"]').length;
      const tapTargets = [...document.querySelectorAll("a,button")]
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            text: norm(el.textContent),
            href: el.getAttribute("href"),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            inlineTextLink: Boolean(el.closest("p")),
            visible:
              rect.width > 0 &&
              rect.height > 0 &&
              getComputedStyle(el).visibility !== "hidden" &&
              getComputedStyle(el).display !== "none",
          };
        })
        .filter((item) => item.visible);
      const tinyTapTargets = tapTargets.filter((item) => {
        if (
          item.text.startsWith("Skip to content") ||
          item.text.startsWith("eEsteban Moreno") ||
          item.inlineTextLink
        ) {
          return false;
        }

        return item.width < 40 || item.height < 40;
      });
      const leakingTerms = internalTerms.filter((term) => {
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return new RegExp(`(^|[^A-Za-z])${escaped}([^A-Za-z]|$)`, "i").test(
          visibleText,
        );
      });

      return {
        viewport,
        title,
        metaDescription,
        canonical,
        jsonLdCount,
        h1: norm(h1?.textContent),
        h1Words: norm(h1?.textContent).split(/\s+/).filter(Boolean).length,
        visibleWordCount: norm(main?.innerText).split(/\s+/).filter(Boolean).length,
        paragraphMaxWords: Math.max(0, ...paragraphs.map((p) => p.words)),
        paragraphOver45Words: paragraphs.filter((p) => p.words > 45).slice(0, 5),
        heroLinks,
        heroButtons,
        portfolioTop: portfolio
          ? Math.round(portfolio.getBoundingClientRect().top + scrollY)
          : null,
        portfolioScreensDown: portfolio
          ? Number(((portfolio.getBoundingClientRect().top + scrollY) / innerHeight).toFixed(2))
          : null,
        firstProjectTop: firstProject
          ? Math.round(firstProject.getBoundingClientRect().top + scrollY)
          : null,
        firstProjectScreensDown: firstProject
          ? Number(((firstProject.getBoundingClientRect().top + scrollY) / innerHeight).toFixed(2))
          : null,
        leakingTerms,
        tinyTapTargets: tinyTapTargets.slice(0, 12),
        tapTargetCount: tapTargets.length,
        headings: [...document.querySelectorAll("main h1, main h2, main h3")]
          .slice(0, 12)
          .map((heading) => ({
            tag: heading.tagName,
            text: norm(heading.textContent),
            top: Math.round(heading.getBoundingClientRect().top + scrollY),
          })),
      };
    },
    { route, viewport, internalTerms },
  );

  const checks = [
    assert(
      // The hero's ONE primary action is the WhatsApp quote, and the portfolio
      // is the secondary navigational link. That is a deliberate decision
      // (d07ca2a6 "make the WhatsApp quote the one primary action, worded
      // once"), documented in components/hero-video.tsx. This check used to
      // demand the portfolio be FIRST, which asserted the design we replaced.
      // What still matters to a buyer is that the work is reachable from the
      // hero without hunting, so require the portfolio to be present as one of
      // the hero's buttons — not that it outrank the quote.
      // Judge the property a human cares about: the portfolio is reachable from
      // the hero and big enough to tap. Do NOT require it to look "button-like"
      // — it ships as a ghost button whose padding differs by viewport, so a
      // style heuristic marks it present on desktop and missing on a phone,
      // inventing a mobile defect that is not there.
      result.heroLinks.some(
        (link) =>
          link.href === route.portfolioHref &&
          link.rect.width >= 44 &&
          link.rect.height >= 44,
      ),
      "Hero offers a way into the work",
      { heroLinks: result.heroLinks },
    ),
    assert(
      // Esteban's contact channel IS WhatsApp — every contact action on the
      // site is a wa.me link, and the Spanish copy says "Cotiza por WhatsApp".
      // Demanding /contact in the hero asserted a page we deliberately do not
      // ship. What matters to a human is that the hero offers SOME way to reach
      // him, so accept the real channels.
      result.heroLinks.some(
        (link) =>
          link.href === route.contactHref ||
          /^https:\/\/wa\.me\//.test(link.href || "") ||
          /^(tel:|mailto:)/.test(link.href || ""),
      ),
      "Hero still keeps a contact path",
      { heroLinks: result.heroLinks },
    ),
    assert(
      result.portfolioScreensDown !== null &&
        result.portfolioScreensDown <= (viewport.name === "mobile" ? 1 : 1.25),
      "Portfolio appears early enough for a human scan",
      { portfolioScreensDown: result.portfolioScreensDown },
    ),
    assert(
      result.firstProjectScreensDown !== null &&
        result.firstProjectScreensDown <= (viewport.name === "mobile" ? 1.35 : 1.5),
      "First project card appears quickly after the hero",
      { firstProjectScreensDown: result.firstProjectScreensDown },
    ),
    assert(result.h1Words <= 12, "Hero headline is concise enough to parse", {
      h1: result.h1,
      h1Words: result.h1Words,
    }),
    assert(result.paragraphMaxWords <= 45, "Paragraphs stay readable for dyslexia review", {
      paragraphMaxWords: result.paragraphMaxWords,
      paragraphOver45Words: result.paragraphOver45Words,
    }),
    assert(result.leakingTerms.length === 0, "No internal operating language appears on the page", {
      leakingTerms: result.leakingTerms,
    }),
    assert(
      viewport.name !== "mobile" || result.tinyTapTargets.length === 0,
      "Mobile tap targets are large enough",
      { tinyTapTargets: result.tinyTapTargets },
    ),
    assert(Boolean(result.title && result.metaDescription && result.canonical), "SEO basics are present", {
      title: result.title,
      metaDescription: result.metaDescription,
      canonical: result.canonical,
    }),
    assert(result.jsonLdCount >= 1, "Structured data remains present", {
      jsonLdCount: result.jsonLdCount,
    }),
  ];

  const slug = `${route.locale}-${viewport.name}`;
  const screenshot = `/tmp/esteban-home-uat-${slug}.png`;
  await page.screenshot({ path: screenshot, fullPage: false });

  return { route: route.path, locale: route.locale, viewport, screenshot, result, checks };
}

const browser = await chromium.launch({ headless: true, executablePath });
const outcomes = [];

try {
  for (const route of routes) {
    for (const viewport of viewports) {
      const page = await browser.newPage({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
        isMobile: viewport.name === "mobile",
      });
      outcomes.push(await evaluateRoute(page, route, viewport));
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const failures = outcomes.flatMap((outcome) =>
  outcome.checks
    .filter((check) => !check.ok)
    .map((check) => ({ route: outcome.route, viewport: outcome.viewport.name, ...check })),
);

console.log(JSON.stringify({ baseUrl, outcomes, failures }, null, 2));
process.exitCode = failures.length === 0 ? 0 : 1;
