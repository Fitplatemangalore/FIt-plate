const fs = require('fs');
const files = [
  { 
    path: 'src/app/leafy-vegetables/page.tsx', 
    text: 'Many of our leafy vegetables are rich in vitamins A, C, E and K, folate, potassium, calcium, iron and magnesium, along with antioxidant compounds such as polyphenols, carotenoids, chlorophyll, glucosinolates, anthocyanins, betalains and flavonoids. These nutrients support immunity, bone health and overall wellbeing when eaten regularly as part of a balanced diet. Nutrient levels can vary depending on the variety, growing conditions and harvest time. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
  },
  { 
    path: 'src/app/herbs/page.tsx', 
    text: 'Many of our herbs are rich in essential oils, vitamins A, C and K, and antioxidant compounds such as flavonoids and polyphenols, along with trace minerals like iron, calcium and manganese. Beyond flavour, these compounds are linked to digestive support, anti-inflammatory properties and general wellness. The concentration of these nutrients depends on the herb variety and how it\'s grown and harvested. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
  },
  { 
    path: 'src/app/edible-flowers/page.tsx', 
    text: 'Many of our edible flowers contain antioxidants, vitamin C, and beneficial plant compounds such as anthocyanins and flavonoids, offering subtle nutrition alongside their delicate flavour and colour. While used mainly for garnish and presentation, they can contribute small but meaningful amounts of nutrients to a dish. Their exact nutrient profile varies by flower type and growing conditions. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
  },
  { 
    path: 'src/app/fruits/page.tsx', 
    text: 'Many of our fruits are rich in vitamin C, potassium, dietary fibre and antioxidant compounds such as polyphenols and carotenoids, supporting everyday health and immunity. Regular consumption can support heart health, digestion and overall vitality. As with all produce, nutrient levels vary by fruit type, ripeness and growing conditions. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
  },
  { 
    path: 'src/app/saffron/page.tsx', 
    text: 'Saffron is rich in antioxidant compounds such as crocin, safranal and crocetin, along with trace minerals, and has long been valued for its aroma, colour and potential health benefits. Traditionally used in small quantities, it\'s prized as much for its unique flavour and colour as for its nutritional properties. Its potency depends on growing conditions, harvest method and how it\'s dried and stored. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
  }
];

files.forEach(f => {
  let txt = fs.readFileSync(f.path, 'utf8');
  // Match everything from <p> to </p> immediately following the specific <h2>
  txt = txt.replace(
    /(<h2>Nutrient levels vary by species and growing conditions\.<\/h2>\s*<p>)[\s\S]*?(<\/p>)/,
    '$1\n            ' + f.text + '\n          $2'
  );
  fs.writeFileSync(f.path, txt);
});
console.log('done');
