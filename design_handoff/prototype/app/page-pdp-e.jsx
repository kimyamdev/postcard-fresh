/* PDP-E · Solid bar shampoo — Java Jungle Solid Shampoo Bar
   Format-led template. Proves a bar earns its space.
   - Format proof (1 bar = 2 bottles)
   - 6-chip hair-type fit row
   - First-bar field guide (the honest adjustment story)
   - Storage cross-sell (bar tin)
   - Wet/dry application diagram
*/

function PDPE({ navigate }) {
  const accent = '#6E8B5C'; // Java Jungle — deep coffee-jungle green
  const ACTIVES = [
    {
      name: 'Cold-pressed Coconut Surfactants',
      role: 'The lather, the kind kind',
      story: 'SLS-free coconut-derived cleansers. Properly foamy without stripping the scalp\'s natural oils. The reason wash one already feels right.',
    },
    {
      name: 'Brewed Arabica Caffeine',
      role: 'Wakes up the follicle',
      story: 'A 4-hour cold brew steeped into the bar. Caffeine stimulates the scalp, leaves shine, smells faintly of a Java café at dawn.',
    },
    {
      name: 'Cocoa Butter + Murumuru',
      role: 'Conditioning glide',
      story: 'So the bar slips through wet hair instead of catching. Tropical butters lock in shine without weighing fine hair down.',
    },
  ];

  return (
    <main>
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / Hair / Solid bars / <span style={{ color: 'var(--color-ink)' }}>Java Jungle Shampoo Bar</span></div>
      </div>

      {/* Gallery + Buy box */}
      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
          <window.PDPGallery accent={accent} stamp={'80\nWASHES\nSG'}/>
          <window.PDPBuyBox
            ribbon={(
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 36, background: accent, border: '1.5px solid var(--color-ink)' }}/>
                <span className="eyebrow">Java Jungle · Solid Shampoo Bar</span>
              </div>
            )}
            title="Java Jungle Solid Shampoo Bar"
            subtitle="One bar, eighty washes. Coffee-bean caffeine wakes up your scalp; coconut surfactants do the cleaning. Plastic stays in the past."
            sizes={['Single bar 75g','Twin pack','Bar + travel tin']}
            price={18}
          />
        </div>
      </section>

      <window.PDPVerseBand stampName="Java Jungle" stampFamily="Solid hair · Caffeine bar" stampColor={accent} quote="One bar. Eighty washes. Zero plastic."/>

      {/* PRIMARY — Format proof (replaces "What it smells like") */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', padding: '8px 18px', border: '1.5px solid var(--color-ink)', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#6E8B5C22' }}>The format proof</span>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 16 }}>What you're swapping.</h2>
          </div>

          {/* The big visual swap: 1 bar vs 2 bottles */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 40, alignItems: 'center',
            padding: 48,
            background: 'var(--color-bg-card)',
            border: '1.5px solid var(--color-ink)',
            position: 'relative',
          }}>
            {/* Left — the bar */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <svg viewBox="0 0 200 140" width="220" height="154" style={{ display: 'block' }}>
                  <ellipse cx="100" cy="120" rx="78" ry="6" fill="rgba(33,32,32,0.12)"/>
                  <rect x="32" y="36" width="136" height="80" rx="14" fill={accent} stroke="#212020" strokeWidth="1.8"/>
                  <rect x="32" y="36" width="136" height="14" rx="14" fill="rgba(248,246,237,0.18)"/>
                  <text x="100" y="84" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="11" fill="#212020" letterSpacing="0.1em">JAVA JUNGLE</text>
                  <text x="100" y="100" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="9" fill="#212020" opacity="0.7" letterSpacing="0.08em">75g · postcard sg</text>
                </svg>
              </div>
              <div className="h-display" style={{ fontSize: 80, marginTop: 8, lineHeight: 1 }}>1</div>
              <div className="eyebrow" style={{ marginTop: 8 }}>Bar</div>
              <div style={{ marginTop: 8, fontFamily: 'var(--font-display)', fontSize: 14 }}>S$18</div>
            </div>

            {/* Equals */}
            <div className="h-display" style={{ fontSize: 88, color: 'var(--color-yellow)', WebkitTextStroke: '1.2px #212020', lineHeight: 1 }}>=</div>

            {/* Right — 2 bottles */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', gap: 16, alignItems: 'flex-end' }}>
                {[0, 1].map(i => (
                  <svg key={i} viewBox="0 0 80 160" width="76" height="152" style={{ display: 'block', opacity: 0.55 }}>
                    <ellipse cx="40" cy="152" rx="28" ry="3" fill="rgba(33,32,32,0.12)"/>
                    <rect x="30" y="6" width="20" height="14" rx="2" fill="none" stroke="#212020" strokeWidth="1.5"/>
                    <path d="M 22 24 L 22 142 Q 22 150 30 150 L 50 150 Q 58 150 58 142 L 58 24 Z" fill="rgba(110,139,92,0.18)" stroke="#212020" strokeWidth="1.5"/>
                    <line x1="22" y1="60" x2="58" y2="60" stroke="#212020" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4"/>
                  </svg>
                ))}
              </div>
              <div className="h-display" style={{ fontSize: 80, marginTop: 8, lineHeight: 1 }}>2</div>
              <div className="eyebrow" style={{ marginTop: 8 }}>250ml bottles</div>
              <div style={{ marginTop: 8, fontFamily: 'var(--font-display)', fontSize: 14, opacity: 0.7, textDecoration: 'line-through' }}>S$48 of plastic</div>
            </div>

            {/* Postmark seal */}
            <div className="postmark postmark--yellow" style={{ position: 'absolute', top: -18, right: 24, transform: 'rotate(8deg)', width: 88, height: 88 }}>
              <div>SAVES<br/>· 500g ·<br/>PLASTIC</div>
            </div>
          </div>

          {/* The 3 stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 32 }}>
            {[
              ['80','washes per bar','Tested on shoulder-length hair, twice-weekly wash. Short hair? Closer to 100.'],
              ['0g','plastic packaging','Wrapped in seed paper. Plant the wrapper, get a basil bush.'],
              ['100g','airline-friendly','Carry-on legal. No 100ml liquid limit. Travels in the tin.'],
            ].map(([n, t, p]) => (
              <div key={n} style={{ padding: 24, border: '1px solid var(--color-line)', background: 'var(--color-bg-card)' }}>
                <div className="h-display" style={{ fontSize: 56, color: accent, lineHeight: 1 }}>{n}</div>
                <div className="eyebrow" style={{ marginTop: 8 }}>{t}</div>
                <p style={{ marginTop: 10, fontSize: 13, opacity: 0.78, lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hair-type fit — 6 chips with per-type lather notes */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow">Bars don't suit every head. Here's the honest version.</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>Will it suit your hair?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {[
              ['Fine / oily roots', true, 'Lifts roots beautifully. Caffeine adds visible body.'],
              ['Thick & coarse', true, 'Pair with our deep conditioner bar. Lather generously.'],
              ['Curly / coily', true, 'Lather in palms first, then to hair. Avoid scrubbing.'],
              ['Colour-treated', true, 'Sulfate-free. Won\'t strip pigment within 6 weeks of colour.'],
              ['Dandruff-prone', true, 'Caffeine + scalp massage helps. Try with our Clear Skies tonic.'],
              ['Very dry / damaged', 'maybe', 'Workable, but our Bakuchiol Bay liquid serves dryness better.'],
            ].map(([t, fit, n]) => (
              <div key={t} style={{
                padding: 22,
                background: 'var(--color-bg-card)',
                border: '1.5px solid var(--color-ink)',
                opacity: fit === 'maybe' ? 0.85 : 1,
                display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: fit === true ? accent : (fit === 'maybe' ? '#E8C36A' : '#C4C5CE'),
                  border: '1.5px solid var(--color-ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-ink)',
                }}>{fit === true ? '✓' : '~'}</div>
                <div>
                  <div className="h-display" style={{ fontSize: 18 }}>{t}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>
                    {fit === true ? '✓ great fit' : 'works with conditions'}
                  </div>
                  <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55, opacity: 0.85 }}>{n}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero ingredient — the coffee */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div className="ph ph--world" style={{ aspectRatio: '5/4', '--world-color': accent }}><span style={{ opacity: 0.55 }}>arabica beans · macro</span></div>
          <div>
            <div className="eyebrow">Hero ingredient</div>
            <h2 className="h-typewriter" style={{ fontSize: 40, marginTop: 8 }}>"A bar that smells like the morning before it wakes you."</h2>
            <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.7 }}>
              We cold-brew Indonesian arabica for four hours, then bind that brew straight into the bar. The caffeine stimulates the scalp; the smell — earthy, milky, faintly sweet — earns its keep in the shower.
            </p>
          </div>
        </div>
      </section>

      <window.PDPIngredients items={ACTIVES.map(a => [a.name, a.role, a.story])}/>

      {/* THE FIRST-BAR FIELD GUIDE — unique to bars */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 720 }}>
            <div className="eyebrow" style={{ color: 'var(--color-yellow)' }}>The honest part</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8, color: 'var(--color-bg)' }}>Your first bar: a field guide.</h2>
            <p style={{ marginTop: 16, fontSize: 17, opacity: 0.85, lineHeight: 1.6 }}>
              Switching to a bar takes 3-5 washes. Your hair has years of silicone build-up to work through. Here's what each wash actually feels like — so you don't quit on wash two.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, border: '1.5px solid var(--color-bg)' }}>
            {[
              ['Wash 1','Hmm.','Lather feels different. Hair may seem heavier. This is the residue your old shampoo left behind, lifting.', 0.35],
              ['Wash 2','Stranger.','Possibly waxier mid-lengths. Use a clarifying rinse: 1 tbsp apple cider vinegar in 250ml water.', 0.55],
              ['Wash 3','Wait.','Lather builds faster. Hair feels lighter at the roots. Smells better between washes.', 0.78],
              ['Wash 4','Oh.','Roots stay clean longer. You may go from daily to every-other-day.', 0.92],
              ['Wash 5','Convert.','You\'re here for life. Caffeine + coconut + 80 washes = no going back.', 1.0],
            ].map(([w, h, p, prog], i) => (
              <div key={w} style={{
                padding: 24,
                borderRight: i < 4 ? '1.5px solid var(--color-bg)' : 'none',
                background: 'rgba(248,246,237,0.04)',
                position: 'relative',
                display: 'flex', flexDirection: 'column',
              }}>
                <div className="postmark" style={{ width: 56, height: 56, fontSize: 8, marginBottom: 16, borderColor: 'var(--color-yellow)', color: 'var(--color-yellow)' }}><div>{w.toUpperCase()}</div></div>
                <div className="h-display" style={{ fontSize: 28, color: 'var(--color-yellow)' }}>{h}</div>
                <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.55, opacity: 0.85, flex: 1 }}>{p}</p>
                <div style={{ marginTop: 16, height: 4, background: 'rgba(248,246,237,0.18)', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, width: `${prog * 100}%`, background: 'var(--color-yellow)' }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE — wet/dry diagram */}
      <section className="section--tight section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 44, marginBottom: 32 }}>How to use.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 40 }}>
            {[
              ['Method A · Direct', 'Glide the wet bar 3-4 times along your scalp. Massage. Rinse. Best for thick or coarse hair that needs more concentrated lather.', accent],
              ['Method B · Lather first', 'Rub the bar between wet palms until foamy. Apply foam to hair. Best for fine hair, curly textures, anyone breaking in their first bar.', '#FFB233'],
            ].map(([h, p, c]) => (
              <div key={h} style={{ padding: 28, background: 'var(--color-bg-card)', border: '1.5px solid var(--color-ink)' }}>
                <div style={{ width: 40, height: 50, background: c, border: '1.5px solid var(--color-ink)', marginBottom: 16 }}/>
                <h3 className="h-display" style={{ fontSize: 26 }}>{h}</h3>
                <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.6 }}>{p}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              ['Soak hair fully','Bars need water to lather. Don\'t rush this.'],
              ['Massage 30 seconds','Caffeine works on contact. Take your time.'],
              ['Rinse, then dry the bar','Stand it on edge so water drains. Critical for bar life.'],
            ].map(([s, p], i) => (
              <div key={s} style={{ textAlign: 'left' }}>
                <div className="postmark" style={{ width: 56, height: 56, marginBottom: 12 }}><div>{i+1}</div></div>
                <div className="h-display" style={{ fontSize: 22 }}>{s}</div>
                <p style={{ marginTop: 6, fontSize: 13, opacity: 0.78, lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORAGE cross-sell */}
      <section style={{ background: 'var(--color-yellow)', borderTop: '1.5px solid var(--color-ink)', borderBottom: '1.5px solid var(--color-ink)', padding: '56px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 40, alignItems: 'center' }}>
          <div className="ph" style={{ width: 180, height: 180, background: 'var(--color-bg-card)' }}><span>tin · macro</span></div>
          <div>
            <div className="eyebrow">A bar lives twice as long if you let it dry.</div>
            <h2 className="h-display" style={{ fontSize: 44, marginTop: 8 }}>Add the travel tin.</h2>
            <p style={{ marginTop: 12, fontSize: 16, maxWidth: 540 }}>
              Aluminum, ventilated lid, hand-stamped Java Jungle. Drains the bar between washes, slips into a carry-on. Doubles your washes per bar.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button className="btn btn--ink">Add tin · +S$14</button>
            <button className="tlink">Or buy the bundle (saves S$4) →</button>
          </div>
        </div>
      </section>

      <window.PDPTrustStrip/>

      <window.PDPPairsWith navigate={navigate} heading="Wears well with." items={[
        ['Java Jungle Conditioner Bar','Java Jungle', accent, 18],
        ['Java Jungle Travel Tin','Java Jungle', accent, 14],
        ['Clear Skies Scalp Tonic','Clear Skies','#9CC4D6', 28],
      ]}/>

      <window.PDPReviews/>

      <window.PDPFAQ items={[
        ['Will my hair go through a "transition"?','Yes — and it\'s real. Wash 1-2 may feel waxy or heavy as silicone build-up from old shampoos releases. By wash 4 most people are over the line. The Field Guide above tells you exactly what to expect.'],
        ['What if it doesn\'t click for me?','We offer a one-bar guarantee. Use the whole thing, hate it? Send the empty wrapper back, get a full refund or swap to a liquid Java Jungle. We mean it.'],
        ['Full ingredients (INCI)','Sodium Cocoyl Isethionate, Cocos Nucifera (Coconut) Oil, Theobroma Grandiflorum (Cupuaçu) Butter, Astrocaryum Murumuru Seed Butter, Cocos Nucifera (Coconut) Acid, Coffea Arabica Seed Extract, Caffeine, Glycerin, Hydrolyzed Quinoa Protein, Cetearyl Alcohol, Lactic Acid, Tocopherol, Parfum (Java Jungle accord), Limonene, Linalool. Sulfate-free, silicone-free, palm-oil-free.'],
        ['Is it good for colour-treated hair?','Yes. Sulfate-free formula won\'t strip pigment. We\'d still wait 72h after a fresh colour before first use, like any shampoo.'],
        ['Why is it more expensive per gram than liquid?','It isn\'t — that\'s the trick. 75g of bar = ~500ml of equivalent liquid shampoo. The maths works out at S$0.23/wash, cheaper than most salon brands.'],
        ['Can I bring it on a plane?','Yes. Solid, under 100g, not a liquid. Pop it in the tin, pop the tin in your toiletry bag, breeze through security.'],
      ]}/>
    </main>
  );
}
window.PDPE = PDPE;
