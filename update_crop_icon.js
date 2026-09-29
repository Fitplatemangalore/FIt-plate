const fs = require('fs');
let txt = fs.readFileSync('src/components/CropHexagonCard.tsx', 'utf8');

const newCropIcon = `export function CropIcon({ type }: { type?: string }) {
  if (!type) return null;
  const isLarge = type === 'leafy-vegetables' || type === 'edible-flowers' || type === 'herbs';
  return (
    <img
      src={\`/assets/icons/\${type}.png\`}
      alt={\`\${type} icon\`}
      className="uv-crop-custom-icon"
      style={isLarge ? { transform: 'scale(0.72) translateY(2px)' } : { transform: 'scale(1)' }}
    />
  );
}`;

txt = txt.replace(/export function CropIcon\(\{ type \}: \{ type\?: string \}\) \{[\s\S]*?\n\}/, newCropIcon);
fs.writeFileSync('src/components/CropHexagonCard.tsx', txt);
console.log('done');
