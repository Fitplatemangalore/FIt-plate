"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

export interface VarietyItem {
  id: string | number;
  name: string;
  tag: string;
  image_url?: string;
  slug?: string;
}

export default function VarietiesSlider({ varieties }: { varieties: VarietyItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        setShowArrows(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [varieties]);

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const items = varieties.map((v, i) => {
    const slug = v.slug || v.name.toLowerCase().replace(/\s+/g, "-");
    return (
      <Link
        key={`var-${v.id}-${i}`}
        href={`/varieties/${slug}`}
        className="pot-card"
        style={{ "--i": i, textDecoration: "none", flex: "0 0 240px" } as React.CSSProperties}
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

  return (
    <div className="manual-microgreens-wrapper" style={{ position: "relative", marginBottom: "36px" }}>
      {showArrows && (
        <>
          <button 
            onClick={() => scrollByAmount(-300)}
            style={{ position: "absolute", left: "-10px", top: "calc(50% + 40px)", transform: "translateY(-50%)", zIndex: 10, background: "var(--brand-secondary)", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={() => scrollByAmount(300)}
            style={{ position: "absolute", right: "-10px", top: "calc(50% + 40px)", transform: "translateY(-50%)", zIndex: 10, background: "var(--brand-secondary)", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </>
      )}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "24px",
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingBottom: "24px",
          paddingTop: "110px",
          marginTop: "-30px",
        }}
      >
        {items}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .manual-microgreens-wrapper div::-webkit-scrollbar { display: none; }
        .manual-microgreens-wrapper .pot-card { padding: 16px 20px; }
        @media (min-width: 768px) {
          .manual-microgreens-wrapper .pot-card { flex: 0 0 calc(25% - 18px) !important; max-width: 280px; }
        }
      `}} />
    </div>
  );
}
