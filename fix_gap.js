const fs = require('fs');
const files = [
  'src/app/leafy-vegetables/page.tsx',
  'src/app/edible-flowers/page.tsx',
  'src/app/herbs/page.tsx',
  'src/app/fruits/page.tsx',
  'src/app/saffron/page.tsx'
];

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Conditionally render cards section
  content = content.replace(
    /\{\/\*\s*3\.\s*Variety\s*Cards\s*Grid\s*\*\/\}\r?\n\s*<section className=\"([a-z0-9-]+-cards-section section)\">/,
    '{\/* 3. Variety Cards Grid *\/}\n      {displayVarieties.length > 0 && (\n        <section className=\"$1\">'
  );

  content = content.replace(
    /<\/section>\r?\n\r?\n\s*\{\/\*\s*4\.\s*A\s*note\s*on\s*nutrition\s*\*\/\}/,
    '  </section>\n      )}\n\n      {\/* 4. A note on nutrition *\/}'
  );

  // 2. Adjust padding bottom of the stats section when empty
  content = content.replace(
    /<section className=\"([a-z0-9-]+-stats section)\" style=\{\{\s*backgroundColor:\s*'#ffffff',\s*position:\s*'relative',\s*zIndex:\s*1\s*\}\}>/,
    '<section className=\"$1\" style={{ backgroundColor: \\'#ffffff\\', position: \\'relative\\', zIndex: 1, paddingBottom: displayVarieties.length > 0 ? undefined : \\'0px\\' }}>'
  );

  fs.writeFileSync(file, content);
}
console.log('Done');
