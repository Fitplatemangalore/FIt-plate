const fs = require('fs');

let content = fs.readFileSync('src/app/benefits/page.tsx', 'utf8');

// Replacements
content = content.replace(
  'title: "Benefits of Microgreens | Fit Plate Mangalore",',
  'title: "Benefits of Fresh Produce | Fit Plate Mangalore",'
);

content = content.replace(
  'description: "Discover the nutritional benefits of microgreens and why hotels, restaurants and caterers choose Fit Plate as their supply partner.",',
  'description: "Discover the nutritional benefits of our premium microgreens, leafy vegetables, herbs, edible flowers, fruits and saffron, and why commercial kitchens choose Fit Plate.",'
);

content = content.replace(
  '<h1>Tiny in size. Powerful in nutrition.</h1>',
  '<h1>Fresh by nature. Powerful in nutrition.</h1>'
);

content = content.replace(
  '<p>Why microgreens matter &mdash; for your health, your kitchen, and the planet.</p>',
  '<p>Why our premium produce matters &mdash; for your health, your kitchen, and the planet.</p>'
);

content = content.replace(
  '<div className="eyebrow">Why Microgreens Matter</div>',
  '<div className="eyebrow">Why Our Crops Matter</div>'
);

content = content.replace(
  '<h2>Small greens, outsized nutrition.</h2>',
  '<h2>Exceptional quality, outsized nutrition.</h2>'
);

content = content.replace(
  '<p style={{ marginTop: "8px", fontSize: "14px" }}>Up to 40x more nutrients than mature vegetables.</p>',
  '<p style={{ marginTop: "8px", fontSize: "14px" }}>Packed with essential vitamins, minerals, and potent antioxidants.</p>'
);

content = content.replace(
  '<p style={{ marginTop: "8px", fontSize: "14px" }}>Helps in reducing cholesterol and supports overall heart health.</p>',
  '<p style={{ marginTop: "8px", fontSize: "14px" }}>Helps in reducing cholesterol and supports overall cardiovascular health.</p>'
);

content = content.replace(
  '<p style={{ marginTop: "8px", fontSize: "14px" }}>Grown with less water and space &mdash; better for you and the planet.</p>',
  '<p style={{ marginTop: "8px", fontSize: "14px" }}>Grown with efficient use of space and resources &mdash; better for you and the planet.</p>'
);

content = content.replace(
  '<p style={{ marginTop: "8px", fontSize: "14px" }}>Adds freshness, flavour and nutrition to any meal, effortlessly.</p>',
  '<p style={{ marginTop: "8px", fontSize: "14px" }}>Adds freshness, vibrant flavour and rich nutrition to any meal, effortlessly.</p>'
);

content = content.replace(
  '<p style={{ marginTop: "16px" }}>Many microgreens are rich in vitamins A, C, E and K, folate, potassium, calcium, iron and magnesium, along with antioxidant compounds such as polyphenols, carotenoids, chlorophyll, glucosinolates, anthocyanins, betalains and flavonoids. Nutrient levels vary by species and growing conditions &mdash; explore our <Link href="/varieties" style={{ color: "var(--forest-800)", textDecoration: "underline" }}>variety-by-variety guide</Link> for specifics.</p>',
  '<p style={{ marginTop: "16px" }}>Our premium crops &mdash; from microgreens and leafy vegetables to herbs, flowers, fruits and saffron &mdash; are rich in vitamins A, C, E and K, folate, potassium, calcium, iron and magnesium. They also contain vital antioxidant compounds such as polyphenols, carotenoids, chlorophyll, glucosinolates, anthocyanins, betalains and flavonoids. Nutrient levels vary by species and growing conditions &mdash; explore our <Link href="/varieties" style={{ color: "var(--forest-800)", textDecoration: "underline" }}>variety-by-variety guide</Link> for specifics.</p>'
);

content = content.replace(
  '<h2 style={{ fontSize: "clamp(26px,4vw,34px)" }}>Add fresh microgreens to your menu.</h2>',
  '<h2 style={{ fontSize: "clamp(26px,4vw,34px)" }}>Add premium fresh produce to your menu.</h2>'
);

content = content.replace(
  'alt="Fit Plate microgreens tray"',
  'alt="Fit Plate premium fresh produce tray"'
);

fs.writeFileSync('src/app/benefits/page.tsx', content, 'utf8');
console.log('done');
