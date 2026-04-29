# Postcard Fresh — Admin guide

How to populate a real product so all PDP sections render dynamically.

The theme reads from **product metafields** first, falling back to **section settings / blocks** in the theme editor, falling back to **hardcoded defaults**. So you can be selective: only fill metafields where you want per-product variation; leave the rest to template defaults.

## Required for every product

Set these on **Products → [your product] → Metafields** in admin:

| Metafield | Type | What it controls | Example |
|---|---|---|---|
| `postcard.world` | World metaobject ref | Cascades the world's accent color + theme class through every section | Hotel Lobby |
| `custom.product_type_template` | Single-line text | Drives template selection (set the matching `Theme template` too) | `wash` / `scent` / `active` / `gift` / `deo` / `bar` / `shampoo` |
| `custom.refillable` | Boolean | Toggles refill banner, "or refill in store" link, refill-able trust disc | true |
| `custom.refill_savings_pct` | Integer 0-100 | Used in refill maths panels & banner copy | 30 |
| `custom.subscribable` | Boolean | Toggles Subscribe & save UI in buy box | true |

Also set the **Theme template** field (Online Store → Theme template) to match `product_type_template` so Shopify routes to the right `templates/product.{type}.json`.

## Top-of-page identity (`pdp` namespace)

| Metafield | Type | Where it shows | Fallback if empty |
|---|---|---|---|
| `pdp.gallery_stamp` | Single-line text | Round postmark overlaid on hero image (top-right of gallery) | The template's hardcoded stamp e.g. `REFILL FOREVER SG`, `HOTEL LOBBY SG` |
| `pdp.ribbon_subline` | Single-line text | Eyebrow next to the color chip in the buy box, after the world name | The template's hardcoded subline e.g. `Hand & Body Wash` |
| `pdp.review_score` | Decimal | Buy box stars + below-fold reviews score | `4.9` |
| `pdp.review_count` | Integer | Buy box `· N reviews` + below-fold "Based on N reviews" | `327` |
| `pdp.verse_quote` | Single-line text | The yellow typewriter quote on the dark verse band | Template's hardcoded quote |

Use `<br>` in `gallery_stamp` to force line breaks, e.g. `REFILL<br>FOREVER<br>SG`.

## Hero ingredient panel

The split image + pull-quote section (3-up alternating). All optional — fill in the ones that matter for this product.

| Metafield | Type | Notes |
|---|---|---|
| `pdp.hero_eyebrow` | Single-line text | Defaults to `Hero ingredient` |
| `pdp.hero_quote` | Single-line text | The big typewriter pull-quote |
| `pdp.hero_body` | Multi-line text | Paragraph below the quote |
| `pdp.hero_image` | File reference (image) | Real product/ingredient photo. If unset, the placeholder `.ph--world` treatment is used |
| `pdp.hero_image_caption` | Single-line text | Used as alt text and as the caption text inside the placeholder when no image |

## Refill banner overrides

Only set these if you want this product's refill banner to differ from the template default.

| Metafield | Type |
|---|---|
| `pdp.refill_eyebrow` | Single-line text |
| `pdp.refill_headline` | Single-line text |
| `pdp.refill_body` | Multi-line text |

The CTAs (button labels + links) stay theme-template-level — edit them in the theme editor.

## Key ingredients list

