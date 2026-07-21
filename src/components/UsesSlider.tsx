"use client";

import { useEffect, useState } from "react";

interface Slide {
  title: string;
  description: string;
  main_image_url: string;
}

const defaultSlides: Slide[] = [
  {
    title: "Add to Salads",
    description:
      "A crisp medley of mixed greens topped with a delicate handful of fresh microgreens, adding a burst of color, peppery notes, and a nutrient-rich finish. Tossed with your choice of vegetables/toppings and a light vinaigrette for a fresh, vibrant bite. Type of microgreens matters for flavor — radish and mustard microgreens are peppery and bold, pea shoots are sweet and mild, broccoli microgreens are slightly bitter/earthy, and sunflower microgreens are nutty.",
    main_image_url: "/assets/uses/img1.png",
  },
  {
    title: "Blend into Smoothies & Juices",
    description:
      "Supercharge your morning drinks. Blend a handful of purple kale or broccoli microgreens into your green smoothies or cold-pressed juices for an effortless boost of vitamins, minerals, and antioxidants.",
    main_image_url: "/assets/uses/img2.png",
  },
  {
    title: "Gourmet Garnish for Main Courses",
    description:
      "Elevate every dish from simple home cooking to restaurant quality. A delicate scatter of radish or red cabbage microgreens adds vibrant color, crisp micro-texture, and fine culinary flair to grilled meats, pasta, and seafood.",
    main_image_url: "/assets/uses/img1.png",
  },
];

export default function UsesSlider({ slides }: { slides?: Slide[] }) {
  // Support up to 5 slides
  const activeSlides =
    slides && slides.length > 0 ? slides.slice(0, 5) : defaultSlides;

  const [activeUsesIdx, setActiveUsesIdx] = useState(0);

  useEffect(() => {
    let usesTimer: NodeJS.Timeout | null = null;
    let currentIdx = activeUsesIdx;

    const startUsesAutoplay = () => {
      stopUsesAutoplay();
      if (activeSlides.length <= 1) return;
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
      const cornerImg = document.querySelector(
        ".uses-corner-image"
      ) as HTMLImageElement;

      if (usesInfoBlock) usesInfoBlock.classList.add("fade-out");
      if (cornerImg) cornerImg.classList.add("fade-out");

      const outgoingMain = document.getElementById(`uses-main-img-${currentIdx}`);
      const incomingMain = document.getElementById(`uses-main-img-${idx}`);

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
          cornerImg.src = activeSlides[nextCornerIdx].main_image_url;
          cornerImg.classList.remove("fade-out");
        }
      }, 600);
    };

    startUsesAutoplay();

    // Attach dot click handlers
    const dots = document.querySelectorAll(".uses-dot");
    const onDotClick = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const idx = parseInt(target.dataset.index || "0", 10);
      updateUsesSlide(idx);
      startUsesAutoplay();
    };

    dots.forEach((dot) => dot.addEventListener("click", onDotClick));

    return () => {
      stopUsesAutoplay();
      dots.forEach((dot) => dot.removeEventListener("click", onDotClick));
    };
  }, [activeSlides]);

  const nextCornerIdx = (activeUsesIdx + 1) % activeSlides.length;

  return (
    <section className="uses-section" id="uses">
      <img
        src="/assets/img/vec1.png"
        alt=""
        className="uses-organic-shape"
        aria-hidden="true"
      />

      <div className="container">
        <div className="uses-section-header reveal">
          <h2 className="uses-section-title">USES OF MICROGREEN</h2>
        </div>

        <div className="uses-grid">
          <div className="uses-info-wrapper reveal">
            <div className="uses-info" id="uses-info-block">
              <h3 id="uses-title">{activeSlides[activeUsesIdx]?.title}</h3>
              <p id="uses-description">
                {activeSlides[activeUsesIdx]?.description}
              </p>
            </div>

            {activeSlides.length > 1 && (
              <div className="uses-dots">
                {activeSlides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`uses-dot ${
                      idx === activeUsesIdx ? "active" : ""
                    }`}
                    data-index={idx}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="uses-visual-container reveal">
            {/* Corner preview image auto-pulls from next slide's main image */}
            <img
              src={activeSlides[nextCornerIdx]?.main_image_url}
              alt="Next slide preview"
              className="uses-corner-image"
            />

            <div className="uses-main-image-frame">
              {activeSlides.map((slide, idx) => (
                <img
                  key={idx}
                  src={slide.main_image_url}
                  alt={slide.title}
                  className={`uses-main-image ${
                    idx === activeUsesIdx ? "uses-img-center" : ""
                  }`}
                  id={`uses-main-img-${idx}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
