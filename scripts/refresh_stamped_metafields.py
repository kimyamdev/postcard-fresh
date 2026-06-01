#!/usr/bin/env python3
"""
Force a re-sync of every product's review count + average rating from
Stamped's actual review database into Shopify's `stamped.reviews_count` and
`stamped.reviews_average` metafields (the ones the storefront reads).

Run:
    python3 scripts/refresh_stamped_metafields.py
    python3 scripts/refresh_stamped_metafields.py --dry-run

Reads creds from env/shopify.env:
    SHOPIFY_STORE_URL, SHOPIFY_API_VERSION, SHOPIFY_ACCESS_TOKEN
    STAMPED_PUBLIC_KEY, STAMPED_API_KEY, STAMPED_STORE_HASH

Strategy:
1. Paginate /api/v2/{storeHash}/dashboard/reviews to pull every review.
   We keep reviewState in {1, 6} — 1 = approved / published, 6 = featured;
   both render publicly on the storefront. Pending (0) and rejected (2) drop.
2. Aggregate per Shopify product id: count + average rating.
3. For each Shopify product (paginated), write the new aggregates to the
   stamped.reviews_count / stamped.reviews_average metafields. These are
   what the PDP rating block + reviews section consume directly.
"""
import json, sys, time, base64, urllib.request, urllib.error
from collections import defaultdict

PAGE_SIZE = 100        # Stamped page size; max is around 100-200
PUBLISHED_STATES = {1, 6}  # 1=published/approved, 6=featured. Both render publicly.
TIMEOUT = 30

# ---- creds ----
env = {}
with open("env/shopify.env") as f:
    for line in f:
        if "=" in line and not line.startswith("#"):
            k, v = line.strip().split("=", 1)
            env[k] = v

SHOP_URL = env["SHOPIFY_STORE_URL"]
SHOP_VER = env["SHOPIFY_API_VERSION"]
SHOP_TOK = env["SHOPIFY_ACCESS_TOKEN"]
STAMPED_PUB = env["STAMPED_PUBLIC_KEY"]
STAMPED_PRIV = env["STAMPED_API_KEY"]
STAMPED_HASH = env["STAMPED_STORE_HASH"]

GRAPHQL = f"https://{SHOP_URL}/admin/api/{SHOP_VER}/graphql.json"
STAMPED_AUTH = "Basic " + base64.b64encode(f"{STAMPED_PUB}:{STAMPED_PRIV}".encode()).decode()

# ---- helpers ----
def http(url, method="GET", headers=None, body=None, retries=3):
    h = headers.copy() if headers else {}
    if isinstance(body, (dict, list)):
        body = json.dumps(body).encode()
        h["Content-Type"] = "application/json"
    for attempt in range(retries):
        req = urllib.request.Request(url, method=method, data=body, headers=h)
        try:
            r = urllib.request.urlopen(req, timeout=TIMEOUT)
            return r.status, json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < retries - 1:
                time.sleep(2 ** attempt)
                continue
            return e.code, e.read().decode("utf-8", "ignore")
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
                continue
            return None, str(e)

def shopify(q, v=None):
    body = {"query": q}
    if v is not None:
        body["variables"] = v
    s, data = http(GRAPHQL, method="POST", headers={"X-Shopify-Access-Token": SHOP_TOK}, body=body)
    if s != 200 or not isinstance(data, dict) or data.get("errors"):
        raise RuntimeError(f"Shopify error ({s}): {data}")
    return data["data"]

