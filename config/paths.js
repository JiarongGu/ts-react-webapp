const path = require('path');

const appPublic = path.resolve(__dirname, '../public');
const appSrc = path.resolve(__dirname, '../src');
const appOutput = path.resolve(__dirname, '../build');
const nodeModules = path.resolve(process.cwd(), '../node_modules');
const postcss = path.resolve(__dirname, './postcss.config.js');
const appHtml = path.resolve(appPublic, 'index.html');

// get alias from tsconfig
const tspaths = require('./tspaths.json').compilerOptions.paths;
const alias = Object.keys(tspaths)
  .filter((key) => key.indexOf('*') < 0)
  .reduce((aliasValue, key) => {
    aliasValue[key] = path.resolve(appSrc, tspaths[key][0]);
    return aliasValue;
  }, {});

module.exports = {
  appPublic,
  appOutput,
  appSrc,
  appHtml,
  nodeModules,
  postcss,
  alias,
};
