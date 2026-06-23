#!/usr/bin/env python3
"""
Sync the header announcement-bar Google rating + review count to the LIVE number
shown by the "Google reviews" section.

The section (sections/postcard-google-reviews.liquid) reads from the Cloudflare
Worker proxy, which calls the Google Places API server-side and edge-caches for
~15 min. This script hits that SAME worker, so the header metafields end up
matching the section exactly:

    shop.metafields.google_review.rating  -> e.g. "4.9"
    shop.metafields.google_review.count   -> e.g. "191"

Unlike scripts/refresh_google_rating.py (which calls the Google Places API
directly and needs GOOGLE_PLACES_API_KEY), this one needs no Google credentials
— the worker holds the key.

Required env in env/shopify.env:
    SHOPIFY_STORE_URL, SHOPIFY_API_VERSION, SHOPIFY_ACCESS_TOKEN
Optional env (have sensible defaults):
    GREVIEWS_PROXY_URL   default: https://postcard-google-reviews.philippe-7f7.workers.dev
    GREVIEWS_ORIGIN      default: https://thisisoasis.myshopify.com  (must match the
                         worker's ALLOWED_ORIGIN)

Run:
    python3 scripts/sync_google_reviews.py
    python3 scripts/sync_google_reviews.py --dry-run
"""
import json, os, sys, urllib.request, urllib.error

DEFAULT_PROXY = "https://postcard-google-reviews.philippe-7f7.workers.dev"
DEFAULT_ORIGIN = "https://thisisoasis.myshopify.com"

env = {}
with open("env/shopify.env") as f:
    for line in f:
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip()

SHOP_URL = env["SHOPIFY_STORE_URL"]
SHOP_VER = env["SHOPIFY_API_VERSION"]
SHOP_TOK = env["SHOPIFY_ACCESS_TOKEN"]
PROXY = os.environ.get("GREVIEWS_PROXY_URL") or env.get("GREVIEWS_PROXY_URL") or DEFAULT_PROXY
ORIGIN = os.environ.get("GREVIEWS_ORIGIN") or env.get("GREVIEWS_ORIGIN") or DEFAULT_ORIGIN

GRAPHQL = f"https://{SHOP_URL}/admin/api/{SHOP_VER}/graphql.json"


def shopify(query, variables=None):
    body = {"query": query}
    if variables is not None:
        body["variables"] = variables
    req = urllib.request.Request(
        GRAPHQL,
        data=json.dumps(body).encode(),
        headers={"X-Shopify-Access-Token": SHOP_TOK, "Content-Type": "application/json"},
    )
    r = json.load(urllib.request.urlopen(req, timeout=30))
    if r.get("errors"):
        raise RuntimeError(r["errors"])
    return r["data"]


def fetch_section_numbers():
    """Read the same JSON the section consumes from the worker proxy."""
    # A real User-Agent is required: Cloudflare's bot filter 403s the default
    # Python-urllib UA.
    req = urllib.request.Request(PROXY, headers={"Origin": ORIGIN, "User-Agent": "postcard-reviews-sync/1.0"})
    try:
        d = json.load(urllib.request.urlopen(req, timeout=20))
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"Worker proxy returned {e.code}. Check GREVIEWS_PROXY_URL "
                           f"and that GREVIEWS_ORIGIN matches the worker's ALLOWED_ORIGIN.")
    return {"name": d.get("name"), "rating": d.get("rating"), "count": d.get("total")}


def shop_gid():
    return shopify("{ shop { id } }")["shop"]["id"]


def write_metafields(owner_id, rating, count):
    m = """
    mutation set($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        userErrors { field message code }
      }
    }"""
    rating_str = ("%.1f" % float(rating)) if rating is not None else ""
    count_str = str(int(count)) if count is not None else ""
    fields = [
        {"ownerId": owner_id, "namespace": "google_review", "key": "rating", "type": "single_line_text_field", "value": rating_str},
        {"ownerId": owner_id, "namespace": "google_review", "key": "count",  "type": "single_line_text_field", "value": count_str},
    ]
    errs = shopify(m, {"metafields": fields})["metafieldsSet"]["userErrors"]
    if errs:
        raise RuntimeError(errs)


def main():
    dry = "--dry-run" in sys.argv
    s = fetch_section_numbers()
    print(f"Live section ({s['name']}): rating = {s['rating']}, count = {s['count']}")
    if s["rating"] is None or s["count"] is None:
        print("Worker returned no rating/total — aborting.", file=sys.stderr)
        sys.exit(2)
    if dry:
        print("--dry-run: not writing.")
        return
    write_metafields(shop_gid(), s["rating"], s["count"])
    print(f"Shop metafields updated: google_review.rating={s['rating']}, google_review.count={s['count']}")


if __name__ == "__main__":
    main()
