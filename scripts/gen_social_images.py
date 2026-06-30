#!/usr/bin/env python3
"""
Generate branded social-share (og:image) cards for products that belong to a
world, and set each product's custom.social_image metafield to the result.

Each card = 1200x630 white canvas + the product's main image (fit, centered) +
the world's stamp illustration in the top-right corner. The theme's meta-tags
already prefer custom.social_image, so once set these become the WhatsApp /
Facebook / X preview images automatically.

A world is resolved from product.metafields.postcard.world (preferred) or
custom.world; the stamp is the world metaobject's world_stamp image.

Run:
  python3 scripts/gen_social_images.py --preview --handle <handle>   # save locally, no upload
  python3 scripts/gen_social_images.py --handle <handle>             # one product, full
  python3 scripts/gen_social_images.py --limit 5                     # first 5 eligible
  python3 scripts/gen_social_images.py                               # all eligible
  python3 scripts/gen_social_images.py --dry-run                     # list only

Reads creds from env/shopify.env. Needs Pillow (stdlib otherwise).
Note: re-runs upload NEW files to Shopify Files (old ones are left orphaned).
"""
import io, json, os, sys, time, urllib.request, urllib.error
from PIL import Image, ImageDraw, ImageFont

CANVAS_W, CANVAS_H = 1200, 630
PROD_MAX_W, PROD_MAX_H = 460, 410   # product image fit box
PROD_CENTER_Y = 232                  # product vertical centre (room for caption)
STAMP_W = 180                        # stamp width; height scales
STAMP_PAD = 40                       # padding from top + right edges
BG = (255, 255, 255)
INK = (33, 32, 31)
FONT_PATH = os.path.join(os.path.dirname(__file__), "fonts", "SpecialElite-Regular.ttf")


def hex_to_rgb(h, default=INK):
    if not h:
        return default
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    try:
        return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
    except Exception:
        return default


def draw_caption(img, name, family, accent=INK):
    """World name + scent family, centred near the bottom in the brand font."""
    draw = ImageDraw.Draw(img)
    if name:
        nf = ImageFont.truetype(FONT_PATH, 40)
        nx = (img.width - draw.textlength(name, font=nf)) / 2
        draw.text((nx, 484), name, font=nf, fill=INK)
    if family:
        ff = ImageFont.truetype(FONT_PATH, 20)
        fam = family.upper()
        track = 4
        total = sum(draw.textlength(c, font=ff) for c in fam) + track * (len(fam) - 1)
        x = (img.width - total) / 2
        for c in fam:
            draw.text((x, 544), c, font=ff, fill=accent)
            x += draw.textlength(c, font=ff) + track

# ---- creds ----------------------------------------------------------------
ENV_PATH = os.path.join(os.path.dirname(__file__), "..", "env", "shopify.env")
env = {}
with open(ENV_PATH) as f:
    for line in f:
        if "=" in line and not line.startswith("#"):
            k, v = line.strip().split("=", 1)
            env[k] = v
URL = f"https://{env['SHOPIFY_STORE_URL']}/admin/api/{env['SHOPIFY_API_VERSION']}/graphql.json"
HEADERS = {"X-Shopify-Access-Token": env["SHOPIFY_ACCESS_TOKEN"], "Content-Type": "application/json"}
UA = {"User-Agent": "Mozilla/5.0 (Postcard social-image generator)"}


def call(query, variables=None, retries=4):
    body = {"query": query}
    if variables is not None:
        body["variables"] = variables
    for attempt in range(retries):
        req = urllib.request.Request(URL, data=json.dumps(body).encode(), headers=HEADERS)
        try:
            r = json.load(urllib.request.urlopen(req))
            if r.get("errors"):
                if any("THROTTLED" in (e.get("extensions", {}).get("code", "") or "") for e in r["errors"]) and attempt < retries - 1:
                    time.sleep(2 ** attempt); continue
                raise RuntimeError(r["errors"])
            return r["data"]
        except urllib.error.HTTPError:
            if attempt < retries - 1:
                time.sleep(2 ** attempt); continue
            raise


