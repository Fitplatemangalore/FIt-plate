"use client";

import { useState } from "react";

export interface UrbanTestimonialItem {
  id: string | number;
  name: string;
  role: string;
  quote: string;
  stars?: number;
  link?: string;
}

const defaultTestimonials: UrbanTestimonialItem[] = [
  {
    id: "t-1",
    name: "Preksha",
    role: "Individual Consumer",
    quote:
      "I recently tried their urban vertical farming produce and was genuinely impressed with the freshness and quality. They were crisp, vibrant, and clearly harvested with care. There's a great variety to choose from,",
    stars: 5,
    link: "https://maps.google.com/?q=Fitplate+Ventures+Mangalore",
  },
  {
    id: "t-2",
    name: "Harshida",
    role: "Individual Consumer",
    quote: "Quality produce, neat packaging, and great service",
    stars: 5,
    link: "https://maps.google.com/?q=Fitplate+Ventures+Mangalore",
  },
  {
    id: "t-3",
    name: "Gayathri",
    role: "Individual Consumer",
    quote: "Great product, great addition to my daily diet.",
    stars: 5,
    link: "https://maps.google.com/?q=Fitplate+Ventures+Mangalore",
  },
];

function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.483 0-6.312-2.829-6.312-6.312 0-3.483 2.829-6.312 6.312-6.312 1.624 0 3.097.621 4.225 1.63l3.24-3.24C19.336 2.222 15.992 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.24-4.553 11.24-11.24 0-.761-.077-1.498-.216-2.185H12.24z" />
    </svg>
  );
}

function UserAvatar() {
  return (
    <div className="uv-t-avatar">
      <svg viewBox="0 0 24 24" fill="none" stroke="#022A7C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
}

export default function UrbanTestimonials({ items }: { items?: UrbanTestimonialItem[] }) {
  const testimonials = items && items.length > 0 ? items : defaultTestimonials;
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  const toggleExpand = (e: React.MouseEvent, id: string | number) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="uv-testimonials-wrapper">
      <div className="uv-testimonials-grid">
        {testimonials.map((item) => {
          const isLong = item.quote.length > 130;
          const isExpanded = expandedId === item.id;
          const displayText = isLong && !isExpanded ? `${item.quote.slice(0, 130)}...` : item.quote;

          return (
            <a
              key={item.id}
              href={item.link || "https://maps.google.com/?q=Fitplate+Ventures+Mangalore"}
              target="_blank"
              rel="noopener noreferrer"
              className="uv-testimonial-card-link"
            >
              <div className="uv-testimonial-card">
                {/* Header: Avatar + Name + Role */}
                <div className="uv-t-header">
                  <UserAvatar />
                  <div className="uv-t-info">
                    <h3 className="uv-t-name">{item.name}</h3>
                    <span className="uv-t-role">{item.role}</span>
                  </div>
                </div>

                {/* Body Quote */}
                <div className="uv-t-quote-box">
                  <p className="uv-t-quote">
                    &ldquo;{displayText}&rdquo;
                    {isLong && (
                      <button
                        type="button"
                        className="uv-t-readmore"
                        onClick={(e) => toggleExpand(e, item.id)}
                      >
                        {isExpanded ? " Read less" : " Read more"}
                      </button>
                    )}
                  </p>
                </div>

                {/* Footer: Stars + Google Badge */}
                <div className="uv-t-footer">
                  <div className="uv-t-stars">
                    {[...Array(item.stars || 5)].map((_, idx) => (
                      <svg key={idx} viewBox="0 0 24 24" fill="#F4C542" width="18" height="18">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <div className="uv-t-google">
                    <GoogleIcon />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
