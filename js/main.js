// ---------- Hero entrance animation ----------
// Double rAF ensures the browser has painted the hidden initial state
// (opacity: 0, offset transforms) before we add .hero-loaded to trigger transitions.
const heroContainer = document.querySelector('.hero-container');
if (heroContainer) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heroContainer.classList.add('hero-loaded');
      // Start the tray floating animation after the entrance transition completes (~1400ms)
      setTimeout(() => {
        const initialTray = document.querySelector('.tray-image');
        if (initialTray) {
          initialTray.classList.add('floating');
        }
      }, 1400);
    });
  });
}

// ---------- Header scroll state & Hero Parallax ----------
const header = document.querySelector('.site-header');
const heroBg = document.querySelector('.hero-bg');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');

  if (heroBg) {
    // Parallax effect: background moves slower than scroll speed
    const scrollOffset = window.scrollY * 0.35;
    heroBg.style.transform = `translate3d(0, ${scrollOffset}px, 0)`;
  }
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---------- Mobile nav ----------
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mainNav.classList.remove('open'))
  );
}

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--i', idx % 8);
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// ---------- Animated counters ----------
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target < 10 ? (target * eased).toFixed(1) : Math.round(target * eased);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => cio.observe(el));

// ---------- Current year ----------
document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

// ---------- Hero Carousel Slider ----------
const heroSlides = [
  {
    tray: 'assets/tray-1.png',
    bgText: 'BROCCOLI',
    leaves: [
      'assets/leaves-set-1-leaf-1.png',
      'assets/leaves-set-1-leaf-2.png',
      'assets/leaves-set-1-leaf-3.png',
      'assets/leaves-set-1-leaf-4.png'
    ]
  },
  {
    tray: 'assets/tray-2.png',
    bgText: 'PURPLE KALE',
    leaves: [
      'assets/leaves-set-2-leaf-1.png',
      'assets/leaves-set-2-leaf-2.png',
      'assets/leaves-set-2-leaf-3.png',
      'assets/leaves-set-2-leaf-4.png'
    ]
  },
  {
    tray: 'assets/tray-3.png',
    bgText: 'SPINACH',
    leaves: [
      'assets/leaves-set-3-leaf-1.png',
      'assets/leaves-set-3-leaf-2.png',
      'assets/leaves-set-3-leaf-3.png',
      'assets/leaves-set-3-leaf-4.png'
    ]
  },
  {
    tray: 'assets/tray-4.png',
    bgText: 'BEETROOT',
    leaves: [
      'assets/leaves-set-4-leaf-1.png',
      'assets/leaves-set-4-leaf-2.png',
      'assets/leaves-set-4-leaf-3.png',
      'assets/leaves-set-4-leaf-4.png'
    ]
  }
];

// Preload static tray and leaf images to avoid transition lag
const preloadImages = (urls) => urls.forEach(url => { new Image().src = url; });
const allAssetsToPreload = [];
heroSlides.forEach(slide => {
  allAssetsToPreload.push(slide.tray);
  slide.leaves.forEach(leaf => allAssetsToPreload.push(leaf));
});
preloadImages(allAssetsToPreload);

// ── State ─────────────────────────────────────────────────────────────────────
let currentSlideIdx = 0;
let isHeroAnimating = false;
let heroAutoPlayTimer = null;

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let trayImg = document.querySelector('.tray-image'); // Changed to let so we can update reference
const bgTextEl = document.querySelector('.hero-bg-text');
const leafEls = document.querySelectorAll('.hero-leaf');

