/* Flagship Store · Orchard — destination page */
function FlagshipOrchard({ navigate }) {
  return (
    <main>
      <div style={{ borderBottom: '1.5px solid var(--color-line-soft)', padding: '14px 0', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        <div className="container" style={{ opacity: 0.7 }}>Home / Visit / <span style={{ color: 'var(--color-ink)' }}>Flagship · Orchard</span></div>
      </div>

      {/* HERO — full bleed split */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        minHeight: 680,
        borderBottom: '1.5px solid var(--color-line)',
        background: 'var(--color-bg)',
      }}>
        <div className="ph" style={{
          aspectRatio: 'auto', minHeight: 600, position: 'relative',
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(255,178,51,0.22) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 80% 90%, rgba(176,122,78,0.20) 0%, transparent 55%),' +
            'repeating-linear-gradient(135deg, rgba(33,32,32,0.04) 0 8px, rgba(33,32,32,0.08) 8px 16px),' +
            'var(--color-bg-warm)',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 360 }}>
            <div style={{ fontSize: 11, opacity: 0.55, marginBottom: 12 }}>FULL-BLEED · STOREFRONT</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Orchard storefront · sunlit yellow awning, refill counter, brass detailing</div>
          </div>
          <div className="postmark postmark--ink" style={{ position: 'absolute', top: 32, left: 32, width: 124, height: 124, fontSize: 10 }}>
            <div>POSTCARD<br/>· FLAGSHIP ·<br/>ORCHARD<br/>EST. 2026</div>
          </div>
          <div className="postmark postmark--yellow" style={{ position: 'absolute', bottom: 32, right: 32, width: 96, height: 96, fontSize: 9, transform: 'rotate(8deg)' }}>
            <div>NEW HOME<br/>· OPENS ·<br/>JUNE 2026</div>
          </div>
        </div>

        <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>You've reached</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 7vw, 96px)' }}>
            Postcard,<br/>Orchard.
          </h1>
          <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.55, maxWidth: 460 }}>
            Our new flagship store. The whole postcard universe under one yellow awning — refill counter, blending bar, scent library, all 22 worlds at arm's reach.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn">Get directions →</button>
            <button className="tlink">Book a blending session</button>
          </div>
          <div className="script" style={{ marginTop: 40, fontSize: 32, transform: 'rotate(-3deg)', opacity: 0.7 }}>
            come and stay a while.
          </div>
        </div>
      </section>

      {/* ADDRESS + HOURS — typewritten card */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'flex-start' }}>
          <div className="stamp-frame stamp-side" style={{ background: 'var(--color-bg-card)', padding: 40 }}>
            <div className="eyebrow">Address & hours</div>
            <h2 className="h-typewriter" style={{ fontSize: 42, marginTop: 8 }}>391 Orchard Road,<br/>#02–14 Ngee Ann City,<br/>Singapore 238872.</h2>
            <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Open</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, lineHeight: 1.9 }}>
                  Mon–Thu · 10am–9pm<br/>
                  Fri–Sat · 10am–10pm<br/>
                  Sun · 11am–8pm
                </div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Reach us</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, lineHeight: 1.9 }}>
                  +65 6123 4567<br/>
                  orchard@postcard.sg<br/>
                  Walk-ins welcome
                </div>
              </div>
            </div>

            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px dashed var(--color-line)', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['MRT · Orchard (3 min)','MRT · Somerset (5 min)','Carpark · Wheelock','Bus · 7, 14, 16, 36'].map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-display)', fontSize: 11,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '6px 12px', border: '1.2px solid var(--color-ink)',
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">Why Orchard</div>
            <h2 className="h-display" style={{ fontSize: 40, marginTop: 8 }}>One home, all 22 worlds.</h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.65 }}>
              We've folded Joo Chiat and Cluny Court into one bigger room — same neighbourhood feeling, more counter space, longer hours, and a working blending bar so you can mix your own bottle while you wait.
            </p>
            <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.65 }}>
              Refill discounts, member events, in-house workshops, and the entire scent library — all on the second floor of Ngee Ann City.
            </p>
            <button className="tlink" style={{ marginTop: 20 }}>Read the opening note from Hildra →</button>
          </div>
        </div>
      </section>

      {/* WHAT'S IN STORE — 6 zones */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <div className="eyebrow">Six rooms inside one store</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8 }}>What's in the flagship.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['The Refill Counter', 'Bring any Postcard bottle. Top it up from our fresh-batch dispensers. 5 minutes, free coffee, 20% off.', '#E8C36A', 'REFILL'],
              ['The Blending Bar', 'Sit down with a Postcard maker and mix your own scent, wash or shampoo. Live, on the counter, in 25 minutes.', '#C7A8D6', 'CUSTOM'],
              ['The Scent Library', 'All 22 worlds in smelling order. Sniff strips, side-by-side. The way we wish every fragrance store felt.', '#9CC4D6', 'LIBRARY'],
              ['The Postcard Lab', 'Workshops every Saturday. Make a candle, blend a face oil, learn to read an INCI list.', '#FFB233', 'WORKSHOPS'],
              ['The Members\' Lounge', 'Free coffee + sparkling water for Club & Villa members. A quiet seat, a magazine, a free postcard to write.', '#E8B796', 'MEMBERS'],
              ['The Concierge', 'Bespoke gift wrapping, hotel-amenity samples, personal shopping, and same-day local delivery.', '#6E7F58', 'CONCIERGE'],
            ].map(([h, p, c, stamp]) => (
              <div key={h} className="stamp-frame stamp-side" style={{ background: 'var(--color-bg-card)', padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 36, height: 46, background: c, border: '1.5px solid var(--color-ink)' }}/>
                  <div className="postmark" style={{ width: 56, height: 56, fontSize: 8 }}><div>{stamp}</div></div>
                </div>
                <div className="ph ph--world" style={{ '--world-color': c, aspectRatio: '4/3', marginBottom: 16 }}>
                  <span style={{ fontSize: 9, opacity: 0.55 }}>{h.toUpperCase()}</span>
                </div>
                <h3 className="h-typewriter" style={{ fontSize: 22 }}>{h}</h3>
                <p style={{ marginTop: 8, fontSize: 14, opacity: 0.78, lineHeight: 1.6 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE — feels like the rest of the prototype */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)', padding: '80px 0' }}>
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <div className="postmark postmark--yellow" style={{ margin: '0 auto 24px' }}><div>FROM<br/>HILDRA<br/>·</div></div>
          <p className="h-typewriter" style={{ fontSize: 40, color: 'var(--color-yellow)', lineHeight: 1.3 }}>
            "We outgrew two corner shops. So we built one big sunlit room. Come visit — we'll keep the kettle on."
          </p>
          <div className="script" style={{ marginTop: 32, fontSize: 36, color: 'var(--color-bg)', opacity: 0.7 }}>— Hildra</div>
        </div>
      </section>

      {/* MAP — singapore stylised, single pin */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 24 }}>
            <div className="eyebrow">Find us</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>Heart of Orchard. Floor 2 of Ngee Ann City.</h2>
          </div>
          <div style={{ position: 'relative', aspectRatio: '21/9', border: '1.5px solid var(--color-ink)', overflow: 'hidden', background: '#E5EDE6' }}>
            <svg viewBox="0 0 800 340" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
              <defs>
                <pattern id="grid-flag" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0v40" fill="none" stroke="#21202012" strokeWidth="0.6"/>
                </pattern>
              </defs>
              <rect width="800" height="340" fill="#DDE7DC"/>
              <rect width="800" height="340" fill="url(#grid-flag)"/>
              {/* coastline */}
              <path d="M40 180 C 80 130, 160 110, 230 120 C 290 128, 330 100, 400 110 C 470 118, 520 95, 600 115 C 670 132, 740 130, 770 160 C 770 200, 740 230, 670 240 C 600 250, 540 250, 470 245 C 400 240, 330 250, 270 245 C 200 240, 120 235, 80 220 C 50 210, 30 195, 40 180 Z"
                fill="#F8F6ED" stroke="#212020" strokeWidth="1.5"/>
              {/* roads — orchard road as a clearer line */}
              <path d="M180 175 L 600 165" stroke="#212020" strokeWidth="1.4" fill="none" strokeDasharray="0"/>
              <text x="220" y="158" fontFamily="Special Elite, monospace" fontSize="10" fill="#21202099" letterSpacing="1.5">ORCHARD ROAD</text>
              <path d="M260 130 L 320 240" stroke="#21202055" strokeWidth="1" fill="none"/>
              <path d="M450 130 L 480 240" stroke="#21202055" strokeWidth="1" fill="none"/>
              {/* Orchard pin — only one, big */}
              <g transform="translate(420, 165)">
                <circle r="34" fill="#FFB233" stroke="#212020" strokeWidth="2"/>
                <circle r="26" fill="none" stroke="#212020" strokeWidth="0.8"/>
                <text textAnchor="middle" y="-3" fontFamily="Special Elite, monospace" fontSize="9" fill="#212020">FLAGSHIP</text>
                <text textAnchor="middle" y="9" fontFamily="Special Elite, monospace" fontSize="11" fill="#212020">★</text>
                <text textAnchor="middle" x="0" y="62" fontFamily="Special Elite, monospace" fontSize="13" fill="#212020">Ngee Ann City</text>
                <text textAnchor="middle" x="0" y="78" fontFamily="Special Elite, monospace" fontSize="10" fill="#21202099">391 Orchard Rd · #02–14</text>
              </g>
              {/* postmark */}
              <g transform="translate(700, 70) rotate(-12)">
                <circle r="46" fill="none" stroke="#212020" strokeWidth="1.5"/>
                <circle r="38" fill="none" stroke="#212020" strokeWidth="0.6"/>
                <text textAnchor="middle" y="-6" fontFamily="Special Elite, monospace" fontSize="9" fill="#212020">POSTCARD</text>
                <text textAnchor="middle" y="6" fontFamily="Special Elite, monospace" fontSize="9" fill="#212020">SINGAPORE</text>
                <text textAnchor="middle" y="20" fontFamily="Special Elite, monospace" fontSize="8" fill="#212020">·  ORCHARD  ·</text>
              </g>
              <text x="40" y="34" fontFamily="Special Elite, monospace" fontSize="13" fill="#212020" letterSpacing="2">SINGAPORE · FLAGSHIP MAP</text>
              <text x="40" y="320" fontFamily="Special Elite, monospace" fontSize="10" fill="#21202099" letterSpacing="1.5">ONE FLAGSHIP · POPUPS ROTATE — SIGN UP TO FIND US NEXT</text>
            </svg>
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>
              ★ Flagship · 391 Orchard Rd, #02–14 Ngee Ann City
            </div>
            <button className="btn btn--small">Open in Google Maps →</button>
          </div>
        </div>
      </section>

      {/* WORKSHOPS / EVENTS schedule */}
      <section style={{ background: 'var(--color-yellow)', borderTop: '1.5px solid var(--color-ink)', borderBottom: '1.5px solid var(--color-ink)' }} className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="eyebrow">What's on</div>
              <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>This month at Orchard.</h2>
            </div>
            <button className="tlink">See full calendar →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {[
              ['Sat 13 June','Candle-pour workshop','11am · 2hrs · $48 · 8 seats'],
              ['Sun 14 June','Refill brunch · free','10–12am · drop-in · members'],
              ['Wed 17 June','Bakuchiol Bay launch','7pm · 1hr · RSVP only'],
              ['Sat 27 June','Custom shampoo lab','3pm · 90 min · $58 · 6 seats'],
            ].map(([d, t, m]) => (
              <div key={t} style={{ background: 'var(--color-bg-card)', border: '1.5px solid var(--color-ink)', padding: 22 }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>{d}</div>
                <div className="h-display" style={{ fontSize: 22, lineHeight: 1.1 }}>{t}.</div>
                <div style={{ marginTop: 10, fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>{m}</div>
                <button className="tlink" style={{ marginTop: 14, fontSize: 11 }}>Book →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP nudge */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">Just for members</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>The lounge upstairs.</h2>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.65 }}>Club & Villa members get free coffee, an open seat, and first dibs on every new world. Membership is free to join — Club kicks in at $250/year, Villa at $500.</p>
            <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
              <button className="btn" onClick={()=>navigate('membership')}>Join the membership →</button>
              <button className="tlink">Already a member? Sign in</button>
            </div>
          </div>
          <div className="ph" style={{ aspectRatio: '5/4' }}><span>members' lounge · seating</span></div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section--tight section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 36, marginBottom: 20 }}>Visiting questions.</h2>
          <div style={{ border: '1.5px solid var(--color-ink)', background: 'var(--color-bg-card)' }}>
            {[
              ['Do I need to book to refill?','No — walk-ins welcome. For workshops and blending-bar appointments though, please book ahead.'],
              ['Can I bring a non-Postcard bottle to refill?','Sadly not. Our recipes are calibrated to our own bottle volumes and seal types. We can sell you a starter empty for $4.'],
              ['Is the store wheelchair accessible?','Yes — full lift access from the Ngee Ann City lobby, level 2. Counter heights are adjustable at the refill bar.'],
              ['What happened to Joo Chiat & Cluny Court?','We folded both shops into the Orchard flagship in June 2026. Same staff, same recipes, more space. The Joo Chiat counter still pops up at neighbourhood markets — sign up for the newsletter for dates.'],
              ['Do you offer corporate or group visits?','Yes — private workshops for groups of 6+. See the corporate page or email orchard@postcard.sg.'],
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
window.FlagshipOrchard = FlagshipOrchard;
