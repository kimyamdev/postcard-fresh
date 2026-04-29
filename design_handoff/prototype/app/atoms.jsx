/* === World data === */
const WORLDS = [
  { slug: 'hotel-lobby', name: 'Hotel Lobby', family: 'Hesperidic Gourmand', tag: 'A bright cup of bergamot with a soft lobby of vanilla.', themeClass: 'world-hotel-lobby', color: '#E8C36A' },
  { slug: 'moon-bloom', name: 'Moon Bloom', family: 'White Floral', tag: 'Quiet jasmine, the night air, a window left open.', themeClass: 'world-moon-bloom', color: '#5C6688' },
  { slug: 'coconut-beach', name: 'Coconut Beach', family: 'Tropical Fruity Gourmand', tag: 'Sunscreen, salt skin, a coconut split open on the sand.', themeClass: 'world-coconut-beach', color: '#E8B796' },
  { slug: 'wild-flowers', name: 'Wild Flowers', family: 'Aromatic Fougère', tag: 'A meadow walk after light rain.', themeClass: 'world-wild-flowers', color: '#C7A8D6' },
  { slug: 'bath-house', name: 'Bath House', family: 'Woody Oriental', tag: 'Cedar steam, warm tile, the slow exhale.', themeClass: 'world-bath-house', color: '#B07A4E' },
  { slug: 'woodland-retreat', name: 'Woodland Retreat', family: 'Aromatic Herbal', tag: 'Pine needles underfoot, a fire just lit.', themeClass: 'world-woodland', color: '#6E7F58' },
  { slug: 'icy-peaks', name: 'Icy Peaks', family: 'Fresh Aromatic', tag: 'Cold mountain air, eucalyptus, a clean breath.', themeClass: 'world-icy-peaks', color: '#9CC4D6' },
];

const ALL_22 = [
  ...WORLDS.map(w => w.name),
  'Smoked Roses','Threads of Nonya','Forever Yours','Oasis Perfume Oil','Bakuchiol Bay','Hyaluronic Heaven','Rose Valley','Ancient Tearoom','Clear Skies','Citrus Circus','Coffee Spot','Java Jungle','Hidden Garden','Curl Cove','Sunlit Terrace'
];

/* === Reusable atoms === */

function Stamp({ name, family, color, size = 'md', onClick, label }) {
  const dims = size === 'lg' ? { w: 140, h: 180 } : size === 'sm' ? { w: 84, h: 108 } : { w: 110, h: 140 };
  return (
    <button
      onClick={onClick}
      style={{
        all: 'unset',
        cursor: onClick ? 'pointer' : 'default',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div className="stamp-frame stamp-side" style={{
        width: dims.w, height: dims.h,
        background: `linear-gradient(160deg, ${color}33, ${color}66)`,
        border: '1.5px solid var(--color-ink)',
        padding: 0,
        position: 'relative',
        boxShadow: '3px 3px 0 var(--color-ink)',
      }}>
        <div style={{
          position: 'absolute', inset: 8,
          border: '1px dashed rgba(33,32,32,0.4)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 8, textAlign: 'center',
        }}>
          <div style={{
            width: '52%', aspectRatio: '1/1', borderRadius: '50%',
            background: color, border: '1.5px solid var(--color-ink)',
            marginBottom: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.1em',
          }}>
            <span style={{ transform: 'rotate(-6deg)' }}>{(name||'').split(' ').map(s=>s[0]).slice(0,2).join('')}</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-headline)',
            fontSize: size === 'lg' ? 14 : 11,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 1.05,
          }}>{name}</div>
          {family && size !== 'sm' && <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 8, marginTop: 4, opacity: 0.7,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>{family}</div>}
        </div>
      </div>
      {label && <div style={{
        fontFamily: 'var(--font-display)', fontSize: 11,
        textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4,
      }}>{label}</div>}
    </button>
  );
}

function ProductCard({ name, world, price, badge, navigate, world_color }) {
  return (
    <article
      onClick={() => navigate && navigate('pdp-a')}
      style={{
        cursor: navigate ? 'pointer' : 'default',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
    >
      <div className="ph ph--world" style={{
        aspectRatio: '4/5', '--world-color': world_color || '#E8C36A',
        position: 'relative',
      }}>
        <span style={{ opacity: 0.55 }}>product · {world}</span>
        {badge && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'var(--color-yellow)',
            border: '1.5px solid var(--color-ink)',
            padding: '4px 10px',
            fontFamily: 'var(--font-display)', fontSize: 10,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>{badge}</div>
        )}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          width: 36, height: 46,
          background: world_color || '#E8C36A',
          border: '1.5px solid var(--color-ink)',
          fontFamily: 'var(--font-display)', fontSize: 9,
          letterSpacing: '0.06em',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: 4,
        }}>{(world||'').split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
      </div>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 10,
          letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.7,
        }}>{world}</div>
        <h3 style={{
          margin: '4px 0 6px',
          fontFamily: 'var(--font-display)',
          fontSize: 16, fontWeight: 400, lineHeight: 1.2,
        }}>{name}</h3>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500 }}>${price}</span>
          <button className="tlink" onClick={(e)=>{e.stopPropagation(); navigate && navigate('pdp-a');}}>Add →</button>
        </div>
      </div>
    </article>
  );
}

