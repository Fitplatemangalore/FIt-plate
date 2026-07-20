"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Variety {
  id?: string;
  name: string;
  slug: string;
  tag: string;
  tag_pill: string;
  highlight: string;
  description: string;
  best_in: string;
  image_url: string;
  is_featured: boolean;
  sort_order: number;
}

export default function AdminVarieties() {
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Variety>({
    name: "",
    slug: "",
    tag: "Microgreen",
    tag_pill: "",
    highlight: "",
    description: "",
    best_in: "",
    image_url: "",
    is_featured: false,
    sort_order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("varieties")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      setMessage({ type: "error", text: `Error loading varieties: ${error.message}` });
    } else {
      setVarieties(data || []);
    }
    setLoading(false);
  };

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, name, slug }));
  };

  const handleSelect = (variety: Variety) => {
    setSelectedId(variety.id || null);
    setFormData({
      name: variety.name,
      slug: variety.slug,
      tag: variety.tag || "Microgreen",
      tag_pill: variety.tag_pill || "",
      highlight: variety.highlight || "",
      description: variety.description || "",
      best_in: variety.best_in || "",
      image_url: variety.image_url || "",
      is_featured: !!variety.is_featured,
      sort_order: variety.sort_order || 0,
    });
  };

  const handleAddNew = () => {
    setSelectedId(null);
    setFormData({
      name: "",
      slug: "",
      tag: "Microgreen",
      tag_pill: "",
      highlight: "",
      description: "",
      best_in: "",
      image_url: "",
      is_featured: false,
      sort_order: varieties.length,
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
      const filePath = `varieties/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("fitplate-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
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
      let error;

      if (selectedId) {
        // Update
        const { error: err } = await supabase
          .from("varieties")
          .update(formData)
          .eq("id", selectedId);
        error = err;
      } else {
        // Insert
        const { error: err } = await supabase
          .from("varieties")
          .insert([formData]);
        error = err;
      }

      if (error) throw error;

      setMessage({ type: "success", text: "Variety saved successfully!" });
      
      // Trigger On-Demand ISR Revalidation for Varieties Page
      await fetch("/api/revalidate?path=/varieties");
      await fetch("/api/revalidate?path=/");

      handleAddNew();
      fetchVarieties();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this variety?")) return;

    setMessage(null);
    try {
      const { error } = await supabase.from("varieties").delete().eq("id", id);
      if (error) throw error;

      setMessage({ type: "success", text: "Variety deleted successfully." });
      
      // Trigger On-Demand ISR Revalidation
      await fetch("/api/revalidate?path=/varieties");
      await fetch("/api/revalidate?path=/");

      if (selectedId === id) {
        handleAddNew();
      }
      fetchVarieties();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to delete: ${err.message}` });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Varieties Content Manager</h1>
          <p>Create, edit, or delete microgreen variety cards shown on the website.</p>
        </div>
        <button className="btn btn-gold btn-sm" onClick={handleAddNew}>
          + Add New Variety
        </button>
      </div>

      {message && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-editor-grid">
        {/* Left Side: Varieties List */}
        <div className="admin-card">
          <h2 className="admin-card-title">All Varieties</h2>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <span className="admin-spinner" />
            </div>
          ) : varieties.length === 0 ? (
            <p className="admin-muted" style={{ textAlign: "center" }}>No varieties configured. Add your first variety!</p>
          ) : (
            <div className="admin-list">
              {varieties.map((v) => (
                <div
                  key={v.id}
                  className={`admin-list-item ${selectedId === v.id ? "active" : ""}`}
                  onClick={() => handleSelect(v)}
                >
                  <div>
                    <div className="admin-list-item-name">{v.name}</div>
                    <div className="admin-list-item-meta">{v.tag} • Order: {v.sort_order}</div>
                  </div>
                  <button
                    className="admin-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(v.id!);
                    }}
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Form */}
        <div className="admin-card">
          <h2 className="admin-card-title">
            {selectedId ? `Edit: ${formData.name}` : "New Variety"}
          </h2>
          <form onSubmit={handleSave} className="admin-form">
            <div className="field">
              <label>Variety Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Broccoli Microgreens"
                required
              />
            </div>

            <div className="field">
              <label>Slug (URL Identifier)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g. broccoli"
                required
              />
            </div>

            <div className="field">
              <label>Tag (e.g. Category/Pill)</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
                placeholder="e.g. Microgreen"
              />
            </div>

            <div className="field">
              <label>Tag Pill Label (Health Benefit Highlight)</label>
              <input
                type="text"
                value={formData.tag_pill}
                onChange={(e) => setFormData((prev) => ({ ...prev, tag_pill: e.target.value }))}
                placeholder="e.g. Sulforaphane-rich"
              />
            </div>

            <div className="field">
              <label>Highlight Statement (Italic text)</label>
              <textarea
                value={formData.highlight}
                onChange={(e) => setFormData((prev) => ({ ...prev, highlight: e.target.value }))}
                placeholder="e.g. Peppery crunch, packed with glucosinolates."
                rows={2}
              />
            </div>

            <div className="field">
              <label>Full Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Nutritional benefits and profile details..."
                rows={4}
                required
              />
            </div>

            <div className="field">
              <label>Best In (Culinary Recommendation)</label>
              <input
                type="text"
                value={formData.best_in}
                onChange={(e) => setFormData((prev) => ({ ...prev, best_in: e.target.value }))}
                placeholder="e.g. Salads, grain bowls, sandwiches, smoothies."
              />
            </div>

            <div className="field">
              <label>Card Image</label>
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

            <div className="field checkbox" style={{ display: "flex", alignItems: "center", gap: "8px", margin: "16px 0" }}>
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
              />
              <label htmlFor="is_featured" style={{ margin: 0, fontWeight: "normal" }}>Featured on Home Page Carousel</label>
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
                {saveLoading ? <><span className="admin-spinner" /> Saving...</> : "Save Variety"}
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
