/* PDP-B Active and PDP-C Gift, Collection variants — full anatomy parity with PDP-A */

/* Shared PDP atoms — used by PDP-A, B, C */
function PDPGallery({ worldClass = '', accent = '#E8C36A', stamp = 'POSTCARD\nSG' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 14 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`ph ph--world ${worldClass}`} style={{ aspectRatio: '1/1', fontSize: 8, '--world-color': accent }}>
            <span>img {i+1}</span>
          </div>
        ))}
      </div>
      <div className={`ph ph--world ${worldClass}`} style={{ aspectRatio: '1/1', position: 'relative', '--world-color': accent }}>
        <div className="postmark" style={{ position: 'absolute', top: 24, right: 24 }}><div>{stamp}</div></div>
        <span style={{ opacity: 0.55 }}>product · hero</span>
      </div>
    </div>
  );
}

function PDPBuyBox({ eyebrow, title, subtitle, sizes, price, ribbon }) {
  return (
    <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
      {ribbon}
      <h1 className="h-typewriter" style={{ fontSize: 40, marginTop: 10 }}>{title}</h1>
      <p style={{ marginTop: 8, fontSize: 16, opacity: 0.78 }}>{subtitle}</p>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
        <span style={{ color: 'var(--color-yellow)', WebkitTextStroke: '0.4px #212020' }}>★★★★★</span>
        <span style={{ opacity: 0.7 }}>4.9 · 327 reviews</span>
      </div>

      {sizes && (
        <div style={{ marginTop: 28 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Size</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {sizes.map((v, i) => (
              <div key={v} style={{
                padding: '12px 18px', border: '1.5px solid var(--color-ink)',
                fontFamily: 'var(--font-display)', fontSize: 13,
                background: i === 1 ? 'var(--color-ink)' : 'transparent',
                color: i === 1 ? 'var(--color-bg)' : 'var(--color-ink)',
                cursor: 'pointer',
              }}>{v}</div>
            ))}
          </div>
        </div>
      )}

      <PDPPurchaseOptions price={price} discountPct={10}/>

      <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-ink)' }}>
          <button style={{ all: 'unset', padding: '10px 16px', cursor: 'pointer' }}>−</button>
          <span style={{ padding: '0 14px' }}>1</span>
          <button style={{ all: 'unset', padding: '10px 16px', cursor: 'pointer' }}>+</button>
        </div>
        <button className="btn" style={{ flex: 1, justifyContent: 'center' }}>Add to bag · ${price}</button>
      </div>
      <button className="tlink" style={{ marginTop: 16 }}>Or refill in store →</button>

      <div style={{ marginTop: 18, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3a7a4d' }}>● In stock · ships in 1–2 days</div>

      <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--color-line)', display: 'flex', gap: 18, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {['Made in SG','Refillable','Cruelty-free','Vegan'].map(t => (
          <div key={t} style={{ textAlign: 'center', flex: 1, minWidth: 70 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--color-ink)', margin: '0 auto', background: 'var(--color-bg-card)' }}/>
            <div style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function PDPPurchaseOptions({ price, discountPct = 10 }) {
  const [mode, setMode] = React.useState('once');
  const [interval, setIntervalVal] = React.useState('60d');
  const [open, setOpen] = React.useState(false);
  const subPrice = (price * (1 - discountPct / 100)).toFixed(2);

  const Row = ({ id, label, right, children }) => (
    <label htmlFor={id} style={{
      display: 'block', cursor: 'pointer',
      padding: '18px 20px',
      background: mode === id ? 'var(--color-bg-warm)' : 'transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{
          width: 18, height: 18, borderRadius: '50%',
          border: '1.5px solid var(--color-ink)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          flex: '0 0 auto',
        }}>
          {mode === id && <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--color-ink)' }}/>}
        </span>
        <input type="radio" id={id} name="purchase" checked={mode === id} onChange={() => setMode(id)} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}/>
        <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontSize: 14 }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>{right}</span>
      </div>
      {children}
    </label>
  );

  return (
    <div style={{ marginTop: 28 }}>
      <div className="eyebrow" style={{ marginBottom: 10 }}>Purchase options</div>
      <div style={{ border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}>
        <Row id="once" label="One-time purchase" right={`S$${price}`}/>
        <div style={{ borderTop: '1px dashed var(--color-line)' }}/>
        <Row id="sub" label={`Subscribe & save ${discountPct}%`} right={`S$${subPrice}`}>
          {mode === 'sub' && (
            <div style={{ marginTop: 14, paddingLeft: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="eyebrow" style={{ fontSize: 10 }}>Deliver every</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[['30d','30 days'],['60d','60 days · most popular'],['90d','90 days']].map(([k, t]) => (
                  <button key={k} type="button"
                    onClick={(e) => { e.preventDefault(); setIntervalVal(k); }}
                    style={{
                      all: 'unset', cursor: 'pointer',
                      padding: '8px 12px',
                      border: '1.5px solid var(--color-ink)',
                      fontFamily: 'var(--font-display)', fontSize: 12,
                      background: interval === k ? 'var(--color-ink)' : 'transparent',
                      color: interval === k ? 'var(--color-bg)' : 'var(--color-ink)',
                    }}>{t}</button>
                ))}
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, fontStyle: 'italic', marginTop: 4 }}>
                Skip, swap world, or cancel anytime — no postcards held hostage.
              </div>
            </div>
          )}
        </Row>
      </div>
      <button type="button" onClick={() => setOpen(o => !o)} style={{
        all: 'unset', cursor: 'pointer',
        marginTop: 12,
        fontFamily: 'var(--font-display)', fontSize: 12,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        opacity: 0.75,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>⌄</span>
        About subscriptions
      </button>
      {open && (
        <div style={{ marginTop: 10, padding: 16, background: 'var(--color-bg-warm)', border: '1px dashed var(--color-line)', fontSize: 13, lineHeight: 1.65 }}>
          Always {discountPct}% off. Free shipping over S$60. Skip a delivery, swap to a different world, or cancel from your account in two clicks. Your second order earns you a free Discovery Set in any world you haven't tried yet.
        </div>
      )}
    </div>
  );
}

function PDPVerseBand({ stampName, stampFamily, stampColor, quote }) {
  return (
    <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)', padding: '64px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 48, alignItems: 'center' }}>
        <Stamp name={stampName} family={stampFamily} color={stampColor} size="md"/>
        <p className="h-typewriter" style={{ fontSize: 36, color: 'var(--color-yellow)', lineHeight: 1.3 }}>"{quote}"</p>
      </div>
    </section>
  );
}

function PDPIngredients({ tint, items }) {
  return (
    <section style={{ background: tint || 'var(--color-bg-warm)' }} className="section">
      <div className="container">
        <div className="eyebrow">Three things, beautifully sourced</div>
        <h2 className="h-display" style={{ fontSize: 48, marginTop: 8, marginBottom: 40 }}>Key ingredients.</h2>
        {items.map(([n, src, what], i) => (
          <div key={n} style={{
            display: 'grid', gridTemplateColumns: i % 2 ? '1fr 1.2fr' : '1.2fr 1fr',
            gap: 48, alignItems: 'center', padding: '40px 0',
            borderTop: '1px solid var(--color-line-soft)',
          }}>
            <div className="ph" style={{ aspectRatio: '5/4', order: i % 2 ? 2 : 1 }}><span>{n} · macro</span></div>
            <div style={{ order: i % 2 ? 1 : 2 }}>
              <div className="eyebrow">{src}</div>
              <h3 className="h-typewriter" style={{ fontSize: 36, marginTop: 8 }}>{n}</h3>
              <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6 }}>{what}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PDPHowToUse({ steps }) {
  // steps: array of strings, OR array of [title, body] tuples. Trim to first 3.
  const items = (steps || []).slice(0, 3).map(s => Array.isArray(s) ? s : [s, '']);
  return (
    <section className="section--tight section">
      <div className="container">
        <h2 className="h-display" style={{ fontSize: 44, marginBottom: 40 }}>How to use.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {items.map(([s, p], i) => (
            <div key={s} style={{ textAlign: 'center', padding: '32px 20px', border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}>
              <div className="postmark postmark--ink" style={{
                margin: '0 auto 20px',
                width: 110, height: 110,
                borderWidth: '2.5px',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.18em', opacity: 0.85 }}>STEP</div>
                <div className="h-display" style={{ fontSize: 44, lineHeight: 1, marginTop: 2 }}>0{i+1}</div>
              </div>
              <div className="h-display" style={{ fontSize: 22 }}>{s}.</div>
              {p && <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55, opacity: 0.78, fontFamily: 'var(--font-body)' }}>{p}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PDPRefillBanner({ navigate, headline, body }) {
  return (
    <section style={{ background: 'var(--color-yellow)', borderTop: '1.5px solid var(--color-ink)', borderBottom: '1.5px solid var(--color-ink)', padding: '56px 0' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div className="eyebrow">Refill, repeat, rejoice</div>
          <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>{headline}</h2>
          <p style={{ marginTop: 12, fontSize: 17, maxWidth: 560 }}>{body}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn btn--ink" onClick={()=>navigate('refill')}>See the refill list →</button>
          <button className="tlink">Or shop the matching refill SKU →</button>
        </div>
      </div>
    </section>
  );
}

function PDPTrustStrip() {
  return (
    <section className="section--tight section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 18 }}>
          {['Made in Singapore','Aluminum-free','Vegan','Cruelty-free','Pregnancy-safe','Refillable'].map(t => (
            <div key={t} style={{ textAlign: 'center', padding: 20, border: '1px solid var(--color-line)' }}>
              <div className="postmark" style={{ margin: '0 auto 10px' }}><div>{t.split(' ').slice(0,2).join('\n').toUpperCase()}</div></div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PDPPairsWith({ navigate, heading, items }) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="h-display" style={{ fontSize: 44, marginBottom: 24 }}>{heading}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {items.map(([name, world, color, price]) => (
            <ProductCard key={name} name={name} world={world} world_color={color} price={price} navigate={navigate}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function PDPReviews() {
  return (
    <section style={{ background: 'var(--color-bg-warm)' }} className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48 }}>
          <div>
            <div className="h-display" style={{ fontSize: 96 }}>4.9</div>
            <div style={{ color: 'var(--color-yellow)', fontSize: 22, WebkitTextStroke: '0.6px #212020' }}>★★★★★</div>
            <div style={{ marginTop: 6, opacity: 0.7 }}>Based on 327 reviews</div>
            <div style={{ marginTop: 24, padding: 16, background: 'var(--color-yellow)', border: '1.5px solid var(--color-ink)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Earn 20 coins per review</div>
              <div style={{ marginTop: 4, fontSize: 13 }}>+10 with a photo · +15 with a video</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['Mei L.','Singapore','5 / 5','Honestly the best one I\'ve tried. Friends keep asking what I\'m wearing — and one bought it after one whiff.'],
              ['Aaron','Verified buyer','5 / 5','Refilled mine last week. Same quality, less waste, the staff threw in a coffee.'],
              ['Priya','Verified buyer','5 / 5','Light enough for office, warm enough for evening. My new daily.'],
            ].map(([n, t, r, body]) => (
              <div key={n} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-line)', padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{n} · <span style={{ opacity: 0.7 }}>{t}</span></div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>{r}</div>
                </div>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.55 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PDPFAQ({ items }) {
  return (
    <section className="section--tight section">
      <div className="container">
        <h2 className="h-display" style={{ fontSize: 36, marginBottom: 20 }}>Questions?</h2>
        <div style={{ border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}>
          {items.map(([q, a], i) => (
            <details key={q} style={{ padding: 24, borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--color-line)' }} open={i === 0}>
              <summary style={{ fontFamily: 'var(--font-display)', fontSize: 15, cursor: 'pointer', listStyle: 'none' }}>{q}</summary>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, opacity: 0.85 }}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PDPGallery, PDPBuyBox, PDPPurchaseOptions, PDPVerseBand, PDPIngredients, PDPHowToUse, PDPRefillBanner, PDPTrustStrip, PDPPairsWith, PDPReviews, PDPFAQ });

/* ============================================================
   PDP-B  ·  Active Skincare  (Hyaluronic Heaven Facial Serum)
   ============================================================ */
function PDPB({ navigate }) {
  const accent = '#9CC4D6';
  return (
    <main>
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / Face / Serums / <span style={{ color: 'var(--color-ink)' }}>Hyaluronic Heaven</span></div>
      </div>

      {/* Gallery + Buy box */}
      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
          <PDPGallery accent={accent} stamp={'HYDRATING\nSERUM\nSG'}/>
          <PDPBuyBox
            ribbon={(
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 36, background: accent, border: '1.5px solid var(--color-ink)' }}/>
                <span className="eyebrow">Hyaluronic Heaven · Active skincare</span>
              </div>
            )}
            title="Hyaluronic Heaven Facial Serum"
            subtitle="1.5% multi-weight hyaluronic acid — plumps, hydrates, glows."
            sizes={['15ml','30ml','Refill']}
            price={48}
          />
        </div>
      </section>

      <PDPVerseBand stampName="Hyaluronic Heaven" stampFamily="Active hydration" stampColor={accent} quote="Three depths of hydration. One bottle of glow."/>

      {/* What it does — three benefits */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ display: 'inline-block', padding: '8px 18px', border: '1.5px solid var(--color-ink)', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#9CC4D622' }}>Active hydration</span>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 16 }}>What it does.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['Plumps','+47% surface volume','In 7 days. Independently tested on 32 humans.'],
              ['Hydrates','12-hr lasting hydration','Multi-weight HA holds 1000× its weight in water.'],
              ['Glows','+82% reported "bouncier"','Dermatologist consumer panel · 4 weeks.'],
            ].map(([h, m, p]) => (
              <div key={h} className="stamp-frame stamp-side" style={{ padding: 28, textAlign: 'center', background: 'var(--color-bg-card)' }}>
                <div className="postmark" style={{ margin: '0 auto 14px' }}><div>{h.toUpperCase()}</div></div>
                <h3 className="h-display" style={{ fontSize: 32 }}>{h}.</h3>
                <div style={{ marginTop: 8, fontFamily: 'var(--font-display)', fontSize: 18 }}>{m}</div>
                <p style={{ marginTop: 8, fontSize: 13, opacity: 0.78 }}>{p}</p>
              </div>
            ))}
          </div>
          <p className="h-typewriter" style={{ textAlign: 'center', fontSize: 24, marginTop: 40, maxWidth: 720, marginInline: 'auto', opacity: 0.78 }}>A 1.5%-hyaluronic top-up your skin will write home about.</p>
        </div>
      </section>

      {/* Hero ingredient close-up */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div className="ph" style={{ aspectRatio: '5/4' }}><span>HA molecule · macro</span></div>
          <div>
            <div className="eyebrow">Hero ingredient</div>
            <h2 className="h-typewriter" style={{ fontSize: 40, marginTop: 8 }}>"Three molecular weights of hyaluronic acid, working at three depths."</h2>
            <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.7 }}>Surface plumping you can see. Mid-skin hydration that lasts 12 hours. Deep-layer support that builds over time. One serum, three jobs, no stickiness.</p>
          </div>
        </div>
      </section>

      <PDPIngredients items={[
        ['Multi-weight Hyaluronic','Bio-fermented · Korea, 4 molecular weights','The headline act. Surface plump + mid-skin lock-in + deep-layer support, all in one.'],
        ['Niacinamide 4%','Vitamin B3 derivative · pharmaceutical grade','Brightens, evens tone, reinforces the skin barrier. The quiet hero.'],
        ['Centella Asiatica','Wild-grown · Madagascar tincture','Calms redness and post-acne marks. The reason sensitive skins love this serum.'],
      ]}/>

      {/* Skin-type fit */}
      <section className="section--tight section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 36, marginBottom: 24 }}>Will it suit your skin?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {[['Dry',true],['Combination',true],['Sensitive',true],['Dehydrated',true],['Very oily',false]].map(([t, fit]) => (
              <div key={t} style={{ textAlign: 'center', opacity: fit ? 1 : 0.45 }}>
                <Stamp name={t} color={fit ? accent : '#C4C5CE'} size="sm"/>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{fit ? '✓ great fit' : '— ok, but lighter formula recommended'}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PDPHowToUse steps={[
        ['Cleanse','Pat skin damp — don\'t towel dry. The serum locks better onto wet skin.'],
        ['3–5 drops','Press into face & neck. Don\'t rub — the HA needs a moment to drink in.'],
        ['Lock & layer','Seal with moisturiser. Use AM and PM, before SPF in the morning.'],
      ]}/>

      <PDPRefillBanner navigate={navigate} headline="Bring this bottle back." body="Top up your serum at our Orchard flagship. Less waste, same hydration. Save 20% per refill."/>

      <PDPTrustStrip/>

      <PDPPairsWith navigate={navigate} heading="Pairs with this serum." items={[
        ['Bakuchiol Bay Night Oil','Bakuchiol Bay', '#C7A8D6', 56],
        ['Clear Skies Gentle Cleanser','Clear Skies', accent, 32],
        ['Sunlit Terrace SPF 50','Sunlit Terrace','#FFB233', 38],
      ]}/>

      <PDPReviews/>

      <PDPFAQ items={[
        ['Full ingredients list (INCI)','Aqua, Sodium Hyaluronate (4 molecular weights), Glycerin, Niacinamide, Pentylene Glycol, Panthenol, Centella Asiatica Extract, Allantoin, Sodium PCA, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin, Citric Acid.'],
        ['Free from / Pregnancy-safe?','Free from fragrance, alcohol, essential oils, parabens, sulphates and silicones. Pregnancy and breastfeeding safe.'],
        ['Can I layer it with retinol?','Yes — apply this serum first on damp skin, let it sink in, then apply your retinol on top.'],
        ['How long will one bottle last?','Most customers finish a 30ml bottle in 2 months at AM + PM use.'],
      ]}/>
    </main>
  );
}
window.PDPB = PDPB;

/* ============================================================
   PDP-C  ·  Gift / Bundle  (Destination: Hotel Lobby Travel Gift Box)
   ============================================================ */
function PDPC({ navigate }) {
  const accent = '#E8C36A';
  return (
    <main className="world-hotel-lobby">
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / Gifts / <span style={{ color: 'var(--color-ink)' }}>Destination: Hotel Lobby Travel Gift Box</span></div>
      </div>

      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
          <PDPGallery worldClass="world-hotel-lobby" accent={accent} stamp={'GIFT\nFROM\nSG'}/>
          <PDPBuyBox
            ribbon={(
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 36, background: accent, border: '1.5px solid var(--color-ink)' }}/>
                <span className="eyebrow">Gift Set · Hotel Lobby</span>
              </div>
            )}
            title="Destination: Hotel Lobby Travel Gift Box"
            subtitle="Hand-wrapped in Singapore. Free printed postcard. Same-day pickup at our Orchard flagship if ordered before 2pm."
            sizes={['Original','Lavish (+$30)']}
            price={78}
          />
        </div>
      </section>

      <PDPVerseBand stampName="Hotel Lobby" stampFamily="Hesperidic Gourmand" stampColor={accent} quote="A whole world, packed for travel."/>

      {/* What's inside (PDP-A's "what it smells like" slot, but for a gift) */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ display: 'inline-block', padding: '8px 18px', border: '1.5px solid var(--color-ink)', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'var(--world-tint)' }}>4 pieces · $94 retail · save $16</span>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 16 }}>Inside this gift.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              ['Hand & Body Wash','50ml',24],
              ['Anywhere Fragrance','30ml',32],
              ['Reed Diffuser','mini',26],
              ['Deodorant Stick','mini',12],
            ].map(([p, size, val]) => (
              <div key={p} className="stamp-frame stamp-side" style={{ padding: 18, textAlign: 'center', background: 'var(--color-bg-card)' }}>
                <div className="ph ph--world" style={{ aspectRatio: '1/1', marginBottom: 12, '--world-color': accent }}><span style={{ fontSize: 9, opacity: 0.6 }}>{p}</span></div>
                <div className="h-display" style={{ fontSize: 16 }}>{p}</div>
                <div style={{ marginTop: 4, fontFamily: 'var(--font-display)', fontSize: 11, opacity: 0.7 }}>{size} · ${val} value</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 32, fontFamily: 'var(--font-display)', fontSize: 16, opacity: 0.75 }}>
            All wrapped in our signature postcard kraft, with a printed scent story.
          </p>
        </div>
      </section>

      {/* Hero "ingredient" — the wrap & postcard */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div className="ph" style={{ aspectRatio: '5/4' }}><span>wrap detail · postcard, twine, stamp</span></div>
          <div>
            <div className="eyebrow">The wrap</div>
            <h2 className="h-typewriter" style={{ fontSize: 40, marginTop: 8 }}>"The wrap is half the gift."</h2>
            <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.7 }}>Hand-stamped kraft sleeve. Real postal twine. A printed postcard with your message hand-typed by us — not an inkjet. Wrapped at our Joo Chiat counter, never automated.</p>
          </div>
        </div>
      </section>

      {/* Personalise — replaces "key ingredients" for gifts */}
      <section className="section">
        <div className="container">
          <div className="eyebrow">Three things, made for you</div>
          <h2 className="h-display" style={{ fontSize: 48, marginTop: 8, marginBottom: 40 }}>Personalise it.</h2>
          {[
            ['Free gift message','Up to 80 chars · live preview','Handwritten on a postcard. Type your message, watch it appear on the actual postcard before checkout.'],
            ['Choose your stamp','Pick from all 22 worlds','Which world\'s stamp graces the box? Hotel Lobby is default — swap it for the recipient\'s favourite.'],
            ['Send direct','Separate billing & shipping','They get the postcard. You get the receipt. No price stickers, ever.'],
          ].map(([n, src, what], i) => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: i % 2 ? '1fr 1.2fr' : '1.2fr 1fr',
              gap: 48, alignItems: 'center', padding: '40px 0',
              borderTop: '1px solid var(--color-line-soft)',
            }}>
              <div className="ph ph--world" style={{ aspectRatio: '5/4', order: i % 2 ? 2 : 1, '--world-color': accent }}><span>{n.toLowerCase()}</span></div>
              <div style={{ order: i % 2 ? 1 : 2 }}>
                <div className="eyebrow">{src}</div>
                <h3 className="h-typewriter" style={{ fontSize: 36, marginTop: 8 }}>{n}</h3>
                <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6 }}>{what}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PDPHowToUse steps={[
        ['Choose the world','Pick from all 22 stamps. Hotel Lobby is our default.'],
        ['Add a message','Hand-typed onto a real postcard, up to 80 characters.'],
        ['We post it','Same-day pickup at Orchard, or 1–2 day SG delivery to their door.'],
      ]}/>

      {/* Corporate banner — replaces refill banner for gifts */}
      <section style={{ background: 'var(--color-yellow)', borderTop: '1.5px solid var(--color-ink)', borderBottom: '1.5px solid var(--color-ink)', padding: '56px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">Sending a lot of postcards?</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>20+ units? Talk corporate.</h2>
            <p style={{ marginTop: 12, fontSize: 17, maxWidth: 560 }}>Logo printing, custom curation, hotel-amenity quantities. We reply in 2 working days.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button className="btn btn--ink" onClick={()=>navigate('corporate')}>Start an enquiry →</button>
            <button className="tlink">Download one-pager (PDF)</button>
          </div>
        </div>
      </section>

      <PDPTrustStrip/>

      <PDPPairsWith navigate={navigate} heading="Other gifts in this world." items={[
        ['Hotel Lobby Discovery Set','Hotel Lobby', accent, 38],
        ['Hotel Lobby Bath Ritual Box','Hotel Lobby', accent, 92],
        ['Hotel Lobby Anywhere Fragrance','Hotel Lobby', accent, 42],
      ]}/>

      <PDPReviews/>

      <PDPFAQ items={[
        ['When will it arrive?','Same-day pickup at our Orchard flagship if ordered before 2pm. SG delivery 1–2 days. International 5–10 days.'],
        ['Can I send it to a different address?','Yes — separate billing and shipping addresses. The recipient never sees the price.'],
        ['Can I customise the contents?','Lavish ($30 add-on) lets you swap up to 2 items. For full custom, see corporate gifting.'],
        ['What if they don\'t like the scent?','We offer free exchange within 30 days. They keep the postcard.'],
      ]}/>
    </main>
  );
}
window.PDPC = PDPC;

/* ============================================================
   PDP-D  ·  Deodorant  (Hotel Lobby Aluminium-Free Deodorant Stick)
   ------------------------------------------------------------
   Anatomy DIFFERENCE vs PDP-A:
   - "What it smells like" is condensed to a small scent strip
   - PRIMARY focus is "How it performs" + "What's actually in it"
     (active blockers, not perfumery notes)
   - Adds: 24h test claim panel, wear-test diary, sensitive-pit
     compatibility row
   ============================================================ */
function PDPD({ navigate }) {
  const accent = '#E8C36A'; // Hotel Lobby tone — keeps world identity
  const ACTIVES = [
    {
      name: 'Magnesium Hydroxide 12%',
      role: 'Odour neutraliser',
      story: 'Raises pit pH so odour-causing bacteria can\'t set up shop. Won\'t block your sweat — your body still cools itself.',
      icon: (
        <g fill="none" stroke="#212020" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="32" r="20"/>
          <path d="M16 32 q 8 -10 16 0 q 8 10 16 0" strokeWidth="1.4"/>
          <path d="M22 26 q 4 4 0 8" strokeWidth="1.1"/>
          <path d="M32 22 q 4 4 0 8" strokeWidth="1.1"/>
          <path d="M42 26 q 4 4 0 8" strokeWidth="1.1"/>
          <text x="32" y="46" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="9" fill="#212020">Mg</text>
        </g>
      ),
    },
    {
      name: 'Saccharomyces Ferment',
      role: 'Live odour-eating culture',
      story: 'A skin-friendly probiotic that keeps the underarm microbiome calm. Less smell to fight, less product needed.',
      icon: (
        <g fill="none" stroke="#212020" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="22" cy="28" rx="7" ry="5"/>
          <ellipse cx="38" cy="22" rx="6" ry="4"/>
          <ellipse cx="44" cy="38" rx="7" ry="5"/>
          <ellipse cx="26" cy="44" rx="6" ry="4"/>
          <circle cx="22" cy="28" r="1.4" fill="#212020"/>
          <circle cx="38" cy="22" r="1.2" fill="#212020"/>
          <circle cx="44" cy="38" r="1.4" fill="#212020"/>
          <circle cx="26" cy="44" r="1.2" fill="#212020"/>
        </g>
      ),
    },
    {
      name: 'Tapioca Starch + Arrowroot',
      role: 'Dryness, no chalk',
      story: 'Plant-derived powders soak up wetness without the chalky drag of cornstarch. Glides on, stays invisible on dark fabric.',
      icon: (
        <g fill="none" stroke="#212020" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 18 q 12 -6 24 0 v 26 q -12 6 -24 0 z"/>
          <path d="M20 18 q 12 6 24 0" strokeWidth="1.2"/>
          <path d="M26 26 q 6 -1 12 0" strokeWidth="0.9"/>
          <path d="M26 32 q 6 -1 12 0" strokeWidth="0.9"/>
          <path d="M26 38 q 6 -1 12 0" strokeWidth="0.9"/>
        </g>
      ),
    },
    {
      name: 'Calendula + Allantoin',
      role: 'Calms freshly-shaved skin',
      story: 'For the day after the razor. Calendula soothes, allantoin builds the barrier back. Sting-free promise.',
      icon: (
        <g fill="none" stroke="#212020" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="32" r="6"/>
          {[0,45,90,135,180,225,270,315].map(a => (
            <ellipse key={a} cx="32" cy="14" rx="3.5" ry="6.5" transform={`rotate(${a} 32 32)`}/>
          ))}
        </g>
      ),
    },
  ];

  return (
    <main>
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / Body / Deodorant / <span style={{ color: 'var(--color-ink)' }}>Hotel Lobby Aluminium-Free Stick</span></div>
      </div>

      {/* Gallery + Buy box */}
      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
          <PDPGallery accent={accent} stamp={'24h\nFRESH\nSG'}/>
          <PDPBuyBox
            ribbon={(
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 36, background: accent, border: '1.5px solid var(--color-ink)' }}/>
                <span className="eyebrow">Hotel Lobby · Aluminium-free deodorant</span>
              </div>
            )}
            title="Hotel Lobby Deodorant Stick"
            subtitle="24-hour odour protection. Aluminium-free, baking-soda-free, fragranced from a real postcard scent."
            sizes={['65g Stick','40g Travel','Refill']}
            price={26}
          />
        </div>
      </section>

      <PDPVerseBand stampName="Hotel Lobby" stampFamily="24h Aluminium-free" stampColor={accent} quote="No aluminium. No baking soda. No regrets after spin class."/>

      {/* PRIMARY — How it performs (3 stat cards) */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ display: 'inline-block', padding: '8px 18px', border: '1.5px solid var(--color-ink)', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'var(--color-bg-warm)' }}>The performance brief</span>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 16 }}>How it performs.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['24h','odour-free wear','Tested on 28 people through Singapore heat, gym sessions and a wedding banquet. Zero re-application needed.'],
              ['0%','aluminium · baking soda','Magnesium hydroxide does the job instead. Pits stay calm, fabric stays clean, sweat still cools you.'],
              ['97%','said "no white marks"','Tapioca + arrowroot replace cornstarch. Glides clear on a black t-shirt. Doesn\'t flake.'],
            ].map(([n, t, p]) => (
              <div key={n} className="stamp-frame stamp-side" style={{ padding: 32, textAlign: 'center', background: 'var(--color-bg-card)' }}>
                <div className="h-display" style={{ fontSize: 88, color: 'var(--color-yellow)', WebkitTextStroke: '1.2px #212020', lineHeight: 1 }}>{n}</div>
                <div className="eyebrow" style={{ marginTop: 12 }}>{t}</div>
                <p style={{ marginTop: 14, fontSize: 13, opacity: 0.78, lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
          <p className="h-typewriter" style={{ textAlign: 'center', fontSize: 22, marginTop: 40, maxWidth: 720, marginInline: 'auto', opacity: 0.78 }}>
            A deodorant that smells like our Hotel Lobby — and works like the doorman never blinks.
          </p>
        </div>
      </section>

      {/* WEAR TEST DIARY — unique to deodorants */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ color: 'var(--color-yellow)' }}>One-day wear test</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8, color: 'var(--color-bg)' }}>What 24 hours actually look like.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1.5px solid var(--color-bg)' }}>
            {[
              ['07:00','Apply','One twist, two glides per pit. Dressed in 5 seconds.','#FFB233'],
              ['12:00','Lunch hour','Walked from City Hall to Telok Ayer. 32°C, 80% humidity. Still calm.','#E8C36A'],
              ['18:00','Spin class','45 min, drenched. Showered. No re-apply.','#9CC4D6'],
              ['23:00','Out for dinner','Same shirt as lunch. Still polite.','#C7A8D6'],
            ].map(([t, h, p, c], i) => (
              <div key={t} style={{
                padding: 28,
                borderRight: i < 3 ? '1.5px solid var(--color-bg)' : 'none',
                background: 'rgba(248,246,237,0.04)',
                position: 'relative',
              }}>
                <div style={{ width: 24, height: 30, background: c, border: '1.5px solid var(--color-bg)', marginBottom: 16 }}/>
                <div className="h-display" style={{ fontSize: 36, color: 'var(--color-yellow)' }}>{t}</div>
                <div className="eyebrow" style={{ marginTop: 6, color: 'var(--color-bg)' }}>{h}</div>
                <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.55, opacity: 0.85 }}>{p}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 32, fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 }}>
            Real-life diary, May 2026 · Singapore · 32°C average
          </p>
        </div>
      </section>

      {/* KEY INGREDIENTS — performance actives, not scent notes */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow">What's actually in it</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8 }}>Four actives. No filler.</h2>
            <p style={{ marginTop: 14, fontSize: 16, maxWidth: 640, opacity: 0.78, lineHeight: 1.6 }}>
              We're skipping the scent-notes section here — that's on the fragrance PDP. This is the chemistry: the things that block, the things that calm, and why we picked them.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {ACTIVES.map((a) => (
              <div key={a.name} className="stamp-frame stamp-side" style={{ background: 'var(--color-bg-card)', padding: 28, display: 'grid', gridTemplateColumns: '92px 1fr', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ width: 92, height: 92, borderRadius: '50%', background: 'var(--color-bg-warm)', border: '2px solid var(--color-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                  <svg viewBox="0 0 64 64" width="60" height="60">{a.icon}</svg>
                </div>
                <div>
                  <div className="eyebrow">{a.role}</div>
                  <h3 className="h-typewriter" style={{ fontSize: 24, marginTop: 6 }}>{a.name}</h3>
                  <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6 }}>{a.story}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: 24, background: 'var(--color-yellow)', border: '1.5px solid var(--color-ink)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 24, alignItems: 'center' }}>
            <div className="postmark" style={{ width: 78, height: 78, fontSize: 9 }}><div>NO<br/>· INSIDE ·<br/>WHATSOEVER</div></div>
            <div>
              <div className="eyebrow">What you won't find</div>
              <div style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.06em' }}>
                Aluminium chlorohydrate · Baking soda · Triclosan · Parabens · Phthalates · Synthetic dye · Talc
              </div>
            </div>
            <button className="tlink" style={{ whiteSpace: 'nowrap' }}>See full INCI →</button>
          </div>
        </div>
      </section>

      {/* SENSITIVE PIT compatibility row */}
      <section className="section--tight section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 36, marginBottom: 24 }}>Will it suit your pits?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {[
              ['Sensitive', true, 'Magnesium not bicarb — no sting'],
              ['Just shaved', true, 'Calendula calms within 20 min'],
              ['Heavy sweater', true, '24h with no re-apply'],
              ['Pregnant / breastfeeding', true, 'Aluminium-free, EO-safe'],
              ['Eczema-prone', false, 'Patch test 24h first'],
            ].map(([t, fit, n]) => (
              <div key={t} style={{ textAlign: 'center', opacity: fit ? 1 : 0.55 }}>
                <Stamp name={t} color={fit ? accent : '#C4C5CE'} size="sm"/>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, marginTop: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{fit ? '✓ great fit' : '— patch test first'}</div>
                <div style={{ marginTop: 4, fontSize: 11, opacity: 0.7, fontStyle: 'italic' }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCENT — small/condensed, links out to fragrance PDP */}
      <section className="section">
        <div className="container">
          <div style={{
            background: 'var(--color-bg-card)',
            border: '1.5px solid var(--color-ink)',
            padding: 32,
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: 32,
            alignItems: 'center',
          }}>
            <Stamp name="Hotel Lobby" family="Hesperidic Gourmand" color={accent} size="md"/>
            <div>
              <div className="eyebrow">It smells like</div>
              <h3 className="h-display" style={{ fontSize: 32, marginTop: 6 }}>Hotel Lobby — but small.</h3>
              <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.6, maxWidth: 540 }}>
                A whisper of bergamot, vanilla and earl grey — sized down for a deodorant so it never clashes with your fragrance on top. Fades clean in 30 minutes.
              </p>
            </div>
            <button className="btn btn--small" onClick={()=>navigate('pdp-a')}>Smell the full scent →</button>
          </div>
        </div>
      </section>

      <PDPHowToUse steps={[
        ['Twist up','Two clicks, no more. The stick rises about 5mm.'],
        ['Two glides per pit','Don\'t over-apply. The actives need air to breathe.'],
        ['Wait 60 seconds','Let it set before dressing. No transfer to dark fabric.'],
      ]}/>

      <PDPRefillBanner navigate={navigate} headline="Bring this stick back." body="Empty stick? Drop it at our Orchard flagship for a fresh insert. Same case, less waste, save 20%."/>

      <PDPTrustStrip/>

      <PDPPairsWith navigate={navigate} heading="Wears well with." items={[
        ['Hotel Lobby Anywhere Fragrance','Hotel Lobby', accent, 42],
        ['Hotel Lobby Hand & Body Wash','Hotel Lobby', accent, 24],
        ['Clear Skies Roll-On Deodorant','Clear Skies','#9CC4D6', 24],
      ]}/>

      <PDPReviews/>

      <PDPFAQ items={[
        ['Will I sweat? It\'s not an antiperspirant, right?','Correct — this is a deodorant, not an antiperspirant. You\'ll still sweat (your body needs to). You just won\'t smell. Most heavy sweaters tell us they sweat *less* after 2 weeks because the pit microbiome calms down.'],
        ['Do I need a "detox period" coming off aluminium?','Sometimes. The first 7–14 days you may smell more as your sweat glands re-open. Push through. By week 3 most people are cleaner-smelling than ever.'],
        ['Full ingredients (INCI)','Caprylic/Capric Triglyceride, Magnesium Hydroxide, Tapioca Starch, Cera Alba (Beeswax), Maranta Arundinacea (Arrowroot) Root Powder, Saccharomyces Ferment, Calendula Officinalis Extract, Allantoin, Tocopherol, Parfum (Hotel Lobby accord), Limonene, Linalool. IFRA compliant.'],
        ['Is the stick recyclable?','Yes. Pop the cap, twist out the empty insert, drop the cardboard tube in paper recycling. Bring the cap to Orchard and we\'ll re-use it.'],
        ['Why no baking soda?','Baking soda raises pit pH too aggressively and gives a lot of people contact rashes — especially after shaving. Magnesium hydroxide does the same job at a kinder pH.'],
      ]}/>
    </main>
  );
}
window.PDPD = PDPD;

/* ============================================================
   Collection · Type  &  Collection · Gifts (unchanged below)
   ============================================================ */

function CollectionType({ navigate }) {
  return (
    <main>
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / Shop / <span style={{ color: 'var(--color-ink)' }}>Anywhere Fragrance</span></div>
      </div>
      <section style={{ padding: '64px 0', background: 'linear-gradient(180deg, var(--color-bg-warm), var(--color-bg))' }}>
        <div className="container">
          <div className="eyebrow">For your room. Your skin. Your linens.</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', marginTop: 12 }}>Spray to drift away.</h1>
          <p style={{ marginTop: 16, fontSize: 18, maxWidth: 540 }}>The hero category — 14% of everything we sell. 22 worlds, one spritz at a time.</p>
        </div>
      </section>
      <section className="section--tight section">
        <div className="container">
          <div className="eyebrow">Top 3 in this category</div>
          <h2 className="h-display" style={{ fontSize: 36, marginTop: 8, marginBottom: 24 }}>The crowd-pleasers.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <ProductCard name="Hotel Lobby Anywhere Fragrance" world="Hotel Lobby" world_color="#E8C36A" price={42} badge="#1" navigate={navigate}/>
            <ProductCard name="Moon Bloom Anywhere Fragrance" world="Moon Bloom" world_color="#5C6688" price={42} badge="#2" navigate={navigate}/>
            <ProductCard name="POSTCARD x SOJAO Sleep In Anywhere Fragrance" world="Sleep In" world_color="#A8B5D0" price={48} badge="Collab" navigate={navigate}/>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40 }}>
          <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
            {[
              ['World', WORLDS.map(w => w.name)],
              ['Format', ['100ml','30ml','Refill']],
              ['Refillable', ['Yes','No']],
              ['Price', ['Under $30','$30–$50','$50+']],
            ].map(([t, items]) => (
              <div key={t} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--color-line)' }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>{t}</div>
                {items.slice(0,5).map(i => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0', fontSize: 13 }}>
                    <input type="checkbox" /> {i}
                  </label>
                ))}
                {items.length > 5 && <button className="tlink" style={{ marginTop: 6, fontSize: 11 }}>+ {items.length - 5} more</button>}
              </div>
            ))}
          </aside>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
              <div style={{ fontSize: 13, opacity: 0.7 }}>Showing 24 postcards</div>
              <select style={{ fontFamily: 'var(--font-display)', fontSize: 12, padding: '8px 12px', border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}><option>Bestselling</option></select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const w = WORLDS[i % WORLDS.length];
                return <ProductCard key={i} name={`${w.name} Anywhere Fragrance`} world={w.name} world_color={w.color} price={36 + (i%4)*4} navigate={navigate}/>;
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
window.CollectionType = CollectionType;

function CollectionGifts({ navigate }) {
  return (
    <main>
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / <span style={{ color: 'var(--color-ink)' }}>Gifts</span></div>
      </div>
      <section style={{ padding: '64px 0', background: 'var(--color-bg-warm)' }}>
        <div className="container">
          <div className="eyebrow">Gift-finder</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', marginTop: 12 }}>A postcard for them.<br/>Or yourself. We don't judge.</h1>
        </div>
      </section>
      <section className="section--tight section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {[
              ['For Mum','Mother\'s Day picks','#E8B796'],
              ['For a couple','Housewarming bundles','#C7A8D6'],
              ['Last minute, big love','Under $50, ships today','#FFB233'],
              ['Treat yourself','Discovery sets','#9CC4D6'],
            ].map(([h, s, c]) => (
              <div key={h} className="stamp-frame stamp-side" style={{ padding: 28, background: c, color: 'var(--color-ink)', cursor: 'pointer' }}>
                <div className="postmark" style={{ marginBottom: 18 }}><div>{h.split(' ')[0].toUpperCase()}</div></div>
                <div className="h-display" style={{ fontSize: 24 }}>{h}</div>
                <div style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 40, marginBottom: 24 }}>Our most-sent postcards.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {WORLDS.slice(0,6).map(w => (
              <div key={w.slug} onClick={()=>navigate('pdp-c')} style={{ cursor: 'pointer' }}>
                <div className="ph ph--world" style={{ '--world-color': w.color, aspectRatio: '4/5', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--color-yellow)', border: '1.5px solid var(--color-ink)', padding: '4px 10px', fontFamily: 'var(--font-display)', fontSize: 10 }}>GIFT</div>
                </div>
                <div style={{ marginTop: 10, fontFamily: 'var(--font-display)', fontSize: 14 }}>Destination: {w.name} Travel Gift Box</div>
                <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500 }}>$78</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }} className="section--tight section">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--color-yellow)' }}>Bigger than a postcard?</div>
            <h2 className="h-display" style={{ fontSize: 44, marginTop: 8, color: 'var(--color-bg)' }}>Send a hamper.</h2>
            <p style={{ marginTop: 12, opacity: 0.8, maxWidth: 480 }}>We do bespoke gifting for hotels, weddings and bossy bosses. Order from 20 units up.</p>
          </div>
          <button className="btn" onClick={()=>navigate('corporate')}>Talk to corporate →</button>
        </div>
      </section>
    </main>
  );
}
window.CollectionGifts = CollectionGifts;