def fetch_image(url, width=None):
    if width:
        url = url + ("&" if "?" in url else "?") + f"width={width}"
    req = urllib.request.Request(url, headers=UA)
    return Image.open(io.BytesIO(urllib.request.urlopen(req).read())).convert("RGBA")


# ---- 1) eligible products -------------------------------------------------
def fetch_products():
    """Yield dicts {gid, handle, title, img_url, stamp_url} for world products."""
    out = []
    cursor = None
    q = """
    query($cursor: String) {
      products(first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges { node {
          id handle title
          featuredImage { url }
          pw: metafield(namespace: "postcard", key: "world") { reference { ... on Metaobject {
            handle
            name: field(key: "name") { value }
            family: field(key: "family") { value }
            accent: field(key: "accent_color") { value }
            stamp: field(key: "world_stamp") { reference { ... on MediaImage { image { url } } ... on GenericFile { url } } }
          } } }
          cw: metafield(namespace: "custom", key: "world") { reference { ... on Metaobject {
            handle
            name: field(key: "name") { value }
            family: field(key: "family") { value }
            accent: field(key: "accent_color") { value }
            stamp: field(key: "world_stamp") { reference { ... on MediaImage { image { url } } ... on GenericFile { url } } }
          } } }
        } }
      }
    }"""
    while True:
        d = call(q, {"cursor": cursor})
        for e in d["products"]["edges"]:
            n = e["node"]
            ref = (n.get("pw") or {}).get("reference") or (n.get("cw") or {}).get("reference")
            if not ref:
                continue
            stamp_ref = (ref.get("stamp") or {}).get("reference") or {}
            stamp_url = (stamp_ref.get("image") or {}).get("url") or stamp_ref.get("url")
            img_url = (n.get("featuredImage") or {}).get("url")
            if not stamp_url or not img_url:
                continue
            out.append({"gid": n["id"], "handle": n["handle"], "title": n["title"],
                        "img_url": img_url, "stamp_url": stamp_url, "world": ref["handle"],
                        "name": (ref.get("name") or {}).get("value"),
                        "family": (ref.get("family") or {}).get("value"),
                        "accent": hex_to_rgb((ref.get("accent") or {}).get("value"))})
        if not d["products"]["pageInfo"]["hasNextPage"]:
            break
        cursor = d["products"]["pageInfo"]["endCursor"]
    return out


