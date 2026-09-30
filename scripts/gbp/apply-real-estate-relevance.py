#!/Library/Frameworks/Python.framework/Versions/3.13/bin/python3
"""Add the real-estate audience to Esteban's Google Business Profile.

Read the reasoning in scripts/gbp/README.md first. In short: the profile is
well-built (5.0 from 11 reviews, 4 categories, 6 service items) but got 213
impressions and ZERO phone calls in 90 days, and it never mentions real estate
agents or Reels — which is who reviews him, who calls him, and what Perplexity
cites him for.

Everything here is ADDITIVE. The six existing service items are read from the
saved before-state and re-sent unchanged; nothing is removed.

Requires:
  - ~/.config/geebs/google_business_token.json  (Gonzalo's OAuth, business.manage)
  - the X-Goog-User-Project header, which this sends. Without it the Business
    Profile APIs answer 429 with quota_limit_value 0, which reads as an access
    wall and is not one.

Usage:
  scripts/gbp/apply-real-estate-relevance.py --dry-run   # print, send nothing
  scripts/gbp/apply-real-estate-relevance.py             # apply
"""

import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

TOKEN_FILE = Path.home() / ".config/geebs/google_business_token.json"
LOCATION = "locations/9465569364777265733"  # Esteban Moreno Media
BEFORE_STATE = (
    Path.home()
    / "obsidian-wiki/client-esteban-media/raw/gbp-esteban-before-2026-09-30.json"
)
API = "https://mybusinessbusinessinformation.googleapis.com/v1"

# Keeps every fact the current description carries and adds the audience the
# evidence points at plus the format that actually converts. Google's limit is
# 750 characters; this is asserted below rather than trusted.
DESCRIPTION = (
    "Esteban Moreno Media is a Fort Lauderdale media and content services business "
    "serving Broward, Miami-Dade and Palm Beach. Esteban edits client-supplied footage "
    "into Instagram Reels and short vertical video, and also provides AI-assisted "
    "content creation, social media content planning, and selectively scoped "
    "on-location production. Work includes real estate agents and brokerages who need "
    "listing walkthroughs, neighborhood pieces and agent-brand Reels cut from footage "
    "they already have. Spanish-first service is available, with intermediate English "
    "support, so a bilingual South Florida audience can be served from one shoot. "
    "Projects are tailored for entrepreneurs, local businesses, and agencies."
)

NEW_SERVICE_ITEMS = [
    {
        "freeFormServiceItem": {
            "category": "job_type_id:video_editing",
            "label": {
                "displayName": "Real estate Reels and listing video editing",
                "description": (
                    "Editing for real estate agents and brokerages from footage they "
                    "already have: listing walkthroughs, neighborhood pieces and "
                    "agent-brand Reels. Two exports from one edit when the MLS and "
                    "social need different cuts."
                ),
                "languageCode": "en",
            },
        }
    },
    {
        "freeFormServiceItem": {
            "category": "job_type_id:video_editing",
            "label": {
                "displayName": "Reels para agentes de bienes raices",
                "description": (
                    "Edicion de Reels y recorridos de propiedades para agentes "
                    "inmobiliarios en Broward, Miami-Dade y Palm Beach, a partir del "
                    "material que ya tienes. Dos cortes de una sola grabacion para MLS "
                    "y redes, en espanol o ingles."
                ),
                "languageCode": "es",
            },
        }
    },
]


def mint_token(cfg: dict) -> str:
    body = urllib.parse.urlencode(
        {
            "client_id": cfg["client_id"],
            "client_secret": cfg["client_secret"],
            "refresh_token": cfg["refresh_token"],
            "grant_type": "refresh_token",
        }
    ).encode()
    req = urllib.request.Request(
        cfg["token_uri"], body, {"Content-Type": "application/x-www-form-urlencoded"}
    )
    return json.loads(urllib.request.urlopen(req, timeout=60).read())["access_token"]


def main() -> int:
    dry_run = "--dry-run" in sys.argv

    if len(DESCRIPTION) > 750:
        print(f"description is {len(DESCRIPTION)} chars; Google's limit is 750")
        return 2
    print(f"description: {len(DESCRIPTION)} chars (limit 750)")

    if not BEFORE_STATE.exists():
        print(f"missing before-state: {BEFORE_STATE}")
        print("Re-snapshot it before applying, or the existing service items cannot")
        print("be preserved and this PATCH would REPLACE them.")
        return 2

    before = json.loads(BEFORE_STATE.read_text())
    existing = before.get("serviceItems") or []
    print(f"existing service items to preserve: {len(existing)}")
    if not existing:
        print("refusing: the before-state lists no service items, which would mean")
        print("sending only the two new ones and dropping whatever is live.")
        return 2

    payload = {
        "profile": {"description": DESCRIPTION},
        "serviceItems": existing + NEW_SERVICE_ITEMS,
    }
    print(f"service items after: {len(payload['serviceItems'])}")

    if dry_run:
        print("\n--dry-run: nothing sent. Payload preview:")
        print(json.dumps(payload, indent=2, ensure_ascii=False)[:1200])
        return 0

    cfg = json.loads(TOKEN_FILE.read_text())
    token = mint_token(cfg)
    quota_project = cfg.get("quota_project") or "fort-lauderdale-auto-seo"
    mask = urllib.parse.quote("profile.description,serviceItems")
    req = urllib.request.Request(
        f"{API}/{LOCATION}?updateMask={mask}",
        json.dumps(payload).encode(),
        {
            "Authorization": f"Bearer {token}",
            "X-Goog-User-Project": quota_project,
            "Content-Type": "application/json",
        },
        method="PATCH",
    )
    try:
        result = json.loads(urllib.request.urlopen(req, timeout=120).read())
    except urllib.error.HTTPError as error:
        print(f"HTTP {error.code}")
        print(error.read().decode()[:700])
        return 1

    print("\nPATCH OK")
    print(f"  service items now : {len(result.get('serviceItems') or [])}")
    print(f"  description chars : {len((result.get('profile') or {}).get('description', ''))}")
    print("\nGoogle re-reviews an edited description; it usually clears in a day or two.")
    print(f"To undo, PATCH both fields back from {BEFORE_STATE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
