import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import GalleryClient from "./GalleryClient";

export const revalidate = 60; // ISR: revalidate every 60s

interface GalleryImage {
  id: string;
  image_url: string;
  sort_order: number;
}

interface GalleryEntry {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  created_at: string;
  gallery_images: GalleryImage[];
}

export default async function GalleryPage() {
  const supabase = await createClient();

  // Fetch entries with nested images (server-side, bypasses RLS anon policy issues)
  const { data, error } = await supabase
    .from("gallery_entries")
    .select("*, gallery_images(id, image_url, sort_order)")
    .order("event_date", { ascending: false });

  let entries: GalleryEntry[] = (data as GalleryEntry[]) || [];

  if (error) {
    console.error("Gallery server fetch error:", error.message);
  }

  // Fallback: if nested images are empty, do a separate query
  const hasMissingImages = entries.some(
    (e) => !e.gallery_images || e.gallery_images.length === 0
  );

  if (hasMissingImages && entries.length > 0) {
    const entryIds = entries.map((e) => e.id);
    const { data: imgData } = await supabase
      .from("gallery_images")
      .select("id, entry_id, image_url, sort_order")
      .in("entry_id", entryIds)
      .order("sort_order", { ascending: true });

    if (imgData && imgData.length > 0) {
      const imageMap = new Map<string, GalleryImage[]>();
      imgData.forEach((img: any) => {
        const list = imageMap.get(img.entry_id) || [];
        list.push({ id: img.id, image_url: img.image_url, sort_order: img.sort_order ?? 0 });
        imageMap.set(img.entry_id, list);
      });

      entries = entries.map((entry) => ({
        ...entry,
        gallery_images:
          entry.gallery_images && entry.gallery_images.length > 0
            ? entry.gallery_images
            : imageMap.get(entry.id) || [],
      }));
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="page-hero" style={{ minHeight: "38vh" }}>
        <div className="hero-bg" style={{ backgroundImage: "url('/assets/img/gallery-hero-bg.jpg')" }}></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-text-card">
            <div className="crumbs"><Link href="/">Home</Link> / <span>Gallery</span></div>
            <div className="eyebrow">Our Moments</div>
            <h1>A glimpse into our growing world.</h1>
            <p>Events, harvests, and the people behind every tray.</p>
          </div>
        </div>
      </section>

      {/* Gallery Grid — interactive parts handled by client component */}
      <section className="section">
        <div className="container">
          <GalleryClient entries={entries} />
        </div>
      </section>
    </main>
  );
}