// ── Responsive bg-text font sizing ───────────────────────────────────────────
// Keeps the bg text on a single line by scaling its font-size down if it
// overflows the hero container. "clamp(55px, 14vw, 155px)" is treated as the
// ceiling — for short names like BROCCOLI nothing changes; for longer names
// like PURPLE KALE it shrinks to fit.
const fitBgText = () => {
  if (!bgTextEl) return;

  const container = document.querySelector('.hero-visual-center') || document.querySelector('.hero-visual-wrapper');
  if (!container) return;

  const maxPx = Math.min(155, window.innerWidth * 0.14); // mirrors clamp(55px, 14vw, 155px)
  const minPx = 38; // absolute floor — never go smaller than this

  // 1. Reset to ceiling, measure overflow (suppress transition during measure)
  bgTextEl.style.transition = 'none';
  bgTextEl.style.fontSize = `${maxPx}px`;

  // Force reflow so scrollWidth reflects the new fontSize
  void bgTextEl.scrollWidth;

  const available = container.offsetWidth * 0.96; // 96% of container width
  const actual = bgTextEl.scrollWidth;

  if (actual > available) {
    const scaled = Math.max(minPx, (available / actual) * maxPx);
    bgTextEl.style.fontSize = `${scaled}px`;
  }

  // Restore transition after one frame so font-size change doesn't animate
  requestAnimationFrame(() => {
    bgTextEl.style.transition = '';
  });
};

// Run on load and whenever the viewport resizes
if (bgTextEl) {
  window.addEventListener('resize', fitBgText);
}

// ── Slide transition ──────────────────────────────────────────────────────────
const updateHeroSlide = (nextIndex, direction = 'next') => {
  if (isHeroAnimating || !trayImg || !bgTextEl || leafEls.length === 0) return;
  isHeroAnimating = true;

  const exitClass = direction === 'next' ? 'exit-up' : 'exit-down';
  const enterClass = direction === 'next' ? 'enter-from-above' : 'enter-from-below';

  const toSlide = heroSlides[nextIndex];

  const container = document.querySelector('.tray-image-container');
  const oldTrayImg = trayImg;

  // 1. Immediately (0ms):
  // - Start old tray exiting to left
  // - Start background text fading out
  // - Create new tray off-screen top-right (enter-prepare) and append it
  oldTrayImg.classList.add('exit-left');
  oldTrayImg.classList.remove('active'); // in case it was active
  oldTrayImg.classList.remove('floating'); // stop floating animation during exit

  bgTextEl.classList.add('fade-out');

  const newTrayImg = document.createElement('img');
  newTrayImg.src = toSlide.tray;
  newTrayImg.alt = `${toSlide.bgText} tray`;
  newTrayImg.className = 'tray-image enter-prepare';
  container.appendChild(newTrayImg);

  // Force reflow so browser registers the enter-prepare position
  void newTrayImg.offsetWidth;

  // 2. At 250ms (Overlap point):
  // - Swap background text content and fade it back in
  // - Start new tray entrance animation (remove enter-prepare, add active)
  setTimeout(() => {
    bgTextEl.textContent = toSlide.bgText;
    fitBgText(); // Re-scale font to fit new text on one line
    bgTextEl.classList.remove('fade-out');

    newTrayImg.classList.remove('enter-prepare');
    newTrayImg.classList.add('active');
  }, 250);

  // 3. At 750ms:
  // - Old tray exit is complete (750ms duration) -> Remove it from DOM
  setTimeout(() => {
    oldTrayImg.remove();
  }, 750);

  // 4. At 1250ms:
  // - New tray entrance is complete (250ms delay + 1000ms animation)
  // - Start leaf exit transition
  // - Start floating animation loop on the new active tray
  setTimeout(() => {
    leafEls.forEach(leaf => leaf.classList.add(exitClass));
    newTrayImg.classList.add('floating');
  }, 1250);

  // 5. At 2050ms:
  // - Leaves have finished exiting (800ms exit transition)
  // - Swap leaf image sources and transition new leaves in
  setTimeout(() => {
    leafEls.forEach((leaf, idx) => {
      leaf.src = toSlide.leaves[idx];

      // Remove exit class, apply direction-aware enter-prepare instantly
      leaf.classList.remove(exitClass);
      leaf.classList.add(enterClass);
      void leaf.offsetWidth;             // force reflow

      // Remove enter class → transition to resting position
      leaf.classList.remove(enterClass);
    });

    trayImg = newTrayImg; // Update global reference to the new active element
    currentSlideIdx = nextIndex;
    isHeroAnimating = false;
  }, 2050);
};

