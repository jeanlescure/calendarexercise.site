const fs = require('fs');
const path = require('path');
const glob = require('glob');
const babel = require("@babel/core");

const config = require('./config');

const bundle = (dir, extension, modFunction) => {
  const modFn = (modFunction instanceof Function)? modFunction : (code) => code;

  files = glob.sync(
    `**/*.${extension}`,
    {
      nosort: false,
      cwd: dir
    }
  );

  const result = files.map((f) => {
      return modFn(fs.readFileSync(path.join(dir, f)));
    }).join("\n\n");

  console.log(`👾 Successfully bundled ${files.length} ${extension} files in '${dir}' directory.`);

  return result;
};

const build = (code) => {
  return babel.transformSync(
    code,
    {
      filename: config.jsBundleFile,
      cwd: config.rootDir,
      babelrc: true
    }
  )['code'];
};

module.exports = {
  bundle: bundle,
  bundleJs: (dir) => {
    return bundle(
      dir,
      'js',
      build
    );
  },
  bundleCss: (dir) => {
    return bundle(dir, 'css');
  }
}
