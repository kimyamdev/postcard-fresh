#!/usr/bin/env python3
"""
Refresh the "landing-bestsellers" manual collection from real sales.

Signal: net sales (sum of line-item discounted totals) over the trailing
~6 months, per product, from PAID orders. The top 20 *clean retail* products
become the collection's members, in ranked order.

"Clean retail" excludes the same non-flagship SKUs we curate out by hand:
customs, the in-store Refill SKU, mini / discovery sets, Pick & Mix bundles,
and the SOJAO / ESSE collabs. (Heytea and other co-brands are kept.)

This feeds the homepage "Postcard Bestsellers" section, which shuffles 3 of
these on each visit. Re-run monthly via cron so the pool tracks recent sales.

Run:  python3 scripts/refresh_landing_bestsellers.py
      python3 scripts/refresh_landing_bestsellers.py --dry-run   (print, no writes)

Reads creds from env/shopify.env (SHOPIFY_STORE_URL, SHOPIFY_API_VERSION,
SHOPIFY_ACCESS_TOKEN).
"""
import json, os, sys, time, urllib.request, urllib.error
from datetime import datetime, timedelta, timezone
from collections import defaultdict

WINDOW_DAYS = 182  # ~6 months
TOP_N = 20
COLLECTION_GID = "gid://shopify/Collection/486636290274"  # landing-bestsellers

# A product is dropped if its title contains any of these phrases, or if any
# whitespace token of its (lowercased, punctuation-stripped) title is in the
# token set. Token matching avoids false hits like "Essence" matching "esse".
EXCLUDE_PHRASES = ("pick and mix",)
EXCLUDE_TOKENS = {"custom", "refill", "mini", "minis", "discovery", "sojao", "esse"}

# ---- creds ----------------------------------------------------------------
ENV_PATH = os.path.join(os.path.dirname(__file__), "..", "env", "shopify.env")
env = {}
with open(ENV_PATH) as f:
    for line in f:
        if "=" in line and not line.startswith("#"):
            k, v = line.strip().split("=", 1)
            env[k] = v
URL = f"https://{env['SHOPIFY_STORE_URL']}/admin/api/{env['SHOPIFY_API_VERSION']}/graphql.json"
HEADERS = {
    "X-Shopify-Access-Token": env["SHOPIFY_ACCESS_TOKEN"],
    "Content-Type": "application/json",
}


# ---- helper ---------------------------------------------------------------
def call(query, variables=None, retries=4):
    body = {"query": query}
    if variables is not None:
        body["variables"] = variables
    for attempt in range(retries):
        req = urllib.request.Request(URL, data=json.dumps(body).encode(), headers=HEADERS)
        try:
            r = json.load(urllib.request.urlopen(req))
            if r.get("errors"):
                throttled = any("THROTTLED" in (e.get("extensions", {}).get("code", "") or "") for e in r["errors"])
                if throttled and attempt < retries - 1:
                    time.sleep(2 ** attempt)
                    continue
                raise RuntimeError(r["errors"])
            return r["data"]
        except urllib.error.HTTPError:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
                continue
            raise


# ---- 1) product gid -> title ----------------------------------------------
def fetch_product_titles():
    print("[1/4] Fetching product titles…", flush=True)
    out = {}
    cursor = None
    q = """
    query($cursor: String) {
      products(first: 250, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges { node { id title } }
      }
    }"""
    while True:
        d = call(q, {"cursor": cursor})
        for e in d["products"]["edges"]:
            out[e["node"]["id"]] = e["node"]["title"]
        if not d["products"]["pageInfo"]["hasNextPage"]:
            break
        cursor = d["products"]["pageInfo"]["endCursor"]
    print(f"    {len(out)} products")
    return out


# ---- 2) sum net sales per product in window -------------------------------
def fetch_net_sales():
    since = (datetime.now(timezone.utc) - timedelta(days=WINDOW_DAYS)).strftime("%Y-%m-%d")
    print(f"[2/4] Summing net sales since {since} (window = {WINDOW_DAYS}d)…", flush=True)
    sales = defaultdict(float)
    cursor = None
    page = 0
    q = """
    query($cursor: String, $query: String!) {
      orders(first: 100, after: $cursor, query: $query, sortKey: CREATED_AT, reverse: true) {
        pageInfo { hasNextPage endCursor }
        edges { node {
          lineItems(first: 100) {
            edges { node {
              product { id }
              discountedTotalSet { shopMoney { amount } }
            } }
          }
        } }
      }
    }"""
    filter_q = f"created_at:>={since} AND status:any AND financial_status:paid"
    while True:
        d = call(q, {"cursor": cursor, "query": filter_q})
        edges = d["orders"]["edges"]
        for oe in edges:
            for le in oe["node"]["lineItems"]["edges"]:
                ln = le["node"]
                pid = (ln.get("product") or {}).get("id")
                if not pid:
                    continue
                amt = ((ln.get("discountedTotalSet") or {}).get("shopMoney") or {}).get("amount")
                if amt is None:
                    continue
                sales[pid] += float(amt)
        page += 1
        if not d["orders"]["pageInfo"]["hasNextPage"]:
            break
        cursor = d["orders"]["pageInfo"]["endCursor"]
        if page % 10 == 0:
            print(f"    page {page} … {len(sales)} products with sales so far", flush=True)
    print(f"    aggregated {len(sales)} products")
    return sales


