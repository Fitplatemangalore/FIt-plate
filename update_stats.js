const fs = require('fs');
const pages = {
    'src/app/leafy-vegetables/page.tsx': 'Leafy vegetables',
    'src/app/edible-flowers/page.tsx': 'Edible flowers',
    'src/app/herbs/page.tsx': 'Herbs',
    'src/app/fruits/page.tsx': 'Fruits',
    'src/app/saffron/page.tsx': 'Saffron'
};

for (const [filepath, name] of Object.entries(pages)) {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    // Replace old section alt or old lv-stats
    const regex = /<section className="(?:section alt|lv-stats section)">[\s\S]*?(?:<\/div>\s*<\/section>)/;
    
    const newStats = `<section className="lv-stats section" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="lv-stats-grid">
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ color: "#16a34a", borderColor: "#16a34a" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#16a34a" }}>Fresh Harvest</div>
              <div className="lv-stat-desc">7-21 days</div>
            </div>
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ color: "#f59e0b", borderColor: "#f59e0b" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8M8 12h8"/></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#f59e0b" }}>Rich in Nutrients</div>
              <div className="lv-stat-desc">Vitamins & Minerals</div>
            </div>
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ color: "#a855f7", borderColor: "#a855f7" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 16a4 4 0 100-8 4 4 0 000 8z"/></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#a855f7" }}>Natural Flavour</div>
              <div className="lv-stat-desc">Pure & Clean</div>
            </div>
            <div className="lv-stat-item">
              <div className="lv-stat-icon" style={{ color: "#3b82f6", borderColor: "#3b82f6" }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/></svg>
              </div>
              <div className="lv-stat-title" style={{ color: "#3b82f6" }}>Better Nutrition</div>
              <div className="lv-stat-desc">For a Healthier You</div>
            </div>
          </div>
          <div className="lv-intro-text">
            ${name} are young, edible seedlings harvested just after the cotyledons and first<br/>true leaves appear. Below is a quick reference to each variety we grow — its character,<br/>nutritional highlights, and where it shines on the plate.
          </div>
        </div>
      </section>`;
    
    content = content.replace(regex, newStats);
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log('Updated ' + filepath);
}
