const fs = require('fs');

let css = fs.readFileSync('src/app/globals.css', 'utf8');
if (!css.includes('.mobile-icon-only')) {
  const newCss = `.mobile-icon-only {
  display: none !important;
}
@media (max-width: 580px) {
  .desktop-icon-only {
    display: none !important;
  }
  .mobile-icon-only {
    display: block !important;
  }
}
`;
  css += newCss;
  fs.writeFileSync('src/app/globals.css', css);
}

let tsx = fs.readFileSync('src/components/CropHexagonCard.tsx', 'utf8');

const oldIconFn = `export function CropIcon({ type }: { type?: string }) {
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

const newIconFn = `export function CropIcon({ type }: { type?: string }) {
  if (!type) return null;
  const isLarge = type === 'leafy-vegetables' || type === 'edible-flowers' || type === 'herbs';
  
  const imgProps = {
    src: \`/assets/icons/\${type}.png\`,
    alt: \`\${type} icon\`,
    style: isLarge ? { transform: 'scale(0.72) translateY(2px)' } : { transform: 'scale(1)' }
  };

  if (type === 'microgreens' || type === 'edible-flowers' || type === 'herbs') {
    return (
      <>
        <img {...imgProps} className="uv-crop-custom-icon desktop-icon-only" />
        <svg viewBox="0 0 32 32" fill="none" stroke="#112E81" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="uv-crop-custom-icon mobile-icon-only">
          {type === 'microgreens' && (
            <g style={{ transform: "scale(1.4) translateY(-2px)", transformOrigin: "center" }}>
              <path d="M15.5 28V14" />
              <path d="M15.5 14c0-6 4.5-9 10.5-9.5-1 6-4 10-10.5 9.5Z" />
              <path d="M15.5 18c0-4-3-6-6.5-6.8 0.5 4 2.5 6.8 6.5 6.8Z" />
            </g>
          )}
          {type === 'edible-flowers' && (
            <>
              <circle cx="16" cy="16" r="3.5" />
              <path d="M16 5.5a3.5 3.5 0 0 0-3.5 3.5v1.5a3.5 3.5 0 0 0 7 0V9A3.5 3.5 0 0 0 16 5.5Z" />
              <path d="M16 21.5a3.5 3.5 0 0 0-3.5 3.5V26.5a3.5 3.5 0 0 0 7 0V25a3.5 3.5 0 0 0-3.5-3.5Z" />
              <path d="M5.5 16a3.5 3.5 0 0 0 3.5-3.5H10.5a3.5 3.5 0 0 0 0 7H9A3.5 3.5 0 0 0 5.5 16Z" />
              <path d="M21.5 16a3.5 3.5 0 0 0 3.5-3.5H26.5a3.5 3.5 0 0 0 0 7H25A3.5 3.5 0 0 0 21.5 16Z" />
            </>
          )}
          {type === 'herbs' && (
            <g style={{ transform: "scale(0.85) translateY(2px)", transformOrigin: "center" }}>
              <path d="M16 28V8" />
              <path d="M16 14c-4-1-6-3-6-6 4 0 6 3 6 6Z" />
              <path d="M16 18c4-1 6-3 6-6-4 0-6 3-6 6Z" />
              <path d="M16 23c-3-1-5-2.5-5-5 3.5 0 5 2.5 5 5Z" />
            </g>
          )}
        </svg>
      </>
    );
  }

  return (
    <img {...imgProps} className="uv-crop-custom-icon" />
  );
}`;

if (tsx.includes(oldIconFn)) {
  tsx = tsx.replace(oldIconFn, newIconFn);
  fs.writeFileSync('src/components/CropHexagonCard.tsx', tsx);
  console.log('Replaced TSX');
} else {
  console.log('TSX string not found');
}
