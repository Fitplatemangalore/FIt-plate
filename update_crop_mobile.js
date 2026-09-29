const fs = require('fs');

let css = fs.readFileSync('src/app/globals.css', 'utf8');

const mobileCropFix = `
/* MOBILE CROP CARD NORMALIZATION */
@media (max-width: 580px) {
  .uv-crop-yellow-content {
    justify-content: flex-start !important;
    padding: 22px 10px 16px !important;
    height: 72% !important;
  }
  .uv-crop-crest-icon {
    margin-bottom: 6px !important;
    min-height: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .uv-crop-custom-icon {
    width: 32px !important;
    height: 32px !important;
    transform: none !important;
    object-fit: contain !important;
  }
  .uv-crop-v2-title {
    font-size: 14px !important;
    min-height: 36px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-bottom: 2px !important;
  }
  .uv-crop-v2-subtitle {
    font-size: 11px !important;
    line-height: 1.3 !important;
    margin-bottom: auto !important; /* Pushes the arrow to the bottom */
  }
  .uv-crop-v2-arrow-btn {
    width: 30px !important;
    height: 30px !important;
    min-width: 30px !important;
    min-height: 30px !important;
    margin: 8px auto 0 !important;
    flex-shrink: 0 !important;
  }
}
`;

if (!css.includes('/* MOBILE CROP CARD NORMALIZATION */')) {
  css += mobileCropFix;
  fs.writeFileSync('src/app/globals.css', css);
}

console.log('done');
