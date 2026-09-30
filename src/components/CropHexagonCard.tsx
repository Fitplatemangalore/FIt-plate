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
  const isLarge = type === 'leafy-vegetables' || type === 'edible-flowers' || type === 'herbs';
  
  const imgProps = {
    src: `/assets/icons/${type}.png`,
    alt: `${type} icon`,
    style: isLarge ? { transform: 'scale(0.72) translateY(2px)' } : { transform: 'scale(1)' }
  };

  if (type === 'edible-flowers' || type === 'herbs') {
    return (
      <>
        <img {...imgProps} className="uv-crop-custom-icon desktop-icon-only" />
        <svg viewBox="0 0 32 32" fill="none" stroke="#112E81" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="uv-crop-custom-icon mobile-icon-only">
          {type === 'edible-flowers' && (
            <g style={{ transform: "scale(1.35)", transformOrigin: "center" }}>
              <circle cx="16" cy="16" r="3.5" />
              <path d="M16 5.5a3.5 3.5 0 0 0-3.5 3.5v1.5a3.5 3.5 0 0 0 7 0V9A3.5 3.5 0 0 0 16 5.5Z" />
              <path d="M16 21.5a3.5 3.5 0 0 0-3.5 3.5V26.5a3.5 3.5 0 0 0 7 0V25a3.5 3.5 0 0 0-3.5-3.5Z" />
              <path d="M5.5 16a3.5 3.5 0 0 0 3.5-3.5H10.5a3.5 3.5 0 0 0 0 7H9A3.5 3.5 0 0 0 5.5 16Z" />
              <path d="M21.5 16a3.5 3.5 0 0 0 3.5-3.5H26.5a3.5 3.5 0 0 0 0 7H25A3.5 3.5 0 0 0 21.5 16Z" />
            </g>
          )}
          {type === 'herbs' && (
            <g style={{ transform: "scale(1.15) translateY(2px)", transformOrigin: "center" }}>
              <path d="M16 28V8" />
              <path d="M16 14c-4-1-6-3-6-6 4 0 6 3 6 6Z" />
              <path d="M16 18c4-1 6-3 6-6-4 0-6 3-6 6Z" />
              <path d="M16 23c-3-1-5-2.5-5-5 3.5 0 5 2.5 5 5Z" />
            </g>
          )}
        </svg>
      </>
    );
  }

  return (
    <img {...imgProps} className="uv-crop-custom-icon" />
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

