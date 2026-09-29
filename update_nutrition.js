const fs = require('fs');
const files = [
  { 
    path: 'src/app/leafy-vegetables/page.tsx', 
    text: 'Many of our leafy vegetables are rich in vitamins A, C, E and K, folate, potassium, calcium, iron and magnesium, along with antioxidant compounds such as polyphenols, carotenoids, chlorophyll, glucosinolates, anthocyanins, betalains and flavonoids. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
  },
  { 
    path: 'src/app/herbs/page.tsx', 
    text: 'Many of our herbs are rich in essential oils, vitamins A, C and K, and antioxidant compounds such as flavonoids and polyphenols, along with trace minerals like iron, calcium and manganese. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
  },
  { 
    path: 'src/app/edible-flowers/page.tsx', 
    text: 'Many of our edible flowers contain antioxidants, vitamin C, and beneficial plant compounds such as anthocyanins and flavonoids, offering subtle nutrition alongside their delicate flavour and colour. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
  },
  { 
    path: 'src/app/fruits/page.tsx', 
    text: 'Many of our fruits are rich in vitamin C, potassium, dietary fibre and antioxidant compounds such as polyphenols and carotenoids, supporting everyday health and immunity. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
  },
  { 
    path: 'src/app/saffron/page.tsx', 
    text: 'Saffron is rich in antioxidant compounds such as crocin, safranal and crocetin, along with trace minerals, and has long been valued for its aroma, colour and potential health benefits. See our full <Link href="/benefits">nutrition &amp; benefits guide</Link> for more detail.'
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