# ---- 3) filter + rank -----------------------------------------------------
def is_clean_retail(title):
    t = title.lower()
    if any(p in t for p in EXCLUDE_PHRASES):
        return False
    tokens = {"".join(ch for ch in w if ch.isalnum()) for w in t.split()}
    return tokens.isdisjoint(EXCLUDE_TOKENS)


def rank(sales, titles):
    rows = []
    for pid, amt in sales.items():
        title = titles.get(pid)
        if not title or not is_clean_retail(title):
            continue
        rows.append((pid, title, amt))
    rows.sort(key=lambda r: (-r[2], r[1]))
    return rows[:TOP_N]


# ---- 4) set collection membership -----------------------------------------
def fetch_collection_products():
    out = []
    cursor = None
    q = """
    query($id: ID!, $cursor: String) {
      collection(id: $id) {
        products(first: 250, after: $cursor) {
          pageInfo { hasNextPage endCursor }
          edges { node { id } }
        }
      }
    }"""
    while True:
        d = call(q, {"id": COLLECTION_GID, "cursor": cursor})
        coll = d["collection"]
        for e in coll["products"]["edges"]:
            out.append(e["node"]["id"])
        if not coll["products"]["pageInfo"]["hasNextPage"]:
            break
        cursor = coll["products"]["pageInfo"]["endCursor"]
    return out


def add_products(ids):
    m = """
    mutation($id: ID!, $ids: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $ids) {
        collection { id productsCount { count } }
        userErrors { field message }
      }
    }"""
    d = call(m, {"id": COLLECTION_GID, "ids": ids})
    errs = d["collectionAddProducts"]["userErrors"]
    if errs:
        raise RuntimeError(f"add failed: {errs}")


def remove_products(ids):
    m = """
    mutation($id: ID!, $ids: [ID!]!) {
      collectionRemoveProducts(id: $id, productIds: $ids) {
        job { id }
        userErrors { field message }
      }
    }"""
    d = call(m, {"id": COLLECTION_GID, "ids": ids})
    errs = d["collectionRemoveProducts"]["userErrors"]
    if errs:
        raise RuntimeError(f"remove failed: {errs}")


def reorder_products(ordered_ids):
    moves = [{"id": pid, "newPosition": str(i)} for i, pid in enumerate(ordered_ids)]
    m = """
    mutation($id: ID!, $moves: [MoveInput!]!) {
      collectionReorderProducts(id: $id, moves: $moves) {
        job { id }
        userErrors { field message }
      }
    }"""
    d = call(m, {"id": COLLECTION_GID, "moves": moves})
    errs = d["collectionReorderProducts"]["userErrors"]
    if errs:
        raise RuntimeError(f"reorder failed: {errs}")


def main():
    dry = "--dry-run" in sys.argv
    titles = fetch_product_titles()
    sales = fetch_net_sales()
    top = rank(sales, titles)

    print(f"\nTop {TOP_N} clean-retail bestsellers (last {WINDOW_DAYS}d, by net sales):")
    print(f"  {'#':>2}  {'net sales':>10}  product")
    for i, (pid, title, amt) in enumerate(top, 1):
        print(f"  {i:>2}  {amt:>10,.0f}  {title}")

    if len(top) < TOP_N:
        print(f"\n!! Only {len(top)} clean products had sales — collection will have {len(top)}.")

    if dry:
        print("\n--dry-run: not writing.")
        return

    desired = [pid for pid, _, _ in top]
    desired_set = set(desired)
    current = fetch_collection_products()
    current_set = set(current)

    to_add = [g for g in desired if g not in current_set]
    to_remove = [g for g in current if g not in desired_set]

    print(f"\n[3/4] Updating collection: +{len(to_add)} / -{len(to_remove)} "
          f"(currently {len(current)})…", flush=True)
    if to_add:
        add_products(to_add)
    if to_remove:
        remove_products(to_remove)
        time.sleep(1.0)  # let the async remove settle before reorder
    print("[4/4] Reordering to net-sales rank…", flush=True)
    try:
        reorder_products(desired)
    except Exception as e:
        print(f"    (reorder skipped: {e})")
    print("Done.")


if __name__ == "__main__":
    main()
