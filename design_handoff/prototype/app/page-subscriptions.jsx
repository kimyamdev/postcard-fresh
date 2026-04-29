/* Subscriptions page — explains the model, the perks, the why-not-to-worry, and showcases what people actually subscribe to */

function Subscriptions({ navigate }) {
  const accent = '#B07A4E'; // warm clay — feels like a habit, a daily ritual

  const POPULAR = [
    { name: 'Hotel Lobby Hand & Body Wash', world: 'Hotel Lobby', color: '#C7A8D6', cadence: 'Every 60 days', subs: 2840, type: 'pdp-f', price: 28 },
    { name: 'Moon Bloom Body Wash', world: 'Moon Bloom', color: '#5C6688', cadence: 'Every 60 days', subs: 1920, type: 'pdp-f', price: 28 },
    { name: 'Smoked Roses Shampoo', world: 'Smoked Roses', color: '#8E4F5C', cadence: 'Every 90 days', subs: 1610, type: 'pdp-g', price: 32 },
    { name: 'Java Jungle Shampoo Bar', world: 'Java Jungle', color: '#6E8B5C', cadence: 'Every 60 days', subs: 1480, type: 'pdp-e', price: 18 },
    { name: 'Bakuchiol Bay Serum', world: 'Bakuchiol Bay', color: '#9CC4D6', cadence: 'Every 30 days', subs: 1240, type: 'pdp-b', price: 64 },
    { name: 'Coconut Beach Deo Stick', world: 'Coconut Beach', color: '#E8B796', cadence: 'Every 60 days', subs: 980, type: 'pdp-d', price: 22 },
  ];

  return (
    <main>
      {/* HERO */}
      <section style={{ background: 'var(--color-bg-warm)', padding: '88px 0 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow" style={{ color: accent }}>Postcard subscriptions</div>
            <h1 className="h-display" style={{ fontSize: 'clamp(64px, 9vw, 128px)', lineHeight: 0.92, marginTop: 18 }}>
              Set it.<br/>
              <span style={{ color: accent, fontStyle: 'italic' }}>Forget</span> it.<br/>
              Save 15%.
            </h1>
            <p style={{ marginTop: 24, fontSize: 20, lineHeight: 1.55, maxWidth: 540 }}>
              The shampoo arrives the week you finish the last one. The hand wash refills before you notice. Your favourite scent shows up like clockwork — and you stop thinking about it.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn">Browse subscribable products →</button>
              <button className="tlink">Already subscribed? Manage in your account</button>
            </div>
          </div>

          {/* Recurring postcard stack — visual metaphor */}
          <div style={{ position: 'relative', height: 380, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            {[0, 1, 2, 3].map(i => {
              const colors = ['#C7A8D6', '#5C6688', '#6E8B5C', '#E8B796'];
              const dates = ['MAR', 'JUN', 'SEP', 'DEC'];
              return (
                <div key={i} style={{
                  position: 'absolute',
                  bottom: 24 + i * 28,
                  left: `calc(50% - 130px + ${i * 12}px)`,
                  width: 260, aspectRatio: '5/3.4',
                  background: 'var(--color-bg-card)',
                  border: '1.5px solid var(--color-ink)',
                  boxShadow: `${4 - i}px ${4 - i}px 0 ${colors[i]}`,
                  transform: `rotate(${(i - 1.5) * 2.4}deg)`,
                  padding: 16,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28, height: 36, background: colors[i],
                      border: '1.5px solid var(--color-ink)',
                    }}/>
                    <div className="postmark" style={{ width: 56, height: 56, fontSize: 8, transform: `rotate(${(i % 2 ? 8 : -6)}deg)` }}>
                      <div>{dates[i]}<br/>· 2026 ·<br/>SG</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 }}>Delivery {i + 1}</div>
                    <div className="h-typewriter" style={{ fontSize: 16, marginTop: 4 }}>From {['Hotel Lobby', 'Moon Bloom', 'Java Jungle', 'Coconut Beach'][i]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust strip — runs along bottom of hero */}
        <div style={{ marginTop: 48, padding: '20px 0', borderTop: '1.5px solid var(--color-ink)', borderBottom: '1.5px solid var(--color-ink)', background: 'var(--color-bg)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            {[
              ['Save 15%', 'every order, every time'],
              ['Free shipping', 'on subscription orders over S$40'],
              ['Skip, swap, pause', 'no questions, no fees'],
              ['Cancel anytime', 'in 2 clicks. We mean it.'],
            ].map(([t, n]) => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div className="h-display" style={{ fontSize: 18 }}>{t}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, opacity: 0.7, marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 4 step ritual */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ display: 'inline-block', padding: '8px 18px', border: '1.5px solid var(--color-ink)', borderRadius: 999, fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#B07A4E22' }}>How it works</span>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 16 }}>Four small steps. One forever-shower.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}>
            {[
              ['01', 'Pick your products', 'Any of the 80+ subscribable items. Mix worlds. Mix categories.', '#C7A8D6'],
              ['02', 'Choose your cadence', '30, 60, or 90 days. Skin first, hair second, scent third — set each one to its own rhythm.', '#5C6688'],
              ['03', 'We post. You shower.', 'Box arrives 3 days before you run out, on average. Tracked, paper-only packaging.', '#6E8B5C'],
              ['04', 'Skip, swap, cancel', 'Anytime. From the email. From your phone. From your account. No call required.', '#FFB233'],
            ].map(([n, h, p, c], i) => (
              <div key={n} style={{
                padding: 32,
                borderRight: i < 3 ? '1.5px solid var(--color-ink)' : 'none',
                position: 'relative',
                background: i % 2 ? 'var(--color-bg-warm)' : 'var(--color-bg-card)',
              }}>
                <div style={{ width: 28, height: 36, background: c, border: '1.5px solid var(--color-ink)', marginBottom: 20 }}/>
                <div className="h-display" style={{ fontSize: 56, color: 'var(--color-ink)', lineHeight: 1, opacity: 0.18 }}>{n}</div>
                <h3 className="h-typewriter" style={{ fontSize: 22, marginTop: 12 }}>{h}</h3>
                <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6, opacity: 0.82 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PERKS — 3-up benefit grid with personality */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 56, maxWidth: 720 }}>
            <div className="eyebrow" style={{ color: 'var(--color-yellow)' }}>The trade you make</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8, color: 'var(--color-bg)' }}>You give us a habit. We give you back time, money, and one less thing to remember.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                tag: 'Set it',
                head: 'One less browser tab.',
                body: 'No more "did I order shampoo?" thoughts at 11pm. Pick once, set the cadence, walk away. Your future self stays clean and lightly perfumed.',
                stat: '4.2',
                statLabel: 'minutes saved per re-order',
                color: '#FFB233',
              },
              {
                tag: 'Forget it',
                head: 'It arrives before you notice.',
                body: 'We watch your last order. By default, we ship a fresh batch 3 days before you typically run out. You can move that window — or just trust it.',
                stat: '3 days',
                statLabel: 'before you finish the last one',
                color: '#C7A8D6',
              },
              {
                tag: 'Save 15%',
                head: 'Loyalty paid in cash, not points.',
                body: '15% off every subscription order, every time. Stacks with member tiers. Free shipping over S$40. The bottle that costs S$28 once costs you S$23.80 forever.',
                stat: '15%',
                statLabel: 'off every order, automatically',
                color: '#6E8B5C',
              },
            ].map(({ tag, head, body, stat, statLabel, color }) => (
              <div key={tag} style={{
                background: 'rgba(248,246,237,0.04)',
                border: '1.5px solid var(--color-bg)',
                padding: 32,
                position: 'relative',
                display: 'flex', flexDirection: 'column',
              }}>
                <div className="postmark" style={{
                  position: 'absolute', top: 18, right: 18, width: 64, height: 64, fontSize: 9,
                  borderColor: color, color: color,
                }}><div>{tag.toUpperCase()}</div></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color, opacity: 0.9 }}>{tag}</div>
                <h3 className="h-display" style={{ fontSize: 30, marginTop: 14, color: 'var(--color-bg)' }}>{head}</h3>
                <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.65, opacity: 0.82, flex: 1 }}>{body}</p>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(248,246,237,0.18)' }}>
                  <div className="h-display" style={{ fontSize: 56, color, lineHeight: 1 }}>{stat}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.72, marginTop: 6 }}>{statLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE NO-WORRIES STRIP — flexibility front and centre */}
      <section className="section--tight section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 56, alignItems: 'center' }}>
            <div className="postmark postmark--yellow" style={{ width: 200, height: 200, fontSize: 13, transform: 'rotate(-6deg)' }}>
              <div>NO<br/>HOSTAGES<br/>·<br/>POSTCARD<br/>SG · 26</div>
            </div>
            <div>
              <div className="eyebrow">The fine print, in friendly typeface</div>
              <h2 className="h-typewriter" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginTop: 12, lineHeight: 1.15 }}>
                Skip a month. Swap your world. Pause for a holiday. Cancel because you've finally cleared your bathroom shelf.
              </h2>
              <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.65, opacity: 0.85 }}>
                Two clicks from any email or your account dashboard. No phone tree, no "we'll miss you" gauntlet, no penalty for leaving and coming back. We treat your subscription like a houseplant: yours to water, yours to give away.
              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[
                  ['Skip an order', 'Until your next cycle'],
                  ['Swap a world', 'Same product, new scent'],
                  ['Change cadence', 'Slower or faster, anytime'],
                  ['Pause indefinitely', 'Resume on a tap'],
                  ['Cancel', 'No questions asked'],
                ].map(([h, n]) => (
                  <div key={h} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.04em' }}>✓ {h}</div>
                    <div style={{ fontSize: 12, opacity: 0.7 }}>{n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT PEOPLE SUBSCRIBE TO */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div className="eyebrow" style={{ color: accent }}>What 12,000+ subscribers ship monthly</div>
              <h2 className="h-display" style={{ fontSize: 56, marginTop: 12 }}>The regulars.</h2>
            </div>
            <button className="tlink">Browse all subscribable products →</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {POPULAR.map((p, i) => (
              <div key={p.name} style={{
                background: 'var(--color-bg-card)',
                border: '1.5px solid var(--color-ink)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.15s ease',
              }}
                onClick={() => navigate(p.type)}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-2px, -2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(0, 0)'}
              >
                {/* Rank badge */}
                <div style={{
                  position: 'absolute', top: 16, left: 16, zIndex: 2,
                  background: 'var(--color-ink)', color: 'var(--color-bg)',
                  padding: '6px 12px',
                  fontFamily: 'var(--font-display)', fontSize: 11,
                  letterSpacing: '0.1em',
                }}>#{i + 1}</div>

                {/* Image area */}
                <div className="ph ph--world" style={{ aspectRatio: '4/3', '--world-color': p.color, position: 'relative' }}>
                  <span style={{ opacity: 0.45, fontSize: 11 }}>{p.world}</span>
                  <div className="postmark postmark--yellow" style={{ position: 'absolute', bottom: 14, right: 14, width: 64, height: 64, fontSize: 8, transform: 'rotate(8deg)' }}>
                    <div>SAVE<br/>· 15% ·<br/>SUB</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 14, height: 18, background: p.color, border: '1px solid var(--color-ink)' }}/>
                    <div className="eyebrow">{p.world}</div>
                  </div>
                  <h3 className="h-typewriter" style={{ fontSize: 20, marginTop: 4 }}>{p.name}</h3>

                  <div style={{ marginTop: 16, padding: '14px 0 0', borderTop: '1px dashed var(--color-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, opacity: 0.65, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Most popular cadence</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, marginTop: 4 }}>{p.cadence}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, opacity: 0.55, textDecoration: 'line-through', fontFamily: 'var(--font-display)' }}>S${p.price}</div>
                      <div className="h-display" style={{ fontSize: 26, color: accent, lineHeight: 1 }}>S${(p.price * 0.85).toFixed(2)}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.62 }}>
                    {p.subs.toLocaleString()} active subscribers
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Discovery box CTA */}
          <div style={{
            marginTop: 48,
            background: 'var(--color-yellow)',
            border: '1.5px solid var(--color-ink)',
            padding: 32,
            display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 32, alignItems: 'center',
          }}>
            <div className="postmark postmark--ink" style={{ width: 100, height: 100, fontSize: 11, flex: '0 0 auto' }}>
              <div>NEW<br/>· 26 ·<br/>BOX</div>
            </div>
            <div>
              <div className="eyebrow">New: the Discovery subscription</div>
              <h3 className="h-display" style={{ fontSize: 32, marginTop: 6 }}>A different world, every quarter.</h3>
              <p style={{ marginTop: 8, fontSize: 14, maxWidth: 580 }}>
                Three travel-size products from a curated world, posted every 90 days. We pick. You discover. Cancel after one box if it's not for you.
              </p>
            </div>
            <button className="btn btn--ink">From S$32/quarter →</button>
          </div>
        </div>
      </section>

      {/* THE COMPARISON — subscription vs one-time */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <div className="eyebrow">Subscription vs one-time, year on year</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>What it actually saves you.</h2>
          </div>

          <div style={{ border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.3fr 1.3fr', background: 'var(--color-ink)', color: 'var(--color-bg)' }}>
              <div style={{ padding: '20px 24px', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>One-shower household, year of</div>
              <div style={{ padding: '20px 24px', borderLeft: '1px solid rgba(248,246,237,0.2)', fontFamily: 'var(--font-display)', fontSize: 13 }}>
                One-time
              </div>
              <div style={{ padding: '20px 24px', borderLeft: '1px solid rgba(248,246,237,0.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 14, height: 18, background: accent, border: '1.5px solid var(--color-bg)' }}/>
                <span className="h-display" style={{ fontSize: 15 }}>Subscription</span>
              </div>
            </div>
            {[
              ['Hand & body wash (refilled)', 'S$112', 'S$95.20'],
              ['Shampoo (refilled)', 'S$128', 'S$108.80'],
              ['Conditioner (refilled)', 'S$128', 'S$108.80'],
              ['Deodorant', 'S$132', 'S$112.20'],
              ['Anywhere fragrance', 'S$84', 'S$71.40'],
              ['Shipping (over S$40 → free on sub)', 'S$48', 'S$0'],
            ].map((row, i) => (
              <div key={row[0]} style={{
                display: 'grid', gridTemplateColumns: '2fr 1.3fr 1.3fr',
                borderTop: '1px solid var(--color-line)',
                background: i % 2 ? 'var(--color-bg-warm)' : 'transparent',
              }}>
                <div style={{ padding: '14px 24px', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.04em', opacity: 0.85 }}>{row[0]}</div>
                <div style={{ padding: '14px 24px', borderLeft: '1px solid var(--color-line)', fontSize: 14 }}>{row[1]}</div>
                <div style={{ padding: '14px 24px', borderLeft: '1px solid var(--color-line)', fontSize: 14, color: accent, fontFamily: 'var(--font-display)' }}>{row[2]}</div>
              </div>
            ))}
            {/* Total row */}
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1.3fr 1.3fr',
              borderTop: '1.5px solid var(--color-ink)',
              background: 'var(--color-bg-warm)',
            }}>
              <div style={{ padding: '20px 24px', fontFamily: 'var(--font-headline)', fontSize: 18, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Annual total</div>
              <div style={{ padding: '20px 24px', borderLeft: '1px solid var(--color-line)', fontFamily: 'var(--font-display)', fontSize: 22 }}>S$632</div>
              <div style={{ padding: '20px 24px', borderLeft: '1px solid var(--color-line)' }}>
                <div className="h-display" style={{ fontSize: 26, color: accent }}>S$496.40</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7, marginTop: 2 }}>You save S$135.60 / year</div>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 18, fontSize: 12, opacity: 0.6, fontStyle: 'italic', textAlign: 'right' }}>
            Based on average household consumption · refills count · cancel anytime · these maths never lie.
          </p>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ background: 'var(--color-bg-warm)', padding: '80px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 56, alignItems: 'center' }}>
          <div className="ph ph--world" style={{ width: 240, height: 240, '--world-color': '#C7A8D6', flex: '0 0 auto' }}><span>customer · portrait</span></div>
          <div>
            <div className="eyebrow">From Mei, subscriber since 2024</div>
            <p className="h-typewriter" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.3, marginTop: 14 }}>
              "I forgot I had a Postcard subscription. Then the box landed. Then I remembered why I have it. Three years and I haven't bought shampoo from anywhere else."
            </p>
            <div style={{ marginTop: 24, fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.06em' }}>
              MEI L. · 4 active subscriptions · Hotel Lobby loyalist
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 className="h-display" style={{ fontSize: 48, marginBottom: 32 }}>The questions everyone asks.</h2>
          <window.PDPFAQ items={[
            ['Is there a minimum commitment?', 'None. You can cancel after your first delivery — no fees, no "are you sure" emails. We\'d rather you come back happy than stay reluctantly.'],
            ['What if I don\'t need it yet?', 'Skip the next order from your dashboard or directly from the email we send 5 days before each ship date. You can skip indefinitely if you\'re running through last month\'s slowly.'],
            ['Can I subscribe to refills only?', 'Yes — once you\'ve bought the bottle, the refill is what your subscription delivers. It costs less, it weighs less, and it counts toward free-shipping thresholds.'],
            ['Can I switch worlds within a subscription?', 'Anytime. Same product, new scent, same cadence. Switch from Hotel Lobby to Moon Bloom in two clicks. Some subscribers rotate four worlds across the year.'],
            ['Does the 15% discount stack with member tiers?', 'Yes. Wanderer gets 15% sub + 5% tier = 20%. Voyager gets 15% sub + 8% tier = 23%. Postmaster gets 15% sub + 10% tier = 25%. Plus the free shipping over S$40.'],
            ['What happens if my card fails?', 'We try twice over 5 days, then email you to update. The order pauses — it doesn\'t cancel. You don\'t lose your subscriber status, your discount, or your custom blend.'],
            ['Will you upsell me to bigger sizes?', 'No. We\'ll suggest the right cadence based on your usage, and we\'ll surface relevant new products in your dashboard — but we don\'t auto-add anything. The box you set is the box you get.'],
          ]}/>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: 'var(--color-yellow)', borderTop: '1.5px solid var(--color-ink)', padding: '72px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 740 }}>
          <div className="eyebrow">Begin your habit</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(48px, 7vw, 80px)', marginTop: 16, lineHeight: 1 }}>
            One subscription.<br/>One less errand.
          </h2>
          <p style={{ marginTop: 20, fontSize: 18, opacity: 0.85 }}>
            Start with one product. Add more when you're ready. Cancel when you're done.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn--ink">Browse subscribable products →</button>
            <button className="tlink" style={{ borderBottom: '1.5px solid var(--color-ink)' }}>Or take the 2-min subscription quiz</button>
          </div>
        </div>
      </section>
    </main>
  );
}
window.Subscriptions = Subscriptions;
