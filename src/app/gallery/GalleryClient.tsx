"use client";

import { useState } from "react";

interface GalleryImage {
  id: string;
  image_url: string;
  sort_order: number;
}

interface GalleryEntry {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  created_at: string;
  gallery_images: GalleryImage[];
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function GalleryCard({ entry, onOpen }: { entry: GalleryEntry; onOpen: () => void }) {
  const images = [...(entry.gallery_images || [])].sort((a, b) => a.sort_order - b.sort_order);
  const [slide, setSlide] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlide((s) => (s - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlide((s) => (s + 1) % images.length);
  };

  return (
    <div className="gallery-card" onClick={onOpen} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen()}>
      <div className="gallery-card-img-wrap">
        {images.length > 0 ? (
          <>
            <img src={images[slide]?.image_url} alt={entry.title} className="gallery-card-img" />
            {images.length > 1 && (
              <>
                <button className="gallery-arrow gallery-arrow-left" onClick={prev} aria-label="Previous image">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button className="gallery-arrow gallery-arrow-right" onClick={next} aria-label="Next image">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
                <div className="gallery-dots">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`gallery-dot ${i === slide ? "active" : ""}`}
                      onClick={(e) => { e.stopPropagation(); setSlide(i); }}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="gallery-img-count">{slide + 1} / {images.length}</div>
              </>
            )}
          </>
        ) : (
          <div className="gallery-card-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          </div>
        )}
      </div>
      <div className="gallery-card-body">
        <div className="gallery-card-date">{formatDate(entry.event_date)}</div>
        <h3 className="gallery-card-title">{entry.title}</h3>
        {entry.description && <p className="gallery-card-desc">{entry.description}</p>}
        <div className="gallery-card-footer">
          <span className="gallery-view-link">View photos →</span>
          {images.length > 0 && (
            <span className="gallery-photo-count">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
              {images.length} photo{images.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function GalleryModal({ entry, onClose }: { entry: GalleryEntry; onClose: () => void }) {
  const images = [...(entry.gallery_images || [])].sort((a, b) => a.sort_order - b.sort_order);
  const [slide, setSlide] = useState(0);

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-modal-close" onClick={onClose} aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        <div className="gallery-modal-img-wrap">
          {images.length > 0 ? (
            <>
              <img src={images[slide]?.image_url} alt={`${entry.title} photo ${slide + 1}`} className="gallery-modal-img" />
              {images.length > 1 && (
                <>
                  <button className="gallery-arrow gallery-arrow-left gallery-arrow-lg" onClick={() => setSlide((s) => (s - 1 + images.length) % images.length)} aria-label="Previous">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <button className="gallery-arrow gallery-arrow-right gallery-arrow-lg" onClick={() => setSlide((s) => (s + 1) % images.length)} aria-label="Next">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="gallery-card-placeholder" style={{ minHeight: 320 }}>No images</div>
          )}
        </div>

        {images.length > 1 && (
          <div className="gallery-modal-thumbs">
            {images.map((img, i) => (
              <button key={img.id} className={`gallery-thumb ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)}>
                <img src={img.image_url} alt={`Thumbnail ${i + 1}`} />
              </button>
            ))}
          </div>
        )}

        <div className="gallery-modal-info">
          {entry.event_date && <div className="gallery-modal-date">{formatDate(entry.event_date)}</div>}
          <h2 className="gallery-modal-title">{entry.title}</h2>
          {entry.description && <p className="gallery-modal-desc">{entry.description}</p>}
          {images.length > 1 && (
            <div className="gallery-dots gallery-dots-modal">
              {images.map((_, i) => (
                <button key={i} className={`gallery-dot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} aria-label={`Image ${i + 1}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GalleryClient({ entries }: { entries: GalleryEntry[] }) {
  const [openEntry, setOpenEntry] = useState<GalleryEntry | null>(null);

  if (entries.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", color: "var(--ink-500)" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 16px", display: "block" }}>
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>
        </svg>
        <p>No gallery entries yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-grid">
        {entries.map((entry) => (
          <GalleryCard key={entry.id} entry={entry} onOpen={() => setOpenEntry(entry)} />
        ))}
      </div>
      {openEntry && <GalleryModal entry={openEntry} onClose={() => setOpenEntry(null)} />}
    </>
  );
}