function TopNav({ navigate, current }) {
  const [shopOpen, setShopOpen] = React.useState(false);
  const [worldsOpen, setWorldsOpen] = React.useState(false);
  return (
    <>
      {/* Announcement bar */}
      <div style={{
        background: 'var(--color-ink)', color: 'var(--color-bg)',
        textAlign: 'center', padding: '10px 16px',
        fontFamily: 'var(--font-display)', fontSize: 12,
        letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        Free SG shipping over $80 · Refill at our Orchard flagship · <span style={{ color: 'var(--color-yellow)' }}>Postcards in your inbox →</span>
      </div>
      <header style={{
        background: 'var(--color-bg)',
        borderBottom: '1.5px solid var(--color-line)',
        padding: '18px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
        gap: 12, flexWrap: 'nowrap',
      }}>
        <button onClick={() => navigate('home')} style={{
          all: 'unset', cursor: 'pointer',
          fontFamily: 'var(--font-headline)',
          fontSize: 28, letterSpacing: '0.04em', textTransform: 'uppercase',
          whiteSpace: 'nowrap', flex: '0 0 auto',
        }}>POSTCARD<span style={{
          display: 'inline-block', marginLeft: 8,
          fontFamily: 'var(--font-display)', fontSize: 11,
          opacity: 0.6, letterSpacing: '0.16em',
        }}>· SG</span></button>

        <nav style={{ display: 'flex', gap: 14, alignItems: 'center', position: 'relative', flex: '1 1 auto', whiteSpace: 'nowrap', justifyContent: 'center', overflow: 'hidden' }}>
          <button className="tlink" style={{ borderBottom: 'none', position: 'relative' }}
            onMouseEnter={()=>setShopOpen(true)} onMouseLeave={()=>setShopOpen(false)}>
            Shop ▾
            {shopOpen && (
              <div onMouseEnter={()=>setShopOpen(true)} onMouseLeave={()=>setShopOpen(false)}
                style={{
                  position: 'absolute', top: '100%', left: -20,
                  marginTop: 12,
                  background: 'var(--color-bg-card)',
                  border: '1.5px solid var(--color-ink)',
                  boxShadow: 'var(--shadow-stamp)',
                  padding: 24, width: 720, display: 'grid',
                  gridTemplateColumns: 'repeat(4,1fr)', gap: 24, textAlign: 'left',
                  fontFamily: 'var(--font-body)', textTransform: 'none',
                  letterSpacing: 'normal', fontSize: 13,
                }}>
                {[
                  ['By need', ['Body','Hair','Face','Deodorants','Home Fragrance','Lip & Hand','Pet','Kids','Gifts','Accessories']],
                  ['Bestsellers', ['Hotel Lobby Anywhere Fragrance','Pick & Mix','Discovery sets','Hotel Lobby Travel Box']],
                  ['New & limited', ['POSTCARD x SOJAO','POSTCARD x ESSE','POSTCARD x Anya Active','Seasonal']],
                  ['Custom', ['Pick & Mix','Custom Hand & Body Wash','Custom Shampoo','Custom Conditioner']],
                ].map(([title, items]) => (
                  <div key={title}>
                    <div className="eyebrow" style={{ marginBottom: 10 }}>{title}</div>
                    {items.map(i => <div key={i} onClick={()=>{navigate('coll-type'); setShopOpen(false);}} style={{ padding: '4px 0', cursor: 'pointer' }}>{i}</div>)}
                  </div>
                ))}
              </div>
            )}
          </button>
          <button className="tlink" style={{ borderBottom: 'none', position: 'relative' }}
            onMouseEnter={()=>setWorldsOpen(true)} onMouseLeave={()=>setWorldsOpen(false)}>
            Worlds ▾
            {worldsOpen && (
              <div onMouseEnter={()=>setWorldsOpen(true)} onMouseLeave={()=>setWorldsOpen(false)}
                style={{
                  position: 'absolute', top: '100%', left: -40, marginTop: 12,
                  background: 'var(--color-bg-card)',
                  border: '1.5px solid var(--color-ink)',
                  boxShadow: 'var(--shadow-stamp)',
                  padding: 24, width: 760,
                  textAlign: 'left',
                  textTransform: 'none', letterSpacing: 'normal',
                }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                  {WORLDS.map(w => (
                    <div key={w.slug} onClick={() => { navigate('world'); setWorldsOpen(false); }}
                      style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
                      <div style={{
                        width: 36, height: 46, background: w.color,
                        border: '1.5px solid var(--color-ink)',
                        fontFamily: 'var(--font-display)', fontSize: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{w.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13 }}>{w.name}</div>
                        <div style={{ fontSize: 11, opacity: 0.6 }}>{w.family}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={()=>{navigate('worlds-index'); setWorldsOpen(false);}} className="tlink" style={{ marginTop: 18 }}>See all 22 worlds →</button>
              </div>
            )}
          </button>
          <button className="tlink" style={{ borderBottom: current==='refill' ? '1.5px solid var(--color-ink)' : 'none' }} onClick={()=>navigate('refill')}>Refill</button>
          <button className="tlink" style={{ borderBottom: current==='subscriptions' ? '1.5px solid var(--color-ink)' : 'none' }} onClick={()=>navigate('subscriptions')}>Subscribe</button>
          <button className="tlink" style={{ borderBottom: current==='membership' ? '1.5px solid var(--color-ink)' : 'none' }} onClick={()=>navigate('membership')}>Members</button>
          <button className="tlink" style={{ borderBottom: current==='about' ? '1.5px solid var(--color-ink)' : 'none' }} onClick={()=>navigate('about')}>About</button>
          <button className="tlink" style={{ borderBottom: current==='corporate' ? '1.5px solid var(--color-ink)' : 'none' }} onClick={()=>navigate('corporate')}>Corporate</button>
        </nav>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flex: '0 0 auto' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>Search</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 12 }}>Account</span>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 12,
            background: 'var(--color-yellow)', padding: '6px 12px',
            border: '1.5px solid var(--color-ink)',
          }}>Bag · 0</span>
        </div>
      </header>
    </>
  );
}

function Footer({ navigate }) {
  return (
    <footer style={{ background: 'var(--color-ink)', color: 'var(--color-bg)', padding: '72px 32px 28px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          <div>
            <div className="h-display" style={{ fontSize: 32, color: 'var(--color-yellow)' }}>POSTCARDS<br/>IN YOUR INBOX.</div>
            <p style={{ marginTop: 16, fontSize: 14, opacity: 0.8, maxWidth: 320 }}>New worlds, refill news, occasional treats. No spam — promise.</p>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <input placeholder="your@email.com" style={{
                flex: 1, padding: '12px 14px',
                background: 'transparent', border: '1.5px solid var(--color-bg)',
                color: 'var(--color-bg)',
                fontFamily: 'var(--font-body)', fontSize: 14,
              }}/>
              <button className="btn btn--small" style={{ boxShadow: '3px 3px 0 var(--color-yellow)' }}>Send →</button>
            </div>
            <div style={{ marginTop: 12, fontFamily: 'var(--font-display)', fontSize: 11, opacity: 0.7, letterSpacing: '0.1em' }}>Sign up & get $10 off your first $50.</div>
          </div>
          {[
            ['Shop', ['All products','Bestsellers','New & limited','Gifts','Discovery','Custom','Refills']],
            ['Worlds', ['Hotel Lobby','Moon Bloom','Coconut Beach','Bath House','Wild Flowers','See all 22 →']],
            ['Discover', ['About','Membership','Refill','Visit Orchard flagship','Corporate','Workshops','Journal']],
            ['Help & Legal', ['Shipping','Returns','Refill FAQ','Contact','Terms','Privacy','Accessibility']],
          ].map(([title, items]) => (
            <div key={title}>
              <div className="eyebrow" style={{ color: 'var(--color-yellow)', marginBottom: 12 }}>{title}</div>
              {items.map(i => <div key={i} style={{ padding: '5px 0', fontSize: 13, opacity: 0.85, cursor: 'pointer' }}>{i}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(248,246,237,0.2)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {['Made in Singapore','Refillable','Cruelty-free','Vegan-where-possible'].map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-display)', fontSize: 10,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '6px 12px', border: '1.2px solid var(--color-bg)',
                borderRadius: 999,
              }}>· {t} ·</span>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, opacity: 0.6, letterSpacing: '0.1em' }}>
            © 2026 POSTCARD · Life supplies, forever yours.
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { WORLDS, ALL_22, Stamp, ProductCard, TopNav, Footer });
