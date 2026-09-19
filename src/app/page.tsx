import Link from "next/link";
import { Metadata } from "next";
import CropHexagonCard, { CropData } from "@/components/CropHexagonCard";
import VideoPlayer from "@/components/VideoPlayer";
import UrbanTestimonials from "@/components/UrbanTestimonials";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Fit Plate | Urban Vertical Farming in Mangalore",
  description:
    "Pure, fresh, nutritious produce grown right in the heart of your city with cutting-edge urban vertical farming technology.",
};

// Fallback crops displayed until Supabase "crops" table is seeded
const defaultCrops: CropData[] = [
  {
    id: "leafy-greens",
    name: "LEAFY GREENS",
    subtitle: "Fresh Greens. Grow Closer.",
    image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    icon: "leaf",
    link: "/varieties",
  },
  {
    id: "herbs",
    name: "HERBS",
    subtitle: "Fresh Greens. Grow Closer.",
    image_url: "/assets/img/509ecd51682b66965b96a807ecc89477.jpg",
    icon: "herbs",
    link: "/varieties",
  },
  {
    id: "edible-flowers",
    name: "EDIBLE FLOWERS",
    subtitle: "Fresh Greens. Grow Closer.",
    image_url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80",
    icon: "flower",
    link: "/varieties",
  },
  {
    id: "microgreens",
    name: "MICROGREENS",
    subtitle: "Small Greens. Big Nutrition",
    image_url: "/assets/img/d4077bf9785efe29a21bd1df1c010651.jpg",
    icon: "microgreens",
    link: "/microgreens",
  },
  {
    id: "fruits",
    name: "FRUITS",
    subtitle: "Fresh Greens. Grow Closer.",
    image_url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
    icon: "fruits",
    link: "/varieties",
  },
  {
    id: "saffron",
    name: "SAFFRON",
    subtitle: "Fresh Greens. Grow Closer.",
    image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    icon: "saffron",
    link: "/varieties",
  },
];

