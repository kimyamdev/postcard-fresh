/* Sitemap / Full Map page — overview of the entire prototype */
function SiteMap({ navigate }) {
  const sections = [
    {
      title: '01 — The front desk',
      subtitle: 'Where everyone lands first.',
      pages: [
        { id: 'home', name: 'Home', tag: 'Hero · 22 worlds · refill story · gifting · membership · UGC', color: '#FFB233' },
      ],
    },
    {
      title: '02 — Worlds (the destinations)',
      subtitle: 'Six core fragrance worlds + 16 skin/hair/wellness — every product belongs to one.',
      pages: [
        { id: 'worlds-index', name: 'Worlds Index', tag: 'All 22 worlds, browsable as stamps', color: '#9CC4D6' },
        { id: 'world', name: 'World: Hotel Lobby', tag: 'Hero · scent breakdown · rituals · neighbours · refill', color: '#E8C36A' },
      ],
    },
    {
      title: '03 — Product detail templates',
      subtitle: 'Seven templates handle the whole catalogue.',
      pages: [
        { id: 'pdp-a', name: 'PDP-A · Scented Product', tag: 'Hotel Lobby Anywhere Fragrance · scent notes · ingredients · pairs', color: '#E8C36A' },
        { id: 'pdp-b', name: 'PDP-B · Active Skincare', tag: 'Hyaluronic Heaven Serum · benefits · skin-type fit · INCI', color: '#9CC4D6' },
        { id: 'pdp-c', name: 'PDP-C · Gift / Bundle', tag: 'Travel Gift Box · what\'s inside · personalisation · corporate', color: '#C7A8D6' },
        { id: 'pdp-d', name: 'PDP-D · Deodorant', tag: 'Aluminium-free stick · 24h wear test · 4 actives · sensitive-pit fit', color: '#FFB233' },
        { id: 'pdp-e', name: 'PDP-E · Solid bar', tag: 'Java Jungle shampoo bar · format proof · first-bar field guide · hair fit', color: '#6E8B5C' },
        { id: 'pdp-f', name: 'PDP-F · Refillable wash', tag: 'Moon Bloom hand & body · hardware vs consumable · refill ritual · body-zone map', color: '#5C6688' },
        { id: 'pdp-g', name: 'PDP-G · Refillable shampoo', tag: 'Smoked Roses · liquid vs bar table · hair fit · wash routine flow', color: '#8E4F5C' },
      ],
    },
    {
      title: '04 — Collection / shop pages',
      subtitle: 'Two patterns: shop by need-or-type, and shop by occasion.',
      pages: [
        { id: 'coll-type', name: 'Collection · Anywhere Fragrance', tag: 'Filterable grid by world, format, price', color: '#E8B796' },
        { id: 'coll-gifts', name: 'Collection · Gifts', tag: 'Gift-finder tiles · most-sent postcards · hampers', color: '#C7A8D6' },
      ],
    },
    {
      title: '05 — Story & service',
      subtitle: 'The pages that build trust and turn shoppers into members.',
      pages: [
        { id: 'about', name: 'About', tag: 'Origin story · five beliefs · why postcards', color: '#6E7F58' },
        { id: 'membership', name: 'Membership', tag: 'Deluxe · Club · Villa · earn coins', color: '#FFB233' },
        { id: 'refill', name: 'Refill', tag: 'How it works · catalogue · Singapore map', color: '#80B1C7' },
        { id: 'flagship', name: 'Flagship · Orchard', tag: 'Address · 6 zones · events · directions', color: '#FFB233' },
        { id: 'corporate', name: 'Corporate', tag: 'Hotel amenities · gifting · enquiry form', color: '#212020' },
      ],
    },
  ];

  return (
    <main style={{ background: 'var(--color-bg)' }}>
      {/* Hero / explanation */}
      <section style={{ padding: '80px 0 56px', borderBottom: '1.5px solid var(--color-line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 56, alignItems: 'flex-end' }}>
            <div>
              <div className="eyebrow">The full map · 11 pages</div>
              <h1 className="h-display" style={{ fontSize: 'clamp(56px, 8vw, 112px)', marginTop: 12 }}>
                Postcard, end to end.
              </h1>
              <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6, maxWidth: 620 }}>
                A complete site exploration for Postcard SG — from the front door, through the worlds, into product, all the way to corporate gifting and our new Orchard flagship. Click any stamp below to walk that page. Press <kbd style={{ fontFamily: 'var(--font-display)', border: '1px solid var(--color-ink)', padding: '2px 6px', fontSize: 11 }}>m</kbd> from any page to come back here.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
              <div className="postmark postmark--ink" style={{ width: 96, height: 96, fontSize: 9 }}>
                <div>POSTCARD<br/>· SITEMAP ·<br/>v1.0</div>
              </div>
              <div className="postmark postmark--yellow" style={{ width: 96, height: 96, fontSize: 9, transform: 'rotate(8deg)' }}>
                <div>11 PAGES<br/>· READY ·<br/>FOR REVIEW</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {sections.map((s, si) => (
            <div key={s.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div className="eyebrow">Chapter 0{si+1}</div>
                  <h2 className="h-display" style={{ fontSize: 40, marginTop: 6 }}>{s.title}</h2>
                </div>
                <p style={{ fontSize: 15, opacity: 0.78, maxWidth: 480, fontStyle: 'italic' }}>{s.subtitle}</p>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(s.pages.length, 3)}, 1fr)`,
                gap: 24,
              }}>
                {s.pages.map((p, pi) => (
                  <article
                    key={p.id}
                    onClick={() => navigate(p.id)}
                    style={{
                      cursor: 'pointer',
                      background: 'var(--color-bg-card)',
                      border: '1.5px solid var(--color-ink)',
                      boxShadow: '4px 4px 0 var(--color-ink)',
                      padding: 24,
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translate(-3px, -3px)';
                      e.currentTarget.style.boxShadow = '7px 7px 0 var(--color-ink)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = '';
                      e.currentTarget.style.boxShadow = '4px 4px 0 var(--color-ink)';
                    }}
                  >
                    {/* fake postmark with page index */}
                    <div className="postmark" style={{
                      position: 'absolute', top: 16, right: 16,
                      width: 56, height: 56, fontSize: 8,
                    }}>
                      <div>0{si+1}.0{pi+1}</div>
                    </div>

                    {/* preview swatch */}
                    <div className="ph ph--world" style={{
                      '--world-color': p.color,
                      aspectRatio: '5/3',
                      marginBottom: 18,
                      borderColor: 'var(--color-ink)',
                      borderWidth: '1.5px',
                    }}>
                      <span style={{ fontSize: 10, opacity: 0.55 }}>{p.name.toUpperCase()}</span>
                    </div>

                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      {/* mini stamp swatch */}
                      <div style={{
                        width: 36, height: 46,
                        background: p.color,
                        border: '1.5px solid var(--color-ink)',
                        flex: '0 0 auto',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-display)', fontSize: 9,
                        textAlign: 'center', padding: 4, lineHeight: 1.1,
                      }}>{p.name.split(/[ ·]+/).map(s => s[0]).filter(Boolean).slice(0,2).join('')}</div>
                      <div>
                        <div className="eyebrow" style={{ fontSize: 10 }}>Page</div>
                        <h3 className="h-typewriter" style={{ fontSize: 22, marginTop: 4 }}>{p.name}</h3>
                        <p style={{ marginTop: 8, fontSize: 13, opacity: 0.78, lineHeight: 1.5 }}>{p.tag}</p>
                      </div>
                    </div>

                    <div style={{
                      marginTop: 18, paddingTop: 14,
                      borderTop: '1px dashed var(--color-line)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontSize: 11,
                        letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7,
                      }}>visit page</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>→</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The principle */}
      <section style={{ background: 'var(--color-ink)', color: 'var(--color-bg)' }} className="section">
        <div className="container--narrow" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--color-yellow)' }}>The thread that holds it together</div>
          <h2 className="h-typewriter" style={{ fontSize: 56, marginTop: 16, color: 'var(--color-bg)' }}>
            "Every product is a postcard from somewhere."
          </h2>
          <p style={{ marginTop: 24, fontSize: 17, opacity: 0.85, lineHeight: 1.65 }}>
            The site is built around <em>worlds</em>, not categories. Each world has a stamp, a colour, a scent family, a story. Products inherit from their world. Refills bring people home. Members earn the right to discover the next one. The visual language — postmarks, stamps, typewriter type, kraft tones — runs through every page so it always feels like the same letter, sent from the same place.
          </p>
          <div className="script" style={{ marginTop: 40, fontSize: 56, color: 'var(--color-yellow)' }}>
            wish you were here.
          </div>
        </div>
      </section>
    </main>
  );
}
window.SiteMap = SiteMap;
