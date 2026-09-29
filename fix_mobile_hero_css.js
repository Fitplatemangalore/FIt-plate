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
  
  const oldRegex = /@media\s*\(\s*max-width:\s*768px\s*\)\s*\{\s*\.lv-hero\s*\{[^}]+\}\s*\}/;
  
  const newCss = `@media (max-width: 768px) {
          .lv-hero {
            margin-top: 68px !important;
            background-size: 100% auto !important;
            background-position: top center !important;
            padding-top: 30px !important;
            padding-bottom: 40px !important;
            min-height: auto !important;
            
          }
        }`;
        
  if (oldRegex.test(txt)) {
    txt = txt.replace(oldRegex, newCss);
  } else {
    // Just in case it wasn't found, append it before `}</style>`
    txt = txt.replace('`}</style>', newCss + '\n      `}</style>');
  }
  
  fs.writeFileSync(f, txt);
});
console.log('done');