# ---- 1) pull every Stamped review ----
def fetch_all_reviews(strict_published=True):
    print(f"[1/3] Pulling reviews from Stamped (state={'published only' if strict_published else 'all'})...", flush=True)
    out = []   # list of (shopify_product_id_int, rating_int)
    page = 1
    total_pages = None
    while True:
        url = f"https://stamped.io/api/v2/{STAMPED_HASH}/dashboard/reviews?take={PAGE_SIZE}&page={page}"
        s, data = http(url, headers={"Authorization": STAMPED_AUTH})
        if s != 200 or not isinstance(data, dict):
            raise RuntimeError(f"Stamped error ({s}) on page {page}: {data}")
        results = data.get("results", [])
        total_pages = data.get("totalPages", total_pages)
        for entry in results:
            r = entry.get("review") or {}
            if strict_published and r.get("reviewState") not in PUBLISHED_STATES:
                continue
            pid = r.get("productId")
            rating = r.get("rating")
            if not pid or not isinstance(rating, (int, float)):
                continue
            try:
                out.append((int(pid), float(rating)))
            except (TypeError, ValueError):
                continue
        if page % 5 == 0 or page == 1:
            print(f"    page {page}/{total_pages} — {len(out)} usable reviews so far", flush=True)
        if total_pages and page >= total_pages:
            break
        if not results:
            break
        page += 1
        time.sleep(0.15)
    print(f"    kept {len(out)} reviews")
    return out

# ---- 2) group by product ----
def aggregate(reviews):
    print("[2/3] Aggregating per product...", flush=True)
    by = defaultdict(list)
    for pid, rating in reviews:
        by[pid].append(rating)
    summary = {}
    for pid, ratings in by.items():
        n = len(ratings)
        avg = sum(ratings) / n if n else 0
        summary[pid] = (n, round(avg, 2))
    return summary

# ---- 3) write back to Shopify metafields ----
def list_products():
    print("[3/3] Walking Shopify products...", flush=True)
    out = []
    cursor = None
    q = """
    query($cursor: String) {
      products(first: 250, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges { node { id legacyResourceId } }
      }
    }"""
    while True:
        d = shopify(q, {"cursor": cursor})
        for e in d["products"]["edges"]:
            out.append((e["node"]["id"], int(e["node"]["legacyResourceId"])))
        if not d["products"]["pageInfo"]["hasNextPage"]:
            break
        cursor = d["products"]["pageInfo"]["endCursor"]
    print(f"    {len(out)} products fetched")
    return out

def write_metafields(product_gid, count, avg):
    m = """
    mutation set($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        userErrors { field message code }
      }
    }"""
    avg_str = ("%.1f" % avg).rstrip("0").rstrip(".") or "0"
    fields = [
        {"ownerId": product_gid, "namespace": "stamped", "key": "reviews_count",   "type": "single_line_text_field", "value": str(count)},
        {"ownerId": product_gid, "namespace": "stamped", "key": "reviews_average", "type": "single_line_text_field", "value": avg_str},
    ]
    d = shopify(m, {"metafields": fields})
    errs = d["metafieldsSet"]["userErrors"]
    if errs:
        raise RuntimeError(f"write failed for {product_gid}: {errs}")

def main():
    dry = "--dry-run" in sys.argv
    reviews = fetch_all_reviews(strict_published=True)
    summary = aggregate(reviews)
    products = list_products()

    print(f"\nReady to write. Products with reviews: {len(summary)}.")

    if dry:
        # show top 25 by count
        top = sorted(summary.items(), key=lambda x: -x[1][0])[:25]
        print("\nTop products by review count:")
        for pid, (n, avg) in top:
            print(f"  product_id={pid:>15}  count={n:>4}  avg={avg}")
        print("\n--dry-run: not writing back.")
        return

    written = 0
    skipped = 0
    failures = []
    for gid, legacy in products:
        if legacy not in summary:
            skipped += 1
            continue
        n, avg = summary[legacy]
        try:
            write_metafields(gid, n, avg)
            written += 1
        except Exception as e:
            failures.append((gid, str(e)))
        if written % 25 == 0 and written:
            print(f"    wrote {written} so far...", flush=True)
        time.sleep(0.12)
    print(f"\nDone. Wrote {written} products. Skipped {skipped} (no reviews).")
    if failures:
        print(f"{len(failures)} failures:")
        for g, e in failures[:10]:
            print(f"  {g}  -> {e[:120]}")

if __name__ == "__main__":
    main()
