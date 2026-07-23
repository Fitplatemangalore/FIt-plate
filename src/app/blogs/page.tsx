import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { defaultBlogs } from "@/data/blogs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blogs | Fit Plate Microgreens",
  description:
    "Read about the history, nutrition and business uses of microgreens on the Fit Plate journal.",
};

export default async function Blogs() {
  const supabase = await createClient();
  const { data: dbBlogs } = await supabase
    .from("blogs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("published_date", { ascending: false });

  const displayBlogs =
    dbBlogs && dbBlogs.length > 0 ? dbBlogs : defaultBlogs;

  return (
    <main>
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1593629718347-283811841101?auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs">
            <Link href="/">Home</Link> / <span>Blogs</span>
          </div>
          <div className="eyebrow">The Journal</div>
          <h1>Notes on greens, growing &amp; good food.</h1>
          <p>Short reads on the story, science and everyday uses of microgreens.</p>
        </div>
      </section>

      {displayBlogs.map((b, i) => {
        const slug = b.slug || b.id || b.title.toLowerCase().replace(/\s+/g, "-");
        const formattedDate = b.published_date
          ? new Date(b.published_date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : null;

        return (
          <section key={b.id || slug} className="section alt" id={slug}>
            <div className="container">
              <div
                className="grid-2 reveal"
                style={{
                  alignItems: "center",
                  flexDirection: i % 2 === 1 ? "row-reverse" : "row",
                  gap: "36px",
                }}
              >
                <Link
                  href={`/blogs/${slug}`}
                  style={{
                    display: "block",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  <img
                    src={b.image_url}
                    alt={b.title}
                    style={{
                      borderRadius: "var(--radius-lg)",
                      width: "100%",
                      aspectRatio: "4/3.2",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    loading="lazy"
                  />
                </Link>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span className="tag-pill">{b.category}</span>
                    {b.read_time && (
                      <span style={{ fontSize: "13px", color: "var(--ink-500)" }}>
                        {b.read_time}
                      </span>
                    )}
                    {formattedDate && (
                      <span style={{ fontSize: "13px", color: "var(--ink-500)" }}>
                        &bull; {formattedDate}
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: "clamp(22px,2.8vw,30px)", marginTop: "14px" }}>
                    <Link
                      href={`/blogs/${slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {b.title}
                    </Link>
                  </h2>

                  {/* Truncated text (5 to 6 lines max) */}
                  <div
                    style={{
                      marginTop: "16px",
                      fontSize: "15.5px",
                      lineHeight: 1.8,
                      color: "var(--ink-700)",
                      display: "-webkit-box",
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {b.excerpt || b.content.replace(/<[^>]*>/g, "")}
                  </div>

                  <div style={{ marginTop: "22px" }}>
                    <Link
                      href={`/blogs/${slug}`}
                      className="btn btn-gold"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 22px",
                        fontSize: "14px",
                      }}
                    >
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section deep" style={{ paddingBottom: 0 }}>
        <div
          className="container reveal"
          style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto", paddingBottom: "76px" }}
        >
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
            Reach out directly &mdash; we're happy to talk through varieties,
            sourcing or bulk pricing for your kitchen.
          </p>
          <div style={{ marginTop: "26px" }}>
            <Link href="/contact" className="btn btn-gold">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="container">
          <hr style={{ border: "none", borderTop: "1px solid rgba(255, 255, 255, 0.15)", margin: 0 }} />
        </div>
      </section>
    </main>
  );
}
