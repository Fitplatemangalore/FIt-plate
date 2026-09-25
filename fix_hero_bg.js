const fs = require('fs');
const files = [
    'src/app/leafy-vegetables/page.tsx',
    'src/app/edible-flowers/page.tsx',
    'src/app/herbs/page.tsx',
    'src/app/fruits/page.tsx',
    'src/app/saffron/page.tsx'
];
for (const f of files) {
    let content = fs.readFileSync(f, 'utf-8');
    content = content.replace(
        /<section className="lv-hero" style={{ backgroundImage:/g,
        '<section className="lv-hero" style={{ backgroundColor: "#f8fafc", backgroundImage:'
    );
    fs.writeFileSync(f, content, 'utf-8');
    console.log('Updated ' + f);
}
