# BluBluGames

Static landing page for an indie game asset studio focused on custom low poly and stylized
3D assets. No build step and no dependencies — plain HTML, CSS and JS, served straight from
the repo root.

This replaced an Angular Universal version of the site; that code is still in the git history
up to `5032192`.

## Structure

- `index.html` — the whole landing page (services / work / process / stores / contact, plus a `<dialog>` lightbox)
- `privacy-policy.html` — privacy policy subpage
- `styles.css`, `script.js` — vanilla CSS and JS (footer year + portfolio lightbox)
- `404.html` — branded not-found page (Firebase serves it automatically)
- `assets/portfolio/*.webp` — near-lossless masters. Sources only; **not deployed**
- `assets/portfolio/thumbs/`, `assets/hero/hero-img-*` — generated AVIF + WebP, see **Images**
- `assets/icons/`, `site.webmanifest` — favicons and PWA manifest
- `assets/og-card.jpg` — 1200x630 social card
- `tools/generate-images.py` — regenerates everything under `thumbs/` and the hero variants
- `firestore.rules`, `storage.rules`, `firestore.indexes.json` — rules for the project's
  database and bucket. The current site does not use either (the contact CTA is a `mailto:`
  link), but the old site wrote to `contact_messages`, so these stay as the source of truth.
- `studio-strategy/` — internal marketing docs, excluded from deploys

## Run locally

```bash
npx serve .            # http://localhost:3000
```

Use `npx serve` rather than `python -m http.server`: `cleanUrls` is enabled on Firebase, so
pages are linked without the `.html` extension and `/privacy-policy` 404s on a server that
does not resolve extension-less paths. `npx serve` matches Firebase's behaviour (`/privacy-policy`
→ 200, `/privacy-policy.html` → 301), as does `firebase emulators:start --only hosting`.

## Images

Nothing the page loads is a hand-made file. The masters in `assets/portfolio/` are
near-lossless 2400x1350 WebP (0.7-3.4 MB each) and are **excluded from the deploy** -
`tools/generate-images.py` derives everything served, in AVIF with a WebP fallback:

| tier | width | used by |
| --- | --- | --- |
| grid | 640w, 1280w | portfolio tiles (`srcset`) |
| lightbox | 1280w, 2000w | the dialog, composed in JS from `data-stem` |
| hero | 1280w, 1920w, 2560w | full-bleed hero, the LCP element |

Widths follow how the page *paints*, not the source size. `object-fit: cover` against a
fixed tile height means a tile paints 462px wide (960px featured), and the lightbox is
capped at `min(96vw, 1000px)` - so 2000px is everything a 2x display can resolve and the
masters can never be needed at runtime.

Result: ~300 KB for a first desktop visit, and 0.73 MB even if someone opens all eight
images in the lightbox on a retina screen. Before this the page served ~17 MB per visit.

After adding or replacing anything in `assets/portfolio/`:

```bash
pip install Pillow          # ffmpeg with libaom-av1 is needed for the AVIF pass
python tools/generate-images.py
python tools/generate-images.py --webp-only    # skip AVIF when iterating
```

Then copy an existing `<button class="portfolio-item">` in `index.html`: `data-stem` is the
path prefix under `thumbs/` and the two `<source>` elements carry the AVIF/WebP srcsets.
Re-run the sitemap image block too (it lists the 2000w files).

`assets/hero/hero-img.webp` is the 2560px hero master, kept in the repo for re-encoding and
ignored by hosting.

## Deploy

Firebase Hosting, project and site `blublu-web` → https://blublu-web.web.app

Pushing to `master` deploys to production and opening a PR publishes a preview channel, via
`.github/workflows/`. Both use the existing `FIREBASE_SERVICE_ACCOUNT_BLUBLU_WEB` repository
secret. There is no build step.

Manually:

```bash
npm install -g firebase-tools
firebase login
firebase hosting:channel:deploy preview    # temporary URL
firebase deploy --only hosting             # production
```

`firebase deploy` on its own would also push `firestore.rules` and `storage.rules`, so prefer
`--only hosting` unless you mean to change those.

## SEO and sharing

- `index.html` carries Open Graph + Twitter card meta pointing at `assets/og-card.jpg`
  (1200x630 JPEG - social crawlers are unreliable with AVIF/WebP), and a JSON-LD `@graph`
  with `Organization` (incl. `sameAs` for every storefront and social profile),
  `WebSite`, `WebPage`, and an `OfferCatalog` mirroring the four pricing tiers.
- **If a tier price or name changes in the page, change it in the JSON-LD too.** Structured
  data that contradicts the visible page is a manual-action risk, not just a missed
  opportunity.
- `sitemap.xml` includes image entries for the eight portfolio renders, which is how a 3D
  studio earns Google Images traffic. It is generated from the page's own `data-stem` /
  `data-caption` attributes, so regenerate it when the gallery changes.
- `404.html` is `noindex, follow`.

## Notes

- After attaching a custom domain, update the URLs in `robots.txt`, `sitemap.xml`, and the
  `og:url` / `og:image` / canonical / JSON-LD tags in `index.html`.
- Hosting `headers` rules match the *request* path, not the file on disk. Because `cleanUrls`
  is on, visitors request `/` and `/privacy-policy`, which do not match `**/*.html` - so each
  page needs its own no-cache rule in `firebase.json`. Add one when adding a page, or it will
  inherit Firebase's default `max-age=3600` and go stale for an hour after a deploy.

## Offer scope

- Low poly objects
- Stylized 3D props
- Plants and foliage
- Modular kits
- Full environments
- No character work
