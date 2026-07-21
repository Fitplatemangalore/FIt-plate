"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Skip splash if navigating internally (not a fresh session load)
    if (typeof window !== "undefined" && sessionStorage.getItem("fitplate_nav")) {
      setVisible(false);
      return;
    }

    // Lock scrolling while splash is active
    document.body.classList.add("splash-active");

    const wrapper = document.querySelector(".splash-logo-wrapper") as HTMLElement | null;
    if (!wrapper) return;

    const img = new Image();
    img.src = "/assets/logo.png";

    const showFallback = () => {
      if (wrapper && !wrapper.querySelector(".splash-fallback-logo")) {
        wrapper.innerHTML = "";
        const fallback = document.createElement("img");
        fallback.src = "/assets/logo.png";
        fallback.className = "splash-fallback-logo";
        wrapper.appendChild(fallback);
      }
    };

    img.onload = () => {
      try {
        const W = img.width;
        const H = img.height;

        if (!W || !H) {
          showFallback();
          return;
        }

        // Read pixel data from a hidden canvas
        const mainCanvas = document.createElement("canvas");
        mainCanvas.width = W;
        mainCanvas.height = H;
        const mainCtx = mainCanvas.getContext("2d");
        if (!mainCtx) {
          showFallback();
          return;
        }

        mainCtx.drawImage(img, 0, 0);
        const imgData = mainCtx.getImageData(0, 0, W, H);
        const data = imgData.data;

        // Colour classifiers (loose ranges for green and gold/yellow)
        const isGreen  = (r: number, g: number, b: number, a: number) => a > 10 && g > 30 && r < 100;
        const isYellow = (r: number, g: number, b: number, a: number) => a > 10 && r > 120 && g > 100;

        const CLASSES = [
          "green-curve",
          "yellow-curve",
          "letter-f",
          "letter-p",
          "tree-sprout",
          "splash-text",
        ];

        const canvases: HTMLCanvasElement[] = [];
        const ctxs: CanvasRenderingContext2D[] = [];
        const datas: ImageData[] = [];

        for (let i = 0; i < 6; i++) {
          const c = document.createElement("canvas");
          c.width = W;
          c.height = H;
          c.className = `splash-element ${CLASSES[i]}`;
          const ctx = c.getContext("2d");
          if (!ctx) {
            showFallback();
            return;
          }
          const d = ctx.createImageData(W, H);
          canvases.push(c);
          ctxs.push(ctx);
          datas.push(d);
        }

        // Segment each pixel to one of the 6 layer canvases
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            const idx = (y * W + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            if (a <= 10) continue;

            let targetIdx = -1;

            if (y > 550) {
              targetIdx = 5; // FIT PLATE text
            } else if (y >= 410 && y <= 550) {
              const isStem =
                isGreen(r, g, b, a) && x >= 305 && x <= 345 && y <= 490;
              if (isStem)              targetIdx = 4; // tree sprout stem
              else if (isGreen(r, g, b, a))  targetIdx = 0; // green curve
              else if (isYellow(r, g, b, a)) targetIdx = 1; // yellow curve
            } else {
              const isLeftLeaf  = isYellow(r, g, b, a) && x >= 190 && x <= 310 && y >= 240 && y <= 360;
              const isRightLeaf = isGreen(r, g, b, a)  && x >= 310 && x <= 440 && y >= 230 && y <= 360;
              const isUpperStem = isGreen(r, g, b, a)  && x >= 305 && x <= 345 && y >= 240;
              if (isLeftLeaf || isRightLeaf || isUpperStem) targetIdx = 4;
              else if (isGreen(r, g, b, a))  targetIdx = 2; // Letter F
              else if (isYellow(r, g, b, a)) targetIdx = 3; // Letter P
            }

            if (targetIdx !== -1) {
              const tData = datas[targetIdx].data;
              tData[idx]     = r;
              tData[idx + 1] = g;
              tData[idx + 2] = b;
              tData[idx + 3] = a;
            }
          }
        }

        // Commit each segmented layer into the DOM
        for (let i = 0; i < 6; i++) {
          ctxs[i].putImageData(datas[i], 0, 0);
          wrapper.appendChild(canvases[i]);
        }
      } catch (err) {
        console.warn("Splash animation error, using fallback logo:", err);
        showFallback();
      }
    };

    img.onerror = () => {
      showFallback();
    };

    // Fade out after ~4.5s and unmount safely using React state (no direct element.remove())
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      document.body.classList.remove("splash-active");
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("fitplate_nav", "1");
      }, 1000);
    }, 4500);

    return () => {
      clearTimeout(fadeTimer);
      document.body.classList.remove("splash-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="splash-screen" className={isFading ? "fade-out" : ""}>
      <div className="splash-logo-wrapper" />
      <div className="splash-tagline">Pure · Fresh · Nutritious</div>
    </div>
  );
}
