"use client";

import { useEffect } from "react";

export default function SplashScreen() {
  useEffect(() => {
    // Skip splash if navigating internally (not a fresh page load)
    if (sessionStorage.getItem("fitplate_nav")) {
      sessionStorage.removeItem("fitplate_nav");
      return;
    }

    const splashScreen = document.getElementById("splash-screen");
    if (!splashScreen) return;

    const wrapper = splashScreen.querySelector(".splash-logo-wrapper") as HTMLElement | null;
    if (!wrapper) return;

    // Lock scrolling while splash is visible
    document.body.classList.add("splash-active");

    const img = new Image();
    img.src = "/assets/logo.png";

    img.onload = () => {
      const W = img.width;
      const H = img.height;

      // Read pixel data from a hidden canvas
      const mainCanvas = document.createElement("canvas");
      mainCanvas.width = W;
      mainCanvas.height = H;
      const mainCtx = mainCanvas.getContext("2d")!;
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
        const ctx = c.getContext("2d")!;
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
    };

    img.onerror = () => {
      // Fallback: just show the full logo if canvas segmentation fails
      const fallback = document.createElement("img");
      fallback.src = "/assets/logo.png";
      fallback.className = "splash-fallback-logo";
      wrapper.appendChild(fallback);
    };

    // Add tagline
    const tagline = document.createElement("div");
    tagline.className = "splash-tagline";
    tagline.textContent = "Pure · Fresh · Nutritious";
    splashScreen.appendChild(tagline);

    // Fade out after ~5s and remove from DOM
    const fadeTimer = setTimeout(() => {
      splashScreen.classList.add("fade-out");
      document.body.classList.remove("splash-active");
      setTimeout(() => splashScreen.remove(), 1000);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      document.body.classList.remove("splash-active");
    };
  }, []);

  // Track internal link clicks so the splash is skipped on navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("http") &&
        !href.startsWith("mailto") &&
        !href.startsWith("tel")
      ) {
        sessionStorage.setItem("fitplate_nav", "1");
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div id="splash-screen">
      <div className="splash-logo-wrapper" />
    </div>
  );
}
