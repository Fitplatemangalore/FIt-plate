import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Fruits | Fit Plate",
  description: "Learn more about our fruits, their benefits, growing process, and uses.",
};

export default function FruitsLearnMore() {
  return (
    <main className="lv-page fruits-page">
      <section className="lv-hero" style={{ backgroundColor: "#f8fafc", backgroundImage: 'url(/assets/img/fruits.png)' }}>
        <div className="lv-hero-content container">
          <Link href="/fruits" style={{ display: 'inline-block', marginBottom: '20px', color: 'white', textDecoration: 'underline', fontWeight: 600 }}>
            &larr; Back to Fruits
          </Link>
          <h1 className="lv-hero-title">All About Our Fruits</h1>
          <p className="lv-hero-sub">
            Experience the sweet, vibrant flavors and superior quality of our specially cultivated fruits.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: '#374151', lineHeight: 1.8 }}>
          
          <h2 style={{ color: '#072E6D', fontSize: '28px', marginBottom: '16px' }}>Benefits</h2>
          <p style={{ marginBottom: '32px' }}>
            Fruits are a vital source of dietary fiber, vitamins, and powerful antioxidants. Including fresh, high-quality fruits in your daily diet helps boost your immune system, improve heart health, and provide natural energy throughout the day.
          </p>

          <h2 style={{ color: '#072E6D', fontSize: '28px', marginBottom: '16px' }}>Our Growing Process</h2>
          <p style={{ marginBottom: '32px' }}>
            Through advanced agricultural techniques and climate-controlled environments, we optimize the growth cycle of our fruits. This ensures that every piece of fruit reaches its maximum flavor potential and nutritional density, grown sustainably without harmful chemicals.
          </p>

          <h2 style={{ color: '#072E6D', fontSize: '28px', marginBottom: '16px' }}>Culinary Uses</h2>
          <p style={{ marginBottom: '32px' }}>
            Enjoy them fresh on their own, blend them into nutritious smoothies, or incorporate them into exquisite desserts and baked goods. Their naturally sweet profile also balances savory dishes, making them a versatile kitchen staple.
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
          color: #072E6D;
          text-shadow: 0 2px 10px rgba(255,255,255,0.8), 0 2px 4px rgba(255,255,255,0.9);
        }
        .lv-hero-sub {
          font-size: 18px;
          opacity: 0.9;
          line-height: 1.5;
          color: #6B7280;
          text-shadow: 0 1px 6px rgba(255,255,255,0.8);
        }
        .fruits-page ~ footer {
          background-color: #072E6D !important;
        }
      `}</style>
    </main>
  );
}
