const fs = require('fs');

const files = [
    'src/app/leafy-vegetables/page.tsx',
    'src/app/edible-flowers/page.tsx',
    'src/app/herbs/page.tsx',
    'src/app/fruits/page.tsx',
    'src/app/saffron/page.tsx'
];

const cssRegex = /\.lv-custom-mix\s*\{\s*text-align:\s*center;\s*padding:\s*80px\s*0;\s*background:\s*linear-gradient[^;]+;\s*\}/;

const newCss = `.lv-custom-mix {
          text-align: center;
          padding: 80px 0;
          background-color: #f8fafc;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }`;

for (const f of files) {
    let content = fs.readFileSync(f, 'utf-8');
    
    // Replace HTML
    content = content.replace(
        /<section className="lv-custom-mix section">/,
        '<section className="lv-custom-mix section" style={{ backgroundImage: "url()" }}>'
    );
    
    // Replace CSS
    content = content.replace(cssRegex, newCss);
    
    fs.writeFileSync(f, content, 'utf-8');
    console.log('Updated ' + f);
}
