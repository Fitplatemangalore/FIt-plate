"use client";

import Link from "next/link";

export interface CropData {
  id: string;
  name: string;
  subtitle?: string;
  image?: string;
  image_url?: string;
  link?: string;
  href?: string;
  icon?: string;
  iconType?: "leaf" | "herbs" | "flower" | "microgreens" | "fruits" | "saffron";
  icon_url?: string;
  sort_order?: number;
}

export function CropIcon({ type, iconUrl }: { type?: string; iconUrl?: string }) {
  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt="crop icon"
        className="uv-crop-custom-icon"
        width="28"
        height="28"
      />
    );
  }

  switch (type) {
    case "herbs":
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="#112E81" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
          <path d="M16 28V8" />
          <path d="M16 14c-4-1-6-3-6-6 4 0 6 3 6 6Z" />
          <path d="M16 18c4-1 6-3 6-6-4 0-6 3-6 6Z" />
          <path d="M16 23c-3-1-5-2.5-5-5 3.5 0 5 2.5 5 5Z" />
        </svg>
      );
    case "flower":
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="#112E81" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
          <circle cx="16" cy="16" r="3.5" />
          <path d="M16 5.5a3.5 3.5 0 0 0-3.5 3.5v1.5a3.5 3.5 0 0 0 7 0V9A3.5 3.5 0 0 0 16 5.5Z" />
          <path d="M16 21.5a3.5 3.5 0 0 0-3.5 3.5V26.5a3.5 3.5 0 0 0 7 0V25a3.5 3.5 0 0 0-3.5-3.5Z" />
          <path d="M5.5 16a3.5 3.5 0 0 0 3.5-3.5H10.5a3.5 3.5 0 0 0 0 7H9A3.5 3.5 0 0 0 5.5 16Z" />
          <path d="M21.5 16a3.5 3.5 0 0 0 3.5-3.5H26.5a3.5 3.5 0 0 0 0 7H25A3.5 3.5 0 0 0 21.5 16Z" />
        </svg>
      );
    case "fruits":
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="#112E81" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
          <path d="M16 8.5c-5.5 0-9.5 4.5-9.5 10 0 5 4 9 9.5 9s9.5-4 9.5-9c0-5.5-4-10-9.5-10Z" />
          <path d="M16 8.5V4.5c2 0 3.5 1 3.5 2.5" />
          <path d="M16 4.5c-2 0-3.5 1-3.5 2.5" />
        </svg>
      );
    case "saffron":
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="#112E81" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
          <path d="M16 28V12" />
          <path d="M16 12c-4-4-5-8-5-8s4 1 7 5" />
          <path d="M16 12c4-4 5-8 5-8s-4 1-7 5" />
          <path d="M11 20c3-2 5-3 5-3s2 1 5 3" />
        </svg>
      );
    case "leaf":
    case "microgreens":
    default:
      // Exact organic twin-leaf icon matching Image 1
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="#112E81" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" style={{ transform: "scale(1.4) translateY(-2px)" }}>
          <path d="M15.5 28V14" />
          <path d="M15.5 14c0-6 4.5-9 10.5-9.5-1 6-4 10-10.5 9.5Z" />
          <path d="M15.5 18c0-4-3-6-6.5-6.8 0.5 4 2.5 6.8 6.5 6.8Z" />
        </svg>
      );
  }
}

export default function CropHexagonCard({ crop }: { crop: CropData }) {
  const targetHref = crop.link || crop.href || "/varieties";
  const cropImage = crop.image_url || crop.image || "/assets/img/d4077bf9785efe29a21bd1df1c010651.jpg";
  const iconType = crop.icon || crop.iconType || "leaf";

  return (
    <div className="uv-crop-card-v2">
      {/* Hidden SVG Definitions for Outer Hexagon & Inner Crest Shape */}
      <svg width="0" height="0" className="uv-crop-svg-defs" aria-hidden="true">
        <defs>
          <clipPath id="uv-crop-outer-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.46,0.012 C 0.48,0.002 0.52,0.002 0.54,0.012 L 0.97,0.208 C 0.99,0.218 1,0.235 1,0.255 L 1,0.745 C 1,0.765 0.99,0.782 0.97,0.792 L 0.54,0.988 C 0.52,0.998 0.48,0.998 0.46,0.988 L 0.03,0.792 C 0.01,0.782 0,0.765 0,0.745 L 0,0.255 C 0,0.235 0.01,0.218 0.03,0.208 Z" />
          </clipPath>
          <clipPath id="uv-crop-yellow-clip" clipPathUnits="objectBoundingBox">
            {/* W-shape with straight edges and rounded corners: starts at y=0.30, valleys at y=0.50 */}
            <path d="M 0,0.30 L 0.19,0.452 Q 0.25,0.50 0.31,0.452 L 0.44,0.348 Q 0.50,0.30 0.56,0.348 L 0.69,0.452 Q 0.75,0.50 0.81,0.452 L 1,0.30 L 1,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <Link href={targetHref} className="uv-crop-link-wrapper" aria-label={crop.name}>
        {/* Outer Hexagon Container */}
        <div className="uv-crop-hexagon-container">

          {/* Layer 1: Photo — fills full hexagon */}
          <div className="uv-crop-photo-wrap">
            <img
              src={cropImage}
              alt={crop.name}
              className="uv-crop-photo"
              loading="lazy"
            />
          </div>

          {/* Layer 2: Yellow background shape (clip-path applied here ONLY — no children) */}
          <div className="uv-crop-yellow-body" aria-hidden="true" />

          {/* Layer 3: Text content — sits on top of yellow, NOT clipped */}
          <div className="uv-crop-yellow-content">
            {/* Green Icon */}
            <div className="uv-crop-crest-icon">
              <CropIcon type={iconType} iconUrl={crop.icon_url} />
            </div>

            {/* Crop Title */}
            <h3 className="uv-crop-v2-title">{crop.name}</h3>

            {/* Crop Subtitle */}
            <p className="uv-crop-v2-subtitle">
              {crop.subtitle || "Small Greens. Big Nutrition"}
            </p>

            {/* Circular Arrow CTA Button */}
            <div className="uv-crop-v2-arrow-btn">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F4C542"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="15"
                height="15"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}
