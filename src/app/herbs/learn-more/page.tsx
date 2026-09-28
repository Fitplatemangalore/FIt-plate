import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Herbs | Fit Plate",
  description: "Learn more about our herbs, their benefits, growing process, and uses.",
};

export default function HerbsLearnMore() {
  return (
    <main className="herbs-page">
      {/* ── Hero Banner ── */}
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: "url('/assets/img/herbs.png')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-text-card">
            <div className="crumbs">
              <Link href="/">Home</Link> / <Link href="/herbs">Herbs</Link> / <span>Learn More</span>
            </div>
            <div className="eyebrow" style={{ color: "#577143" }}>DISCOVER MORE</div>
            <h1 style={{ color: "#577143" }}>All About Herbs</h1>
            <p>Discover the aromatic profiles and culinary versatility of our freshly harvested herbs.</p>
          </div>
        </div>
      </section>

      {/* ── Article Content ── */}
      <section className="section">
        <div className="container">
          <article
            className="reveal"
            style={{
              maxWidth: "920px",
            }}
          >
            {/* Section 1: Benefits */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#577143",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Benefits
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                Our herbs are packed with essential oils and antioxidants. They not only enhance the flavor of your dishes but also offer various health benefits, including anti-inflammatory properties and immune system support.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 2: Growing Process */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#577143",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Our Growing Process
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                We grow our herbs in a controlled indoor environment, ensuring they receive the perfect amount of light and nutrients. This meticulous process guarantees intense flavor and aroma, harvested precisely at their peak.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 3: Culinary Uses */}
            <div>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#577143",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Culinary Uses
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                Ideal for seasoning meats, enhancing sauces, or garnishing soups and salads. Our fresh herbs elevate any dish, providing a burst of natural flavor that transforms ordinary meals into extraordinary culinary experiences.
              </p>
            </div>
          </article>

          {/* CTA Banner */}
          <div
            className="reveal"
            style={{
              maxWidth: "920px",
              margin: "48px 0 0",
              textAlign: "left",
              padding: "36px 32px",
              backgroundColor: "#577143",
              color: "#ffffff",
              borderRadius: "20px",
            }}
          >
            <h3 className="card-title" style={{ fontSize: "24px", color: "#ffffff", marginBottom: "12px" }}>
              Ready to experience fresh herbs?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", marginBottom: "24px" }}>
              Explore our range of locally grown varieties harvested fresh for peak nutrition and flavor.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "flex-start", flexWrap: "wrap" }}>
              <Link href="/herbs" className="btn btn-gold">
                Explore Varieties &rarr;
              </Link>
              <Link href="/contact" className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .herbs-page ~ footer {
          background-color: #577143 !important;
        }
      `}</style>
    </main>
  );
}
