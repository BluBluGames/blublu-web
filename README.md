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
- `assets/portfolio/` — full-size masters, only fetched by the lightbox
- `assets/portfolio/thumbs/`, `assets/hero/hero-img-*.webp` — generated, see **Images** below
- `assets/icons/`, `site.webmanifest` — favicons and PWA manifest
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

The portfolio masters are near-lossless 2400x1350 WebP files of 1–3.5 MB each. The page never
loads them: the grid uses generated 640w/1280w thumbnails via `srcset`, and the lightbox offers
the browser both the 1280w thumbnail and the master, so the master is only fetched on a display
dense enough to resolve it. Typical desktop first load is ~390 KB instead of ~17 MB.

After adding or replacing anything in `assets/portfolio/`:

```bash
pip install Pillow
python tools/generate-images.py
```

Then add a matching `<button class="portfolio-item">` in `index.html`, following an existing one —
`data-full` points at the master, `data-thumb` at the 1280w thumbnail, and `srcset`/`sizes` at the
generated pair. `sizes` describes the *painted* width, which is wider than the tile because
`object-fit: cover` crops against a fixed tile height (462px for a regular tile, 960px for the
featured one).

`assets/hero/hero-img.webp` is the 2560px hero master. It is in the `ignore` list in
`firebase.json` so it is kept in the repo for re-encoding but never served.

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

## Notes

- After attaching a custom domain, update the URLs in `robots.txt`, `sitemap.xml`, and the
  `og:url` / `og:image` / canonical / JSON-LD tags in `index.html`.
- There is no `404.html`, so unknown paths fall back to Firebase's generic error page.
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
