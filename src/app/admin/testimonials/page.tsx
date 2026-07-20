"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Testimonial {
  id?: string;
  name: string;
  role: string;
  quote: string;
  stars: number;
  link: string;
  sort_order: number;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Testimonial>({
    name: "",
    role: "",
    quote: "",
    stars: 5,
    link: "",
    sort_order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      setMessage({ type: "error", text: `Error loading testimonials: ${error.message}` });
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const handleSelect = (testimonial: Testimonial) => {
    setSelectedId(testimonial.id || null);
    setFormData({
      name: testimonial.name,
      role: testimonial.role || "",
      quote: testimonial.quote || "",
      stars: testimonial.stars || 5,
      link: testimonial.link || "",
      sort_order: testimonial.sort_order || 0,
    });
  };

  const handleAddNew = () => {
    setSelectedId(null);
    setFormData({
      name: "",
      role: "",
      quote: "",
      stars: 5,
      link: "",
      sort_order: testimonials.length,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setMessage(null);

    try {
      let error;

      if (selectedId) {
        const { error: err } = await supabase
          .from("testimonials")
          .update(formData)
          .eq("id", selectedId);
        error = err;
      } else {
        const { error: err } = await supabase
          .from("testimonials")
          .insert([formData]);
        error = err;
      }

      if (error) throw error;

      setMessage({ type: "success", text: "Testimonial saved successfully!" });
      
      // Trigger On-Demand ISR Revalidation
      await fetch("/api/revalidate?path=/");

      handleAddNew();
      fetchTestimonials();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    setMessage(null);
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;

      setMessage({ type: "success", text: "Testimonial deleted successfully." });
      
      // Trigger On-Demand ISR Revalidation
      await fetch("/api/revalidate?path=/");

      if (selectedId === id) {
        handleAddNew();
      }
      fetchTestimonials();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to delete: ${err.message}` });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Testimonials Content Manager</h1>
          <p>Create, edit, or delete customer testimonials shown on the landing page.</p>
        </div>
        <button className="btn btn-gold btn-sm" onClick={handleAddNew}>
          + Add New Testimonial
        </button>
      </div>

      {message && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-editor-grid">
        {/* Left Side: Testimonials List */}
        <div className="admin-card">
          <h2 className="admin-card-title">All Testimonials</h2>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <span className="admin-spinner" />
            </div>
          ) : testimonials.length === 0 ? (
            <p className="admin-muted" style={{ textAlign: "center" }}>No testimonials configured. Add your first testimonial!</p>
          ) : (
            <div className="admin-list">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className={`admin-list-item ${selectedId === t.id ? "active" : ""}`}
                  onClick={() => handleSelect(t)}
                >
                  <div>
                    <div className="admin-list-item-name">{t.name}</div>
                    <div className="admin-list-item-meta">{t.role} • {t.stars} stars</div>
                  </div>
                  <button
                    className="admin-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(t.id!);
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
            {selectedId ? `Edit: ${formData.name}` : "New Testimonial"}
          </h2>
          <form onSubmit={handleSave} className="admin-form">
            <div className="field">
              <label>Customer Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Rohini Shenoy"
                required
              />
            </div>

            <div className="field">
              <label>Role / Subtitle</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                placeholder="e.g. Cafe Partner, Mangalore"
                required
              />
            </div>

            <div className="field">
              <label>Quote Content</label>
              <textarea
                value={formData.quote}
                onChange={(e) => setFormData((prev) => ({ ...prev, quote: e.target.value }))}
                placeholder="Write customer review quote..."
                rows={4}
                required
              />
            </div>

            <div className="field">
              <label>Stars (Rating 1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.stars}
                onChange={(e) => setFormData((prev) => ({ ...prev, stars: parseInt(e.target.value) || 5 }))}
                required
              />
            </div>

            <div className="field">
              <label>Optional Review Link</label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
                placeholder="Link to Google Business review or profile"
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
              <button type="submit" className="btn btn-gold btn-sm" disabled={saveLoading}>
                {saveLoading ? <><span className="admin-spinner" /> Saving...</> : "Save Testimonial"}
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
