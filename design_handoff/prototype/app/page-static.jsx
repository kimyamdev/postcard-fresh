function About({ navigate }) {
  return (
    <main>
      <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', minHeight: 600 }}>
        <div className="ph" style={{ aspectRatio: 'auto' }}><span>Hildra · in the beauty kitchen, mid-formulation</span></div>
        <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="eyebrow">Made by humans, in Singapore.</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 7vw, 88px)', marginTop: 12 }}>Do more with less.</h1>
          <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.6, maxWidth: 440 }}>Postcard is a self-care destination, made in our beauty kitchen in Singapore. Effective natural recipes, simple ingredients, the least wasteful packaging we can manage. We're here to make care personal again.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">The beginning</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8 }}>It started with a face that wouldn't behave.</h2>
            <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.7 }}>Hildra had eczema as a kid, acne as a teenager, then it all came back in her twenties. Pharmacy creams worked until they didn't. Expensive serums worked once. The cycle repeated.</p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7 }}>So she started making things in her kitchen. Simple shampoo bars. A face oil with three ingredients. A deodorant that didn't smell like an airport. Her skin agreed. Friends asked. The cookie jar in the kitchen filled, then sold out.</p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7 }}>Postcard was born in 2019 — first as a refillery in Everton Park, then as a brand built around a question: <em>what if self-care was simpler, kinder, and a little bit playful?</em></p>
          </div>
          <div className="ph" style={{ aspectRatio: '4/5' }}><span>cookie-jar refillery, 2019</span></div>
        </div>
      </section>
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 56, marginBottom: 36 }}>Five things we believe.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }}>
            {[
              ['Simplicity','Fewer steps. Fewer ingredients. More impact.','#E8C36A'],
              ['Sustainable, not preachy','Refillable. Recyclable. Optimistic.','#9CC4D6'],
              ['Sensorial transport','Every product is a destination.','#E8B796'],
              ['Made by humans','Mixed, poured, packed in Singapore.','#C7A8D6'],
              ['Personal & playful','Custom blends, postcards in the post.','#FFB233'],
            ].map(([h, p, c]) => (
              <div key={h} className="stamp-frame stamp-side" style={{ padding: 22, background: c, textAlign: 'center' }}>
                <div className="postmark" style={{ margin: '0 auto 14px' }}><div>{h.split(' ')[0].toUpperCase()}</div></div>
                <div className="h-display" style={{ fontSize: 18, lineHeight: 1.1 }}>{h}</div>
                <p style={{ marginTop: 10, fontSize: 12, opacity: 0.85 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <div className="eyebrow">Why postcards?</div>
          <h2 className="h-typewriter" style={{ fontSize: 48, marginTop: 12 }}>Every product is a moment of arrival.</h2>
          <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.7 }}>Every world a destination. Every refill a return trip. The postcard is what you send when you wish someone could feel what you're feeling.</p>
          <div className="script" style={{ marginTop: 40, fontSize: 56 }}>life supplies, forever yours.</div>
        </div>
      </section>
      <section style={{ background: 'var(--color-bg-warm)' }} className="section--tight section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 44, marginBottom: 28 }}>22 worlds. One bathroom shelf at a time.</h2>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 12 }}>
            {WORLDS.map(w => (<div key={w.slug} style={{ flex: '0 0 auto' }}><Stamp name={w.name} family={w.family} color={w.color} size="sm"/></div>))}
            {ALL_22.slice(7).map(n => <div key={n} style={{ flex: '0 0 auto' }}><Stamp name={n} color="#C4C5CE" size="sm"/></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
window.About = About;

function Membership({ navigate }) {
  return (
    <main>
      <section style={{ padding: '80px 0', background: 'var(--color-bg-warm)', textAlign: 'center' }}>
        <div className="container">
          <div className="eyebrow">Postcard Membership</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 96px)', marginTop: 12 }}>Your self-care passport.</h1>
          <p style={{ marginTop: 16, fontSize: 18, opacity: 0.8 }}>Earn coins on every order. Unlock perks the more you visit.</p>
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button className="btn">Join free →</button>
            <button className="tlink">Already a member? Sign in</button>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 48, marginBottom: 32, textAlign: 'center' }}>Three tiers. More love. More rewards.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['Deluxe','Just sign up','1 coin / $1','—','$80+ orders','100 coins',['—','—'],'#FFFDF4'],
              ['Club','$250+ a year','1 coin / $1','$30 gift card','$80+ orders','100 coins',['✓','✓'],'#F2EEDD'],
              ['Villa','$500+ a year','2 coins / $1','$60 gift card','Always free','100 coins',['✓','✓'],'#FFB233'],
            ].map(([t, u, e, g, ship, b, [pals, drops], bg], i) => (
              <div key={t} className="stamp-frame stamp-side" style={{ padding: 32, background: bg, textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 className="h-display" style={{ fontSize: 40 }}>{t}</h3>
                  <div className="postmark"><div>0{i+1}</div></div>
                </div>
                <div style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.75 }}>{u}</div>
                <div style={{ borderTop: '1px dashed var(--color-line)', margin: '20px 0' }}/>
                {[['Earn',e],['Welcome',g],['Shipping',ship],['Birthday',b],['Pals events',pals],['Exclusive drops',drops]].map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--color-line-soft)', fontSize: 13 }}>
                    <span style={{ opacity: 0.7 }}>{k}</span><span style={{ fontFamily: 'var(--font-display)' }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 24, fontFamily: 'var(--font-display)', fontSize: 14 }}>100 coins = $5 store credit.</p>
        </div>
      </section>
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 44, marginBottom: 32 }}>Earning coins is as easy as self-care should be.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {[
              ['Place an order','1 coin / $1 (Deluxe + Club). 2 coins / $1 (Villa).'],
              ['Celebrate your birthday','100 coins.'],
              ['Write a review','20 coins · +10 photo · +15 video.'],
              ['Follow on Instagram','20 coins.'],
              ['Follow on TikTok','20 coins.'],
              ['Refer a friend','You both get 10% off.'],
            ].map(([h, s]) => (
              <div key={h} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-line)', padding: 22, display: 'flex', gap: 16 }}>
                <div className="postmark" style={{ flex: '0 0 auto' }}><div>EARN</div></div>
                <div>
                  <div className="h-display" style={{ fontSize: 18 }}>{h}</div>
                  <div style={{ marginTop: 6, fontSize: 13, opacity: 0.8 }}>{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
window.Membership = Membership;

function Refill({ navigate }) {
  return (
    <main>
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 540 }}>
        <div className="ph" style={{ aspectRatio: 'auto' }}><span>refill counter · steam, glass bottles, sunshine</span></div>
        <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--color-bg-warm)' }}>
          <div className="eyebrow">Forever yours</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 7vw, 88px)', marginTop: 12 }}>Refill, repeat, rejoice.</h1>
          <p style={{ marginTop: 18, fontSize: 17, lineHeight: 1.6, maxWidth: 460 }}>Bring your bottle back. We top it up. Less waste, same scent. You save 20% per refill.</p>
          <div style={{ marginTop: 28, display: 'flex', gap: 16 }}>
            <button className="btn">Find a refill store →</button>
            <button className="tlink">See what's refillable</button>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">We're refill-first</div>
            <h2 className="h-display" style={{ fontSize: 52, marginTop: 8 }}>Less landfill. More postcards.</h2>
            <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.7 }}>Postcard started as a refillery in 2019 — a little corner shop in Everton Park where you brought your bottle and we filled it from a cookie jar. We've grown up since, but the idea hasn't changed.</p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.7 }}>Every refill is a bottle that doesn't go to landfill, a label that gets a second chapter, and a little more space in your bathroom for the things that matter.</p>
          </div>
          <div className="ph" style={{ aspectRatio: '5/4' }}><span>refilled bottle · stack of crushed empties</span></div>
        </div>
      </section>
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 48, marginBottom: 36, textAlign: 'center' }}>Three steps. One coffee.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['Bring it back.','Empty Postcard bottle. Any size, any world.','No FOAMO'],
              ['We refill it.','From the beauty kitchen. Same recipe, same scent.','Made fresh'],
              ['You go again.','Clean it, label it, take it home.','Forever yours'],
            ].map(([h, p, s], i) => (
              <div key={h} className="stamp-frame stamp-side" style={{ background: 'var(--color-bg-card)', padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div className="h-display" style={{ fontSize: 36, opacity: 0.3 }}>0{i+1}</div>
                  <div className="postmark postmark--yellow">{s}</div>
                </div>
                <div className="ph" style={{ aspectRatio: '5/3', marginBottom: 16 }}><span>postcard panel {i+1}</span></div>
                <h3 className="h-typewriter" style={{ fontSize: 24 }}>{h}</h3>
                <p style={{ marginTop: 8, fontSize: 14, opacity: 0.78 }}>{p}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 24, fontFamily: 'var(--font-display)', fontSize: 14 }}>Takes about 5 minutes. We'll throw in a coffee at the Orchard flagship.</p>
        </div>
      </section>
      <section className="section--tight section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[['20%','off every refill'],['80%','less packaging per top-up'],['0','label waste']].map(([n, t]) => (
              <div key={n} style={{ textAlign: 'center', padding: 32, border: '1.5px solid var(--color-ink)' }}>
                <div className="h-display" style={{ fontSize: 88, color: 'var(--color-yellow)', WebkitTextStroke: '1px #212020' }}>{n}</div>
                <div className="eyebrow" style={{ marginTop: 8 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="eyebrow">The catalogue</div>
              <h2 className="h-display" style={{ fontSize: 44, marginTop: 8 }}>Every postcard you can return.</h2>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Body & bath','Hair','Face','Deodorant','Home','Other'].map((t,i) => (
                <button key={t} style={{ all: 'unset', padding: '10px 18px', border: '1.5px solid var(--color-ink)', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', background: i === 0 ? 'var(--color-ink)' : 'transparent', color: i === 0 ? 'var(--color-bg)' : 'var(--color-ink)' }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const w = WORLDS[i % WORLDS.length];
              return <ProductCard key={i} name={`${w.name} Hand & Body Wash`} world={w.name} world_color={w.color} price={26} badge="Refill" navigate={navigate}/>;
            })}
          </div>
        </div>
      </section>
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 44, marginBottom: 32 }}>Where to refill in Singapore.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 32 }}>
            <div style={{ padding: 28, background: 'var(--color-bg-card)', border: '1.5px solid var(--color-ink)', position: 'relative' }}>
              <div className="postmark postmark--yellow" style={{ position: 'absolute', top: 20, right: 20 }}><div>FLAGSHIP<br/>·OPEN·</div></div>
              <div className="ph" style={{ aspectRatio: '5/3', marginBottom: 16 }}><span>Orchard storefront photo</span></div>
              <div className="eyebrow">Our home</div>
              <h3 className="h-display" style={{ fontSize: 32, marginTop: 6 }}>Postcard Flagship · Orchard</h3>
              <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>391 Orchard Road, #02–14 Ngee Ann City<br/>Mon–Thu 10am–9pm · Fri–Sat 10am–10pm · Sun 11am–8pm<br/>+65 6123 4567</div>
              <div style={{ marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button className="tlink">Get directions →</button>
                <button className="tlink" onClick={()=>navigate('flagship')}>Tour the flagship →</button>
              </div>
            </div>
            <div style={{ padding: 28, background: 'var(--color-yellow)', border: '1.5px solid var(--color-ink)' }}>
              <div className="eyebrow">Pop-ups & stockists</div>
              <h3 className="h-display" style={{ fontSize: 28, marginTop: 6 }}>We pop up around Singapore.</h3>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6 }}>Tiong Bahru Bakery weekends, Dempsey market days, plus rotating stockists at Tangs, Naiise, and a few independent boutiques. Sign up to find us next.</p>
              <button className="tlink" style={{ marginTop: 16 }}>See current pop-ups →</button>
            </div>
          </div>
          {/* MAP */}
          <div style={{ position: 'relative', aspectRatio: '21/9', border: '1.5px solid var(--color-ink)', overflow: 'hidden', background: '#E5EDE6' }}>
            {/* stylised map of singapore */}
            <svg viewBox="0 0 800 340" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0v40" fill="none" stroke="#21202012" strokeWidth="0.6"/>
                </pattern>
              </defs>
              <rect width="800" height="340" fill="#DDE7DC"/>
              <rect width="800" height="340" fill="url(#grid)"/>
              {/* coastline silhouette of Singapore-ish */}
              <path d="M40 180 C 80 130, 160 110, 230 120 C 290 128, 330 100, 400 110 C 470 118, 520 95, 600 115 C 670 132, 740 130, 770 160 C 770 200, 740 230, 670 240 C 600 250, 540 250, 470 245 C 400 240, 330 250, 270 245 C 200 240, 120 235, 80 220 C 50 210, 30 195, 40 180 Z"
                fill="#F8F6ED" stroke="#212020" strokeWidth="1.5"/>
              {/* roads */}
              <path d="M120 180 L 700 195" stroke="#21202044" strokeWidth="1" fill="none"/>
              <path d="M200 150 L 250 240" stroke="#21202044" strokeWidth="1" fill="none"/>
              <path d="M450 130 L 480 240" stroke="#21202044" strokeWidth="1" fill="none"/>
              {/* Orchard pin — single flagship */}
              <g transform="translate(420, 165)">
                <circle r="30" fill="#FFB233" stroke="#212020" strokeWidth="2"/>
                <circle r="22" fill="none" stroke="#212020" strokeWidth="0.6"/>
                <text textAnchor="middle" y="-2" fontFamily="Special Elite, monospace" fontSize="9" fill="#212020">FLAG★</text>
                <text textAnchor="middle" y="10" fontFamily="Special Elite, monospace" fontSize="9" fill="#212020">SHIP</text>
                <text x="0" y="54" textAnchor="middle" fontFamily="Special Elite, monospace" fontSize="11" fill="#212020">Orchard</text>
              </g>
              {/* postmark */}
              <g transform="translate(680, 70) rotate(-12)">
                <circle r="42" fill="none" stroke="#212020" strokeWidth="1.5"/>
                <circle r="36" fill="none" stroke="#212020" strokeWidth="0.6"/>
                <text textAnchor="middle" y="-4" fontFamily="Special Elite, monospace" fontSize="9" fill="#212020">POSTCARD</text>
                <text textAnchor="middle" y="8" fontFamily="Special Elite, monospace" fontSize="9" fill="#212020">SINGAPORE</text>
                <text textAnchor="middle" y="20" fontFamily="Special Elite, monospace" fontSize="8" fill="#212020">·  REFILL  ·</text>
              </g>
              <text x="40" y="34" fontFamily="Special Elite, monospace" fontSize="13" fill="#212020" letterSpacing="2">SINGAPORE · REFILL MAP</text>
              <text x="40" y="320" fontFamily="Special Elite, monospace" fontSize="10" fill="#21202099" letterSpacing="1.5">ONE FLAGSHIP · POPUPS ROTATE — SIGN UP TO FIND US NEXT</text>
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
}
window.Refill = Refill;

