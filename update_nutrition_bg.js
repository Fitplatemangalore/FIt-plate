const fs = require('fs');

const files = [
    'src/app/leafy-vegetables/page.tsx',
    'src/app/edible-flowers/page.tsx',
    'src/app/herbs/page.tsx',
    'src/app/fruits/page.tsx',
    'src/app/saffron/page.tsx'
];

const cssRegex = /\.lv-nutrition\s*\{\s*background-color:\s*#5c9d74;\s*color:\s*white;\s*text-align:\s*center;\s*padding:\s*60px\s*0;\s*background-image:\s*radial-gradient[^;]+;\s*\}/;

const newCss = `.lv-nutrition {
          background-color: #64748b;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: white;
          text-align: center;
          padding: 60px 0;
        }`;

for (const f of files) {
    let content = fs.readFileSync(f, 'utf-8');
    
    // Replace HTML
    content = content.replace(
        /<section className="lv-nutrition">/,
        '<section className="lv-nutrition" style={{ backgroundImage: "url()" }}>'
    );
    
    // Replace CSS
    content = content.replace(cssRegex, newCss);
    
    fs.writeFileSync(f, content, 'utf-8');
    console.log('Updated ' + f);
}
