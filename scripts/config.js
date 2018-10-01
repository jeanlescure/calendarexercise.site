const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');
const SRC_DIR = path.join(ROOT_DIR, 'src');

module.exports = {
  port: 3001,
  rootDir: ROOT_DIR,
  assetsDir: ASSETS_DIR,
  srcDir: SRC_DIR,
  indexFile: path.join(ROOT_DIR, 'index.html')
};
