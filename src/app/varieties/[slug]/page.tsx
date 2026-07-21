import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { defaultVarieties, VarietyData } from "@/data/varieties";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getVariety(slug: string): Promise<VarietyData | null> {
  const supabase = await createClient();

  // Try fetching from Supabase by slug or id
  const { data: dbData } = await supabase
    .from("varieties")
    .select("*")
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .maybeSingle();

  // Match default fallback item if any
  const fallback = defaultVarieties.find(
    (item) => item.slug === slug || item.id === slug
  );

  if (dbData) {
    return {
      id: dbData.id || dbData.slug || slug,
      slug: dbData.slug || slug,
      name: dbData.name,
      tag: dbData.tag || "Microgreen",
      tag_pill: dbData.tag_pill || fallback?.tag_pill || "",
      highlight: dbData.highlight || fallback?.highlight || "",
      description: dbData.description || fallback?.description || "",
      best_in: dbData.best_in || fallback?.best_in || "",
      image_url: dbData.image_url || fallback?.image_url || "/assets/pot/pot-1.png",
      benefits: fallback?.benefits || [
        "Rich in essential vitamins and antioxidant compounds",
        "Supports cellular health and immune defense",
        "Harvested at peak nutrient concentration",
        "Fresh, crisp texture and vibrant flavor profile",
      ],
      growing_time: fallback?.growing_time || "7 – 14 days",
      flavor_profile: fallback?.flavor_profile || "Fresh, clean and vibrant",
    };
  }

  if (fallback) {
    return fallback;
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const variety = await getVariety(slug);

  if (!variety) {
    return {
      title: "Variety Not Found | Fit Plate Microgreens",
    };
  }

  return {
    title: `${variety.name} | Fit Plate Microgreens`,
    description: variety.description.slice(0, 160),
  };
}

export default async function VarietyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const variety = await getVariety(slug);

  if (!variety) {
    notFound();
  }

  return (
    <main>
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1640671509786-7ddd9d77c866?auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/varieties">Our Microgreens</Link> /{" "}
            <span>{variety.name}</span>
          </div>
          {variety.tag_pill && <div className="tag-pill" style={{ marginBottom: "12px" }}>{variety.tag_pill}</div>}
          <h1>{variety.name}</h1>
          {variety.highlight && (
            <p style={{ fontStyle: "italic", color: "var(--gold-300)", fontSize: "18px" }}>
              "{variety.highlight}"
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: "40px", alignItems: "start" }}>
            {/* Image Box */}
            <div
              className="card reveal"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 12px 32px rgba(12, 72, 41, 0.1)",
                background: "var(--cream-100)",
              }}
            >
              <div style={{ width: "100%", height: "380px", overflow: "hidden", position: "relative" }}>
                <img
                  src={variety.image_url}
                  alt={variety.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "24px", textAlign: "center" }}>
                <h3 style={{ fontSize: "20px", color: "var(--forest-900)" }}>{variety.name}</h3>
                <span className="pot-tag" style={{ marginTop: "6px", display: "inline-block" }}>
                  {variety.tag}
                </span>
              </div>
            </div>

            {/* Details Box */}
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h2 style={{ fontSize: "28px", color: "var(--forest-900)", marginBottom: "16px" }}>
                  About {variety.name}
                </h2>
                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--ink-700)" }}>
                  {variety.description}
                </p>
              </div>

              {/* Quick Specs */}
              <div
                style={{
                  background: "rgba(12, 72, 41, 0.04)",
                  borderLeft: "4px solid var(--gold-600)",
                  borderRadius: "8px",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {variety.flavor_profile && (
                  <div>
                    <strong style={{ color: "var(--forest-900)" }}>Flavor Profile:</strong>{" "}
                    <span style={{ color: "var(--ink-700)" }}>{variety.flavor_profile}</span>
                  </div>
                )}
                {variety.growing_time && (
                  <div>
                    <strong style={{ color: "var(--forest-900)" }}>Harvest Window:</strong>{" "}
                    <span style={{ color: "var(--ink-700)" }}>{variety.growing_time}</span>
                  </div>
                )}
                {variety.best_in && (
                  <div>
                    <strong style={{ color: "var(--forest-900)" }}>Best Served In:</strong>{" "}
                    <span style={{ color: "var(--ink-700)" }}>{variety.best_in}</span>
                  </div>
                )}
              </div>

              {/* Health Benefits */}
              {variety.benefits && variety.benefits.length > 0 && (
                <div>
                  <h3 style={{ fontSize: "20px", color: "var(--forest-900)", marginBottom: "12px" }}>
                    Key Health & Nutritional Benefits
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {variety.benefits.map((b, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "15px", color: "var(--ink-700)" }}>
                        <span style={{ color: "var(--gold-600)", fontWeight: "bold" }}>✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTAs */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "12px" }}>
                <Link href="/contact" className="btn btn-gold">
                  Request a Quote
                </Link>
                <Link href="/varieties" className="btn btn-outline" style={{ borderColor: "var(--forest-800)", color: "var(--forest-900)" }}>
                  &larr; Back to All Microgreens
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section alt">
        <div className="container reveal" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,32px)" }}>Freshly Grown for Your Table &amp; Kitchen</h2>
          <p style={{ marginTop: "12px", maxWidth: "540px", marginLeft: "auto", marginRight: "auto" }}>
            We supply fresh microgreen trays to homes, cafes, and fine-dining restaurants across Mangalore.
          </p>
          <div style={{ marginTop: "24px" }}>
            <Link href="/contact" className="btn btn-gold">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
