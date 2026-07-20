"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface ContentItem {
  id: string;
  key: string;
  value: string;
  label: string;
  page: string;
  type: "text" | "textarea" | "image";
}

export default function AdminContent() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("page", { ascending: true })
      .order("label", { ascending: true });

    if (error) {
      setMessage({ type: "error", text: `Error loading site content: ${error.message}` });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleValueChange = (id: string, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(id);
    setMessage(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `content/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("fitplate-assets")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("fitplate-assets")
        .getPublicUrl(filePath);

      handleValueChange(id, publicUrl);
      setMessage({ type: "success", text: "Image uploaded! Click Save to apply changes." });
    } catch (err: any) {
      setMessage({ type: "error", text: `Image upload failed: ${err.message}` });
    } finally {
      setUploadingId(null);
    }
  };

  const handleSave = async (item: ContentItem) => {
    setSavingId(item.id);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("site_content")
        .update({ value: item.value })
        .eq("id", item.id);

      if (error) throw error;

      setMessage({ type: "success", text: `"${item.label}" saved successfully!` });
      
      // Trigger On-Demand ISR Revalidation for the specific page
      const revalPath = item.page === "home" ? "/" : `/${item.page}`;
      await fetch(`/api/revalidate?path=${revalPath}`);
      // Also always revalidate home page in case it inherits content
      if (item.page !== "home") {
        await fetch("/api/revalidate?path=/");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSavingId(null);
    }
  };

  const pagesList = ["all", ...Array.from(new Set(items.map((item) => item.page)))];

  const filteredItems = selectedPage === "all"
    ? items
    : items.filter((item) => item.page === selectedPage);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Site Page Content Manager</h1>
          <p>Update labels, headings, and images across various pages of your website.</p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--forest-950)" }}>Filter by Page:</span>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
              background: "#fff",
              fontSize: "14px",
              outline: "none"
            }}
          >
            {pagesList.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div className={`admin-alert admin-alert-${message.type}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <span className="admin-spinner" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="admin-empty">
          <p>No editable content blocks found. Please make sure the site_content table is seeded.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredItems.map((item) => (
            <div key={item.id} className="admin-card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: "15px", margin: 0, color: "var(--forest-950)", fontWeight: 700 }}>
                    {item.label}
                  </h3>
                  <span className="admin-tag" style={{ marginTop: "4px", fontSize: "10px", padding: "2px 8px" }}>
                    Page: {item.page} • Key: {item.key}
                  </span>
                </div>
                <button
                  onClick={() => handleSave(item)}
                  className="btn btn-gold btn-sm"
                  disabled={savingId === item.id || uploadingId === item.id}
                  style={{ minWidth: "80px", padding: "6px 12px" }}
                >
                  {savingId === item.id ? "Saving..." : "Save"}
                </button>
              </div>

              {item.type === "text" && (
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleValueChange(item.id, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    fontSize: "14px"
                  }}
                />
              )}

              {item.type === "textarea" && (
                <textarea
                  value={item.value}
                  onChange={(e) => handleValueChange(item.id, e.target.value)}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    lineHeight: "1.5"
                  }}
                />
              )}

              {item.type === "image" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, item.id)}
                      disabled={uploadingId === item.id}
                    />
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => handleValueChange(item.id, e.target.value)}
                      placeholder="Or paste image URL"
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid var(--line)",
                        fontSize: "14px"
                      }}
                    />
                  </div>
                  {uploadingId === item.id && <p className="admin-muted" style={{ fontSize: "12px" }}>Uploading image...</p>}
                  {item.value && (
                    <img
                      src={item.value}
                      alt={item.label}
                      style={{
                        maxWidth: "200px",
                        borderRadius: "8px",
                        border: "1px solid var(--line)",
                        marginTop: "4px"
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
