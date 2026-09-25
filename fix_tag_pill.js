const fs = require('fs');

const files = [
  'src/app/admin/leafy-vegetables/page.tsx',
  'src/app/admin/edible-flowers/page.tsx',
  'src/app/admin/herbs/page.tsx',
  'src/app/admin/fruits/page.tsx',
  'src/app/admin/saffron/page.tsx',
  'src/app/admin/varieties/page.tsx' // just in case
];

for (let file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the interface property
    content = content.replace(/tag_pill:\s*string;/g, 'tag: string;');
    
    // Replace empty form default
    content = content.replace(/tag_pill:\s*\"\",/g, 'tag: "",');
    
    // Replace in openEditModal mapping. 
    // It might be `tag_pill: item.tag_pill || ""` or `tag_pill: variety.tag_pill || ""`
    content = content.replace(/tag_pill:\s*(item|variety)\.tag_pill/g, 'tag: $1.tag');
    content = content.replace(/tag_pill:\s*(item|variety)\.tag/g, 'tag: $1.tag');
    
    // Replace in JSX value and onChange
    content = content.replace(/value=\{formData\.tag_pill\}/g, 'value={formData.tag}');
    content = content.replace(/tag_pill:\s*e\.target\.value/g, 'tag: e.target.value');
    
    fs.writeFileSync(file, content);
  }
}
console.log('Done');
