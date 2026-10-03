#!/usr/bin/env python3
"""Generate the Esteban Moreno Media brand icons (favicon.ico, icon.svg, apple-icon.png).

The mark matches the site header (components/site-header-client.tsx): a white serif
italic "e" on a #c84a2c rounded square.

Why this script exists rather than a single downscale from one master:
a serif italic "e" has thin strokes and a small counter. Downscaling a 512px master
to 16px anti-aliases the strokes into the background and the letter disappears.
Each ICO size is therefore rendered natively, with the small sizes using the BOLD
italic cut and a larger glyph so the counter survives at 16px.

Requires macOS system fonts (Georgia) + Pillow + fontTools. Re-run only when the
brand mark changes; the generated assets are committed.

    python3 scripts/generate-brand-icons.py
"""
from __future__ import annotations

import subprocess
import shutil
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

BG = (200, 74, 44, 255)  # #c84a2c — same token as the header chip
FG = (255, 255, 255, 255)
RADIUS_FRAC = 0.1875  # matches the header's rounded-md at size-8
GLYPH = "e"

FONT_REGULAR = Path("/System/Library/Fonts/Supplemental/Georgia Italic.ttf")
FONT_BOLD = Path("/System/Library/Fonts/Supplemental/Georgia Bold Italic.ttf")

PUBLIC = Path(__file__).resolve().parent.parent / "public"
BRAND = PUBLIC / "brand"
BRAND_NAMES = {
    "favicon.ico": "esteban-favicon.ico",
    "icon.svg": "esteban-icon.svg",
    "apple-icon.png": "esteban-apple-touch.png",
}

# (px, glyph height as fraction of canvas, use bold cut)
# Small sizes get a bolder, larger glyph so the counter stays open.
ICO_SIZES = [(16, 0.52, True), (32, 0.50, True), (48, 0.48, False)]
APPLE_SIZE = (180, 0.46, False)


def _render(px: int, glyph_frac: float, bold: bool, supersample: int = 8) -> Image.Image:
    """Draw the mark at supersample× and downscale once — smooth curves, full-weight strokes."""
    size = px * supersample
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=round(size * RADIUS_FRAC), fill=BG
    )

    font_path = str(FONT_BOLD if bold else FONT_REGULAR)
    # Binary-search the point size whose inked height matches glyph_frac of the canvas.
    low, high = 1, size * 2
    while low < high:
        mid = (low + high + 1) // 2
        box = draw.textbbox((0, 0), GLYPH, font=ImageFont.truetype(font_path, mid))
        if (box[3] - box[1]) <= size * glyph_frac:
            low = mid
        else:
            high = mid - 1

    font = ImageFont.truetype(font_path, low)
    box = draw.textbbox((0, 0), GLYPH, font=font)
    draw.text(
        ((size - (box[2] - box[0])) / 2 - box[0], (size - (box[3] - box[1])) / 2 - box[1]),
        GLYPH,
        font=font,
        fill=FG,
    )
    return image.resize((px, px), Image.LANCZOS)


def build_ico(path: Path) -> None:
    """Assemble a PNG-compressed ICO by hand.

    Pillow's ICO writer downscales one source image to every requested size, which is
    exactly what this script exists to avoid — so the frames are packed manually and
    each size keeps its own native render.
    """
    frames = [_render(px, frac, bold) for px, frac, bold in ICO_SIZES]
    import io
    import struct

    blobs = []
    for frame in frames:
        buf = io.BytesIO()
        frame.save(buf, format="PNG")
        blobs.append(buf.getvalue())

    header = struct.pack("<HHH", 0, 1, len(blobs))
    offset = len(header) + 16 * len(blobs)
    entries, payload = b"", b""
    for frame, blob in zip(frames, blobs):
        width = 0 if frame.width >= 256 else frame.width
        height = 0 if frame.height >= 256 else frame.height
        entries += struct.pack("<BBBBHHII", width, height, 0, 0, 1, 32, len(blob), offset)
        offset += len(blob)
        payload += blob
    path.write_bytes(header + entries + payload)


def build_svg(path: Path) -> None:
    """Outline the glyph to a path so the icon does not depend on Georgia being installed."""
    font = TTFont(str(FONT_REGULAR))
    upem = font["head"].unitsPerEm
    glyph_set = font.getGlyphSet()
    name = font.getBestCmap()[ord(GLYPH)]
    pen = SVGPathPen(glyph_set)
    glyph_set[name].draw(pen)
    d = pen.getCommands()

    bounds = font["glyf"][name] if "glyf" in font else None
    x_min, y_min, x_max, y_max = bounds.xMin, bounds.yMin, bounds.xMax, bounds.yMax

    box = 512
    target = box * APPLE_SIZE[1]
    scale = target / (y_max - y_min)
    # Font space is y-up; flip it and centre the inked bounds in the square.
    tx = (box - (x_max - x_min) * scale) / 2 - x_min * scale
    ty = (box + (y_max - y_min) * scale) / 2 + y_min * scale

    path.write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" '
        'aria-label="Esteban Moreno Media">\n'
        f'  <rect width="512" height="512" rx="{round(box * RADIUS_FRAC)}" fill="#c84a2c"/>\n'
        f'  <path transform="translate({tx:.2f} {ty:.2f}) scale({scale:.5f} -{scale:.5f})" '
        f'fill="#ffffff" d="{d}"/>\n'
        "</svg>\n"
    )


def main() -> int:
    for font_path in (FONT_REGULAR, FONT_BOLD):
        if not font_path.exists():
            print(f"missing font: {font_path}", file=sys.stderr)
            return 1

    BRAND.mkdir(parents=True, exist_ok=True)
    build_ico(BRAND / BRAND_NAMES["favicon.ico"])
    build_svg(BRAND / BRAND_NAMES["icon.svg"])
    _render(*APPLE_SIZE).save(BRAND / BRAND_NAMES["apple-icon.png"])

    # Keep the legacy URLs for bookmarks and the Organization schema logo.
    for name, branded_name in BRAND_NAMES.items():
        target = BRAND / branded_name
        shutil.copyfile(target, PUBLIC / name)
        digest = subprocess.run(
            ["md5", "-q", str(target)], capture_output=True, text=True, check=True
        ).stdout.strip()
        print(f"{name:16s} {target.stat().st_size:6d} bytes  md5 {digest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
