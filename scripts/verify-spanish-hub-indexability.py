#!/usr/bin/env python3
"""Check the built Spanish hubs and titles at the HTML boundary."""

from __future__ import annotations

import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[str] = []
        self.title = ""
        self.in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "a" and attributes.get("href"):
            self.links.append(urlsplit(attributes["href"] or "").path)
        if tag == "title":
            self.in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title += data


def parse(path: Path) -> PageParser:
    page = PageParser()
    page.feed(path.read_text(encoding="utf-8"))
    return page


def main() -> int:
    build = Path(sys.argv[1] if len(sys.argv) > 1 else ".next/server/app")
    noindex = {
        item["path"]
        for item in json.loads(Path("config/cohort-consolidation.json").read_text())["noindex"]
    }
    hubs = ["servicios", "areas", "guias", "editor-de-video-miami"]
    errors: list[str] = []
    for slug in hubs:
        path = build / "es" / f"{slug}.html"
        if not path.is_file():
            errors.append(f"missing built hub: {path}")
            continue
        links = parse(path).links
        for target in sorted(set(links) & noindex):
            errors.append(f"{path} links to noindex URL {target}")

    spanish_pages = list((build / "es").glob("*.html"))
    if not spanish_pages:
        errors.append(f"no built Spanish pages in {build / 'es'}")
    branded_suffix = " | Esteban Moreno Media"
    for path in spanish_pages:
        title = parse(path).title.strip()
        if title.endswith(branded_suffix) and len(title) > 60:
            errors.append(f"{path} keeps an overlong brand suffix ({len(title)} chars): {title}")

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Spanish HTML check passed: {len(hubs)} hubs have no noindex links; {len(spanish_pages)} top-level titles stay within the brand-suffix rule")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