Lives in a dedicated `pdp_ingredient` metaobject so multiple products can share an ingredient (and so an ingredient's photo updates everywhere at once).

**To populate:**

1. Go to **Settings → Custom data → Metaobjects → PDP Ingredient**.
2. **Add entry** for each ingredient that appears in any product. Fill:
   - Name (required) — e.g. "Sicilian Bergamot"
   - Role — short eyebrow line, e.g. "Cold-pressed in Calabria · 4-month harvest"
   - Story — paragraph explaining what it does
   - Image — macro shot
   - Image caption — alt text
3. On each **product**, set `pdp.ingredients` to the ordered list of these metaobject entries.

Section renders alternating L/R rows in the order you set. If empty, falls back to theme-template section blocks.

## FAQs list

Same pattern via `pdp_faq` metaobject.

1. **Settings → Custom data → Metaobjects → PDP FAQ → Add entry** for each Q+A pair.
2. On the product, set `pdp.faqs` to the ordered list.

The first FAQ renders open by default. Falls back to theme-template blocks if empty.

## Pairs-with (real Shopify products)

`pdp.pairs_with` is a list of product references — pick up to 3 actual products from your catalog. The section reads each linked product's title, price, image, and world to render the cards.

If empty, the section falls back to theme-template blocks (hardcoded names + prices for visual demo).

## What's NOT per-product

These vary by **template type**, not per product. Edit in the theme editor (top-center page selector → Products → pick the template type, e.g. `scent`):

- Refill banner CTAs (button text + links)
- Trust circles row (the 6 postmarks)
- Type-specific repeating content:
  - Scent notes 5-up (`scent`)
  - Benefits 3-up (`active`)
  - Gift contents 4-up (`gift`)
  - Performance stats / wear diary / 4 actives 2x2 / fit row (`deo`)
  - Format proof / fit cards / first-bar field guide / bar method A&B (`bar`)
  - Comparison table / refill ritual 4-step / wash flow / per-wash maths (`shampoo`)

If you want any of these to vary per product, ask and we'll add metaobject + metafield definitions for them.

## Worlds + scent notes

Each `world` metaobject entry has:
- name, slug, family, tagline, accent_color, theme_class, hero_image
- `scent_notes` — list of `scent_note` metaobject references (NEW, this is what the scent breakdown table + scent-notes 5-up grid read from)
- notes_top / notes_heart / notes_base — *legacy* list-of-strings. Kept as a fallback when `scent_notes` is unset on a world; otherwise unused.

Each `scent_note` metaobject entry has:
- `name` (e.g. "Bergamot")
- `subline` (italic small text under the name, e.g. "sparkling citrus")
- `family` (Top / Heart / Base — used to group rows in the world page scent breakdown)
- `color` (hex, used as the tint behind the icon and for the colored circle fallback)
- `icon` (file reference — admin uploads SVG or PNG; if blank, a colored circle with the note's two-letter monogram is shown)
- `description` (optional longer story)

### How to populate

1. **Settings → Custom data → Metaobjects → Scent Note** → **Add entry** for each fragrance note your worlds use. Hotel Lobby's 5 (Bergamot / Orange Blossom / Earl Grey Tea / Apricot / Vanilla) are already seeded with name + subline + family + description; admin uploads the icon files when ready.
2. **Settings → Custom data → Metaobjects → World → [the world]** → set `scent_notes` to the ordered list of relevant scent_note entries.

The scent-breakdown table on the world page groups by family automatically. The 5-up scent-notes grid on the scent PDP shows them in admin-set order.

7 core worlds already exist (Hotel Lobby, Moon Bloom, Coconut Beach, Wild Flowers, Bath House, Woodland Retreat, Icy Peaks). Add the remaining 15 in **Settings → Custom data → Metaobjects → World** when ready.

To create a world's storefront page: **Online Store → Pages → Add page** with handle matching the slug (e.g. `hotel-lobby`), Theme template = `world`, and set the page metafield `custom.world` to point at the right metaobject entry.

## Troubleshooting

**Section renders default copy instead of my metafield value** — confirm the metafield is on the right product (not the variant) and that the value isn't blank. Empty strings still trigger the fallback.

**Image isn't rendering** — make sure `pdp.hero_image` points to an *image* file, not a video or PDF. The metafield accepts any file but the section only knows how to render images.

**Pairs-with shows hardcoded placeholders** — no products are set on `pdp.pairs_with`, or the linked products are unpublished/draft (storefront can't see them).

**Variant pills don't appear** — buy box only shows real variant pills when the product has more than one variant. Single-variant products show three "demo" pills (visual placeholder, non-functional). Add real Shopify variants for them to wire up.

**Subscribe & save row doesn't appear** — the buy box only shows it when `custom.subscribable = true` AND the product has at least one Shopify selling plan attached. Configure subscriptions in the Shopify Subscriptions app first.