function Corporate({ navigate }) {
  return (
    <main>
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 520 }}>
        <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--color-ink)', color: 'var(--color-bg)' }}>
          <div className="eyebrow" style={{ color: 'var(--color-yellow)' }}>Corporate & Hospitality</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 7vw, 88px)', marginTop: 12, color: 'var(--color-bg)' }}>Pamper with a postcard.</h1>
          <p style={{ marginTop: 18, fontSize: 17, opacity: 0.85, lineHeight: 1.6, maxWidth: 460 }}>Bespoke gifts, hotel amenities, and brand collaborations — made in Singapore, delivered with care.</p>
          <div style={{ marginTop: 28, display: 'flex', gap: 16 }}>
            <button className="btn">Start an enquiry →</button>
            <button className="tlink" style={{ borderColor: 'var(--color-bg)' }}>Download one-pager (PDF)</button>
          </div>
        </div>
        <div className="ph ph--ink" style={{ aspectRatio: 'auto' }}><span>luxe hamper · top-down</span></div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 48, marginBottom: 32 }}>Three ways we work together.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['Corporate gifts & hampers','Send a gift they\'ll keep.','From $80 / recipient. Bespoke wrap. Logo print available.'],
              ['Hotel & spa amenities','Your guests, our supplies.','Refillable formats. Custom scents. Trusted by Resorts World Sentosa.'],
              ['Brand collaborations','Build something together.','Co-branded products. Workshops. Sustainable merch.'],
            ].map(([h, s, b]) => (
              <div key={h} className="stamp-frame stamp-side" style={{ padding: 28, background: 'var(--color-bg-card)' }}>
                <div className="ph" style={{ aspectRatio: '5/3', marginBottom: 18 }}><span>{h}</span></div>
                <div className="postmark" style={{ marginBottom: 14 }}><div>{h.split(' ')[0].toUpperCase()}</div></div>
                <h3 className="h-display" style={{ fontSize: 22 }}>{s}</h3>
                <p style={{ marginTop: 10, fontSize: 14, opacity: 0.8 }}>{b}</p>
                <button className="tlink" style={{ marginTop: 18 }}>Enquire →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 44, marginBottom: 32 }}>How it works.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {[
              ['Tell us','Form, volume, scent direction.'],
              ['We propose','Within 2 working days.'],
              ['Sample','Physical samples on orders >$1,000.'],
              ['We make','Singapore beauty kitchen.'],
              ['We deliver','Pickup, courier, or direct.'],
            ].map(([h, s], i) => (
              <div key={h} style={{ position: 'relative', padding: 18, border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}>
                <div className="h-display" style={{ fontSize: 28, opacity: 0.3 }}>0{i+1}</div>
                <div className="h-display" style={{ fontSize: 16, marginTop: 4 }}>{h}.</div>
                <p style={{ marginTop: 8, fontSize: 12, opacity: 0.78 }}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56 }}>
          <div>
            <div className="eyebrow">Tell us what you need</div>
            <h2 className="h-display" style={{ fontSize: 44, marginTop: 8 }}>We reply in 2 working days.</h2>
            <p style={{ marginTop: 14, fontSize: 16, opacity: 0.78 }}>No bots, just Postcard humans.</p>
            <div className="script" style={{ marginTop: 36, fontSize: 36, opacity: 0.6 }}>— Hildra & team</div>
          </div>
          <form style={{ background: 'var(--color-bg-warm)', padding: 32, border: '1.5px solid var(--color-ink)' }}>
            {[
              ['Your name *','text'],
              ['Company name *','text'],
              ['Work email *','email'],
              ['Phone (optional)','tel'],
            ].map(([l, t]) => (
              <div key={l} style={{ marginBottom: 16 }}>
                <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>{l}</label>
                <input type={t} style={{ width: '100%', padding: 12, border: '1.5px solid var(--color-ink)', background: 'var(--color-bg)', fontFamily: 'var(--font-body)', fontSize: 14 }}/>
              </div>
            ))}
            <div style={{ marginBottom: 16 }}>
              <label className="eyebrow" style={{ display: 'block', marginBottom: 8 }}>I'm interested in *</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Gifts','Hospitality','Collaboration','Workshop','Other'].map(t => (
                  <label key={t} style={{ padding: '8px 14px', border: '1.5px solid var(--color-ink)', fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    <input type="radio" name="topic" style={{ marginRight: 6 }}/>{t}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="eyebrow" style={{ display: 'block', marginBottom: 6 }}>Tell us more</label>
              <textarea rows={4} style={{ width: '100%', padding: 12, border: '1.5px solid var(--color-ink)', background: 'var(--color-bg)', fontFamily: 'var(--font-body)', fontSize: 14 }}/>
            </div>
            <button className="btn" type="button">Send enquiry →</button>
          </form>
        </div>
      </section>
    </main>
  );
}
window.Corporate = Corporate;

function WorldsIndex({ navigate }) {
  const allList = WORLDS.concat(ALL_22.slice(7).map(n => ({ name: n, family: '', tag: '', color: ['#C7A8D6','#9CC4D6','#E8B796','#FFB233','#6E7F58','#B07A4E','#5C6688'][Math.floor(Math.random()*7)] })));
  return (
    <main>
      <section style={{ padding: '80px 0', textAlign: 'center', background: 'var(--color-bg-warm)' }}>
        <div className="container">
          <div className="eyebrow">22 Worlds</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 96px)', marginTop: 12 }}>One bathroom shelf at a time.</h1>
          <p style={{ marginTop: 16, fontSize: 18, opacity: 0.8 }}>Each one a place we'd like to send you.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Six core fragrance worlds</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 64 }}>
            {WORLDS.map(w => (
              <div key={w.slug} onClick={()=>navigate('world')} style={{ cursor: 'pointer', display: 'flex', gap: 20, padding: 24, border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}>
                <Stamp name={w.name} family={w.family} color={w.color} size="md"/>
                <div>
                  <div className="eyebrow">{w.family}</div>
                  <h3 className="h-display" style={{ fontSize: 24, marginTop: 6 }}>{w.name}</h3>
                  <p style={{ fontSize: 13, opacity: 0.78, marginTop: 8 }}>{w.tag}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Skin · hair · wellness · speciality</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14 }}>
            {ALL_22.slice(7).map((n, i) => (
              <Stamp key={n} name={n} color={['#C7A8D6','#9CC4D6','#E8B796','#FFB233','#6E7F58','#B07A4E','#5C6688'][i%7]} size="sm"/>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
window.WorldsIndex = WorldsIndex;
