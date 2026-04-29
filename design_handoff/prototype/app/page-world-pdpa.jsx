/* World destination page — Hotel Lobby */
function WorldPage({ navigate }) {
  const w = WORLDS[0]; // Hotel Lobby
  return (
    <main className={w.themeClass}>
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>
          Home / Worlds / <span style={{ color: 'var(--color-ink)' }}>Hotel Lobby</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{
        background: `linear-gradient(180deg, var(--world-tint) 0%, var(--color-bg) 100%)`,
        padding: '80px 0 96px',
        position: 'relative',
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Stamp name={w.name} family={w.family} color={w.color} size="lg"/>
          </div>
          <div>
            <div className="eyebrow">{w.family}</div>
            <h1 className="h-typewriter" style={{ fontSize: 'clamp(64px, 8vw, 96px)', marginTop: 8 }}>{w.name}.</h1>
            <p style={{ marginTop: 24, fontSize: 20, lineHeight: 1.55, maxWidth: 540 }}>
              A bright, sparkling citrus opening that warms into something soft, sweet, and skin-like. Polished, refined, endlessly elegant.
            </p>
            <div className="script" style={{ marginTop: 24, fontSize: 36, transform: 'rotate(-2deg)', opacity: 0.6 }}>greetings from the lobby.</div>
          </div>
        </div>
      </section>

      {/* How it's built */}
      <section className="section--tight section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <div className="eyebrow">How it's built</div>
            <h2 className="h-display" style={{ fontSize: 44, marginTop: 8 }}>The scent breakdown.</h2>
          </div>
          <div style={{ background: 'var(--world-tint)', border: '1px solid var(--color-line)' }}>
            {[
              ['Top','Bergamot, Orange Blossom','The bright doorway moment.'],
              ['Heart','Earl Grey Tea, Apricot','Warm tea steam, soft fruit.'],
              ['Base','Vanilla, White Musk','The settled, skin-like finish.'],
              ['Character','Unisex · Year-round','Reads polite, leans cosy in cooler weather.'],
            ].map(([layer, notes, desc]) => (
              <div key={layer} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 2fr', padding: '22px 28px', borderBottom: '1px solid var(--color-line-soft)', alignItems: 'center' }}>
                <div className="h-display" style={{ fontSize: 22 }}>{layer}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{notes}</div>
                <div style={{ fontSize: 15, opacity: 0.78 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Character */}
      <section style={{ padding: '64px 0', background: 'var(--color-bg-warm)' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <div className="postmark" style={{ margin: '0 auto 24px' }}><div>WEAR<br/>NOTES</div></div>
          <p className="h-typewriter" style={{ fontSize: 32, lineHeight: 1.4 }}>
            "Bright then cozy. Reads as unisex but leans slightly feminine. Year-round, but especially welcoming in cooler weather."
          </p>
        </div>
      </section>

      {/* Product grid by ritual */}
      <section className="section">
        <div className="container">
          {[
            ['On your skin', ['Hand & Body Wash','Body Oil','Hand Cream','Deodorant Spray']],
            ['In the room', ['Anywhere Fragrance','Reed Diffuser','Reed Diffuser Refill','Travel Mist']],
            ['Travel-size', ['Mini Anywhere Fragrance','Mini Body Wash','Mini Hand Cream','Mini Deodorant']],
          ].map(([heading, items]) => (
            <div key={heading} style={{ marginBottom: 64 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
                <h2 className="h-display" style={{ fontSize: 32 }}>{heading}.</h2>
                <button className="tlink">View all →</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                {items.map(name => (
                  <ProductCard key={name} name={`${w.name} ${name}`} world={w.name} world_color={w.color} price={(20 + Math.floor(Math.random()*30))} navigate={navigate}/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pair with neighbouring worlds */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section--tight section">
        <div className="container">
          <div className="eyebrow">If you love Hotel Lobby</div>
          <h2 className="h-display" style={{ fontSize: 44, marginTop: 8, marginBottom: 32 }}>…send yourself a postcard from:</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {WORLDS.slice(1, 4).map(neighbour => (
              <div key={neighbour.slug} onClick={()=>navigate('world')} style={{ cursor: 'pointer', display: 'flex', gap: 18, padding: 20, border: '1px solid var(--color-line)', background: 'var(--color-bg-card)' }}>
                <Stamp name={neighbour.name} family={neighbour.family} color={neighbour.color} size="sm"/>
                <div>
                  <div className="eyebrow">{neighbour.family}</div>
                  <h3 className="h-display" style={{ fontSize: 22, marginTop: 4 }}>{neighbour.name}</h3>
                  <p style={{ fontSize: 13, opacity: 0.78, marginTop: 8 }}>{neighbour.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refill banner */}
      <section style={{ background: 'var(--color-yellow)', borderTop: '1.5px solid var(--color-ink)', borderBottom: '1.5px solid var(--color-ink)' }}>
        <div className="container" style={{ padding: '40px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <h3 className="h-display" style={{ fontSize: 36 }}>Refill your Hotel Lobby in store.</h3>
          <button className="btn btn--ink" onClick={()=>navigate('flagship')}>Visit our Orchard flagship →</button>
        </div>
      </section>
    </main>
  );
}
window.WorldPage = WorldPage;

/* PDP-A — Standard scented product (Hotel Lobby Anywhere Fragrance) */
function PDPA({ navigate }) {
  return (
    <main className="world-hotel-lobby">
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / Anywhere Fragrance / Hotel Lobby / <span style={{ color: 'var(--color-ink)' }}>Anywhere Fragrance</span></div>
      </div>

      {/* Gallery + Buy box */}
      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="ph ph--world" style={{ aspectRatio: '1/1', fontSize: 8 }}>
                  <span>img {i+1}</span>
                </div>
              ))}
            </div>
            <div className="ph ph--world" style={{ aspectRatio: '1/1', position: 'relative' }}>
              <div className="postmark" style={{ position: 'absolute', top: 24, right: 24 }}><div>HOTEL<br/>LOBBY<br/>SG</div></div>
              <span style={{ opacity: 0.55 }}>product · in its world</span>
            </div>
          </div>
          <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 28, height: 36, background: '#E8C36A', border: '1.5px solid var(--color-ink)' }}/>
              <span className="eyebrow">Hotel Lobby · Hesperidic Gourmand</span>
            </div>
            <h1 className="h-typewriter" style={{ fontSize: 40 }}>Hotel Lobby Anywhere Fragrance</h1>
            <p style={{ marginTop: 8, fontSize: 16, opacity: 0.78 }}>A polished, hesperidic gourmand for skin, linens & rooms.</p>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
              <span style={{ color: 'var(--color-yellow)', textShadow: '0 0 0 var(--color-ink)', WebkitTextStroke: '0.4px #212020' }}>★★★★★</span>
              <span style={{ opacity: 0.7 }}>4.9 · 327 reviews</span>
            </div>

            <div style={{ marginTop: 28 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Size</div>
              <div style={{ display: 'flex', gap: 10 }}>
                {['30ml','100ml','Refill'].map((v, i) => (
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

            <window.PDPPurchaseOptions price={42} discountPct={10}/>

            <div style={{ marginTop: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-ink)' }}>
                <button style={{ all: 'unset', padding: '10px 16px', cursor: 'pointer' }}>−</button>
                <span style={{ padding: '0 14px' }}>1</span>
                <button style={{ all: 'unset', padding: '10px 16px', cursor: 'pointer' }}>+</button>
              </div>
              <button className="btn" style={{ flex: 1, justifyContent: 'center' }}>Add to bag · $42</button>
            </div>
            <button className="tlink" style={{ marginTop: 16 }}>Or refill your bottle in store →</button>

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
        </div>
      </section>

      {/* Feeling verse band */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)', padding: '64px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 48, alignItems: 'center' }}>
          <Stamp name="Hotel Lobby" family="Hesperidic Gourmand" color="#E8C36A" size="md"/>
          <p className="h-typewriter" style={{ fontSize: 36, color: 'var(--color-yellow)', lineHeight: 1.3 }}>
            "Polished. Refined. Endlessly elegant."
          </p>
        </div>
      </section>

      {/* What it smells like */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ display: 'inline-block', padding: '8px 18px', border: '1.5px solid var(--color-ink)', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'var(--world-tint)' }}>Hesperidic Gourmand</span>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 16 }}>What it smells like.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {[
              ['Bergamot','sparkling citrus',(
                <g fill="none" stroke="#212020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="32" cy="34" r="18"/>
                  <path d="M32 16 q 1 -5 5 -7"/>
                  <path d="M37 9 q 4 -1 7 1" strokeWidth="1.2"/>
                  <path d="M22 28 q 3 -2 5 -1" strokeWidth="0.9"/>
                  <path d="M28 41 q 4 -1 7 -3" strokeWidth="0.9"/>
                  <path d="M40 32 q 3 1 5 5" strokeWidth="0.9"/>
                  <circle cx="20" cy="22" r="0.8" fill="#212020"/>
                  <circle cx="44" cy="42" r="0.8" fill="#212020"/>
                  <circle cx="38" cy="20" r="0.8" fill="#212020"/>
                </g>
              )],
              ['Vanilla','soft, warm',(
                <g fill="none" stroke="#212020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10 q -4 14 -2 26 q 2 12 12 16"/>
                  <path d="M28 8 q -2 14 0 26 q 2 12 14 16"/>
                  <path d="M22 10 q 3 -2 6 -2"/>
                  <path d="M32 50 q 6 -1 10 -2" strokeWidth="0.9"/>
                  <path d="M24 18 q 1 1 2 0" strokeWidth="0.9"/>
                  <path d="M24 28 q 1 1 2 0" strokeWidth="0.9"/>
                  <path d="M26 38 q 1 1 2 0" strokeWidth="0.9"/>
                </g>
              )],
              ['Orange Blossom','sunlit floral',(
                <g fill="none" stroke="#212020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="32" cy="20" rx="6" ry="9"/>
                  <ellipse cx="44" cy="32" rx="9" ry="6"/>
                  <ellipse cx="32" cy="44" rx="6" ry="9"/>
                  <ellipse cx="20" cy="32" rx="9" ry="6"/>
                  <circle cx="32" cy="32" r="3.5" fill="#212020"/>
                  <circle cx="32" cy="32" r="1.4" fill="#F8F6ED"/>
                </g>
              )],
              ['Earl Grey Tea','steamed cup',(
                <g fill="none" stroke="#212020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 32 h 26 v 10 a 8 8 0 0 1 -8 8 h -10 a 8 8 0 0 1 -8 -8 z"/>
                  <path d="M42 36 q 6 0 6 5 q 0 5 -6 5" />
                  <path d="M16 50 h 32" strokeWidth="1.2"/>
                  <path d="M22 22 q -2 -3 0 -6 q 2 -3 0 -6" strokeWidth="1.2"/>
                  <path d="M30 22 q -2 -3 0 -6 q 2 -3 0 -6" strokeWidth="1.2"/>
                  <path d="M38 22 q -2 -3 0 -6 q 2 -3 0 -6" strokeWidth="1.2"/>
                </g>
              )],
              ['Apricot','brushed fruit',(
                <g fill="none" stroke="#212020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 32 a 12 13 0 1 0 24 0 a 12 13 0 1 0 -24 0"/>
                  <path d="M32 19 q 0 8 0 26" strokeWidth="0.9"/>
                  <path d="M32 19 q 2 -5 6 -7"/>
                  <path d="M38 12 q 4 0 6 -3" strokeWidth="1.2"/>
                  <ellipse cx="36" cy="11" rx="2.6" ry="1.6" fill="#212020" stroke="none"/>
                  <path d="M26 30 q 2 -2 4 -1" strokeWidth="0.7"/>
                </g>
              )],
            ].map(([n, s, icon]) => (
              <div key={n} className="stamp-frame stamp-side" style={{ padding: 20, textAlign: 'center', background: 'var(--color-bg-card)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 72, height: 72, marginBottom: 14, borderRadius: '50%', background: 'var(--world-tint)', border: '1.5px solid var(--color-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                  <svg viewBox="0 0 64 64" width="48" height="48">{icon}</svg>
                </div>
                <div className="h-display" style={{ fontSize: 16, lineHeight: 1.15, minHeight: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
                <div style={{ marginTop: 6, fontSize: 11, opacity: 0.7, fontStyle: 'italic' }}>{s}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 32, fontFamily: 'var(--font-display)', fontSize: 16, opacity: 0.75 }}>
            Smells like… a sunlit lobby with polished brass and warm pastries.
          </p>
        </div>
      </section>

      {/* Key ingredients */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <div className="eyebrow">Three things, beautifully sourced</div>
          <h2 className="h-display" style={{ fontSize: 48, marginTop: 8, marginBottom: 40 }}>Key ingredients.</h2>
          {[
            ['Sicilian Bergamot','Cold-pressed in Calabria · 4-month harvest','Lifts the whole composition. The brightness you smell first.'],
            ['Madagascar Vanilla','Ethically sourced, hand-pollinated','Carries the warm, gourmand finish. Not a candle vanilla — a tea-cup one.'],
            ['Earl Grey Accord','In-house tincture, steeped over 6 weeks','The hotel-lounge moment. Creamy, slightly tannic, beautifully odd.'],
          ].map(([n, src, what], i) => (
            <div key={n} style={{
              display: 'grid', gridTemplateColumns: i % 2 ? '1fr 1.2fr' : '1.2fr 1fr',
              gap: 48, alignItems: 'center', padding: '40px 0',
              borderTop: '1px solid var(--color-line-soft)',
            }}>
              <div className="ph ph--world" style={{ aspectRatio: '5/4', order: i % 2 ? 2 : 1 }}/>
              <div style={{ order: i % 2 ? 1 : 2 }}>
                <div className="eyebrow">{src}</div>
                <h3 className="h-typewriter" style={{ fontSize: 36, marginTop: 8 }}>{n}</h3>
                <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6 }}>{what}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="section--tight section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 44, marginBottom: 40 }}>How to use.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              ['Spritz on linens','A pillow, a scarf, the inside of a jacket. It blooms over hours.'],
              ['On clothes','Hold the bottle a hand-span away. Two pumps, no more.'],
              ['In the room','One spray as you walk in. Like switching on a lamp.'],
            ].map(([s, p], i) => (
              <div key={s} style={{ textAlign: 'center', padding: '32px 20px', border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)', position: 'relative' }}>
                <div className="postmark postmark--ink" style={{
                  margin: '0 auto 20px',
                  width: 110, height: 110,
                  borderWidth: '2.5px',
                  fontSize: 11,
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.18em', opacity: 0.85 }}>STEP</div>
                  <div className="h-display" style={{ fontSize: 44, lineHeight: 1, marginTop: 2 }}>0{i+1}</div>
                </div>
                <div className="h-display" style={{ fontSize: 22 }}>{s}.</div>
                <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.55, opacity: 0.78, fontFamily: 'var(--font-body)' }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Refill cross-sell */}
      <section style={{ background: 'var(--color-yellow)', borderTop: '1.5px solid var(--color-ink)', borderBottom: '1.5px solid var(--color-ink)', padding: '56px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">Refill, repeat, rejoice</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>Bring this bottle back.</h2>
            <p style={{ marginTop: 12, fontSize: 17, maxWidth: 560 }}>Top it up at our Orchard flagship. Less waste, same scent. Save 20% per refill.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button className="btn btn--ink" onClick={()=>navigate('refill')}>See the refill list →</button>
            <button className="tlink">Or shop the matching refill SKU →</button>
          </div>
        </div>
      </section>

      {/* Trust strip */}
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

      {/* Pair-with same world */}
      <section className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 44, marginBottom: 24 }}>Pairs with Hotel Lobby.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {['Hand & Body Wash','Deodorant Spray','Reed Diffuser'].map(p => (
              <ProductCard key={p} name={`Hotel Lobby ${p}`} world="Hotel Lobby" world_color="#E8C36A" price={32} navigate={navigate}/>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
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
                ['Mei L.','Singapore','5 / 5','Smells like the lobby of a really good hotel. I keep getting compliments — and a friend bought it after one whiff.'],
                ['Aaron','Verified buyer','5 / 5','Refilled mine at the Orchard flagship last week. Same scent, less guilt. The staff threw in a coffee.'],
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

      {/* FAQ */}
      <section className="section--tight section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 36, marginBottom: 20 }}>Questions?</h2>
          <div style={{ border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}>
            {[
              ['Where can I spray it?','On skin, on linens, in the room, on a scarf, on the inside of your jacket. Not in your eyes.'],
              ['How long does the scent last?','4–6 hours on skin, 8–10 on fabric. It softens beautifully — never fades to nothing.'],
              ['Will I smell like a hotel? In a good way?','In an excellent way. Bright bergamot, soft vanilla, never sweet. Reads polished, not perfumed.'],
              ['Full ingredients (INCI)','Alcohol Denat., Aqua, Parfum (Bergamot, Orange Blossom, Earl Grey accord, Vanilla, Apricot, White Musk), Limonene, Linalool, Citral. IFRA compliant.'],
              ['Is it pregnancy safe?','Yes — no essential oils above safe thresholds. Always check with your doctor for your specific pregnancy.'],
            ].map(([q, a], i, arr) => (
              <details key={q} style={{ padding: 24, borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--color-line)' }} open={i === 0}>
                <summary style={{ fontFamily: 'var(--font-display)', fontSize: 15, cursor: 'pointer', listStyle: 'none' }}>{q}</summary>
                <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, opacity: 0.85 }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
window.PDPA = PDPA;
