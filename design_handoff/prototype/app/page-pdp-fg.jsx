/* PDP-F · Refillable liquid wash (Moon Bloom Hand & Body Wash)
   Refill-led template. The bottle is hardware. The refill is the product.
   - Hardware vs consumable price reveal
   - "How a refill works" — 4-step in-store ritual
   - Year-on-year savings curve
   - Body-zone usage map (hands / body / face-no)
*/

function PDPF({ navigate }) {
  const accent = '#5C6688'; // Moon Bloom — deep night-blue
  const ACTIVES = [
    {
      name: 'Tuberose Absolute',
      role: 'The bloom in the dark',
      story: 'Hand-picked at midnight in southern France when the flower opens. We use 2.4kg of petals per kg of absolute — the reason your skin smells like a garden after.'
    },
    {
      name: 'Glycerin from Beetroot',
      role: 'The kindness',
      story: 'Plant-derived humectant pulls water into the skin while you wash. Why this body wash leaves you softer than you started, even in Singapore aircon.'
    },
    {
      name: 'Coco Glucoside',
      role: 'The clean, the gentle kind',
      story: 'Sugar + coconut, full stop. Lifts dirt without stripping the skin barrier. Mild enough for daily use on every body zone we say yes to.'
    },
  ];

  return (
    <main>
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / Body / Wash / <span style={{ color: 'var(--color-ink)' }}>Moon Bloom Hand & Body Wash</span></div>
      </div>

      {/* Gallery + Buy box */}
      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
          <window.PDPGallery accent={accent} stamp={'REFILL\nFOREVER\nSG'}/>
          <window.PDPBuyBox
            ribbon={(
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 36, background: accent, border: '1.5px solid var(--color-ink)' }}/>
                <span className="eyebrow">Moon Bloom · Hand & Body Wash</span>
              </div>
            )}
            title="Moon Bloom Hand & Body Wash"
            subtitle="A tuberose-and-jasmine wash that lasts long after the shower drain. Buy the bottle once. Refill it for life."
            sizes={['Bottle 300ml','Refill 500ml','Refill 1L']}
            price={28}
          />
        </div>
      </section>

      <window.PDPVerseBand stampName="Moon Bloom" stampFamily="Tuberose Floral · Refillable" stampColor={accent} quote="Buy the bottle once. Refill it for life."/>

      {/* PRIMARY — Hardware vs consumable */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', padding: '8px 18px', border: '1.5px solid var(--color-ink)', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#5C668822' }}>The maths</span>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 16 }}>One bottle. Many lives.</h2>
            <p style={{ marginTop: 14, fontSize: 17, opacity: 0.78, maxWidth: 620, marginInline: 'auto', lineHeight: 1.6 }}>
              The bottle is hardware — heavy glass, brass pump, hand-stamped label. You buy it once. After that, you only ever pay for the soap inside.
            </p>
          </div>

          {/* The split card: bottle (hardware) vs refill (consumable) */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
            border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)',
          }}>
            {/* Hardware */}
            <div style={{ padding: 40, borderRight: '1.5px solid var(--color-ink)', position: 'relative' }}>
              <div className="postmark postmark--ink" style={{ position: 'absolute', top: 16, right: 16, width: 78, height: 78, fontSize: 9 }}>
                <div>BUY<br/>· ONCE ·<br/>FOR LIFE</div>
              </div>
              <div className="eyebrow">The hardware</div>
              <h3 className="h-typewriter" style={{ fontSize: 32, marginTop: 8 }}>The bottle</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: 24 }}>
                <svg viewBox="0 0 100 200" width="110" height="220" style={{ flex: '0 0 auto' }}>
                  <ellipse cx="50" cy="194" rx="32" ry="4" fill="rgba(33,32,32,0.12)"/>
                  {/* pump head */}
                  <rect x="42" y="6" width="16" height="22" rx="2" fill="#212020"/>
                  <rect x="46" y="2" width="8" height="6" fill="#212020"/>
                  <line x1="50" y1="28" x2="50" y2="44" stroke="#212020" strokeWidth="2"/>
                  <ellipse cx="50" cy="46" rx="14" ry="4" fill="#212020"/>
                  {/* glass body */}
                  <rect x="28" y="46" width="44" height="138" rx="4" fill={accent} stroke="#212020" strokeWidth="1.8" opacity="0.9"/>
                  <rect x="28" y="46" width="44" height="20" fill="rgba(248,246,237,0.15)"/>
                  {/* label */}
                  <rect x="34" y="100" width="32" height="44" fill="var(--color-bg)" stroke="#212020" strokeWidth="0.8"/>
                  <text x="50" y="118" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="6" fill="#212020">MOON</text>
                  <text x="50" y="126" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="6" fill="#212020">BLOOM</text>
                  <text x="50" y="138" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="4" fill="#212020" opacity="0.7">SG · 300ml</text>
                </svg>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                    <span className="h-display" style={{ fontSize: 64, lineHeight: 1 }}>S$28</span>
                  </div>
                  <div className="eyebrow" style={{ marginTop: 8 }}>One time</div>
                  <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Heavy glass · won\'t age','Brass pump, replaceable','Lifetime guarantee','Hand-stamped at Orchard'].map(b => (
                      <li key={b} style={{ fontSize: 13, display: 'flex', gap: 8 }}>
                        <span style={{ color: accent, fontFamily: 'var(--font-display)' }}>✓</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Consumable */}
            <div style={{ padding: 40, position: 'relative', background: 'var(--color-bg-warm)' }}>
              <div className="postmark postmark--yellow" style={{ position: 'absolute', top: 16, right: 16, width: 78, height: 78, fontSize: 9, transform: 'rotate(8deg)' }}>
                <div>REFILL<br/>· FOR ·<br/>EVER</div>
              </div>
              <div className="eyebrow">The consumable</div>
              <h3 className="h-typewriter" style={{ fontSize: 32, marginTop: 8 }}>The refill</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: 24 }}>
                <svg viewBox="0 0 100 200" width="110" height="220" style={{ flex: '0 0 auto' }}>
                  <ellipse cx="50" cy="194" rx="36" ry="4" fill="rgba(33,32,32,0.12)"/>
                  {/* aluminium pouch silhouette */}
                  <path d="M 22 30 Q 22 22 30 22 L 70 22 Q 78 22 78 30 L 78 184 Q 78 188 74 188 L 26 188 Q 22 188 22 184 Z" fill={accent} stroke="#212020" strokeWidth="1.8" opacity="0.92"/>
                  <path d="M 22 30 Q 50 26 78 30" stroke="#212020" strokeWidth="0.8" fill="none" opacity="0.4"/>
                  <rect x="34" y="86" width="32" height="56" fill="var(--color-bg)" stroke="#212020" strokeWidth="0.8"/>
                  <text x="50" y="106" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="6" fill="#212020">MOON</text>
                  <text x="50" y="114" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="6" fill="#212020">BLOOM</text>
                  <text x="50" y="126" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="4" fill="#212020" opacity="0.7">REFILL</text>
                  <text x="50" y="134" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="4" fill="#212020" opacity="0.7">500ml</text>
                  {/* spout cap */}
                  <rect x="44" y="14" width="12" height="10" fill="#212020"/>
                </svg>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                    <span className="h-display" style={{ fontSize: 64, lineHeight: 1, color: accent }}>S$18</span>
                  </div>
                  <div className="eyebrow" style={{ marginTop: 8 }}>Per 500ml refill (66% off the bottle)</div>
                  <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['90% less plastic per litre','In-store: pour into bottle, no pouch needed','By post: returnable aluminium pouch','Or 1L pouch at S$32 (saves more)'].map(b => (
                      <li key={b} style={{ fontSize: 13, display: 'flex', gap: 8 }}>
                        <span style={{ color: accent, fontFamily: 'var(--font-display)' }}>✓</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Year curve */}
          <div style={{ marginTop: 48 }}>
            <div className="eyebrow" style={{ textAlign: 'center', marginBottom: 24 }}>Three years on, the maths</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                ['Year 1','S$82','1 bottle + 3 refills · saves S$56 vs new bottles'],
                ['Year 2','S$54','3 refills · same bottle · saves S$74'],
                ['Year 3','S$54','3 refills · same bottle · 1.4kg less plastic'],
              ].map(([y, p, n]) => (
                <div key={y} style={{
                  padding: 24, background: 'var(--color-bg-card)', border: '1px solid var(--color-line)',
                  position: 'relative',
                }}>
                  <div className="eyebrow">{y}</div>
                  <div className="h-display" style={{ fontSize: 56, marginTop: 6, lineHeight: 1 }}>{p}</div>
                  <p style={{ marginTop: 8, fontSize: 13, opacity: 0.78, lineHeight: 1.55 }}>{n}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW A REFILL WORKS — 4 step ritual */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ color: 'var(--color-yellow)' }}>Two ways to refill</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8, color: 'var(--color-bg)' }}>How a refill works.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1.5px solid var(--color-bg)' }}>
            {/* In-store */}
            <div style={{ padding: 32, borderRight: '1.5px solid var(--color-bg)', background: 'rgba(248,246,237,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div className="postmark" style={{ width: 56, height: 56, fontSize: 8, borderColor: 'var(--color-yellow)', color: 'var(--color-yellow)' }}><div>IN<br/>STORE</div></div>
                <div className="h-display" style={{ fontSize: 32, color: 'var(--color-yellow)' }}>At the counter.</div>
              </div>
              <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  ['Bring your bottle.','Any of ours. Any age. Even if the label has faded.'],
                  ['We weigh & wash.','Empty + clean. You watch.'],
                  ['Choose your world.','22 to pick from. Switch worlds anytime.'],
                  ['Pour, cap, pay.','S$18 for 300ml. Walk out in under 5 minutes.'],
                ].map(([h, p], i) => (
                  <li key={h} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'var(--color-yellow)', color: 'var(--color-ink)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 13, flex: '0 0 auto',
                    }}>{i+1}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{h}</div>
                      <p style={{ fontSize: 13, opacity: 0.78, marginTop: 4, lineHeight: 1.55 }}>{p}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <button className="btn btn--small" onClick={()=>navigate('refill')} style={{ marginTop: 20, background: 'var(--color-yellow)', color: 'var(--color-ink)', border: '1.5px solid var(--color-yellow)' }}>Find a refill counter →</button>
            </div>

            {/* By post */}
            <div style={{ padding: 32, background: 'rgba(248,246,237,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                <div className="postmark" style={{ width: 56, height: 56, fontSize: 8, borderColor: 'var(--color-bg)', color: 'var(--color-bg)' }}><div>BY<br/>POST</div></div>
                <div className="h-display" style={{ fontSize: 32, color: 'var(--color-bg)' }}>Mailed home.</div>
              </div>
              <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  ['Order an aluminium pouch.','500ml or 1L. Reusable, returnable, recyclable.'],
                  ['Decant at home.','Slow pour through the spout. Takes 30 seconds.'],
                  ['Drop the empty in any postbox.','Pre-paid return label. We sterilise & reuse.'],
                  ['Earn coins back.','+50 coins per pouch returned. Club tier members get +75.'],
                ].map(([h, p], i) => (
                  <li key={h} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'var(--color-bg)', color: 'var(--color-ink)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 13, flex: '0 0 auto',
                    }}>{i+1}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14 }}>{h}</div>
                      <p style={{ fontSize: 13, opacity: 0.78, marginTop: 4, lineHeight: 1.55 }}>{p}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <button className="btn btn--small" style={{ marginTop: 20, background: 'transparent', color: 'var(--color-bg)', border: '1.5px solid var(--color-bg)' }}>Add a pouch · S$18 →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero ingredient */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div className="ph ph--world" style={{ aspectRatio: '5/4', '--world-color': accent }}><span style={{ opacity: 0.55 }}>tuberose · macro at midnight</span></div>
          <div>
            <div className="eyebrow">Hero ingredient</div>
            <h2 className="h-typewriter" style={{ fontSize: 40, marginTop: 8 }}>"A wash that smells like a garden after midnight."</h2>
            <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.7 }}>
              Tuberose blooms after dark — that's not romance, it's biology. We harvest at midnight when the volatile oils peak, then enfleurage them in coconut fat for six weeks. The smell that lingers on your skin after a shower is the same as a Grasse garden at 1am.
            </p>
          </div>
        </div>
      </section>

      <window.PDPIngredients items={ACTIVES.map(a => [a.name, a.role, a.story])}/>

      {/* BODY-ZONE USAGE MAP — unique to washes */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <div className="eyebrow">Where this wash earns its place</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>Use it on:</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 56, alignItems: 'flex-start' }}>
            {/* Body diagram */}
            <div style={{ flex: '0 0 auto' }}>
              <svg viewBox="0 0 360 380" width="360" height="380">
                {/* Body silhouette — kept centred at x=110 */}
                <g fill="rgba(33,32,32,0.06)" stroke="#212020" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="110" cy="44" r="24"/>
                  <path d="M 86 70 Q 110 76 134 70 L 142 96 L 168 124 L 162 184 L 144 188 L 144 250 Q 144 280 134 308 L 124 350 L 110 354 L 96 350 L 86 308 Q 76 280 76 250 L 76 188 L 58 184 L 52 124 L 78 96 Z"/>
                </g>

                {/* HANDS — both wrists */}
                <g>
                  <circle cx="38" cy="194" r="9" fill={accent} stroke="#212020" strokeWidth="1.5"/>
                  <circle cx="182" cy="194" r="9" fill={accent} stroke="#212020" strokeWidth="1.5"/>
                  <line x1="191" y1="194" x2="216" y2="194" stroke="#212020" strokeWidth="1" strokeDasharray="2 2"/>
                  <text x="220" y="198" fontFamily="Special Elite, monospace" fontSize="12" fill="#212020">Hands · daily</text>
                </g>

                {/* BODY */}
                <g>
                  <circle cx="144" cy="160" r="9" fill={accent} stroke="#212020" strokeWidth="1.5"/>
                  <line x1="153" y1="160" x2="216" y2="160" stroke="#212020" strokeWidth="1" strokeDasharray="2 2"/>
                  <text x="220" y="164" fontFamily="Special Elite, monospace" fontSize="12" fill="#212020">Body · daily</text>
                </g>

                {/* LEGS */}
                <g>
                  <circle cx="135" cy="290" r="9" fill={accent} stroke="#212020" strokeWidth="1.5"/>
                  <line x1="144" y1="290" x2="216" y2="290" stroke="#212020" strokeWidth="1" strokeDasharray="2 2"/>
                  <text x="220" y="294" fontFamily="Special Elite, monospace" fontSize="12" fill="#212020">Legs · post-shave</text>
                </g>

                {/* FACE — yellow X */}
                <g>
                  <circle cx="134" cy="44" r="11" fill="#FFB233" stroke="#212020" strokeWidth="1.5"/>
                  <line x1="129" y1="39" x2="139" y2="49" stroke="#212020" strokeWidth="1.5"/>
                  <line x1="139" y1="39" x2="129" y2="49" stroke="#212020" strokeWidth="1.5"/>
                  <line x1="145" y1="44" x2="216" y2="44" stroke="#212020" strokeWidth="1" strokeDasharray="2 2"/>
                  <text x="220" y="48" fontFamily="Special Elite, monospace" fontSize="12" fill="#212020">Face · skip this</text>
                </g>
              </svg>
            </div>

            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  ['✓','Hands','Daily, no problem','At the kitchen sink, after the gym, before the meal. Coco glucoside is gentle enough for 12 washes a day.'],
                  ['✓','Body','Daily, head-to-toe','Including underarms, chest, back. Glycerin builds a soft barrier as you rinse.'],
                  ['✓','Legs','Post-shave hero','Calms the freshly-shaved feel. The tuberose finish is an added bonus.'],
                  ['×','Face','Use a real cleanser','Body wash pH is great for body skin (5.5). Your face wants a kinder 5.0 — try our Clear Skies cleanser.'],
                ].map(([m, h, t, p]) => (
                  <div key={h} style={{
                    display: 'grid', gridTemplateColumns: '40px 1fr', gap: 18,
                    padding: 18, background: 'var(--color-bg-card)',
                    border: m === '×' ? '1.5px solid #C4A578' : '1.5px solid var(--color-ink)',
                    opacity: m === '×' ? 0.85 : 1,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: m === '✓' ? accent : '#FFB233',
                      border: '1.5px solid var(--color-ink)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontSize: 18,
                    }}>{m}</div>
                    <div>
                      <div className="h-display" style={{ fontSize: 20 }}>{h} <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, opacity: 0.7, fontWeight: 'normal' }}>· {t}</span></div>
                      <p style={{ marginTop: 6, fontSize: 13, lineHeight: 1.55, opacity: 0.85 }}>{p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="section--tight section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 44, marginBottom: 32 }}>How to use.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              ['One full pump','That\'s ~2.5ml. Stop there. More foam, less product.'],
              ['Lather, then linger','Massage into wet skin for 20 seconds. The tuberose develops as it warms.'],
              ['Rinse, leave the smell','Skin will smell like Moon Bloom for hours. That\'s the wash, not your fragrance — wear something complementary.'],
            ].map(([s, p], i) => (
              <div key={s} style={{ textAlign: 'left' }}>
                <div className="postmark" style={{ width: 56, height: 56, marginBottom: 12 }}><div>{i+1}</div></div>
                <div className="h-display" style={{ fontSize: 24 }}>{s}</div>
                <p style={{ marginTop: 6, fontSize: 13, opacity: 0.78, lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <window.PDPTrustStrip/>

      <window.PDPPairsWith navigate={navigate} heading="Other postcards from Moon Bloom." items={[
        ['Moon Bloom Body Lotion','Moon Bloom', accent, 32],
        ['Moon Bloom Anywhere Fragrance','Moon Bloom', accent, 42],
        ['Moon Bloom Reed Diffuser','Moon Bloom', accent, 48],
      ]}/>

      <window.PDPReviews/>

      <window.PDPFAQ items={[
        ['Can I refill an old Postcard bottle from years ago?','Yes — any age, any world. Even if the label\'s faded. Bring it in, we wash and refill.'],
        ['What if I want to switch worlds in the same bottle?','Bring it in empty. We rinse with citric acid, dry, and refill with whatever world you fancy. No charge for the rinse.'],
        ['Is the pump replaceable?','Yes — S$4 for a fresh brass pump if yours stops. Drop in any time, swap on the spot.'],
        ['Full ingredients (INCI)','Aqua, Coco-Glucoside, Lauryl Glucoside, Glycerin (beetroot), Sodium Cocoyl Glutamate, Polyhydroxystearic Acid, Polianthes Tuberosa (Tuberose) Extract, Jasminum Sambac (Jasmine) Extract, Glyceryl Caprylate, Citric Acid, Sodium Benzoate, Potassium Sorbate, Tocopherol, Parfum (Moon Bloom accord), Limonene, Linalool. SLS-free, sulphate-free, palm-oil-free.'],
        ['Is it safe for sensitive skin?','Yes — coco glucoside is one of the gentlest cleansers in cosmetics. Patch test if you\'re reactive to florals (the tuberose absolute is potent).'],
        ['What about the empty refill pouch?','Drop it in any postbox with the prepaid label, we sterilise and reuse. Or recycle the aluminium yourself — they\'re widely accepted.'],
      ]}/>
    </main>
  );
}
window.PDPF = PDPF;

/* ============================================================
   PDP-G · Refillable liquid shampoo (Smoked Roses)
   Refill DNA + hair-specific tuning.
   - Liquid vs bar comparison (cross-link to PDP-E)
   - Hair-type fit (lather expectations differ from bar)
   - Wash routine flow with timing
   - Per-wash maths
   ============================================================ */

function PDPG({ navigate }) {
  const accent = '#8E4F5C'; // Smoked Roses — dusty rose
  const ACTIVES = [
    {
      name: 'Damask Rose Distillate',
      role: 'The smoke and the bloom',
      story: 'Steam-distilled from Bulgarian damask rose, then aged 8 weeks in oak. The "smoked" comes from the wood — phenolic compounds give the rose a velvety, slightly burnt edge.'
    },
    {
      name: 'Sodium Cocoyl Isethionate',
      role: 'The lather, gentle but generous',
      story: 'A coconut-derived sulphate-free cleanser. Foams properly, rinses cleaner than bars, won\'t strip dyed hair. The reason this shampoo doesn\'t feel like a compromise.'
    },
    {
      name: 'Argan Oil + Panthenol',
      role: 'The slip',
      story: 'Argan smooths the cuticle while you wash; panthenol (vitamin B5) penetrates the strand for next-day softness. No silicone build-up to clarify.'
    },
  ];

  return (
    <main>
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / Hair / Shampoo / <span style={{ color: 'var(--color-ink)' }}>Smoked Roses Shampoo</span></div>
      </div>

      <section style={{ padding: '40px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56 }}>
          <window.PDPGallery accent={accent} stamp={'40\nWASHES\nSG'}/>
          <window.PDPBuyBox
            ribbon={(
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 36, background: accent, border: '1.5px solid var(--color-ink)' }}/>
                <span className="eyebrow">Smoked Roses · Refillable Shampoo</span>
              </div>
            )}
            title="Smoked Roses Shampoo"
            subtitle="A rose with woodsmoke on its breath — distilled, aged, bottled. Sulphate-free, silicone-free, refilled forever."
            sizes={['Bottle 300ml','Refill 500ml','Refill 1L']}
            price={32}
          />
        </div>
      </section>

      <window.PDPVerseBand stampName="Smoked Roses" stampFamily="Velvety Rose Wood · Refillable" stampColor={accent} quote="Smells like roses. Behaves like proper shampoo."/>

      {/* PRIMARY — Liquid vs bar table (different from PDP-F) */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', padding: '8px 18px', border: '1.5px solid var(--color-ink)', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#8E4F5C22' }}>Liquid vs bar — pick your path</span>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 16 }}>The shampoo question.</h2>
            <p style={{ marginTop: 14, fontSize: 17, opacity: 0.78, maxWidth: 680, marginInline: 'auto', lineHeight: 1.6 }}>
              We make both. Both are refillable, both work. They suit different lives. The honest table:
            </p>
          </div>

          <div style={{ border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.3fr 1.3fr', background: 'var(--color-ink)', color: 'var(--color-bg)' }}>
              <div style={{ padding: '20px 24px', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>Trait</div>
              <div style={{ padding: '20px 24px', borderLeft: '1px solid rgba(248,246,237,0.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 18, height: 24, background: accent, border: '1.5px solid var(--color-bg)' }}/>
                <div>
                  <div className="h-display" style={{ fontSize: 17 }}>This bottle</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, opacity: 0.7 }}>Smoked Roses · liquid</div>
                </div>
              </div>
              <div style={{ padding: '20px 24px', borderLeft: '1px solid rgba(248,246,237,0.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 18, height: 24, background: '#6E8B5C', border: '1.5px solid var(--color-bg)' }}/>
                <div>
                  <div className="h-display" style={{ fontSize: 17 }}>The bar</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 9, opacity: 0.7 }}>Java Jungle · solid</div>
                </div>
              </div>
            </div>

            {[
              ['Lather','Generous · familiar','Quieter · builds in palms'],
              ['Best for','Long, thick or coloured hair','Short, fine, or travel'],
              ['Cost per wash','S$0.18','S$0.23'],
              ['Plastic per wash','0g (refilled)','0g'],
              ['Travel','Liquid limit applies','Carry-on legal'],
              ['Adjustment period','None','3-5 washes'],
              ['Refill flow','Bottle + pouch','One bar at a time'],
            ].map((row, i) => (
              <div key={row[0]} style={{
                display: 'grid', gridTemplateColumns: '2fr 1.3fr 1.3fr',
                borderTop: '1px solid var(--color-line)',
                background: i % 2 ? 'var(--color-bg-warm)' : 'transparent',
              }}>
                <div style={{ padding: '16px 24px', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>{row[0]}</div>
                <div style={{ padding: '16px 24px', borderLeft: '1px solid var(--color-line)', fontSize: 14 }}>{row[1]}</div>
                <div style={{ padding: '16px 24px', borderLeft: '1px solid var(--color-line)', fontSize: 14, opacity: 0.85 }}>{row[2]}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            <button className="tlink" onClick={()=>navigate('pdp-e')}>Read the bar's case →</button>
            <span style={{ opacity: 0.4 }}>·</span>
            <button className="tlink">Try a Discovery duo (one of each) →</button>
          </div>
        </div>
      </section>

      {/* HAIR TYPE FIT */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow">Liquid lather has its own physics</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>Will it suit your hair?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {[
              ['Long & thick', true, 'Built for this. One pump for fine hair, two for thick. Lather will go further than your last bottle.'],
              ['Curly / coily', true, 'Co-wash on alternate days; this on the third. Low-poo, high glide.'],
              ['Colour-treated', true, 'Sulphate-free. Won\'t strip pigment within 6+ weeks of colour. Salon-tested.'],
              ['Fine & oily roots', true, 'Lather at the scalp, rinse before mid-lengths. Don\'t condition the roots.'],
              ['Dandruff-prone', 'maybe', 'Works between flare-ups. For active scalp, alternate with our Clear Skies tonic.'],
              ['Bleached or chemically treated', true, 'Low pH, conditioning agents protect the cuticle. Pair with the deep treatment.'],
            ].map(([t, fit, n]) => (
              <div key={t} style={{
                padding: 22,
                background: 'var(--color-bg-card)',
                border: '1.5px solid var(--color-ink)',
                opacity: fit === 'maybe' ? 0.88 : 1,
                display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16, alignItems: 'flex-start',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: fit === true ? accent : (fit === 'maybe' ? '#E8C36A' : '#C4C5CE'),
                  border: '1.5px solid var(--color-ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--color-bg)',
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

      {/* Hero ingredient */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div className="ph ph--world" style={{ aspectRatio: '5/4', '--world-color': accent }}><span style={{ opacity: 0.55 }}>damask rose · oak barrel</span></div>
          <div>
            <div className="eyebrow">Hero ingredient</div>
            <h2 className="h-typewriter" style={{ fontSize: 40, marginTop: 8 }}>"A rose, but standing too close to a bonfire."</h2>
            <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.7 }}>
              We distil Bulgarian damask roses in spring, then age the distillate in oak barrels for eight weeks. The wood lends phenolic depth — the kind of "smoke" your nose registers without flames. Wash your hair with this, and you carry a 200-year-old French perfumery technique into the office.
            </p>
          </div>
        </div>
      </section>

      <window.PDPIngredients items={ACTIVES.map(a => [a.name, a.role, a.story])}/>

      {/* HOW A REFILL WORKS — same dual-flow as PDP-F */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ color: 'var(--color-yellow)' }}>The refill ritual</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8, color: 'var(--color-bg)' }}>How you refill.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1.5px solid var(--color-bg)' }}>
            {[
              ['01','Bring it back','Bottle empty? In to our Orchard flagship. Or order a pouch online.'],
              ['02','We weigh, wash, refill','Watch the pour at the counter. 4 minutes door-to-door.'],
              ['03','Pay 60% less','S$22 for 300ml refill. Save S$10 every time. The bottle works forever.'],
              ['04','Earn 50 coins','Per refill returned. Stacks toward your next discovery set.'],
            ].map(([n, h, p], i) => (
              <div key={n} style={{
                padding: 28,
                borderRight: i < 3 ? '1.5px solid var(--color-bg)' : 'none',
                background: 'rgba(248,246,237,0.04)',
                position: 'relative',
              }}>
                <div className="h-display" style={{ fontSize: 56, color: 'var(--color-yellow)', lineHeight: 1 }}>{n}</div>
                <h3 className="h-typewriter" style={{ fontSize: 22, marginTop: 14, color: 'var(--color-bg)' }}>{h}</h3>
                <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.55, opacity: 0.85 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WASH ROUTINE FLOW — unique to liquid shampoo */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <div className="eyebrow">A wash from start to drain</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>The rose ritual.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr auto 1fr', gap: 0, border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)', alignItems: 'stretch' }}>
            {[
              ['Drench','15s','Soak hair until water-heavy. The shampoo doesn\'t lather without it.'],
              ['Pump','—','One full pump for shoulder-length, two for longer. Less, not more.'],
              ['Lather scalp','45s','Massage the roots only. Mid-lengths get the runoff. Caffeine + smoke do the work.'],
              ['Rinse','30s','Lukewarm. Let the suds run through the lengths on their way out.'],
              ['Repeat?','—','Wash 1 only on a normal day. Wash 2 if you\'ve oiled or it\'s post-gym.'],
            ].flatMap(([h, t, p], i, arr) => {
              const card = (
                <div key={h} style={{ padding: 24, position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: -12, left: 16,
                    background: accent, color: 'var(--color-bg)',
                    padding: '4px 10px', fontFamily: 'var(--font-display)', fontSize: 11,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    border: '1.5px solid var(--color-ink)',
                  }}>{t}</div>
                  <div className="h-display" style={{ fontSize: 24, marginTop: 16 }}>{h}</div>
                  <p style={{ marginTop: 10, fontSize: 12, lineHeight: 1.55, opacity: 0.78 }}>{p}</p>
                </div>
              );
              if (i === arr.length - 1) return [card];
              return [card, (
                <div key={`a${i}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px', fontFamily: 'var(--font-display)', fontSize: 22, opacity: 0.4, borderLeft: '1px solid var(--color-line)', borderRight: '1px solid var(--color-line)' }}>→</div>
              )];
            })}
          </div>

          <div style={{ marginTop: 24, padding: 20, background: 'var(--color-yellow)', border: '1.5px solid var(--color-ink)', display: 'flex', alignItems: 'center', gap: 18 }}>
            <div className="postmark postmark--ink" style={{ width: 64, height: 64, fontSize: 9, flex: '0 0 auto' }}><div>NO<br/>· BUILD ·<br/>UP</div></div>
            <div>
              <div className="eyebrow">Silicone-free promise</div>
              <p style={{ marginTop: 4, fontSize: 14 }}>No clarifying needed, ever. The slip comes from argan and panthenol, not cyclomethicone — so nothing accumulates on the strand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Per-wash maths */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section--tight section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['S$0.18','per wash','Refill maths. Cheaper than your morning kopi.'],
              ['40','washes per bottle','At one pump, twice a week. Heavy users get ~25.'],
              ['80%','less plastic','Per litre vs single-use bottle. Pouches are aluminium and recyclable.'],
            ].map(([n, t, p]) => (
              <div key={n} style={{ padding: 24, background: 'var(--color-bg-card)', border: '1px solid var(--color-line)' }}>
                <div className="h-display" style={{ fontSize: 64, color: accent, lineHeight: 1 }}>{n}</div>
                <div className="eyebrow" style={{ marginTop: 8 }}>{t}</div>
                <p style={{ marginTop: 8, fontSize: 13, opacity: 0.78, lineHeight: 1.55 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <window.PDPTrustStrip/>

      <window.PDPPairsWith navigate={navigate} heading="Pairs with this shampoo." items={[
        ['Smoked Roses Conditioner','Smoked Roses', accent, 32],
        ['Smoked Roses Hair Mist','Smoked Roses', accent, 36],
        ['Java Jungle Shampoo Bar','Java Jungle','#6E8B5C', 18],
      ]}/>

      <window.PDPReviews/>

      <window.PDPFAQ items={[
        ['How is this different from the Java Jungle bar?','See the comparison table above. Short version: liquid for thick / coloured / long hair, bar for short / travel / minimalist routines. Both refill, both work, neither is "better."'],
        ['Will it work on bleached hair?','Yes — sulphate-free, low pH (4.8), no harsh actives. Salon-tested post-bleach. Expect noticeably softer day-three hair.'],
        ['Is it really silicone-free?','Yes. The slip you feel is argan oil + panthenol penetrating the strand, not silicone coating it. Means no clarifying, ever.'],
        ['How often should I wash?','Most heads do well on every-other-day. Daily if you sweat or oil; every-third-day if your hair is fine and dry. Listen to your scalp.'],
        ['Full ingredients (INCI)','Aqua, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Glycerin, Sodium Lauroyl Methyl Isethionate, Argania Spinosa (Argan) Kernel Oil, Panthenol, Rosa Damascena (Damask Rose) Distillate (oak-aged), Hydrolyzed Quinoa Protein, Citric Acid, Sodium Benzoate, Potassium Sorbate, Tocopherol, Parfum (Smoked Roses accord), Limonene, Linalool, Geraniol. Sulphate-free, silicone-free, palm-oil-free.'],
        ['Can I buy a refill without owning the bottle yet?','Sure. The 500ml pouch comes with a free pump head — just decant into any clean bottle you have. Or grab the bottle next time.'],
      ]}/>
    </main>
  );
}
window.PDPG = PDPG;
