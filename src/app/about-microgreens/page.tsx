import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Microgreens: A Complete Overview | Fit Plate Microgreens",
  description:
    "Discover everything about microgreens — what they are, how they differ from sprouts, their nutritional benefits, sustainable cultivation, and culinary uses.",
};

export default function AboutMicrogreens() {
  return (
    <main>
      {/* ── Hero Banner ── */}
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-text-card">
            <div className="crumbs">
              <Link href="/">Home</Link> / <span>About Microgreens</span>
            </div>
            <div className="eyebrow">COMPREHENSIVE GUIDE</div>
            <h1>Microgreens: A Complete Overview</h1>
            <p>Everything you need to know about nature's concentrated superfood.</p>
          </div>
        </div>
      </section>

      {/* ── Article Content ── */}
      <section className="section">
        <div className="container">
          <article
            className="reveal"
            style={{
              maxWidth: "840px",
              margin: "0 auto",
            }}
          >
            {/* Section 1: Introduction */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "var(--forest-900)",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                What are Microgreens?
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                Microgreens are young, edible seedlings of vegetables, herbs, legumes, and some grains that are harvested at an early stage of growth, typically between 7 and 21 days after germination, depending on the variety. They are harvested once the cotyledons (seed leaves) are fully developed, and in some species, just as the first true leaves begin to emerge. Although small in size, microgreens are renowned for their vibrant colors, intense flavors, delicate textures, and exceptional nutritional value, making them a popular ingredient in homes, restaurants, and health-conscious diets worldwide.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 2: Cultivation */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "var(--forest-900)",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Microgreens vs. Sprouts: The Cultivation Advantage
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                Unlike sprouts, which are consumed along with their roots and seeds after germinating in water, microgreens are cultivated in a growing medium such as cocopeat, soil, or hydroponic mats under controlled conditions. Only the stem and leaves are harvested, while the roots remain in the growing tray. This cultivation method reduces the risk of contamination commonly associated with sprouts and results in a cleaner, safer product.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 3: Varieties & Culinary Versatility */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "var(--forest-900)",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Diverse Varieties & Culinary Applications
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                Microgreens can be grown from a wide range of crops, including broccoli, radish, sunflower, beetroot, basil, spinach, kale, mustard, fenugreek, amaranth, pea, and red cabbage. Each variety offers a unique flavor profile ranging from mild and sweet to spicy, nutty, peppery, or earthy, making them highly versatile in culinary applications. They are commonly used as garnishes for soups and pasta, toppings for pizzas and sandwiches, additions to salads and wraps, ingredients in smoothies, and decorative elements in gourmet cuisine.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 4: Nutritional Density */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "var(--forest-900)",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Exceptional Nutritional Density
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                One of the primary reasons for the growing popularity of microgreens is their impressive nutritional composition. Scientific studies have demonstrated that many microgreens contain significantly higher concentrations of vitamins, minerals, antioxidants, and beneficial phytochemicals than their mature vegetable counterparts. They are rich in Vitamin C, Vitamin E, Vitamin K, beta-carotene, folate, potassium, calcium, magnesium, and iron, while also providing plant-based fiber and essential bioactive compounds. Their high antioxidant content helps combat oxidative stress, reduce inflammation, and support overall health.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 5: Health Benefits */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "var(--forest-900)",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Health & Wellness Benefits
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                Regular consumption of microgreens has been associated with several health benefits. They may contribute to improved cardiovascular health by supporting healthy cholesterol levels, help regulate blood sugar, strengthen immune function, promote healthy digestion, and support eye and skin health due to their abundance of carotenoids and polyphenols. Certain varieties, such as broccoli microgreens, are particularly valued for their high concentration of sulforaphane, a naturally occurring compound extensively studied for its antioxidant, anti-inflammatory, and potential cancer-protective properties.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 6: Sustainability */}
            <div style={{ marginBottom: "36px" }}>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "var(--forest-900)",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                Sustainable & Urban Farming Impact
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                From an agricultural perspective, microgreens are considered one of the most sustainable fresh food crops. They require very little space, minimal water, short growing cycles, and comparatively fewer agricultural inputs than conventional vegetables. Their rapid growth allows for multiple production cycles throughout the year, making them ideal for indoor farming, vertical farming, urban agriculture, and hydroponic cultivation. Since they are harvested before maturity, growers can produce high-quality crops regardless of seasonal limitations.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e9eee5", margin: "32px 0" }} />

            {/* Section 7: Future Outlook */}
            <div>
              <h2
                className="card-title"
                style={{
                  fontSize: "26px",
                  color: "var(--forest-900)",
                  marginBottom: "16px",
                  lineHeight: 1.3,
                }}
              >
                The Future of Healthy Eating
              </h2>
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: 1.85,
                  color: "var(--ink-800)",
                  marginBottom: "0",
                }}
              >
                The increasing demand for fresh, nutrient-rich, and locally produced foods has positioned microgreens as an important segment of modern agriculture and functional nutrition. Consumers appreciate them not only for their health benefits but also for their ability to enhance the visual appeal and flavor of everyday meals. As awareness of preventive healthcare and sustainable food systems continues to grow, microgreens are expected to play an increasingly significant role in the future of healthy eating, offering a simple yet powerful way to enrich diets with concentrated nutrition while supporting environmentally responsible farming practices.
              </p>
            </div>
          </article>

          {/* CTA Banner */}
          <div
            className="reveal"
            style={{
              maxWidth: "840px",
              margin: "40px auto 0",
              textAlign: "center",
              padding: "40px 24px",
              backgroundColor: "var(--forest-900)",
              color: "#ffffff",
              borderRadius: "20px",
            }}
          >
            <h3 className="card-title" style={{ fontSize: "24px", color: "#ffffff", marginBottom: "12px" }}>
              Ready to experience fresh microgreens?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", marginBottom: "24px" }}>
              Explore our range of locally grown varieties harvested fresh for peak nutrition and flavor.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/varieties" className="btn btn-gold">
                Explore Varieties &rarr;
              </Link>
              <Link href="/contact" className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
