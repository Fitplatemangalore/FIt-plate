import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | FitPlate Microgreens",
  description:
    "Learn about FitPlate — dedicated to cultivating premium microgreens that combine remarkable freshness, vibrant flavor, and outstanding nutritional value.",
};

const whyPoints = [
  "Premium indoor-grown microgreens",
  "Hydroponically cultivated with precision",
  "Pesticide-free and hygienically produced",
  "Harvested fresh for maximum flavor and nutrition",
  "Rich in natural vitamins, minerals, antioxidants, and phytonutrients",
  "Trusted by home cooks, restaurants, cafés, hotels, and wellness professionals",
  "Sustainably grown with a focus on quality and consistency",
];

export default function About() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1640671510956-8c8e1deb0dd9?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs">
            <Link href="/">Home</Link> / <span>About Us</span>
          </div>
          <div className="about-headline-wrap">
            <span className="about-headline-script">About</span>
            <h1 className="about-headline-brand">
              <span className="about-headline-fit">Fit</span>
              <span className="about-headline-plate">Plate</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── Main content card ── */}
      <section className="section alt">
        <div className="container">
          <div className="about-content-card reveal">

            {/* Section 1 – Elevating Everyday Nutrition */}
            <div className="about-section">
              <h2 className="about-section-heading">Elevating Everyday Nutrition</h2>
              <p className="about-body">
                At FitPlate, we believe exceptional food begins with exceptional ingredients. We are
                dedicated to cultivating premium microgreens that combine remarkable freshness,
                vibrant flavor, and outstanding nutritional value—helping people make healthier
                choices without compromising on taste.
              </p>
              <p className="about-body">
                Our microgreens are grown in a meticulously controlled indoor environment using
                advanced hydroponic cultivation techniques. Every crop is carefully monitored from
                seed to harvest to ensure consistent quality, superior freshness, and food safety.
                Free from harmful pesticides and harvested only at peak maturity, our microgreens
                deliver the crisp texture, vibrant color, and concentrated nutrition that chefs,
                nutritionists, and health-conscious consumers expect.
              </p>
              <p className="about-body">
                Each variety is selected not only for its appearance but also for its unique flavor
                profile and nutritional benefits. Whether enhancing gourmet cuisine, enriching daily
                meals, or supporting a wellness-focused lifestyle, FitPlate microgreens transform
                ordinary dishes into extraordinary culinary experiences.
              </p>
            </div>

            <div className="about-divider" />

            {/* Section 2 – Crafted for Excellence */}
            <div className="about-section">
              <h2 className="about-section-heading">Crafted for Excellence</h2>
              <p className="about-body">
                Our commitment extends beyond cultivation. Every harvest reflects our dedication to
                quality, sustainability, and innovation. By combining modern growing technology with
                meticulous quality control, we ensure every pack reaches you at its freshest—ready
                to inspire healthier eating every day.
              </p>
            </div>

            <div className="about-divider" />

            {/* Section 3 – Why FitPlate? */}
            <div className="about-section">
              <h2 className="about-section-heading">Why FitPlate?</h2>
              <p className="about-why-list">
                {whyPoints.map((point, i) => (
                  <span key={i} className="about-why-item">
                    {point}
                    {i < whyPoints.length - 1 && (
                      <span className="about-why-separator"> | </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            <div className="about-divider" />

            {/* Section 4 – Our Vision */}
            <div className="about-section">
              <h2 className="about-section-heading">Our Vision</h2>
              <p className="about-body">
                To become India's most trusted premium microgreens brand by making fresh,
                nutrient-rich greens an essential part of every meal.
              </p>
            </div>

            <div className="about-divider" />

            {/* Section 5 – Our Mission */}
            <div className="about-section">
              <h2 className="about-section-heading">Our Mission</h2>
              <p className="about-body">
                To inspire healthier living through responsibly grown, high-quality microgreens that
                bring freshness, flavor, and exceptional nutrition to every plate.
              </p>
              <p className="about-body" style={{ marginTop: "18px" }}>
                At FitPlate, we don't simply grow microgreens—we cultivate a healthier future.
                Every leaf represents our passion for nutrition, sustainability, and culinary
                excellence.
              </p>
            </div>

            <div className="about-divider" />

            {/* Closing tagline */}
            <div className="about-tagline-row">
              <p className="about-tagline">
                Every Plate. Every Day.{" "}
                <span className="about-tagline-gold">Microgreens All The Way.</span>
              </p>
            </div>

            {/* Logo row */}
            <div className="about-logo-row">
              <div className="about-logo-item">
                <Image
                  src="/assets/logo.png"
                  alt="FitPlate Logo"
                  width={160}
                  height={160}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="about-logo-divider" />
              <div className="about-logo-item">
                <Image
                  src="/assets/logo-badge.png"
                  alt="Every Plate, Every Day, Microgreens All the Way — FitPlate Badge"
                  width={160}
                  height={160}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Existing bottom CTA — preserved as-is ── */}
      <section className="section">
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
              style={{ borderColor: "var(--forest-800)", color: "var(--forest-900)" }}
            >
              Browse Varieties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
