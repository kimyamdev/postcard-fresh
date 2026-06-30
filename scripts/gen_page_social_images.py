#!/usr/bin/env python3
"""
Generate branded social-share (og:image) cards for WORLD landing pages.

For every page whose handle matches a world metaobject handle (e.g.
/pages/hotel-lobby -> world "hotel-lobby"), build a 1200x630 white card with
that world's stamp centred, upload it to Shopify Files, and set the page's
custom.social_image metafield. Flattened/opaque + landscape so WhatsApp etc.
actually render it (the raw stamp PNGs are transparent + portrait, which don't).

Reuses the upload/compose helpers from gen_social_images.py.

Run:
  python3 scripts/gen_page_social_images.py --dry-run        # list matched pages
  python3 scripts/gen_page_social_images.py --preview        # save cards to /tmp
  python3 scripts/gen_page_social_images.py --handle moon-bloom
  python3 scripts/gen_page_social_images.py                  # all matched pages
"""
import io, os, sys, time
sys.path.insert(0, os.path.dirname(__file__))
import gen_social_images as g
from PIL import Image

CANVAS_W, CANVAS_H = 1200, 630
STAMP_H = 520  # stamp height on the card; width scales


def fetch_world_stamps():
    """{world_handle -> stamp_url} for worlds that have a stamp."""
    out = {}
    cursor = None
    q = """
    query($cursor: String) {
      metaobjects(type: "world", first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges { node {
          handle
          stamp: field(key: "world_stamp") { reference { ... on MediaImage { image { url } } ... on GenericFile { url } } }
        } }
      }
    }"""
    while True:
        d = g.call(q, {"cursor": cursor})
        for e in d["metaobjects"]["edges"]:
            n = e["node"]
            ref = (n.get("stamp") or {}).get("reference") or {}
            url = (ref.get("image") or {}).get("url") or ref.get("url")
            if url:
                out[n["handle"]] = url
        if not d["metaobjects"]["pageInfo"]["hasNextPage"]:
            break
        cursor = d["metaobjects"]["pageInfo"]["endCursor"]
    return out


def fetch_pages():
    """[{gid, handle, title}] for all pages."""
    out = []
    cursor = None
    q = """
    query($cursor: String) {
      pages(first: 100, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        edges { node { id handle title } }
      }
    }"""
    while True:
        d = g.call(q, {"cursor": cursor})
        for e in d["pages"]["edges"]:
            n = e["node"]
            out.append({"gid": n["id"], "handle": n["handle"], "title": n["title"]})
        if not d["pages"]["pageInfo"]["hasNextPage"]:
            break
        cursor = d["pages"]["pageInfo"]["endCursor"]
    return out


def compose(stamp_url):
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (255, 255, 255, 255))
    st = g.fetch_image(stamp_url, width=600)
    w = max(1, round(st.width * (STAMP_H / st.height)))
    st = st.resize((w, STAMP_H), Image.LANCZOS)
    canvas.alpha_composite(st, ((CANVAS_W - w) // 2, (CANVAS_H - STAMP_H) // 2))
    out = Image.new("RGB", (CANVAS_W, CANVAS_H), (255, 255, 255))
    out.paste(canvas, (0, 0), canvas)
    buf = io.BytesIO()
    out.save(buf, "JPEG", quality=88, optimize=True)
    return buf.getvalue()


def main():
    args = sys.argv[1:]
    preview = "--preview" in args
    dry = "--dry-run" in args
    only = None
    for i, a in enumerate(args):
        if a == "--handle" and i + 1 < len(args):
            only = args[i + 1]

    stamps = fetch_world_stamps()
    pages = fetch_pages()
    matched = [p for p in pages if p["handle"] in stamps]
    if only:
        matched = [p for p in matched if p["handle"] == only]
    print(f"{len(stamps)} worlds with stamps, {len(pages)} pages, {len(matched)} matched world page(s).")

    if dry:
        for p in matched:
            print(f"  /pages/{p['handle']}  ({p['title']})")
        missing = [h for h in stamps if h not in {p['handle'] for p in pages}]
        if missing:
            print(f"  (worlds with no matching page: {', '.join(sorted(missing))})")
        return

    for i, p in enumerate(matched, 1):
        try:
            data = compose(stamps[p["handle"]])
            fname = f"social-page-{p['handle']}.jpg"
            if preview:
                path = os.path.join("/tmp", fname)
                with open(path, "wb") as fh:
                    fh.write(data)
                print(f"[{i}/{len(matched)}] preview -> {path}")
                continue
            t = g.staged_target(fname)
            g.upload_bytes(t, data, fname)
            gid = g.file_create(t["resourceUrl"], alt=f"{p['title']} — share image")
            g.wait_ready(gid)
            g.set_metafield(p["gid"], gid)
            print(f"[{i}/{len(matched)}] {p['handle']} -> set social_image", flush=True)
            time.sleep(0.3)
        except Exception as e:
            print(f"[{i}/{len(matched)}] {p['handle']} FAILED: {e}", flush=True)
    print("Done.")


if __name__ == "__main__":
    main()
