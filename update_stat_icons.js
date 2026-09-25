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
  content = content.replace(/className=\"lv-stat-icon\"\s+style=\{\{\s*color:\s*\"(#16a34a)\",\s*borderColor:\s*\"(#16a34a)\"\s*\}\}/g, 'className="lv-stat-icon" style={{ backgroundColor: "$1", color: "white", borderColor: "white" }}');
  content = content.replace(/className=\"lv-stat-icon\"\s+style=\{\{\s*color:\s*\"(#f59e0b)\",\s*borderColor:\s*\"(#f59e0b)\"\s*\}\}/g, 'className="lv-stat-icon" style={{ backgroundColor: "$1", color: "white", borderColor: "white" }}');
  content = content.replace(/className=\"lv-stat-icon\"\s+style=\{\{\s*color:\s*\"(#a855f7)\",\s*borderColor:\s*\"(#a855f7)\"\s*\}\}/g, 'className="lv-stat-icon" style={{ backgroundColor: "$1", color: "white", borderColor: "white" }}');
  content = content.replace(/className=\"lv-stat-icon\"\s+style=\{\{\s*color:\s*\"(#3b82f6)\",\s*borderColor:\s*\"(#3b82f6)\"\s*\}\}/g, 'className="lv-stat-icon" style={{ backgroundColor: "$1", color: "white", borderColor: "white" }}');
  fs.writeFileSync(file, content);
}
console.log('Done');
