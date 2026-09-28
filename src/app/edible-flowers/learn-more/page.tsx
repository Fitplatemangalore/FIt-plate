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

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 4: Storage & Handling */}
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
                dangerouslySetInnerHTML={{ __html: `<ul><li><strong>Container:</strong> Keep them in their original clamshell container lined with a dry paper towel.</li><li><strong>Temperature:</strong> Store in the warmest part of your fridge (usually the top shelf).</li><li><strong>Washing:</strong> Do not wash until immediately before use to prevent the petals from bruising.</li><li><strong>Shelf Life:</strong> Due to their delicate nature, they typically last 3-5 days.</li></ul>` }}
              />
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 5: Safety Note */}
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
                  Only consume flowers explicitly grown for consumption, like ours. If you have severe pollen allergies or asthma, introduce edible flowers into your diet cautiously.
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
                  color: "#745B96",
                  marginBottom: "20px",
                  lineHeight: 1.3,
                }}
              >
                Frequently Asked Questions
              </h2>
              <div className="faq-accordion">
                
                  <details>
                    <summary>Which parts of the flower are edible?</summary>
                    <p>Generally the petals are the best part. We recommend removing the pistils and stamens if they are large.</p>
                  </details>
                
                  <details>
                    <summary>How long do they stay fresh?</summary>
                    <p>Due to their delicate nature, they are best used within 3 to 5 days of delivery.</p>
                  </details>
                
                  <details>
                    <summary>Are they treated with chemicals?</summary>
                    <p>No, our edible flowers are 100% pesticide-free and safe for culinary use.</p>
                  </details>
                
                  <details>
                    <summary>Do they have a strong flavor?</summary>
                    <p>Most have a very subtle, mild flavor ranging from slightly sweet to gently peppery, acting mostly as an aesthetic garnish.</p>
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
          color: #745B96;
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
