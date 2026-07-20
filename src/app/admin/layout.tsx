import type { Metadata } from "next";
import AdminSidebar from "@/components/AdminSidebar";

// Admin pages require runtime env vars (Supabase) — never statically prerender
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Fit Plate",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
