const fs = require('fs');

let txt = fs.readFileSync('src/components/UrbanTestimonials.tsx', 'utf8');

// The replacement strategy for UrbanTestimonials
const replacement = `
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
        const next = p + 1;
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

  // Handle seamless loop jump back
  useEffect(() => {
    if (!isMobile) return;
    if (page === testimonials.length) {
      const timer = setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: "auto" });
        }
        setPage(0);
      }, 600); // Wait for smooth scroll to finish
      return () => clearTimeout(timer);
    }
  }, [page, isMobile, testimonials.length]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const el = e.currentTarget;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    // Don't setPage if we are snapping back
    if (index !== testimonials.length) {
      setPage(index);
    }
  };
  
  // On mobile, duplicate the first testimonial at the end for the seamless loop effect
  const visibleItems = isMobile 
    ? [...testimonials, { ...testimonials[0], id: testimonials[0].id + "_clone" }]
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
`;

txt = txt.replace(/const \[page, setPage\] = useState\(0\);[\s\S]*?const handleDotClick = \([\s\S]*?};\s*/, replacement.trim() + '\n');

// Make sure the dot active class uses page % testimonials.length
txt = txt.replace(/page === idx \? "active"/g, '(page % testimonials.length) === idx ? "active"');

fs.writeFileSync('src/components/UrbanTestimonials.tsx', txt);
console.log('done');
