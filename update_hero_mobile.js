const fs = require('fs');

const pages = [
  'src/app/leafy-vegetables/page.tsx',
  'src/app/herbs/page.tsx',
  'src/app/edible-flowers/page.tsx',
  'src/app/fruits/page.tsx',
  'src/app/saffron/page.tsx'
];

pages.forEach(page => {
  let content = fs.readFileSync(page, 'utf8');
  
  // Find the media query for 768px inside the style block
  const oldBlockRegex = /@media\s*\(max-width:\s*768px\)\s*\{\s*\.lv-hero\s*\{[\s\S]*?\}\s*\}/;
  
  const newBlock = `@media (max-width: 768px) {
          .lv-hero {
            margin-top: 68px !important;
            background-size: cover !important;
            background-position: center !important;
            padding-top: 50px !important;
            padding-bottom: 50px !important;
            min-height: auto !important;
            position: relative !important;
          }
          .lv-hero::before {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(to bottom, rgba(248, 250, 252, 0.4) 0%, rgba(248, 250, 252, 0.85) 50%, rgba(248, 250, 252, 1) 100%);
            z-index: 0;
          }
          .lv-hero-content {
            position: relative;
            z-index: 1;
          }
        }`;
        
  if (oldBlockRegex.test(content)) {
    content = content.replace(oldBlockRegex, newBlock);
    fs.writeFileSync(page, content);
    console.log('Updated ' + page);
  } else {
    console.log('Regex not matched in ' + page);
  }
});
