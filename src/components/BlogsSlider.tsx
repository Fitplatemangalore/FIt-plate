"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published_date: string;
  image_url: string;
  slug?: string;
}

export default function BlogsSlider({ blogs }: { blogs: BlogItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = blogs.length;
  const itemsPerPage = isMobile ? 1 : 3;
  const pageCount = Math.ceil(total / itemsPerPage);
  const shouldSlide = isMobile ? total > 1 : total > 3;

  // Auto-advance slideshow every 5s if hovered is false
  useEffect(() => {
    if (!shouldSlide || pageCount <= 1) return;

    const timer = setInterval(() => {
      if (!isHovered.current) {
        setActiveIdx((prev) => (prev + 1) % pageCount);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [shouldSlide, pageCount]);

  // Bound check activeIdx on resize/pageCount change
  useEffect(() => {
    if (activeIdx >= pageCount) {
      setActiveIdx(Math.max(0, pageCount - 1));
    }
  }, [pageCount, activeIdx]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (diff > minSwipeDistance) {
      setActiveIdx((prev) => (prev + 1) % pageCount);
    } else if (diff < -minSwipeDistance) {
      setActiveIdx((prev) => (prev - 1 + pageCount) % pageCount);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!shouldSlide) {
    return (
      <div className="blogs-grid reveal stagger">
        {blogs.map((b, i) => (
          <BlogCard b={b} key={b.id || i} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="blogs-carousel-container reveal"
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="blogs-carousel-track-wrapper">
        <div
          className="blogs-carousel-track"
          style={{
            transform: `translateX(-${activeIdx * 100}%)`,
          }}
        >
          {Array.from({ length: pageCount }).map((_, pageIdx) => {
            const pageItems = blogs.slice(
              pageIdx * itemsPerPage,
              pageIdx * itemsPerPage + itemsPerPage
            );

            return (
              <div key={pageIdx} className="blogs-carousel-page">
                {pageItems.map((b, i) => (
                  <BlogCard b={b} key={b.id || i} index={i} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="blogs-dots">
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`blogs-dot${idx === activeIdx ? " active" : ""}`}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Go to blog slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogCard({ b, index }: { b: BlogItem; index: number }) {
  const slug = b.slug || b.id || b.title.toLowerCase().replace(/\s+/g, "-");
  let formattedDate = "Recent";

  if (b.published_date) {
    try {
      formattedDate = new Date(b.published_date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      formattedDate = b.published_date;
    }
  }

  return (
    <div className="blog-card" style={{ "--i": index } as React.CSSProperties}>
      <Link href={`/blogs/${slug}`}>
        <img
          src={b.image_url}
          alt={b.title}
          className="blog-card-image"
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="tag-pill">{b.category}</span>
          <span className="blog-card-date">{formattedDate}</span>
        </div>
        <h3 className="blog-card-title">
          <Link
            href={`/blogs/${slug}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {b.title}
          </Link>
        </h3>
        <p className="blog-card-desc">{b.excerpt}</p>
        <Link href={`/blogs/${slug}`} className="blog-card-link">
          Read more
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
