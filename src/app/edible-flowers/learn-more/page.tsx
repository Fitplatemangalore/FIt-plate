import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Edible Flowers | Fit Plate",
  description: "Learn more about our edible flowers, their benefits, growing process, and uses.",
};

export default function EdibleFlowersLearnMore() {
  return (
    <main className="lv-page flowers-page">
      <section className="lv-hero" style={{ backgroundColor: "#f8fafc", backgroundImage: 'url(/assets/img/edible-flowers.png)' }}>
        <div className="lv-hero-content container">
          <Link href="/edible-flowers" style={{ display: 'inline-block', marginBottom: '20px', color: 'white', textDecoration: 'underline', fontWeight: 600 }}>
            &larr; Back to Edible Flowers
          </Link>
          <h1 className="lv-hero-title">All About Edible Flowers</h1>
          <p className="lv-hero-sub">
            Add a touch of elegance and subtle flavor to your dishes with our vibrant edible flowers.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: '#374151', lineHeight: 1.8 }}>
          
          <h2 style={{ color: '#745B96', fontSize: '28px', marginBottom: '16px' }}>Benefits</h2>
          <p style={{ marginBottom: '32px' }}>
            Edible flowers are more than just a beautiful garnish. Many varieties contain beneficial antioxidants and essential vitamins. They offer a unique way to incorporate subtle floral notes and extra nutrients into your diet.
          </p>

          <h2 style={{ color: '#745B96', fontSize: '28px', marginBottom: '16px' }}>Our Growing Process</h2>
          <p style={{ marginBottom: '32px' }}>
            Cultivated in our pristine indoor farming facility, our edible flowers are grown without any harmful chemicals or pesticides. We carefully manage their environment to ensure vibrant colors and safe, clean blooms ready for culinary use.
          </p>

          <h2 style={{ color: '#745B96', fontSize: '28px', marginBottom: '16px' }}>Culinary Uses</h2>
          <p style={{ marginBottom: '32px' }}>
            Perfect for elevating the presentation of desserts, salads, and craft cocktails. They can be candied for sweets, frozen into ice cubes for drinks, or simply scattered over savory dishes for a stunning visual appeal.
          </p>

        </div>
      </section>

      <style>{`
        .lv-hero {
          position: relative;
          padding: 80px 0 100px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          color: white;
          min-height: 480px;
          display: flex;
          align-items: center;
        }
        .lv-hero-content {
          position: relative;
          z-index: 2;
        }
        .lv-hero-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
          color: #745B96;
          text-shadow: 0 2px 10px rgba(255,255,255,0.8), 0 2px 4px rgba(255,255,255,0.9);
        }
        .lv-hero-sub {
          font-size: 18px;
          opacity: 0.9;
          line-height: 1.5;
          color: #6B7280;
          text-shadow: 0 1px 6px rgba(255,255,255,0.8);
        }
        .flowers-page ~ footer {
          background-color: #745B96 !important;
        }
      `}</style>
    </main>
  );
}
