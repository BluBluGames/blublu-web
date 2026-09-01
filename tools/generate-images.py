#!/usr/bin/env python3
"""Regenerate the derived images the site actually serves.

The originals in assets/portfolio are near-lossless 2400x1350 masters (1-3.5 MB each)
and are only ever fetched by the lightbox on a dense display. Everything the page
loads up front is derived here:

  assets/portfolio/thumbs/<name>-640.webp   grid tiles, 1x
  assets/portfolio/thumbs/<name>-1280.webp  grid tiles, 2x + lightbox on a 1x screen
  assets/hero/hero-img-{1280,1920,2560}.webp

Requires Pillow (`pip install Pillow`). Safe to re-run; it overwrites its own output.

    python tools/generate-images.py
"""

import os
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip install Pillow")

QUALITY = 82           # flat; PSNR-targeting just chased sensor noise on the grainier renders
METHOD = 6             # slowest/best WebP encoder effort
THUMB_WIDTHS = (640, 1280)
HERO_WIDTHS = (1280, 1920, 2560)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORTFOLIO = os.path.join(ROOT, "assets", "portfolio")
THUMBS = os.path.join(PORTFOLIO, "thumbs")
HERO_MASTER = os.path.join(ROOT, "assets", "hero", "hero-img.webp")
HERO_DIR = os.path.join(ROOT, "assets", "hero")


def resize_to(src, out, width):
    with Image.open(src) as im:
        im = im.convert("RGB")
        height = round(im.size[1] * width / im.size[0])
        im.resize((width, height), Image.LANCZOS).save(
            out, "WEBP", quality=QUALITY, method=METHOD
        )
    return width, height, os.path.getsize(out)


def main():
    os.makedirs(THUMBS, exist_ok=True)
    written = 0
    total = 0

    for name in sorted(os.listdir(PORTFOLIO)):
        if not name.endswith(".webp"):
            continue
        for width in THUMB_WIDTHS:
            out = os.path.join(THUMBS, f"{name[:-5]}-{width}.webp")
            w, h, size = resize_to(os.path.join(PORTFOLIO, name), out, width)
            written += 1
            total += size
            print(f"  {w}x{h:<5} {size/1024:7.1f} KB  {os.path.relpath(out, ROOT)}")

    if os.path.exists(HERO_MASTER):
        for width in HERO_WIDTHS:
            out = os.path.join(HERO_DIR, f"hero-img-{width}.webp")
            w, h, size = resize_to(HERO_MASTER, out, width)
            written += 1
            total += size
            print(f"  {w}x{h:<5} {size/1024:7.1f} KB  {os.path.relpath(out, ROOT)}")
    else:
        print(
            f"  note: {os.path.relpath(HERO_MASTER, ROOT)} is absent, so the hero "
            "variants were left as they are.\n"
            "        It is kept out of the deploy; recover it from git history to re-encode."
        )

    print(f"\n{written} files, {total/1e6:.2f} MB")


if __name__ == "__main__":
    main()
