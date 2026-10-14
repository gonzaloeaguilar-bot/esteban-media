#!/usr/bin/env node
/**
 * "What Miami restaurants post on Instagram (2026)" — the data study behind
 * /guides/miami-restaurant-instagram-study and /es/guias/estudio-instagram-restaurantes-miami.
 *
 * Read-only. Never follows, likes, comments or DMs anything. Nothing here
 * contacts a restaurant.
 *
 * Stages (each reads the previous stage's file, so a re-run costs $0):
 *   maps     Apify compass/crawler-google-places, 5 neighbourhood queries x 15.
 *            Billed per place ($0.003 on this plan). Run by hand once; the raw
 *            dataset is saved as maps-places.json.
 *   handles  $0. Fetches each place's own website and reads the Instagram
 *            link it publishes. A restaurant whose site links no Instagram is
 *            dropped with a reason, never guessed.
 *   ig       Apify apify/instagram-scraper, resultsType "details": one result
 *            per profile ($0.0023) carrying the latest 12 posts.
 *   reels    $0. ffprobe reads the duration from each Reel's public video file
 *            header (range request, no full download).
 *   analyze  Aggregates only. Writes the PUBLIC file data/studies/... with no
 *            restaurant names or handles, and the PRIVATE per-account table and
 *            prospect list under ~/.local/share/esteban-media.
 *
 * Raw and per-account data NEVER enter this repo:
 *   ESTEBAN_STUDY_DIR (default ~/.local/share/esteban-media/ig-study-2026-10)
 */

import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const ROOT = process.cwd();
const DIR = process.env.ESTEBAN_STUDY_DIR
  || path.join(process.env.HOME, ".local", "share", "esteban-media", "ig-study-2026-10");
const PUBLIC_OUT = path.join(ROOT, "data", "studies", "miami-restaurant-instagram-2026.json");

const NEIGHBORHOODS = {
  "restaurants in Brickell, Miami, FL": "Brickell",
  "restaurants in Wynwood, Miami, FL": "Wynwood",
  "restaurants in Little Havana, Miami, FL": "Little Havana",
  "restaurants in Miami Beach, FL": "Miami Beach",
  "restaurants in Doral, FL": "Doral",
};

const NOT_A_HANDLE = new Set([
  "p", "reel", "reels", "explore", "accounts", "stories", "tv", "share", "sharer",
  "about", "legal", "developer", "direct", "web", "instagram", "_u", "embed.js",
  // Website-builder footers link their OWN account; it is never the restaurant.
  "wix", "squarespace", "wordpress", "godaddy", "toasttab", "bentobox", "popmenu", "shopify", "weebly", "opentable", "resy", "sevenrooms", "ubereats", "doordash", "grubhub",
]);

