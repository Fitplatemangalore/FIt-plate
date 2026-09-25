const fs = require('fs');
const templatePath = 'src/app/leafy-vegetables/page.tsx';
const template = fs.readFileSync(templatePath, 'utf-8');

const pages = [
  {
    path: 'src/app/edible-flowers/page.tsx',
    catName: 'Edible Flowers',
    catNameLower: 'edible flowers',
    funcName: 'EdibleFlowers',
    tableName: 'edible_flowers',
    slugBase: 'edible-flowers'
  },
  {
    path: 'src/app/herbs/page.tsx',
    catName: 'Herbs',
    catNameLower: 'herbs',
    funcName: 'Herbs',
    tableName: 'herbs',
    slugBase: 'herbs'
  },
  {
    path: 'src/app/fruits/page.tsx',
    catName: 'Fruits',
    catNameLower: 'fruits',
    funcName: 'Fruits',
    tableName: 'fruits',
    slugBase: 'fruits'
  },
  {
    path: 'src/app/saffron/page.tsx',
    catName: 'Saffron',
    catNameLower: 'saffron',
    funcName: 'Saffron',
    tableName: 'saffron',
    slugBase: 'saffron'
  }
];

for (const p of pages) {
  let content = template;
  
  // 1. Meta title
  content = content.replace(/title: "Leafy Vegetables \| Fit Plate"/, `title: "${p.catName} | Fit Plate"`);
  
  // 2. Meta description
  content = content.replace(/description: "Explore all Fit Plate leafy vegetable varieties\."/, `description: "Explore all Fit Plate ${p.catNameLower} varieties."`);
  
  // 3. Function name
  content = content.replace(/export default async function LeafyVegetables\(\) {/, `export default async function ${p.funcName}() {`);
  
  // 4. Table name
  content = content.replace(/\.from\("leafy_vegetables"\)/, `.from("${p.tableName}")`);
  
  // 5. Hero background image (placeholder)
  content = content.replace(/style={{ backgroundImage: 'url\(\/assets\/img\/leafy-vegetables-hero\.png\)' }}/, `style={{ backgroundImage: 'url()' }}`);
  
  // 6. Hero tag
  content = content.replace(/<span>Leafy Vegetables<\/span>/, `<span>${p.catName}</span>`);
  
  // 7. Intro text
  content = content.replace(/Leafy vegetables are young, edible seedlings/, `${p.catName} are young, edible seedlings`);
  
  // 8. Card link
  content = content.replace(/href={`\/leafy-vegetables\/\${slug}`}/g, `href={\`/${p.slugBase}/\${slug}\`}`);
  
  fs.writeFileSync(p.path, content, 'utf-8');
  console.log('Updated ' + p.path);
}
