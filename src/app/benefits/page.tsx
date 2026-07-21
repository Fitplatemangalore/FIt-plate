import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefits | Fit Plate Microgreens",
  description: "Discover the nutritional benefits of microgreens and why hotels, restaurants and caterers choose Fit Plate as their supply partner.",
};

export default function Benefits() {
  return (
    <main>
      <section className="page-hero">
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1640671510956-8c8e1deb0dd9?auto=format&fit=crop&w=1920&q=80')" }}></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs"><Link href="/">Home</Link> / <span>Benefits</span></div>
          <div className="eyebrow">Benefits</div>
          <h1>Tiny in size. Powerful in nutrition.</h1>
          <p>Why microgreens matter &mdash; for your health, your kitchen, and the planet.</p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">Why Microgreens Matter</div>
            <h2>Small greens, outsized nutrition.</h2>
          </div>
          <div className="grid-3 reveal stagger">
            <div className="card" style={{ "--i": 0, padding: "30px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="16" height="10" rx="2" /><path d="M22 11v2" /><path d="M6 11v2" /></svg></div>
              <h3 style={{ fontSize: "18px", marginTop: "16px" }}>Nutrient Dense</h3>
              <p style={{ marginTop: "8px", fontSize: "14px" }}>Up to 40x more nutrients than mature vegetables.</p>
            </div>

            <div className="card" style={{ "--i": 1, padding: "30px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg></div>
              <h3 style={{ fontSize: "18px", marginTop: "16px" }}>Boosts Immunity</h3>
              <p style={{ marginTop: "8px", fontSize: "14px" }}>Rich in vitamins, minerals and antioxidants that strengthen your body naturally.</p>
            </div>

            <div className="card" style={{ "--i": 2, padding: "30px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10" /><path d="M12 20v-8" /><path d="M12 12a5 5 0 0 1-5-5c3 0 5 1 5 5Z" /><path d="M12 8a5 5 0 0 1 5-5c0 3-1 5-5 5Z" /></svg></div>
              <h3 style={{ fontSize: "18px", marginTop: "16px" }}>Supports Digestion</h3>
              <p style={{ marginTop: "8px", fontSize: "14px" }}>Contains enzymes and fibre that promote better gut health.</p>
            </div>

            <div className="card" style={{ "--i": 3, padding: "30px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" /></svg></div>
              <h3 style={{ fontSize: "18px", marginTop: "16px" }}>Good for Heart</h3>
              <p style={{ marginTop: "8px", fontSize: "14px" }}>Helps in reducing cholesterol and supports overall heart health.</p>
            </div>

            <div className="card" style={{ "--i": 4, padding: "30px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19H4.8a2 2 0 0 1-1.7-3l3-5" /><path d="m9 11 3-5.5a2 2 0 0 1 3.5 0L18 9" /><path d="M14 20h3.2a2 2 0 0 0 1.7-3l-1-1.7" /><path d="m9 19 3 3 3-3" /><path d="M12.5 5 15 9" /></svg></div>
              <h3 style={{ fontSize: "18px", marginTop: "16px" }}>Sustainable & Eco-Friendly</h3>
              <p style={{ marginTop: "8px", fontSize: "14px" }}>Grown with less water and space &mdash; better for you and the planet.</p>
            </div>

            <div className="card" style={{ "--i": 5, padding: "30px" } as React.CSSProperties}>
              <div className="icon-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18a9 6 0 0 1-18 0Z" /><path d="M6 11a6 4 0 0 1 12 0" /></svg></div>
              <h3 style={{ fontSize: "18px", marginTop: "16px" }}>Versatile & Delicious</h3>
              <p style={{ marginTop: "8px", fontSize: "14px" }}>Adds freshness, flavour and nutrition to any meal, effortlessly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div className="reveal">
            <div className="eyebrow">Nutritional Overview</div>
            <h2>Vitamins, minerals &amp; bioactive compounds, concentrated.</h2>
            <p style={{ marginTop: "16px" }}>Many microgreens are rich in vitamins A, C, E and K, folate, potassium, calcium, iron and magnesium, along with antioxidant compounds such as polyphenols, carotenoids, chlorophyll, glucosinolates, anthocyanins, betalains and flavonoids. Nutrient levels vary by species and growing conditions &mdash; explore our <Link href="/varieties" style={{ color: "var(--forest-800)", textDecoration: "underline" }}>variety-by-variety guide</Link> for specifics.</p>
          </div>
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <span className="tag-pill">Vitamin A</span> <span className="tag-pill">Vitamin C</span> <span className="tag-pill">Vitamin E</span> <span className="tag-pill">Vitamin K</span> <span className="tag-pill">Folate</span> <span className="tag-pill">Potassium</span> <span className="tag-pill">Calcium</span> <span className="tag-pill">Iron</span> <span className="tag-pill">Magnesium</span> <span className="tag-pill">Polyphenols</span> <span className="tag-pill">Carotenoids</span> <span className="tag-pill">Chlorophyll</span> <span className="tag-pill">Glucosinolates</span> <span className="tag-pill">Anthocyanins</span> <span className="tag-pill">Betalains</span> <span className="tag-pill">Flavonoids</span>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head center reveal">
            <div className="eyebrow" style={{ justifyContent: "center" }}>Uses &amp; Applications</div>
            <h2>From garnish to main ingredient.</h2>
          </div>
          <div className="grid-4 reveal stagger">
            <div className="card" style={{ "--i": 0, padding: "26px", textAlign: "center" } as React.CSSProperties}>
              <div className="icon-badge" style={{ margin: "0 auto" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18" /><path d="M12 3a9 9 0 0 1 9 9" /><path d="M12 3a9 9 0 0 0-9 9" /><path d="M12 12v9" /><path d="M6 21h12" /></svg></div>
              <h3 style={{ fontSize: "15px", marginTop: "14px" }}>Salads & Bowls</h3>
            </div>

            <div className="card" style={{ "--i": 1, padding: "26px", textAlign: "center" } as React.CSSProperties}>
              <div className="icon-badge" style={{ margin: "0 auto" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M4 11 12 4l8 7" /><path d="M4 16v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" /></svg></div>
              <h3 style={{ fontSize: "15px", marginTop: "14px" }}>Sandwiches & Wraps</h3>
            </div>

            <div className="card" style={{ "--i": 2, padding: "26px", textAlign: "center" } as React.CSSProperties}>
              <div className="icon-badge" style={{ margin: "0 auto" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l-1.5 15.5a2 2 0 0 1-2 1.5H9.5a2 2 0 0 1-2-1.5L6 3Z" /><path d="M6 8h12" /></svg></div>
              <h3 style={{ fontSize: "15px", marginTop: "14px" }}>Smoothies & Juices</h3>
            </div>

            <div className="card" style={{ "--i": 3, padding: "26px", textAlign: "center" } as React.CSSProperties}>
              <div className="icon-badge" style={{ margin: "0 auto" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18a9 6 0 0 1-18 0Z" /><path d="M6 11a6 4 0 0 1 12 0" /></svg></div>
              <h3 style={{ fontSize: "15px", marginTop: "14px" }}>Soups & Curries</h3>
            </div>

            <div className="card" style={{ "--i": 4, padding: "26px", textAlign: "center" } as React.CSSProperties}>
              <div className="icon-badge" style={{ margin: "0 auto" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 20h20L12 2Z" /><circle cx="12" cy="14" r="1" /><circle cx="9" cy="17" r="1" /><circle cx="15" cy="17" r="1" /></svg></div>
              <h3 style={{ fontSize: "15px", marginTop: "14px" }}>Pizzas & Flatbreads</h3>
            </div>

            <div className="card" style={{ "--i": 5, padding: "26px", textAlign: "center" } as React.CSSProperties}>
              <div className="icon-badge" style={{ margin: "0 auto" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h16" /><path d="M3 13h18" /><path d="M4 17h16" /><path d="M5 9a7 5 0 0 1 14 0" /></svg></div>
              <h3 style={{ fontSize: "15px", marginTop: "14px" }}>Burgers & Sliders</h3>
            </div>

            <div className="card" style={{ "--i": 6, padding: "26px", textAlign: "center" } as React.CSSProperties}>
              <div className="icon-badge" style={{ margin: "0 auto" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 21h12" /><path d="M8 21V12" /><path d="M16 21V12" /><path d="M6 12c-2-1-2-4 0-5 .5-2 3-3 4-1 1-2 4-1 4 1 2 1 2 4 0 5Z" /></svg></div>
              <h3 style={{ fontSize: "15px", marginTop: "14px" }}>Gourmet Garnish</h3>
            </div>

            <div className="card" style={{ "--i": 7, padding: "26px", textAlign: "center" } as React.CSSProperties}>
              <div className="icon-badge" style={{ margin: "0 auto" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10" /><path d="M12 20v-8" /><path d="M12 12a5 5 0 0 1-5-5c3 0 5 1 5 5Z" /><path d="M12 8a5 5 0 0 1 5-5c0 3-1 5-5 5Z" /></svg></div>
              <h3 style={{ fontSize: "15px", marginTop: "14px" }}>Functional Foods</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="section deep" id="business">
        <div className="container">
          <div className="section-head center reveal">
            <div className="eyebrow" style={{ justifyContent: "center", color: "var(--gold-300)" }}>For Hotels, Restaurants &amp; Caterers</div>
            <h2>A supply partner your kitchen can rely on.</h2>
            <p>Consistent quality, reliable delivery, and hygiene standards built for commercial kitchens.</p>
          </div>
          <div className="grid-2 reveal" style={{ gap: "48px", alignItems: "center" }}>
            <img src="https://images.unsplash.com/photo-1647613233075-e0d5546b0f22?auto=format&fit=crop&w=1400&q=80" alt="Fit Plate microgreens tray" style={{ borderRadius: "var(--radius-lg)", width: "100%", aspectRatio: "4/3.2", objectFit: "cover" }} />
            <ul style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <li style={{ display: "flex", gap: "16px" }}>
                <div className="icon-badge" style={{ flex: "none" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h13v13H1z" /><path d="M14 8h4l3 3v5h-7V8Z" /><circle cx="5.5" cy="18.5" r="1.5" /><circle cx="17.5" cy="18.5" r="1.5" /></svg></div>
                <div><h3 style={{ color: "#fff", fontSize: "16.5px" }}>Consistent Bulk Supply</h3><p style={{ marginTop: "6px", fontSize: "14px" }}>Reliable weekly or daily delivery schedules built around your kitchen's volume.</p></div>
              </li>

              <li style={{ display: "flex", gap: "16px" }}>
                <div className="icon-badge" style={{ flex: "none" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M4.2 7l15.6 9M4.2 16l15.6-9" /></svg></div>
                <div><h3 style={{ color: "#fff", fontSize: "16.5px" }}>Freshness Guarantee</h3><p style={{ marginTop: "6px", fontSize: "14px" }}>Delivered fresh and refrigerated to preserve nutrients, colour and shelf life.</p></div>
              </li>

              <li style={{ display: "flex", gap: "16px" }}>
                <div className="icon-badge" style={{ flex: "none" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg></div>
                <div><h3 style={{ color: "#fff", fontSize: "16.5px" }}>Hygiene You Can Trust</h3><p style={{ marginTop: "6px", fontSize: "14px" }}>Grown in a controlled, pesticide-free environment for consistent food safety.</p></div>
              </li>

              <li style={{ display: "flex", gap: "16px" }}>
                <div className="icon-badge" style={{ flex: "none" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18a9 6 0 0 1-18 0Z" /><path d="M6 11a6 4 0 0 1 12 0" /></svg></div>
                <div><h3 style={{ color: "#fff", fontSize: "16.5px" }}>Custom Packaging & Pricing</h3><p style={{ marginTop: "6px", fontSize: "14px" }}>Bulk and HORECA pricing, with packaging suited to your storage and service needs.</p></div>
              </li>
            </ul>
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }} className="reveal">
            <Link href="/contact" className="btn btn-gold">Request Wholesale Pricing <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container reveal" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,34px)" }}>Add fresh microgreens to your menu.</h2>
          <div style={{ marginTop: "26px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-gold">Contact Us</Link>
            <Link href="/varieties" className="btn btn-outline" style={{ borderColor: "var(--forest-800)", color: "var(--forest-900)" }}>Browse Varieties</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
