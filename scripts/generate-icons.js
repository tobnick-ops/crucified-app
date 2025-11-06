/**
 * Icon Generator Script
 * Generiert einfache Platzhalter-Icons für PWA
 * 
 * Usage: node scripts/generate-icons.js
 * 
 * Note: Für Production sollten professionelle Icons erstellt werden
 */

const fs = require('fs');
const path = require('path');

// Canvas (node-canvas) wäre hier ideal, aber für jetzt erstellen wir SVG-Icons
// Diese können später in PNG konvertiert werden

const sizes = [72, 96, 128, 144, 152, 192, 384, 512, 180]; // 180 ist Apple Touch Icon

const iconsDir = path.join(__dirname, '../public/icons');

// Erstelle Icons-Verzeichnis falls nicht vorhanden
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG Icon Template (Tempel-Design mit Kreuz)
function generateSVGIcon(size) {
  const strokeWidth = size * 0.05;
  const crossSize = size * 0.4;
  const crossOffset = size * 0.3;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Hintergrund (Tempel-Blau) -->
  <rect width="${size}" height="${size}" fill="#1e3a5f"/>
  
  <!-- Goldener Rahmen -->
  <rect x="${size * 0.1}" y="${size * 0.1}" width="${size * 0.8}" height="${size * 0.8}" 
        fill="none" stroke="#d4af37" stroke-width="${strokeWidth}" rx="${size * 0.05}"/>
  
  <!-- Kreuz (Gold) -->
  <g stroke="#d4af37" stroke-width="${size * 0.08}" stroke-linecap="round">
    <!-- Vertikale Linie -->
    <line x1="${size * 0.5}" y1="${size * 0.25}" x2="${size * 0.5}" y2="${size * 0.75}"/>
    <!-- Horizontale Linie -->
    <line x1="${size * 0.25}" y1="${size * 0.5}" x2="${size * 0.75}" y2="${size * 0.5}"/>
  </g>
</svg>`;
}

// Generiere Icons
console.log('Generiere Icons...');

sizes.forEach(size => {
  const filename = size === 180 ? 'apple-touch-icon.png' : `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  // Generiere SVG
  const svg = generateSVGIcon(size);
  
  // Speichere SVG
  fs.writeFileSync(filepath, svg);
  
  console.log(`✓ ${filename} erstellt (${size}x${size})`);
});

console.log('\n✅ Alle Icons wurden generiert!');
console.log('\n📝 Hinweis:');
console.log('   - Die Icons sind SVG-Format (für Development)');
console.log('   - Für Production sollten PNG-Icons erstellt werden');
console.log('   - Verwende ein Design-Tool (Figma, Canva) für professionelle Icons');
console.log('\n🔧 SVG zu PNG konvertieren:');
console.log('   - Verwende einen Online-Konverter oder');
console.log('   - Verwende ImageMagick: convert icon-192x192.svg icon-192x192.png');

