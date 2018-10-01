const fs = require('fs');
const config = require('./config');
const bundler = require('./bundler');

const cliArgs = process.argv.slice(2);


const packageJs = () => {
  const bundle = `${bundler.bundle(config.jsVendorDir, 'js')} ${bundler.bundleJs(config.srcDir)}`;

  fs.writeFileSync(config.jsBundleFile, bundle);
};

const packageCss = () => {
  const bundle = `${bundler.bundleCss(config.cssVendorDir)} ${bundler.bundleCss(config.srcDir)}`;

  fs.writeFileSync(config.cssBundleFile, bundle);
};

const packageAll = () => {
  packageJs();
  console.log(`📦 Successfully packaged js files.`);
  
  packageCss();
  console.log(`📦 Successfully packaged css files.`);
}

const packageAllAndCatchErrors = () => {
  try {
    packageAll();
  } catch (error) {
    console.error(error);
  }
};

const logPackageAllAndCatchErrors = (eventString, pathString) => {
  process.stdout.write('\x1B[2J\x1B[0f');
  console.log(`\nFile ${eventString}: ${pathString}`);
  console.log('Repackaging app...');
  packageAllAndCatchErrors();
};


if (cliArgs.indexOf('-p') > -1){
  packageAll();
} else {
  module.exports = {
    packageJs: packageJs,
    packageCss: packageCss,
    packageAll: packageAll,
    packageAllAndCatchErrors: packageAllAndCatchErrors,
    logPackageAllAndCatchErrors: logPackageAllAndCatchErrors
  };
}
