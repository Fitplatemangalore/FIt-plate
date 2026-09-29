const fs = require('fs');

const files = [
  'src/app/leafy-vegetables/page.tsx',
  'src/app/herbs/page.tsx',
  'src/app/edible-flowers/page.tsx',
  'src/app/fruits/page.tsx',
  'src/app/saffron/page.tsx'
];

files.forEach(f => {
  let txt = fs.readFileSync(f, 'utf8');
  
  // Find the end of the style tag
  const styleEndMarker = '`}</style>';
  
  const mobileStyles = `
        @media (max-width: 768px) {
          .lv-hero {
            background-size: contain;
            background-position: top center;
            padding-top: 140px;
            min-height: auto;
          }
        }
      `;
  
  if (txt.includes(styleEndMarker)) {
    // avoid adding it twice
    if (!txt.includes('@media (max-width: 768px) {\n          .lv-hero {')) {
      txt = txt.replace(styleEndMarker, mobileStyles + styleEndMarker);
      fs.writeFileSync(f, txt);
    }
  }
});
console.log('done');
