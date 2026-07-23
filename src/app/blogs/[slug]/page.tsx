import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { defaultBlogs, BlogData } from "@/data/blogs";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string): Promise<BlogData | null> {
  const supabase = await createClient();

  // Query Supabase by slug or id, avoiding Postgres type errors by checking if slug is a valid UUID or number
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
  const isNumber = /^\d+$/.test(slug);
  
  let query = supabase.from("blogs").select("*");
  if (isUUID || isNumber) {
    query = query.or(`slug.eq.${slug},id.eq.${slug}`);
  } else {
    query = query.eq("slug", slug);
  }
  
  const { data: dbData } = await query.maybeSingle();

  const fallback = defaultBlogs.find(
    (item) => item.slug === slug || item.id === slug
  );

  if (dbData) {
    return {
      id: dbData.id || dbData.slug || slug,
      slug: dbData.slug || slug,
      title: dbData.title,
      image_url: dbData.image_url || fallback?.image_url || "https://images.unsplash.com/photo-1593629718347-283811841101?auto=format&fit=crop&w=900&q=80",
      category: dbData.category || fallback?.category || "Journal",
      read_time: dbData.read_time || fallback?.read_time || "4 min read",
      published_date: dbData.published_date || fallback?.published_date || "2026-07-10",
      excerpt: dbData.excerpt || fallback?.excerpt || "",
      content: dbData.content || fallback?.content || "",
    };
  }

  if (fallback) {
    return fallback;
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Fit Plate Microgreens",
    };
  }

  return {
    title: `${blog.title} | Fit Plate Journal`,
    description: blog.excerpt.slice(0, 160),
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const formattedDate = new Date(blog.published_date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url('${blog.image_url}')`,
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/blogs">Blogs</Link> /{" "}
            <span>{blog.title}</span>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
            <span className="tag-pill">{blog.category}</span>
            <span style={{ fontSize: "14px", color: "var(--gold-300)" }}>{blog.read_time}</span>
            <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.7)" }}>&bull; {formattedDate}</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", maxWidth: "900px" }}>{blog.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Main Featured Image */}
          <div
            className="reveal"
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "36px",
              boxShadow: "0 16px 40px rgba(12, 72, 41, 0.12)",
            }}
          >
            <img
              src={blog.image_url}
              alt={blog.title}
              style={{ width: "100%", maxHeight: "480px", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Excerpt Callout */}
          {blog.excerpt && (
            <div
              className="reveal"
              style={{
                background: "rgba(12, 72, 41, 0.05)",
                borderLeft: "4px solid var(--gold-600)",
                borderRadius: "8px",
                padding: "20px 24px",
                marginBottom: "32px",
                fontSize: "17px",
                lineHeight: "1.6",
                fontStyle: "italic",
                color: "var(--forest-900)",
              }}
            >
              {blog.excerpt}
            </div>
          )}

          {/* Full Article Content */}
          <article
            className="reveal blog-content-rendered"
            style={{
              fontSize: "17px",
              lineHeight: "1.9",
              color: "var(--ink-800)",
            }}
          >
            {blog.content.split("\n\n").map((paragraph, index) => (
              <p key={index} style={{ marginBottom: "24px" }}>
                {paragraph}
              </p>
            ))}
          </article>

          {/* Article Footer & Nav */}
          <div
            className="reveal"
            style={{
              marginTop: "48px",
              paddingTop: "24px",
              borderTop: "1px solid var(--cream-300)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <Link
              href="/blogs"
              className="btn btn-outline"
              style={{ borderColor: "var(--forest-800)", color: "var(--forest-900)" }}
            >
              &larr; Back to All Articles
            </Link>

            <Link href="/contact" className="btn btn-gold">
              Get Fresh Microgreens
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section deep">
        <div className="container reveal" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <div className="icon-badge" style={{ margin: "0 auto" }}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </div>
          <h2 style={{ marginTop: "20px" }}>Have a question about our greens?</h2>
          <p style={{ marginTop: "12px" }}>
            Reach out directly &mdash; we're happy to talk through varieties, sourcing or bulk pricing for your kitchen.
          </p>
          <div style={{ marginTop: "26px" }}>
            <Link href="/contact" className="btn btn-gold">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