const nextSlide = () => {
  const nextIdx = (currentSlideIdx + 1) % heroSlides.length;
  updateHeroSlide(nextIdx, 'next');
};

const prevSlide = () => {
  const prevIdx = (currentSlideIdx - 1 + heroSlides.length) % heroSlides.length;
  updateHeroSlide(prevIdx, 'prev');
};

const startHeroAutoPlay = () => {
  stopHeroAutoPlay();
  heroAutoPlayTimer = setInterval(nextSlide, 2000);
};

const stopHeroAutoPlay = () => {
  if (heroAutoPlayTimer) {
    clearInterval(heroAutoPlayTimer);
    heroAutoPlayTimer = null;
  }
};

// Bind navigation arrows
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    startHeroAutoPlay(); // Reset timer on manual click
  });
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startHeroAutoPlay(); // Reset timer on manual click
  });
}

// Start auto-play on load if carousel exists
if (trayImg) {
  startHeroAutoPlay();
}

// Size the initial bg-text once fonts are likely loaded
// (hero-loaded class is added ~1s after DOMContentLoaded by the entrance animation)
document.addEventListener('DOMContentLoaded', () => {
  // Delay slightly so Boldonse font has time to load and layout is stable
  setTimeout(fitBgText, 600);
});

// ---------- Section 2: Features Strip — 3D zoom-in on upward scroll ----------
// Default state: no transforms applied. The section sits at full size, 100% opacity.
// As the user scrolls DOWN (section exits upward), a perspective scale is applied
// giving a dramatic 3D zoom-in feel — like the strip is surging toward the camera.
const featuresStrip = document.querySelector('.features-strip');
if (featuresStrip) {
  const onFeaturesScroll = () => {
    const rect = featuresStrip.getBoundingClientRect();
    const vh = window.innerHeight;

    // --- Case 1: Section is fully below or at its natural position in the viewport ---
    // rect.top >= 0 means section top is still visible or below fold → no effect
    if (rect.top >= 0) {
      featuresStrip.style.transform = 'none';
      return;
    }

    // --- Case 2: Section is scrolling upward (rect.top < 0) ---
    // progress: 0 = section top just hit viewport top, 1 = section has fully left upward
    const scrolledPast = -rect.top;            // px above viewport top
    const sectionH = featuresStrip.offsetHeight;
    const progress = Math.min(1, scrolledPast / sectionH);

    // 3D zoom: scale from 1.0 → 1.14 with a perspective depth for the "surging" feel
    const scale = 1 + (progress * 0.14);
    featuresStrip.style.transform = `perspective(700px) scale3d(${scale}, ${scale}, 1)`;
  };

  // Run once immediately in case page is loaded mid-scroll
  onFeaturesScroll();
  window.addEventListener('scroll', onFeaturesScroll, { passive: true });
}


// ---------- Section 5: Uses of Microgreens Horizontal Slider ----------
const usesSlides = [
  {
    title: "Add to Salads",
    desc: "A crisp medley of mixed greens topped with a delicate handful of fresh microgreens, adding a burst of color, peppery notes, and a nutrient-rich finish. Tossed with your choice of vegetables/toppings and a light vinaigrette for a fresh, vibrant bite. Type of microgreens matters for flavor — radish and mustard microgreens are peppery and bold, pea shoots are sweet and mild, broccoli microgreens are slightly bitter/earthy, and sunflower microgreens are nutty."
  },
  {
    title: "Blend into Smoothies & Juices",
    desc: "Supercharge your morning drinks. Blend a handful of purple kale microgreens into your green smoothies or cold-pressed juices for an effortless boost of vitamins, minerals, and antioxidants."
  }
];

let activeUsesIdx = 0;
let usesTimer = null;
const usesInfoBlock = document.getElementById('uses-info-block');
const usesTitle = document.getElementById('uses-title');
const usesDesc = document.getElementById('uses-description');
const usesDots = document.querySelectorAll('.uses-dot');

