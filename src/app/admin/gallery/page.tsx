"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

interface GalleryImage {
  id?: string;
  image_url: string;
  sort_order: number;
  file?: File; // transient, not saved to DB
  uploading?: boolean;
}

interface GalleryEntry {
  id?: string;
  title: string;
  description: string;
  event_date: string;
  created_at?: string;
  gallery_images?: GalleryImage[];
}

const emptyForm = (): GalleryEntry => ({
  title: "",
  description: "",
  event_date: new Date().toISOString().split("T")[0],
});

export default function AdminGallery() {
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<GalleryEntry>(emptyForm());
  const [images, setImages] = useState<GalleryImage[]>([]); // images for current entry
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => { fetchEntries(); }, []);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_entries")
      .select("*, gallery_images(id, image_url, sort_order)")
      .order("event_date", { ascending: false });
    if (error) {
      setMessage({ type: "error", text: `Failed to load entries: ${error.message}` });
    } else {
      setEntries((data as GalleryEntry[]) || []);
    }
    setLoading(false);
  };

  const handleAddNew = () => {
    setSelectedId(null);
    setFormData(emptyForm());
    setImages([]);
    setMessage(null);
  };

  const handleSelect = (entry: GalleryEntry) => {
    setSelectedId(entry.id || null);
    setFormData({
      title: entry.title || "",
      description: entry.description || "",
      event_date: entry.event_date?.split("T")[0] || new Date().toISOString().split("T")[0],
    });
    const imgs = [...(entry.gallery_images || [])].sort((a, b) => a.sort_order - b.sort_order);
    setImages(imgs);
    setMessage(null);
  };

  const handleFileAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const available = 5 - images.length;
    if (available <= 0) {
      setMessage({ type: "error", text: "Maximum 5 photos per entry reached." });
      return;
    }
    const toUpload = files.slice(0, available);

    // Add placeholders
    const placeholders: GalleryImage[] = toUpload.map((f, i) => ({
      image_url: URL.createObjectURL(f),
      sort_order: images.length + i,
      uploading: true,
    }));
    setImages((prev) => [...prev, ...placeholders]);

    // Upload each
    const uploaded: GalleryImage[] = [];
    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("fitplate-assets")
        .upload(filePath, file);

      if (uploadError) {
        setMessage({ type: "error", text: `Upload failed: ${uploadError.message}` });
        // Remove placeholder
        setImages((prev) => prev.filter((img) => img.uploading !== true));
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("fitplate-assets")
        .getPublicUrl(filePath);

      uploaded.push({ image_url: publicUrl, sort_order: images.length + i });
    }

    // Replace placeholders with final URLs
    setImages((prev) => {
      const nonUploading = prev.filter((img) => !img.uploading);
      return [...nonUploading, ...uploaded];
    });

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.map((img, i) => ({ ...img, sort_order: i }));
    });
  };

  const handleMoveImage = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= images.length) return;
    setImages((prev) => {
      const arr = [...prev];
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return arr.map((img, i) => ({ ...img, sort_order: i }));
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setMessage({ type: "error", text: "Title is required." });
      return;
    }
    setSaveLoading(true);
    setMessage(null);

    try {
      let entryId = selectedId;

      if (selectedId) {
        // Update entry
        const { error } = await supabase
          .from("gallery_entries")
          .update({
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            event_date: formData.event_date || null,
          })
          .eq("id", selectedId);
        if (error) throw error;
      } else {
        // Insert entry
        const { data, error } = await supabase
          .from("gallery_entries")
          .insert([{
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            event_date: formData.event_date || null,
          }])
          .select()
          .single();
        if (error) throw error;
        entryId = data.id;
        setSelectedId(entryId);
      }

      // Sync images: delete existing, re-insert current list
      await supabase.from("gallery_images").delete().eq("entry_id", entryId);
      if (images.length > 0) {
        const imageRows = images
          .filter((img) => img.image_url && !img.uploading)
          .map((img, i) => ({
            entry_id: entryId,
            image_url: img.image_url,
            sort_order: i,
          }));
        if (imageRows.length > 0) {
          const { error: imgError } = await supabase.from("gallery_images").insert(imageRows);
          if (imgError) throw imgError;
        }
      }

      setMessage({ type: "success", text: "Gallery entry saved successfully!" });
      await fetch("/api/revalidate?path=/gallery");
      fetchEntries();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?\n\nThis will permanently remove the entry and all its photos.`)) return;
    setMessage(null);
    try {
      // Delete images first (cascade may not be set up)
      await supabase.from("gallery_images").delete().eq("entry_id", id);
      const { error } = await supabase.from("gallery_entries").delete().eq("id", id);
      if (error) throw error;
      setMessage({ type: "success", text: "Gallery entry deleted." });
      if (selectedId === id) handleAddNew();
      await fetch("/api/revalidate?path=/gallery");
      fetchEntries();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to delete: ${err.message}` });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Gallery Manager</h1>
          <p>Create and manage photo gallery entries for events, harvests, and moments.</p>
        </div>
        <button className="btn btn-gold btn-sm" onClick={handleAddNew}>
          + Add New Entry
        </button>
      </div>

      {message && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-editor-grid">
        {/* Left: Entry List */}
        <div className="admin-card">
          <h2 className="admin-card-title">All Entries</h2>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}><span className="admin-spinner" /></div>
          ) : entries.length === 0 ? (
            <p className="admin-muted" style={{ textAlign: "center" }}>No gallery entries yet. Create your first!</p>
          ) : (
            <div className="admin-list">
              {entries.map((entry) => {
                const imgs = entry.gallery_images || [];
                const thumb = imgs.sort((a, b) => a.sort_order - b.sort_order)[0];
                return (
                  <div
                    key={entry.id}
                    className={`admin-list-item ${selectedId === entry.id ? "active" : ""}`}
                    onClick={() => handleSelect(entry)}
                  >
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", minWidth: 0 }}>
                      {thumb ? (
                        <img
                          src={thumb.image_url}
                          alt=""
                          style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6, flexShrink: 0 }}
                        />
                      ) : (
                        <div style={{ width: 44, height: 44, borderRadius: 6, background: "var(--cream-100)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                        </div>
                      )}
                      <div style={{ minWidth: 0 }}>
                        <div className="admin-list-item-name">{entry.title}</div>
                        <div className="admin-list-item-meta">
                          {entry.event_date ? new Date(entry.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "No date"} • {imgs.length} photo{imgs.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                    <button
                      className="admin-icon-btn"
                      onClick={(e) => { e.stopPropagation(); handleDelete(entry.id!, entry.title); }}
                      title="Delete"
                      style={{ color: "#dc2626", flexShrink: 0 }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Edit Form */}
        <div className="admin-card">
          <h2 className="admin-card-title">{selectedId ? "Edit Entry" : "New Entry"}</h2>
          <form onSubmit={handleSave}>
            <div className="admin-form-field">
              <label className="admin-label">Title *</label>
              <input
                className="admin-input"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Harvest Day 2024"
                required
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-label">Event Date</label>
              <input
                className="admin-input"
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, event_date: e.target.value }))}
              />
            </div>

            <div className="admin-form-field">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this event or moment..."
                rows={3}
              />
            </div>

            {/* Photos */}
            <div className="admin-form-field">
              <label className="admin-label">
                Photos{" "}
                <span style={{ fontSize: "12px", fontWeight: 400, color: "var(--ink-500)" }}>
                  ({images.length}/5 — up to 5 photos)
                </span>
              </label>

              {/* Uploaded images grid */}
              {images.length > 0 && (
                <div className="gallery-admin-img-grid">
                  {images.map((img, i) => (
                    <div key={i} className="gallery-admin-img-item">
                      {img.uploading ? (
                        <div className="gallery-admin-img-uploading">
                          <span className="admin-spinner" />
                        </div>
                      ) : (
                        <img src={img.image_url} alt={`Photo ${i + 1}`} />
                      )}
                      {!img.uploading && (
                        <div className="gallery-admin-img-actions">
                          <button type="button" onClick={() => handleMoveImage(i, -1)} disabled={i === 0} title="Move left">‹</button>
                          <button type="button" onClick={() => handleRemoveImage(i)} title="Remove" style={{ color: "#dc2626" }}>✕</button>
                          <button type="button" onClick={() => handleMoveImage(i, 1)} disabled={i === images.length - 1} title="Move right">›</button>
                        </div>
                      )}
                      <div className="gallery-admin-img-num">{i + 1}</div>
                    </div>
                  ))}
                </div>
              )}

              {images.length < 5 && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileAdd}
                    id="gallery-upload"
                  />
                  <label
                    htmlFor="gallery-upload"
                    className="gallery-admin-upload-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    Upload Photos ({5 - images.length} remaining)
                  </label>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button type="submit" className="btn btn-gold" disabled={saveLoading} style={{ flex: 1 }}>
                {saveLoading ? "Saving..." : selectedId ? "Save Changes" : "Create Entry"}
              </button>
              {selectedId && (
                <button type="button" className="btn btn-outline btn-sm" onClick={handleAddNew}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
