const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const VENDOR_DIR = path.join(ROOT_DIR, 'vendor');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

module.exports = {
  port: 3001,
  rootDir: ROOT_DIR,
  assetsDir: ASSETS_DIR,
  srcDir: SRC_DIR,
  jsVendorDir: path.join(VENDOR_DIR, 'js'),
  cssVendorDir: path.join(VENDOR_DIR, 'css'),
  jsBundleFile: path.join(DIST_DIR, 'bundle.js'),
  cssBundleFile: path.join(DIST_DIR, 'bundle.css'),
  indexFile: path.join(ROOT_DIR, 'index.html')
};