export default async function Home() {
  // Fetch crops dynamically from Supabase; fall back to defaults if table not yet migrated
  let crops: CropData[] = defaultCrops;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("crops")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data && data.length > 0) {
      crops = data.map((row: any) => ({
        id: String(row.id),
        name: row.name,
        subtitle: row.subtitle,
        image_url: row.image_url,
        icon: row.icon,
        icon_url: row.icon_url,
        link: row.link || "/varieties",
      }));
    }
  } catch {
    // Supabase unavailable or table missing — use defaults silently
  }

  return (
    <main className="uv-home-root">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1 — HERO
      ───────────────────────────────────────────────────────────── */}

      <section className="uv-hero-section">

        <div className="uv-hero-wrapper">
          <div className="uv-hero-grid">
            {/* Left Column: Stacked Bebas Neue Heading & Badges */}
            <div className="uv-hero-content reveal">
              <h1 className="uv-hero-title">
                <span className="uv-title-blue">URBAN</span>
                <br />
                <span className="uv-title-blue">VERTICAL</span>
                <br />
                <span className="uv-title-green">FARMING</span>
              </h1>

              {/* 4 Circular Badge Features with Yellow Dividers Below Heading */}
              <div className="uv-badges-row">
                <div className="uv-badge-item">
                  <div className="uv-badge-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#022A7C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
                    </svg>
                  </div>
                  <span className="uv-badge-label">100%<br />Organic</span>
                </div>

                <div className="uv-badge-divider" aria-hidden="true" />

                <div className="uv-badge-item">
                  <div className="uv-badge-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#022A7C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                      <path d="M10 2v7.31L4.2 19.33A2 2 0 0 0 6 22h12a2 2 0 0 0 1.8-2.67L14 9.31V2" />
                      <path d="M8.5 2h7" />
                      <path d="M14 9.3 8 19" />
                      <line x1="8" y1="9.3" x2="16" y2="19" />
                    </svg>
                  </div>
                  <span className="uv-badge-label">Chemical<br />Free</span>
                </div>

                <div className="uv-badge-divider" aria-hidden="true" />

                <div className="uv-badge-item">
                  <div className="uv-badge-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#022A7C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <span className="uv-badge-label">Home<br />Delivery</span>
                </div>

                <div className="uv-badge-divider" aria-hidden="true" />

                <div className="uv-badge-item">
                  <div className="uv-badge-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#022A7C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                      <path d="M12 22a8 8 0 0 0 8-8c0-5-8-12-8-12S4 9 4 14a8 8 0 0 0 8 8Z" />
                      <path d="M12 10v6" />
                      <path d="M9 13l3-3 3 3" />
                    </svg>
                  </div>
                  <span className="uv-badge-label">Farm<br />Fresh</span>
                </div>
              </div>
            </div>

            {/* Right Column: Exact smooth sweeping curve with yellow border matching reference */}
            <div className="uv-hero-visual reveal">
              <div className="uv-hero-cutout-container">
                {/* SVG clip-path definition with objectBoundingBox (0 to 1 scale) for true object-fit: cover */}
                <svg width="0" height="0" className="uv-clip-def" aria-hidden="true">
                  <defs>
                    <clipPath id="hero-img-clip" clipPathUnits="objectBoundingBox">
                      <path d="M 0,0 C 0.065,0.55 0.135,0.8 0.268,1 L 1,1 L 1,0 Z" />
                    </clipPath>
                  </defs>
                </svg>

                {/* Real HTML <img> with object-fit: cover to prevent any warping or stretching */}
                <div className="uv-hero-clipped-img-wrap">
                  <img
                    src="/assets/img/hero-fitplate-farm.jpg"
                    alt="Fit Plate Urban Vertical Farming Facility"
                    className="uv-hero-real-img"
                  />
                </div>

                {/* Thick yellow border tracing the exact curve */}
                <svg
                  className="uv-hero-svg-frame"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M 0,0 C 6.5,55 13.5,80 26.8,100"
                    fill="none"
                    stroke="#F4C542"
                    strokeWidth="11"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2 — OUR CROPS
      ───────────────────────────────────────────────────────────── */}
      <section className="uv-crops-section" id="crops">
        <div className="container">
          {/* Heading with yellow line accents */}
          <div className="uv-section-head reveal">
            <div className="uv-head-accent-line" />
            <h2 className="uv-crops-main-title">OUR CROPS</h2>
            <div className="uv-head-accent-line" />
          </div>

          {/* Row of Hexagon-shaped Crop Cards */}
          <div className="uv-crops-grid reveal stagger">
            {crops.map((crop) => (
              <CropHexagonCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3 — FEATURE BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="uv-feature-banner-section">
        <div className="uv-feature-banner-box reveal">

            <div className="uv-feature-banner-grid">
              {/* Left Column */}
              <div className="uv-banner-left">
                <h2 className="uv-banner-title" style={{ marginBottom: '12px' }}>
                  <span className="uv-title-blue">SMART URBAN</span>
                  <br />
                  <span className="uv-title-green">FARMING</span>
                </h2>

                <p className="uv-banner-desc-v2">
                  Healthy food. Sustainable living.<br />
                  A greener tomorrow.
                </p>

                <div className="uv-banner-btn-wrap" style={{ marginBottom: '20px' }}>
                  <Link href="/about" className="uv-learn-more-btn-v2">
                    Learn More <span className="uv-btn-arrow-v2">→</span>
                  </Link>
                </div>


              </div>

              {/* Right Column: Full bleed image with curved yellow vector shape style */}
              <div className="uv-banner-right-v2">
                <div className="uv-banner-visual">
                  <svg width="0" height="0" className="uv-clip-def" aria-hidden="true">
                    <defs>
                      <clipPath id="banner-img-clip-v7" clipPathUnits="objectBoundingBox">
                        <path d="M 0.22,0 C -0.05,0.25 -0.05,0.75 0.22,0.92 C 0.50,0.95 0.75,0.98 1,1 L 1,0 Z" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="uv-banner-clipped-img-wrap">
                    <img
                      src="/assets/img/feature-urban-farming.jpg"
                      alt="Lush Urban Vertical Farming Produce"
                      className="uv-banner-real-img"
                    />
                  </div>
                  <svg
                    className="uv-banner-svg-frame"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M 22,0 C -5,25 -5,75 22,92"
                      fill="none"
                      stroke="#F4C542"
                      strokeWidth="14"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="butt"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Row: 4 feature items with icons and dividers */}
            <div className="uv-banner-bottom-strip-v2">
              <div className="uv-bottom-item-v2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#112E81" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6" />
                </svg>
                <span>Fresh</span>
              </div>
              <div className="uv-strip-divider-v2">|</div>
              <div className="uv-bottom-item-v2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#112E81" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span>Nutritious</span>
              </div>
              <div className="uv-strip-divider-v2">|</div>
              <div className="uv-bottom-item-v2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#112E81" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <path d="M12 12c-2 0-3.5-1.5-3.5-3.5S10 5 12 5s3.5 1.5 3.5 3.5" />
                </svg>
                <span>Local</span>
              </div>
              <div className="uv-strip-divider-v2">|</div>
              <div className="uv-bottom-item-v2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#112E81" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z" />
                </svg>
                <span>Sustainable</span>
              </div>
            </div>
          </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4 — VIDEO PLAYER
      ───────────────────────────────────────────────────────────── */}
      <section className="uv-video-section">
        <div className="container">
          <div className="reveal">
            <VideoPlayer poster="/assets/img/video-cover.jpg" />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5 — TESTIMONIALS
      ───────────────────────────────────────────────────────────── */}
      <section className="uv-testimonials-section" id="testimonials">
        <div className="container">
          {/* Header with yellow line accents */}
          <div className="uv-section-head reveal">
            <div className="uv-head-accent-line" />
            <h2 className="uv-crops-main-title">TESTIMONIAL</h2>
            <div className="uv-head-accent-line" />
          </div>

          <p className="uv-testimonials-subtitle reveal">
            See what our clients & partners saying about Urban Vertical Farming
          </p>

          {/* Testimonial Cards */}
          <div className="reveal">
            <UrbanTestimonials />
          </div>
        </div>
      </section>
    </main>
  );
}
