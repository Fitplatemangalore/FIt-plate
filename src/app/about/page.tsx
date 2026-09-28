import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Locally Grown Microgreens - Fit Plate Mangalore",
  description:
    "Learn about FitPlate — dedicated to cultivating premium microgreens that combine remarkable freshness, vibrant flavor, and outstanding nutritional value.",
};

const whyPoints = [
  "Urban vertical farming designed for modern cities",
  "Controlled growing environments for greater consistency",
  "Fresh produce grown closer to the point of consumption",
  "Efficient use of space and resources",
  "Technology-driven crop monitoring and farm management",
  "Wide range of premium crops across multiple categories",
  "Focus on freshness, food safety, quality, and reliability",
  "Designed to support year-round cultivation",
  "Serving homes, HORECA, retail, wellness, and institutional markets",
];

export default function About() {
  return (
    <main>
      {/* ── Hero — soft textured background, no photo ── */}
      <section className="about-hero">
        <div className="container">
          <div className="about-headline-wrap">
            <span className="about-headline-script">About</span>
            <h1 className="about-headline-brand">
              <span className="about-headline-fit">Fit</span>
              <span className="about-headline-plate">Plate</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── Main content — transparent so leaf background shows through ── */}
      <section className="section about-content-section">
        <div className="container">
          <div className="about-content-body reveal">
            {/* Section 1 */}
            <div className="about-section">
              <h2 className="about-section-heading">
                Growing Better. Growing Smarter.
              </h2>
              <p className="about-body">
                At FitPlate, we believe the future of fresh food is closer,
                smarter, and more sustainable. We are building a new generation
                of <strong>urban vertical farms</strong> designed to bring
                premium, fresh, and responsibly grown produce closer to the
                people who consume it.
              </p>
              <p className="about-body">
                Our approach combines controlled-environment agriculture,
                vertical growing systems, intelligent monitoring, and precise
                cultivation practices to create consistent growing conditions
                throughout the year. By bringing farming indoors and closer to
                urban markets, we aim to reduce dependence on traditional supply
                chains while delivering produce that is fresher, cleaner, and
                harvested closer to consumption.
              </p>
              <p className="about-body">
                From{" "}
                <strong>
                  microgreens and leafy vegetables to herbs, edible flowers,
                  fruits, and specialty crops such as saffron
                </strong>
                , our growing systems are designed around the specific needs of
                each crop. Every stage—from seed and cultivation to harvest and
                handling—is carefully monitored to maintain quality, freshness,
                consistency, and food safety.
              </p>
            </div>

            <div className="about-divider" />

            {/* Section 2 */}
            <div className="about-section">
              <h2 className="about-section-heading">
                Cultivating the Future of Urban Food
              </h2>
              <p className="about-body">
                Urban farming is more than growing crops vertically. It is about
                rethinking how food is produced, monitored, harvested, and
                delivered.
              </p>
              <p className="about-body">
                At FitPlate, we combine modern farming infrastructure with
                data-driven cultivation practices to create efficient growing
                environments where crops can thrive with greater consistency and
                precision. Our systems are designed to make better use of{" "}
                <strong>space, water, time, and resources</strong>, while
                enabling year-round production independent of many traditional
                agricultural limitations.
              </p>
              <p className="about-body">
                Through continuous innovation, we are developing a scalable
                model for urban agriculture that can serve homes, restaurants,
                cafés, hotels, retailers, wellness businesses, and other
                customers looking for reliable access to premium fresh produce.
              </p>
            </div>

            <div className="about-divider" />

            {/* Section 3 */}
            <div className="about-section">
              <h2 className="about-section-heading">What We Grow</h2>
              <p className="about-body" style={{ marginBottom: "16px" }}>
                Our urban vertical farming ecosystem is being developed across
                multiple high-value crop categories:
              </p>
              <ul
                className="about-body"
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <li>
                  <strong>Microgreens</strong> — Fresh, flavorful,
                  nutrient-dense greens harvested at their peak.
                </li>
                <li>
                  <strong>Leafy Vegetables</strong> — Crisp, fresh greens
                  cultivated under controlled conditions for consistency and
                  quality.
                </li>
                <li>
                  <strong>Herbs</strong> — Aromatic culinary herbs grown for
                  freshness, flavor, and everyday use.
                </li>
                <li>
                  <strong>Edible Flowers</strong> — Delicate, premium varieties
                  designed for culinary presentation and specialty applications.
                </li>
                <li>
                  <strong>Fruits</strong> — Carefully selected crops suited to
                  controlled-environment and vertical cultivation.
                </li>
                <li>
                  <strong>Saffron &amp; Specialty Crops</strong> — High-value
                  crops explored through precision-controlled growing systems
                  and innovative cultivation methods.
                </li>
              </ul>
            </div>

            <div className="about-divider" />

            {/* Section 4 */}
            <div className="about-section">
              <h2 className="about-section-heading">Powered by Precision</h2>
              <p className="about-body">
                Technology is at the heart of our approach to modern farming.
              </p>
              <p className="about-body">
                We are developing systems that integrate environmental
                monitoring, crop tracking, data-driven cultivation, and
                intelligent farm management to help optimize growing conditions
                and improve operational consistency.
              </p>
              <p className="about-body">
                By continuously observing factors such as temperature, humidity,
                lighting, irrigation, crop development, and environmental
                conditions, we aim to create a more predictable and efficient
                growing process.
              </p>
              <p className="about-body">
                Our vision is to build an intelligent farming ecosystem where{" "}
                <strong>data, technology, and agriculture work together</strong>{" "}
                to produce better outcomes.
              </p>
            </div>

            <div className="about-divider" />

            {/* Section 5 */}
            <div className="about-section">
              <h2 className="about-section-heading">Why FitPlate?</h2>
              <ul
                className="about-body"
                style={{
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {whyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="about-divider" />

            {/* Section 6 */}
            <div className="about-section">
              <h2 className="about-section-heading">Our Vision</h2>
              <p className="about-body">
                To build{" "}
                <strong>
                  India's most trusted urban vertical farming ecosystem
                </strong>
                , making premium, fresh, responsibly grown produce accessible to
                modern consumers and businesses.
              </p>
            </div>

            <div className="about-divider" />

            {/* Section 7 */}
            <div className="about-section">
              <h2 className="about-section-heading">Our Mission</h2>
              <p className="about-body">
                To transform urban agriculture through{" "}
                <strong>
                  innovative farming systems, intelligent technology,
                  responsible resource use, and high-quality produce
                </strong>
                —creating a more resilient and sustainable connection between
                farms and the cities they serve.
              </p>
            </div>

            <div className="about-divider" />

            {/* Section 8 */}
            <div className="about-section">
              <h2 className="about-section-heading">
                Growing a Smarter Future
              </h2>
              <p className="about-body">
                At FitPlate, we are not simply growing crops. We are reimagining
                how food can be cultivated in the cities of tomorrow.
              </p>
              <p className="about-body">
                Every crop we grow represents our commitment to{" "}
                <strong>
                  freshness, innovation, sustainability, technology, and better
                  food systems
                </strong>
                .
              </p>
              <p className="about-body">
                From a single microgreen to an entire vertical farm, our goal
                remains the same:
              </p>
              <p
                className="about-body"
                style={{ marginTop: "16px", fontSize: "1.1em" }}
              >
                <strong>Grow better. Grow smarter. Grow closer to you.</strong>
              </p>
            </div>

            {/* Logo row */}
            <div
              className="about-logo-row"
              style={{ flexDirection: "column", gap: "8px" }}
            >
              <div className="about-logo-item">
                <Image
                  src="/assets/logo.png"
                  alt="FitPlate Logo"
                  width={160}
                  height={160}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 300,
                  color: "var(--forest-900)",
                  textAlign: "center",
                  marginTop: "0px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Urban Vertical Farming
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Existing bottom CTA — preserved as-is ── */}
      <section className="section" style={{ paddingTop: "32px" }}>
        <div className="container reveal" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,36px)" }}>
            Curious how Fit Plate can supply your kitchen?
          </h2>
          <div
            style={{
              marginTop: "26px",
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/contact" className="btn btn-gold">
              Get in Touch
            </Link>
            <Link
              href="/varieties"
              className="btn btn-outline"
              style={{
                borderColor: "var(--forest-800)",
                color: "var(--forest-900)",
              }}
            >
              Browse Varieties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
