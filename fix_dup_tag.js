const fs = require('fs');

const files = [
  'src/app/admin/edible-flowers/page.tsx',
  'src/app/admin/herbs/page.tsx',
  'src/app/admin/fruits/page.tsx',
  'src/app/admin/saffron/page.tsx',
  'src/app/admin/varieties/page.tsx'
];

for (let file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove duplicate `tag: string;`
    content = content.replace(/(\s*tag:\s*string;\r?\n){2,}/g, '\n  tag: string;\n');
    
    // Remove duplicate `tag: "",`
    content = content.replace(/(\s*tag:\s*"[^"]*",\r?\n){2,}/g, '\n    tag: "",\n');
    
    // Remove duplicate `tag: variety.tag || "",`
    content = content.replace(/(\s*tag:\s*variety\.tag\s*\|\|[^\n]*\r?\n){2,}/g, '\n      tag: variety.tag || "",\n');
    
    // Note: I will also check for duplicate JSX inputs for `tag` manually via diff.
    
    fs.writeFileSync(file, content);
  }
}
console.log('Done');
