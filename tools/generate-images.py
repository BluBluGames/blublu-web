#!/usr/bin/env python3
"""Regenerate every image the site actually serves.

The files in assets/portfolio are near-lossless 2400x1350 masters (0.7-3.4 MB each).
They are kept in the repo as sources but are NOT deployed - firebase.json ignores
them. Everything served is derived here, in AVIF with a WebP fallback:

  assets/portfolio/thumbs/<name>-{640,1280,2000}.{avif,webp}
  assets/hero/hero-img-{1280,1920,2560}.{avif,webp}
  assets/og-card.jpg                 1200x630 social card (JPEG: AVIF/WebP
                                     support across social crawlers is unreliable)

Widths are driven by how the page paints, not by the source size. `object-fit: cover`
against a fixed tile height means a grid tile paints 462px wide (960px for the
featured one), and the lightbox is capped at min(96vw, 1000px) - so 2000px is all a
2x display can resolve, and the masters are never needed at runtime.

Requires Pillow for resizing/WebP and ffmpeg with libaom-av1 for AVIF.
Safe to re-run; it overwrites its own output.

    python tools/generate-images.py
    python tools/generate-images.py --webp-only     # skip the slow AVIF pass
"""

import os
import shutil
import subprocess
import sys
import tempfile

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: pip install Pillow")

# AVIF crf per tier. Measured against the WebP baseline on the grainiest sample:
# crf 32 matches WebP q82 (38.2 vs 38.5 dB) for 23% fewer bytes, and each further
# +4 costs ~1.3 dB. The grid tier runs at 40 because a tile is only painted 462px
# wide and cropped; at 36 the noisiest render encoded *larger* than its WebP
# sibling, which would have made the AVIF <source> a pessimisation.
TIERS = {
    640: {"crf": 40, "webp_q": 80},
    1280: {"crf": 34, "webp_q": 82},
    2000: {"crf": 34, "webp_q": 82},
}
HERO_TIERS = {
    1280: {"crf": 34, "webp_q": 80},
    1920: {"crf": 34, "webp_q": 80},
    2560: {"crf": 36, "webp_q": 78},
}
CPU_USED = 5  # libaom speed/size trade-off

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORTFOLIO = os.path.join(ROOT, "assets", "portfolio")
THUMBS = os.path.join(PORTFOLIO, "thumbs")
HERO_DIR = os.path.join(ROOT, "assets", "hero")
HERO_MASTER = os.path.join(HERO_DIR, "hero-img.webp")

HAVE_FFMPEG = shutil.which("ffmpeg") is not None


def scaled(src, width):
    with Image.open(src) as im:
        im = im.convert("RGB")
        height = round(im.size[1] * width / im.size[0])
        return im.resize((width, height), Image.LANCZOS)


def write_webp(img, out, quality):
    img.save(out, "WEBP", quality=quality, method=6)
    return os.path.getsize(out)


def write_avif(img, out, crf):
    """ffmpeg has no WebP-in/AVIF-out path we can trust for stills, so hand it a
    lossless PNG of the already-resized image."""
    fd, tmp = tempfile.mkstemp(suffix=".png")
    os.close(fd)
    try:
        img.save(tmp, "PNG")
        r = subprocess.run(
            ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", tmp,
             "-c:v", "libaom-av1", "-crf", str(crf), "-cpu-used", str(CPU_USED),
             "-still-picture", "1", out],
            capture_output=True, text=True)
        if r.returncode != 0:
            print(f"    avif failed for {os.path.basename(out)}: {r.stderr.strip()[:160]}")
            return 0
        return os.path.getsize(out)
    finally:
        os.unlink(tmp)


def emit(src, out_dir, stem, tiers, want_avif):
    total = 0
    for width, cfg in sorted(tiers.items()):
        img = scaled(src, width)
        n = write_webp(img, os.path.join(out_dir, f"{stem}-{width}.webp"), cfg["webp_q"])
        total += n
        line = f"  {stem}-{width}  {img.size[0]}x{img.size[1]}  webp {n/1024:7.1f} KB"
        if want_avif:
            a = write_avif(img, os.path.join(out_dir, f"{stem}-{width}.avif"), cfg["crf"])
            total += a
            if a:
                line += f"   avif {a/1024:7.1f} KB  ({100 - a*100//n}% less)"
        print(line)
    return total


def main():
    want_avif = "--webp-only" not in sys.argv and HAVE_FFMPEG
    if not want_avif and "--webp-only" not in sys.argv:
        print("ffmpeg not found - writing WebP only, AVIF will be missing\n")

    os.makedirs(THUMBS, exist_ok=True)
    total = 0

    for name in sorted(os.listdir(PORTFOLIO)):
        if not name.endswith(".webp"):
            continue
        total += emit(os.path.join(PORTFOLIO, name), THUMBS, name[:-5], TIERS, want_avif)

    if os.path.exists(HERO_MASTER):
        total += emit(HERO_MASTER, HERO_DIR, "hero-img", HERO_TIERS, want_avif)
        # Social crawlers want a predictable 1.91:1 raster; keep it JPEG.
        card = scaled(HERO_MASTER, 1200)
        top = max(0, (card.size[1] - 630) // 2)
        card.crop((0, top, 1200, top + 630)).save(
            os.path.join(ROOT, "assets", "og-card.jpg"), "JPEG",
            quality=84, optimize=True, progressive=True)
        n = os.path.getsize(os.path.join(ROOT, "assets", "og-card.jpg"))
        total += n
        print(f"  og-card  1200x630  jpeg {n/1024:7.1f} KB")
    else:
        print(f"  note: {os.path.relpath(HERO_MASTER, ROOT)} is absent; hero variants "
              "left as they are. Recover it from git history to re-encode.")

    print(f"\ngenerated {total/1e6:.2f} MB total")


if __name__ == "__main__":
    main()
