import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Fit Plate Microgreens",
  description: "Learn about Fit Plate — a Mangalore-based microgreens farm supplying hotels, restaurants and caterers with fresh, hygienically grown greens.",
};

export default function About() {
  return (
    <main>
      <section className="page-hero">
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1640671510956-8c8e1deb0dd9?auto=format&fit=crop&w=1920&q=80')" }}></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs"><Link href="/">Home</Link> / <span>About Us</span></div>
          <div className="eyebrow">About Fit Plate</div>
          <h1>Fresh, local, and grown with care in Mangalore.</h1>
          <p>Fitplate Ventures grows hygienic, pesticide-free microgreens for hotels, restaurants and caterers who care about what lands on the plate.</p>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid-2">
          <div className="reveal">
            <div className="eyebrow">Our Story</div>
            <h2>From a small tray on a windowsill to a farm hotels rely on.</h2>
            <p style={{ marginTop: "18px" }}>Fit Plate began with a simple belief: the freshest, most nutrient-dense food should also be the easiest to get. We grow our microgreens locally in Kodikal, Mangalore, in a controlled, hygienic environment &mdash; free from pesticides and harmful chemicals &mdash; and harvest each tray at the peak of flavour and nutrition.</p>
            <p style={{ marginTop: "14px" }}>Today, we supply hotels, restaurants and caterers across the region with consistent, ready-to-eat microgreens delivered fresh and refrigerated, so kitchens spend less time prepping and more time plating.</p>
            <div className="leaf-divider"></div>
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--forest-900)", fontSize: "18px" }}>"Let's grow a healthier tomorrow, together."</p>
          </div>
          <div className="reveal">
            <img src="https://images.unsplash.com/photo-1593850685398-e79bab596d1d?auto=format&fit=crop&w=1200&q=80" alt="Fit Plate microgreens growing tray" style={{ borderRadius: "var(--radius-lg)", width: "100%", aspectRatio: "3/3.6", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">A Short History</div>
            <h2>How microgreens became a kitchen staple.</h2>
          </div>
          <div className="grid-2 reveal">
            <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
              <div style={{ display: "flex", gap: "18px" }}>
                <div className="icon-badge" style={{ flex: "none" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10" /><path d="M12 20v-8" /><path d="M12 12a5 5 0 0 1-5-5c3 0 5 1 5 5Z" /><path d="M12 8a5 5 0 0 1 5-5c0 3-1 5-5 5Z" /></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "18px" }}>1980s &mdash; Southern California</h3>
                  <p style={{ marginTop: "6px" }}>Microgreens originated as a premium chef's garnish, prized for their intense flavour and delicate texture.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "18px" }}>
                <div className="icon-badge" style={{ flex: "none" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 21h12" /><path d="M8 21V12" /><path d="M16 21V12" /><path d="M6 12c-2-1-2-4 0-5 .5-2 3-3 4-1 1-2 4-1 4 1 2 1 2 4 0 5Z" /></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "18px" }}>1990s &mdash; Fine Dining</h3>
                  <p style={{ marginTop: "6px" }}>Popularity expanded through fine dining kitchens, prized for vibrant colour and premium culinary appeal.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "18px" }}>
                <div className="icon-badge" style={{ flex: "none" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 11 15.5 11 19" /></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: "18px" }}>2000s onward &mdash; Everyday Kitchens</h3>
                  <p style={{ marginTop: "6px" }}>Growing interest in healthy food and sustainable agriculture brought microgreens into home kitchens, supermarkets and indoor farms worldwide.</p>
                </div>
              </div>
            </div>
            <div>
              <p>Growing consumer awareness of nutrition, the rise of farm-to-table dining, urban farming and controlled-environment agriculture have all fuelled the category's growth. A short growing cycle &mdash; most microgreens are ready in 7&ndash;21 days &mdash; combined with strong culinary appeal has made them a commercially attractive crop for growers everywhere, including right here in Mangalore.</p>
              <p style={{ marginTop: "14px" }}>Microgreens today contribute to sustainable food production, local agriculture and dietary diversity &mdash; attractive to growers for their rapid crop turnover, and to consumers for their freshness and convenience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section deep">
        <div className="container">
          <div className="section-head center reveal">
            <div className="eyebrow" style={{ justifyContent: "center", color: "var(--gold-300)" }}>Why Choose Fit Plate</div>
            <h2>Small greens, big care, consistent quality.</h2>
          </div>
          <div className="grid-4 reveal stagger">
            <div className="card" style={{ "--i": 0, background: "rgba(255,255,255,.05)", borderColor: "rgba(255,255,255,.12)", padding: "26px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 11 15.5 11 19" /></svg></div>
              <h3 style={{ color: "#fff", fontSize: "16px", marginTop: "14px" }}>Harvested Fresh Daily</h3>
              <p style={{ marginTop: "8px", fontSize: "13.5px" }}>Picked at the perfect time for maximum nutrition and flavour.</p>
            </div>

            <div className="card" style={{ "--i": 1, background: "rgba(255,255,255,.05)", borderColor: "rgba(255,255,255,.12)", padding: "26px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h13v13H1z" /><path d="M14 8h4l3 3v5h-7V8Z" /><circle cx="5.5" cy="18.5" r="1.5" /><circle cx="17.5" cy="18.5" r="1.5" /></svg></div>
              <h3 style={{ color: "#fff", fontSize: "16px", marginTop: "14px" }}>Locally Grown in Mangalore</h3>
              <p style={{ marginTop: "8px", fontSize: "13.5px" }}>Proudly grown close to home, supporting local and reducing food miles.</p>
            </div>

            <div className="card" style={{ "--i": 2, background: "rgba(255,255,255,.05)", borderColor: "rgba(255,255,255,.12)", padding: "26px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m5 5 14 14" /></svg></div>
              <h3 style={{ color: "#fff", fontSize: "16px", marginTop: "14px" }}>No Pesticides or Harmful Chemicals</h3>
              <p style={{ marginTop: "8px", fontSize: "13.5px" }}>100% safe, clean and natural. Just the way nature intended.</p>
            </div>

            <div className="card" style={{ "--i": 3, background: "rgba(255,255,255,.05)", borderColor: "rgba(255,255,255,.12)", padding: "26px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg></div>
              <h3 style={{ color: "#fff", fontSize: "16px", marginTop: "14px" }}>Hygienically Grown Indoors</h3>
              <p style={{ marginTop: "8px", fontSize: "13.5px" }}>Grown in a controlled environment for purity and hygiene you can trust.</p>
            </div>

            <div className="card" style={{ "--i": 4, background: "rgba(255,255,255,.05)", borderColor: "rgba(255,255,255,.12)", padding: "26px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M4.2 7l15.6 9M4.2 16l15.6-9" /></svg></div>
              <h3 style={{ color: "#fff", fontSize: "16px", marginTop: "14px" }}>Delivered Fresh & Refrigerated</h3>
              <p style={{ marginTop: "8px", fontSize: "13.5px" }}>Carefully packed and chilled to retain freshness and nutrients.</p>
            </div>

            <div className="card" style={{ "--i": 5, background: "rgba(255,255,255,.05)", borderColor: "rgba(255,255,255,.12)", padding: "26px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18a9 6 0 0 1-18 0Z" /><path d="M6 11a6 4 0 0 1 12 0" /></svg></div>
              <h3 style={{ color: "#fff", fontSize: "16px", marginTop: "14px" }}>Ready to Eat</h3>
              <p style={{ marginTop: "8px", fontSize: "13.5px" }}>No cutting, no prep. Just add to your favourite meals.</p>
            </div>

            <div className="card" style={{ "--i": 6, background: "rgba(255,255,255,.05)", borderColor: "rgba(255,255,255,.12)", padding: "26px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19H4.8a2 2 0 0 1-1.7-3l3-5" /><path d="m9 11 3-5.5a2 2 0 0 1 3.5 0L18 9" /><path d="M14 20h3.2a2 2 0 0 0 1.7-3l-1-1.7" /><path d="m9 19 3 3 3-3" /><path d="M12.5 5 15 9" /></svg></div>
              <h3 style={{ color: "#fff", fontSize: "16px", marginTop: "14px" }}>Sustainable Growing Practices</h3>
              <p style={{ marginTop: "8px", fontSize: "13.5px" }}>We care for the planet as much as we care for your health.</p>
            </div>

            <div className="card" style={{ "--i": 7, background: "rgba(255,255,255,.05)", borderColor: "rgba(255,255,255,.12)", padding: "26px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M8.2 12.5 6 21l6-3 6 3-2.2-8.5" /></svg></div>
              <h3 style={{ color: "#fff", fontSize: "16px", marginTop: "14px" }}>Premium Quality, Every Time</h3>
              <p style={{ marginTop: "8px", fontSize: "13.5px" }}>Small greens with big care. Consistent quality, always.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid-2">
          <div className="reveal">
            <img src="https://images.unsplash.com/photo-1640671510956-8c8e1deb0dd9?auto=format&fit=crop&w=1400&q=80" alt="Growing microgreens" style={{ borderRadius: "var(--radius-lg)", width: "100%", aspectRatio: "4/3.4", objectFit: "cover" }} />
          </div>
          <div className="reveal">
            <div className="eyebrow">Our Approach</div>
            <h2>Farming philosophy, kept simple.</h2>
            <p style={{ marginTop: "16px" }}>We grow in small, controlled batches rather than mass production &mdash; it's slower, but it's how we keep every tray consistent. Seeds are sourced carefully, grown without synthetic pesticides, and harvested by hand at their nutritional peak.</p>
            <ul style={{ marginTop: "22px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ color: "var(--gold-600)", marginTop: "2px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span><span>Controlled-environment growing for consistent hygiene and quality</span></li>
              <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ color: "var(--gold-600)", marginTop: "2px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span><span>Low water and space usage compared to conventional produce</span></li>
              <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ color: "var(--gold-600)", marginTop: "2px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span><span>Cold-chain delivery to preserve freshness from farm to kitchen</span></li>
              <li style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}><span style={{ color: "var(--gold-600)", marginTop: "2px" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span><span>Direct relationships with the hotels &amp; restaurants we supply</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container reveal" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,36px)" }}>Curious how Fit Plate can supply your kitchen?</h2>
          <div style={{ marginTop: "26px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-gold">Get in Touch</Link>
            <Link href="/varieties" className="btn btn-outline" style={{ borderColor: "var(--forest-800)", color: "var(--forest-900)" }}>Browse Varieties</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
