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

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 4: Storage & Handling */}
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
                dangerouslySetInnerHTML={{ __html: `<ul><li><strong>Storage:</strong> Wrap fresh herbs in a slightly damp paper towel and place them in a loose plastic bag in the fridge.</li><li><strong>Temperature:</strong> Avoid freezing temperatures as it ruins their delicate cellular structure and texture.</li><li><strong>Shelf Life:</strong> Use within 7-10 days for peak flavor and aroma.</li></ul>` }}
              />
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 5: Safety Note */}
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
                  Ensure you wash the herbs gently before use. Some people may have sensitivities to potent essential oils found in certain herbs, so use in moderation if trying a new variety.
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
                  color: "#577143",
                  marginBottom: "20px",
                  lineHeight: 1.3,
                }}
              >
                Frequently Asked Questions
              </h2>
              <div className="faq-accordion">
                
                  <details>
                    <summary>How long do fresh herbs last?</summary>
                    <p>Up to 10 days if stored properly wrapped in a damp paper towel in the refrigerator.</p>
                  </details>
                
                  <details>
                    <summary>Can I dry these herbs?</summary>
                    <p>Yes, you can air-dry them in a cool, dark place to extend their shelf life.</p>
                  </details>
                
                  <details>
                    <summary>Are they safe to eat raw?</summary>
                    <p>Absolutely, our herbs are grown pesticide-free and are safe to consume raw after a quick rinse.</p>
                  </details>
                
                  <details>
                    <summary>How do you deliver them?</summary>
                    <p>We deliver them freshly harvested to maintain their essential oils and distinct aroma.</p>
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
          color: #577143;
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
