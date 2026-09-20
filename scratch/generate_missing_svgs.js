const fs = require('fs');
const path = require('path');
const { PRODUCTS } = require('../lib/shopData');

const assetsDir = path.join(__dirname, '../public/assets/software');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

let generatedCount = 0;

PRODUCTS.forEach(product => {
  const slug = product.slug;
  const svgPath = path.join(assetsDir, `${slug}.svg`);
  
  if (!fs.existsSync(svgPath)) {
    // Generate initials (up to 2 characters)
    const words = product.title.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/);
    let initials = 'SA'; // Fallback
    if (words.length >= 2) {
      initials = (words[0][0] + words[1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      initials = words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 1) {
      initials = words[0][0].toUpperCase();
    }
    
    // Some color variations based on slug length
    const colors = [
      ['#1e293b', '#0f172a', '#73e5e2'],
      ['#2a1f2d', '#140f1a', '#ff004f'],
      ['#1a2a22', '#0c1a14', '#65ebaa'],
      ['#2c201a', '#1a100a', '#f2b848']
    ];
    
    const colorTheme = colors[slug.length % colors.length];

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colorTheme[0]};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colorTheme[1]};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="overlayGrad" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colorTheme[2]};stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:#05090e;stop-opacity:0.6" />
    </linearGradient>
  </defs>
  <rect width="128" height="128" rx="28" fill="url(#bgGrad)" />
  <rect width="128" height="128" rx="28" fill="url(#overlayGrad)" />
  <text x="64" y="82" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="800" fill="${colorTheme[2]}" text-anchor="middle" letter-spacing="1">${initials}</text>
  <rect width="126" height="126" x="1" y="1" rx="27" fill="none" stroke="${colorTheme[0]}" stroke-width="2" />
</svg>`;

    fs.writeFileSync(svgPath, svgContent);
    console.log(`Generated SVG for: ${product.title}`);
    generatedCount++;
  }
});

console.log(`Done! Generated ${generatedCount} missing SVGs.`);
