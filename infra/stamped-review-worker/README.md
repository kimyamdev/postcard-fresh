# Stamped review-submit proxy worker

Tiny Cloudflare Worker that forwards PDP review submissions to Stamped and
returns the result **with CORS headers**, so the on-page form can show real
success/failure instead of being fire-and-forget.

## Why a proxy

The form can POST straight to `https://stamped.io/api/reviews3`, and the review
does get created — but Stamped sends no CORS headers, so the browser can't read
the response. The form then can't tell a real submission from a malformed one.
This worker calls Stamped server-side and re-emits the result with
`Access-Control-Allow-Origin`, so the form gets a true `{ ok: true/false }`.

It also keeps the Stamped key out of the theme and does minimal field validation.

## What it returns

```json
{ "ok": true, "id": 162574030 }
```
or, on failure:
```json
{ "ok": false, "error": "missing_field", "field": "email", "message": "Please fill in all fields." }
```

## One-time setup

1. **Create the worker** at <https://dash.cloudflare.com> → Workers & Pages →
   Create → Worker. Paste `worker.js` as the code. Deploy.
2. **Add secrets/vars** in Settings → Variables and Secrets:
   - `API_KEY` = Stamped **public** key `pubkey-...` (env `STAMPED_PUBLIC_KEY`) — set as a Secret.
   - `STORE_HASH` = Stamped store id (env `STAMPED_STORE_HASH`, e.g. `252274`).
   - `ALLOWED_ORIGIN` = `https://www.wearepostcard.com` (your live domain;
     use `*` for development only).
3. Copy the worker URL (e.g. `https://stamped-review.<your-sub>.workers.dev`).
   Paste it into the **PDP Reviews** section setting **Review proxy URL**.

That's it — once the section setting has the proxy URL, the form switches from
fire-and-forget to confirmed submissions automatically. Leave it blank to fall
back to the direct (fire-and-forget) path.

## Test

```bash
curl -i -X POST "https://stamped-review.<your-sub>.workers.dev" \
  -H "Origin: https://www.wearepostcard.com" \
  -F productId=8898085257442 \
  -F author="Worker Test (please reject)" \
  -F email="test@example.com" \
  -F reviewRating=5 \
  -F reviewMessage="Testing the review proxy — please reject."
```
Expect `{ "ok": true, "id": ... }` and an `access-control-allow-origin` header.
Then reject the test review in Stamped moderation.

## Cost

Cloudflare free tier covers 100k requests/day — review submissions are rare, so
this stays comfortably free.
