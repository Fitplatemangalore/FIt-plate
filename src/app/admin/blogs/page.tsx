"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Blog {
  id?: string;
  title: string;
  slug: string;
  image_url: string;
  category: string;
  read_time: string;
  published_date: string;
  excerpt: string;
  content: string;
  sort_order: number;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Blog>({
    title: "",
    slug: "",
    image_url: "",
    category: "",
    read_time: "",
    published_date: new Date().toISOString().split("T")[0],
    excerpt: "",
    content: "",
    sort_order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      setMessage({ type: "error", text: `Error loading blogs: ${error.message}` });
    } else {
      setBlogs(data || []);
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

  const handleSelect = (blog: Blog) => {
    setSelectedId(blog.id || null);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      image_url: blog.image_url || "",
      category: blog.category || "",
      read_time: blog.read_time || "",
      published_date: blog.published_date || new Date().toISOString().split("T")[0],
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      sort_order: blog.sort_order || 0,
    });
  };

  const handleAddNew = () => {
    setSelectedId(null);
    setFormData({
      title: "",
      slug: "",
      image_url: "",
      category: "",
      read_time: "",
      published_date: new Date().toISOString().split("T")[0],
      excerpt: "",
      content: "",
      sort_order: blogs.length,
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
      const filePath = `blogs/${fileName}`;

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
      let error;

      if (selectedId) {
        const { error: err } = await supabase
          .from("blogs")
          .update(formData)
          .eq("id", selectedId);
        error = err;
      } else {
        const { error: err } = await supabase
          .from("blogs")
          .insert([formData]);
        error = err;
      }

      if (error) throw error;

      setMessage({ type: "success", text: "Blog post saved successfully!" });
      
      // Trigger On-Demand ISR Revalidation
      await fetch("/api/revalidate?path=/blogs");
      await fetch("/api/revalidate?path=/");

      handleAddNew();
      fetchBlogs();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    setMessage(null);
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;

      setMessage({ type: "success", text: "Blog post deleted successfully." });
      
      // Trigger On-Demand ISR Revalidation
      await fetch("/api/revalidate?path=/blogs");
      await fetch("/api/revalidate?path=/");

      if (selectedId === id) {
        handleAddNew();
      }
      fetchBlogs();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to delete: ${err.message}` });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Blogs Content Manager</h1>
          <p>Create, edit, or delete articles and updates for the Fit Plate journal.</p>
        </div>
        <button className="btn btn-gold btn-sm" onClick={handleAddNew}>
          + Add New Post
        </button>
      </div>

      {message && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-editor-grid">
        {/* Left Side: Blogs List */}
        <div className="admin-card">
          <h2 className="admin-card-title">All Posts</h2>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <span className="admin-spinner" />
            </div>
          ) : blogs.length === 0 ? (
            <p className="admin-muted" style={{ textAlign: "center" }}>No blog posts configured. Create your first post!</p>
          ) : (
            <div className="admin-list">
              {blogs.map((b) => (
                <div
                  key={b.id}
                  className={`admin-list-item ${selectedId === b.id ? "active" : ""}`}
                  onClick={() => handleSelect(b)}
                >
                  <div>
                    <div className="admin-list-item-name">{b.title}</div>
                    <div className="admin-list-item-meta">{b.category} • {b.read_time}</div>
                  </div>
                  <button
                    className="admin-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(b.id!);
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
            {selectedId ? `Edit: ${formData.title}` : "New Post"}
          </h2>
          <form onSubmit={handleSave} className="admin-form">
            <div className="field">
              <label>Post Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. A Short History of Microgreens"
                required
              />
            </div>

            <div className="field">
              <label>Slug (URL path)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="e.g. short-history-of-microgreens"
                required
              />
            </div>

            <div className="field">
              <label>Category (e.g. Origins, Nutrition, For Business)</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="e.g. Nutrition"
                required
              />
            </div>

            <div className="field">
              <label>Read Time</label>
              <input
                type="text"
                value={formData.read_time}
                onChange={(e) => setFormData((prev) => ({ ...prev, read_time: e.target.value }))}
                placeholder="e.g. 4 min read"
                required
              />
            </div>

            <div className="field">
              <label>Published Date</label>
              <input
                type="date"
                value={formData.published_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, published_date: e.target.value }))}
                required
              />
            </div>

            <div className="field">
              <label>Excerpt / Summary</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief summary of the article shown in listings..."
                rows={3}
                required
              />
            </div>

            <div className="field">
              <label>Full Content (Markdown or HTML support)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Full article content body..."
                rows={10}
                required
              />
            </div>

            <div className="field">
              <label>Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <p className="admin-muted" style={{ fontSize: "12px", marginTop: "4px" }}>Uploading cover image...</p>}
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                placeholder="Or paste cover image URL"
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
                {saveLoading ? <><span className="admin-spinner" /> Saving...</> : "Save Blog Post"}
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
