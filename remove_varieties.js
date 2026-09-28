const fs = require('fs');

// Fix route.ts
let routeTs = fs.readFileSync('src/app/api/send-enquiry/route.ts', 'utf8');
routeTs = routeTs.replace(/selectedVarieties,\s*/g, '');
routeTs = routeTs.replace(/\/\/ Varieties: array or empty[\s\S]*?const quantityDisplay =/g, 'const quantityDisplay =');
routeTs = routeTs.replace(/<div class="field-group">\s*<div class="field-label">Varieties Interested In<\/div>[\s\S]*?<\/div>\s*<\/div>/g, '');
routeTs = routeTs.replace(/\\nVarieties Interested In: \$\{varietiesDisplay\}/g, '');
fs.writeFileSync('src/app/api/send-enquiry/route.ts', routeTs);

// Fix page.tsx
let pageTsx = fs.readFileSync('src/app/contact/page.tsx', 'utf8');
pageTsx = pageTsx.replace(/const \[selectedVarieties, setSelectedVarieties\] = useState<string\[\]>\(\[\]\);\s*/, '');
pageTsx = pageTsx.replace(/\/\/ Dynamic varieties list from Supabase[\s\S]*?const \[varietyOptions, setVarietyOptions\] = useState<string\[\]>\(\[\]\);\s*/, '');
pageTsx = pageTsx.replace(/\/\/ Fetch variety names from the same Supabase table used on \/varieties[\s\S]*?}, \[\]\);\s*/, '');
pageTsx = pageTsx.replace(/const handleVarietyToggle = \([\s\S]*?};\s*/, '');
pageTsx = pageTsx.replace(/if \(selectedVarieties\.length > 0\) {[\s\S]*?}\s*/, '');
pageTsx = pageTsx.replace(/selectedVarieties,\s*/g, '');
pageTsx = pageTsx.replace(/setSelectedVarieties\(\[\]\);\s*/, '');
pageTsx = pageTsx.replace(/\{\/\* Varieties multi-select — dynamically populated from Supabase \*\/\}[\s\S]*?\{varietyOptions\.length > 0 && \([\s\S]*?\n              \)\}\s*/, '');
fs.writeFileSync('src/app/contact/page.tsx', pageTsx);

console.log('done');
