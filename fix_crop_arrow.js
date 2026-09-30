const fs = require('fs');

let css = fs.readFileSync('src/app/globals.css', 'utf8');

const regex = /padding: 22px 10px 16px !important;/;
if (regex.test(css)) {
  css = css.replace(regex, 'padding: 16px 10px 30px !important;');
  fs.writeFileSync('src/app/globals.css', css);
} else {
  // If not found, try to replace the whole block
  const oldBlock = `  .uv-crop-yellow-content {
    justify-content: flex-start !important;
    padding: 22px 10px 16px !important;
    height: 72% !important;
  }`;
  const newBlock = `  .uv-crop-yellow-content {
    justify-content: flex-start !important;
    padding: 16px 10px 32px !important;
    height: 75% !important;
  }`;
  if (css.includes(oldBlock)) {
    css = css.replace(oldBlock, newBlock);
    fs.writeFileSync('src/app/globals.css', css);
  }
}

console.log('done');