/* ------------------------------------------------------------ helpers ---- */

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(DIR, name), "utf8"));
}
function writeJson(name, data) {
  fs.mkdirSync(DIR, { recursive: true, mode: 0o700 });
  fs.writeFileSync(path.join(DIR, name), JSON.stringify(data, null, 2));
}
function token() {
  for (const f of [`${process.env.HOME}/.config/secrets.env`, `${process.env.HOME}/.config/api-keys/gonzalo-local-tools.env`]) {
    if (!fs.existsSync(f)) continue;
    for (const line of fs.readFileSync(f, "utf8").split("\n")) {
      const m = line.replace(/^export\s+/, "").match(/^(APIFY_API_TOKEN|APIFY_TOKEN)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return (process.env.APIFY_API_TOKEN || process.env.APIFY_TOKEN || "").trim();
}

export function median(values) {
  const v = values.filter((x) => Number.isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return null;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

/** The handle a website links to. Most-linked wins; profile paths only. */
export function handleFromHtml(html) {
  const counts = new Map();
  const re = /instagram\.com\/([A-Za-z0-9._]{2,30})(?=[/?"'#\s<]|$)/gi;
  let m;
  while ((m = re.exec(html))) {
    const h = m[1].toLowerCase().replace(/\.+$/, "");
    if (NOT_A_HANDLE.has(h)) continue;
    counts.set(h, (counts.get(h) || 0) + 1);
  }
  let best = null;
  for (const [h, n] of counts) if (!best || n > best[1]) best = [h, n];
  return best ? best[0] : null;
}

/**
 * Caption language without an LLM: Spanish function words vs English ones.
 * "both" = each language clears the bar in the same caption.
 */
const ES = ["el", "la", "los", "las", "de", "del", "que", "y", "en", "con", "para", "por", "una", "un", "es", "nuestro", "nuestra", "ven", "hoy", "aquí", "más", "tu", "te", "sabor", "comida", "mesa", "reserva", "noche", "todos"];
const EN = ["the", "and", "of", "to", "in", "with", "for", "our", "your", "you", "is", "on", "at", "this", "we", "come", "today", "tonight", "now", "book", "join", "here", "all", "new", "every"];
export function captionLanguage(caption) {
  const words = String(caption || "").toLowerCase().replace(/[#@][\w.]+/g, " ").match(/[a-záéíóúñü]+/g) || [];
  if (words.length < 3) return "none";
  const es = words.filter((w) => ES.includes(w)).length;
  const en = words.filter((w) => EN.includes(w)).length;
  const esHit = es >= 2 || (es >= 1 && words.length < 8);
  const enHit = en >= 2 || (en >= 1 && words.length < 8);
  if (esHit && enHit && Math.min(es, en) / Math.max(es, en) >= 0.25) return "both";
  if (es > en) return esHit ? "es" : "none";
  if (en > es) return enHit ? "en" : "none";
  return "none";
}

export function followerBucket(n) {
  if (!Number.isFinite(n)) return "unknown";
  if (n < 1000) return "<1k";
  if (n < 5000) return "1k-5k";
  if (n < 20000) return "5k-20k";
  if (n < 100000) return "20k-100k";
  return "100k+";
}

export function postFormat(p) {
  if (p.type === "Sidecar") return "carousel";
  if (p.type === "Video") return "reel";
  return "photo";
}

/**
 * Pinned posts lead the grid but are older than what follows them. The
 * profile payload carries no pinned flag, so detect it by order: any of the
 * first three posts older than a later post is pinned. Skipped, because a
 * pinned post from March would stretch the posting window and halve the
 * measured frequency.
 */
export function pinnedCount(posts) {
  let n = 0;
  for (let i = 0; i < Math.min(3, posts.length); i += 1) {
    const t = Date.parse(posts[i].timestamp);
    const laterNewer = posts.slice(i + 1).some((p) => Date.parse(p.timestamp) > t);
    if (laterNewer) n = i + 1;
  }
  return n;
}

/** Per-account metrics from the latest posts (pinned posts included as IG shows them). */
export function accountMetrics(profile, { now = Date.now(), durations = {} } = {}) {
  const raw = (profile.latestPosts || []).slice(0, 12).filter((p) => p.timestamp);
  const pinned = pinnedCount(raw);
  const posts = raw.slice(pinned)
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
  const n = posts.length;
  const fmt = { reel: 0, photo: 0, carousel: 0 };
  for (const p of posts) fmt[postFormat(p)] += 1;
  const newest = n ? Date.parse(posts[0].timestamp) : null;
  const oldest = n ? Date.parse(posts[n - 1].timestamp) : null;
  const spanDays = n > 1 ? Math.max(1, (newest - oldest) / 86400000) : null;
  const perWeek = spanDays ? ((n - 1) / spanDays) * 7 : null;
  const langs = { es: 0, en: 0, both: 0, none: 0 };
  for (const p of posts) langs[captionLanguage(p.caption)] += 1;
  const reelDur = posts.filter((p) => postFormat(p) === "reel").map((p) => durations[p.shortCode]).filter(Number.isFinite);
  const views = posts.filter((p) => postFormat(p) === "reel").map((p) => Number(p.videoViewCount)).filter(Number.isFinite);
  const captioned = posts.filter((p) => String(p.caption || "").trim().length > 0).length;
  const words = posts.map((p) => (String(p.caption || "").match(/\S+/g) || []).length);
  return {
    posts: n,
    pinnedSkipped: pinned,
    reelsPerWeek: perWeek == null ? null : perWeek * (n ? fmt.reel / n : 0),
    daysSinceLastPost: newest ? (now - newest) / 86400000 : null,
    formats: fmt,
    reelShare: n ? fmt.reel / n : null,
    perWeek,
    langs,
    dominantLanguage: dominantLanguage(langs),
    reelDurations: reelDur,
    medianReelSeconds: median(reelDur),
    medianReelViews: median(views),
    captionedShare: n ? captioned / n : null,
    medianCaptionWords: median(words),
    hashtagShare: n ? posts.filter((p) => (p.hashtags || []).length > 0).length / n : null,
    followers: profile.followersCount ?? null,
    bucket: followerBucket(profile.followersCount),
  };
}

export function dominantLanguage(langs) {
  const counted = langs.es + langs.en + langs.both;
  if (!counted) return "none";
  if (langs.both / counted >= 0.25 || (langs.es / counted >= 0.25 && langs.en / counted >= 0.25)) return "both";
  return langs.es > langs.en ? "es" : "en";
}

/* ------------------------------------------------------------- stages ---- */

async function stageHandles() {
  const places = readJson("maps-places.json");
  const out = [];
  for (const p of places) {
    const row = {
      placeId: p.placeId, name: p.title, category: p.categoryName, address: p.address,
      neighborhood: NEIGHBORHOODS[p.searchString] || p.searchString, website: p.website || "",
      rating: p.totalScore ?? null, reviews: p.reviewsCount ?? null, phone: p.phone || "",
      handle: null, dropReason: null,
    };
    if (p.permanentlyClosed || p.temporarilyClosed) row.dropReason = "closed";
    else if (!p.website) row.dropReason = "no_website";
    else {
      try {
        const res = await fetch(p.website, {
          redirect: "follow",
          signal: AbortSignal.timeout(15000),
          headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36" },
        });
        const html = await res.text();
        row.handle = handleFromHtml(html);
        if (!row.handle) row.dropReason = res.ok ? "site_links_no_instagram" : `site_http_${res.status}`;
      } catch (e) {
        row.dropReason = `site_unreachable:${e.name}`;
      }
    }
    out.push(row);
    console.log(`${row.handle ? "ok " : "-- "} ${row.neighborhood.padEnd(14)} ${row.name} ${row.handle || row.dropReason}`);
  }
  writeJson("handles.json", out);
  const unique = new Set(out.filter((r) => r.handle).map((r) => r.handle));
  console.log(`\n${out.length} places, ${unique.size} unique Instagram handles`);
}

async function stageIg() {
  const rows = readJson("handles.json");
  const handles = [...new Set(rows.filter((r) => r.handle).map((r) => r.handle))];
  const cap = Number(process.env.IG_MAX || 60);
  const list = handles.slice(0, cap);
  console.log(`Requesting ${list.length} profiles (~$${(list.length * 0.0023).toFixed(3)} at $0.0023/profile)`);
  const t = token();
  if (!t) throw new Error("no APIFY token");
  const res = await fetch(`https://api.apify.com/v2/acts/apify~instagram-scraper/runs?token=${t}&maxTotalChargeUsd=${(list.length * 0.0027 + 0.01).toFixed(2)}&waitForFinish=600`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ directUrls: list.map((h) => `https://www.instagram.com/${h}/`), resultsType: "details", resultsLimit: 1 }),
  });
  const run = (await res.json()).data;
  writeJson("ig-run.json", run);
  const items = await (await fetch(`https://api.apify.com/v2/datasets/${run.defaultDatasetId}/items?token=${t}`)).json();
  writeJson("ig-profiles.json", items);
  console.log(`status=${run.status} items=${items.length} usageTotalUsd=${run.usageTotalUsd} charged=${JSON.stringify(run.chargedEventCounts)}`);
}

function stageReels() {
  const profiles = readJson("ig-profiles.json");
  const durations = fs.existsSync(path.join(DIR, "reel-durations.json")) ? readJson("reel-durations.json") : {};
  for (const pr of profiles) {
    for (const p of (pr.latestPosts || []).slice(0, 12)) {
      if (p.type !== "Video" || !p.videoUrl || durations[p.shortCode] !== undefined) continue;
      try {
        const s = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p.videoUrl], { timeout: 30000 }).toString().trim();
        durations[p.shortCode] = Number(s) || null;
      } catch {
        durations[p.shortCode] = null;
      }
    }
  }
  writeJson("reel-durations.json", durations);
  const got = Object.values(durations).filter(Number.isFinite).length;
  console.log(`reel durations: ${got}/${Object.keys(durations).length}`);
}

function pct(n, d) {
  return d ? Math.round((n / d) * 1000) / 10 : null;
}
function round1(x) {
  return x == null ? null : Math.round(x * 10) / 10;
}

function stageAnalyze() {
  const rows = readJson("handles.json");
  const profiles = readJson("ig-profiles.json");
  const durations = fs.existsSync(path.join(DIR, "reel-durations.json")) ? readJson("reel-durations.json") : {};
  const run = readJson("ig-run.json");
  const now = Date.parse(run.finishedAt || run.startedAt || new Date().toISOString());
  const byHandle = new Map(profiles.filter((p) => p.username).map((p) => [p.username.toLowerCase(), p]));

  const accounts = [];
  const excluded = [];
  const seen = new Set();
  for (const r of rows) {
    if (!r.handle || seen.has(r.handle)) continue;
    seen.add(r.handle);
    const prof = byHandle.get(r.handle);
    if (!prof) { excluded.push({ handle: r.handle, reason: "profile_not_returned" }); continue; }
    if (prof.private) { excluded.push({ handle: r.handle, reason: "private" }); continue; }
    const m = accountMetrics(prof, { now, durations });
    if (m.posts < 6) { excluded.push({ handle: r.handle, reason: `only_${m.posts}_posts` }); continue; }
    if (m.daysSinceLastPost > 30) { excluded.push({ handle: r.handle, reason: "no_post_in_30_days" }); continue; }
    accounts.push({ ...r, followers: prof.followersCount, fullName: prof.fullName, ...m });
  }

  const N = accounts.length;
  const allPosts = accounts.reduce((s, a) => s + a.posts, 0);
  const fmtTotals = accounts.reduce((s, a) => ({ reel: s.reel + a.formats.reel, photo: s.photo + a.formats.photo, carousel: s.carousel + a.formats.carousel }), { reel: 0, photo: 0, carousel: 0 });
  const reelShares = accounts.map((a) => a.reelShare);
  const lowReel = accounts.filter((a) => a.reelShare < 0.25);
  const reelMajority = accounts.filter((a) => a.reelShare >= 0.5);
  const langCounts = accounts.reduce((s, a) => ({ ...s, [a.dominantLanguage]: (s[a.dominantLanguage] || 0) + 1 }), {});
  const postLang = accounts.reduce((s, a) => ({ es: s.es + a.langs.es, en: s.en + a.langs.en, both: s.both + a.langs.both, none: s.none + a.langs.none }), { es: 0, en: 0, both: 0, none: 0 });
  const allDur = accounts.flatMap((a) => a.reelDurations);
  const buckets = ["<1k", "1k-5k", "5k-20k", "20k-100k", "100k+"];
  const byBucket = buckets.map((b) => {
    const g = accounts.filter((a) => a.bucket === b);
    return { bucket: b, accounts: g.length, medianReelSharePct: g.length ? round1(median(g.map((a) => a.reelShare)) * 100) : null, medianPostsPerWeek: g.length ? round1(median(g.map((a) => a.perWeek))) : null };
  });
  const hoods = [...new Set(Object.values(NEIGHBORHOODS))].map((h) => {
    const g = accounts.filter((a) => a.neighborhood === h);
    return {
      neighborhood: h,
      accounts: g.length,
      medianReelSharePct: g.length ? round1(median(g.map((a) => a.reelShare)) * 100) : null,
      spanishOrBilingualAccounts: g.filter((a) => a.dominantLanguage !== "en" && a.dominantLanguage !== "none").length,
    };
  });
  const funnel = {
    placesFromMaps: rows.length,
    withWebsite: rows.filter((r) => r.website).length,
    websiteLinksInstagram: rows.filter((r) => r.handle).length,
    uniqueHandles: seen.size,
    profilesReturned: [...seen].filter((h) => byHandle.has(h)).length,
    excluded: excluded.reduce((s, e) => ({ ...s, [e.reason.startsWith("only_") ? "fewer_than_6_posts" : e.reason]: (s[e.reason.startsWith("only_") ? "fewer_than_6_posts" : e.reason] || 0) + 1 }), {}),
    sample: N,
  };

  const study = {
    title: "What Miami restaurants post on Instagram (2026)",
    collectedOn: (run.finishedAt || "").slice(0, 10),
    method: {
      source: "Google Maps search results for 'restaurants in <neighbourhood>' (Brickell, Wynwood, Little Havana, Miami Beach, Doral), 15 per search; Instagram handle taken from the link on each restaurant's own website; public profile and latest 12 posts read once.",
      inclusion: "Public account, at least 6 posts returned, newest post within 30 days of collection.",
      reelLength: "Read from each Reel's public video file header; available where the file could be read.",
      captionLanguage: "Function-word count per caption (Spanish vs English word lists), no AI model. 'Both' = both languages in one caption or each in at least a quarter of the account's captions.",
      notMeasured: "On-screen text and burned-in subtitles are not detectable from post metadata, so this study does not report them.",
    },
    funnel,
    sample: N,
    postsAnalyzed: allPosts,
    formats: {
      reelPct: pct(fmtTotals.reel, allPosts), photoPct: pct(fmtTotals.photo, allPosts), carouselPct: pct(fmtTotals.carousel, allPosts),
      medianAccountReelSharePct: round1(median(reelShares) * 100),
      accountsReelMajority: reelMajority.length, accountsReelMajorityPct: pct(reelMajority.length, N),
      accountsUnderQuarterReels: lowReel.length, accountsUnderQuarterReelsPct: pct(lowReel.length, N),
      accountsZeroReels: accounts.filter((a) => a.formats.reel === 0).length,
    },
    frequency: {
      medianPostsPerWeek: round1(median(accounts.map((a) => a.perWeek))),
      accountsUnderOnePerWeek: accounts.filter((a) => a.perWeek < 1).length,
      accountsThreePlusPerWeek: accounts.filter((a) => a.perWeek >= 3).length,
      medianReelsPerWeek: round1(median(accounts.map((a) => a.reelsPerWeek))),
      accountsUnderOneReelPerWeek: accounts.filter((a) => a.reelsPerWeek < 1).length,
      accountsUnderOneReelPerWeekPct: pct(accounts.filter((a) => a.reelsPerWeek < 1).length, N),
      accountsUnderOnePerWeekPct: pct(accounts.filter((a) => a.perWeek < 1).length, N),
      pinnedPostsSkipped: accounts.reduce((s, a) => s + a.pinnedSkipped, 0),
      medianDaysSinceLastPost: round1(median(accounts.map((a) => a.daysSinceLastPost))),
    },
    reels: {
      reelsMeasured: allDur.length,
      totalReels: fmtTotals.reel,
      medianSeconds: round1(median(allDur)),
      under15sPct: pct(allDur.filter((d) => d < 15).length, allDur.length),
      from15to30sPct: pct(allDur.filter((d) => d >= 15 && d < 30).length, allDur.length),
      from30to60sPct: pct(allDur.filter((d) => d >= 30 && d < 60).length, allDur.length),
      over60sPct: pct(allDur.filter((d) => d >= 60).length, allDur.length),
    },
    language: {
      accounts: langCounts,
      accountsPct: Object.fromEntries(Object.entries(langCounts).map(([k, v]) => [k, pct(v, N)])),
      posts: postLang,
    },
    captions: {
      captionedPct: pct(accounts.reduce((s, a) => s + Math.round(a.captionedShare * a.posts), 0), allPosts),
      medianCaptionWords: round1(median(accounts.map((a) => a.medianCaptionWords))),
      hashtagPostPct: pct(accounts.reduce((s, a) => s + Math.round(a.hashtagShare * a.posts), 0), allPosts),
    },
    followers: {
      median: median(accounts.map((a) => a.followers)),
      byBucket,
    },
    neighborhoods: hoods,
  };

  fs.mkdirSync(path.dirname(PUBLIC_OUT), { recursive: true });
  fs.writeFileSync(PUBLIC_OUT, JSON.stringify(study, null, 2) + "\n");
  writeJson("accounts.json", accounts.map(({ reelDurations, ...a }) => a));
  writeJson("excluded.json", excluded);

  // Prospects: weak on Reels. Never contacted from here.
  const prospects = accounts
    .filter((a) => a.reelShare < 0.25 || a.reelsPerWeek < 0.5)
    .sort((a, b) => a.reelShare - b.reelShare || (b.followers || 0) - (a.followers || 0))
    .map((a) => ({
      name: a.name, neighborhood: a.neighborhood, category: a.category, instagram: `https://www.instagram.com/${a.handle}/`,
      website: a.website, phone: a.phone, followers: a.followers, reelsInLast12: a.formats.reel, postsPerWeek: round1(a.perWeek),
      dominantLanguage: a.dominantLanguage, rating: a.rating, reviews: a.reviews,
      reelsPerWeek: round1(a.reelsPerWeek),
      why: `${a.formats.reel} of last ${a.posts} posts are Reels; ${round1(a.perWeek)} posts/week; ${round1(a.reelsPerWeek)} Reels/week`,
      status: "not_contacted",
    }));
  writeJson("prospects-weak-reels.json", { generatedAt: new Date().toISOString(), rule: "Reels under 25% of the latest posts, or fewer than one Reel every two weeks", note: "Discovery only. Do not contact from this file; outreach goes through Esteban's lane and its preflight.", prospects });
  console.log(JSON.stringify(study, null, 2));
  console.log(`\nprospects (weak on Reels): ${prospects.length}`);
}

const stage = process.argv[2];
const stages = { handles: stageHandles, ig: stageIg, reels: stageReels, analyze: stageAnalyze };
if (process.argv[1]?.endsWith("ig-restaurant-study.mjs")) {
  if (!stages[stage]) {
    console.error("usage: node scripts/ig-restaurant-study.mjs <handles|ig|reels|analyze>");
    process.exitCode = 2;
  } else {
    Promise.resolve(stages[stage]()).catch((e) => { console.error(e); process.exitCode = 1; });
  }
}
