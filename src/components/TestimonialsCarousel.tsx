"use client";

import { useRef, useState } from "react";

export interface TestimonialItem {
  id?: string | number;
  name: string;
  role?: string;
  quote?: string;
  stars?: number;
  link?: string;
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.483 0-6.312-2.829-6.312-6.312 0-3.483 2.829-6.312 6.312-6.312 1.624 0 3.097.621 4.225 1.63l3.24-3.24C19.336 2.222 15.992 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.24-4.553 11.24-11.24 0-.761-.077-1.498-.216-2.185H12.24z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export function TestimonialCard({ t }: { t: TestimonialItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const quoteText = t.quote || "";
  const CHAR_LIMIT = 55;
  const isLong = quoteText.length > CHAR_LIMIT;

  let displayText = quoteText;
  if (isLong && !isExpanded) {
    const sliced = quoteText.slice(0, CHAR_LIMIT);
    const lastSpace = sliced.lastIndexOf(" ");
    const cutoff = lastSpace > CHAR_LIMIT - 15 ? lastSpace : CHAR_LIMIT;
    displayText = quoteText.slice(0, cutoff).trim() + "...";
  }

  return (
    <a
      href={t.link || "https://maps.google.com/?q=Fitplate+Ventures+Mangalore"}
      target="_blank"
      rel="noopener noreferrer"
      className={`tc-mobile-card-link${isExpanded ? " expanded" : ""}`}
    >
      <div className={`tc-mobile-card${isExpanded ? " expanded" : ""}`}>
        {/* 1. User icon/photo floating at top center */}
        <div className="tc-mobile-avatar-wrap">
          <div className="tc-mobile-avatar">
            <UserIcon />
          </div>
        </div>

        <div className="tc-mobile-body">
          {/* 2. Client name */}
          <h4 className="tc-mobile-name">{t.name}</h4>

          {/* 3. Company name / Role */}
          {t.role && <span className="tc-mobile-role">{t.role}</span>}

          {/* 4. Testimonial quote with inline Read More / Read Less */}
          {t.quote && (
            <p className="tc-mobile-quote">
              &ldquo;{displayText}&rdquo;
              {isLong && (
                <button
                  type="button"
                  className="tc-read-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </p>
          )}

          {/* 5. Pinned bottom container for Google "G" icon and Star rating */}
          <div className="tc-mobile-footer-wrap">
            <div className="tc-mobile-google">
              <GoogleIcon />
            </div>

            <div className="tc-mobile-stars">
              {[...Array(t.stars || 5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

interface Props {
  testimonials: TestimonialItem[];
}

export default function TestimonialsCarousel({ testimonials }: Props) {
  const items = testimonials && testimonials.length > 0 ? testimonials : [];
  const CARDS_PER_PAGE = 2;
  const pageCount = Math.ceil(items.length / CARDS_PER_PAGE);
  const [page, setPage] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handleDragStart = (clientX: number) => {
    startXRef.current = clientX;
    isDraggingRef.current = true;
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const delta = startXRef.current - clientX;
    if (Math.abs(delta) < 30) return;
    if (delta > 0 && page < pageCount - 1) setPage((p) => p + 1);
    if (delta < 0 && page > 0) setPage((p) => p - 1);
  };

  const visibleItems = items.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

  return (
    <div className="tc-mobile-wrapper">
      {items.length <= CARDS_PER_PAGE ? (
        <div className="tc-mobile-static">
          {items.map((t, i) => (
            <TestimonialCard key={t.id ?? i} t={t} />
          ))}
        </div>
      ) : (
        <div className="tc-mobile-carousel">
          <div
            ref={trackRef}
            className="tc-mobile-page"
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseUp={(e) => handleDragEnd(e.clientX)}
          >
            {visibleItems.map((t, i) => (
              <TestimonialCard key={t.id ?? i} t={t} />
            ))}
            {visibleItems.length < CARDS_PER_PAGE && (
              <div className="tc-mobile-filler" />
            )}
          </div>

          {pageCount > 1 && (
            <div className="tc-mobile-dots">
              {[...Array(pageCount)].map((_, i) => (
                <button
                  key={i}
                  className={`tc-mobile-dot${i === page ? " active" : ""}`}
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
