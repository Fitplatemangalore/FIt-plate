import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { defaultVarieties } from "@/data/varieties";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Microgreens | Fit Plate Microgreens",
  description:
    "Explore all Fit Plate microgreen varieties — Broccoli, Purple Kale, Basil, Fenugreek, Radish, Turnip, Spinach, Green Amaranth, Beetroot and Sunflower.",
};

export default async function Varieties() {
  const supabase = await createClient();
  const { data: dbVarieties } = await supabase
    .from("herbs")
    .select("*")
    .order("sort_order", { ascending: true });

  const displayVarieties =
    dbVarieties && dbVarieties.length > 0 ? dbVarieties : defaultVarieties;

  return (
    <main>
      <section className="lv-hero" style={{ backgroundColor: '#f8fafc', backgroundImage: 'url()' }}>
        <div className="lv-hero-content container">
          <div className="lv-hero-tag">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span>Herbs</span>
          </div>
          <h1 className="lv-hero-title">Multiple varieties, each with its<br/>own flavour and function.</h1>
          <p className="lv-hero-sub">
            Every tray is harvested 7–21 days after germination, at the point of peak<br/>flavour, colour and nutrient density.
          </p>
        </div>
      </section>

      <section className="lv-stats section" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="lv-stats-grid">
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ color: "#16a34a", borderColor: "#16a34a" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#16a34a" }}>Fresh Harvest</div>
              <div className="lv-stat-desc">7-21 days</div>
            </div>
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ color: "#f59e0b", borderColor: "#f59e0b" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8M8 12h8"/></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#f59e0b" }}>Rich in Nutrients</div>
              <div className="lv-stat-desc">Vitamins & Minerals</div>
            </div>
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ color: "#a855f7", borderColor: "#a855f7" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 16a4 4 0 100-8 4 4 0 000 8z"/></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#a855f7" }}>Natural Flavour</div>
              <div className="lv-stat-desc">Pure & Clean</div>
            </div>
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ color: "#3b82f6", borderColor: "#3b82f6" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#3b82f6" }}>Better Nutrition</div>
              <div className="lv-stat-desc">For a Healthier You</div>
            </div>
          </div>
          <div className="lv-intro-text">
            Herbs are young, edible seedlings harvested just after the cotyledons and first<br/>true leaves appear. Below is a quick reference to each variety we grow — its character,<br/>nutritional highlights, and where it shines on the plate.
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: "28px" }}>
            {displayVarieties.map((v, i) => {
              const slug = v.slug || v.id || v.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div
                  key={v.id || slug}
                  className="card reveal"
                  id={slug}
                  style={
                    {
                      "--i": i % 4,
                      display: "flex",
                      overflow: "hidden",
                      flexDirection: "column",
                    } as React.CSSProperties
                  }
                >
                  <div style={{ display: "flex", width: "100%", flex: 1 }}>
                    <div style={{ flex: "0 0 42%", position: "relative", overflow: "hidden", background: "#f5f8f2" }}>
                      <Link href={`/herbs/${slug}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "220px" }}>
                        <img
                          src={v.image_url || "/assets/pot/pot-1.png"}
                          alt={`${v.name} microgreens`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            padding: "12px",
                          }}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <div style={{ padding: "24px 22px", flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        {v.tag_pill && <div className="tag-pill">{v.tag_pill}</div>}
                        <h3 className="variety-name" style={{ fontSize: "22px", marginTop: v.tag_pill ? "10px" : "0" }}>
                          <Link href={`/herbs/${slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                            {v.name}
                          </Link>
                        </h3>
                        {v.highlight && (
                          <p
                            style={{
                              marginTop: "6px",
                              fontSize: "13.5px",
                              fontStyle: "italic",
                              color: "var(--gold-700)",
                            }}
                          >
                            {v.highlight}
                          </p>
                        )}
                        <p
                          style={{
                            marginTop: "10px",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "var(--ink-700)",
                          }}
                        >
                          {v.description}
                        </p>
                      </div>

                      <div style={{ marginTop: "14px" }}>
                        {v.best_in && (
                          <p
                            style={{
                              fontSize: "12.5px",
                              color: "var(--ink-500)",
                              marginBottom: "10px",
                              overflowWrap: "break-word",
                              wordWrap: "break-word",
                            }}
                          >
                            <strong style={{ color: "var(--forest-900)" }}>Best in:</strong>{" "}
                            {v.best_in}
                          </p>
                        )}
                        <Link
                          href={`/herbs/${slug}`}
                          className="read-more-btn"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13.5px",
                            fontWeight: 600,
                            color: "var(--forest-900)",
                            textDecoration: "none",
                          }}
                        >
                          Read More &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section deep">
        <div
          className="container reveal"
          style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}
        >
          <div
            className="eyebrow"
            style={{ justifyContent: "center", color: "var(--gold-300)" }}
          >
            A Note on Nutrition
          </div>
          <h2 style={{ marginTop: "14px" }}>
            Nutrient levels vary by species and growing conditions.
          </h2>
          <p style={{ marginTop: "16px" }}>
            Many of our microgreens are rich in vitamins A, C, E and K, folate,
            potassium, calcium, iron and magnesium, along with antioxidant
            compounds such as polyphenols, carotenoids, chlorophyll,
            glucosinolates, anthocyanins, betalains and flavonoids. See our full{" "}
            <Link
              href="/benefits"
              style={{ color: "var(--gold-300)", textDecoration: "underline" }}
            >
              nutrition &amp; benefits guide
            </Link>{" "}
            for more detail.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container reveal" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,34px)" }}>
            Want a custom mix for your menu?
          </h2>
          <p
            style={{
              marginTop: "12px",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            We can put together seasonal or signature blends for hotels,
            restaurants and caterers on request.
          </p>
          <div style={{ marginTop: "26px" }}>
            <Link href="/contact" className="btn btn-gold">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
      <style>{`
        .lv-hero {
          position: relative;
          padding: 80px 0 100px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          color: white;
          min-height: 480px;
          display: flex;
          align-items: center;
        }
        .lv-hero-content {
          position: relative;
          z-index: 2;
        }
        .lv-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #16a34a;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .lv-hero-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
          color: white;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.7);
        }
        .lv-hero-sub {
          font-size: 18px;
          opacity: 0.9;
          line-height: 1.5;
          text-shadow: 0 1px 6px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);
        }
      `}</style>
    </main>
  );
}
