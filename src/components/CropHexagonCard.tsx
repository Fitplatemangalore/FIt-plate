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

export function CropIcon({ type }: { type?: string }) {
  if (!type) return null;
  return (
    <img
      src={`/assets/icons/${type}.svg`}
      alt={`${type} icon`}
      className="uv-crop-custom-icon"
      width="28"
      height="28"
    />
  );
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
              <CropIcon type={iconType} />
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

