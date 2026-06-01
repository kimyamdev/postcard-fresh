#!/usr/bin/env python3
"""
Refresh popularity rank + score on every World metaobject entry.

Signal: units sold in the trailing 90 days, summed per world. A product
belongs to a world when product.metafields.postcard.world resolves to a
world metaobject reference (preferred) OR product.metafields.custom.world
(legacy fallback).

Run:  python3 scripts/refresh_worlds_rank.py
Optional: --dry-run prints the new ranking without writing.

Reads creds from env/shopify.env (SHOPIFY_STORE_URL, SHOPIFY_API_VERSION,
SHOPIFY_ACCESS_TOKEN).
"""
import json, sys, time, urllib.request
from datetime import datetime, timedelta, timezone
from collections import defaultdict

WINDOW_DAYS = 90
PAGE_SIZE = 100  # GraphQL connection page size for orders/products

# ---- creds ----------------------------------------------------------------
env = {}
with open("env/shopify.env") as f:
    for line in f:
        if "=" in line and not line.startswith("#"):
            k, v = line.strip().split("=", 1)
            env[k] = v
URL = f"https://{env['SHOPIFY_STORE_URL']}/admin/api/{env['SHOPIFY_API_VERSION']}/graphql.json"
HEADERS = {
    "X-Shopify-Access-Token": env["SHOPIFY_ACCESS_TOKEN"],
    "Content-Type": "application/json",
}

# ---- helpers --------------------------------------------------------------
def call(query, variables=None, retries=3):
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
        except urllib.error.HTTPError as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
                continue
            raise

# ---- 1) map product GIDs -> world handle ----------------------------------
def fetch_product_world_map():
    """Return {product_gid -> world_handle}."""
    print("[1/3] Fetching products and their linked worlds…", flush=True)
    out = {}
    cursor = None
    page = 0
    q = """
    query($cursor: String) {
      products(first: 250, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges { node {
          id
          handle
          mf_postcard: metafield(namespace: "postcard", key: "world") { reference { ... on Metaobject { handle type } } }
          mf_custom:   metafield(namespace: "custom",   key: "world") { reference { ... on Metaobject { handle type } } }
        } }
      }
    }"""
    while True:
        d = call(q, {"cursor": cursor})
        edges = d["products"]["edges"]
        for e in edges:
            n = e["node"]
            ref = (n.get("mf_postcard") or {}).get("reference") or (n.get("mf_custom") or {}).get("reference")
            if ref and ref.get("type") == "world":
                out[n["id"]] = ref["handle"]
        page += 1
        if not d["products"]["pageInfo"]["hasNextPage"]:
            break
        cursor = d["products"]["pageInfo"]["endCursor"]
        print(f"    page {page} … {len(out)} mapped so far", flush=True)
    print(f"    mapped {len(out)} products to worlds")
    return out


# ---- 2) sum units sold in window ------------------------------------------
def fetch_units_sold(product_to_world):
    """Iterate orders created in last WINDOW_DAYS, sum line-item quantities per world."""
    since = (datetime.now(timezone.utc) - timedelta(days=WINDOW_DAYS)).strftime("%Y-%m-%d")
    print(f"[2/3] Summing units sold since {since} (window = {WINDOW_DAYS}d)…", flush=True)
    units = defaultdict(int)
    cursor = None
    page = 0
    # Cancelled and refunded orders excluded
    q = """
    query($cursor: String, $query: String!) {
      orders(first: 100, after: $cursor, query: $query, sortKey: CREATED_AT, reverse: true) {
        pageInfo { hasNextPage endCursor }
        edges { node {
          id
          lineItems(first: 50) {
            edges { node {
              quantity
              product { id }
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
                wh = product_to_world.get(pid)
                if not wh:
                    continue
                units[wh] += ln["quantity"]
        page += 1
        if not d["orders"]["pageInfo"]["hasNextPage"]:
            break
        cursor = d["orders"]["pageInfo"]["endCursor"]
        if page % 5 == 0:
            print(f"    page {page} … {sum(units.values())} units counted so far", flush=True)
    print(f"    counted {sum(units.values())} units across {len(units)} worlds")
    return units


# ---- 3) write rank + score back to each world metaobject ------------------
def fetch_world_entries():
    """Return list of (gid, handle)."""
    print("[3/3] Fetching world metaobjects + writing rank/score…", flush=True)
    out = []
    cursor = None
    q = """
    query($cursor: String) {
      metaobjects(type: "world", first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges { node { id handle } }
      }
    }"""
    while True:
        d = call(q, {"cursor": cursor})
        for e in d["metaobjects"]["edges"]:
            out.append((e["node"]["id"], e["node"]["handle"]))
        if not d["metaobjects"]["pageInfo"]["hasNextPage"]:
            break
        cursor = d["metaobjects"]["pageInfo"]["endCursor"]
    return out

def write_rank_score(world_id, rank, score):
    m = """
    mutation upd($id: ID!, $fields: [MetaobjectFieldInput!]!) {
      metaobjectUpdate(id: $id, metaobject: { fields: $fields }) {
        metaobject { id }
        userErrors { field message code }
      }
    }"""
    v = {
        "id": world_id,
        "fields": [
            {"key": "popularity_rank",  "value": str(rank)},
            {"key": "popularity_score", "value": str(score)},
        ],
    }
    d = call(m, v)
    errs = d["metaobjectUpdate"]["userErrors"]
    if errs:
        raise RuntimeError(f"update failed for {world_id}: {errs}")


def main():
    dry = "--dry-run" in sys.argv
    p2w = fetch_product_world_map()
    units = fetch_units_sold(p2w)
    worlds = fetch_world_entries()

    # Score every world (worlds with no sales get 0). Sort desc.
    scored = []
    for gid, handle in worlds:
        scored.append((gid, handle, units.get(handle, 0)))
    scored.sort(key=lambda x: (-x[2], x[1]))

    print("\nRanking:")
    print(f"  {'rank':>4}  {'units':>5}  handle")
    for i, (gid, handle, score) in enumerate(scored, 1):
        print(f"  {i:>4}  {score:>5}  {handle}")

    if dry:
        print("\n--dry-run: not writing back.")
        return

    print("\nWriting rank + score back to metaobjects…")
    for i, (gid, handle, score) in enumerate(scored, 1):
        write_rank_score(gid, i, score)
        time.sleep(0.25)  # be polite
    print("Done.")


if __name__ == "__main__":
    main()
