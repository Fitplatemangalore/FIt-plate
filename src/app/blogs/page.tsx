import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blogs | Fit Plate Microgreens",
  description: "Read about the history, nutrition and business uses of microgreens on the Fit Plate journal.",
};

export default async function Blogs() {
  const supabase = await createClient();
  const { data: dbBlogs } = await supabase
    .from("blogs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("published_date", { ascending: false });

  return (
    <main>
      <section className="page-hero">
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593629718347-283811841101?auto=format&fit=crop&w=1920&q=80')" }}></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs"><Link href="/">Home</Link> / <span>Blogs</span></div>
          <div className="eyebrow">The Journal</div>
          <h1>Notes on greens, growing &amp; good food.</h1>
          <p>Short reads on the story, science and everyday uses of microgreens.</p>
        </div>
      </section>

      {dbBlogs && dbBlogs.length > 0 ? (
        dbBlogs.map((b, i) => (
          <section key={b.id} className="section alt" id={b.slug}>
            <div className="container">
              <div className="grid-2 reveal" style={{ alignItems: "flex-start", flexDirection: i % 2 === 1 ? "row-reverse" : "row" }}>
                <img 
                  src={b.image_url} 
                  alt={b.title} 
                  style={{ borderRadius: "var(--radius-lg)", width: "100%", aspectRatio: "4/3.2", objectFit: "cover", position: "sticky", top: "110px" }} 
                />
                <div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span className="tag-pill">{b.category}</span>
                    <span style={{ fontSize: "13px", color: "var(--ink-500)" }}>{b.read_time}</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(22px,2.8vw,30px)", marginTop: "16px" }}>{b.title}</h2>
                  <div 
                    className="blog-content-rendered"
                    style={{ marginTop: "18px", fontSize: "15.5px", lineHeight: 1.85, color: "var(--ink-700)" }}
                    dangerouslySetInnerHTML={{ __html: b.content.replace(/\n/g, "<br />") }}
                  />
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        // Hardcoded fallbacks if database table is empty
        <>
          <section className="section alt">
            <div className="container">
              <div className="grid-2 reveal" style={{ alignItems: "flex-start" }}>
                <img src="https://images.unsplash.com/photo-1640671510956-8c8e1deb0dd9?auto=format&fit=crop&w=900&q=80" alt="From Chef's Garnish to Kitchen Staple: A Short History of Microgreens" style={{ borderRadius: "var(--radius-lg)", width: "100%", aspectRatio: "4/3.2", objectFit: "cover", position: "sticky", top: "110px" }} />
                <div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span className="tag-pill">Origins</span>
                    <span style={{ fontSize: "13px", color: "var(--ink-500)" }}>4 min read</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(22px,2.8vw,30px)", marginTop: "16px" }}>From Chef's Garnish to Kitchen Staple: A Short History of Microgreens</h2>
                  <div style={{ marginTop: "18px", fontSize: "15.5px", lineHeight: 1.85, color: "var(--ink-700)" }}>
                    Microgreens originated in Southern California during the 1980s, where chefs first used them as premium garnishes &mdash; prized for their intense flavour, vibrant colour and delicate texture. Through the 1990s, their popularity expanded across fine dining, as kitchens leaned into bold, fresh presentation.
                    <br /><br />
                    What began as a plating detail soon became something more. As consumer interest in nutrition, farm-to-table dining and sustainable agriculture grew through the 2000s, microgreens moved from restaurant kitchens into home kitchens, supermarkets and indoor farms. Their short growing cycle &mdash; typically 7 to 21 days from seed to harvest &mdash; made them commercially attractive to growers, while their concentrated flavour and nutrition kept them popular with consumers.
                    <br /><br />
                    Today, microgreens sit at the intersection of culinary craft and everyday nutrition &mdash; as much at home in a hotel buffet as in a home smoothie. At Fit Plate, we grow ours locally in Mangalore, carrying that same chef-driven attention to freshness into every tray we deliver.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="grid-2 reveal" style={{ alignItems: "flex-start", flexDirection: "row-reverse" }}>
                <img src="https://images.unsplash.com/photo-1593629718347-283811841101?auto=format&fit=crop&w=900&q=80" alt="Why 40x the Nutrients? The Science Behind Microgreen Density" style={{ borderRadius: "var(--radius-lg)", width: "100%", aspectRatio: "4/3.2", objectFit: "cover", position: "sticky", top: "110px" }} />
                <div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span className="tag-pill">Nutrition</span>
                    <span style={{ fontSize: "13px", color: "var(--ink-500)" }}>5 min read</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(22px,2.8vw,30px)", marginTop: "16px" }}>Why 40x the Nutrients? The Science Behind Microgreen Density</h2>
                  <div style={{ marginTop: "18px", fontSize: "15.5px", lineHeight: 1.85, color: "var(--ink-700)" }}>
                    Microgreens are harvested just days after germination &mdash; usually once the cotyledons and first true leaves appear. At this early stage, plants are metabolically active, concentrating vitamins, minerals and protective plant compounds into a very small package.
                    <br /><br />
                    Many varieties are rich in vitamins A, C, E and K, folate, potassium, calcium, iron and magnesium, along with antioxidant compounds such as polyphenols, carotenoids, chlorophyll, glucosinolates, anthocyanins, betalains and flavonoids. Research comparing microgreens to their mature counterparts has found nutrient levels can be many times higher in the seedling stage &mdash; though the exact difference varies by species and growing conditions.
                    <br /><br />
                    This is part of why chefs and nutritionists alike reach for microgreens: a small handful can meaningfully boost the nutrient density of a dish without changing its character. Broccoli microgreens, for instance, are notable for glucosinolates and sulforaphane precursors; beetroot microgreens are valued for betalains and dietary nitrates; sunflower microgreens bring plant protein and vitamin E. Explore our <Link href="/varieties" style={{ color: "var(--forest-800)", textDecoration: "underline" }}>variety guide</Link> for a full breakdown.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="section deep">
        <div className="container reveal" style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
          <div className="icon-badge" style={{ margin: "0 auto" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></svg>
          </div>
          <h2 style={{ marginTop: "20px" }}>Have a question about our greens?</h2>
          <p style={{ marginTop: "12px" }}>Reach out directly &mdash; we're happy to talk through varieties, sourcing or bulk pricing for your kitchen.</p>
          <div style={{ marginTop: "26px" }}>
            <Link href="/contact" className="btn btn-gold">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
