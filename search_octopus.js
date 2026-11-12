// Script to find 🐙 emoji in source files
const fs = require('fs');
const path = require('path');
const exts = new Set(['.js', '.jsx', '.tsx', '.ts', '.css', '.html']);
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // skip node_modules and .git
      if (e.name === 'node_modules' || e.name === '.git') continue;
      walk(full);
    } else if (e.isFile()) {
      if (!exts.has(path.extname(e.name))) return;
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split(/\r?\n/);
      lines.forEach((line, i) => {
        if (line.includes('🐙')) {
          console.log(`${full}:${i + 1}:${line.trim()}`);
        }
      });
    }
  }
}
walk(path.resolve(__dirname));

