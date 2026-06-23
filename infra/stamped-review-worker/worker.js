/**
 * Stamped review-submit proxy.
 *
 * The PDP "Write a review" form (snippets/pdp-review-form.liquid) can POST here
 * instead of straight to Stamped. Submitting directly works, but the browser
 * can't read Stamped's cross-origin response (no CORS), so the form is
 * fire-and-forget. This worker forwards the submission server-side and returns
 * Stamped's result WITH CORS headers, so the form can show real success/failure.
 *
 * Secrets / vars (Worker → Settings → Variables and Secrets):
 *   API_KEY         Stamped PUBLIC api key (pubkey-...)        [secret]
 *   STORE_HASH      Stamped store id / sId (e.g. 252274)
 *   ALLOWED_ORIGIN  e.g. https://www.wearepostcard.com  ("*" for dev only)
 */

const PASSTHROUGH = [
  "productId", "author", "email", "location", "reviewRating", "reviewTitle",
  "reviewMessage", "reviewRecommendProduct", "productName", "productSKU",
  "productImageUrl", "productUrl",
];
const REQUIRED = ["productId", "author", "email", "reviewRating", "reviewMessage"];

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);
    if (!env.API_KEY) return json({ ok: false, error: "worker_misconfigured" }, 500, cors);

    // Parse incoming body (FormData or JSON).
    let fields = {};
    try {
      const ct = request.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        fields = await request.json();
      } else {
        const form = await request.formData();
        for (const [k, v] of form.entries()) fields[k] = v;
      }
    } catch (_) {
      return json({ ok: false, error: "bad_request", message: "Could not read your review." }, 400, cors);
    }

    for (const r of REQUIRED) {
      if (fields[r] == null || String(fields[r]).trim() === "") {
        return json({ ok: false, error: "missing_field", field: r, message: "Please fill in all fields." }, 422, cors);
      }
    }

    // Build the Stamped submission (key added server-side).
    const out = new FormData();
    for (const k of PASSTHROUGH) {
      if (fields[k] != null && String(fields[k]) !== "") out.append(k, String(fields[k]));
    }
    if (!fields.reviewTitle) out.append("reviewTitle", String(fields.reviewMessage).slice(0, 60));

    const url = `https://stamped.io/api/reviews3?apiKey=${encodeURIComponent(env.API_KEY)}` +
      (env.STORE_HASH ? `&sId=${encodeURIComponent(env.STORE_HASH)}` : "");

    let upstream, body;
    try {
      upstream = await fetch(url, { method: "POST", body: out });
      body = await upstream.text();
    } catch (e) {
      return json({ ok: false, error: "upstream_unreachable", message: "Reviews service is unavailable — try again shortly." }, 502, cors);
    }

    let parsed = null;
    try { parsed = JSON.parse(body); } catch (_) {}

    const accepted = upstream.ok && parsed && (parsed.id || parsed.reviewMessage);
    if (accepted) {
      return json({ ok: true, id: parsed.id || null }, 200, cors);
    }
    return json(
      { ok: false, error: "rejected", status: upstream.status, message: "We couldn't post your review — please try again." },
      502, cors
    );
  },
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}
