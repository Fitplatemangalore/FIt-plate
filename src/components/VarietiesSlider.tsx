"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export interface VarietyItem {
  id: string | number;
  name: string;
  tag: string;
  image_url?: string;
  slug?: string;
}

export default function VarietiesSlider({ varieties }: { varieties: VarietyItem[] }) {
  const [isInteracting, setIsInteracting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startInteraction = () => {
    setIsInteracting(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const stopInteractionWithDelay = (delayMs = 2500) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, delayMs);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const items = varieties.map((v, i) => {
    const slug = v.slug || v.name.toLowerCase().replace(/\s+/g, "-");
    return (
      <Link
        key={`var-${v.id}-${i}`}
        href={`/varieties/${slug}`}
        className="pot-card"
        style={{ "--i": i, textDecoration: "none" } as React.CSSProperties}
      >
        <div className="pot-image-wrapper">
          <img
            src={v.image_url || `/assets/pot/pot-${(i % 4) + 1}.png`}
            alt={`${v.name} pot`}
            className="pot-image"
          />
        </div>
        <h3 className="pot-name" style={{ textTransform: "uppercase" }}>{v.name}</h3>
        <div className="pot-tag">{v.tag}</div>
      </Link>
    );
  });

  const shouldScrollDesktop = items.length > 4;
  const shouldScrollMobile = items.length > 2;
  const shouldDuplicate = shouldScrollDesktop || shouldScrollMobile;

  return (
    <div
      className="our-microgreens-carousel-wrapper reveal stagger"
      onTouchStart={startInteraction}
      onTouchMove={startInteraction}
      onTouchEnd={() => stopInteractionWithDelay(2500)}
      onMouseDown={startInteraction}
      onMouseUp={() => stopInteractionWithDelay(2500)}
      onMouseLeave={() => stopInteractionWithDelay(1500)}
      onScroll={() => {
        startInteraction();
        stopInteractionWithDelay(2500);
      }}
    >
      <div
        className={`our-microgreens-track ${shouldScrollDesktop ? 'auto-scroll-desktop' : ''} ${shouldScrollMobile ? 'auto-scroll-mobile' : ''} ${isInteracting ? 'user-interacting' : ''}`}
      >
        {items}
        {shouldDuplicate &&
          items.map((item, idx) => (
            <div key={`dup-${idx}`} className="dup-item" style={{ display: "contents" }}>
              {item}
            </div>
          ))}
      </div>
    </div>
  );
}
