#!/usr/bin/env python3
"""Collect no-cost, source-separated external GEO evidence for Esteban Media.

This is intentionally a receipt builder, not a visibility score.  Each source
is independently marked observed, unavailable, or unmeasured.  It never turns
an unavailable account, API, or public index into a zero.
"""

from __future__ import annotations

import datetime as dt
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


HOME = Path.home()
STATE = HOME / ".local/state/esteban-media-geo-free"
SITE = "https://estebanmorenomedia.com/"
HOST = "estebanmorenomedia.com"
USER_AGENT = "EstebanMediaGEOReceipt/1.0 (+https://estebanmorenomedia.com/)"


def now() -> str:
    return dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")


def get_json(url: str, timeout: int = 30, headers: dict[str, str] | None = None) -> object:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, **(headers or {})})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read())


def page_speed() -> dict:
    query = urllib.parse.urlencode({
        "url": SITE,
        "strategy": "mobile",
        "category": ["PERFORMANCE", "SEO"],
    }, doseq=True)
    try:
        payload = get_json(f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?{query}", 60)
        lighthouse = payload.get("lighthouseResult", {}) if isinstance(payload, dict) else {}
        categories = lighthouse.get("categories", {}) if isinstance(lighthouse, dict) else {}
        loading = payload.get("loadingExperience", {}) if isinstance(payload, dict) else {}
        return {
            "status": "observed",
            "source": "pagespeed_insights_api",
            "url": SITE,
            "performance_score": categories.get("performance", {}).get("score"),
            "seo_score": categories.get("seo", {}).get("score"),
            "crux_overall_category": loading.get("overall_category"),
            "crux_origin_metrics": sorted((loading.get("metrics") or {}).keys()),
        }
    except Exception as exc:  # External source failure must remain explicit.
        return {"status": "unmeasured", "source": "pagespeed_insights_api", "reason": f"{type(exc).__name__}: {str(exc)[:180]}"}


def common_crawl() -> dict:
    try:
        collections = get_json("https://index.commoncrawl.org/collinfo.json")
        if not isinstance(collections, list) or not collections or not collections[0].get("id"):
            raise ValueError("no Common Crawl collection available")
        collection = collections[0]
        query = urllib.parse.urlencode({"url": f"{HOST}/*", "output": "json", "filter": "status:200", "collapse": "urlkey"})
        request = urllib.request.Request(f"{collection['cdx-api']}?{query}", headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(request, timeout=60) as response:
            lines = [line for line in response.read().decode("utf-8", "replace").splitlines() if line.strip()]
        rows = []
        for line in lines[:1000]:
            try:
                row = json.loads(line)
            except json.JSONDecodeError:
                continue
            if isinstance(row, dict):
                rows.append(row)
        timestamps = sorted(str(row.get("timestamp", "")) for row in rows if row.get("timestamp"))
        return {"status": "observed", "source": "common_crawl_index", "collection": collection["id"], "captured_url_count": len(rows), "latest_capture": timestamps[-1] if timestamps else None, "meaning": "Public crawl coverage only; this is not an AI citation count."}
    except Exception as exc:
        return {"status": "unmeasured", "source": "common_crawl_index", "reason": f"{type(exc).__name__}: {str(exc)[:180]}"}


def gdelt() -> dict:
    phrase = '"Esteban Moreno Media" OR "estebanmorenomedia.com"'
    query = urllib.parse.urlencode({"query": phrase, "mode": "ArtList", "format": "json", "maxrecords": 25, "timespan": "1d"})
    try:
        payload = get_json(f"https://api.gdeltproject.org/api/v2/doc/doc?{query}")
        articles = payload.get("articles", []) if isinstance(payload, dict) else []
        if not isinstance(articles, list):
            articles = []
        return {"status": "observed", "source": "gdelt_doc_api", "query": phrase, "window": "1d", "mention_count": len(articles), "articles": [{"title": row.get("title"), "url": row.get("url"), "seen_date": row.get("seendate")} for row in articles[:10] if isinstance(row, dict)], "meaning": "News/web mention discovery only; an empty result is not a citation or traffic claim."}
    except Exception as exc:
        return {"status": "unmeasured", "source": "gdelt_doc_api", "reason": f"{type(exc).__name__}: {str(exc)[:180]}"}


def bing() -> dict:
    env_path = HOME / ".config/bing-webmaster/env"
    key = ""
    if env_path.exists():
        for line in env_path.read_text(encoding="utf-8").splitlines():
            if line.startswith("BING_WEBMASTER_API_KEY="):
                key = line.split("=", 1)[1].strip()
                break
    if not key:
        return {"status": "unmeasured", "source": "bing_webmaster", "reason": "BING_WEBMASTER_API_KEY_missing"}
    try:
        params = urllib.parse.urlencode({"siteUrl": SITE, "apikey": key})
        base = "https://ssl.bing.com/webmaster/api.svc/json/"
        query_rows = get_json(f"{base}GetQueryStats?{params}").get("d") or []
        page_rows = get_json(f"{base}GetPageStats?{params}").get("d") or []
        return {"status": "observed", "source": "bing_webmaster", "query_rows": len(query_rows), "page_rows": len(page_rows), "impressions": sum(int(row.get("Impressions") or 0) for row in query_rows), "clicks": sum(int(row.get("Clicks") or 0) for row in query_rows)}
    except Exception as exc:
        return {"status": "unmeasured", "source": "bing_webmaster", "reason": f"{type(exc).__name__}: {str(exc)[:180]}"}


def gbp() -> dict:
    sys.path.insert(0, str(HOME / "code/portfolio-ops/scripts"))
    try:
        import gbp_query  # type: ignore
        token = gbp_query.mint_token(gbp_query.DEFAULT_CREDENTIALS)
        locations = gbp_query.all_locations(token)
        matches = [location for location in locations if "esteban" in (location.get("title") or "").lower()]
        if not matches:
            return {"status": "unmeasured", "source": "google_business_profile_performance", "reason": "authenticated_identity_has_no_matching_managed_location", "managed_location_count": len(locations)}
        if len(matches) != 1:
            return {"status": "unmeasured", "source": "google_business_profile_performance", "reason": "ambiguous_matching_locations", "matching_location_count": len(matches)}
        end = dt.date.today() - dt.timedelta(days=1)
        start = end - dt.timedelta(days=29)
        performance = gbp_query.fetch_performance(token, matches[0]["name"], start, end)
        return {"status": "observed", "source": "google_business_profile_performance", "start_date": start.isoformat(), "end_date": end.isoformat(), "location": matches[0]["name"], "totals": performance.get("totals", {})}
    except Exception as exc:
        return {"status": "unmeasured", "source": "google_business_profile_performance", "reason": f"{type(exc).__name__}: {str(exc)[:180]}"}


def metricool() -> dict:
    sys.path.insert(0, str(HOME / "code/portfolio-ops"))
    try:
        from loaders import metricool_loader as loader  # type: ignore
        token, user_id = loader.load_credentials()
        today = dt.date.today()
        window = loader.RunWindow(today - dt.timedelta(days=29), today - dt.timedelta(days=1))
        import httpx
        with httpx.Client(headers={"X-Mc-Auth": token}, timeout=30) as client:
            result = loader.collect_metricool(client, user_id, window, brands=[("esteban", 6619766)])
        summary = result.summary["esteban"]
        rows = result.rows_by_brand["esteban"]
        def total(field: str) -> int:
            return sum(int(row.get(field) or 0) for row in rows)
        status = "observed" if summary["status"] == "ok" else "unmeasured"
        return {"status": status, "source": "metricool_analytics", "window": {"from": str(window.from_date), "to": str(window.to_date)}, "blog_id": 6619766, "networks": summary.get("networks", {}), "post_records": len(rows), "metrics": {field: total(field) for field in ("impressions", "interactions", "saves", "shares", "reach")}, "reason": summary.get("note")}
    except Exception as exc:
        return {"status": "unmeasured", "source": "metricool_analytics", "reason": f"{type(exc).__name__}: {str(exc)[:180]}"}


def main() -> int:
    STATE.mkdir(parents=True, exist_ok=True)
    collected_at = now()
    sources = {"pagespeed_crux": page_speed(), "common_crawl": common_crawl(), "gdelt_mentions": gdelt(), "bing": bing(), "gbp": gbp(), "metricool_performance": metricool()}
    receipt = {"schema": "esteban-media.free-geo-sources.v1", "generated_at": collected_at, "mode": "read_only", "no_blended_score": True, "sources": sources, "interpretation": "Each result is independent. Public crawl coverage, mentions, platform metrics, rankings, and citations are different measurements; none alone proves leads or revenue."}
    for path in (STATE / "latest.json", STATE / f"{collected_at[:10]}.json"):
        path.write_text(json.dumps(receipt, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps({"schema": receipt["schema"], "statuses": {name: row["status"] for name, row in sources.items()}}, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
