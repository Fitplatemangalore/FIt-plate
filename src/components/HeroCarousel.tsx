"use client";

import { useEffect, useRef, useState } from "react";

interface Slide {
  tray: string;
  bgText: string;
  leaves: string[];
}

const defaultSlides: Slide[] = [
  {
    tray: "/assets/tray-1.png",
    bgText: "BROCCOLI",
    leaves: [
      "/assets/leaves-set-1-leaf-1.png",
      "/assets/leaves-set-1-leaf-2.png",
      "/assets/leaves-set-1-leaf-3.png",
      "/assets/leaves-set-1-leaf-4.png",
    ],
  },
  {
    tray: "/assets/tray-2.png",
    bgText: "PURPLE KALE",
    leaves: [
      "/assets/leaves-set-2-leaf-1.png",
      "/assets/leaves-set-2-leaf-2.png",
      "/assets/leaves-set-2-leaf-3.png",
      "/assets/leaves-set-2-leaf-4.png",
    ],
  },
  {
    tray: "/assets/tray-3.png",
    bgText: "SPINACH",
    leaves: [
      "/assets/leaves-set-3-leaf-1.png",
      "/assets/leaves-set-3-leaf-2.png",
      "/assets/leaves-set-3-leaf-3.png",
      "/assets/leaves-set-3-leaf-4.png",
    ],
  },
  {
    tray: "/assets/tray-4.png",
    bgText: "BEETROOT",
    leaves: [
      "/assets/leaves-set-4-leaf-1.png",
      "/assets/leaves-set-4-leaf-2.png",
      "/assets/leaves-set-4-leaf-3.png",
      "/assets/leaves-set-4-leaf-4.png",
    ],
  },
];

