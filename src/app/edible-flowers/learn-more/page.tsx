import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Edible Flowers | Fit Plate",
  description: "Learn more about our edible-flowers, their benefits, growing process, and uses.",
};

export default function EdibleFlowersLearnMore() {
  return (
    <main className="flowers-page">
      {/* ── Hero Banner ── */}
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: "url('/assets/img/edible-flowers.png')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-text-card">
            <div className="crumbs">
              <Link href="/">Home</Link> / <Link href="/edible-flowers">Edible Flowers</Link> / <span>Learn More</span>
            </div>
            <div className="eyebrow" style={{ color: "#745B96" }}>DISCOVER MORE</div>
            <h1 style={{ color: "#745B96" }}>All About Edible Flowers</h1>
            <p>Add a touch of elegance and subtle flavor to your dishes with our vibrant edible flowers.</p>
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
                  color: "#745B96",
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
                Edible flowers are more than just a beautiful garnish. Many varieties contain beneficial antioxidants and essential vitamins. They offer a unique way to incorporate subtle floral notes and extra nutrients into your diet.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 2: Growing Process */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#745B96",
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
                Cultivated in our pristine indoor farming facility, our edible flowers are grown without any harmful chemicals or pesticides. We carefully manage their environment to ensure vibrant colors and safe, clean blooms ready for culinary use.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 3: Culinary Uses */}
            <div>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#745B96",
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
                Perfect for elevating the presentation of desserts, salads, and craft cocktails. They can be candied for sweets, frozen into ice cubes for drinks, or simply scattered over savory dishes for a stunning visual appeal.
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
              backgroundColor: "#745B96",
              color: "#ffffff",
              borderRadius: "20px",
            }}
          >
            <h3 className="card-title" style={{ fontSize: "24px", color: "#ffffff", marginBottom: "12px" }}>
              Ready to experience fresh edible flowers?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", marginBottom: "24px" }}>
              Explore our range of locally grown varieties harvested fresh for peak nutrition and flavor.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "flex-start", flexWrap: "wrap" }}>
              <Link href="/edible-flowers" className="btn btn-gold">
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
        .flowers-page ~ footer {
          background-color: #745B96 !important;
        }
      `}</style>
    </main>
  );
}
