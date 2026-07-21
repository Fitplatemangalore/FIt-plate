"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface UsesSlide {
  id?: string;
  title: string;
  description: string;
  main_image_url: string;
  sort_order: number;
}

export default function AdminUsesSlides() {
  const [slides, setSlides] = useState<UsesSlide[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<UsesSlide>({
    title: "",
    description: "",
    main_image_url: "",
    sort_order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("uses_slides")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      setMessage({ type: "error", text: `Error loading slides: ${error.message}` });
    } else {
      setSlides(data || []);
    }
    setLoading(false);
  };

  const handleSelect = (slide: UsesSlide) => {
    setSelectedId(slide.id || null);
    setFormData({
      title: slide.title,
      description: slide.description || "",
      main_image_url: slide.main_image_url || "",
      sort_order: slide.sort_order || 0,
    });
  };

  const handleAddNew = () => {
    if (slides.length >= 5) {
      setMessage({ type: "error", text: "Maximum of 5 slides allowed for the Uses section." });
      return;
    }
    setSelectedId(null);
    setFormData({
      title: "",
      description: "",
      main_image_url: "",
      sort_order: slides.length,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    setMessage(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `uses/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("fitplate-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("fitplate-assets")
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, main_image_url: publicUrl }));
      setMessage({ type: "success", text: "Main image uploaded successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: `Image upload failed: ${err.message}` });
    } finally {
      setUploadingMain(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setMessage(null);

    try {
      let error;

      if (selectedId) {
        const { error: err } = await supabase
          .from("uses_slides")
          .update({
            title: formData.title,
            description: formData.description,
            main_image_url: formData.main_image_url,
            sort_order: formData.sort_order,
          })
          .eq("id", selectedId);
        error = err;
      } else {
        if (slides.length >= 5) {
          throw new Error("Maximum of 5 slides allowed for the Uses section.");
        }
        const { error: err } = await supabase
          .from("uses_slides")
          .insert([{
            title: formData.title,
            description: formData.description,
            main_image_url: formData.main_image_url,
            sort_order: formData.sort_order,
          }]);
        error = err;
      }

      if (error) throw error;

      setMessage({ type: "success", text: "Uses slide saved successfully!" });
      
      // Trigger On-Demand ISR Revalidation
      await fetch("/api/revalidate?path=/");

      handleAddNew();
      fetchSlides();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    setMessage(null);
    try {
      const { error } = await supabase.from("uses_slides").delete().eq("id", id);
      if (error) throw error;

      setMessage({ type: "success", text: "Slide deleted successfully." });
      
      // Trigger On-Demand ISR Revalidation
      await fetch("/api/revalidate?path=/");

      if (selectedId === id) {
        handleAddNew();
      }
      fetchSlides();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to delete: ${err.message}` });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Uses Slides Content Manager</h1>
          <p>Manage up to 5 slides for the "Uses of Microgreens" section on the home page.</p>
        </div>
        <button
          className="btn btn-gold btn-sm"
          onClick={handleAddNew}
          disabled={slides.length >= 5 && !selectedId}
        >
          {slides.length >= 5 ? "Max 5 Slides Reached" : "+ Add New Slide"}
        </button>
      </div>

      {message && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-editor-grid">
        {/* Left Side: Slides List */}
        <div className="admin-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 className="admin-card-title" style={{ margin: 0 }}>All Slides</h2>
            <span className="admin-tag">{slides.length}/5 configured</span>
          </div>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <span className="admin-spinner" />
            </div>
          ) : slides.length === 0 ? (
            <p className="admin-muted" style={{ textAlign: "center" }}>No slides configured. Add your first slide!</p>
          ) : (
            <div className="admin-list">
              {slides.map((s) => (
                <div
                  key={s.id}
                  className={`admin-list-item ${selectedId === s.id ? "active" : ""}`}
                  onClick={() => handleSelect(s)}
                >
                  <div>
                    <div className="admin-list-item-name">{s.title}</div>
                    <div className="admin-list-item-meta">Order: {s.sort_order}</div>
                  </div>
                  <button
                    className="admin-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(s.id!);
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
            {selectedId ? `Edit: ${formData.title}` : "New Slide"}
          </h2>
          <form onSubmit={handleSave} className="admin-form">
            <div className="field">
              <label>Slide Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Add to Salads"
                required
              />
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe how microgreens are used..."
                rows={3}
                required
              />
            </div>

            <div className="field">
              <label>Main Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingMain}
              />
              {uploadingMain && <p className="admin-muted" style={{ fontSize: "12px", marginTop: "4px" }}>Uploading image...</p>}
              <input
                type="text"
                value={formData.main_image_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, main_image_url: e.target.value }))}
                placeholder="Or paste main image URL"
                style={{ marginTop: "8px" }}
                required
              />
              <p className="admin-muted" style={{ fontSize: "12px", marginTop: "6px", color: "var(--forest-700)" }}>
                ✨ Note: The small top-right corner preview image will automatically pull from the next slide's main image. No separate corner image upload required!
              </p>
              {formData.main_image_url && (
                <img
                  src={formData.main_image_url}
                  alt="Main Preview"
                  className="admin-image-preview"
                />
              )}
            </div>

            <div className="field" style={{ marginTop: "16px" }}>
              <label>Sort Order</label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                required
              />
            </div>

            <div className="admin-btn-row">
              <button type="submit" className="btn btn-gold btn-sm" disabled={saveLoading || uploadingMain}>
                {saveLoading ? <><span className="admin-spinner" /> Saving...</> : "Save Uses Slide"}
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
