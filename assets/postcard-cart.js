(function () {
  if (window.PostcardCart) return;

  const CART_DRAWER_SELECTOR = 'cart-drawer';
  const CART_BUBBLE_SELECTOR = '#cart-icon-bubble';

  async function refreshDrawer() {
    const r = await fetch('/?sections=cart-drawer');
    if (!r.ok) return;
    const data = await r.json();
    const drawer = document.querySelector(CART_DRAWER_SELECTOR);
    if (!drawer || !data['cart-drawer']) return;

    const parsed = new DOMParser().parseFromString(data['cart-drawer'], 'text/html');
    const newDrawerEl = parsed.querySelector('cart-drawer');
    const newInner = parsed.querySelector('.drawer__inner');
    const curInner = drawer.querySelector('.drawer__inner');
    if (!newInner || !curInner) return;

    curInner.innerHTML = newInner.innerHTML;
    if (newDrawerEl && newDrawerEl.classList.contains('is-empty')) {
      drawer.classList.add('is-empty');
    } else {
      drawer.classList.remove('is-empty');
    }

    if (window.Alpine && typeof window.Alpine.initTree === 'function') {
      window.Alpine.initTree(curInner);
    }

    const overlay = drawer.querySelector('#CartDrawer-Overlay');
    if (overlay && typeof drawer.close === 'function') {
      overlay.addEventListener('click', () => drawer.close());
    }
  }

  async function refreshBag() {
    try {
      const cart = await (await fetch('/cart.js')).json();
      document.querySelectorAll('[data-pc-cart-count]').forEach((el) => {
        el.textContent = String(cart.item_count);
      });
    } catch (_) {}
  }

  async function addItem(formData) {
    const r = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Accept': 'application/javascript' },
      body: formData
    });
    const data = await r.json();
    if (!r.ok) {
      const msg = data && (data.description || data.message) || 'Add to cart failed';
      throw new Error(msg);
    }
    await Promise.all([refreshDrawer(), refreshBag()]);

    const item = (data.items && data.items[0]) || data;
    window.dispatchEvent(new CustomEvent('pc-just-added', {
      detail: {
        product_title: item.product_title || item.title || '',
        variant_title: item.variant_title || '',
        image: item.image || ''
      }
    }));

    const drawer = document.querySelector(CART_DRAWER_SELECTOR);
    if (drawer && typeof drawer.open === 'function') drawer.open();
    return data;
  }

  async function updateLine(key, qty) {
    const r = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: qty })
    });
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      throw new Error(err.description || 'Cart update failed');
    }
    await Promise.all([refreshDrawer(), refreshBag()]);
  }

  document.addEventListener('submit', async (e) => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.classList.contains('pc-pdp-buy__form')) return;
    e.preventDefault();
    const cta = form.querySelector('button[type="submit"]');
    const ctaText = cta ? cta.textContent : '';
    if (cta) {
      cta.disabled = true;
      cta.dataset.pcOriginalText = ctaText;
      cta.textContent = 'Adding…';
    }
    try {
      await addItem(new FormData(form));
    } catch (err) {
      console.error('[postcard-cart] add failed', err);
      window.location.assign('/cart');
    } finally {
      if (cta) {
        cta.disabled = false;
        cta.textContent = cta.dataset.pcOriginalText || ctaText;
      }
    }
  }, true);

  // Smile VIP — auto-apply free-shipping discount code for Villa tier when
  // window.PostcardCustomer.villaShippingCode is non-empty. Skipped if the
  // merchant prefers an automatic discount tied to a customer segment.
  let villaApplied = false;
  async function tryApplyVillaShipping() {
    if (villaApplied) return;
    const c = window.PostcardCustomer;
    if (!c || !c.isVilla || !c.villaShippingCode) return;
    villaApplied = true;
    try {
      const cart = await (await fetch('/cart.js')).json();
      if ((cart.discount_codes || []).some(d => d.code === c.villaShippingCode && d.applicable)) return;
      await fetch('/cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ discount: c.villaShippingCode })
      });
      await Promise.all([refreshDrawer(), refreshBag()]);
    } catch (e) {
      villaApplied = false;
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryApplyVillaShipping);
  } else {
    tryApplyVillaShipping();
  }

  window.PostcardCart = { addItem, updateLine, refreshDrawer, refreshBag, tryApplyVillaShipping };
})();
