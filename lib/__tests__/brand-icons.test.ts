import { readFileSync } from "node:fs";
import { join } from "node:path";
import { inflateSync } from "node:zlib";

import { describe, expect, it } from "vitest";

const APP = join(process.cwd(), "app");

/**
 * Reads the size table out of an ICO header without an image library.
 * Byte layout: 6-byte header (reserved, type, count) then 16 bytes per entry,
 * where a stored dimension of 0 means 256.
 */
function icoSizes(buffer: Buffer): number[] {
  expect(buffer.readUInt16LE(0)).toBe(0); // reserved
  expect(buffer.readUInt16LE(2)).toBe(1); // type 1 = icon
  const count = buffer.readUInt16LE(4);
  return Array.from({ length: count }, (_, index) => {
    const width = buffer.readUInt8(6 + index * 16);
    return width === 0 ? 256 : width;
  }).sort((a, b) => a - b);
}

/** Offset and byte length of a named ICO frame, which Pillow stores as a whole PNG. */
function icoFrame(buffer: Buffer, size: number): Buffer {
  const count = buffer.readUInt16LE(4);
  for (let index = 0; index < count; index += 1) {
    const entry = 6 + index * 16;
    const width = buffer.readUInt8(entry) || 256;
    if (width === size) {
      const length = buffer.readUInt32LE(entry + 8);
      const offset = buffer.readUInt32LE(entry + 12);
      return buffer.subarray(offset, offset + length);
    }
  }
  throw new Error(`no ${size}px frame in ICO`);
}

/**
 * Minimal 8-bit RGBA PNG decoder — enough for our own generated frames, so the
 * assertion below can look at actual pixels without adding an image dependency.
 */
function decodeRgba(png: Buffer): { width: number; height: number; pixels: Buffer } {
  expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
  let width = 0;
  let height = 0;
  const idat: Buffer[] = [];
  for (let at = 8; at < png.length; ) {
    const length = png.readUInt32BE(at);
    const type = png.subarray(at + 4, at + 8).toString("ascii");
    const body = png.subarray(at + 8, at + 8 + length);
    if (type === "IHDR") {
      width = body.readUInt32BE(0);
      height = body.readUInt32BE(4);
      expect(body.readUInt8(8)).toBe(8); // bit depth
      expect(body.readUInt8(9)).toBe(6); // colour type 6 = RGBA
      expect(body.readUInt8(12)).toBe(0); // non-interlaced
    } else if (type === "IDAT") {
      idat.push(body);
    }
    at += 12 + length;
  }

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * 4;
  const pixels = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y += 1) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x += 1) {
      const left = x >= 4 ? pixels[y * stride + x - 4] : 0;
      const up = y > 0 ? pixels[(y - 1) * stride + x] : 0;
      const upLeft = x >= 4 && y > 0 ? pixels[(y - 1) * stride + x - 4] : 0;
      let value = line[x];
      if (filter === 1) value += left;
      else if (filter === 2) value += up;
      else if (filter === 3) value += (left + up) >> 1;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const dl = Math.abs(p - left);
        const du = Math.abs(p - up);
        const dul = Math.abs(p - upLeft);
        value += dl <= du && dl <= dul ? left : du <= dul ? up : upLeft;
      }
      pixels[y * stride + x] = value & 0xff;
    }
  }
  return { width, height, pixels };
}

/** Share of opaque pixels bright enough to read as the white glyph rather than the orange field. */
function glyphInkShare(png: Buffer): number {
  const { width, height, pixels } = decodeRgba(png);
  let bright = 0;
  for (let at = 0; at < pixels.length; at += 4) {
    const luminance = 0.299 * pixels[at] + 0.587 * pixels[at + 1] + 0.114 * pixels[at + 2];
    if (pixels[at + 3] > 200 && luminance > 200) bright += 1;
  }
  return bright / (width * height);
}

describe("brand icons", () => {
  it("ships a favicon with 16, 32 and 48px frames", () => {
    // A single-frame ICO lets the browser downscale, which erases the thin serif
    // strokes of the italic "e" at 16px. Each size is rendered natively instead —
    // see scripts/generate-brand-icons.py.
    const ico = readFileSync(join(APP, "favicon.ico"));
    expect(icoSizes(ico)).toEqual([16, 32, 48]);
  });

  it("keeps the 16px 'e' legible instead of letting it wash out", () => {
    // The real defect this replaces: a 512px master downscaled to 16px anti-aliased
    // the italic serif strokes into the orange field, leaving 2.3% white ink — a blur,
    // not a letter. A natively rendered bold 16px cut leaves ~11%.
    const ico = readFileSync(join(APP, "favicon.ico"));
    expect(glyphInkShare(icoFrame(ico, 16))).toBeGreaterThan(0.06);
  });

  it("keeps the favicon small enough to be a favicon", () => {
    // Guards against a full-resolution PNG being dropped in as favicon.ico.
    expect(readFileSync(join(APP, "favicon.ico")).byteLength).toBeLessThan(20_000);
  });

  it("draws icon.svg as an outlined path, never live text", () => {
    // <text font-family="Georgia"> renders a different serif anywhere Georgia is not
    // installed (Android, most Linux), so the mark must be an outline.
    const svg = readFileSync(join(APP, "icon.svg"), "utf8");
    expect(svg).not.toMatch(/<text/);
    expect(svg).toMatch(/<path[^>]+ d="M/);
  });

  it("uses the header's brand colour in icon.svg", () => {
    // Same token as the chip in components/site-header-client.tsx.
    expect(readFileSync(join(APP, "icon.svg"), "utf8")).toContain("#c84a2c");
  });

  it("ships a 180px apple touch icon", () => {
    const png = readFileSync(join(APP, "apple-icon.png"));
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a"); // PNG magic
    expect(png.readUInt32BE(16)).toBe(180); // IHDR width
    expect(png.readUInt32BE(20)).toBe(180); // IHDR height
  });
});
