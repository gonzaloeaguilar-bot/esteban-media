import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const workspaceNodeModules =
  process.env.WORKSPACE_NODE_MODULES ||
  "/Users/gonzalo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const { chromium } = require(`${workspaceNodeModules}/playwright`);

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
        buttonLike: link.className.includes("rounded-full"),
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
    assert(result.heroButtons[0]?.href === route.portfolioHref, "Hero first CTA opens portfolio", {
      firstHeroButton: result.heroButtons[0],
    }),
    assert(
      result.heroLinks.some((link) => link.href === route.contactHref),
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
