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
    
    // Find the second tag input and remove it. The first one has placeholder Microgreen, the second has placeholder Sulforaphane-rich.
    content = content.replace(/<div className="admin-form-group">\s*<label className="admin-label">[^<]*<\/label>\s*<input\s*className="admin-input"\s*type="text"\s*value=\{formData\.tag\}\s*onChange=\{\(e\) => setFormData\(\(prev\) => \(\{ \.\.\.prev, tag: e\.target\.value \}\)\)\}\s*placeholder="e\.g\. Sulforaphane-rich"\s*\/>\s*<\/div>/g, '');
    
    fs.writeFileSync(file, content);
  }
}
console.log('Done');
