import Link from "next/link";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { defaultVarieties } from "@/data/varieties";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Microgreens | Fit Plate Microgreens",
  description:
    "Explore all Fit Plate microgreen varieties — Broccoli, Purple Kale, Basil, Fenugreek, Radish, Turnip, Spinach, Green Amaranth, Beetroot and Sunflower.",
};

export default async function Varieties() {
  const supabase = await createClient();
  const { data: dbVarieties } = await supabase
    .from("varieties")
    .select("*")
    .order("sort_order", { ascending: true });

  const displayVarieties =
    dbVarieties && dbVarieties.length > 0 ? dbVarieties : defaultVarieties;

  return (
    <main>
      <section className="page-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1640671509786-7ddd9d77c866?auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="crumbs">
            <Link href="/">Home</Link> / <span>Our Microgreens</span>
          </div>
          <div className="eyebrow">Our Microgreens</div>
          <h1>Ten varieties, each with its own flavour and function.</h1>
          <p>
            Every tray is harvested 7&ndash;21 days after germination, at the
            point of peak flavour, colour and nutrient density.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head center reveal">
            <p style={{ fontSize: "16px" }}>
              Microgreens are young edible seedlings harvested just after the
              cotyledons and first true leaves appear. Below is a quick
              reference to each variety we grow &mdash; its character,
              nutritional highlights, and where it shines on the plate.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: "28px" }}>
            {displayVarieties.map((v, i) => {
              const slug = v.slug || v.id || v.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div
                  key={v.id || slug}
                  className="card reveal"
                  id={slug}
                  style={
                    {
                      "--i": i % 4,
                      display: "flex",
                      overflow: "hidden",
                      flexDirection: "column",
                    } as React.CSSProperties
                  }
                >
                  <div style={{ display: "flex", width: "100%", flex: 1 }}>
                    <div style={{ flex: "0 0 42%", position: "relative" }}>
                      <Link href={`/varieties/${slug}`} style={{ display: "block", height: "100%" }}>
                        <img
                          src={v.image_url || "/assets/pot/pot-1.png"}
                          alt={`${v.name} microgreens`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            minHeight: "220px",
                          }}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                    <div style={{ padding: "24px 22px", flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        {v.tag_pill && <div className="tag-pill">{v.tag_pill}</div>}
                        <h3 style={{ fontSize: "22px", marginTop: v.tag_pill ? "10px" : "0" }}>
                          <Link href={`/varieties/${slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                            {v.name}
                          </Link>
                        </h3>
                        {v.highlight && (
                          <p
                            style={{
                              marginTop: "6px",
                              fontSize: "13.5px",
                              fontStyle: "italic",
                              color: "var(--gold-700)",
                            }}
                          >
                            {v.highlight}
                          </p>
                        )}
                        <p
                          style={{
                            marginTop: "10px",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            color: "var(--ink-700)",
                          }}
                        >
                          {v.description}
                        </p>
                      </div>

                      <div style={{ marginTop: "14px" }}>
                        {v.best_in && (
                          <p
                            style={{
                              fontSize: "12.5px",
                              color: "var(--ink-500)",
                              marginBottom: "10px",
                              overflowWrap: "break-word",
                              wordWrap: "break-word",
                            }}
                          >
                            <strong style={{ color: "var(--forest-900)" }}>Best in:</strong>{" "}
                            {v.best_in}
                          </p>
                        )}
                        <Link
                          href={`/varieties/${slug}`}
                          className="read-more-btn"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13.5px",
                            fontWeight: 600,
                            color: "var(--forest-900)",
                            textDecoration: "none",
                          }}
                        >
                          Read More &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section deep">
        <div
          className="container reveal"
          style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}
        >
          <div
            className="eyebrow"
            style={{ justifyContent: "center", color: "var(--gold-300)" }}
          >
            A Note on Nutrition
          </div>
          <h2 style={{ marginTop: "14px" }}>
            Nutrient levels vary by species and growing conditions.
          </h2>
          <p style={{ marginTop: "16px" }}>
            Many of our microgreens are rich in vitamins A, C, E and K, folate,
            potassium, calcium, iron and magnesium, along with antioxidant
            compounds such as polyphenols, carotenoids, chlorophyll,
            glucosinolates, anthocyanins, betalains and flavonoids. See our full{" "}
            <Link
              href="/benefits"
              style={{ color: "var(--gold-300)", textDecoration: "underline" }}
            >
              nutrition &amp; benefits guide
            </Link>{" "}
            for more detail.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="container reveal" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,34px)" }}>
            Want a custom mix for your menu?
          </h2>
          <p
            style={{
              marginTop: "12px",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            We can put together seasonal or signature blends for hotels,
            restaurants and caterers on request.
          </p>
          <div style={{ marginTop: "26px" }}>
            <Link href="/contact" className="btn btn-gold">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
