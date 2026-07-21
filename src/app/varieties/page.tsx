import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Microgreens | Fit Plate Microgreens",
  description: "Explore all Fit Plate microgreen varieties — Broccoli, Purple Kale, Basil, Fenugreek, Radish, Turnip, Spinach, Green Amaranth, Beetroot and Sunflower.",
};

export default async function Varieties() {
  const supabase = await createClient();
  const { data: dbVarieties } = await supabase
    .from("varieties")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <main>
      <section className="page-hero">
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1640671509786-7ddd9d77c866?auto=format&fit=crop&w=1920&q=80')" }}></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs"><Link href="/">Home</Link> / <span>Our Microgreens</span></div>
          <div className="eyebrow">Our Microgreens</div>
          <h1>Ten varieties, each with its own flavour and function.</h1>
          <p>Every tray is harvested 7&ndash;21 days after germination, at the point of peak flavour, colour and nutrient density.</p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head center reveal">
            <p style={{ fontSize: "16px" }}>Microgreens are young edible seedlings harvested just after the cotyledons and first true leaves appear. Below is a quick reference to each variety we grow &mdash; its character, nutritional highlights, and where it shines on the plate.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: "28px" }}>
            {dbVarieties && dbVarieties.length > 0 ? (
              dbVarieties.map((v, i) => (
                <div key={v.id} className="card reveal" id={v.slug} style={{ "--i": i % 4, display: "flex", overflow: "hidden" } as React.CSSProperties}>
                  <div style={{ flex: "0 0 42%" }}>
                    <img 
                      src={v.image_url || "/assets/pot/pot-1.png"} 
                      alt={`${v.name} microgreens`} 
                      style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "220px" }} 
                      loading="lazy" 
                    />
                  </div>
                  <div style={{ padding: "26px 24px", flex: 1 }}>
                    {v.tag_pill && <div className="tag-pill">{v.tag_pill}</div>}
                    <h3 style={{ fontSize: "22px", marginTop: v.tag_pill ? "12px" : "0" }}>{v.name}</h3>
                    {v.highlight && (
                      <p style={{ marginTop: "8px", fontSize: "14px", fontStyle: "italic", color: "var(--gold-700)" }}>
                        {v.highlight}
                      </p>
                    )}
                    <p style={{ marginTop: "12px", fontSize: "14.5px" }}>{v.description}</p>
                    {v.best_in && (
                      <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--ink-500)" }}>
                        <strong style={{ color: "var(--forest-900)" }}>Best in:</strong> {v.best_in}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              // Hardcoded default fallbacks if database is empty
              <>
                <div className="card reveal" id="broccoli" style={{ "--i": 0, display: "flex", overflow: "hidden" } as React.CSSProperties}>
                  <div style={{ flex: "0 0 42%" }}>
                    <img src="https://images.unsplash.com/photo-1535734668010-da0c7d3085f2?auto=format&fit=crop&w=800&q=80" alt="Broccoli microgreens" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "220px" }} loading="lazy" />
                  </div>
                  <div style={{ padding: "26px 24px", flex: 1 }}>
                    <div className="tag-pill">Sulforaphane-rich</div>
                    <h3 style={{ fontSize: "22px", marginTop: "12px" }}>Broccoli Microgreens</h3>
                    <p style={{ marginTop: "8px", fontSize: "14px", fontStyle: "italic", color: "var(--gold-700)" }}>Peppery crunch, packed with glucosinolates.</p>
                    <p style={{ marginTop: "12px", fontSize: "14.5px" }}>Rich in vitamins C, K and A precursors, glucosinolates and sulforaphane precursors. Supports antioxidant defenses, cardiovascular health, and normal cellular detoxification.</p>
                    <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--ink-500)" }}><strong style={{ color: "var(--forest-900)" }}>Best in:</strong> Salads, grain bowls, sandwiches, smoothies.</p>
                  </div>
                </div>

                <div className="card reveal" id="purple-kale" style={{ "--i": 1, display: "flex", overflow: "hidden" } as React.CSSProperties}>
                  <div style={{ flex: "0 0 42%" }}>
                    <img src="https://images.unsplash.com/photo-1622463214111-b192a53371d2?auto=format&fit=crop&w=800&q=80" alt="Purple Kale microgreens" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "220px" }} loading="lazy" />
                  </div>
                  <div style={{ padding: "26px 24px", flex: 1 }}>
                    <div className="tag-pill">Eye & bone health</div>
                    <h3 style={{ fontSize: "22px", marginTop: "12px" }}>Purple Kale Microgreens</h3>
                    <p style={{ marginTop: "8px", fontSize: "14px", fontStyle: "italic", color: "var(--gold-700)" }}>Deep colour, mild earthy bite.</p>
                    <p style={{ marginTop: "12px", fontSize: "14.5px" }}>Excellent source of vitamins A, C and K, lutein, zeaxanthin and anthocyanins. Supports eye, bone and immune health.</p>
                    <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--ink-500)" }}><strong style={{ color: "var(--forest-900)" }}>Best in:</strong> Buddha bowls, garnish, wraps.</p>
                  </div>
                </div>

                <div className="card reveal" id="basil" style={{ "--i": 2, display: "flex", overflow: "hidden" } as React.CSSProperties}>
                  <div style={{ flex: "0 0 42%" }}>
                    <img src="https://images.unsplash.com/photo-1536630596251-b12ba0d9f7d4?auto=format&fit=crop&w=800&q=80" alt="Basil microgreens" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "220px" }} loading="lazy" />
                  </div>
                  <div style={{ padding: "26px 24px", flex: 1 }}>
                    <div className="tag-pill">Aromatic & antioxidant</div>
                    <h3 style={{ fontSize: "22px", marginTop: "12px" }}>Basil Microgreens</h3>
                    <p style={{ marginTop: "8px", fontSize: "14px", fontStyle: "italic", color: "var(--gold-700)" }}>Fragrant, essential-oil rich leaves.</p>
                    <p style={{ marginTop: "12px", fontSize: "14.5px" }}>Contains vitamins A and K, essential oils such as eugenol and rosmarinic acid. Offers antioxidant and aromatic culinary benefits.</p>
                    <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--ink-500)" }}><strong style={{ color: "var(--forest-900)" }}>Best in:</strong> Pasta, pizza, Italian plates, infused oils.</p>
                  </div>
                </div>

                <div className="card reveal" id="fenugreek" style={{ "--i": 3, display: "flex", overflow: "hidden" } as React.CSSProperties}>
                  <div style={{ flex: "0 0 42%" }}>
                    <img src="https://images.unsplash.com/photo-1593629718347-283811841101?auto=format&fit=crop&w=800&q=80" alt="Fenugreek microgreens" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "220px" }} loading="lazy" />
                  </div>
                  <div style={{ padding: "26px 24px", flex: 1 }}>
                    <div className="tag-pill">Digestive support</div>
                    <h3 style={{ fontSize: "22px", marginTop: "12px" }}>Fenugreek Microgreens</h3>
                    <p style={{ marginTop: "8px", fontSize: "14px", fontStyle: "italic", color: "var(--gold-700)" }}>Slightly bitter, iron-rich shoots.</p>
                    <p style={{ marginTop: "12px", fontSize: "14.5px" }}>Provides iron, fibre, vitamins A and C, and phytochemicals including trigonelline. Traditionally associated with digestive and blood-sugar support.</p>
                    <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--ink-500)" }}><strong style={{ color: "var(--forest-900)" }}>Best in:</strong> Curries, parathas, dals, garnish.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section deep">
        <div className="container reveal" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
          <div className="eyebrow" style={{ justifyContent: "center", color: "var(--gold-300)" }}>A Note on Nutrition</div>
          <h2 style={{ marginTop: "14px" }}>Nutrient levels vary by species and growing conditions.</h2>
          <p style={{ marginTop: "16px" }}>Many of our microgreens are rich in vitamins A, C, E and K, folate, potassium, calcium, iron and magnesium, along with antioxidant compounds such as polyphenols, carotenoids, chlorophyll, glucosinolates, anthocyanins, betalains and flavonoids. See our full <Link href="/benefits" style={{ color: "var(--gold-300)", textDecoration: "underline" }}>nutrition &amp; benefits guide</Link> for more detail.</p>
        </div>
      </section>

      <section className="section alt">
        <div className="container reveal" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,34px)" }}>Want a custom mix for your menu?</h2>
          <p style={{ marginTop: "12px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>We can put together seasonal or signature blends for hotels, restaurants and caterers on request.</p>
          <div style={{ marginTop: "26px" }}>
            <Link href="/contact" className="btn btn-gold">Request a Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
