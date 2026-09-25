const fs = require('fs');

const files = {
    'src/app/edible-flowers/page.tsx': 'Edible Flowers',
    'src/app/herbs/page.tsx': 'Herbs',
    'src/app/fruits/page.tsx': 'Fruits',
    'src/app/saffron/page.tsx': 'Saffron'
};

const heroRegex = /<section className="page-hero">[\s\S]*?<\/section>/;

const cssBlock =       <style>{\
        .lv-hero {
          position: relative;
          padding: 80px 0 100px;
          background-size: contain;
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
        .lv-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #16a34a;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .lv-hero-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
          color: white;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.7);
        }
        .lv-hero-sub {
          font-size: 18px;
          opacity: 0.9;
          line-height: 1.5;
          text-shadow: 0 1px 6px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8);
        }
      \}</style>
    </main>;

for (const [filepath, catName] of Object.entries(files)) {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    const newHero = \<section className="lv-hero" style={{ backgroundColor: '#f8fafc', backgroundImage: 'url()' }}>
        <div className="lv-hero-content container">
          <div className="lv-hero-tag">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <span>\</span>
          </div>
          <h1 className="lv-hero-title">Multiple varieties, each with its<br/>own flavour and function.</h1>
          <p className="lv-hero-sub">
            Every tray is harvested 7–21 days after germination, at the point of peak<br/>flavour, colour and nutrient density.
          </p>
        </div>
      </section>\;
    
    content = content.replace(heroRegex, newHero);
    
    if (!content.includes('.lv-hero {')) {
        content = content.replace('    </main>', cssBlock);
    }
    
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log('Updated ' + filepath);
}
