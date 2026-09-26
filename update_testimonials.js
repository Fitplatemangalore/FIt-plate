const fs = require('fs');

const replacement = `import { useState, useEffect, useRef } from "react";

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
  {
    id: "t-4",
    name: "Ramesh",
    role: "Local Chef",
    quote: "The microgreens are incredibly fresh and flavorful. They elevate every dish we serve.",
    stars: 5,
    link: "https://maps.google.com/?q=Fitplate+Ventures+Mangalore",
  },
  {
    id: "t-5",
    name: "Sneha",
    role: "Fitness Enthusiast",
    quote: "I love the nutrient density! Perfect for my post-workout smoothies and salads.",
    stars: 5,
    link: "https://maps.google.com/?q=Fitplate+Ventures+Mangalore",
  },
];

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#fff" }}>
    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.483 0-6.312-2.829-6.312-6.312 0-3.483 2.829-6.312 6.312-6.312 1.624 0 3.097.621 4.225 1.63l3.24-3.24C19.336 2.222 15.992 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.24-4.553 11.24-11.24 0-.761-.077-1.498-.216-2.185H12.24z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function UrbanTestimonials({ items }: { items?: UrbanTestimonialItem[] }) {
  const testimonials = items && items.length > 0 ? items : defaultTestimonials;
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const CARDS_PER_PAGE = 4;
  const desktopTotalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE);
  const showSliderDesktop = desktopTotalPages > 1;
  
  const totalPages = isMobile ? testimonials.length : desktopTotalPages;
  const showSlider = isMobile ? true : showSliderDesktop;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setPage(p => {
        const next = (p + 1) % testimonials.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: next * scrollRef.current.clientWidth,
            behavior: "smooth"
          });
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile, testimonials.length]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const el = e.currentTarget;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setPage(index);
  };
  
  const visibleItems = isMobile 
    ? testimonials 
    : (showSliderDesktop 
        ? testimonials.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE) 
        : testimonials);

  const handleDotClick = (idx: number) => {
    setPage(idx);
    if (isMobile && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: idx * scrollRef.current.clientWidth,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="home-testimonials-container">
      <div 
        className="testimonials-grid" 
        ref={scrollRef} 
        onScroll={handleScroll}
      >
        {visibleItems.map((t, i) => (
          <a
            key={t.id}
            href={t.link || "https://maps.google.com/?q=Fitplate+Ventures+Mangalore"}
            target="_blank"
            rel="noopener noreferrer"
            className="testimonial-link-card"
          >
            <div className="testimonial-card">
              <div className="testimonial-user-row">
                <div className="testimonial-avatar">
                  <UserIcon />
                </div>
                <div className="testimonial-user-info">
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-stars">
                {[...Array(t.stars || 5)].map((_, starIdx) => (
                  <svg key={starIdx} viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <div className="testimonial-google-badge">
                <GoogleIcon />
              </div>
            </div>
          </a>
        ))}
      </div>

      {showSlider && (
        <div className="home-testimonials-pagination">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={\`home-testimonials-dot \${page === idx ? "active" : ""}\`}
              onClick={() => handleDotClick(idx)}
              aria-label={\`Go to page \${idx + 1}\`}
            />
          ))}
        </div>
      )}

      <style>{\`
        .home-testimonials-container {
          width: 100%;
        }
        .home-testimonials-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
        }
        .home-testimonials-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #cbd5e1;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
        }
        .home-testimonials-dot.active {
          background-color: var(--brand-primary, #022A7C);
          transform: scale(1.3);
        }
        
        @media (max-width: 900px) {
          .home-testimonials-container .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 600px) {
          .home-testimonials-container .testimonials-grid {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -ms-overflow-style: none;
            scrollbar-width: none;
            gap: 16px;
            scroll-behavior: smooth;
          }
          .home-testimonials-container .testimonials-grid::-webkit-scrollbar {
            display: none;
          }
          .testimonial-link-card {
            flex: 0 0 100%;
            width: 100%;
            scroll-snap-align: start;
          }
          /* Show slider on mobile! */
          .home-testimonials-pagination {
            display: flex;
          }
        }
      \`}</style>
    </div>
  );
}
`;

fs.writeFileSync('src/components/UrbanTestimonials.tsx', replacement);