const applySlideClass = (el, targetClass) => {
  if (!el) return;
  el.classList.remove('uses-img-left', 'uses-img-center', 'uses-img-right');
  if (targetClass) el.classList.add(targetClass);
};

const updateUsesSlide = (idx) => {
  if (idx === activeUsesIdx) return;

  // Transition text block and corner preview (fade out)
  if (usesInfoBlock) {
    usesInfoBlock.classList.add('fade-out');
  }
  const cornerImg = document.querySelector('.uses-corner-image');
  if (cornerImg) {
    cornerImg.classList.add('fade-out');
  }

  // Update Dots
  usesDots.forEach((dot, dIdx) => {
    dot.classList.toggle('active', dIdx === idx);
  });

  const mainImg0 = document.getElementById('uses-main-img-0');
  const mainImg1 = document.getElementById('uses-main-img-1');

  const outgoingMain = activeUsesIdx === 0 ? mainImg0 : mainImg1;
  const incomingMain = idx === 0 ? mainImg0 : mainImg1;

  // 1. Move incoming images to the right WITHOUT transition
  [incomingMain].forEach(el => {
    if (el) {
      el.classList.add('no-transition');
      applySlideClass(el, 'uses-img-right');
    }
  });

  // Force reflow so the 'no-transition' position is applied immediately
  if (incomingMain) void incomingMain.offsetWidth;

  // 2. Remove 'no-transition' and apply sliding classes
  [incomingMain].forEach(el => {
    if (el) {
      el.classList.remove('no-transition');
      applySlideClass(el, 'uses-img-center'); // Slides in from right to center
    }
  });

  [outgoingMain].forEach(el => {
    if (el) applySlideClass(el, 'uses-img-left'); // Slides out from center to left
  });

  setTimeout(() => {
    const slide = usesSlides[idx];
    if (usesTitle) usesTitle.textContent = slide.title;
    if (usesDesc) usesDesc.textContent = slide.desc;

    if (usesInfoBlock) {
      usesInfoBlock.classList.remove('fade-out');
    }

    // Update corner preview to show the next slide's image
    if (cornerImg) {
      const nextIdx = (idx + 1) % usesSlides.length;
      cornerImg.src = nextIdx === 0 ? 'assets/uses/img1.png' : 'assets/uses/img2.png';
      cornerImg.classList.remove('fade-out');
    }

    activeUsesIdx = idx;
  }, 600); // match transition duration
};

const startUsesAutoplay = () => {
  stopUsesAutoplay();
  usesTimer = setInterval(() => {
    const nextIdx = (activeUsesIdx + 1) % usesSlides.length;
    updateUsesSlide(nextIdx);
  }, 4500); // slide every 4.5 seconds
};

const stopUsesAutoplay = () => {
  if (usesTimer) {
    clearInterval(usesTimer);
    usesTimer = null;
  }
};

// Bind events to dots
usesDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = parseInt(dot.getAttribute('data-index'), 10);
    updateUsesSlide(idx);
    startUsesAutoplay(); // Reset autoplay timer on click
  });
});

// Initialize autoplay
startUsesAutoplay();

// Ensure corner preview shows the correct next-slide image on initial load
(function initCornerPreview() {
  const cornerImg = document.querySelector('.uses-corner-image');
  if (!cornerImg) return;
  const nextIdx = (activeUsesIdx + 1) % usesSlides.length;
  const images = ['assets/uses/img1.png', 'assets/uses/img2.png'];
  cornerImg.src = images[nextIdx];
})();

// ---------- Premium Splash Screen Segmentation & Animation ----------
// ── Global nav-click tracker (runs on every page) ─────────────────────────────
// Before following any internal link, mark the session so index.html knows
// the visitor arrived via navigation (not a refresh) and hides the splash.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  // Internal relative links only (skip anchors, mailto, tel, external URLs)
  if (href && !href.startsWith('#') && !href.startsWith('http') &&
      !href.startsWith('mailto') && !href.startsWith('tel')) {
    sessionStorage.setItem('fitplate_nav', '1');
  }
});

