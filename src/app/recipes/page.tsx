import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { defaultRecipes, RecipeData } from "@/data/recipes";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Microgreen Recipes | Fit Plate",
  description:
    "Delicious, chef-curated microgreen recipes for breakfasts, power smoothies, and healthy bowls.",
};

export default async function RecipesPage() {
  const supabase = await createClient();
  let dbRecipes: RecipeData[] | null = null;

  try {
    const { data } = await supabase
      .from("recipes")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data && data.length > 0) {
      dbRecipes = data;
    }
  } catch (err) {
    // Fall back to default recipes if table does not exist yet
  }

  const displayRecipes = dbRecipes && dbRecipes.length > 0 ? dbRecipes : defaultRecipes;

  return (
    <main>
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs">
            <Link href="/">Home</Link> / <span>Recipes</span>
          </div>
          <div className="eyebrow">Culinary Inspiration</div>
          <h1>Nourishing Microgreen Recipes</h1>
          <p>Chef-crafted dishes and easy home recipes designed to bring out peak microgreen flavor and nutrition.</p>
        </div>
      </section>

      {displayRecipes.map((recipe, index) => {
        const slug = recipe.slug || recipe.id || recipe.title.toLowerCase().replace(/\s+/g, "-");

        return (
          <section key={recipe.id || slug} className="section alt" id={slug}>
            <div className="container">
              <div
                className="grid-2 reveal"
                style={{
                  alignItems: "center",
                  flexDirection: index % 2 === 1 ? "row-reverse" : "row",
                  gap: "36px",
                }}
              >
                <Link
                  href={`/recipes/${slug}`}
                  style={{
                    display: "block",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    width: "100%",
                    aspectRatio: "4 / 3.2",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
                  }}
                >
                  <img
                    src={recipe.image_url}
                    alt={recipe.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.4s ease",
                    }}
                    loading="lazy"
                  />
                </Link>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                    <span className="tag-pill">{recipe.category}</span>
                    {recipe.prep_time && (
                      <span style={{ fontSize: "13px", color: "var(--ink-500)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        ⏱️ Prep: {recipe.prep_time}
                      </span>
                    )}
                    {recipe.cook_time && (
                      <span style={{ fontSize: "13px", color: "var(--ink-500)" }}>
                        &bull; Cook: {recipe.cook_time}
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: "clamp(22px,2.8vw,30px)", marginTop: "14px" }}>
                    <Link
                      href={`/recipes/${slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {recipe.title}
                    </Link>
                  </h2>

                  <p
                    style={{
                      marginTop: "16px",
                      fontSize: "15.5px",
                      lineHeight: 1.8,
                      color: "var(--ink-700)",
                    }}
                  >
                    {recipe.excerpt}
                  </p>

                  {recipe.microgreens_used && recipe.microgreens_used.length > 0 && (
                    <div style={{ marginTop: "14px", display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--forest-800)" }}>Featured Microgreens:</span>
                      {recipe.microgreens_used.map((m, mi) => (
                        <span
                          key={mi}
                          style={{
                            fontSize: "12px",
                            backgroundColor: "rgba(34, 139, 34, 0.1)",
                            color: "var(--forest-900)",
                            padding: "3px 8px",
                            borderRadius: "12px",
                            fontWeight: 500,
                          }}
                        >
                          🌱 {m}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ marginTop: "22px" }}>
                    <Link
                      href={`/recipes/${slug}`}
                      className="btn btn-gold"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 22px",
                        fontSize: "14px",
                      }}
                    >
                      View Full Recipe &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section deep" style={{ paddingBottom: 0 }}>
        <div
          className="container reveal"
          style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto", paddingBottom: "76px" }}
        >
          <div className="icon-badge" style={{ margin: "0 auto" }}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h2 style={{ marginTop: "20px" }}>Want fresh microgreens delivered?</h2>
          <p style={{ marginTop: "12px" }}>
            Elevate your daily cooking with ultra-fresh, locally grown microgreens delivered directly to your doorstep in Mangalore.
          </p>
          <div style={{ marginTop: "26px" }}>
            <Link href="/contact" className="btn btn-gold">
              Order Fresh Microgreens
            </Link>
          </div>
        </div>
        <div className="container">
          <hr style={{ border: "none", borderTop: "1px solid rgba(255, 255, 255, 0.15)", margin: 0 }} />
        </div>
      </section>
    </main>
  );
}
