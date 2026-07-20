"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Only show splash on the home page or specific conditions
    if (sessionStorage.getItem("fitplate_nav")) {
      sessionStorage.removeItem("fitplate_nav");
      setShowSplash(false);
    } else {
      document.body.classList.add("splash-active");
      
      // Simulate splash screen duration since it was handled by CSS/JS
      const timer = setTimeout(() => {
        document.body.classList.remove("splash-active");
        setShowSplash(false);
      }, 2000); // 2 seconds

      return () => {
        clearTimeout(timer);
        document.body.classList.remove("splash-active");
      };
    }
  }, []);

  if (!showSplash) return null;

  return (
    <div id="splash-screen">
      <div className="splash-logo-wrapper"></div>
    </div>
  );
}