export default function HeroCarousel({ slides }: { slides?: Slide[] }) {
  const activeSlides = (slides && slides.length > 0 ? slides : defaultSlides).map((slide, idx) => ({
    tray: slide.tray || defaultSlides[idx % defaultSlides.length].tray,
    bgText: slide.bgText || defaultSlides[idx % defaultSlides.length].bgText,
    leaves: (slide.leaves && slide.leaves.length >= 4)
      ? slide.leaves
      : defaultSlides[idx % defaultSlides.length].leaves,
  }));
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const leafRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    // Preload tray and leaf images to avoid transition lag
    const preloadImages = (urls: string[]) => urls.forEach((url) => { new Image().src = url; });
    const allAssetsToPreload: string[] = [];
    activeSlides.forEach((slide) => {
      allAssetsToPreload.push(slide.tray);
      slide.leaves.forEach((leaf) => allAssetsToPreload.push(leaf));
    });
    preloadImages(allAssetsToPreload);
  }, [activeSlides]);

  useEffect(() => {
    // Hero entrance animation
    const heroContainer = document.querySelector(".hero-container");
    if (heroContainer) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          heroContainer.classList.add("hero-loaded");
          setTimeout(() => {
            const initialTray = document.querySelector(".tray-image");
            if (initialTray) {
              initialTray.classList.add("floating");
            }
          }, 1400);
        });
      });
    }

    // Responsive bg-text font sizing
    const fitBgText = () => {
      const bgTextEl = bgTextRef.current;
      const container = document.querySelector(".hero-visual-center") as HTMLElement;
      if (!bgTextEl || !container) return;

      const maxPx = Math.min(155, window.innerWidth * 0.14);
      const minPx = 38;

      bgTextEl.style.transition = "none";
      bgTextEl.style.fontSize = `${maxPx}px`;
      void bgTextEl.scrollWidth;

      const available = container.offsetWidth * 0.96;
      const actual = bgTextEl.scrollWidth;

      if (actual > available) {
        const scaled = Math.max(minPx, (available / actual) * maxPx);
        bgTextEl.style.fontSize = `${scaled}px`;
      }

      requestAnimationFrame(() => {
        bgTextEl.style.transition = "";
      });
    };

    fitBgText();
    window.addEventListener("resize", fitBgText);

    let currentSlideIdx = 0;
    let isHeroAnimating = false;
    let heroAutoPlayTimer: NodeJS.Timeout | null = null;
    let trayImg = document.querySelector(".tray-image") as HTMLImageElement;

    const updateHeroSlide = (nextIndex: number, direction: "next" | "prev" = "next") => {
      if (isHeroAnimating || !trayImg || !bgTextRef.current || leafRefs.current.length === 0) return;
      isHeroAnimating = true;

      const exitClass = direction === "next" ? "exit-up" : "exit-down";
      const enterClass = direction === "next" ? "enter-from-above" : "enter-from-below";

      const toSlide = activeSlides[nextIndex];
      const container = document.querySelector(".tray-image-container");
      const oldTrayImg = trayImg;
      const bgTextEl = bgTextRef.current;

      if (!container || !bgTextEl) return;

      oldTrayImg.classList.add("exit-left");
      oldTrayImg.classList.remove("active", "floating");
      bgTextEl.classList.add("fade-out");

      const newTrayImg = document.createElement("img");
      newTrayImg.src = toSlide.tray;
      newTrayImg.alt = `${toSlide.bgText} tray`;
      newTrayImg.className = "tray-image enter-prepare";
      container.appendChild(newTrayImg);

      void newTrayImg.offsetWidth;

      setTimeout(() => {
        bgTextEl.textContent = toSlide.bgText;
        fitBgText();
        bgTextEl.classList.remove("fade-out");
        newTrayImg.classList.remove("enter-prepare");
        newTrayImg.classList.add("active");
      }, 250);

      setTimeout(() => {
        oldTrayImg.remove();
      }, 750);

      setTimeout(() => {
        leafRefs.current.forEach((leaf) => leaf?.classList.add(exitClass));
        newTrayImg.classList.add("floating");
      }, 1250);

      setTimeout(() => {
        leafRefs.current.forEach((leaf, idx) => {
          if (leaf) {
            leaf.src = toSlide.leaves[idx];
            leaf.classList.remove(exitClass);
            leaf.classList.add(enterClass);
            void leaf.offsetWidth;
            leaf.classList.remove(enterClass);
          }
        });

        trayImg = newTrayImg;
        currentSlideIdx = nextIndex;
        isHeroAnimating = false;
      }, 2050);
    };

    const nextSlide = () => {
      const nextIdx = (currentSlideIdx + 1) % activeSlides.length;
      updateHeroSlide(nextIdx, "next");
    };

    const prevSlide = () => {
      const prevIdx = (currentSlideIdx - 1 + activeSlides.length) % activeSlides.length;
      updateHeroSlide(prevIdx, "prev");
    };

    const startHeroAutoPlay = () => {
      stopHeroAutoPlay();
      heroAutoPlayTimer = setInterval(nextSlide, 5000); // 5s instead of 2s because animation takes 2s
    };

    const stopHeroAutoPlay = () => {
      if (heroAutoPlayTimer) {
        clearInterval(heroAutoPlayTimer);
        heroAutoPlayTimer = null;
      }
    };

    startHeroAutoPlay();

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    const onPrev = () => { prevSlide(); startHeroAutoPlay(); };
    const onNext = () => { nextSlide(); startHeroAutoPlay(); };

    prevBtn?.addEventListener("click", onPrev);
    nextBtn?.addEventListener("click", onNext);

    return () => {
      window.removeEventListener("resize", fitBgText);
      stopHeroAutoPlay();
      prevBtn?.removeEventListener("click", onPrev);
      nextBtn?.removeEventListener("click", onNext);
    };
  }, [activeSlides]);

  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: "url('/assets/hero-bg.png')" }}></div>
      <div className="hero-overlay"></div>

      <div className="container hero-container" ref={containerRef}>
        <div className="hero-leaves-container">
          <img ref={(el) => { leafRefs.current[0] = el; }} src={activeSlides[0].leaves[0]} alt="Leaf" className="hero-leaf leaf-top-left" style={{ "--rot": "-25deg" } as React.CSSProperties} />
          <img ref={(el) => { leafRefs.current[1] = el; }} src={activeSlides[0].leaves[1]} alt="Leaf" className="hero-leaf leaf-mid-left" style={{ "--rot": "15deg" } as React.CSSProperties} />
          <img ref={(el) => { leafRefs.current[2] = el; }} src={activeSlides[0].leaves[2]} alt="Leaf" className="hero-leaf leaf-top-right" style={{ "--rot": "120deg" } as React.CSSProperties} />
          <img ref={(el) => { leafRefs.current[3] = el; }} src={activeSlides[0].leaves[3]} alt="Leaf" className="hero-leaf leaf-mid-right" style={{ "--rot": "-15deg" } as React.CSSProperties} />
        </div>

        <div className="hero-heading-wrapper">
          <h1 className="hero-title">
            <span className="title-line-1">PURE. FRESH. NUTRITIOUS.</span>
            <span className="title-line-2">MADE FOR A BETTER YOU.</span>
          </h1>
        </div>

        <div className="hero-visual-wrapper">
          <button className="hero-carousel-btn prev-btn" aria-label="Previous Variety">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <div className="hero-visual-center">
            <div className="hero-bg-text" ref={bgTextRef}>{activeSlides[0].bgText}</div>
            <div className="tray-image-container">
              <img src={activeSlides[0].tray} alt="Microgreens tray" className="tray-image active" />
            </div>
          </div>

          <button className="hero-carousel-btn next-btn" aria-label="Next Variety">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
