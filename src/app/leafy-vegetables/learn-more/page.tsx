import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Leafy Vegetables | Fit Plate",
  description: "Learn more about our leafy-vegetables, their benefits, growing process, and uses.",
};

export default function LeafyVegetablesLearnMore() {
  return (
    <main className="leafy-vegetables-page">
      {/* ── Hero Banner ── */}
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: "url('/assets/img/leafy-vegetables-hero.png')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-text-card">
            <div className="crumbs">
              <Link href="/">Home</Link> / <Link href="/leafy-vegetables">Leafy Vegetables</Link> / <span>Learn More</span>
            </div>
            <div className="eyebrow" style={{ color: "#61AA7C" }}>DISCOVER MORE</div>
            <h1 style={{ color: "#61AA7C" }}>All About Leafy Vegetables</h1>
            <p>Discover the rich nutritional profile and versatile culinary uses of our freshly harvested leafy vegetables.</p>
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
                  color: "#61AA7C",
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
                Leafy vegetables are nutrient powerhouses. They are rich in essential vitamins such as A, C, E, and K, as well as minerals like iron, magnesium, and calcium. Regular consumption can support heart health, improve digestion, and boost your immune system.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 2: Growing Process */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#61AA7C",
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
                We cultivate our leafy vegetables in a meticulously controlled hydroponic environment. By optimizing light, water, and nutrients, we ensure that each plant reaches its peak nutritional value and vibrant color within 7 to 21 days, entirely free from harmful pesticides.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 3: Culinary Uses */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#61AA7C",
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
                Perfect for salads, smoothies, sandwiches, and as a vibrant garnish for main dishes. Their crisp texture and fresh flavor profile make them a versatile addition to any meal, enhancing both taste and visual appeal.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 4: Storage & Handling */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#61AA7C",
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
                dangerouslySetInnerHTML={{ __html: `<ul><li><strong>Refrigeration:</strong> Store in a breathable container in the crisper drawer of your refrigerator.</li><li><strong>Moisture Control:</strong> Place a dry paper towel in the container to absorb excess moisture and prevent wilting.</li><li><strong>Washing:</strong> Wash gently just before use to maintain crispness and avoid premature decay.</li><li><strong>Shelf Life:</strong> Best consumed within 5-7 days of harvest for maximum freshness.</li></ul>` }}
              />
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 5: Safety Note */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "#61AA7C",
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
                  While grown hydroponically without pesticides, always rinse leafy greens under cold water before consumption to remove any potential dust or environmental residue.
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
                  color: "#61AA7C",
                  marginBottom: "20px",
                  lineHeight: 1.3,
                }}
              >
                Frequently Asked Questions
              </h2>
              <div className="faq-accordion">
                
                  <details>
                    <summary>How long do leafy microgreens last?</summary>
                    <p>Usually 5-7 days when refrigerated properly in a breathable container.</p>
                  </details>
                
                  <details>
                    <summary>Are they grown with pesticides?</summary>
                    <p>No, they are grown in a clean hydroponic environment completely pesticide-free.</p>
                  </details>
                
                  <details>
                    <summary>How should I use them?</summary>
                    <p>Add them raw to salads, sandwiches, and smoothies to preserve their nutrients.</p>
                  </details>
                
                  <details>
                    <summary>Do you offer bulk orders for restaurants?</summary>
                    <p>Yes, we provide wholesale pricing for commercial establishments.</p>
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
              backgroundColor: "#61AA7C",
              color: "#ffffff",
              borderRadius: "20px",
            }}
          >
            <h3 className="card-title" style={{ fontSize: "24px", color: "#ffffff", marginBottom: "12px" }}>
              Ready to experience fresh leafy vegetables?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", marginBottom: "24px" }}>
              Explore our range of locally grown varieties harvested fresh for peak nutrition and flavor.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "flex-start", flexWrap: "wrap" }}>
              <Link href="/leafy-vegetables" className="btn btn-gold">
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
        .leafy-vegetables-page ~ footer {
          background-color: #61AA7C !important;
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
          color: #61AA7C;
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
