import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Saffron | Fit Plate",
  description: "Explore all Fit Plate saffron varieties.",
};

export default async function Saffron() {
  const supabase = await createClient();
  const { data: dbVarieties } = await supabase
    .from("saffron")
    .select("*")
    .order("sort_order", { ascending: true });

  const displayVarieties = dbVarieties || [];

  return (
    <main className="lv-page saffron-page">
      <section className="lv-hero" style={{ backgroundColor: "#f8fafc", backgroundImage: 'url(/assets/img/saffron.png)' }}>
        <div className="lv-hero-content container">
          <div className="lv-hero-tag">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span>Saffron</span>
          </div>
          <h1 className="lv-hero-title">Multiple varieties, each with its<br/>own flavour and function.</h1>
          <p className="lv-hero-sub">
            Every tray is harvested 7–21 days after germination, at the point of peak<br/>flavour, colour and nutrient density.
          </p>
        </div>
      </section>

      {/* 2. Four-stat row */}
      <section className="lv-stats section" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="lv-stats-grid">
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ backgroundColor: "#16a34a", color: "white", borderColor: "white" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#16a34a" }}>Fresh Harvest</div>
              <div className="lv-stat-desc">7-21 days</div>
            </div>
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ backgroundColor: "#f59e0b", color: "white", borderColor: "white" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8M8 12h8"/></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#f59e0b" }}>Rich in Nutrients</div>
              <div className="lv-stat-desc">Vitamins & Minerals</div>
            </div>
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ backgroundColor: "#a855f7", color: "white", borderColor: "white" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 16a4 4 0 100-8 4 4 0 000 8z"/></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#a855f7" }}>Natural Flavour</div>
              <div className="lv-stat-desc">Pure & Clean</div>
            </div>
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ backgroundColor: "#3b82f6", color: "white", borderColor: "white" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#3b82f6" }}>Better Nutrition</div>
              <div className="lv-stat-desc">For a Healthier You</div>
            </div>
          </div>
          <div className="lv-intro-text">
            Saffron are young, edible seedlings harvested just after the cotyledons and first<br/>true leaves appear. Below is a quick reference to each variety we grow — its character,<br/>nutritional highlights, and where it shines on the plate.
          </div>
        </div>
      </section>

      {/* 3. Variety Cards Grid */}
      <section className="lv-cards-section section">
        <div className="container">
          <div className="lv-cards-grid">
            {displayVarieties.map((v) => {
              const theme = getThemeColors(v.tag_color);
              const slug = v.slug || v.id || v.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div key={v.id} className="lv-card">
                  <div className="lv-card-img-wrap">
                    <div className="lv-card-img-bg" style={{ backgroundColor: theme.bg }}></div>
                    <img src={v.image_url || "/assets/pot/pot-1.png"} alt={v.name} className="lv-card-img" />
                  </div>
                  <div className="lv-card-content">
                    <div className="lv-tag" style={{ backgroundColor: theme.bg, color: theme.text }}>
                      {v.tag_pill || v.tag || "Microgreen"}
                    </div>
                    <h3 className="lv-title" style={{ color: theme.text }}>{v.name}</h3>
                    <p className="lv-subtitle" style={{ color: theme.text }}>{v.subtitle || v.highlight}</p>
                    <p className="lv-desc">{v.description}</p>
                    {v.best_in && (
                      <p className="lv-best-in">
                        <strong style={{ color: theme.text }}>Best in:</strong> {v.best_in}
                      </p>
                    )}
                    <Link href={`/saffron/${slug}`} className="lv-read-more" style={{ color: theme.text }}>
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. A note on nutrition */}
      <section className="lv-nutrition" style={{ backgroundImage: "url(/assets/img/saffron-third.png)" }}>
        <div className="container lv-nutrition-inner">
          <div className="lv-nutrition-eyebrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span>A NOTE ON NUTRITION</span>
          </div>
          <h2>Nutrient levels vary by species and growing conditions.</h2>
          <p>
            Many of our leafy vegetables are rich in vitamins A, C, E and K, folate, potassium, calcium, iron and<br/>magnesium, along with antioxidant compounds such as polyphenols, carotenoids, chlorophyll,<br/>glucosinolates, anthocyanins, betalains and flavonoids. See our full <Link href="/benefits">nutrition & benefits guide</Link><br/>for more detail.
          </p>
        </div>
      </section>

      {/* 5. Custom mix section */}
      <section className="lv-custom-mix section" style={{ backgroundImage: "url(/assets/img/saffron-four.png)" }}>
        <div className="container lv-custom-inner">
          <div className="lv-custom-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
          </div>
          <h2>Want a custom mix for your menu?</h2>
          <p>We can put together seasonal or signature blends for hotels,<br/>restaurants and caterers on request.</p>
          <Link href="/contact" className="lv-btn">Request a Quote &rarr;</Link>
        </div>
      </section>

      <style>{`
        .lv-hero {
          position: relative;
          padding: 80px 0 100px;
          background-size: cover;
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
          color: #513171;
          text-shadow: 0 2px 10px rgba(255,255,255,0.8), 0 2px 4px rgba(255,255,255,0.9);
        }
        .lv-hero-sub {
          font-size: 18px;
          opacity: 0.9;
          line-height: 1.5;
          color: #82699A;
          text-shadow: 0 1px 6px rgba(255,255,255,0.8);
        }
        .lv-hero-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          z-index: 1;
        }
        .lv-hero-wave svg {
          display: block;
          width: calc(100% + 1.3px);
          height: 80px;
        }
        .lv-stats {
          padding: 40px 0 60px;
        }
        .lv-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          text-align: center;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 40px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .lv-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 20px;
          }
        }
        .lv-stat-icon {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .lv-stat-title {
          font-weight: 700;
          font-size: 17px;
          margin-bottom: 4px;
        }
        .lv-stat-desc {
          color: #64748b;
          font-size: 14px;
        }
        .lv-intro-text {
          text-align: center;
          color: #82699A;
          font-size: 16px;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
        }
        .lv-cards-section {
          background: #fafafa;
          padding: 60px 0;
        }
        .lv-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        @media (max-width: 900px) {
          .lv-cards-grid {
            grid-template-columns: 1fr;
          }
        }
        .lv-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          display: flex;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lv-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
        }
        .lv-card-img-wrap {
          width: 40%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .lv-card-img-bg {
          position: absolute;
          width: 70%;
          padding-bottom: 70%;
          border-radius: 50%;
          opacity: 0.5;
        }
        .lv-card-img {
          position: relative;
          z-index: 1;
          max-width: 100%;
          max-height: 180px;
          object-fit: contain;
        }
        .lv-card-content {
          width: 60%;
          padding: 30px 30px 30px 0;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 500px) {
          .lv-card {
            flex-direction: column;
          }
          .lv-card-img-wrap {
            width: 100%;
            padding: 30px;
          }
          .lv-card-content {
            width: 100%;
            padding: 0 24px 24px;
          }
        }
        .lv-tag {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          align-self: flex-start;
          margin-bottom: 12px;
        }
        .lv-title {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 4px;
          color: #513171;
        }
        .lv-subtitle {
          font-style: italic;
          font-size: 14px;
          margin-bottom: 12px;
          color: #82699A;
        }
        .lv-desc {
          color: #82699A;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .lv-best-in {
          font-size: 13px;
          color: #82699A;
          margin-bottom: 16px;
        }
        .lv-read-more {
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          margin-top: auto;
          display: inline-block;
        }
        .lv-read-more:hover {
          text-decoration: underline;
        }
        .lv-nutrition {
          background-color: #64748b;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: white;
          text-align: center;
          padding: 60px 0;
        }
        .lv-nutrition-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 16px;
          opacity: 0.9;
        }
        .lv-nutrition h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          color: white;
        }
        .lv-nutrition p {
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          font-size: 15px;
          opacity: 0.95;
        }
        .lv-nutrition a {
          color: white;
          text-decoration: underline;
          font-weight: 600;
        }
        .lv-custom-mix {
          text-align: center;
          padding: 80px 0;
          background-color: #f8fafc;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .lv-custom-icon {
          width: 50px;
          height: 50px;
          background: #dcfce7;
          color: #16a34a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }
        .lv-custom-mix h2 {
          color: #513171;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .lv-custom-mix p {
          color: #82699A;
          font-size: 16px;
          margin-bottom: 24px;
        }
        .lv-btn {
          display: inline-block;
          background: #FAC647;
          color: #513171;
          padding: 12px 28px;
          border-radius: 30px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }
        .lv-btn:hover {
          background: #e5b23b;
        }
        .saffron-page ~ footer {
          background-color: #513171 !important;
        }
      `}</style>
    </main>
  );
}

function getThemeColors(colorName: string) {
  switch (colorName?.toLowerCase()) {
    case "purple": return { bg: "#f3e8ff", text: "#7e22ce" };
    case "orange": return { bg: "#ffedd5", text: "#c2410c" };
    case "blue": return { bg: "#dbeafe", text: "#1d4ed8" };
    case "green":
    default: return { bg: "#dcfce7", text: "#15803d" };
  }
}
