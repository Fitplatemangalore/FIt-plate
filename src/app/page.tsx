import HeroCarousel from "@/components/HeroCarousel";
import UsesSlider from "@/components/UsesSlider";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 3600; // Cache pages, but allow on-demand ISR to revalidate instantly

export default async function Home() {
  const supabase = await createClient();

  // 1. Fetch Hero Slides (if any)
  const { data: heroDb } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true });

  const heroSlides = heroDb && heroDb.length > 0 
    ? heroDb.map((s) => ({
        tray: s.tray_image,
        bgText: s.bg_text,
        leaves: s.leaves || [],
      }))
    : undefined;

  // 2. Fetch Varieties (Featured or top 4)
  const { data: varietiesDb } = await supabase
    .from("varieties")
    .select("*")
    .order("sort_order", { ascending: true })
    .limit(4);

  // 3. Fetch Uses Slides
  const { data: usesDb } = await supabase
    .from("uses_slides")
    .select("*")
    .order("sort_order", { ascending: true });

  const usesSlides = usesDb && usesDb.length > 0
    ? usesDb.map((s) => ({
        title: s.title,
        description: s.description,
        main_image_url: s.main_image_url,
        corner_image_url: s.corner_image_url,
      }))
    : undefined;

  // 4. Fetch Blogs (Latest 3)
  const { data: blogsDb } = await supabase
    .from("blogs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("published_date", { ascending: false })
    .limit(3);

  // 5. Fetch Testimonials
  const { data: testimonialsDb } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  // 6. Fetch Page Content (General editable text fields)
  const { data: contentDb } = await supabase
    .from("site_content")
    .select("*")
    .eq("page", "home");

  const getContent = (key: string, fallback: string) => {
    return contentDb?.find((c) => c.key === key)?.value || fallback;
  };

  return (
    <main>
      <HeroCarousel slides={heroSlides} />

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
              <Link href="/about" className="btn btn-gold btn-radius-20">Read more</Link>
            </div>
            <div className="about-microgreens-image reveal">
              <img 
                src={getContent("about-image", "/assets/img/micro-sec.png")} 
                alt="Microgreens overview" 
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

          <div className="our-microgreens-grid reveal stagger">
            {varietiesDb && varietiesDb.length > 0 ? (
              varietiesDb.map((v, i) => (
                <div key={v.id} className="pot-card" style={{ "--i": i } as React.CSSProperties}>
                  <div className="pot-image-wrapper">
                    {/* Fallback to default pot image layout if it matches local set, otherwise render upload card */}
                    <img 
                      src={v.image_url || `/assets/pot/pot-${(i % 4) + 1}.png`} 
                      alt={`${v.name} pot`} 
                      className="pot-image" 
                    />
                  </div>
                  <h3 className="pot-name" style={{ textTransform: "uppercase" }}>{v.name}</h3>
                  <div className="pot-tag">{v.tag}</div>
                </div>
              ))
            ) : (
              // Hardcoded default fallbacks
              <>
                <div className="pot-card" style={{ "--i": 0 } as React.CSSProperties}>
                  <div className="pot-image-wrapper">
                    <img src="/assets/pot/pot-1.png" alt="Broccoli Microgreens pot" className="pot-image" />
                  </div>
                  <h3 className="pot-name">BROCCOLI</h3>
                  <div className="pot-tag">Microgreen</div>
                </div>

                <div className="pot-card" style={{ "--i": 1 } as React.CSSProperties}>
                  <div className="pot-image-wrapper">
                    <img src="/assets/pot/pot-2.png" alt="Purple Kale Microgreens pot" className="pot-image" />
                  </div>
                  <h3 className="pot-name">PURPLE KALE</h3>
                  <div className="pot-tag">Microgreen</div>
                </div>

                <div className="pot-card" style={{ "--i": 2 } as React.CSSProperties}>
                  <div className="pot-image-wrapper">
                    <img src="/assets/pot/pot-3.png" alt="Fenugreek Microgreens pot" className="pot-image" />
                  </div>
                  <h3 className="pot-name">FENUGREEK</h3>
                  <div className="pot-tag">Microgreen</div>
                </div>

                <div className="pot-card" style={{ "--i": 3 } as React.CSSProperties}>
                  <div className="pot-image-wrapper">
                    <img src="/assets/pot/pot-4.png" alt="Beetroot Microgreens pot" className="pot-image" />
                  </div>
                  <h3 className="pot-name">BEETROOT</h3>
                  <div className="pot-tag">Microgreen</div>
                </div>
              </>
            )}
          </div>

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

          <div className="blogs-grid reveal stagger">
            {blogsDb && blogsDb.length > 0 ? (
              blogsDb.map((b, i) => (
                <div key={b.id} className="blog-card" style={{ "--i": i } as React.CSSProperties}>
                  <img src={b.image_url} alt={b.title} className="blog-card-image" style={{ objectFit: "cover" }} />
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="tag-pill">{b.category}</span>
                      <span className="blog-card-date">
                        {new Date(b.published_date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="blog-card-title">{b.title}</h3>
                    <p className="blog-card-desc">{b.excerpt}</p>
                    <Link href={`/blogs#${b.slug}`} className="blog-card-link">
                      Read more
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              // Hardcoded default fallbacks
              <>
                <div className="blog-card" style={{ "--i": 0 } as React.CSSProperties}>
                  <img src="https://images.unsplash.com/photo-1640671510956-8c8e1deb0dd9?auto=format&fit=crop&w=900&q=80" alt="History of Microgreens" className="blog-card-image" />
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="tag-pill">Origins</span>
                      <span className="blog-card-date">July 10, 2026</span>
                    </div>
                    <h3 className="blog-card-title">From Chef's Garnish to Kitchen Staple: A Short History of Microgreens</h3>
                    <p className="blog-card-desc">Explore the fascinating history of microgreens, from their origins as a gourmet garnish in California fine dining during the 1980s to becoming an everyday superfood.</p>
                    <Link href="/blogs" className="blog-card-link">
                      Read more
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="blog-card" style={{ "--i": 1 } as React.CSSProperties}>
                  <img src="https://images.unsplash.com/photo-1593629718347-283811841101?auto=format&fit=crop&w=900&q=80" alt="Science of Microgreen density" className="blog-card-image" />
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="tag-pill">Nutrition</span>
                      <span className="blog-card-date">July 5, 2026</span>
                    </div>
                    <h3 className="blog-card-title">Why 40x the Nutrients? The Science Behind Microgreen Density</h3>
                    <p className="blog-card-desc">Why do these tiny seedlings pack up to 40 times more nutrients than mature vegetables? We dive into the plant biology and science behind their nutritional density.</p>
                    <Link href="/blogs" className="blog-card-link">
                      Read more
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="blog-card" style={{ "--i": 2 } as React.CSSProperties}>
                  <img src="https://images.unsplash.com/photo-1647613233056-fc9918256a8d?auto=format&fit=crop&w=900&q=80" alt="Hotels & Restaurants Using Microgreens" className="blog-card-image" />
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="tag-pill">For Business</span>
                      <span className="blog-card-date">June 28, 2026</span>
                    </div>
                    <h3 className="blog-card-title">10 Ways Hotels & Restaurants Are Using Microgreens on the Menu</h3>
                    <p className="blog-card-desc">From visual freshness in hotel buffets to year-round culinary consistency, learn why leading kitchens are shifting from garnish to building microgreens directly into the menu.</p>
                    <Link href="/blogs" className="blog-card-link">
                      Read more
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="section-head center reveal">
            <h2 className="uses-section-title" style={{ color: "var(--brand-primary)" }}>Testimonials</h2>
            <p style={{ color: "var(--ink-700)", marginTop: "20px" }}>See what our client & partners are saying about Fit Plate microgreens.</p>
          </div>

          <div className="testimonials-grid reveal stagger">
            {testimonialsDb && testimonialsDb.length > 0 ? (
              testimonialsDb.map((t, i) => (
                <a 
                  key={t.id}
                  href={t.link || "https://maps.google.com/?q=Fitplate+Ventures+Mangalore"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="testimonial-link-card" 
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className="testimonial-card">
                    <div className="testimonial-user-row">
                      <div className="testimonial-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="testimonial-user-info">
                        <h4>{t.name}</h4>
                        <span>{t.role}</span>
                      </div>
                    </div>
                    <p className="testimonial-quote">"{t.quote}"</p>
                    <div className="testimonial-stars">
                      {[...Array(t.stars || 5)].map((_, starIdx) => (
                        <svg key={starIdx} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <div className="testimonial-google-badge">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#fff" }}>
                        <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.483 0-6.312-2.829-6.312-6.312 0-3.483 2.829-6.312 6.312-6.312 1.624 0 3.097.621 4.225 1.63l3.24-3.24C19.336 2.222 15.992 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.24-4.553 11.24-11.24 0-.761-.077-1.498-.216-2.185H12.24z" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              // Hardcoded default fallbacks
              <>
                <a href="https://maps.google.com/?q=Fitplate+Ventures+Mangalore" target="_blank" rel="noopener noreferrer" className="testimonial-link-card" style={{ "--i": 0 } as React.CSSProperties}>
                  <div className="testimonial-card">
                    <div className="testimonial-user-row">
                      <div className="testimonial-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="testimonial-user-info">
                        <h4>Shwetha Initiative</h4>
                        <span>Cafe Partner</span>
                      </div>
                    </div>
                    <p className="testimonial-quote">"Vibrant color, excellent texture. Highly recommend."</p>
                    <div className="testimonial-stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <div className="testimonial-google-badge">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#fff" }}>
                        <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.483 0-6.312-2.829-6.312-6.312 0-3.483 2.829-6.312 6.312-6.312 1.624 0 3.097.621 4.225 1.63l3.24-3.24C19.336 2.222 15.992 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.24-4.553 11.24-11.24 0-.761-.077-1.498-.216-2.185H12.24z" />
                      </svg>
                    </div>
                  </div>
                </a>

                <a href="https://maps.google.com/?q=Fitplate+Ventures+Mangalore" target="_blank" rel="noopener noreferrer" className="testimonial-link-card" style={{ "--i": 1 } as React.CSSProperties}>
                  <div className="testimonial-card">
                    <div className="testimonial-user-row">
                      <div className="testimonial-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="testimonial-user-info">
                        <h4>Milagres Catering</h4>
                        <span>Event Caterer</span>
                      </div>
                    </div>
                    <p className="testimonial-quote">"Consistently fresh and delivered cold. Perfect for our large buffets."</p>
                    <div className="testimonial-stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <div className="testimonial-google-badge">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#fff" }}>
                        <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.483 0-6.312-2.829-6.312-6.312 0-3.483 2.829-6.312 6.312-6.312 1.624 0 3.097.621 4.225 1.63l3.24-3.24C19.336 2.222 15.992 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.24-4.553 11.24-11.24 0-.761-.077-1.498-.216-2.185H12.24z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
