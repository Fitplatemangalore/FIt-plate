"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { CropIcon } from "@/components/CropHexagonCard";

interface Crop {
  id?: string;
  name: string;
  subtitle: string;
  image_url: string;
  icon: string;
  icon_url?: string;
  link: string;
  sort_order: number;
}

const PRESET_ICONS = [
  { key: "leaf", label: "Leafy Greens" },
  { key: "herbs", label: "Herbs" },
  { key: "flower", label: "Edible Flowers" },
  { key: "microgreens", label: "Microgreens" },
  { key: "fruits", label: "Fruits" },
  { key: "saffron", label: "Saffron" },
];

const emptyForm = (sortOrder = 0): Crop => ({
  name: "",
  subtitle: "Fresh Greens. Grow Closer.",
  image_url: "",
  icon: "leaf",
  icon_url: "",
  link: "/varieties",
  sort_order: sortOrder,
});

export default function AdminCrops() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Crop>(emptyForm());
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingIcon, setUploadingIcon] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("crops")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      setMessage({ type: "error", text: `Error loading crops: ${error.message}` });
    } else {
      setCrops(data || []);
    }
    setLoading(false);
  };

  const handleSelect = (crop: Crop) => {
    setSelectedId(crop.id || null);
    setFormData({
      name: crop.name,
      subtitle: crop.subtitle || "",
      image_url: crop.image_url || "",
      icon: crop.icon || "leaf",
      icon_url: crop.icon_url || "",
      link: crop.link || "/varieties",
      sort_order: crop.sort_order ?? 0,
    });
    setMessage(null);
  };

  const handleAddNew = () => {
    setSelectedId(null);
    setFormData(emptyForm(crops.length));
    setMessage(null);
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setMessage(null);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${ext}`;
      const filePath = `crops/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("fitplate-assets")
        .upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from("fitplate-assets")
        .getPublicUrl(filePath);
      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
      setMessage({ type: "success", text: "Image uploaded!" });
    } catch (err: any) {
      setMessage({ type: "error", text: `Image upload failed: ${err.message}` });
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const handleUploadIcon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIcon(true);
    setMessage(null);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `icon_${Math.random().toString(36).substring(2)}_${Date.now()}.${ext}`;
      const filePath = `crops/icons/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("fitplate-assets")
        .upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage
        .from("fitplate-assets")
        .getPublicUrl(filePath);
      setFormData((prev) => ({ ...prev, icon_url: publicUrl }));
      setMessage({ type: "success", text: "Custom icon uploaded!" });
    } catch (err: any) {
      setMessage({ type: "error", text: `Icon upload failed: ${err.message}` });
    } finally {
      setUploadingIcon(false);
      if (iconInputRef.current) iconInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Crop name is required." });
      return;
    }
    if (!formData.image_url.trim()) {
      setMessage({ type: "error", text: "Please upload or enter an image URL." });
      return;
    }
    setSaveLoading(true);
    setMessage(null);
    try {
      const payload = {
        name: formData.name,
        subtitle: formData.subtitle,
        image_url: formData.image_url,
        icon: formData.icon,
        icon_url: formData.icon_url || null,
        link: formData.link,
        sort_order: formData.sort_order,
      };
      let error;
      if (selectedId) {
        const { error: err } = await supabase.from("crops").update(payload).eq("id", selectedId);
        error = err;
      } else {
        const { error: err } = await supabase.from("crops").insert([payload]);
        error = err;
      }
      if (error) throw error;
      setMessage({ type: "success", text: "Crop saved successfully!" });
      await fetch("/api/revalidate?path=/");
      handleAddNew();
      fetchCrops();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete crop "${name}"? This cannot be undone.`)) return;
    setMessage(null);
    try {
      const { error } = await supabase.from("crops").delete().eq("id", id);
      if (error) throw error;
      setMessage({ type: "success", text: `"${name}" deleted.` });
      await fetch("/api/revalidate?path=/");
      if (selectedId === id) handleAddNew();
      fetchCrops();
    } catch (err: any) {
      setMessage({ type: "error", text: `Delete failed: ${err.message}` });
    }
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Our Crops</h1>
          <p className="admin-page-subtitle">
            Manage the crop cards displayed in the homepage&apos;s &quot;Our Crops&quot; section.
          </p>
        </div>
        <button className="admin-btn-primary" onClick={handleAddNew}>
          + Add Crop
        </button>
      </div>

      {message && (
        <div className={`admin-message admin-message-${message.type}`}>{message.text}</div>
      )}

      <div className="admin-two-col">
        {/* LEFT: Crop List */}
        <div className="admin-list-panel">
          <h2 className="admin-panel-title">All Crops ({crops.length})</h2>
          {loading ? (
            <p className="admin-loading-text">Loading…</p>
          ) : crops.length === 0 ? (
            <div className="admin-empty-state">
              <p>No crops yet. Click &quot;+ Add Crop&quot; to begin.</p>
              <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "8px" }}>
                Tip: Run the SQL migration in your Supabase dashboard to create the crops table.
              </p>
            </div>
          ) : (
            <div className="admin-crops-list">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className={`admin-crop-row ${selectedId === crop.id ? "admin-crop-row--active" : ""}`}
                  onClick={() => handleSelect(crop)}
                >
                  <div className="admin-crop-row-thumb">
                    {crop.image_url ? (
                      <img src={crop.image_url} alt={crop.name} />
                    ) : (
                      <div className="admin-crop-row-thumb-placeholder" />
                    )}
                  </div>
                  <div className="admin-crop-row-info">
                    <div className="admin-crop-row-icon">
                      <CropIcon type={crop.icon} iconUrl={crop.icon_url} />
                    </div>
                    <div>
                      <span className="admin-crop-row-name">{crop.name}</span>
                      <span className="admin-crop-row-subtitle">{crop.subtitle}</span>
                    </div>
                    <span className="admin-crop-row-order">#{crop.sort_order + 1}</span>
                  </div>
                  <button
                    className="admin-btn-danger-sm"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      handleDelete(crop.id!, crop.name);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Form + Live Preview */}
        <div className="admin-form-panel">
          <h2 className="admin-panel-title">
            {selectedId ? "Edit Crop" : "Add New Crop"}
          </h2>

          <form className="admin-form" onSubmit={handleSave}>
            {/* Name */}
            <div className="admin-form-group">
              <label className="admin-label">Crop Name *</label>
              <input
                className="admin-input"
                type="text"
                placeholder="e.g. MICROGREENS"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value.toUpperCase() }))}
              />
            </div>

            {/* Subtitle */}
            <div className="admin-form-group">
              <label className="admin-label">Subtitle</label>
              <input
                className="admin-input"
                type="text"
                placeholder="e.g. Small Greens. Big Nutrition"
                value={formData.subtitle}
                onChange={(e) => setFormData((p) => ({ ...p, subtitle: e.target.value }))}
              />
            </div>

            {/* Photo Upload */}
            <div className="admin-form-group">
              <label className="admin-label">Photo *</label>
              <div className="admin-upload-row">
                {formData.image_url && (
                  <img src={formData.image_url} alt="preview" className="admin-img-preview" />
                )}
                <div style={{ flex: 1 }}>
                  <input
                    className="admin-input"
                    type="text"
                    placeholder="Paste image URL or upload below"
                    value={formData.image_url}
                    onChange={(e) => setFormData((p) => ({ ...p, image_url: e.target.value }))}
                  />
                  <label className="admin-file-label">
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleUploadImage}
                    />
                    {uploadingImage ? "Uploading…" : "↑ Upload Photo"}
                  </label>
                </div>
              </div>
            </div>

            {/* Icon Selection */}
            <div className="admin-form-group">
              <label className="admin-label">Icon</label>
              <div className="admin-icon-picker">
                {PRESET_ICONS.map((ic) => (
                  <button
                    key={ic.key}
                    type="button"
                    className={`admin-icon-option ${formData.icon === ic.key && !formData.icon_url ? "admin-icon-option--active" : ""}`}
                    onClick={() => setFormData((p) => ({ ...p, icon: ic.key, icon_url: "" }))}
                    title={ic.label}
                  >
                    <CropIcon type={ic.key} />
                    <span>{ic.label}</span>
                  </button>
                ))}
              </div>
              <div className="admin-upload-row" style={{ marginTop: "10px" }}>
                <label className="admin-label" style={{ margin: 0, width: "130px", flexShrink: 0 }}>
                  Custom Icon:
                </label>
                {formData.icon_url && (
                  <img src={formData.icon_url} alt="icon" className="admin-icon-preview" />
                )}
                <label className="admin-file-label">
                  <input
                    ref={iconInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleUploadIcon}
                  />
                  {uploadingIcon ? "Uploading…" : "↑ Upload Custom Icon"}
                </label>
                {formData.icon_url && (
                  <button
                    type="button"
                    className="admin-btn-danger-sm"
                    onClick={() => setFormData((p) => ({ ...p, icon_url: "" }))}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Link */}
            <div className="admin-form-group">
              <label className="admin-label">Card Link</label>
              <input
                className="admin-input"
                type="text"
                placeholder="/varieties or /microgreens"
                value={formData.link}
                onChange={(e) => setFormData((p) => ({ ...p, link: e.target.value }))}
              />
            </div>

            {/* Sort Order */}
            <div className="admin-form-group">
              <label className="admin-label">Sort Order</label>
              <input
                className="admin-input"
                type="number"
                min={0}
                value={formData.sort_order}
                onChange={(e) => setFormData((p) => ({ ...p, sort_order: Number(e.target.value) }))}
                style={{ maxWidth: "120px" }}
              />
            </div>

            {/* Live Preview */}
            <div className="admin-crop-preview-wrap">
              <p className="admin-preview-label">Live Card Preview</p>
              <div className="admin-crop-preview-card">
                <div className="admin-preview-photo">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="preview" />
                  ) : (
                    <div className="admin-preview-photo-empty">No photo yet</div>
                  )}
                </div>
                <div className="admin-preview-yellow-body">
                  <div className="admin-preview-icon">
                    <CropIcon type={formData.icon} iconUrl={formData.icon_url} />
                  </div>
                  <p className="admin-preview-name">{formData.name || "CROP NAME"}</p>
                  <p className="admin-preview-subtitle">{formData.subtitle || "Small Greens. Big Nutrition"}</p>
                  <div className="admin-preview-arrow">→</div>
                </div>
              </div>
            </div>

            <div className="admin-form-actions">
              <button type="button" className="admin-btn-secondary" onClick={handleAddNew}>
                Cancel
              </button>
              <button type="submit" className="admin-btn-primary" disabled={saveLoading}>
                {saveLoading ? "Saving…" : selectedId ? "Update Crop" : "Add Crop"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
