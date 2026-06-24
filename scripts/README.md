# scripts/

Small Python utilities that read live data from third-party APIs and write
the result back into Shopify metafields so the storefront has the latest
numbers without any front-end fetching.

All scripts:

- Read credentials from `env/shopify.env` (gitignored).
- Write only the specific metafields described — they never touch product
  copy, prices, or other fields.
- Support `--dry-run` (prints what would be written, exits without
  touching Shopify).
- Are safe to re-run any number of times; they always overwrite, never
  append.

Run them from the **repo root**, not from inside `scripts/`:

```bash
cd /Users/philippezanetti/postcard-fresh
python3 scripts/<name>.py            # write
python3 scripts/<name>.py --dry-run  # preview
```

---

## refresh_worlds_rank.py

**What it does**
Computes a popularity ranking across the 23 World metaobjects from the
last 90 days of paid orders and writes the rank + raw score back to each
World.

**Signal**
Sum of line-item quantity from paid orders (`financial_status:paid`) in
the trailing 90 days. Per product → mapped to a world via
`product.metafields.postcard.world` (preferred) or
`custom.world` (legacy fallback) → summed per world.

**Writes**
- `worlds.<handle>.metafields.custom.popularity_rank`  (integer, 1 = top)
- `worlds.<handle>.metafields.custom.popularity_score` (integer, units)

**Consumed by**
- Postcard Worlds Quick (homepage strip)
- About · Worlds Index
- Worlds Index · List (Worlds page, per-tier slices)
- Header desktop NAV worlds dropdown
- Footer worlds column

**Required env**
- `SHOPIFY_STORE_URL`
- `SHOPIFY_API_VERSION`
- `SHOPIFY_ACCESS_TOKEN`

**Run cadence**
Whenever you want the worlds ordering refreshed. Once a week is plenty;
top sellers don't shuffle daily.

---

## refresh_stamped_metafields.py

**What it does**
Pulls every Stamped review through the authenticated dashboard endpoint,
aggregates count + average per product, and writes the result back to
the standard Stamped product metafields. Closes the gap when Stamped's
own Shopify-sync drifts (which it did for a long while in early 2026).

**Signal**
`GET https://stamped.io/api/v2/{storeHash}/dashboard/reviews` paginated.
Filters to `reviewState in {1, 6}` — 1 = approved/published, 6 = featured.
Other states (pending, rejected) drop.

**Writes** (per product)
- `product.metafields.stamped.reviews_count`   (string)
- `product.metafields.stamped.reviews_average` (string, e.g. "4.8")

**Consumed by**
- PDP rating block (snippets/pdp-buy-block.liquid `rating` case)
- PDP reviews section hide/show check (postcard-pdp-reviews-section.liquid)

**Required env**
- `SHOPIFY_STORE_URL`, `SHOPIFY_API_VERSION`, `SHOPIFY_ACCESS_TOKEN`
- `STAMPED_PUBLIC_KEY`
- `STAMPED_API_KEY` (private)
- `STAMPED_STORE_HASH`

**Run cadence**
Run after a Stamped sync hiccup, or once a week to be safe. Stamped's
own metafield sync (toggled on in their app settings) handles single
review events automatically — this script handles bulk catch-up.

---

## refresh_google_rating.py

**What it does**
Reads Postcard Orchard's average rating + total review count from the
Google Places API and writes them to shop-level metafields the header
announcement bar consumes.

**Signal**
Places API (New) v1 endpoint
`GET https://places.googleapis.com/v1/places/{POSTCARD_ORCHARD_PLACE_ID}`
with field mask `displayName,rating,userRatingCount,googleMapsUri`.
Falls back to the legacy `/maps/api/place/details/json` if v1 is not
enabled on the project.

**Writes**
- `shop.metafields.google_review.rating` (single line, e.g. "4.9")
- `shop.metafields.google_review.count`  (single line, e.g. "175")

**Consumed by**
Header announcement bar (sections/header.liquid) — shows
`Postcard Orchard ★★★★★ 4.9 · 175 Google reviews` next to the existing
announcement text. Falls back to editor-set overrides if metafields are
empty.

**Required env**
- `SHOPIFY_STORE_URL`, `SHOPIFY_API_VERSION`, `SHOPIFY_ACCESS_TOKEN`
- `GOOGLE_PLACES_API_KEY`
- `POSTCARD_ORCHARD_PLACE_ID`

**Google Cloud Console requirements**
- Enable **Places API (New)** on the project.
- API key restrictions must allow Places API (New) under "API
  restrictions". For local script use, set Application restrictions
  to **None** (or IP-pin to your dev machine).

