const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

const oldCss = `/* MOBILE CROP CARD NORMALIZATION */
@media (max-width: 580px) {
  .uv-crop-yellow-content {
    justify-content: flex-start !important;
    padding: 16px 10px 30px !important;
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
}`;

const newCss = `/* MOBILE CROP CARD NORMALIZATION */
@media (max-width: 580px) {
  .uv-crop-yellow-content {
    justify-content: flex-start !important;
    padding: 14px 10px 46px !important; /* Huge bottom padding to clear the V-cut */
    height: 76% !important; /* Give more overall height so things aren't cramped */
  }
  .uv-crop-crest-icon {
    margin-bottom: 4px !important;
    min-height: 28px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .uv-crop-custom-icon {
    width: 28px !important;
    height: 28px !important;
    transform: none !important;
    object-fit: contain !important;
  }
  .uv-crop-v2-title {
    font-size: 13px !important;
    min-height: 34px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-bottom: 2px !important;
  }
  .uv-crop-v2-subtitle {
    font-size: 10px !important;
    line-height: 1.3 !important;
    margin-bottom: auto !important; /* Pushes the arrow to the bottom */
  }
  .uv-crop-v2-arrow-btn {
    width: 28px !important;
    height: 28px !important;
    min-width: 28px !important;
    min-height: 28px !important;
    margin: 4px auto 0 !important;
    flex-shrink: 0 !important;
  }
}`;

if (css.includes(oldCss)) {
  css = css.replace(oldCss, newCss);
  fs.writeFileSync('src/app/globals.css', css);
  console.log('Replaced');
} else {
  console.log('Not found');
}
