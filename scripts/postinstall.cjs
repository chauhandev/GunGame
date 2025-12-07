const fs = require('fs');
const path = require('path');

const pkgDir = path.join(__dirname, '..');
const targetDir = path.join(pkgDir, 'node_modules', '@alloc', 'quick-lru');
const targetFile = path.join(targetDir, 'index.js');

function ensureDir(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

function writeShim() {
  ensureDir(targetDir);
  if (fs.existsSync(targetFile)) return;

  const shim = "class QuickLRU {\n  constructor(options = {}) {\n    const { maxSize = 1000 } = options;\n    this.maxSize = maxSize;\n    this.cache = new Map();\n  }\n  _promote(key) {\n    const val = this.cache.get(key);\n    if (val === undefined) return;\n    this.cache.delete(key);\n    this.cache.set(key, val);\n  }\n  get(key) { const value = this.cache.get(key); if (value !== undefined) this._promote(key); return value; }\n  set(key, value) { if (this.cache.has(key)) this.cache.delete(key); this.cache.set(key, value); while (this.cache.size > this.maxSize) { const firstKey = this.cache.keys().next().value; this.cache.delete(firstKey); } return this; }\n  has(key) { return this.cache.has(key); }\n  delete(key) { return this.cache.delete(key); }\n  clear() { this.cache.clear(); }\n}\nmodule.exports = QuickLRU;";

  try {
    fs.writeFileSync(targetFile, shim, { flag: 'wx' });
    const pkg = path.join(targetDir, 'package.json');
    if (!fs.existsSync(pkg)) {
      fs.writeFileSync(pkg, JSON.stringify({ name: '@alloc/quick-lru', version: '0.0.0' }, null, 2));
    }
    console.log('Wrote fallback @alloc/quick-lru/index.js');
  } catch (e) {
    // ignore
  }
}

try {
  writeShim();
} catch (err) {
  // ignore failures
}
