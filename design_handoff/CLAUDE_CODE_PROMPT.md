# Claude Code — kickoff prompt

Copy-paste the prompt below into Claude Code at the root of your Shopify theme repo. It assumes this `design_handoff_postcard_shopify/` folder is in the repo (or has been placed at a path you can point Claude Code at).

---

## The prompt

> I'm building a custom Shopify theme for **Postcard SG**, a personal-care brand. A complete design handoff lives in `design_handoff_postcard_shopify/`.
>
> **Start by reading these files in order:**
> 1. `design_handoff_postcard_shopify/README.md` — full spec: pages, design tokens, data model, recommended build order
> 2. `design_handoff_postcard_shopify/prototype/styles/tokens.css` — authoritative colors, type, spacing, component primitives (copy verbatim into `assets/tokens.css`)
> 3. `design_handoff_postcard_shopify/prototype/app/atoms.jsx` — global components: TopNav, Footer, Stamp, ProductCard, world data
> 4. `design_handoff_postcard_shopify/prototype/Postcard Site Exploration.html` — entry point; you can open it in a browser to see every screen via the bottom nav bar
>
> **Then propose a build plan** following the recommended order in the README:
> 1. Theme scaffolding + tokens
> 2. Global snippets (topnav, footer, stamp, postmark, product-card, pdp-reviews, pdp-faq)
> 3. Home + Worlds Index
> 4. One world page + one PDP (Hotel Lobby + wash template) — validates metaobject + theme-class cascade
> 5. Remaining 6 PDP templates (scent / active / gift / deo / bar / shampoo)
> 6. Collection templates
> 7. Static pages (About, Membership, Refill, Corporate, Flagship)
> 8. Subscriptions page (last — depends on Shopify Subscriptions app)
>
> **Constraints:**
> - **Liquid + Dawn-style structure** — sections, snippets, templates, `config/settings_schema.json`. Not Hydrogen.
> - The JSX files are a **spec, not source**. Read them, then build native Liquid. Don't paste React into the theme.
> - **Do not invent colors.** Every color comes from `tokens.css` or the per-world metaobject.
> - **Do not add icon libraries** — visual interest is postmarks, stamps, type, dashed borders.
> - Keep client-side JS minimal: Alpine.js for the mega-menu, native `<details>` for FAQ, standard Shopify variant pickers. No SPA.
> - Define the `world` metaobject (and product metafields `world`, `product_type_template`, `subscribable`, `refillable`, `refill_savings_pct`) — these drive template selection and theme cascade.
> - Replace the prototype's hash-based `navigate('pdp-x')` with real Shopify URLs (`/products/...`, `/collections/...`, `/pages/...`).
>
> **Do not ship `prototype/app/page-sitemap.jsx`** — it's a developer navigation aid, not a real page.
>
> Ask me before installing any third-party Shopify apps. For subscriptions, we'll discuss native Shopify Subscriptions vs. Recharge.
>
> Start with step 1 (theme scaffolding + tokens) and confirm before moving to step 2.
