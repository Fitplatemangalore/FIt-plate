"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { CropIcon } from "@/components/CropHexagonCard";

interface LeafyVegetable {
  id?: string;
  name: string;
  slug: string;
  tag_pill: string;
  tag_color: string;
  subtitle: string;
  description: string;
  best_in: string;
  image_url: string;
  sort_order: number;
}

const emptyForm = (sortOrder = 0): LeafyVegetable => ({
  name: "",
  slug: "",
  tag_pill: "",
  tag_color: "green",
  subtitle: "",
  description: "",
  best_in: "",
  image_url: "",
  sort_order: sortOrder,
});

export default function AdminLeafyVegetables() {
  const [items, setItems] = useState<LeafyVegetable[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<LeafyVegetable>(emptyForm());
  const [modalOpen, setModalOpen] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leafy_vegetables")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      setMessage({ type: "error", text: `Error loading items: ${error.message}` });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const openAddModal = () => {
    setSelectedId(null);
    setFormData(emptyForm(items.length));
    setMessage(null);
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setSelectedId(item.id || null);
    setFormData({
      name: item.name,
      slug: item.slug,
      tag_pill: item.tag_pill || "",
      tag_color: item.tag_color || "green",
      subtitle: item.subtitle || item.highlight || "",
      description: item.description || "",
      best_in: item.best_in || "",
      image_url: item.image_url || "",
      sort_order: item.sort_order ?? 0,
    });
    setMessage(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedId(null);
    setFormData(emptyForm());
    setMessage(null);
  };
  
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const ext = file.name.split(".").pop();
      const filePath = `leafy_vegetables/img_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("fitplate-assets").upload(filePath, file);
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage.from("fitplate-assets").getPublicUrl(filePath);
      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
    } catch (err: any) {
      setMessage({ type: "error", text: `Image upload failed: ${err.message}` });
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { setMessage({ type: "error", text: "Name is required." }); return; }
    
    // Auto-generate slug if missing
    const slug = formData.slug.trim() || formData.name.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]/g, "");
    
    setSaveLoading(true);
    setMessage(null);
    try {
      const payload = { ...formData, slug };
      let error;
      if (selectedId) {
        ({ error } = await supabase.from("leafy_vegetables").update(payload).eq("id", selectedId));
      } else {
        ({ error } = await supabase.from("leafy_vegetables").insert([payload]));
      }
      if (error) throw error;
      await fetch("/api/revalidate?path=/leafy-vegetables");
      closeModal();
      fetchItems();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const { error } = await supabase.from("leafy_vegetables").delete().eq("id", id);
      if (error) throw error;
      await fetch("/api/revalidate?path=/leafy-vegetables");
      fetchItems();
    } catch (err: any) {
      setMessage({ type: "error", text: `Delete failed: ${err.message}` });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Leafy Vegetables</h1>
          <p className="admin-page-subtitle">Manage the banner and variety cards for the Leafy Vegetables page.</p>
        </div>
      </div>



      <div className="admin-page-header" style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "20px" }}>Variety Cards</h2>
        <button className="admin-btn-primary" onClick={openAddModal}>+ Add Card</button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>Loading cards…</div>
      ) : items.length === 0 ? (
        <div className="crops-empty-state">
          <div className="crops-empty-icon">🌱</div>
          <h3 className="crops-empty-title">No Cards Yet</h3>
          <button className="admin-btn-primary" onClick={openAddModal}>+ Add Your First Card</button>
        </div>
      ) : (
        <div className="crops-card-grid">
          {items.map((item) => (
            <div key={item.id} className="crops-card">
              <div className="crops-card-img-wrap">
                {item.image_url ? <img src={item.image_url} alt={item.name} className="crops-card-img" /> : <div className="crops-card-img-placeholder" />}
                <span className="crops-card-order">#{item.sort_order + 1}</span>
              </div>
              <div className="crops-card-body">
                <div className="crops-card-info" style={{ paddingLeft: "10px" }}>
                  <p className="crops-card-name">{item.name}</p>
                  <p className="crops-card-subtitle">{item.subtitle}</p>
                </div>
              </div>
              <div className="crops-card-actions">
                <button className="admin-btn-secondary crops-action-btn" onClick={() => openEditModal(item)}>✏️ Edit</button>
                <button className="admin-btn-danger-sm crops-action-btn" onClick={() => handleDelete(item.id!, item.name)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="crops-modal-overlay" onClick={closeModal}>
          <div className="crops-modal" onClick={(e) => e.stopPropagation()}>
            <div className="crops-modal-header">
              <h2 className="crops-modal-title">{selectedId ? "Edit Card" : "Add New Card"}</h2>
              <button className="crops-modal-close" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            {message && (
              <div className={`admin-message admin-message-${message.type}`} style={{ margin: "16px 28px 0" }}>{message.text}</div>
            )}

            <div className="crops-modal-body">
              <form className="crops-modal-form" onSubmit={handleSave}>
                <div className="crops-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-label">Title *</label>
                    <input className="admin-input" type="text" placeholder="e.g. Broccoli Microgreens" value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Slug (URL snippet)</label>
                    <input className="admin-input" type="text" placeholder="e.g. broccoli" value={formData.slug}
                      onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Tag Text</label>
                    <input className="admin-input" type="text" placeholder="e.g. Sulforaphane-rich" value={formData.tag_pill}
                      onChange={(e) => setFormData((p) => ({ ...p, tag_pill: e.target.value }))} />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Theme Color</label>
                    <select className="admin-input" value={formData.tag_color} onChange={(e) => setFormData((p) => ({ ...p, tag_color: e.target.value }))}>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                      <option value="blue">Blue</option>
                    </select>
                  </div>
                  <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
                    <label className="admin-label">Subtitle (Italic text)</label>
                    <input className="admin-input" type="text" placeholder="e.g. Peppery crunch, packed with glucosinolates." value={formData.subtitle}
                      onChange={(e) => setFormData((p) => ({ ...p, subtitle: e.target.value }))} />
                  </div>
                  <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
                    <label className="admin-label">Description</label>
                    <textarea className="admin-input" rows={3} value={formData.description}
                      onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))} />
                  </div>
                  <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
                    <label className="admin-label">Best in (bold label)</label>
                    <input className="admin-input" type="text" placeholder="e.g. Salads, grain bowls, sandwiches..." value={formData.best_in}
                      onChange={(e) => setFormData((p) => ({ ...p, best_in: e.target.value }))} />
                  </div>
                  <div className="admin-form-group" style={{ gridColumn: "span 2" }}>
                    <label className="admin-label">Photo *</label>
                    <div className="admin-upload-row">
                      {formData.image_url && <img src={formData.image_url} alt="preview" className="admin-img-preview" />}
                      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
                        <label className="admin-file-label">
                          <input ref={imageInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleUploadImage} />
                          {uploadingImage ? "Uploading…" : "↑ Upload Photo"}
                        </label>
                        {formData.image_url && (
                          <button type="button" className="admin-btn-danger-sm" onClick={() => setFormData((p) => ({ ...p, image_url: "" }))}>Remove</button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Sort Order</label>
                    <input className="admin-input" type="number" min={0} value={formData.sort_order}
                      onChange={(e) => setFormData((p) => ({ ...p, sort_order: Number(e.target.value) }))} />
                  </div>
                </div>

                <div className="admin-form-actions">
                  <button type="button" className="admin-btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="admin-btn-primary" disabled={saveLoading}>
                    {saveLoading ? "Saving…" : selectedId ? "Update Card" : "Add Card"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .crops-card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; padding: 4px 0 32px; }
        .crops-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 12px rgba(17,46,129,0.07); overflow: hidden; display: flex; flex-direction: column; border: 1px solid #e8edf5; transition: box-shadow 0.2s, transform 0.2s; }
        .crops-card:hover { box-shadow: 0 6px 24px rgba(17,46,129,0.13); transform: translateY(-2px); }
        .crops-card-img-wrap { position: relative; height: 140px; background: #f1f5fb; }
        .crops-card-img { width: 100%; height: 100%; object-fit: cover; }
        .crops-card-img-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, #e8edf5 0%, #f1f5fb 100%); }
        .crops-card-order { position: absolute; top: 8px; right: 8px; background: rgba(17,46,129,0.75); color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
        .crops-card-body { display: flex; align-items: center; gap: 10px; padding: 12px 14px 6px; }
        .crops-card-info { flex: 1; min-width: 0; }
        .crops-card-name { font-weight: 800; font-size: 13px; color: #112E81; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .crops-card-subtitle { font-size: 11px; color: #64748b; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .crops-card-actions { display: flex; gap: 8px; padding: 10px 14px 14px; border-top: 1px solid #f1f5fb; margin-top: auto; }
        .crops-action-btn { flex: 1; justify-content: center; font-size: 12px; }
        .crops-empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 24px; text-align: center; background: #fff; border-radius: 16px; border: 2px dashed #e2e8f0; margin-top: 8px; }
        .crops-empty-icon { font-size: 56px; margin-bottom: 16px; }
        .crops-empty-title { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
        .crops-modal-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(15,23,42,0.55); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 20px; }
        .crops-modal { background: #fff; border-radius: 20px; width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 80px rgba(15,23,42,0.25); display: flex; flex-direction: column; }
        .crops-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 22px 28px 18px; border-bottom: 1px solid #f1f5fb; position: sticky; top: 0; background: #fff; z-index: 1; border-radius: 20px 20px 0 0; }
        .crops-modal-title { font-size: 20px; font-weight: 800; color: #112E81; }
        .crops-modal-close { background: #f1f5fb; border: none; border-radius: 50%; width: 34px; height: 34px; font-size: 16px; cursor: pointer; color: #64748b; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
        .crops-modal-close:hover { background: #e2e8f0; color: #1e293b; }
        .crops-modal-body { display: flex; gap: 28px; padding: 24px 28px 28px; }
        .crops-modal-form { flex: 1; min-width: 0; }
        .crops-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
        @media (max-width: 700px) { .crops-modal-body { flex-direction: column; } .crops-form-grid { grid-template-columns: 1fr; } }
        
        /* Shared form styles */
        .admin-form-group { margin-bottom: 20px; }
        .admin-label { display: block; font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 8px; }
        .admin-input { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; font-family: inherit; transition: border-color 0.2s; }
        .admin-input:focus { outline: none; border-color: #112E81; }
        
        .admin-upload-row { display: flex; gap: 16px; align-items: flex-start; margin-top: 8px; }
        .admin-img-preview { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; flex-shrink: 0; border: 1px solid #cbd5e1; }
        
        .admin-btn-primary { background: #112E81; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; font-size: 14px; }
        .admin-btn-primary:hover { background: #0c205c; }
        .admin-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .admin-btn-secondary { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; font-size: 13px; }
        .admin-btn-secondary:hover { background: #e2e8f0; }

        .admin-btn-danger-sm { cursor: pointer; border: none; background: #fee2e2; color: #dc2626; padding: 8px 16px; border-radius: 8px; font-weight: 600; transition: background 0.15s; font-size: 13px; }
        .admin-btn-danger-sm:hover { background: #fecaca; }

        .admin-file-label { background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; font-size: 13px; }
        .admin-file-label:hover { background: #e2e8f0; }
        
        .admin-form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
      `}</style>
    </div>
  );
}
