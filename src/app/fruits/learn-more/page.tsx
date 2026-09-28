import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Fruits | Fit Plate",
  description: "Learn more about our fruits, their benefits, growing process, and uses.",
};

export default function FruitsLearnMore() {
  return (
    <main className="fruits-page">
      {/* ── Hero Banner ── */}
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: "url('/assets/img/fruits.png')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-text-card">
            <div className="crumbs">
              <Link href="/">Home</Link> / <Link href="/fruits">Fruits</Link> / <span>Learn More</span>
            </div>
            <div className="eyebrow" style={{ color: "#072E6D" }}>DISCOVER MORE</div>
            <h1 style={{ color: "#072E6D" }}>All About Fruits</h1>
            <p>Experience the sweet, vibrant flavors and superior quality of our specially cultivated fruits.</p>
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
                  color: "#072E6D",
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
                Fruits are a vital source of dietary fiber, vitamins, and powerful antioxidants. Including fresh, high-quality fruits in your daily diet helps boost your immune system, improve heart health, and provide natural energy throughout the day.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 2: Growing Process */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#072E6D",
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
                Through advanced agricultural techniques and climate-controlled environments, we optimize the growth cycle of our fruits. This ensures that every piece of fruit reaches its maximum flavor potential and nutritional density, grown sustainably without harmful chemicals.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 3: Culinary Uses */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#072E6D",
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
                Enjoy them fresh on their own, blend them into nutritious smoothies, or incorporate them into exquisite desserts and baked goods. Their naturally sweet profile also balances savory dishes, making them a versatile kitchen staple.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 4: Storage & Handling */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#072E6D",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Storage & Handling
              </h2>
              <div
                className="content-list"
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
                dangerouslySetInnerHTML={{ __html: `<ul><li><strong>Refrigeration:</strong> Store most fresh fruits in the refrigerator to extend freshness, except for tropical varieties which prefer room temperature until ripe.</li><li><strong>Separation:</strong> Keep ethylene-producing fruits (like bananas and apples) separate to prevent premature ripening of others.</li><li><strong>Washing:</strong> Wash thoroughly only before eating to prevent mold growth during storage.</li></ul>` }}
              />
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 5: Safety Note */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#072E6D",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Safety Note
              </h2>
              <div style={{ backgroundColor: "#fff5f5", borderLeft: "4px solid #fc8181", padding: "16px 20px", borderRadius: "0 8px 8px 0" }}>
                <p
                  style={{
                    fontSize: "16.5px",
                    lineHeight: 1.6,
                    color: "#c53030",
                    marginBottom: "0",
                    fontWeight: 500,
                  }}
                >
                  Always wash fruits under running water before eating or cutting to prevent any surface contaminants from transferring to the flesh inside.
                </p>
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 6: FAQ */}
            <div className="faq-section">
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#072E6D",
                  marginBottom: "20px",
                  lineHeight: 1.3,
                }}
              >
                Frequently Asked Questions
              </h2>
              <div className="faq-accordion">
                
                  <details>
                    <summary>Are the fruits organic?</summary>
                    <p>They are sustainably cultivated using advanced, safe agricultural practices without harmful synthetic pesticides.</p>
                  </details>
                
                  <details>
                    <summary>How often is fruit harvested?</summary>
                    <p>We harvest daily to ensure you receive the produce at its absolute peak ripeness.</p>
                  </details>
                
                  <details>
                    <summary>Can I order mixed fruit baskets?</summary>
                    <p>Yes, we offer seasonal mix options depending on the current harvest cycle.</p>
                  </details>
                
                  <details>
                    <summary>How should I store them?</summary>
                    <p>Berries and stone fruits should be refrigerated, while citrus can be kept at room temperature for a few days.</p>
                  </details>
                
              </div>
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
              backgroundColor: "#072E6D",
              color: "#ffffff",
              borderRadius: "20px",
            }}
          >
            <h3 className="card-title" style={{ fontSize: "24px", color: "#ffffff", marginBottom: "12px" }}>
              Ready to experience fresh fruits?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", marginBottom: "24px" }}>
              Explore our range of locally grown varieties harvested fresh for peak nutrition and flavor.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "flex-start", flexWrap: "wrap" }}>
              <Link href="/fruits" className="btn btn-gold">
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
        .fruits-page ~ footer {
          background-color: #072E6D !important;
        }
        .content-list ul {
          padding-left: 20px;
          margin-top: 8px;
        }
        .content-list li {
          margin-bottom: 8px;
        }
        .faq-accordion details {
          border: 1px solid #e9eee5;
          border-radius: 8px;
          margin-bottom: 12px;
          padding: 16px;
          background-color: #fcfcfc;
        }
        .faq-accordion summary {
          font-size: 16.5px;
          font-weight: 600;
          color: var(--ink-800);
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .faq-accordion summary::-webkit-details-marker {
          display: none;
        }
        .faq-accordion summary::after {
          content: '+';
          color: #072E6D;
          font-size: 20px;
          transition: transform 0.2s;
        }
        .faq-accordion details[open] summary::after {
          content: '-';
        }
        .faq-accordion details[open] p {
          margin-top: 12px;
          font-size: 15.5px;
          color: var(--ink-700);
          line-height: 1.7;
          margin-bottom: 0;
        }
      `}</style>
    </main>
  );
}