# ---- 2) compose the card --------------------------------------------------
def compose(img_url, stamp_url, name=None, family=None, accent=INK):
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), BG + (255,))
    # product image, fit + centred in the upper area (caption sits below)
    prod = fetch_image(img_url, width=900)
    scale = min(PROD_MAX_W / prod.width, PROD_MAX_H / prod.height)
    pw, ph = max(1, round(prod.width * scale)), max(1, round(prod.height * scale))
    prod = prod.resize((pw, ph), Image.LANCZOS)
    canvas.alpha_composite(prod, ((CANVAS_W - pw) // 2, max(24, PROD_CENTER_Y - ph // 2)))
    # world stamp, top-right
    stamp = fetch_image(stamp_url, width=400)
    sh = max(1, round(stamp.height * (STAMP_W / stamp.width)))
    stamp = stamp.resize((STAMP_W, sh), Image.LANCZOS)
    canvas.alpha_composite(stamp, (CANVAS_W - STAMP_W - STAMP_PAD, STAMP_PAD))
    out = Image.new("RGB", (CANVAS_W, CANVAS_H), BG)
    out.paste(canvas, (0, 0), canvas)
    draw_caption(out, name, family, accent)
    buf = io.BytesIO()
    out.save(buf, "JPEG", quality=86, optimize=True)
    return buf.getvalue()


# ---- 3) upload to Shopify Files + set metafield ---------------------------
def staged_target(filename):
    m = """
    mutation($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets { url resourceUrl parameters { name value } }
        userErrors { field message }
      }
    }"""
    v = {"input": [{"filename": filename, "mimeType": "image/jpeg", "resource": "FILE", "httpMethod": "POST"}]}
    d = call(m, v)
    errs = d["stagedUploadsCreate"]["userErrors"]
    if errs:
        raise RuntimeError(f"stagedUploadsCreate: {errs}")
    return d["stagedUploadsCreate"]["stagedTargets"][0]


def upload_bytes(target, data, filename):
    boundary = "----postcardsocial" + str(len(data))
    pre = []
    for p in target["parameters"]:
        pre.append("--" + boundary)
        pre.append('Content-Disposition: form-data; name="%s"' % p["name"])
        pre.append("")
        pre.append(p["value"])
    pre.append("--" + boundary)
    pre.append('Content-Disposition: form-data; name="file"; filename="%s"' % filename)
    pre.append("Content-Type: image/jpeg")
    pre.append("")
    body = ("\r\n".join(pre) + "\r\n").encode() + data + ("\r\n--" + boundary + "--\r\n").encode()
    req = urllib.request.Request(target["url"], data=body,
                                 headers={"Content-Type": "multipart/form-data; boundary=" + boundary})
    urllib.request.urlopen(req).read()


def file_create(resource_url, alt):
    m = """
    mutation($files: [FileCreateInput!]!) {
      fileCreate(files: $files) {
        files { id fileStatus }
        userErrors { field message }
      }
    }"""
    v = {"files": [{"originalSource": resource_url, "contentType": "IMAGE", "alt": alt}]}
    d = call(m, v)
    errs = d["fileCreate"]["userErrors"]
    if errs:
        raise RuntimeError(f"fileCreate: {errs}")
    return d["fileCreate"]["files"][0]["id"]


def wait_ready(file_gid):
    q = """query($id: ID!) { node(id: $id) { ... on MediaImage { fileStatus image { url } } } }"""
    for _ in range(20):
        d = call(q, {"id": file_gid})
        node = d.get("node") or {}
        if node.get("fileStatus") == "READY":
            return (node.get("image") or {}).get("url")
        time.sleep(1.5)
    return None


def set_metafield(product_gid, file_gid):
    m = """
    mutation($mf: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $mf) { metafields { id } userErrors { field message } }
    }"""
    v = {"mf": [{"ownerId": product_gid, "namespace": "custom", "key": "social_image",
                 "type": "file_reference", "value": file_gid}]}
    d = call(m, v)
    errs = d["metafieldsSet"]["userErrors"]
    if errs:
        raise RuntimeError(f"metafieldsSet: {errs}")


def main():
    args = sys.argv[1:]
    preview = "--preview" in args
    dry = "--dry-run" in args
    handle = None
    limit = None
    for i, a in enumerate(args):
        if a == "--handle" and i + 1 < len(args):
            handle = args[i + 1]
        if a == "--limit" and i + 1 < len(args):
            limit = int(args[i + 1])

    print("Fetching world products…", flush=True)
    prods = fetch_products()
    if handle:
        prods = [p for p in prods if p["handle"] == handle]
    if limit:
        prods = prods[:limit]
    print(f"{len(prods)} eligible product(s).")

    if dry:
        for p in prods:
            print(f"  {p['handle']}  (world: {p['world']})")
        return

    for i, p in enumerate(prods, 1):
        try:
            data = compose(p["img_url"], p["stamp_url"], p.get("name"), p.get("family"), p.get("accent", INK))
            fname = f"social-{p['handle']}.jpg"
            if preview:
                path = os.path.join("/tmp", fname)
                with open(path, "wb") as fh:
                    fh.write(data)
                print(f"[{i}/{len(prods)}] preview -> {path}")
                continue
            target = staged_target(fname)
            upload_bytes(target, data, fname)
            gid = file_create(target["resourceUrl"], alt=f"{p['title']} — share image")
            wait_ready(gid)
            set_metafield(p["gid"], gid)
            print(f"[{i}/{len(prods)}] {p['handle']} -> set social_image")
            time.sleep(0.3)
        except Exception as e:
            print(f"[{i}/{len(prods)}] {p['handle']} FAILED: {e}")
    print("Done.")


if __name__ == "__main__":
    main()
