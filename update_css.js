const fs = require('fs');

let css = fs.readFileSync('src/app/globals.css', 'utf8');

const mediaQuery = `
@media (max-width: 768px) {
  .uv-testimonials-subtitle {
    margin: -10px 0 46px;
  }
}
`;

if (!css.includes('.uv-testimonials-subtitle {\\n    margin: -10px 0 46px;')) {
  css += mediaQuery;
  fs.writeFileSync('src/app/globals.css', css);
}

console.log('done');
