import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn More about Saffron | Fit Plate",
  description: "Learn more about our saffron, its benefits, growing process, and uses.",
};

export default function SaffronLearnMore() {
  return (
    <main className="lv-page saffron-page">
      <section className="lv-hero" style={{ backgroundColor: "#f8fafc", backgroundImage: 'url(/assets/img/saffron.png)' }}>
        <div className="lv-hero-content container">
          <Link href="/saffron" style={{ display: 'inline-block', marginBottom: '20px', color: 'white', textDecoration: 'underline', fontWeight: 600 }}>
            &larr; Back to Saffron
          </Link>
          <h1 className="lv-hero-title">All About Our Saffron</h1>
          <p className="lv-hero-sub">
            Discover the rich history, distinct aroma, and unparalleled quality of our premium saffron.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', color: '#374151', lineHeight: 1.8 }}>
          
          <h2 style={{ color: '#513171', fontSize: '28px', marginBottom: '16px' }}>Benefits</h2>
          <p style={{ marginBottom: '32px' }}>
            Known as the "golden spice," saffron is highly valued for its potent antioxidant properties. It has been traditionally used to uplift mood, promote a healthy complexion, and support overall well-being, thanks to its high concentration of crocin and safranal.
          </p>

          <h2 style={{ color: '#513171', fontSize: '28px', marginBottom: '16px' }}>Our Growing Process</h2>
          <p style={{ marginBottom: '32px' }}>
            Saffron cultivation requires precision and care. We utilize specialized indoor environments to mimic its natural ideal climate, ensuring the delicate crocus flowers bloom perfectly. Each stigma is then carefully hand-harvested and dried to preserve its color and aroma.
          </p>

          <h2 style={{ color: '#513171', fontSize: '28px', marginBottom: '16px' }}>Culinary Uses</h2>
          <p style={{ marginBottom: '32px' }}>
            Saffron imparts a luminous golden hue and a complex, earthy flavor to dishes. It is essential in classics like paella, risotto, and biryani. A small pinch goes a long way in elevating both savory meals and sweet desserts, adding an unmistakable touch of luxury.
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
          color: #513171;
          text-shadow: 0 2px 10px rgba(255,255,255,0.8), 0 2px 4px rgba(255,255,255,0.9);
        }
        .lv-hero-sub {
          font-size: 18px;
          opacity: 0.9;
          line-height: 1.5;
          color: #6B7280;
          text-shadow: 0 1px 6px rgba(255,255,255,0.8);
        }
        .saffron-page ~ footer {
          background-color: #513171 !important;
        }
      `}</style>
    </main>
  );
}
