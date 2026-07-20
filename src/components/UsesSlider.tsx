"use client";

import { useEffect, useState } from "react";

interface Slide {
  title: string;
  description: string;
  main_image_url: string;
  corner_image_url: string;
}

const defaultSlides: Slide[] = [
  {
    title: "Add to Salads",
    description: "A crisp medley of mixed greens topped with a delicate handful of fresh microgreens, adding a burst of color, peppery notes, and a nutrient-rich finish. Tossed with your choice of vegetables/toppings and a light vinaigrette for a fresh, vibrant bite. Type of microgreens matters for flavor — radish and mustard microgreens are peppery and bold, pea shoots are sweet and mild, broccoli microgreens are slightly bitter/earthy, and sunflower microgreens are nutty.",
    main_image_url: "/assets/uses/img1.png",
    corner_image_url: "/assets/uses/img2.png",
  },
  {
    title: "Blend into Smoothies & Juices",
    description: "Supercharge your morning drinks. Blend a handful of purple kale microgreens into your green smoothies or cold-pressed juices for an effortless boost of vitamins, minerals, and antioxidants.",
    main_image_url: "/assets/uses/img2.png",
    corner_image_url: "/assets/uses/img1.png",
  },
];

export default function UsesSlider({ slides }: { slides?: Slide[] }) {
  // Ensure we have exactly 2 slides to fit the UI animations
  let activeSlides = slides && slides.length >= 2 ? slides.slice(0, 2) : defaultSlides;

  const [activeUsesIdx, setActiveUsesIdx] = useState(0);

  useEffect(() => {
    let usesTimer: NodeJS.Timeout | null = null;
    let currentIdx = 0;

    const startUsesAutoplay = () => {
      stopUsesAutoplay();
      usesTimer = setInterval(() => {
        const nextIdx = (currentIdx + 1) % activeSlides.length;
        updateUsesSlide(nextIdx);
      }, 4500);
    };

    const stopUsesAutoplay = () => {
      if (usesTimer) {
        clearInterval(usesTimer);
        usesTimer = null;
      }
    };

    const applySlideClass = (el: Element | null, targetClass: string) => {
      if (!el) return;
      el.classList.remove("uses-img-left", "uses-img-center", "uses-img-right");
      if (targetClass) el.classList.add(targetClass);
    };

    const updateUsesSlide = (idx: number) => {
      if (idx === currentIdx) return;

      const usesInfoBlock = document.getElementById("uses-info-block");
      const cornerImg = document.querySelector(".uses-corner-image") as HTMLImageElement;
      
      if (usesInfoBlock) usesInfoBlock.classList.add("fade-out");
      if (cornerImg) cornerImg.classList.add("fade-out");

      const mainImg0 = document.getElementById("uses-main-img-0");
      const mainImg1 = document.getElementById("uses-main-img-1");

      const outgoingMain = currentIdx === 0 ? mainImg0 : mainImg1;
      const incomingMain = idx === 0 ? mainImg0 : mainImg1;

      if (incomingMain) {
        incomingMain.classList.add("no-transition");
        applySlideClass(incomingMain, "uses-img-right");
        void (incomingMain as HTMLElement).offsetWidth;
        incomingMain.classList.remove("no-transition");
        applySlideClass(incomingMain, "uses-img-center");
      }

      if (outgoingMain) {
        applySlideClass(outgoingMain, "uses-img-left");
      }

      setTimeout(() => {
        setActiveUsesIdx(idx);
        currentIdx = idx;

        if (usesInfoBlock) usesInfoBlock.classList.remove("fade-out");
        if (cornerImg) {
          const nextCornerIdx = (idx + 1) % activeSlides.length;
          cornerImg.src = activeSlides[nextCornerIdx].corner_image_url;
          cornerImg.classList.remove("fade-out");
        }
      }, 600);
    };

    startUsesAutoplay();

    return () => {
      stopUsesAutoplay();
    };
  }, [activeSlides]);

  return (
    <section className="uses-section" id="uses">
      <img src="/assets/img/vec1.png" alt="" className="uses-organic-shape" aria-hidden="true" />

      <div className="container">
        <div className="uses-section-header reveal">
          <h2 className="uses-section-title">USES OF MICROGREEN</h2>
        </div>

        <div className="uses-grid">
          <div className="uses-info-wrapper reveal">
            <div className="uses-info" id="uses-info-block">
              <h3 id="uses-title">{activeSlides[activeUsesIdx].title}</h3>
              <p id="uses-description">{activeSlides[activeUsesIdx].description}</p>
            </div>

            <div className="uses-dots">
              {activeSlides.map((_, idx) => (
                <div
                  key={idx}
                  className={`uses-dot ${idx === activeUsesIdx ? "active" : ""}`}
                  data-index={idx}
                />
              ))}
            </div>
          </div>

          <div className="uses-visual-container reveal">
            <img src={activeSlides[(activeUsesIdx + 1) % activeSlides.length].corner_image_url} alt="" className="uses-corner-image" />

            <div className="uses-main-image-frame">
              <img
                src={activeSlides[0].main_image_url}
                alt={activeSlides[0].title}
                className="uses-main-image uses-img-center"
                id="uses-main-img-0"
              />
              <img
                src={activeSlides[1].main_image_url}
                alt={activeSlides[1].title}
                className="uses-main-image"
                id="uses-main-img-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
