import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Saffron | Fit Plate",
  description: "Learn more about our saffron, their benefits, growing process, and uses.",
};

export default function SaffronLearnMore() {
  return (
    <main className="saffron-page">
      {/* ── Hero Banner ── */}
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: "url('/assets/img/saffron.png')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-text-card">
            <div className="crumbs">
              <Link href="/">Home</Link> / <Link href="/saffron">Saffron</Link> / <span>Learn More</span>
            </div>
            <div className="eyebrow" style={{ color: "#513171" }}>DISCOVER MORE</div>
            <h1 style={{ color: "#513171" }}>All About Saffron</h1>
            <p>Discover the rich history, distinct aroma, and unparalleled quality of our premium saffron.</p>
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
                  color: "#513171",
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
                Known as the "golden spice," saffron is highly valued for its potent antioxidant properties. It has been traditionally used to uplift mood, promote a healthy complexion, and support overall well-being, thanks to its high concentration of crocin and safranal.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 2: Growing Process */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#513171",
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
                Saffron cultivation requires precision and care. We utilize specialized indoor environments to mimic its natural ideal climate, ensuring the delicate crocus flowers bloom perfectly. Each stigma is then carefully hand-harvested and dried to preserve its color and aroma.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 3: Culinary Uses */}
            <div>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#513171",
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
                Saffron imparts a luminous golden hue and a complex, earthy flavor to dishes. It is essential in classics like paella, risotto, and biryani. A small pinch goes a long way in elevating both savory meals and sweet desserts, adding an unmistakable touch of luxury.
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
              backgroundColor: "#513171",
              color: "#ffffff",
              borderRadius: "20px",
            }}
          >
            <h3 className="card-title" style={{ fontSize: "24px", color: "#ffffff", marginBottom: "12px" }}>
              Ready to experience fresh saffron?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", marginBottom: "24px" }}>
              Explore our range of locally grown varieties harvested fresh for peak nutrition and flavor.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "flex-start", flexWrap: "wrap" }}>
              <Link href="/saffron" className="btn btn-gold">
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
        .saffron-page ~ footer {
          background-color: #513171 !important;
        }
      `}</style>
    </main>
  );
}
