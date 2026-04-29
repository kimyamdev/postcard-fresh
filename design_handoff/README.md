# Handoff: Postcard SG — Shopify Custom Theme

## Overview

Postcard is a Singapore-based personal-care brand built around **22 named "worlds"** (scent + mood universes like *Hotel Lobby*, *Moon Bloom*, *Coconut Beach*). The same scent worlds map across many product formats — body wash, shampoo, deodorant, soap bars, fragrance, treatment serums, gifts. The brand identity is **postal/postcard**: ink black on antique cream, vintage yellow accents, typewriter + condensed-headline + script type, postmarks, stamps, dashed lines, and physical-mail metaphors throughout.

The site has been prototyped end-to-end in HTML/React. This handoff package contains the full prototype plus the spec a developer using Claude Code needs to recreate it as a **custom Shopify theme** (Liquid + Dawn-style structure, or Hydrogen if going headless).

---

## About the Design Files

The files in `prototype/` are **design references created in HTML + inline-Babel JSX** — high-fidelity prototypes showing intended look, layout, copy, and behavior. They are **not production code to copy directly**.

Your task is to **recreate these designs in a Shopify custom theme** using:
- **Liquid** templates and sections (`sections/`, `templates/`, `snippets/`)
- **Theme settings** (`config/settings_schema.json`) for the color/type tokens
- **CSS** in `assets/` (the design tokens map cleanly to CSS custom properties)
- **JS** for interactive components (Alpine.js or vanilla — minimal needed)
- **Metafields** for the "world" taxonomy (each product belongs to a world)
- **Native Shopify Subscriptions** API for the subscription page

Do not paste the JSX into the theme. Read the JSX as a spec, then build it Shopify-native.

---

## Fidelity

**High-fidelity.** Final colors, typography, spacing, copy, layout, and component variants are all locked. Recreate pixel-perfectly using the tokens in `prototype/styles/tokens.css` (verbatim) and the layout patterns in each page JSX.

Where the prototype uses placeholder image divs (class `.ph` / `.ph--world`), substitute real product photography from Shopify product media. The placeholder treatment (subtle striped beige) can be kept as a fallback for missing images.

---

## Pages / Templates

Each page below maps to a Shopify template. Path conventions are Dawn-style.

### 1. Home — `templates/index.json`
**Source:** `prototype/app/page-home.jsx`
**Purpose:** Brand introduction; route to worlds, products, story.
**Sections needed:**
- `postcard-hero` (large display headline + stamp stack + CTA)
- `worlds-marquee` (horizontally scrolling world stamps; data from a metaobject)
- `featured-products` (uses Shopify product list)
- `editorial-strip` (image + copy)
- `subscription-teaser`
- `journal-feed` (Shopify blog)

### 2. Worlds Index — `templates/page.worlds.liquid`
**Source:** `WorldsIndex` in `prototype/app/page-static.jsx`
**Purpose:** Browse all 22 worlds in a stamp grid.
**Implementation:** Use a **`world` metaobject** with fields: `name`, `slug`, `family`, `tag`, `color` (hex), `theme_class`. Loop in Liquid.

