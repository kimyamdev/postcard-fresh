// Cloudflare Worker — Google Places reviews proxy.
//
// Holds the Google Places API key in worker secrets so it never touches
// the browser. Returns a slim JSON payload the Shopify section can render.
//
// Deploy:
//   1. https://dash.cloudflare.com → Workers & Pages → Create → Worker
//   2. Paste this file as the worker code, deploy.
//   3. Settings → Variables → add encrypted secrets:
//        API_KEY        = your Google Places API key
//        PLACE_ID       = ChIJlTgRmfgZ2jERUGJrCQ-BC0g  (default; section can override)
//        ALLOWED_ORIGIN = https://thisisoasis.myshopify.com
//   4. Note the worker URL (e.g. https://google-reviews.<sub>.workers.dev) —
//      paste it into the Shopify section setting "Proxy URL".
//
// Cost: free tier covers ~100k requests/day. The worker also caches each
// place_id response for 15 minutes at the edge, so most page views never
// hit Google.

const FIELD_MASK = 'id,displayName,rating,userRatingCount,reviews,googleMapsUri';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || '';
    const raw = env.ALLOWED_ORIGIN || '*';
    const allowList = raw.split(',').map(s => s.trim()).filter(Boolean);
    const allowAll = allowList.includes('*');
    const allowed = allowAll || allowList.includes(origin);
    const allowOriginHeader = allowAll ? '*' : (allowed ? origin : (allowList[0] || ''));
    const corsHeaders = {
      'access-control-allow-origin': allowOriginHeader,
      'access-control-allow-methods': 'GET, OPTIONS',
      'vary': 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const placeId = url.searchParams.get('place_id') || env.PLACE_ID;
    if (!placeId) {
      return json({ error: 'place_id required' }, 400, corsHeaders);
    }
    if (!env.API_KEY) {
      return json({ error: 'worker missing API_KEY secret' }, 500, corsHeaders);
    }

    const upstream = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
    const r = await fetch(upstream, {
      headers: {
        'X-Goog-Api-Key': env.API_KEY,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      cf: { cacheTtl: 900, cacheEverything: true },
    });

    if (!r.ok) {
      const errText = await r.text();
      return json({ error: 'upstream error', status: r.status, body: errText.slice(0, 400) }, 502, corsHeaders);
    }

    const data = await r.json();
    const slim = {
      name: data.displayName?.text || '',
      rating: data.rating ?? null,
      total: data.userRatingCount ?? 0,
      mapsUri: data.googleMapsUri || '',
      reviews: (data.reviews || []).map(rv => ({
        author: rv.authorAttribution?.displayName || '',
        photo: rv.authorAttribution?.photoUri || '',
        rating: rv.rating ?? null,
        text: rv.text?.text || rv.originalText?.text || '',
        relative: rv.relativePublishTimeDescription || '',
        time: rv.publishTime || '',
      })),
    };

    return json(slim, 200, {
      ...corsHeaders,
      'cache-control': 'public, max-age=300, s-maxage=300',
    });
  },
};

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });
}
