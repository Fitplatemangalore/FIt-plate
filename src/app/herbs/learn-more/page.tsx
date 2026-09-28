import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Herbs | Fit Plate",
  description: "Learn more about our herbs, their benefits, growing process, and uses.",
};

export default function HerbsLearnMore() {
  return (
    <main className="lv-page herbs-page">
      <section className="lv-hero" style={{ backgroundColor: "#f8fafc", backgroundImage: 'url(/assets/img/herbs.png)' }}>
        <div className="lv-hero-content container">
          <Link href="/herbs" style={{ display: 'inline-block', marginBottom: '20px', color: 'white', textDecoration: 'underline', fontWeight: 600 }}>
            &larr; Back to Herbs
          </Link>
          <h1 className="lv-hero-title">All About Herbs</h1>
          <p className="lv-hero-sub">
            Discover the aromatic profiles and culinary versatility of our freshly harvested herbs.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: '#374151', lineHeight: 1.8 }}>
          
          <h2 style={{ color: '#577143', fontSize: '28px', marginBottom: '16px' }}>Benefits</h2>
          <p style={{ marginBottom: '32px' }}>
            Our herbs are packed with essential oils and antioxidants. They not only enhance the flavor of your dishes but also offer various health benefits, including anti-inflammatory properties and immune system support.
          </p>

          <h2 style={{ color: '#577143', fontSize: '28px', marginBottom: '16px' }}>Our Growing Process</h2>
          <p style={{ marginBottom: '32px' }}>
            We grow our herbs in a controlled indoor environment, ensuring they receive the perfect amount of light and nutrients. This meticulous process guarantees intense flavor and aroma, harvested precisely at their peak.
          </p>

          <h2 style={{ color: '#577143', fontSize: '28px', marginBottom: '16px' }}>Culinary Uses</h2>
          <p style={{ marginBottom: '32px' }}>
            Ideal for seasoning meats, enhancing sauces, or garnishing soups and salads. Our fresh herbs elevate any dish, providing a burst of natural flavor that transforms ordinary meals into extraordinary culinary experiences.
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
          color: #577143;
          text-shadow: 0 2px 10px rgba(255,255,255,0.8), 0 2px 4px rgba(255,255,255,0.9);
        }
        .lv-hero-sub {
          font-size: 18px;
          opacity: 0.9;
          line-height: 1.5;
          color: #6B7280;
          text-shadow: 0 1px 6px rgba(255,255,255,0.8);
        }
        .herbs-page ~ footer {
          background-color: #577143 !important;
        }
      `}</style>
    </main>
  );
}