(function initSplash() {
  // splash-screen element only exists on index.html
  const splashScreen = document.getElementById('splash-screen');
  if (!splashScreen) return; // not on index.html — nothing to do

  const wrapper = splashScreen.querySelector('.splash-logo-wrapper');
  if (!wrapper) return;

  const img = new Image();
  img.src = 'assets/logo.png';
  img.onload = () => {
    const W = img.width;
    const H = img.height;

    // Create hidden canvas to read pixel data
    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = W;
    mainCanvas.height = H;
    const mainCtx = mainCanvas.getContext('2d');
    mainCtx.drawImage(img, 0, 0);
    const imgData = mainCtx.getImageData(0, 0, W, H);
    const data = imgData.data;

    // Helper functions to identify pixel colors (using ranges for green and gold/yellow)
    const isGreen = (r, g, b, a) => a > 10 && g > 30 && r < 100;
    const isYellow = (r, g, b, a) => a > 10 && r > 120 && g > 100;

    const CLASSES = [
      'green-curve',
      'yellow-curve',
      'letter-f',
      'letter-p',
      'tree-sprout',
      'splash-text'
    ];

    const canvases = [];
    const ctxs = [];
    const datas = [];

    // Create 6 transparent canvases for the segmented parts
    for (let i = 0; i < 6; i++) {
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      c.className = `splash-element ${CLASSES[i]}`;
      const ctx = c.getContext('2d');
      const d = ctx.createImageData(W, H);
      canvases.push(c);
      ctxs.push(ctx);
      datas.push(d);
    }

    // Segment pixels based on coordinates and color values
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (y * W + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        if (a <= 10) continue;

        let targetIdx = -1;

        // 1. Text: y > 550
        if (y > 550) {
          targetIdx = 5; // FIT PLATE Text
        }
        // 2. Bottom Curves: y: [410, 550] (except sprout stem)
        else if (y >= 410 && y <= 550) {
          const isStem = isGreen(r, g, b, a) && x >= 305 && x <= 345 && y <= 490;
          if (isStem) {
            targetIdx = 4; // Tree Sprout
          } else if (isGreen(r, g, b, a)) {
            targetIdx = 0; // Green Curve
          } else if (isYellow(r, g, b, a)) {
            targetIdx = 1; // Yellow Curve
          }
        }
        // 3. Letters & Sprout: y < 410
        else {
          const isLeftLeaf = isYellow(r, g, b, a) && x >= 190 && x <= 310 && y >= 240 && y <= 360;
          const isRightLeaf = isGreen(r, g, b, a) && x >= 310 && x <= 440 && y >= 230 && y <= 360;
          const isUpperStem = isGreen(r, g, b, a) && x >= 305 && x <= 345 && y >= 240;

          if (isLeftLeaf || isRightLeaf || isUpperStem) {
            targetIdx = 4; // Tree Sprout
          } else if (isGreen(r, g, b, a)) {
            targetIdx = 2; // Letter F
          } else if (isYellow(r, g, b, a)) {
            targetIdx = 3; // Letter P
          }
        }

        if (targetIdx !== -1) {
          const tData = datas[targetIdx].data;
          tData[idx] = r;
          tData[idx + 1] = g;
          tData[idx + 2] = b;
          tData[idx + 3] = a;
        }
      }
    }

    // Write the segmented data to canvases and append to wrapper
    for (let i = 0; i < 6; i++) {
      ctxs[i].putImageData(datas[i], 0, 0);
      wrapper.appendChild(canvases[i]);
    }
  };

  // Fade out splash screen after 5 seconds and enable scrolling
  setTimeout(() => {
    splashScreen.classList.add('fade-out');
    document.body.classList.remove('splash-active');
    // No sessionStorage flag needed — refresh will naturally show splash again
    // Remove element after fade animation finishes to keep DOM clean
    setTimeout(() => splashScreen.remove(), 1000);
  }, 5000);
})();


