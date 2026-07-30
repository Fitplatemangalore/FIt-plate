import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { defaultRecipes, RecipeData } from "@/data/recipes";
import { notFound } from "next/navigation";
import RecipeActions from "@/components/RecipeActions";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getRecipe(slug: string): Promise<RecipeData | null> {
  const supabase = await createClient();

  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  const isNumber = /^\d+$/.test(slug);

  let query = supabase.from("recipes").select("*");
  if (isUUID || isNumber) {
    query = query.or(`slug.eq.${slug},id.eq.${slug}`);
  } else {
    query = query.eq("slug", slug);
  }

  const { data: dbData } = await query.maybeSingle();

  const fallback = defaultRecipes.find(
    (item) => item.slug === slug || item.id === slug
  );

  if (dbData) {
    return {
      id: dbData.id || dbData.slug || slug,
      slug: dbData.slug || slug,
      title: dbData.title,
      image_url: dbData.image_url || fallback?.image_url || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      category: dbData.category || fallback?.category || "Microgreen Recipe",
      prep_time: dbData.prep_time || fallback?.prep_time || "10 mins",
      cook_time: dbData.cook_time || fallback?.cook_time || "5 mins",
      servings: dbData.servings || fallback?.servings || "2 servings",
      excerpt: dbData.excerpt || fallback?.excerpt || "",
      ingredients: typeof dbData.ingredients === "string" ? dbData.ingredients.split("\n").filter(Boolean) : (dbData.ingredients || fallback?.ingredients || []),
      instructions: typeof dbData.instructions === "string" ? dbData.instructions.split("\n").filter(Boolean) : (dbData.instructions || fallback?.instructions || []),
      health_benefits: typeof dbData.health_benefits === "string" ? dbData.health_benefits.split("\n").filter(Boolean) : (dbData.health_benefits || fallback?.health_benefits || []),
      microgreens_used: typeof dbData.microgreens_used === "string" ? dbData.microgreens_used.split(",").map((s: string) => s.trim()).filter(Boolean) : (dbData.microgreens_used || fallback?.microgreens_used || []),
    };
  }

  if (fallback) {
    return fallback;
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found | Fit Plate Microgreens",
    };
  }

  return {
    title: `${recipe.title} | Fit Plate Recipes`,
    description: recipe.excerpt.slice(0, 160),
  };
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="recipe-detail-main">
      <section className="page-hero print-hide">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url('${recipe.image_url}')`,
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/recipes">Recipes</Link> /{" "}
            <span>{recipe.title}</span>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px", flexWrap: "wrap" }}>
            <span className="tag-pill">{recipe.category}</span>
            <span style={{ fontSize: "14px", color: "var(--gold-300)" }}>⏱️ Prep: {recipe.prep_time}</span>
            {recipe.cook_time && <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)" }}>&bull; Cook: {recipe.cook_time}</span>}
            {recipe.servings && <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.8)" }}>&bull; 🍽️ {recipe.servings}</span>}
          </div>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", maxWidth: "900px" }}>{recipe.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "920px", margin: "0 auto" }}>
          
          {/* Header Card for Print View */}
          <div className="print-only-header" style={{ display: "none" }}>
            <div style={{ fontSize: "12px", textTransform: "uppercase", tracking: "1px", color: "#666" }}>Fit Plate Microgreen Recipe</div>
            <h1 style={{ fontSize: "28px", margin: "8px 0" }}>{recipe.title}</h1>
            <p style={{ fontStyle: "italic", margin: "4px 0 16px 0", color: "#444" }}>{recipe.excerpt}</p>
            <div style={{ fontSize: "13px", margin: "8px 0 16px 0", color: "#333", borderBottom: "2px solid #164e2e", paddingBottom: "8px" }}>
              <strong>Category:</strong> {recipe.category} | <strong>Prep:</strong> {recipe.prep_time} | <strong>Cook:</strong> {recipe.cook_time} | <strong>Servings:</strong> {recipe.servings}
            </div>
          </div>

          {/* Featured Dish Photo */}
          <div
            className="reveal"
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "28px",
              boxShadow: "0 16px 40px rgba(12, 72, 41, 0.12)",
              height: "440px",
              width: "100%",
            }}
          >
            <img
              src={recipe.image_url}
              alt={recipe.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Social Share & Print Action Bar */}
          <RecipeActions title={recipe.title} excerpt={recipe.excerpt} />

          {/* Short Excerpt Summary */}
          {recipe.excerpt && (
            <div
              className="reveal"
              style={{
                background: "rgba(12, 72, 41, 0.05)",
                borderLeft: "4px solid var(--gold-600)",
                borderRadius: "8px",
                padding: "18px 22px",
                marginBottom: "36px",
                fontSize: "16.5px",
                lineHeight: "1.6",
                color: "var(--forest-900)",
              }}
            >
              {recipe.excerpt}
            </div>
          )}

          {/* Recipe Content Layout: 2 Columns on Desktop */}
          <div className="recipe-grid-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "36px", marginTop: "24px" }}>
            
            {/* Left Column: Ingredients & Microgreens */}
            <div className="recipe-ingredients-col">
              <div
                style={{
                  background: "#FAF9F6",
                  border: "1px solid rgba(12, 72, 41, 0.12)",
                  borderRadius: "14px",
                  padding: "24px",
                }}
              >
                <h3 style={{ fontSize: "20px", color: "var(--forest-900)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>🥗</span> Ingredients
                </h3>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {recipe.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      style={{
                        padding: "10px 0",
                        borderBottom: i < recipe.ingredients.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                        fontSize: "15px",
                        lineHeight: "1.5",
                        color: "var(--ink-800)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span style={{ color: "var(--forest-700)", fontWeight: "bold", fontSize: "16px" }}>✓</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>

                {recipe.microgreens_used && recipe.microgreens_used.length > 0 && (
                  <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px dashed var(--gold-500)" }}>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--forest-800)", marginBottom: "8px" }}>
                      FIT PLATE MICROGREENS USED:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {recipe.microgreens_used.map((m, mi) => (
                        <span
                          key={mi}
                          style={{
                            fontSize: "12.5px",
                            backgroundColor: "var(--forest-800)",
                            color: "var(--cream-100)",
                            padding: "4px 10px",
                            borderRadius: "14px",
                            fontWeight: 500,
                          }}
                        >
                          🌱 {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Step-by-Step Instructions */}
            <div className="recipe-instructions-col">
              <h3 style={{ fontSize: "22px", color: "var(--forest-900)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>👨‍🍳</span> Preparation Instructions
              </h3>

              <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {recipe.instructions.map((step, i) => (
                  <li
                    key={i}
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        minWidth: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "var(--gold-500)",
                        color: "var(--forest-950)",
                        fontWeight: "bold",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div
                      style={{
                        fontSize: "15.5px",
                        lineHeight: "1.7",
                        color: "var(--ink-800)",
                        paddingTop: "2px",
                      }}
                    >
                      {step}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Health Benefits Section */}
          {recipe.health_benefits && recipe.health_benefits.length > 0 && (
            <div
              className="reveal"
              style={{
                marginTop: "44px",
                background: "linear-gradient(135deg, rgba(12, 72, 41, 0.08) 0%, rgba(212, 175, 55, 0.12) 100%)",
                borderRadius: "16px",
                padding: "28px 32px",
                border: "1px solid rgba(12, 72, 41, 0.15)",
              }}
            >
              <h3 style={{ fontSize: "20px", color: "var(--forest-900)", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>🌿</span> Microgreen Health Benefits
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {recipe.health_benefits.map((benefit, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.6", color: "var(--ink-900)" }}>
                    <span style={{ color: "var(--gold-600)", fontWeight: "bold" }}>✦</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recipe Footer & Navigation */}
          <div
            className="reveal print-hide"
            style={{
              marginTop: "48px",
              paddingTop: "24px",
              borderTop: "1px solid var(--cream-300)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <Link
              href="/recipes"
              className="btn btn-outline"
              style={{ borderColor: "var(--forest-800)", color: "var(--forest-900)" }}
            >
              &larr; Back to All Recipes
            </Link>

            <Link href="/contact" className="btn btn-gold">
              Order Microgreens
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
