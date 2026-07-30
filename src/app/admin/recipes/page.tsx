"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Recipe {
  id?: string;
  title: string;
  slug: string;
  category: string;
  prep_time: string;
  cook_time: string;
  servings: string;
  image_url: string;
  excerpt: string;
  ingredients: string; // stored as line-separated or array
  instructions: string; // stored as line-separated or array
  health_benefits: string; // stored as line-separated or array
  microgreens_used: string; // stored as comma separated
  sort_order: number;
}

export default function AdminRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Recipe>({
    title: "",
    slug: "",
    category: "Breakfast & Brunch",
    prep_time: "10 mins",
    cook_time: "5 mins",
    servings: "2 servings",
    image_url: "",
    excerpt: "",
    ingredients: "",
    instructions: "",
    health_benefits: "",
    microgreens_used: "Broccoli Microgreens",
    sort_order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [tableMissing, setTableMissing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    setTableMissing(false);
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      if (error.message.includes("schema cache") || error.message.includes("does not exist")) {
        setTableMissing(true);
      } else {
        setMessage({ type: "error", text: `Error loading recipes from Supabase: ${error.message}` });
      }
    } else {
      setRecipes(data || []);
    }
    setLoading(false);
  };

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, title, slug }));
  };

  const parseArrayToString = (val: any): string => {
    if (Array.isArray(val)) return val.join("\n");
    return val || "";
  };

  const handleSelect = (r: any) => {
    setSelectedId(r.id || null);
    setFormData({
      title: r.title || "",
      slug: r.slug || "",
      category: r.category || "",
      prep_time: r.prep_time || "",
      cook_time: r.cook_time || "",
      servings: r.servings || "",
      image_url: r.image_url || "",
      excerpt: r.excerpt || "",
      ingredients: parseArrayToString(r.ingredients),
      instructions: parseArrayToString(r.instructions),
      health_benefits: parseArrayToString(r.health_benefits),
      microgreens_used: Array.isArray(r.microgreens_used) ? r.microgreens_used.join(", ") : (r.microgreens_used || ""),
      sort_order: r.sort_order || 0,
    });
  };

  const handleAddNew = () => {
    setSelectedId(null);
    setFormData({
      title: "",
      slug: "",
      category: "Breakfast & Brunch",
      prep_time: "10 mins",
      cook_time: "5 mins",
      servings: "2 servings",
      image_url: "",
      excerpt: "",
      ingredients: "",
      instructions: "",
      health_benefits: "",
      microgreens_used: "Broccoli Microgreens",
      sort_order: recipes.length,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `recipes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("fitplate-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("fitplate-assets")
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
      setMessage({ type: "success", text: "Image uploaded successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: `Image upload failed: ${err.message}` });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setMessage(null);

    try {
      // Prepare payload with arrays for textareas
      const payload = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        prep_time: formData.prep_time,
        cook_time: formData.cook_time,
        servings: formData.servings,
        image_url: formData.image_url,
        excerpt: formData.excerpt,
        ingredients: formData.ingredients.split("\n").map(s => s.trim()).filter(Boolean),
        instructions: formData.instructions.split("\n").map(s => s.trim()).filter(Boolean),
        health_benefits: formData.health_benefits.split("\n").map(s => s.trim()).filter(Boolean),
        microgreens_used: formData.microgreens_used.split(",").map(s => s.trim()).filter(Boolean),
        sort_order: Number(formData.sort_order) || 0,
      };

      let error;

      if (selectedId) {
        const { error: err } = await supabase
          .from("recipes")
          .update(payload)
          .eq("id", selectedId);
        error = err;
      } else {
        const { error: err } = await supabase
          .from("recipes")
          .insert([payload]);
        error = err;
      }

      if (error) throw error;

      setMessage({ type: "success", text: "Recipe saved successfully!" });

      // Trigger On-Demand ISR Revalidation
      await fetch("/api/revalidate?path=/recipes");
      await fetch("/api/revalidate?path=/");

      handleAddNew();
      fetchRecipes();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    setMessage(null);
    try {
      const { error } = await supabase.from("recipes").delete().eq("id", id);
      if (error) throw error;

      setMessage({ type: "success", text: "Recipe deleted successfully." });

      // Trigger On-Demand ISR Revalidation
      await fetch("/api/revalidate?path=/recipes");
      await fetch("/api/revalidate?path=/");

      if (selectedId === id) {
        handleAddNew();
      }
      fetchRecipes();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to delete: ${err.message}` });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Recipes Content Manager</h1>
          <p>Create, edit, or delete microgreen recipes shown on the website.</p>
        </div>
        <button className="btn btn-gold btn-sm" onClick={handleAddNew}>
          + Add New Recipe
        </button>
      </div>

      {tableMissing && (
        <div className="admin-card" style={{ border: "2px dashed var(--gold-600)", background: "#FFFDF9", marginBottom: "24px", padding: "20px 24px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "24px" }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 6px 0", color: "var(--forest-900)" }}>Supabase Database Setup Required</h3>
              <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#555" }}>
                The <code style={{ background: "#eee", padding: "2px 6px", borderRadius: "4px" }}>recipes</code> table has not been created in your Supabase database yet. Run the following SQL script once in your <strong>Supabase SQL Editor</strong>:
              </p>
              <pre style={{ background: "#1e1e1e", color: "#d4d4d4", padding: "14px", borderRadius: "8px", fontSize: "12.5px", overflowX: "auto", margin: "0 0 12px 0", lineHeight: 1.5 }}>
                {`CREATE TABLE IF NOT EXISTS public.recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Breakfast & Brunch',
  prep_time TEXT,
  cook_time TEXT,
  servings TEXT,
  image_url TEXT,
  excerpt TEXT,
  ingredients JSONB DEFAULT '[]'::jsonb,
  instructions JSONB DEFAULT '[]'::jsonb,
  health_benefits JSONB DEFAULT '[]'::jsonb,
  microgreens_used JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

GRANT ALL ON TABLE public.recipes TO anon, authenticated, service_role;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.recipes;
CREATE POLICY "Allow public read access" ON public.recipes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated full access" ON public.recipes;
CREATE POLICY "Allow authenticated full access" ON public.recipes FOR ALL USING (true);

NOTIFY pgrst, 'reload schema';`}
              </pre>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button
                  className="btn btn-gold btn-sm"
                  onClick={() => {
                    const sql = `CREATE TABLE IF NOT EXISTS public.recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Breakfast & Brunch',
  prep_time TEXT,
  cook_time TEXT,
  servings TEXT,
  image_url TEXT,
  excerpt TEXT,
  ingredients JSONB DEFAULT '[]'::jsonb,
  instructions JSONB DEFAULT '[]'::jsonb,
  health_benefits JSONB DEFAULT '[]'::jsonb,
  microgreens_used JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

GRANT ALL ON TABLE public.recipes TO anon, authenticated, service_role;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.recipes;
CREATE POLICY "Allow public read access" ON public.recipes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated full access" ON public.recipes;
CREATE POLICY "Allow authenticated full access" ON public.recipes FOR ALL USING (true);

NOTIFY pgrst, 'reload schema';`;
                    navigator.clipboard.writeText(sql);
                    setCopiedSql(true);
                    setTimeout(() => setCopiedSql(false), 3000);
                  }}
                >
                  {copiedSql ? "✓ SQL Copied!" : "📋 Copy SQL Script"}
                </button>
                <button className="btn btn-forest btn-sm" onClick={fetchRecipes}>
                  🔄 Refresh & Verify Table
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-editor-grid">
        {/* Left Side: Recipes List */}
        <div className="admin-card">
          <h2 className="admin-card-title">All Recipes</h2>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <span className="admin-spinner" />
            </div>
          ) : recipes.length === 0 ? (
            <p className="admin-muted" style={{ textAlign: "center" }}>No custom recipes in database yet. Add your first recipe!</p>
          ) : (
            <div className="admin-list">
              {recipes.map((r) => (
                <div
                  key={r.id}
                  className={`admin-list-item ${selectedId === r.id ? "active" : ""}`}
                  onClick={() => handleSelect(r)}
                >
                  <div>
                    <div className="admin-list-item-name">{r.title}</div>
                    <div className="admin-list-item-meta">{r.category} • Order: {r.sort_order}</div>
                  </div>
                  <button
                    className="admin-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(r.id!);
                    }}
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Recipe Form */}
        <div className="admin-card">
          <h2 className="admin-card-title">
            {selectedId ? `Edit: ${formData.title}` : "New Recipe"}
          </h2>
          <form onSubmit={handleSave} className="admin-form">
            <div className="field">
              <label>Recipe Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Sourdough Avocado Toast with Broccoli Microgreens"
                required
              />
            </div>

            <div className="field">
              <label>Slug (URL identifier)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g. avocado-toast-broccoli-microgreens"
                required
              />
            </div>

            <div className="field">
              <label>Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="e.g. Breakfast & Brunch, Smoothies, Salads"
                required
              />
            </div>

            <div className="field-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              <div className="field">
                <label>Prep Time</label>
                <input
                  type="text"
                  value={formData.prep_time}
                  onChange={(e) => setFormData((prev) => ({ ...prev, prep_time: e.target.value }))}
                  placeholder="e.g. 10 mins"
                />
              </div>
              <div className="field">
                <label>Cook Time</label>
                <input
                  type="text"
                  value={formData.cook_time}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cook_time: e.target.value }))}
                  placeholder="e.g. 5 mins"
                />
              </div>
              <div className="field">
                <label>Servings</label>
                <input
                  type="text"
                  value={formData.servings}
                  onChange={(e) => setFormData((prev) => ({ ...prev, servings: e.target.value }))}
                  placeholder="e.g. 2 servings"
                />
              </div>
            </div>

            <div className="field">
              <label>Cover Photo / Dish Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <p className="admin-muted" style={{ fontSize: "12px", marginTop: "4px" }}>Uploading image...</p>}
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder="Or paste image URL"
                style={{ marginTop: "8px" }}
              />
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="admin-image-preview"
                />
              )}
            </div>

            <div className="field">
              <label>Short Description</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief summary of dish and microgreens..."
                rows={3}
                required
              />
            </div>

            <div className="field">
              <label>Ingredients (enter each ingredient on a new line)</label>
              <textarea
                value={formData.ingredients}
                onChange={(e) => setFormData((prev) => ({ ...prev, ingredients: e.target.value }))}
                placeholder={"2 slices sourdough bread\n1 ripe avocado\n1/2 cup Broccoli Microgreens"}
                rows={5}
                required
              />
            </div>

            <div className="field">
              <label>Preparation Steps (enter each step on a new line)</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData((prev) => ({ ...prev, instructions: e.target.value }))}
                placeholder={"Toast sourdough until golden.\nMash avocado with lemon juice.\nTop with microgreens."}
                rows={6}
                required
              />
            </div>

            <div className="field">
              <label>Health Benefits (enter each benefit point on a new line)</label>
              <textarea
                value={formData.health_benefits}
                onChange={(e) => setFormData((prev) => ({ ...prev, health_benefits: e.target.value }))}
                placeholder="High in sulforaphane antioxidant.\nSupports heart and digestive wellness."
                rows={3}
              />
            </div>

            <div className="field">
              <label>Microgreens Used (comma separated)</label>
              <input
                type="text"
                value={formData.microgreens_used}
                onChange={(e) => setFormData((prev) => ({ ...prev, microgreens_used: e.target.value }))}
                placeholder="e.g. Broccoli Microgreens, Radish Microgreens"
              />
            </div>

            <div className="field">
              <label>Sort Order</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                required
              />
            </div>

            <div className="admin-btn-row">
              <button type="submit" className="btn btn-gold btn-sm" disabled={saveLoading || uploading}>
                {saveLoading ? <><span className="admin-spinner" /> Saving...</> : "Save Recipe"}
              </button>
              <button type="button" className="btn btn-forest btn-sm" onClick={handleAddNew}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
