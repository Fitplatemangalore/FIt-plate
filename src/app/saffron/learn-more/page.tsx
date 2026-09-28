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

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 4: Storage & Handling */}
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
                dangerouslySetInnerHTML={{ __html: `<ul><li><strong>Container:</strong> Store saffron threads in an airtight glass jar or tin.</li><li><strong>Environment:</strong> Keep in a cool, dark, and dry place (like a spice cabinet away from the stove).</li><li><strong>Light:</strong> Keep away from direct sunlight, which can bleach the color and degrade the flavor.</li><li><strong>Shelf Life:</strong> When stored properly, it preserves its aroma and color for up to two years.</li></ul>` }}
              />
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 5: Safety Note */}
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
                  Saffron is highly potent; use it in very small quantities (a few threads per dish). Consuming excessively large amounts (several grams at once) can be toxic and is not recommended.
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
                  color: "#513171",
                  marginBottom: "20px",
                  lineHeight: 1.3,
                }}
              >
                Frequently Asked Questions
              </h2>
              <div className="faq-accordion">
                
                  <details>
                    <summary>How do I use saffron threads?</summary>
                    <p>Steep a few threads in warm water, milk, or broth for 15-20 minutes before adding the liquid to your dish to release the flavor and color.</p>
                  </details>
                
                  <details>
                    <summary>How long does saffron last?</summary>
                    <p>When stored properly in a cool, dark place, it can retain its quality for 2 to 3 years.</p>
                  </details>
                
                  <details>
                    <summary>Is this real saffron?</summary>
                    <p>Yes, our saffron is 100% pure, carefully hand-harvested from the crocus sativus flower with no additives or artificial coloring.</p>
                  </details>
                
                  <details>
                    <summary>Why is it so expensive?</summary>
                    <p>Each flower produces only three stigmas, which must be hand-picked delicately, making it a highly labor-intensive spice.</p>
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
          color: #513171;
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
