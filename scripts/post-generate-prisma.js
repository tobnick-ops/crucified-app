#!/usr/bin/env node

/**
 * Post-Generate Script für Prisma Client
 * Erstellt automatisch index.js und default.js im .prisma/client Verzeichnis
 */

const fs = require('fs');
const path = require('path');

const prismaClientPath = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
const defaultJsPath = path.join(prismaClientPath, 'default.js');
const indexJsPath = path.join(prismaClientPath, 'index.js');

console.log('🔧 Post-Generate Script für Prisma Client...');

// Prüfe ob .prisma/client Verzeichnis existiert
if (!fs.existsSync(prismaClientPath)) {
  console.error('❌ .prisma/client Verzeichnis nicht gefunden!');
  process.exit(1);
}

// Erstelle index.js - JavaScript-Version von client.ts ohne Type-Exports
// client.ts nutzt ESM imports und Type exports, die Webpack nicht mag
// Wir replizieren die Logik in CommonJS ohne Type-Exports
const indexJsContent = `// Prisma Client index export (CommonJS)
// This is a CommonJS version of client.ts without TypeScript type exports

const path = require('path');

// Import der internen Klassen (diese sind schon JavaScript)
const $Class = require('./internal/class');
const $Enums = require('./enums.js'); // Verwende .js statt .ts
const Prisma = require('./internal/prismaNamespace');

// Re-export enums
Object.assign(exports, $Enums);

// Export PrismaClient class (nur Wert, kein Type)
exports.PrismaClient = $Class.getPrismaClientClass(__dirname);

// Export Prisma namespace
exports.Prisma = Prisma;

// File annotations for bundling tools
path.join(__dirname, "libquery_engine-darwin.dylib.node");
`;


if (!fs.existsSync(indexJsPath)) {
  fs.writeFileSync(indexJsPath, indexJsContent);
  console.log('✅ index.js erstellt');
} else {
  fs.writeFileSync(indexJsPath, indexJsContent);
  console.log('✅ index.js aktualisiert');
}

// Erstelle default.js - wird von @prisma/client/default.js verwendet
const defaultJsContent = `// Prisma Client default export
// This file is required by @prisma/client/default.js
// Export from index.js which exports from client.ts
// Webpack will compile client.ts automatically in Next.js
module.exports = require('./index.js');
`;

if (!fs.existsSync(defaultJsPath)) {
  fs.writeFileSync(defaultJsPath, defaultJsContent);
  console.log('✅ default.js erstellt');
} else {
  fs.writeFileSync(defaultJsPath, defaultJsContent);
  console.log('✅ default.js aktualisiert');
}

// Erstelle enums.js - JavaScript-Version von enums.ts ohne Type-Exports
// enums.ts nutzt TypeScript-Syntax (as const, type exports), die Webpack nicht mag
const enumsTsPath = path.join(prismaClientPath, 'enums.ts');
const enumsJsPath = path.join(prismaClientPath, 'enums.js');

if (fs.existsSync(enumsTsPath)) {
  // Lese enums.ts und konvertiere zu JavaScript
  let enumsContent = fs.readFileSync(enumsTsPath, 'utf8');
  
  // Entferne TypeScript-spezifische Syntax
  // 1. Entferne "as const"
  enumsContent = enumsContent.replace(/\s+as\s+const/g, '');
  
  // 2. Entferne Type-Exports (Zeilen die mit "export type" beginnen)
  enumsContent = enumsContent.split('\n')
    .filter(line => !line.trim().startsWith('export type '))
    .join('\n');
  
  // 3. Konvertiere ESM imports/exports zu CommonJS
  // Ersetze "export const X =" mit "exports.X ="
  enumsContent = enumsContent.replace(/export const ([\w]+)/g, 'exports.$1');
  
  // 4. Entferne alle import Statements (sollten nicht in enums.ts sein)
  enumsContent = enumsContent.split('\n')
    .filter(line => !line.trim().startsWith('import '))
    .join('\n');
  
  fs.writeFileSync(enumsJsPath, enumsContent);
  console.log('✅ enums.js erstellt');
}

console.log('✅ Post-Generate Script abgeschlossen!');
