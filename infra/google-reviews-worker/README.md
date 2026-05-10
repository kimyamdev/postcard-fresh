# Google Reviews proxy worker

Tiny Cloudflare Worker that holds the Google Places API key server-side and
returns the flagship's reviews to the Shopify section.

## Why a proxy

Calling Places API directly from the browser would expose the key. Even with
HTTP-referrer restrictions, the key is harvestable. A worker keeps the key in
encrypted secrets and the browser only sees public review JSON.

## One-time setup

1. **Get a fresh API key** in Google Cloud Console
   ([Credentials](https://console.cloud.google.com/apis/credentials)).
   - Application restrictions: **None** (calls come from the worker, not browsers).
   - API restrictions: **Places API (New)** only.
2. **Create the worker** at <https://dash.cloudflare.com> → Workers & Pages →
   Create → Worker. Paste `worker.js` as the code. Deploy.
3. **Add secrets** in the worker's Settings → Variables and Secrets:
   - `API_KEY` = your Google Places API key (encrypted).
   - `PLACE_ID` = `ChIJlTgRmfgZ2jERUGJrCQ-BC0g` (Postcard Orchard).
   - `ALLOWED_ORIGIN` = `https://thisisoasis.myshopify.com` (or your custom
     domain — set to `*` for development only).
4. Copy the worker URL (e.g. `https://google-reviews.<your-sub>.workers.dev`).
   Paste it into the Shopify section setting **Proxy URL**.

## What it returns

```json
{
  "name": "Postcard Orchard",
  "rating": 4.9,
  "total": 142,
  "mapsUri": "https://maps.google.com/?cid=...",
  "reviews": [
    { "author": "...", "photo": "...", "rating": 5,
      "text": "...", "relative": "2 weeks ago", "time": "2025-10-..." }
  ]
}
```

Google returns up to 5 reviews per place — that's a Google API limit, not the
worker's. Edge cache is 15 minutes so the API isn't called on every page view.

## Cost

Cloudflare free tier covers 100k requests/day. Places API "Place Details"
billing is $17 per 1000 calls under the (Place Details — Atmosphere) SKU.
With the 15-min edge cache, a busy store rarely exceeds a few hundred Google
calls/day.
