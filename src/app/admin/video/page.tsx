"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

interface SiteVideo {
  id?: string;
  video_url: string;
  thumbnail_url: string;
  updated_at?: string;
}

const empty: SiteVideo = { video_url: "", thumbnail_url: "" };

export default function AdminVideo() {
  const [record, setRecord] = useState<SiteVideo | null>(null);
  const [form, setForm] = useState<SiteVideo>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => { fetchRecord(); }, []);

  const fetchRecord = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_video")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();
    if (data) {
      setRecord(data);
      setForm({ video_url: data.video_url || "", thumbnail_url: data.thumbnail_url || "" });
    } else {
      setRecord(null);
      setForm(empty);
    }
    if (error && error.code !== "PGRST116") {
      setMessage({ type: "error", text: `Error loading video: ${error.message}` });
    }
    setLoading(false);
  };

  const upload = async (
    file: File,
    folder: string,
    setter: (url: string) => void,
    setBusy: (b: boolean) => void,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    setBusy(true);
    setMessage(null);
    try {
      const ext = file.name.split(".").pop();
      const filePath = `${folder}/${Math.random().toString(36).substring(2)}_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("fitplate-assets").upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("fitplate-assets").getPublicUrl(filePath);
      setter(publicUrl);
      setMessage({ type: "success", text: "Uploaded successfully!" });
    } catch (err: any) {
      setMessage({ type: "error", text: `Upload failed: ${err.message}` });
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.video_url.trim()) { setMessage({ type: "error", text: "Video URL is required." }); return; }
    setSaving(true);
    setMessage(null);
    try {
      const payload = { video_url: form.video_url, thumbnail_url: form.thumbnail_url, updated_at: new Date().toISOString() };
      let error;
      if (record?.id) {
        ({ error } = await supabase.from("site_video").update(payload).eq("id", record.id));
      } else {
        ({ error } = await supabase.from("site_video").insert([payload]));
      }
      if (error) throw error;
      await fetch("/api/revalidate?path=/");
      setMessage({ type: "success", text: "Video saved successfully!" });
      fetchRecord();
    } catch (err: any) {
      setMessage({ type: "error", text: `Failed to save: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!record?.id) return;
    if (!confirm("Delete the current video entry? This cannot be undone.")) return;
    try {
      const { error } = await supabase.from("site_video").delete().eq("id", record.id);
      if (error) throw error;
      await fetch("/api/revalidate?path=/");
      setMessage({ type: "success", text: "Video deleted." });
      setRecord(null);
      setForm(empty);
    } catch (err: any) {
      setMessage({ type: "error", text: `Delete failed: ${err.message}` });
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Homepage Video</h1>
          <p className="admin-page-subtitle">Manage the video and thumbnail shown in Section 4 of the homepage.</p>
        </div>
        {record?.id && (
          <button className="admin-btn-danger-sm" style={{ fontSize: "13px", padding: "8px 16px" }} onClick={handleDelete}>
            🗑 Delete Video
          </button>
        )}
      </div>

      {message && (
        <div className={`admin-message admin-message-${message.type}`}>{message.text}</div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>Loading…</div>
      ) : (
        <div className="admin-two-col" style={{ alignItems: "flex-start" }}>
          {/* LEFT: Form */}
          <div className="admin-form-panel" style={{ flex: 2 }}>
            <h2 className="admin-panel-title">{record?.id ? "Update Video" : "Add Video"}</h2>
            <form className="admin-form" onSubmit={handleSave}>

              {/* Video upload */}
              <div className="admin-form-group">
                <label className="admin-label">Video File *</label>
                <div className="admin-upload-row">
                  <div style={{ flex: 1 }}>
                    <input
                      className="admin-input"
                      type="text"
                      placeholder="Paste video URL or upload below"
                      value={form.video_url}
                      onChange={(e) => setForm((p) => ({ ...p, video_url: e.target.value }))}
                    />
                    <label className="admin-btn-secondary" style={{ marginTop: "8px", display: "inline-block", cursor: "pointer" }}>
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) upload(file, "videos", (url) => setForm((p) => ({ ...p, video_url: url })), setUploadingVideo, videoInputRef);
                        }}
                      />
                      {uploadingVideo ? "Uploading…" : "↑ Upload Video"}
                    </label>
                  </div>
                </div>
                {form.video_url && (
                  <p style={{ fontSize: "12px", color: "#64748b", marginTop: "6px", wordBreak: "break-all" }}>
                    ✅ {form.video_url}
                  </p>
                )}
              </div>

              {/* Thumbnail upload */}
              <div className="admin-form-group">
                <label className="admin-label">Thumbnail (Poster Image)</label>
                <div className="admin-upload-row">
                  {form.thumbnail_url && (
                    <img src={form.thumbnail_url} alt="Thumbnail preview" className="admin-img-preview" style={{ height: "80px", width: "140px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <input
                      className="admin-input"
                      type="text"
                      placeholder="Paste thumbnail URL or upload below"
                      value={form.thumbnail_url}
                      onChange={(e) => setForm((p) => ({ ...p, thumbnail_url: e.target.value }))}
                    />
                    <label className="admin-btn-secondary" style={{ marginTop: "8px", display: "inline-block", cursor: "pointer" }}>
                      <input
                        ref={thumbInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) upload(file, "videos/thumbs", (url) => setForm((p) => ({ ...p, thumbnail_url: url })), setUploadingThumb, thumbInputRef);
                        }}
                      />
                      {uploadingThumb ? "Uploading…" : "↑ Upload Thumbnail"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="admin-btn-primary" disabled={saving}>
                  {saving ? "Saving…" : record?.id ? "Update Video" : "Save Video"}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Preview */}
          {form.thumbnail_url && (
            <div className="admin-list-panel" style={{ flex: 1 }}>
              <h2 className="admin-panel-title">Thumbnail Preview</h2>
              <img
                src={form.thumbnail_url}
                alt="Thumbnail"
                style={{ width: "100%", borderRadius: "10px", objectFit: "cover", aspectRatio: "16/9" }}
              />
              {form.video_url && (
                <p style={{ marginTop: "12px", fontSize: "13px", color: "#64748b" }}>
                  🎬 Video URL set. The thumbnail will be shown as the poster on the homepage.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <style>{`
        .admin-btn-danger-sm { cursor: pointer; border: none; background: #fee2e2; color: #dc2626; border-radius: 8px; font-weight: 600; transition: background 0.15s; }
        .admin-btn-danger-sm:hover { background: #fecaca; }
      `}</style>
    </div>
  );
}