**Run cadence**
Once a week, or whenever you've collected a noticeable number of new
reviews. Google's rating is slow-moving so daily refreshes aren't
needed.

---

## sync_google_reviews.py

**What it does**
Same result as `refresh_google_rating.py` (writes the header's
`google_review.rating` + `google_review.count` metafields), but reads from
the **Cloudflare Worker proxy** — the exact source the on-page "Google
reviews" section shows — so the header bar matches the section. Needs **no
Google API key** (the worker holds it).

**Signal**
`GET https://postcard-google-reviews.philippe-7f7.workers.dev` (the section's
Proxy URL) → `{ rating, total }`. Must send a real `User-Agent` and an
`Origin` matching the worker's `ALLOWED_ORIGIN`, or Cloudflare returns 403.

**Writes**
- `shop.metafields.google_review.rating` (single line, e.g. "4.9")
- `shop.metafields.google_review.count`  (single line, e.g. "191")

**Consumed by**
Header announcement bar (sections/header.liquid).

**Required env**
- `SHOPIFY_STORE_URL`, `SHOPIFY_API_VERSION`, `SHOPIFY_ACCESS_TOKEN`

**Optional env** (have defaults)
- `GREVIEWS_PROXY_URL` — default `https://postcard-google-reviews.philippe-7f7.workers.dev`
- `GREVIEWS_ORIGIN` — default `https://thisisoasis.myshopify.com`

**Which one to use?**
Prefer **sync_google_reviews.py** for routine refreshes (no Google key, always
matches the section). Use **refresh_google_rating.py** only if the worker is
down and you need to hit Google directly.

**Run cadence**
Weekly, or whenever new reviews accumulate. Worker edge-caches ~15 min.

---

## refresh_landing_bestsellers.py

**What it does**
Rebuilds the manual **`landing-bestsellers`** collection (Collection GID
`486636290274`) — the pool the homepage "Postcard Bestsellers" section
shuffles 3 of — from the top 20 *clean retail* products by net sales over the
trailing ~6 months. Unlike the other scripts it writes **collection membership**
(add/remove + reorder), not metafields. Idempotent: converges to exactly the 20.

**Signal**
Sum of line-item `discountedTotalSet` from paid orders (`financial_status:paid`)
in the trailing `WINDOW_DAYS` (182). "Clean retail" drops titles whose tokens hit
`{custom, refill, mini(s), discovery, sojao, esse}` or the phrase "pick and mix"
— i.e. customs, the in-store Refill SKU, mini/discovery sets, Pick & Mix, and the
SOJAO/ESSE collabs. Co-brands like Heytea are kept.

**Writes**
- `collection landing-bestsellers` → its 20 product members, ordered by net sales.

**Consumed by**
- Homepage Postcard Bestsellers section (sections/postcard-bestsellers.liquid),
  which renders this collection's top 20 as a pool and JS-shuffles 3 per visit.

**Required env**
- `SHOPIFY_STORE_URL`, `SHOPIFY_API_VERSION`, `SHOPIFY_ACCESS_TOKEN`

**Run cadence**
Monthly. Installed as a launchd agent
(`~/Library/LaunchAgents/com.postcard.bestsellers-refresh.plist`, a copy lives at
`scripts/launchd/`) that fires on the 1st at 09:34 local (runs on next wake if the
Mac was asleep). Logs to `/tmp/postcard-bestsellers-refresh.log`.
Manage: `launchctl list | grep postcard` · unload with
`launchctl unload ~/Library/LaunchAgents/com.postcard.bestsellers-refresh.plist`.

---

## env/shopify.env — full template

```
# Shopify Admin API
SHOPIFY_STORE_URL=thisisoasis.myshopify.com
SHOPIFY_API_VERSION=2023-04
SHOPIFY_API_KEY=...
SHOPIFY_SECRET_KEY=...
SHOPIFY_ACCESS_TOKEN=shpat_...

# Stamped.io
STAMPED_PUBLIC_KEY=pubkey-...
STAMPED_API_KEY=...
STAMPED_STORE_HASH=...

# Google Places
GOOGLE_PLACES_API_KEY=...
POSTCARD_ORCHARD_PLACE_ID=ChIJ...
```

The whole `env/` directory is gitignored — nothing in there ever ships
to the repo.

---

## Adding a new script

Pattern to copy:
1. Read creds from `env/shopify.env` at the top.
2. One function per upstream API call, one per Shopify write.
3. `--dry-run` short-circuits before writing.
4. Always paginate Shopify queries with `pageInfo { hasNextPage endCursor }`.
5. `time.sleep(0.12)` between writes to stay polite to Admin API rate limits.
6. Add an entry above (purpose, signal, writes, consumed by, env, cadence).
