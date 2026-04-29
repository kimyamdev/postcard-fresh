function Home({ navigate }) {
  return (
    <main>
      {/* HERO */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        minHeight: 720,
        borderBottom: '1.5px solid var(--color-line)',
      }}>
        <div className="ph ph--world world-hotel-lobby" style={{
          aspectRatio: 'auto', minHeight: 600,
          fontSize: 14,
        }}>
          <div style={{ textAlign: 'center', maxWidth: 320 }}>
            <div style={{ fontSize: 11, opacity: 0.55, marginBottom: 12 }}>FULL-BLEED · POSTCARDS FROM OUR WORLDS</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>Hotel Lobby · sunlit marble, brass, a vase of yellow tulips</div>
          </div>
          {/* postmark stamp overlay */}
          <div style={{ position: 'absolute', top: 32, left: 32 }}>
            <div className="postmark postmark--ink" style={{ width: 110, height: 110, fontSize: 10 }}>
              <div>POSTCARD<br/>· SINGAPORE ·<br/>EST. 2019</div>
            </div>
          </div>
        </div>
        <div style={{ background: 'var(--color-bg)', padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>You've reached</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(56px, 7vw, 96px)' }}>
            Destination<br/>Self&nbsp;Care.
          </h1>
          <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.55, maxWidth: 420 }}>
            Life supplies, forever yours. From our beauty kitchen in Singapore to your bathroom shelf.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => navigate('worlds-index')}>Find your world →</button>
            <button className="tlink" onClick={() => navigate('coll-type')}>Shop bestsellers</button>
          </div>
          <div className="script" style={{ marginTop: 48, fontSize: 32, transform: 'rotate(-3deg)', opacity: 0.7 }}>
            wish you were here.
          </div>
        </div>
      </section>

      {/* QUICK ACCESS WORLDS */}
      <section style={{ padding: '64px 0 48px', borderBottom: '1.5px solid var(--color-line-soft)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow">Six destinations</div>
              <h2 className="h-display" style={{ fontSize: 40, marginTop: 8 }}>Pick a world.</h2>
            </div>
            <button className="tlink" onClick={()=>navigate('worlds-index')}>See all 22 worlds →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 14 }}>
            {WORLDS.map(w => (
              <div key={w.slug} onClick={()=>navigate('world')} style={{ cursor: 'pointer', textAlign: 'center' }}>
                <Stamp name={w.name} family={w.family} color={w.color} size="md" />
              </div>
            ))}
            <div onClick={()=>navigate('worlds-index')} style={{
              cursor: 'pointer',
              border: '1.5px dashed var(--color-ink)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 11,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textAlign: 'center', padding: 12, lineHeight: 1.3,
            }}>+16 more<br/>worlds →</div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 40, maxWidth: 720 }}>
            <div className="eyebrow">The classics</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8 }}>Postcards we send most often.</h2>
            <p style={{ marginTop: 12, fontSize: 17, opacity: 0.78 }}>The ones you keep coming back to. Sent 1,200+ times in the last 95 days.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            <ProductCard name="Hotel Lobby Anywhere Fragrance" world="Hotel Lobby" world_color="#E8C36A" price="42" badge="#1 bestseller" navigate={navigate}/>
            <ProductCard name="Moon Bloom Anywhere Fragrance" world="Moon Bloom" world_color="#5C6688" price="42" badge="Top sleep scent" navigate={navigate}/>
            <ProductCard name="Hotel Lobby Hand & Body Wash" world="Hotel Lobby" world_color="#E8C36A" price="32" badge="Refillable" navigate={navigate}/>
          </div>
          <div style={{ marginTop: 32 }}>
            <button className="tlink" onClick={()=>navigate('coll-type')}>See all bestsellers →</button>
          </div>
        </div>
      </section>

      {/* MAKE IT YOURS */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }} className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div className="ph ph--ink" style={{ aspectRatio: '4/5' }}>
            <span style={{ opacity: 0.7 }}>video loop · liquid pouring · refill bottle</span>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'var(--color-yellow)' }}>Make it yours</div>
            <h2 className="h-display" style={{ fontSize: 64, marginTop: 12, color: 'var(--color-bg)' }}>A blend with your name on it.</h2>
            <p style={{ marginTop: 18, fontSize: 18, opacity: 0.85, maxWidth: 480 }}>Mix your wash. Pick your scent. Put your fingerprint on it.</p>
            <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['Pick & Mix your bundle →','4 minis · any 4 worlds'],
                ['Custom Hand & Body Wash →','Choose 1 of 22 scents'],
                ['Custom Shampoo →','Tuned to your hair type'],
              ].map(([cta, sub]) => (
                <button key={cta} onClick={()=>navigate('pdp-c')} style={{
                  all: 'unset', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderTop: '1px solid rgba(248,246,237,0.25)',
                  padding: '20px 0',
                }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>{cta}</div>
                    <div style={{ fontSize: 13, opacity: 0.65, marginTop: 4 }}>{sub}</div>
                  </div>
                  <span style={{ color: 'var(--color-yellow)', fontSize: 24 }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVERY */}
      <section className="section--tight section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'center', marginBottom: 36 }}>
            <div>
              <div className="eyebrow">New here?</div>
              <h2 className="h-display" style={{ fontSize: 44, marginTop: 8 }}>Send yourself a try-everything.</h2>
            </div>
            <p style={{ fontSize: 17, opacity: 0.78 }}>Mini sizes, full personalities. Find your world without committing.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['Mini Deodorant Spray Discovery', 6, '$32'],
              ['Mini Deodorant Stick Discovery', 6, '$28'],
              ['Scent Discovery Box', 8, '$48'],
            ].map(([n, c, p]) => (
              <div key={n} className="stamp-frame stamp-side" style={{ padding: 24, background: 'var(--color-bg-warm)' }}>
                <div className="ph" style={{ aspectRatio: '4/3', marginBottom: 16 }}><span>{n}</span></div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.2 }}>{n}</div>
                <div style={{ marginTop: 8, fontSize: 13, opacity: 0.7 }}>{c} mini sizes · {p}</div>
                <button className="btn btn--small" style={{ marginTop: 16 }} onClick={()=>navigate('pdp-c')}>Add to bag →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORLD DEEP DIVE — Hotel Lobby */}
      <section style={{
        background: 'linear-gradient(180deg, #F2EAD0 0%, var(--color-bg) 100%)',
        padding: '96px 0',
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Stamp name="Hotel Lobby" family="Hesperidic Gourmand" color="#E8C36A" size="lg"/>
            <div className="postmark" style={{ position: 'absolute', top: 0, right: 24, transform: 'rotate(12deg)' }}>
              <div>WORLD<br/>OF THE<br/>MONTH</div>
            </div>
          </div>
          <div>
            <div className="eyebrow">World deep-dive · April 2026</div>
            <h2 className="h-typewriter" style={{ fontSize: 64, marginTop: 8 }}>Hotel Lobby.</h2>
            <p style={{ fontFamily: 'var(--font-display)', marginTop: 12, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Hesperidic Gourmand · A bright cup of bergamot with a soft lobby of vanilla.</p>
            <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.65, maxWidth: 540 }}>
              Polished. Refined. Endlessly elegant. Hotel Lobby opens with the brightness of bergamot and orange blossom, then settles into Earl Grey tea, soft vanilla and a brushed apricot warmth — like the moment you push through a revolving door into somewhere that smells looked-after.
            </p>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {['Anywhere Fragrance','Hand & Body Wash','Deodorant Spray','Reed Diffuser'].map(p => (
                <div key={p} style={{ border: '1px solid var(--color-line)', padding: 12, fontFamily: 'var(--font-display)', fontSize: 12, lineHeight: 1.3 }}>
                  <div className="ph ph--world world-hotel-lobby" style={{ aspectRatio: '1/1', marginBottom: 10 }}/>
                  {p}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <button className="btn" onClick={()=>navigate('world')}>Visit Hotel Lobby →</button>
            </div>
          </div>
        </div>
      </section>

      {/* REFILL */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="eyebrow">Refill, repeat, rejoice</div>
            <h2 className="h-display" style={{ fontSize: 64, marginTop: 8 }}>Bring it back. We'll top you up.</h2>
            <p style={{ marginTop: 12, fontSize: 17, maxWidth: 600, margin: '12px auto 0', opacity: 0.78 }}>
              Visit our Orchard flagship. Less waste, same scent. Save 20% on every refill.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              ['01','Bring it back.','Empty Postcard bottle. Any size, any world.','No FOAMO'],
              ['02','We refill it.','From the beauty kitchen. Same recipe, same scent.','Made fresh'],
              ['03','You go again.','Less waste, same scent. Save 20% per visit.','Forever yours'],
            ].map(([n, h, p, stamp]) => (
              <div key={n} className="stamp-frame stamp-side" style={{ background: 'var(--color-bg-card)', padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div className="h-display" style={{ fontSize: 36, opacity: 0.3 }}>{n}</div>
                  <div className="postmark postmark--yellow">{stamp}</div>
                </div>
                <div className="ph" style={{ aspectRatio: '5/3', marginBottom: 16 }}><span>illustrated postcard panel</span></div>
                <h3 className="h-typewriter" style={{ fontSize: 22 }}>{h}</h3>
                <p style={{ marginTop: 8, fontSize: 14, opacity: 0.78 }}>{p}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button className="btn" onClick={()=>navigate('refill')}>See the refill list →</button>
            <button className="tlink" onClick={()=>navigate('refill')}>Find a store →</button>
          </div>
        </div>
      </section>

      {/* GIFTING */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">A postcard for them.</div>
            <h2 className="h-display" style={{ fontSize: 64, marginTop: 8 }}>Send the right scent.</h2>
            <p style={{ marginTop: 16, fontSize: 17, opacity: 0.78, maxWidth: 480 }}>
              Pre-built sets, bespoke hampers, last-minute saves.
            </p>
            <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['For her','For him','For a couple','For yourself','Under $50','Last-minute'].map(p => (
                <button key={p} onClick={()=>navigate('coll-gifts')} style={{
                  all: 'unset', cursor: 'pointer',
                  padding: '10px 18px',
                  border: '1.5px solid var(--color-ink)',
                  borderRadius: 999,
                  fontFamily: 'var(--font-display)', fontSize: 12,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  background: 'var(--color-bg-card)',
                }}>{p}</button>
              ))}
            </div>
            <div style={{ marginTop: 36 }}>
              <button className="btn" onClick={()=>navigate('coll-gifts')}>Browse all gifts →</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {[
              ['Destination: Hotel Lobby Travel Gift Box', '#E8C36A', '$78'],
              ['Destination: Moon Bloom Travel Gift Box', '#5C6688', '$78'],
            ].map(([n, c, p]) => (
              <div key={n} onClick={()=>navigate('pdp-c')} style={{ cursor: 'pointer' }}>
                <div className="ph ph--world" style={{ '--world-color': c, aspectRatio: '4/5', marginBottom: 12 }}>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--color-yellow)', border: '1.5px solid var(--color-ink)', padding: '4px 10px', fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.1em' }}>GIFT</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, lineHeight: 1.3 }}>{n}</div>
                <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500 }}>{p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="eyebrow">Postcard Coins</div>
            <h2 className="h-display" style={{ fontSize: 56, marginTop: 8 }}>Your self-care passport.</h2>
            <p style={{ marginTop: 12, fontSize: 17, opacity: 0.78 }}>Earn coins on every order. Welcome to the lounge.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              ['Deluxe','Just sign up','1 coin / $1','$5 store credit',],
              ['Club','$250+ a year','1 coin / $1','$30 gift card · Pals events',],
              ['Villa','$500+ a year','2 coins / $1','$60 gift card · Free shipping always',],
            ].map(([t, u, e, g], i) => (
              <div key={t} className="stamp-frame stamp-side" style={{
                background: i === 2 ? 'var(--color-yellow)' : 'var(--color-bg-card)',
                padding: 32, textAlign: 'center',
              }}>
                <div className="postmark" style={{ margin: '0 auto 16px' }}><div>TIER 0{i+1}</div></div>
                <h3 className="h-display" style={{ fontSize: 36 }}>{t}</h3>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 6 }}>{u}</div>
                <div style={{ borderTop: '1px dashed var(--color-line)', margin: '20px 0' }}/>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{e}</div>
                <div style={{ marginTop: 12, fontSize: 13, opacity: 0.78 }}>{g}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <button className="btn" onClick={()=>navigate('membership')}>Join the membership →</button>
          </div>
        </div>
      </section>

      {/* BRAND BELIEF */}
      <section style={{ background: 'var(--color-bg-warm)' }} className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div className="ph" style={{ aspectRatio: '4/5' }}><span>Hildra · in the beauty kitchen</span></div>
          <div>
            <div className="eyebrow">Made by humans, in Singapore.</div>
            <h2 className="h-display" style={{ fontSize: 64, marginTop: 8 }}>Do more with less.</h2>
            <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.65 }}>
              Postcard started in 2019 — first as a refillery in Everton Park, then as a brand built around a question: what if self-care was simpler, kinder, and a little bit playful?
            </p>
            <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.65 }}>
              We mix, pour, and pack everything ourselves. Refill where we can. Source from local farms and distilleries. Painstakingly fuss until it's perfect.
            </p>
            <div style={{ marginTop: 28 }}>
              <button className="tlink" onClick={()=>navigate('about')}>Read our story →</button>
            </div>
          </div>
        </div>
      </section>

      {/* PRESS */}
      <section style={{ padding: '56px 0', borderTop: '1.5px solid var(--color-line-soft)', borderBottom: '1.5px solid var(--color-line-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 24, opacity: 0.7 }}>
            "A journey to joy. Not a guilt trip." — picked up by:
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: 32, flexWrap: 'wrap', opacity: 0.55 }}>
            {['VOGUE SINGAPORE','CNA INSIDER','THE STRAITS TIMES','LOCAL LEGEND AWARD'].map(l => (
              <div key={l} style={{ fontFamily: 'var(--font-headline)', fontSize: 22, letterSpacing: '0.04em' }}>{l}</div>
            ))}
          </div>
        </div>
      </section>

      {/* UGC */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <div className="eyebrow">#ThisIsPostcard</div>
            <h2 className="h-display" style={{ fontSize: 48, marginTop: 8 }}>Postcards from our community.</h2>
            <p style={{ marginTop: 8, opacity: 0.78 }}>Tag us for a chance to feature.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="ph" style={{ aspectRatio: '1/1' }}>
                <span style={{ fontSize: 9, opacity: 0.5 }}>@user{i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

window.Home = Home;
