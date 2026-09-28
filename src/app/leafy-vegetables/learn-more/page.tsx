import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Leafy Vegetables | Fit Plate",
  description: "Learn more about our leafy vegetables, their benefits, growing process, and uses.",
};

export default function LeafyVegetablesLearnMore() {
  return (
    <main className="lv-page leafy-page">
      <section className="lv-hero" style={{ backgroundColor: "#f8fafc", backgroundImage: 'url(/assets/img/leafy-vegetables-hero.png)' }}>
        <div className="lv-hero-content container">
          <Link href="/leafy-vegetables" style={{ display: 'inline-block', marginBottom: '20px', color: 'white', textDecoration: 'underline', fontWeight: 600 }}>
            &larr; Back to Leafy Vegetables
          </Link>
          <h1 className="lv-hero-title">All About Leafy Vegetables</h1>
          <p className="lv-hero-sub">
            Discover the rich nutritional profile and versatile culinary uses of our freshly harvested leafy vegetables.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: '#374151', lineHeight: 1.8 }}>
          
          <h2 style={{ color: '#61AA7C', fontSize: '28px', marginBottom: '16px' }}>Benefits</h2>
          <p style={{ marginBottom: '32px' }}>
            Leafy vegetables are nutrient powerhouses. They are rich in essential vitamins such as A, C, E, and K, as well as minerals like iron, magnesium, and calcium. Regular consumption can support heart health, improve digestion, and boost your immune system.
          </p>

          <h2 style={{ color: '#61AA7C', fontSize: '28px', marginBottom: '16px' }}>Our Growing Process</h2>
          <p style={{ marginBottom: '32px' }}>
            We cultivate our leafy vegetables in a meticulously controlled hydroponic environment. By optimizing light, water, and nutrients, we ensure that each plant reaches its peak nutritional value and vibrant color within 7 to 21 days, entirely free from harmful pesticides.
          </p>

          <h2 style={{ color: '#61AA7C', fontSize: '28px', marginBottom: '16px' }}>Culinary Uses</h2>
          <p style={{ marginBottom: '32px' }}>
            Perfect for salads, smoothies, sandwiches, and as a vibrant garnish for main dishes. Their crisp texture and fresh flavor profile make them a versatile addition to any meal, enhancing both taste and visual appeal.
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
          color: #61AA7C;
          text-shadow: 0 2px 10px rgba(255,255,255,0.8), 0 2px 4px rgba(255,255,255,0.9);
        }
        .lv-hero-sub {
          font-size: 18px;
          opacity: 0.9;
          line-height: 1.5;
          color: #6B7280;
          text-shadow: 0 1px 6px rgba(255,255,255,0.8);
        }
        .leafy-page ~ footer {
          background-color: #61AA7C !important;
        }
      `}</style>
    </main>
  );
}
