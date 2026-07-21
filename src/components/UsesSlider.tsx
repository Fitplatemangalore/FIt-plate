"use client";

import { useEffect, useRef, useState } from "react";

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

// Position state for each image slot
type SlidePos = "left" | "center" | "right" | "hidden";

export default function UsesSlider({ slides }: { slides?: Slide[] }) {
  const activeSlides =
    slides && slides.length > 0 ? slides.slice(0, 5) : defaultSlides;

  const count = activeSlides.length;

  // Track the active slide index
  const [activeIdx, setActiveIdx] = useState(0);
  // Track which slide is currently transitioning out (so we hold its position during animation)
  const [outgoingIdx, setOutgoingIdx] = useState<number | null>(null);
  // Info block fade
  const [infoVisible, setInfoVisible] = useState(true);
  // Corner image
  const [cornerSrc, setCornerSrc] = useState(
    activeSlides[(1) % count]?.main_image_url
  );
  const [cornerVisible, setCornerVisible] = useState(true);

  const activeIdxRef = useRef(activeIdx);
  const outgoingIdxRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);

  const getPos = (idx: number): SlidePos => {
    if (idx === activeIdx) return "center";
    if (idx === outgoingIdx) return "left";
    return "hidden";
  };

  const goTo = (nextIdx: number) => {
    const currentIdx = activeIdxRef.current;
    if (nextIdx === currentIdx || isTransitioningRef.current) return;

    isTransitioningRef.current = true;

    // Fade info and corner out
    setInfoVisible(false);
    setCornerVisible(false);

    // Set outgoing so it slides left, incoming slides in from right
    setOutgoingIdx(currentIdx);
    outgoingIdxRef.current = currentIdx;

    // Move new slide to center (incoming from right via CSS default)
    setActiveIdx(nextIdx);
    activeIdxRef.current = nextIdx;

    // After transition completes, clear outgoing
    setTimeout(() => {
      setOutgoingIdx(null);
      outgoingIdxRef.current = null;
      isTransitioningRef.current = false;

      // Update info and corner
      setInfoVisible(true);
      setCornerSrc(activeSlides[(nextIdx + 1) % count]?.main_image_url);
      setCornerVisible(true);
    }, 650);
  };

  // Autoplay
  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      const next = (activeIdxRef.current + 1) % count;
      goTo(next);
    }, 4500);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

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
            <div
              className={`uses-info${infoVisible ? "" : " fade-out"}`}
              id="uses-info-block"
            >
              <h3 id="uses-title">{activeSlides[activeIdx]?.title}</h3>
              <p id="uses-description">
                {activeSlides[activeIdx]?.description}
              </p>
            </div>

            {count > 1 && (
              <div className="uses-dots">
                {activeSlides.map((_, idx) => (
                  <div
                    key={idx}
                    className={`uses-dot${idx === activeIdx ? " active" : ""}`}
                    data-index={idx}
                    onClick={() => goTo(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="uses-visual-container reveal">
            {/* Corner preview image */}
            <img
              src={cornerSrc}
              alt="Next slide preview"
              className={`uses-corner-image${cornerVisible ? "" : " fade-out"}`}
            />

            <div className="uses-main-image-frame">
              {activeSlides.map((slide, idx) => {
                const pos = getPos(idx);
                let posClass = "";
                if (pos === "center") posClass = " uses-img-center";
                else if (pos === "left") posClass = " uses-img-left";
                // "hidden" = default CSS (translateX(150%) off-right, invisible)
                return (
                  <img
                    key={idx}
                    src={slide.main_image_url}
                    alt={slide.title}
                    className={`uses-main-image${posClass}`}
                    id={`uses-main-img-${idx}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
