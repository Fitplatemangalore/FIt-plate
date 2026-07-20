"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

// Auth-only pages that should NOT show the sidebar
const AUTH_PATHS = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.includes(pathname);

  if (isAuthPage) {
    // Auth pages: full-screen, no sidebar
    return <>{children}</>;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
