"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // Admin pages get a plain body — their own layout.tsx handles the shell
    return <>{children}</>;
  }

  return (
    <>
      <SplashScreen />
      <ScrollAnimations />
      <Header />
      {children}
      <Footer />
    </>
  );
}