### 3. World Page — `templates/page.world.liquid` (one template, parameterized)
**Source:** `prototype/app/page-world-pdpa.jsx`
**Purpose:** A single world's landing — the scent story + every product available in that world.
**Implementation:**
- World data from the `world` metaobject (selected via the page's metafield reference).
- Products in the world come from a Shopify **collection** tagged with the world slug (or via a metafield on the product).
- Apply the world theme by setting `class="world-{{ world.theme_class }}"` on the `<main>` — `--world-color` cascades.

### 4. Product Templates — `templates/product.{type}.liquid`
There are **7 product types**, each with its own template because the buying decision differs by category.
**Sources:**
- `product.scent.liquid` ← `PDPA` in `page-world-pdpa.jsx`
- `product.active.liquid` ← `PDPB` in `page-pdp-coll.jsx` *(treatment-led; lead with active ingredients)*
- `product.gift.liquid` ← `PDPC` in `page-pdp-coll.jsx`
- `product.deo.liquid` ← `PDPD` in `page-pdp-coll.jsx`
- `product.bar.liquid` ← `PDPE` in `page-pdp-e.jsx` *(format proof — lather, longevity)*
- `product.wash.liquid` ← `PDPF` in `page-pdp-fg.jsx` *(refill maths front and centre)*
- `product.shampoo.liquid` ← `PDPG` in `page-pdp-fg.jsx` *(hair-type matrix)*

Assign templates via the product's "Theme template" field. Each template renders a different hero + spec layout but shares atoms: `PDPReviews`, `PDPFAQ`, `Stamp`, `ProductCard`.

### 5. Collection Pages — `templates/collection.liquid`
**Sources:** `CollectionType`, `CollectionGifts` in `prototype/app/page-pdp-coll.jsx`
**Purpose:** Browse by type (wash, shampoo, etc.) or by gift occasion. Uses Shopify collection + filter API.

### 6. Subscriptions — `templates/page.subscriptions.liquid`
**Source:** `prototype/app/page-subscriptions.jsx`
**Purpose:** Explain the subscription model + showcase popular subscribable products.
**Sections:** hero with stacked postcards, 4-step "How it works", 3-up perks (dark), no-hostages strip, popular products grid, discovery box CTA, annual maths comparison table, testimonial, FAQ accordion, final CTA.
**Shopify integration:** Use the **Shopify Subscriptions API** (or a partner app like Recharge/Bold). Wire "Subscribe & save 15%" to actual selling plans. Pull the "popular" list from a metaobject curated by ops, or from products tagged `subscribable`.

### 7. Static / Story Pages
**Source:** `prototype/app/page-static.jsx`
- `templates/page.about.liquid` ← `About`
- `templates/page.membership.liquid` ← `Membership` (loyalty — coins, tiers)
- `templates/page.refill.liquid` ← `Refill` (refill program, in-store + mail-back)
- `templates/page.corporate.liquid` ← `Corporate` (B2B / gifting)
- `templates/page.flagship.liquid` ← `prototype/app/page-flagship.jsx` (Orchard flagship store page — visit info, services, events)

### 8. Sitemap (internal navigation aid only)
`prototype/app/page-sitemap.jsx` is a developer tool for navigating the prototype. **Do not ship.**

---

## Global Components (snippets)

These appear across many templates. Build as `snippets/`:

- `snippets/topnav.liquid` ← `TopNav` in `app/atoms.jsx` — sticky header with: logo, mega-menu for Shop (by type / by world / by world preview), Refill, Subscribe, Members, About, Corporate, Search, Account, Bag.
- `snippets/footer.liquid` ← `Footer` in `app/atoms.jsx` — newsletter capture, four link columns (Shop / Worlds / Discover / Help & Legal), trust badges row, copyright.
- `snippets/product-card.liquid` ← `ProductCard` in `app/atoms.jsx`
- `snippets/stamp.liquid` ← `Stamp` in `app/atoms.jsx` (the vertical postage-stamp visual primitive used everywhere)
- `snippets/postmark.liquid` — round rotated badge (the `.postmark` CSS class)
- `snippets/pdp-reviews.liquid` ← `PDPReviews` in PDP files
- `snippets/pdp-faq.liquid` ← `PDPFAQ` in PDP files (accordion)

---

## Design Tokens

**Authoritative source:** `prototype/styles/tokens.css` — copy this into `assets/tokens.css` verbatim (it's pure CSS custom properties, no preprocessing needed).

### Colors
| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#F8F6ED` | Antique White — page background |
| `--color-bg-warm` | `#F2EEDD` | Warmer section background |
| `--color-bg-card` | `#FFFDF4` | Card surfaces |
| `--color-ink` | `#212020` | Ink Black — text + borders |
| `--color-yellow` | `#FFB233` | Vintage Yellow — primary CTA + postmark |
| `--color-blue` | `#80B1C7` | Dusty Blue — secondary accent |
| `--color-grey` | `#C4C5CE` | Sepia Grey — muted UI |
| `--color-line` | `rgba(33,32,32,0.18)` | Hairline borders |
| `--color-line-soft` | `rgba(33,32,32,0.10)` | Softer dividers |

### World accent colors (set per page via class)
| Class | `--world-color` |
|---|---|
| `world-hotel-lobby` | `#E8C36A` |
| `world-coconut-beach` | `#E8B796` |
| `world-bath-house` | `#B07A4E` |
| `world-wild-flowers` | `#C7A8D6` |
| `world-icy-peaks` | `#9CC4D6` |
| `world-woodland` | `#6E7F58` |
| `world-moon-bloom` | `#5C6688` |

Add the remaining 15 worlds as they're defined; the convention is a single muted-saturation hex per world, used as `--world-color` for product imagery tints, stamps, and accents.

### Typography
| Token | Font | Use |
|---|---|---|
| `--font-display` | Special Elite | Eyebrows, postmarks, small caps (typewriter texture) |
| `--font-script` | Caveat | Handwritten accents (sparingly) |
| `--font-headline` | Staatliches | Display headlines (`.h-display`) |
| `--font-body` | Inter | Long-form body |

Load via Google Fonts (preconnect block in the prototype). For Shopify, prefer `font_picker` settings + `font_face` filter so site owner can swap, but **default to these four**.

### Type primitives (CSS classes — keep names)
- `.eyebrow` — 12px, uppercase, 0.18em tracking, `--font-display`
- `.h-display` — Staatliches, uppercase, line-height 0.95
- `.h-typewriter` — Special Elite, line-height 1.15
- `.script` — Caveat

### Spacing / Layout
- `.section` — 96px top/bottom padding
- `.section--tight` — 64px top/bottom padding
- `.container` — max-width 1280px, 32px horizontal padding
- `.container--narrow` — max-width 880px

### Shadows
- `--shadow-stamp` — `4px 4px 0 var(--color-ink)` (offset hard shadow — used on buttons, cards)
- `--shadow-stamp-lg` — `6px 6px 0 var(--color-ink)`

### Buttons
- `.btn` — 2px ink border, yellow fill, 3px hard shadow, on hover translates -2px and shadow grows to 5px. **No border radius.**
- `.btn--ink` — inverted (ink fill, cream text)
- `.btn--ghost` — transparent fill
- `.btn--small` — 9px/14px padding, 12px text
- `.tlink` — text-only link with 1.5px ink underline (typewriter caps)

### Distinctive visual primitives
- **Stamp frame** (`.stamp-frame`) — perforated edges via radial-gradient `::before`/`::after`. See tokens.css for exact gradient.
- **Postmark** (`.postmark`) — circular, rotated -8deg, 1.8px border. Yellow and ink variants. Used as a "stamp of approval" badge throughout.
- **Placeholder world image** (`.ph--world`) — radial gradient mixing `--world-color` with cream + diagonal hatching. **Replace with real product photo in Shopify; keep the class as a fallback.**

---

## Interactions & Behavior

**Mostly server-rendered.** The brand is editorial — minimise client-side JS. Items that DO need JS:

1. **Mega-menu hover** in `TopNav` (Shop and Worlds dropdowns). Use Alpine.js `x-show` + transition.
2. **PDP variant selector** — standard Shopify variant pattern.
3. **PDP FAQ accordion** — `<details>`/`<summary>` is enough; no JS required.
4. **Subscription cadence selector** — standard Shopify selling-plan radio buttons.
5. **Sitemap quick-nav bar** — prototype-only, do not ship.
6. **Hover state on cards** — CSS `transform: translate(-2px, -2px)` on hover. No JS.

**Animations:** `transition: transform 0.12s ease, box-shadow 0.12s ease` on buttons/cards. Respect `prefers-reduced-motion` (already in tokens.css).

**Routing in prototype:** uses URL hash + a custom `navigate(page)` function. In Shopify, replace all `navigate('pdp-a')` calls with real Shopify URLs (`/products/...`, `/collections/...`, `/pages/...`).

---

## Data Model (Shopify metaobjects)

Define these metaobject types in Shopify admin:

### `world` (metaobject)
- `name` — single line text
- `slug` — single line text (matches `theme_class` minus `world-` prefix)
- `family` — single line text (e.g., "Hesperidic Gourmand")
- `tagline` — multi-line text
- `accent_color` — color picker
- `theme_class` — single line text (e.g., `world-hotel-lobby`)
- `hero_image` — file reference
- `notes_top`, `notes_heart`, `notes_base` — rich text or list

### Product metafields
- `product.world` — metaobject reference to `world` (every scented product references one)
- `product.product_type_template` — single line text (`scent` | `active` | `gift` | `deo` | `bar` | `wash` | `shampoo`) — drives template selection
- `product.subscribable` — boolean
- `product.refillable` — boolean
- `product.refill_savings_pct` — number (e.g., 30 for "save 30% with refill")

### Subscription
Use Shopify's native **Subscriptions** app (or Recharge). Selling plan: 15% off, cadences 30/60/90 days. The Subscriptions page hard-references this discount.

---

## Copy

**All headline and body copy in the prototype is final** — read it from the JSX and ship as-is unless the brand team revises. The voice is wry, generous, slightly literary; never marketing-speak. Examples to match in tone:
- "Set it. Forget it. Save 15%."
- "Skip a month. Swap your world. Pause for a holiday. Cancel because you've finally cleared your bathroom shelf."
- "We treat your subscription like a houseplant: yours to water, yours to give away."

---

## Prototype Files (in `prototype/`)

```
prototype/
├── Postcard Site Exploration.html   # Entry point — open this in a browser
├── styles/
│   └── tokens.css                   # ★ THE source of truth for colors/type/spacing
└── app/
    ├── atoms.jsx                    # WORLDS data, ALL_22 list, Stamp, ProductCard, TopNav, Footer
    ├── page-home.jsx                # Home
    ├── page-world-pdpa.jsx          # World page + PDP A (scent)
    ├── page-pdp-coll.jsx            # PDPs B/C/D + Collection pages
    ├── page-pdp-e.jsx               # PDP E (bar)
    ├── page-pdp-fg.jsx              # PDPs F/G (wash, shampoo) + shared PDPReviews/PDPFAQ
    ├── page-static.jsx              # About, Membership, Refill, Corporate, WorldsIndex
    ├── page-subscriptions.jsx       # Subscriptions page (newest)
    ├── page-flagship.jsx            # Orchard flagship store page
    └── page-sitemap.jsx             # Dev nav — DO NOT SHIP
```

**To preview the prototype locally:** open `prototype/Postcard Site Exploration.html` in a modern browser. The bottom bar lets you jump between every screen. URL hash reflects the current page (e.g. `#subscriptions`).

---

## Recommended Build Order (for Claude Code)

1. **Theme scaffolding + tokens** — set up Dawn-derived theme, drop `tokens.css` into `assets/`, wire global type via `theme.liquid`.
2. **Snippets** — `topnav`, `footer`, `stamp`, `postmark`, `product-card`, `pdp-reviews`, `pdp-faq`. Get the visual atoms right before any page.
3. **Home + Worlds Index** — proves the editorial vocabulary works in Liquid.
4. **One World page + one PDP** — pick `Hotel Lobby` + the wash template. Validates the metaobject + theme-class cascade.
5. **Remaining 6 PDP templates** — they share atoms; differences are in the hero + spec section.
6. **Collection templates** — by-type and by-gift flavours.
7. **Static pages** — About, Membership, Refill, Corporate, Flagship.
8. **Subscriptions** — last because it depends on the Shopify Subscriptions app being installed and selling plans being configured.

---

## Notes

- **Do not invent new colors** — every color used appears in `tokens.css`. World-specific accents come from the metaobject.
- **Do not add icon libraries** — the design uses zero icon-font icons. Visual interest comes from postmarks, stamps, type, and dashed/perforated borders.
- **Image strategy:** real product photography on cream sweep backgrounds. The `.ph--world` placeholder gives the desired *fallback* aesthetic if a product image is missing.
- **Accessibility:** all hard ink/cream contrast passes AAA. Yellow on ink passes AA large. Avoid yellow on cream for body text.
- **Mobile:** the prototype is desktop-first. Sections collapse to single-column at <800px; the page-bar tightens. Do a mobile design pass before launch.
