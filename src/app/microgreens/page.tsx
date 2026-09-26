import HeroCarousel from "@/components/HeroCarousel";
import UsesSlider from "@/components/UsesSlider";
import BlogsSlider, { BlogItem } from "@/components/BlogsSlider";
import VarietiesSlider, { VarietyItem } from "@/components/VarietiesSlider";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Microgreens | Fresh Wholesale Supplier in Mangalore - Fit Plate",
  description: "Fit Plate — locally grown microgreens for hotels, restaurants and caterers in Mangalore. Pure, fresh, nutritious.",
};

export const revalidate = 3600; // Cache pages, but allow on-demand ISR to revalidate instantly

export default async function MicrogreensPage() {
  const supabase = await createClient();

  // Fetch all data in parallel (instead of 6 sequential round-trips)
  const [heroDb, varietiesDb, usesDb, blogsDb, testimonialsDb, contentDb] = await Promise.all([
    supabase.from("hero_slides").select("*").order("sort_order", { ascending: true }).then(r => r.data),
    supabase.from("varieties").select("*").order("sort_order", { ascending: true }).then(r => r.data),
    supabase.from("uses_slides").select("*").order("sort_order", { ascending: true }).then(r => r.data),
    supabase.from("blogs").select("*").order("sort_order", { ascending: true }).order("published_date", { ascending: false }).limit(3).then(r => r.data),
    supabase.from("testimonials").select("*").order("sort_order", { ascending: true }).then(r => r.data),
    supabase.from("site_content").select("*").eq("page", "home").then(r => r.data),
  ]);

  const heroSlides = heroDb && heroDb.length > 0
    ? heroDb.map((s) => ({
        tray: s.tray_image,
        bgText: s.bg_text,
        leaves: s.leaves || [],
      }))
    : undefined;

  const usesSlides = usesDb && usesDb.length > 0
    ? usesDb.slice(0, 5).map((s) => ({
        title: s.title,
        description: s.description,
        main_image_url: s.main_image_url,
      }))
    : undefined;

  const getContent = (key: string, fallback: string) => {
    return contentDb?.find((c) => c.key === key)?.value || fallback;
  };

  const defaultBlogs: BlogItem[] = [
    {
      id: "history-of-microgreens",
      title: "From Chef's Garnish to Kitchen Staple: A Short History of Microgreens",
      excerpt: "Explore the fascinating history of microgreens, from their origins as a gourmet garnish in California fine dining during the 1980s to becoming an everyday superfood.",
      category: "Origins",
      published_date: "July 10, 2026",
      image_url: "https://images.unsplash.com/photo-1640671510956-8c8e1deb0dd9?auto=format&fit=crop&w=900&q=80",
      slug: "history-of-microgreens",
    },
    {
      id: "science-behind-microgreen-density",
      title: "Why 40x the Nutrients? The Science Behind Microgreen Density",
      excerpt: "Why do these tiny seedlings pack up to 40 times more nutrients than mature vegetables? We dive into the plant biology and science behind their nutritional density.",
      category: "Nutrition",
      published_date: "July 5, 2026",
      image_url: "https://images.unsplash.com/photo-1593629718347-283811841101?auto=format&fit=crop&w=900&q=80",
      slug: "science-behind-microgreen-density",
    },
    {
      id: "10-ways-hotels-and-restaurants-use-microgreens",
      title: "10 Ways Hotels & Restaurants Are Using Microgreens on the Menu",
      excerpt: "From visual freshness in hotel buffets to year-round culinary consistency, learn why leading kitchens are shifting from garnish to building microgreens directly into the menu.",
      category: "For Business",
      published_date: "June 28, 2026",
      image_url: "https://images.unsplash.com/photo-1647613233056-fc9918256a8d?auto=format&fit=crop&w=900&q=80",
      slug: "10-ways-hotels-and-restaurants-use-microgreens",
    },
  ];

  const finalBlogs: BlogItem[] = (blogsDb && blogsDb.length > 0)
    ? blogsDb.map((b) => ({
        id: b.id,
        title: b.title,
        excerpt: b.excerpt,
        category: b.category,
        published_date: b.published_date,
        image_url: b.image_url,
        slug: b.slug || b.id || b.title.toLowerCase().replace(/\s+/g, "-"),
      }))
    : defaultBlogs;

  return (
    <main>
      <section 
        className="microgreens-new-hero" 
        style={{ backgroundImage: "url('/assets/img/microgreens-hero-bg.png')" }}
      >
        <div className="container">
          <div className="mg-hero-content">
            <h1 className="mg-hero-title">
              <span className="mg-title-dark">PURE. FRESH.</span><br />
              <span className="mg-title-light">NUTRITIOUS.</span>
            </h1>
            <p className="mg-hero-sub">SMALL GREENS. BIG BENEFITS.</p>
            <Link href="#varieties" className="mg-hero-btn">Explore Now &rarr;</Link>
          </div>
        </div>
      </section>

      <style>{`
        .microgreens-new-hero {
          position: relative;
          width: 100%;
          min-height: 500px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
        }
        .mg-hero-content {
          max-width: 600px;
          padding: 40px 0;
        }
        .mg-hero-title {
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 12px;
          font-family: inherit;
        }
        .mg-title-dark {
          color: #0d3a24;
        }
        .mg-title-light {
          color: #85ab48;
        }
        .mg-hero-sub {
          color: #576359;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1.5px;
          margin-bottom: 32px;
        }
        .mg-hero-btn {
          display: inline-block;
          background: #d4a037;
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(212, 160, 55, 0.4);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .mg-hero-btn:hover {
          background: #c38f2a;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 160, 55, 0.6);
        }
        @media (max-width: 768px) {
          .microgreens-new-hero {
            min-height: 350px;
          }
          .mg-hero-title {
            font-size: 36px;
          }
          .mg-hero-sub {
            font-size: 13px;
            margin-bottom: 24px;
          }
          .mg-hero-content {
            padding: 30px 0;
            max-width: 90%;
          }
        }
      `}</style>

      <section className="features-strip" id="features">
        <div className="features-inner">
          <div className="features-row">
            <div className="features-item">
              <div className="features-icon-slot">
                <img src="/assets/icons/icon-premium.png" alt="Premium Choice icon" />
              </div>
              <div className="features-text">
                <div className="features-title">{getContent("features-1-title", "Premium Choice")}</div>
                <div className="features-subtitle">{getContent("features-1-sub", "100% Pesticide Free")}</div>
              </div>
            </div>

            <div className="features-divider" aria-hidden="true">|</div>

            <div className="features-item">
              <div className="features-icon-slot">
                <img src="/assets/icons/icon-harvest.png" alt="Fresh Harvest icon" />
              </div>
              <div className="features-text">
                <div className="features-title">{getContent("features-2-title", "Fresh Harvest")}</div>
                <div className="features-subtitle">{getContent("features-2-sub", "Picked daily for you")}</div>
              </div>
            </div>

            <div className="features-divider" aria-hidden="true">|</div>

            <div className="features-item">
              <div className="features-icon-slot">
                <img src="/assets/icons/icon-nutrient.png" alt="Nutrient Rich icon" />
              </div>
              <div className="features-text">
                <div className="features-title">{getContent("features-3-title", "Nutrient Rich")}</div>
                <div className="features-subtitle">{getContent("features-3-sub", "Up to 40x nutrients")}</div>
              </div>
            </div>

            <div className="features-divider" aria-hidden="true">|</div>

            <div className="features-item">
              <div className="features-icon-slot">
                <img src="/assets/icons/icon-ready.png" alt="Ready to Eat icon" />
              </div>
              <div className="features-text">
                <div className="features-title">{getContent("features-4-title", "Ready to Eat")}</div>
                <div className="features-subtitle">{getContent("features-4-sub", "Pre-washed & clean")}</div>
              </div>
            </div>

            <div className="features-divider" aria-hidden="true">|</div>

            <div className="features-item">
              <div className="features-icon-slot">
                <img src="/assets/icons/icon-eco.png" alt="Eco Friendly icon" />
              </div>
              <div className="features-text">
                <div className="features-title">{getContent("features-5-title", "Eco Friendly")}</div>
                <div className="features-subtitle">{getContent("features-5-sub", "Sustainable growth")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-microgreens-section" id="about-us">
        <div className="container">
          <div className="about-microgreens-grid">
            <div className="about-microgreens-content reveal">
              <div className="eyebrow" style={{ color: "var(--brand-secondary)" }}>
                {getContent("about-eyebrow", "ABOUT MICROGREENS")}
              </div>
              <h2 style={{ color: "var(--brand-primary)", marginTop: "10px" }}>
                {getContent("about-title", "What are Microgreens")}
              </h2>
              <p>
                {getContent(
                  "about-desc",
                  "Microgreens are young edible seedlings of vegetables, herbs, and other plants harvested 7-21 days after germination, usually after the cotyledon and first true leaves appear. They are valued for their intense flavor, vibrant colors, delicate texture, and high nutrient density."
                )}
              </p>
              <Link href="/about-microgreens" className="btn btn-yellow-20">Read more</Link>
            </div>
            <div className="about-microgreens-image reveal">
              <img 
                src={getContent("about-image", "/assets/img/micro-sec.png")} 
                alt="Microgreens Leaf Collage" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="our-microgreens-section" id="varieties">
        <div className="container">
          <div className="section-head center reveal">
            <div className="eyebrow" style={{ justifyContent: "center", color: "var(--brand-secondary)" }}>
              OUR VARIETIES
            </div>
            <h2 style={{ color: "var(--brand-primary)", marginTop: "10px" }}>Our Microgreens</h2>
          </div>

          {(() => {
            const list: VarietyItem[] = (varietiesDb && varietiesDb.length > 0)
              ? varietiesDb.map((v) => ({
                  id: v.id,
                  name: v.name,
                  tag: v.tag,
                  image_url: v.image_url,
                  slug: v.slug,
                }))
              : [
                  { id: "hc-1", name: "BROCCOLI", tag: "Microgreen", image_url: "/assets/pot/pot-1.png", slug: "broccoli" },
                  { id: "hc-2", name: "PURPLE KALE", tag: "Microgreen", image_url: "/assets/pot/pot-2.png", slug: "purple-kale" },
                  { id: "hc-3", name: "FENUGREEK", tag: "Microgreen", image_url: "/assets/pot/pot-3.png", slug: "fenugreek" },
                  { id: "hc-4", name: "BEETROOT", tag: "Microgreen", image_url: "/assets/pot/pot-4.png", slug: "beetroot" },
                ];

            return <VarietiesSlider varieties={list} />;
          })()}

          <div style={{ textAlign: "center" }} className="reveal">
            <Link href="/varieties" className="btn btn-yellow-20">View All</Link>
          </div>
        </div>
      </section>

      <UsesSlider slides={usesSlides} />

      <section className="blogs-section" id="blogs">
        <div className="container">
          <div className="section-head center reveal">
            <h2 className="uses-section-title" style={{ color: "var(--brand-primary)" }}>Latest From Our Blogs</h2>
          </div>

          <BlogsSlider blogs={finalBlogs} />
        </div>
      </section>

    </main>
  );
}
