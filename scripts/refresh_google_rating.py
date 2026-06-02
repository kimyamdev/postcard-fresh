#!/usr/bin/env python3
"""
Pull Postcard Orchard's average rating + review count from the Google Places
API and write them to Shopify shop metafields:
    shop.metafields.google_review.rating  -> "4.8"
    shop.metafields.google_review.count   -> "324"

The header announcement bar reads those metafields (with optional editor-set
overrides as a fallback).

Required env in env/shopify.env:
    SHOPIFY_STORE_URL, SHOPIFY_API_VERSION, SHOPIFY_ACCESS_TOKEN
    GOOGLE_PLACES_API_KEY
    POSTCARD_ORCHARD_PLACE_ID

Run:
    python3 scripts/refresh_google_rating.py
    python3 scripts/refresh_google_rating.py --dry-run
"""
import json, sys, urllib.request, urllib.parse

env = {}
with open("env/shopify.env") as f:
    for line in f:
        if "=" in line and not line.startswith("#"):
            k, v = line.strip().split("=", 1)
            env[k] = v

SHOP_URL = env["SHOPIFY_STORE_URL"]
SHOP_VER = env["SHOPIFY_API_VERSION"]
SHOP_TOK = env["SHOPIFY_ACCESS_TOKEN"]
G_KEY    = env.get("GOOGLE_PLACES_API_KEY")
PLACE_ID = env.get("POSTCARD_ORCHARD_PLACE_ID")

if not G_KEY or not PLACE_ID:
    print("Missing GOOGLE_PLACES_API_KEY and/or POSTCARD_ORCHARD_PLACE_ID in env/shopify.env", file=sys.stderr)
    sys.exit(2)

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


def fetch_place():
    """Use Google Places Details v1 (new) API: simpler + returns rating + userRatingCount."""
    url = f"https://places.googleapis.com/v1/places/{PLACE_ID}"
    req = urllib.request.Request(
        url,
        headers={
            "X-Goog-Api-Key": G_KEY,
            "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri",
            "Content-Type": "application/json",
        },
    )
    try:
        r = json.load(urllib.request.urlopen(req, timeout=20))
    except urllib.error.HTTPError as e:
        # Fall back to the legacy Place Details endpoint if the new one isn't enabled
        print("Places v1 returned", e.code, "— falling back to legacy /details", file=sys.stderr)
        legacy = (
            "https://maps.googleapis.com/maps/api/place/details/json?"
            + urllib.parse.urlencode({"place_id": PLACE_ID, "fields": "name,rating,user_ratings_total,url", "key": G_KEY})
        )
        lr = json.load(urllib.request.urlopen(legacy, timeout=20))
        if lr.get("status") != "OK":
            raise RuntimeError(f"Places legacy error: {lr}")
        res = lr["result"]
        return {
            "name": res.get("name"),
            "rating": res.get("rating"),
            "count": res.get("user_ratings_total"),
            "uri": res.get("url"),
        }
    return {
        "name": (r.get("displayName") or {}).get("text"),
        "rating": r.get("rating"),
        "count": r.get("userRatingCount"),
        "uri": r.get("googleMapsUri"),
    }


def shop_gid():
    d = shopify("{ shop { id } }")
    return d["shop"]["id"]


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
    d = shopify(m, {"metafields": fields})
    errs = d["metafieldsSet"]["userErrors"]
    if errs:
        raise RuntimeError(errs)


def main():
    dry = "--dry-run" in sys.argv
    place = fetch_place()
    print(f"Place: {place['name']}")
    print(f"  rating = {place['rating']}")
    print(f"  count  = {place['count']}")
    print(f"  uri    = {place['uri']}")

    if dry:
        print("\n--dry-run: not writing.")
        return

    owner = shop_gid()
    write_metafields(owner, place["rating"], place["count"])
    print("\nShop metafields updated: google_review.rating + google_review.count")


if __name__ == "__main__":
    main()
